# OpenCLAW application

## 功能
### 已实现功能
* 启动初始化配置
* 配置模型
* 创建子智能体(agent)和技能
* 配置向量数据库
* 配置channel

### 待实现功能
* 配置Lobster审批流
* 配置沙盒(sandbox)环境，可选

## 启动openclaw

### 初始化配置openclaw
--build参数用于在启动时构建镜像，确保构建参数与环境变量一致
```bash
# 建造openclaw镜像
docker compose build openclaw-gateway

# 初始化配置openclaw
docker compose run --rm --no-deps --entrypoint node openclaw-gateway dist/index.js onboard --mode local --no-install-daemon
```

初始化配置详见:[SetUp.md](SetUp.md)

### 启动openclaw

```bash
docker compose up openclaw-gateway -d

# 进入openclaw容器
docker compose exec openclaw-gateway bash
```

## 启动后配置openclaw

### 使用openclaw-cli容器配置openclaw

##### 配置模型
```bash
# 配置openclaw使用NVIDIA API密钥
docker compose run --rm openclaw-cli onboard --auth-choice nvidia-api-key

## 配置nvidia模型
docker compose run --rm openclaw-cli models set nvidia/moonshotai/kimi-k2.6

# 配置openai模型
docker compose run --rm openclaw-cli onboard --auth-choice openai-api-key

# 配置opencode-zen密钥，并设置默认模型
docker compose run --rm openclaw-cli onboard --auth-choice opencode-zen

# 配置deepseek模型
docker compose run --rm openclaw-cli onboard --auth-choice deepseek-api-key

## 展示模型
docker compose run --rm openclaw-cli models list --provider opencode

## 配置默认模型
docker compose run --rm openclaw-cli config set agents.defaults.model.primary "opencode/mimo-v2.5"
```

##### 其他常用命令
```bash
# 审核设备
docker compose run --rm openclaw-cli devices approve <requestId>
```

##### 配置channel
```bash
# 配置微信BOT
docker compose run --rm openclaw-cli channels login --channel openclaw-weixin

# 重启openclaw-gateway容器
docker compose restart openclaw-gateway
```
详情参见:[Channel_Set_Up.md](Channel_Set_Up.md)

### 配置后重启openclaw-gateway容器
```bash
docker compose restart openclaw-gateway
```

## 升级openclaw

### 升级openclaw镜像并且重启容器
```bash
# 升级openclaw镜像
docker compose build openclaw-gateway
# 重新构建openclaw-gateway容器
docker compose up openclaw-gateway -d
```

## 配置向量模型
使用技能memory-vector-config配置向量模型：
如果配置为ollama，openclaw.json配置如下：
```json5
{
  models: {
    providers: {
      // ... 其他 provider ...
      "ollama-local": {
        api: "ollama",
        baseUrl: "http://ollama:11434",     // Docker 网络中的 Ollama 地址
        models: [
          { id: "nomic-embed-text" },
          { id: "bge-m3" }
        ]
      }
    }
  },
  agents: {
    defaults: {
      memorySearch: {
        provider: "ollama-local",           // 指向自定义 provider
        model: "bge-m3"                     // 使用的 embedding 模型
      }
    }
  }
}
```

### 查看向量配置状态
```bash
# 查看向量配置状态
docker compose run --rm openclaw-cli memory status --deep

# 重新索引向量，单独指定agent。切换模型时，需要重新索引向量
docker compose run --rm openclaw-cli memory index --force --agent main
```

