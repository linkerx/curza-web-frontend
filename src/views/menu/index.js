import React from 'react';
import WpApi from 'wp/api';
import MenuItem from 'wp/menu-item';
import { NavLink } from 'react-router-dom';
import './styles.scss';

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: null,
    }
    this.updateItems = this.updateItems.bind(this);
  }

  componentDidMount(){
      this.updateItems();
  }

  updateItems(){
    this.setState(function () {
      return {
        menu: null,
      }
    });

    var opts = {
      location: 'main-menu-location',
      debug: false
    }

    WpApi.getMenuIdByLocation(opts)
      .then(function(menu) {
        this.setState(function () {
          return {
            menu: menu,
          }
        });
      }.bind(this));
  }

  render() {
    var mainMenuClass = 'closed';
    if(typeof(this.props.opened) !== 'undefined'){
      if(this.props.opened){
        mainMenuClass = 'opened';
      } else {
        mainMenuClass = 'closed';
      }
    }

    return (
      <div id='main-menu' className={mainMenuClass}>
        <nav className='menu'>
        {!this.state.menu
          ?
            this.props.children
          :
          <ul className='menu'>
          {
            this.state.menu.items.map(function (menuItem, index) {
                var active = false;
                if(this.props.activeSubmenuItem === menuItem.id){
                  active = true;
                }
                return (<MenuItem key={index} showSubmenu={false} item={menuItem} path={this.props.path} action={() => {this.props.openMenu(menuItem) }} activeSubmenu={active} activeSubmenuClass='submenu-active' />)
            }.bind(this))
          }
          {
            this.props.extraItems &&
              this.props.extraItems.map(function (item, index) {
                return (
                  <li key={100+index}>
                    <NavLink exact to={item.url} activeClassName="active" >{item.title}</NavLink>
                  </li>)
            })
          }
          </ul>
        }
        </nav>
      </div>
    )
  }
}


export default MainMenu;
