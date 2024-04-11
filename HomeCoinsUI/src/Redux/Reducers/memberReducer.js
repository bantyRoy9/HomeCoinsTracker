import { GET_MEMBER_FAIL, GET_MEMBER_REQUEST, GET_MEMBER_RESPONSE } from "../constants";

export const memberReducer = (state={member:[]},action) =>{
    switch(action.type){
        case GET_MEMBER_REQUEST:
            return{
                ...state,
                isLoading:true,
            }
        case GET_MEMBER_RESPONSE:
            return{
                ...state,
                member:action.payload,
                isLoading:false
            }
        case GET_MEMBER_FAIL:
            return{
                ...state,
                member:[],
                isLoading:false
            }
        default:
            return{
                ...state,
                isLoading:false
            }
    }
}