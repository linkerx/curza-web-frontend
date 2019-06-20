import React from 'react';
import WpApi from 'wp/api';
import { Route } from 'react-router-dom';
import CurzaWpSite from '../utils/curza_router';

class CurzaWpNetwork extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      check: false,
      site: null,
      site_data: null
    }

    this.checkSite = this.checkSite.bind(this);
  }

  componentDidMount(){
    this.checkSite();
  }

  checkSite(){
    var debugAll = true;
    this.setState({
      check: false,
      site: null,
      site_data: null
    });

    var opts_site = {
      name: this.props.match.params.slug,
      debug: debugAll
    };
    if (debugAll) { console.log("Check site:",this.props.match.params.slug) }
    WpApi.getSite(opts_site)
      .then(function(site){
        if (debugAll) { console.log(this.props.match.params.slug,"is a Site") }
        setTimeout(function(){this.props.show()}.bind(this), 3000);
        this.setState({
            check: true,
            site: this.props.match.params.slug,
            site_data: site
        });
      }.bind(this))
      .catch(function(error) {
        if (debugAll) { console.log(this.props.match.params.slug,"is NOT a Site") }
        var opts_site2 = {
          name: '',
          debug: false
        };
        WpApi.getSite(opts_site2)
          .then(function(main_site){
            setTimeout(function(){this.props.show()}.bind(this), 3000);
            this.setState({
                check: true,
                site: "",
                site_data: main_site[0 ]
            });
          }.bind(this));
      }.bind(this));
  }

  render(){
    return (
      <div className='network-wrapper'>
        {this.state.check &&
          <CurzaWpSiteRouter site={this.state.site} site_data={this.state.site_data} />
        }
      </div>
    )
  }
}

export default CurzaWpNetwork;
