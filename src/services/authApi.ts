import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  ConfirmTwoFaSetupResponse,
  LoginPayload,
  LoginResponse,
  TwoFaSetupResponse,
  TwoFaVerificationPayload,
  TwoFaVerificationResponse,
} from "../types/auth";
import type { RootState } from "../app/store";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const { accessToken, tempToken } = (getState() as RootState).auth;
      const token = accessToken ?? tempToken;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (body) => ({ url: "/admin/auth/login", method: "POST", body }),
    }),
    twoFaSetup: builder.mutation<TwoFaSetupResponse, void>({
      query: () => ({ url: "/admin/auth/2fa/setup", method: "POST" }),
    }),

    confirmTwoFaSetup: builder.mutation<
      ConfirmTwoFaSetupResponse,
      TwoFaVerificationPayload
    >({
      query: (body) => ({
        url: "/admin/auth/2fa/setup-confirm",
        method: "POST",
        body,
      }),
    }),

    TwoFaVerify: builder.mutation<
      TwoFaVerificationResponse,
      TwoFaVerificationPayload
    >({
      query: (body) => ({
        url: "/admin/auth/2fa/verify",
        method: "POST",
        body,
      }),
    }),

    TwoFaReset: builder.mutation<TwoFaSetupResponse, void>({
      query: (body) => ({
        url: "/admin/auth/2fa/reset",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useTwoFaSetupMutation,
  useConfirmTwoFaSetupMutation,
  useTwoFaVerifyMutation,
  useTwoFaResetMutation,
} = authApi;
