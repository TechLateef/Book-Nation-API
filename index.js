const express = require("express");

/**
 * Configure Environment Variable
 */
require("dotenv").config();

//set Up express Server
const app = require("./app");

/** Set Up Database */
require("./db");

//Set Port Number
const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Up and Running on PORT ${PORT}`));
