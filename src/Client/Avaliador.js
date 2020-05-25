import React, {Component} from 'react';
import Score from './Score';
import './dropdown.css';

import Dropdown from 'react-dropdown';


class Avaliador extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        };

    }

    onChange(event){

    }

    getTimeName(){
        fetch('http://localhost:5000/getTimeName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.text()).then(res => {
            this.setState({list: JSON.parse(res)})
        })
    }

    componentDidMount() {
        this.getTimeName()
    }


    render() {

        const {funcionalidade, processo, pitch, inovacao, formacaodotime} = this.props


        return (
            <ui className="avaliador">
                <br/>
                <Dropdown className= "myDropdownMenu" options={this.state.list} onChange={this._onSelect} value={"Times..."} placeholder="Select an option" />
                <br/>
                <Score quesito={'Funcionalidade'}/>
                <Score quesito={'Processo'}/>
                <Score quesito={'Pitch'}/>
                <Score quesito={'Inovação'}/>
                <Score quesito={'Formação do time'}/>
                <button className= "submitButton" onClick={this.onSubmit}>Submit</button>
            </ui>
        );
    }

}

export default Avaliador;