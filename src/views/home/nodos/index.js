import React from 'react';
import './styles.scss';

class HomeNodos extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    return(
      <section id='home-nodos'>
        <div className='wrapper-central'>
            <div className="image-container">
              <img id='nodos-curza' src='images/nodosCurzas.jpeg'/>
            </div>
        </div>
      </section>  
    )
  }
}

export default HomeNodos;
