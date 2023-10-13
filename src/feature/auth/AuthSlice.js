import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../firebase"; // Import your Firebase auth instance
import toast from "react-hot-toast";
import { getDoc } from "firebase/firestore";

// export const signUp = createAsyncThunk(
//   "auth/signUp",
//   async (
//     { email, password, firstname, lastname, role = "student" },
//     { rejectWithValue },
//   ) => {
//     try {
//       // Step 1: Create a new user in Firebase Authentication
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password,
//       );
//       const user = userCredential.user;

//       // Step 2: Create a user document in the "users" collection in Firestore
//       const customDocumentId = user.uid;
//       const userRef = doc(db, "users", customDocumentId);

//       const docData = {
//         userId: user.uid,
//         email: user.email,
//         firstname,
//         lastname,
//         role: role,
//       };

//       try {
//         // Use updateDoc to atomically create or update the document
//         await updateDoc(userRef, docData);

//         // If the document creation is successful, return the user data
//         return {
//           userId: user.uid,
//           email: docData.email,
//           firstname: docData.firstname,
//           lastname: docData.lastname,
//           role: docData.role,
//         };
//       } catch (error) {
//         // Handle Firestore document creation errors
//         toast.error("Error creating user document: " + error.message);
//         return rejectWithValue(
//           "Error creating user document: " + error.message,
//         );
//       }
//     } catch (error) {
//       // Handle Firebase Authentication errors
//       if (error.code === "auth/email-already-in-use") {
//         toast.error("This email is already in use.");
//         return rejectWithValue("This email is already in use.");
//       } else {
//         toast.error("Authentication error: " + error.message);
//         return rejectWithValue("Authentication error: " + error.message);
//       }
//     }
//   },
// );

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

      // Step 2: Fetch additional user data if needed (e.g., user role)
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();
      console.log(userData);
      // Return user data to update the Redux state
      sessionStorage.setItem("user", JSON.stringify(userData));
      toast.success("Signed in successfully");

      return { ...userData };
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  },
);

// Define a new async thunk for logging out
export const signOutUser = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      // Sign out the user using Firebase Authentication
      await signOut(auth);
      sessionStorage.removeItem("user");
      return null; // The user is successfully signed out
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
    user: {},
    status: "idle" | "loading" | "succeeded" | "failed",
    error: "",
    role: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // sign
      // .addCase(signUp.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(signUp.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.user = action.payload;
      //   state.error = null;
      // })
      // .addCase(signUp.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.user = null;
      //   state.error = action.payload || "An error occurred during sign-in.";
      // })
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
