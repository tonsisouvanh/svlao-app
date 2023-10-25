import React from "react";
import ErrorMessage from "../typography/ErrorMessage";
import { useFormContext } from "react-hook-form";
const textInputStyle =
  "input input-sm input-bordered w-full max-w-xs hover:shadow-md transition-all duration-200";

const InfoCard = ({ icon, label, text, toggleEdit = false, link = "" }) => {
  return (
    // <div className="">
    <div className="flex items-center rounded bg-base-100 py-4 pr-4">
      <div className="mr-4 text-2xl text-primary">{icon}</div>
      <div>
        <div className="text-sm font-semibold">{label}</div>
        {toggleEdit ? null : link !== "" ? (
          <a
            target="_blank"
            rel="noreferrer"
            href={text}
            className="w-full truncate btn-link"
          >
            Link
          </a>
        ) : (
          <span>{text}</span>
        )}
      </div>
    </div>
    // </div>
  );
};

export default InfoCard;
