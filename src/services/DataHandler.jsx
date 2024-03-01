import { toast } from "react-toastify";
import { BASE_URL } from "./helper";
export const showToast = (message, type) => {
  const toast_style = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };


  switch (type) {
    case "success":
      toast.success(message, toast_style);
      break;
      case "error":  
      toast.error(message, toast_style);
      break;
    default:
      toast(message, toast_style);
  }
};
//GET REQ
export const DataFetcher = async ({BASEURL,METHOD}) => {
try{  
  const response = await fetch(`${BASE_URL}/data/fetch_data`, {
    method: METHOD,
    headers: {
      "Content-Type": "application/json",
      jwttoken: localStorage.getItem("token"),
    },
  });
  if (response.ok) {
    const UserInfo = await response.json();
    console.log("Fetched Data SuccessFully ::" ,UserInfo);
    return(UserInfo);
  }
  else{
    throw new Error("Data Not Fetched")
  }}
  catch(error){
    return (error.message)
  }
};

//PUT REQ
export const DataUpdater = async (formData,refetch,setRefetch) => {
  const loadingToastId = toast.loading("Please wait...", {
    position: "bottom-center",
    theme: "dark"
  });
  
  try {
    console.log("This Is Form Data:", formData);
    const response = await fetch(`${BASE_URL}/auth/passchange`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        jwttoken: localStorage.getItem("token"),
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const UserInfo = await response.json();
      console.log("Data Updated Successfully ::", UserInfo.Message);
      toast.dismiss(loadingToastId);  
      showToast(UserInfo.Message, "success");
      setRefetch(!refetch);
    } else {
      const data = await response.json();
      throw new Error(data.Error);
    }
  } catch (error) {
    toast.dismiss(loadingToastId);  
    showToast(error.message, "error");
  }
};
//POST REQ FOR TASK
export const SaveTask = async (newTaskData) => {
  const loadingToastId = toast.loading("Please wait...", {
    position: "top-right",
    theme: "dark"
  });
  
  try {
    const response = await fetch(`${BASE_URL}/auth/taskupdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        jwttoken: localStorage.getItem("token"),
      },
      body: JSON.stringify(newTaskData),
    });
    if (response.ok) {
      const UserInfo = await response.json();
      console.log("Task Posted Successfully to DB ::", UserInfo.Message);
      toast.dismiss(loadingToastId);  
      showToast(UserInfo.Message, "success");
      return UserInfo.List;
    } else {
      const data = await response.json();
      throw new Error(data.Error);
    }
  } catch (error) {
    toast.dismiss(loadingToastId);  
    showToast(error.message, "error");
  }
};

export const fetchSharedTask = async (taskId) => {
  try {
    const response = await fetch(`${BASE_URL}/sharedTasks/${taskId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch shared task');
    }
    const data = await response.json();
    return data.task;
  } catch (error) {
    console.error('Error fetching shared task:', error.message);
    throw error;
  }
};
