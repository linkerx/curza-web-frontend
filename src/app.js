import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import MainMenu from "views/menu";
import FixedHeader from "views/fixed-header";
import Header from "views/header";
import Footer from "views/footer";
import Novedades from "views/novedades";
import Home from "views/home";
import WpNetwork from "wp/network";
import 'styles/main.scss';

class App extends Component {

  constructor(props){
   super(props);
   this.state = {
     loading: true
   }

   this.endLoading = this.endLoading.bind(this);
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
            <MainMenu />
            <FixedHeader />
            <Switch>
              <Route exact path='/' render={ function(props) { return ( <Home {...props} show={this.endLoading} /> ) }.bind(this) } />
              <Route path='/:slug' render={ function(props) { return (
                <div className='wrapper'>
                  <Header {...props} openMenu={this.openMenu} closeMenu={this.closeMenu} />
                  <Switch>
                    <Route exact path='/novedades' render={ function(props) { return ( <Novedades {...props} show={this.endLoading} /> ) }.bind(this) } />
                    <Route path='/:slug' render={ function(props) { return ( <WpNetwork {...props} show={this.endLoading} template={2} /> ) }.bind(this) } />
                  </Switch>
                  <Footer {...props} />
                </div>
              ) }.bind(this) }
              />
            </Switch>
          </div>
        <Route path='/' render={ function(props) { return ( <Footer {...props} /> ) } } />
      </div>
    );
  }
}

export default App;
