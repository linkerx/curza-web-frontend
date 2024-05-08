import React from 'react';
import { postResponse } from 'components/forms/api';
import './styles.scss';

class MesaExtraordinariaForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: '',
            second: '',
            file: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.sendResponse = this.sendResponse.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        })
const element = document.getElementById('file')
const file = element.files[0]
        console.log(this.state)
        console.log(file)
    }

    uploadFile(event){
        const value = event.target.files[0];
        const name = event.target.name;
    console.log(value)
        this.setState({
            [name]: value
        })


    }

    sendResponse(){
        const formData = new FormData();
        formData.append('entry.41901762', this.state.first)
        formData.append('entry.305561848', 'Opción 2')
        formData.append('entry.1559469955', this.state.file, this.state.file.name)
        postResponse('1FAIpQLSeaWn6XbaxQGrsSk4qSWJL4eINBEFv0mrUFn5zZFmTTWQQ3ow', formData)
    }

    render() {
        return (
            <section id='mesa-extraordinaria-form'>
                <form action="">
                    <label htmlFor="first">First
                    <input name='first' onChange={this.handleChange} type="text" /></label>
                  <label htmlFor="file">File
                    <input id="file" name='file' onChange={this.uploadFile} type="file" /></label>

                </form>
                <button onClick={this.sendResponse}>enviar</button>
             </section>
        )
    }
}

export default MesaExtraordinariaForm;
