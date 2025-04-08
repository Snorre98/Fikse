INSERT INTO "public"."SupportedCountries"
    (country)
VALUES
    ('Norway'),
    ('England'),
    ('Sweden'),
    ('Denmark'),
    ('Finland'),
    ('Germany')
ON CONFLICT (country) DO NOTHING;

INSERT INTO "public"."SupportedLanguages"
    (language)
VALUES
    ('Norwegian'),
    ('English'),
    ('Swedish'),
    ('Danish'),
    ('Finnish'),
    ('German')
ON CONFLICT (language) DO NOTHING;


-- Insert into CountryVAT table first (due to foreign key constraint)
INSERT INTO "public"."CountryVAT"
    (country, vat)
VALUES 
    ('Norway', 25)
ON CONFLICT (country) DO NOTHING;

-- Insert into BusinessAccount table
INSERT INTO "public"."BusinessAccount"
    (country, org_number, business_name, person_fullname, phonenumber, email, language)
VALUES 
    ('Norway', '999999999', 'TEST', 'TEST TEST', '+4748904890', 'email@example.com', 'Norwegian')
ON CONFLICT (org_number) DO NOTHING;