import { CiEdit } from "react-icons/ci";
import { Delete } from "./Delete";

export function Action() {
  return (
    <div className="flex items-center gap-2">
      <CiEdit size={24} className="cursor-pointer" />
      <Delete />
    </div>
  );
}
