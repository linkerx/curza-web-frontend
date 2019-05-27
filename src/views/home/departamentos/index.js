import React from 'react';
import './styles.scss';
import WpMenu from 'wp/menu';

class HomeDepartamentos extends React.Component {

   render(){
    return(
      <section id='home-departamentos'>
        <div className='wrapper-central'>
          <h1>Departamentos</h1>
          <WpMenu location='deptos-menu-location' action={() => this.props.closeMenu()}/>
        </div>
      </section>
    )
  }
}

export default HomeDepartamentos;
