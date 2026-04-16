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

function AdminAbout() {
  const { portfolioData, loading, reloadData } = useSelector(
    (state) => state.root,
  );
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      const tempSkills = values.skills.split(",");
      values.skills = tempSkills;
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/update-about", {
        ...values,
        _id: portfolioData.about._id,
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
      message.error("Error while updating About");
      dispatch(HideLoading());
    }
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          ...portfolioData.about,
          skills: portfolioData.about.skills.join(" , "),
        }}
      >
        <Form.Item name="lottieURL" label="Lottie URL">
          <Input className="inputStyle" type="text" placeholder="Lottie URL" />
        </Form.Item>
        <Form.Item name="description1" label="Description1">
          <textarea type="text" placeholder="Description1" />
        </Form.Item>

        <Form.Item name="description2" label="Description2">
          <textarea type="text" placeholder="Description2" />
        </Form.Item>
        <Form.Item name="skills" label="Skills">
          <textarea type="text" placeholder="Skills" />
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

export default AdminAbout;
