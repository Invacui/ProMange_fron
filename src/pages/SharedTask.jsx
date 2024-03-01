import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import "../style/card.css"; // Import the same CSS file as Card.jsx
import { useParams } from 'react-router';
import { logo } from '../assets/FaviconIndex';
import { BASE_URL } from '../services/helper';
const SharedTask = () => {
  const [task, setTask] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    // Fetch shared task data when the component mounts
    fetchSharedTask(id);
  }, [id]);
  
  const fetchSharedTask = async (taskId) => {
    try {
      const response = await fetch(`${BASE_URL}/data/sharedTask/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch shared task');
      }
      const data = await response.json();
      setTask(data.task);
    } catch (error) {
      console.error('Error fetching shared task:', error.message);
    }
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

  // Render loading state if task data is not yet fetched
  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Shared_task_main_body">
      <div className="logo_shared_task">
        <img src={logo} alt="" />
        <h5>Pro Manage</h5>
      </div>
      <div className="Kanban_card_box shared">
        <div className="card_heading shared">
          <label className={`task_priority ${task.priority}`}>{task.priority}</label>
        </div>
        <h3 className='Card_title shared'>{task.title}</h3>
        <div className="Full_task_min shared">
          <div className="checklist_n_minimize shared">
            <h5>Checklist: ({task.checklist.length})</h5>
          </div>
          <div className={`check_list_view shared `}>
            <ul>
              {task.checklist.map((item, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    readOnly
                  />
                  <div>{item.description}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="switch_buttons shared">
          {task.dueDate ? (<span>Due Date</span>):( <span className=""></span> )}
        {task.dueDate ? (
      <div
        className="due-Date shared"
        style={{ backgroundColor: getBackgroundColor() }}
      >
        {formatDate(task.dueDate.toString())}
      </div>
        ) : (
      <span className="no_due_date shared"></span>
        )}
      </div>
        </div>
      </div>
    </div>
  );
};

export default SharedTask;
