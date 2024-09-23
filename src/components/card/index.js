import React from 'react';
import './styles.scss';

const Card = props => (
  
  <div  className={`card ${props.classCard} ${props.classTop}`}>
    { //imagen 
    
      props.img ? 
      <img src={props.img} alt="imagen de carrera" />
      : 
      null 
    }
    { //titulo
      props.title ? 
      <h3 className="titulo">{props.title}</h3> 
      : 
      null 
    }
    <div className="descripcion">
      { //descripción
        React.Children  && React.Children.count() >= 0 ?
        React.Children.map(props.children, child => {
          return child
        }) : null
      }
    </div>
    <div className="actions">
        { //boton de leer más
        
          props.readMore ? 
          <div className="btn" title="Leer más"><a href={props.readMore}><i className="fas fa-eye"></i></a></div> 
          : 
          null 
        }
        { //boton descarga del folleto
        
          props.folleto ? 
          <div className="btn" title="Descargar Información"><a href={props.folleto}><i className="fas fa-download"></i></a></div> 
          : 
          null 
        }
    </div>

    { //botones de modalidades
      props.icons ? 
      <div className="icons">
        {props.icons.map((icon,index) => {
              return (
                 <i className={icon.i} key={index}>
                    <div className="popover__content">
                     <p className="popover__message">{icon.text}</p>
                    </div>
                 </i>
              )
        })}
      </div>
      :
      null
    }
        
  </div>

);

export default Card;


