import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShowLoading, HideLoading, Login } from "../../rudux/rootSlice.js";
import axios from "axios";
import { Form, Input, message } from "antd";

function AdminLogin() {
  const { portfolioData, loading, isAuthenticated, reloadData } = useSelector(
    (state) => state.root,
  );
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (values) => {
    try {
      dispatch(ShowLoading());

      const response = await axios.post("/api/portfolio/admin-login", values, {
        withCredentials: true,
      });

      if (response.data.success) {
        message.success(response.data.message);
        dispatch(Login());
        navigate("/admin");
        dispatch(HideLoading());
      } else {
        message.error(response.data.message);
        dispatch(HideLoading());
      }
    } catch (error) {
      message.error("Error while loggimg in user");
      dispatch(HideLoading());
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="w-96 bg-blue-400 flex gap-5 p-5 shadow border border-gray-500 flex-col">
        <h1 className="text-2xl">Portfolio Admin login</h1>
        <hr />
        <Form
          onFinish={login}
          form={form}
          layout="vertical"
          initialValues={{
            userName: "",
            password: "",
          }}
        >
          <Form.Item name="userName" label="User Name">
            <Input className="inputStyle" type="text" placeholder="user name" />
          </Form.Item>
          <Form.Item name="password" label="password">
            <Input
              className="inputStyle"
              type="password"
              placeholder="password"
            />
          </Form.Item>
          <button
            type="submit"
            className="p-2 bg-green-500 text-white hover:bg-green-700 hover:cursor-pointer rounded w-full mt-5"
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  );
}

export default AdminLogin;
