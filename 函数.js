// 函数
// 函数为引用类型Function的一个实例，实质为一对象
// 故函数名实质为一指针
// 调用函数名，则调用该指针指向函数本身
// 调用函数名()，则调用并指行函数，实质为函数的返回值
// 定义函数时，可以声明形参，调用函数时，可以传入实参
// 参数传递是以值的形式进行传递
// 函数无法重载,重载即根据同一的函数的不同参数类型,执行不同的逻辑
// 可以通过在函数内部定义参数检查语句,来实现逻辑上的重载
// 函数嵌套,可以将函数本身或函数的返回值作为函数的参数或者函数的返回值使用 

// 1.函数定义
// (1)声明形式
function fun(arguments){
    // 函数封装的代码块
}
// 声明形式时，会有声明提前，代码执行时会将声明提升到最前面，再执行其余语句
// 声明形式时，最后可以不加;

// (2)赋值形式
let fun=function(arguments){
    // 函数封装的代码块
};
// 赋值形式无声明提前，代码执行到该语句时，才定义函数

// (3)箭头函数
// 在赋值形式时，会定义匿名函数再进行赋值，箭头函数对匿名函数进行简化
let fun=(arguments)=>{
    // 函数封装的代码块
};

// (4)构造函数
// 函数为引用类型Function的实例
// 函数名为一指针
let fun=new Function(...arguments,"{}");
// 前面若干参数为函数参数，最后一个参数为函数封装代码块，表现为字符串

// 声明形式与赋值形式的差异
// 声明会被提前，故声明的函数在最开始被定义
// 赋值不会被提前，故赋值的函数在执行到该段语句时才被定义
// 在不同条件下才被定义的函数(if判断语句中定义函数)，注意需采用赋值形式，否则会被提升，然后再被覆盖，后一段被定义
// 声明定义函数，可以先调用再定义


// 2.箭头函数
(arguments)=>{
    // 函数封装代码块
};
// 箭头函数适用于嵌入定义匿名函数的条件
// 在一个参数条件下可以省略括号()
// 在一句代码块的条件下可以省略大括号{}
// 省略{}时自动默认该语句带有return
// 不具有arguments，super，new.target属性，不能被作为构造函数


// 3.函数参数（arguments）
// 在函数定义时，可以声明多个命名参数，实质为形参
// 在调用函数时，可以对形参进行赋值，实质为实参
// arguments对象,调用函数时动态变化的实参数组
let fun=function(a,b){
    console.log(arguments.length);
    return a+b+arguments[0]+arguments[3];
    // a,b为命名参数，在函数中直接使用
    // 未命名参数可以调用arguments数组使用
};
fun(1,2,3,4);
// 1+2+1+4=8

// 函数中的参数是以类数组的形式进行储存传递
// 故在声明或传递时，不必声明参数的类型，参数的数量
// 可以传入若干个不同形式的参数，而不必预先对其进行命名
// 而在函数声明时，在函数内部直接使用名称可以调用函数的命名参数
// 在函数内部使用arguments对象数组，可以使用函数的未命名参数
// arguments对象参数与命名变量参数无逻辑关系，储存在不同内存，但二者保持一个值的对应关系
// arguments对象根据调用函数传递的参数实时变化

// 箭头函数中不能调用arguments对象，但可以预先对其进行包装再使用
function fun(){
    let fun1=()=>{
        console.log(arguments.length);
    }
    fun1();
}
// 在非箭头函数内定义箭头函数并调用，可以在内部箭头函数中使用arguments对象
// 调用外部函数时，进行参数传递到内部函数中的arguments对象


// 3.函数名称
// 函数名为一指向函数体的指针
// 一个函数可以具备多个函数名,即多个指针指向同一个函数
function fun(){};
let newFun=fun;
// fun和newFun都指向同一个函数

// 调用函数名，调用函数本身
// 调用函数名(),调用并执行函数,实质使用的函数的返回值

// 函数name属性
fun.name
// 函数的name属性指向函数名称的标识符
// get,set,bind函数会具有特定的标志
// 构造函数形式定义函数,name为"anonymous"


// 4.默认参数与参数拓展收集
// (1)默认参数
function fun(a=1,b){
    return a+b;
}
// 支持显示定义默认参数,即调用函数未传递参数时,参数采用默认值
// 默认参数在函数调用未传递时才会被使用,即与默认参数相关操作在此时才生效
// 默认参数与arguments对象无关,arguments对象体现的是一动态变化的实参数组
// 默认参数按顺序进行定义,存在"暂时性死区",即引用后续定义的变量

// (2)参数拓展
// 在调用函数时,对于可迭代对象,可以使用拓展操作符,将其进行迭代传入
function fun(){
    let sum=0;
    for(let i=0;i<arguments.length;i++){
        sum+=arguments[i];
    }
    return sum;
}
let arr=[1,2,3,4,5];
fun(0,...arr,5);
// 拓展操作符可以与其他参数兼容

// (3)参数收集
// 在定义函数参数时,可以使用拓展操作符.实现参数收集
// 将若干个独立参数收集为一数组,在函数块内使用
function fun(x,...arr){
    // 收集参数仅能为最后命名的参数
    let arr1=arr.push(x);
    return arr1.filter((a)=>{a>=3});
}
fun(1,2,3,4,5);


// 5.函数内部
// 在函数内部可以调用的对象
// (1)arguments对象
// 仅在function定义的函数中才能使用
// 该对象为类数组结构,用于储存函数调用时传入的变量(实参)
// 在函数定义时,可以使用该对象,实现对实参的预先设计处理
function fun(){
    return arguments[0]+arguments[1];
}
fun(1,2);
// 函数调用时,将实参储存到arguments类数组结构中
arguments.callee
// arguments对象具有callee属性,该属性指向原函数
// 在函数中使用该属性,可以降低对函数名的耦合度

// (2)this对象
// 该对象指向将函数作为方法调用时的方法对应的对象
// 在调用函数时,才能实现对this的赋值
// 直接调用函数时为window对象
// 该对象可以指定在函数作为方法调用时,函数内部对于对应对象的处理
function fun(){
    console.log(this);
}
const o={};
o.fun();

// 箭头函数中,this指向的是定义箭头函数的上一级对象
let obj={
    aaa:()=>{return this},
    // this指向上一级obj对象
}
obj.aaa();

// (3)caller对象
// 该对象指向调用该函数的函数
// 在嵌套函数时,用于调用外层函数
// arguments.callee.caller指向调用原函数的函数

// (4)new.target对象
// function定义的函数可以当作构造函数来使用
// 在使用new关键词调用函数作为构造函数后,new.target指向该构造函数
// 普通调用时,其值为undefined


// 6.函数方法与属性
// length属性
// 该属性为函数声明时定义的参数(形参)个数

// prototype属性
// function定义函数都可以当作构造函数
// 构造函数均具有prototype属性,指向原型对象
// 原型对象中储存用该构造函数实例化对象共有的属性方法

// call方法
fun.call(thisValue,arr);
// 调用函数的方法,第一个参数为指定函数中this的值,第二个参数为函数参数,按数组传递
// 返回值为按该this和参数调用函数的返回值 

// apply方法
fun.apply(thisValue,argument1,argument2);
// 调用函数的方法,第一个参数为指定函数中this的值,第二个参数为函数参数,依次传递
// 返回值为按该this和参数调用函数的返回值

// bind方法
fun.bind(o);
// 参数为对象,返回值为将函数中this值赋值为参数对象的新函数
// 该方法可以指定函数中this值,并创建一个新函数,其绑定参数对象进行调用

// call和apply在调用方法时指定调用函数的对象
// bind方法可以将函数与一对象绑定后返回绑定函数


// 7.函数递归调用
// 在函数内部调用自身
// 需要进行判断，以保障递归终止
function fun(num){
    if(num=1){
        return 1;
        // 判断递归终止条件
    }
    else{
        return num*fun(num-1);
        // 执行递归调用，并进行每步递归的处理
    }
}
// 在将函数进行赋值时，由于函数内部递归调用依赖函数名，会产生赋值后名称混乱
function fun(num){
    if(num=1){
        return 1;
    }
    else{
        return num*arguments.callee(num-1);
        // 使用arguments的callee属性指向函数本身进行递归调用，减小名称其耦合性
    }
}
// 采用命名函数的形式进行赋值，实现递归调用
let new_fun=(function f(num){
    if(num=1){
        return 1;
    }
    else{
        return num*f(num-1);
    }
});


// 8.尾调优化
// 尾调：在嵌套函数条件下，外部函数的返回值为内部函数的返回值
// 未优化：在一个栈帧执行外部函数时，由于其返回值与内部函数有关，需另开一个栈帧执行内部函数，
// 当第二个栈帧内部函数执行完毕后，该栈帧弹出，再执行第一个栈帧到其结束后再弹出
// 每嵌套一次需多一个栈帧
// 优化：再尾调条件下，不需要维持外部函数，其执行完成后弹出，再执行内部函数，仅占用一个栈帧
// 尾调优化条件：
// 外部函数返回值为内部函数
// 不对返回值进行逻辑操作
// 内部函数不为引用外部函数（自由变量）的闭包=>可以进行参数传递
// 严格模式下(f.caller和f.arguments维持外部函数引用)
function f(num){
    console.log(num);
    let a=1;
    function fun(num){
        // 闭包，引用外部函数的参数
        a=num*a
        // 闭包，引用外部函数的自由变量
        if(num=1){
            return a;
        }
        else{
            return fun(num-1,a);
            // 内部函数实现自身的递归尾调
        }
    }
    return fun(num);
    // 引用自由变量闭包导致不能尾调优化
}


// 9.闭包
// 闭包指某类特殊函数，该函数引用了非本函数作用域内的外部变量
// 常在函数嵌套中内部函数引用外部函数变量，该内部函数为闭包

// 变量对象：函数中的变量以对象形式储存，由作用域链的指针指向。在函数调用时，参数变量，this被赋值
// 变量对象包括全局变量对象和活动变量对象
// 作用域链：在函数指向上下文中存在一指针指向作用域链，作用域链为指针列表，指向变量对象，按从内向外顺序排列

// (1)函数执行过程
// 函数定义时，会在函数内部的[[scope]]特性中保存作用域链，该作用域链中指针指向全局变量对象
// 函数调用时，会创建执行上下文执行函数代码，在其中包含作用域链
// 作用域链中的指针指向活动变量对象和全局变量对象
// 在内部函数中，其作用域链中指针指向外部函数活动对象，全局变量对象，内部函数活动对象

// (2)内存管理
// 外部函数执行完成后，会被自动销毁
// 当内部函数为闭包时，维持着对外部函数的活动对象引用，除该对象外，外部函数执行完成后其余部分销毁
// 需手动将其闭包赋值为空指针，解除引用进行销毁
function fun(){
    let i=1;
    return function(){
        console.log(i);
    }
}
let a=fun();
// a为闭包匿名函数；
a();
// 执行a
a=null;
// 销毁闭包匿名函数，解除对外部函数活动对象引用，释放内存

// (3)this对象
// 非箭头函数：闭包中的this对象指在调用该闭包的对象
// 箭头函数：含定义闭包的作用域的对象
let aaa={
    name:"Matt",
    sayName(){
        return function(){
            console.log(this.name);
        }
    }
}
aaa.sayName()();
// 调用aaa对象的sayName方法，该方法返回一个函数，再调用该函数，打印this.name
// 由于在全局中调用的闭包匿名函数，this指向全局对象的name属性

let bbb={
    name:"Matt",
    sayName(){
        return ()=>{
            console.log(this.name);
        }
    } 
}
bbb.sayName()();
// 采用箭头函数，其中this值锁定为定义时的外部对象，指向bbb的name属性

// 10.立即调用函数
// 在采用命名函数时，再加一个括号，内部为参数，可以实现立即调用函数
(function fun(name){
    console.log(name);
})("Matt");
// 立即调用函数可以实现块作用域，在内部封装变量或函数，使得外部无法访问来避免变量外泄
// 实现类似块作用域的操作
(function fun(){
    let name="Matt";
    function sayYear(){
        console.log("18");
    }
})();

// 11.私有变量
// 定义在函数内部无法被外部直接访问的变量或函数
// 可以采用在函数内定义闭包，再在外部调用闭包的方式进行访问私有变量，称为特权方法

// (1)构造函数
function Fun(){
    let year="18";
    function sayHi(){
        console.log("Hi");
    }
    // 定义在函数内部的私有变量和私有函数，无法直接访问
    this.getYear=function(){
        return year;
    }
    this.setYear=function(new_year){
        year=new_year;
    }
    this.sayHi=function(){
        return sayHi();
    }
    // 通过构造函数定义实例方法，该方法为闭包，访问到外部函数定义的私有变量
}
let fun1=new Fun();
fun1.sayHi();
fun1.setYear(20);
fun1.getYear();
// 实例化对象，通过对象的闭包方法来访问私有变量
// 构造函数形式在实例化时，各个私有变量独立，互不干涉

// (2)静态方法=>原型形式
function Person(){};
// 在全局定义构造函数
(function (){
    let name="Matt";
    function sayHello(){
        console.log("Hello");
    }
    // 声明私有变量和私有函数
    Person.prototype.getName=function(){
        return name;
    }
    Person.prototype.setName=function(value){
        name=value;
    }
    Person.prototype.sayHello=function(){
        sayHello();
    }
    // 定义构造函数的原型对象的方法,该方法为闭包,可以访问到私有变量
})();
let prerson=new Person();
// 实例共享私有变量，对其进行统一操作

// (3)模块模式=>针对单例对象
// 单例对象指对应引用类型中仅有该一个实例,常用对象字面量定义
let single=function (){
    let name="Matt";
    function sayHello(){
        console.log("Hello");
    }
    // 定义私有变量
    return {
        year:"18",
        // 返回值包含对象的一般属性
        getName(){
            return name;
        },
        setName(value){
            name=value;
        },
        sayHello(){
            sayHello();
        }
        // 对象的闭包方法,用于访问私有变量的接口
    }
};
// 将对象定义为一个函数的返回值
// 该对象为Object引用类型的实例

// (4)模块模式增强=>针对单例对象
// 单例对象指对应引用类型中仅有该一个实例,常用对象字面量定义
function Animal(year){
    this.year=year;
}
let addSingle=function (){
    let name="Matt";
    function sayHello(){
        return "Hello";
    }
    // 定义私有变量
    let AddSingle=new Animal(18);
    AddSingle.getName=function(){
        return name;
    }
    AddSingle.setName=function(value){
        name=value;
    }
    AddSingle.sayHello=function(){
        return sayHello();
    }
    // 在返回对象之前对其进行一定程度的增强
    return AddSingle;
};
// 将对象定义为一个函数的返回值