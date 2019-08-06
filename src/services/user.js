import { authHeader } from '../helpers/auth-header';
const BASEURL = "http://localhost:7770"

export const userService = {
    login,
    logout,
    register,
    currentUser
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${BASEURL}/user/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log("FRom user service", user);
            localStorage.setItem('user', JSON.stringify(user.response));
            return user.response;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function currentUser(){
    const user = localStorage.getItem('user');
    return JSON.parse(user);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${BASEURL}/user/signup`, requestOptions).then(handleResponse).then(user => {
        localStorage.setItem('user', JSON.stringify(user.response));
        return user.response;
    });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}