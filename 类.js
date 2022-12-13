// 类 class

// 1.类定义
class A{};
// 声明形式定义
let A=class{};
// 赋值形式定义
let A=class AName{
    fun(){
        console.log(A.name);
    }
};
// 赋值形式,class后可加标识符，在块作用域内可以通过name属性访问
// 先声明或者赋值定义，再使用
// 类的作用域为块作用域


// 2.类构造函数
class A{
    constructor(name){
        this.name=name;
        this.sayName=()=>{
            console.log(this.name);
        }
        console.log("right");
    }
}
let a=new A("first");
// 类中包含一个构造函数
// new操作符在实例化类的对象时，调用构造函数，并传递相关参数
// 其实例化过程与构造函数一致
// 类存在prototype指向原型对象，原型对象的constructor指向类，类的实例化对象存在[[prototype]]指向类的原型对象，形成原型关系
// 类的原型行为类似于构造函数
a instanceof A;
// 类实例化的对象，该操作符返回true
// 执行构造函数后，返回值为this（新对象），在构造函数类定义return返回新对象，则不构成原型关系
let a1=new a.construcotr("Second");
// 类构造函数类似于方法，可以通过实例调用，但调用构造函数，必须使用new操作符
let b=new class B{
    constructor(name){
        this.name=name;
    }
}("1");
// 通过new操作符和立即执行函数操作，可以在类定义时，立即执行实例化


// 3.类组成
class Person{
    constructor(name){
        this.name=name;
        this.sayName=()=>{
            console.log(this.name);
        }
        this.arr=[1,2,3];
    }
    // 实例成员

    sayYear(){
        console.log(Person.year);
    }
    // 原型成员

    set year(year){
        console.log("set");
        this.year_=year;
    }
    get year(){
        console.log("get");
        return this.year_
    }
    // 获取和设置函数

    static locate(){
        console.log(this);
    }
    // 静态方法

    *[Symbol.iterator](){
        yield *this.arr.values();
        // 对对象进行迭代操作，实际是迭代对象的arr属性，对arr属性调用values方法
    }
    // 迭代器和生成器
    // 定义类实例化后的对象的迭代行为
}
Person.yaer=20;

// (1)实例成员
// 类构造函数内部定义实例成员的私有属性和方法，不实现共享

// (2)原型成员
// 在类中直接定义的方法为原型成员，可以在类的实例中是实现共享
// 原型成员不能为原始值和对象
// 可以在外部为类添加原始值和对象

// (3)设置获取函数
// 类的原型成员可以定义某一属性的设置函数和获取函数
// 该属性可以实现共享

// (4)静态成员
// static关键词，定义类的静态方法
// 该静态方法中this值指向类本身
// 静态方法用于定义不被实例和原型调用的方法
// 静态方法适合定义工厂函数，批量产生实例对象

// (5)生成器与迭代器
// 在类的原型和静态均支持定义生成器与迭代器
// 将类的实例对象变为可迭代对象，实现迭代操作


// 4.类继承
class D{
    sayThis(){
        console.log(this);
    }
}
class d extends D{
    constructor(name){
        this.name=name;
    }
    sayHi(){
        console.log("Hi");
    }
}
// 声明类时采用extends关键词继承
let e=class extends D{};
// 赋值类时采用extends关键词继承
// class关键词为子类的声明
// 后续的{}可以定义子类
// extends关键词后可以为表达式（函数进行混用），仅需表达式的值为类或构造函数
// extends关键词可以向后兼容，可以继承构造函数
// extends关键词继承采用原型链的形式，子类继承父类原型成员,静态方法等非构造函数内的元素

class SuperArr extends Array{
    static get [Symbol.species](){
        return Array;
    }
}
// 可以继承内置类型，进行相关增强功能
// 在调用某些返回新实例方法时，可以修改静态方法的get函数，操作[Symbol.species]属性，设置其返回值，控制返回实例的类型

class ChouXiang{
    constructor(){
        if(new.target===ChouXiang){
            throw new Error("Wrong");
        }
        if(!this.a){
            throw new Error("Wrong");
        }
    }
}
// 抽象基类，用于仅进行派生继承，而不进行实例化的类
// new.target保存最新用于new操作符的类名
// 在抽象基类的构造函数内使用new.target判断，如果实例化则抛出错误
// 在抽象基类的构造函数内部，可以设置该基类的派生类必须定义某种原型方法，通过this来检查，在进行实例化时会抛出错误

// 类混入
// 将不同的类行为混入到一个类中
// 实质上为嵌套类的继承
// extends操作符后可以为返回值是一个类或构造函数的函数
class A1{
    sayHi(){
        console.log("Hi");
    }
}
class B1 extends fun1(A1){
    sayHello(){
        console.log("Hello");
    }
}
class C1 extends B1{};

function fun1(super_class){
    return super_class;
}


// super
// 对派生类继承的构造函数以及静态方法进行引用和增强
// 仅在派生类中的构造函数，静态函数中使用

class Fu{
    constructor(name){
        this.name=name;
    }
    sayHi(){
        console.log("Hi");
    }
    static sayHello(){
        console.log("Hello");
    }
}
class Zi extends Fu{
    constructor(year){
        super("Matt");
        // 调用父类的构造函数,实现继承
        // 实质为原型链，具有原型链缺点，子类不能向父类构造函数传参
        this.year=year;
        // this指super()调用父类构造函数后，返回的父类实例
        // 增强子类构造函数
    }
    static sayHello(){
        console.log("This");
        // 增强子类静态方法
        super.say();
        // 调用父类静态方法，实现继承
    }
}
// 派生类构造函数中使用super()调用父类的构造函数，返回一个父类构造函数的实例对象
// 该实例对象在后续可以由this进行引用
// 派生类不重写构造函数，则默认派生类中的构造函数调用super()方法实现构造函数继承
