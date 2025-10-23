import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/* ============================================================
   🔐 LocalStorage Helpers
============================================================ */
const ACCESS_TOKEN_KEY = "accessToken";

export const saveAccessToken = (token) => {
  if (token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    return token;
  }
  return null;
};

const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);

/* ============================================================
   ⚙️ Initial State
============================================================ */
const initialState = {
  user: null,
  accessToken: getAccessToken(),
  loading: false,
  error: null,
  success: null,
  users: [],
};

/* ============================================================
   🚀 Async Thunks
============================================================ */

// Register User
export const register = createAsyncThunk("auth/register", async (credentials, thunkAPI) => {
  try {
    const { data } = await api.post("/auth/register", credentials);
    return data; // Expect: { message: "...", emailSent: true }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Registration failed");
  }
});

// Verify OTP
export const verifyOTP = createAsyncThunk("auth/verifyOTP", async ({ email, otp }, thunkAPI) => {
  try {
    const { data } = await api.post("/auth/verify-otp", { email, otp });
    return data; // Expect: { message: "...", verified: true }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "OTP verification failed");
  }
});

// Resend OTP
export const resendOTP = createAsyncThunk("auth/resendOTP", async ({ email }, thunkAPI) => {
  try {
    const { data } = await api.post("/auth/otp/resend", { email });
    return data; // Expect: { message: "OTP resent successfully" }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to resend OTP");
  }
});

// Login
export const loginUser = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    const { data } = await api.post("/auth/login", credentials);
    return data; // Expect: { user, accessToken, message }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

// Refresh Token
export const refreshAccessToken = createAsyncThunk("auth/refreshAccessToken", async (_, thunkAPI) => {
  try {
    const { data } = await api.post("/auth/refresh-token");
    return data;
  } catch (err) {
    removeAccessToken();
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Token refresh failed");
  }
});

// Get Current User
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const { data } = await api.get("/auth/me");
    return data;
  } catch (err) {
    removeAccessToken();
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch user");
  }
});

/* ============================================================
   🔑 Password and Profile Management
============================================================ */
export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (payload, thunkAPI) => {
  try {
    const { data } = await api.post("/auth/password/forgot", payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to send reset email");
  }
});

export const resetPassword = createAsyncThunk("auth/resetPassword", async (payload, thunkAPI) => {
  try {
    const { data } = await api.put(`/auth/password/reset/${payload.token}`, payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Password reset failed");
  }
});

export const updatePassword = createAsyncThunk("auth/updatePassword", async (payload, thunkAPI) => {
  try {
    const { data } = await api.put("/auth/password/update", payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update password");
  }
});

/* ============================================================
   🧾 Admin User Management
============================================================ */
export const fetchAllUsers = createAsyncThunk("auth/fetchAllUsers", async (_, thunkAPI) => {
  try {
    const { data } = await api.get("/user/all");
    return data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch users");
  }
});

export const updateUserById = createAsyncThunk("auth/updateUserById", async ({ id, updates }, thunkAPI) => {
  try {
    const { data } = await api.put(`/admin/users/${id}`, updates);
    return data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update user");
  }
});

export const deleteUserById = createAsyncThunk("auth/deleteUserById", async (id, thunkAPI) => {
  try {
    await api.delete(`/admin/users/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete user");
  }
});

export const registerNewAdmin = createAsyncThunk("auth/registerNewAdmin", async (payload, thunkAPI) => {
  try {
    const { data } = await api.post("/admin/register", payload);
    return data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to register admin");
  }
});

/* ============================================================
   👤 User Profile
============================================================ */
export const fetchUserProfile = createAsyncThunk("auth/fetchUserProfile", async (_, thunkAPI) => {
  try {
    const { data } = await api.get("/user/profile");
    return data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch profile");
  }
});

export const updateUserProfile = createAsyncThunk("auth/updateUserProfile", async (updates, thunkAPI) => {
  try {
    const config = updates instanceof FormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};
    const { data } = await api.put("/user/profile", updates, config);
    return data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update profile");
  }
});

/* ============================================================
   🚪 Logout
============================================================ */
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    await api.post("/auth/logout");
  } finally {
    removeAccessToken();
  }
});

/* ============================================================
   🧩 Slice Definition
============================================================ */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.error = null;
      state.success = null;
      removeAccessToken();
    },
  },
  extraReducers: (builder) => {
    const pendingHandler = (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    };

    const rejectedHandler = (state, action, defaultMsg) => {
      state.loading = false;
      state.error =
        typeof action.payload === "string"
          ? action.payload
          : action.payload?.message || action.error?.message || defaultMsg;
    };

    // Attach common handlers
    [
      register,
      verifyOTP,
      resendOTP,
      loginUser,
      getUser,
      forgotPassword,
      resetPassword,
      updatePassword,
    ].forEach((thunk) => {
      builder.addCase(thunk.pending, pendingHandler);
      builder.addCase(thunk.rejected, (state, action) =>
        rejectedHandler(state, action, "Operation failed")
      );
    });

    // Success Cases
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success =
          action.payload?.message || "User registered successfully. OTP sent to email for verification.";
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.message || "Email verified successfully!";
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.message || "OTP resent successfully!";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.message || "Login successful";
        if (action.payload?.accessToken) {
          state.accessToken = saveAccessToken(action.payload.accessToken);
        }
        state.user = action.payload?.user || null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = saveAccessToken(action.payload.accessToken);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.loading = false;
      });

    // Admin User Management
    builder
      .addCase(fetchAllUsers.pending, pendingHandler)
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((u) =>
          u._id === action.payload._id ? action.payload : u
        );
        state.success = "User updated successfully";
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u) => u._id !== action.payload);
        state.success = "User deleted successfully";
      })
      .addCase(registerNewAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        state.success = "New admin registered successfully";
      });

    // Profile
    builder
      .addCase(fetchUserProfile.pending, pendingHandler)
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = "Profile updated successfully";
      })
      .addCase(fetchUserProfile.rejected, (state, action) =>
        rejectedHandler(state, action, "Failed to fetch profile")
      )
      .addCase(updateUserProfile.rejected, (state, action) =>
        rejectedHandler(state, action, "Failed to update profile")
      );
  },
});

/* ============================================================
   🔁 Exports
============================================================ */
export const { clearAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
