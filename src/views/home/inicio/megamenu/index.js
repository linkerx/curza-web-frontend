import React from 'react';
import CloseMenuBtn from './closeMenuBtn';
import Submenu from 'wp/submenu';
import './styles.scss';

class MegaMenu extends React.Component {
  constructor(props){
      super(props);

      this.state = {
        menuClass: 'initial',
        padre: null,
        items: null
      }
      this.closeMenu = this.closeMenu.bind(this);
      this.openMenu = this.openMenu.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.open){
      this.openMenu(nextProps.padre,nextProps.items);
    } else if(this.props.open === true){
      this.closeMenu();
    }
  }

  openMenu(itemPadre,items){
    if(typeof(this.props.debug) != undefined && this.props.debug) {
      console.log("Items:",this.state.items);
    }      
      this.setState(function(){
        return {
          menuClass: 'opened',
          padre: itemPadre,
          items: items
        }
      });
  }

  closeMenu(){
    this.setState(function(){
      return {
        menuClass: 'closed',
        padre: null,
        items: null
      }
    });
  }

  render(){

    var debug = false;
    if(typeof(this.props.debug) != undefined && this.props.debug) {
      console.log("Items:",this.state.items);
      debug = true;
    }

    return (
      <div id='home-megamenu' className={'megamenu '+this.state.menuClass}>
      <div className='fondo'></div>
        <CloseMenuBtn closeMenu={this.props.close} />
        { this.state.padre && 
          <div className='img_fondo'><img src={this.state.padre.thumbnail_url} /></div>
        }
        { this.state.items &&
          <Submenu items={this.state.items} action={this.props.close} path='/' nivel={1} debug={debug} />
        }
      </div>
    )
  }
}

export default MegaMenu;
