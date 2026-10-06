import { AuthLayout } from "../layouts/AuthLayout";
import LogoImage from "../assets/logo.png";
import TickIcon from "../assets/Tick.png";
import SecurityIcon from "../assets/alertSecurity.png";
import CopyIcon from "../assets/Copy.png";
import { Button } from "../components/Button";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { NAVIGATION_SCREENS } from "../utils/NavigationScreens";

type RecoveryCodeState = { recoveryCodes?: string[] } | null;

export function RecoveryCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const [accepted, setAccepted] = useState(false);
  const [copied, setCopied] = useState(false);
  const recoveryCodes = (location.state as RecoveryCodeState)?.recoveryCodes;

  if (!recoveryCodes?.length) {
    return <Navigate to={NAVIGATION_SCREENS.DASHBOARD} replace />;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(recoveryCodes.join("\n"));
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleDownload = async () => {
    const text = recoveryCodes.join("/n");

    const blob = new Blob([text], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recovery-codes.text";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleContinue = () => {
    navigate(NAVIGATION_SCREENS.DASHBOARD);
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

        <div className="flex flex-col gap-5.5 p-8 bg-[#181B20] text-[#2A2F36] rounded-xl border border-[#2A2F36]">
          <div className="flex px-3 py-2.5 gap-2.5 text-[#6EE7A0] bg-[#16301F] rounded-lg text-[16px]">
            <img src={TickIcon} alt="Tick mark" />
            <span>Authenticator app connected</span>
          </div>

          <div className="flex flex-col gap-1.5 ">
            <h1 className="text-[#E7EAEE] text-[22px] font-semibold">
              Save your recovery codos
            </h1>
            <p className="text-[#A3ABB6] ">
              If you lose your phone, each of these codes lets you sign in once.
              Keep them somewhere safe, like a password manager.
            </p>
          </div>

          <div className="flex flex-row gap-3 py-3.5 px-4 text-[14px] text-[#FCD34D] bg-[#2A2210] rounded-[10px] border border-[#5A4A1F]">
            <img className="h-4 w-4" src={SecurityIcon} alt="secure" />
            <p className="">
              This is the only time you'll see these codes. If you leave without
              saving them, you'll need to set up two-step verification again
            </p>
          </div>

          <div className="px-5 py-4.5 bg-[#0F1114] rounded-[10px] radius radius-[#343A42] grid grid-cols-2 gap-y-6 gap-x-3 border border-[#343A42]">
            {recoveryCodes.map((value, index) => (
              <div key={value} className="flex justify-center items-center">
                <span className="text-[#5B636E] text-[14px]">{index + 1}</span>
                <div className="w-53.5 h-5.25 text-center text-[#E7EAEE] text-[17px]">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="h-10 border border-[#2A2F36] rounded-lg  text-[#E7EAEE] text-[14px] flex items-center justify-center gap-2"
            >
              <img className="h-5 w-5" src={CopyIcon} alt="copy code" />
              {copied ? "Copied" : "Copy all"}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="h-10 border border-[#2A2F36] rounded-lg  text-[#E7EAEE] text-[14px] flex items-center justify-center gap-2"
            >
              <img className="h-5 w-5" src={CopyIcon} alt="copy code" />
              Download.txt
            </button>
            <button
              onClick={() => window.print()}
              type="button"
              className="h-10 border border-[#2A2F36] rounded-lg  text-[#E7EAEE] text-[14px] flex items-center justify-center gap-2"
            >
              <img className="h-5 w-5" src={CopyIcon} alt="copy code" />
              Print
            </button>
          </div>

          <div className="flex gap-4 text-[#C9CFD6] items-center">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            I've saved these codes somewhere safe
          </div>
          <Button type="button" onClick={handleContinue} disabled={!accepted}>
            Continue to Dashboard
          </Button>
          <p className="text-center text-[#A3ABB6] text-[14px]">
            Tick the above box to continue{" "}
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
