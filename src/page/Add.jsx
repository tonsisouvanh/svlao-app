import { useState } from "react";

const AddStudent = () => {
  const [studentInput, setStudentInput] = useState({
    namelao: "",
    nameEnglist: "",
    gender: "",
    major: "",
    img: "",
    age: "",
    address: "",
    school: "",
    degree: "",
    level: "",
    email: "",
    phoneLao: "",
    phoneViet: "",
    province: "",
    subject: "",
    startStop: "",
    sacolaship: "",
    sacolashipLao: "",
    sacolashipVN: "",
    sacolashipSchool: "",
    linkFB: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to save student data here, such as API calls or state management
    console.log("Student Data:", studentInput);
    // You can reset the form after submission if needed
    setStudentInput({
      namelao: "",
      nameEnglist: "",
      gender: "",
      major: "",
      img: "",
      age: "",
      address: "",
      school: "",
      degree: "",
      level: "",
      email: "",
      phoneLao: "",
      phoneViet: "",
      province: "",
      subject: "",
      startStop: "",
      sacolaship: "",
      sacolashipLao: "",
      sacolashipVN: "",
      sacolashipSchool: "",
      linkFB: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Add Student</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Name (Lao):
              </label>
              <input
                type="text"
                name="namelao"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter name in Lao"
                value={studentInput.namelao}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Name (English):
              </label>
              <input
                type="text"
                name="nameEnglist"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter name in English"
                value={studentInput.nameEnglist}
                onChange={handleChange}
                required
              />
            </div>
            {/* Add more input fields for other student information */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
