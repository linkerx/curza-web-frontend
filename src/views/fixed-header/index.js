import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

class FixedHeader extends React.Component {
  render() {
    let headerClass = "hidden";
    if (this.props.showHeader) {
      headerClass = "visible";
    }

    return (
      <div id="fixed-header" className={headerClass}>
        <div className="logo">
          <Link to="/">
            <img src="/images/logo_blanco.png" alt="Logo UNCo" />
          </Link>
        </div>
      </div>
    );
  }
}

export default FixedHeader;
