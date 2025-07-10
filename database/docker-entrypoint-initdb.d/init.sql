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
  ('d45a1f67-b67a-45e4-930f-1c441a5d8db2', '22c3b7a1-c893-4edc-873f-94347ff917a1', 'Berlin',   '2025-07-07', 2),
  ('f7b2c6c1-ec23-4724-b2b1-2340d36fbea3', '8f9a61b4-002e-42e3-a61b-3f6d5f3e07a1', 'Hamburg',  '2025-07-06', 2),
  ('b9c6e54a-9c1b-43a3-a0f1-d1e1b1a34377', 'fc6dcb2d-b6c7-46a2-bc48-8d2e63a7cd14', 'Hamburg',  '2025-07-09', 1),
  ('a3d79c42-8652-4c66-a05a-4c0cf2e1e713', '0e4d7ef1-8df7-41e7-b5bb-4f4e1a99d343', 'Köln',     '2025-07-08', 2),
  ('98fcbf29-16a2-429b-9615-39458cd38db1', 'de742aaf-cda6-4892-ae8e-b70cdb0a24b9', 'Köln',     '2025-07-10', 3),
  ('cbf413d7-0b51-4fc7-8457-e7e88e6be3a2', '185dffbc-6249-4d86-a4b7-3f27a73095d2', 'München',  '2025-07-09', 3),
  ('27db8aa5-bb4e-4235-bc27-589dd43e5e67', '74e27fbe-8809-4f99-bf29-c3677f8e3f93', 'München',  '2025-07-07', 1),
  ('6fc622d6-d0e4-407f-8928-bfa79ef938af', '8dd2f2d3-dcbf-4a3e-8289-f8a91b2f1793', 'Frankfurt','2025-07-06', 3),
  ('e58a49b2-e497-4e3e-bba0-e739d4c99ad2', 'c734cc47-c5f2-4d7b-84f4-948f177a7773', 'Frankfurt','2025-07-08', 1),
  ('9a9237a1-e3cc-4bb1-8e0e-d60fbbc22756', 'dd3dc4e7-67d7-48aa-aeaf-9c9626a23cd4', 'Berlin',   '2025-07-10', 2),
  ('cc1c0e76-8d1a-4623-8770-3c0a5f97fd8a', 'ae22cabc-e8d1-4b8f-92cf-4a5d67e2cb11', 'Hamburg',  '2025-07-05', 2),
  ('f6c44d87-3dbb-4194-91f3-6a7fcf66f27a', 'cf42a2ee-924e-4f4a-a8b6-3548f7fbeac9', 'Köln',     '2025-07-09', 3),
  ('b58f678e-b3f6-4953-9b47-95f3279b9b3b', '4c847159-4d7e-45cd-9bcb-50c688f1cb1a', 'München',  '2025-07-10', 3),
  ('13e3b1ac-53e3-4089-97fa-e3c88e4a2b92', 'e671abc5-b5a2-4a96-a3ae-b327b9aaddb3', 'Frankfurt','2025-07-07', 2);
