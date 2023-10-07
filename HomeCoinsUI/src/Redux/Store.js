import { createStore, combineReducers,applyMiddleware } from 'redux';
import { userReducer } from './Reducers/userReducer';
import { accountReducer } from './Reducers/accountReducer';
import {activityReducer} from './Reducers/activityReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
const initialState = {
    user:{isAuthenticated:true}
};
const reducers = combineReducers({
    user:userReducer,
    account:accountReducer,
    activity:activityReducer,
});

export const store = createStore(reducers,initialState,composeWithDevTools(applyMiddleware(thunk)));