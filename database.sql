
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
    "task_id" INT REFERENCES "task",
    -- positionality of modification is required to deterimine modification value from UI
    "target_table" VARCHAR (100),
    "target_row_id" INTEGER,
    "target_column" VARCHAR (100),
    "modification_value" VARCHAR (2000),
    -- object, each key is a column, one key for put, many for POST
    "modification" VARCHAR(50),
    -- PUT or POST
    "target_complete" BOOLEAN
    -- PUT on success of table modification 
);

CREATE TABLE "constraint"
(
    "constraint_id" serial PRIMARY KEY,
    "task_id" INT REFERENCES "task",
    "constraint_value" VARCHAR(100),
    "constraint_table" VARCHAR (100),
    "constraint_row_id" INTEGER,
    "constraint_column" VARCHAR (100),
    "constraint_table_value" VARCHAR(500),
    "constraint_statement" VARCHAR(100)
);

CREATE TABLE "task"
(
    "task_id" serial PRIMARY KEY,
    "task_name" varchar(100) NOT NULL,
    "description" varchar(1000),
    "create_date" TIMESTAMP NOT NULL,
    "active" BOOLEAN NOT NULL,
    "creator" INT REFERENCES "user"
);
--need to create a single column for 'pallet_name' in incubator
--SELECT * FROM "growing_room"  
--JOIN "pallet_cart" ON "pallet_cart"."cart_id" = "growing_room"."id"
--JOIN "incubator" ON "pallet_cart"."pallet_name" = "incubator";


                -------------------------------------TEST CASES-------------------------------------
--Test 1: Tests a task completion resulting in a POST. Uses two constraints to activate 
INSERT INTO "task" ("task_name", "description", "create_date", "active", "creator")
VALUES ('Incubator to growing room', 'find pallets older than 30 days from the incubator, and transfer to carts in the growing room', current_timestamp, 'false', '1');

INSERT INTO "constraint" ("task_id", "constraint_value", "constraint_table", "constraint_column", "constraint_statement")
VALUES ('1', true, 'incubator', 'active', '=');

INSERT INTO "constraint" ("task_id", "constraint_value", "constraint_table", "constraint_column", "constraint_statement")
VALUES ('1', '30', 'incubator', 'pallet_age', '>=');

INSERT INTO "target" ("task_id", "target_table", "modification_value", "modification", "target_complete")
VALUES ('1', 'growing_room','{cart_name: 1000, start_date: current_timestamp, pallet: "100A, 101B, 101C", first_room: 1, second_room: null, second_transfer: null, compost_date: null, notes: '', active: true}', 'POST', 'false');