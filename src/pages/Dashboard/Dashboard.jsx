import React, { useEffect, useState } from 'react'
import './dashboard.styles.scss'

import RatingList from '../../components/RatingList/RatingList'
import PaginationRating from '../../components/Pagination/PaginationRating'

import {
  requestLogsList,
  changePage,
} from '../../redux/rating/rating.actions'
import { connect } from 'react-redux'


const Dashboard = ({
  loadLogs,
  isFetching,
  page,
  changePage,
}) => {

  // load users
  useEffect(() => {
    loadLogs()
  }, [loadLogs, page])


  return (
    <div className="dashboard">
      <h1>Logs</h1>
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
      <PaginationRating />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  loadLogs: () =>
    dispatch(requestLogsList()),
  changePage: (page) => dispatch(changePage(page)),
})

const mapStateToProps = (state) => ({
  isFetching: state.rating.isFetching,
  page: state.rating.page,
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
