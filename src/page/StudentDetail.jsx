import { useParams } from "react-router-dom";
import { data } from "../data/data";
import { useState } from "react";

const user = {
  role: "admin",
};
const StudentDetail = () => {
  const { id } = useParams();
  const student = data.find((stu) => stu.id === id);
  const [monutchinh, setmonutchinh] = useState(false);

  return (
    <div className="container mx-auto mt-8 font-notosanslao">
      <div className="rounded bg-white p-8 shadow-md ">
        <div>
          <h1 className="mb-4 flex justify-center text-4xl font-bold ">
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
                    <p className="font-notosanslao text-2xl">{id}</p>
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
                    <p className="font-notosanslao text-2xl">{student.level}</p>
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
                    <h2 className="text-2xl font-bold">ປີເລີ່ມຮຽນ - ປີຈົບ:</h2>
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
    </div>
  );
};

export default StudentDetail;
