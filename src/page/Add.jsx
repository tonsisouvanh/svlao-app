import { useState } from "react";

const AddStudent = () => {
  const [studentInput, setStudentInput] = useState({
    namelao: "",
    nameEnglist: "",
    gender: "",
    major: "",
    img: "",
    age: "",
    address: "",
    school: "",
    degree: "",
    level: "",
    email: "",
    phoneLao: "",
    phoneViet: "",
    province: "",
    subject: "",
    startStop: "",
    sacolaship: "",
    sacolashipLao: "",
    sacolashipVN: "",
    sacolashipSchool: "",
    linkFB: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to save student data here, such as API calls or state management
    // You can reset the form after submission if needed
    setStudentInput({
      // nameLao: "",
      // nameEnglish: "",
      // gender: "",
      // major: "",
      // img: "",
      // age: "",
      // address: "",
      // school: "",
      // degree: "",
      // level: "",
      // email: "",
      // phoneLao: "",
      // phoneViet: "",
      // province: "",
      // subject: "",
      // startStop: "",
      // scholarship: "",
      // scholarshipLao: "",
      // scholarshipVN: "",
      // sacolashipSchool: "",
      // linkFB: "",
    });
  };

  return (
    <div className="container mx-auto px-5 py-10">
      <div className="rounded bg-white p-8 shadow-md ">
        <h1 className="mb-10 flex items-center justify-center font-notosanslao text-4xl font-bold text-primary ">
          ເພີ່ມນັກຮຽນ
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">ຊື່ລາວ:</span>
              </label>
              <input
                type="text"
                placeholder="ຕື່ມຊື່ລາວ"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">ຊື່ອັງກິດ:</span>
              </label>
              <input
                type="text"
                placeholder="ຕື່ມຊື່ອັງກິດ"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">ວັນ ເດືອນ ປີເກີດ:</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="flex items-center gap-2">
              <div>
                <label className="mb-2 block font-semibold text-gray-600">
                  ເພດ:
                </label>

                <select className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    ເລືອກເພດ
                  </option>
                  <option>ຊາຍ</option>
                  <option>ຍິງ</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block font-semibold text-gray-600">
                  ທີ່ຢູ່ປັດຈຸບັນ:
                </label>

                <select className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    ເລືອກທີ່ຢູ່ປັດຈຸບັນ
                  </option>
                  <option>Han Solo</option>
                  <option>Greedo</option>
                </select>
              </div>
            </div>
            <div className="flex items-center  gap-2">
              <div>
                <label className="mb-2 block font-semibold text-gray-600 ">
                  ຊື່ໂຮງຮຽນ:
                </label>
                <div className="flex items-center gap-2">
                  <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>
                      ເລືອກຊື່ໂຮງຮຽນ
                    </option>
                    <option>UEF</option>
                    <option>UEL</option>
                    <option>UTE</option>
                  </select>
                  <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>
                      ເລືອກຊື່ໂຮງຮຽນພາສາຫວຽດ
                    </option>
                    <option>UEF</option>
                    <option>UEL</option>
                    <option>UTE</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div>
                <label className="mb-2 block font-semibold text-gray-600">
                  ສາຍຮຽນ:
                </label>

                <select className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    ເລືອກເລືອກສາຍຮຽນ
                  </option>
                  <option>Cong Nghe Tong Tin</option>
                  <option>Quan He Quoc Te</option>
                  <option>Quan Ly Cong</option>
                  <option>Y Duoc</option>
                  <option>Y Da Khoa</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block font-semibold text-gray-600">
                  ລະດັບຮຽນ:
                </label>
                <div className="flex items-center gap-2">
                  <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>
                      ເລືອກລະດັບຮຽນ
                    </option>
                    <option>ຊັ້ນສູງ</option>
                    <option>ປະລິນຍາຕີ</option>
                    <option>ປະລິນຍາໂທ</option>
                    <option>ປະລິນຍາເອກ</option>
                  </select>
                  <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>
                      ເລືອກລະດັບຮຽນພາສາຫວຽດ
                    </option>
                    <option>Cao Cấp</option>
                    <option>Cử Nhân</option>
                    <option>Thạc Sĩ</option>
                    <option>Tiến Sĩ</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center  gap-2">
              <div>
                <label className="mb-2 block font-semibold text-gray-600 ">
                  ທຶນການສຶກສາ:
                </label>

                <div className="mb-2 flex items-center">
                  <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>
                      ປະເພດທຶນ
                    </option>
                    <option>ລັດຖະບານ</option>
                    <option>ຮ່ວມມື</option>
                    <option>ແລກປ່ຽນ</option>
                    <option>ບໍລິສັດ</option>
                    <option>ສ່ວນໂຕ</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="ຕື່ມເລກທີຂໍ້ຕົກລົງກະຊວງສຶກສາລາວ"
                    className="input input-bordered w-full max-w-xs"
                  />
                  <input
                    type="text"
                    placeholder="ຕື່ມເລກທີຂໍ້ຕົກລົງກະຊວງສຶກສາຫວຽດນາມ"
                    className="input input-bordered w-full max-w-xs"
                  />
                  <input
                    type="text"
                    placeholder="ຕື່ມເລກທີຂໍ້ຕົກລົງຂອງສະຖາບັນສຶກສາ"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center  gap-2">
              <div className="">
                <label className="mb-2 block font-semibold text-gray-600 ">
                  ໄລຍະຮຽນ:
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="date"
                    className="input input-bordered w-full max-w-xs"
                  />

                  <input
                    type="date"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center  gap-2">
              <div>
                <label className="mb-2 block font-semibold text-gray-600 ">
                  ເບີໂທຕິດຕໍ່:
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="ຕື່ມເບີໂທ"
                    className="input input-bordered w-full max-w-xs"
                  />

                  <input
                    type="text"
                    placeholder="ຕື່ມເບີໂທຕິດຕໍ່ສຸກເສີນ"
                    className="input input-bordered w-full max-w-xs"
                  />
                  <div>
                    <select className="select select-bordered w-full max-w-xs">
                      <option disabled selected>
                        ສາຍພົວພັນ
                      </option>
                      <option>ພໍ່</option>
                      <option>ແມ່</option>
                      <option>ເອື້ອຍ</option>
                      <option>ນ້ອງ</option>
                      <option>...</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="mb-2 block font-semibold text-gray-600 ">
                Link FaceBook:
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Link FaceBook"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>

            <div className="flex items-center  gap-2">
              <div>
                <label className="mb-2 block font-semibold text-gray-600 ">
                  Passport:
                </label>

                <div className="flex flex-col items-start gap-3">
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Passport ID"
                      className="input input-bordered w-full max-w-xs"
                    />

                    <input
                      type="Date"
                      placeholder="Expired Date"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>

                  {/* <input
                    type="file"
                    className="file-input file-input-bordered file-input-md w-full max-w-xs"
                  /> */}

                  <div className="flex w-full flex-col items-start justify-center">
                    <label className="label-text mb-1">ຮູບ</label>
                    <label
                      htmlFor="dropzone-file"
                      className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg
                          className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center  gap-2">
              <div>
                <label className="mb-2 block font-semibold text-gray-600 ">
                  Visa:
                </label>

                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="Date"
                    placeholder="Issue Date"
                    className="input input-bordered w-full max-w-xs"
                  />

                  <input
                    type="Date"
                    placeholder="Expired Date"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
              </div>
            </div>

            {/* Add more input fields for other student information */}
          </div>
        </form>
        <div className="mt-10 flex justify-end gap-5">
          <button className="btn btn-primary btn-lg">ຕົກລົງ</button>
          <button className="btn btn-secondary btn-lg">ຍົກເລີກ</button>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
