import Validator from "validator";

export const validateInput = data => {
    let errors = {}
    if (Validator.isEmpty(data.trim())) {
        errors.givenString = 'String is required'
    } else if (data.length > 10 || data.length < 3) {
        errors.givenString = 'String length is incorrect (min - 3, max - 10)'
    }
    return {
        errors,
        isValid: JSON.stringify(errors) === '{}'
    }
}