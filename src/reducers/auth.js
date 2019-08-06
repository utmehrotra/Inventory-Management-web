import { userConstants } from '../constants/user';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user.user
      };
    case userConstants.RESUME_SUCCESS:  
    case userConstants.REGISTER_SUCCESS:  
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}