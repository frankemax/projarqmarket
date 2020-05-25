import React, {Component} from 'react';
import Score from './Score';
import './dropdown.css';
import Dropdown from 'react-dropdown';


class Avaliador extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list:[],
            funcionalidade: 0,
            processo : 0,
            pitch: 0,
            inovacao: 0,
            formacaodotime: 0
        };
        this.onChange = this.onChange.bind(this)

    }

    onChange(quesito,value){
        console.log(quesito)
        console.log(value)

        if(quesito === 'funcionalidade'){
            this.setState({funcionalidade: value})
        }
        if(quesito === 'processo'){
            this.setState({processo: value})
        }
        if(quesito === 'pitch'){
            this.setState({pitch: value})
        }
        if(quesito === 'inovacao'){
            this.setState({inovacao: value})
        }
        if(quesito === 'formacaodotime'){
            this.setState({formacaodotime: value})
        }
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
                <Score onChange ={this.onChange} quesito={'Funcionalidade'}/>
                <Score onChange ={this.onChange} quesito={'Processo'}/>
                <Score onChange ={this.onChange} quesito={'Pitch'}/>
                <Score onChange ={this.onChange} quesito={'Inovação'}/>
                <Score onChange ={this.onChange} quesito={'Formação do time'}/>
                <button className= "submitButton" onClick={this.onSubmit}>Submit</button>
            </ui>
        );
    }

}

export default Avaliador;