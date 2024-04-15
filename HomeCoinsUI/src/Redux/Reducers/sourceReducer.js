import { handleReducerPayload } from "../../Utils/CommonAuthFunction";
import { GET_EXPENDTYPE_REQUEST, GET_EXPENDTYPE_RESPONSE, GET_SOURCE_FAIL, GET_SOURCE_REQUEST, GET_SOURCE_RESPONSE } from "../constants";

export const sourceReducer = (state={source:[],expendType:[]},action) =>{
    switch(action.type){
        case GET_SOURCE_REQUEST:
        case GET_EXPENDTYPE_REQUEST:
            return {
                ...state
            }
        case GET_SOURCE_RESPONSE:
            const source =handleReducerPayload(action.payload.data,state.source,action.payload.method,"_id"); 
            return {
                ...state,
                source
            }
        case GET_EXPENDTYPE_RESPONSE:
            let expendType=handleReducerPayload(action.payload.data,state.expendType,action.payload.method,"_id");
            return{
                ...state,
                expendType
            }
        case GET_SOURCE_FAIL:
            return{
                ...state,
                source:[]
            }
        case GET_SOURCE_FAIL:
            return{
                ...state,
                expendType:[]
            }
        default:
            return{
                ...state
            }
    }
}