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
        const options = [
            'one', 'two', 'three'
        ]
        const defaultOption = options[0];

        const {nome, curso, time, matricula} = this.props;
        return (
            <div>
                <span>{nome}</span>
                {` | `}
                <span>{matricula}</span>
                {` | `}
                <span>{curso}</span>
                {` | `}
                <span>{time}</span>

                <Dropdown className= 'myDropdown-menu' options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />

                <span> <button className="buttonR" onClick={this.onDelete}>Remover</button></span>
            </div>

        );
    }

}

export default Aluno;