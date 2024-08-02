/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Home } from "../../components/Breadcrumb";
import { Skeleton } from "../../components/ui/skeleton";
import Comments from "../../components/Comments";
import { Action } from "../../components/Action";

interface Post {
  [x: string]: any;
  title: string;
  content: string;
  createdAt: string;
}

const BlogDetails = () => {
  const [posts, setPosts] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { cardId } = useParams<string>();

  const formatDate = (dateString: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/posts/${cardId}`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Post = await response.json();
        setPosts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [cardId]);

  if (loading) {
    return (
      <div className="flex w-full flex-col gap-4 p-2 px-8 sm:px-20 xl:px-72">
        <div className="flex flex-col space-y-3 p-4 shadow">
          <Skeleton className="h-7" />
          <div className="space-y-2">
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full flex-col gap-4 p-2 px-8 sm:px-20 xl:px-72">
        <div>Error: {error}</div>
      </div>
    );
  }

  if (!posts) {
    return (
      <div className="flex w-full flex-col gap-4 p-2 px-8 sm:px-20 xl:px-72">
        <div>No post found</div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto p-2 px-8 pb-8 sm:px-20 xl:px-72">
      <Home title={posts.title} />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 border-b border-gray pb-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">{posts.title}</h1>
            <div className="flex items-center gap-2">
              <Action />
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 text-sm font-semibold text-secondary">
            <div className="flex items-center gap-1">
              <div className="h-6 min-h-6 w-6 min-w-6">
                <img
                  src="https://res.cloudinary.com/dxbeayp6k/image/upload/v1722614661/pngwing.com_vrgzvz.png"
                  alt=""
                  className="h-full w-full"
                />
              </div>
              <h1>{posts.User.username}</h1>
            </div>
            <div className="flex items-center gap-1">
              <span>Published on</span>
              <time>{formatDate(posts.createdAt)}</time>
            </div>
          </div>
          <h1 className="text-base font-medium">{posts.content}</h1>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1 text-base font-semibold">
            <span>{posts.Comments.length}</span>
            <h1>Comments</h1>
          </div>
          <Comments comments={posts.Comments} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
