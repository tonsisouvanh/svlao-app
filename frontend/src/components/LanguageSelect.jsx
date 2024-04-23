import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import images from "../assets/img/index";
const options = [
  {
    value: "la",
    text: "LA",
    img: images.laos,
  },
  {
    value: "en",
    text: "ENG",
    img: images.english,
  },
  {
    value: "vn",
    text: "VN",
    img: images.vietnam,
  },
];

const LanguageSelect = () => {
  const [t, i18n] = useTranslation("global");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(i18n.language);

  const getImgByValue = (lang) => {
    return options.find((op) => op.value === lang).img;
  };

  const handleLanguageChange = (value) => {
    i18n.changeLanguage(value);
    setSelectedValue(value);
    localStorage.setItem("language", value);
    setIsOpen(false);
  };

  const divRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div ref={divRef} className="relative min-w-fit">
      <div
        className="w-full cursor-pointer bg-white bg-opacity-80 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out "
        tabIndex={1}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue ? (
          <div className="flex items-center justify-between gap-4 text-gray-700">
            <img
              className="h-[30px] w-[30px]"
              src={getImgByValue(selectedValue)}
              alt=""
            />
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4 text-gray-700">
            <img
              className="h-[30px] w-[30px]"
              src={getImgByValue(i18n.language)}
              alt=""
            />
          </div>
        )}
      </div>
      {isOpen && (
        <div className="absolute -left-[0.25rem] top-7 w-[2rem]">
          <div className="z-10 mt-1 space-y-2 rounded-full bg-transparent bg-white p-1 text-black shadow-md">
            {options
              .filter((item) => item.value !== selectedValue)
              .map((option, index) => (
                <img
                  src={option.img}
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleLanguageChange(option.value)}
                  alt=""
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelect;
