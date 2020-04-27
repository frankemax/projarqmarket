import React, {Component} from 'react';


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
                <input placeholder="ID do produto" ref={nameInput => this.nameInput = nameInput}/>
                <button>Add</button>
                <hr/>
            </form>
        );
    }

}

export default AddProduct;
