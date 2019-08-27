import React from 'react';
import CloseMenuBtn from './closeMenuBtn';
import Submenu from 'wp/submenu';
import './styles.scss';

class MegaMenu extends React.Component {
  constructor(props){
      super(props);

      this.state = {
        menuClass: 'initial',
        items: null
      }
      this.closeMenu = this.closeMenu.bind(this);
      this.openMenu = this.openMenu.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.open){
      this.openMenu(nextProps.items);
    } else if(this.props.open === true){
      this.closeMenu();
    }
  }

  openMenu(items){
    if(typeof(this.props.debug) != undefined && this.props.debug) {
      console.log("Items:",this.state.items);
    }      
      this.setState(function(){
        return {
          menuClass: 'opened',
          items: items
        }
      });
  }

  closeMenu(){
    this.setState(function(){
      return {
        menuClass: 'closed',
        items: null
      }
    });
  }
  closeAll(){
    this.props.close();
    this.props.closeMenu();
  }

  render(){

    var debug = false;
    if(typeof(this.props.debug) != undefined && this.props.debug) {
      console.log("Items:",this.state.items);
      debug = true;
    }

    var megamenuClass= 'megamenu '+this.state.menuClass;

    if (this.props.showHeader) {
      megamenuClass+= ' arriba';
    } else {
      megamenuClass+= ' abajo';
    }


    return (
      <div id='main-megamenu' className={megamenuClass}>
      <div className='fondo'></div>
        <CloseMenuBtn closeMenu={this.props.close} />
        { this.state.items &&
          <Submenu items={this.state.items} action={this.closeAll} path='/' nivel={1} debug={debug} />
        }
      </div>
    )
  }
}

export default MegaMenu;
