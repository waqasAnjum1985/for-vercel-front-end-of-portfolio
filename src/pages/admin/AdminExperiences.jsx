import React from "react";
import { Modal, Form, Input, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  ShowLoading,
  HideLoading,
  SetPortfolioData,
  ReloadData,
} from "../../rudux/rootSlice";
import axios from "axios";

import { useState } from "react";

function AdminExperiences() {
  const { portfolioData, loading, reloadData } = useSelector(
    (state) => state.root,
  );
  const { experiences } = portfolioData;
  const dispatch = useDispatch();
  const [showAddEditModel, setShowADDeditModek] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [type, setType] = useState("add");
  const [form] = Form.useForm();

  const addExperience = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-experience", {
          ...values,
          _id: selectedItemForEdit._id,
          withCredentials: true,
        });
      } else {
        response = await axios.post("/api/portfolio/add-experience", values, {
          withCredentials: true,
        });
      }

      if (response.data.success) {
        setShowADDeditModek(false);
        setSelectedItemForEdit(null);
        form.resetFields("");
        dispatch(HideLoading());
        dispatch(ReloadData(true));
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
        dispatch(HideLoading());
      }
    } catch (error) {
      message.error("Error while Adding Experience");
      dispatch(HideLoading());
    }
  };

  const onDelete = async (item) => {
    try {
      const confirmDelete = window.alert(
        "Are you sure, you want to delete it?",
      );

      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/delete-experience", {
        _id: item._id,
        withCredentials: true,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
        dispatch(HideLoading());
      }
    } catch (error) {
      message.error("Error while deleting Experience");
      dispatch(HideLoading());
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-green-500 border-white hover:bg-green-700 hover:cursor-pointer px-5 py-2 rounded text-white mb-7"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowADDeditModek(true);
            setType("add");
          }}
        >
          Add Experience
        </button>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
        {experiences.map((experience) => (
          <div
            key={experience._id}
            className="shadow border p-5 border-gray-599 flex flex-col "
          >
            <h1 className="text-primary text-xl font-bold">
              {experience.period}
            </h1>

            <h1>Company : {experience.company}</h1>
            <h1>Role : {experience.title}</h1>
            <h1>{experience.description}</h1>
            <div className="flex justify-end gap-5 mt-5">
              <button
                className="text-white bg-blue-500 px-5 py-2 rounded hover:cursor-pointer hover:bg-blue-700"
                onClick={() => {
                  setSelectedItemForEdit(experience);
                  setShowADDeditModek(true);
                  setType("edit");
                }}
              >
                Edit
              </button>
              <button
                className="text-white bg-red-500 px-5 py-2 rounded hover:cursor-pointer hover:bg-red-700"
                onClick={() => {
                  onDelete(experience);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {(type === "add" || selectedItemForEdit) && (
        <Modal
          open={showAddEditModel}
          title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
          footer={null}
          onCancel={() => {
            setShowADDeditModek(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={selectedItemForEdit}
            onFinish={addExperience}
          >
            <Form.Item name="period" label="Period">
              <Input
                className="inputStyle"
                required
                type="text"
                placeholder="period"
              />
            </Form.Item>
            <Form.Item name="company" label="Company">
              <Input
                className="inputStyle"
                required
                type="text"
                placeholder="company"
              />
            </Form.Item>
            <Form.Item name="title" label="Title">
              <Input
                className="inputStyle"
                type="text"
                placeholder="title"
                required
              />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input
                className="inputStyle"
                type="text"
                placeholder="description"
                required
              />
            </Form.Item>
            <div className="flex gap-5 justify-end">
              <button className=" bg-blue-500 hover:bg-blue-700 px-5 py-2 rounded hover:cursor-pointer text-white">
                {selectedItemForEdit ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default AdminExperiences;
