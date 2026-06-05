# 数据库容器组部署

## 配置
- POSTGRES_PORT: PostgreSQL端口
  - 默认值: 5432
- POSTGRES_DB: PostgreSQL数据库名称
  - 默认值: postgres
- POSTGRES_USER: PostgreSQL用户名
  - 默认值: postgres
- POSTGRES_PASSWORD: PostgreSQL密码
  - 默认值: 123456
- REDIS_PORT: Redis端口
  - 默认值: 6379
- REDIS_PASSWORD: Redis密码
  - 默认值: 123456
- QDRANT_HTTP_PORT: Qdrant HTTP端口
  - 默认值: 6333
- QDRANT_GRPC_PORT: Qdrant gRPC端口
  - 默认值: 6334
- QDRANT_API_KEY: Qdrant API密钥
  - 默认值: your_secure_qdrant_key

### 生成Qdrant API密钥

```bash
# 生成Qdrant API密钥
# linux/macOS
openssl rand -hex 32
```

```powershell
# windows 
-join ((1..32) | % { '{0:x}' -f (Get-Random -Max 16) })
```
将生成的API密钥替换到QDRANT_API_KEY中。


## 启动
```bash
# 启动数据库容器组
docker-compose up -d

# 单独启动postgres容器
docker-compose up -d postgres

# 单独启动redis容器
docker-compose up -d redis

# 单独启动qdrant容器
docker-compose up -d qdrant
```

## 管理页面访问
- Qdrant管理页面: http://localhost:6333，访问后输入QDRANT_API_KEY即可访问。
