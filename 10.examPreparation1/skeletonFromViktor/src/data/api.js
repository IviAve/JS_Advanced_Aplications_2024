async function request(metod, url, data){
    const options = {
        metod,
        headers: {}
    };

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);


    }

    const userData = getUserData();

    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        const response = await fetch(host + url, options);

        if (!response.ok) {
            const err = await response.json();

            if (response.status == 403 && err.message == 'Invalid access token') {
                clearUserData();
            }

            throw new Error(err.message);
        }

        if (response.status == 204) {
            return response;

        } else {
            return response.json();
        }

    } catch (err) {
        // TODO use error reporting technique as described in exam requirements
        alert(err);
        throw err;
    }
}

export const get = (url) => request('get', url);
export const post = (url) => request('post', url, data);
export const put = (url) => request('put', url, data);
export const del = (url) => request('delete', url); 
