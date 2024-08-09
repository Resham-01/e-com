import axios from "axios"

const BaseURL = "http://localhost:8000"

const myAxios = axios.create({
    baseURL: BaseURL,
});

const getHeader = (isSecured) => {
    let options = {
        "Content-Type": "application/json"
    }
    if (isSecured) {
        var token = JSON.parse(localStorage.getItem("user_details"))
        options["Authorization"] = token.token
    }
    return options
}

const GET = (url, data, params) => {
    return myAxios.get(url, data, {
        headers: getHeader()
    })
}

const POST = (url, data, isSecured = false) => {
    return myAxios.post(url, data, {
        headers: getHeader(isSecured)
    })
}

const PUT = (url, data, isSecured = false) => {
    return myAxios.put(url, data, {
        headers: getHeader(isSecured)
    })
}

const DELETE = (url, isSecured = false) => {
    return myAxios.delete(url, {
        headers: getHeader(isSecured)
    })
}

const httpClient = {
    GET,
    POST,
    PUT,
    DELETE
}

export default httpClient;
