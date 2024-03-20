import {API_ENDPOINTS} from "../common/constants";
import {HireEmployeeRequest} from "../common/commonTypes";

export async function postHireEmployee(requestBody: HireEmployeeRequest) {
    const API_URL = process.env.REACT_APP_BACKEND_ORIGIN;
    const path = API_ENDPOINTS.postHireEmployee;

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
