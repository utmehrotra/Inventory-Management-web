import { alertConstants } from '../constants/alert';
import { productConstants } from '../constants/product';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};

    case productConstants.QUANTITY_CHANGE_FAILURE:
      return { 
        type: 'alert-danger',
        message: action.error
      };  
    default:
      return state
  }
}