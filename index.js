const express = require("express");
const env = require("dotenv").config();
const spotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");

const app = express();
const port = 9000;

app.use(cors);
app.use(exoress.json());

const credentials = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};

app.get("/", (req, res) => {
  res.send("howdy");
});

app.post("/login", (req, res) => {});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
