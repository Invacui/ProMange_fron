import React, { useContext, useState } from 'react'
import { format } from 'date-fns';
import "../../../../style/addtask.css"
import { bin } from '../../../../assets/FaviconIndex';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SaveTask } from '../../../../services/DataHandler';
import { useEffect } from 'react';
import { UpdateTaskData } from '../../../../services/KanbanDataHandler';
const Add_task = ({setToggleForm,TaskData,setToggle,toggle}) => {

    
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("High Priority");
    const [checklist, setChecklist] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [dueDate, setDueDate] = useState('');
    const [status , setStatus] = useState("To Do")

    useEffect(() => {
      if (TaskData) {
        setTitle(TaskData.title || "");
        setPriority(TaskData.priority || "High Priority");
        setChecklist(TaskData.checklist || []);
        setDueDate(format(new Date(TaskData.dueDate), 'MM/dd/yyyy')  || null);
        setStatus(TaskData.status || "To Do");
      }
    }, [TaskData]);
    

    const handleInnerClick = (e) => {
          e.stopPropagation();
      };
    const handleDateChange = (date) => {
      setStartDate(date);
      setDueDate(date  ? format(date, 'MM/dd/yyyy') : '');
    };

    const handleAddChecklistItem = () => {
        setChecklist([...checklist, { description: "", checked: false }]);
      };
    
      const handleChecklistChange = (index) => (event) => {
        const newChecklist = [...checklist];
        newChecklist[index].description = event.target.value;
        setChecklist(newChecklist);
      };
    
      const handleChecklistCheck = (index) => (event) => {
        const newChecklist = [...checklist];
        newChecklist[index].checked = event.target.checked;
        setChecklist(newChecklist);
      };
    
      const handleDeleteChecklistItem = (index) => {
        const newChecklist = [...checklist];
        newChecklist.splice(index, 1);
        setChecklist(newChecklist);
      };
    
      const handleReset = () =>{
        console.log("Reset Hit")
        setTitle("");
        setPriority("High Priority");
        setChecklist([]);
        setDueDate(null);
        setToggleForm(false);
        setToggle(!toggle);
      }
      const handleSubmit = async (event) => {
        event.preventDefault();
        const newTask = {
          title,
          priority,
          checklist,
          dueDate,
          status
        };
        console.log("NewTask+++++++++>AT",newTask);
        try {
          if (!TaskData) {
            await SaveTask(newTask);
            handleReset(); 
          } else {
            await UpdateTaskData(TaskData._id, newTask);
            handleReset(); 
          }
        
        } catch (error) {
          console.error('Error saving task:', error);
        }
      };
  return (
    <div className="Add_task_main_body" onClick={(e)=>setToggleForm(false)}>
      <div className="Add_task_sub_body" onClick={handleInnerClick}>
        <form  onSubmit={handleSubmit}>
          <div className="form_box one required">
              <label htmlFor="title">Title </label>
              <input
                type="text"
                id="title"
                placeholder='Enter Task Title'
                   value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required
              />
          </div>
          
          <div className="form_box two required">
              <label htmlFor="priority">Select Priority</label>
              <span
                id="priority"
                  value={priority} 
                  
              >
                <button type='button' className={`Priority ${priority === 'High Priority' ? 'selected' : ''}`} value="High Priority" onClick={(e) => setPriority(e.target.value)} >🔴 High Priority</button>
                <button  type='button' className={`Priority ${priority === 'Medium Priority' ? 'selected' : ''}`} value="Medium Priority" onClick={(e) => setPriority(e.target.value)}>🔵 Modrate Priority</button>
                <button type='button' className={`Priority ${priority === 'Low Priority' ? 'selected' : ''}`}value="Low Priority" onClick={(e) => setPriority(e.target.value)}>🟢 Low Priority</button>
              </span>
          </div>
          
          <div className='form_box three required'>
          <label>Checklist: ({checklist.filter(item => item.checked).length}/{checklist.length})</label>
          <ul>
              {checklist.map((item, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={handleChecklistCheck(index)} 
                  />
                  <input
                    type="text"
                    value={item.description}
                     onChange={handleChecklistChange(index)} 
                     required
                  />
                  <img src={bin}
                    
                     onClick={() => handleDeleteChecklistItem(index)} 
                  />
                </li>
              ))}
            </ul>
            <button type="button" className="Add_new_check"
             onClick={handleAddChecklistItem} >
              + Add New
            </button>
          </div>
          
          <div className="form_box four">
              <div className="form_final_buttons">
                  
                    <DatePicker
                      
                      id="calendar_button"
                      selected={startDate}
                      onChange={handleDateChange}
                      placeholderText={dueDate === "" ? "Select Due Date" : {dueDate}}
                    />
                
                </div>
            <span className="from_final_buttons">
                <button type='button' id='cancel_button' onClick={()=>{handleReset()}}>cancel</button>
                <button type="submit" id='submit_button'>{(TaskData)?"Update":"Save"}</button>
            </span>
        </div>
        </form>
      </div>
    </div>
  );
}

export default Add_task