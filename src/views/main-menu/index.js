import React, { Component } from "react";
import Menu from "../menu"; // Asegúrate de que la ruta sea correcta
import "./styles.scss";

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: null, // Controla qué menú está activo
    };
  }

  handleMenuClick = (menuName) => {
    // Si el menú ya está abierto, lo cerramos; si no, lo abrimos
    this.setState((prevState) => ({
      activeMenu: prevState.activeMenu === menuName ? null : menuName,
    }));
  };

  render() {
    const { activeMenu } = this.state;

    return (
      <div className="main-menu-container">
        <nav className="main-menu">
          <ul className="menu-list">
            <li
              className="menu-item"
              onClick={() => this.handleMenuClick("estudiar")}
            >
              Estudiar en la UNRN
            </li>
            <li
              className="menu-item"
              onClick={() => this.handleMenuClick("inscripcion")}
            >
              Inscripción 2025
            </li>
            <li
              className="menu-item"
              onClick={() => this.handleMenuClick("vida")}
            >
              Vida Estudiantil
            </li>
            <li
              className="menu-item"
              onClick={() => this.handleMenuClick("graduados")}
            >
              Graduados
            </li>
          </ul>
        </nav>

        {/* Mostrar el componente Menu si activeMenu no es null */}
        {activeMenu && <Menu menuName={activeMenu} />}
      </div>
    );
  }
}

export default MainMenu;
