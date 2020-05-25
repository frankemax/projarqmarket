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
            <ui className="avaliador">
                <TextField className="MuiTextField-root" id="outlined-basic" size="small"  label="Digite a sua matrícula"/>


                <Dropdown className="myDropdownMenu" onChange={this.onChange}  placeholder="Times..."/>

                <button className="buttonAlunoPage1" onClick={this.onSubmit}>Confirmar</button>
                <br/>
                <button className="buttonAlunoPage2" onClick={this.backMenu}>Voltar</button>
            </ui>


        );
    }

}

export default AlunoPage
