[TOC]

Spring 的 AOP 功能中一个关键概念是通知（Advice），与切点（Pointcut）表达式相关联在特定节点织入一些逻辑，Spring 提供了五种类型的通知。

理解 AOP 概念参阅：

《[Spring的AOP和动态代理](https://mp.weixin.qq.com/s?__biz=MzU1MzQ0NjU0Ng==&mid=2247485294&idx=1&sn=bf931565df839c98ff12b1bfdd14f89f&scene=21#wechat_redirect)》

配置 AOP 参阅：

《[Spring基于注解配置AOP](https://mp.weixin.qq.com/s?__biz=MzU1MzQ0NjU0Ng==&mid=2247485299&idx=1&sn=59bdee65bb2249fcdcf0df7334a14507&scene=21#wechat_redirect)》

《[Spring基于XML配置AOP](https://mp.weixin.qq.com/s/8J8WgUu3AUUoEjOEUZZ8Ig)》

## 一、概述

AOP 中的通知是基于连接点（Join point）业务逻辑的一种增强，Spring AOP 提供了下面五种通知类型：

- **Before advice（前置通知）**：连接点前面执行，不能终止后续流程，除非抛异常
- **After returning advice（后置通知）**：连接点正常返回时执行，有异常不执行
- **Around advice（环绕通知）**：围绕连接点前后执行，也能捕获异常处理
- **After advice（最终通知）**：连接点退出时执行，无论是正常退出还是异常退出
- **After throwing advice（异常通知）**：连接点方法抛出异常时执行

AOP 的连接点一般是指目标类的方法，五种通知类型执行的节点如下：

![Advice](/images/spring/第14章-Spring AOP通知（Advice）详解/Advice.png)

## 二、通知的定义

Spring AOP 可以基于 XML 方式和基于注解方式定义，只是写法不同，这里只使用注解的方式来讲解通知的详细用法。

### 1. 前置通知

在 `@Aspect` 切面类中使用 `@Before` 注解简单地定义一个前置通知。

```java
@Aspect
@Component
public class DemoAspect {

    @Before("execution(* cn.codeartist.spring.aop.advice.*.*(..))")
    public void doBefore() {
        // 自定义逻辑
    }
}
```

### 2. 后置通知

方法正常返回，会执行后置通知，使用 `@AfterReturning` 注解定义后置通知。

```java
@AfterReturning("execution(* cn.codeartist.spring.aop.advice.*.*(..))")
public void doAfterReturning() {
    // 自定义逻辑
}
```

注解的 `returning` 属性可以绑定目标方法返回值，用于在通知中获取目标方法执行完成后的返回结果。

```java
@AfterReturning(pointcut = "pointcut()", returning = "retVal")
public void doAfterReturning(Object retVal) {
    // 自定义逻辑（通过参数绑定方法切入点方法的返回值）
}
```

当注解使用了 `returning` 属性时，**切入点会增加返回值类型的限制**，上面使用的 `Object` 类型可以匹配到所有返回值类型的目标方法。

例如下面的情况，后置通知的代码不会被执行：

```java
// 目标方法
public String doService() {
    return "码匠公众号";
}

// 后置通知定义
@AfterReturning(pointcut = "pointcut()", returning = "retVal")
public void doAfterReturning(Integer retVal) {
    // 目标方法返回值是String类型，结果参数绑定类型是Integer，该通知不会被执行
}
```

### 3. 环绕通知

环绕通知可以在方法执行的任何节点添加逻辑，它可以实现另外 4 种通知的功能。

如果需要以线程安全的方式在方法执行前后共享状态，可以使用环绕通知。

用 `@Around` 注解来定义环绕通知，需要使用 `ProceedingJoinPoint` 作为参数，来执行目标方法调用。

```java
@Around("execution(* cn.codeartist.spring.aop.advice.*.*(..))")
public Object doAround(ProceedingJoinPoint joinPoint) throws Throwable {
    // 方法执行前逻辑
    Object retVal = joinPoint.proceed();
    // 方法执行后逻辑
    return retVal;
}
```

`joinPoint.proceed()` 会调用目标方法，或者是调用另一个切面。

> 虽然环绕通知可以实现另外几种通知的功能，但在使用中都能实现功能的情况下，优先使用其他通知方式。

### 4. 最终通知

最终通知在方法退出的时候执行，使用 `@After` 注解定义，最终通知在方法正常退出和抛出异常时都会执行，通常用于资源的释放。

```java
@After("execution(* cn.codeartist.spring.aop.advice.*.*(..))")
public void doAfter() {
    // 自定义逻辑
}
```

### 5. 异常通知

方法抛出异常的时候会执行异常通知，使用 `@AfterThrowing` 定义异常通知。

```java
@AfterThrowing("execution(* cn.codeartist.spring.aop.advice.*.*(..))")
public void doAfterThrowing() {
    // 自定义逻辑
}
```

注解的 `throwing` 属性用来绑定目标方法抛出的异常，用于在通知中获取目标方法抛出的异常实例。

```java
@AfterThrowing(pointcut = "pointcut()", throwing = "ex")
public void doAfterThrowing(Throwable ex) {
    // 自定义逻辑（通过参数绑定方法切入点方法抛出的异常）
}
```

当注解使用了 `throwing` 属性时，**切入点会增加异常类型的限制**，上面使用的 `Throwable` 类型可以匹配到所有异常类型。

例如下面的情况，异常通知的代码不会被执行：

```java
// 目标方法
public void doServiceThrow() {
    throw new RuntimeException("Test exception");
}

// 异常通知定义
@AfterThrowing(pointcut = "pointcut()", throwing = "ex")
public void doAfterThrowing(NullPointerException ex) {
    // 目标方法抛出的是RuntimeException，参数绑定类型是NullPointerException，该通知不会被执行
}
```

## 三、通知的参数

在定义通知的方法签名上可以指定参数来绑定目标方法的一些信息（例如前面讲到的后置通知和异常通知）。

### 1. 切入点

在定义通知方法的时候，一般可以使用 `JoinPoint` 作为参数，环绕通知使用 `ProceedingJoinPoint`。常用接口方法如下：

 **JoinPoint**

```java
public interface JoinPoint {

	// 获取代理对象
    Object getThis();

    // 获取目标对象
    Object getTarget();

    // 获取连接点方法的参数
    Object[] getArgs();

    // 获取连接点方法的签名
    Signature getSignature();

}
```

**ProceedingJoinPoint**

```java
public interface ProceedingJoinPoint extends JoinPoint {

    // 执行下一个切面的通知或者目标方法
    public Object proceed() throws Throwable;

    // 执行下一个切面的通知或者目标方法（带参数）
    public Object proceed(Object[] args) throws Throwable;

}
```

> 切面的切入点一般为方法，所以 `Signature` 可以转换为 `MethodSignature` 使用。

### 2. 通知的参数传递

通知的参数可以通过切点表达式 `args` 来指定，具体用法会在后面切点表达式详解中讲到。

```java
@Before("pointcut() && args(name,..)")
public void doBefore(String name) {
    // 切点表达式增加参数匹配
}
```

`args(name,..)` 也会增加切入点的限制，目标方法的参数个数至少为一个，且第一个参数类型为 `String`。

## 四、通知的顺序

Spring AOP 中一个目标类可以被多个切面切入，多个切面也可以切入一个目标类。

使用 `@Order` 注解来指定切面的优先级，来控制切面的执行顺序。

在注册切面 Bean 的时候指定 `@Order`，如下：

```java
@Order(1)
@Aspect
@Component
public class FirstAspect {

    // ......
}
```

优先级高的切面先执行，通知执行的顺序如下：

![SpringAOP通知顺序](/images/spring/第14章-Spring AOP通知（Advice）详解/SpringAOP通知顺序.png)

可以得出：

- 优先级高的切面，前置通知先执行
- 优先级低的切面，后置通知先执行

> `Order` 值越小，优先级越大。

Spring AOP 是基于动态代理的拦截器模式实现的，切面模型与拦截器模型相似，如下：

![SpringAOP通知顺序2](/images/spring/第14章-Spring AOP通知（Advice）详解/SpringAOP通知顺序2.png)

## 五、附录

### 1. 常用注解

| 注解              | 描述         |
| :---------------- | :----------- |
| `@Aspect`         | 定义切面类   |
| `@Before`         | 定义前置通知 |
| `@AfterReturning` | 定义后置通知 |
| `@Around`         | 定义环绕通知 |
| `@After`          | 定义最终通知 |
| `@AfterThrowing`  | 定义异常通知 |

### 2. 示例代码

Gitee 仓库：https://gitee.com/code_artist/spring

