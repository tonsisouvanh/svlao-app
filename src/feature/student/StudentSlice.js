import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

// Function to serialize Firebase Timestamp to JavaScript Date
const serializeTimestamp = (timestamp) => {
  const date = timestamp.toDate();
  return date.toISOString();
};

// export const addStudent = createAsyncThunk<Student, Omit<Student, "id">>(
//   "students/addStudent",
//   async (newStudent) => {
//     try {
//       const currentDate = new Date();

//       // Add the new student to the Firestore collection
//       const docRef = await addDoc(collection(db, "students"), {
//         ...newStudent,
//         createdDate: currentDate,
//       });
//       return {
//         id: docRef.id,
//         ...newStudent,
//       };
//     } catch (error) {
//       throw new Error("An error occurred while adding the student.");
//     }
//   },
// );
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
        if (studentData.bod) {
          studentData.bod = serializeTimestamp(studentData.bod);
        }
        return {
          id: doc.id,
          ...studentData,
        };
      });
      return students;
    } catch (error) {
      console.log(error);
    }
  },
);

// for student
export const fetchSingleStudent = createAsyncThunk(
  "students/fetchSingleStudent",
  async () => {
    const user = auth.currentUser;
    try {
      // Build a reference to the document by specifying the collection and the document ID
      const documentRef = doc(db, "students", user && user.uid);
      if (!documentRef) {
        console.log(new Error("An error occurred while fetching products."));
        throw new Error("An error occurred while fetching products.");
      }
      // Fetch the document data
      const documentSnapshot = await getDoc(documentRef);

      // Check if the document exists
      if (documentSnapshot.exists()) {
        // Access the document data
        const documentData = documentSnapshot.data();

        console.log("fect one stu", documentData);

        return documentData;
      } else {
        console.log("Document does not exist.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      throw error; // You can handle the error as needed
    }
  },
);

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    student: {},
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
      });
    // // ADD
    // .addCase(addStudent.pending, (state) => {
    //   state.status = "loading";
    // })
    // .addCase(addStudent.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   state.data.push(action.payload);
    // })
    // .addCase(addStudent.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message || "";
    // })
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
