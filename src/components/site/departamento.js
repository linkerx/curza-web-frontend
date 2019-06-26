import React from 'react';
import WpSiteHeader from 'wp/site/header';
import WpSiteMenu from 'wp/site/menu';
import WpSiteContent from 'wp/site/content';
import WpSiteSidebar from 'wp/site/sidebar';
import CurzaCarreras from 'components/curza/carreras';
import 'styles/wp/site.scss';

class CurzaWpSiteDepartamento extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      menu_opened: false
    }
    this.openMenu = this.openMenu.bind(this);
  }

  openMenu(){
    this.setState({
      menu_opened: true
    })
  }

  render() {
    var template = 1;
    if(this.props.template){
      template = this.props.template;
    }

    return(
      <section id='wp-site'>
        <WpSiteHeader site={this.props.site} openMenu={this.openMenu} data={this.props.site_data} />
        <div className='wp-site-wrapper'>
          <WpSiteMenu site={this.props.site} />
          <WpSiteContent {...this.props} template={template} >
            <CurzaCarreras departamento={this.props.site} id_departamento={this.props.site_data.id_departamento} />
          </WpSiteContent>
          <WpSiteSidebar site={this.props.site} />
        </div>
      </section>
    )
  }
}

export default CurzaWpSiteDepartamento;
