---
title: 从react到vue3，react和reactive之间的思考🤔
create-time: 2025-01-02
tags:
  - vue3
  - react
---

# 前言
最近加入了一个写vue的前端团队，在此之前笔者一直是一个react开发者，初到vue3的开发领域，
发现vue3的思考模式和我预期的并不完全一致，于是想写一篇文章来记录一下这些思考的过程。

在开始之前，作为一个react开发者，当在有人问我，前端开发应该选择react还是vue的时候，我通常会回答他，
如果你想要减少麻烦，不想深入前端的话，vue3是一个很好的选择，而且就算是你想要深入了解前端的话，vue3也会是一个很好的选择。

# 对react的失望

在以前react的开发工作中，我遇到过很多的一些坑，其中一些是因为我的理解和认知有误，
有一些则是因为react的自由度导致的。总所周至，react 是一个非常自由的前端框架，因为他有jsx 语法，你可以用javascript来描述所有的视图行为，
这使得开发者可以很容易的实现各种复杂的视图和各种复杂逻辑的抽象组建，这也是为什么react在前端开发中有如此广泛的使用。

但是在实际开发中，你会发现，作为 react 框架的使用者，你常常会想去使用一些高阶函数或是一些高级抽象去实现一个逻辑，
因为你总会觉得这样很酷，在第一次写出来的时候，你会感觉充满成就感，这会带给你极大的成就感，
但是当后面再回过头在来看这部分的代码的时候，你又会发现，这样并不是一个很好的方式，因为它会导致你的代码变得很复杂，
可能你那天就会开始看不懂自己写的代码。

当然更多的时候是你发现后续的业务内容开始变化了，你发现你需要花费很大的时间来改进这些代码，
而且它的性能也不如你一开始抽象的那么好了，react 这个框架的核心本身的性能就不是很好（它只是在大部分时候够用，但远远不是最佳），
加上你其他业务带来的 rerender，这个时候你需要用上很多的`useMemo`、`useCallback`和`memo`等手段去不停的优化你的代码。

再然后你就开始不停的去探究，用什么样的方式可以去减少render，减少这个`f(x)`求值的过程，然后你就会得到`immutable`、`dispatch`、`reducer`、`computed`等等概念，
还会用上`mobx`、`redux`、`recoil`、`zustand`和`jotai`等等东西，然后你的脑子开始越来越复杂，
从一个每天crud的web dev变成了一个天天研究各种最佳实践的“魔怔人”，而且到头来你还会发现，
你写的所谓的“高性能”代码可能在真“reactive”的场景下是很轻松实现的，而且它实现的速度比你更快，性能更好，而且可拓展性也比你强。

就笔者的经历来说，笔者使用的状态管理工具从`context`/`mobx` -> `redux` -> `recoil` -> `jotai`，
也是不知不觉的从react到reactive模型的转变，在写了越来越多的前端代码之后，我发现了一件事———— reactive天生就非常适用于处理需要与用户交互的场景，
而且reactive框架也不会说因为你项目业务内容的持续变更而导致你的视图代码变得非常难以维护，所以渐渐的，我对 reactive 有了好感，也渐渐的，成为了一个“reactive 魔怔人”

# 从react的api到vue3的api转变

从react的api切换到使用vue3的api的过程，其实是一个非常轻松的过程，因为你依然可以使用react那套思想去编码你的`web application`，
只不过在你实现业务逻辑的时候，你会发现你轻松了许多，少了很多条条框框的心智模型去限制你的编码，只需要写出符合正常思维模式下的最优解即可。

## useState -> ref/reactive

对比两个框架可以看出，react的思路和vue3的思路是不一致的，react在state的更新上，是通过`Object.is`来实现的浅比较来判断是否需要更新，
而vue3则是完全的响应式，通过track和trigger来实现。

从这个角度上来看，其实react的状态更新其实是相比于vue3要更加适合大数据量且频繁更新的场景的，
因为在react中，每次的更新它不需要去判断是否需要更新，只需要直接更新即可，而vue3中则需要对数据进行而外的一些工作（包括响应式的触发和回收），
所以vue3在大数据量的场景中提供了`shadowRef`和`customRef`等手段来保证性能。

讲回`ref/reactive`，因为在vue3中，响应式的实现依赖于`Proxy`，所以所有的响应式对象理应是一个`Object`或`Getter`函数，
这样才可以让Proxy去通过track和trigger去实现数据的响应式更新。

```typescript
// react
const [a, setA] = useState(0)
const [b, setB] = useState({c: 2, d: 3})
// ...
setA(0) // never re-render
setA(1) // will be re-render
setB({c: 2, b: 3}) // will be re-render
setB({c: 4, b: 5}) // will be re-render

// vue3
const a = ref(0)
const b = reactive({c: 2, d: 3})
// ...
a.value = 0 // never trigger
a.value = 1 // will be trigger
b.c = 2 // never trigger
b.c = 4 // will be trigger
```

## useMemo -> computed

computed其实很好理解，它就是一个更加惰性的useMemo（也就是类似于函数式编程里面常提到的那个惰性求值），
而且它还是自动获取依赖的，当你在调用computed结果的getter的时候，它才会真正开始的去计算，
这样一方面它可以去减少你重复计算的消耗，另一方面你不需要再去关心那沟槽的deps问题了。

```typescript
// react
const { a, b } = props
const c = useMemo(() => {
    console.log(a, b) // will be called when a or b changed
    return a + b
}, [a, b])

// vue3
const { a, b } = props
computed(() => {
    console.log(a, b) // never called when a or b changed
    return a + b
})

const c =computed(() => a + b)

watch(c, () => {
    console.log(c.value) // will be called when a or b changed
})

```

## useEffect -> watch/watchEffect

我对`watch/watchEffect`的理解是和`useEffect`很像的，它们都是一个类似“逃生仓”（react.dev里面常提到的一个东西）之类的概念，
只不过同样的，`watch/watchEffect`也是面向响应式的，它们的做法都是副作用，但是`watchEffect`是自动收集状态的，
它更适合工作在消息自动发布或者日志打印的场景。而`watch`则是只是监听状态变化，不会自动收集状态，通过传入`watchSource`来指定监听的数据源。

## useRef -> useTemplateRef

这个没什么好说的，如果`useRef`是用来获取handle实例的话，那这两个框架的api表现基本一致。

## props -> defineProps & defineEmits

从props到`defineProps + defineEmits`，其实在vue3中也完全可以使用defineProps实现在react中的所有实现，
只不过在这vue3多了一个`v-model`的数据双向绑定的语法糖支持，使响应式更加的适用。

同时，通过区分props和emits也方便了区分向上和向下的数据流向。

## useImperativeHandle -> defineExpose

这个也没什么好说的，只不过这个api似乎是设计给vue3的ts做类型支持用的？

## vue3 additional reactive utils

like `unref`, `toValue`, `toRaw`, `toRefs`, `MaybeRef`, `MaybeRefOrGetter`, `isRef` etc.

# 对vue3的思考

## 大部分刻板印象中的vue开发者常见的误区
先叠个甲，我这里说的vue开发者是指部分每天工作内容都是crud，并且在开发中对代码质量没有什么要求，只追求一个能跑就好，
不去优化代码结构和做抽象的开发者。

对于这种情况来讲，有一个很常见的误区就是他们区分不开reactive和非reactive的边界，或者说根本就没想过区分开两者的边界，
相是service的调用来将，通过我们在service中传递的数据应该是一个data Object或者其他的基础数据类型，而非是一个reactive的proxy对象，
因为落实到实际的业务中，业务的实现内容往往是线性的，它并不需要你的reactive去实时变动响应，
而是该多用`toRaw`等工具来获取这个数据对象原始的值。

还有一个常见的误区就是在开发中分不清什么值是reactive的，什么值是非reactive的需要去转化。这种情况在vue3.5之后可能还要更加加剧，
因为3.5之后vue3在编译器中实现了在props解构时仍旧保持响应式，通过编译器将你的结构转化为`props.xxx`的形式。
当然这种情况的主要原因主要还是没有用上ts的类型支持而在坚持js导致的（笔者也在实际开发中遇到过这种迷糊的情况）。
这类问题解决起来其实也不难，在项目中引入ts其实就能得到很好的解决了，或者可以通过活用vue3的各种utils来规避这类问题。

## 一些个人认为比较好的编码实践

以下是个人最近开发过程中发现的一些编码实践，个人感觉写起来效果还不错，后续有机会也会持续更新

1. 在写composition api的时候，如果param的参数类型是reactive的话，可以依赖于响应式数据的依赖链和惰性计算来减少不必要的计算，同时巧用`toValue`、`unref`等技巧，如：
```typescript
const useAcc = (param: MaybeRefOrGetter<number>) => {
    return computed(() => {
        const value = unref(toValue(param))
        return value + 1
    })
}
```

2. 分散state的管理，将state“原子化”。这部分是因为vue3中composition api带来的能力，你可以将你的状态分散管理在不同的“块”之间，每一个“块”只完成一个最小单元中需要的工作。块和块之间的交集应该尽可能小的互相依赖，并将通用/顶层依赖的内容放在最上头。

# 总结
