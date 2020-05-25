import React, {Component} from 'react';
import './App.css';
import Aluno from "./Aluno";

class Adm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tela: 0,
            alunos: [],
            times: [],
            list: [],
            nomeNovoTime: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.getAlunos = this.getAlunos.bind(this);
        this.getTimes = this.getTimes.bind(this);
        this.setTime = this.setTime.bind(this);
        this.createTime = this.createTime.bind(this);
        this.backMenu = this.backMenu.bind(this)
        this.handleNome = this.handleNome.bind(this)
    }

    backMenu() {
        const {setAtualState} = this.props
        setAtualState()
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

    getAlunos() {
        fetch('http://localhost:5000/getAlunos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.text()).then(res => {
            this.setState({alunos: JSON.parse(res).alunos})
        })
    }

    getTimes() {
        fetch('http://localhost:5000/getTimes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.text()).then(res => {
            this.setState({times: JSON.parse(res).times})
        })
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

    setTime(id, nomeTime) {
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
            this.getAlunos()
            this.getTimes()
        })
    }

    createTime() {
        if (this.state.list.includes(this.state.nomeNovoTime)) {
            window.alert('Nome do time ja existe')
            console.log(false)
            return
        } else {
            fetch('http://localhost:5000/createTime', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'nome': this.state.nomeNovoTime
                })
            }).then(res => res.text()).then(res => {
                this.getTimes()
                this.getTimeName()
                this.setState({nomeNovoTime: ''})
            })
        }
    }

    componentDidMount() {
        this.getAlunos()
        this.getTimes()
        this.getTimeName()
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

    onSubmit(id, time) {
        fetch('http://localhost:5000/setTimes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': id,
                'time': time
            })
        }).then(res => res.text()).then(res => {
            console.log(res)
        })
    }

    handleNome(event) {
        this.setState({nomeNovoTime: event.target.value})
    }

    render() {
        const {alunos, list} = this.state
        if (this.state.tela === 0) {
            return (
                <ul>
                    <input className="inputLabel"
                           onChange={this.handleNome}
                           placeholder="Nome do time"
                           type='text'
                           value={this.state.nomeNovoTime}
                    />
                    <button className="buttonCriaTime" onClick={this.createTime}>Criar</button>
                    {alunos.map((aluno) => {
                        return (
                            <li key={`${aluno.id}`}>
                                <Aluno
                                    list={list}
                                    id={`${aluno.id}`}
                                    nome={aluno.nome}
                                    matricula={aluno.id}
                                    curso={aluno.curso}
                                    time={aluno.time}
                                    listaAlunos={this.state.alunos}
                                    listaTimes={this.state.times}
                                    opcao={aluno.opcao}
                                    onSubmit={this.onSubmit}
                                    onDelete={this.onDelete}
                                />
                            </li>
                        )
                    })}
                    <br/>
                    <button className="submitButtonAvaliador" onClick={this.backMenu}>Voltar</button>
                </ul>
            );
        }
    }

}

export default Adm
