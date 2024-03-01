import React, { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../../services/DashboardContext";
import { BASE_URL } from "../../../services/helper";
import "../../../style/analytics_tab.css";
export const AnalyticTab = () => {
  const task = useContext(DashboardContext);
  const [analyticsData, setAnalyticsData] = useState({
    Backlog: 0,
    "To-do": 0,
    "In-Progress": 0,
    Completed: 0,
    "Low Priority": 0,
    "Moderate Priority": 0,
    "High Priority": 0,
    "Due Date Task": 0,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        const response = await fetch(
          `${BASE_URL}/data/get_task_analytics`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              jwttoken: localStorage.getItem("token"), // Include the token in the Authorization header
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch analytics data");
        }
        const data = await response.json();
        console.log(data);
        setAnalyticsData(data.Analytics);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };
    fetchAnalyticsData();
  }, []);
  return (
    <div className="Analytics_main_body">
      <div className="Analytics_sub_body">
        <div className="Analytics_box">
          <div className="Analytics_sub_box">
            <ul>
              <li>Backlog Tasks</li>
              <li>To-do Tasks</li>
              <li>In-Progress Tasks</li>
              <li>Completed Tasks</li>
            </ul>
          </div>
          <div className="Analytics_sub_box">
            <ul className="Analytics_sub_ul">
              <li>{loading ? 0 : analyticsData["Backlog"]}</li>
              <li>{loading ? 0 : analyticsData["To Do"]}</li>
              <li>{loading ? 0 : analyticsData["In Progress"]}</li>
              <li>{loading ? 0 : analyticsData["Done"]}</li>
            </ul>
          </div>
        </div>
        <div className="Analytics_box">
          <div className="Analytics_sub_box">
            <ul>
              <li>Low Priority</li>
              <li>Moderate Priority</li>
              <li>High Priority</li>
              <li>Due Date Task</li>
            </ul>
          </div>
          <div className="Analytics_sub_box">
            <ul className="Analytics_sub_ul">
              <li>{loading ? 0 : analyticsData["Low Priority"]}</li>
              <li>{loading ? 0 : analyticsData["Medium Priority"]}</li>
              <li>{loading ? 0 : analyticsData["High Priority"]}</li>
              <li>{loading ? 0 : analyticsData["Due Date Task"]}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnalyticTab;
