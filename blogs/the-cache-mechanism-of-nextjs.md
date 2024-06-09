---
title: Nextjs的缓存机制
create-time: 2024-05-15
tags:
  - nextjs
  - cache
---

> 最近在研究使用next建站，在使用RSC的时候发现了一些新坑，记录一下

在nextjs13之前，由于没有`React Server Component`的存在，缓存的相关操作其实并不是特别复杂，因为浏览器会每次根据请求去进行服务端预渲染，通常在高负载的场景才需要你服务端去做一个计算或者请求结果缓存的策略。但是，在nextjs13以及之后，引入了`RSC`的概念之后，对于`Server Component`，nextjs会把他们编译称`RSC Payload`，同时，我们可以在这个服务端组件中直接写`Nodejs`代码，这部分代码只会在服务端执行，而通常情况下，我们需要在这个`RSC Payload`中携带我们的查询信息，但是这个查询信息会由于客户端的修改操作之后更新，这时我们就需要去更新我们`RSC Payload`，对于这种机制的缓存，我们称之为`Router Cache`。

在nextjs中，缓存的策略分别分为以下几类：
1. Data cache
2. Full route cache
3. Route cache
4. Request Memoization

其中只有`Route cache`是工作在客户端，作用是在浏览器中缓存`RSC Payload`等数据，可以缓存在导航前后的状态数据并恢复

`Data cache`的主要作用是缓存服务端的数据请求，主要是通过`fetch`和`nextjs`的[unstable_cache](https://nextjs.org/docs/app/api-reference/functions/unstable_cache)去缓存异步请求结果或是复杂计算，通过判断tag的变化去进行更新，这里可以模拟以下next的这套缓存机制的实现，同时结合了一部分`Request Memoization`的实现特性，具体代码实现如下：

```typescript
class NextCache {
  private tagCache = new Map<string | Request | URL, VoidFunction[]>()
  private urlResponseCache = new Map<string | Request | URL, Response>()
  private lastFetchTime = new Map<string | Request | URL, number>()
  fetch(url: string | URL | Request, init?: RequestInit & {
    next: { cache: 'no-store' | 'force-cache', revalidate: false | 0 | number }
  }) {
    const cache = init?.next.cache || 'no-store'
    const revalidate = init?.next.revalidate ?? 0
    const f = () => {
      globalThis.fetch(url, init).then((r) => {
        this.lastFetchTime.set(url, performance.now())
        this.urlResponseCache.set(url, r)
        return r
      })
    }
    if (cache === 'no-store')
      return f()

    if (!this.urlResponseCache.has(url) || revalidate === 0)
      return f()

    if (revalidate === false)
      return f()

    const lastTime = this.lastFetchTime.get(url)
    if (!lastTime || lastTime + revalidate * 1000 < performance.now())
      return f()

    return this.urlResponseCache.get(url)
  }

  unstable_cache<Callback extends (...args: any[]) => any>(callback: Callback, tags: string[]): Callback {
    let result: ReturnType<Callback> | null = null
    let needUpdate = false
    const refresh = () => {
      needUpdate = true
    }
    for (const tag of tags) {
      const fns = this.tagCache.get(tag) || []
      fns.push(refresh)
      this.tagCache.set(tag, fns)
    }
    const fn = (...args: any[]) => {
      if (!result || needUpdate) {
        result = callback(...args)
        needUpdate = false
      }

      return result as any
    }

    return fn as any
  }

  revalidateTag(tag: string) {
    const fns = this.tagCache.get(tag) || []

    fns.map(f => f())
  }
}

const cache = new NextCache()

export const fetch = cache.fetch
export const unstable_cache = cache.unstable_cache
export const revalidateTag = cache.revalidateTag
```

最后是`Full Route cache`的特性，在nextjs引入RSC之后，nextjs项目从原来的page router项目结构迁移至app router的项目结构，其中最大的变化就是区分前后两种开发模式下的区别，并引入RSC，在app router开发模式下，nextjs会缓存当前请求的路由页面预渲染的RSC Payload和html页面，并在在每次处理客户端请求的时候去判断当前存在的缓存是否还在缓存的有效周期之内，若是有效，则直接使用缓存，若无效再重新生成RSC和html，这种模式带来的好处是现在的服务端可以称之为半“ssg”模式，也就是next项目在build的时候会自动预先渲染出一部分路由页面，只要缓存未过期，服务端就可以一直使用这些缓存而不进行新的`render-to-string`。

对于`Full Route cache`特性，简单的控制方法有以下几种：
```typescript
// 1. 在你的RSC中使用了cookies()或headers()的动态函数

// 2. 控制永远重新生成页面，只适用于page或layout层
export const dynamic = 'force-dynamic'

// 3. 设置过时重新校验的时间，只要是客户端请求后服务器对比时间一超过，服务端就会重新再生成
export const revalidate = 60

// 4. 使用revalidatePath强制更新缓存
revalidatePath("/")
```

## 对于nextjs缓存上可能没讲清楚的坑
- tag的缓存和path的缓存带来的作用可能并不一致，当你试图重新校验tag的缓存时，你有可能会发现你的页面并没有跟着更新，因为只更新了tag去推动Date fetch的缓存，但是path的缓存并未更新，也就是并没有驱动服务端去重新渲染RSC页面
