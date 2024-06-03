# GoLang <Badge type="tip" text="v1.21.9" />

## 基础核心技术 <Badge type="danger" text="10%" />

- 基础语法：包括变量、常量、类型、函数和包的使用。
- 控制结构：如 if、for、switch 和 select 语句。
- 数据结构：包括数组、切片、映射（map）和结构体。
- 单元测试
- 包管理
    - 模块化开发：使用模块管理依赖
    - 包的导入和导出：import和export关键字
    - 自定义包：创建和使用自定义包

## 并发编程技术

- Goroutine：并发执行的轻量级线程
- Channel：用于在Goroutine之间进行通信和同步
- Select语句：用于处理多个Channel的并发操作
- Mutex和RWMutex：用于实现互斥锁和读写锁
- WaitGroup和Once：用于等待一组Goroutine完成和执行一次性操作

## 标准库使用

- fmt包：格式化输入输出
- os包：操作系统接口
- io包：基本的I/O操作
- net包：网络编程
- time包：时间处理
- json包：JSON编解码
- encoding/xml包：XML编解码
- strconv包：字符串和基本类型的转换

## 高级进阶编程

- 反射机制
- 泛型
- 性能优化

## 网络编程


- 接口：学习如何定义和实现接口，以及接口的使用场景。
- 错误处理：掌握 error 接口的使用，以及 defer、panic 和 recover 的错误处- 理机制。
- 测试：学习如何使用 testing 包进行单元测试。
- 包管理：了解 Go 模块（Go Modules）的使用，进行项目依赖管理。
- 此外，还有一些进阶的知识点，如反射（reflection）、同步原语（如 Mutexes）、以及网络编程等。随着学习的深入，你还可以了解到关于微服务、容器化（如 Docker）、以及分布式系统的知识。


- 基础语法：
    - 变量和常量
    - 数据类型：整型、浮点型、布尔型、字符串、数组、切片、字典、结构体、接口等
    - 控制流语句：条件语句（if-else）、循环语句（for、range）、跳转语句- （break、continue、goto）
    - 函数：定义、调用、参数、返回值、匿名函数、闭包
    - 方法：在结构体上定义方法
    - 错误处理：错误类型、错误处理、panic和recover机制
- 并发编程：
    - Goroutine：并发执行的轻量级线程
    - Channel：用于在Goroutine之间进行通信和同步
    - Select语句：用于处理多个Channel的并发操作
    - Mutex和RWMutex：用于实现互斥锁和读写锁
    - WaitGroup和Once：用于等待一组Goroutine完成和执行一次性操作
- 包管理：
    - 模块化开发：使用模块管理依赖
    - 包的导入和导出：import和export关键字
    - 自定义包：创建和使用自定义包
- 错误处理：
    - 错误类型：内置的错误类型和自定义错误类型
    - 错误处理策略：defer、panic和recover机制
- 文件操作：
    - 文件读写：打开、读取、写入和关闭文件
    - 目录操作：创建、删除、遍历目录
- 网络编程：
    - Socket编程：TCP和UDP通信
    - HTTP服务器和客户端：创建HTTP服务器和客户端
    - WebSocket：创建WebSocket服务器和客户端
- 数据存储：
    - 数据库操作：连接、查询、插入、更新和删除数据
    - NoSQL数据库：连接、操作文档型数据库
