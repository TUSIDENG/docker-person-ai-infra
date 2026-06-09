---
name: "memory-vector-config"
description: "配置 OpenCLAW 向量记忆搜索，支持 ollama/openai/gemini/deepinfra/nvidia"
metadata:
  maintainer: "Main Agent"
  scope: "向量搜索配置"
  version: "1.1.3"
---

# 向量记忆搜索配置

## 概述

配置 OpenCLAW 的 `memorySearch`（内置向量数据库），用于语义搜索记忆文件。  
默认为 **ollama-local**（本地 Ollama，Docker 内部地址 `http://ollama:11434`）。  
也支持 **OpenAI**、**Gemini**、**DeepInfra**、**NVIDIA**（openai-compatible 兼容）等云端 provider。

相关环境变量：
- `OPENCLAW_STATE_DIR = ~/.openclaw`
- `OPENCLAW_CONFIG_PATH = ~/.openclaw/openclaw.json`

所有配置项在 `openclaw.json` 的 `agents.defaults.memorySearch` 下。

---

## 选项 A：Ollama（本地，默认推荐）

### 1. 确认 Ollama 运行中

```bash
# Docker 环境下确认
curl http://ollama:11434/api/tags
```

或：

```bash
docker compose exec ollama ollama list
```

### 2. 拉取 Embedding 模型

```bash
docker compose exec ollama ollama pull nomic-embed-text
docker compose exec ollama ollama pull bge-m3
```

### 3. 配置 openclaw.json

```json5
{
  models: {
    providers: {
      "ollama-local": {
        api: "ollama",
        baseUrl: "http://ollama:11434",
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
        provider: "ollama-local",
        model: "bge-m3"
      }
    }
  }
}
```

### 4. 生效

```bash
openclaw memory index --force --agent main
openclaw memory status --agent main
```

---

## 选项 B：OpenAI

### 1. 先配置 API Key

```bash
docker compose run --rm openclaw-cli onboard --auth-choice openai-api-key
```

> 如果已有 `OPENAI_API_KEY` 环境变量，**零配置即可用**——默认 provider 就是 OpenAI。

### 2. 配置

```json5
{
  agents: {
    defaults: {
      memorySearch: {
        provider: "openai",
        model: "text-embedding-3-small"
      }
    }
  }
}
```

### 3. 生效

```bash
openclaw memory index --force --agent main
openclaw memory status --agent main
```

---

## 选项 C：Gemini

### 1. 先配置 API Key

```bash
docker compose run --rm openclaw-cli onboard --auth-choice gemini-api-key
```

### 2. 配置

```json5
{
  agents: {
    defaults: {
      memorySearch: {
        provider: "gemini",
        model: "gemini-embedding-001"
      }
    }
  }
}
```

Gemini Embedding 2 额外支持图片和音频索引：

```json5
{
  agents: {
    defaults: {
      memorySearch: {
        provider: "gemini",
        model: "gemini-embedding-2-preview",
        multimodal: {
          enabled: true,
          modalities: ["image", "audio"]
        }
      }
    }
  }
}
```

### 3. 生效

```bash
openclaw memory index --force --agent main
openclaw memory status --agent main
```

---

## 选项 D：DeepInfra

### 1. 先配置 API Key

```bash
docker compose run --rm openclaw-cli onboard --auth-choice deepinfra-api-key
```

或设置环境变量 `DEEPINFRA_API_KEY`。

### 2. 配置（使用内置 provider）

DeepInfra 是 OpenCLAW 内建 provider，直接用 ID 引用即可：

```json5
{
  agents: {
    defaults: {
      memorySearch: {
        provider: "deepinfra",
        model: "BAAI/bge-m3"
      }
    }
  }
}
```

### 3. 生效

```bash
openclaw memory index --force --agent main
openclaw memory status --agent main
```

---

## 选项 E：NVIDIA（openai-compatible）

NVIDIA 的 Embedding API 遵循 OpenAI 兼容格式，使用 `openai-compatible` provider。

### 1. 先配置 NVIDIA API Key

```bash
docker compose run --rm openclaw-cli onboard --auth-choice nvidia-api-key
```

或设置环境变量 `NVIDIA_API_KEY`。

### 2. 配置

```json5
{
  agents: {
    defaults: {
      memorySearch: {
        provider: "openai-compatible",
        model: "nv-embed-v1",                  // 默认模型
        remote: {
          baseUrl: "https://integrate.api.nvidia.com/v1",
          apiKey: "${NVIDIA_API_KEY}"
        },
        queryInputType: "query",              // 不对称模型，必须设置
        documentInputType: "passage"
      }
    }
  }
}
```

> **注意：** NVIDIA 的 embedding 模型是不对称的，必须设置 `queryInputType` 和 `documentInputType`。可选模型：`nv-embedcode-7b-v1`（代码嵌入，质量更高）。

### 3. 生效

```bash
openclaw memory index --force --agent main
openclaw memory status --agent main
```

---

## Provider 对比一览

| Provider | Provider ID | API Key | 网络 | 默认模型 |
|----------|-------------|---------|------|---------|
| **Ollama** (默认) | `ollama` / 自定 | ❌ 不需要 | 本地 | `nomic-embed-text` |
| **OpenAI** | `openai` | ✅ 需要 | 云端 | `text-embedding-3-small` |
| **Gemini** | `gemini` | ✅ 需要 | 云端 | `gemini-embedding-001` |
| **DeepInfra** | `deepinfra` | ✅ 需要 | 云端 | `BAAI/bge-m3` |
| **NVIDIA** | `openai-compatible` | ✅ 需要 | 云端 | `nv-embed-v1` |

---

## 验证命令

```bash
# 完整状态查看
openclaw memory status --agent main

# 深度诊断
openclaw memory status --deep --agent main

# 强制重建索引（更换 provider/模型后必须执行）
openclaw memory index --force --agent main
```

成功标志：`Provider: xxx` 显示正确值，`Vector store: ready`，`chunks > 0`。

---

## 切换 Provider

更换 provider 或模型后，现有向量索引会不兼容，OpenCLAW 会自动暂停向量搜索并提示重建：

```bash
openclaw memory index --force --agent main
```

---

## 常见问题

| 问题 | 原因 | 解决 |
|------|------|------|
| `Vector store: unknown` | 索引未就绪 | `openclaw memory index --force` |
| `Provider not detected` | API Key 未配置 | 运行 onboard 先配 auth |
| `no memory files found` | 没有记忆文件 | 创建 `memory/` 目录并写入 `.md` 文件 |
| 配置报错 `Invalid input` | provider 配置位置错误 | `ollama-local` 必须在 `models.providers` 下，**不在** `agents.defaults.models` |
| NVIDIA 报向量维度不匹配 | 未设置 queryInputType | 添加 `queryInputType: "query"` 和 `documentInputType: "passage"` |
