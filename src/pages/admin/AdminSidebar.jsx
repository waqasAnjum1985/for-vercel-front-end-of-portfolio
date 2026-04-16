import React, { useEffect } from "react";
import { Form, Input, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  ShowLoading,
  HideLoading,
  SetPortfolioData,
  ReloadData,
} from "../../rudux/rootSlice";
import axios from "axios";

function AdminSidebar() {
  const { portfolioData, loading, reloadData } = useSelector(
    (state) => state.root,
  );
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/update-sidebar", {
        ...values,
        _id: portfolioData.sidebar._id,
        withCredentials: true,
      });

      if (response.data.success) {
        message.success(response.data.message);
        dispatch(HideLoading());
      } else {
        message.error(response.data.message);
        dispatch(HideLoading());
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error("error while updating sidebar");
    }
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          ...portfolioData.sidebar,
        }}
      >
        {" "}
        <Form.Item name="watsapp" label="WatsApp">
          <Input className="inputStyle" type="text" placeholder="wats app" />
        </Form.Item>
        <Form.Item name="facebook" label="Facebook">
          <Input className="inputStyle" type="text" placeholder="Facebook" />
        </Form.Item>
        <Form.Item name="gemail" label="Gemail">
          <Input className="inputStyle" type="text" placeholder="Gemail" />
        </Form.Item>
        <Form.Item name="instagram" label="Instagram">
          <Input className="inputStyle" type="text" placeholder="instagram" />
        </Form.Item>
        <Form.Item name="linkedin" label="linkedin">
          <Input className="inputStyle" type="text" placeholder="linkedin" />
        </Form.Item>
        <Form.Item name="githubb" label="Githubb">
          <Input className="inputStyle" type="text" placeholder="Githubb" />
        </Form.Item>
        <div className="flex w-full justify-end">
          <button
            type="submit"
            className="px-10 py-3 rounded hover:cursor-pointer bg-primary text-white"
          >
            SAVE
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminSidebar;
