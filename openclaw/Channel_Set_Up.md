# 设置channel

1. 使用openclaw-cli容器配置channel
![开始配置channel](imgs/channel_set_01.png)

2. 扫码二维码登录channel
![扫码登录channel](imgs/channel_set_02.png)

 * 由于是容器，无法直接重启网关，等待到容器退出后，再重启网关容器
![扫码登录channel](imgs/channel_set_03.png)

3. 重启openclaw-gateway容器
![重启openclaw-gateway容器](imgs/channel_set_04.png)

4. 测试channel
* 微信BOT询问
![测试channel](imgs/channel_set_05.png)
* dashboard界面查看微信BOT会话记录
![测试channel](imgs/channel_set_06.png)