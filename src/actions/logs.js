import { logConstants } from '../constants/log';
import { logService } from '../services/log';

export const logActions = {
    getAll
};

function getAll({page = 0, pid}) {
    return dispatch => {
        dispatch(request());
        logService.getLogList({page, pid})
            .then(
                products => dispatch(success(products)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: logConstants.GETALL_REQUEST } }
    function success(logs) { return { type: logConstants.GETALL_SUCCESS, logs } }
    function failure(error) { return { type: logConstants.GETALL_FAILURE, error } }
}