import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
    this.menuRef = React.createRef(); // Añadimos referencia para el menú
  }

  closeMenu = () => {
    this.setState({ isOpen: false });
    if (this.props.closeMenu) {
      this.props.closeMenu();
    }
  };

  render() {
    const { menuName, items } = this.props;
    const { isOpen } = this.state;

    return (
      <div
        className={`dropdown-menu ${isOpen ? "open" : ""}`}
        ref={this.menuRef}
      >
        {" "}
        {/* Referencia al submenú */}
        <ul>
          {items &&
            items.map((item) => (
              <li key={item.id}>
                {item.url === "#" ? (
                  <button onClick={this.closeMenu}>{item.title}</button>
                ) : item.url.startsWith("http") ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={this.closeMenu}
                  >
                    {item.title}
                  </a>
                ) : (
                  <NavLink to={item.url} onClick={this.closeMenu}>
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
