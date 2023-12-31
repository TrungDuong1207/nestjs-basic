#22.3 DTO - Data Transfer Object

https://docs.nestjs.com/controllers#request-payloads
Về request object: https://docs.nestjs.com/controllers#request-object

- DTO là 1 object định nghĩa hình dạng dữ liệu được “transfer” (frontend và backend)
- Lưu ý sử dụng class, thay vì type hay interface

#22.4 Pipe
https://docs.nestjs.com/pipes

Pipe có 2 tác dụng:

- Transform data : convert string => number ,array …
- Validate data

#22.5 Validation
https://docs.nestjs.com/techniques/validation
https://docs.nestjs.com/pipes#class-validator

Cài đặt thư viện:
npm i --save-exact class-validator@0.14.0 class-transformer@0.5.1
yarn add class-validator@0.14.0 class-transformer@0.5.1
Về class-validator: https://github.com/typestack/class-validator
Về customize message ?
