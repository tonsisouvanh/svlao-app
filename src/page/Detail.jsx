import { useParams } from "react-router-dom";
import { data } from "../data/data";
const StudentDetail = () => {
  const { id } = useParams();
  const student = data.find((stu) => stu.id === id);

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">ລາຍລະອຽດນັກຮຽນ</h1>
        <div className="grid grid-cols-2 gap-20">
          <div>
            <h2 className="text-xl font-semibold">ID:</h2>
            <p>{id}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">ເພດ:</h2>
            <p>{student.gender}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">ຊື່ລາວ:</h2>
            <p>{student.name.nameLao}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">ຊື່ ພາສາອັງກິດ:</h2>
            <p>{student.name.nameEnglist}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">ວັນເດືອນປີເກີດ:</h2>
            <p>{student.age}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">ລະດັບຮຽນ:</h2>
            <p>{student.major}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">ວິຊາຮຽນ:</h2>
            <p>{student.subject}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">ຮຽນຢູ່ໂຮງຮຽນ:</h2>
            <p>{student.school}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">ໄລຍະຮຽນ:</h2>
            <p>{student.level}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">ແຫຼ່ງທຶນ:</h2>
            <p>{student.lt}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              ເລກທີຂໍ້ຕົກລົງກະຊວງສຶກສາລາວ, ລົງວັນທີ:
            </h2>
            <p>{student.ltt}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              ເລກທີຂໍ້ຕົກລົງກະຊວງສຶກສາຫວຽດນາມ, ລົງວັນທີ:
            </h2>
            <p>{student.lttt}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              ເລກທີຂໍ້ຕົກລົງຂອງສະຖາບັນສຶກສາ, ລົງວັນທີ:
            </h2>
            <p>{student.phoneLao}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">ປີເລີ່ມຮຽນ - ປີຈົບ:</h2>
            <p>{student.phone ? student.phone.phoneViet : " "}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">ແຂວງເກີດ:</h2>
            <p>{student.phone ? student.phone.phoneViet : " "}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">ທີ່ຢູ່ປັດຈຸບັນໃນ ຮຈມ:</h2>
            <p>{student.phone ? student.phone.phoneViet : " "}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">ເບີໂທລາວ:</h2>
            <p>{student.phone ? student.phone.phoneViet : " "}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">ເບີໂທຫວຽດ:</h2>
            <p>{student.phone ? student.phone.phoneViet : " "}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Link facebook:</h2>
            <p>{student.link}</p>
          </div>
        </div>
      </div>
      <div className="space-x-4 mt-5 flex justify-end">
        <button className="btn btn-primary text-xl">ແປງຂໍ້ມູນ</button>
        <button className="btn btn-secondary text-xl">ລົບຂໍ້ມູນ</button>
      </div>
    </div>
  );
};

export default StudentDetail;
