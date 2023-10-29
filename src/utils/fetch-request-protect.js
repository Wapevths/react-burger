import { getCookie, setCookie } from "./cookie";
import {BASE_URL, request} from "./fetch-request";


const updateToken = () => {
    return request(`/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: getCookie("refreshToken"),
        }),
    })
};

export const fetchWithRefresh = async (endpoint, options) => {
    try {
        return await request(endpoint, options)

    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await updateToken();
            if (!refreshData.success) {
                Promise.reject(refreshData);
            }
            setCookie("refreshToken", refreshData.refreshToken);
            setCookie("token", refreshData.accessToken.split('Bearer ')[1]);
            options.headers.authorization = refreshData.accessToken;
            await request(endpoint, options)
        } else {
            return Promise.reject(err);
        }
    }
};