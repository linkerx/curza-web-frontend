import React from 'react';
import './styles.scss';

export class Tabs extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      active: this.props.initial
    }
  }

  handleClick(bKey) {
    this.setState(
      state => ({active: bKey})
    )
  }

  render(){
    return(
      <div className="tabs">
        <div className="containerBtn">
          <ul>
            {
              React.Children.map(this.props.children, child => {
                var liClass=""
                if (child.props.name === this.state.active) {
                  liClass="active"
                }
                return (
                  <li 
                    key={child.props.name} 
                    className={liClass}
                    onClick={() => this.handleClick(child.props.name)}>
                      <div className="title">{child.props.title}</div>
                      <div className="subtitle">{child.props.subtitle}</div>
                  </li>
               )
              })
            }
          </ul>
        </div>
        <div className="tabContent">
          {
            React.Children.map(this.props.children, child => {
              if (child.props.name === this.state.active) {
                return child
              }
            })
          }
        </div>
        
      </div>
    )
  }
}

export class Tab extends React.Component{
  render(){
    var tabClass = 'tab '+this.props.name;
    if (typeof(this.props.defaultClass) !== "undefined"){ 
      tabClass +=" " + this.props.defaultClass 
    }
    return (
      <div className={tabClass}>
        {this.props.children}
      </div>
    )
  }
}