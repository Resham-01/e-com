import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ShowSuccess = msg => {
    toast.success(msg)
}
const ShowError = msg => {
    toast.error(msg)
}
const ShowWarning = msg => {
    toast.warn(msg)
}
const ShowInfo = msg => {
    toast.info(msg)
}

export const Notify = {
    ShowInfo,
    ShowError, 
    ShowSuccess,
    ShowWarning
}

