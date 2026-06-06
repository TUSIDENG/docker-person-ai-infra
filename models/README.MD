# Models部署指南

## 测试模型
* linux/macOS 宿主机
```bash
# 查看模型列表（API方式）
curl http://localhost:11434/api/tags

# 测试生成文本
curl http://localhost:11434/api/generate -d '{
  "model": "gemma4:12b",
  "prompt": "Hello, how are you?"
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
Invoke-WebRequest -Uri "http://localhost:11434/api/generate" -Method POST -Body @{
  model = "gemma4:12b"
  prompt = "Hello, how are you?"
} | ConvertTo-Json

# 测试嵌入生成
Invoke-WebRequest -Uri "http://localhost:11434/api/embeddings" -Method POST -Body @{
  model = "bge-m3"
  prompt = "Hello, world!"
} | ConvertTo-Json
```
