# Docker 网络模式

Docker 提供多种网络模式，完整列表如下：

## docker 网络模式说明

### 独立网络模式（创建独立的网络）

| 模式 | 说明 | 适用场景 |
|------|------|---------|
| **bridge** | 默认模式，容器通过虚拟网桥通信，通过 NAT 与宿主机通信。 | **大多数场景**，本项目使用此模式 |
| **host** | 直接使用宿主机网络，绕过 Docker 网络层。 | 高性能、低延迟场景 |
| **none** | 完全禁用网络，容器隔离。 | 安全隔离 |
| **overlay** | 跨 Docker 主机创建分布式网络。 | **Docker Swarm 集群** |
| **macvlan** | 容器拥有独立 MAC 地址，像真实物理设备。 | 需要暴露在物理网络中 |
| **ipvlan** | 容器共享宿主机网卡，但有独立 IP。 | 需要独立 IP 但共享网卡 |

### 特殊模式（让容器加入现有网络）

| 模式 | 说明 | 适用场景 |
|------|------|---------|
| **container** | 加入另一个容器的网络命名空间，共享网络栈。 | 容器间共享网络（如 sidecar 模式） |
| **nsenter** | 通过 nsenter 进入宿主机的网络命名空间。 | 高级调试场景 |

### 本项目使用的 bridge 模式详解

本项目创建的 `ai-infra-network` 是一个 **自定义 bridge 网络**：

```bash
docker network create ai-infra-network
```

## 容器如何访问宿主机

在 bridge 模式下，容器访问宿主机有 **3 种主要方式**：

### 方式 1：使用 Docker Desktop 特殊 DNS（推荐）

Docker Desktop 提供内置 DNS 名称：

| DNS 名称 | 说明 | 示例 |
|---------|------|------|
| `host.docker.internal` | 宿主机 IP | `curl http://host.docker.internal:8080` |
| `gateway.docker.internal` | Docker 网关 IP | - |

```bash
# 容器内访问宿主机的代理
curl http://host.docker.internal:6789

# 在 docker-compose.yml 中配置
environment:
  - HTTP_PROXY=http://host.docker.internal:6789
```

### 方式 2：通过 Docker 网关访问

Docker 为每个 bridge 网络自动分配网关：

```bash
# 查看网络网关
docker network inspect ai-infra-network | grep Gateway
# 输出: "Gateway": "172.18.0.1"

# 容器内通过网关访问宿主机
curl http://172.18.0.1:8080
```

**说明**：
- **Linux 服务器**：网关 IP 固定，可直接使用
- **Windows Docker Desktop**：网关 IP 可能在重启后变化，建议使用 `host.docker.internal`

### 方式 3：使用宿主机真实 IP

```powershell
# Windows 查看宿主机 IP
ipconfig
# 找到"以太网适配器 vEthernet (WSL)" 的 IPv4 地址

# Linux/macOS 查看宿主机 IP
hostname -I | awk '{print $1}'
```

```bash
# 在容器内使用
curl http://192.168.1.100:8080
```

**说明**：
- **Linux 服务器**：通常配置静态 IP，可直接使用
- **Windows/macOS 开发环境**：IP 可能通过 DHCP 分配，建议使用 `host.docker.internal`

## 生产环境 vs 开发环境

| 环境 | 网关 IP | 宿主机 IP | 推荐方式 |
|------|--------|----------|---------|
| **Linux 服务器** | ✅ 固定 | ✅ 静态 IP | 直接使用 IP 或网关 |
| **Windows Docker Desktop** | ⚠️ 可能变化 | ⚠️ DHCP | 使用 `host.docker.internal` |
| **macOS Docker Desktop** | ⚠️ 可能变化 | ⚠️ DHCP | 使用 `host.docker.internal` |

## 网络架构图（Windows Docker Desktop）

```
┌─────────────────────────────────────────┐
│        宿主机 (Windows)                  │
│  ┌─────────────────────────────────┐    │
│  │   Docker Desktop (WSL2)        │    │
│  │                                 │    │
│  │  ┌─────────────────────────┐  │    │
│  │  │   Docker Engine         │  │    │
│  │  │                         │  │    │
│  │  │  ┌─────────────────┐  │  │    │
│  │  │  │ ai-infra-network │  │  │    │
│  │  │  │  (bridge)        │  │  │    │
│  │  │  │  Gateway:172.18  │  │  │    │
│  │  │  │                  │  │  │    │
│  │  │  │  ┌────────────┐  │  │  │    │
│  │  │  │  │   ollama  │  │  │  │    │
│  │  │  │  └────────────┘  │  │  │    │
│  │  │  │  ┌────────────┐  │  │  │    │
│  │  │  │  │   qdrant  │  │  │  │    │
│  │  │  │  └────────────┘  │  │  │    │
│  │  │  └─────────────────┘  │  │    │
│  │  └─────────────────────────┘  │    │
│  └─────────────────────────────────┘    │
│                                         │
│  host.docker.internal ───────────────────┼──→ 宿主机网络服务
│                                         │
└─────────────────────────────────────────┘
```

**优势**：
- **内置 DNS**：容器可以通过容器名直接通信（如 `ollama-cli` 访问 `http://ollama:11434`），无需手动配置 IP 或使用 `--link`
- **网络隔离**：不影响其他 Docker 应用的默认网络，避免端口冲突
- **灵活配置**：可以自定义子网、网关、DNS 等参数
- **易于管理**：可以通过 `docker network` 命令统一管理

**与默认 bridge 的核心区别**：

| 特性 | 默认 bridge | 自定义 bridge（本项目） |
|------|------------|----------------------|
| 容器名通信 | ❌ 需要 `--link` 或 IP | ✅ 内置 DNS 自动解析 |
| 网络隔离 | ❌ 所有容器共享 | ✅ 独立网络 |
| 配置灵活性 | ❌ 有限 | ✅ 完全自定义 |

**工作原理**：
```
宿主机 (Windows) 
    ↓
Docker Desktop (WSL2)
    ↓
ai-infra-network (bridge)
    ├── ollama (11434)
    ├── ollama-cli
    ├── ollama-pull
    ├── qdrant (6333)
    ├── postgres (5432)
    └── redis (6379)
```