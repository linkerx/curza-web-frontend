import React from 'react';
import CurzaDepartamento from 'components/curza/departamento';
import CurzaCarreras from 'components/curza/departamento/carreras';
import CurzaCarrera from 'components/curza/carrera';
import WpSiteContent from 'wp/site/content';
import WpSite from 'wp/site';
import { Switch, Route } from 'react-router-dom';

class CurzaWpSiteRouter extends React.Component {

  constructor(props){
    super(props);

    var debug = false;
    if(typeof(props.debug) !== 'undefined'){
      debug = props.debug;
    }

    this.state = {
      debug: debug,
      site: "",
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
    var site = "";
    var home = false;
    var departamento = false;

    if(typeof(this.props.site) !== 'undefined'){
      site = this.props.site;
      console.log("Es el sitio: ",site);
    }
    if(typeof(this.props.match.params.slug1) === 'undefined') {
      home = true;
      if(this.state.debug){
        console.log("Es Home");
      }
    }
    if(this.props.site_data.tipo_pagina === 'departamento') {
      departamento = true;
      if(this.state.debug){
        console.log("Es Departamento");
      }
    }
    this.setState({
      site: site,
      check: true,
      home: home,
      departamento: departamento
    });
  }

  render() {
    var template = 1;
    if(this.props.template){
      template = this.props.template;
    }

    console.log("Props Curza-Router",this.props);
    console.log("State Curza-Router",this.state);

    return(
      <section id='curza-wp-site'>
        {this.state.check &&
          <div>
            { this.state.departamento ?
              <CurzaDepartamento {...this.props} template={template} >
                  <Switch>                
                      <Route exact path={'/'+this.state.site} render={function(props){return(
                        <div>
                          <CurzaCarreras departamento={this.state.site} id_departamento={this.props.site_data.id_departamento} />
                          <WpSiteContent {...this.props} template={template} />
                        </div>
                      )}.bind(this)}/>
                      <Route exact path={'/'+this.state.site+'/carreras/'} render={function(props){return( 
                          <CurzaCarreras departamento={this.state.site} id_departamento={this.props.site_data.id_departamento} />
                      )}.bind(this)}/>
                      <Route exact path={'/'+this.state.site+'/carreras/:slug_carrera'} render={function(props){return(
                          <CurzaCarrera {...props} id_departamento={this.props.site_data.id_departamento} />
                      )}.bind(this)}/>
                      <Route path={'/'+this.state.site+'/:slug1?/:slug2?/:slug3?'} render={function(props){console.log("pos aca"); return(
                        <WpSiteContent {...props} site={this.state.site} template={template} />
                      )}.bind(this)}/>
                  </Switch>
                </CurzaDepartamento>
              :
                <div>
                  { this.state.site !== '' ?
                    <Route path={'/'+this.state.site+'/:slug1?/:slug2?/:slug3?'} render={function(props){return(
                      <WpSite {...props} template={template} site={this.state.site} site_data={this.props.site_data} />
                    )}.bind(this)}/>
                  :
                    <Route path={'/:slug1?/:slug2?/:slug3?'} render={function(props){return(
                      <WpSite {...props} template={template} site_data={this.props.site_data} />
                    )}.bind(this)}/>
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
