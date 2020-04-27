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
            off: 0,
            comprovante: [],
            total: 0,
            open: "",
            close: ""
        };
        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
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
            products.push(
                JSON.parse(res)
            );
            this.setState({products});
            this.setState({valorTotal: valorTotal + JSON.parse(res).valor});
        })
    }


    formatMoney(number) {
        return number.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
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
                "tipo": tipo
            })
        }).then(res => res.text()).then(res => {
            if (res === "true") {
                this.setState({products: []});
                this.setState({valorTotal: 0});
            } else {
                this.openModal()
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
        var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        this.setState({close: str});
    }

    total() {
        var t = 0
        for (let i = 0; i < this.state.comprovante.length; i++) {
            t += this.state.comprovante[i].total
        }
        this.setState({total: this.formatMoney(t)})
    }

    inicia(){
        this.setState({off: 1})
        this.clear()
        fetch('http://localhost:5000/init', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.text()).then(res => this.setState({open: res}))
    }

    render() {
        if (this.state.off === 2) {
            return (
                <ul>
                    <h1>Comprovante</h1>
                    {this.state.comprovante.map((list, index) => (
                        <li key={`${index}`}>
                            {this.formatMoney(list.total)} / {list.tipo}
                        </li>
                    ))}
                    <li>Total: {this.state.total}</li>
                    <li>Horario de abertura: {this.state.open}</li>
                    <li>Horario de encerramento: {this.state.close}</li>
                    <button class="button" onClick={() => this.setState({off: 0})}>Tela inicial</button>
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
                                <button class="button" onClick={() => this.closeModal()}>Fechar</button>
                            </div>
                        </Modal>

                        <h1>Products Manager</h1>
                        <button class="button" onClick={() => this.pagar("dinheiro")}>Pagar com dinheiro</button>
                        <button class="button" onClick={() => this.pagar("cartao")}>Pagar com cartao</button>
                        <button class="button" onClick={() => this.clear()}>Esvaziar carrinho</button>
                        <button class="button" onClick={() => {
                            this.close();
                            this.setState({off: 2})
                        }}>Fechar caixa
                        </button>
                        <AddProduct
                            onAdd={this.onAdd}
                        />
                        Preço do carrinho {this.formatMoney(this.state.valorTotal)}
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
                    <ul>
                        <h1>Inicio</h1>
                        <button class="button" onClick={() => this.inicia()}>Abrir caixa</button>
                    </ul>
                )
            }
        }
    }
}

export default App;
