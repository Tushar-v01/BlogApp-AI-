import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

// 🌐 Axios ka default base URL set kar rahe hain (env se)
console.log("BASE_URL:", import.meta.env.VITE_BASE_URL);
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// ✅ Context create kar rahe hain
const AppContext = createContext();

// ✅ Context Provider Component
export const AppProvider = ({ children }) => {

  // 🧭 Routing ke liye useNavigate hook
  const navigate = useNavigate();

  // 🔐 Auth token ke liye state
  const [token, setToken] = useState(null);

  // 📝 Blog data ke liye state
  const [blogs, setBlogs] = useState([]);

  // 🔍 Search ya input field ke liye state
  const [input, setInput] = useState("");

  // 📥 API se blogs fetch karne wali function
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/blog/all'); // 🔗 Blog list API call

      // ✅ Agar response successful hai to blogs ko state me store karo
      data.success ? setBlogs(data.blogs) : toast.error(data.message);

    } catch (error) {
      // ❌ Error aaye to toast me dikhao
      toast.error(error.message);
    }
  };

  // 🚀 Component mount hone par blog fetch karo aur token set karo
  useEffect(() => {
    fetchBlogs(); // 🔄 Blog list la rahe hain

    const token = localStorage.getItem('token'); // 💾 LocalStorage se token le rahe hain
    if (token) {
      setToken(token); // 🔐 Token state me set karo
      axios.defaults.headers.common['Authorization'] = `${token}`; // 📦 Axios ke headers me token daalo
    }
  }, []);

  // 🌍 Context value jo sabhi components me accessible hoga
  const value = {
    axios,         // API calling ke liye
    navigate,      // Navigation ke liye
    token,         // Auth token
    setToken,      // Token update karne ke liye
    blogs,         // Blog list
    setBlogs,      // Blog list update
    input,         // Search input
    setInput       // Input update
  };

  // ✅ Children ko context provider ke through value provide kar rahe hain
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// 🔁 Custom hook jo context ko use karne ke liye use hota hai
export const useAppContext = () => {
  return useContext(AppContext);
};
