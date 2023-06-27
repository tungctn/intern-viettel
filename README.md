# Cách chạy project

## Cài đặt

Build project cloudformation

```
sam build
```

Deploy project cloudformation

Build lần đầu tiên cần chạy lệnh sau để tạo ra file config

```
sam deploy -g --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

Build lần thứ 2 trở đi

```
sam deploy --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

## Architecture Diagram with AWS
https://drive.google.com/file/d/1Oyrzfi1qG8MR0fN2uZfrxar9ZYJCBL2J/view?usp=sharing
