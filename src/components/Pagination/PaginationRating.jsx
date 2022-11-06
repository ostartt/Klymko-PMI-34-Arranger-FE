import React from 'react'

import './pagination.styles.scss'

import PaginationList from './PaginationList'

//redux
import { connect } from 'react-redux'
import { changePage } from '../../redux/rating/rating.actions'

const PaginationTaskHistory = ({ page, changePage, totalLogs }) => {
  const AMOUNT = 2
  // max number of pages to show from left and right sides
  const MAX_NUM_OF_PAGES = 2

  return (
    <PaginationList
      page={page}
      changePage={changePage}
      totalTasks={totalLogs}
      amount={AMOUNT}
      maxNumOfPages={MAX_NUM_OF_PAGES}
    />
  )
}
const mapStateToProps = (state) => ({
  page: state.rating.page,
  totalLogs: state.rating.logsLength,
})

const mapDispatchToProps = (dispatch) => ({
  changePage: (page) => dispatch(changePage(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PaginationTaskHistory)
