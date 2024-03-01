// TaskContext.js
import React, { createContext, useState } from 'react';

const DashboardContext = createContext(); //CREATE INSTANCE OF CONTEXT

const DashboardProvider = ({ children , user_data, refetch, setRefetch}) => {
//STATES===========================>>
    
const [tasks, setTasks] = useState([]);
const [currentFilter,setCurrentFilter] = useState("Today");
//FUNCTIONS========================>>
  return (
    <DashboardContext.Provider
      value={{
        tasks,
        user_data,
        refetch,
        setRefetch,
        currentFilter,
        setTasks,
        setCurrentFilter
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContext, DashboardProvider };
