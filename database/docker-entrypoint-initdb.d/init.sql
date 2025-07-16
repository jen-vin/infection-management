-- Create the 'reports' table if it doesn't exist
CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    contact_1_id VARCHAR NOT NULL,
    contact_2_id VARCHAR NOT NULL,
    region VARCHAR NOT NULL,
    contact_date DATE NOT NULL,
    risk INTEGER NOT NULL
);

-- Insert sample contact report data
INSERT INTO reports (contact_1_id, contact_2_id, region, contact_date, risk)
VALUES
  ('3f29c7e2-91de-4aef-a123-1a2f3cbb2311', '59b832a9-5432-4c0b-98e6-6f52b72c23d7', 'Berlin',   '2025-07-08', 3),
  ('3f29c7e2-91de-4aef-a123-1a2f3cbb2311', '22c3b7a1-c893-4edc-873f-94347ff917a1', 'Berlin',   '2025-07-07', 2),
  ('f7b2c6c1-ec23-4724-b2b1-2340d36fbea3', '8f9a61b4-002e-42e3-a61b-3f6d5f3e07a1', 'Hamburg',  '2025-07-06', 2),
  ('b9c6e54a-9c1b-43a3-a0f1-d1e1b1a34377', 'fc6dcb2d-b6c7-46a2-bc48-8d2e63a7cd14', 'Hamburg',  '2025-07-09', 1),
  ('a3d79c42-8652-4c66-a05a-4c0cf2e1e713', '0e4d7ef1-8df7-41e7-b5bb-4f4e1a99d343', 'Köln',     '2025-07-08', 2),
  ('98fcbf29-16a2-429b-9615-39458cd38db1', 'de742aaf-cda6-4892-ae8e-b70cdb0a24b9', 'Köln',     '2025-07-10', 3),
  ('cbf413d7-0b51-4fc7-8457-e7e88e6be3a2', '185dffbc-6249-4d86-a4b7-3f27a73095d2', 'München',  '2025-07-09', 3),
  ('27db8aa5-bb4e-4235-bc27-589dd43e5e67', '74e27fbe-8809-4f99-bf29-c3677f8e3f93', 'München',  '2025-07-07', 1),
  ('6fc622d6-d0e4-407f-8928-bfa79ef938af', '8dd2f2d3-dcbf-4a3e-8289-f8a91b2f1793', 'Frankfurt','2025-07-06', 3),
  ('e58a49b2-e497-4e3e-bba0-e739d4c99ad2', 'c734cc47-c5f2-4d7b-84f4-948f177a7773', 'Frankfurt','2025-07-08', 1),
  ('3f29c7e2-91de-4aef-a123-1a2f3cbb2311', 'dd3dc4e7-67d7-48aa-aeaf-9c9626a23cd4', 'Berlin',   '2025-07-10', 2),
  ('cc1c0e76-8d1a-4623-8770-3c0a5f97fd8a', 'ae22cabc-e8d1-4b8f-92cf-4a5d67e2cb11', 'Hamburg',  '2025-07-05', 2),
  ('f6c44d87-3dbb-4194-91f3-6a7fcf66f27a', 'cf42a2ee-924e-4f4a-a8b6-3548f7fbeac9', 'Köln',     '2025-07-09', 3),
  ('b58f678e-b3f6-4953-9b47-95f3279b9b3b', '4c847159-4d7e-45cd-9bcb-50c688f1cb1a', 'München',  '2025-07-10', 3),
  ('13e3b1ac-53e3-4089-97fa-e3c88e4a2b92', 'e671abc5-b5a2-4a96-a3ae-b327b9aaddb3', 'Frankfurt','2025-07-07', 2);

-- Create the 'cases' table
CREATE TABLE IF NOT EXISTS cases (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    age INTEGER NOT NULL,
    status VARCHAR NOT NULL,
    date_reported DATE NOT NULL,
    region VARCHAR NOT NULL,
    symptoms VARCHAR,
    user_app_id VARCHAR NOT NULL,
    contacts INTEGER,
    phone VARCHAR,
    email VARCHAR,
    address VARCHAR,
    test_date DATE,
    test_result VARCHAR,
    notes TEXT,
    contact_history JSONB DEFAULT '[]',
    measures JSONB DEFAULT '[]'
);



-- Insert 30 sample case entries
INSERT INTO cases (name, age, status, date_reported, region, symptoms, user_app_id, contacts, phone, email, address, test_date, test_result, notes, contact_history, measures)
VALUES
  ('Anna Müller', 34, 'confirmed', '2025-07-10', 'Berlin', 'fieber,husten', '3f29c7e2-91de-4aef-a123-1a2f3cbb2311', 3, '017612345678', 'anna@example.com', 'Alexanderplatz 1', '2025-07-09', 'positive', 'leichter Verlauf', '[]', '[]'),
  ('Ben Schulz', 28, 'recovered', '2025-07-05', 'Hamburg', 'kopfweh', 'f7b2c6c1-ec23-4724-b2b1-2340d36fbea3', 2, NULL, 'ben@example.com', NULL, '2025-07-01', 'positive', 'keine weiteren Beschwerden', '[]', '[]'),
  ('Clara Schmidt', 40, 'confirmed', '2025-07-08', 'Köln', 'husten,fieber', 'a3d79c42-8652-4c66-a05a-4c0cf2e1e713', 1, '017912345678', NULL, 'Domstraße 2', '2025-07-07', 'positive', '', '[]', '[]'),
  ('David Weber', 45, 'hospitalized', '2025-07-06', 'Frankfurt', 'atemnot,fieber', '13e3b1ac-53e3-4089-97fa-e3c88e4a2b92', 4, NULL, NULL, 'Zeil 10', '2025-07-05', 'positive', 'intensivstation', '[]', '[]'),
  ('Eva Hoffmann', 31, 'confirmed', '2025-07-09', 'Berlin', 'geschmacksverlust', 'd45a1f67-b67a-45e4-930f-1c441a5d8db2', 2, '016012345678', 'eva@example.com', NULL, '2025-07-08', 'positive', NULL, '[]', '[]'),
  ('Fabian Becker', 52, 'recovered', '2025-06-29', 'München', NULL, 'cbf413d7-0b51-4fc7-8457-e7e88e6be3a2', 0, NULL, NULL, 'Marienplatz 5', '2025-06-25', 'positive', '', '[]', '[]'),
  ('Gina Klein', 26, 'confirmed', '2025-07-07', 'Hamburg', 'husten,halsschmerzen', 'cc1c0e76-8d1a-4623-8770-3c0a5f97fd8a', 1, NULL, NULL, NULL, NULL, NULL, NULL, '[]', '[]'),
  ('Heiko Lange', 61, 'deceased', '2025-07-03', 'Köln', 'fieber,atemnot', 'f6c44d87-3dbb-4194-91f3-6a7fcf66f27a', 5, NULL, NULL, 'Heumarkt 7', '2025-07-01', 'positive', 'Vorerkrankungen', '[]', '[]'),
  ('Isabel König', 29, 'confirmed', '2025-07-08', 'Frankfurt', 'kopfweh,müdigkeit', 'e58a49b2-e497-4e3e-bba0-e739d4c99ad2', 2, '017812345678', NULL, NULL, '2025-07-06', 'positive', NULL, '[]', '[]'),
  ('Jonas Neumann', 37, 'confirmed', '2025-07-09', 'Berlin', 'husten', '9a9237a1-e3cc-4bb1-8e0e-d60fbbc22756', 1, NULL, 'jonas@example.com', NULL, '2025-07-08', 'positive', '', '[]', '[]'),
  ('Klara Wolf', 33, 'confirmed', '2025-07-05', 'Hamburg', NULL, 'b9c6e54a-9c1b-43a3-a0f1-d1e1b1a34377', 1, NULL, NULL, NULL, NULL, NULL, NULL, '[]', '[]'),
  ('Lars Zimmer', 48, 'confirmed', '2025-07-06', 'Köln', 'fieber,gliederschmerzen', '98fcbf29-16a2-429b-9615-39458cd38db1', 3, NULL, NULL, NULL, '2025-07-05', 'positive', NULL, '[]', '[]'),
  ('Mara Böhm', 39, 'recovered', '2025-07-03', 'München', NULL, '27db8aa5-bb4e-4235-bc27-589dd43e5e67', 2, NULL, NULL, NULL, '2025-06-30', 'positive', '', '[]', '[]'),
  ('Nico Vogel', 22, 'confirmed', '2025-07-07', 'Frankfurt', 'geruchsverlust', '6fc622d6-d0e4-407f-8928-bfa79ef938af', 1, NULL, NULL, NULL, '2025-07-06', 'positive', '', '[]', '[]'),
  ('Olivia Brandt', 31, 'confirmed', '2025-07-10', 'Berlin', 'husten', 'aa2be1a7-1a34-4a10-ae8f-0fd1a83cf3f1', 2, NULL, NULL, NULL, NULL, NULL, NULL, '[]', '[]'),
  ('Paul Engel', 50, 'hospitalized', '2025-07-07', 'Hamburg', 'atemnot,fieber', '7d4cf1e9-8b3a-4ac0-9c66-bc249e02a93a', 5, NULL, NULL, 'Universitätsklinikum', '2025-07-06', 'positive', 'kritisch', '[]', '[]'),
  ('Quinn Fuchs', 44, 'confirmed', '2025-07-05', 'Köln', 'husten,gliederschmerzen', 'd37eab90-6e68-4b76-8bcb-bb21cd345278', 3, NULL, NULL, NULL, '2025-07-04', 'positive', NULL, '[]', '[]'),
  ('Rita Herzog', 38, 'confirmed', '2025-07-09', 'München', NULL, '6a6f3b5a-1a32-4b12-8741-48212cdbbdcb', 1, NULL, NULL, NULL, '2025-07-08', 'positive', '', '[]', '[]'),
  ('Sven Jäger', 60, 'recovered', '2025-07-01', 'Frankfurt', NULL, 'f4f6b2e7-6a7d-4917-b6d1-165ab4de9982', 0, NULL, NULL, NULL, '2025-06-27', 'positive', '', '[]', '[]'),
  ('Tina Keller', 35, 'confirmed', '2025-07-08', 'Berlin', 'husten', '7b5c3c88-9959-4c6d-8b8e-246fef0a72fd', 1, NULL, NULL, NULL, NULL, NULL, NULL, '[]', '[]');
