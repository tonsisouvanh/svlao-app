import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase"; // Import your Firebase auth instance

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      // Create a new user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Set custom claims for the user's role
      await auth.setCustomUserClaims(user.uid, { role });

      // Store user data
      const authData = {
        email: user.email || "",
        token: user.uid,
      };
      sessionStorage.setItem("user", JSON.stringify(authData));
      return authData;
    } catch (error) {
      // toast.error("Error during registration.");
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

// Define a new async thunk for logging out
// export const signOutUser = createAsyncThunk(
//   "auth/signOut",
//   async (_, { rejectWithValue }) => {
//     try {
//       await signOut(auth);
//       sessionStorage.removeItem("user");
//       return null;
//     } catch (error: any) {
//       const errorMessage = error.message;
//       return rejectWithValue(errorMessage.toString() as string);
//     }
//   },
// );

// export const signIn = createAsyncThunk<
//   Auth | null,
//   { email: string; password: string },
//   { rejectValue: string }
// >("auth/signIn", async ({ email, password }, { rejectWithValue }) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password,
//     );
//     const user = userCredential.user;
//     console.log(user)
//     const authData: Auth = {
//       email: user.email || "",
//       token: user.uid,
//     };
//     sessionStorage.setItem("user", JSON.stringify(authData));
//     return authData;
//   } catch (error: any) {
//     toast.error("Email or password incorrect!");
//     const errorMessage = error.message;
//     return rejectWithValue(errorMessage.toString());
//   }
// });

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
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.payload || "An error occurred during sign-in.";
      });
    // // sign in
    // .addCase(signIn.pending, (state) => {
    //   state.status = "loading";
    // })
    // .addCase(signIn.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   state.user = action.payload;
    //   state.error = null;
    // })
    // .addCase(signIn.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.user = null;
    //   state.error = action.payload || "An error occurred during sign-in.";
    // })
    // // sign out
    // .addCase(signOutUser.pending, (state) => {
    //   state.status = "loading";
    // })
    // .addCase(signOutUser.fulfilled, (state) => {
    //   state.status = "idle";
    //   state.user = null; // Set the user to null to indicate that they are logged out
    //   state.error = null;
    // })
    // .addCase(signOutUser.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.user = null;
    //   state.error = action.payload = "An error occurred during sign-in.";
    // });
  },
});

export default authSlice.reducer;
