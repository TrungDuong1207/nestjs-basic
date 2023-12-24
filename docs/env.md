1. npm i --save-exact @nestjs/config@2.3.1

2. Sử dụng Config Service
   Tài liệu: https://docs.nestjs.com/techniques/configuration#using-the-configservice

- Khai báo config service ở constructor (dùng dependency injection)

```bash
  constructor(private configService: ConfigService) { }
```

- Lấy giá trị của .env, theo cú pháp:
  // get an environment variable
  ```bash
  const myVar = this.configService.get<string>('VARIABLE_NAME');
  ```

3. Sử dụng với file main.ts
   Tài liệu: https://docs.nestjs.com/techniques/configuration#using-in-the-maints

   ```bash
   const configService = app.get(ConfigService);
   const port = configService.get('PORT')
   ```

4. Sử dụng khi khai báo Module
   Tài liệu với MongoDB:
   https://docs.nestjs.com/techniques/mongodb#async-configuration
