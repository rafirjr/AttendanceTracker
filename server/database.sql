CREATE DATABASE CVShantScouts;

--set extension uuid-ossp
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

--insert users
INSERT INTO  users (user_name, user_email, user_password) VALUES ('Rafi Rajoyan', 'rafirjr@gmail.com', 'password');

CREATE TYPE gark AS ENUM('Norendza', 'Pen Gark', 'Ayp Gark', 'Vgayal', 'Araratyan');
CREATE TYPE astijan AS ENUM('Pokh Arachnort', 'Arachnort', 'Vareech Arachnort', 'Pokh Khmpabed', 'Khmpabed');
CREATE TYPE bashdon AS ENUM('Arachnort', 'Vareech Arachnort', 'Pokh Khmpabed', 'Khmpabed', 'Miavori', 'Pokh Masnajooghi Khmpabed', 'Masnajooghi Khmpabed');
CREATE TYPE khoump AS ENUM('Kylig', 'Ardzvig', 'Ari', 'Arenoush', 'Yeretz', 'Barmanouhi');

--Khmpabed Table
CREATE TABLE khmpabeds(
    scout_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    gark gark,
    astijan astijan,
    bashdon bashdon,
    khoump khoump,
    cell VARCHAR(50)
);

--Scout Master Roster Table
CREATE TABLE roster(
    scout_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    khoump khoump,
    gark gark,
    date_of_birth DATE NOT NULL,
    street VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zip_code VARCHAR(255),
    contact_number VARCHAR(50),
    parent_name_one VARCHAR(255),
    parent_cell_one VARCHAR(50),
    parent_email_one VARCHAR(255),
    parent_name_two VARCHAR(255),
    parent_cell_two VARCHAR(50),
    parent_email_two VARCHAR(255),
    allergies VARCHAR(255)
);

--Attendance Table
CREATE TABLE attendance(
    date DATE NOT NULL,
    scout_id uuid FOREIGN KEY REFERENCES roster(scout_id) khmpabeds(scout_id),
    uniform ENUM('Yes', 'No'),
    paid ENUM('Yes', 'No')
)