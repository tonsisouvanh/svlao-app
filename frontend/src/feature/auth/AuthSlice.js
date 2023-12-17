import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase"; // Import your Firebase auth instance
import toast from "react-hot-toast";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

//** DONE
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (inputUser, rejectWithValue) => {
    const { email, password, username, role } = inputUser;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      let userData = {};
      if (user && user !== null) {
        userData = {
          email: user.email,
          role: role,
        };

        await setDoc(doc(db, "users", user.uid), {
          ...userData,
          userStatus: "pending",
        });

        const docRef = await addDoc(collection(db, "students"), {
          userId: user.uid,
          role: role,
        });

        await signOut(auth);
        toast.success("sign up succeed");
      }
      return { ...userData };
    } catch (error) {
      toast.error("Authentication error: " + error.message);
      return rejectWithValue("Authentication error: " + error.message);
    }
  },
);

// Define an async thunk for user sign-in
export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      let userData = { ...userDoc.data() };

      await setPersistence(auth, browserSessionPersistence);

      if (userData.role === "student") {
        const studentsCollectionRef = collection(db, "students");
        const querySnapshot = await getDocs(
          query(studentsCollectionRef, where("userId", "==", user.uid)),
        );

        if (!querySnapshot.empty) {
          const studentDocument = querySnapshot.docs[0];

          const studentData = {
            documentId: studentDocument.id,
            ...studentDocument.data(),
          };
          userData = { ...userData, userStatus: studentData.userStatus };

          sessionStorage.setItem("userData", JSON.stringify(userData));
        } else {
          // toast.warning(404, "Student not found");
        }
      } else sessionStorage.setItem("userData", JSON.stringify(userData));

      toast.success("Signed in successfully");
      return userData;
    } catch (error) {
      if (error && error.code === "auth/invalid-login-credentials") {
        toast.error("Email or password incorrect!");
        return rejectWithValue("This email is already in use.");
      } else {
        toast.error("Authentication error: " + error.message);
        return rejectWithValue("Authentication error: " + error.message);
      }
    }
  },
);

export const signOutUser = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);

      sessionStorage.clear();

      return null;
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

const authSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    user: {},
    status: "idle" | "loading" | "succeeded" | "failed",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // sign up
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state) => {
        state.status = "succeeded";
        // state.user = action.payload;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.payload || "An error occurred during sign-in.";
      })
      // sign in
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.payload || "An error occurred during sign-in.";
      })
      // sign out
      .addCase(signOutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.status = "idle";
        state.user = null; // Set the user to null to indicate that they are logged out
        state.error = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.payload || "An error occurred during sign-in.";
      });
  },
});

export default authSlice.reducer;
