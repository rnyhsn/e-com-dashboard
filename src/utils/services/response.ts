export const successResponse = (status = 200, message = "Success",  payload = {}) => {
    return {
        success: true,
        status,
        payload,
    }
}

export const errorResponse = (status= 500, message = "Fail", error = {}) => {
    return {
        success: false,
        status,
        message,
        error
    }
}