import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { replaceImage } from "../../utils/utils";
import images from "../../assets/img";
const UserList = () => {
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.user);

  const sortedUsers =
    users && users.length > 0
      ? [...users]
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .filter((user) => user.userStatus !== "active")
      : [];
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return (
          <p className="badge badge-md whitespace-nowrap bg-green-500/50">
            {status}
          </p>
        );
      case "pending":
        return (
          <p className="badge badge-md whitespace-nowrap bg-yellow-500/50">
            {status}
          </p>
        ); // Yellow for pending
      case "inactive":
        return (
          <p className="badge badge-md whitespace-nowrap bg-gray-400/50">
            {status}
          </p>
        ); // Gray for inactive
      default:
        return <p className="whitespace-nowrap">{status}</p>; // Default color
    }
  };
  return (
    <div className="w-full overflow-hidden rounded-xl border bg-white shadow">
      <table className="min-w-full border-collapse border-spacing-x-2 border-spacing-y-2">
        <thead className="hidden border-b lg:table-header-group">
          <tr className="">
            <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3"></td>
            <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
              User
            </td>
            <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
              Status
            </td>
          </tr>
        </thead>
        <tbody className="bg-white lg:border-gray-300">
          {users && users.length > 0 ? (
            <>
              {sortedUsers?.slice(0, 10).map((user) => (
                <tr
                  onClick={() =>
                    navigate(`/dashboard/student-list/student/${user._id}`)
                  }
                  key={user._id}
                  className="cursor-pointer hover:bg-slate-100"
                >
                  <td className="py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img
                          src={user.profileImg}
                          alt="avatar"
                          onError={(error) =>
                            replaceImage(error, images.profile)
                          }
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                    {user.fullname.laoName}
                  </td>
                  <td className="py-4 text-left text-xs text-gray-600 sm:px-3">
                    {getStatusColor(user.userStatus)}
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr className="m-4"></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
