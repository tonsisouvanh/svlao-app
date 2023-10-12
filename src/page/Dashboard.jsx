import { Link } from "react-router-dom";
import { data } from "../data/data";
const user = {
  role: "admin",
};
const Dashboard = () => {
  console.log(data);
  return (
    <div>
      <section className="text-gray-600 body-fon ">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <label className="text-4xl font-bold flex justify-center text-primary font-notosanslao      ">
              ລາຍຊື່ນັກຮຽນ
            </label>
          </div>
          <div className="flex justify-center mb-20  ">
            <div className="navbar-end">
              <div className="join flex justify-center ">
                <div>
                  <div>
                    <input
                      className="input input-bordered join-item !bg-white"
                      placeholder="Search"
                    />
                  </div>
                </div>
                <select className="select select-bordered join-item !bg-white">
                  <option disabled selected>
                    Filter
                  </option>
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                  <option>50</option>
                  <option>All</option>
                </select>
                <div className="indicator">
                  <span className="indicator-item badge badge-secondary">
                    new
                  </span>
                  <button className="btn join-item !bg-white mb-10">
                    Search
                  </button>
                </div>
              </div>
            </div>
            {user.role === "admin" ? (
              <div className="flex justify-center gap-10 mb-10  font-bold text-primary font-notosanslao">
                <Link to={"/edit"}>
                  <button className="btn btn-info text-xl">ແປງຂໍ້ມູນ</button>
                </Link>
                <Link to={"/input"}>
                  <button className="btn btn-success text-xl">
                    ຕື່ມຂໍ້ມູນນັກຮຽນ
                  </button>
                </Link>
              </div>
            ) : null}
          </div>
          <div className="flex flex-wrap -m-20 font-notosanslao ">
            {data.map((i) => (
              <div key={i.id} className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img
                    alt="team"
                    className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                    src="https://res.cloudinary.com/dlux9nebf/image/upload/v1696842264/SVlaoProject/BounmyDola.jpg"
                  />
                  <div className="flex-grow">
                    <h2 className="label-text text-xl">{i.name.nameEnglist}</h2>
                    <p className="label-text">{i.major}</p>

                    <div className="flex justify-end">
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
            <button className="join-item btn !bg-white">«</button>
            <button className="join-item btn !bg-white">1</button>
            <button className="join-item btn !bg-white">2</button>
            <button className="join-item btn !bg-white">2</button>
            <button className="join-item btn !bg-white">_</button>
            <button className="join-item btn !bg-white">_</button>
            <button className="join-item btn !bg-white">10</button>
            <button className="join-item btn !bg-white">100</button>
            <button className="join-item btn !bg-white">»</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
