[TOC]

Spring 的 AOP 功能是基于 AspectJ 实现的，支持使用注解声明式定义 AOP 切面。

理解 AOP 概念参阅：《[Spring的AOP和动态代理](https://mp.weixin.qq.com/s/ecsVekuGTjw6rwBf90-j_Q)》

## 一、概述

Spring 项目使用 AOP 功能需要定义三个部分：切面、切点和通知。

## 二、AOP 使用

Spring 基于注解配置 AOP 需要启用 AspectJ 自动代理功能。

**基于 Java 配置**

```java
@Configuration
@EnableAspectJAutoProxy
public class AppConfig {

}
```

**基于 XML 配置**

```xml
<aop:aspectj-autoproxy/>
```

### 1. 定义切面

在 Spring 管理的 Bean 类上使用 `@Aspect` 注解就可以定义一个切面。

```java
@Aspect
@Component
public class DemoAspect {

}
```

### 2. 定义切点

在切面类的方法使用 `@Pointcut` 注解来定义切点，然后在通知注解中使用方法签名来指定切点。

切点表达式用来匹配切入的目标类和方法。目标类只能是 Spring 容器管理的类，切面只能切入 Bean 中的方法。

```java
@Aspect
@Component
public class DemoAspect {

    @Pointcut("execution(* cn.codeartist.spring.aop.aspectj.*.*(..))")
    public void pointcut() {
    }

    @Before("pointcut()")
    public void doBefore(JoinPoint joinPoint) {
		// do something
    }
}
```

切点表达式也可以在定义通知的时候指定，而不需要使用 `@Pointcut` 注解。

```java
@Aspect
@Component
public class DemoAspect {

    @Before("execution(* cn.codeartist.spring.aop.aspectj.*.*(..))")
    public void doBefore(JoinPoint joinPoint) {
		// do something
    }
}
```

### 3. 定义通知

定义通知的时候需要指定切点，通知的类型决定了切入的节点。

![Advice](/images/spring/第12章-Spring基于注解配置AOP/Advice.png)

**前置通知**

使用 `@Before` 注解定义前置通知，在方法执行前添加操作。

```java
@Aspect
@Component
public class DemoAspect {

    @Before("pointcut()")
    public void doBefore(JoinPoint joinPoint) {
		// do something
    }
}
```

**后置通知**

使用 `@AfterReturning` 注解定义后置通知，在方法正常返回时执行，方法抛异常不执行。

```java
@Aspect
@Component
public class DemoAspect {

    @AfterReturning("pointcut()")
    public void doAfterReturning(JoinPoint joinPoint) {
		// do something
    }
}
```

**环绕通知**

使用 `@Around` 注解定义环绕通知，切入方法前后，相当于拦截器的功能，可以捕获异常处理。

环绕通知的切入点参数为 `ProceedingJoinPoint`，并且需要手动调用 `proceed()` 来执行切入点方法的逻辑。

```java
@Aspect
@Component
public class DemoAspect {

    @Around("pointcut()")
    public Object doAround(ProceedingJoinPoint joinPoint) throws Throwable {
		// do something
        Object proceed = joinPoint.proceed();
		// do something
        return proceed;
    }
}
```

**最终通知**

使用 `@After` 注解定义最终通知，在方法退出时执行，无论是正常退出还是异常退出。

```java
@Aspect
@Component
public class DemoAspect {

    @After("pointcut()")
    public void doAfter(JoinPoint joinPoint) {
		// do something
    }
}
```

**异常通知**

使用 `@AfterThrowing` 注解定义异常通知，在方法抛出异常时执行。

```java
@Aspect
@Component
public class DemoAspect {

    @AfterThrowing("pointcut()")
    public void doAfterThrowing(JoinPoint joinPoint) {
		// do something
    }
}
```

### 4. 通过 Advisor 实现

使用 Advisor 能以编程的方式创建切面，需要实现通知的 API 来定义通知的类型。

比起使用注解定义切点，这种方式指定切点表达式更灵活。

```java
@Bean
public AspectJExpressionPointcutAdvisor aspectJExpressionPointcutAdvisor() {
    AspectJExpressionPointcutAdvisor advisor = new AspectJExpressionPointcutAdvisor();
    advisor.setExpression("execution(* cn.codeartist.spring.aop.aspectj.*.*(..))");
    advisor.setAdvice((MethodBeforeAdvice) (method, args, target) -> {
        // do something
    });
    return advisor;
}
```

## 三、附录

### 1. 常用配置

| 配置                       | 描述                                    |
| -------------------------- | --------------------------------------- |
| `<aop:aspectj-autoproxy/>` | 启用 AspectJ 自动代理，通过注解定义切面 |

### 2. 常用注解

| 注解                      | 描述                                    |
| :------------------------ | :-------------------------------------- |
| `@EnableAspectJAutoProxy` | 启用 AspectJ 自动代理，通过注解定义切面 |
| `@Aspect`                 | 定义切面类                              |
| `@Pointcut`               | 定义切点，指定切点表达式                |
| `@Before`                 | 定义前置通知                            |
| `@AfterReturning`         | 定义后置通知                            |
| `@Around`                 | 定义环绕通知                            |
| `@After`                  | 定义最终通知                            |
| `@AfterThrowing`          | 定义异常通知                            |

### 3. 示例代码

Gitee 仓库：

https://gitee.com/code_artist/spring

项目模块：

`spring-aop`

示例路径：

`cn.codeartist.spring.aop.aspectj`