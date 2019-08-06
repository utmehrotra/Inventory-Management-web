import { productConstants } from '../constants/product';
import { productService } from '../services/product';
import { history } from '../helpers/history';

export const productActions = {
    getAll,
    changeQuantity,
    createProduct,
    deleteProduct
};

function getAll({page = 0}) {
    console.log(page);
    return dispatch => {
        dispatch(request());

        productService.getProductList({page})
            .then(
                products => dispatch(success(products)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productConstants.GETALL_REQUEST } }
    function success(products) { return { type: productConstants.GETALL_SUCCESS, products } }
    function failure(error) { return { type: productConstants.GETALL_FAILURE, error } }
}


function createProduct(name, quantity, price){
    return dispatch => {
        dispatch(request());

        productService.createProduct(name, quantity, price)
            .then(
                product => {
                    dispatch(success(product)); 
                    history.push('/');
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productConstants.ADDED_REQUEST } }
    function success(product) { return { type: productConstants.ADDED_SUCCESS, product } }
    function failure(error) { return { type: productConstants.ADDED_FAILURE, error } }
}

function changeQuantity(pid, incValue){
    return dispatch => {
        dispatch(request());

        productService.changeQuantity(pid, incValue)
            .then(
                product => dispatch(success(product)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productConstants.QUANTITY_CHANGE_REQUEST } }
    function success(product) { return { type: productConstants.QUANTITY_CHANGE_SUCCESS, product } }
    function failure(error) { return { type: productConstants.QUANTITY_CHANGE_FAILURE, error } }
}

function deleteProduct(pid){
    return dispatch => {
        dispatch(request());

        productService.deleteProduct(pid)
            .then(
                product => dispatch(getAll({page:0})),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productConstants.DELETE_CHANGE_REQUEST } }
    function success(products) { return { type: productConstants.DELETE_CHANGE_SUCCESS, products } }
    function failure(error) { return { type: productConstants.DELETE_CHANGE_FAILURE, error } }
}