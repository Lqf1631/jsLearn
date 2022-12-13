// Date基本引用类型


// 1.创建日期

var A=new Date();
// 采用构造函数方式创建，默认为当前的日期，
// 创建其他日期，修改传入参数为当前时间到标准时间的ms表示的数字
// 可以选用Date.parse()或Date.UTC()方法，两种方法均返回ms数

Date.parse();
var A=new Date("May 1,2020");
// 隐式调用
var A=new Date(Date.parse("TUE MAY 23 2019 00:00:00 GMT-0700"));
// 显示调用
// 此方法传入参数为字符串，方法尝试将其转化为到标准日期的ms数，格式错误返回NaN，可以隐式调用
// 格式：
// "2019/5/10"  "年/月/日"
// "May 10，2019"  "月名 日，年" 
// "TUE MAY 23 2019 00:00:00 GMT-0700"  带时区信息的标准格式

Date.UTC();
var A=new Date(Date.UTC(2020,0,1,12,23));
// 显式调用下为UTC时间
var A=new Date(2020,0,1,12,23);
// 隐式调用下为本地时间
// 此方法传入若干个数字，分别按顺序代表 年，月，日，时，分，秒，毫秒，前两个参数为必须，创建UTC时间
// 此方法隐式调用时，创建的为本地时间
// !!! 按从 0 开始表示时间 !!!

Date.now();
var A=Date.now();
// 返回当前时间的ms数,可以用于计时


// 2.相关方法
var now= new Date();
// 创建一个Date引用类型的实例，将其赋值为now

// (1)继承方法
var A=now.valueOf();
// 返回now时间到标准时间的ms数

var A=now.toString();
// 返回now时间parse方法的标准格式字符串
var A=now.toLocaleString();
// 返回now的当地时间

// 此外还有各种变化
now.toDateString();
now.toLocaleDateString();
// DateString指年月日
now.toTimeString();
now.toLocaleTimeString();
// TimeString指时分秒
now.toUTCString();
// 返回UTC时间

// (2)设置更改时间方法
var now=new Date();
// 创建一个Date引用类型的实例，赋值给now；

var A=now.getTimezoneOffset();
// 返回now到UTC标准时间的偏移量，单位为 ！！！分！！!

now.setFullYear(2019);
// 更改now的时间的年为2019年
var A=now.getDay();
//  返回now的周几，从0开始
// !!!Day只有getDay()方法，不能用周几来设置时间
now.setUTCMinutes(70);
// 大于进制，上一位进一
// Time => FullYear => Month => Date/Day =>Hours =>Minutes =>Seconds =>Milliseconds
// Time为ms数，FullYear为4位数年，Date为日期，Day为周几
// 年月日用单数，时分秒用复数，从 0 开始表示，大于进制时进一,可以加入UTC进行UTC时间指定


