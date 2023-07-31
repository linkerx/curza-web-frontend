import React from 'react';
import './styles.scss';
import PlacesData from './data.json';
import { ReactSVG } from 'react-svg'

class Plano extends React.Component {

  constructor(props) {
    super(props);
    this.init = this.init.bind(this)
  }

  init(svg){
    this.changeSize(svg);
    this.setInitSize(svg)
    const places = svg.getElementsByClassName('place');
    for (let i = 0; i < places.length; i++) {
      places.item(i).addEventListener('mouseover', (e) => {
        let placeName = e.target.getAttribute('name');
        let placeText = document.getElementById(placeName + "-text");
        console.log(placeText);
        if(placeText){
          placeText.style.color = "red"
        }
      })
      places.item(i).addEventListener('mouseout', (e) => {
        let placeName = e.target.getAttribute('name');
        let placeText = document.getElementById(placeName + "-text");
        console.log(placeText);
        if(placeText){
          placeText.style.color = "black"
        }
      })

    }
  }

  setInitSize(svg){
    let sectionSize = document.getElementById('section-wrapper').clientWidth;
    this.setSize(svg, sectionSize - 100);
  }

  setSize(svg, width){
    svg.setAttribute('width', width);
    svg.setAttribute('height', width);
  }

  changeSize(svg){
    document.getElementById('btn-enlarge').addEventListener('click', () => {
      let width = parseInt(svg.getAttribute('width'));
      width += 200;
      this.setSize(svg, width)
    });

    document.getElementById('btn-reduce').addEventListener('click', () => {
      let width = parseInt(svg.getAttribute('width'));
      width -= 200;
      this.setSize(svg, width)
    });
  }

  render(){
    return(
      <section id='plano'>
        <div id='section-wrapper' className='wrapper-central'>
          <h1>Plano Curza</h1>
          <div className='flex-container'>
            <div>
              <ReactSVG id='plano-container' src='images/planoCurza.svg' afterInjection={this.init}/>
              <button id='btn-enlarge'>+</button>
              <button id='btn-reduce'>-</button>
            </div>
            <div className='places-list'>
              <h3>Lugares</h3>
              <ul>
                {PlacesData.map((place, index) => {
                  return (
                    <li key={index} id={place.id + "-text"}>{place.name}</li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>  
    )
  }
}

export default Plano;
