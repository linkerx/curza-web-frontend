import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openMenu } from 'redux/actions/menu';
import WpMenu from 'wp/menu';
import { Link } from 'react-router-dom';
class Header extends React.Component {
  render(){
    return(
      <div id='header'>
          <div className='fondo'></div>
          <div className='wrapper-central'>
              <div className='logo'>
                  <Link to='/'><img src='/images/logo_blanco.png' alt='Logo UNCo' /></Link>
                  <div className='logo-text'>
                      <div className='titulo'>C.U.R.Z.A.</div>
                      <div className='descripcion'>Centro Universitario Regional Zona Atlántica</div>
                      <div className='unco'>Universidad Nacional del Comahue</div>
                  </div>
              </div>
              <div className='menu-opener' onClick={() => this.props.openMenu()}>
                  <span>Menú</span>
                  <i className='fas fa-bars'></i>
              </div>
              <div className='wrapper-servicios'>
                  
                  <div className='redes-sociales'>
                      <WpMenu location='redes-sociales-menu-location' />
                  </div>
                  <div className='telefonos'>
                          <i className='fas fa-phone'></i>
                          <span>+54 - 2920 - 422921/423772</span>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    openMenu,
  }, dispatch);
}


export default  connect(null, mapDispatchToProps)(Header);
