// 对象
// 1.定义：由一组无序类似于键值对形式的映射组成的数据结构，对象的属性/方法作为键，数据或函数作为值，形成键值对的映射


// 2.创建对象
// 构造函数
var obj=new Object();
obj.name="Matt";
obj.sayName=function(){
    console.log(this.name);
}
// 调用构造函数进行实例化一个对象
// 设置对象的属性以及相关方法

// 字面量
var obj={
    name:"Matt",
    sayName:function(){
        console.log(this.name);
    }
}


// 3.对象增强功能
// 简写(属性简写，方法简写)
// 当需要在对象中设置属性，该属性值为变量值，名为变量名时，可以进行简写，仅使用变量名
// 当需要在对象中设置方法时，可以直接简写为：方法名(){};在设置访问器属性的get和set函数时也可简写
function obj(){
    let name="Matt";
    const obj={
        name,
        sayName(){
            console.log(this.name);
        }
    }
}
// 字面量属性名或方法名:[变量/表达式]
function obj(){
    let a="name";
    let b="sayName";
    const obj={
        [a]:"Matt",
        // name:"Matt";
        // []与简写可以兼容
        [b](){
            console.log(this.name);
        }
        // sayName(){}
    }
}


// 4.解构对象
// 用类似于对象字面量的结构，在一句语句中实现访问多个对象属性并将其赋值给多个变量
// 解构操作内部调用ToObject()，将源数据结构转化为对象再进行解构操作，故null和undefined解构会报错
var {A:a,B:b}=obj;
// 将obj的A属性赋值给a变量，B属性赋值给b变量
var {A,B}=obj;
// 创建同名变量A,B，将obj的属性赋值给对应变量
var {A,B,C="aa"}=obj;
// 在解构时，可以对变量进行预先赋值，而对于未找到属性，默认未undefined

// (1)对象复制
function a(){
    const obj1={
        name:"Matt",
        sayName(){
            console.log(this.name);
        }
    }
    let obj2={};
    ({name:obj2.name,
         sayName:obj2.sayName,
    }=obj1);
    // 事先声明的变量使用解构时，语句需加上()
    // 对于对象复制时采用解构操作，由于对象事先声明，需加上()
}

// (2)嵌套解构
function qiantao(){
    const obj1={
        name1:{
            name2:"Matt",
        }
    }
    let {name1:{name2}}=obj1;
    console.log(name2);
    // 声明一个变量name2，其值嵌套解构为obj1中的name1属性中的name2属性值
    // 在使用嵌套解构复制对象时，需保障除最底层外的属性在源对象以及目标对象内均存在
}

// (3)参数解构
// 函数参数可以采用对象解构，但实际对函数的arguments对象不构成影响
function fun(a,b,{name,sayName}){
    console.log(a);
    console.log(b);
    console.log(name);
    console.log(sayName);
    console.log(arguments);
}
fun(1,2,obj);

// (4)部分解构
// 当解构到某些属性报错时，会对正确的属性进行解构，达到部分解构，报错属性为undefined


// 3.对象方法
// (1)判断(作用类似于等于符号)
Object.is("1",true);
// 接受两个参数，返回布尔值，主要判断形式上的等于

// (2)合并属性
Object.assign(obj1,obj2);
// 第一个参数为目标对象，后续参数为若干个源对象
// 将源对象中的属性复制到目标对象中，并返回目标对象，实际过程对目标对象进行修改
// 共有属性的属性值会修改为最后一个参数的属性值
// 为引用值的复制，对源值修改，复制值也会修改

// (3)获取属性特性
Object.getOwnPropertyDescriptor(obj1,"name");
// 第一个参数为需要获取属性的对象，第二个参数为对应属性的字符串形式
// 返回对象的对应属性特性，其返回值也为对象
Object.getOwnPropertyDescriptors(obj1);
// 参数为需要获取属性的对象，返回对象的全部属性的特性，返回值为对象

// (4)设置属性特性
Object.defineProperty(obj1,"name",{});
// 第一个参数为需要设置属性的对象，第二个参数为对应属性的字符串形式，第三个参数为属性特性对象
Object.defineProperties(obj1,{});
// 第一个参数为需要设置属性的对象，第二个参数为属性特性对象
// 两个方法在不传属性特性对象参数时，使得所有特性均为false


// 5.属性特性=>[[]]二重中括号表示,不能直接访问，可以通过方法修改
// 属性分为访问器属性和数值属性

// (1)数值属性
// 属性特性：
// [[Configurable]]:是否可以delete删除，修改特性，修改类型
// [[Numberable]]：是否可以for-in遍历属性
// [[Writrable]]：是否可以修改值
// [[Value]]：存储值
const obj1={
    name:"Matt",
}
Object.defineProperty(obj1,"name",{
    value:"Tom",
    writable:false,
    configurable:false,
})
// 设置属性特性
Object.getOwnPropertyDescriptor(obj1,"name");
// 获取属性特性

// (2)访问器属性
// 属性特性：
// [[Configurable]]:是否可以delete删除，修改特性，修改类型
// [[Numberable]]：是否可以for-in遍历属性
// [[Get]]:定义get函数，在设置访问器属性时，进行相关操作
// get()函数的参数为设置属性时的赋值
// [[Set]]:定义set函数，在读取访问器属性时，进行相关操作
Object.defineProperties(obj1,{
    year:{
        value:12,
    },
    // 定义数值属性，设置属性特性
    grade:{
        get(){
            return this.year-6;
        },
        set(){
            console.log("设置无效")
        }
    }
    // 定义访问器属性，设置属性特性
})


// 6.对象迭代
// 对象属性为无序集合，仅可以枚举，不能实现迭代
// 对象迭代需转化为有序集合结构
Object.values(obj);
// 参数为对象，返回值为对象属性值的数组
Object.entries(obj);
// 参数为对象，返回值为对象属性(转化为字符串)与属性值组成的键值对数组(嵌套数组)
// 对对象属性进行浅复制(等于符相等)
// 忽略对象的符号属性


// 7.对象枚举
for(_ in obj){}
// 利用for-in循环语句进行枚举，无序枚举，属性为可枚举的实例属性和原型属性
Object.keys(obj);
// 参数为对象，枚举该对象的可枚举实例属性，无序枚举，返回值为属性字符串数组
Object.getOwnPropertyNames(obj);
Object.getOwnPropertySymbols(obj);
// 参数为对象，返回值为属性(符号属性)的字符串数组，枚举所有实例属性，包含不可枚举的属性
// 该方法顺序枚举数值属性，再按插入顺序枚举其他属性

