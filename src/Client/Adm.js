import React, {Component} from 'react';
import './App.css';
import Aluno from "./Aluno";

class Adm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tela: 0,
            alunos: [],
            teams: [],
            nomeNovoTime: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.getAlunos = this.getAlunos.bind(this);
        this.getTimes = this.getTimes.bind(this);
        this.setTime = this.setTime.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        //this.props.onAdd(this.nameInput.value);

        this.nameInput.value = '';
    }

    remove(arr, attr, value) {
        let i = arr.length;
        while (i--) {
            if (arr[i]
                && arr[i].hasOwnProperty(attr)
                && (arguments.length > 2 && arr[i][attr] === value)) {

                arr.splice(i, 1);

            }
        }
        return arr;
    }

    onDelete(id) {
        const {alunos} = this.state
        this.remove(alunos, 'id', id);
        this.setState({alunos: alunos});
        fetch('http://localhost:5000/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'id': id})
        }).then(res => res.text()).then(res => {
            console.log(res)
        })
    }

    getAlunos() {
        fetch('http://localhost:5000/getAlunos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.text()).then(res => {
            this.setState({alunos: JSON.parse(res).a})
            console.log(this.state.alunos)
        })
    }

    getTimes() {
        fetch('http://localhost:5000/getTimes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.text()).then(res => {
            this.setState({times: JSON.parse(res).a})
            console.log(this.state.times)
        })
    }

    setTime(id, nomeTime){
        fetch('http://localhost:5000/setTimes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': id,
                'time': nomeTime
            })
        }).then(res => res.text()).then(res => {
            console.log(res)
        })
    }

    createTime(){
        fetch('http://localhost:5000/createTime', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'nome': this.state.nomeNovoTime
            })
        }).then(res => res.text()).then(res => {
            console.log(res)
        })
    }

    componentDidMount() {
        this.getAlunos()
        this.getTimes()
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
                                curso={aluno.curso}
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