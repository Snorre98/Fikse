import React from "react";
import styles from "./Input.module.scss";
import classNames from "classnames";

interface PrimitiveInputProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"values" | "defaultValues"
	> {
	className?: string;
	type?: React.HTMLInputTypeAttribute;
}

/* For controlled input. This requires value, as value MUST come from the controlling component */
/* Disallows defaultValue */
interface ControlledInputProps extends PrimitiveInputProps {
	value: string | number | readonly string[];
	defaultValue?: never;
}

/* For uncontrolled input: requires defaultValue, dissalows value */
interface UncontrolledInputProps extends PrimitiveInputProps {
	value?: never;
	defaultValue?: string | number | readonly string[];
}

export type InputProps = ControlledInputProps | UncontrolledInputProps;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, value, defaultValue, ...props }, ref) => {
		const isControlled = value !== undefined;

		const styleMap: Record<string, string> = {
			email: styles.email,
			number: styles.number,
			text: styles.text,
			submit: styles.submit,
		};

		return (
			<input
				ref={ref}
				type={type}
				className={classNames(type && styleMap[type], className)}
				value={isControlled ? value : undefined}
				defaultValue={!isControlled ? defaultValue : undefined}
				{...props}
			/>
		);
	},
);

Input.displayName = "Input";
