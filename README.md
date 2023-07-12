# Cách chạy project

## Cài đặt

Build project cloudformation

```
sam build
```

Deploy project cloudformation

Build lần đầu tiên cần chạy lệnh sau để tạo ra file config

```
sam deploy -g --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM CAPABILITY_NAMED_IAM
```

Build lần thứ 2 trở đi

```
sam deploy --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM CAPABILITY_NAMED_IAM
```

## Link CloudFront

https://d1eeuaw052n9ju.cloudfront.net

## Architecture Diagram CI/CD

https://drive.google.com/file/d/1Dq93zlKMxcgZqexhHyf2Ge5smlcfjLjk/view

## Architecture Diagram App

https://drive.google.com/file/d/1AAhQSQFJWiXVRwITedFVXMYTJ6BYvWHR/view?usp=sharing
