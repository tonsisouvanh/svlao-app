import { useParams } from "react-router-dom";
import { data } from "../data/data";
import { useEffect, useState } from "react";
import DataNotFound from "./public/DataNotFound";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleStudent } from "../feature/student/StudentSlice";
import { auth } from "../firebase";
const user = {
  role: "admin",
};
const Profile = () => {
  const userData = JSON.parse(sessionStorage.getItem("studentData")) || null;
  const { id } = useParams();
  const student = data.find((stu) => stu.id === id);
  const [monutchinh, setmonutchinh] = useState(false);
  const dispatch = useDispatch((state) => state.user);
  const user = auth.currentUser;
  const { user: userProfile, status } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchSingleStudent(user.uid));
  }, [dispatch, user]);

  console.log(userProfile);
  return (
    <>
      {!userData ? (
        <div className="rounded bg-none font-notosanslao">
          <div>
            <h1 className="mb-4 flex justify-center text-2xl font-bold">
              ລາຍລະອຽດນັກຮຽນ
            </h1>
            <section className="body-font text-gray-600">
              <div className="container mx-auto flex flex-col px-5 py-24 ">
                <div className="flex gap-60">
                  <div className="h-1/2 w-64  ">
                    <img
                      className="mb-1 h-full  w-full object-cover  "
                      alt="hero"
                      src="https://res.cloudinary.com/dlux9nebf/image/upload/v1696842264/SVlaoProject/BounmyDola.jpg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-20">
                    <div>
                      <h2 className="text-2xl font-bold">ID:</h2>
                      <p className="font-notosanslao text-2xl">
                        {userData?.documentId}
                      </p>
                    </div>
                    <div className="font-notosanslao text-2xl">
                      <h2 className="text-2xl font-bold">ເພດ:</h2>
                      <p>{student.gender}</p>
                      {monutchinh === true ? (
                        <input
                          type="text"
                          placeholder="Type here"
                          className="input input-bordered w-full max-w-xs"
                        />
                      ) : null}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">ຊື່ລາວ:</h2>
                      <p className="font-notosanslao text-2xl">
                        {student.name.nameLao}
                        {monutchinh === true ? (
                          <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                          />
                        ) : null}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">ຊື່ ພາສາອັງກິດ:</h2>
                      <p className="font-notosanslao text-2xl">
                        {student.name.nameEnglist}
                        {monutchinh === true ? (
                          <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                          />
                        ) : null}
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold">ຊື່ຫລິ້ນ:</h2>
                      <p className="font-notosanslao text-2xl">
                        {student.name.nameEnglist}
                        {monutchinh === true ? (
                          <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                          />
                        ) : null}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">ວັນເດືອນປີເກີດ:</h2>
                      <p className="font-notosanslao text-2xl">{student.age}</p>
                      {monutchinh === true ? (
                        <input
                          type="text"
                          placeholder="Type here"
                          className="input input-bordered w-full max-w-xs"
                        />
                      ) : null}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">ລະດັບຮຽນ:</h2>
                      <p className="font-notosanslao text-2xl">
                        {student.degree}
                        {monutchinh === true ? (
                          <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                          />
                        ) : null}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">ວິຊາຮຽນ:</h2>
                      <p className="font-notosanslao text-2xl">
                        {student.subject}
                      </p>
                      {monutchinh === true ? (
                        <input
                          type="text"
                          placeholder="Type here"
                          className="input input-bordered w-full max-w-xs"
                        />
                      ) : null}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">ຮຽນຢູ່ໂຮງຮຽນ:</h2>
                      <p className="font-notosanslao text-2xl">
                        {student.school}
                        {monutchinh === true ? (
                          <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                          />
                        ) : null}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">ໄລຍະຮຽນ:</h2>
                      <p className="font-notosanslao text-2xl">
                        {student.level}
                      </p>
                      {monutchinh === true ? (
                        <input
                          type="text"
                          placeholder="Type here"
                          className="input input-bordered w-full max-w-xs"
                        />
                      ) : null}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">ແຫຼ່ງທຶນ:</h2>
                      <p className="font-notosanslao text-2xl">
                        {student.sacolaship}
                        {monutchinh === true ? (
                          <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                          />
                        ) : null}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        ເລກທີຂໍ້ຕົກລົງກະຊວງສຶກສາລາວ, ລົງວັນທີ:
                      </h2>
                      <p className="font-notosanslao text-2xl">
                        {student.sacolashipLao}
                        {monutchinh === true ? (
                          <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                          />
                        ) : null}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        ເລກທີຂໍ້ຕົກລົງກະຊວງສຶກສາຫວຽດນາມ, ລົງວັນທີ:
                      </h2>
                      {monutchinh === true ? (
                        <input
                          type="text"
                          placeholder="Type here"
                          className="input input-bordered w-full max-w-xs"
                        />
                      ) : null}
                      <p className="font-notosanslao text-2xl">
                        {student.sacolashipVN}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        ເລກທີຂໍ້ຕົກລົງຂອງສະຖາບັນສຶກສາ, ລົງວັນທີ:
                      </h2>

                      <p className="font-notosanslao text-2xl">
                        {student.sacolashipSchool}
                      </p>
                      {monutchinh === true ? (
                        <input
                          type="text"
                          placeholder="Type here"
                          className="input input-bordered w-full max-w-xs"
                        />
                      ) : null}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        ປີເລີ່ມຮຽນ - ປີຈົບ:
                      </h2>
                      <p className="font-notosanslao text-2xl">
                        {student.startStop}
                      </p>
                      {monutchinh === true ? (
                        <input
                          type="text"
                          placeholder="Type here"
                          className="input input-bordered w-full max-w-xs"
                        />
                      ) : null}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">ແຂວງເກີດ:</h2>
                      <p className="font-notosanslao text-2xl">
                        {student.province}
                      </p>
                      {monutchinh === true ? (
                        <input
                          type="text"
                          placeholder="Type here"
                          className="input input-bordered w-full max-w-xs"
                        />
                      ) : null}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        ທີ່ຢູ່ປັດຈຸບັນໃນ ຮຈມ:
                      </h2>
                      <p className="font-notosanslao text-2xl">
                        {student.address}
                      </p>
                      {monutchinh === true ? (
                        <input
                          type="text"
                          placeholder="Type here"
                          className="input input-bordered w-full max-w-xs"
                        />
                      ) : null}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">ເບີໂທລາວ:</h2>
                      <p className="font-notosanslao text-2xl">
                        {student.phone ? student.phone.phoneLao : " "}
                      </p>
                      {monutchinh === true ? (
                        <input
                          type="text"
                          placeholder="Type here"
                          className="input input-bordered w-full max-w-xs"
                        />
                      ) : null}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">ເບີໂທຫວຽດ:</h2>
                      <p className="font-notosanslao text-2xl">
                        {student.phone ? student.phone.phoneViet : " "}
                      </p>
                      {monutchinh === true ? (
                        <input
                          type="text"
                          placeholder="Type here"
                          className="input input-bordered w-full max-w-xs"
                        />
                      ) : null}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Link facebook:</h2>
                      <p className="font-notosanslao text-2xl">
                        {student.linkFB}
                      </p>
                      {monutchinh === true ? (
                        <input
                          type="text"
                          placeholder="Type here"
                          className="input input-bordered w-full max-w-xs"
                        />
                      ) : null}
                    </div>
                    <div className="flex items-center  gap-2">
                      <div>
                        <label className="mb-2 block text-2xl font-semibold text-gray-600 ">
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
                    <div className="flex items-center justify-center  gap-2">
                      <div>
                        <label className="mb-2 block text-2xl font-semibold text-gray-600 ">
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
                            <label className="label-text mb-1 text-2xl">
                              ຮູບ
                            </label>
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
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
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
                  </div>
                </div>
              </div>
            </section>
            {user.role === "admin" ? (
              <div className="mb-10 flex justify-end gap-10  font-notosanslao font-bold text-primary">
                {monutchinh === true ? null : (
                  <button
                    onClick={() => setmonutchinh(true)}
                    className="btn btn-info text-xl"
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
