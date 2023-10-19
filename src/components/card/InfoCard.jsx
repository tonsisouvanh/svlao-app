import React from "react";

const InfoCard = ({ icon, label, text }) => {
  return (
    <div className="mb-4 w-full px-2 md:w-1/2 lg:w-1/3">
      <div className="flex items-center rounded bg-base-100 p-4">
        <div className="mr-4 text-2xl text-blue-500">{icon}</div>
        <div>
          <div className="text-sm font-semibold">{label}</div>
          <div>{text}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
