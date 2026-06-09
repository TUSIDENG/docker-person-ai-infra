# TOOLS.md - Demo 子代理

## 可用工具

本代理默认拥有以下工具权限：

| 工具 | 用途 |
|------|------|
| `read` | 读取文件内容 |
| `edit` | 编辑文件 |
| `write` | 创建新文件 |
| `exec` | 执行系统命令 |
| `web_search` | 搜索网络信息 |
| `web_fetch` | 获取网页内容 |
| `memory_search` | 搜索记忆 |
| `memory_get` | 获取记忆片段 |

## 使用示例

```
# 读取文件
read: {"path": "/path/to/file"}

# 执行命令
exec: {"command": "echo 'Hello World'"}

# 搜索网络
web_search: {"query": "什么是子代理"}
```