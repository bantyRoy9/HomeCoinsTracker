import { GET_EXPENDTYPE_REQUEST, GET_EXPENDTYPE_RESPONSE, GET_SOURCE_FAIL, GET_SOURCE_REQUEST, GET_SOURCE_RESPONSE } from "../constants";

export const sourceReducer = (state={source:[],expendType:[]},action) =>{
    switch(action.type){
        case GET_SOURCE_REQUEST:
        case GET_EXPENDTYPE_REQUEST:
            return {
                ...state
            }
        case GET_SOURCE_RESPONSE:
            return {
                ...state,
                source:action.payload
            }
        case GET_EXPENDTYPE_RESPONSE:
            return{
                ...state,
                expendType:action.payload
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