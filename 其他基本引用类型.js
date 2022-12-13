// Global对象

// URL编码方法
encodeURI();
encodeURIComponent();
// 将网页网址编码成URI形式，传递给浏览器
// 后者编码程度更高，对更多字符进行编码

// URL解码方法
decodeURI();
decodeURIComponent();
// 对URI形式编码进行解码

// eval解释方法
eval();
// 将其内部代码解释，在内部定义的变量，函数能够全局访问

// Window对象
// 浏览器将Global对象实现为Window对象，全局变量为Window对象的属性，全局函数为Window对象的方法


// Math对象
// 用于数学操作运算，速度比js快

// 1.Math对象属性为特殊值
Math.E;
Math.SQRT2;
Math.LN10;

// 2.比较方法
Math.max(1,2,3,5,6);
Math.min(1,6,8);
// 返回若干个参数中的最大值/最小值

// 3.取整方法
Math.ceil(5.5);
// 进一法取整
Math.floor(5.5);
// 去一法取整
Math.round(5.5);
// 四舍五入
Math.fround(5.5);
// 返回与其最接近的单精度浮点数

// 4.随机数生成
Math.random();
// 生成[0，1）之间的随机数
function random(min,max){
    let dis=max-min+1;
    return Math.floor(dis*Math.random()+min);
}
// 返回[min,max]之间的随机数

// 5.取绝对值
Math.abs(-1);

// 6.取平方根
Math.sqrt(4);

// 原始值的包装类型

// 可以采用Object构造函数创建
let a=new Object(5);
// Object构造函数可以根据变量b的类型，返回对应包装值引用类型的实例


// 1.Boolearn
// 创建
let bool=new Boolean(false);
// 方法
bool.valueOf();
// 返回对应值的布尔值
bool.toString();
bool.toLocaleString();
// 返回对应布尔值的字符串

// 2.Number
// 创建
let num=new Number(123);
// 继承方法
num.valueOf();
// 返回对应数值
num.toLocaleString(16);
num.toString();
// 返回对应数值的转化字符串，可选参数为进制数

// 格式转化方法
num.toFixed(3);
// 转化为小数，参数为保留小数位数
num.toExponential(4);
// 转化为科学计数，参数为小数位数
num.toPrecision(5);
// 选用小数或科学计数的方法最为合适的一种，参数为小数位数

// Number本身的方法
Number.isInteger(1.0);
// 参数为数值，判断参数是否为整数

