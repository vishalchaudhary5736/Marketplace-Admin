import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  ConfirmTwoFaSetupResponse,
  LoginPayload,
  LoginResponse,
  TwoFaResetResponse,
  TwoFaSetupResponse,
  TwoFaVerificationPayload,
  TwoFaVerificationResponse,
} from "../types/auth";
import type { RootState } from "../app/store";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { removeCredentials } from "../app/authSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const { accessToken, tempToken } = (getState() as RootState).auth;
    const token = accessToken ?? tempToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  const noLogoutEndpoints = ["login", "confirmTwoFaSetup", "twoFaVerify"];

  if (
    result.error?.status === 401 &&
    !noLogoutEndpoints.includes(api.endpoint)
  ) {
    api.dispatch(removeCredentials());
  }
  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
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

    twoFaVerify: builder.mutation<
      TwoFaVerificationResponse,
      TwoFaVerificationPayload
    >({
      query: (body) => ({
        url: "/admin/auth/2fa/verify",
        method: "POST",
        body,
      }),
    }),

    twoFaReset: builder.mutation<TwoFaSetupResponse, void>({
      query: (body) => ({
        url: "/admin/auth/2fa/reset",
        method: "POST",
        body,
      }),
    }),

    TwoFaBackup: builder.mutation<
      TwoFaVerificationResponse,
      TwoFaVerificationPayload
    >({
      query: (body) => ({
        url: "/admin/auth/2fa/recovery",
        method: "POST",
        body,
      }),
    }),

    logout: builder.mutation<TwoFaResetResponse, void>({
      query: (body) => ({
        url: "/admin/auth/logout",
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
  useLogoutMutation,
  useTwoFaBackupMutation,
} = authApi;
