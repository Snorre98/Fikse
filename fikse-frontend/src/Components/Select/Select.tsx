import React from "react";
import styles from "./Select.module.scss";
// Define a custom option shape that makes sense for select options
interface SelectOptionType {
  value: string;
  label: string;
  disabled?: boolean;
}

interface PrimitiveSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "value" | "defaultValue"> {
  className?: string;
  options: SelectOptionType[];
}

/* For controlled select. This requires value, as value MUST come from the controlling component */
/* Disallows defaultValue */
interface ControlledSelectProps extends PrimitiveSelectProps {
  value: string | number | readonly string[];
  defaultValue?: never;
}

/* For uncontrolled select: requires defaultValue, disallows value */
interface UncontrolledSelectProps extends PrimitiveSelectProps {
  value?: never;
  defaultValue?: string | number | readonly string[];
}

export type SelectProps = ControlledSelectProps | UncontrolledSelectProps;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, value, defaultValue, options, ...props }, ref) => {
    const isControlled = value !== undefined;
    
    // Validate that options exist
    if (!options || options.length === 0) {
      console.error("Select component requires non-empty options array");
    }

    return (
      <select
        ref={ref}
        className={styles.select}
        value={isControlled ? value : undefined}
        defaultValue={!isControlled ? defaultValue : undefined}
        {...props}
      >
        {options?.map((option, index) => (
          <option 
            key={`${option.value}-${index}`}
            value={option.value}
            disabled={option.disabled}
            className={styles.select_option}
            
          >
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = "Select";

export const formatSelectOptions = (options: readonly string[]) => {
    return options.map(option => ({
      value: option,
      label: option
    }));
  };