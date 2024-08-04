/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key, useState, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { Delete } from "./Delete";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const Comments = ({
  comments: initialComments,
  postId,
}: {
  comments: any[];
  postId: string | undefined;
}) => {
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [commentContent, setCommentContent] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<any[]>(initialComments); // Initialize state from props
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const username = localStorage.getItem("username");

  useEffect(() => {
    // Check if user is authorized on component mount
    const token = localStorage.getItem("token");
    setIsAuthorized(!!token);
  }, []);

  useEffect(() => {
    // Update local state when prop changes
    setComments(initialComments);
  }, [initialComments]);

  const formatDate = (dateString: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleClick = (id: number, content: string) => {
    setEditCommentId(id);
    setCommentContent(content);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editCommentId === null) return;

    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/comments/${editCommentId}`,
        { content: commentContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast("Comment updated successfully!");

      // Update comments state
      setComments(
        comments.map((comment) =>
          comment.id === editCommentId
            ? { ...comment, content: commentContent, updatedAt: new Date() }
            : comment,
        ),
      );
      setEditCommentId(null);
      setCommentContent("");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Update failed:", error.response?.data || error.message);
        if (error.response?.data.error === "Unauthorized") {
          toast("You are not allowed to edit or delete.");
        } else {
          toast(
            error.response?.data.error || "Update failed. Please try again.",
          );
        }
        console.error("Update failed:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
        toast("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!comment) return;
    if (username == null) {
      toast("You don't have an account!");
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/comments`,
        { content: comment, postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 201) {
        toast("Comment added successfully!");
        setComment(""); // Clear the comment input field

        // Update comments state
        setComments([
          ...comments,
          {
            id: response.data.id, // Assuming the response contains the new comment ID
            content: comment,
            createdAt: new Date(),
            updatedAt: new Date(),
            User: { username: username }, // Replace with actual user data if available
          },
        ]);
      } else {
        throw new Error("Failed to add the comment");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(
          "Comment addition failed:",
          error.response?.data || error.message,
        );
        console.error(
          error.response?.data.error ||
            "Failed to add comment. Please try again.",
        );
      } else {
        console.error("Unexpected error:", error);
        console.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-start gap-2">
        <div className="h-8 min-h-8 w-8 min-w-8">
          <img
            src="https://res.cloudinary.com/dxbeayp6k/image/upload/v1722614661/pngwing.com_vrgzvz.png"
            alt=""
            className="h-full w-full"
          />
        </div>
        <form
          className="flex w-full flex-col items-end gap-1 text-sm"
          onSubmit={handleComment}
        >
          <input
            type="text"
            placeholder="Add a comment ..."
            value={comment}
            onChange={handleCommentChange}
            className="w-full border-b border-gray py-1 pb-4"
            required
          />
          <button type="submit">
            <IoIosSend size={24} className="cursor-pointer text-more" />
          </button>
        </form>
      </div>
      <div className="flex w-full flex-col gap-4 text-sm">
        {comments.map(
          (
            comment: {
              updatedAt: any;
              id: number;
              createdAt: string | number | Date;
              User: {
                username: string;
              };
              content: string;
            },
            index: Key | null | undefined,
          ) => (
            <div
              className="flex w-full items-start justify-between gap-3"
              key={index}
            >
              {editCommentId === comment.id ? (
                <div className="flex w-full items-start gap-2">
                  <div className="h-8 min-h-8 w-8 min-w-8">
                    <img
                      src="https://res.cloudinary.com/dxbeayp6k/image/upload/v1722614661/pngwing.com_vrgzvz.png"
                      alt=""
                      className="h-full w-full"
                    />
                  </div>
                  <form
                    className="flex w-full flex-col items-end gap-1 text-sm"
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
                      value={commentContent}
                      onChange={handleChange}
                      className="w-full border-b border-gray py-1 pb-4"
                      required
                    />
                    <button type="submit">
                      <IoIosSend
                        size={24}
                        className="cursor-pointer text-more"
                      />
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  <div className="h-8 min-h-8 w-8 min-w-8">
                    <img
                      src="https://res.cloudinary.com/dxbeayp6k/image/upload/v1722614661/pngwing.com_vrgzvz.png"
                      alt=""
                      className="h-full w-full"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-1 font-medium">
                    <div className="flex items-center gap-2">
                      <h1 className="font-semibold">{comment.User.username}</h1>
                      <time className="text-secondary">
                        {comment.updatedAt ? (
                          <>Updated {formatDate(comment.updatedAt)}</>
                        ) : (
                          <>{formatDate(comment.createdAt)}</>
                        )}
                      </time>
                    </div>
                    <p className="text-secondary">{comment.content}</p>
                  </div>
                  {isAuthorized && (
                    <div className="flex items-center gap-2">
                      <CiEdit
                        size={24}
                        className="cursor-pointer"
                        onClick={() => handleClick(comment.id, comment.content)}
                      />
                      <Delete id={comment.id} name={"comments"} />
                    </div>
                  )}
                </>
              )}
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default Comments;
