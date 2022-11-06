import './rating-list.styles.scss'
import React from "react";
import RatingItem from "../RatingItem/RatingItem";
import {connect} from "react-redux";
import WithSpinner from "../withSpinner/withSpinner";



const RatingList = ({logsList, userId}) => {
    console.log(logsList)
    return (
        logsList.map((logs) => <RatingItem key={logs.id} {...logs} userId={userId} />)
    )
}


const mapStateToProps = state => ({
    logsList: state.rating.logsList,
    userId: state.auth.userObject?.id,
})

export default connect(mapStateToProps)(WithSpinner(RatingList));