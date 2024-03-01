import React, { useState } from 'react';
import { format } from 'date-fns';
import "../../../../style/card.css";
import { minimizetwo } from "../../../../assets/FaviconIndex";
import { handleChecklistItemUpdate, handleDeleteTask, handleShare, updateTaskStatus } from '../../../../services/KanbanDataHandler';
import { threedots } from "../../../../assets/FaviconIndex";
import Add_task from './Add_task';
import CustomPopup from '../../../Popup/CustomPopup';

const Card = ({ task, toggle, setToggle, full_minimized }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [EditForm, setEditForm] = useState(false);
  const checkedCount = task.checklist.filter(item => item.checked).length;
  const [showCustomPopup, setShowCustomPopup] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);

  const handleChecklistChange = async (itemId, checked) => {
    await handleChecklistItemUpdate(task._id, itemId, checked)
    setToggle(!toggle)
  };

  const handleStatusChange = async (newStatus) => {
    const task_data = await updateTaskStatus(task._id, newStatus);
    console.log("Received the Updated Task data=>", task_data)
    setToggle(!toggle)
  };

  const handleShareEditDelete = async (taskId, e) => {
    switch (e.target.innerText) {
      case "Delete":
        setTaskIdToDelete(taskId);
        setShowCustomPopup(true);
        break;
      case "Share":
        await handleShare(taskId);
        break;
      case "Edit":
        setEditForm(true);
        break;
      default:
        break;
    }
  };

  const handleConfirmDelete = async () => {
    await handleDeleteTask(taskIdToDelete);
    setToggle(!toggle);
    setShowCustomPopup(false);
  };

  const formatDate = (dateString) => {
    try {
      if (!dateString) return ''; // Handle case where dateString is not provided
      const date = new Date(dateString);
      return format(date, "MMM do"); // Format the date as "Mar 1st"
    } catch (error) {
      console.error("Error while formatting date:", error);
      return ''; // Return empty string in case of error
    }
  };

  const isPastDue = (dueDateString) => {
    const dueDate = new Date(dueDateString);
    const currentDate = new Date();
    return dueDate < currentDate;
  };

  const getBackgroundColor = () => {
    if (task.status === 'Done') {
      return 'green'; // Background color for done tasks
    } else if (task.dueDate && isPastDue(task.dueDate)) {
      return 'red'; // Background color for past due dates
    } else {
      return 'grey'; // Default background color
    }
  };

  return (
    <div className="Kanban_card_box">
      <div className="card_heading">
        <label className={`task_priority ${task.priority}`}>{task.priority}</label>
        <div className="filter_data" style={{ "width": "auto" }}>
          <div className="dropdown-select">
            <img src={threedots} style={{ "width": "14px", "height": "14px" }} className="selected_filtered_option" />
          </div>
          <div className="dropdown-list" style={{ "left": "-70px", "background": "white", "color": "black" }} id="filter_data_options">
            <button defaultValue="Edit" onClick={(e) => { handleShareEditDelete(task._id, e) }}>Edit</button>
            <button value="Share" onClick={(e) => { handleShareEditDelete(task._id, e) }}>Share</button>
            <button value="Delete" style={{ "color": "red" }} onClick={(e) => { handleShareEditDelete(task._id, e) }}>Delete</button>
          </div>
        </div>
      </div>
      <h3 className='Card_title'>{task.title}</h3>
      <div className={`Full_task_min ${full_minimized ? "minimize_full" : ""}`}>
        <div className="checklist_n_minimize">
          <h5>Checklist: ({checkedCount}/{task.checklist.length})</h5>
          <img className={`minimizetwo_img ${isMinimized ? 'minimize' : ''}`} src={minimizetwo} onClick={() => { setIsMinimized(!isMinimized) }} />
        </div>
        <div className={`check_list_view ${isMinimized ? 'minimize' : ''}`}>
          <ul>
            {task.checklist.map((item, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleChecklistChange(item._id, !item.checked)}
                />
                <div>{item.description}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="switch_buttons">
          <div className="status_buttons">
            {task.status !== "To Do" && (
              <button onClick={() => handleStatusChange("To Do")}>To Do</button>
            )}
            {task.status !== "Backlog" && (
              <button onClick={() => handleStatusChange("Backlog")}>Backlog</button>
            )}
            {task.status !== "In Progress" && (
              <button onClick={() => handleStatusChange("In Progress")}>In Progress</button>
            )}
            {task.status !== "Done" && (
              <button onClick={() => handleStatusChange("Done")}>Done</button>
            )}
          </div>
          {task.dueDate ? (<div
            className="due-Date"
            style={{ backgroundColor: getBackgroundColor() }}
          >
            {formatDate(task.dueDate.toString())}
          </div>) : (<span className="no_due_date"></span>)}
        </div>
      </div>
      {EditForm === true && (
        <Add_task setToggleForm={setEditForm} TaskData={task} setToggle={setToggle} toggle={toggle} />
      )}
      <div>
        {showCustomPopup && (
          <CustomPopup
            message="Delete"
            onConfirm={handleConfirmDelete}
            onCancel={() => setShowCustomPopup(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
