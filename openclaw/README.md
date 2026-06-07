# Agent application

## 启动openclaw

### 配置openclaw

```bash
docker compose run --rm --no-deps --entrypoint \
-f ./openclaw/docker-compose.yaml \
--env-file .\.env \
 node openclaw-gateway \
  dist/index.js onboard 
```

### 启动openclaw
--build参数用于在启动时构建镜像，确保构建参数与环境变量一致
```bash
docker compose -f .\openclaw\docker-compose.yml --env-file .\.env  up openclaw --build
```
