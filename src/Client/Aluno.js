import React, {Component} from 'react';
import './dropdown.css';
import Dropdown from 'react-dropdown';


class Aluno extends Component {

    constructor(props) {
        super(props);

        this.state = {
            time: ''
        };

        this.onDelete = this.onDelete.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.isValid = this.isValid.bind(this)
        this.validGroup = this.validGroup.bind(this)
    }

    onDelete() {
        const {onDelete, matricula} = this.props;
        onDelete(matricula);
    }

    onSubmit() {
        const {onSubmit, matricula} = this.props;
        onSubmit(matricula, this.state.time);
    }

    onChange(event) {
        this.setState({time: event.value})
    }

    getCurso(id) {
        var curso = ''
        const {listaAlunos} = this.props
        listaAlunos.forEach((item) => {
            if (item.id === id) {
                curso = item.curso
            }
        });
        return curso
    }

    isValid(list) {
        var i = false
        list.forEach((item) => {
            if (this.getCurso(item) != this.getCurso(list[0])) {
                i = true
            }
        })
        return i
    }

    validGroup() {
        const {listaTimes, time} = this.props
        var v = false
        listaTimes.forEach((item) => {
            if (item.nomeTime == time) {
                if (this.isValid(item.integrantes) == true) {
                    v = true
                }
            }
        });
        if (v) {
            return 'Grupo valido!'
        } else {
            return 'Grupo invalido!'
        }
    }

    render() {
        const {nome, curso, time, matricula, list, opcao} = this.props;
        return (
            <div>
                <span>{nome}</span>
                {` | `}
                <span>{matricula}</span>
                {` | `}
                <span>{curso}</span>
                {` | `}
                <span>{opcao}</span>
                {` | `}
                <span>{this.validGroup()}</span>

                <Dropdown className='myDropdown-menu' options={list} onChange={this.onChange}
                          value={time !== '' ? time : this.state.time}
                          placeholder="Sem time"/>
                <span> <button className="sButton" onClick={this.onSubmit}>Confirmar</button></span>
                <span> <button className="buttonR" onClick={this.onDelete}>Remover</button></span>
            </div>

        );
    }

}

export default Aluno;