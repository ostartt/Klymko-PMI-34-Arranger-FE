import Validator from "validator";

export const validateInput = data => {
    let errors = {}
    if (Validator.isEmpty(data.trim())) {
        errors.givenString = 'String is required'
    } else if (data.length > 10) {
        errors.givenString = 'String length too long, max 10 symbols'
    }
    return {
        errors,
        isValid: JSON.stringify(errors) === '{}'
    }
}