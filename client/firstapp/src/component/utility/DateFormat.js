
import moment from "moment";

export const DateFormat = (date, format='YYYY-MM-DD') => {
    return moment(date).format(format)
}

