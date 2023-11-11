import toast from "react-hot-toast";

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
