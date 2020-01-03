# MiniHelper文档
> 主要是为了方便在vscode中快速新建小程序页面、组件


## 使用
1. 在vscode资源管理右键---`新建小程序页面/新建小程序组件`
2. 在弹出的输入框输入`页面/组件`名称即可
![image](https://tva1.sinaimg.cn/large/006tNbRwly1gaiiqy9fmbg30yw0frai9.gif)

## 设置项
1. 打开vscode设置
2. 选择组件MiniHelper
    - Mini Type小程序类型：`we`:微信小程序 `ali`:阿里系小程序， 当用户输入不匹配时默认是微信小程序
    - Use Redux是否在小程序中启用redux状态管理
    - Redux Connect Path配置连接小程序和redux的connect路劲，路劲相对于小程序的app.js

    ![image](https://tva1.sinaimg.cn/large/006tNbRwly1gaiiv0im8hg30zi0dmdhp.gif)
3. 此时新建的page和组件会包含connect-redux的内容

    ![](https://tva1.sinaimg.cn/large/006tNbRwly1gaiiyhixw1j30x60d70u8.jpg)

### 关于小程序引入redux

可参考开源[wechat-weapp-redux](https://github.com/charleyw/wechat-weapp-redux)项目，该项目不支持**组件**引入redux，在此项目基础上做了点修改后可以兼容组件的语法了，需要用到到[redux-miniapp](https://github.com/iChard/redux-miniapp)克隆项目源代码，然后根据wechat-weapp-redux使用文档使用即可（需要在项目中安装redux）