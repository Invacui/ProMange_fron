import { toast } from "react-toastify";
import { BASE_URL } from "./helper";

const handleFormSubmit = async (endpoint,method, formData, includeToken = false) => {
  
  const toast_style ={
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    };  
    const loadingToastId = toast.loading("Please wait...",toast_style);
  try {
    const headers = {
        'Content-Type': 'application/json',
      };
      if (includeToken) {
        headers['jwttoken'] = localStorage.getItem('token');
      }
      const response = await fetch(`${BASE_URL}/auth/${endpoint}`, {
        method: method,
        headers,
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        const { jwttokengen } = data; // Extract jwttokengen from the response data
        if(jwttokengen){localStorage.setItem('token', jwttokengen);}
        if (data.Message) {
          toast.dismiss(loadingToastId);
          toast.success(data.Message , toast_style)
          return data.Message; // Return the  message
        }
         
      } else {
        const data = await response.json();
         throw new Error(data.Message); // Throw an error with the error message
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error(`${error.message}` , toast_style)
    } 
  };
  
  export default handleFormSubmit;
  
