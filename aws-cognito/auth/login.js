require("dotenv").config();
const { cognito } = require("./cognito");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.CLIENT_POOL_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  cognito.initiateAuth(params, (err, data) => {
    if (err) {
      res.status(400).json({
        message: err.message,
      });
    } else {
      res.status(200).json({
        message: "User logged in successfully",
        email: email,
        accessToken: data.AuthenticationResult.AccessToken,
      });
    }
  });
};

module.exports = login;

// exports.handler = async (event) => {
//   const { email, password } = event.body;

//   const params = {
//     AuthFlow: "USER_PASSWORD_AUTH",
//     ClientId: process.env.CLIENT_POOL_ID,
//     AuthParameters: {
//       USERNAME: email,
//       PASSWORD: password,
//     },
//   };

//   cognito.initiateAuth(params, (err, data) => {
//     if (err) {
//       console.log(err);
//       return {
//         statusCode: 400,
//         body: JSON.stringify({
//           message: err.message,
//         }),
//       };
//     } else {
//       console.log(data);
//       return {
//         statusCode: 200,
//         body: JSON.stringify({
//           message: "User logged in successfully",
//           email: email,
//           accessToken: data.AuthenticationResult.AccessToken,
//         }),
//       };
//     }
//   });
// };
