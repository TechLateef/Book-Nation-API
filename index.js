const express = require("express");

const app = require("./app");

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Up and Running on PORT ${PORT}`));
