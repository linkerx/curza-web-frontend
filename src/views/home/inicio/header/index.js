import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

class HomeHeader extends React.Component {
    render(){
        return(
            <div id='home-header'>
                <div className='fondo'></div>
                <div className='wrapper-central'>
                    <div className='logo'>
                        <img src='/images/logo_blanco.png' alt='Logo UNCo' />
                        <div className='logo-text'>
                            <div className='titulo'>C.U.R.Z.A.</div>
                            <div className='descripcion'>Centro Universitario Regional Zona Atlántica</div>
                            <div className='unco'>Universidad Nacional del Comahue</div>
                        </div>
                    </div>
                    <div className='wrapper-servicios'>
                        <div className='redes-sociales'>
                        <ul>
                            <li><Link to='https://facebook.com'><i className="fab fa-facebook-f"></i></Link></li>
                            <li><Link to='https://twitter.com'><i className="fab fa-twitter"></i></Link></li>
                        </ul>
                        </div>
                        <div className='telefonos'>
                                <i className='fas fa-phone'></i>
                                <span>+54 - 2920 - 422921/423772</span>
                        </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default HomeHeader;