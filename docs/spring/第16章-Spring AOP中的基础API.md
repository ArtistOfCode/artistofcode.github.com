[TOC]

前面我们讲了基于 XML 和注解两种方式配置 AOP，Spring 还提供了更底层的 API 来定义 AOP。

理解 AOP 通知和切点表达式参阅：

《[Spring AOP通知（Advice）详解](https://mp.weixin.qq.com/s/2wyjUCAAr_dCFtPjUp9jvw)》

《[Spring AOP切点表达式（Pointcut）详解](https://mp.weixin.qq.com/s/5kW4iMZzEyeqlGTC7S-qcw)》

## 一、概述

Spring 项目定义 AOP 功能包含三个部分：切面、切点和通知。

## 二、切点（Pointcut）

Spring 定义的切点可以复用，可以作用于多个不同的通知。

`Pointcut` 是核心接口，通过实现它来定义切点。

```java
package org.springframework.aop;

public interface Pointcut {

    ClassFilter getClassFilter();

    MethodMatcher getMethodMatcher();
}
```

`Pointcut` 包含两部分，`ClassFilter` 用于指定目标类，`MethodMatcher` 匹配目标类中的方法。

```java
import org.springframework.aop.aspectj.AspectJExpressionPointcut;

AspectJExpressionPointcut pointcut = new AspectJExpressionPointcut();
pointcut.setExpression("execution(* cn.codeartist.spring.*.*(..))");
```

一般情况下我们不会去自定义切点，而是使用 Spring 提供的实现，例如上面基于 AspectJ 表达式的切点实现。

## 三、通知（Advice）

Spring 有五种通知类型，只讲下面四种通知类型的 API，通知的执行节点如下。

![Advice](images/第16章-Spring AOP中的基础API/Advice.png)

### 1. 环绕通知

环绕通知最具功能性，通过实现 `MethodInterceptor` 接口来定义。

```java
package org.aopalliance.intercept;

@FunctionalInterface
public interface MethodInterceptor extends Interceptor {

	Object invoke(MethodInvocation invocation) throws Throwable;
}
```

代码示例如下，通过 `invocation.proceed();` 方法来调用实际方法或下一个环绕通知。

```java
public class DemoAroundAdvice implements MethodInterceptor {

    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {
        // do something before
        Object proceed = invocation.proceed();
        // do something after
        return proceed;
    }
}
```

环绕通知简单来讲，就是使用拦截器模式来对目标类中的方法进行拦截。

### 2. 前置通知

前置通知通过实现 `MethodBeforeAdvice` 来定义。

```java
package org.springframework.aop;

public interface MethodBeforeAdvice extends BeforeAdvice {

	void before(Method method, Object[] args, @Nullable Object target) throws Throwable;
}
```

代码示例如下：

```java
public class DemoBeforeAdvice implements MethodBeforeAdvice {

    @Override
    public void before(Method method, Object[] args, Object target) throws Throwable {
        // do something before
    }
}
```

前置通知中，可以获取到目标类，目标类的方法，以及方法的参数。

### 3. 异常通知

异常通知通过实现 `ThrowsAdvice` 来定义。


```java
package org.springframework.aop;

public interface ThrowsAdvice extends AfterAdvice {

}
```

异常通知没有固定的接口方法，可以定义任何符合规范的方法。

```java
// 方法签名模板
void afterThrowing([Method, args, target], ThrowableSubclass);

// 示例方法
public void afterThrowing(Exception ex);
public void afterThrowing(RemoteException);
public void afterThrowing(Method method, Object[] args, Object target, Exception ex);
public void afterThrowing(Method method, Object[] args, Object target, ServletException ex);
```

方法签名中的前三个参数（方法，参数，目标类）是可选的，第四个参数是异常类型（`Throwable` 的子类）。

通过第四个参数来匹配异常类型，只有当方法抛出该异常类型时通知才会被执行。

代码示例如下：

```java
public class DemoThrowsAdvice implements ThrowsAdvice {

    public void afterThrowing(Method method, Object[] args, Object target, Exception ex) {
        // do something after throwing
    }
}
```

### 4. 后置通知

后置通知通过实现 `AfterReturningAdvice` 来定义。


```java
package org.springframework.aop;

public interface AfterReturningAdvice extends AfterAdvice {

	void afterReturning(Object returnValue, Method method, Object[] args, Object target) throws Throwable;
}
```

代码示例如下：

```java
public class DemoAfterReturningAdvice implements AfterReturningAdvice {

    @Override
    public void afterReturning(Object returnValue, Method method, Object[] args, Object target) {
        // do something after returning
    }
}
```

后置通知可以获取到方法执行成功后的返回值，但不能修改，方法抛出异常时不会执行。

## 四、通知者（Advisor）

Spring 中的通知者（Advisor）可以定义一个包含切点和通知的切面。

`Advisor` 和 `PointcutAdvisor` 是核心接口，用于定义通知者。


```java
public interface Advisor {

	Advice getAdvice();
}

public interface PointcutAdvisor extends Advisor {

	Pointcut getPointcut();
}
```

`PointcutAdvisor` 接口实现需要指定切点和通知。

```java
import org.springframework.aop.support.DefaultPointcutAdvisor;

@Bean
public Advisor demoPointcutAdvisor() {
    DefaultPointcutAdvisor advisor = new DefaultPointcutAdvisor();
    advisor.setPointcut(pointcut);
    advisor.setAdvice(advice);
    return advisor;
}
```

一般情况下不用自定义通知者，而是用 Spring 提供的实现，例如上面的 `DefaultPointcutAdvisor` 类。

## 五、附录

### 1. 常用接口

| 接口                   | 描述               |
| :--------------------- | :----------------- |
| `Pointcut`             | 定义切点           |
| `MethodInterceptor`    | 定义环绕通知       |
| `MethodBeforeAdvice`   | 定义前置通知       |
| `ThrowsAdvice`         | 定义异常通知       |
| `AfterReturningAdvice` | 定义后置通知       |
| `PointcutAdvisor`      | 定义通知者（切面） |

### 2. 示例代码

Gitee 仓库：https://gitee.com/code_artist/spring

