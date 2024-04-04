

[TOC]

Spring 提供了简单的接口来管理资源，并支持多种资源类型。

## 一、Resource 接口

Java 自带的 `java.net.URL` 类只能处理 URL 前缀的资源，不能访问更多类型的低级资源。

因此，Spring 提供了 `Resource` 接口以及多种资源类型的实现。

```java
public static void main(String[] args) throws Exception {

    // Resource
    Resource resource = new ClassPathResource("test/test-one.txt");
    System.out.println("Filename: " + resource.getFilename());
    System.out.println("Description: " + resource.getDescription());
    System.out.println("URI: " + resource.getURI());
    System.out.println("URL: " + resource.getURL());
    System.out.println("Data: " + streamToString(resource));
    System.out.println();
}

// Stream to String
private static String streamToString(Resource resource) throws IOException {
    return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
}
```

### 1. 内置实现

Spring 提供了下面几种资源实现：

**`UrlResource`**

`UrlResource` 包装了 `java.net.URL` 类，通过 URL 访问资源，例如文件、HTTP、FTP 资源。

通过协议前缀区分资源类型，例如 `file:` 访问文件系统资源，还有 `http:`、`ftp:` 等。

```java
public static void main(String[] args) throws Exception {

    // UrlResource
    UrlResource fileResource = new UrlResource("file:E:/codeartist/spring/spring-ioc/src/main/resources/test/test-one.txt");
    UrlResource httpResource = new UrlResource("https://www.baidu.com/");
}
```

**`ClassPathResource`**

`ClassPathResource` 可以从 classpath 下获取资源。

```java
public static void main(String[] args) throws Exception {

    // ClassPathResource
    ClassPathResource classPathResource = new ClassPathResource("test/test-one.txt");
}
```

**`FileSystemResource`**

`FileSystemResource` 实现了对 `java.io.File` 资源的处理，支持 `File` 和文件路径指定资源。

```java
public static void main(String[] args) throws Exception {

    // FileSystemResource
    FileSystemResource fileSystemResource =
        new FileSystemResource("E:/codeartist/spring/spring-ioc/src/main/resources/test/test-two.txt");
}
```

**`ServletContextResource`**

`ServletContextResource` 可以管理来自 `ServletContext` 的资源。

**`InputStreamResource`**

`InputStreamResource` 可以管理来自 `InputStream` 生成的资源。

**`ByteArrayResource`**

`ByteArrayResource` 可以管理来自 Byte 数组生成的资源。

> 如果是从 Jar 包里面获取资源，不能通过 File 形式获取，只能通过流来获取。

### 2. 协议前缀

| 前缀       | 示例                         | 描述                            |
| :--------- | :--------------------------- | :------------------------------ |
| classpath: | `classpath:myapp/config.xml` | 加载来自 classpath 的资源       |
| file:      | `file:///data/config.xml`    | 通过 URL 加载来自文件系统的资源 |
| http:      | `http://myserver/logo.png`   | 通过 URL 加载来自网络的资源     |
| (none)     | `/data/config.xml`           | 依赖底层的 `ApplicationContext` |

## 二、ResourceLoader 接口

`ResourceLoader` 接口用来加载 `Resource`，通过协议前缀来区分资源的类型。

所有的 Application Context 都实现了 `ResourceLoader` 接口，当使用 Application Context 来加载资源的时候，如果没有指定协议前缀，根据 Application Context 的类型来指定从哪里加载。

- `ClassPathXmlApplicationContext` 加载 `ClassPathResource`
- `FileSystemXmlApplicationContext` 加载 `FileSystemResource`
- `WebApplicationContext` 加载 `ServletContextResource`

在 Bean 中可以使用 `ResourceLoaderAware` 注入当前上下文的 `ResourceLoader`。

### 1. 资源注入

Spring 还支持通过 `@Value` 注解来注入资源，通过协议前缀来注入。

```java
@Component
public class BeanExample {

    @Value("classpath:test/test-one.txt")
    private Resource resource;
    @Value("classpath:test/test-two.txt")
    private File file;
}
```

支持注入的字段类型有：`File`、`Resource` 等。

### 2. Application Context 资源

通过 Application Context 加载单个资源。

```java
public static void main(String[] args) throws Exception {

    ApplicationContext applicationContext =
        new AnnotationConfigApplicationContext("cn.codeartist.spring.resource");

    Resource resource = applicationContext.getResource("classpath:test/test-one.txt");
}
```

**Ant-style 风格**

Application Context 通过 Ant-style 正则表达式加载多个资源。

```java
public static void main(String[] args) throws Exception {

    ApplicationContext applicationContext =
        new AnnotationConfigApplicationContext("cn.codeartist.spring.resource");

    Resource[] resources = applicationContext.getResources("classpath:test/test-*.txt");
    for (Resource res : resources) {
        // do something
    }
}
```

**classpath*: 前缀**

Application Context 通过 `classpath*:`  前缀加载多个资源，该方式加载速度慢，一般很少使用。

`classpath:` 表示只加载第一个 classpath 路径下的资源。

`classpath*:` 表示加载系统中所有 classpath 路径下的资源。

```java
public static void main(String[] args) throws Exception {

    ApplicationContext applicationContext =
        new AnnotationConfigApplicationContext("cn.codeartist.spring.resource");

    Resource[] resources = applicationContext.getResources("classpath*:**/test-one.txt");
    for (Resource res : resources) {
        // do something
    }
}
```

`ClassPathXmlApplicationContext` 和 `WebApplicationContext` 等 Bean 配置文件资源都是基于 `ResourceLoader` 接口来加载的。

## 三、附录

### 1. 示例代码

Gitee 仓库：

https://gitee.com/code_artist/spring

项目模块：

`spring-ioc`

示例路径：

`cn.codeartist.spring.resource`

