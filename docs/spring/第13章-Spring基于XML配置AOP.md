[TOC]

Spring 的 AOP 功能是基于 AspectJ 实现的，支持使用 XML 方式定义 AOP 切面。

理解 AOP 概念参阅：《[Spring的AOP和动态代理](https://mp.weixin.qq.com/s/ecsVekuGTjw6rwBf90-j_Q)》

基于注解配置参阅：《[Spring基于注解配置AOP](https://mp.weixin.qq.com/s/mNzJOwS6VA11v3yuqHXqNA)》

## 一、概述

Spring 项目使用 AOP 功能需要定义三个部分：切面、切点和通知。

## 二、AOP 使用

Spring 基于 XML 配置 AOP 的方式不会侵入源码，但需要维护更多的配置文件。

### 1. 定义切面

引用 Spring 管理的 Bean，使用 `<aop:aspect>` 来定义切面。

```xml
<beans>

    <bean id="demoAspect" class="...DemoAspect"/>

    <aop:config>
        <aop:aspect ref="demoAspect">
            ......
        </aop:aspect>
    </aop:config>

</beans>
```

### 2. 定义切点

在切面内使用 `<aop:pointcut>` 来定义切点，然后在通知中使用 `pointcut-ref` 来指定切点。

切点表达式用来匹配切入的目标类和方法。目标类只能是 Spring 容器管理的类，切面只能切入 Bean 中的方法。

```xml
<beans>

    <bean id="demoAspect" class="...DemoAspect"/>

    <aop:config>
        <aop:aspect ref="demoAspect">
            <aop:pointcut id="myPointcut" expression="execution(* cn.codeartist.spring.aop.xml.*.*(..))"/>
            <aop:before pointcut-ref="myPointcut" method="doBefore"/>
        </aop:aspect>
    </aop:config>

</beans>
```

切点表达式也可以在定义通知的时候指定，而不需要使用 `<aop:pointcut>` 标签。

```xml
<beans>

    <bean id="demoAspect" class="...DemoAspect"/>

    <aop:config>
        <aop:aspect ref="demoAspect">
            <aop:before pointcut="execution(* cn.codeartist.spring.aop.xml.*.*(..))" method="doBefore"/>
        </aop:aspect>
    </aop:config>

</beans>
```

### 3. 定义通知

定义通知的时候需要指定切点，通知的类型决定了切入的节点。

![Advice](/images/spring/第13章-Spring基于XML配置AOP/Advice.png)

在切面里使用通知标签中的 `method` 属性来绑定方法。

```java
public class DemoAspect {

    public void doBefore(JoinPoint joinPoint) {
        // do something
    }

    public void doAfter(JoinPoint joinPoint) {
        // do something
    }

    public void doAfterReturning(JoinPoint joinPoint) {
        // do something
    }

    public Object doAround(ProceedingJoinPoint joinPoint) throws Throwable {
        // do something
        Object proceed = joinPoint.proceed();
        // do something
        return proceed;
    }

    public void doAfterThrowing(JoinPoint joinPoint) {
        // do something
    }
}
```

**前置通知**

使用 `<aop:before>` 定义前置通知，在方法执行前添加操作。

```xml
<aop:config>
    <aop:aspect ref="demoAspect">
        <aop:pointcut id="myPointcut" expression="execution(* cn.codeartist.spring.aop.xml.*.*(..))"/>
        <aop:before pointcut-ref="myPointcut" method="doBefore"/>
    </aop:aspect>
</aop:config>
```

**后置通知**

使用 `<aop:after-returning>` 注解定义后置通知，在方法正常返回时执行，方法抛异常不执行。

```xml
<aop:config>
    <aop:aspect ref="demoAspect">
        <aop:pointcut id="myPointcut" expression="execution(* cn.codeartist.spring.aop.xml.*.*(..))"/>
        <aop:after-returning pointcut-ref="myPointcut" method="doAfterReturning"/>
    </aop:aspect>
</aop:config>
```

**环绕通知**

使用 `<aop:around>` 注解定义环绕通知，切入方法前后，相当于拦截器的功能，可以捕获异常处理。

环绕通知的切入点参数为 `ProceedingJoinPoint`，并且需要手动调用 `proceed()` 来执行切入点方法的逻辑。

```xml
<aop:config>
    <aop:aspect ref="demoAspect">
        <aop:pointcut id="myPointcut" expression="execution(* cn.codeartist.spring.aop.xml.*.*(..))"/>
        <aop:around pointcut-ref="myPointcut" method="doAround"/>
    </aop:aspect>
</aop:config>
```

**最终通知**

使用 `<aop:after>` 注解定义最终通知，在方法退出时执行，无论是正常退出还是异常退出。

```xml
<aop:config>
    <aop:aspect ref="demoAspect">
        <aop:pointcut id="myPointcut" expression="execution(* cn.codeartist.spring.aop.xml.*.*(..))"/>
        <aop:after pointcut-ref="myPointcut" method="doAfter"/>
    </aop:aspect>
</aop:config>
```

**异常通知**

使用 `<aop:after-throwing>` 注解定义异常通知，在方法抛出异常时执行。

```xml
<aop:config>
    <aop:aspect ref="demoAspect">
        <aop:pointcut id="myPointcut" expression="execution(* cn.codeartist.spring.aop.xml.*.*(..))"/>
        <aop:after-throwing pointcut-ref="myPointcut" method="doAfterThrowing"/>
    </aop:aspect>
</aop:config>
```

### 4. 通过 Advisor 实现

使用 Advisor 能以编程的方式创建切面，需要实现通知的 API 来定义通知的类型。

比起使用注解定义切点，这种方式指定切点表达式更灵活。

```xml
<beans>

    <bean id="beforeAdvice" class="...BeforeAdvice"/>

    <aop:config>
        <aop:advisor pointcut="execution(* cn.codeartist.spring.aop.xml.*.*(..))" advice-ref="beforeAdvice"/>
    </aop:config>

</beans>
```

## 三、附录

### 1. 常用配置

| 配置                    | 描述                      |
| ----------------------- | ------------------------- |
| `<aop:config>`          | 配置 AOP 功能             |
| `<aop:aspect>`          | 定义切面类                |
| `<aop:pointcut>`        | 定义切点，指定切点表达式  |
| `<aop:before>`          | 定义前置通知              |
| `<aop:after-returning>` | 定义后置通知              |
| `<aop:around>`          | 定义环绕通知              |
| `<aop:after>`           | 定义最终通知              |
| `<aop:after-throwing>`  | 定义异常通知              |
| `<aop:advisor>`         | 使用 Advisor 方式创建切面 |

### 2. 示例代码

Gitee 仓库：

https://gitee.com/code_artist/spring

项目模块：

`spring-aop`

示例路径：

`cn.codeartist.spring.aop.xml`