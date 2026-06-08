# Agent application

## 启动openclaw

### 初始化配置openclaw
--build参数用于在启动时构建镜像，确保构建参数与环境变量一致
```bash
docker compose run --rm --no-deps --entrypoint node openclaw-gateway dist/index.js onboard --mode local --no-install-daemon --build
```

### 启动openclaw

```bash
docker compose up openclaw-gateway -d

# 进入openclaw容器
docker compose exec openclaw-gateway bash
```

## 启动后配置openclaw

### 使用openclaw-cli容器配置openclaw
```bash
# 配置openclaw使用NVIDIA API密钥
docker compose run --rm openclaw-cli onboard --auth-choice nvidia-api-key

## 配置nvidia模型
docker compose run --rm openclaw-cli models set nvidia/moonshotai/kimi-k2.6

# 配置opencode-zen密钥，并设置默认模型
docker compose run --rm openclaw-cli onboard --auth-choice opencode-zen

## 展示模型
docker compose run --rm openclaw-cli models list --provider opencode

## 配置默认模型
docker compose run --rm openclaw-cli config set agents.defaults.model.primary "opencode/mimo-v2.5"

# 审核设备
docker compose run --rm openclaw-cli devices approve <requestId>
```

### 配置后重启openclaw-gateway容器
```bash
docker compose restart openclaw-gateway
```
