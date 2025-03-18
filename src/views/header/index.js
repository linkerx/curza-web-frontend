import React from "react";
import "./styles.scss";
import MainMenu from "../main-menu";
import { Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.headerRef = React.createRef(); // Crear una referencia para el header
  }

  render() {
    return (
      <div id="header" ref={this.headerRef}>
        <div className="fondo"></div>
        <div className="wrapper-central">
          <div className="logo">
            <Link to="/">
              <img src="/images/logo_blanco.png" alt="Logo UNCo" />
            </Link>
            <div className="logo-text">
              <Link to="/">
                <div className="titulo">C.U.R.Z.A.S.</div>
                <div className="descripcion">
                  Complejo Universitario Regional Zona Atlántica y Sur
                </div>
              </Link>
              <a
                href="https://www.uncoma.edu.ar/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="unco">Universidad Nacional del Comahue</div>
              </a>
            </div>
          </div>
        </div>
        <div>
          {/* Pasar la referencia del header como prop a MainMenu */}
          <MainMenu headerRef={this.headerRef} />
        </div>
      </div>
    );
  }
}

export default Header;
