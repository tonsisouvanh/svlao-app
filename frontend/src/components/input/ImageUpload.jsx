import { useState } from "react";
import images from "../../assets/img";

const ImageUpload = ({ setBase64 }) => {
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <label
        htmlFor="uploadFile1"
        className="relative flex h-36 w-36 cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 bg-white font-[sans-serif] text-base font-semibold text-gray-500 hover:opacity-70"
      >
        {loading && (
          <img
            className="absolute left-0 top-0 opacity-30"
            src={"/loading.gif"}
            alt=""
          />
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mb-2 w-11 fill-gray-500"
          viewBox="0 0 32 32"
        >
          <path
            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
            data-original="#000000"
          />
          <path
            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
            data-original="#000000"
          />
        </svg>
        Upload picture
        <input
          onChange={uploadImage}
          type="file"
          id="uploadFile1"
          className="hidden"
        />
      </label>
    </>
  );
};

export default ImageUpload;
