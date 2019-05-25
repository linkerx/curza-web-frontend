import React from 'react';
import WpMenu from 'wp/menu';
import WpApi from 'wp/api';
import './styles.scss';

class HomeInicioMenu extends React.Component {

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

    return(
      <div id='home-inicio-menu' >
        <WpMenu location='main-menu-location' />
      </div>
    )
  }
}

export default HomeInicioMenu;
