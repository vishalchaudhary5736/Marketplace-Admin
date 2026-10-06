export const NAVIGATION_SCREENS = {
  HOME: "/home",
  OTP_SCREEN: "/verify-email",
  LOGIN_SCREEN: "/login",
  SIGN_UP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  PASSWORD_RESET: "/reset-password",
  DASHBOARD: "/dashboard",
  TWO_FA_SETUP: "/2fa-setup",
  TWO_FA_VERIFICATION: "/2fa-verification",
  RECOVERY_CODE: "/recovery-code",
};

export function getNavigationScreen(nextStep: string) {
  return (
    NAVIGATION_SCREENS[nextStep as keyof typeof NAVIGATION_SCREENS] ??
    NAVIGATION_SCREENS.HOME
  );
}

export const NAVIGATION_KEY = {
  Home: "Home",
  OTP_SCREEN: "OTP_SCREEN",
  LOGIN_SCREEN: "LOGIN_SCREEN",
  SIGN_UP: "SIGN_UP",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  PASSWORD_RESET: "PASSWORD_RESET",
  TWO_FA_SETUP: "TWO_FA_SETUP",
  TWO_FA_VERIFICATION: "TWO_FA_VERIFICATION",
  DASHBOARD: "DASHBOARD",
};
