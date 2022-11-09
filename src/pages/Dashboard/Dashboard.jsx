import React, {useEffect, useState} from 'react'
import './dashboard.styles.scss'

import RatingList from '../../components/RatingList/RatingList'
import PaginationRating from '../../components/Pagination/PaginationRating'

import {
    requestLogsList,
    changePage,
    addTask
} from '../../redux/rating/rating.actions'
import {connect} from 'react-redux'
import FormInput from "../../components/FormInput/FormInput";
import {useNavigate} from "react-router-dom";
import {validateInput} from "../../utils/Dashboard/validateInput";


const Dashboard = ({
                       loadLogs,
                       isFetching,
                       page,
                       addTask,
                       changePage,
                   }) => {

  const navigate = useNavigate();
    // load users
    useEffect(() => {
        loadLogs()
    }, [loadLogs, page])

    const [givenString, setGivenString] = useState("");
    const [errors, setErrors] = useState({})

    const isValid = () => {
        const {errors, isValid} = validateInput(givenString)
        if (!isValid) {
            setErrors(errors)
        }
        return isValid
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(isValid()) {
            addTask(givenString)
            setGivenString("")
            setErrors({})
            navigate(0);
        }

    }

    return (
        <div className="dashboard">
            <h1>Dashboard - Logs</h1>
            <form className={"dashboard-form"} onSubmit={handleSubmit}>
                <FormInput
                    name={'givenString'}
                    type="text"
                    label={'string'}
                    value={givenString}
                    onChange={(e) => setGivenString(e.target.value)}
                    error={errors.givenString}
                />
                <button type={"submit"} className={"dashboard-button"}>Submit</button>
            </form>
            <div className="dashboard-task-table">
                <div className="dashboard-table-header">
                    <p>ID</p>
                    <p>String</p>
                    <p>Number</p>
                    <p>Instance</p>
                    <p>Status</p>
                </div>
                <RatingList
                    isLoading={isFetching}
                />
            </div>
            <PaginationRating/>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    loadLogs: () =>
        dispatch(requestLogsList()),
    changePage: (page) => dispatch(changePage(page)),
    addTask: (string) => dispatch(addTask(string)),
})

const mapStateToProps = (state) => ({
    isFetching: state.rating.isFetching,
    page: state.rating.page,
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
