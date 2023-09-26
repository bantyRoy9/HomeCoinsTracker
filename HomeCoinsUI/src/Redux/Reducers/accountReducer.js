import { ACCOUNT_FAIL,  ACCOUNT_REQUIEST, ACCOUNT_SUCCCESS} from "../constants";

export const accountReducer = (state = {account:{}},action) => {
    
    switch(action.type){
        case ACCOUNT_REQUIEST:
        return{
            isLoading:false,
            account:null,
        };
        case ACCOUNT_SUCCCESS:
        return{
            isLoading:true,
            account:action.payload
        };
        case ACCOUNT_FAIL:
        return{
            isLoading:false,
            account:null
        };
        default:
        return state

    }

}