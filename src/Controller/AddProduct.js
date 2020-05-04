import React, {Component} from 'react';
import '../View/App.css';

class AddProduct extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.onAdd(this.nameInput.value);

        this.nameInput.value = '';
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h3>Add Product</h3>
                <input type="text" size="50" placeholder="ID do produto" ref={nameInput => this.nameInput = nameInput}/>
                <button className="button">Add</button>
                <hr/>
            </form>
        );
    }

}

export default AddProduct;
