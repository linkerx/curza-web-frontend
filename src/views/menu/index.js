import React, { Component } from "react";
import "./styles.scss";

class Menu extends Component {
  render() {
    const { menuName } = this.props;

    // Contenido del menú desplegable
    const menuContent = {
      estudiar: (
        <ul>
          <li>Carreras de Grado</li>
          <li>Carreras de Posgrado</li>
          <li>Cursos de Posgrado</li>
          <li>Ciclos de Complementación</li>
          <li>Educación Virtual</li>
          <li>Calendario Académico</li>
          <li>Autogestión (SIU Guarani)</li>
          <li>Normativas</li>
          <li>Contacto</li>
        </ul>
      ),
      inscripcion: (
        <ul>
          <li>Inscripción 2025</li>
          <li>Qué carreras estudiar</li>
          <li>Preguntas Frecuentes</li>
          <li>Guía para estudiantes</li>
          <li>Contacto</li>
        </ul>
      ),
      vida: (
        <ul>
          <li>Pasantías y Búsquedas</li>
          <li>Actividad Física y Deportes</li>
          <li>Beneficios y Descuentos</li>
          <li>Bibliotecas</li>
          <li>Tutores/as Pares</li>
          <li>Becas y Asignaciones</li>
          <li>Movilidad Estudiantil</li>
          <li>Actividades Culturales</li>
          <li>Universidad y Discapacidad</li>
          <li>Contacto</li>
        </ul>
      ),
      graduados: (
        <ul>
          <li>Bolsa de Trabajo y convocatorias</li>
          <li>Gestión de Títulos</li>
          <li>Posgrados</li>
          <li>Contacto</li>
        </ul>
      ),
    };

    return (
      <div className={`dropdown-menu ${menuName ? "open" : ""}`}>
        {menuContent[menuName]}
      </div>
    );
  }
}

export default Menu;
