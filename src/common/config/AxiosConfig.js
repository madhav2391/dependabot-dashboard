import axios from "axios"

const instance = axios.create({
    baseURL: "https://api.github.com"
});

instance.interceptors.request.use(request => {
    return request;
}, error => {
    return Promise.reject(error);
}
);

instance.interceptors.response.use(response => {
    return response;
},
    error => {
        return Promise.reject(error);
    }
);

instance.defaults.headers.common["Content-Type"] = "application/json";
instance.defaults.headers.common["Accept"] = "application/vnd.github+json";

const token = "Bearer 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";
if (token) {
    instance.defaults.headers.common.Authorization = token;
}
export default instance;