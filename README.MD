# docker-person-ai-infra
使用docker-compose部署个人ai基础设施

## 创建网络
```bash
# 创建ai-infra-network网络
# 用于ai-infra中容器通信
docker network create ai-infra-network
```
### Docker 网络模式
[详细说明](Docker-Network.md)
