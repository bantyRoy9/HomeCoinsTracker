import { ACTIVITY_FAIL, ACTIVITY_REQUIEST, ACTIVITY_SUCCESS } from "../constants";

export const activityReducer=(state={activity:{}},action)=>{
    switch(action.type){
        case ACTIVITY_REQUIEST:
            return {
                isLoading:true,
                activity:null
            }
            case ACTIVITY_SUCCESS:
                return{
                    isLoading:false,
                    activity:[...state.activity, action.payload.data]
                }
                case ACTIVITY_FAIL:
                    return{
                        isLoading:false,
                        activity:null
                    }
        default:
            return state
    }

}

