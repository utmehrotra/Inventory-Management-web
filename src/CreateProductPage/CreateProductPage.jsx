import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { productActions } from '../actions/product';

class CreateProductPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            quantity: '',
            price: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { name, quantity, price } = this.state;
        if (name && quantity && price) {
            this.props.addProduct(name, quantity, price);
        }
    }

    render() {
        const { creatingProduct } = this.props;
        const { name, quantity, price, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Create a Product</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !name ? ' has-error' : '')}>
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange} />
                        {submitted && !name &&
                            <div className="help-block">Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !quantity ? ' has-error' : '')}>
                        <label htmlFor="quantity">Quantity</label>
                        <input type="quantity" className="form-control" name="quantity" value={quantity} onChange={this.handleChange} />
                        {submitted && !quantity &&
                            <div className="help-block">Quantity is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !price ? ' has-error' : '')}>
                        <label htmlFor="price">Price</label>
                        <input type="price" className="form-control" name="price" value={price} onChange={this.handleChange} />
                        {submitted && !price &&
                            <div className="help-block">Price is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Create</button>
                        {creatingProduct &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { creatingProduct } = state.authentication;
    return { creatingProduct };
}

const actionCreators = {
    addProduct: productActions.createProduct
};

const connectedCreateProductPage = connect(mapState, actionCreators)(CreateProductPage);
export { connectedCreateProductPage as CreateProductPage };