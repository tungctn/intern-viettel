require("dotenv").config();
const { cognito } = require("./cognito");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  const { username, password } = req.body;

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.CLIENT_POOL_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  cognito.initiateAuth(params, (err, data) => {
    if (err) {
      res.status(400).json({
        message: err.message,
      });
    } else {
      const idToken = data.AuthenticationResult.IdToken;
      const payload = jwt.decode(idToken);

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        accessToken: data.AuthenticationResult.AccessToken,
        username: payload["name"],
      });
    }
  });
};

module.exports = login;
