import React, {Component} from 'react';
import Score from './Score';
import './dropdown.css';

import Dropdown from 'react-dropdown';


class Avaliador extends Component {

    constructor(props) {
        super(props);
        this.state = {
            time: '',
            list: [],
            funcionalidade: 0,
            processo: 0,
            pitch: 0,
            inovacao: 0,
            formacaodotime: 0
        };
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeItem = this.onChangeItem.bind(this)
    }

    onChange(quesito, value) {

        if (quesito === 'Funcionalidade') {
            this.setState({funcionalidade: value})
        }
        if (quesito === 'Processo') {
            this.setState({processo: value})
        }
        if (quesito === 'Pitch') {
            this.setState({pitch: value})
        }
        if (quesito === 'Inovação') {
            this.setState({inovacao: value})
        }
        if (quesito === 'Formação do time') {
            this.setState({formacaodotime: value})
        }
    }

    onSubmit() {
        console.log(this.state)
        fetch('http://localhost:5000/setScore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'funcionalidade': this.state.funcionalidade,
                'processo': this.state.processo,
                'pitch': this.state.pitch,
                'inovacao': this.state.inovacao,
                'formacaodotime': this.state.formacaodotime,
                'time': this.state.time
            })
        }).then(res => res.text()).then(res => {
            console.log(res)
        })
    }

    getTimeName() {
        fetch('http://localhost:5000/getTimeName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.text()).then(res => {
            this.setState({list: JSON.parse(res)})
        })
    }

    onChangeItem(event) {
        this.setState({time: event.value})
    }

    componentDidMount() {
        this.getTimeName()
    }


    render() {
        return (
            <ui className="avaliador">
                <br/>
                <Dropdown className="myDropdownMenu" options={this.state.list} onChange={this.onChangeItem}
                          value={this.state.time === '' ? 'Times...' : this.state.time} placeholder="Select an option"/>
                <br/>
                <Score onChange={this.onChange} quesito={'Funcionalidade'}/>
                <Score onChange={this.onChange} quesito={'Processo'}/>
                <Score onChange={this.onChange} quesito={'Pitch'}/>
                <Score onChange={this.onChange} quesito={'Inovação'}/>
                <Score onChange={this.onChange} quesito={'Formação do time'}/>
                <button className="submitButtonAvaliador" onClick={this.onSubmit}>Submit</button>
            </ui>
        );
    }

}

export default Avaliador;