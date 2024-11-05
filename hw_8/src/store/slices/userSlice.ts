import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserResponse } from "../../types/User";

interface UserState {
  user: UserResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user:
    localStorage.getItem("userName") && localStorage.getItem("token")
      ? {
          userName: localStorage.getItem("userName") ?? "",
          access_token: localStorage.getItem("token") ?? "",
          userId: Number(localStorage.getItem("userId")) || 0,
        }
      : null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserResponse>) {
      state.user = action.payload;
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
