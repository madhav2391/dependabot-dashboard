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
const gToken = localStorage.getItem("token")
const token = "Bearer "+gToken;
if (token) {
    instance.defaults.headers.common.Authorization = token;
}
export default instance;