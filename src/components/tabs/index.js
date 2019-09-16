import React from 'react';
import './styles.scss';

export class Tabs extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      active: this.props.initial,
      close: this.props.close
    }
  }

  componentDidUpdate(){
    if (this.state.active === 'first'){
      this.props.children[0] ? 
        this.setState({
          active: this.props.children[0].props.name
        })
      : this.setState({
        active: null
      })
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
      <div className="tabs">
        <div className="containerBtn">
          <ul>
            {
              React.Children.map(this.props.children, child => {
                var liClass=""
                if (child && child.props.name === this.state.active) {
                  liClass="active"
                }
                
                return (
                  child ? 
                    <li 
                      key={ child ? child.props.name : null} 
                      className={liClass}
                      onClick={() => this.handleClick(child.props.name)}>
                        <div className="title">{child.props.title}</div>
                        <div className="subtitle">{child.props.subtitle}</div>
                        { liClass === "active" ?
                          <span className="fas fa-chevron-down down"></span>
                          :
                          <span className="fas fa-chevron-down up"></span>
                        }
                    </li> 
                  : null
                )
              })
            }
          </ul>
        </div>
        { this.state.active ?
          <div className="tabContent">
          {
            React.Children.map(this.props.children, child => {
              if (child && child.props.name === this.state.active) {
                return child
              }
            })
          }
          </div>
          :
          <div className={"tabContent hide"} >
          {
            
            React.Children.map(this.props.children, child => {
              if (child && child.props.name === this.state.active) {
                return child
              }
            })
          }
          </div>
        }
        
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