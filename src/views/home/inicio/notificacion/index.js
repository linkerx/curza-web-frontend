import React from 'react';
import './styles.scss';

class Notificacion extends React.Component {
    render() {
        return (
            <div className='notificacion'>
                <a href='/examenes-virtuales'>IMPORTANTE: Información sobre mesas de exámen virtuales</a>
            </div>
        )
    }
}

export default Notificacion;