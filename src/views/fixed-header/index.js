import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import MainMenu from "../main-menu";
class FixedHeader extends React.Component {
  render() {
    let headerClass = "visible";

    return (
      <div id="fixed-header" className={headerClass}>
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
            </div>
        </div>
        <MainMenu />
      </div>
    );
  }
}

export default FixedHeader;
