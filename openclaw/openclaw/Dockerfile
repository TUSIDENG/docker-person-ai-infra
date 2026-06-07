# 基于 ghcr.io/openclaw/openclaw:latest 构建自定义镜像
FROM ghcr.io/openclaw/openclaw:latest

# 配置 npm 镜像源（阿里云镜像）
RUN npm config set registry https://registry.npmmirror.com

# 配置 Electron 镜像（通过环境变量）
ENV ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
ENV ELECTRON_BUILDER_BINARIES_MIRROR=https://npmmirror.com/mirrors/electron-builder-binaries/

# 设置 PATH
ENV PATH=/usr/local/bin:$PATH

# 创建配置目录并设置权限
RUN mkdir -p /home/node/.openclaw/workspace && \
    chown -R node:node /home/node/.openclaw

# 使用默认命令启动
CMD ["node", "openclaw.mjs", "gateway"]
