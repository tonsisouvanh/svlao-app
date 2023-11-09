import emptyfolder from "../../assets/img/empty-folder.png";
const DataNotFound = () => {
  return (
    <div className="hero bg-transparent">
      <div className="hero-content flex-col font-notosanslao lg:flex-row">
        <img src={emptyfolder} className="max-w-sm" />
        <div>
          <h1 className="text-5xl font-bold ">ບໍ່ມີຂໍ້ມູນ!</h1>
          <p className="py-6">
            ຂໍອະໄພ ຂໍ້ມູນບໍ່ສາມາດຂຶ້ນສະແດງ
          </p>
          <button className="btn btn-primary">Back home</button>
        </div>
      </div>
    </div>
  );
};

export default DataNotFound;
