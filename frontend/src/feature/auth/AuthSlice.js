import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { formatDate } from "../../utils/utils";
axios.defaults.baseURL = "http://localhost:5000";

const initialState = {
  auth: sessionStorage.getItem("authInfo")
    ? JSON.parse(sessionStorage.getItem("authInfo") || "")
    : null,
  status: "idle" | "loading" | "succeeded" | "failed",
  error: "",
};

//** DONE
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (inputAuth, rejectWithValue) => {
    const { email, password, authname, role } = inputAuth;
    try {
      // const authCredential = await createAuthWithEmailAndPassword(
      //   auth,
      //   email,
      //   password,
      // );
      // const auth = authCredential.auth;
      // let authData = {};
      // if (auth && auth !== null) {
      //   authData = {
      //     email: auth.email,
      //     role: role,
      //   };

      //   await setDoc(doc(db, "auths", auth.uid), {
      //     ...authData,
      //     authStatus: "pending",
      //   });

      //   const docRef = await addDoc(collection(db, "students"), {
      //     authId: auth.uid,
      //     role: role,
      //   });

      //   await signOut(auth);
      // }
      return { ...inputAuth };
    } catch (error) {
      return rejectWithValue("Authentication error: " + error.message);
    }
  },
);

// Define an async thunk for auth sign-in
// export const signIn = createAsyncThunk(
//   "auth/signIn",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const authCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password,
//       );
//       const auth = authCredential.auth;
//       const authDoc = await getDoc(doc(db, "auths", auth.uid));
//       let authData = { ...authDoc.data() };

//       await setPersistence(auth, browserSessionPersistence);

//       if (authData.role === "student") {
//         const studentsCollectionRef = collection(db, "students");
//         const querySnapshot = await getDocs(
//           query(studentsCollectionRef, where("authId", "==", auth.uid)),
//         );

//         if (!querySnapshot.empty) {
//           const studentDocument = querySnapshot.docs[0];

//           const studentData = {
//             documentId: studentDocument.id,
//             ...studentDocument.data(),
//           };
//           authData = { ...authData, authStatus: studentData.authStatus };

//           sessionStorage.setItem("authData", JSON.stringify(authData));
//         } else {
//           // toast.warning(404, "Student not found");
//         }
//       } else sessionStorage.setItem("authData", JSON.stringify(authData));

//       toast.success("Signed in successfully");
//       return authData;
//     } catch (error) {
//       if (error && error.code === "auth/invalid-login-credentials") {
//         toast.error("Email or password incorrect!");
//         return rejectWithValue("This email is already in use.");
//       } else {
//         toast.error("Authentication error: " + error.message);
//         return rejectWithValue("Authentication error: " + error.message);
//       }
//     }
//   },
// );

// Login user
export const signIn = createAsyncThunk(
  "auth/signin",
  async (userData, thunkAPI) => {
    try {
      const { emailAddress, password } = userData;

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/login",
        { emailAddress, password },
        config,
      );

      const fixedData = {
        ...data,
        visa: {
          from: formatDate(data.visa.from),
          to: formatDate(data.visa.to),
        },
        dob: formatDate(data.dob),
        passport: {
          ...data.passport,
          expired: formatDate(data.passport.expired),
        },
      };

      sessionStorage.setItem("authInfo", JSON.stringify(fixedData));
      return fixedData;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const signOut = createAsyncThunk(
  "auth/signout",
  async (_, { rejectWithValue }) => {
    try {
      sessionStorage.clear();
      return null;
    } catch (error) {
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/users/profile",
        {
          ...userData,
          university: {
            ...userData.university,
            universityId: userData.university.universityId?._id,
          },
        },
        config,
      );
      sessionStorage.setItem("authInfo", JSON.stringify(userData));
      return userData;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // sign up
      // .addCase(signUp.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(signUp.fulfilled, (state) => {
      //   state.status = "succeeded";
      //   // state.auth = action.payload;
      //   state.error = null;
      // })
      // .addCase(signUp.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.auth = null;
      //   state.error = action.payload || "An error occurred during sign-in.";
      // })
      // sign in
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        // console.log("signin.fullfil", action.payload);
        state.status = "succeeded";
        state.auth = action.payload;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        // console.log("signin.reject", action.payload);
        state.status = "failed";
        state.auth = null;
        state.error = action.payload;
      })
      // update user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        // console.log("signin.fullfil", action.payload);
        state.status = "succeeded";
        state.auth = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        // console.log("signin.reject", action.payload);
        state.status = "failed";
        state.auth = null;
        state.error = action.payload;
      })
      // sign out
      .addCase(signOut.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOut.fulfilled, (state) => {
        state.status = "idle";
        state.auth = null;
      });
  },
});

export const { reset: authReset } = authSlice.actions;
export default authSlice.reducer;
