function map_user_request(requestData, user) {
    // requestData = req.body
    if (requestData.userName) {
        user.userName = requestData.userName
    }
    if (requestData.firstName) {
        user.first_name = requestData.firstName
    }
    if (requestData.lastName) {
        user.last_name = requestData.lastName
    }
    if (requestData.password) {
        user.password = requestData.password
    }
    if (requestData.email) {
        user.email = requestData.email
    }
    if (requestData.gender) {
        user.gender = requestData.gender
    }
    if (requestData.phone) {
        user.phone = requestData.phone
    }
    if (!user.address) {
        user.address = {}
    }
    if (requestData.tempAddress) {
        user.address.temporaryAddress = requestData.tempAddress.split(",")
    }

    if (requestData.permanentAddress) {
        user.address.permanentAddress = requestData.permanentAddress
    }
    if (requestData.date_of_birth) {
        user.DOB = requestData.date_of_birth
    }
    if (requestData.role) {
        user.role = requestData.role
    }

// for single file
    // if (requestData.image){
    //     user.image = requestData.image
    // }

    if (requestData.image){
        user.image = requestData.image
    }
    return user;
}

module.exports = map_user_request