import { Link } from "react-router-dom";
const Input = () => {
  const student = {
    id: 1,
    name: "",
    age: 20,
    grade: "A",
    address: "123 Main St",
    // Add more student details as needed
  };

  return (
    <div className="container font-notosanslao mx-auto mt-8">
      <div className="bg-white p-8 rounded shadow-md ">
        <div>
          <h1 className="text-4xl font-bold mb-4 flex justify-center ">
            ຕື່ມຂໍ້ມູນນັກຮຽນ
          </h1>
          <section className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-col px-5 py-24 ">
              <div className="flex gap-60">
                <div className="w-64 h-1/2  ">
                  <img
                    className="w-full h-full  mb-1 object-cover  "
                    alt="hero"
                    src="https://dummyimage.com/400x400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-20">
                  <div>
                    <h2 className="text-2xl font-bold">ID:</h2>
                    <p>{student.name}</p>
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
                    <p className="font-notosanslao text-2xl">{student.major}</p>
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
                    <p className="font-notosanslao text-2xl">{student.lt}</p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      ເລກທີຂໍ້ຕົກລົງກະຊວງສຶກສາລາວ, ລົງວັນທີ:
                    </h2>
                    <p className="font-notosanslao text-2xl">{student.ltt}</p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      ເລກທີຂໍ້ຕົກລົງກະຊວງສຶກສາຫວຽດນາມ, ລົງວັນທີ:
                    </h2>
                    <p className="font-notosanslao text-2xl">{student.lttt}</p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      ເລກທີຂໍ້ຕົກລົງຂອງສະຖາບັນສຶກສາ, ລົງວັນທີ:
                    </h2>
                    <p className="font-notosanslao text-2xl">
                      {student.phoneLao}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">ປີເລີ່ມຮຽນ - ປີຈົບ:</h2>
                    <p className="font-notosanslao text-2xl">
                      {student.phone ? student.phone.phoneViet : " "}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">ແຂວງເກີດ:</h2>
                    <p className="font-notosanslao text-2xl">
                      {student.phone ? student.phone.phoneViet : " "}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      ທີ່ຢູ່ປັດຈຸບັນໃນ ຮຈມ:
                    </h2>
                    <p className="font-notosanslao text-2xl">
                      {student.phone ? student.phone.phoneViet : " "}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">ເບີໂທລາວ:</h2>
                    <p className="font-notosanslao text-2xl">
                      {student.phone ? student.phone.phoneViet : " "}
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
                    <p className="font-notosanslao text-2xl">{student.link}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="space-x-4 mt-5 flex justify-end">
        <Link to="/">
          <button className="btn btn-primary text-xl">SAVE</button>
        </Link>
      </div>
    </div>
  );
};

export default Input;
