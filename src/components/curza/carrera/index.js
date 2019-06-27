import React from 'react';

class CurzaCarrera extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            carrera: null,
            planes: null,
            selectedPlan: null,
            asignaturas: null,
        }
    }

    render(){
        return (
            <section id='curza-carrera'>Pagina de Carrera</section>
        )
    }
}

export default CurzaCarrera;