import React from 'react';
import HomeDestacadas from './destacadas';
import HomeHeader from './header';
import HomeInicioMenu from './menu';
import Megamenu from './megamenu';
import './styles.scss';

class HomeInicio extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      megamenuOpen: false,
      megamenuData: null,
      menuSelected: null
    }

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  openMenu(item){
    this.setState(function(){
      return {
        megamenuOpen: true,
        menuSelected: item.id,
        megamenuData: item.children
      }
    });
  }

  closeMenu(){
    this.setState({
      megamenuOpen: false,
      megamenuData: null,
      menuSelected: null
    })
  }

  render(){
    return(
      <section id='home-inicio'>
        <div className='fondo'></div>
        <HomeHeader openMenu={this.openMenu} />
        <HomeDestacadas />
        <HomeInicioMenu openMenu={this.openMenu} activeSubmenuItem={this.state.menuSelected} />
        <div id='home-inicio-megamenu'>
          <Megamenu open={this.state.megamenuOpen} close={this.closeMenu} items={this.state.megamenuData} />
        </div>
      </section>
    )
  }
}

export default HomeInicio;
