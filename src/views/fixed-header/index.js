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
            <img src="/images/CURZAS.png" alt="Logo UNCo" />
          </Link>
        </div>
        <MainMenu />
      </div>
    );
  }
}

export default FixedHeader;
