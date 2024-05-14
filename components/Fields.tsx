import clsx from "clsx";
import { ReactNode } from "react";

const formClasses =
  "block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm";

function Label({
  id,
  children,
  srOnly,
}: {
  id: string;
  children: ReactNode;
  srOnly?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className={clsx(
        "mb-3 block text-sm font-medium text-gray-700",
        srOnly && "sr-only"
      )}
    >
      {children}
    </label>
  );
}

export function TextField({
  id,
  label,
  labelSrOnly,
  type = "text",
  className = "",
  name = "",
  autoComplete = "",
  required,
  placeholder = "",
  ...props
}: {
  id: string;
  label: string;
  labelSrOnly?: boolean;
  type: string;
  className?: string;
  name?: string;
  autoComplete?: string;
  required?: boolean;
  placeholder?: string;
}): JSX.Element {
  return (
    <div className={className}>
      {label && (
        <Label id={id} srOnly={labelSrOnly}>
          {label}
        </Label>
      )}
      <input
        id={id}
        type={type}
        {...props}
        required
        className={formClasses}
        placeholder={placeholder}
        autoComplete={autoComplete}
        name={name}
      />
    </div>
  );
}

export function SelectField({
  id,
  label,
  className = "",
  ...props
}: {
  id: string;
  label: string;
  className: string;
}) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select id={id} {...props} className={clsx(formClasses, "pr-8")} />
    </div>
  );
}
