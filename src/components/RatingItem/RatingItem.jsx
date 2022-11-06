import React from "react";
import {connect} from "react-redux"

import "./rating-item.styles.scss";

const logsEnum = {
  "DONE": "Done",
  "RAW": "Load",
};

const RatingItem = ({ id, permutation, instanceId, permutationStatus}) =>
{
  const {
    givenString, permutationNumber
  } = permutation
  return (
  <div className="task-item">
    <div className="task-data dashboard-task-id">
      <p>{id.slice(-5)}</p>
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
)};


export default RatingItem;
