// 1.迭代:按一定顺序，重复多次执行一段程序
// 迭代基础：循环(多次重复)，循环指定迭代次数，和每步迭代的操作
// 迭代对象：有序集合，可以按照一定的顺序进行遍历


// 2.迭代模式:
// 无须了解其相关数据结构形式，可以实现迭代操作
// 对于可迭代对象，可以调用其[Symbol.iterator]属性来引用一个工厂函数，创建一个与可迭代对象关联的迭代器对象，对可迭代对象进行迭代操作


// 3.可迭代对象:
// 临时可迭代对象(生成器)，集合引用类型(包含有限元素，按一定顺序遍历所有元素)
// 具有自我识别功能，能够返回一个临时的迭代器对象
// str，arr，set，map，arguments...

// 显式调用工厂函数
const arr=[1,2,3,4,5];
arr[Symbol.iterator];
// 访问属性，为一工厂函数
arr[Symbol.iterator]();
// 调用方法即调用工厂函数，返回可迭代对象关联的迭代器对象

// 隐式调用工厂函数=>原生语言结构
// for-of    Map() Set()
for(let elem of arr){
    console.log(elem);
}
// 数组解构
let [x,y,z]=arr;
console.log(`${x},${y},${z}`);
// 拓展操作符
const arr1=[...arr];
// Array.from()
const arr2=Array.from(arr);
// Set()
const set=new Set(arr);
// Map()
const map=new Map(arr.map((value,index)=>[value,index]));


// 4.迭代器对象(迭代器对象本身可作为可迭代对象使用，其[Symbol.iterator]()方法返回迭代器对象本身)
// 在对可迭代对象调用[Symbol.iterator]方法后，返回一个关联的临时迭代器对象
const iter=arr[Symbol.iterator]();
const iter_result=iter.next();
// 迭代器对象具有next()方法，该方法会按顺序依次遍历可迭代对象中的元素，返回一个迭代结果对象
iter_result.value;
iter_result.done;
// 迭代结果对象具有两个属性
// value表示可迭代对象当前迭代的值
// done为布尔值，表示迭代是否完成

// 5.自定义迭代器对象
// (1)定义next()方法，返回迭代结果对象
// (2)定义[Symbol.iterator]()方法，返回一个迭代器对象(迭代器对象本身可以作为可迭代对象)
// (3)在[Symbol.iterator]()方法内，定义return()方法，描述提前终止迭代的行为
// return()方法可选，可以判断return是否属于迭代器对象来判断迭代器是否可以提前关闭
// 提前终止一般用于for-of语句的提前中断，不完全解构操作
// 迭代器没有return()方法时，停止迭代后再开始，会从之前迭代位置处开始
// return()方法一般返回迭代结果对象:{value:undefined,done:true}以及执行相关关闭行为语句

