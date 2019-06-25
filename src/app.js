import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import MainMenu from "views/menu";
import FixedHeader from "views/fixed-header";
import Header from "views/header";
import Footer from "views/footer";
import Novedades from "views/curza/novedades";
import Institucional from "views/curza/institucional";
import Home from "views/home";
import CurzaWpNetwork from "components/network";
import Megamenu from 'views/megamenu';
import 'styles/main.scss';

class App extends Component {

  constructor(props){
   super(props);
   this.state = {
     loading: true,
     menuOpen: false,
     megamenuOpen: false,
     megamenuData: null,
     menuSelected: null
   }

   this.endLoading = this.endLoading.bind(this);
   this.openMenu = this.openMenu.bind(this);
   this.closeMenu = this.closeMenu.bind(this);
   this.openMegamenu = this.openMegamenu.bind(this);
   this.closeMegamenu = this.closeMegamenu.bind(this);
  }

  openMenu(){
    this.setState({
      menuOpen: true
    });
  }

  closeMenu(){
    this.setState({
      menuOpen: false
    });
  }

  openMegamenu(item){
    this.setState(function(){
      return {
        megamenuOpen: true,
        menuSelected: item.id,
        megamenuData: item.children
      }
    });
  }

  closeMegamenu(){
    this.setState({
      megamenuOpen: false,
      megamenuData: null,
      menuSelected: null
    })
  }


  endLoading(){
    this.setState(function(){
      return {loading: false}
    })
  }

  render() {
    return (
      <div className="app">
          <div id='main-wrapper'>
            <MainMenu openMenu={this.openMegamenu} opened={this.state.menuOpen} closeMenu={this.closeMenu} />
            <FixedHeader openMenu={this.openMenu}/>
            <Switch>
              <Route exact path='/' render={ function(props) { return ( <Home {...props} show={this.endLoading} /> ) }.bind(this) } />
              <Route path='/:slug' render={ function(props) { return (
                <div className='wrapper'>
                  <Header />
                  <Switch>
                    <Route exact path='/novedades' render={ function(props) { return ( <Novedades {...props} show={this.endLoading} /> ) }.bind(this) } />
                    <Route exact path='/institucional' render={ function() { return ( <Institucional  /> ) } } />
                    <Route path='/:slug' render={ function(props) { return ( <CurzaWpNetwork {...props} show={this.endLoading} template={2} /> ) }.bind(this) } />
                  </Switch>
                </div>
              ) }.bind(this) }
              />
            </Switch>
            <Footer />
            <div id='main-megamenu'>
              <Megamenu open={this.state.megamenuOpen} close={this.closeMegamenu} items={this.state.megamenuData} />
            </div>
          </div>
      </div>
    );
  }
}

export default App;
