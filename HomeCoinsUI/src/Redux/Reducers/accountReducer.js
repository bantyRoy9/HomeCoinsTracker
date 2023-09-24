import { USER_FAIL, USER_REGISTER_FAIL, USER_REGISTER_REQUIEST, USER_REGISTER_SUCCESS, USER_REQUIEST, USER_SUCCCESS } from "../userConstants";

export const accountReducer = (state = {accountDetails:{}},action) => {
    switch(action.type){
        case USER_REQUIEST:
        return{
            isLoading:true,
        };
        case USER_SUCCCESS:
        return{
            isLoading:false,
            account:state.payload
        };
        case USER_FAIL:
        return{
            isLoading:false,
            account:null
        };
        default:
        return state

    }

}