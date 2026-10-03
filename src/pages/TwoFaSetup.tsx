import { AuthLayout } from "../layouts/AuthLayout";
import LogoImage from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";

export function TwoFaSetup() {
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
                <div className="h-full w-full border-2 border-[#A3ABB6] border-dashed flex items-center justify-center rounded-sm text-[#4B5563]">
                  [QR code frm API]
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 ">
              <span className="text-[14px] underline-[1.5] text-[#C9CFD6]">
                Scan this QR code with the app. Can't scan it? Enter this key
                instead:
              </span>
              <div className="flex item-center gap-2">
                <span className="py-2 px-3 border border-[#343A42] rounded-md bg-[#0F1114] text-[18px] tracking-[0.08em] text-[#E7EAEE]">
                  [SETUP KEY]
                </span>
                <button
                  className="text-[#9DB8F5] text-[16px] font-medium border rounded-md px-3 py-2"
                  type="submit"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-3.5">
            <span className="text-[#C3D4FA] rounded-[50%] font-semibold flex flex-center items-center justify-center h-8 w-8 bg-[#22304F]">
              3
            </span>
            <div className="flex flex-col grow gap-2">
              <span className="text-[14px] leading-normal text-[#C9CFD6]">
                Enter the 6-digit code the app shows
              </span>
              <div className="flex grow gap-2.5">
                {Array(6)
                  .fill(" ")
                  .map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      className="w-17.5 h-13.75 py-px px-0.5  bg-[#0F1114] rounded-lg text-[#E7EAEE] text-[20px] text-center border border-[#343A42] "
                    />
                  ))}
              </div>
            </div>
          </div>

          <Button type="submit">Verify and finish setup</Button>
          <Link
            to="/login"
            className="text-center underline text-[#C3D4FA] text-[16px]"
          >
            Cancel and finish setup
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
