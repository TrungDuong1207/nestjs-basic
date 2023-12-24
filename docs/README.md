### Các bước cần làm để chạy dự án NestJS

#### 1. Cài đặt thư viện với câu lệnh: npm i
#### 2. Chạy dự án với câu lệnh: npm run dev

#1 luồng chạy auth
1. xác thực auth với jwt accesstoken:
  + chạy vào jwt.strategy đầu tiên để xem accesstoken có đúng ko => trả về user, ko thì sẽ trả về lỗi
  + sau đó chạy xuống jwt-auth.guard.ts để check permission
2. login:
  + chạy local.strategy để validate tk và trả về user trong request
  + sau đó lấy user để tạo refreshToken và lưu vào cookie và tạo accesstoken trả về cho client
  



=================

Tác giả: Trungdd



