import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../../firebase";

// ADMIN ADD STUDENT
export const addMajor = createAsyncThunk(
  "majors/addMajor",
  async (newStudent, { rejectWithValue }) => {
    try {
      const currentDate = new Date();
      const studentsCollection = collection(db, "majors");

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
        type: "addMajorError",
      };
      console.error(error);
      toast.error(errorMessage);
      return rejectWithValue(customError);
    }
  },
);

// ADMIN UPDATE
export const updateMajor = createAsyncThunk(
  "majors/updateMajor",
  async (updatedStudent, { rejectWithValue }) => {
    const currentDate = new Date();

    try {
      // Construct the Firestore document reference for the product
      const studentRef = doc(db, "majors", updatedStudent.id || "");

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

export const deleteMajor = createAsyncThunk(
  "majors/deleteMajor",
  async (majorId, { rejectWithValue }) => {
    try {
      //Construct the Firestore document reference for the student
      const majorRef = doc(db, "majors", majorId);
      //Delete the student document from Firestore
      await deleteDoc(majorRef);
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const fetchMajors = createAsyncThunk("majors/fetchMajors", async () => {
  const collectionRef = collection(db, "majors");
  const sortedQuery = query(collectionRef, orderBy("laoMajor", "asc"));
  try {
    const querySnapshot = await getDocs(sortedQuery);
    if (!querySnapshot) {
      console.log(new Error("An error occurred while fetching products."));
      throw new Error("An error occurred while fetching products.");
    }
    const data = querySnapshot.docs.map((doc) => {
      const majorData = doc.data();
      return {
        id: doc.id,
        ...majorData,
      };
    });
    return data;
  } catch (error) {
    const errorMessage = error.message;
    toast.error(errorMessage);
    throw error;
  }
});

const MajorSlice = createSlice({
  name: "majors",
  initialState: {
    majors: [],
    status: "idle" | "loading" | "succeeded" | "failed",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMajors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMajors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.majors = action.payload;
      })
      .addCase(fetchMajors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      // ADD
      .addCase(addMajor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMajor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.majors.push(action.payload);
      })
      .addCase(addMajor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      // UPDATE ADMIN
      .addCase(updateMajor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateMajor.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedStudent = action.payload;
        const studentIndex = state.majors.findIndex(
          (student) => student.id === updatedStudent.id,
        );
        if (studentIndex !== -1) {
          state.majors[studentIndex] = updatedStudent;
        }
      })
      .addCase(updateMajor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      // // DELETE
      .addCase(deleteMajor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMajor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (student) => student.id !== action.payload,
        );
      })
      .addCase(deleteMajor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      });
  },
});

export default MajorSlice.reducer;
