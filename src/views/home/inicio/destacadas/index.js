import React from "react";
import Slider from "wp/network/slider-featured";
require("./styles.scss");

function Destacadas() {
  return (
    <div className="destacadas">
      <img
        src="./path1.png"
        alt="Imagen destacada"
        className="imagen-encabezado"
      />
      <Slider template={3} showContent="true" />
    </div>
  );
}

export default Destacadas;
