import { CiEdit } from "react-icons/ci";
import { Delete } from "./Delete";
import { Link } from "react-router-dom";

type Id = {
  id: number;
};

export function Action({ id }: Id) {
  return (
    <div className="flex items-center gap-2">
      <Link to={`/edit/${id}`}>
        <CiEdit size={24} className="cursor-pointer" />
      </Link>
      <Delete id={id} name={"blog"} />
    </div>
  );
}
