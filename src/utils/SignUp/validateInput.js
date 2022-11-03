import Validator from "validator";

export const validateInput = data => {
    let errors = {}

    if (Validator.isEmpty(data.firstName.trim())) {
        errors.firstName = 'First name is required'
    } else if (!/^[a-zA-Z]+$/.test(data.firstName) || data.firstName.length >= 25 || data.firstName.length <= 1) {
        errors.firstName = 'First name is invalid'
    }
    if (Validator.isEmpty(data.lastName.trim())) {
        errors.lastName = 'Last name is required'
    } else if (!/^[a-zA-Z]+$/.test(data.lastName) || data.lastName.length >= 25 || data.lastName.length <= 1) {
        errors.lastName = 'Last name is invalid'
    }
    if (Validator.isEmpty(data.email.trim())) {
        errors.email = 'Email is required'
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if (Validator.isEmpty(data.password.trim())) {
        errors.password = 'Password is required'
    } else if (!data.password.match(/[0-9]/g) || data.password.length <= 8 || data.password.length >= 25 || !data.password.match(/[A-Z]/g)) {
        errors.password = 'Password is invalid'
    }
    if (Validator.isEmpty(data.confirmPassword.trim())) {
        errors.confirmPassword = 'Confirm password is required'
    } else if (!data.password.match(/[0-9]/g) || data.password.length <= 8 || data.password.length >= 25 || !data.password.match(/[A-Z]/g)) {
        errors.confirmPassword = 'Confirm password is invalid'
    }
    if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = 'Passwords must match';
    }
    return {
        errors,
        isValid: JSON.stringify(errors) === '{}'
    }
}