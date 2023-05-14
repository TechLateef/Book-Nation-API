const createAndSendToken = (user, code, message, res) => {
  const token = user.createJWT();
  res.cookie("jwt", token, {
    expire: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });
  user.password = undefined;
  res.set("authorization", token);
  res.status(code).json({ status: "success", message, user, token });
};

module.exports = {
  createAndSendToken,
};
