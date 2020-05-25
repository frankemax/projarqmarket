import React, {Component} from 'react';
import './App.css';
import Adm from './Adm';
import Avaliador from "./Avaliador";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            telaAtual: 'avali'
        };

    }


    render() {
        if (this.state.telaAtual == 'main') {
            return (
                <ul className="App">
                    <br/>

                    <Adm/>
                </ul>
            )
        }
        if (this.state.telaAtual == 'adm') {
            return (
                <ul className="App">
                    <br/>
                    <Adm/>
                </ul>
            )
        }

        if (this.state.telaAtual == 'avali') {
            return (
                <ul className="avaliador">
                    <br/>

                    <Avaliador/>
                </ul>


            )
        }

        if (this.state.telaAtual == 'aluno') {
            return (
                <ul className="App">
                    <br/>
                    <Adm/>
                </ul>
            )
        }


    }
}

export default App;
