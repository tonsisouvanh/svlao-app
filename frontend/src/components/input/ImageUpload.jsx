import { useState } from "react";
import assets from "../../assets/assets.gif";

const ImageUpload = ({ setBase64 }) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
        setLoading(false);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (event) => {
    const files = event.target.files;
    if (files && files.length === 1) {
      const base64 = await convertBase64(files[0]);
      setBase64(base64);
      return;
    }

    const base64s = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const base = await convertBase64(files[i]);
        base64s.push(base);
      }
    }
  };

  function UploadInput() {
    return (
      <div className="flex w-full items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              aria-hidden="true"
              className="mb-3 h-10 w-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            onChange={uploadImage}
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
          />
        </label>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center ">
        <div>
          {url && (
            <div>
              Access you file at{" "}
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </div>
          )}
        </div>
        <div>
          {loading ? (
            <div className="flex items-center justify-center">
              <img src={assets}/>
            </div>
          ) : (
            <UploadInput />
          )}
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
