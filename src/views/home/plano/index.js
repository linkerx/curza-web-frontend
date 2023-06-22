import React from 'react';
import './styles.scss';
import { ReactSVG } from 'react-svg'

class HomePlano extends React.Component {

  constructor(props) {
    super(props);
    this.test = this.test.bind(this)
  }

  test(svg){
    const aulas = svg.getElementsByClassName('aula');
    for (let i = 0; i < aulas.length; i++) {
      aulas.item(i).addEventListener('click', (e) => {
        console.log(e);
      })
    }
  }

  render(){
    return(
      <section id='home-plano'>
        <div className='wrapper-central'>
          <h1>Plano Curza</h1>
          <ReactSVG src='images/planoCurza.svg' afterInjection={this.test}/>
        </div>
      </section>  
    )
  }
}

export default HomePlano;
