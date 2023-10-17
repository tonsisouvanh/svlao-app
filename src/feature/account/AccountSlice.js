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
import toast from "react-hot-toast";
import { auth, db } from "../../firebase";

// Function to serialize Firebase Timestamp to JavaScript Date
const serializeTimestamp = (timestamp) => {
  const date = timestamp.toDate();
  return date.toISOString();
};

export const addAccount = createAsyncThunk(
  "accounts/addAccount",
  async (newAccount, rejectWithValue) => {
    try {
      const accountData = {
        email: newAccount.email,
        firstname: newAccount.firstname,
        lastname: newAccount.lastname,
        role: newAccount.role,
      };

      await setDoc(doc(db, "accounts", newAccount.id), {
        ...accountData,
      });
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

// export const deleteAccount = createAsyncThunk<void, string>(
//   "accounts/deleteAccount",
//   async (accountId) => {
//     try {
//       // Construct the Firestore document reference for the account
//       const accountRef = doc(db, "accounts", accountId);

//       // Delete the account document from Firestore
//       await deleteDoc(accountRef);
//     } catch (error) {
//       throw new Error("An error occurred while deleting the account.");
//     }
//   },
// );

// export const updateAccount = createAsyncThunk<Account, Account>(
//   "accounts/updateAccount",
//   async (updatedAccount) => {
//     const currentDate = new Date();

//     try {
//       // Construct the Firestore document reference for the account
//       const accountRef = doc(db, "accounts", updatedAccount.id || "");

//       // Update the account document in Firestore
//       await setDoc(accountRef, { ...updatedAccount, createdDate: currentDate });

//       return updatedAccount;
//     } catch (error) {
//       throw new Error("An error occurred while updating the account.");
//     }
//   },
// );

export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAccounts",
  async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "accounts"));

      if (!querySnapshot) {
        console.log(new Error("An error occurred while fetching products."));
        throw new Error("An error occurred while fetching products.");
      }

      const accounts = querySnapshot.docs.map((doc) => {
        const accountData = doc.data();
        if (accountData.createdDate) {
          accountData.createdDate = serializeTimestamp(accountData.createdDate);
        }
        return {
          id: doc.id,
          ...accountData,
        };
      });
      return accounts;
    } catch (error) {
      console.log(error);
    }
  },
);

// for account
export const fetchSingleAccount = createAsyncThunk(
  "accounts/fetchSingleAccount",
  async () => {
    const user = auth.currentUser;
    try {
      // Build a reference to the document by specifying the collection and the document ID
      const documentRef = doc(db, "accounts", user && user.uid);
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

const accountSlice = createSlice({
  name: "accounts",
  initialState: {
    accounts: [],
    account: {},
    status: "idle" | "loading" | "succeeded" | "failed",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   .addCase(fetchAccounts.pending, (state) => {
      //     state.status = "loading";
      //   })
      //   .addCase(fetchAccounts.fulfilled, (state, action) => {
      //     state.status = "succeeded";
      //     state.accounts = action.payload;
      //   })
      //   .addCase(fetchAccounts.rejected, (state, action) => {
      //     state.status = "failed";
      //     state.error = action.error.message || "";
      //   })
      //   //single account
      //   .addCase(fetchSingleAccount.pending, (state) => {
      //     state.status = "loading";
      //   })
      //   .addCase(fetchSingleAccount.fulfilled, (state, action) => {
      //     state.status = "succeeded";
      //     state.account = action.payload;
      //   })
      //   .addCase(fetchSingleAccount.rejected, (state, action) => {
      //     state.status = "failed";
      //     state.error = action.error.message || "";
      //   })
      // ADD
      .addCase(addAccount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAccount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accounts.push(action.payload);
      })
      .addCase(addAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      });
    // // DELETE
    // .addCase(deleteAccount.pending, (state) => {
    //   state.status = "loading";
    // })
    // .addCase(deleteAccount.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   // Remove the deleted account from the state
    //   state.data = state.data.filter(
    //     (account) => account.id !== action.meta.arg,
    //   );
    // })
    // .addCase(deleteAccount.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message || "";
    // })
    // // UPDATE
    // .addCase(updateAccount.pending, (state) => {
    //   state.status = "loading";
    // })
    // .addCase(updateAccount.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   // Find and update the account in the state
    //   const updatedAccount = action.payload;
    //   const accountIndex = state.data.findIndex(
    //     (account) => account.id === updatedAccount.id,
    //   );
    //   if (accountIndex !== -1) {
    //     state.data[accountIndex] = updatedAccount;
    //   }
    // })
    // .addCase(updateAccount.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message || "";
    // });
  },
});

export default accountSlice.reducer;
