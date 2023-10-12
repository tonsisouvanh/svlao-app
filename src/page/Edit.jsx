import { Link } from "react-router-dom";

const Edit = () => {
  return (
    <div className="container font-notosanslao mx-auto mt-24">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>School</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <div className="font-bold flex justify-center items-center">1</div>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src="https://res.cloudinary.com/dlux9nebf/image/upload/v1696842264/SVlaoProject/BounmyDola.jpg" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">BounmyDola</div>
                  <div className="text-sm opacity-50">15/21/22</div>
                </div>
              </div>
            </td>
            <td>
              CNTT
              <br />
            </td>
            <td>Purple</td>
            <div className="flex gap-3 justify-center">
              <Link to="/input">
                <button className="btn btn-active btn-primary">
                  ແປງຂໍ້ມູນ
                </button>
              </Link>
              <button className="btn btn-active btn-secondary">
                ລົບຂໍ້ມູນ
              </button>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Edit;
