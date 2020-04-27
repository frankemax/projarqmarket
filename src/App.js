import React, {Component} from 'react';
import ProductItem from './product-item';
import AddProduct from './AddProduct';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []


        };
        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
    }

    getProducts() {
        return this.state.products;
    }

    onDelete(name) {
        const products = this.getProducts();

        const filteredProducts = products.filter(product => {
            return product.name !== name;
        });

        this.setState({products: filteredProducts});

    }

    onAdd(id) {
        const products = this.getProducts();
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
        })
    }

    render() {
        return (
            <div className="App">


                <h1>Products Manager</h1>

                <AddProduct
                    onAdd={this.onAdd}
                />


                {
                    this.state.products.map(product => {
                        return (
                            <ProductItem
                                key={product.nome}
                                name={product.nome}
                                price={product.valor}
                                onDelete={this.onDelete}
                            />
                        )
                    })
                }
            </div>
        );
    }

}

export default App;
