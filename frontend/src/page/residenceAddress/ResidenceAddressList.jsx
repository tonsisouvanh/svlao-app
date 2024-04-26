import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Spinner from "../../components/ui/Spinner";
import Unauthorized from "../public/Unauthorized";
import { AiFillPlusCircle } from "react-icons/ai";
import ResidenceAddressTable from "../../components/table/residenceAddress/ResidenceAddressTable";
import { listResidenceAddress } from "../../feature/globalData/ResidenceAddressSlice";
import PageHeading from "../../components/PageHeading";
import { useTranslation } from "react-i18next";

const ResidenceAddressList = () => {
  const [t] = useTranslation("global");
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.residenceAddress);
  const [editToggle, setEditToggle] = useState(false);
  useEffect(() => {
    dispatch(listResidenceAddress());
  }, [dispatch]);

  if (status.list === "loading") {
    return <Spinner />;
  }
  if (status.list === "failed") {
    return <div>Error loading residenceAddresss</div>;
  }
  return auth?.role === "admin" ? (
    <>
      <section className="">
        <div className="container mx-auto p-4">
          {editToggle ? null : <PageHeading title="ຂໍ້ມູນທີ່ຢູ່ປັດຈຸບັນ" />}
          <div className="">
            {editToggle ? null : (
              <>
                <div className="mb-10 flex w-full items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="">
                      <Link
                        to={
                          auth.role !== "admin"
                            ? "#"
                            : "/manage-others-data/residence-address-list/add"
                        }
                      >
                        <button
                          className={`tooltipp btn btn-primary font-notosanslao text-white ${
                            auth.role !== "admin" && "btn-disabled"
                          }`}
                        >
                          {t("AddButton")}
                          <AiFillPlusCircle size={20} />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <ResidenceAddressTable
            editToggle={editToggle}
            setEditToggle={setEditToggle}
          />
        </div>
      </section>
    </>
  ) : (
    <Unauthorized />
  );
};

export default ResidenceAddressList;
