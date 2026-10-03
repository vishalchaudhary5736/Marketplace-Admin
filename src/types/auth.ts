export type Role = "CUSTOMER" | "VENDOR" | "ADMIN";
export type UserStatus = "ACTIVE" | "PENDING" | "SUSPENDED" | "INACTIVE";

export type User = {
  id: string;
  email: string;
  emailVerifiedAt: string;
  isEmailVerified: boolean;
  mobileNumber?: string;
  countryCode?: string;
  agreeTerms: boolean;
  phoneVerifiedAt?: string;
  firstName: string;
  lastName?: string;
  avatarUrl?: string;
  role: Role;
  status: UserStatus;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
  isSubAdmin: boolean;
  twoFactorEnabled?: boolean;
  twoFactorSetupCompleted?: boolean;
  recoveryCodes?: string[];
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    tempToken: string;
    nextStep: string;
  };
};

export type TwoFaSetupResponse = {
  success: boolean;
  message: string;
  data: {
    qrCode: string;
    otpauthUrl: string;
    manualEnterKey: string;
  };
};

export type ConfirmTwoFaSetupResponse = {
  success: boolean;
  message: string;
  data: {
    userDetail: User;
    accessToken: string;
    nextStep: string;
  };
  recoveryCode: {
    message: String;
    codes: string[];
  };
};

export type TwoFaVerificationPayload = {
  code: string;
};

export type TwoFaVerificationResponse = {
  success: boolean;
  data: {
    message: string;
    userDetail: User;
    accessToken: string;
    nextStep: string;
  };
};

export type TwoFaResetResponse = {
  success: boolean;
  message: string;
};
