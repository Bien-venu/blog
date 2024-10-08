import BlogCard from "../../components/BlogCard";
import { Skeleton } from "../../components/ui/skeleton";
import { useAppContext } from "../../context/AppContext";

const BlogList = () => {
  const { posts, loading } = useAppContext();

  return (
    <div className="flex flex-col gap-4 overflow-auto p-2 px-8 pb-8 sm:px-20 xl:px-72">
      <h1 className="text-lg font-semibold">All blogs</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((blog) => (
          <div
            key={blog.id}
            className="flex flex-col rounded border border-gray shadow"
          >
            {loading ? (
              <div className="flex flex-col gap-2 rounded p-4">
                <Skeleton className="h-10" />
                <Skeleton className="h-7" />
                <Skeleton className="h-7" />
              </div>
            ) : (
              <BlogCard blog={{ ...blog, id: blog.id.toString() }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
