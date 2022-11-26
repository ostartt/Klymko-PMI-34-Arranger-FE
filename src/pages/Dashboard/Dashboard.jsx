import React, {useEffect, useRef, useState} from 'react'
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
                       logsList
                   }) => {

    const navigate = useNavigate();

    const inputRef = useRef(null)

    // load users
    useEffect(() => {
        loadLogs()
    }, [loadLogs, page])

    useEffect(() => {
        // inputRef.current.focus()
        const logsTimeout = setInterval(loadLogs, 5000);
        return () => {
            clearInterval(logsTimeout)
        }
    })

    const [givenString, setGivenString] = useState("");
    const [errors, setErrors] = useState({})

    const isValid = () => {
        const {errors, isValid} = validateInput(givenString)
        if (!isValid) {
            setErrors(errors)
        }
        return isValid
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isValid()) {
            addTask(givenString).then(() => {
                loadLogs()
            })
            setGivenString("")
            setErrors({})
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
                    ref={inputRef}
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
                    isLoading={!logsList.length}
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
    logsList: state.rating.logsList,
    page: state.rating.page,
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
