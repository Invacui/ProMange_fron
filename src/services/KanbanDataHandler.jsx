import { showToast } from "./DataHandler";
import { toast } from "react-toastify";
import { BASE_URL } from "./helper";

//STATUS HANDLER
export const updateTaskStatus = async (taskId, newStatus) => {
    const loadingToastId = toast.loading("Updating task status...", {
      position: "top-right",
      theme: "dark"
    });
    
    try {
      const response = await fetch(`${BASE_URL}/data/task/status/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          jwttoken: localStorage.getItem("token"),
        },
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (response.ok) {
        const updatedTask = await response.json();
        console.log('Task status updated:', updatedTask);
        toast.dismiss(loadingToastId);  
        showToast(updatedTask.Message, "success");
        return updatedTask.data;
      } else {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error) {
      toast.dismiss(loadingToastId);  
      showToast(error.message, "error");
    }
  };

  //CHECKLIST CHECKS HANDLER
  export const handleChecklistItemUpdate = async (taskId, itemId, checked) => {
    const loadingToastId = toast.loading("Updating task status...", {
        position: "top-right",
        theme: "dark"
      });
    try {
      const response = await fetch(`${BASE_URL}/data/tasks/${taskId}/checklist/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          jwttoken: localStorage.getItem("token"),
        },
        body: JSON.stringify({ checked }),
      });
  
      if (response.ok) {
    const data = await response.json();
      console.log('Checklist item updated successfully:', data);
        toast.dismiss(loadingToastId);  
        showToast(data.message, "success");
      }else {
        const data = await response.json();
        throw new Error(data.error);
      }     
      
      // Optionally, you can perform any additional actions after the update
    } catch (error) {
        toast.dismiss(loadingToastId);  
        showToast(error.message, "error");
    }
  };
  //CHECKLIST DELETE HANDLER
  export const handleDeleteTask = async (taskId) => {
    const loadingToastId = toast.loading("Updating task status...", {
        position: "top-right",
        theme: "dark"
      });
    try {
      const response = await fetch(`${BASE_URL}/data/task/${taskId}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          jwttoken: localStorage.getItem("token"),
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        toast.dismiss(loadingToastId);  
        showToast(data.Message, "success");
      }else {
        const data = await response.json();
        throw new Error(data.error);
      }     
      
      // Optionally, you can perform any additional actions after the update
    } catch (error) {
        toast.dismiss(loadingToastId);  
        showToast(error.message, "error");
    }
  };
  
  //CHECKLIST SHARE HANDLER
  export const handleShare = async (taskId) => {
    const toast_style = {
      position: "top-right",
      autoClose: 10000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    };
    const loadingToastId = toast.loading("Updating task status...", {
        position: "top-right",
        theme: "light"
      });
      try {
        if (taskId) {
          const sharedUrl = `https://pro-mange-fron.vercel.app/data/sharedTask/${taskId}`;
          // Copy URL to clipboard
          await navigator.clipboard.writeText(sharedUrl);
          toast.dismiss(loadingToastId);
          toast("Link Copied", toast_style);    
        }
        // Optionally, you can perform any additional actions after the update
      } catch (error) {
        toast.dismiss(loadingToastId);  
        showToast(error.message, "error");
      }
  };
  //STATUS HANDLER
export const UpdateTaskData = async (taskId, newTask) => {
  const loadingToastId = toast.loading("Updating task status...", {
    position: "top-right",
    theme: "dark"
  });
  
  try {
    console.log("NewTask+++++++++>ATH",newTask);
    const response = await fetch(`${BASE_URL}/data/update_task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        jwttoken: localStorage.getItem("token"),
      },
      body: JSON.stringify( newTask ),
    });

    if (response.ok) {
      const updatedTask = await response.json();
      console.log('Task status updated:', updatedTask);
      toast.dismiss(loadingToastId);  
      showToast(updatedTask.Message, "success");
      return updatedTask.data;
    } else {
      const data = await response.json();
      throw new Error(data.error);
    }
  } catch (error) {
    toast.dismiss(loadingToastId);  
    showToast(error.message, "error");
  }
};


//FETCH DASHBOARD TASK
export const fetchTasks = async ( setKanbanTasks,time_duration ) => {
  try {
   

    const response = await fetch(`${BASE_URL}/auth/taskfetch?time_duration=${time_duration}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        jwttoken: localStorage.getItem("token"),
        // Add any authentication headers if required
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("TASK RECEIVED",data)

      setKanbanTasks(prevState => {
        const updatedTasks = { ...prevState }; 
        Object.keys(updatedTasks).forEach(key => {updatedTasks[key] = data.tasks[key] || [];});
        return updatedTasks; 
      });
    } else {
      
      console.error('Failed to fetch tasks:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};


   