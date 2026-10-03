import { forwardRef, type InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  className?: string;
};

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ label, error, id, className = "", ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[#C9CFD6]">
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        className={`text-[#E7EAEE]  h-11 text-[15px] rounded-lg border border-[#343A42] bg-[#0F1114] px-3.5 outline-none focus:ring-2 focus:ring-brand/40 ${
          error ? "border-red-600" : "border-line"
        } ${className}`}
        {...props}
      />
      {error && <span className="text-sm text-red-700">{error}</span>}
    </div>
  ),
);
