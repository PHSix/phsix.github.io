---
title: wasm的现况
create-time: 2024-02-27
tags:
  - wasm
---

> 前段时间花了些时间调研了一下`WebAssembly`（后面简称为**wasm**）技术的现状，
> 发现现在wasm的发展的生态比想象中要完善很多也要更加全面，
> 很多基础设施也都搭建起来了，社区整体也很活跃，欣欣向荣

现阶段wasm发展发力的方向主要为以下几个方向：

1. 做内嵌到浏览器端，加速浏览器中*JavaScript*的执行计算，通过`rust`和`c++`等高性能系统编程语言编译到`wasm`平台然后通过`js api`的形式去调用来计算，这一个如国内的字节飞书团队就有大量实践。
2. 还是做内嵌到浏览器中，但是是将现有的由`c`/`cpp`/`rust`语言编写的原生应用编译到浏览器端，通过重写少部分`wasm`接口将此类原生应用迁移到浏览器中，此类应用有如`ffmpeg`和`sqlite`，目前这两个项目都已经成功迁移到了wasm平台上，同时还有类似于[vim.wasm](https://github.com/rhysd/vim.wasm)等此类应用。
3. 拓展wasm标准，由于wasm一开始的计算是运行到浏览器平台的，所以它是*单线程*的而且它的所有 api 接口都来源于 web 平台，但随着 wasm 的普及，`wasm`被带到了多宿主环境之中，在不同的平台上可以通过不同的`wasm运行时`（如[WasmEdge](https://wasmedge.org/)、[wasmer](https://wasmer.io/)、[wasmtime](https://wasmtime.dev/)）运行起 wasm 代码，同时在桌面平台上出现了[wasi](https://wasi.dev/)甚至是[wasix](https://wasix.org)接口规范赋予了 wasm 访问系统环境的能力，甚至是多线程的能力。
4. 拓展使用wasm作为插件系统运行时，这个方向的思想类似于将wasm嵌入到浏览器中。得益于wasm跨平台、跨语言、高性能的特性，使得wasm很适合用作插件系统，开发者可以通过不同编程语言编写出统一的wasm程序丢到插件线程中执行，主程序中只需要提供插件进程与主进程通信所需要的一些基础api接口，其它的拓展能力都交给到插件系统。这点设计类似于vscode的插件系统，只不过vscode上跑的是最后的js代码，而wasm插件线程跑的是的wasm，后者更快、也更加自由。目前此类拓展系统项目有如[extism](https://extism.org/)、[lapce](https://lapce.dev/)和未来的[zed](https://zed.dev)（maybe?）等。
5. serverless平台，这一方面目前在国外比较火爆，在国内因为大厂云函数产品的坑比较多，所以并不流行。在国外像AWS、Vercel和Netlify等平台的serverless对wasm的支持都很好，可以使用[WasmEdge](https://wasmedge.org/)创建serverless函数。
6. 容器化和云原生。

# 其它
