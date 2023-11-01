import { createStore, combineReducers,applyMiddleware } from 'redux';
import { userReducer,accountReducer,activityReducer,groupReducer } from './Reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
const initialState = {
    user:{isAuthenticated:true}
};
const reducers = combineReducers({
    user:userReducer,
    account:accountReducer,
    activity:activityReducer,
    group:groupReducer
});

export const store = createStore(reducers,initialState,composeWithDevTools(applyMiddleware(thunk)));