[TOC]

Spring 通过 `Environment` 接口提供了容器的环境抽象，该接口包含两个关键部分 Profiles 和 Properties。

## 一、条件注册

在讲 Profile 之前，先了解 Spring 容器根据条件注册 Bean 的实现。

**`Condition` 接口和 `@Conditional` 注解**

实现 `Condition` 接口定义条件逻辑，然后在定义 Bean 的时候使用 `@Conditional` 来指定条件。

当符合 `CustomCondition` 条件的类才会被注册到容器中。

```java
public class CustomCondition implements Condition {

    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        // 条件逻辑
        return true;
    }
}

@Component
@Conditional(CustomCondition.class)
public class ConditionExample {

}
```

`@Conditional` 注解可与所有定义 Bean 的注解使用，包括 `@Component`、`@Configuration`、`@Bean` 等。

## 二、Profiles

Profile 可以根据配置来决定类是否注册，当类配置了 Profile，只有激活该 Profile 时才将该类注册到容器。

### 1. Profile 配置

`@Profile` 是基于 `Condition` 接口实现的，可以参考 `@Profile` 和 `ProfileCondition` 的源码。

```java
@Component
@Profile("dev")
public class ProfileExample {

}

@Configuration
public class AppConfig {

    @Bean
    @Profile("dev")
    public BeanExample beanExample() {
        return new BeanExample();
    }
}
```

`@Profile` 注解可与所有定义 Bean 的注解使用，包括 `@Component`、`@Configuration`、`@Bean` 等。

同一个类可以配置多个 Profile 值，也支持简单的逻辑操作。

```java
// 激活dev或prod时注册
@Profile({"dev", "prod"})

// 激活dev或prod时注册
@Profile("dev | prod")

// 同时激活dev和prod时注册
@Profile("dev & prod")

// 没有激活dev时注册
@Profile("!dev")
```

### 2. Profile 激活

配置了 Profile 的类，只有当容器激活相同的 Profile 时，类才会被注册到容器中。

```java
public class Main {

    public static void main(String[] args) {
        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext();
        ConfigurableEnvironment environment = applicationContext.getEnvironment();
        environment.setActiveProfiles("dev");
        applicationContext.scan("cn.codeartist.spring.env");
        applicationContext.refresh();
    }
}
```

一般情况下，通过配置 `spring.profiles.active=dev` 来激活。

**默认激活的 Profile**

环境配置中没有激活的 Profile 时，会使用默认的 Profile，环境配置中存在激活的 Profile 时，默认配置失效。

```java
public class Main {

    public static void main(String[] args) {
        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext();
        ConfigurableEnvironment environment = applicationContext.getEnvironment();
        environment.setDefaultProfiles("prod");
        applicationContext.scan("cn.codeartist.spring.env");
        applicationContext.refresh();
    }
}
```

一般情况下，通过配置 `spring.profiles.default=prod` 来指定默认的 Profile。

## 三、Properties

`Environment` 接口继承了 `PropertyResolver` 接口，来管理容器中所有的配置资源，包括但不限于：

- 配置文件属性
- JVM 系统属性
- 环境变量属性
- JNDI 变量属性
- ServletContext 属性
- ServletConfig 属性

### 1. PropertySource 抽象

`PropertySource` 抽象类用于简单地维护 Key-Value 属性资源。

例如 `StandardEnvironment` 类配置的 JVM 系统属性和环境变量属性对象。

```java
public class StandardEnvironment extends AbstractEnvironment {

    @Override
    protected void customizePropertySources(MutablePropertySources propertySources) {
        propertySources.addLast(new MapPropertySource("systemProperties", getSystemProperties()));
        propertySources.addLast(new SystemEnvironmentPropertySource("systemEnvironment", getSystemEnvironment()));
    }
}
```

每一个配置资源都会定义一个 `PropertySource` 对象，多个配置资源由 `PropertySources` 接口统一管理。

**`@PropertySource` 注解**

该注解可以导入配置资源到 Spring 环境中，与 `@Configuration` 使用。

例如导入 classpath 下的 properties 配置文件资源。

```java
@Configuration
@PropertySource("classpath:spring.properties")
public class AppConfig {

}
```

### 2. 优先级

`PropertySources` 接口管理着多个配置资源，并且是有层级的。

如果多个配置资源里面存在相同的配置，容器会根据配置资源的优先级来注入。

常用的 `StandardServletEnvironment` 环境类，优先级从高到低为：

- ServletConfig 属性（`DispatcherServlet` 上下文配置）
- ServletContext 属性（`web.xml` 上下文配置）
- JNDI 环境变量（`java:comp/env/` 配置）
- JVM 系统属性 (`-D` 指定的命令行参数)
- 环境变量属性（操作系统环境变量）

### 3. 占位符

在项目中，可以使用 `Environment` 直接获取配置资源中的配置。

也可以使用 `${key}` 占位符来指定配置资源中的属性值。

```java
@Component
public class BeanExample {

    @Autowired
    private Environment env;

    public void test() {
        String val = env.getProperty("test.value");
        // Print: CodeArtist
        String val1 = env.resolvePlaceholders("test.value=${test.value}");
        // Print: test.value=CodeArtist
    }
}
```

`@Value` 注解可以给字段注入值，也可以使用占位符来注入配置资源中的值。

```java
@Component
public class BeanExample {

    @Value("${test.value:default}")
    private String name;

}

@Configuration
public class AppConfig {

    @Bean
    public BeanExample beanExample(@Value("${test.value:default}") String name) {
        return new BeanExample();
    }
}
```

## 四、附录

### 1. 常用注解

| 注解              | 描述                             |
| :---------------- | :------------------------------- |
| `@Conditional`    | 指定条件注册 Bean                |
| `@Profile`        | 指定环境配置注册 Bean            |
| `@PropertySource` | 导入配置资源                     |
| `@Value`          | 指定字段、方法或构造器参数注入值 |

### 2. 示例代码

Gitee 仓库：

[https://gitee.com/code_artist/spring](http://link.zhihu.com/?target=https%3A//gitee.com/code_artist/spring)

项目模块：

`spring-ioc`

示例路径：

`cn.codeartist.spring.env`