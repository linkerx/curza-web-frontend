import React from 'react';
import WpApi from 'wp/api';
import './styles.scss';

class Libros extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items: null
    }
    this.updateItems = this.updateItems.bind(this);
  }

  componentDidMount(){
    this.updateItems(currentPage);
  }

  render(){
    return(
      <section id='libros'>
        <header>
          <div className='fondo'></div>
          <h1>Libros</h1>
        </header>
        <ul id='lista-libros'>

        </ul>
      </section>
    )
  }
}

export default Libros;
