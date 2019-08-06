import { combineReducers } from 'redux';

import { authentication } from './auth';
import { registration } from './registration';
import { users } from './users';
import { products } from './products';
import { product } from './product';
import { alert } from './alert';
import { logs } from './log';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  products,
  product,
  alert,
  logs
});

export default rootReducer;