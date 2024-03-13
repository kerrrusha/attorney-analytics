import {API_ENDPOINTS} from "../common/constants";
import {RegisterRequest} from "../common/commonTypes";

export async function register(requestBody: RegisterRequest) {
    const API_URL = process.env.REACT_APP_BACKEND_ORIGIN;
    const path = API_ENDPOINTS.register;

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