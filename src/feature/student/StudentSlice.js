import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { initialStudentInput } from "../../data/initialState";
// Function to serialize Firebase Timestamp to JavaScript Date
const serializeTimestamp = (timestamp) => {
  const date = timestamp.toDate();
  return date.toISOString();
};

// ADMIN ADD STUDENT
export const adminAddStudent = createAsyncThunk(
  "students/adminAddStudent",
  async (newStudent, { rejectWithValue }) => {
    try {
      const currentDate = new Date();
      const studentsCollection = collection(db, "students");

      await addDoc(studentsCollection, {
        ...newStudent,
        role: "student",
        userId: "pending",
        createdDate: currentDate,
      });
      toast.success("Student added successfully");
      return {
        ...newStudent,
      };
    } catch (error) {
      const errorMessage = error.message;
      const customError = {
        message: errorMessage,
        type: "AddStudentError",
      };
      console.error(error);
      toast.error(errorMessage);
      return rejectWithValue(customError);
    }
  },
);

// STUDENT ADD
export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (newStudent, { rejectWithValue }) => {
    try {
      // Sign user up in firebase
      const email = newStudent.email;
      const password = newStudent.password;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      if (user && user !== null) {
        const accountData = {
          email: user.email || "",
          fullname: newStudent.fullname.nickName || "",
          role: "student" || "",
        };

        // add data to accounts
        await setDoc(doc(db, "accounts", user.uid), {
          ...accountData,
        });
        await signOut(auth);
        sessionStorage.removeItem("_role_");

        // Add student data to firebase
        const currentDate = new Date();
        const studentsCollection = collection(db, "students");
        const docRef = await addDoc(studentsCollection, {
          role: "student",
          ...accountData,
          accountId: user.uid,
          createdDate: currentDate,
        });
        return {
          id: user.id,
          ...newStudent,
        };
      }
      return {};
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

// STUDENT UPDATE
export const adminUpdateStudent = createAsyncThunk(
  "students/adminUpdateStudent",
  async (updatedStudent, { rejectWithValue }) => {
    console.log(updatedStudent);
    const currentDate = new Date();

    try {
      // Construct the Firestore document reference for the product
      const studentRef = doc(db, "students", updatedStudent.id || "");

      // Update the product document in Firestore
      await setDoc(studentRef, { ...updatedStudent, createdDate: currentDate });

      toast.success("Update student successfully");
      return updatedStudent;
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);
export const studentUpdateStudent = createAsyncThunk(
  "students/studentUpdateStudent",
  async (updatedStudent, { rejectWithValue }) => {
    const currentDate = new Date();

    try {
      const studentRef = doc(db, "students", updatedStudent.id || "");

      await setDoc(studentRef, { ...updatedStudent, createdDate: currentDate });

      toast.success("Update student successfully");
      return updatedStudent;
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

// export const deleteStudent = createAsyncThunk<void, string>(
//   "students/deleteStudent",
//   async (studentId) => {
//     try {
//       // Construct the Firestore document reference for the student
//       const studentRef = doc(db, "students", studentId);

//       // Delete the student document from Firestore
//       await deleteDoc(studentRef);
//     } catch (error) {
//       throw new Error("An error occurred while deleting the student.");
//     }
//   },
// );

// export const updateStudent = createAsyncThunk<Student, Student>(
//   "students/updateStudent",
//   async (updatedStudent) => {
//     const currentDate = new Date();

//     try {
//       // Construct the Firestore document reference for the student
//       const studentRef = doc(db, "students", updatedStudent.id || "");

//       // Update the student document in Firestore
//       await setDoc(studentRef, { ...updatedStudent, createdDate: currentDate });

//       return updatedStudent;
//     } catch (error) {
//       throw new Error("An error occurred while updating the student.");
//     }
//   },
// );
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));

      if (!querySnapshot) {
        console.log(new Error("An error occurred while fetching products."));
        throw new Error("An error occurred while fetching products.");
      }

      const students = querySnapshot.docs.map((doc) => {
        const studentData = doc.data();
        if (studentData.createdDate) {
          studentData.createdDate = serializeTimestamp(studentData.createdDate);
        }
        return {
          id: doc.id,
          ...studentData,
        };
      });
      return students;
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      throw error;
    }
  },
);

// for student
export const fetchSingleStudent = createAsyncThunk(
  "students/fetchSingleStudent",
  async (userId) => {
    try {
      const q = query(
        collection(db, "students"),
        where("userId", "==", userId),
      );

      const querySnapshot = await getDocs(q);
      const studentData = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.createdDate) {
          data.createdDate = serializeTimestamp(data.createdDate);
        }
        studentData.push(data);
      });
      return studentData[0] || {};
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      throw error;
    }
  },
);
export const adminFetchSingleStudent = createAsyncThunk(
  "students/adminFetchSingleStudent",
  async (id) => {
    console.log(id);
    try {
      const docRef = doc(db, "students", id);
      const docSnap = await getDoc(docRef);
      let studentData = {};
      if (docSnap.exists()) {
        studentData = { ...docSnap.data(), id: docSnap.id };
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

      if (studentData.createdDate) {
        studentData.createdDate = serializeTimestamp(studentData.createdDate);
      }
      console.log(studentData);
      return studentData;
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      throw error;
    }
  },
);

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    student: initialStudentInput,
    status: "idle" | "loading" | "succeeded" | "failed",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      //single student
      .addCase(fetchSingleStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.student = action.payload;
      })
      .addCase(fetchSingleStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      //admin single student
      .addCase(adminFetchSingleStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(adminFetchSingleStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.student = action.payload;
      })
      .addCase(adminFetchSingleStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      // ADD
      .addCase(addStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students.push(action.payload);
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      // ADD ADMIN
      .addCase(adminAddStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(adminAddStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students.push(action.payload);
      })
      .addCase(adminAddStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      // UPDATE ADMIN
      .addCase(adminUpdateStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(adminUpdateStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedStudent = action.payload;
        const studentIndex = state.students.findIndex(
          (student) => student.id === updatedStudent.id,
        );
        if (studentIndex !== -1) {
          state.students[studentIndex] = updatedStudent;
        }
      })
      .addCase(adminUpdateStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      // STUDENT UPDATE
      .addCase(studentUpdateStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(studentUpdateStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.student = action.payload;
      })
      .addCase(studentUpdateStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      });
    // // DELETE
    // .addCase(deleteStudent.pending, (state) => {
    //   state.status = "loading";
    // })
    // .addCase(deleteStudent.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   // Remove the deleted student from the state
    //   state.data = state.data.filter(
    //     (student) => student.id !== action.meta.arg,
    //   );
    // })
    // .addCase(deleteStudent.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message || "";
    // })
    // // UPDATE
    // .addCase(updateStudent.pending, (state) => {
    //   state.status = "loading";
    // })
    // .addCase(updateStudent.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   // Find and update the student in the state
    //   const updatedStudent = action.payload;
    //   const studentIndex = state.data.findIndex(
    //     (student) => student.id === updatedStudent.id,
    //   );
    //   if (studentIndex !== -1) {
    //     state.data[studentIndex] = updatedStudent;
    //   }
    // })
    // .addCase(updateStudent.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message || "";
    // });
  },
});

export default studentSlice.reducer;
