const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
const PORT = process.env.PORT || 5000;
const path = require("path");

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/post", require("./routes/postRoutes"));

if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // FIX: below code fixes app crashing on refresh in deployment
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (_, res) => {
    res.status(200).json({ message: "Welcome to the Info Manager API" });
  });
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server started on PORT " + PORT);
});
