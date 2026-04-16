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

function AdminContacts() {
  const { portfolioData, loading, reloadData } = useSelector(
    (state) => state.root,
  );
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/update-contacts", {
        ...values,
        _id: portfolioData.contact._id,
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
      message.error("error while updating contact");
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
          ...portfolioData.contact,
        }}
      >
        {" "}
        <Form.Item name="lottieURL" label="lottie URL">
          <Input className="inputStyle" type="text" placeholder="lottie URL" />
        </Form.Item>
        <Form.Item name="name" label="Name">
          <Input className="inputStyle" type="text" placeholder="Name" />
        </Form.Item>
        <Form.Item name="age" label="Age">
          <Input className="inputStyle" type="text" placeholder="Age" />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
          <Input className="inputStyle" type="text" placeholder="Gender" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input className="inputStyle" type="text" placeholder="Email" />
        </Form.Item>
        <Form.Item name="mobile" label="Mobile">
          <Input className="inputStyle" type="text" placeholder="Mobile" />
        </Form.Item>
        <Form.Item name="address" label="Adress">
          <Input className="inputStyle" type="text" placeholder="Adress" />
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

export default AdminContacts;
