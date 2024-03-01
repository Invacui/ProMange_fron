// TaskContext.js
import React, { createContext, useState } from 'react';

const DashboardContext = createContext(); //CREATE INSTANCE OF CONTEXT

const DashboardProvider = ({ children , user_data, refetch, setRefetch}) => {
//STATES===========================>>
    
const [tasks, setTasks] = useState([]);
const [currentFilter,setCurrentFilter] = useState("Today");
//FUNCTIONS========================>>
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <DashboardContext.Provider
      value={{
        tasks,
        user_data,
        refetch,
        setRefetch,
        currentFilter,
        setTasks,
        addTask,
        deleteTask,
        setCurrentFilter
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContext, DashboardProvider };
