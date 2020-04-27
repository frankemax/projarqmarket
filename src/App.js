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
            off: false,
            comprovante: [],
            total: 0
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
    }

    total() {
        var t = 0
        for (let i = 0; i < this.state.comprovante.length; i++) {
            t += this.state.comprovante[i].total
        }
        this.setState({total: this.formatMoney(t)})
    }

    render() {
        if (this.state.off) {
            return (
                <ul>
                    <h1>Comprovante</h1>
                    {this.state.comprovante.map((list, index) => (
                        <li key={`${index}`}>
                            {this.formatMoney(list.total)} / {list.tipo}
                        </li>
                    ))}
                    <li>Total: {this.state.total}</li>
                    <button onClick={() => this.setState({off: false})}>Abrir caixa</button>
                </ul>
            )
        } else {
            return (
                <div className="App">
                    <Modal visible={this.state.visible} width="400" height="200" effect="fadeInUp"
                           onClickAway={() => this.closeModal()}>
                        <div>
                            <h1>A compra não pode realizada</h1>
                            <button onClick={() => this.closeModal()}>Fechar</button>
                        </div>
                    </Modal>

                    <h1>Products Manager</h1>
                    <button onClick={() => this.pagar("dinheiro")}>Pagar com dinheiro</button>
                    <button onClick={() => this.pagar("cartao")}>Pagar com cartao</button>
                    <button onClick={() => this.clear()}>Esvaziar carrinho</button>
                    <button onClick={() => {
                        this.close();
                        this.setState({off: true})
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
        }
    }
}

export default App;
