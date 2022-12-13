// Fetch 用于向指定URL发送请求并接受处理响应的API
let r=fetch(url,init);
// 第一个参数为发送请求的目标url，第二个参数是对请求以及响应行为的设置对象
// 未设置对应方法则默认为GET
// 该方法返回值为一个期约
r.then((response)=>{
    console.log(response);
    // Response对象，包含响应的数据信息
    response.text().then((data)=>{console.log(data)});
    // 响应类型为text文件，调用该方法，返回一个期约，文件信息读取完成且数据可用时，将数据传入一个解决的落定期约
    console.log(response.status);
    // 响应的状态码，为200时响应成功，404时请求不存在的资源，500时服务器错误
    // 以上的状态为均获得响应，期约落定为解决，传入Response对象
    console.log(response.statusText);
    // 响应的状态描述
    console.log(response.ok);
    // 该属性反应的是响应是否成功，状态码为200-299时为响应成功为true，非该阶段的状态码，响应失败为false
    console.log(response.type);
    // 响应的类型
    console.log(response.url);
    // 请求的目标的完整url
},(error)=>{console.log(error)});
// fetch方法的返回值为一个期约，当获得响应且数据可用时，落定为一个解决的期约，并传入Response对象，包含响应信息
// 当由于服务器超时等原因，未能获得响应时，落定为一个拒绝的期约，并传入相关错误的信息

// Heards对象：发送的请求和接受的响应均具有头部Headers对象
// 对于特定的请求和响应，可以通过原型上定义的headers属性访问到Headers对象
let headers=new Headers({"A":"a"});
// 通过构造函数传入键值对对象作为参数来创建一个Headers对象的实例
// Heards对象与Map对象类似，为储存着键值对的对象，具有类似的方法
headers.set("name","value1，value2");
// 第一个参数为键，第二个参数为值，设置对应键值对，包含添加和修改操作
headers.get("name");
// 参数为键，返回对应键的值
headers.has("name");
// 参数为键，返回布尔值表明是否含键
headers.delete("name");
// 参数为键，删除对应键的键值对
headers.append("A","b");
// 第一个参数为键，第二个参数为值，向对应键的键值对内添加参数值，以逗号分割
// 头部护卫：对于对应类型的头部，头部护卫对其头部对象的行为进行约束
// 一般的响应和请求的头部：不能修改禁止修改的头部信息
// 构造函数创建头部：无限制
// 错误或重定向的响应：不能修改头部信息
// no-cors请求：不能修改非简单头部信息

// Request对象：通过该对象对请求信息以及请求体进行操作
// 请求可以通过构造函数创建，用于fetch发送
let reqeust=new Request(url,init);
// 第一个参数为发送请求的目标地址，第二个参数为请求设置对象，与fetch方法的参数一致。返回Request对象的实例
reqeust.headers
// 该属性指向请求的头部对象
let requst1=new Request(reqeust);
// 通过构造函数的形式可以实现请求的复制，复制请求会修改请求的特定属性，并非完全一致
// 对于含请求体的请求，在构造函数复制后，请求的bodyUsed属性为true，即请求体被使用，无法继续使用请求
let requst2=reqeust.clone();
// 通过请求的clone方法进行请求复制，复制后的请求完全一致
// 其请求的bodyUsed属性为false，即如果多次使用请求的请求体，需要调用该方法，使用请求体的克隆副本
fetch(requst2);
// 创建的Request实例可以作为参数直接传给fetch方法以发送请求，同样要求请求体不重用

// Response对象：通过该对象对响应信息即响应体进行操作
// 响应可以通过构造函数或其静态方法创建，但为非HTTP实际响应，也可以作为fetch方法落定为解决响应
let response=new Response(body,Rinit);
// 第一个参数为响应体数据，第二参数为响应的设置对象，返回Response对象的实例
let Rinit={
    // headers:{}
    status:200,
    statusText:"aaa"
}
// 在设置对象内可以设置头部对象，状态码以及状态描述
let Eresponse=Response.error();
// 使用Response的该静态方法，返回一个错误的响应实例
let Rresponse=Response.redirect(url,302);
// 使用该静态方法，返回一个重定向的响应实例，对应参数为重定向的url和重定向对应状态码
// 但由于为非HTTP实际响应，仅会体现在状态码变化上，并不会发送实际的重定向行为
response.status
// 响应状态码 成功200-299 未找到304 服务器错误500
response.statusText
// 响应状态描述
response.headers
// 响应的头部对象
response.type
// 响应的类型
response.ok
// 布尔值，响应的成功，200-299为成功
response.redirected
// 响应是否经历过一次重定向行为
response.url
// 响应源的完整url
response.bodyUsed
// 布尔值，响应体是否使用
response.clone();
// 调用该方法，返回一个响应的一致复制体
// 在重用响应体前需进行克隆
let response1=new Response(response.body); 
// 在构造函数内传入响应体，实现两响应间的浅克隆
// 实质为创建新指针指向同一个响应
// 故其两响应之间为共享状态

// Responce和Request的Body混入
// 在Response和Request对象中具有body属性，实现为ReadableStream可读流，同时具有bodyUsed属性，表示body是否被使用，即流是否上锁
// Request和Response将其数据载荷作为流形式处理，同时在response和request对象上封装了将流存储到缓冲区再转化为对应JS数据类型的方法，用于处理body数据
// 该方法返回一个期约，落定为转换后的JS类型数据，需要等待缓冲区被加载完成，即全部数据可用时才能调用该方法
// text方法：将body转存到缓存区再转换为UTF-8编码的字符串
fetch(url).then((response)=>{
    return response.text();
}).then((text)=>{
    console.log(text);
})
// 响应调用text方法将响应体转化为UTF-8的字符串
reqeust.text().then((text)=>{console.log(text)});
// 请求调用text方法将请求体转化为UTF-8字符串
// json方法：将body转存到缓存区再转换为JSON类型
response.json().then();
reqeust.json().then();
// formData方法，将body转存到缓存区再转换为FormData类型，实质为键值对形式的表单数据
reqeust.formData().then();
response.formData().then();
// arrayBuffer方法：将body转存到缓存区，再转换为ArrayBuffer类型，需要查询并修改原二进制数据时使用
reqeust.arrayBuffer().then();
response.arrayBuffer().then();
// blob方法：将body转存到缓存区，再转换为Blob类型，需要使用原二进制数据而不需要查询修改时使用
reqeust.arrayBuffer().then();
response.arrayBuffer().then();
// 请求体和响应体流的一次性：即对于响应体和请求体流，在使用后就会上锁，不能二次使用

// 发送JSON请求=>设置请求头部为对应JSON类型
let jsonHeaders=new Headers({"Content-Type":"application/json"});
// 创建一个Headers对象的实例，参数为字符串类型的键值对对象，在使用构造函数时，默认mode为"cors"即可跨源
let json=JSON.stringify({name:"aaa",year:18});
// 对JS对象进行序列化，使其转化为JSON对象
fetch(url,{
    method:"POST",
    body:json,
    headers:jsonHeaders
});
// 向目标URL发送请求，请求的数据体为JSON文件，方式为post，且包含对应设置的头部

// 发送文件请求=>文件以表单提交的行书存储在浏览器的表单对象中
let formData=new FormData();
// 创建一个表单数据对象的实例，用于存储并序列化表单的数据
let filesInput=document.querySelector("input[type='files'][multiple]");
// 调用该方法，获得具有文件属性和multiple属性的input输入框节点
for(let i=0;i<filesInput.files.length;i++){
    formData.append(`file${i}`,filesInput.files[i]);
    // 向表单数据内以此添加键值对，以文件序号为键，文件为值
}
fetch(url,{
    method:"POST",
    body:formData
});
// 由于采用了FormData类型，故自动设置头部

// 发送参数=>请求体可以为包含参数信息的字符串
let str="a=A&b=B";
// 设置参数字符串，a的值为A，b的值为B，用&连接
let strHeaders=new Headers({
    "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
    // headers包含字符串编码类型
})
fetch(url,{
    method:"POST",
    body:str,
    headers:strHeaders,
})

// 发送可用被AbortController中断的请求
let abortController=new AbortController();
// 创建一个中断控制器对象的实例
fetch(url,{
    signal:abortController.signal
    // 设置该属性，表示可用被该中断控制器实例中断
}).catch((error)=>{console.log(error)});
// 被中断之后的请求落定为拒绝期约，对该拒绝期约进行捕获并打印拒绝理由
setTimeout(abortController.abort,10);
// 在规定时间后，将中断控制器的中断方法推入执行队列
// 调用该方法后，设置了对应signal参数的请求，均会被该方法中断

// 加载Blob响应，以图片Blob文件为例
// 即向某个资源发送请求，获得一个Blob图片文件响应，将获得的资源设置到已有的img上
let img=document.querySelector(img);
fetch(imgUrl).then((response)=>{
    response.blob().then((blob)=>{
        img.src=URL.createObjectURL(blob);
    })
});
// 向图片URL发送请求，获得一个图片blob响应，对响应对象调用blob方法，读取blob文件，返回一个期约
// 读取blob文件完成时，期约落定解决，并将文件数据传入到解决值，将文件数据调用方法创建url，指定为img的src，设置图片

// 发送跨源请求=>设置mode值为cors或no-cors
// 默认的Headers构造函数创建的请求头部，自动将mode设置为cors
// 请求体为FormData时，也会自动设置跨源
fetch(url,{
    mode:"no-cors",
}).then((response)=>{
    console.log(response.type);
    // 类型为opaque
});
// 以mode-nocors的形式发送的请求可以跨源，但是无法访问Request响应对象
// 该方式适用于探测请求以及响应缓存以便后续使用


// 响应以数据包的形式发送到请求源，接受到响应数据包后，在缓冲区为数据包分配内存，当数据包传输结束，即整个响应资源下载到缓冲区时，资源可用，响应结束
// Response和Request上定义的方法用于待资源完全可用时，进行将缓冲区的全部数据转换为JS对象
// 对于大型资源响应以及需要实时处理接受到的数据包时，可以使用Response和Request的body属性，直接使用可读流
// 即在缓冲区上接受到数据包后，由浏览器控制，以一定间隔时间将缓冲区的数据包导入到可读流，进行流操作

fetch('https://fetch.spec.whatwg.org/').then((response)=>{
    let body=response.body;
    // 直接操作响应体
    let reader=body.getReader();
    // 获得响应体流的读取器

    // reader.read().then(console.log);
    // // 读取一次数据包内的数据，且在读取完成后进行打印

    // function readAll({value,done}){
    //     if(done){
    //         return;
    //         // 递归终点：done为true即数据包读取完
    //         // 数据包中的数据最后一个数据对象的done属性为true，此时无value值
    //     }
    //     else{
    //         console.log(value);
    //         return reader.read().then(readAll);
    //         // 递归调用
    //     }
    // }
    // return reader.read().then(readAll);
    // // 读取器读取一次，将读取结果传入readAll函数，该函数实际为一个递归函数
    // // 递归调用，读取整个数据包内的数据，且在读取完成后进行打印

    // while(true){
    //     let {value,done}=await reader.read();
    //     // 等待一步读取过程完成
    //     if(done){
    //         break;
    //         // 整个数据包读取完成
    //     }
    //     else{
    //         console.log(value);
    //     }
    // }
    // // 此时需设置外部为async异步函数
    // // 使用异步函数进行循环读取完整个数据包
    

    let asyncIterater={
        [Symbol.asyncIterator](){
            return {
                next(){
                    return reader.read();
                }
            }
        }
    }
    // 定义一个迭代器，且定义迭代行为为迭代进行读取器的读取
    for await(let x of asyncIterater){
        console.log(x.value);
    }
    // 因为读取器读取为异步过程，采用for-await-of异步迭代
});

async function* gengerator(stream){
    let reader=stream.getReader();
    try{
        while(true){
            let {value,done}=await reader.read();
            if(done){
                break;
            }
            else{
                yield value;
                // 生成器生成读取的数据包的数据
            }
        }
    }finally{
        reader.releaseLock();
        // 在数据包读取完成后，调用该方法进行解锁，保证流复用
    }
}
// 定义异步生成器，由数据包读取数据来生成值
fetch("https://fetch.spec.whatwg.org/").then(async (response)=>{
    for await (let i of gengerator(response.body)){
        // 将数据包的响应体作为参数传入，并异步迭代异步生成器的每一个值
        console.log(i.value);
    }
})

// 以上方法是对响应数据包的二进制数据本身进行操作，如果需要转化为JS数据类型
// 需要将数据包可读流的数据导入到新的可读流，再利用可读流创建一个Response对象，该对象的响应体为一个数据包的数据，再调用Response对象的方法进行转化
fetch("https://fetch.spec.whatwg.org/").then((response)=>{
    let body=response.body;
    let reader=body.getReader();
    return new ReadableStream({async start(controller){
        try{
            while(true){
                let {value,done}=await reader.read();
                // 循环读取数据包里的数据
                if(done){
                    break;
                }
                else{
                    controller.enqueue(value);
                    // 将读取的数据导入到新的可读流内
                }
            }
        }finally{
            reader.releaseLock();
            // 对原可读流的读取器进行解锁
            controller.close();
            // 关闭新可读流控制器
        }
    }})
}).then((body)=>{
    let response=new Response(body);
    // 新可读流生成为异步过程
    // 将返回的新可读流用作参数，创建一个新的响应对象
    return response.text();
    // 调用该方法，将包含数据包的响应体转化字符串形式
}).then(console.log);
// 最后进行操作转化后的数据