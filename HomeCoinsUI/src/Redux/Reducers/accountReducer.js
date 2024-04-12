import { removeElementByKey, updateArrByIndex } from "../../Utils/CommonAuthFunction";
import { ACCOUNT_ADD_FAIL, ACCOUNT_ADD_REQUIEST, ACCOUNT_ADD_SUCCESS, ACCOUNT_FAIL,  ACCOUNT_REQUIEST, ACCOUNT_SUCCCESS} from "../constants";
const initialState = {
    account:[],
    isLoading:false
}
const handlePayload = (prevList,actionList) =>{
    switch(actionList.methodType){
        case "post":
            return [...prevList,...actionList];
        case "patch":
            actionList.amount=parseFloat(actionList.amount);
            return removeElementByKey(updateArrByIndex(prevList,"_id",actionList),"date",actionList.date)
        case "delete":
            return removeElementByKey(prevList,"_id",actionList._id);
        default:
            return prevList
    };
};
export const accountReducer = (state =initialState,action) => {
    switch(action.type){
        case ACCOUNT_REQUIEST:
        case ACCOUNT_ADD_REQUIEST:
        return{
            ...state,
            isLoading:true,
        };
        case ACCOUNT_SUCCCESS:
        return{
            ...state,
            isLoading:false,
            account:action.payload
        };
        case ACCOUNT_ADD_SUCCESS:
            let earnList=state.account.earnList,expendList=state.account.expendList,actionList=action.payload;
            if(actionList.earnBy){
                earnList = handlePayload(earnList,actionList)
            };
            if(actionList.expendBy){
                expendList = handlePayload(expendList,actionList)
            }
            console.log({...state.account,earnList,expendList});
            return{
                ...state,
                account:{...state.account,earnList,expendList},
                isLoading:false,
            };
        case ACCOUNT_FAIL:
        return{
            ...state,
            isLoading:false,
            account:[]
        };
        case ACCOUNT_ADD_FAIL:
            return{
                ...state,
                isLoading:false,
                addEarn:null
            }
        default:
            return state
    };
};