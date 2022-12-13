// 代理与反射
// 创建与目标对象关联的代理对象,对代理对象的操作会访问传递到目标对象
// 可以在代理对象中设置捕获器,将对应操作进行拦截捕获,进行重写或功能增强

// 1.创建代理对象
const target={};
const handle={};
const proxy=new Proxy(target,handle);
// 调用Proxy构造函数进行创建代理对象
// 第一个参数为目标对象,第二个参数为控制程序对象
// 在对代理对象进行操作时,会先经由控制程序对象,再访问到目标对象
// 创建空代理
// (1)控制程序对象为空
// (2)选用对应的反射API
const proxy1=new Proxy(target,Reflect);
// 对所有操作均调用对应的Reflect反射API

// 2.捕获器
// 以方法的形式定义在控制程序对象中对基本操作进行拦截捕获
// 捕获器遵循捕获器不变式,即对应的基本操作捕获行为都需符合原基本操作的逻辑
const handle1={
    // 控制程序对象
    get(){
        // get捕获器,用于拦截get操作并增强
        return Reflect.get(...arguments);
    }
}
// 捕获器具有对应参数,可以根据参数进行操作的重写或增强
// 捕获器具有相关的返回值,可以根据返回值来实现功能或者体现状态
// 捕获器都有对应的Reflect API用于封装原始操作行为,直接调用简化代码

// 3.Reflect反射API
// 基本操作都有与之对应的反射API,封装原基本操作本身,可以在任意位置调用
// Object与Reflect大多相对应,Object用于通用程序,Reflect用于细部操作
// (1)状态标记
Reflect.defineProperty(target,property,discriptor);
// 返回布尔值,可以判断是否成功配置属性
// (2)替换操作符
// Reflect.has(proxy,property) <=> property in proxy
// Reflect.construct(proxy,argumentsList,newTarget) <=> new proxy(arguments); 
// (3)调用重写apply的函数
// Reflect.apply(proxy,thisValue,argumentsList) <=> proxy.apply(thisValue,argumentsList);

// 4.代理嵌套
// 捕获器可以捕获Reflect,故可以利用Reflect进行嵌套
const a1={
    name:"Matt",
};
const pro1=new Proxy(a1,{
    get(){
        console.log("1");
        return Reflect.get(...arguments);
    }
})
const pro2=new Proxy(pro1,{
    get(){
        console.log("2");
        return Reflect.get(...arguments);
    }
})

// 5.代理缺点
// 目标对象采用对象标识时,this指代不明
// 代理内置对象时出现兼容问题

// 6.属性相关基础操作捕获器
// 对应的不变式均与属性特性有关
// 实现属性访问的标记,属性隐藏(has,get),属性验证(set)等功能

// (1)get()
get(target,property,proxy);
// 返回值任意
// 拦截捕获访问对象属性的操作
// (2)set()
set(target,property,value,proxy);
// 返回值为布尔值，表示是否设置属性成功
// 拦截捕获设置对象属性的操作
// (3)has()
has(target,property);
// 返回值为布尔值,判断目标对象是否具有对应属性
// 拦截捕获类似于in操作符的判断属性是否属于对象的操作
// (4)defineProperty();
defineProperty(target,property,descriptor);
// 返回值为布尔值,标明是否成功配置目标对象的属性特性
// 拦截Object/Reflect.definerProperty()
// (5)getOwnProperty();
getOnwPropertyDescriptor(target,property);
// 返回值为属性描述对象
// 拦截Object/Reflect.getOwnProperty()
// (6)deleteProperty();
deleteProperty(target,property);
// 返回值为布尔值,表面是否成功删除对象属性
// 拦截delete操作
// (7)ownKeys()
ownKeys(target);
// 返回值为包含对象属性字符串的可枚举对象
// 拦截Object/Reflect.keys()操作


// 7.原型相关基础操作捕获器
// (1)getPrototypeOf()
getPrototypeOf(target);
// 返回值为原型对象
// 拦截Object/Reflect.getPrototypeOf()
// (2)setPrototypeOf()
setPrototypeOf(target);
// 返回值为布尔值,表明是否成功设置对象原型
// 拦截Object/Reflect.setPrototypeOf()
// (3)isExtensible()
isExtensible(target);
// 返回值为布尔值,表明目标对象是否可以拓展
// 拦截Object/Reflect.isExtensible()
// (4)preventExtensions()
preventExtensions(target);
// 返回值为布尔值，表明目标对象是否已经修改可拓展性
// 拦截Object/Reflect.preventExtension()


// 8.函数相关基础操作捕获器
// (1)apply()
apply(target,thisArg,argumentsList);
// 返回值任意
// 拦截调用函数的相关操作
// (2)construct()
construct(target,argumentsList,newTarget);
// newTarget为原始构造函数
// 返回一个实例对象
// 拦截new操作符,实质为实例对象操作


// 9.解除代理关系
const {proxy3,revoke}=Proxy.revocable(target,handle);
// 采用结构定义，在定义代理时同时定义代理的接触函数
// 此后调用该函数，代理解除
