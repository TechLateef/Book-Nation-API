const mongoose = require("mongoose");
const { ServerError } = require("../app/errors");

mongoose
  .connect("mongodb://localhost/UBook", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((ex) => {
    throw new ServerError(`Database connection ${ex}`);
  });
