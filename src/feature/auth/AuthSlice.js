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
          username: username,
          role: role,
        };

        await setDoc(doc(db, "users", user.uid), {
          ...userData,
          updateRequired: true,
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
      // Step 1: Sign in the user using Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      // Step 2: Fetch additional user data (e.g., user role)
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      // Set session persistence
      await setPersistence(auth, browserSessionPersistence);

      // Step 3: Fetch student's document data
      const studentsCollectionRef = collection(db, "students");
      // const querySnapshot = await getDocs(
      //   query(studentsCollectionRef, where("userId", "==", user.uid)),
      // );

      // if (!querySnapshot.empty) {
      //   // Assume there's only one matching document
      //   const studentDocument = querySnapshot.docs[0];

      //   // Get the student's data from the document
      //   const studentData = {
      //     documentId: studentDocument.id,
      //     ...studentDocument.data(),
      //   };

      //   // Step 4: Store student data in session storage
      //   sessionStorage.setItem("studentData", JSON.stringify(studentData));
      // } else {
      //   // Handle the case where the student document wasn't found.
      // }

      // Step 5: Return the user data to update the Redux state
      sessionStorage.setItem("userData", JSON.stringify(userData));
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
