import { Link } from "react-router-dom";

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Breadcrumbs = ({ pathname,classname }) => {
  const pathParts = pathname
    ? pathname
        .split("/")
        .filter((part) => part !== "")
        .slice(0, 2)
    : "";
  if (!pathname || pathParts.length === 0) return null;
  return (
    <div className={`breadcrumbs text-sm ${classname}`}>
      <ul>
        {pathParts?.map((part, index) => {
          const formattedPart = capitalizeFirstLetter(part.replace(/-/g, " "));
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
