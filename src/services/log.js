import { authHeader } from '../helpers/auth-header';
const BASEURL = "http://localhost:7770"

export const logService = {
    getLogList,
};

function getLogList(query) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const queryParams = objToQueryString(query);
    return fetch(`${BASEURL}/products-log?${queryParams}`, requestOptions).then(handleResponse).then(logs => {
        return logs;
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