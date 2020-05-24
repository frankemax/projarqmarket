import React, {Component} from 'react';
import './App.css';
import Aluno from "./Aluno";

class Adm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tela: 0,
            alunos: []
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.getAlunos = this.getAlunos.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        //this.props.onAdd(this.nameInput.value);

        this.nameInput.value = '';
    }

    onDelete(id) {
        const alunos = this.state.alunos;
        delete alunos[id];
        this.setState({alunos: alunos});
    }

    getAlunos() {
        console.log("teste")
        const {alunos} = this.state;

        fetch('http://localhost:5000/getAlunos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.text()).then(res => {
            alunos.push(
                JSON.parse(res)
            );
            console.log(alunos)
        })
    }

    componentDidMount() {
        this.getAlunos()
    }

    render() {
        const {alunos} = this.state
        if (this.state.tela === 0) {
            return (
                alunos.map((aluno) => {
                    return (
                        <li key={`${aluno.id}`}>
                            <Aluno
                                id={`${aluno.id}`}
                                nome={aluno.nome}
                                matricula={aluno.id}
                                time={aluno.time}
                                onDelete={this.onDelete}
                            />
                        </li>
                    )
                })

            );
        }
    }

}

export default Adm