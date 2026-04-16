import React from "react";
import Header from "../../components/Header";
import { Tabs, message } from "antd";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import { ShowLoading, HideLoading, Logout } from "../../rudux/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import AdminExperiences from "./AdminExperiences";
import AdminProjects from "./AdminProjects";
import AdminCourses from "./AdminCourses";
import AdminContacts from "./AdminContact";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const { portfolioData, loading, isAuthenticated, reloadData } = useSelector(
    (state) => state.root,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: "Intro",
      children: <AdminIntro />,
    },
    {
      key: "2",
      label: "About",
      children: <AdminAbout />,
    },
    {
      key: "3",
      label: "Experience",
      children: <AdminExperiences />,
    },
    {
      key: "4",
      label: "Projects",
      children: <AdminProjects />,
    },
    {
      key: "5",
      label: "Courses",
      children: <AdminCourses />,
    },
    {
      key: "6",
      label: "Contacts",
      children: <AdminContacts />,
    },
    {
      key: "7",
      label: "Sidebar",
      children: <AdminSidebar />,
    },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin-login");
    }
  }, []);

  const logout = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/admin-logout", {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(Logout());
        message.success(response.data.message);
        navigate("/admin-login");
        dispatch(HideLoading());
      } else {
        message.error(response.data.message);
        dispatch(HideLoading());
      }
    } catch (error) {
      message.error("Error while loggimg out user");
      dispatch(HideLoading());
    }
  };

  return (
    <div>
      <div className="bg-white">
        <Header />
        <div className="flex gap-10  items-center m-5 mt-10 justify-between ">
          <div className="flex gap-10 items-center">
            <h1 className="text-3xl text-primary ">Portfolio Admin</h1>
            <div className="w-60 h-[1px] bg-gray-500"></div>
          </div>
          <h1
            className="underline text-red-700 hover:cursor-pointer mr-19 text-2xl"
            onClick={logout}
          >
            Logout
          </h1>
        </div>
        {portfolioData && (
          <div className="mt-5 px-5 pb-10">
            <Tabs defaultActiveKey="1" items={items} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
