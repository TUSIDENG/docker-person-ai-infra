# docker-person-ai-infra
使用docker部署个人ai基础设施，基于windows+docker desktop实现。

## 创建网络
启用所有容器前，先创建ai-infra-network网络
```bash
# 创建ai-infra-network网络
# 用于ai-infra中容器通信
docker network create ai-infra-network
```

## 容器组分类
- databases：数据容器组，负责存储数据。
- database_management：数据库管理容器组，由Adminer,Redis Insight等组成。
- ollama：ollama模型服务容器组，负责管理ollama模型。
- openclaw：openclaw模型容器组，负责运行openclaw服务。
- n8n：n8n模型容器组，负责运行n8n服务。暂未启用。
- dify：dify模型容器组，负责运行dify服务。暂未启用。