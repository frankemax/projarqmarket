import React, {Component} from 'react';


class ProductItem extends Component {
    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete() {
        const {onDelete, nome} = this.props;
        onDelete(nome);
    }

    render() {
        const {nome, price} = this.props;
        return (
            <div>
                <span>{nome}</span>
                {` | `}
                <span>{price}</span>
                {` | `}
                <button onClick={this.onDelete}>Delete</button>
            </div>

        );
    }

}

export default ProductItem;
