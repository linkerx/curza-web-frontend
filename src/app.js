import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { Transition, TransitionGroup } from "react-transition-group";
import MainMenu from "views/menu";
import FixedHeader from "views/fixed-header";
import Header from "views/header";
import Footer from "views/footer";
import Novedades from "views/curza/novedades";
import Autoridades from "views/curza/autoridades";
import MostrarOferta from "views/curza/oferta-academica/mostrarOferta";
import Libros from "views/curza/publicaciones/libros";
import Actas from "views/curza/publicaciones/actas";
import Tramites from 'views/curza/tramites';
import Home from "views/home";
import CurzaWpNetwork from "components/network";
import RouterCurzaCms from "components/curza/routerCms"
import Megamenu from 'views/megamenu';
import 'styles/main.scss';
import 'styles/transition.scss';
import Plano from 'views/curza/plano';

class App extends Component {

  constructor(props){
   super(props);
   this.state = {
     loading: true,
     showHeader: false,
     menuOpen: false,
     megamenuOpen: false,
     megamenuData: null,
     menuSelected: null,
     transClass: "inicial"
   }

   this.endLoading = this.endLoading.bind(this);
   this.openMenu = this.openMenu.bind(this);
   this.closeMenu = this.closeMenu.bind(this);
   this.openMegamenu = this.openMegamenu.bind(this);
   this.closeMegamenu = this.closeMegamenu.bind(this);
   this.handleScroll = this.handleScroll.bind(this);
}

componentDidMount(){
  window.addEventListener('scroll', this.handleScroll);
}

componentWillUnmount() {
  window.removeEventListener('scroll', this.handleScroll);  
}

handleScroll() {
  if(window.scrollY > 100){
    this.setState({
      showHeader: true
    });    
  } else {
    this.setState({
      showHeader: false
    })
  }
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

  transOnExit(){
    this.setState({transClass: "trans-exit"});
  }

  transOnExited(){
    window.scrollTo(0, 0);
    this.setState({transClass: "trans-exited"});
  }

  render() {
    return (
      <Route render={({ location }) => {
  const { key } = location

  return (
    <div className="app">
    <Route path='/cms' render={ function(props) { return ( <RouterCurzaCms  {...props} /> ) } } />      
    <div id='main-wrapper' >
  <TransitionGroup component={null}>
  <Transition
    key={key}
    appear={true}
    onExit={() => this.transOnExit()}
    onExited={() => this.transOnExited()}
    timeout={{appear: 2000, enter:2500, exit: 1500}}
  >
    {state =>(
      <div id='transition' className={this.state.transClass}>
          <div id='fondo-transition'></div>
            <MainMenu openMenu={this.openMegamenu} opened={this.state.menuOpen} closeMenu={this.closeMenu} showHeader={this.state.showHeader} />
            <FixedHeader openMenu={this.openMenu} showHeader={this.state.showHeader} />
            <Switch location={location}>
              <Route exact path='/' render={ function(props) { return ( <Home {...props} show={this.endLoading} /> ) }.bind(this) } />
              <Route path='/:slug' render={ function(props) { return (
                <div className='wrapper'>
                  <Header openMenu={this.openMenu} />
                  <Switch location={location}>
                    <Route exact path='/novedades' render={ function(props) { return ( <Novedades {...props} show={this.endLoading} /> ) }.bind(this) } />
                    <Route exact path='/oferta-academica' render={ function(props) { return ( <MostrarOferta {...props} show={this.endLoading}  /> ) }.bind(this) } />
                    <Route exact path='/autoridades' render={ function() { return ( <Autoridades  {...props} show={this.endLoading} /> ) }.bind(this) } />
                    <Route exact path='/publicaciones/libros' render={ function() { return ( <Libros {...props} show={this.endLoading}  /> ) }.bind(this) } />
                    <Route exact path='/publicaciones/actas' render={ function() { return ( <Actas  {...props} show={this.endLoading} /> ) }.bind(this) } />
                    <Route exact path='/academica/tramites' render={ function() { return ( <Tramites  {...props} show={this.endLoading} /> ) }.bind(this) } />
                    <Route exact path='/plano' render={ function() { return ( <Plano  {...props} show={this.endLoading} /> ) }.bind(this) } />
                    <Route path='/:slug' render={ function(props) { return ( <CurzaWpNetwork {...props} show={this.endLoading} template={2} /> ) }.bind(this) } />
                  </Switch>
                </div>
              ) }.bind(this) }
              />
            </Switch>
            <Footer />
            <div id='main-megamenu'>
              <Megamenu open={this.state.megamenuOpen} close={this.closeMegamenu} closeMenu={this.closeMenu} items={this.state.megamenuData} showHeader={this.state.showHeader} />
            </div>
            </div>
    )}
            </Transition>
    </TransitionGroup>
          </div>
      </div>
  )
}}/>

    );
  }
}

export default App;
