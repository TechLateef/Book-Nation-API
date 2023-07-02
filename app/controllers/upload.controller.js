const multer = require("multer");
const {
  clodMulterStorage,
  multerStorageDev,
  bookFilter,
} = require("../utils/awsStorage");

const catchAsync = require("../utils/catchAsync");
const { StatusCodes } = require("http-status-codes");

const multerStorageD = multerStorageDev("book");

const multerStoragePro = clodMulterStorage("book");

//uploading the book to either aws or discstorage depenending on the env
const bookUpload = multer({
  storage:
    process.env.NODE_ENV === "production" ? multerStoragePro : multerStorageD,
  fileFilter: bookFilter,
  limits: {
    fileSize: 1024 * 1024 * 12, // Maximum 12mb file
  },
});

//fetch the uploaded book from the url in dev env
const devFun = (req = (file) => {
  return `${req.protocol}://${req.get("host")}/book/${file.filename}`;
});

//fetch the uploaded book from the url in production env
const prodFun = (file) => file.location;

//uploading multiple image in same container

exports.UploadBookArray = bookUpload.array("books");
exports.UploadSingleBook = bookUpload.single("book");

//middleware handle to upload multiple file
exports.getBooksUrlArray = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: "failed", message: "No file was passed" });
  }

  const books = req.files.map(
    process.env.NODE_ENV === "development" ? devFun : prodFun
  );
  res.status(StatusCodes.OK).json({ status: "Success", message: books });
});

//middleware handle to upload a single file
exports.getBookurl = catchAsync(async (req, res, next) => {
  if (!req.file)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: "failed", message: "NO file was passed" });
  const url =
    process.env.NODE_ENV === "development"
      ? devFun(req.file)
      : prodFun(req.file);
  res.status(StatusCodes.OK).json({ status: "success", data: url });
});
