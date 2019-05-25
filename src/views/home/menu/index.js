import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { closeMenu } from 'redux/actions/menu';
import WpMenu from 'wp/menu';
import WpApi from 'wp/api';
import { NavLink } from 'react-router-dom';
import './styles.scss';

class MainMenu extends React.Component {

  constructor(props){
    super(props);
    this.state  = {
      delegaciones:null
    }
    this.getDelegaciones = this.getDelegaciones.bind(this);
  }

  componentDidMount(){
      this.getDelegaciones();
  }

  getDelegaciones(){
    this.setState(function(){
      return {
        delegaciones:null
      }
    });
    WpApi.getSitesList()
      .then(function(sites){
        this.setState(function(){
          return {
            delegaciones:sites
          }
        });
      }.bind(this))
  }

  render(){
    var menuClass = 'closed';
    if(this.props.menu_opened){
      menuClass = 'opened';
    }
    return(
      <div id='main-menu' className={menuClass} >
        <div className='fondo'></div>
        <div className='menu-delegaciones'>
        <div className='fondo-menu-delegaciones'></div>
          <div className='menu-logo'>
            <img src='/images/logo_blanco.png' alt='Logo UNCo' />
          </div>
          <div className='delegaciones'>
            {!this.state.delegaciones
              ?
              <div>Cargando...</div>
              :
              <ul className='list' >
                {
                  this.state.delegaciones.map(function(item,index){
                    return (
                      <li key={item.blog_id}>
                        <NavLink to={item.path} onClick={() => this.props.closeMenu()}>
                          {item.blog_name}
                        </NavLink>
                      </li>
                    )
                  })
                }
              </ul>
            }
          </div>
        </div>
        <div className='menu-principal'>
          <div className='fondo-menu-principal'></div>
          <div className='menu-closer'>
            <div className='frame'>
              <i onClick={() => this.props.closeMenu()} className='fas fa-times'></i>
            </div>
          </div>
          <WpMenu location='main-menu-location' action={() => this.props.closeMenu()}/>
        </div>
      </div>
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
    closeMenu,
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainMenu));
