import React, {useEffect, useState} from 'react'

import {Link, useNavigate} from 'react-router-dom'
import './sign-up.styles.scss'
import FormInput from '../../components/FormInput/FormInput'
import Password from '../../components/Password/Password'
import CustomButton from '../../components/CustomButton/CustomButton'
import {
    authFailureReset,
    userSignUpRequest,
} from '../../redux/auth/auth.actions'
import {connect} from 'react-redux'
import {validateInput} from '../../utils/SignUp/validateInput'
import TitleFormField from '../../components/_common/TitleFormField/TitleFormField'
import SubtitleFormField from "../../components/_common/SubtitleFormField/SubtitleFormField";

const SignUp = ({
                    signUpRequest,
                    resetErrorMessage,

                    auth: {isLoading, errorMessage},
                }) => {
    useEffect(
        () => () => {
            if (errorMessage) {
                resetErrorMessage()
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },
        // eslint-disable-next-line
        []
    )
    const navigate = useNavigate()
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({})

    function signIn() {
        navigate("/");
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
        if (name === 'email') {
            resetErrorMessage()
        }
        setErrors({...errors, [name]: ''})
    }

    const isValid = () => {
        const {errors, isValid} = validateInput(user)
        if (!isValid) {
            setErrors(errors)
        }
        return isValid
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (isValid()) {
            const userData = {...user, confirmPassword:undefined}
            const result = await signUpRequest(userData)

            if (result) {
                setUser({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                })
                setErrors({})
                signIn()
            }
        }
    }
    return (
        <div className="signup-container">
            <div className="signup">
                <TitleFormField>Sign Up</TitleFormField>
                <SubtitleFormField/>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="signup-form__flex">
                        <FormInput
                            type="text"
                            name={'firstName'}
                            value={user.firstName}
                            onChange={handleChange}
                            label={'First name'}
                            error={errors.firstName}
                        />
                        <FormInput
                            type="text"
                            name={'lastName'}
                            value={user.lastName}
                            onChange={handleChange}
                            label={'Last name'}
                            error={errors.lastName}
                        />
                    </div>
                    <FormInput
                        type="text"
                        name={'email'}
                        value={user.email}
                        onChange={handleChange}
                        label={'Email address'}
                        error={errors.email ? errors.email : errorMessage}
                    />
                    <div className="signup-form__flex">
                        <Password
                            name={'password'}
                            value={user.password}
                            onChange={handleChange}
                            label={'Password'}
                            error={errors.password}
                        />
                        <Password
                            name={'confirmPassword'}
                            value={user.confirmPassword}
                            onChange={handleChange}
                            label={'Confirm password'}
                            error={errors.confirmPassword}
                        />
                    </div>
                    <div className={'signup-form__buttons signup-form__flex'}>
                        <CustomButton disabled={isLoading} type="submit">
                            Sign up
                        </CustomButton>

                    </div>
                </form>
                <p className="signup__description">
                    Already have an account?{' '}
                    <Link className="signup__link" to={'/sign-in'}>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    signUpRequest: (user) => dispatch(userSignUpRequest(user)),
    resetErrorMessage: () => dispatch(authFailureReset()),
})
const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
