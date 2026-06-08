# Agent application

## 启动openclaw

### 初始化配置openclaw

```bash
docker compose run --rm --no-deps --entrypoint "" openclaw openclaw onboard
```

### 启动openclaw
--build参数用于在启动时构建镜像，确保构建参数与环境变量一致
```bash
docker compose up openclaw --build

# 进入openclaw容器
docker compose exec openclaw bash
```

### 启动后配置openclaw
