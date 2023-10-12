import { useParams } from "react-router-dom";
import { data } from "../data/data";
const StudentDetail = () => {
  const { id } = useParams();
  const student = data.find((stu) => stu.id === id);

  return (
    <div className="container font-notosanslao mx-auto mt-8">
      <div className="bg-white p-8 rounded shadow-md ">
        <div>
          <h1 className="text-4xl font-bold mb-4 flex justify-center ">
            ລາຍລະອຽດນັກຮຽນ
          </h1>
          <section className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-col px-5 py-24 ">
              <div className="flex gap-60">
                <div className="w-64 h-1/2  ">
                  <img
                    className="w-full h-full  mb-1 object-cover  "
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
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">ຊື່ລາວ:</h2>
                    <p className="font-notosanslao text-2xl">
                      {student.name.nameLao}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">ຊື່ ພາສາອັງກິດ:</h2>
                    <p className="font-notosanslao text-2xl">
                      {student.name.nameEnglist}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">ວັນເດືອນປີເກີດ:</h2>
                    <p className="font-notosanslao text-2xl">{student.age}</p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">ລະດັບຮຽນ:</h2>
                    <p className="font-notosanslao text-2xl">
                      {student.degree}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">ວິຊາຮຽນ:</h2>
                    <p className="font-notosanslao text-2xl">
                      {student.subject}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">ຮຽນຢູ່ໂຮງຮຽນ:</h2>
                    <p className="font-notosanslao text-2xl">
                      {student.school}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">ໄລຍະຮຽນ:</h2>
                    <p className="font-notosanslao text-2xl">{student.level}</p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">ແຫຼ່ງທຶນ:</h2>
                    <p className="font-notosanslao text-2xl">
                      {student.sacolaship}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      ເລກທີຂໍ້ຕົກລົງກະຊວງສຶກສາລາວ, ລົງວັນທີ:
                    </h2>
                    <p className="font-notosanslao text-2xl">
                      {student.sacolashipLao}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      ເລກທີຂໍ້ຕົກລົງກະຊວງສຶກສາຫວຽດນາມ, ລົງວັນທີ:
                    </h2>
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
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">ປີເລີ່ມຮຽນ - ປີຈົບ:</h2>
                    <p className="font-notosanslao text-2xl">
                      {student.startStop}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">ແຂວງເກີດ:</h2>
                    <p className="font-notosanslao text-2xl">
                      {student.province}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      ທີ່ຢູ່ປັດຈຸບັນໃນ ຮຈມ:
                    </h2>
                    <p className="font-notosanslao text-2xl">
                      {student.address}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">ເບີໂທລາວ:</h2>
                    <p className="font-notosanslao text-2xl">
                      {student.phone ? student.phone.phoneLao : " "}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">ເບີໂທຫວຽດ:</h2>
                    <p className="font-notosanslao text-2xl">
                      {student.phone ? student.phone.phoneViet : " "}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Link facebook:</h2>
                    <p className="font-notosanslao text-2xl">
                      {student.linkFB}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
