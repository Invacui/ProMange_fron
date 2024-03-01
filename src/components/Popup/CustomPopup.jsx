import React from "react";
import "../../style/addtask.css";
import "../../style/custompopup.css";
const CustomPopup = ({ message, onConfirm, onCancel ,setShowCustomPopup}) => {
    const handleInnerClick = (e) => {
        e.stopPropagation();
    };
  return (
    <div className="Add_task_main_body custom" onClick={(e) => setShowCustomPopup(false)}>
      <div className="Add_task_sub_body custom" onClick={handleInnerClick}>
        <h5 className="custompopheading">{`Are you sure you want to ${message} ?`}</h5>
        <button className="custompopyesbtn" onClick={onConfirm}>{`Yes, ${message}`} </button>
        <button className="custompopcancelbtn" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default CustomPopup;
