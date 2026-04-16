import React from "react";
import { Modal, Form, message, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  ShowLoading,
  HideLoading,
  SetPortfolioData,
  ReloadData,
} from "../../rudux/rootSlice";
import axios from "axios";
import { useState } from "react";

function AdminCourses() {
  const { portfolioData, loading, reloadData } = useSelector(
    (state) => state.root,
  );
  const { courses } = portfolioData;
  const dispatch = useDispatch();
  const [showAddEditModel, setShowADDeditModek] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [type, setType] = useState("add");
  const [form] = Form.useForm();

  const addCourse = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-course", {
          ...values,
          _id: selectedItemForEdit._id,
          withCredentials: true,
        });
      } else {
        response = await axios.post("/api/portfolio/add-course", values, {
          withCredentials: true,
        });
      }

      if (response.data.success) {
        setShowADDeditModek(false);
        setSelectedItemForEdit(null);
        form.resetFields("");
        message.success(response.data.message);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
        dispatch(HideLoading());
      }
    } catch (error) {
      message.error("Error in adminCourses");
      dispatch(HideLoading());
    }
  };

  const onDelete = async (item) => {
    try {
      const confirmDelete = window.alert(
        "Are you sure, you want to delete it?",
      );

      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/delete-course", {
        _id: item._id,
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(HideLoading());
        dispatch(ReloadData(true));
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
        dispatch(HideLoading());
      }
    } catch (error) {
      message.error("Error while deleting admin course");
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
          Add Course
        </button>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5 break-words">
        {courses.map((course) => (
          <div
            key={course._id}
            className="shadow border p-5 border-gray-599 flex flex-col gap-5 "
          >
            <h1 className="text-primary text-xl font-bold">{course.title}</h1>

            <img src={course.image} className="h-60 w-80" />

            <h1>{course.description}</h1>
            <h1>{course.link}</h1>

            <div className="flex justify-end gap-5 mt-5">
              <button
                className="text-white bg-blue-500 px-5 py-2 rounded hover:cursor-pointer hover:bg-blue-700"
                onClick={() => {
                  setSelectedItemForEdit(course);
                  setShowADDeditModek(true);
                  setType("edit");
                }}
              >
                Edit
              </button>
              <button
                className="text-white bg-red-500 px-5 py-2 rounded hover:cursor-pointer hover:bg-red-700"
                onClick={() => {
                  onDelete(course);
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
          title={selectedItemForEdit ? "Edit Course" : "Add Course"}
          footer={null}
          onCancel={() => {
            setShowADDeditModek(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              ...selectedItemForEdit,
            }}
            onFinish={addCourse}
          >
            <Form.Item name="title" label="Title">
              <Input
                className="inputStyle"
                required
                type="text"
                placeholder="title"
              />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <textarea required type="text" placeholder="description" />
            </Form.Item>
            <Form.Item name="image" label="Image">
              <Input
                className="inputStyle"
                type="text"
                placeholder="image"
                required
              />
            </Form.Item>
            <Form.Item name="link" label="Link">
              <Input className="inputStyle" type="text" placeholder="link" />
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

export default AdminCourses;
