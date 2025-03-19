import React from "react";
import "./TaskCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
function TaskCard({ taskText, addedTime, delFunc, editFunc, textEdited }) {
  return (
    <>
      <div className="card">
        <div className="card-task">
          <div className="card-task-text">
            <span>{taskText}</span>
            <span className="edited">{textEdited}</span>
          </div>
          <div className="card-task-time">
            {`${addedTime} `} &nbsp;
            <FontAwesomeIcon className="clock-icon icon" icon={faClock} />
          </div>
        </div>
        <div className="card-button">
          <button className="card-btn">
            <FontAwesomeIcon
              className="icon-btn icon"
              onClick={editFunc}
              icon={faPenToSquare}
            />
          </button>
          <button className="card-btn">
            <FontAwesomeIcon
              className="icon-btn icon-del icon"
              onClick={delFunc}
              icon={faTrash}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default TaskCard;
