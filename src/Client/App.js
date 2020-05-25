import React, {Component} from 'react';
import './App.css';
import Adm from './Adm';
import Avaliador from "./Avaliador";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            telaAtual: 'main'
        };
        this.handleData = this.handleData.bind(this)
        this.setAtualState = this.setAtualState.bind(this)

    }

    setAtualState() {
        this.setState({telaAtual: "main"})
    }

    handleData(event) {

        this.setState({telaAtual: event.currentTarget.textContent})
        console.log(event.currentTarget.textContent)
    }


    render() {
        if (this.state.telaAtual === 'main') {
            return (
                <ul className="App2">
                    <br/>
                    <ul className="App2">
                        <button className="button" onClick={this.handleData}>Avaliador</button>
                        <br/>
                        <button className="button" onClick={this.handleData}>Administrador</button>
                        <br/>
                        <button className="button" onClick={this.handleData}>Aluno</button>
                    </ul>
                </ul>
            )
        }
        if (this.state.telaAtual === 'Administrador') {
            return (
                <ul className="App">
                    <br/>
                    <Adm setAtualState={this.setAtualState}/>
                    <br/> <br/>
                    <button className="submitButtonAvaliador" onClick={this.setAtualState}>Voltar</button>
                </ul>
            )
        }

        if (this.state.telaAtual === 'Avaliador') {
            return (
                <ul className="avaliador">
                    <br/>
                    <Avaliador setAtualState={this.setAtualState}/>
                </ul>
            )
        }

        if (this.state.telaAtual === 'Aluno') {
            return (
                <ul className="App">
                    <br/>
                </ul>
            )
        }


    }
}

export default App;
