import React from 'react';
import './styles.scss';
import { ReactSVG } from 'react-svg'

class Plano extends React.Component {

  constructor(props) {
    super(props);
    this.test = this.test.bind(this)
  }

  test(svg){
    this.changeSize(svg);
    const places = svg.getElementsByClassName('place');
    for (let i = 0; i < places.length; i++) {
      places.item(i).addEventListener('click', (e) => {
        console.log(e);
      })
    }
  }

  changeSize(svg){
    document.getElementById('btn-enlarge').addEventListener('click', () => {
      let width = parseInt(svg.getAttribute('width'));
      width += 200;
      svg.setAttribute('width', width);
      svg.setAttribute('height', width);
    });

    document.getElementById('btn-reduce').addEventListener('click', () => {
      let width = parseInt(svg.getAttribute('width'));
      width -= 200;
      svg.setAttribute('width', width);
      svg.setAttribute('height', width);
    });
  }

  render(){
    return(
      <section id='plano'>
        <div className='wrapper-central'>
          <h1>Plano Curza</h1>
          <ReactSVG id='plano-container' src='images/planoCurza.svg' afterInjection={this.test}/>
          <button id='btn-enlarge'>+</button>
          <button id='btn-reduce'>-</button>
        </div>
      </section>  
    )
  }
}

export default Plano;
