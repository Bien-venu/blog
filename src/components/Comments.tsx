/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";
import { IoIosSend } from "react-icons/io";
import { Action } from "./Action";

const Comments = ({ comments }: any) => {
  const formatDate = (dateString: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-start gap-2">
        <div className="h-8 min-h-8 w-8 min-w-8">
          <img src="/src/assets/avatar.png" alt="" className="h-full w-full" />
        </div>
        <form className="flex w-full flex-col items-end gap-1 text-sm">
          <input
            type="text"
            placeholder="Add a comment ..."
            className="w-full border-b border-gray py-1 pb-4"
          />
          <IoIosSend type="submit" size={24} className="cursor-pointer text-more" />
        </form>
      </div>
      <div className="flex w-full flex-col gap-4 text-sm">
        {comments.map(
          (
            comment: {
              createdAt: string | number | Date;
              User: {
                username:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | null
                  | undefined;
              };
              content:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | null
                | undefined;
            },
            index: Key | null | undefined,
          ) => (
            <div
              className="flex w-full items-start justify-between gap-3"
              key={index}
            >
              <div className="h-8 min-h-8 w-8 min-w-8">
                <img
                  src="/src/assets/avatar.png"
                  alt=""
                  className="h-full w-full"
                />
              </div>
              <div className="flex w-full flex-col gap-1 font-medium">
                <div className="flex items-center gap-2">
                  <h1 className="font-semibold">{comment.User.username}</h1>
                  <time className=" text-secondary">{formatDate(comment.createdAt)}</time>
                </div>
                <p className="text-secondary">{comment.content}</p>
              </div>
              <Action />
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default Comments;
