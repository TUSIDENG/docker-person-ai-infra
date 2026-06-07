# 基于 ghcr.io/openclaw/openclaw:latest 构建自定义镜像
FROM ghcr.io/openclaw/openclaw:latest

# 配置 npm 镜像源（阿里云镜像）
RUN npm config set registry https://registry.npmmirror.com

# 配置 Electron 镜像（通过环境变量）
ENV ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
ENV ELECTRON_BUILDER_BINARIES_MIRROR=https://npmmirror.com/mirrors/electron-builder-binaries/

# Gateway 配置（从构建参数获取，默认值作为 fallback）
ARG OPENCLAW_GATEWAY_PORT=18799
ARG OPENCLAW_GATEWAY_TOKEN=your_openclaw_gateway_token
ARG OPENAI_API_BASE=http://model-ollama:11434/v1
ARG VECTOR_STORE_URL=http://db-qdrant:6333

ENV OPENCLAW_GATEWAY_PORT=${OPENCLAW_GATEWAY_PORT}
ENV OPENCLAW_GATEWAY_TOKEN=${OPENCLAW_GATEWAY_TOKEN}
ENV gateway.mode=local
ENV OPENAI_API_BASE=${OPENAI_API_BASE}
ENV EMBEDDING_API_BASE=${OPENAI_API_BASE}
ENV VECTOR_STORE_URL=${VECTOR_STORE_URL}

# 使用完整命令（基础镜像的 ENTRYPOINT 是 tini，会自动包装）
CMD ["node", "openclaw.mjs", "gateway", "--allow-unconfigured"]
