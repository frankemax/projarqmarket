import React, {Component} from 'react';
import ProductItem from './product-item';
import AddProduct from './AddProduct';
import './App.css';
import Modal from 'react-awesome-modal';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            valorTotal: 0,
            visible: false,
            card: false,
            ver: false,
            off: 0,
            comprovante: [],
            total: 0,
            open: "",
            close: "",
            value: "",
            numero: "",
            pin: "",
            login: ""
        };
        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.handleNumero = this.handleNumero.bind(this)
        this.handlePin = this.handlePin.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    componentDidMount() {
    }

    onDelete(id) {
        const products = this.state.products;
        this.setState({valorTotal: this.state.valorTotal - products[id].valor});
        delete products[id];
        this.setState({products: products});
    }

    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }

    onAdd(id) {
        const {products, valorTotal} = this.state;
        fetch('http://localhost:5000/getProduto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": id
            })
        }).then(res => res.text()).then(res => {
            if (res === "") {
                return;
            } else {
                products.push(
                    JSON.parse(res)
                );
                this.setState({products});
                this.setState({valorTotal: valorTotal + JSON.parse(res).valor});
            }
        })
    }


    formatMoney(number) {
        return number.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    }

    pay() {
        this.setState({numero: ""})
        this.setState({pin: ""})
        this.setState({card: true});
    }

    pagar(tipo) {

        fetch('http://localhost:5000/pagar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "carrinho": this.state.products,
                "total": this.state.valorTotal,
                "tipo": tipo,
                "numero": this.state.numero,
                "pin": this.state.pin
            })
        }).then(res => res.text()).then(res => {
            if (res === "true") {
                this.setState({products: []});
                this.setState({valorTotal: 0});
                this.setState({card: false})
            } else {
                this.openModal()
                this.setState({card: false})
            }
        })
    }

    clear() {
        this.setState({products: []});
        this.setState({valorTotal: 0});
    }

    close() {
        fetch('http://localhost:5000/close', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.text()).then(res => {
            this.setState({comprovante: JSON.parse(res).compras});
            this.total()
        })
        var date = new Date();
        var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        this.setState({close: str});
    }

    total() {
        var t = 0
        for (let i = 0; i < this.state.comprovante.length; i++) {
            t += this.state.comprovante[i].total
        }
        this.setState({total: this.formatMoney(t)})
    }

    verInicio() {
        fetch('http://localhost:5000/verInicio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({cod: this.state.login})
        }).then(res => res.text()).then(res => {
            if (res === "true") {
                this.inicia()
            } else {
                this.setState({ver: true})
            }
        })
    }

    inicia() {
        this.setState({off: 1})
        this.clear()
        fetch('http://localhost:5000/init', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.text()).then(res => this.setState({open: res}))
    }

    handleNumero(event) {
        this.setState({numero: event.target.value})
    }

    handlePin(event) {
        this.setState({pin: event.target.value})
    }

    handleLogin(event) {
        this.setState({login: event.target.value})
    }

    render() {
        if (this.state.off === 2) {
            return (
                <ul className="App">
                    <h1 className="App">Comprovante</h1>
                    <br/>
                    {this.state.comprovante.map((list, index) => (
                        <li key={`${index}`}>
                            {this.formatMoney(list.total)} / {list.tipo}
                        </li>
                    ))}
                    <li>Total: {this.state.total}</li>
                    <li>Horario de abertura: {this.state.open}</li>
                    <li>Horario de encerramento: {this.state.close}</li>
                    <br/>
                    <button className="button" onClick={() => this.setState({off: 0, login: ""})}>Tela inicial
                    </button>
                </ul>
            )
        } else {
            if (this.state.off === 1) {
                return (
                    <div className="App">
                        <Modal visible={this.state.visible} width="400" height="200" effect="fadeInUp"
                               onClickAway={() => this.closeModal()}>
                            <div>
                                <h1>A compra não pode realizada</h1>
                                <button className="button" onClick={() => this.closeModal()}>Fechar</button>
                            </div>
                        </Modal>

                        <Modal visible={this.state.card} width="450" height="275" effect="fadeInUp"
                               onClickAway={() => this.setState({card: false})}>
                            <div>
                                <h1>Digite os dados do cartao</h1>
                                <input
                                    onChange={this.handleNumero}
                                    placeholder="Número do Cartão"
                                    type='text'
                                    value={this.state.numero}
                                />
                                <input
                                    onChange={this.handlePin}
                                    placeholder="PIN de Segurança"
                                    type='text'
                                    value={this.state.pin}
                                />
                                <button className="button" onClick={() => this.pagar("cartao")}>Pagar</button>
                            </div>
                        </Modal>

                        <h1>Products Manager</h1>
                        <button className="button" onClick={() => this.pagar("dinheiro")}>Pagar com dinheiro
                        </button>
                        <button className="button" onClick={() => this.pay()}>Pagar com cartao</button>
                        <button className="button" onClick={() => this.clear()}>Esvaziar carrinho</button>
                        <button className="button" onClick={() => {
                            this.close();
                            this.setState({off: 2})
                        }}>Fechar caixa
                        </button>
                        <AddProduct
                            onAdd={this.onAdd}
                        />
                        <h3>Preço do carrinho {this.formatMoney(this.state.valorTotal)}</h3>
                        <ul>
                            {
                                this.state.products.map((product, index) => {
                                    return (
                                        <li key={`${index}`}>
                                            <ProductItem
                                                id={`${index}`}
                                                nome={product.nome}
                                                price={product.valor}
                                                onDelete={this.onDelete}
                                            />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                );
            } else {
                return (
                    <div className="App">
                        <h1>Inicio</h1>
                        <Modal visible={this.state.ver} width="450" height="175" effect="fadeInUp"
                               onClickAway={() => this.setState({ver: false})}>
                            <div>
                                <h1>Codigo de acesso invalido</h1>
                                <button className="button" onClick={() => this.setState({ver: false})}>Fechar</button>
                            </div>
                        </Modal>
                        <input
                            onChange={this.handleLogin}
                            placeholder="Codigo de acesso"
                            type='text'
                            value={this.state.login}
                        />
                        <button className="button" onClick={() => this.verInicio()}>Abrir caixa</button>
                    </div>
                )
            }
        }
    }
}

export default App;
