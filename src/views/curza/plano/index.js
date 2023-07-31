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
        if(placeText){
          placeText.style.background = "black"
          placeText.style.color = "white"
          placeText.style.padding = "0.5em" 
          placeText.style.fontSize = "1.2em" 
        }
      })
      places.item(i).addEventListener('mouseout', (e) => {
        let placeName = e.target.getAttribute('name');
        let placeText = document.getElementById(placeName + "-text");
        if(placeText){
          placeText.style.background = ""
          placeText.style.color = ""
          placeText.style.padding = "" 
          placeText.style.fontSize = "" 
        }
      })

    }
  }

  setInitSize(svg){
    let sectionSize = document.getElementById('section-wrapper').clientWidth;
    this.setSize(svg, sectionSize - 200);
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
              <h2>Lugares</h2>
              <ul>
                {PlacesData.map((placeType, indexTypes) => {
                  return(
                    <div key={indexTypes}>
                      <h3 className='place-type-title'>{placeType.type}</h3>
                      {
                        placeType.data.map((place, index) => {
                          return (
                              <li className='place-type-li' key={index} id={place.id + "-text"}>{place.name}</li>
                          )
                        })
                      }
                    </div>
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
