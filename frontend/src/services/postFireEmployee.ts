import {API_ENDPOINTS} from "../common/constants";
import {FireEmployeeRequest} from "../common/commonTypes";

export async function postFireEmployee(requestBody: FireEmployeeRequest) {
    const API_URL = process.env.REACT_APP_BACKEND_ORIGIN;
    const path = API_ENDPOINTS.postFireEmployee;

    return await fetch(`${API_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(requestBody),
        credentials: 'include',
    });
}
