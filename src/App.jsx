import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000";

function App() {
  const [email, setEmail] = useState("test@example.com");
  const [remainingDays, setRemainingDays] = useState(365);

  useEffect(() => {
    axios.get(`${API_URL}/progress/${email}`).then((res) => {
      setRemainingDays(res.data.remainingDays);
    });
  }, []);

  const handleCheckIn = () => {
    axios.post(`${API_URL}/check-in`, { email }).then((res) => {
      setRemainingDays(res.data.remainingDays);
      toast.success("Day marked successfully!");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">365-Day Challenge</h1>
        <p className="text-lg text-gray-600 mb-4">Days Remaining: <span className="font-bold text-blue-500">{remainingDays}</span></p>
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
          onClick={handleCheckIn}
        >
          Mark Today ✅
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
