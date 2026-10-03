import { AuthLayout } from "../layouts/AuthLayout";
import LogoImage from "../assets/logo.png";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import KeyIcon from "../assets/key.png";
import { TextField } from "../components/TextField";
import InfoIcon from "../assets/info.png";

export function TwoFaBackup() {
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
          <div className="w-11 h-11 rounded-[10px] bg-[#22304F] text-[#C3D4FA] flex items-center justify-center">
            <img src={KeyIcon} alt="backup code" className="h-5.5 w-5.5" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[#E7EAEE] text-[22px] font-semibold">
              Use a backup code
            </h1>
            <p className="text-[#A3ABB6] text-[14px] leading-normal">
              Lost access to your authenticator app? Enter one of the backup
              codes you saved when you setup up two-step verification.
            </p>
          </div>

          <form noValidate className="flex flex-col  gap-6">
            <div className="flex flex-col gap-2">
              <TextField
                id="code"
                placeholder="XXXX - XXXX"
                label="Backup code"
                className="h-13"
              />
              <p className="text-[#A3ABB6] text-[14px]">
                Each code works only once.
              </p>
            </div>
            <Button type="submit">Verify and sign in</Button>
          </form>

          <div className="flex justify-between items-center text-[13px]">
            <Link to="/login" className="underline text-[#6385d5]">
              Use authenticator code instead
            </Link>
            <Link to="/login" className="underline text-[#6385d5]">
              Cancel
            </Link>
          </div>
        </div>

        <div className="py-3 px-3.5 border border-[#2A2F36] rounded-[10px] leading-normal text-[#A3ABB6] text-[13px] flex gap-2.5">
          <img className="w-5 h-5" src={InfoIcon} alt="security" />
          <span>
            No backup code either? Ask a super admin to reset two-step
            verification on your account.
          </span>
        </div>
      </div>
    </AuthLayout>
  );
}
