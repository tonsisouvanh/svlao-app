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
        <h1 className="mb-20 flex justify-center font-notosanslao text-4xl font-bold text-primary ">
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

                <div className="flex items-center gap-2">
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
              <div>
                <label className="mb-2 block font-semibold text-gray-600 ">
                  ໄລຍະຮຽນ:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    className="input input-bordered w-full max-w-xs"
                  />
                  ເຖິງ
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

            {/* Add more input fields for other student information */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
