const express = require("express");
const {
  UploadSingleBook,
  getBookurl,
  UploadBookArray,
  getBooksUrlArray,
} = require("../controllers/upload.controller");

const uploadRoute = express.Router();

uploadRoute.post("/book/single", UploadSingleBook, getBookurl);
uploadRoute.post("/book/array", UploadBookArray, getBooksUrlArray);

module.exports = uploadRoute;
