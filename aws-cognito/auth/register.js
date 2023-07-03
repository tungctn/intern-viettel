require("dotenv").config();
const { cognito } = require("./cognito");

const register = async (req, res, next) => {
  const { email, password, username } = req.body;

  const params = {
    ClientId: process.env.CLIENT_POOL_ID,
    Password: password,
    Username: email,

    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "name",
        Value: username,
      },
    ],
  };

  cognito.signUp(params, (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};

module.exports = register;
