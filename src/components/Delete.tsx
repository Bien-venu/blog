/* eslint-disable @typescript-eslint/no-unused-vars */
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface DeleteProps {
  id: number;
  name: string;
}

export function Delete({ id, name }: DeleteProps) {
  const [error, setError] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authorized when the component mounts
    const token = localStorage.getItem("token");
    setIsAuthorized(!!token);
  }, []);
  
  console.log(error)
    const handleDelete = async () => {
    if (!isAuthorized) {
      setError("Not authorized");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await api.delete(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/${name === "blog" ? "posts" : "comments"}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      {
        name === "blog" ? navigate(`/`) : "comments";
      }

      toast(`${name === "blog" ? "Blog" : "Comments"} deleted successfully!`);
      window.location.reload();
    } catch (error) {

      
      if (error instanceof Error) {
        if (error.message.includes("403")) {
          toast("You are not allowed to delete or edit this blog.");
        } 
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }

    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <MdDelete size={24} className="cursor-pointer text-more" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex items-end">
          <DialogClose asChild>
            <Button
              onClick={handleDelete}
              className="rounded bg-more p-2 px-8 text-end text-white"
            >
              Yes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
