exports.handler = async (event) => {
  const { Records } = event;
  console.log(Records);
  console.log(Records[0].dynamodb);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        event,
      },
      null,
      2
    ),
  };
};
