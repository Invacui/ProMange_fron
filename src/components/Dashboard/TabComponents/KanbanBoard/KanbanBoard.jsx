// KanbanBoard.jsx
import React, { useContext, useEffect, useState } from 'react';
import "../../../../style/kanban_board.css";
import Add_task from './Add_task';
import { minimize, addtask } from "../../../../assets/FaviconIndex";
import Card from "./Card";
import { fetchTasks } from '../../../../services/KanbanDataHandler';

const KanbanBoard = ({time_duration,setTimeDuration}) => {
  const [ toggle, setToggle ] = useState(true);
  const [toggleForm, setToggleForm] = useState(false);
  const [minimizedTab, setMinimizedTab] = useState(null);
  
  const [kanbanTasks, setKanbanTasks] = useState({
    "Backlog": [],
    "To Do": [],
    "In Progress": [],
    "Done": []
  });
  useEffect(() => {
     fetchTasks( setKanbanTasks , time_duration); 
  }, [toggle,time_duration])

  const toggleMinimizedTab = (tab) => {
    setMinimizedTab(minimizedTab === tab ? null : tab);
  };

  return (
<div className="content_body_main">
      <div className="content_body_sub">
      {Object.keys(kanbanTasks).map((status) => (
          <div className="item" key={status}>
            <div className="Board_sub_tab_head one">
              <h3 onClick={() => setToggleForm(true)}>{status}</h3>
              <div className="Tab_sub_tab_buttons">
                {status === "To Do" && (
                  <button onClick={() => setToggleForm(true)}>
                    <img src={addtask} alt="Add Task" />
                  </button>
                )}
                <button className="minimize_button" onClick={() => toggleMinimizedTab(status)}>
                  <img src={minimize} alt="Minimize Tab" />
                </button>
              </div>
            </div>
            <div className="Board_sub_tab_head two">
            {kanbanTasks[status]?.map((task) => (
              <Card
                key={task._id}
                task={task}
                toggle={toggle}
                setToggle={setToggle}
                full_minimized={minimizedTab === status}
              />
              ))}
            </div>
          </div>
        ))}
      </div>
      {toggleForm === true && (
        <Add_task setToggleForm={setToggleForm} setToggle={setToggle} toggle={toggle} />
      )}
    </div>
  );
};

export default KanbanBoard;
