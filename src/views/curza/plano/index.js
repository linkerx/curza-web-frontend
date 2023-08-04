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
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.goToUrl = this.goToUrl.bind(this);
  }

  init(svg){
    this.svg = svg;
    this.places = this.svg.getElementsByClassName('place');
    this.setColorToPlaces();
    this.setInitSize();
    this.mapPlacesHover();
    this.listItemsHover();
  }

  mapPlacesHover() {
    const places = this.svg.getElementsByClassName('place');
    //TODO - zoomin keyboard
    document.addEventListener('keyup', (e) => {
      let key = e.which || e.keyCode;
      console.log(key);
      if(key === 171){
        this.zoomIn();
      }
    })
    for (let place of places) {
      let click = false;
      place.addEventListener('click', (e) => {
        let placeName = e.target.getAttribute('name');
        let placeText = document.getElementById(placeName + "-text");
        if(placeText){
          click = true;
        }
      })

      place.addEventListener('mouseover', (e) => {
        let placeName = e.target.getAttribute('name');
        let placeText = document.getElementById(placeName + "-text");
        let searchedPlace = this.searchById(placeName);
        searchedPlace && this.showSearched([searchedPlace]);
        this.clearSearchInput();
        if(placeText){
          click = false;
          this.hiddePlacesTitles(true);
          placeText.style.background = "#F57C00"
          placeText.style.color = "white"
          placeText.style.padding = "0.5em" 
          placeText.style.fontSize = "1.2em" 
        }
      })

      place.addEventListener('mouseout', (e) => {
        if(!click){
          let placeName = e.target.getAttribute('name');
          let placeText = document.getElementById(placeName + "-text");
          this.searchByName('')
          if(placeText){
            this.hiddePlacesTitles(false);
            this.cleanListStyles(); 
          }
        }
      })
    }
  }

  cleanListStyles() {
    const textItems = document.getElementsByClassName('place-type-li');
    for (let textItem of textItems) {
      textItem.style.background = ""
      textItem.style.color = ""
      textItem.style.padding = "" 
      textItem.style.fontSize = "" 
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


    }
  }

  searchByEvent(e){
    this.searchByName(e.target.value);
  }

  searchByName(name) {
    const listItems = document.getElementsByClassName('place-type-li');
    let finded = [];
    for (let listItem of listItems) {
      if(listItem.dataset.name.toUpperCase().includes(name.toUpperCase())) {
        finded.push(listItem)
      }
    }
    this.showSearched(finded);
  }

  showSearched(finded){
    const listItems = document.getElementsByClassName('place-type-li');
    for (let listItem of listItems) {
      listItem.setAttribute('hidden', true)
    }
    finded.forEach(element => {
      element.removeAttribute('hidden')
    });
  }

  hiddePlacesTitles(hidde) {
    const titles = document.getElementsByClassName('place-type-title');
    for (let title of titles){
      if(hidde){
        title.setAttribute('hidden', true);
      } else {
        title.removeAttribute('hidden')
      }
    }
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
    let planoContainer = document.getElementById('plano-box');
    let planoAside = document.getElementById('plano-aside');
    let btnBox = document.getElementById('btn-box');
    let space = 0;
    if (window.innerWidth > 640){
      space = 250;
    }
    let asideSize = space;
    if(!space){
      asideSize = sectionSize;
      planoAside.style.margin = 0;
      planoAside.style.marginTop = "1em";
      btnBox.style.right = 0;
      btnBox.style.margin = '1em';
    }
    planoAside.style.width = asideSize + "px";
    this.setSize(sectionSize - space);
    planoContainer.style.width = (sectionSize - space) + "px";
    planoContainer.style.height = (sectionSize - space) + "px";
  }

  setSize(width){
    this.svg.setAttribute('width', width);
    this.svg.setAttribute('height', width);
  }

  zoomIn(){
    let width = parseInt(this.svg.getAttribute('width'));
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        width += 1;
        this.setSize(width);
      }, i * 3)
    }
  }

  zoomOut(){
    let width = parseInt(this.svg.getAttribute('width'));
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        width -= 1;
        this.setSize(width);
      }, i * 3)
    }
  }

  goToUrl(e){
    let textItem = e.target;
    if(textItem.dataset.url){
      this.props.history.push(textItem.dataset.url);
    }
  }

  clearSearchInput() {
    document.getElementById('search-input').value = '';
  }

  render(){
    return(
      <section id='plano'>
        <div id='section-wrapper' className='wrapper-central'>
          <h1>Plano Curza</h1>
          <div className='flex-container'>
            <div id='plano-box'>
              <div id='btn-box' className='btn-group' title='Zoom'>
                <button id='btn-enlarge' className='btn' onClick={this.zoomIn}><i className='fas fa-plus'></i></button>
                <button id='btn-reduce' className='btn' onClick={this.zoomOut}><i className='fas fa-minus'></i></button>
              </div>
              <ReactSVG id='plano-container' src='images/planoCurza.svg' afterInjection={this.init}/>
            </div>
            <div id='plano-aside' className='plano-aside'>
              <div className='places-list'>
                <div className="places-list-header">
                  <div className='places-list-title'>
                    <h2>Lugares</h2>
                  </div>
                  <div className='search-box'>
                    <h4>Buscar: </h4>
                    <input id='search-input' type="text" onKeyUp={this.searchByEvent} />
                  </div>
                </div>
                <ul>
                  {PlacesData.map((placeType, indexTypes) => {
                    return(
                      <div key={indexTypes} className='places-group'>
                        <h3 className='place-type-title'>{placeType.type}</h3>
                        {
                          placeType.data.map((place, index) => {
                            return (
                                <li className='place-type-li'
                                  key={index} 
                                  id={place.id + "-text"} 
                                  name={place.id} 
                                  data-url={place.url} 
                                  data-name={place.name}
                                  onDoubleClick={this.goToUrl}
                                  title={place.url && 'Doble Click para más información'}
                                  >
                                    <strong name={place.id}>{place.code} - </strong> {place.name}
                                </li>
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
        </div>
      </section>  
    )
  }
}

export default Plano;
