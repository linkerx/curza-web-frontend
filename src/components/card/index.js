import React from 'react';
import './styles.scss';

const Card = props => (
  
  <div  className={`card ${props.classCard} ${props.classTop}`}>
    { //imagen 
    
      props.img ? 
      <img src={props.img}></img> 
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
    { //boton de leer más
      props.readMore ? 
      <div className="readMore"><a href={props.readMore}>Leer más</a></div> 
      : 
      null 
    }
    { //botones de modalidades
      props.icons ? 
      <div className="icons">
        {props.icons.map((icon,index) => {
              return (
                 <p key={index}>{icon}</p>
              )
        })}
      </div>
      :
      null
    }
        
  </div>

);

export default Card;

