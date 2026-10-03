import type { ReactNode } from "react";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <main className="flex flex-1 items-center justify-center min-h-screen bg-[#0F1114]">
        <div className="w-full max-w-100">{children}</div>
      </main>
    </div>
  );
}
