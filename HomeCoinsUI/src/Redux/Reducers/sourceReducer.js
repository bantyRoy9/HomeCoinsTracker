import { GET_SOURCE_FAIL, GET_SOURCE_REQUEST, GET_SOURCE_RESPONSE } from "../constants";

export const sourceReducer = (state={source:[]},action) =>{
    switch(action.type){
        case GET_SOURCE_REQUEST:
            return {
                ...state
            }
        case GET_SOURCE_RESPONSE:
            return {
                ...state,
                source:action.payload
            }
        case GET_SOURCE_FAIL:
            return{
                ...state,
                source:[]
            }
        default:
            return{
                ...state
            }
    }
}