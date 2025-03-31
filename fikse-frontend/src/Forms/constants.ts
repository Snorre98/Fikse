import { z } from "zod";

export const COUNTRY = z.string().min(1);
export const ORG_NR = z.number().int().min(1).max(20);
export const ORG_NAME = z.string().min(1);
export const FULL_NAME = z.string().min(1);
export const PHONE_NR = z.number().int().min(1).max(20);
export const EMAIL = z.string().min(1);
export const LANGUAGE = z.string().min(1);