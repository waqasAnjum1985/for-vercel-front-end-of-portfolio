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
import { withConfirm } from "antd/es/modal/confirm";

function AdminIntro() {
  const { portfolioData, loading, reloadData } = useSelector(
    (state) => state.root,
  );
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/update-intro", {
        ...values,
        _id: portfolioData.intro._id,
        withCredentials: true,
      });

      if (response.data.success) {
        message.success(response.data.message);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
        dispatch(HideLoading());
      }
    } catch (error) {
      message.error("Error while updating Intro");
      dispatch(HideLoading());
    }
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={portfolioData.intro}
      >
        <Form.Item name="wellcomeText" label="wellcome text">
          <Input className="inputStyle" type="text" placeholder="intro" />
        </Form.Item>
        <Form.Item name="firstName" label="First Name">
          <Input className="inputStyle" type="text" placeholder="First Name" />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name">
          <Input className="inputStyle" type="text" placeholder="Last Name" />
        </Form.Item>
        <Form.Item name="caption" label="Caption">
          <Input className="inputStyle" type="text" placeholder="Caption" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <textarea type="text" placeholder="Description" />
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

export default AdminIntro;
