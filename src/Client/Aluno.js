import React, {Component} from 'react';


class Aluno extends Component {
    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete() {
        const {onDelete, id} = this.props;
        onDelete(id);
    }

    render() {
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
                {` | `}
                <button className="buttonR" onClick={this.onDelete}>Remover</button>
            </div>

        );
    }

}

export default Aluno;