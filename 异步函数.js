// 异步函数
// 将期约思想运用于函数而实现异步编程的产物


// 1.声明异步函数async
async function fun(x){
    console.log(x)
    return x;
}
let o={
    async sayHi(){
        console.log("Hi");
    },
    then(fn){
        fn("thenable");
    }
}
// async关键词声明函数可以用在任意函数的前面，如函数声明，函数表达式，匿名函数，方法等来声明一个异步函数
// 异步函数与一般函数性质相似，区别体现在返回值为一个期约，并且可以通过await关键词暂停执行
// 对于一般返回值，会采用Promise.resolve进行包装，返回一个解决期约
async function fun1(x){
    throw(x);
}
let p1=fun1(3);
p1.catch((x)=>{console.log(x)});
// 对于显示抛出错误(throw)会将其捕获,错误理由用Promise.reject进行包装，返回一个拒绝期约
async function fun2(x){
    return Promise.reject(x);
    // 会在此步抛出一个未能捕获的错误，中断函数执行，未能实现return
}
// 对于显示定义拒绝期约(Promise.reject());会直接在异步函数内部抛出错误，中断异步函数的执行
let p2=fun(o);
p2.then(console.log);
// o.then(console.log)=>console.log("thenable")
// 异步函数的返回值为一个实现了thenable接口对象时，其返回后作为一个期约，可以调用then方法进行解包


// 2.awiat =>!!!await关键词尝试对后面的对象进行解包求值
// await功能有暂停恢复和返回拒绝期约
// 异步函数中可以使用await关键词，执行到await关键词时会暂停异步函数执行，待其await后的值可用时，恢复函数执行
// await关键词仅能用于异步函数中
async function fun3(){
    let o={
        then(fn){
            fn("Hi");
        }
    }
    await o;
    // await o的值为Hi,即对thenable接口对象实现解包后的值
    let o1={
        name:"Matt"
    }
    await o1;
    // await o1会先将o1对象包装为Promise.resolve(o1),再进行解包,其值为o1
}
// await期待的对象为一个实现thenable接口的对象,其会对该对象进行解包,而对于其他对象,会被视为期约值为该对象的解决期约,再进行解包
async function fun4(){
    await (()=>{throw x})();
    // 后接立即执行函数封装throw操作,将错误捕获,返回一个Promise.reject()包装错误的拒绝期约
    console.log("2");
}
async function fun5(){
    await Promise.reject(1);
    // 后接拒绝期约,将错误捕获,返回一个Promise.reject()包装错误的拒绝期约
    console.log(2);
}
// 在await后接显示抛出错误的同步操作(立即执行函数封装的throw操作)或显示定义拒绝期约,await此时具有return的作用,且会将错误捕获,并返回一个拒绝期约


// 3.异步函数功能实现
// sleep函数
// 在函数执行时期望实现非阻塞暂停
// 理由await,等待一个期约在期望时间后落定,实现暂停恢复
function sleep(delay){
    return new Promise((resolve)=>{setTimeout(resolve,delay)});
}
async function fun6(){
    console.log(1);
    // 暂停1500ms
    await sleep(1500);
    console.log(2);
}

// await时间等待
// 异步函数中定义期约时,如果需要得到一组按顺序落定的期约,则可以依次await等待期约落定,则总时间应大于每个期约落定时间之和
async function fun7(){
    function pro(delay,x){
        return new Promise((resolve) => {
            setTimeout(resolve,delay,x);
        })
    }
    let t0=Date.now();
    let p1=Promise.resolve(await pro(1000,1));
    let p2=Promise.resolve(await pro(2000,2));
    let p3=Promise.resolve(await pro(3000,3));
    console.log(Date.now()-t0);
}
// 如果对于顺序无要求,则可以进行先定义,再待期约使用时进行await等待期约落定后执行异步操作,此时不同期约落定是同步进行,实现平行加速
async function fun7(){
    function pro(delay,x){
        return new Promise((resolve) => {
            setTimeout(resolve,delay,x);
        })
    }
    let t0=Date.now();
    let p1= pro(1000,1);
    let p2= pro(2000,2);
    let p3= pro(3000,3);
    console.log(await p1);
    console.log(await p2);
    console.log(await p3);
    console.log(Date.now()-t0);
}

// 在async异步函数中使用await实现异步操作
// 在async异步函数中await之前的代码为同步行为,按顺序进行操作,而其后的代码需等待await后的值可用时才执行,当异步函数在同步调用时,实现了await后的代码的异步执行
// 异步函数的返回值为一个期约,其可以作为参数传入异步函数或直接使用期约方法,实现不同异步操作的串行
// 在期约报错时,会尽可能保留栈信息,便于寻找错误信息,但占用内存,而异步函数无此特点
