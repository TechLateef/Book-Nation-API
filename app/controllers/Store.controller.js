const { StatusCodes } = require("http-status-codes");
const { BadRequest, ServerError, NotFound } = require("../errors");
const Store = require("../models/Store");
const catchAsync = require("../utils/catchAsync");
const { jsonResponse } = require("../utils/responseHelper");
const { CreateUser } = require("./Auth.controller");

/**
 * Create new Store
 */
const registerStore = CreateUser(Store);

/**
 * Update the store information
 */
const updateStore = catchAsync(async (req, res) => {
  if (!req.body) {
    throw new BadRequest("Update Store");
  }
  const isUpdate = await Store.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );

  if (!isUpdate) {
    throw new ServerError("Updating Store");
  }

  jsonResponse(StatusCodes.OK, {}, res, "Store Updated");
});

/**
 * delete a specific store
 */
const deleteStore = catchAsync(async (req, res) => {
  if (!req.params.id) {
    throw new BadRequest("StoreId");
  }

  const deletedStore = await Store.findByIdAndDelete(req.params.id);

  if (!deleteStore) {
    throw new BadRequest("Incorrect Store Id");
  }
  jsonResponse(StatusCodes.OK, {}, res, "Store have been deleted");
});

/**
 * return All registered Stores
 */
const getAll = catchAsync(async (req, res) => {
  const Stores = await Store.find();

  jsonResponse(StatusCodes.OK, Stores, res);
});

/**
 * Get a specific store
 */
const getOne = catchAsync(async (req, res) => {
  if (!req.params.id) {
    throw new BadRequest("Store Id");
  }

  const isStore = await Store.findById(req.params.id);
  if (!isStore) {
    throw new NotFound("store");
  }

  jsonResponse(StatusCodes.OK, { isStore }, res);
});

module.exports = {
  registerStore,
  updateStore,
  deleteStore,
  getAll,
  getOne,
};
