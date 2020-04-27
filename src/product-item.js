import React, {Component} from 'react';


class ProductItem extends Component {
    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete() {
        const {onDelete, id} = this.props;
        onDelete(id);
    }

    render() {
        const {nome, price, id} = this.props;
        return (
            <div>
                <span>{nome}</span>
                {` | `}
                <span>{id}</span>
                {` | `}
                <span>{price}</span>
                {` | `}
                <button onClick={this.onDelete}>Delete</button>
            </div>

        );
    }

}

export default ProductItem;
