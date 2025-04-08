revoke delete on table "public"."SupportedCountries" from "anon";

revoke insert on table "public"."SupportedCountries" from "anon";

revoke references on table "public"."SupportedCountries" from "anon";

revoke select on table "public"."SupportedCountries" from "anon";

revoke trigger on table "public"."SupportedCountries" from "anon";

revoke truncate on table "public"."SupportedCountries" from "anon";

revoke update on table "public"."SupportedCountries" from "anon";

revoke delete on table "public"."SupportedCountries" from "authenticated";

revoke insert on table "public"."SupportedCountries" from "authenticated";

revoke references on table "public"."SupportedCountries" from "authenticated";

revoke select on table "public"."SupportedCountries" from "authenticated";

revoke trigger on table "public"."SupportedCountries" from "authenticated";

revoke truncate on table "public"."SupportedCountries" from "authenticated";

revoke update on table "public"."SupportedCountries" from "authenticated";

revoke delete on table "public"."SupportedCountries" from "service_role";

revoke insert on table "public"."SupportedCountries" from "service_role";

revoke references on table "public"."SupportedCountries" from "service_role";

revoke select on table "public"."SupportedCountries" from "service_role";

revoke trigger on table "public"."SupportedCountries" from "service_role";

revoke truncate on table "public"."SupportedCountries" from "service_role";

revoke update on table "public"."SupportedCountries" from "service_role";

alter table "public"."CountryVAT" drop constraint "CountryVAT_country_fkey";

alter table "public"."SupportedCountries" drop constraint "SupportedCountries_country_key";

alter table "public"."SupportedCountries" drop constraint "SupportedCountries_pkey";

drop index if exists "public"."SupportedCountries_country_key";

drop index if exists "public"."SupportedCountries_pkey";

drop table "public"."SupportedCountries";


