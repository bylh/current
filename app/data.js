export const ResumeTemplateStyle = [
`/*
* Hello, 我是李欢
*
* 这是用react版的动态简历
* 希望大家能够喜欢 :)
*/

/* 所以我们就开始吧！首先给所有元素加上过渡效果 */
* {
-webkit-transition: all .3s;
transition: all .3s;
}
/* 白色背景太单调了，我们来点背景 */
html {
color: #14d112; background: #000000; 
}
.styleEditor {
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
  width: 45vw; height: 90vh;
}
/* 哈哈，有没有一点儿黑客效果*/
/* 再加一点 3D 效果，更加地酷炫 */
html{
-webkit-perspective: 1000px;
perspective: 1000px;
}
.styleEditor {
position: fixed; left: 0; top: 0; 
-webkit-transition: none; data
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
*          action！
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
`];

export const ResumeTemplateContent =
 `
# react版动态简历

## 个人爱好

	1. 技能树：
			html(5)，css(3)，ES5，ES6，scss，node.js；
			php，mysql，asp.net,asp（这些很久不用了）;
	2. 生活：
			乒乓球,电影；
			穿越火线（大学玩的真的是昏天暗地啊，间接证明是真爱！😝😝工作后忙了，基本没时间玩了）；

## 博客

**GitHub: **https://github.com/songhaoreact
** 博客: http://songhao888.cn/**

> 如果你喜欢这个效果，Fork [我的项目](https://github.com/ShiningDan/reactjianli)，打造你自己的简历！
`

