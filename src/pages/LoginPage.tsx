import { AuthLayout } from "../layouts/AuthLayout";
import LogoImage from "../assets/logo.png";
import { TextField } from "../components/TextField";
import { Button } from "../components/Button";
import SecurityIcon from "../assets/security.png";

export function LoginPage() {
  return (
    <AuthLayout>
      <div className="w-100 flex flex-col gap-5 ">
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

        <div className="text-[#E7EAEE] flex flex-col gap-5 rounded-xl bg-[#181B20] border border-[#2A2F36] p-8">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[22px] font-semibold">
              Sign in to Admin Console
            </h1>
            <p className="text-[#A3ABB6] text-[14px]">Staff account only.</p>
          </div>

          <form noValidate className="flex flex-col gap-5">
            <TextField
              id="email"
              type="email"
              label="Work email"
              placeholder="name@company.com"
            />

            <TextField
              id="password"
              type="password"
              label="Password"
              placeholder="*******"
            />
            <Button type="submit">Continue</Button>
          </form>
        </div>

        <div className="py-3 px-3.5 border border-[#2A2F36] rounded-[10px] leading-normal text-[#A3ABB6] text-[13px] flex gap-2.5">
          <img className="w-5 h-5" src={SecurityIcon} alt="security" />
          <span>
            Sign-ins are logged. Sessions end after 30 minutes of inactivity.
          </span>
        </div>
      </div>
    </AuthLayout>
  );
}
