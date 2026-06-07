# Agent application

## 启动openclaw

### 配置openclaw

```bash
docker compose --env-file ../.env run --rm --no-deps --entrypoint "" openclaw openclaw onboard
```

### 启动openclaw
--build参数用于在启动时构建镜像，确保构建参数与环境变量一致
```bash
docker compose --env-file ../.env  up openclaw --build

# 进入openclaw容器
docker compose --env-file ../.env exec openclaw bash
```
