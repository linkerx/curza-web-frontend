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

    //console.log("Props Curza-Router",this.props);
    //console.log("Site Curza-Router",this.state.site);

    return(
      <section id='curza-wp-site'>
        {this.state.check &&
          <div>
            { this.props.site_data.tipo_pagina === 'departamento' ?
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
                      <Route path={'/'+this.state.site+'/:slug1?/:slug2?/:slug3?'} render={function(props){return(
                        <WpSite {...props} template={template} />
                      )}}/>
                  </Switch>
                </CurzaDepartamento>
              :
                <WpSite {...this.props} template={template}/>
            }
          </div>
        }
      </section>
    )
  }
}

export default CurzaWpSiteRouter;
