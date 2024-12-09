const path = require("path");
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require('cors');

// Routers
const authRouter = require("./routes/auth");
const adminCategoryRouter = require("./routes/adminCategory");
const adminCourseRouter = require("./routes/adminCourse");
const adminSectionRouter = require("./routes/adminSection");
const adminLessonRouter = require("./routes/adminLesson");
const adminUserRouter = require("./routes/adminUser");
const adminOrderRouter = require("./routes/adminOrder");
const clientRouter = require("./routes/client");
const reportRouter = require("./routes/report");
const app = express();

const port = process.env.PORT || 10000;

const MONGODB_URI =
  "mongodb+srv://projectdosti:Dhairya1212@dosti.peeng.mongodb.net/?retryWrites=true&w=majority&appName=Dosti";

// CORS configuration
app.use(cors({
  origin: ['http://localhost:8000', 'http://127.0.0.1:8000', 'https://dosti-site.web.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'userId', 'adminRole', 'userRole'],
  credentials: true
}));

// Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use("/auth", authRouter);
app.use("/admin", adminCategoryRouter);
app.use("/admin", adminCourseRouter);
app.use("/admin", adminSectionRouter);
app.use("/admin", adminLessonRouter);
app.use("/admin", adminUserRouter);
app.use("/admin", adminOrderRouter);
app.use("/admin", reportRouter);
app.use(clientRouter);

// Health check endpoint for Render
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const errorType = error.errorType || "unknown";
  const data = error.data;

  res.status(status).json({
    message: message,
    errorType,
    data: data,
  });
});

// Connect to MongoDB and start server
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    const server = app.listen(port, '0.0.0.0', () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });