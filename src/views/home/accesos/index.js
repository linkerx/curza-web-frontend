import React from "react";
import WpMenu from "wp/menu";
import "./styles.scss";

class HomeAccesos extends React.Component {
  render() {
    return (
      <section id="home-accesos">
        <h1>Accesos</h1>
        <WpMenu location="accesos-menu-location" />
      </section>
    );
  }
}

export default HomeAccesos;
