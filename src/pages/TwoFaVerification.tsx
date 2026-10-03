import { AuthLayout } from "../layouts/AuthLayout";
import LogoImage from "../assets/logo.png";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
export function TwoFaVerification() {
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

          <form noValidate className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[#C9CFD6] text-[13px] font-semibold mb-2">
                Verification code
              </span>
              <div className="flex  gap-4">
                {Array(6)
                  .fill("")
                  .map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      className="w-12.5 h-15 py-px px-0.5 bg-[#0F1114] rounded-lg text-[#E7EAEE] text-[20px] text-center border border-[#343A42] "
                    />
                  ))}
              </div>
            </div>

            <Button type="submit">Verify and sign in</Button>
          </form>

          <div className="flex justify-between items-center text-[13px]">
            <Link to="/login" className="underline text-[#6385d5]">
              Back
            </Link>
            <Link to="/login" className="underline text-[#6385d5]">
              Use a backup code
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
