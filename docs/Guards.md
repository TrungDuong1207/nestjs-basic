Guards (chú bảo vệ :v)

- Nó làm nhiệm vụ giống middleware, can thiệp vào req và res . req -> guards -> res
- với middleware, bạn không thể biết "handler" phía sau là gì, vì lúc nào, bạn cũng làm việc
  với req và res. phần còn lại là hàm next () đã lo
- Guards thì hoàn toàn ngược lại, nó mạnh mẽ hơn nhờ middleware.
  Ngoài khả năng truy cập req, res, nó còn được sử dụng "ExecutionContext".
- Guard có nhiệm vụ check true/false
- Nếu true: cho đi tiếp
- Nếu false: trả về phản hồi

---

@Public()
