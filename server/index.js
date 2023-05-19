const mysql = require("mysql");
const cors = require("cors");
const express = require("express");
require('dotenv').config({path:'.env'});
const port = 4000;

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_tableName
});

app.listen(port, () => {
  console.log("Server works");
});

// ==============

// app.gets go there...

// ==============

/*
function sample() {
  connection.connect();

  const query = '';
  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  });

  connection.end();
}
*/

function createDB() {
  connection.connect();

  const query = `CREATE DATABASE wypozyczalnia;
    USE wypozyczalnia;
    CREATE TABLE product (
      id_product int(10) UNSIGNED AUTO_INCREMENT NOT NULL,
      name varchar(50) NOT NULL,
      price_per_day float(5) NOT NULL,
      status enum('available', 'unavailable'),
      PRIMARY KEY (id_product)
    );
    CREATE TABLE customer (
      id_customer int(10) UNSIGNED AUTO_INCREMENT NOT NULL,
      name varchar(30) NOT NULL,
      surname varchar(50) NOT NULL,
      email varchar(50),
      PRIMARY KEY (id_customer)
    );
    CREATE TABLE rental (
      id_rental int(10) UNSIGNED AUTO_INCREMENT NOT NULL,
      id_product int(10) UNSIGNED NOT NULL,
      id_customer int(10) UNSIGNED NOT NULL,
      rent_date date NOT NULL,
      return_date date NOT NULL,
      status enum('pending', 'completed'),
      PRIMARY KEY (id_rental),
      FOREIGN KEY (id_product) REFERENCES product(id_product),
      FOREIGN KEY (id_customer) REFERENCES customer(id_customer)
    );`;

  connection.query(query, (error, results, fields) => {
    if (error) throw error;
  });

  connection.end();
}