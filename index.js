const express = require("express");
const { query } = require("./database/Database");
const moment = require("moment");
const fileUpload = require("express-fileupload");
const path = require("path");
const cookieParser = require("cookie-parser");
const { authenticateUser } = require("./helper");
require("dotenv").config();

const mysql = require("mysql2");

const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.APP_PORT;

const app = express();

// Middleware to parse JSON and urlencoded data

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views")); // Set the directory for views
app.set("view engine", "ejs"); // Set EJS as the templating engine

app.use(cors({ origin: "*" }));

// Importing routes for different functionalities
const userRoute = require("./routes/user-route");
const albumRoute = require("./routes/album-route");
const artistsRoute = require("./routes/artist-route");
const songsroute = require("./routes/songs-route");
const ratingforalbumroute = require("./routes/ratingofalbum-route");
const ratingforsongroute = require("./routes/ratingofsong-route");

app.get("/homepage", (req, res) => {
  res.status(200).json({ message: "this is the home page" });
});

// Route for uploading album covers
app.get("/uploadalbumcover", (req, res) => {
  res.sendFile(__dirname + "/views/upload.ejs");
});
// Middleware for handling file uploads
app.use(fileUpload());

// Static route for uploaded files
app.use("/views/upload.html", express.static("uploads"));
// API routes
app.use("/api/users", userRoute);
app.use("/api/album", albumRoute);
app.use("/api/artist", artistsRoute);
app.use("/api/songs", songsroute);
app.use("/api/ratingforalbum", ratingforalbumroute);
app.use("/api/ratingforsong", ratingforsongroute);

// Serving static files from 'static' directory
app.use(express.static(__dirname + "/static"));

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/uploadalbum", (req, res) => {
  res.render("upload");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/JamJudge", authenticateUser, (req, res) => {
  const username = req.user ? req.user.username : "";
  const isArtistc = req.user && req.user.isArtist; // Check if user is an artist

  res.render("main", {
    isLoggedIn: !!req.user,
    user_username: username,
    isArtist: isArtistc, // Pass this to your EJS template
  });
});


app.get("/signout", (req, res) => {
  res.clearCookie("token"); // Clear the authentication token cookie
  res.redirect("/JamJudge"); // Redirect to the main page or login page
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`My app is listening ${port}`);
});
