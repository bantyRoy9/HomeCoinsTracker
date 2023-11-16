import { USER_FAIL, USER_REGISTER_FAIL, USER_REGISTER_REQUIEST,USER_GETME_REQUIEST, USER_LOGOUT_SUCCCESS,USER_REGISTER_SUCCESS, USER_REQUIEST, USER_SUCCCESS, USER_GETME_SUCCCESS, USER_GETME_FAIL } from "../constants";

export const userReducer = (state = {user:{}},action) => {
    switch(action.type){
        case USER_REQUIEST:
        case USER_REGISTER_REQUIEST:
        return{
            isLoading:true,
            isAuthenticated:false,
            user:null
        };
        case USER_GETME_REQUIEST:
            return{
                ...state,
                isLoading:true,
                isAuthenticated:false,
                user:null
            };
        case USER_GETME_SUCCCESS:
            return{
                isLoading:false,
                isAuthenticated:true,
                user:action.payload
            }
        case USER_REGISTER_SUCCESS:
        case USER_SUCCCESS:
        return{
            isLoading:false,
            isAuthenticated:true,
            user:action.payload
        };
        case USER_LOGOUT_SUCCCESS:
            return{
            isLoading:false,
            isAuthenticated:false,
            user:action.payload
            }
        case USER_FAIL:
        case USER_REGISTER_FAIL:
        case USER_GETME_FAIL :
        return{
            isLoading:false,
            isAuthenticated:false,
            user:null
        };
        default:
        return state

    }

}