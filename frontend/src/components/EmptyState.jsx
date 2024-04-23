import { FcOpenedFolder } from "react-icons/fc";

const EmptyState = ({ message="No Data", icon=<FcOpenedFolder /> }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-4xl">{icon}</div>
      <h1>{message}</h1>
    </div>
  );
};

export default EmptyState;
