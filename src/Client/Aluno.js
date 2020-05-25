import React, {Component} from 'react';
import './dropdown.css';
import Dropdown from 'react-dropdown';


class Aluno extends Component {

    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }



    onDelete() {
        const {onDelete, matricula} = this.props;
        onDelete(matricula);
    }



    render() {
        const {nome, curso, time, matricula, list} = this.props;
        console.log(list)
        return (
            <div>
                <span>{nome}</span>
                {` | `}
                <span>{matricula}</span>
                {` | `}
                <span>{curso}</span>
                {` | `}
                <span>{time}</span>

                <Dropdown className= 'myDropdown-menu' options={list} onChange={this._onSelect} value={"Sem time"} placeholder="Select an option" />
                <span> <button className="buttonR" onClick={this.onDelete}>Confirmar</button></span>
                <span> <button className="buttonR" onClick={this.onDelete}>Remover</button></span>
            </div>

        );
    }

}

export default Aluno;