# 基于 ghcr.io/openclaw/openclaw:latest 构建自定义镜像
FROM ghcr.io/openclaw/openclaw:latest

# 配置 npm 镜像源（阿里云镜像）
RUN npm config set registry https://registry.npmmirror.com

# 配置 Electron 镜像（通过环境变量）
ENV ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
ENV ELECTRON_BUILDER_BINARIES_MIRROR=https://npmmirror.com/mirrors/electron-builder-binaries/

# 不覆盖 ENTRYPOINT 和 CMD，保持原有配置
