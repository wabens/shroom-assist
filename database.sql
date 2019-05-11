-- This file does not include any data informing a growing proccess.
-- I do not feel comfortable publicizing Mississippi Mushroom data.
-- Howerever queries for creating similar data tables is included.

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
    "modification_value" JSON,
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

-- Growing process tables
CREATE TABLE "incubator"
(
    "id" SERIAL PRIMARY KEY,
    "pallet_num" INTEGER,
    "group" VARCHAR(100),
    "bag_count" INTEGER,
    "pallet_age" INTEGER,
    "species" VARCHAR(200),
    "final_bag_count" INTEGER,
    "creation_date" TIMESTAMP,
    "cart_transfer" VARCHAR(200),
    "active" BOOLEAN,
    "uncolonized_count" INTEGER,
    "none_count" INTEGER,
    "none_type" VARCHAR(100),
    "red_count" INTEGER,
    "red_type" VARCHAR(100),
    "green_count" INTEGER,
    "green_type" VARCHAR(100),
    "blue_count" INTEGER,
    "blue_type" VARCHAR(100),
    "transfer_count" INTEGER
);

CREATE TABLE "growing_room"
(
    "id" SERIAL PRIMARY KEY,
    "cart_id" INTEGER,
    "start_date" TIMESTAMP,
    "pallet" VARCHAR(1000),
    "1st_room" INTEGER,
    "2nd_room" INTEGER,
    "2nd_transfer" TIMESTAMP,
    "compost_date" TIMESTAMP,
    "notes" VARCHAR(1000),
    "active" BOOLEAN
);

-- Example of a task set
-- Test 1: Tests a task completion resulting in a POST. Uses two constraints to activate 

INSERT INTO "task" ("task_name", "description", "create_date", "active", "creator")
VALUES ('Incubator to growing room', 'find pallets older than 30 days from the incubator, and transfer to carts in the growing room', current_timestamp, 'false', '1');

INSERT INTO "constraint" ("task_id", "constraint_table", "constraint_column", "constraint_comparison")
VALUES ('1', 'incubator', 'active', '{"comparison": "=", "value":true}');

INSERT INTO "constraint" ("task_id", "constraint_table","constraint_column", "constraint_comparison")
VALUES ('1', 'incubator', 'pallet_age','{"comparison": "<=", "value": 30}');

INSERT INTO "target" ("task_id", "target_table", "target_column", "modification_value", "modification", "target_complete")
VALUES ('1', 'growing_room', ARRAY ['id', 'cart_name', 'start_date', 'pallet', 'first_room', 'second_room', 'second_transfer', 'compost_date', 'notes', 'active'], '{"cart_name":1000,"start_date":"","pallet":"100A, 101B, 101C","first_room":1,"second_room":null,"second_transfer":null,"compost_date":null,"notes":"","active":true}', 'POST', 'false');

INSERT INTO "target" ("task_id", "target_table", "target_column", "modification_value", "modification", "target_complete")
VALUES ('1', 'incubate', ARRAY ['active'], '{"row_id": null,"active": false}', 'PUT', 'false');