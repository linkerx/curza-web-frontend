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
      megamenuPadre: null,
      megamenuData: null,
      menuSelected: null,
      showScrollProp: true
    }

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);  
  }
  
  handleScroll() {
    if(window.scrollY > 200){
      this.setState({
        showScrollProp: false
      });    
    } else {
      this.setState({
        showScrollProp: true
      })
    }
  }
  

  openMenu(item){
    this.setState(function(){
      return {
        megamenuOpen: true,
        menuSelected: item.id,
        megamenuPadre: item,
        megamenuData: item.children
      }
    });
  }

  closeMenu(){
    this.setState({
      megamenuOpen: false,
      megamenuPadre: null,
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
          <Megamenu open={this.state.megamenuOpen} close={this.closeMenu} items={this.state.megamenuData} padre={this.state.megamenuPadre} />
        </div>
        <div id='scroll-proposal'>
          { this.state.showScrollProp &&
            <i className="fas fa-chevron-down" onClick={() => {window.scrollTo({ top: 200, behavior: 'smooth'})}}></i>
          }
        </div>
      </section>
    )
  }
}

export default HomeInicio;
