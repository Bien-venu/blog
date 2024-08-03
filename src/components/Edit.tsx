/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Editpost from "./Editpost";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Post {
  [x: string]: any;
  title: string;
  content: string;
  createdAt: string;
}

const Edit = () => {
  const { cardId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("You need to be logged in to access this resource.");
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/posts/${cardId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setPost(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.error || "An error occurred");
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [cardId]);
  
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {post != null ? <Editpost postList={post} cardId={cardId} /> : null}
    </>
  );
};

export default Edit;
