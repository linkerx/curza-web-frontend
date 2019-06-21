import React from 'react';
import CurzaWpSiteDepartamento from 'components/site/departamento';
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
    this.checkCurzaURL = this.checkCurzaURL.bind(this);
}

openMenu(){
  this.setState({
    menu_opened: true
  })
}

componentDidMount(){
    this.checkCurzaURL();
    if (this.props.show && typeof this.props.show === "function") {
      setTimeout(function(){this.props.show()}.bind(this), 2000);
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.checkCurzaURL();
    }
  }

  checkCurzaURL(){

    this.setState(function(){
      return {
        site: this.state.site,
        check: false,
        home: false,
      }
    });

    // si es home me importa seguir aca, sino que vaya al site comun
    if(typeof(this.props.match.params.slug1) === 'undefined') {
      this.setState({
        site: this.state.site,
        check:true,
        home:true,
      });
    } else {
      this.setState({
        site: this.state.site,
        check: true,
        home: false,
      });
    }
  }

  render() {
    var template = 1;
    if(this.props.template){
      template = this.props.template;
    }

    console.log("Props Curza-Router",this.props);
    console.log("Site Curza-Router",this.state.site);

    return(
      <section id='curza-wp-site'>
        {this.state.check &&
          <div>
            { (this.state.home && this.props.site_data.tipo_pagina === 'departamento') ? 
                <CurzaWpSiteDepartamento {...this.props} />
              :
                <WpSite {...this.props} />
            }
          </div>
        }
      </section>
    )
  }
}

export default CurzaWpSiteRouter;
