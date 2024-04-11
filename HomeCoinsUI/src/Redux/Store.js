import { createStore, combineReducers,applyMiddleware } from 'redux';
import { userReducer,accountReducer,activityReducer,groupReducer, sourceReducer, memberReducer } from './Reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = combineReducers({
    user:userReducer,
    account:accountReducer,
    activity:activityReducer,
    group:groupReducer,
    source:sourceReducer,
    member:memberReducer,
});

export const store = createStore(reducers,composeWithDevTools(applyMiddleware(thunk)));