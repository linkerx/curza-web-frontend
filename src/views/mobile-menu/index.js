import React, { useState, useEffect } from "react";
import WpApi from "wp/api";
import { NavLink } from "react-router-dom";
import "./styles.scss";

const MobileMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const opts = { location: "main-menu-location" };
        const menu = await WpApi.getMenuIdByLocation(opts);
        setMenuItems(menu.items || []);
      } catch (err) {
        console.error("Error loading mobile menu", err);
      }
    };
    fetchMenu();
  }, []);

  const toggleSubMenu = (title) => {
    setOpenSubMenu((prev) => (prev === title ? null : title));
  };

  const closeMenu = () => {
    setOpen(false);
    setOpenSubMenu(null);
  };

  return (
    <div className="mobile-menu-wrapper">
      <button className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </button>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.children && item.children.length > 0 ? (
                <>
                  <span onClick={() => toggleSubMenu(item.title)}>
                    {item.title}
                  </span>
                  <ul
                    className={`sub-menu ${
                      openSubMenu === item.title ? "open" : ""
                    }`}
                  >
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <NavLink to={child.url} onClick={closeMenu}>
                          {child.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <NavLink to={item.url} onClick={closeMenu}>
                  {item.title}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
