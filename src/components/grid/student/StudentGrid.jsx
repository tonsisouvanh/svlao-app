import { useState } from "react";
import EditStudent from "../../../page/student/EditStudent";
import StudentCard from "../../card/StudentCard";

const StudentGrid = ({ editToggle, setEditToggle, studentsProps }) => {
  const [editingStudent, setEditingStudent] = useState(null);

  return (
    <>
      {editToggle ? (
        <EditStudent
          setEditToggle={setEditToggle}
          editingStudent={editingStudent}
        />
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-4 font-notosanslao sm:grid-cols-2 md:grid-cols-3">
            {studentsProps &&
              studentsProps.map((ele) => (
                <div key={ele.id}>
                  <StudentCard
                    editToggle={editToggle}
                    setEditToggle={setEditToggle}
                    setEditingStudent={setEditingStudent}
                    student={ele}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default StudentGrid;
