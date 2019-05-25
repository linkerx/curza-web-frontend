import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openMenu } from 'redux/actions/menu';
import WpItem from 'wp/item';
import HomeHeader from './header';
import HomeInicioMenu from './menu';
import './styles.scss';

class HomeInicio extends React.Component {
  render(){
    return(
      <section id='home-inicio'>
        <div className='fondo'></div>
        <HomeHeader />
        <WpItem type='post' slug='estudia-en-el-curza' share={false} render='back' img_size='full' />
        <div className='fondo-articulo'></div>
        <HomeInicioMenu />
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
