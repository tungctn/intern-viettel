exports.handler = async (event, context) => {
  // create platform application sns
  const params = {
    Platform: "GCM",
    Attributes: {
      PlatformCredential: process.env.PLATFORM_CREDENTIAL,
      PlatformPrincipal: process.env.PLATFORM_PRINCIPAL,
    },
  };
  const platformApplication = await sns
    .createPlatformApplication(params)
    .promise();
  console.log(platformApplication);
  // create platform endpoint
  const endpointParams = {
    PlatformApplicationArn: platformApplication.PlatformApplicationArn,
    Token: process.env.TOKEN,
  };
  const platformEndpoint = await sns
    .createPlatformEndpoint(endpointParams)
    .promise();
  console.log(platformEndpoint);
  // publish to endpoint
  const publishParams = {
    Message: "Hello from SNS",
    MessageStructure: "string",
    TargetArn: platformEndpoint.EndpointArn,
  };
  const publish = await sns.publish(publishParams).promise();
  console.log(publish);
};
