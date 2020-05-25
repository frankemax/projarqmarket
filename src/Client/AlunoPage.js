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
            nomeNovoTime: ''
        };

    }

    render() {
        return (
            <li>
                <TextField id="outlined-basic" label="Digite a sua matrícula" />

                <Dropdown className='myDropdown-menu'  size='small' onChange={this.onChange}

                          placeholder="Select an option"/>
                <span> <button className="sButton" onClick={this.onSubmit}>Confirmar</button></span>
                <br/>
                <button className="submitButtonAvaliador" onClick={this.backMenu}>Voltar</button>
            </li>


        );
    }

}

export default AlunoPage
