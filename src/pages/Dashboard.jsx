import React, { useState ,useEffect} from "react";
import * as FaviconIndex from "../assets/FaviconIndex"
import "../style/dashboard.css"
import TabButton from "../components/Dashboard/TabButton";
import BoardTab from "../components/Dashboard/TabComponents/BoardTab";
import AnalyticTab from "../components/Dashboard/TabComponents/AnalyticTab";
import SettingsTab from "../components/Dashboard/TabComponents/SettingsTab";
import {DataFetcher} from "../services/DataHandler";
import { DashboardProvider } from "../services/DashboardContext";
import Add_task from "../components/Dashboard/TabComponents/KanbanBoard/Add_task";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import CustomPopup from "../components/Popup/CustomPopup";

function Dashboard() {
//States

const BASEURL ="http://localhost:3001/data/fetch_data";
const [tab, setTab] = useState('board');
const [user_data, setUser_Info] = useState([]);
const [refetch,setRefetch] = useState(false);
const [showCustomPopup,setShowCustomPopup] = useState(false)
// Effect
useEffect(() => {
  const fetchData = async () => {
    try {
      const userData = await DataFetcher(BASEURL, "GET" , );
      console.log("Data Received in Dashboard:", userData);
      setUser_Info(userData.User);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [refetch]);

//FUNCTIONS
function selectTab(nextTab) {
  setTab(nextTab);
}
function handleLogout(){
    localStorage.removeItem("token");
    window.location.href = '/'
}
  return (
    <div className="Dashboard_main_body">
      <div className="Dashboard_sub_body one">
        <h2 className="OptionsTab">
          <img src={FaviconIndex.logo} />
          &emsp;<span>Pro Manage</span>
        </h2>
        <>
          {/* TabContainer */}
          <TabButton
            className="TabButton"
            isActive={tab === "board"}
            onClick={() => selectTab("board")}
          >
            {" "}
            <img src={FaviconIndex.board} /> &emsp;<span>Board</span>
          </TabButton>
          <TabButton
            className="TabButton"
            isActive={tab === "analytics"}
            onClick={() => selectTab("analytics")}
          >
            <img src={FaviconIndex.analytics} />
            &emsp;<span>Analytics</span>
          </TabButton>
          <TabButton
            className="TabButton"
            isActive={tab === "settings"}
            onClick={() => selectTab("settings")}
          >
            <img src={FaviconIndex.settings} />
            &emsp;<span>Settings</span>
          </TabButton>
        </>
        <div
          className="OptionsTab"
          id="Logout_div"
          onClick={() => setShowCustomPopup(true)}
        >
          <img src={FaviconIndex.logout} />
          &emsp;<span>Logout</span>
        </div>
      </div>
      <hr />
      <div className="Dashboard_sub_body two">
        <DashboardProvider
          user_data={user_data}
          refetch={refetch}
          setRefetch={setRefetch}
        >
          {tab === "board" && <BoardTab />}
          {tab === "analytics" && <AnalyticTab />}
          {tab === "settings" && <SettingsTab />}
        </DashboardProvider>
      </div>
      <div>
        {showCustomPopup && (
          <CustomPopup
            message="Logout"
            onConfirm={handleLogout}
            onCancel={() => setShowCustomPopup(false)}
            setShowCustomPopup={setShowCustomPopup}
          
          />
        )}
      </div>
      <ToastContainer richColors />
    </div>
  );
}
export default Dashboard;
