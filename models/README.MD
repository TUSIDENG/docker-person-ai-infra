# Models部署指南

## ollama 使用

常用命令
```bash
# 查看模型列表
ollama list

# 查看模型详情
ollama info gemma4:12b

# 下载模型
ollama pull gemma4:12b

# 删除模型
ollama rm gemma4:12b
```

通过docker compose使用
```bash
# 查看模型列表（使用专门的 ollama-cli 服务）
docker compose exec ollama-cli ollama list

# 下载模型
docker compose exec ollama-cli ollama pull gemma4:12b

# 卸载单个模型
docker compose exec ollama-cli ollama rm gemma4:12b

# 卸载向量模型
docker compose exec ollama-cli ollama rm bge-m3

# 查看模型详情
docker compose exec ollama-cli ollama show gemma4:12b
```

### ollama 模型加载原理

#### 1. 模型存储机制
- 模型文件存储在 `./data/ollama/models/` 目录下
- 每个模型包含多个 blob 文件（权重、配置、tokenizer 等）
- 模型元数据存储在数据库中，支持快速查询

#### 2. 延迟加载策略（按需加载）
**Ollama 不会在启动时自动加载所有模型到内存！** 采用延迟加载策略：
- **首次调用时加载**：当用户通过 API 或 CLI 首次调用某个模型时，才将其从磁盘加载到内存
- **加载时间**：大模型（如 gemma4:12b）首次加载需要 10-30 秒
- **后续调用**：模型已在内存中，响应极快（毫秒级）

#### 3. 智能内存管理
- **空闲自动卸载**：默认空闲 5 分钟后自动从内存卸载，释放 RAM
- **可配置超时**：通过 `OLLAMA_KEEP_ALIVE` 环境变量调整（如 `OLLAMA_KEEP_ALIVE=30m`）
- **Slot 复用**：多个请求共享同一模型实例，提高资源利用率

#### 4. KV Cache 机制
- **上下文缓存**：将对话历史编码后缓存，避免重复计算
- **动态增长**：根据上下文长度动态扩展缓存大小
- **内存优化**：支持多种量化格式（Q4_K_M、Q8_0 等），减少内存占用

#### 5. 模型生命周期示例
```
用户请求 → 检查模型是否在内存 → 不在内存 → 从磁盘加载 → 生成响应 → 空闲5分钟 → 自动卸载
                              ↓
                          在内存中 → 直接生成响应
```

#### 6. 内存占用说明
| 状态 | 内存占用 | 说明 |
|------|---------|------|
| 模型已下载但未调用 | 0 MB | 仅占用磁盘空间 |
| 模型正在运行 | 4-8 GB+ | 取决于模型大小和量化方式 |
| 模型空闲 5 分钟后 | 0 MB | 自动释放内存 |

#### 7. 最佳实践
- **预加载模型**：如果需要低延迟响应，可以在服务启动后立即调用一次模型
- **合理选择模型**：根据可用内存选择合适大小的模型
- **监控内存使用**：使用 `docker stats` 或 API `/api/ps` 查看当前加载的模型



## 测试模型
* linux/macOS 宿主机
```bash
# 查看模型列表（API方式）
curl http://localhost:11434/api/tags

# 测试生成文本
# 测试 gemma4:12b 模型
curl http://localhost:11434/api/generate -d '{
  "model": "gemma4:12b",
  "prompt": "Hello, who are you?"
}'

# 测试 qwen3.5:9b 模型
curl http://localhost:11434/api/generate -d '{
  "model": "qwen3.5:9b",
  "prompt": "Hello, who are you?"
}'

# 测试嵌入生成
curl http://localhost:11434/api/embeddings -d '{
  "model": "bge-m3",
  "prompt": "Hello, world!"
}'
```

* windows 宿主机
```powershell
# 查看模型列表（API方式）
Invoke-WebRequest -Uri "http://localhost:11434/api/tags" | ConvertFrom-Json

# 测试生成文本
$body = @{
  model = "gemma4:12b"
  prompt = "Hello, how are you?"
} | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:11434/api/generate" -Method POST -Body $body -ContentType "application/json"

# 测试嵌入生成
$body = @{
  model = "bge-m3"
  prompt = "Hello, world!"
} | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:11434/api/embeddings" -Method POST -Body $body -ContentType "application/json"
```
