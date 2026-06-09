---
name: "agent-spawner"
description: "更新目录结构：子代理工作区统一放在 $WORKSPACE_DIR/<agent-name>/ 下"
metadata:
  maintainer: "Main Agent"
  scope: "用户交互式子代理创建与管理"
  version: "1.4.0"
---

# 子代理创建与注册流程

## 核心原则

指挥不亲为。当用户要求创建新子代理时，**不要**直接调用 `sessions_spawn` 或 `openclaw` CLI。先走完本流程，获得明确指令后再执行。

## 环境说明

OpenCLAW 实际目录结构（可通过环境变量读取）：

| 变量 | 值 |
|------|-----|
| `OPENCLAW_STATE_DIR` | `~/.openclaw` |
| `OPENCLAW_CONFIG_PATH` | `~/.openclaw/openclaw.json` |
| `OPENCLAW_CONFIG_DIR` | `~/.openclaw` |
| `OPENCLAW_WORKSPACE_DIR` | `~/.openclaw/workspace` |

**子代理的工作区文件统一放在 `$OPENCLAW_WORKSPACE_DIR/<agent-name>/` 下。**  
即：`~/.openclaw/workspace/<agent-name>/`

> 脚本中应优先使用 `$OPENCLAW_WORKSPACE_DIR` 环境变量拼接路径，而非硬编码。

## 步骤 1：需求分析与确认

- 仔细阅读用户提供的子代理功能描述。
- 总结并反馈给用户：
  - 子代理的核心功能。
  - 建议的角色名称（基于功能）。
  - 建议的工作上下文（如需要访问的目录、工具权限等）。

> **示例话术：** “我理解您想创建一个用于 [功能] 的子代理。我将为其命名为 `[agent-name]`。请确认是否正确，或者您有其他想法？”

## 步骤 2：用户决定

- **情况 A（创建）：** 用户同意。进入步骤 3。
- **情况 B（修改）：** 用户要求调整设定（如名称、功能、权限）。回到步骤 1，更新后再次确认。
- **情况 C（取消）：** 终止流程，礼貌回应。

## 步骤 3：创建子代理文件

在 `$OPENCLAW_WORKSPACE_DIR/<agent-name>/` 下建立标准结构：

```
$OPENCLAW_WORKSPACE_DIR/<agent-name>/
  agent.yaml      # 子代理配置文件
  AGENTS.md       # 子代理角色与能力说明
  SOUL.md         # 个性与行为准则
  TOOLS.md        # 可用工具与外部接入点
  USER.md         # 用户信息（如有）
```

即：`~/.openclaw/workspace/<agent-name>/`

创建 `agent.yaml` 时，默认使用如下最小配置：

```yaml
config:
  name: "[agent-name]"
  description: "[用户确认的功能摘要]"
  tools:
    allow:
      - read
      - edit
      - write
      - exec
      - <tool-name>  # 根据功能添加
```

- **默认不启用 Git 管理。**
  - 若用户主动要求，必须**再次确认**：“您是否确定要为此子代理单独启用 Git 管理？这将不会在主工作区中被统一追踪。”

## 步骤 4：在 OpenClaw 注册

- 配置文件创建完成后，运行以下命令注册：

```bash
openclaw agents add [agent-name] --workspace $OPENCLAW_WORKSPACE_DIR/[agent-name]
```

- 注册成功后，验证代理是否出现在可用列表中：

```bash
openclaw agents list
```

## 步骤 5：在 Main Agent 中注册

- 打开 `$OPENCLAW_WORKSPACE_DIR/AGENTS.md`（即 `~/.openclaw/workspace/AGENTS.md`）。
- 在对应章节（如 `# 子代理列表`）中添加新代理信息：

```markdown
#### [agent-name]
- **功能：** [简要描述]
- **注册时间：** [YYYY-MM-DD]
- **状态：** 活跃
- **工作区：** `$OPENCLAW_WORKSPACE_DIR/[agent-name]`
```

- 保存并提交更改。

## 步骤 6：Git 策略（关键）

- **默认行为：** 子代理目录由主工作区统一 Git 管理（因为子代理文件就在主工作区内部）。
- **例外情况：** 仅当用户**明确**且**再次确认**后，才在子代理目录内执行 `git init`，并更新 `$OPENCLAW_WORKSPACE_DIR/.gitignore` 以排除该子代理目录被主工作区追踪。

## 执行检查清单

- [ ] 步骤 1：需求已分析并反馈给用户？
- [ ] 步骤 2：用户已确认或修改？
- [ ] 步骤 3：文件已创建且结构正确？
- [ ] 步骤 4：OpenClaw 注册成功？
- [ ] 步骤 5：Main Agent 注册成功？
- [ ] 步骤 6：Git 策略已确认并执行？

## 注册命令速查

```bash
# 查看所有子代理
openclaw agents list

# 添加子代理
openclaw agents add [agent-name] --workspace $OPENCLAW_WORKSPACE_DIR/[agent-name]

# 删除子代理
openclaw agents delete [agent-name] --force

# 给子代理发送消息
openclaw agent --agent [agent-name] --message "你好"
```
