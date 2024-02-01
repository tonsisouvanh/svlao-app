import { Link } from "react-router-dom";

const Breadcrumbs = ({ pathname }) => {
  const pathParts = pathname.split("/").filter((part) => part !== "");

  return (
    <div className="breadcrumbs text-sm">
      <ul>
        {pathParts.map((part, index) => {
          const formattedPart = part.replace(/-/g, " "); // Replace '-' with ' '
          return (
            <li key={index}>
              <Link to={`/${pathParts.slice(0, index + 1).join("/")}`}>
                {formattedPart}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
