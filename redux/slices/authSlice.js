// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../src/api/axios";

/* =========================================================
   📦 LocalStorage Helpers
========================================================= */
export const saveAccessToken = (token) => {
  if (!token) return null;
  try {
    localStorage.setItem("accessToken", token);
    return token;
  } catch (e) {
    console.error("Failed to save access token:", e);
    return null;
  }
};

const getAccessToken = () => {
  try {
    return localStorage.getItem("accessToken");
  } catch (e) {
    console.error("Failed to read access token:", e);
    return null;
  }
};

const removeAccessToken = () => {
  try {
    localStorage.removeItem("accessToken");
  } catch (e) {
    console.error("Failed to remove access token:", e);
  }
};

/* =========================================================
   🧩 Initial State
========================================================= */
const userFromStorage = (() => {
  try {
    return localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
  } catch (e) {
    console.error("Failed to parse stored user:", e);
    return null;
  }
})();

const initialState = {
  user: userFromStorage,
  accessToken: getAccessToken(),
  loading: false,
  error: null,
  success: null,
  users: [],
  // 🔹 Always start false; backend will confirm authentication later
  isAuthenticated: false,
};

/* =========================================================
   🔁 Async Thunks
========================================================= */

// Register
export const register = createAsyncThunk("auth/register", async (credentials, thunkAPI) => {
  try {
    const { data } = await api.post("/auth/register", credentials);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Registration failed");
  }
});

// Verify OTP
export const verifyOTP = createAsyncThunk("auth/verifyOTP", async (payload, thunkAPI) => {
  try {
    const { data } = await api.post("/auth/verify-otp", payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "OTP verification failed");
  }
});

// Resend OTP
export const resendOTP = createAsyncThunk("auth/resendOTP", async (payload, thunkAPI) => {
  try {
    const { data } = await api.post("/auth/otp/resend", payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to resend OTP");
  }
});

// Login
export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, thunkAPI) => {
  try {
    const { data } = await api.post("/auth/login", credentials);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

// Refresh token
export const refreshAccessToken = createAsyncThunk("auth/refreshAccessToken", async (_, thunkAPI) => {
  try {
    const { data } = await api.post("/auth/refresh-token");
    return data;
  } catch (err) {
    removeAccessToken();
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Token refresh failed");
  }
});

// Get current user
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const { data } = await api.get("/auth/me");
    return data;
  } catch (err) {
    removeAccessToken();
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch user");
  }
});

// Forgot password
export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (payload, thunkAPI) => {
  try {
    const { data } = await api.post("/auth/password/forgot", payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to send reset email");
  }
});

// Reset password
export const resetPassword = createAsyncThunk("auth/resetPassword", async (payload, thunkAPI) => {
  try {
    const { data } = await api.put(`/auth/password/reset/${payload.token}`, payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Password reset failed");
  }
});

// Update password
export const updatePassword = createAsyncThunk("auth/updatePassword", async (payload, thunkAPI) => {
  try {
    const { data } = await api.put("/auth/password/update", payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update password");
  }
});

// Logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    await api.post("/auth/logout");
  } catch (e) {
    console.warn("Logout request failed (continuing to clear client state):", e);
  } finally {
    removeAccessToken();
    try {
      localStorage.removeItem("user");
    } catch (e) {
      console.error("Failed to remove user from localStorage:", e);
    }
  }
});

// Admin: Fetch all users
export const fetchAllUsers = createAsyncThunk("auth/fetchAllUsers", async (_, thunkAPI) => {
  try {
    const { data } = await api.get("/user/all");
    return data.data || data.users || [];
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch users");
  }
});

// Admin: Update user
export const updateUserById = createAsyncThunk(
  "auth/updateUserById",
  async ({ id, updates }, thunkAPI) => {
    try {
      const { data } = await api.put(`/admin/users/${id}`, updates);
      return data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update user");
    }
  }
);

// Admin: Delete user
export const deleteUserById = createAsyncThunk("auth/deleteUserById", async (id, thunkAPI) => {
  try {
    await api.delete(`/admin/users/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete user");
  }
});

// Admin: Register new admin
export const registerNewAdmin = createAsyncThunk("auth/registerNewAdmin", async (payload, thunkAPI) => {
  try {
    const { data } = await api.post("/admin/register", payload);
    return data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to register admin");
  }
});

// User profile
export const fetchUserProfile = createAsyncThunk("auth/fetchUserProfile", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get("/user/profile");
    return data.data || data.user || data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateUserProfile = createAsyncThunk("auth/updateUserProfile", async (updates, { rejectWithValue }) => {
  try {
    const config =
      updates instanceof FormData ? { headers: { "Content-Type": "multipart/form-data" } } : {};
    const { data } = await api.put("/user/profile", updates, config);
    return data.data || data.user || data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

/* =========================================================
   🧱 Slice
========================================================= */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      // Only clear messages, not login state
      state.loading = false;
      state.error = null;
      state.success = null;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.success = null;
      removeAccessToken();
      try {
        localStorage.removeItem("user");
      } catch (e) {
        console.error("Failed to remove user from localStorage:", e);
      }
    },
  },
  extraReducers: (builder) => {
    const pendingHandler = (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    };
    const rejectedHandler = (state, action, defaultMsg = "Operation failed") => {
      state.loading = false;
      state.error =
        typeof action.payload === "string"
          ? action.payload
          : action.payload?.message || action.error?.message || defaultMsg;
    };

    [
      register,
      verifyOTP,
      resendOTP,
      loginUser,
      getUser,
      refreshAccessToken,
      forgotPassword,
      resetPassword,
      updatePassword,
      fetchUserProfile,
      updateUserProfile,
      fetchAllUsers,
      updateUserById,
      deleteUserById,
      registerNewAdmin,
    ].forEach((thunk) => {
      builder.addCase(thunk.pending, pendingHandler);
      builder.addCase(thunk.rejected, (state, action) => rejectedHandler(state, action));
    });

    builder
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.message || "Registration successful";
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.message || "Verification successful";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.message || "Login successful";

        removeAccessToken(); // ensure old tokens are cleared
        if (action.payload?.accessToken) {
          state.accessToken = saveAccessToken(action.payload.accessToken);
        }

        state.user = action.payload?.user || null;
        state.isAuthenticated = !!state.user;

        try {
          if (state.user) localStorage.setItem("user", JSON.stringify(state.user));
        } catch (e) {
          console.error("Failed to store user in localStorage:", e);
        }
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.accessToken) {
          state.accessToken = saveAccessToken(action.payload.accessToken);
        }
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || action.payload || null;
        state.isAuthenticated = !!state.user;
        try {
          if (state.user) localStorage.setItem("user", JSON.stringify(state.user));
        } catch (e) {
          console.error("Failed to store user in localStorage:", e);
        }
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.success = "Logged out";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = "Profile fetched successfully";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = "Profile updated successfully";
        try {
          if (state.user) localStorage.setItem("user", JSON.stringify(state.user));
        } catch (e) {
          console.error("Failed to store user in localStorage:", e);
        }
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload || [];
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((u) => (u._id === action.payload._id ? action.payload : u));
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u) => u._id !== action.payload);
      })
      .addCase(registerNewAdmin.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.users.push(action.payload);
      });
  },
});

/* =========================================================
   🚀 Exports
========================================================= */
export const { clearAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
