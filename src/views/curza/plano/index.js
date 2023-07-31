import React from 'react';
import './styles.scss';
import PlacesData from './data.json';
import { ReactSVG } from 'react-svg'

class Plano extends React.Component {

  constructor(props) {
    super(props);
    this.svg = null;
    this.init = this.init.bind(this)
  }

  init(svg){
    this.svg = svg;
    this.places = this.svg.getElementsByClassName('place');
    this.setColorToPlaces();
    this.changeSize();
    this.setInitSize();
    this.mapPlacesHover();
    this.listItemsHover();
  }

  mapPlacesHover() {
    const places = this.svg.getElementsByClassName('place');
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

  listItemsHover() {
    const textItems = document.getElementsByClassName('place-type-li');
    for (let i = 0; i < textItems.length; i++) {
      textItems.item(i).addEventListener('mouseover', (e) => {
        let placeName = e.target.getAttribute('name');
        console.log(placeName);
        let place = this.getPlaceByName(placeName)
        if(place){
          this.rmColorToPlaces();
          place.style.fill = "#F57C00";
        }
      })
      textItems.item(i).addEventListener('mouseout', (e) => {
        let placeName = e.target.getAttribute('name');
        let place = this.getPlaceByName(placeName)
        if(place){
          this.giveBackColorToPlaces()
        }
      })

    }
  }

  getPlaceByName(name) {
    for (let i = 0; i < this.places.length; i++) {
      if (this.places.item(i).getAttribute('name') == name) {
        return this.places.item(i);
      }
    }
  }

  setColorToPlaces() {
    for (let i = 0; i < this.places.length; i++) {
      this.places.item(i).setAttribute('color', this.places.item(i).style.fill)
    }
  }

  rmColorToPlaces() {
    for (let i = 0; i < this.places.length; i++) {
      this.places.item(i).setAttribute('color', this.places.item(i).style.fill)
      this.places.item(i).style.fill = 'white';
    }
  }
  
  giveBackColorToPlaces() {
    for (let i = 0; i < this.places.length; i++) {
      this.places.item(i).style.fill = this.places.item(i).getAttribute('color');
    }
  }


  setInitSize(){
    let sectionSize = document.getElementById('section-wrapper').clientWidth;
    this.setSize(sectionSize - 200);
  }

  setSize(width){
    this.svg.setAttribute('width', width);
    this.svg.setAttribute('height', width);
  }

  changeSize(){
    document.getElementById('btn-enlarge').addEventListener('click', () => {
      let width = parseInt(this.svg.getAttribute('width'));
      width += 200;
      this.setSize(width)
    });

    document.getElementById('btn-reduce').addEventListener('click', () => {
      let width = parseInt(this.svg.getAttribute('width'));
      width -= 200;
      this.setSize(width)
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
                    <div key={indexTypes} className='places-group'>
                      <h3 className='place-type-title'>{placeType.type}</h3>
                      {
                        placeType.data.map((place, index) => {
                          return (
                              <li className='place-type-li' key={index} id={place.id + "-text"} name={place.id}><strong name={place.id}>{place.code} - </strong> {place.name}</li>
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
