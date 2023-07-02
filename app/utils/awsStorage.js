const aws = require("aws-s3");
const multerS3 = require("multer-s3");
const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");

//Create s3 instance using S3client

const s3 = new S3Client({
  credentials: {
    secretAccessKey: process.env.AWS_SECRETKEY,
    accessKeyId: process.env.AWS_ACCESSKEY,
  },
  region: process.env.AWS_REGION,
});

exports.clodMulterStorage = (modelname) => {
  multerS3({
    acl: "public-read",
    s3,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    bucket: process.env.AWS_BUCKET,
    metadata: function (req, file, cb) {
      cb(null, { fileName: file.fieldname });
    },
    key: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(
        null,
        `${modelname}/${file.originalname.replace(
          / /g,
          "-"
        )}-${Date.now()}.${ext}`
      );
    },
  });
};

exports.multerStorageDev = (modelname) => {
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "backend/public" + modelname);
    },
  });
};

exports.bookFilter = (req, file, cb) => {
  if (file.mimetype.startWith("book")) cb(null, true);
  else cb(new Error("you can only upload Image"), false);
};
