// JS错误
// 当JS在浏览器内运行时出现错误，会将错误信息报告在控制台上
// 对于桌面浏览器，可以直接访问控制台
// 对于移动端浏览器，需要借助第三方工具或者内置工具，拓展到桌面端进行访问

// try-catch
try{
    // 可能会报错的代码
}catch(erro){
    // 捕获错误后进行对错误的操作
    console.log(erro.message);
    // 跨浏览器仅支持错误对象的message属性
    if(erro instanceof TypeError){
        // 对TypeError类型进行错误处理
    }
    else if(erro instanceof ReferenceError){
        // 对ReferenceErro类型进行错误处理
    }
}finally{
    // 无论代码是否报错，都会执行finally代码块内的内容
    // 如果存在函数内，finally的存在会使得try和catch内的return失效
}
// 在try代码块中执行一段可能会报错的代码，如果执行成功，则忽略catch代码块
// 如果执行失败，会将错误对象传入catch代码块，在该代码块内可以对错误进行操作
// 整个执行逻辑为先尝试运行可能报错的代码，报错后会将错误进行捕获，在catch代码块内进行错误处理
// 实质会将错误抛出后再捕获，使得错误不会在控制台上抛出，保障代码略过错误继续执行，而在catch块内执行错误处理

// 错误对象
let erro=new Error("error message");
// 利用构造函数可以创建一个错误对象的实例，传入参数为错误信息字符串
// 由错误Error的基类派生出多种不同类型的错误
RangeError
// 使用的数值超界限
TypeError
// 使用了非预期类型的变量以及未定义的方法
ReferenceError
// 使用了未定义的变量
EvalError
SyntaxError
// eval()使用不合理
URIError
// encodeURI()和decodeURI()方法使用不合理
class CustomError extends Error{
    constructor(message){
        super(message);
        this.message=message;
        this.name="custom"
    }
}
let customError=new CustomError("custom error");
// 自定义错误对象，派生自Error类型，需重写构造函数，并在构造函数内定义message和name属性
// 自定义错误对象用于更为详细地对某种预期的错误类型进行描述，以及区别于其他的错误类型

// throw
try{
    throw "111";
    // 抛出Error类型的错误，错误信息为字符串111
}catch(error){
    console.log(error.message.type);
}
try{
    throw new TypeError(111);
    // 抛出TypeError类型的错误，错误信息为数值111
}catch(error){
    console.log(error instanceof TypeError);
    console.log(error.message.type);
}
// 在代码任意位置使用该操作符+某一数据，会将该数据作为错误抛出，并暂停执行代码
// 可以在try代码块内运用，进行人为地抛出错误

// error事件
// 对于未使用try-catch进行捕获的错误，都会在window上触发error事件
window.onerror=(message,url,line)=>{
    console.log(`${message}+${url}+${line}`);
    return false;
}
// 该事件仅能使用DOM0进行添加，且按顺序传入参数为message，url，line，分别表示错误信息，错误地址，错误行数
// 在事件处理程序中设置return返回值为false可以取消默认行为，一定程度上模拟try-catch

// 错误识别
// JS中常见的错误为：类型转换错误，数据类型错误，通信错误
// 类型转换错误：在判断语句以及流程控制语句中
// 使用严格判断代替非严格判断，以及在流程控制语句中使用完整的条件表达式，来避免类型转换过程
// 数据类型错误：JS松散类型，未对使用的数据类型加以限制
// 在函数中设置参数数据类型判断语句，达到手动的参数验证
// 使用静态代码分析器
// 由于JS为松散类型，故使用静态代码分析器如TypeScript，使用函数签名，数据类型限制来注解JS代码，到达静态错误分析
// 通信错误：与服务器通信和加载资源时发生错误
// 与服务器通信时注意数据通信编码

// 错误严重程度
// 严重错误：影响主要功能，引发其他错误，程序无法顺利执行
// 非严重错误：不影响主要功能，影响部分，可以恢复，重复执行可能成功

// 错误记录到服务器
function logError(sev,meg){
    // 参数为错误严重程度以及错误信息
    let img=new Image(),
    // 利用Image对象进行与服务器通信
    encodeSev=encodeURIComponent(sev),
    encodeMeg=encodeURIComponent(meg);
    // 将对应数据进行URI编码，再传输给服务器
    img.src=`log.php?sev=%${encodeSev}&meg=${encodeMeg}`
}
// 在代码中的catch代码块中，捕获错误后，调用该函数，将对应错误信息传输到服务器记录

// console控制台对象，用于向控制台内打印消息
console.log();
console.warn();
console.error();
console.info();
// 参数为需要打印的消息，为任意数据类型，不同方法仅觉得消息的格式
// console对象可以手动添加属性，方法或重写已有的方法

function log(msg){
    let div=document.createElement("div");
    div.innerHTML=`<p>${msg}<p>`;
    div.style.fontSize="20px";
    document.body.appendChild(div);
}
// 向页面中某个位置打印消息的函数，实质是利用DOM将消息渲染在页面上

function assert(condition,message){
    if(!condition){
        throw new Error(message);
    }
}
// 第一个参数为不抛出错误的情况，第二个参数为错误信息
if(a!==0){
    throw new Error("a不等于0")
}
// 上述代码可以转化为
assert(a===0,"a不等于0");

