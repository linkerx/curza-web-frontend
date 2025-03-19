import React, { Component } from "react";
import WpApi from "wp/api"; // Importa el módulo para llamar a la API
import Menu from "../menu"; // Importa el componente Menu
import "./styles.scss";

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: null, // Controla qué menú está activo
      menu: null, // Almacena los items del menú obtenidos de la API
    };
    this.updateItems = this.updateItems.bind(this); // Bind the method to the component instance
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
                  className="menu-item"
                  onClick={() => this.handleMenuClick(menuItem.title)}
                >
                  {menuItem.title}
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
