import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { productActions } from '../actions/product';
import { userActions } from '../actions/user';
import { IncrementComponent } from '../components/Counter';



class HomePage extends React.Component {
    componentDidMount() {
        this.props.getCurrentUser();
        this.props.getProducts({page: 0});
    }

    render() {
        const { user, products } = this.props;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={{ flex: 1 }}>
                            Hi {user.name}!
                    </Typography>
                        <Link to="/login" style={{ color: 'white' }}>Logout</Link>
                    </Toolbar>
                </AppBar>
                <div className="row">
                <div className="col-md-12" style={{paddingLeft:50, paddingRight: 50}}>
                    <div className="row">
                        <div className="col-md-10">
                            <h3>All products </h3>
                        </div>   
                        <div className="col-md-2">
                            <Link to="/create-product" className="btn btn-link">Create Product</Link>
                        </div>   
                    </div>
                    
                    
                    {products.loading && <em>Loading products...</em>}
                    {products.error && <span className="text-danger">ERROR: {products.error}</span>}
                    {
                        products.items &&
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Actions</TableCell>
                                    <TableCell>Logs Check</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                                {products.items.map(product => (
                                    <TableRow key={product._id}>
                                        <TableCell>
                                            {product.name}
                                        </TableCell>
                                        <TableCell>
                                            {product.quantity}
                                        </TableCell>
                                        <TableCell>
                                            {product.price}
                                        </TableCell>
                                        <TableCell>
                                            <IncrementComponent quantity={product.quantity} pid={product._id}></IncrementComponent>
                                        </TableCell>
                                        <TableCell padding='default'>
                                            <Link to={`/logs/${product._id}`} className="btn btn-link">Check logs</Link>
                                        </TableCell>
                                        <TableCell padding='default'>
                                            <button className="btn btn-danger" onClick={() => this.props.deleteProduct(product._id)}>DELETE</button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableHead>
                            <TablePagination
                                component="div"
                                rowsPerPageOptions={[products.meta.itemsOnPage]}
                                count={products.meta.total}
                                rowsPerPage={products.meta.itemsOnPage}
                                page={products.meta.page}
                                backIconButtonProps={{
                                'aria-label': 'previous page',
                                }}
                                nextIconButtonProps={{
                                'aria-label': 'next page',
                                }}
                                onChangePage={(event, newPage) => this.props.getProducts({page: newPage})}
                                // onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                        </Table>
                    }
                </div>
                </div>
            </div>
        );
    }
}


function mapState(state) {
    const { products, authentication } = state;
    const { user } = authentication;
    return { user, products };
}

const actionCreators = {
    getProducts: productActions.getAll,
    getCurrentUser: userActions.currentUser,
    deleteProduct: productActions.deleteProduct
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };