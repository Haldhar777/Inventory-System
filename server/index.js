const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

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
        console.log("userinfo received");
      }
    }
  );

  res.send("userinfo received by server");
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
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "UPDATE users SET password = ? WHERE username = ?",
    [username, password],
    (err, results) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(username + " " + password);
      }
    }
  );
  res.send("updated");
});

app.listen(3001, () => {
  console.log("server runnint at port 3001");
});
