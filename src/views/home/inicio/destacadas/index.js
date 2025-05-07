import React from "react";
import Slider from "wp/network/slider-featured";
require("./styles.scss");

function Destacadas() {
  return (
    <div className="destacadas">
      <img src="/images/logo_blanco.png" alt="Logo UNCo" />
      <Slider template={3} showContent="true" />
    </div>
  );
}

export default Destacadas;
