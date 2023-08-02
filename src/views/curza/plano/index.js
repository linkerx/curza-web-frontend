import React from 'react';
import './styles.scss';
import PlacesData from './data.json';
import { ReactSVG } from 'react-svg'

class Plano extends React.Component {

  constructor(props) {
    super(props);
    this.svg = null;
    this.init = this.init.bind(this);
    this.searchByEvent = this.searchByEvent.bind(this);
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
    for (let place of places) {
      place.addEventListener('mouseover', (e) => {
        let placeName = e.target.getAttribute('name');
        let placeText = document.getElementById(placeName + "-text");
        let searchedPlace = this.searchById(placeName);
        searchedPlace && this.showSearched([searchedPlace]);
        if(placeText){
          placeText.style.background = "black"
          placeText.style.color = "white"
          placeText.style.padding = "0.5em" 
          placeText.style.fontSize = "1.2em" 
        }
      })
      place.addEventListener('mouseout', (e) => {
        let placeName = e.target.getAttribute('name');
        let placeText = document.getElementById(placeName + "-text");
        this.searchByName('')
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
    for (let textItem of textItems) {
      textItem.addEventListener('mouseover', (e) => {
        let placeName = e.target.getAttribute('name');
        let place = this.getPlaceByName(placeName)
        if(place){
          this.rmColorToPlaces();
          place.style.fill = "#F57C00";
        }
      })
      textItem.addEventListener('mouseout', (e) => {
        let placeName = e.target.getAttribute('name');
        let place = this.getPlaceByName(placeName)
        if(place){
          this.giveBackColorToPlaces()
        }
      })
      if(textItem.dataset.url){
        textItem.addEventListener('click', (e) => {
          console.log('redirect', textItem.dataset.url)
          // TODO - Redirect on ckick
          // redirect
        })

      }

    }
  }

  searchByEvent(e){
    this.searchByName(e.target.value);
  }

  searchByName(name) {
    const listItems = document.getElementsByClassName('place-type-li');
    let finded = [];
    for (let listItem of listItems) {
      if(listItem.dataset.name.includes(name)) {
        finded.push(listItem)
      }
    }
    this.showSearched(finded);
  }

  showSearched(finded){
    console.log(finded)
    const listItems = document.getElementsByClassName('place-type-li');
    for (let listItem of listItems) {
      listItem.setAttribute('hidden', true)
    }
    finded.forEach(element => {
      element.removeAttribute('hidden')
    });
  }

  searchById(id) {
    const listItems = document.getElementsByClassName('place-type-li');
    for (let listItem of listItems) {
      if(listItem.attributes.name.value == id) {
        return listItem;
      }
    }
    return false;
  }

  getPlaceByName(name) {
    for (let place of this.places) {
      if (place.getAttribute('name') == name) {
        return place;
      }
    }
  }

  setColorToPlaces() {
    for (let place of this.places) {
      place.setAttribute('color', place.style.fill)
    }
  }

  rmColorToPlaces() {
    for (let place of this.places) {
      place.setAttribute('color', place.style.fill)
      place.style.fill = 'white';
    }
  }
  
  giveBackColorToPlaces() {
    for (let place of this.places) {
      place.style.fill = place.getAttribute('color');
    }
  }


  setInitSize(){
    let sectionSize = document.getElementById('section-wrapper').clientWidth;
    let space = 0;
    if (window.innerWidth > 640){
      space = 200;
    }
    this.setSize(sectionSize - space);
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
            </div>
            <div className='plano-aside'>
              <div className='places-list'>
                <div className='places-list-title'>
                  <h2>Lugares</h2>
                </div>
                <div className='search-box'>
                  <h4>Buscar: </h4>
                  <input id='search-input' type="text" onKeyUp={this.searchByEvent} />
                </div>
                <ul>
                  {PlacesData.map((placeType, indexTypes) => {
                    return(
                      <div key={indexTypes} className='places-group'>
                        <h3 className='place-type-title'>{placeType.type}</h3>
                        {
                          placeType.data.map((place, index) => {
                            return (
                                <li className='place-type-li' key={index} id={place.id + "-text"} name={place.id} data-url={place.url} data-name={place.name}><strong name={place.id}>{place.code} - </strong> {place.name}</li>
                            )
                          })
                        }
                      </div>
                    )
                  })}
                </ul>
              </div>
              <div className='btn-group'>
                <button id='btn-enlarge' className='btn'>+</button>
                <button id='btn-reduce' className='btn'>-</button>
              </div>
            </div>
          </div>
        </div>
      </section>  
    )
  }
}

export default Plano;
