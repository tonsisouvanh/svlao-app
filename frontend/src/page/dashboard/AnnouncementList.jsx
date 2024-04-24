import { useDispatch, useSelector } from "react-redux";
import { listAnnouncements } from "../../feature/announcement/AnnouncementSlice";
import { useEffect } from "react";
import { formatDateDDMMYYYY } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const AnnouncementList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { announcements } = useSelector((state) => state.announcement);

  const sortedAnnouncements =
    announcements && announcements.length > 0
      ? [...announcements].sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
        )
      : [];
  useEffect(() => {
    dispatch(listAnnouncements({}));
  }, [dispatch]);

  return (
    <>
      <div className="w-full overflow-hidden rounded-xl border bg-white shadow shadow">
        <table className="min-w-full border-collapse border-spacing-x-2 border-spacing-y-2">
          <thead className="hidden border-b lg:table-header-group">
            <tr className="">
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                Announcements
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                Date
              </td>
            </tr>
          </thead>

          <tbody className="bg-white lg:border-gray-300">
            {sortedAnnouncements?.map((announcement) => (
              <tr
                onClick={() =>
                  navigate(
                    `/manage-others-data/announcement-list/${announcement._id}`,
                  )
                }
                key={announcement._id}
                className="cursor-pointer hover:bg-slate-100"
              >
                <td className="py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                  {announcement.title}
                </td>
                <td className="py-4 text-left text-xs text-gray-600 sm:px-3">
                  <p className="whitespace-nowrap">
                    {formatDateDDMMYYYY(announcement.timestamp)}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AnnouncementList;
