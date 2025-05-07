import React, { Component } from "react";
import WpApi from "wp/api";
import Menu from "../menu";
import { NavLink } from "react-router-dom";
import "./styles.scss";

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: null, // Controla qué menú está activo
      menu: null, // Almacena los items del menú obtenidos de la API
    };
    this.updateItems = this.updateItems.bind(this);
  }

  componentDidMount() {
    this.updateItems(); // Llama a la API para obtener los items del menú cuando el componente se monta
  }

  updateItems() {
    this.setState({
      menu: null, // Resetea el estado del menú antes de hacer la llamada a la API
    });

    const opts = {
      location: "main-menu-location",
      debug: false,
    };

    WpApi.getMenuIdByLocation(opts)
      .then((menu) => {
        this.setState({
          menu: menu, // Actualiza el estado con los items del menú obtenidos
        });
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }

  handleMenuClick = (menuName) => {
    this.setState((prevState) => ({
      activeMenu: prevState.activeMenu === menuName ? null : menuName,
    }));
  };

  // Función para determinar si un enlace es externo
  isExternalLink(url) {
    return url.startsWith("http://") || url.startsWith("https://");
  }

  render() {
    const { activeMenu, menu } = this.state;

    // Obtener los items del menú activo
    const activeMenuItem = menu
      ? menu.items.find((item) => item.title === activeMenu)
      : null;
    const items = activeMenuItem ? activeMenuItem.children : null;

    return (
      <div className="main-menu-container">
        <nav className="main-menu">
          <ul className="menu-list">
            {!menu ? (
              // Muestra un mensaje de carga si el menú no está cargado
              <li>Cargando menú...</li>
            ) : (
              // Renderiza los items del menú obtenidos de la API
              menu.items.map((menuItem, index) => (
                <li
                  key={index}
                  className={`menu-item ${
                    activeMenu === menuItem.title ? "active" : ""
                  }`}
                >
                  {/* Si el ítem tiene hijos, abre un submenú */}
                  {menuItem.children && menuItem.children.length > 0 ? (
                    <span onClick={() => this.handleMenuClick(menuItem.title)}>
                      {menuItem.title}
                    </span>
                  ) : // Si no tiene hijos, es un enlace directo
                  this.isExternalLink(menuItem.url) ? (
                    // Enlace externo: usa <a> con target="_blank" para abrir en una nueva pestaña
                    <a
                      href={menuItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {menuItem.title}
                    </a>
                  ) : (
                    // Enlace interno: usa NavLink
                    <NavLink to={menuItem.url} activeClassName="active" exact>
                      {menuItem.title}
                    </NavLink>
                  )}
                </li>
              ))
            )}
          </ul>
        </nav>

        {/* Mostrar el componente Menu si activeMenu no es null */}
        {activeMenu && (
          <Menu
            menuName={activeMenu}
            items={items}
            closeMenu={() => this.handleMenuClick(null)}
          />
        )}
      </div>
    );
  }
}

export default MainMenu;
