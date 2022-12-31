import React from 'react';
import WpApi from 'wp/api';
import WpSite from 'wp/site';
import './styles.scss';

class Tramites extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items: null,
      site_data: null
    }
    this.updateItems = this.updateItems.bind(this);
    this.verTramite = this.verTramite.bind(this);
  }

  componentDidMount(){
    setTimeout(function(){this.props.show()}.bind(this), 3000);
    this.updateItems();
  }

  updateItems(){
    this.setState({
      items: null,
      site_data: null
    });
    
    var opts = {
      site: 'academica',
      type: 'tramite',
      queries: ['_embed'],
      debug: false
    }

    WpApi.getList(opts)
    .then(function(response_items) {
      WpApi.getSite({name:'academica'})
      .then(function(main_site){
        this.setState({
            items: response_items.data,
            site_data: main_site
        });
      }.bind(this));
    }.bind(this));
  }

  verTramite(index)
  {
    console.log(document.getElementById('tramite-content-'+index));
    const modal = document.getElementById('tramite-content-'+index);
    const closeBtn = document.getElementById('close-'+index);
    modal.style.display = 'block';
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    })
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  render(){
    return(
      <div>
      {this.state.site_data &&
      <WpSite site='academica' site_data={this.state.site_data}>
        <section id='tramites'>
          <header>
            <div className='fondo'></div>
            <h2>Trámites</h2>
          </header>
          <ul id='lista-tramites'>
            { this.state.items && this.state.items.map((item,index)=>{
                var item_image = "";
                var item_image_alt = item.title.rendered;
                if(item._embedded && item._embedded['wp:featuredmedia'] && item._embedded['wp:featuredmedia'][0].media_details){
                  var item_image = item._embedded['wp:featuredmedia'][0].source_url;
                  var item_image_alt = item._embedded['wp:featuredmedia'][0].alt_text;
                }
                return (
                  <div key={index}>
                    <li>
                      <h3>{item.title.rendered}</h3>
                      <button className='btn' onClick={() => {this.verTramite(index)}}>Más Información</button>
                    </li>
                    <div id={'tramite-content-'+index} className='modal'>
                      <div className='modal-content'>
                        <div className="modal-header">
                          <span id={'close-'+index} className="close">&times;</span>  
                          <h3>{item.title.rendered}</h3>
                        </div>
                        <div className="modal-body">
                          <div dangerouslySetInnerHTML={{ __html: item.content.rendered }} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </ul>
        </section>
      </WpSite>
      }
      </div>
    )
  }
}

export default Tramites;
