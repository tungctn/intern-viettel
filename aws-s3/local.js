var AWS = require("aws-sdk");
AWS.config.update({ region: "ap-southeast-1" });
var sns = new AWS.SNS();

var params = {
  Protocol: "http",
  TopicArn:
    "arn:aws:sns:ap-southeast-1:885537931206:TEST_SNS_WEB" /* replace with your Topic ARN */,
  Endpoint:
    "http://intern-viettel-prod.s3-website-ap-southeast-1.amazonaws.com" /* replace with your endpoint URL */,
};

sns.subscribe(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data); // successful response
});

var http = require("http");
var url = require("url");

http
  .createServer(function (req, res) {
    var body = "";
    req.on("data", function (chunk) {
      body += chunk;
    });
    req.on("end", function () {
      var message = JSON.parse(body);
      if (message.Type === "SubscriptionConfirmation") {
        var https = require("https");
        https.get(message.SubscribeURL, function (res) {
          console.log("Subscription confirmed");
        });
      }
      res.end();
    });
  })
  .listen(80);
