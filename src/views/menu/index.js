import React, { Component } from "react";
import { NavLink } from "react-router-dom"; // Importa NavLink para los enlaces
import "./styles.scss";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true, // Controla si el menú está abierto o cerrado
    };
  }

  // Cierra el menú
  closeMenu = () => {
    this.setState({ isOpen: false });
    if (this.props.closeMenu) {
      this.props.closeMenu(); // Llama a la función closeMenu de MainMenu si existe
    }
  };

  render() {
    const { menuName, items } = this.props;
    const { isOpen } = this.state;

    return (
      <div className={`dropdown-menu ${isOpen ? "open" : ""}`}>
        <ul>
          {items &&
            items.map((item) => (
              <li key={item.id}>
                {item.url === "/" ? ( // Si la URL es "/", no es un enlace, sino un dropdown
                  <button onClick={() => this.closeMenu()}>{item.title}</button>
                ) : (
                  <NavLink to={item.url} onClick={() => this.closeMenu()}>
                    {item.title}
                  </NavLink>
                )}
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default Menu;
