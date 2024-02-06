import { Link } from "react-router-dom";
import laosboy from "../../assets/img/laosboy.png";
import laosgirl from "../../assets/img/laosgirl.png";
const Unauthorized = () => {
  return (
    <div className="h-screen w-full bg-base-100 p-10">
      <div className="flex items-center justify-between space-x-8">
        <div>
          <img
            className="h-32 w-32 rounded-full object-contain md:h-48 md:w-48 lg:h-64 lg:w-64"
            src={laosboy}
            alt=""
          />
        </div>
        <center className="spacy-3 font-notosanslao">
          <div className="space-y-2">
            <h1 className="text-lg font-bold text-primary md:text-4xl lg:text-6xl">
              ຂໍອະໄພ
            </h1>
            <p className="text-xs md:text-base lg:text-xl">
              ທ່ານບໍ່ມີສິດເຂົ້າເຖິງ
            </p>
          </div>
          <Link to="/">
            <button className="btn btn-primary btn-sm mt-10 whitespace-nowrap">
              Go back
            </button>
          </Link>
        </center>
        <div>
          <img
            className="h-32 w-32 rounded-full object-contain md:h-48 md:w-48 lg:h-64 lg:w-64"
            src={laosgirl}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
