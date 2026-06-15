# OpenCLAW 模型方案

## DeepSeek

- **模型**：DeepSeek V4 Flash（主力）
- **定价**：$0.14 / $0.28 每百万 token（输入/输出）
- **特点**：经济实惠，文本推理能力强，1M context window
- **适合**：纯文本任务

## Gemini

- **模型**：Gemini 2.5 Flash（多模态替补）
- **定价**：$0.30 / $2.50 每百万 token
- **特点**：支持图片/视频/音频/PDF 输入，原生 function calling，有免费层
- **适合**：多模态场景

## 火山引擎（豆包大模型）— Coding Plan

为开发者量身定制的订阅服务，助力高效编码开发。

**建议开通 Lite 套餐**（中等强度开发任务，适合大多数开发者）。

### 特点

- **兼容主流 AI 编码工具**：Claude Code、OpenCode、**OpenClaw**、TRAE、Cline、Cursor、Roo Code、Kilo Code 等，套餐额度共享
- **支持 Embedding 向量化模型**：Doubao Embedding Vision 等

### 支持模型

Doubao Seed Code、Doubao Seed 2.0 系列、GLM 系列、MiniMax 系列、Kimi 系列、DeepSeek 系列等主流大模型。

### 定价

| 套餐 | 适用场景 |
|------|----------|
| **Lite ✨ 推荐** | 中等强度开发任务，适合大多数开发者 |
| Pro | 复杂项目开发，适合高强度工作 |

首月 **¥9.9**，次月起 **¥40/月**

## OpenCode Go 计划

- **定价**：首月 **$5**，次月起 **$10/月**
- **类型**：国内大模型服务平台
- **适合**：兼顾海外和国内模型的实惠方案

### 模型请求配额（Go 计划）

| 模型 | 每 5h | 每周 | 每月 |
|------|------|------|------|
| GLM-5.1 | 880 | 2,150 | 4,300 |
| GLM-5 | 1,150 | 2,880 | 5,750 |
| Kimi K2.6 | 1,150 | 2,880 | 5,750 |
| Kimi K2.7 Code | 1,350 | 4,630 | 9,250 |
| MiMo-V2.5 | 30,100 | 75,200 | 150,400 |
| MiMo-V2.5-Pro | 3,250 | 8,150 | 16,300 |
| MiniMax M3 | 3,200 | 8,000 | 16,000 |
| MiniMax M2.7 | 3,400 | 8,500 | 17,000 |
| Qwen3.7 Max | 950 | 2,390 | 4,770 |
| Qwen3.7 Plus | 4,300 | 10,800 | 21,600 |
| Qwen3.6 Plus | 3,300 | 8,200 | 16,300 |
| DeepSeek V4 Pro | 3,450 | 8,550 | 17,150 |
| DeepSeek V4 Flash | 31,650 | 79,050 | 158,150 |

---

## 策略

| 场景 | 选择 |
|------|------|
| 纯文本 + 性价比 | **DeepSeek V4 Flash** |
| 多模态 + 搜索能力 | **Gemini 2.5 Flash** |
| 国内 API 聚合（主力） | **火山引擎 Lite** — Doubao/DeepSeek/GLM/Kimi/MiniMax |
| 国内 API 聚合（补盲） | **OpenCode Go** — Qwen/MiMo/DeepSeek/GLM/Kimi/MiniMax |

> **互补关系**：火山引擎覆盖 Doubao Seed 系列，OpenCode 覆盖 Qwen 和 MiMo，两家合起来几乎覆盖所有国内主流模型。

### 模型覆盖对照

| 模型族 | 火山引擎 | OpenCode |
|--------|:--------:|:--------:|
| Doubao Seed Code/2.0 | ✅ | ❌ |
| DeepSeek V4 Pro/Flash | ✅ | ✅ |
| GLM 系列 | ✅ | ✅ |
| Kimi 系列 | ✅ | ✅ |
| MiniMax 系列 | ✅ | ✅ |
| Qwen 系列 | ❌ | ✅ |
| MiMo 系列 | ❌ | ✅ |
