import { createStore, combineReducers,applyMiddleware } from 'redux';
import { userReducer } from './Reducers/userReducer';
import { accountReducer } from './Reducers/accountReducer';
import thunk from 'redux-thunk';
const initialState = {};
const reducers = combineReducers({
    user:userReducer,
    account:accountReducer
});

export const store = createStore(reducers,applyMiddleware(thunk));