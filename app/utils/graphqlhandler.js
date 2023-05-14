const { ServerError } = require("../errors");
const User = require("../models/User.model");

const user = async (userId) => {
  const user = await User.findById(userId);

  try {
    user.map((user) => {
      return {
        ...user._doc,
        _id: user.id,
      };
    });
  } catch (err) {
    throw err;
  }
};

const Reducer = async (product) => {
  return {
    ...product._doc,
    _id: product._id.toString(),
    buyer: user.bind(this, product._doc.buyer),
  };
};

const updateOne = (Model) => async (arg, req) => {
  try {
    const model = await Model.findByIdAndUpdate(arg.id, { ...arg });
  } catch (ex) {
    throw new ServerError(ex);
  }
};

module.exports = Reducer;
