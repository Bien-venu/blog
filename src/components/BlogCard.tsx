import { Link } from "react-router-dom";

interface Blog {
  id: string;
  User: {
    username: string;
  };
  createdAt: string;
  title: string;
  content: string;
}

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const truncateContent = (content: string, limit: number) => {
    if (content.length <= limit) {
      return content;
    }
    return `${content.slice(0, limit)}...`;
  };

  const formatDate = (dateString: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Link
      to={`/blog/${blog.id}`}
      className="flex flex-col gap-2 rounded p-4 text-sm font-medium tracking-tighter text-secondary"
    >
      <div className="flex items-center gap-2 text-sm">
        <div className="w-5">
          <img src="/src/assets/avatar.png" alt="" className="h-full w-full" />
        </div>
        <div className="flex text-xs font-semibold text-secondary items-center gap-1">
          <h1 className=" text-black">{blog.User.username}</h1>
          <span>@</span>
          <time>{formatDate(blog.createdAt)}</time>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold">{blog.title}</h1>
        <p className="text-secondary">
          {truncateContent(blog.content, 100)}
          {blog.content.length >= 100 && (
            <a
              href={`/blogs/${blog.id}`}
              className="text-xs font-semibold text-more underline"
            >
              Read More
            </a>
          )}
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;
