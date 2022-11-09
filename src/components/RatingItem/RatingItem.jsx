import React, {useState} from "react";

import "./rating-item.styles.scss";
import Close from "./images/close.svg"
import {connect} from "react-redux";
import {cancelTask} from "../../redux/rating/rating.actions";

const logsEnum = {
    "DONE": "Done",
    "RAW": "Load",
    "INTERRUPTED": "Stop"
};

const RatingItem = ({
                        id,
                        permutation,
                        instanceId,
                        permutationStatus,
                        startUpTime,
                        shutDownTime,
                        executionTime,
                        cancelTask
                    }) => {
    const {
        givenString, permutationNumber
    } = permutation

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(true)

    }

    const handleClose = () => {
        setIsOpen(false);
    }
    const handleCancel = () => {
        cancelTask(id)
        handleClose()
    }


    return (
        <>
            <div className="task-item" role={"button"} onClick={handleClick}>
                <div className="task-data dashboard-task-id">
                    <p>{id.slice(20, 25)}</p>
                </div>
                <div className="task-data dashboard-task-full-name">
                    <p>{givenString}</p>
                </div>
                <div className="task-data dashboard-task-points">
                    <p>{permutationNumber}</p>
                </div>
                <div className="task-data dashboard-task-points">
                    <p>{instanceId.slice(-5)}</p>
                </div>
                <div className={"dashboard-category " + logsEnum[permutationStatus].toLowerCase()}>
                    <p>{logsEnum[permutationStatus]}</p>
                </div>
            </div>
            {
                isOpen
                &&
                <div className={"pop-up-container"}>
                    <div className={"pop-up"}>
                        <div className={"pop-up__close"} role={"button"} onClick={handleClose}>
                            <img src={Close} alt={"close"}/>
                        </div>
                        <h1>Logs</h1>
                        <div className="column">
                            <div className="row">
                              <span className={"bold"}>
                              ID:
                          </span>
                                {id.slice(20, 25)}
                            </div>
                            <div className="row">
                                 <span className={"bold"}>
                              String:
                          </span>
                                {givenString}
                            </div>
                            <div className="row">
                                 <span className={"bold"}>
                              Number:
                          </span>
                                {permutationNumber}
                            </div>
                        </div>
                        <div className="column">
                            <div className="row">
                              <span className={"bold"}>
                              Instance:
                          </span>
                                {instanceId.slice(-5)}
                            </div>
                            <div className="row">
                                 <span className={"bold"}>
                              Start:
                          </span>
                                {new Date(startUpTime).toLocaleTimeString()}
                            </div>
                            <div className="row">
                                 <span className={"bold"}>
                              Finish:
                          </span>
                                {new Date(shutDownTime).toLocaleTimeString()}
                            </div>
                        </div>
                        <div className="column">
                            <div className="row">
                              <span className={"bold"}>
                              Time:
                          </span>
                                {executionTime}
                            </div>
                            <div className="row">
                                 <span className={"bold"}>
                              Status:
                          </span>
                                {logsEnum[permutationStatus]}
                            </div>
                            <div className={"empty-row"}/>
                        </div>
                        <div className="column-button">
                            <button className="dashboard-button" type={"button"} onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};


const mapDispatchToProps = (dispatch) => ({
    cancelTask: (logId) => dispatch(cancelTask(logId)),
})
const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, mapDispatchToProps)(RatingItem)
