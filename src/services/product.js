import { authHeader } from '../helpers/auth-header';
const BASEURL = "http://localhost:7770"

export const productService = {
    getProductList,
    changeQuantity,
    createProduct,
    deleteProduct
};

function getProductList(query) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const queryParams = objToQueryString(query);
    return fetch(`${BASEURL}/products?${queryParams}`, requestOptions).then(handleResponse).then(products => {
        return products;
    });
}

function changeQuantity(pid, inc) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ inc })
    };

    return fetch(`${BASEURL}/products/${pid}/quantity`, requestOptions).then(handleResponse).then(product => {
        return product.response;
    });
}
function deleteProduct(pid) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };

    return fetch(`${BASEURL}/products/${pid}`, requestOptions).then(handleResponse).then(product => {
        return product.response;
    });
}



function createProduct(name, quantity, price) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ name, quantity, price })
    };

    return fetch(`${BASEURL}/products`, requestOptions).then(handleResponse).then(product => {
        console.log("Added product", product);
        return product.response;
    });
}

function objToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
  }


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}