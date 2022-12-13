// 创建对象
// 批量创建同一类型的对象

// 1.工厂模式
// 创建一工厂函数，利用工厂函数传参创建对象
function person(name,year){
    let obj=new Object();
    // 显式声明对象
    obj.name=name;
    obj.year=year;
    // 创建并赋值对象属性
    obj.sayName()=function(){
        console.log(obj.name);
    }
    // 创建并赋值对象方法
    return obj;
    // 返回对象
}
let person1=person("Matt",19);
// 利用工厂函数传参创建对象
// 创建的对象没有明确的类标识


// 2.构造函数
// 创建一构造函数，new调用构造函数，实例化对象
function Person(name,year){
    this.name=name;
    this.year=year;
    // 使用this指代实例化的对象来设置属性
    this.sayName=function(){
        console.log(this.name);
    }
}
// 函数无显式声明对象，无返回值
let person2=new Person("Tom",18);
// 使用new操作符调用构造函数，实例化一个对象，对象的类标识为对应构造函数
// 创建一个新对象
// 对象的[[prototype]]的内部特性被赋值为构造函数的prototype对象
// 构造函数内的this指向新对象
// 执行构造函数语句，创建对象的属性，方法
// 构造函数若有返回值，且返回值为非空对象，返回该对象，否则返回实例对象

person2.constructor
// 采用构造函数实例化对象具有constructor属性，该属性指向对应构造函数，且为不可枚举属性

Person("Global",0);
// 在不使用new操作符调用构造函数时，直接调用则为在全局对象上调用，this指向Global(Window)

let obj={};
Person.call(obj,"Jarry",20);
// 对构造函数调用call方法，第一个参数为对象，第二个剩余参数为Person构造函数参数
// 即在对应对象上调用构造函数，this指向该对象

// 每次调用构造函数，对应定义在构造函数内的实例对象方法来说，都是重新创建一个Function的实例，
// 即各个对象的引用值属性以及方法都在调用函数时新创建实例，各个之间并不相等
function A(name){
    this.name=name;
    this.sayName=sayName;
}

function sayName(){
    console.log(this.name);
}
// 可以将方法定义在全局作用域内，实现共用


// 3.原型模式
// 在函数创建时，函数具有一个prototy属性，该属性指向一个prototype对象，即原型对象
// 在调用构造函数实例化对象时，实际是对象内部特性[[prototype]]被赋值为prototype对象
// 则可以将同一类对象共有属性和方法定义在构造函数的prototype属性上

function Animal(name,year){
    Animal.prototype.name=name;
    Animal.prototype.year=year;
    Animal.prototype.form="animal";
    Animal.prototype.sayName=function(){
        console.log(this.name);
    }
}
let animal1=new Animal("Rat",2);
// 该实例对象具有原型对象上定义的属性和方法

// (1)构造函数，原型对象，实例对象关系
// 构造函数具有prototype属性，该属性指向原型对象
// 原型对象默认具有constructor属性，该属性指向构造函数
// 实例对象具有[[prototype]]的内部属性，该属性指向原型对象，部分浏览器可以通过_proto_来访问
// 原型对象同样具有[[prototype]]内部属性，该属性指向Object构造函数的对应原型对象，而该对象的[[prototype]]内部属性指向null

// 原型判断方法
Person.prototype.isPrototypeOf(person1);
// 对原型对象调用该方法，参数为实例对象，判断实例对象的原型是否为该原型对象，返回布尔值

// 原型获取方法
Object.getPrototypeOf(person1);
// 对Object调用该方法，参数为实例对象，返回该实例对象的原型对象

// 原型设置方法
person1.setPrototypeOf(Person.prototype);
// 对实例对象调用该方法，参数为一原型对象，将该实例对象的原型对象设置为参数
// 对性能产生较大影响
let person3=Object.create(Person.prototype);
// 对Object调用该放啊，参数为原型对象，创建一原型对象的实例对象


// (2)原型层级
// 在调用对象属性时，会有限寻找对象实例，再寻找实例对象的原型链上的原型对象
// 再实例对象上创建同名属性，会遮蔽原型对象上的属性
// 可以通过delete操作符进行删除来实例对象属性消除遮蔽

// 判断属性位置方法
person1.hasOwnProperty("name");
// 对实例对象调用该方法，参数为属性字符串，判断该属性是否位于实例上，返回布尔值
"name" in person1;
// 使用in操作符，左为属性字符串，右为对象，判断该对象是否含有该属性，包括原型链和实例，返回布尔值


// (3)原型动态性
// 在使用构造函数实例化对象后，对原型对象进行的修改会体现在所有实例对象上
// 而如果对原型对象进行重写，则仅会体现在重写后的实例对象上(重写前后实例化的对象其[[prototype]]指向不同的原型对象)


// (4)构造函数显示创建原型对象
// 显示创建原型对象时，需设置其constructor属性为不可枚举属性，且其值要指向构造函数本身


// (5)原型模式问题
// 原型模式中，定义在构造函数中的引用值属性为共用，对于某些实例，修改该属性时，对应的原型对象会被修改

