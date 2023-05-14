const { ServerError, NotFound } = require("../../errors");
const Order = require("../../models/Order.model");
const User = require("../../models/User.model");

/**
 *
 * @param {String} userId -User Id to be found
 * @returns {Object} User Object
 */
const user = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFound("User");
  }
  return {
    ...user._doc,
    password: null,
    _id: user.id,
  };
};

module.exports = {
  /**
   *
   * @returns {Array} -array of all orders
   */
  orders: async () => {
    try {
      const Orders = await Order.find();

      return Orders.map((item) => {
        return {
          ...item._doc,
          buyer: user.bind(this, item.buyer),
        };
      });
    } catch (ex) {
      throw ex;
    }
  },

  /**
   *
   * @param {String} args -All argument to create order
   * @param {*} req
   * @returns {Object} -Object of order created
   */
  createOrder: async (args, req) => {
    try {
      const order = new Order({ ...args.order });
      await order.save();
      return {
        ...order._doc,
        buyer: user.bind(this, order._doc.buyer),
      };
    } catch (ex) {
      console.log(ex);
    }
  },

  //update Order
  updateOrder: async (arg, req) => {
    try {
      const updatedOrder = await Order.findOneAndUpdate(
        arg.id,
        { ...arg.order },
        { new: true }
      );
      if (!updatedOrder) {
        throw new ServerError("Updating Order");
      }
      return updatedOrder;
    } catch (ex) {
      throw new ServerError(ex);
    }
  },

  //Delete Order
  deleteOrder: async (arg, req) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(arg.id);
      return deletedOrder;
    } catch (ex) {
      throw new ServerError(ex);
    }
  },
};
