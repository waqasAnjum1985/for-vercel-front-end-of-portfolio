import { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home/Home.jsx";
import Loader from "./components/Loader.jsx";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  "https://for-vercel-backend-of-portfolio-udk.vercel.app/";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  SetPortfolioData,
  ShowLoading,
  HideLoading,
  ReloadData,
} from "./rudux/rootSlice.js";
import Admin from "./pages/admin/Admin.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
function App() {
  const { loading, portfolioData, reloadData, isAuthenticated } = useSelector(
    (state) => state.root,
  );
  const dispatch = useDispatch();

  const getPortfolioData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get("api/portfolio/get-portfolio-data");
      dispatch(SetPortfolioData(response.data));
      dispatch(ReloadData(false));
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    if (!portfolioData) {
      getPortfolioData();
    }
  }, [portfolioData]);

  useEffect(() => {
    if (reloadData) {
      getPortfolioData();
    }
  }, [reloadData]);

  return (
    <BrowserRouter>
      {loading ? <Loader /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={isAuthenticated ? <Admin /> : <Navigate to="/admin-login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
