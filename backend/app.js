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

const port = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://projectdosti:Dhairya1212@dosti.peeng.mongodb.net/?retryWrites=true&w=majority&appName=Dosti";

const allowedOrigins = ['https://dosti-codey.web.app', 'http://localhost:3000', 'http://localhost:5000', 'http://127.0.0.1:5000', 'http://localhost:8000', 'http://127.0.0.1:8000'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'userId', 'adminRole', 'userRole'],
  credentials: true
};

// CORS configuration
app.use(cors(corsOptions));

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

// Middleware handler error!!! (custom error here!!!)
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

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });


app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});