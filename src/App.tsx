import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LoginPage } from "./pages/LoginPage";
import { TwoFaVerification } from "./pages/TwoFaVerification";
import { TwoFaBackup } from "./pages/TwoFaBackupAuth";
import { TwoFaSetup } from "./pages/TwoFaSetup";
import { TwoFaPrivateRoute } from "./routes/tempPrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { PrivateRoute } from "./routes/PrivateRoute";
import { RecoveryCode } from "./pages/RecoveryCode";
import { LogoutButton } from "./pages/Logout";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<TwoFaPrivateRoute />}>
          <Route index path="/2fa-setup" element={<TwoFaSetup />} />
          <Route path="/2fa-verification" element={<TwoFaVerification />} />
          <Route path="/2fa-backup" element={<TwoFaBackup />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/recovery-code" element={<RecoveryCode />} />
          <Route path="/dashboard" element={<LogoutButton />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
