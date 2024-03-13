import {API_ENDPOINTS} from "../common/constants";
import {LoginRequest} from "../common/commonTypes";

export async function login(requestBody: LoginRequest) {
    const API_URL = process.env.REACT_APP_BACKEND_ORIGIN;
    const path = API_ENDPOINTS.login;

    const response = await fetch(`${API_URL}${path}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(requestBody),
    });

    return response.status;
}
