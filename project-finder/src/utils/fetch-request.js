export const postRequest = (url, payload) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    }).then(res => res.json()).catch(err => err);
}

export const getRequest = (url) => {
    return fetch(url, {
        method: 'GET',
        credentials: 'include'
    }).then(res => res.json())
}