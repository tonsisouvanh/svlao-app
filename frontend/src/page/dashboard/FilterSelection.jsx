import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredUsers } from "../../feature/user/UserSlice";

const FilterSelection = () => {
  const { auth } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { universities } = useSelector((state) => state.university);
  const { residenceAddresses } = useSelector((state) => state.residenceAddress);

  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedResidenceAddress, setSelectedResidenceAddress] = useState("");
  const [filterChoice, setFilterChoice] = useState("all");
  const getFilters = useMemo(() => {
    if (filterChoice === "combine") {
      return {
        "university.shortcut": selectedUniversity,
        "residenceAddress.location": selectedResidenceAddress,
      };
    } else if (filterChoice === "university") {
      return { "university.shortcut": selectedUniversity };
    } else if (filterChoice === "residence") {
      return { "residenceAddress.location": selectedResidenceAddress };
    } else {
      return {};
    }
  }, [filterChoice, selectedResidenceAddress, selectedUniversity]);

  useEffect(() => {
    if (auth?.role === "admin") {
      dispatch(getFilteredUsers(getFilters));
    }
  }, [auth?.role, dispatch, getFilters]);

  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex items-center gap-4">
        <label className="form-control max-w-fit">
          <div className="label">
            <span className="label-text">Filter by:</span>
          </div>
          <select
            onChange={(e) => setFilterChoice(e.target.value)}
            className="select select-primary"
            value={filterChoice}
            disabled={users && users.length > 0 ? false : true}
          >
            <option value="all">All</option>
            <option value="combine">University & Dormitory</option>
            <option value="university">University</option>
            <option value="residence">Dormitory</option>
          </select>
        </label>
      </div>
      <div className="flex flex-row items-center gap-4">
        <select
          onChange={(e) => setSelectedUniversity(e.target.value)}
          className="select select-primary w-full max-w-xs"
          value={selectedUniversity || ""}
          disabled={
            filterChoice === "residence" || filterChoice === "all"
              ? true
              : false
          }
        >
          <option disabled value="">
            ເລືອກໂຮງຮຽນ
          </option>
          {universities.map((i) => (
            <option key={i._id} value={i.shortcut}>
              {i.shortcut}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setSelectedResidenceAddress(e.target.value)}
          className="select select-primary w-full max-w-xs"
          value={selectedResidenceAddress || ""}
          disabled={
            filterChoice === "university" || filterChoice === "all"
              ? true
              : false
          }
        >
          <option disabled value="">
            ເລືອກຫໍພັກ
          </option>
          {residenceAddresses.map((i) => (
            <option key={i._id} value={i.location}>
              {i.location}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSelection;
