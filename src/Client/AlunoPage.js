import React, {Component} from 'react';
import './App.css';
import Dropdown from "react-dropdown";

class AlunoPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tela: 0,
            alunos: [],
            times: [],
            list: [],
            nomeNovoTime: '',
            id: '',
            time: ''
        };
        this.backMenu = this.backMenu.bind(this)
        this.handleId = this.handleId.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    backMenu() {
        const {setAtualState} = this.props
        setAtualState()
    }

    handleId(event){
        this.setState({id: event.target.value})
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

    onChange(event) {
        this.setState({time: event.value})
    }

    componentDidMount() {
        this.getTimeName()
    }

    onSubmit(){


        fetch('http://localhost:5000/setOpcao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': this.state.id,
                'opcao': this.state.time
            })
        }).then(res => res.text()).then(res => {
            console.log(res)
            window.alert("Sucesso!");
            this.setState({id:''})
        })
    }

    render() {
        return (
            <ul className="avaliador">
                <input className="inputLabel2"
                       onChange={this.handleId}
                       placeholder="Matricula"
                       type='text'
                       value={this.state.id}
                />
                <Dropdown className='myDropdownMenuAlunoPage' options={this.state.list} onChange={this.onChange}
                          value={this.state.time}
                          placeholder="Sem time"/>

                <button className="buttonAlunoPage1" onClick={this.onSubmit}>Confirmar</button>
                <br/>
                <button className="buttonAlunoPage2" onClick={this.backMenu}>Voltar</button>

            </ul>
        );
    }

}

export default AlunoPage
