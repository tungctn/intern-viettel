import AWS from "aws-sdk";

AWS.config.update({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: "AKIA44LRMP7DCIWHHOFK",
    secretAccessKey: "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",
  },
});

// S3 bucket for chat log
export const BUCKET_CHATLOG = "storage-chat-log";

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: BUCKET_CHATLOG },
});

export default s3;