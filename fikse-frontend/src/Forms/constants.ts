import { z } from "zod";
import { validateNorwegianOrgNumber } from "./utils";

// https://github.com/mnestorov/regex-patterns#norway
// - `^NO\d{9}MVA$`
// - `^\d{4}$`
// - `^\+47[2-9][0-9]{7,8}$`
const PHONENUMBER_REGEX = /^(0047|\+47|47)?[2-9]\d{7}$/;

export const COUNTRY = z
  .string()
  .min(1, "Country is required")
  .refine((val) => val !== "Country", {
    message: "Please select a country"
  });
export const ORG_NR = z
	.string()
	.min(1, "Organization number is required")
	.refine((val) => validateNorwegianOrgNumber(val), {
		message: "Invalid Norwegian organization number",
	});
export const ORG_NAME = z.string().min(1, "Organization name is required");
export const FULL_NAME = z.string().min(1, "Full name is required");
export const PHONE_NR = z.string().regex(PHONENUMBER_REGEX, "Invalid Norwegian phone number format");

export const EMAIL = z
	.string()
	.min(1, "Email is required")
	.email("Invalid email format");

	export const LANGUAGE = z
	.string()
	.min(1, "Language is required")
	.refine((val) => val !== "Language", {
	  message: "Please select a language"
	});
