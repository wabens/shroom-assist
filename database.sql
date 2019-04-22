
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "admin" BOOLEAN DEFAULT 'true'
);

CREATE TABLE "target"
(
    "target_id" serial PRIMARY KEY,
    "target_table" VARCHAR (100),
    "target_column" VARCHAR (100),
    "statement" VARCHAR(100)
);

CREATE TABLE "constraint"
(
    "constraint_id" serial PRIMARY KEY,
    "constraint_table" VARCHAR (100),
    "constraint_column" VARCHAR (100),
    "statement" VARCHAR(100)
);

CREATE TABLE "task"
(
    "task_id" serial PRIMARY KEY,
    "task_name" varchar(100) NOT NULL,
    "create_date" TIMESTAMP NOT NULL,
    "active" BOOLEAN NOT NULL,
    "constraint" INT REFERENCES "constraint",
    "target" INT REFERENCES "target",
    "creator" INT REFERENCES "user"
);

--need to create a single column for 'pallet_name' in incubator
--SELECT * FROM "growing_room"  
--JOIN "pallet_cart" ON "pallet_cart"."cart_id" = "growing_room"."id"
--JOIN "incubator" ON "pallet_cart"."pallet_name" = "incubator";