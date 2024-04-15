import { removeElementByKey, updateArrByIndex } from "../../Utils/CommonAuthFunction";
import { ACCOUNT_ADD_FAIL, ACCOUNT_ADD_REQUIEST, ACCOUNT_ADD_SUCCESS, ACCOUNT_FAIL,  ACCOUNT_REQUIEST, ACCOUNT_SUCCCESS} from "../constants";
const initialState = {
    account:[],
    isLoading:false
}
const handlePayload = (prevList,actionList) =>{
    let isUpdateData = false;
    if(actionList.date !== actionList.modalDate){
        isUpdateData=true;
    };
    switch(actionList.methodType){
        case "post":
            return  isUpdateData ? prevList : [...prevList,actionList];
        case "patch":
            actionList.amount=parseFloat(actionList.amount);
            let updateData = updateArrByIndex(prevList,"_id",actionList);
            if(isUpdateData){
                updateData=removeElementByKey(updateData,"date",actionList.date)
            }
            return updateData;
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
            if(actionList.expendType){
                expendList = handlePayload(expendList,actionList)
            }
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