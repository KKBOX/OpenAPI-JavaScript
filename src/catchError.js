/**
 * @ignore
 */
export const apiError = (error) => {
    if (error.response) {
        throw new Error(error.response.data.error.message)
    } else {
        throw new Error(error.message)
    }
}

/**
 * @ignore
 */
export const authError = (error) => {
    throw new Error(error.response.data.error)
}
