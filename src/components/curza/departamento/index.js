import React from 'react';
import WpSiteHeader from 'wp/site/header';
import WpSiteMenu from 'wp/site/menu';
import WpSiteSidebar from 'wp/site/sidebar';
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

    var onlyChildren = false;
    if(this.props.onlyChildren){
      onlyChildren = this.props.onlyChildren;
    }

    return(
      <section id='wp-site'>
        <WpSiteHeader site={this.props.site} openMenu={this.openMenu} data={this.props.site_data} />
        <div className='wp-site-wrapper'>
          <WpSiteMenu site={this.props.site} />
          <div id='curza-site-content'>
            {this.props.children}
          </div>
          <WpSiteSidebar site={this.props.site} />
        </div>
      </section>
    )
  }
}

export default CurzaWpSiteDepartamento;
