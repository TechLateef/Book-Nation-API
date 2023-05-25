const mongoose = require("mongoose");
const User = require("./User.model");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  storeName: String,
  Location: String,
  ownerName: String,
  booksCategories: {
    type: [String],
  },
});

const Store = User.discriminator("Store", StoreSchema);

module.exports = Store;
