export async function doGetRequestApiJson(path: string) {
    const API_URL = process.env.REACT_APP_BACKEND_ORIGIN;

    const response = await fetch(`${API_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include',
    });

    if (!response) {
        return null;
    }
    return response.status === 200 ? response.json() : null;
}
