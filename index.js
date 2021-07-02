const express = require("express");
const env = require("dotenv").config();
const spotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

const credentials = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: `https://60df8fa526405e6aee9a2ba0--blissful-dijkstra-3c9acb.netlify.app/`,
};

app.get("/", (req, res) => {
  res.send("howdy");
});

app.post("/login", (req, res) => {
  let spotify = new spotifyWebApi(credentials);
  const code = req.body.code;
  spotify
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

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
