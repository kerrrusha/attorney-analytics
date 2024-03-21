export async function doPostRequestReturnResponse(requestBody: any, path: string) {
    const API_URL = process.env.REACT_APP_BACKEND_ORIGIN;

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
