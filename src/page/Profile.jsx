import { useParams } from "react-router-dom";
import { data } from "../data/data";
import { useEffect, useState } from "react";
import DataNotFound from "./public/DataNotFound";
import { useForm } from "react-hook-form";
import { initialStudentInput } from "../data/initialState";

const user = {
  role: "admin",
};

const mainLabelStyle = "label-text text-[1rem] mb-2 block font-semibold";

const textInputStyle =
  "input input-sm input-bordered w-full max-w-xs hover:shadow-md transition-all duration-200";
const Profile = () => {
  const userData = JSON.parse(sessionStorage.getItem("studentData")) || null;
  const { id } = useParams();
  const student = data.find((stu) => stu.id === id);
  const [monutchinh, setmonutchinh] = useState(false);

  // useEffect(() => {

  // }, [])
  const { register } = useForm({ defaultValues: initialStudentInput });
  const [degree, setDegree] = useState("");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");

  return (
    <>
      {!userData ? (
        <div className="rounded bg-none font-notosanslao">
          <div>
            <h1 className="mb-4 flex justify-center text-xl font-bold sm:text-4xl">
              ລາຍລະອຽດນັກຮຽນ
            </h1>

            <div className="flex flex-col items-center justify-start gap-4 md:flex-row md:items-start md:justify-center">
              <div className="flex justify-center border border-red-500">
                <div className="flex h-1/2 w-64 ">
                  <img
                    className="mb-1 h-full  w-full object-cover  "
                    alt="hero"
                    src="https://res.cloudinary.com/dlux9nebf/image/upload/v1696842264/SVlaoProject/BounmyDola.jpg"
                  />
                </div>
              </div>

              <section className="body-font grid grid-cols-1 border border-blue-500 px-5 text-gray-600 sm:grid-cols-3 lg:grid-cols-3">
                <div className="flex items-center justify-between gap-6">
                  <h2 className="label-text font-semibold md:text-xl">
                    ຊື່ລາວ:
                  </h2>
                  {monutchinh === true ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                    />
                  ) : null}
                  <p className="label-text font-semibold md:text-xl">
                    {userData?.documentId}
                  </p>
                </div>
                <div className="">
                  <h2 className="label-text font-semibold md:text-xl">
                    ຊື່ອັງກິດ:
                  </h2>
                  <p>{student.gender}</p>
                  {monutchinh === true ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="label-text font-semibold md:text-xl"
                    />
                  ) : null}
                </div>
                <div className="">
                  <h2 className="label-text font-semibold md:text-xl">
                    ຊື່ຫລິ້ນ:
                  </h2>
                  <p className="label-text font-semibold md:text-xl">
                    {student.age}
                  </p>
                  {monutchinh === true ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                    />
                  ) : null}
                </div>
                <div className="flex items-center justify-between gap-6 px-5">
                  <h2 className="label-text font-semibold md:text-xl">MSSV:</h2>
                  {monutchinh === true ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="label-text font-semibold md:text-xl"
                    />
                  ) : null}
                  <p className="label-text font-semibold md:text-xl">
                    {userData?.documentId}
                  </p>
                </div>
                <div>
                  <h2 className="label-text font-semibold md:text-xl">ເພດ:</h2>
                  <p>{student.gender}</p>
                  {monutchinh === true ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="label-text font-semibold md:text-xl"
                    />
                  ) : null}
                </div>
                <div className="">
                  <h2 className="label-text font-semibold md:text-xl">
                    ວັນເດືອນປີເກີດ:
                  </h2>
                  <p className="label-text font-semibold md:text-xl">
                    {student.age}
                  </p>
                  {monutchinh === true ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                    />
                  ) : null}
                </div>
                <div className="flex items-center justify-between gap-6 px-5">
                  <h2 className="label-text font-semibold md:text-xl">
                    ທີ່ຢູ່ປັດຈຸບັນ:
                  </h2>
                  {monutchinh === true ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="label-text font-semibold md:text-xl"
                    />
                  ) : null}
                  <p className="label-text font-semibold md:text-xl">
                    {userData?.documentId}
                  </p>
                </div>
                <div>
                  <h2 className="label-text font-semibold md:text-xl">
                    ຊື່ໂຮງຮຽນ:
                  </h2>
                  <p>{student.gender}</p>
                  {monutchinh === true ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="label-text font-semibold md:text-xl"
                    />
                  ) : null}
                </div>
                <div className="">
                  <h2 className="label-text font-semibold md:text-xl">
                    ສາຍຮຽນ:
                  </h2>
                  <p className="label-text font-semibold md:text-xl">
                    {student.age}
                  </p>
                  {monutchinh === true ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                    />
                  ) : null}
                </div>
                <div className="flex items-center justify-between gap-6 px-5">
                  <h2 className="label-text font-semibold md:text-xl">
                    ລະດັບຮຽນ:
                  </h2>
                  {monutchinh === true ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="label-text font-semibold md:text-xl"
                    />
                  ) : null}
                  <p className="label-text font-semibold md:text-xl">
                    {userData?.documentId}
                  </p>
                </div>
                <div>
                  <h2 className="label-text font-semibold md:text-xl">
                    ທຶນການສຶກສາ:
                  </h2>
                  <p>{student.gender}</p>
                  {monutchinh === true ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="label-text font-semibold md:text-xl"
                    />
                  ) : null}
                </div>
                <div className="">
                  <h2 className="label-text font-semibold md:text-xl">
                    ໄລຍະຮຽນ:
                  </h2>
                  <p className="label-text font-semibold md:text-xl">
                    {student.age}
                  </p>
                  {monutchinh === true ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                    />
                  ) : null}
                </div>
                <div className="flex items-center justify-between gap-6 px-5">
                  <h2 className="label-text font-semibold md:text-xl">
                    ເບີໂທຕິດຕໍ່:
                  </h2>
                  {monutchinh === true ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="label-text font-semibold md:text-xl"
                    />
                  ) : null}
                  <p className="label-text font-semibold md:text-xl">
                    {userData?.documentId}
                  </p>
                </div>
                <div>
                  <h2 className="label-text font-semibold md:text-xl">
                    ເບີໂທຕິດຕໍ່ສຸກເສີນ
                  </h2>
                  <p>{student.gender}</p>
                  {monutchinh === true ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="label-text font-semibold md:text-xl"
                    />
                  ) : null}
                </div>
                <div className="items-center justify-between gap-6 px-5">
                  <h2 className="label-text font-semibold md:text-xl">Visa:</h2>
                  {monutchinh === true ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="label-text font-semibold md:text-xl"
                    />
                  ) : null}
                  <p className="label-text font-semibold md:text-xl">
                    {userData?.documentId}
                  </p>
                </div>
                <div>
                  <h2 className="label-text font-semibold md:text-xl">
                    Link FaceBook:
                  </h2>
                  <p>{student.gender}</p>
                  {monutchinh === true ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="label-text font-semibold md:text-xl"
                    />
                  ) : null}
                </div>
                <div>
                  <div className="mt-20 flex items-center justify-center gap-2 ">
                    <div>
                      <label className={mainLabelStyle}>Passport:</label>
                      <div className="flex flex-col items-start gap-3">
                        <div className="space-y-3">
                          <input
                            {...register("passport.passportNo", {
                              required: "Please fill up",
                            })}
                            type="text"
                            placeholder="Passport Number"
                            className={textInputStyle}
                          />

                          <input
                            {...register("passport.expired", {
                              required: "Please enter date",
                            })}
                            type="date"
                            placeholder="Expired Date"
                            className={textInputStyle}
                          />
                        </div>
                        <div className="flex w-full flex-col items-start justify-center">
                          <label className={mainLabelStyle}>ຮູບ</label>
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
                                <span className="">Click to upload</span> or
                                drag and drop
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
                </div>
              </section>
            </div>

            {user.role === "admin" ? (
              <div className="mb-10 flex justify-end gap-10  font-notosanslao font-bold text-primary">
                {monutchinh === true ? null : (
                  <button
                    onClick={() => setmonutchinh(true)}
                    className="btn btn-info mt-10 text-xl"
                  >
                    ແປງຂໍ້ມູນ
                  </button>
                )}
                {monutchinh === true ? (
                  <div>
                    <button className="btn btn-info text-xl">ຕົກລົງ</button>
                    <button
                      onClick={() => setmonutchinh(false)}
                      className="btn btn-secondary text-xl"
                    >
                      ຍົກເລີກ
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <DataNotFound />
      )}
    </>
  );
};

export default Profile;
