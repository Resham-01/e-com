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
        options["Authorization"] = token && token.token? token.token : null
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


const UPLOAD = (method, url, data, files = []) => {
    const xhr = new XMLHttpRequest()
    const formData = new FormData()

    console.log("data :", data)
    console.log("files : ", files)  

    for (var key in data) {
        formData.append(key, data[key])
    }

    // for single file

    // if (files.length) {
    //     formData.append('img', files[0], files.filename)
    // }


    // for multiple file upload
    if (files.length) {
        files.forEach((item, index) => {
            formData.append('img', files[index])
        })
    }


    return new Promise((resolve, reject) => {
        // console.log("within a promise")
        xhr.onreadystatechange = () => {
            // console.log(" within a onreadystatechange")
            if (xhr.readyState === 4) {
                // console.log("req-res cycle completed")
                if (xhr.status === 200) {
                    // console.log("success in a file upload")
                    resolve(xhr.response)
                }
                else {
                    // console.log("failure in a file upload")
                    reject(xhr.response)
                }
            }
        }

        var token = JSON.parse(localStorage.getItem("user_details")).token
        // console.log("token is: ", token)
        xhr.open(method, `${BaseURL}${url}?token=${token}`, true)
        // xhr.setRequestHeader("Authorization", token);

        xhr.send(formData);
    })
}


const httpClient = {
    GET,
    POST,
    PUT,
    DELETE,
    UPLOAD
}

export default httpClient;
