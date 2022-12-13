// Notification API
// 网页向用户发送通知的API
Notification.requestPermission().then((choice)=>{
    console.log(choice);
})
// 获取权限方法，用于向用户弹出窗口获得权限
// 返回值为一个期约，待用户选择后落定，传入处理程序的参数为字符串，"gradient"同意 "denied"拒绝
// 仅在页面加载完成时，出现一次通知框，用于确认是否获得通知权限
let options={
    body:"body",
    img:url,
    viberate:true
}
let n=new Notification("title",options);
// 创建一个通知对象的实例，第一个参数为通知标题字符串，第二个参数为通知配置对象
// 通知配置对象里可以设置内容属性，图片属性以及是否振动
n.close();
// 调用该方法进行关闭通知
n.onclick
// 点击通知时，触发事件
n.onclose
// 关闭通知时，触发事件
n.onshow
// 通知显示时，触发事件
n.onerror
// 通知加载错误或者缺少权限时，触发事件
// 上述事件触发在通知上
// 对于通知的相关创建，关闭方法以及事件等，均应保证在获得通知权限后进行操作，否则会进行静默操作。即通知触发error事件


// Page Visibility API
// 判断页面是否处于非可见状态，在非可见状态时，可以停止页面的某些功能，以减少资源占用
document.visibilityState
// 该属性反应的页面文档的可见状态
"hidden"
// 隐藏，即最小化
"visibale"
// 可见
"prerender"
// 预加载，仅在页面加载时处于该状态，一旦改变无法再进入
document.addEventListener("visibilitychange",()=>{})
// 在document.visibilityState属性改变时，会在document上触发可见状态改变事件，在该事件内可以设置可见状态改变时的页面行为


// 计时器API
// 用于检测页面性能，常需要用到高精度的计时器来设置时间戳
// High Resolution Time API
Date.now();
// 反应全局系统时间的时间戳，精度低，且忽略改变全局系统时间的操作
performance.now();
// 反应相对时间的时间戳，精度高，即在执行上下文（页面加载或工作者线程初始时）初始化为0，开始计时
performance.timeOrigin;
// 该属性反应的为高精度计时器初始化时的全局系统时间

// Performance TimeLine API
// 用结束时间与开始时间之差来体现性能差异，而利用时间戳对各个时间点进行标记
let p1=new PerformanceEntry();
// 时间戳用该对象进行封装
// 页面会自动设置一系列不同类型的时间戳用于体现页面加载以及资源加载的各个过程的性能，也可以用户自定义时间戳
let pArr=performance.getEntries();
// 该方法返回整个页面记录的所有时间戳数组
pArr[0].entryType
// 时间戳的类型
pArr[0].name
// 时间戳的名称
pArr[0].startTime
// 时间戳的起始时间
pArr[0].duration
// 时间戳的持续时间

// User Timing API
// 用户自定义事件戳
let p3=performance.mark("a");
let p4=performance.mark("b");
// 调用该方法会在该时刻记录一个时间戳，参数为时间戳名称，类型为mark，返回该时间戳对象
// mark类型的时间戳仅记录起始时间，实质为一个时间点，持续时间为0
performance.getEntriesByType("mark");
// 调用该方法，可以返回一个类型为mark的时间戳数组，该数组后添加的时间戳先取出=>[b,a]，实现为数组堆栈
performance.getEntriesByName("a");
// 利用时间戳的名称进行查询，返回一个时间戳对象
let p5=performance.measure("A","a","b");
// 第一个参数为measure的名称，后续参数为两mark的名称，返回一个measure时间戳对象
// 利用已有的两mark时间戳，创建一个measure类型的时间戳，该时间戳为一段事件，起始时间为mark类型最小的起始时间，持续时间为两起始时间之差

// Navigation Timing API
// 网页加载时间戳
let p6=performance.getEntriesByType("navigation")[0];
// 该方法返回一个仅包含一项的时间戳数组
// 该时间戳反应了在网页加载的各个阶段的时间

// Resource Timing API
// 资源加载时间戳
let p7=performance.getEntriesByType("resource")[0];
// 该方法返回一个时间戳数组，对应所有的资源加载时间戳
// 该时间戳反应了在对应资源加载的各个阶段的时间


// Streams API
// 利用流处理,将大块数据分解为小数据块进行处理,不用等待数据全部加载完成,可以实现及时处理
// 用于网络请求和磁盘资源的加载处理

// 流:可写流,可读流,转换流
// 块:流的片段,块的大小和频率,速度不一,可以为任意数据类型,一般为定型数组
// 流的内部队列:在流中存储块的队列
// 流的状态:流具有出口和入口
// 当流出速度等于流入速度时,流平衡
// 当流出速度大于流入速度时,造成流出口空闲,部分内存浪费,可以接受
// 当流入速度大于流出速度时,会造成流的内部队列增长,形成积压,当达到内部队列的高水平线时,会出现反压,限制流入

// 定义一个生成器作为数据源，每隔1s会生成一个整数，利用数据流，可以实现对生成数据的实时操作，不用等待完全生成
async function* ints(){
    for(let i=0;i<5;i++){
        // 循环，每步生成一个数
        yield await new Promise((resolve)=>{
            // 生成器yield，实现为可迭代对象
            // await等待期约，即等待当前期约落定后，再执行下一步
            setTimeout(resolve,1000,i);
            // 每隔1s落定一个期约，落定值为i
        })
    }
}

// 可写流:对底层数据源的封装,数据可以通过底层数据源填充可写流,而通过可写流的公共接口进行访问流中数据
let readableStream=new ReadableStream({
    async start(controller){
    // 构造函数第一个参数为一个函数，该函数为可读流的start函数，用于设置可读流的初始状态及向其传值
    // start函数的参数为可读流的控制器，在start函数内可以调用控制器的相关方法进行数据流入
    for await(let i of ints()){
        // 等待迭代每一个ints()生成器生成值
        controller.enqueue(i);
        // 调用该方法，由数据源向可读流中流入数据进入内部队列
        // 由于生成数据是异步过程，需等待数据落定后，才流入可读流
        // 在此步过程中,可以对数据进行一定程度的处理操作
    }
    controller.close();
    // 调用该方法，关闭数据流入
}});
// 创建可读流,即对底层数据源进行封装
let reader=readableStream.getReader();
// 调用该方法，返回一个读取器，再将可读流进行锁定，仅能由该读取器读取数据
// 消费者操作，对可读流的数据进行处理
(async function(){
    while(true){
        let{done,value}=await reader.read();
        // 调用读取器的该方法，每次从内部队列中读取，返回值为对象，包含done表示状态以及value表示值属性
        if(done){
            // 表明已经结束，则退出循环
            break;
        }
        else{
            console.log(value);
            // 数据处理
      }
    }
})();
// 需要等待数据的流动，故采用await的异步函数立即执行

// 可写流:对底层数据槽的封装,可以利用底层数据槽获得流中的数据,由公共接口向可写流中写入数据
let wirtableStream=new WritableStream({
    write(value){
        console.log(value);
        // 在该步可以对数据进行相关处理
        // 对于流中的数据,不用等待异步操作
    }
    // 初始化时,传入writer函数,该函数能以参数形式访问流中的数据
    // 对于流中的数据,不用等待异步操作
});
// 利用可写流的构造函数创建一个可写流对象的实例，第一个参数传入可写流的write方法，该方法参数为可写流中的数据，从而获得可写流中的数据
let writer=wirtableStream.getWriter();
// 调用该方法，返回一个可写流的写入器，同时将可写流上锁，仅能从该写入器写入数据
// 生产者，利用写入器，将数据源写入可写流
(async function(){
    for await(let i of ints()){
        await writer.ready;
        // !!!需等待写入器为可写状态
        writer.write(i);
        // 调用该方法，利用写入器向可写流里写入一个数据
    }
    writer.close();
    // 调用该方法,关闭写入器
})();

// 转换流:即包括了可写流和可读流的数据流
let transformStream={writable,readable}=new TransformStream({
    transform(i,controller){
        // 初始化时,传入transform函数,函数参数可以访问到流中数据和控制器
        controller.enqueue(i);
        // 可以进行相关数据操作
        // 调用控制器的该方法,可以将数据填入到转换流中
        // 对于流中的数据,不用等待异步操作
    }
});
// 转换流实质为可写流和可读流的组合,实现为嵌套对象

let readableReader=readable.getReader();
let writableWriter=writable.getWriter();
// 分别获得读取器和写入器,且均对流进行锁定

// 生产者,使用写入器进行写入数据
(async function(){
    for await(let i of ints()){
        await writableWriter.ready;
        writableWriter.write(i*2);
    }
    writableWriter.close();
})();

// 消费者,使用读取器进行读取数据
(async function(){
    while(true){
        const {done,value}=await readableReader.read();
        if(done){
            break;
        }
        else{
            console.log(value);
            // 可以进行相关数据操作
        }
    }
})();

// 流的拼接操作，对于非锁定状态的流，可以调用相关方法进行拼接操作
// 一般为可读流调用方法，拼接到转换流和可写流上
readableStream.pipeThrough(transformStream);
// 该方法返回一个新的可读流对象实例
// 实质是调用可读流的读取器，将读取数据传入转换流的控制器，再将返回一个新的可读流
readableStream.pipeTo(wirtableStream);
// 调用可读流的读取器，将可读流的数据传入到可写流的写入器内，实质是将可读流作为可写流的数据源