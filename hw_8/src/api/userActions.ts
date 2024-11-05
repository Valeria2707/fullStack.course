import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";
import { UserResponse } from "../types/User";
import { LoginCredentials, RegisterData } from "../types/Auth";

const axiosBaseQuery: BaseQueryFn<
  { url: string; method: "POST"; body: unknown },
  unknown,
  { status: number; data: unknown }
> = async ({ url, method, body }) => {
  try {
    const result = await axiosInstance({ url, method, data: body });
    return { data: result.data };
  } catch (axiosError) {
    const error = axiosError as AxiosError;
    return {
      error: {
        status: error.response?.status || 500,
        data: error.response?.data || { message: error.message },
      },
    };
  }
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    loginUser: builder.mutation<UserResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: UserResponse) => {
        if (response.access_token) {
          localStorage.setItem("token", response.access_token);
          localStorage.setItem("userName", response.userName);
          if (response.userId !== null && response.userId !== undefined) {
            localStorage.setItem("userId", response.userId.toString());
          }
        }
        return response;
      },
    }),
    registerUser: builder.mutation<UserResponse, RegisterData>({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
      transformResponse: (response: UserResponse) => {
        if (response.access_token) {
          localStorage.setItem("token", response.access_token);
          localStorage.setItem("userName", response.userName);
          if (response.userId !== null && response.userId !== undefined) {
            localStorage.setItem("userId", response.userId.toString());
          }
        }
        return response;
      },
    }),
    logout: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          localStorage.removeItem("token");
          localStorage.removeItem("userName");
          localStorage.removeItem("userId");
          return { data: undefined };
        } catch {
          return {
            error: {
              status: 500,
              data: { message: "Logout failed" },
            },
          };
        }
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutMutation,
} = userApi;
