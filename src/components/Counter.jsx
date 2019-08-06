import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import { productActions } from '../actions/product';

const DECREMENT_VALUE = -1;
const INCREMENT_VALUE = 1;

class IncrementComponent extends React.Component {
    render() {
        const { quantity, pid } = this.props;
      return (
          <div>
            <RemoveCircle onClick={() => this.doDecrement(pid)}></RemoveCircle>
            <TextField disabled type="text" style={{width:50}} inputProps={{style: { textAlign: "center" }}} value={quantity}></TextField>
            <AddCircle onClick={() => this.doIncrement(pid)}></AddCircle> 
          </div>
        );
    }
    doDecrement = function(product) {
        this.props.changeQuantity(product, DECREMENT_VALUE)
    }
    doIncrement = function(product) {
        this.props.changeQuantity(product, INCREMENT_VALUE)
    };
}

function mapState(state) {
    const { product } = state;
    return { product };
}

const actionCreators = {
    changeQuantity: productActions.changeQuantity,
}

const connectedIncrementComponent = connect(mapState, actionCreators)(IncrementComponent);
export { connectedIncrementComponent as IncrementComponent };