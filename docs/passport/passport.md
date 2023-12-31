1. Passport (hay passportjs) là thư viện giúp việc authentication (xác thực/login), support hơn 500+ strategies (các loại login khác nhau)

passport-local: xác thực người dùng thông qua username/password
passport-jwt: xác thực người dùng với jwt (json web token)

2. thư viện
   > npm install --save-exact @nestjs/passport@9.0.3 passport@0.6.0
   > passport-local@1.0.0
   > npm install --save-dev @types/passport-local

Cài 3 thư viện (không phải là cài 1 thư viện duy nhất vì):

- passport là thư viện gốc => giúp ra tạo ra middleware (can thiệp và req và res), và lưu
  trữ thông tin người dùng đăng nhập (req.user)
- @nestjs/passport là thư viện viết theo phong cách của nestjs, giúp việc can thiệp vào
  passport dễ dàng hơn
- passport-local: đây là strategy hỗ trợ việc đăng nhập sử dụng username/password
  Sau này, khi cần tạo ra jwt, chúng ta sẽ cài thêm strategy: passport-jwt

3.
