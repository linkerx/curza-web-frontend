import React from 'react';
import WpApi from 'wp/api';
import WpSite from 'wp/site';
import './styles.scss';

class Libros extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items: null,
      site_data: null
    }
    this.updateItems = this.updateItems.bind(this);
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
      site: 'publicaciones',
      type: 'libro',
      queries: ['_embed'],
      debug: false
    }

    WpApi.getList(opts)
    .then(function(response_items) {
      WpApi.getSite({name:'publicaciones'})
      .then(function(main_site){
        this.setState({
            items: response_items.data,
            site_data: main_site
        });
      }.bind(this));
    }.bind(this));
  }

  render(){
    return(
      <div>
      {this.state.site_data &&
      <WpSite site='publicaciones' site_data={this.state.site_data}>
        <section id='libros'>
          <header>
            <div className='fondo'></div>
            <h2>Libros</h2>
          </header>
          <ul id='lista-libros'>
            { this.state.items && this.state.items.map((item,index)=>{
                var item_image = "";
                var item_image_alt = item.title.rendered;
                if(item._embedded && item._embedded['wp:featuredmedia'] && item._embedded['wp:featuredmedia'][0].media_details){
                  var item_image = item._embedded['wp:featuredmedia'][0].source_url;
                  var item_image_alt = item._embedded['wp:featuredmedia'][0].alt_text;
                }
                return (
                <li key={index}>
                  <a target='_blank' href={item.pdf.url} >
                    <img src={item_image} alt={item_image_alt} />
                    <h3>{item.title.rendered}</h3>
                  </a>
                </li>
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

export default Libros;
