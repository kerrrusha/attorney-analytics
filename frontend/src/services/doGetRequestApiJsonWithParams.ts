export async function doGetRequestApiJsonWithParams(path: string, params: any) {
    const API_URL = process.env.REACT_APP_BACKEND_ORIGIN;
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');

    const response = await fetch(`${API_URL}${path}?${queryString}`, {
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
