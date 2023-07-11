exports.handler = async (event, context) => {
  //   const url = JSON.parse(event.Records[0].Sns.Message).url;
  //   const user_id = JSON.parse(event.Records[0].Sns.Message).user_id;

  const message = JSON.parse(event.Records[0].Sns.Message);
  console.log(message);
};
