import { productConstants } from '../constants/product';

export function products(state = {}, action) {
  switch (action.type) {
    case productConstants.GETALL_REQUEST:
      return {
        loading: true
      };
      case productConstants.GETALL_SUCCESS:
        return {
          items: action.products.response, meta: action.products.meta
        };
      case productConstants.GETALL_FAILURE:
        return { 
          error: action.error
        };
      case productConstants.QUANTITY_CHANGE_SUCCESS:
        return {
          items: state.items.map(prod => prod._id === action.product._id ?
              { ...prod, quantity: action.product.quantity } : 
              prod
          ), meta: state.meta
      };
      case productConstants.DELETE_CHANGE_REQUEST:
        return {
          loading: true
      };
      // case productConstants.DELETE_CHANGE_SUCCESS:
      //   return {
      //     items: state.items.map(prod => prod._id === action.product._id ?
      //         { ...prod, quantity: action.product.quantity } : 
      //         prod
      //     ), meta: state.meta
      // };     
    default:
      return state
  }
}

