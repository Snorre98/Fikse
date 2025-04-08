alter table "public"."CountryVAT" add constraint "CountryVAT_country_fkey" FOREIGN KEY (country) REFERENCES "SupportedCountries"(country) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."CountryVAT" validate constraint "CountryVAT_country_fkey";


