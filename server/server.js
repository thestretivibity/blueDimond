import { createRequire } from "module";
import apiConsume from "./API/apiConsume.js";
const require = createRequire(import.meta.url);
const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router("./database.json");
const userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));
const cors = require("cors");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "123456789";

const expiresIn = "100h";

function creatRefreshToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "60000s" });
}

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Verify the refresh token

function verifyRefresh(token, email) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded.email === email;
  } catch (error) {
    // console.error(error);
    return false;
  }
}
// Check if the user exists in database
function isAuthenticated({ email, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

// Register New User
server.post("/auth/register", (req, res) => {
  console.log("register endpoint called; request body:");
  console.log(req.body);
  const { email, password } = req.body;

  if (isAuthenticated({ email, password }) === true) {
    const status = 401;
    const message = "Email and Password already exist";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    // Get current users data
    var data = JSON.parse(data.toString());

    // Get the id of last user
    var last_item_id = data.users[data.users.length - 1].id;

    //Add new user
    data.users.push({ id: last_item_id + 1, email: email, password: password }); //add some data
    var writeData = fs.writeFile(
      "./users.json",
      JSON.stringify(data),
      (err, result) => {
        // WRITE
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });

  // Create token for new user
  const access_token = createToken({ email });
  console.log("Access Token:" + access_token);
  const refresh_token = creatRefreshToken({ email });
  res.status(200).json({ access_token, expiresIn, refresh_token });
});

// Login to one of the users from ./users.json
server.post("/auth/login", (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const { email, password } = req.body;
  if (isAuthenticated({ email, password }) === false) {
    const status = 401;
    const message = "Incorrect email or password";
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({ email });
  const refresh_token = creatRefreshToken({ email });

  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token, expiresIn, refresh_token });
});

// this to get to get a token by the refresh token
server.get("/auth/refresh", (req, res) => {
  const r = req.query.refresh_token;
  const e = req.query.email;
  if (verifyRefresh(r, e)) {
    const access_token = createToken({ e });
    res.status(200).json({ access_token, refresh_token: r });
    return;
  }
  res.status(400).json({ erro: "revoked" });
  return;
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 403;
    const message = "Error in authorization format";
    res.status(status).json({ status, message });
    return;
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(" ")[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 403;
      const message = "Access token not provided";
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 403;
    const message = "Error access_token is revoked";
    res.status(status).json({ status, message });
  }
});

server.get("/nyt/getArticles", (req, res) => {
  const category = req.query.category;

  const _ = (async () => {
    try {
      const response = await apiConsume.getArticles(category);
      console.log(category);
      res.json(response.data);
      return;
    } catch (error) {
      console.log(error);
    }
  })();

  return;
});

server.get("/nyt/searchArticles", (req, res) => {
  const query = req.query.query;
  const page = req.query.page;
  const _ = (async () => {
    try {
      const response = await apiConsume.searchArticles(query, page);
      console.log({ query, page });
      res.status(200).json(response.data);
      return;
    } catch (error) {
      console.log(error);
    }
  })();
  return;
});

server.get("/nyt/getComments", (req, res) => {
  const url = req.query.url;
  const _ = (async () => {
    try {
      const response = await apiConsume.getComments(url);
      console.log(response.data);
      res.status(200).json(response.data);
      return;
    } catch (error) {
      console.log(error);
    }
  })();
  return;
});

server.use(router);
server.use(cors);

server.listen(8000, () => {
  console.log("Run Auth API Server");
});
