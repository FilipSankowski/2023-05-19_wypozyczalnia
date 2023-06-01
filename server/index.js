const mysql = require("mysql");
const cors = require("cors");
const express = require("express");
require('dotenv').config({path:'.env'});
const port = 4000;

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_tableName,
  multipleStatements: true
});

app.listen(port, () => {
  console.log("Server works");
});

try {
  createDB();
} catch {
  console.log('Database creation error');
}


// ==============

// By default returns all records from table 'product'
// When called with additional /available will only return records where 'status' = 'available';
// When called with additional /unavailable will only return records where 'status' = 'unavailable';
app.get('/getProducts/:opt', (req, res) => {
  const query = (req.params.opt === 'available' ? 
    `SELECT * FROM product WHERE status = 'available';`
    : req.params.opt === 'unavailable' ? 
      `SELECT * FROM product WHERE status = 'unavailable';`
      : `SELECT * FROM product`);
  pool.query(query, (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});

app.post('/createProduct', (req, res) => {
  const name = req.body.name;
  const price = req.body.price;

  const queryText = `INSERT INTO product (name, price_per_day, status) VALUES ('${name}', '${price}', 'available');`;
  pool.query(queryText, (error, results, fields) => {
    if (error) throw error;
    res.send('done');
  });
})

app.get('/getCustomers', (req, res) => {
  const query = 'SELECT * FROM customer;';
  pool.query(query, (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});

app.post('/createCustomer', (req, res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;

  const queryText = (email ? 
    `INSERT INTO customer (name, surname, email) VALUES ('${name}', '${surname}', '${email}');` 
    : `INSERT INTO customer (name, surname) VALUES ('${name}', '${surname}');`);
  pool.query(queryText, (error, results, fields) => {
    if (error) throw error;
    res.send('done');
  });
})

app.get('/getRentals', (req, res) => {
  /*
  Returns like: {
    id_rental
    id_product
    id_customer
    product
    customer
    rent_date
    return_date
    status
  }
  */
  const query = `SELECT rental.id_rental, rental.id_product, rental.id_customer, product.name AS product, CONCAT(customer.name, ' ', customer.surname) AS	customer, rental.rent_date, rental.return_date, rental.status
  FROM rental
  JOIN product ON rental.id_product = product.id_product
  JOIN customer ON rental.id_customer = customer.id_customer`;
  pool.query(query, (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});

// Creates new record in table 'rental' and updates record in table 'product' identified by id_product
// to have 'status' = 'unavailable'
app.post('/createRental', (req, res) => {
  const id_product = req.body.id_product;
  const id_customer = req.body.id_customer;

  const queryText = `INSERT INTO rental (id_product, id_customer, rent_date, status) 
  VALUES ('${id_product}', '${id_customer}', CURRENT_DATE(), 'pending');
  UPDATE product SET status = 'unavailable' WHERE id_product = ${id_product};`
  pool.query(queryText, (error, results, fields) => {
    if (error) throw error;
    res.send('done');
  });
})

// Updates record from 'rental' table with id_product and 'status' = pending to have return_date match
// current date, and 'status' = 'completed',
// Sets 'return_date' to current date and record in table 'product' identified by id_product to have 
// 'status' = 'available'
app.post('/completeRental', (req, res) => {
  const id_product = req.body.id_product;

  const queryText = `UPDATE rental SET return_date = CURRENT_DATE() WHERE id_product = '${id_product}' AND status = 'pending';
  UPDATE rental SET status = 'completed' WHERE id_product = '${id_product}' AND status = 'pending';
  UPDATE product SET status = 'available' WHERE id_product = '${id_product}';`;
  pool.query(queryText, (error, results, fields) => {
    if (error) throw error;
    res.send('done');
  });
})

// ==============

// Creates database 'wypozyczalnia' if it doesn't exist
function createDB() {
  // Make different connection, not to specific database but server as a whole
  const connection = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    multipleStatements: true
  });

  connection.connect();

  // Creates database 'wypozyczalnia'. Adds default 'Dobry film' product
  const query = `CREATE DATABASE IF NOT EXISTS wypozyczalnia; 
    USE wypozyczalnia;
    CREATE TABLE IF NOT EXISTS product (
      id_product int(10) UNSIGNED AUTO_INCREMENT NOT NULL,
      name varchar(50) NOT NULL,
      price float(5) NOT NULL,
      status enum('available', 'unavailable'),
      PRIMARY KEY (id_product)
    );
    CREATE TABLE IF NOT EXISTS customer (
      id_customer int(10) UNSIGNED AUTO_INCREMENT NOT NULL,
      name varchar(30) NOT NULL,
      surname varchar(50) NOT NULL,
      email varchar(50),
      PRIMARY KEY (id_customer)
    );
    CREATE TABLE IF NOT EXISTS rental (
      id_rental int(10) UNSIGNED AUTO_INCREMENT NOT NULL,
      id_product int(10) UNSIGNED NOT NULL,
      id_customer int(10) UNSIGNED NOT NULL,
      rent_date date NOT NULL,
      return_date date,
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