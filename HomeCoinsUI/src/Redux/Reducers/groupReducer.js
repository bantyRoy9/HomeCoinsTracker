import { GROUP_CREATE_FAIL, GROUP_CREATE_REQUEST, GROUP_CREATE_SUCCESS } from "../constants"

export const groupReducer = (state = { group: {} }, action) => {
    switch (action.type) {
        case GROUP_CREATE_REQUEST:
            return {
                isLoading: true
            }
        case GROUP_CREATE_SUCCESS:
            return {
                isLoading: false,
                group: action.payload,
            }

        case GROUP_CREATE_FAIL:
            return {
                isLoading: false,
                group: {}
            }
        default:
            return state
    }
}