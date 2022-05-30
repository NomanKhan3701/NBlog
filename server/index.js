const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const multer = require("multer");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT || 8000;
const corsOptions={
  "origin":"*",
}

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
var upload = multer({ storage: storage });

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);

app.get("/", (req, res) => {
  res.send("Hallaluya");
});

app.listen(PORT, () => {
  try {
    mongoose.connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
      },
      () => console.log(`Server running at port ${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
});
