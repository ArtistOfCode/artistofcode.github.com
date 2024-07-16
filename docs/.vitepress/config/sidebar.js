const part = ['基础篇', '框架篇', '架构篇', '运维篇', '前端篇', '测试篇', '工具篇', '业务篇', '管理篇', '中间件']
const spring = [
    {
        '基础核心技术': ['核心模块与应用场景', '基于XML配置的容器', '基于注解配置的容器', '基于Java配置的容器', '三种方式的混合和迁移',
            '同类型多个Bean的注入', 'Bean的生命周期和扩展点', '环境抽象', '事件机制', '资源管理', '数据验证', '数据绑定', '类型转换', 'SpEL表达式']
    },
    {
        '面向切面编程': ['基于注解配置AOP', '基于XML配置AOP', 'AOP通知（Advice）详解', 'AOP切点表达式（Pointcut）详解',
            'AOP中的基础API', 'AOP经典应用场景']
    },
    { '数据访问和事务管理': [] },
    { 'Web Servlet应用': [] },
    { 'Web Reactive应用': [] },
    { '单元测试和集成测试': [] },
    { '整合其他组件': [] },
]

const mybatis = [
    { '基础核心': ['介绍与配置', '增删改查', '结果映射', '动态语句'] },
    { '扩展开发': ['类型处理器', '插件'] },
]

const nginx = [
    { '基础原理': ['编译源码安装', '详解配置文件', '连接处理方式', '正向代理和反向代理'] },
    { '使用示例': ['静态资源代理', 'HTTP反向代理', 'HTTPS反向代理', 'TCP/UDP反向代理', '负载均衡', '防盗链'] },
    { '常用模块': ['HTTP Core模块', 'HTTP Proxy模块', 'HTTP Upstream模块', 'HTTP Stream Core模块', 'HTTP Stream Proxy模块', 'HTTP Stream Upstream模块', 'HTTP Rewrite模块', 'HTTP Access模块', 'HTTP Gzip模块', 'HTTP SSL模块'] },
]

const tools = [
    { '工具类': ['IntelliJ IDEA Community', 'Visual Studio Code', 'Postman', 'DBeaver Community', 'Studio 3T (Free)',] },
    { '开发类': ['Multipass', 'Docker', 'Git', 'Maven',] },
    { '图文类': ['Typora', 'Draw.io', 'Typst', 'Snipaste',] },
]

function sideMenu(base, v) {
    let i = 1
    return v.map(p => {
        const k = Object.keys(p)[0]
        return {
            text: k, base, items: p[k].map(s => { return { text: `${i}. ${s}`, link: `/${i++}` } })
        }
    })
}

export default {
    '/spring': sideMenu('/spring', spring),
    '/mybatis': sideMenu('/mybatis', mybatis),
    '/nginx': sideMenu('/nginx', nginx),
    '/tools': sideMenu('/tools', tools),
}