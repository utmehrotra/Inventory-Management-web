import { productConstants } from '../constants/product';

export function product(state = {}, action) {
    switch (action.type) {
        case productConstants.QUANTITY_CHANGE_REQUEST:
            return {
                loading: true
            };
        case productConstants.QUANTITY_CHANGE_SUCCESS:
            return action.product;
        case productConstants.QUANTITY_CHANGE_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}

