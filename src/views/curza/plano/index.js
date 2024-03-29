import React from 'react';
import './styles.scss';
import PlacesData from './data.json';
import { ReactSVG } from 'react-svg'

class Plano extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      click: false
    }
    this.svg = null;
    this.init = this.init.bind(this);
    this.searchByEvent = this.searchByEvent.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.goToUrl = this.goToUrl.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.lock = this.lock.bind(this);
  }

  init(svg){
    this.svg = svg;
    this.places = this.svg.getElementsByClassName('place');
    this.setColorToPlaces();
    this.setInitSize();
    this.mapPlacesHover();
    this.listItemsHover();
  }

  setClick(value){
    this.setState({click: value});
  }

  setListSelectedStyle(placeName, placeText){
          let searchedPlace = this.searchById(placeName);
          searchedPlace && this.showSearched([searchedPlace]);
          this.clearSearchInput();
          if(placeText){
            this.setClick(false);
            this.hiddePlacesTitles(true);
            placeText.style.background = "#F57C00"
            placeText.style.color = "white"
            placeText.style.padding = "0.5em" 
            placeText.style.fontSize = "1.2em" 
          }

  }

  mapPlacesHover() {
    const places = this.svg.getElementsByClassName('place');

    for (let place of places) {
      place.addEventListener('mouseover', (e) => {
        if(!this.state.click){
          let placeName = e.target.getAttribute('name');
          let placeText = document.getElementById(placeName + "-text");
          this.setListSelectedStyle(placeName, placeText);
        }
      })

      place.addEventListener('mouseout', (e) => {
        if(!this.state.click){
          let placeName = e.target.getAttribute('name');
          let placeText = document.getElementById(placeName + "-text");
          this.searchByName('')
          if(placeText){
            this.hiddePlacesTitles(false);
            this.cleanListStyles(); 
          }
        }
      })

      place.addEventListener('click', (e) => {
        console.log(this.state.click)
        let placeName = e.target.getAttribute('name');
        let placeText = document.getElementById(placeName + "-text");
         if(placeText){
           if(this.state.click){
              this.setListSelectedStyle(placeName, placeText)
            }else{
              this.setClick(true);
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

  zoomWithKeyboard(){
    //TODO - zoomin keyboard
    document.addEventListener('keyup', (e) => {
      let key = e.key;
      if(key === '+'){
        this.zoomIn();
      }
      if(key === '-'){
        this.zoomOut();
      }
    })
    this.svg.addEventListener('wheel', (e) => {
      let wheel = e.deltaY;
      console.log(wheel);
      if(wheel > 0){
        this.zoomIn();
      }
      if(wheel < 0){
        this.zoomOut();
      }
    })
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

  resetSearch(){
    this.setClick(false);
    this.clearSearchInput();
    this.hiddePlacesTitles(false);
    this.cleanListStyles();
    this.searchByName('');
  }
  
  lock(){
    this.setClick(true);
  }

  render(){
    return(
      <section id='plano'>
        <div id='section-wrapper' className='wrapper-central'>
          <h1>Plano Curza</h1>
          <div className='flex-container'>
            <div id='plano-box'>
              <div id='btn-box' className='btn-group'>
                <button id='btn-enlarge' className='btn btn-sm' onClick={this.zoomIn} title="Zoom In"><i className='fas fa-plus'></i></button>
                <button id='btn-reduce' className='btn btn-sm' onClick={this.zoomOut} title="Zoom Out"><i className='fas fa-minus'></i></button>
                {this.state.click ? 
                  <button className='btn btn-sm' onClick={this.resetSearch} title="Desbloquear"><i className='fas fa-lock'></i></button>
                  :
                  <button className='btn btn-sm' onClick={this.lock} title="Bloquear"><i className='fas fa-unlock'></i></button>
                }
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
                    <button id='reset-btn' className='btn btn-sm btn-danger' title='Reset' onClick={this.resetSearch}><i className='fas fa-window-close'></i></button>
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
