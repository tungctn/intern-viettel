require("dotenv").config();
const { cognito } = require("./cognito");

const confirm = async (req, res, next) => {
  const { email, code } = req.body;

  const params = {
    ClientId: process.env.CLIENT_POOL_ID,
    ConfirmationCode: code,
    Username: email,
  };

  cognito.confirmSignUp(params, (err, data) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      console.log(data);
      return res.status(200).json({
        success: true,
        message: "User confirmed successfully",
      });
    }
  });
};

module.exports = confirm;
