import React, { Component } from 'react'
import './styles.scss'
class Filter extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      text:  "",
    }
  }

  handleChange = (e) => {
    /*this.setState({
      text: e.target.value
    })*/
    this.props.onChange(e.target.value)
  }
  

  render() {
    return (
      <div className="searcher">
        <p>Buscar: </p>
        <input type="text" id="filter" 
          value={this.props.text} 
          onChange={this.handleChange}/>
      </div>
    )
  }
}

export default Filter;