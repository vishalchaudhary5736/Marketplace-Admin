import { AuthLayout } from "../layouts/AuthLayout";
import LogoImage from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import {
  useConfirmTwoFaSetupMutation,
  useTwoFaSetupMutation,
} from "../services/authApi";
import { useEffect, useRef, useState } from "react";
import type { TwoFaSetupResponse } from "../types/auth";
import { NAVIGATION_SCREENS } from "../utils/NavigationScreens";
import { useDispatch } from "react-redux";
import { setCredentials } from "../app/authSlice";

export function TwoFaSetup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [twoFaSetup, { isLoading }] = useTwoFaSetupMutation();
  const [confirmTwoFaSetup, { isLoading: isConfirming }] =
    useConfirmTwoFaSetupMutation();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [copied, setCopied] = useState(false);
  const [setupData, setSetupData] = useState<TwoFaSetupResponse["data"] | null>(
    null,
  );
  const setupCalled = useRef(false);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
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

  useEffect(() => {
    const fetchSetup = async () => {
      try {
        if (setupCalled.current) return;
        setupCalled.current = true;
        const apiResponse = await twoFaSetup().unwrap();
        setSetupData(apiResponse.data);
      } catch (error) {
        console.log("Setup", error);
        navigate(NAVIGATION_SCREENS.LOGIN_SCREEN, { replace: true });
      }
    };
    fetchSetup();
  }, [twoFaSetup, navigate]);

  const copySetupKey = async () => {
    if (!setupData) return;
    try {
      await navigator.clipboard.writeText(setupData.manualEntryKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // optional: show an error toast
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length !== 6) return;

    try {
      const res = await confirmTwoFaSetup({ code }).unwrap();
      dispatch(
        setCredentials({
          user: res.data.userDetail,
          accessToken: res.data.accessToken,
        }),
      );
      navigate(NAVIGATION_SCREENS.RECOVERY_CODE, {
        replace: true,
        state: { recoveryCodes: res.data.recoveryCodes.codes },
      });
    } catch (error) {
      console.error("Confirm 2FA setup failed", error);
      // wrong code → show an error, clear the boxes
      setDigits(Array(6).fill(""));
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <AuthLayout>
      <div className="w-150 flex flex-col gap-5 ">
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
            <span className="text-[#9DB8F5] font-semibold text-[20px]">
              FIRST SIGN-IN
            </span>
            <h1 className="text-[#E7EAEE] text-[26px] font-semibold">
              Setup up your authenticator app
            </h1>
            <p className="text-[#A3ABB6] text-[16px] leading-normal">
              Admin accounts need a code from an authenticator app every time
              they sign in. This takes about a minute.
            </p>
          </div>

          <div className="flex gap-3.5">
            <span className="text-[#C3D4FA] rounded-[50%] font-semibold flex flex-center items-center justify-center h-8 w-8 bg-[#22304F]">
              1
            </span>
            <span className="text-[14px] leading-normal text-[#C9CFD6]">
              Install Google Authenticator, Microsoft Authenticator or Authy on
              your phone
            </span>
          </div>

          <div className="flex gap-3.5 ">
            <span className="text-[#C3D4FA] rounded-[50%] font-semibold flex flex-center items-center justify-center h-8 w-8 bg-[#22304F]">
              2
            </span>
            <div className="flex gap-5 grow">
              <div className="w-42 h-42  p-2.5 rounded-[10px] bg-[#FFFFFF]">
                {setupData ? (
                  <img
                    className="h-full w-full"
                    src={setupData.qrCode}
                    alt="Authenticator QR code"
                  />
                ) : (
                  <div className="h-full w-full border-2 border-[#A3ABB6] border-dashed flex items-center justify-center rounded-sm text-[#4B5563]">
                    {isLoading ? "Loading..." : "QR code unavailable"}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2.5 ">
              <span className="text-[14px] underline-[1.5] text-[#C9CFD6]">
                Scan this QR code with the app. Can't scan it? Enter this key
                instead:
              </span>
              <div className="flex item-center gap-2">
                <span className="py-2 px-3 border border-[#343A42] rounded-md bg-[#0F1114] text-[18px] tracking-[0.08em] text-[#E7EAEE]">
                  {setupData?.manualEntryKey ?? "••••••••"}
                </span>
                <button
                  className="text-[#9DB8F5] text-[16px] font-medium border rounded-md px-3 py-2
           cursor-pointer hover:bg-[#22304F] active:scale-95 transition
           disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                  onClick={copySetupKey}
                  disabled={!setupData}
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
          <form
            noValidate
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <div className="flex gap-3.5">
              <span className="text-[#C3D4FA] rounded-[50%] font-semibold flex flex-center items-center justify-center h-8 w-8 bg-[#22304F]">
                3
              </span>
              <div className="flex flex-col grow gap-2">
                <span className="text-[14px] leading-normal text-[#C9CFD6]">
                  Enter the 6-digit code the app shows
                </span>
                <div className="flex grow gap-2.5">
                  {digits.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      autoComplete="one-time-code"
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-17.5 h-13.75 py-px px-0.5  bg-[#0F1114] rounded-lg text-[#E7EAEE] text-[20px] text-center border border-[#343A42] "
                    />
                  ))}
                </div>
              </div>
            </div>
            <Button type="submit">
              {isConfirming ? "Confirming Setup..." : "Verify and finish setup"}
            </Button>
          </form>

          <Link
            to={NAVIGATION_SCREENS.LOGIN_SCREEN}
            className="text-center underline text-[#C3D4FA] text-[16px]"
          >
            Cancel and finish setup
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
