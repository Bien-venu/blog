/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "./TextEditor.css";
import axios, { AxiosError } from "axios";
import { Home } from "./Breadcrumb";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Post {
  title: string;
  content: string;
}

interface EditpostProps {
  postList: Post;
  cardId: string | undefined;
}

function Editpost({ postList, cardId }: EditpostProps) {
  const navigate = useNavigate();
  const [userInfo, setuserInfo] = useState({
    title: postList.title,
    content: postList.content,
  });

  const onChangeValue = (e: { target: { name: any; value: any } }) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const oncontent = (value: any) => {
    setuserInfo({ ...userInfo, content: value });
  };

  const stripHtmlTags = (html: string) => {
    // Create a new div element and set its innerHTML to the HTML string
    const div = document.createElement("div");
    div.innerHTML = html;
    // Return the text content of the div, which will strip out all HTML tags
    return div.textContent || "";
  };

  const [isError, setError] = useState("");
  const token = localStorage.getItem("token");

  const handleBlog = async (event: {
    preventDefault: () => void;
    persist: () => void;
  }) => {
    try {
      event.preventDefault();
      event.persist();

      if (!token) {
        setError("You need to be logged in to edit the post.");
        return;
      }

      // Strip HTML tags from content
      const cleanedContent = stripHtmlTags(userInfo.content);

      await axios.put(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/posts/${cardId}`,
        {
          title: userInfo.title,
          content: cleanedContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast("Your post has been updated successfully!");
      navigate(`/blog/${cardId}`);
    } catch (error) {
      console.error("Error occurred:", error);
      if (error instanceof AxiosError) {
        console.error("Response data:", error.response?.data);

        if (error.response?.status === 401) {
          toast("You are not allowed to delete or edit this blog.");
        } else if (error.response?.status === 400) {
          toast(
            error.response?.data?.error ||
              "Bad request. Please check your input and try again.",
          );
        } else {
          toast(
            error.response?.data?.error ||
              "An error occurred. Please try again.",
          );
        }
      } else {
        toast("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 overflow-auto p-2 px-8 sm:px-20 xl:px-72">
      <Home title={userInfo.title} />
      <div className="row">
        <form onSubmit={handleBlog} className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold"> Edit </h1>
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
                theme="snow"
                value={userInfo.content}
                onChange={oncontent}
                placeholder={"Write something awesome..."}
                modules={modules("t1")}
                formats={formats}
              />
            </div>
            {isError !== null && <div className="errors"> {isError} </div>}
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
}
export default Editpost;
