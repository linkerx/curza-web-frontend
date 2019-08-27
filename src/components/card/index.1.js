import React from 'react';
import './styles.scss';


export class Card extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: this.props.title,
      icons: this.props.icons,
      img: this.props.img,
      readMore: this.props.readMore
    }
  }

  handleClick(bKey) {
    if (!this.props.initial && this.state.active){
      this.setState(
        state => ({active: null})
      )
    }else{
      this.setState(
        state => ({active: bKey})
      )
    }
  }

  render(){
    return(
      <div className="card">
        
        { //imagen
          this.state.img ? 
          <img src={this.state.img}></img> 
          : 
          null 
        }

        { //titulo
          this.state.title ? 
          <h3>{this.state.title}</h3> 
          : 
          null 
        }
        
        <div className="descripcion">
          { //descripción
            React.Children.map(this.props.children, child => {
              return child
            })}
        </div>

        { //boton de leer más
          this.state.readMore ? 
          <div className="readMore"><a href={this.state.readMore}>Leer más</a></div> 
          : 
          null 
        }

        { //botones de modalidades
          this.state.icons ? 
          <div className="icons">
            {this.state.icons.map(icon => {
              return <p>{icon}</p>;
            })}
          </div>
          :
          null
        }
        
      </div>
    )
  }
}

