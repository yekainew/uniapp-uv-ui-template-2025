# uniapp-vue3-template

# 开发规范


## 市面上常用的命名规范：

 - camelCase（小驼峰式命名法 —— 首字母小写）
 - PascalCase（大驼峰式命名法 —— 首字母大写）
 - kebab-case（短横线连接式）
 - snake_a（下划线连接式）

## 项目文件命名:

### 1、项目名

##### 全部采用小写方式， 以下划线分隔。 例：uniapp-vue3-template；

### 2、组件（components）命名

##### 优先选择单个单词命名，多个单词命名以小驼峰式命名。例：camelCase；

### 3、pages里面的文件名

##### 全部采用小写方式， 优先选择单个单词命名，多个单词命名以下划线分隔。 例：index_page；

### 4、css文件名

##### 全部采用小写方式， 优先选择单个单词命名，多个单词命名以短横线分隔。例：index-page.css

### 5、JavaScript 文件名

##### 全部采用小驼峰式方式， 优先选择单个单词命名，多个单词命名以短横线分隔。例：indexPage.js

### 6、HTML 文件名

##### 全部采用小写方式， 优先选择单个单词命名，多个单词命名以下划线分隔。例：index_page.html

### 7、图像文件名

##### 全部采用小写方式， 优先选择单个单词命名，多个单词命名以短横线分隔。例：index-page.jpg

##  目录结构:

```
└─view uni-app存放根目录
  ├─common 
  │ ├─api 接口统一存放目录
  │ │ ├─index.js 接口统一导出
  │ │ └─user.js 用户接口
  │ ├─config 配置目录
  │ │ ├─cache.js 缓存键名设置
  ├─components 组件目录
  ├─pages 页面目录
  │ ├─index 首页
  │ │ └─index 首页
  │ ├─indexs 首页分包目录
  │ │ └─index !首页分包页面，按此逻辑分包，由功能划分
  │ ├─user 个人中心
  │ ├─users 我的页面分包
  │ │ └─login 登录
  ├─static 静态文件
  │ ├─css 样式文件
  │ ├─iconfont 小图标字体包
  │ ├─images  图片包
  ├─stores pinia目录
  ├─utils 工具类目录
  │ ├─request 请求基类
  │ ├─util.js 工具函数
  ├─.env.development    
  ├─.env.production    
  ├─App.vue    
  ├─main.js
```

