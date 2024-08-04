/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import axios, { AxiosError } from "axios";
import { Home } from "./Breadcrumb";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [userInfo, setUserInfo] = useState({
    title: "",
    content: "",
  });
  const navigate = useNavigate();
  const [isError, setError] = useState("");

  // Reference to the ReactQuill component
  const quillRef = useRef<ReactQuill>(null);

  const onChangeValue = (e: { target: { name: any; value: any } }) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onContent = (value: any) => {
    setUserInfo({ ...userInfo, content: value });
  };

  const addDetails = async (event: {
    preventDefault: () => void;
    persist: () => void;
  }) => {
    try {
      event.preventDefault();
      event.persist();

      // Retrieve token from local storage
      const token = localStorage.getItem("token");

      if (!token) {
        toast("You need to be logged in to post.");
        return;
      }

      // Extract plain text from the ReactQuill editor
      const editor = quillRef.current?.getEditor();
      const plainTextContent = editor?.getText() || "";

      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/posts`,
        {
          title: userInfo.title,
          content: plainTextContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      navigate("/");
      toast("Success! Your blog post is now live.");
      window.location.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          toast("Unauthorized. Please log in.");
        } else {
          toast(
            error.response?.data.error ||
              "An error occurred. Please try again.",
          );
          setError("An error occurred. Please try again.");
        }
      } else {
        toast("An unexpected error occurred. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 overflow-auto p-2 px-8 sm:px-20 xl:px-72">
      <Home title={"Create a blog"} />
      <div className="row">
        <form onSubmit={addDetails} className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold"> Create </h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-semibold">
                Title <span className="required-"> * </span>
              </label>
              <input
                type="text"
                name="title"
                value={userInfo.title}
                onChange={onChangeValue}
                className="w-full border border-[#cbcbcb] p-2"
                placeholder="Title"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">
                Content <span className="required"> * </span>
              </label>
              <EditorToolbar toolbarId={"t1"} />
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={userInfo.content}
                onChange={onContent}
                placeholder={"Write something awesome..."}
                modules={modules("t1")}
                formats={formats}
              />
            </div>
            <button
              type="submit"
              className="flex h-12 w-fit items-center justify-center rounded-xl border bg-btn px-8 text-end text-base font-medium text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
