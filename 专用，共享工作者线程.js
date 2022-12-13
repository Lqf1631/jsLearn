// 专用工作者线程：仅能在同源条件下创建的由一个页面独享的工作者线程

// 创建专用工作者线程
// 外引工作者线程：即采用外部文件作为工作者线程，将外部文件的路径地址传入构造函数
let worker=new Worker('路径地址',{name:"wor1ker",type:"classic",credentials:"include"});
// 调用该方法，创建一个专用工作者线程对象的实例，该实例为访问工作者线程的接口
// 第一个参数为工作者线程文件的路径地址，要求满足同源，第二个参数为配置对象，可选名称，类型（模块或一般），凭证传输选项
// 行内工作者线程：代码作为字符串，创建Blob对象，再利用Blob对象创建对象URL作为地址传入构造函数
// 此时可以调用函数的toString方法，将函数转化为字符串，以立即执行函数IIFE形式插入到代码字符串中
function fun(){
    console.log("bbb");
}
let code=`
    console.log("aaa");
    (${fun.toString()})();
`,
blob=new Blob([code]);
let inlineWorker=new Worker(URL.createObjectURL(blob));

// 页面线程对工作者线程的响应事件,添加到页面线程的工作者线程接口上
worker.onerror
// 工作者线程中报错，会触发该事件，工作者线程报错会中断页面线程，且不能被页面线程中try-catch捕获，仅能通过该事件进行监控
worker.onmessage
// 页面线程接受到工作者线程传递的数据，数据是以对象的形式传递
worker.onmessageerror
// 页面线程接受工作者线程传递的数据过程中报错，会触发该事件
// 工作者线程于也具有对页面线程的响应事件=>添加到工作者线程的全局对象上
self.onerror
self.onmessage
self.onmessageerror

// 工作者线程的生命周期=>初始化，活跃，终止
// 在创建工作者线程后，会有一定的加载延迟和网络延迟
// 在向路径地址发送创建请求到其文件加载完成时，为初始化阶段
// 对于页面线程，一旦发送创建请求后，其接口能被立即使用，此时可以通过接口发送消息，当工作者线程初始化完成到活跃阶段后，开始执行消息
// 对于专用工作者线程，与单一页面建立联系，页面关闭或调用相关方法后，工作者线程终止，而未关闭的工作者线程始终维持着页面线程接口的引用
// 工作者线程的状态信息无接口暴露，故无法确认
self.close();
// 工作者线程自身终止，而调用该方法后，仅暂停向工作者线程的消息队列中继续添加消息，实质为非同步终止
worker.terminate();
// 页面线程使用接口终止工作者线程，调用该方法，对工作者线程的消息队列进行锁定和清理，终止相关操作，实质为同步终止

// 工作者线程的嵌套
// 在工作者线程的文件内，可以调用构造函数创建嵌套的工作者线程
// 可以实现将工作者线程中处理变为多个线程并行执行（在满足cpu核数限制下），提高执行效率
let code1=`
    let innerWorker1=new Worker();
    let innerWorker2=new Worker();    
`
// 在一个工作者线程内创建了两个内嵌的工作者线程，可以实现并行处理该工作者线程的任务

// 工作者线程引用外部JS文件
self.importScripts('路径地址');
// 在工作者线程内调用该方法，可以采用CORS引用到跨源的JS文件
// 实质类似于创建<script>标签动态加载脚本，而此时外引的JS文件可以访问到该工作者线程的作用域
// 调用该方法，下载顺序无限制但是按顺序执行外引脚本

// 工作者线程通信
// 传输时会对数据进行包装，实质为以对象形式进行传输，接受时可以进行对象解构
// MessagePort通信=>直接在接口或self上调用postMessage和相关事件，会隐式采用MessagePort进行通信
// 一般用于工作者线程和页面线程通信
worker.postMessage(1);
worker.onmessage=({data})=>{console.log(data)};
self.onmessage=({data})=>{
    console.log(data);
}
self.postMessage(3);

// BroadcastChannel
let broadcastChannel=new BroadcastChannel("aaa");
broadcastChannel.postMessage(1);
broadcastChannel.onmessage=({data})=>{
    console.log(data);
}
let subBroadcastChannel=new BroadcastChannel("aaa");
subBroadcastChannel.onmessage=({data})=>{
    console.log(data);
}
subBroadcastChannel.postMessage(2);
// 分别在工作者线程和页面线程中创建同名的BroadcastChannel对象的实例
// 利用该对象的postMessage和onMessage事件进行数据传输和接受
// BroadcastChannel对象实质为广播形式，调用实例方法发送数据后，使用同名的实例的接受事件可以进行监控
// 由于工作者线程存在延迟，故一般需等待工作者线程中的监控设置后才发送数据

// MessageChannel
// 该对象具有两个用于传输的端点，对端点调用postMessage和onmessage事件，可以向另一个端点发送或接受数据
let channel=new MessageChannel();
worker.postMessage(null,[channel.port1]);
channel.port2.postMessage(1);
channel.port2.onmessage=({data})=>{
    console.log(data);
}

let port;
self.onmessage=({ports})=>{
    if(!port){
        port=ports[0];
        self.onmessage=null;
        port.onmessage=({data})=>{
            console.log(data);
        }
    }
}
port.postMessage(2);
// 在页面线程内创建MessageChannel对象的实例
// 调用页面线程接口的postMessage方法将数据以及channel的端点传输到工作者线程
// 工作者线程接受到端点后，将其存储为全局变量，以便使用，并设置对应的onmessage事件接受另一个端点的数据发送
// 利用全局变量的端点，调用其postMessage向另一个端点发送数据
// 不仅实现工作者线程-页面线程通信，还可以实现工作者线程间的通信，即利用页面线程将两个端点传递给不同的工作者线程

// 数据传输=>postMessage()
worker.postMessage("aaa");
// 大多数数据类型是以结构化克隆对象的形式进行数据传输，参数为传输的数据
// 即将参数进行克隆，再添加额外信息，包装为Message对象进行传输，实质为传输对象副本
// 在接受端可以将Message对象进行解构，访问其data即传输的数据，ports即传输的信道端点
worker.postMessage({arr1:arrayBuffer1,arr2:arrayBuffer2},[arrayBuffer1]);
// 对于某些数据类型，如ArrayBuffer或MessagePort，可以通过可转移对象进行传输
// 第一个参数为传输的数据，第二个参数为传输数据中选用采用可转移对象进行传输，形式为数组
// 对于多个待传输的数据，可以利用对象进行封装
// 可转移对象即将对象转移到目标线程中，本线程不能再进行访问
worker.postMessage(null,[channel.port1]);
// 传输信道端点时，仅将信道端点放在可传输对象数组中，可以在接受端利用解构ports属性进行访问
worker.postMessage(SharedArrayBuffer);
// 传输共享内存时，即在本线程和目标线程共同维护共享内存

// ArrayBuffer内存
let arrayBuffer=new ArrayBuffer(128);
// 创建一个ArrayBuffer对象的实例，实质为在内存中开辟一个参数比特的内存空间进行使用，其存储形式为二进制数
let typedArray=new Uint32Array(arrayBuffer); 
// 在JS中对ArrayBuffer内存仅能通过定型数组进行操作，即采用规定类型的数据，占用特定比特的内存空间，将ArrayBuffer内存空间划分为定型数组
typedArray[0]=2;
// 定型数组第一个位置为2，即在ArrayBuffer中占据定型的比特内存，以存储2的二进制数

// Atomics原子操作=>管理SharedArrayBuffer的并行问题
// 采用非原子操作时，由于操作本身消耗时间，即如果多个线程同时对共享内存进行操作，即每项操作无法逐一体现
// 采用原子操作时，可以保障在同一时间仅有一个线程对共享内存进行操作，体现出每一项的操作
let share=new SharedArrayBuffer(128);
let sharedTypedArray=Int32Array();
// 初始化一个全为0的定型数组，使用128比特的内存
Atomics.add(sharedTypedArray,index,value);
Atomics.sub(sharedTypedArray,index,value);
Atomics.and(sharedTypedArray,index,value);
Atomics.or(sharedTypedArray,index,value);
Atomics.xor(sharedTypedArray,index,value);
// 第一个参数为定型数组，第二个参数为数组索引，第三个参数为值
// 对共享内存的定型数组的索引位置使用参数值进行相关操作
// 依次为加，减，位与，位或，位异或操作
// 以上方法均返回操作前索引位置的原值
Atomics.load(sharedTypedArray,index);
// 对共享内存的定型数组读取索引位置处的值，并返回
Atomics.store(sharedTypedArray,index,value);
// 对共享内存的定型数组在索引位置处写入新值，返回新值
// 原子读和原子写可以用作边界，即在原子读和写之前之后的操作均不会重排到越过原子读和写
Atomics.exchange(sharedTypedArray,index,value);
// 在索引位置处写入新值，并将旧值返回
Atomics.compareExchange(sharedTypedArray,index,initial,value);
// 当索引位置处的值为initial时，才会将新值写入，旧值返回
// 原子交换可以保障读写连续进行
Atomics.wait(sharedTypedArray,index,value,time);
// 在索引位置处监控值是否等于参数值，等于就会将该线程锁定，直到进行唤醒或修改监控值，或一定时间后超时
// 该方法返回字符串表示状态，最后一个参数为可选参数，为最大超时时间
Atomics.notify(sharedTypedArray,index,number);
// 调用该方法后，会解除定型数组上对应参数位置索引处的参数数量的锁定


// 共享工作者线程=>共享线程
// 即采用同源外引的文件作为共享工作者线程，可以被同源的线程连接共享访问通信，如同源的页面，窗口，内嵌网格等
// 仅采用外引文件，行内形式会采用唯一的URL，其余线程无法进行连接访问
let sharedWorker=new SharedWorker("路径地址",{name:"aaa"});
// 调用该方法时，在同源条件下，如果是新的路径地址和命名，会创建一个共享工作者线程，如果是已有路径地址和命名，会与共享工作者线程进行连接
sharedWorker.port;
// 页面线程的共享线程接口上有port属性，可以通过该属性与共享线程进行通信
sharedWorker.port.postMessage("aaa");
sharedWorker.port.onmessage=({data})=>{
    console.log(data);
}
sharedWorker.onerror;
// 页面线程的共享线程接口上有error事件，可以对共享线程报错进行监控
let portsSet=new Set();
// 在共享线程中创建接口集，用于管理与多个页面线程的接口
// 使用对应的接口可以与对应页面线程进行通信
self.onconnect=({ports})=>{
    portsSet.add(ports[0]);
};
// 每当页面线程调用构造函数时，会与共享线程创建连接，触发该事件
// 该事件会传入ports信道端点数组，仅包含一个信道端点，可以用于与页面线程通信
// 需要控制该事件的触发，即每个页面线程控制触发一次，以保障信道端点唯一
// 需要在页面卸载前，即beforeload事件，向共享线程发送明确消息，以删除不再使用的端点
// 共享线程的生命周期：
// 无terminate方法进行关闭共享线程，且在共享线程内部调用close时，如果还有其他页面连接，则不会关闭
// 调用构造函数时，会将页面线程与共享线程创建连接，至少有一个页面连接到该共享线程时，共享线程不会关闭




