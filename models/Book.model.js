const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
    max: "50",
  },
  Author: [
    {
      name: String,
    },
  ],
  publishYear: {
    type: String,
    required: [true, "Year of publish is required"],
  },
  description: {
    type: String,
    required: [true, "book description is required"],
  },
  category: {
    type: String,
    required: [true, "select book category"],
    enum: ["Romantic", "Intellectual", "Fiction"],
  },
  bookImageUrl: String,
  BookPrice: String,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
