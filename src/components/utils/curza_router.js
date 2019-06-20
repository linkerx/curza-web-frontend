import React from 'react';
import { Route } from 'react-router-dom';
import CurzaWpSite from 'components/site';
import WpSite from 'wp/site';

class CurzaWpSiteRouter extends React.Component {

  constructor(props){
    super(props);

    var site = "";
    if(props.site){
      site = props.site;
    }

    this.state = {
      site: site,
      check: false,
      departamento: false,
      home: false,
      menu_opened: false
    }
    this.openMenu = this.openMenu.bind(this);
    this.checkCurzaURL = this.checkURL.bind(this);
}

openMenu(){
  this.setState({
    menu_opened: true
  })
}

componentDidMount(){
    this.checkURL();
    if (this.props.show && typeof this.props.show === "function") {
      setTimeout(function(){this.props.show()}.bind(this), 2000);
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.checkURL();
    }
  }

  checkCurzaURL(){

    this.setState(function(){
      return {
        site: this.state.site,
        check: false,
        departamento: false,
        home: false,
      }
    });

    // si es home me importa seguir aca, sino que vaya al site comun
    if(typeof(this.props.match.params.slug1) === 'undefined') {

      // si es departamento
      // busco el resto de las cosas
      // sino tb va al site común
      this.setState({
        site: this.state.site,
        check:true,
        home:true,
        departamento: false
      });
    } else {
      var opts_type = {
        site: this.state.site,
        check: true,
        home: false,
        departamento: false
      };
    }
  }

  render() {
    var template = 1;
    if(this.props.template){
      template = this.props.template;
    }

    return(
      <section id='curza-wp-site'>
        {this.state.check &&
          <div>
            { (this.state.home && this.state.departamento) ? 
                <CurzaWpSite />
              :
              <div>
                {this.state.site
                  ?
                    <Route path={'/'+this.state.site+'/:slug1?/:slug2?/:slug3?'} render={ function(props) { return ( <WpSite {...props} site={this.props.site} site_data={this.props.site_data} template={2} /> ) }.bind(this) } />
                  :
                    <Route path='/:slug1/:slug2?/:slug3?' render={ function(props) { return ( <WpSite {...props} site_data={this.props.site_data} template={2} /> ) }.bind(this) } />
                }
              </div>
    
            }
          </div>
        }
      </section>
    )
  }
}

export default CurzaWpSiteRouter;
