import { AuthLayout } from "../layouts/AuthLayout";
import LogoImage from "../assets/logo.png";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useTwoFaVerifyMutation } from "../services/authApi";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { removeCredentials, setCredentials } from "../app/authSlice";
import toast from "react-hot-toast";
import {
  getNavigationScreen,
  NAVIGATION_SCREENS,
} from "../utils/NavigationScreens";
export function TwoFaVerification() {
  const [twoFaVerify, { isLoading }] = useTwoFaVerifyMutation();
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (value: string, index: number) => {
    // Only allow one digit
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...digits];
    newOtp[index] = value;
    setDigits(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    setDigits(pasted.padEnd(6, "").split("").slice(0, 6));
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < 6) return;

    try {
      const apiResponse = await twoFaVerify({ code }).unwrap();

      dispatch(
        setCredentials({
          user: apiResponse.data.userDetail,
          accessToken: apiResponse.data.accessToken,
        }),
      );
      toast.success(apiResponse.data.message);

      navigate(getNavigationScreen(apiResponse.data.nextStep));
    } catch (error: any) {
      console.error(" 2FA verification failed", error);
      // wrong code → show an error, clear the boxes
      setDigits(Array(6).fill(""));
      inputRefs.current[0]?.focus();
      toast.error(error?.data?.message);
    }
  };

  const cancelVerification = () => {
    dispatch(removeCredentials());
    navigate(NAVIGATION_SCREENS.LOGIN_SCREEN, { replace: true });
  };

  return (
    <AuthLayout>
      <div className="w-112.5 flex flex-col gap-5 ">
        <div className="flex flex-row justify-between">
          <div className="flex h-5.5 flex-row justify-between text-[17px] items-center gap-2.5 font-semibold text-[#E7EAEE]">
            <img className="h-5.5 w-5.5" src={LogoImage} />
            <span className=" h-5.5">Marketplace</span>
          </div>
          <div>
            <p className=" text-center  py-1 px-2 text-[#A3ABB6] text-[12px]  border border-[#2A2F36] rounded-md">
              ADMIN
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5.5 p-8 bg-[#181B20] rounded-xl border border-[#2A2F36]">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[#E7EAEE] text-[22px] font-semibold">
              Two Step Verification
            </h1>
            <p className="text-[#A3ABB6] text-[14px] leading-normal">
              Open your authenticator app (Google Authenticator, Microsoft
              Authenticator or Authy) and enter the 6-digit code for Marketplace
              admin
            </p>
          </div>

          <form
            noValidate
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <span className="text-[#C9CFD6] text-[13px] font-semibold mb-2">
                Verification code
              </span>
              <div className="flex  gap-4">
                {digits.map((digit, index) => (
                  <input
                    key={index}
                    autoComplete="one-time-code"
                    type="text"
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    inputMode="numeric"
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    maxLength={1}
                    value={digit}
                    className="w-12.5 h-15 py-px px-0.5 bg-[#0F1114] rounded-lg text-[#E7EAEE] text-[20px] text-center border border-[#343A42] "
                  />
                ))}
              </div>
            </div>

            <Button type="submit">
              {isLoading ? "Verifying...." : "Verify and sign in"}
            </Button>
          </form>

          <div className="flex justify-between items-center text-[13px]">
            <button
              type="button"
              onClick={cancelVerification}
              className="underline text-[#6385d5] cursor-pointer"
            >
              Back
            </button>
            <Link to="/2fa-backup" className="underline text-[#6385d5]">
              Use a backup code
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
