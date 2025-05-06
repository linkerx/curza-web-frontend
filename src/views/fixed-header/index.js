import React from "react";
import { Link } from "react-router-dom";
import MainMenu from "../main-menu";
import MobileMenu from "../mobile-menu";
import useWindowWidth from "../../hooks/useWindowWidth"; // Asegurate de poner bien la ruta
import "./styles.scss";

const FixedHeader = () => {
  const width = useWindowWidth();
  const isMobile = width < 750;

  return (
    <div id="fixed-header" className="visible">
      <div className="logo">
        <Link to="/">
          <img src="/images/CURZAS.png" alt="Logo UNCo" />
        </Link>
      </div>

      {isMobile ? <MobileMenu /> : <MainMenu />}
    </div>
  );
};

export default FixedHeader;
