import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  Redirect,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/changepass">
            <ChangePass />
          </Route>
          <Route path="/user">
            <User />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const Homepage = () => {
  return (
    <div className=" text-center">
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
      <br />
      <Link to="/changepass">Change Password</Link>
    </div>
  );
};

function Login() {
  let { path, url } = useRouteMatch();
  const [username, setuserName] = useState("");
  const [password, setpassWord] = useState("");

  const [loginStatus, setloginStatus] = useState(null);

  const checkUser = () => {
    axios
      .post("http://localhost:3001/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.message) {
          setloginStatus(0);
        } else {
          setloginStatus(1);
        }
      });
  };
  return (
    <div className="text-center">
      <label htmlFor="user">Username:</label>
      <br />
      <input
        className=" border-2 border-black"
        id="user"
        type="text"
        onChange={(e) => setuserName(e.target.value)}
      ></input>
      <br />
      <label htmlFor="pass">Password:</label>
      <br />
      <input
        className=" border-2 border-black"
        id="pass"
        type="password"
        onChange={(e) => setpassWord(e.target.value)}
      ></input>
      <br />
      <button className="border-2 border-black my-2 px-2" onClick={checkUser}>
        Login
      </button>
      <br />
      <Link to={`${url}/forget`}>Forgot Password?</Link>
      <Switch>
        <Route path={`${path}/forget`}>
          <Forget />
        </Route>
      </Switch>

      {!loginStatus ? (
        <p>
          User not found, check name and pass again.
          <br />
          Or click on forgot Password.
        </p>
      ) : (
        <div>
          <h2>Verification Successfull</h2>
          <Link className=" text-blue-600" to="/user">
            Click here
          </Link>
        </div>
      )}
    </div>
  );
}

const User = (props) => {
  let { path, url } = useRouteMatch();
  return (
    <div>
      <div className="flex justify-evenly p-2">
        <Link to={`${url}/products`}>Products</Link>
        <br />
        <Link to={`${url}/categories`}>Categories</Link>
        <br />
        <Link to={`${url}/addproducts`}>Add Products</Link>
        <br />
        <Link to={`${url}/addcategory`}>Add Category</Link>
        <br />
        <Link to={`${url}/logout`}>Logout</Link>
      </div>

      <Switch>
        <Route path={`${path}/products`}>
          <Products />
        </Route>
        <Route path={`${path}/categories`}>
          <Categories />
        </Route>
        <Route path={`${path}/addproducts`}>
          <Addproducts />
        </Route>
        <Route path={`${path}/addcategory`}>
          <Addcategories />
        </Route>
        <Route path={`${path}/logout`}>
          <Logout />
        </Route>
      </Switch>
    </div>
  );
};

const Logout = () => {
  return <Redirect to="/" />;
};

const Addcategories = () => {
  const [name, setName] = useState("");

  const addCategory = () => {
    axios
      .post("http://localhost:3001/addcategory", {
        name: name,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div className="text-center my-8">
      <label htmlFor="category">Enter new category name:</label>
      <br />
      <input
        className="border-2 border-black"
        type="text"
        required
        id="category"
        onChange={(e) => setName(e.target.value)}
      ></input>
      <br />
      <button className="border-2 border-black my-2 px-2" onClick={addCategory}>
        Add Category
      </button>
    </div>
  );
};

const Addproducts = () => {
  const [categoryList, setcategoryList] = useState([]);
  const [category, setCategory] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stocks, setStocks] = useState(0);

  const getCategories = () => {
    axios.get("http://localhost:3001/getcategory").then((response) => {
      setcategoryList(response.data);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const addProduct = () => {
    axios
      .post("http://localhost:3001/addproduct", {
        category: category,
        name: name,
        price: price,
        stocks: stocks,
      })
      .then((response) => {
        console.log("product info sent from client");
        console.log(response.data);
      });
  };

  return (
    <div className="text-center mt-8">
      <label htmlFor="category">Select Category:</label>
      <br />
      <select
        className="border-2 border-black"
        id="category"
        name="category"
        onChange={(e) => setCategory(e.target.value)}
      >
        {categoryList.map((val, index) => {
          return (
            <option key={index} value={val.id}>
              {val.name}
            </option>
          );
        })}
      </select>
      <br />
      <br />
      <label htmlFor="name">Enter product title:</label>
      <br />
      <input
        className="border-2 border-black"
        type="text"
        id="name"
        onChange={(e) => setName(e.target.value)}
        required
      ></input>{" "}
      <br />
      <label htmlFor="price">Enter product price:</label>
      <br />
      <input
        className="border-2 border-black"
        type="number"
        id="price"
        onChange={(e) => setPrice(e.target.value)}
        required
      ></input>{" "}
      <br />
      <label htmlFor="stocks">Enter product stocks:</label>
      <br />
      <input
        className="border-2 border-black"
        type="number"
        id="stocks"
        onChange={(e) => setStocks(e.target.value)}
        required
      ></input>{" "}
      <br />
      <button className="border-2 border-black my-2 px-2" onClick={addProduct}>
        Add product
      </button>
    </div>
  );
};

const Products = () => {
  const [productList, setproductList] = useState([]);
  const getProducts = () => {
    axios.get("http://localhost:3001/getproduct").then((response) => {
      setproductList(response.data);
      console.log(response.data);
    });
  };

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:3001/deleteproduct/${id}`)
      .then((response) => {
        console.log("product deleted");
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      {productList.map((val, index) => {
        return (
          <div key={index} className="border-2 border-black m-2">
            <h2>
              {val.product_id}.&ensp;Category: {val.category}
              &ensp;Title: {val.name}
              &ensp; Price: {val.price}
              &ensp;Stocks: {val.stocks}
            </h2>
            <button
              className="border-2 border-gray-600 ml-6 mb-1 text-sm "
              onClick={() => deleteProduct(val.product_id)}
            >
              Delete Product
            </button>
          </div>
        );
      })}
    </div>
  );
};

const Categories = () => {
  const [categoryList, setcategoryList] = useState([]);

  const getCategories = () => {
    axios.get("http://localhost:3001/getcategory").then((response) => {
      setcategoryList(response.data);
    });
  };

  const deleteCategory = (id) => {
    axios
      .delete(`http://localhost:3001/deletecategory/${id}`)
      .then((response) => {
        console.log(response.data);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      {categoryList.map((val, index) => {
        return (
          <div key={index}>
            <div className="border-2 border-black m-2 flex justify-between">
              &nbsp;{val.id}.&ensp;{val.name}
              <button
                className="border-2 border-gray-600"
                onClick={() => deleteCategory(val.id)}
              >
                Delete Category
              </button>
            </div>
            {/* <h2>No. of Products:{val.total}</h2> */}
          </div>
        );
      })}
    </div>
  );
};

const Register = () => {
  const [username, setuserName] = useState("");
  const [password, setpassWord] = useState("");
  const [confirmpass, setconfirmPass] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");

  const reg = () => {
    password !== confirmpass
      ? setStatus("Passwords do not match")
      : axios
          .post("http://localhost:3001/register", {
            username: username,
            password: password,
            email: email,
          })
          .then((response) => {
            console.log("userinfo sent from client");
            setStatus("User registered Successfully");
          });
  };
  return (
    <div className="text-center">
      <label htmlFor="name">Username:</label>
      <br />
      <input
        className="border-2 border-black"
        onChange={(e) => setuserName(e.target.value)}
        id="name"
        type="text"
      ></input>
      <br />
      <label htmlFor="email">Email:</label>
      <br />
      <input
        className="border-2 border-black"
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        type="text"
      ></input>
      <br />
      <label htmlFor="pass">Password:</label>
      <br />
      <input
        className="border-2 border-black"
        onChange={(e) => setpassWord(e.target.value)}
        id="pass"
        type="text"
      ></input>
      <br />
      <label htmlFor="confirm">Confirm Password:</label>
      <br />
      <input
        className="border-2 border-black"
        id="confirm"
        onChange={(e) => setconfirmPass(e.target.value)}
        type="text"
      ></input>
      <br />
      <button className="border-2 border-black my-2 px-2" onClick={reg}>
        Register
      </button>
      <br />
      <div>{status}</div>
    </div>
  );
};

const ChangePass = () => {
  const [email, setEmail] = useState("");
  const [password, setpassWord] = useState("");
  const [confirmpass, setconfirmPass] = useState("");
  const [status, setStatus] = useState("");

  const cngPassword = () => {
    if (password !== confirmpass) {
      setStatus("Passwords do not match.");
    } else {
      axios
        .put("http://localhost:3001/change", {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          setStatus("Password updated succesfully");
        });
    }
  };

  return (
    <div className="text-center">
      <h2>Change Password</h2>

      <label htmlFor="user">Enter E-mail id</label>
      <br />
      <input
        className="border-2 border-black"
        onChange={(e) => setEmail(e.target.value)}
        id="user"
        type="text"
      ></input>
      <br />
      <label htmlFor="pass">Enter New Password</label>
      <br />
      <input
        className="border-2 border-black"
        onChange={(e) => setpassWord(e.target.value)}
        id="pass"
        type="password"
      ></input>
      <br />
      <label htmlFor="confirm">Confirm Password</label>
      <br />
      <input
        className="border-2 border-black"
        onChange={(e) => setconfirmPass(e.target.value)}
        id="confirm"
        type="password"
      ></input>
      <br />
      <button className="border-2 border-black my-2 px-2" onClick={cngPassword}>
        Change Password
      </button>
      <div>
        <h2>{status}</h2>
      </div>
    </div>
  );
};

const Forget = () => {
  return (
    <div>
      <h3>Verify email and then send credentials</h3>
    </div>
  );
};
