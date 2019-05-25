import React from 'react';
import './styles.scss';

function MenuTrigger(props) {
  return (
    <div className='close-menu-btn'>
      <button onClick={props.closeMenu}><i className='fas fa-times'></i> /></button>
    </div>
  )
}

export default MenuTrigger;
