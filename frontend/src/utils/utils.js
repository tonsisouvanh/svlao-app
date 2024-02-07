import toast from "react-hot-toast";
import moment from "moment";
import altImage from "../assets/img/profile.png";
export const checkRole = (role) => {
  let approve = false;
  switch (role) {
    case "admin":
      approve = true;
      break;
    case "assistant":
      approve = true;
      break;
    case "student":
      approve = true;
      break;
    default:
      break;
  }
  return approve;
};

export const getImageId = (passedUrl) => {
  const url = passedUrl.toString();
  let idValue = "";

  if (url.startsWith("https://drive.google.com/uc?export=view&id=")) {
    return url;
  }

  if (url.includes("open?id=")) {
    const parts = url.split("open?id=");
    idValue = parts[1] ? parts[1] : "";
  } else if (url.includes("file/d/")) {
    const start = url.indexOf("file/d/") + 7;
    const end = url.indexOf("/", start);
    idValue = url.substring(start, end);
  }

  return idValue !== ""
    ? "https://drive.google.com/uc?export=view&id=" + idValue
    : "";
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    // setIsCopied(true);
    toast.success("Copied to clipboard");
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
  }
};

export const formatDate = (dateString) => {
  var date = new Date(dateString);
  return moment(date).format("YYYY-MM-DD");
};

export const formatDateDDMMYYYY = (dateString) => {
  var date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

// export const getYearOptions = () => {
//   const currentYear = new Date().getFullYear();
//   const years = [];
//   for (let i = currentYear; i <= currentYear + 10; i++) {
//     years.push(i);
//   }
//   return years;
// };

export const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  const range = 10; // You can adjust this range as needed

  for (let i = currentYear - range; i <= currentYear + range; i++) {
    years.push(i);
  }

  return years;
};

export const userStatusColor = (userStatus) => {
  let color = "";
  switch (userStatus.trim()) {
    case "pending":
      color = "text-warning";
      break;
    case "active":
      color = "text-info";
      break;
    default:
      color = "";
      break;
  }
  return color;
};

export const replaceImage = (error) => {
  error.target.src = altImage;
};
