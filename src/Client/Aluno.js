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

    render() {
        const {nome, curso, time, matricula, list} = this.props;
        return (
            <div>
                <span>{nome}</span>
                {` | `}
                <span>{matricula}</span>
                {` | `}
                <span>{curso}</span>

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