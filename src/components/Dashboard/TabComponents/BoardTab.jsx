import React,{useContext,useState} from 'react'
import { DashboardContext } from '../../../services/DashboardContext'
import { format } from 'date-fns'
import "../../../style/board.css"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import KanbanBoard from './KanbanBoard/KanbanBoard'

const BoardTab = () => {
  function formatDate(date) {
    const formattedDate = format(date, 'do MMM yyyy');
    return formattedDate;
  }

const currentDate = new Date();
const formattedDate = formatDate(currentDate);
const {user_data,currentFilter,setCurrentFilter} = useContext(DashboardContext)
const [time_duration,setTimeDuration] = useState("Today")

  return (
    <div className="Board_main_body">
      <div className="Board_sub_body">
        <div className='Board_sub_body_box'>
          <h3>Welcome! {user_data.name}</h3> <p id='formatted_date'>{formattedDate}</p>
        </div>
        <div className='Board_sub_body_box two'>
          <h2>Board</h2>
          <div className="filter_data">
              <div className="dropdown-select">
                <span className="selected_filtered_option" >{time_duration}</span>
                <i class="fa-solid fa-chevron-down"></i>
              </div>
            <div className="dropdown-list" id="filter_data_options">
                  <button value="Today" onClick={(e)=> setTimeDuration(e.target.value)}>Today</button>
                  <button value="This Week" onClick={(e) => setTimeDuration(e.target.value)}>This Week</button>
                  <button value="This Month" onClick={(e) => setTimeDuration(e.target.value)}>This Month</button>
            </div>
          </div>
        </div>
        <div className='Board_sub_body_box' id="Kanban_Board">
        <KanbanBoard time_duration={time_duration} setTimeDuration={setTimeDuration}/>
        </div>
      </div>
      <ToastContainer richColors/>
    </div>
  );
}

export default BoardTab