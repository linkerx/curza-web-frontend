import React, { Component } from "react";
import WpApi from "wp/api";
import Menu from "../menu";
import { NavLink } from "react-router-dom";
import "./styles.scss";

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: null,
      menu: null,
    };
    this.menuRef = React.createRef(); // Agregar una referencia
    this.updateItems = this.updateItems.bind(this);
  }

  componentDidMount() {
    this.updateItems();
    document.addEventListener("click", this.handleOutsideClick); // Escuchar clics fuera del menú
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick); // Limpiar el eventListener
  }

  handleOutsideClick = (e) => {
    if (this.menuRef.current && !this.menuRef.current.contains(e.target)) {
      this.setState({ activeMenu: null }); // Cerrar el submenú si se hace clic fuera
    }
  };

  updateItems() {
    this.setState({
      menu: null,
    });

    const opts = {
      location: "main-menu-location",
      debug: false,
    };

    WpApi.getMenuIdByLocation(opts)
      .then((menu) => {
        this.setState({
          menu: menu,
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

  isExternalLink(url) {
    return url.startsWith("http://") || url.startsWith("https://");
  }

  render() {
    const { activeMenu, menu } = this.state;
    const activeMenuItem = menu
      ? menu.items.find((item) => item.title === activeMenu)
      : null;
    const items = activeMenuItem ? activeMenuItem.children : null;

    return (
      <div className="main-menu-container" ref={this.menuRef}>
        {" "}
        {/* Referencia al contenedor */}
        <nav className="main-menu">
          <ul className="menu-list">
            {!menu ? (
              <li>Cargando menú...</li>
            ) : (
              menu.items.map((menuItem, index) => (
                <li
                  key={index}
                  className={`menu-item ${activeMenu === menuItem.title ? "active" : ""}`}
                >
                  {menuItem.children && menuItem.children.length > 0 ? (
                    <span onClick={() => this.handleMenuClick(menuItem.title)}>
                      {menuItem.title}
                    </span>
                  ) : this.isExternalLink(menuItem.url) ? (
                    <a
                      href={menuItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {menuItem.title}
                    </a>
                  ) : (
                    <NavLink to={menuItem.url} activeClassName="active" exact>
                      {menuItem.title}
                    </NavLink>
                  )}
                </li>
              ))
            )}
          </ul>
        </nav>
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
