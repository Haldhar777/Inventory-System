import React, { useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

// Since routes are regular React components, they
// may be rendered anywhere in the app, including in
// child elements.
//
// This helps when it's time to code-split your app
// into multiple bundles because code-splitting a
// React Router app is the same as code-splitting
// any other React app.

export default function NestingExample() {
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
          <Route path="/register">
            <Topics />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const Homepage = () => {
  return (
    <div>
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
    <div>
      <label htmlFor="user">Username:</label>
      <br />
      <input
        id="user"
        type="text"
        onChange={(e) => setuserName(e.target.value)}
      ></input>
      <br />
      <label htmlFor="pass">Password:</label>
      <br />
      <input
        id="pass"
        type="password"
        onChange={(e) => setpassWord(e.target.value)}
      ></input>
      <br />
      <button onClick={checkUser}>Login</button>
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
          <Link to="/user">Click here</Link>
        </div>
      )}
    </div>
  );
}

const User = (props) => {
  let { path, url } = useRouteMatch();
  return (
    <div>
      <Link to={`${url}/products`}>Products</Link>
      <br />
      <Link to={`${url}/categories`}>Categories</Link>
      <br />
      <Link to={`${url}/addproducts`}>Add Products</Link>
      <br />
      <Link to={`${url}/addcategory`}>Add Category</Link>
      <br />

      <Switch>
        <Route path={`${path}/products`}>
          <Products />
        </Route>
        {/* <Route path={`${path}/categories`}>
          <Categories />
        </Route>
        <Route path={`${path}/addproducts`}>
          <Addproducts />
        </Route>
        <Route path={`${path}/addcategories`}>
          <Addcategories />
        </Route> */}
      </Switch>
    </div>
  );
};

const Products = () => {
  const [productList, setproductList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);

  return (
    <div>
      {productList.map((val, key) => {
        return (
          <div className="list">
            <h3>Name: {val.name}</h3>
            <h3>Price: {val.price}</h3>
            <h3>Stocks: {val.stock}</h3>
          </div>
        );
      })}
    </div>
  );
};

const Methods = () => {
  let { userFn } = useParams();
  return (
    <div>
      <h2>{userFn}</h2>
    </div>
  );
};

const Register = () => {
  const [username, setuserName] = useState("");
  const [password, setpassWord] = useState("");
  const [email, setEmail] = useState("");

  const reg = () => {
    axios
      .post("http://localhost:3001/register", {
        username: username,
        password: password,
        email: email,
      })
      .then((response) => {
        console.log("userinfo sent from client");
      });
  };
  return (
    <div>
      <label htmlFor="name">Username:</label>
      <br />
      <input
        onChange={(e) => setuserName(e.target.value)}
        id="name"
        type="text"
      ></input>
      <br />
      <label htmlFor="email">Email:</label>
      <br />
      <input
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        type="text"
      ></input>
      <br />
      <label htmlFor="pass">Password:</label>
      <br />
      <input
        onChange={(e) => setpassWord(e.target.value)}
        id="pass"
        type="text"
      ></input>
      <br />
      <label htmlFor="confirm">Confirm Password:</label>
      <br />
      <input id="confirm" type="text"></input>
      <br />
      <button onClick={reg}>Register</button>
      <br />
    </div>
  );
};

const ChangePass = () => {
  const [username, setuserName] = useState("");
  const [password, setpassWord] = useState("");
  const [confirmpass, setconfirmPass] = useState("");

  const cngPassword = () => {
    axios
      .put("http://localhost:3001/change", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div>
      <h2>Change Password</h2>

      <label htmlFor="user">Enter Username</label>
      <br />
      <input
        onChange={(e) => setuserName(e.target.value)}
        id="user"
        type="text"
      ></input>
      <br />
      <label htmlFor="pass">Enter New Password</label>
      <br />
      <input
        onChange={(e) => setpassWord(e.target.value)}
        id="pass"
        type="password"
      ></input>
      <br />
      <label htmlFor="confirm">Confirm Password</label>
      <br />
      <input
        onChange={(e) => setconfirmPass(e.target.value)}
        id="confirm"
        type="password"
      ></input>
      <br />
      <button onClick={cngPassword}>Change Password</button>
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

function Topics() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.

  let { path, url } = useRouteMatch();
  return (
    <div>
      <Link to={`${url}/topic1`}>Topic1</Link>
      <Link to={`${url}/topic2`}>Topic2</Link>
      <Link to={`${url}/topic3`}>Topic3</Link>
      <Switch>
        <Route path={`${path}/:topicId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { topicId } = useParams();

  return (
    <div>
      <h3>{topicId}</h3>
    </div>
  );
}
