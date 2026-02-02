import * as React from "react";
import { cn } from "./utils";

interface SelectProps extends React.ComponentProps<"select"> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ className, label, id, options, ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          "flex h-12 w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2 text-base text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 appearance-none cursor-pointer",
          className
        )}
        {...props}
      >
        <option value="" disabled>Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
