import React, {Component} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Aluno from "./Aluno";
import Dropdown from "react-dropdown";

class AlunoPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tela: 0,
            alunos: [],
            times: [],
            list: [],
            nomeNovoTime: '',
            id: ''
        };
        this.backMenu = this.backMenu.bind(this)
        this.handleId = this.handleId.bind(this)
    }

    backMenu() {
        const {setAtualState} = this.props
        setAtualState()
    }

    handleId(event){
        this.setState({id: event.target.value})
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

    componentDidMount() {
        this.getTimeName()
    }

    render() {
        return (
            <ul className="avaliador">
                <input className="inputLabel"
                       onChange={this.handleId}
                       placeholder="Matricula"
                       type='text'
                       value={this.state.id}
                />
                <Dropdown className='myDropdown-menu' options={this.state.list} onChange={this.onChange}
                          value={this.state.time}
                          placeholder="Sem time"/>

                <button className="buttonAlunoPage1" onClick={this.onSubmit}>Confirmar</button>
                <br/>
                <button className="buttonAlunoPage2" onClick={this.backMenu}>Voltar</button>
            </ul>


        );
    }

}

export default AlunoPage
