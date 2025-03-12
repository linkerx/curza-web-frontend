import React from "react";
import "./styles.scss";
import WpMenu from "wp/menu";
import { Link } from "react-router-dom";
class Header extends React.Component {
  render() {
    return (
      <div id="header">
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
          <div className="wrapper-servicios">
            <div className="redes-sociales">
              <WpMenu location="redes-sociales-menu-location" />
            </div>
            <div className="telefonos">
              <i className="fas fa-phone"></i>
              <span>+54 - 2920 - 422921/423772</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
