import React from 'react';
import WpApi from 'wp/api';
import WpSite from 'wp/site';
import WpListItem from 'wp/list-item';
import './styles.scss';

class Actas extends React.Component {

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
      type: 'acta',
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
        <section id='actas'>
          <header>
            <div className='fondo'></div>
            <h2>Actas de Congresos y Jornadas</h2>
          </header>
          <div className='lista-actas'>
          {
            this.state.items.map(function (item, index) {
              return (<WpListItem key={item.id} item={item} site='publicaciones' />)
            }.bind(this))
          }
          </div>
        </section>
      </WpSite>
      }
      </div>
    )
  }
}

export default Actas;
