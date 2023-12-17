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
export const addUniversity = createAsyncThunk(
  "universities/addUniversity",
  async (newStudent, { rejectWithValue }) => {
    try {
      const currentDate = new Date();
      const studentsCollection = collection(db, "universities");

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
        type: "addUniversityError",
      };
      console.error(error);
      toast.error(errorMessage);
      return rejectWithValue(customError);
    }
  },
);

// ADMIN UPDATE
export const updateUniversity = createAsyncThunk(
  "universities/updateUniversity",
  async (updatedStudent, { rejectWithValue }) => {
    const currentDate = new Date();

    try {
      // Construct the Firestore document reference for the product
      const studentRef = doc(db, "universities", updatedStudent.id || "");

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

export const deleteUniversity = createAsyncThunk(
  "universities/deleteUniversity",
  async (universityId, { rejectWithValue }) => {
    try {
      //Construct the Firestore document reference for the student
      const universityRef = doc(db, "universities", universityId);
      //Delete the student document from Firestore
      await deleteDoc(universityRef);
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const fetchUniversities = createAsyncThunk(
  "universities/fetchUniversities",
  async () => {
    const collectionRef = collection(db, "university");
    // const sortedQuery = query(collectionRef, orderBy("laoName", "asc"));
    try {
      const querySnapshot = await getDocs(collectionRef);
      if (!querySnapshot) {
        console.log(new Error("An error occurred while fetching products."));
        throw new Error("An error occurred while fetching products.");
      }
      const data = querySnapshot.docs.map((doc) => {
        const universityData = doc.data();
        return {
          id: doc.id,
          ...universityData,
        };
      });
      return data;
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      throw error;
    }
  },
);

const UniversitySlice = createSlice({
  name: "universities",
  initialState: {
    universities: [],
    status: "idle" | "loading" | "succeeded" | "failed",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUniversities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUniversities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.universities = action.payload;
      })
      .addCase(fetchUniversities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      // ADD
      .addCase(addUniversity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUniversity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.universities.push(action.payload);
      })
      .addCase(addUniversity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      // UPDATE ADMIN
      .addCase(updateUniversity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUniversity.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedStudent = action.payload;
        const studentIndex = state.universities.findIndex(
          (student) => student.id === updatedStudent.id,
        );
        if (studentIndex !== -1) {
          state.universities[studentIndex] = updatedStudent;
        }
      })
      .addCase(updateUniversity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      // // DELETE
      .addCase(deleteUniversity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUniversity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (student) => student.id !== action.payload,
        );
      })
      .addCase(deleteUniversity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      });
  },
});

export default UniversitySlice.reducer;
