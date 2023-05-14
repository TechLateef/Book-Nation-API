const Book = require("../../models/Book.model");
const { ServerError, NotFound } = require("../../errors");

module.exports = {
  /**
   *
   * @returns {Array} -array of books
   */
  books: async () => {
    try {
      const books = await Book.find();
      return books;
    } catch (ex) {
      throw new ServerError(ex);
    }
  },

  createBook: async (args, req) => {
    try {
      const book = await Book.create({ ...args.book });

      if (!book) {
        throw new ServerError("book");
      }
      return {
        ...book._doc,
      };
    } catch (ex) {
      throw new ServerError(ex);
    }
  },

  //update Order
  updateBook: async (arg, req) => {
    try {
      const updatedBook = await Book.findOneAndUpdate(
        arg.id,
        { ...arg.book },
        { new: true }
      );
      if (!updatedBook) {
        throw new ServerError("Updating Order");
      }
      return updatedBook;
    } catch (ex) {
      throw new ServerError(ex);
    }
  },

  //Delete Order
  deleteBook: async (arg, req) => {
    try {
      const deletedBook = await Book.findByIdAndDelete(arg.id);
      return deletedBook;
    } catch (ex) {
      throw new ServerError(ex);
    }
  },
};
