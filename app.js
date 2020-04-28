// required libraries import
const multer = require("multer");
const express = require("express");
const app = express();

// port variable
const port = 3000;

const fileFilter = (req, file, cb) => {
  //allowing only jpeg and png file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("file is not supported"), false); // setting error file is not support.error handling is left
  }
};

//for setting particular directory or folder and name of uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//creating instance of upload using multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, //setting max file size to 5mb
  },
  fileFilter: fileFilter,
});

//Endpoint for checking whether is able to response or not
app.get("/", (req, res) => {
  res.send("hello people");
});

//to server to listen at particular port
app.listen(port, () => {
  console.log(`listening to the port: ${port}`);
});

//directly creating upload instance .but this istance will not provide features like setting name and extension
// var upload = multer({ dest: "uploads/" });

//Endpoint to upload single file ,we can post other field also ,but for example point of view we are just stick to file upload
app.post("/single", upload.single("profile"), (req, res) => {
  try {
    console.log(req.file);
    res.send(req.file);
  } catch (err) {
    res.send(400);
  }
});

//Endpoint to upload multiple files ,we can post other field also ,but for example point of view we just stick to file upload
app.post("/multiple", upload.array("profiles", 3), (req, res) => {
  try {
    console.log(req.files);
    res.send(req.files);
  } catch (error) {
    res.send({ message: error.message });
  }
});
