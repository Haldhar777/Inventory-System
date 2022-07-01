const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const SQL = require("sql-template-strings");

const app = express();
app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "7247517280",
  database: "inventorymanagement",
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  db.query(
    "INSERT INTO users (username,password,email) VALUES(?,?,?)",
    [username, password, email],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send("userinfo received by server");
      }
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) {
        res.send({ err: err });
      } else if (results.length > 0) {
        res.send(results);
      } else {
        res.send({ message: "wrong username or password" });
      }
    }
  );
});

app.put("/change", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "UPDATE users SET password = ? WHERE email = ?",
    [password, email],
    (err, results) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(email + " " + password);
      }
    }
  );
  res.send("updated");
});

app.get("/getcategory", (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) {
      res.send({ err: err });
    } else if (results.length > 0) {
      res.send(results);
    } else {
      res.send({ message: "No data found" });
    }
  });
});

app.get("/getproduct", (req, res) => {
  db.query(
    "SELECT products.product_id, categories.name AS category, products.name, products.price, products.stocks FROM products INNER JOIN categories ON products.category_id = categories.id",
    (err, results) => {
      if (err) {
        console.log(err.message);
      } else {
        res.send(results);
      }
    }
  );
});

app.post("/addproduct", (req, res) => {
  const category = req.body.category;
  const name = req.body.name;
  const price = req.body.price;
  const stocks = req.body.stocks;

  db.query(
    "INSERT INTO products (category_id,name,price,stocks) VALUES(?,?,?,?)",
    [category, name, price, stocks],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send("product info added to db");
      }
    }
  );
});

app.post("/addcategory", (req, res) => {
  const name = req.body.name;

  db.query(
    "INSERT INTO categories (name) VALUES(?)",
    [name],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send("category added successfully");
      }
    }
  );
});

app.delete("/deleteproduct/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM products WHERE product_id = ?", id, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send("deleted");
    }
  });
});

app.delete("/deletecategory/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM categories WHERE id = ?", id, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send("deleted");
    }
  });
});

app.listen(3001, () => {
  console.log("server runnint at port 3001");
});
