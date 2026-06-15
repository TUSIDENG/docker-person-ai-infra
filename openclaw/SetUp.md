# 初始化配置openclaw

1. 运行命令开始初始化
![docker容器初始化配置](imgs/setup_01.png)

2. 快速启动配置
    * 选择openclaw为个人使用
![选择使用范围](imgs/setup_02.png)
    * 确认快速初始化
![确认初始化](imgs/setup_03.png)

3. 选择默认模型，建议选择Deepseek
![选择默认模型](imgs/setup_04.png)
![选择默认模型](imgs/setup_05.png)

    * 如果在.env文件已配置DEEPSEEK_API_KEY，就不需要手动输入了
![选择默认模型](imgs/setup_06.png)

4. 选择channel,如微信BOT,QQ BOT等
![选择channel](imgs/setup_07.png)
    * dockeer安装需要先跳过该步骤
![选择channel](imgs/setup_08.png)

5. 搜索引擎，保持默认即可
![选择搜索引擎](imgs/setup_09.png)

6. 跳过技能配置
![跳过技能配置](imgs/setup_10.png)

7. 跳过钩子(hooks)配置
![跳过钩子(hooks)配置](imgs/setup_11.png)

8. 选择稍后启动
![选择稍后启动](imgs/setup_12.png)

9. 启动openclaw-gateway容器
![启动openclaw](imgs/setup_13.png)

10. 会话界面初始化
 * 注册节能
    * memory-vector-config：配置 OpenCLAW 向量记忆搜索
    * agent-spawner：交互式创建子智能体
* 注册demo agent，用于演示子智能体功能
![会话界面初始化](imgs/setup_14.png)
![会话界面初始化](imgs/setup_15.png)

11. 使用技能memory-vector-config，配置 OpenCLAW 向量记忆搜索
![配置向量记忆搜索](imgs/setup_16.png)
![配置向量记忆搜索](imgs/setup_17.png)
![配置向量记忆搜索](imgs/setup_18.png)

12. 配置 OpenCLAW 向量记忆搜索可能会失败，再次确认
![确认向量记忆搜索配置](imgs/setup_19.png)
![确认向量记忆搜索配置](imgs/setup_20.png)
