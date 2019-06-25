import React from 'react';
import './styles.scss';

function MenuTrigger(props) {
  return (
    <div className='close-menu-btn'>
      <div onClick={props.closeMenu}><i className='fas fa-times'></i></div>
    </div>
  )
}

export default MenuTrigger;
