import axios from "axios"

const BaseURL = "http://localhost:8000"

const myAxios = axios.create({
    baseURL: BaseURL,
});

const getHeader = () => {
    let options = {
        "Content-Type": "application/json"
    }
    return options
}

const GET = (url, data, params) => {
    return myAxios.get(url,data, {
        headers: getHeader()
    }) 
}

const POST = (url, data, params) => {
    return myAxios.post(url,data, {
        headers: getHeader()
    }) 
}

const PUT = (url, data, params) => {
    return myAxios.put(url,data, {
        headers: getHeader()
    }) 
}

const DELETE = (url, params) => {
    return myAxios.delete(url, {
        headers: getHeader()
    }) 
}

const httpClient = {
    GET,
    POST,
    PUT,
    DELETE
}

export default httpClient;
