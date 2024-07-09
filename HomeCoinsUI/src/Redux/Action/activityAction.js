import axios from "axios"
import { ACCOUNT_ADD_FAIL, ACTIVITY_REQUIEST, ACTIVITY_SUCCESS } from "../constants"
import { activityControllerURL } from "../../Utils/URLProperties"
import { getAxiosHeader } from "../../Utils/CommonAuthFunction"

export const getActivity = (groupId, page = 1, limit = 30) => async (dispatch) => {
    try {
        dispatch({ type: ACTIVITY_REQUIEST })
        console.log(`${activityControllerURL}/activity/${groupId}?page=${page}&limit=${limit}`);
        const { data } = await axios.get(`${activityControllerURL}/activity/${groupId}?page=${page}&limit=${limit}`, await getAxiosHeader());
        if (data) {
            dispatch({ type: ACTIVITY_SUCCESS, payload: data.data });
        }
    } catch (err) {
        dispatch({ type: ACCOUNT_ADD_FAIL, payload: null });
    }
}