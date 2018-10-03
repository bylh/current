

export const ResumeTemplateContent = `
# 李欢


## 实习及工作经历

### 借贷宝实习生：借贷宝app产品开发与测试 (Software-defined Cloud Network)

* 基于 NSO 控制器开发 IDC 与运营商网络协同自动化框架。
* 开发基于 Segment Routing 的广域网专线 QoS 调度系统。

### 实验室项目：面向远程医疗的SDN网络可靠性及安全研究 (Java)

* 基于 SDN 为数据中心远程医疗平台提供防火墙、DDoS 防御、QoS 保障、链路快速恢复、路由环路与黑洞检测能力。

### 众途户外： 专注于户外旅游

* 全栈开发，基于leaflet地图开发，使用ionic + angular + node实现web app的离线开发，实现andriod ios pc端共同开发
* electron 实现地图的编辑工作
### [个人网站](https://bylh.top) (点击链接试试吧)

* 使用angular6开发，后端使用nodejs + express + mongo, 使用nginx反向代理实现服务器端口转发，配置https

### [个人仓库](https://github.com/bylh)(点击链接试试吧)

* 项目持续添加中，欢迎交流，共同学习

### [个人博客](https://blob.bylh.top) (点击链接试试吧)

* 待配置，迁移

### [个人简历](https://blob.bylh.top/resume) (点击链接试试吧)


## 教育经历

1. **北京邮电大学 - 计算机科学与技术**             本科

	* 喜欢钻研


## 其他

cet-4 (525)


## 博客

**GitHub: **https://github.com/ShiningDan
**Animation Resume: https://shiningdan.github.io/react-animation-resume/**

> 做最好的自己`;
		
export const ResumeTemplateStyle = [`/*
* Inspired by http://strml.net/
* 
* Hi, 我是李欢
*
* 我用 React 做了一份简易的动态简历
* 希望大家能够喜欢 :)
*/

/* 所以我们就开始吧！首先给所有元素加上过渡效果 */
* {
  -webkit-transition: all 1s;
  transition: all 1s;
}
/* 白色背景太单调了，我们来点背景 */
html {
  color: rgb(222,222,222); background: #425261; 
}
/* 文字直接显示在页面上，没有任何装饰，真的人反人类呢！所以我们来给文字加点装饰吧~~ */
.styleEditor {
  position: fixed; left: 0; top: 0;
  background-color: #303030;
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
  width: 45vw; height: 90vh;
}
/* 作为一个程序员，我们不可以太沉闷哦~~，给自己的代码加一点色彩吧 */
.token.comment{ color: #857F6B; font-style: italic; }
.token.selector{ color: #E86E75; }
.token.property{ color: #F78C6C; }
.token.punctuation{ color: #88DCFE; }
.token.function{ color: #82AAFF; }

/* 加一点 3D 效果，更加地酷炫 */
html{
  -webkit-perspective: 1000px;
          perspective: 1000px;
}
.styleEditor {
  position: fixed; left: 0; top: 0; 
  -webkit-transition: none; 
  transition: none;
  -webkit-transform: rotateY(10deg) translateZ(-100px) ;
          transform: rotateY(10deg) translateZ(-100px) ;
}
/* 不知道以上对代码框的修改你是否喜欢呢？ */

/* 接下来我给自己准备一个编辑器，用来存放我的简历内容 */
.resumeEditor{
  position: fixed; right: 0; top: 0;
  padding: .5em;  margin: .5em;
  width: 48vw; height: 90vh; 
  border: 1px solid;
  background: white; color: #222;
  overflow: auto;
}

/* 好了，我开始写简历了 */
`,
`
/* 这个简历好像差点什么
 * 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
 * 简单，用开源工具翻译成 HTML 就行了
 *           3          
 *           2          
 *           1          
 *          啦啦！
 */
`,
`
/* 再对 HTML 加点样式 */
.resumeEditor{
  padding: 2em;
}
.resumeEditor h1{
  display: block;
  width: 80px;
  margin: 0 auto;
}
.resumeEditor h2{
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
.resumeEditor h3{
	display: inline-block;
	margin: 0.5em 0;
}
.resumeEditor a{
	color: #000;
}
.resumeEditor ul{
	list-style: none;
}
.resumeEditor ul>li::before {
	content: "•";
	margin-left: 1em;
	margin-right: 0.5em;
}
.resumeEditor blockquote {
  margin: 1em;
  padding: .5em;
  background: #ddd;
}
/*
* I hope you enjoyed this.
*/
`];