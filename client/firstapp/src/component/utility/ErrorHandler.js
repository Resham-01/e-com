import { Notify } from "./toaster"

export const ErrorHandler = (err) => {
    let errMsg = "Something went to wrong"
    if (err) {
        if (err.response) {
            if (err.response.data) {
                if (err.response.data.err) {
                    errMsg= err.response.data.err
               }
            }
        }
    }
    Notify.ShowError(errMsg)
}

