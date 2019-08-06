import { logConstants } from '../constants/log';

export function logs(state = {}, action) {
  switch (action.type) {
    case logConstants.GETALL_REQUEST:
      return {
        loading: true
      };
      case logConstants.GETALL_SUCCESS:
        return {
          items: action.logs.response, meta: action.logs.meta
        };
      case logConstants.GETALL_FAILURE:
        return { 
          error: action.error
        };
    default:
      return state
  }
}

