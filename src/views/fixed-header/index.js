import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

class FixedHeader extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showHeader: false
    }
    this.handleScroll = this.handleScroll.bind(this);
  }
  
  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);  
  }

  handleScroll() {
    if(window.scrollY > 100){
      this.setState({
        showHeader: true
      });    
    } else {
      this.setState({
        showHeader: false
      })
    }
  }

  render(){

    let headerClass = 'hidden';
    if(this.state.showHeader){
      headerClass = 'visible';
    }

    return(
      <div id='fixed-header' className={headerClass}>
        <div className='logo'>
          <Link to='/'><img src='/images/logo_blanco.png' alt='Logo UNCo' /></Link>
        </div>
        <div className='menu-opener'>
            <i onClick={() => this.props.openMenu()} className='fas fa-bars'></i>
        </div>
      </div>
    );
  }
}

export default FixedHeader;
