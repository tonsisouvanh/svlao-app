import { Link } from "react-router-dom";
import { data } from "../data/data";

const StudentList = () => {
  return (
    <section className="body-fon p-10 text-gray-600 ">
      <div className="container mx-auto px-5 py-10">
        <div className="mb-20 flex w-full flex-col text-center">
          <label className="mb-20 flex justify-center font-notosanslao text-4xl font-bold text-primary     ">
            ລາຍຊື່ນັກຮຽນ
          </label>
          <div className="mb-10 flex justify-end">
            <Link to={"/add"}>
              <button className="btn btn-ghost btn-active font-notosanslao ">
                ຕື່ມຂໍ້ມູນນັກຮຽນ
              </button>
            </Link>
          </div>
        </div>

        <div className="-m-20 flex flex-wrap font-notosanslao ">
          {data.map((i) => (
            <div key={i.id} className="w-full p-2 md:w-1/2 lg:w-1/3">
              <div className="flex h-full items-center rounded-lg border border-gray-200 p-4">
                <img
                  alt="team"
                  className="mr-4 h-16 w-16 flex-shrink-0 rounded-full bg-gray-100 object-cover object-center"
                  src="https://res.cloudinary.com/dlux9nebf/image/upload/v1696842264/SVlaoProject/BounmyDola.jpg"
                />
                <div className="flex-grow">
                  <h2 className="label-text text-xl">{i.name.nameEnglist}</h2>
                  <p className="label-text">{i.major}</p>

                  <div className="flex justify-end gap-2">
                    <Link to={`/detail/${i.id}`}>
                      <button className="btn btn-accent font-notosanslao !text-white">
                        ແປງຂໍ້ມູນ
                      </button>
                    </Link>
                    <Link to={`/detail/${i.id}`}>
                      <button className="btn btn-error font-notosanslao !text-white">
                        ລົບຂໍ້ມູນ
                      </button>
                    </Link>
                    <Link to={`/detail/${i.id}`}>
                      <button className="btn btn-primary font-notosanslao !text-white">
                        ລາຍລະອຽດນັກຮຽນ
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid justify-items-center  ">
        <div className="join  ">
          <button className="btn join-item !bg-white">«</button>
          <button className="btn join-item !bg-white">1</button>
          <button className="btn join-item !bg-white">2</button>
          <button className="btn join-item !bg-white">2</button>
          <button className="btn join-item !bg-white">_</button>
          <button className="btn join-item !bg-white">_</button>
          <button className="btn join-item !bg-white">10</button>
          <button className="btn join-item !bg-white">100</button>
          <button className="btn join-item !bg-white">»</button>
        </div>
      </div>
    </section>
  );
};

export default StudentList;
