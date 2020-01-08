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
      sidebar_opened: false
    }
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  componentDidMount() {
    var menuOpened = false;
    var sidebarOpened = false;
    if(this.props.site_data.barra_izq === 1) {
      menuOpened = true;
    }
    if(this.props.site_data.barra_der === 1) {
      sidebarOpened = true;
    }
    
    console.log("barras: ",menuOpened,sidebarOpened);

    this.setState({
      menu_opened: menuOpened,
      sidebar_opened: sidebarOpened
    });
  }

  toggleMenu(){
    this.setState({
      menu_opened: !this.state.menu_opened
    })
  }

  toggleSidebar(){
    this.setState({
      sidebar_opened: !this.state.sidebar_opened
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
        <WpSiteHeader 
          site={this.props.site} 
          toggleMenu={this.toggleMenu} 
          toggleSidebar={this.toggleSidebar} 
          menuOpened={this.state.menu_opened} 
          sidebarOpened={this.state.sidebar_opened} 
          debug={false} 
          data={this.props.site_data} 
        />
        <div className='wp-site-wrapper'>
          <WpSiteMenu site={this.props.site} toggleMenu={this.toggleMenu} opened={this.state.menu_opened} />
          <div id='curza-site-content'>
            {this.props.children}
          </div>
          <WpSiteSidebar site={this.props.site} toggleSidebar={this.toggleSidebar} opened={this.state.sidebar_opened} debug={false}/>
        </div>
      </section>
    )
  }
}

export default CurzaWpSiteDepartamento;
