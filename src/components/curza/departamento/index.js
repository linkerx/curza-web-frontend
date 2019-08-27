import React from 'react';
import WpSiteHeader from 'wp/site/header';
import WpSiteMenu from 'wp/site/menu';
import WpSiteSidebar from 'wp/site/sidebar';
import 'styles/wp/site.scss';

class CurzaWpSiteDepartamento extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      menu_opened: false,
      siteMenu: true,
      siteSidebarMenu: true
    }
    this.openMenu = this.openMenu.bind(this);
  }

  openMenu(){
    this.setState({
      menu_opened: true
    })
  }
  actionMenu(){
    this.setState({
      siteMenu: !this.state.siteMenu 
    })
  }
  actionSidebarMenu(){
    this.setState({
      siteSidebarMenu: !this.state.siteSidebarMenu 
    })
  }

  render() {
    var template = 1;
    if(this.props.template){
      template = this.props.template;
    }

    var onlyChildren = false;
    if(this.props.onlyChildren){
      onlyChildren = this.props.onlyChildren;
    }

    return(
      
      <section id='wp-site'>
          <div className={this.state.siteMenu ? "button-site-menu active-site-menu" : "button-site-menu site-menu"}  onClick={() => this.actionMenu()}>
            <span>Menú</span>
            <i className={this.state.siteMenu ? "fas fa-times-circle" : "fas fa-bars" }></i>
          </div>
          <div className={this.state.siteSidebarMenu ? "button-sidebar-menu active-sidebar-menu" : "button-sidebar-menu sidebar-menu"}  onClick={() => this.actionSidebarMenu()}>
            <span>Menú</span>
                  <i className={this.state.siteSidebarMenu ? "fas fa-times-circle" : "fas fa-bars" }></i>
          </div>
        <WpSiteHeader site={this.props.site} openMenu={this.openMenu} debug={false} data={this.props.site_data} />
        <div className='wp-site-wrapper'>
          <WpSiteMenu site={this.props.site} openMenu={this.state.siteMenu} />
          <div id='curza-site-content'>
            {this.props.children}
          </div>
          <WpSiteSidebar site={this.props.site} openMenu={this.state.siteSidebarMenu} debug={false}/>
        </div>
      </section>
    )
  }
}

export default CurzaWpSiteDepartamento;
