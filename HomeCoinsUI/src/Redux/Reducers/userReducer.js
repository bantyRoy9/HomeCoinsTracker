import { USER_FAIL, USER_REGISTER_FAIL, USER_REGISTER_REQUIEST, USER_LOGOUT_SUCCCESS,USER_REGISTER_SUCCESS, USER_REQUIEST, USER_SUCCCESS } from "../constants";

export const userReducer = (state = {user:{}},action) => {
    switch(action.type){
        case USER_REQUIEST:
        case USER_REGISTER_REQUIEST:
        return{
            isLoading:true,
            isAuthenticated:false
        };
        case USER_REGISTER_SUCCESS:
        case USER_SUCCCESS:
        return{
            ...state,
            isLoading:false,
            isAuthenticated:true,
            user:action.payload
        };
        case USER_LOGOUT_SUCCCESS:
            return{
            ...state,
            isLoading:false,
            isAuthenticated:false,
            user:action.payload
            }
        case USER_FAIL:
        case USER_REGISTER_FAIL:
        return{
            isLoading:false,
            isAuthenticated:false,
            user:null
        };
        default:
        return state

    }

}