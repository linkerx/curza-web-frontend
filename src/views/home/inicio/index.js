import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openMenu } from 'redux/actions/menu';
import WpItem from 'wp/item';
import HomeHeader from './header';
import HomeInicioMenu from './menu';
import Megamenu from 'components/megamenu';
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
        <HomeHeader />
        <WpItem type='post' slug='estudia-en-el-curza' share={false} render='back' img_size='full' />
        <div className='fondo-articulo'></div>
        <HomeInicioMenu openMenu={this.openMenu} activeSubmenuItem={this.state.menuSelected} />
        <div id='home-inicio-megamenu'>
          <Megamenu open={this.state.megamenuOpen} close={this.closeMenu} items={this.state.megamenuData} />
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    menu_opened: state.menu_opened,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    openMenu,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeInicio);
