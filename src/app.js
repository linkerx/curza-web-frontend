import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Transition, TransitionGroup } from "react-transition-group";
import FixedHeader from "views/fixed-header";
import Footer from "views/footer";
import Novedades from "views/curza/novedades";
import Autoridades from "views/curza/autoridades";
import MostrarOferta from "views/curza/oferta-academica/mostrarOferta";
import Libros from "views/curza/publicaciones/libros";
import Actas from "views/curza/publicaciones/actas";
import Tramites from "views/curza/tramites";
import Horarios from "views/curza/horarios";
import Home from "views/home";
import CurzaWpNetwork from "components/network";
import RouterCurzaCms from "components/curza/routerCms";
import "styles/main.scss";
import "styles/transition.scss";
import Plano from "views/curza/plano";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showHeader: false,
      transClass: "inicial",
    };

    this.endLoading = this.endLoading.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    if (window.scrollY > 100) {
      this.setState({
        showHeader: true,
      });
    } else {
      this.setState({
        showHeader: false,
      });
    }
  }

  endLoading() {
    this.setState(function () {
      return { loading: false };
    });
  }

  transOnExit() {
    this.setState({ transClass: "trans-exit" });
  }

  transOnExited() {
    window.scrollTo(0, 0);
    this.setState({ transClass: "trans-exited" });
  }

  render() {
    return (
      <Route
        render={({ location }) => {
          const { key } = location;

          return (
            <div className="app">
              <Route
                path="/cms"
                render={function (props) {
                  return <RouterCurzaCms {...props} />;
                }}
              />
              <div id="main-wrapper">
                <TransitionGroup component={null}>
                  <Transition
                    key={key}
                    appear={true}
                    onExit={() => this.transOnExit()}
                    onExited={() => this.transOnExited()}
                    timeout={{ appear: 2000, enter: 2500, exit: 1500 }}
                  >
                    {(state) => (
                      <div id="transition" className={this.state.transClass}>
                        <div id="fondo-transition"></div>
                        <FixedHeader showHeader={this.state.showHeader} />
                        <Switch location={location}>
                          <Route
                            exact
                            path="/"
                            render={function (props) {
                              return <Home {...props} show={this.endLoading} />;
                            }.bind(this)}
                          />
                          <Route
                            path="/:slug"
                            render={function (props) {
                              return (
                                <div className="wrapper">
                                  <Switch location={location}>
                                    <Route
                                      exact
                                      path="/novedades"
                                      render={function (props) {
                                        return (
                                          <Novedades
                                            {...props}
                                            show={this.endLoading}
                                          />
                                        );
                                      }.bind(this)}
                                    />
                                    <Route
                                      exact
                                      path="/oferta-academica"
                                      render={function (props) {
                                        return (
                                          <MostrarOferta
                                            {...props}
                                            show={this.endLoading}
                                          />
                                        );
                                      }.bind(this)}
                                    />
                                    <Route
                                      exact
                                      path="/autoridades"
                                      render={function () {
                                        return (
                                          <Autoridades
                                            {...props}
                                            show={this.endLoading}
                                          />
                                        );
                                      }.bind(this)}
                                    />
                                    <Route
                                      exact
                                      path="/publicaciones/libros"
                                      render={function () {
                                        return (
                                          <Libros
                                            {...props}
                                            show={this.endLoading}
                                          />
                                        );
                                      }.bind(this)}
                                    />
                                    <Route
                                      exact
                                      path="/publicaciones/actas"
                                      render={function () {
                                        return (
                                          <Actas
                                            {...props}
                                            show={this.endLoading}
                                          />
                                        );
                                      }.bind(this)}
                                    />
                                    <Route
                                      exact
                                      path="/academica/tramites"
                                      render={function () {
                                        return (
                                          <Tramites
                                            {...props}
                                            show={this.endLoading}
                                          />
                                        );
                                      }.bind(this)}
                                    />
                                    <Route
                                      exact
                                      path="/bedelia/horarios"
                                      render={function () {
                                        return (
                                          <Horarios
                                            {...props}
                                            show={this.endLoading}
                                          />
                                        );
                                      }.bind(this)}
                                    />
                                    <Route
                                      exact
                                      path="/plano"
                                      render={function () {
                                        return (
                                          <Plano
                                            {...props}
                                            show={this.endLoading}
                                          />
                                        );
                                      }.bind(this)}
                                    />
                                    <Route
                                      path="/:slug"
                                      render={function (props) {
                                        return (
                                          <CurzaWpNetwork
                                            {...props}
                                            show={this.endLoading}
                                            template={2}
                                          />
                                        );
                                      }.bind(this)}
                                    />
                                  </Switch>
                                </div>
                              );
                            }.bind(this)}
                          />
                        </Switch>
                        <Footer />
                      </div>
                    )}
                  </Transition>
                </TransitionGroup>
              </div>
            </div>
          );
        }}
      />
    );
  }
}

export default App;
