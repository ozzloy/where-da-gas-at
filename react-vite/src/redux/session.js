import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const authActionTypes = {
  auth: "session/authenticate",
  login: "session/login",
  signup: "session/signup",
  logout: "session/logout",
};

const initialState = {
  user: null,
  loading: false,
  errors: false,
};

export const thunkAuthenticate = createAsyncThunk(
  authActionTypes.auth,
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || { server: "Something went wrong. Please try again" }
      );
    }
  }
);

export const thunkLogin = createAsyncThunk(
  authActionTypes.login,
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || { server: "Something went wrong. Please try again" }
      );
    }
  }
);

export const thunkSignup = createAsyncThunk(
  authActionTypes.signup,
  async ({ email, user, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          user,
          password,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || { server: "Something went wrong. Please try again" }
      );
    }
  }
);

export const thunkLogout = createAsyncThunk(
  authActionTypes.logout,
  async (_, { rejectWithValue }) => {
    try {
      await fetch("/api/auth/logout");
      return null;
    } catch (error) {
      return rejectWithValue(
        error.message || { server: "Something went wrong. Please try again" }
      );
    }
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunkAuthenticate.pending, (state) => {
        state.loading = true;
        state.errors = false;
      })
      .addCase(thunkAuthenticate.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(thunkAuthenticate.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(thunkLogin.pending, (state) => {
        state.loading = true;
        state.errors = false;
      })
      .addCase(thunkLogin.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(thunkLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(thunkSignup.pending, (state) => {
        state.loading = true;
        state.errors = false;
      })
      .addCase(thunkSignup.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(thunkSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(thunkLogout.pending, (state) => {
        state.loading = true;
        state.errors = false;
      })
      .addCase(thunkLogout.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(thunkLogout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});
export const { setUser, removeUser } = sessionSlice.actions;

export default sessionSlice.reducer;
