import { ACCOUNT_ADD_FAIL, ACCOUNT_ADD_REQUIEST, ACCOUNT_ADD_SUCCESS, ACCOUNT_FAIL,  ACCOUNT_REQUIEST, ACCOUNT_SUCCCESS} from "../constants";
const initialState = {
    account:{},
    addEarn:{},
    addExpend:{},
    isLoading:false
}
export const accountReducer = (state = {initialState},action) => {
    switch(action.type){
        case ACCOUNT_REQUIEST:
        case ACCOUNT_ADD_REQUIEST:
        return{
            isLoading:true,
            account:null,
        };
        case ACCOUNT_SUCCCESS:
        return{
            isLoading:false,
            account:action.payload
        };
        case ACCOUNT_ADD_SUCCESS:
            return{
                isLoading:false,
                addEarn:action.payload
            };
        case ACCOUNT_FAIL:
        return{
            isLoading:false,
            account:null
        };
        case ACCOUNT_ADD_FAIL:
            return{
                isLoading:false,
                addEarn:null
            }
        default:
        return state

    }

}