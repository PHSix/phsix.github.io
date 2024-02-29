---
title: 从 preact-ssg 开始讲起的如何理解 ssr/ssg
create-time: 2024-02-09
tags:
  - ssr
  - ssg
---

# 为什么想到聊这个话题？

笔者最近在使用`preact`搭建个人网站，在搭建的过程中笔者个人比较注重了几个方面，也是未来建站维护的思路：

1. 一定要有`ssg`的支持，这是因为ssg能够为我们的网页带来更好的前端页面首屏加载，同时对于搜索引擎的seo优化有一定的作用。
2. 框架的选择一定要轻，速度一定足够的快，轻量的框架能够让网页请求资源耗费的时间大大减断，这对于国内用户去访问部署在github.io网站的时候会友好许多。
3. 框架本身要足够的简单，上手难度要小而且设计上的坑不能多，而且框架应该还是要选择主流的被长时间验证过的框架。

结合以上几点，笔者最后选中了`preact`，一个类`react`的快速且轻量化的前端框架，可惜的是`preact`目前的生态环境并不好，围绕此框架开发的很多东西都很久未维护了，但好在笔者也算是个轮子侠，什么东西都喜欢自己造，所以也影响不大。另外对于框架最复杂的一些功能支持比如`render-to-string`和`hydrate`之类的此框架内也都有支持（就是坑比较多），所以最后选择了preact。

# 什么是 ssg/ssr？

先从`ssr`的说起吧，它的全称是“Server-Side Rendering”，也就是我们常说的服务端预渲染，类似于“上古”时期的`jsp`以及`Django`中的模板代码功能，通过服务端将网页内容渲染完成之后以`html`文件的形式发送回客户端，通常在`jsp`的项目中，使用场景是会从服务端获取数据，然后再在客户端通过`jquery`操作进行显示或者直接写到`jsp`的模板语法中去。

之所以服务端预渲染的任务从之前的`java`和`python`等语言的框架中抽离，一个很大的原因是现代前端框架的出现（`Vue.js`和`React`等框架）带来了前后端分离的架构，前端开发者能够更加聚焦于交互，后端开发者也更聚焦于业务，而且现代的声明式框架还带来了简洁明了等优点。但是此类声明式框架的出现又带来了一个问题，因为无论是`Vue`还是`React`，它们都是运行于浏览器之上，相当于传统的服务端开发思路是返回一个已经完成百分之七八十的html文件，然后等其他 script 脚本去动态加载剩下的一些东西，而现代化框架的思路是返回一个空的html文件，然后等待 script 文件加载去创建整个html文档里面的dom树内容，这种形式就叫做`CSR`，也就是客户端渲染。

这样加载文档会带来一些问题，最大的问题是使用这些框架的网站没法做搜索引擎的seo优化，或者说很难做这个优化。因为这里搜索引擎抓取你的网站的时候是发送一个爬虫请求过来，它并不会去运行你具体的 script 脚本中到底做了些什么，而是直接拿到你的空html作为它的爬取结果。还有的问题是数据请求上的，在客户端渲染的情况下，每渲染一个客户端就要去做一些相同的http请求，这个过程中tcp的连接是有代价的，除开服务接口性能上的消耗不说，客户端渲染的方式需要你再多次请求数据后再渲染出来会显得比较慢，这个耗时主要是来自于请求的异步io，前后端建立连接传输数据可能是耗时的。

所以到了后面，也就是现在，人们开始又把服务端预渲染的功能提了出来，使用`nodejs`在服务端预先渲染好要获取的html文件，这个过程中需要使用`nodejs`去运行组件代码并生成一个“伪”Dom树，也就是通过`render-to-string`将组件渲染成一大段Dom树内容并写入到html文件内容，这个过程中可能会涉及到的一些公共不频繁变动数据的接口请求就都可以丢到这个过程中将数据写到实际html文件中。

然后说说ssg，它的全称是“Static site generation”，也是一种服务端预渲染的技术，只不过它并不依赖于服务端运行时，ssg的项目一般依赖于项目构建的时候执行一次在服务端，之后就运行在客户端上，某种意义上可以将这理解为只运行了一次的ssr。ssg和ssr最大的区别就是面向的应用不同，ssg更适合开发动态接口少的情况等文档类网站，而ssr则是什么都能干，不过对服务端的性能可能是会有一定的要求。

# 现代化前端框架支持 ssr/ssg 的条件是什么

对于现代化框架来说，想要支持预渲染功能，最重要的条件我认为是以下两个：

1. 实现`hydrate`，这个单词翻译成中文是“水合”，但是听起来感觉很奇怪，其实就是已有的dom树和script脚本中的dom树做深层的diff对比，然后将代码 script 脚本中的逻辑挂载上去。
2. 实现`render-to-string`使得框架的一些渲染工作能在`node.js`环境下执行。

如在`preact`中，`hydrate`的实现就是通过去对比 script 里面声明的结构树和实际的dom树，对于不同的部分最后会以js里声明的结构树为准。

```javascript
// preact中hydrate的实现，用了已存在的节点进行对比渲染
// source code position: https://github.com/preactjs/preact/blob/238d58074436acc589c00c83bc774d83fac3f716/src/render.js#L71
/**
 * Update an existing DOM element with data from a Preact virtual node
 * @param {ComponentChild} vnode The virtual node to render
 * @param {PreactElement} parentDom The DOM element to update
 */
export function hydrate(vnode, parentDom) {
  render(vnode, parentDom, hydrate);
}
```

然后是`render-to-string`，这个过程在`preact`中涉及到好几个库，分别是：[preact-render-to-string](https://www.npmjs.com/package/preact-render-to-string)、[preact-iso](https://www.npmjs.com/package/preact-iso)和[@preact/preact-vite](https://www.npmjs.com/package/@preact/preset-vite)。它们之间的关系如下图所示：

![vite-preact](/public/images/vite-preact.png)

总的来说就是`preact`将一套约定拆分的两个部分，一个是`vite`的打包器部分，另一个是用户声明代码的部分，两者都要遵循一套逻辑才能正常工作。在代码打包阶段，`vite`会去执行`prerender`函数并将 html 的渲染结果写到最后的 bundle 文件夹中，这样便实现了最简单的 ssg。
