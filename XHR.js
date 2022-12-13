// XML HTTP Request对象
// 向服务器中发送请求，并从服务器获得响应，此过程中实现数据传输
// 浏览器通过访问XHR对象，获得从服务器响应中的数据
// XHR从浏览器中获得数据，自身向服务器发送请求，传输数据
// 通过XHR，实现浏览器与服务器间的第三方通信

let xhr=new XMLHttpRequest();
// 创建XHR对象实例
xhr.open(method,url,true);
// 初始化XHR方法，第一个参数为传输方法字符串，第二个参数为同源的请求发送到的地址字符串，第三个参数为是否异步
xhr.send(null);
// 参数为包含任意数据类型的字符串形式的数据体，如果不传输数据体，必须设置为null
// 调用该方法后，XHR对象向服务器传递数据
xhr.abort();
// 在接受到异步响应之前，调用该方法，XHR对象会停止触发事件，且不能访问到与响应相关的属性，调用该方法后，一般会手动取消XHR对象引用，释放内存
xhr.readyState
// 该属性反应了XHR对象的状态
// 0：未调用open初始化 1：调用open初始化 2：调用send发送请求，但未接受到响应 3：开始接受到响应数据 4：完成接受加载响应，数据可用
xhr.onreadystatechange=function(){
    if(xhr.readyState==4){
        // 响应加载完成，数据可用
        if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
            // 响应成功返回
            console.log(xhr.responseText);
            console.log(xhr.responseXML);
            console.log(xhr.statusText);
        }
        else{
            console.log(xhr.responseText);
        }
    }
    
}
// 在readyState发送改变时，会触发该事件，该事件需设置在send方法之前，保证请求发出前设置完成
// XHR响应属性:在XHR对象接受到响应之后，响应属性值会进行对应填充
xhr.status
// XHR响应的HTTP状态码，响应有效2xx，304为响应有效但是未修改数据，表示响应成功返回
xhr.statusText
// 对HTTP状态码的文本描述
xhr.responseText
// 响应的文本描述
xhr.responseXML
// 响应数据未XML时，可以通过该属性访问，否则为null

// HTTP头部数据=>字符串形式传输
// 在请求以及响应过程中，会默认传递HTTP头部数据
xhr.setRequestHeader("name","value");
// 在发送请求前，调用该方法，向请求的头部数据中添加自定义的键值对数据，类型为字符串
xhr.getResponseHeader("name");
// 在获得响应后，调用该方法，可以获得响应中对应头部数据值
xhr.getAllResponseHeaders();
// 在获得响应后，调用该方法，会获得全部头部数据的键值对形式字符串

// GET请求
// 用于向服务器中发送查询类的请求，在服务器中查询数据
xhr.open("get","1.js?name1=value1&name2=value2",true);
// 第二个参数除了请求地址，还需要额外添加查询字符串，需注意查询字符串形式
xhr.send(null);
// 对于GET请求，一般仅发送请求而不发送请求数据
function addURLParam(url,name,value){
    let URIName=encodeURIComponent(name),
    URIValue=encodeURIComponent(value);
    // 在查询字符串中，需要将数据进行URI编码
    if(url.indexOf("?")){
        // 检测url地址是否含有查询字符串，含有则以&开头，不含有则以?开头
        url+=`?${URIName}=${URIValue}`;
    }
    else{
        ulr+=`&${URIName}=${URIValue}`;
    }
    return url;
}
// 该函数可以对需要查询的数据进行正确格式设置

// POST请求
// 用于向服务器中发送在服务器中存储的数据
xhr.open("post","1.js",true);
xhr.send(new FormData(document.forms[0]));
// POST请求需要向send方法中传入需要发送的数据体，可以为序列化后的XML DOM文档，也可以为包含任意数据类型的字符串形式

// FormData类型
// 专门用于XHR对象发送表单类型的数据，即键值对形式的数据类型
let formData=new FormData(document.forms[0]);
// 创建FormData类型的实例，参数为表单节点对象，也可以不传参数，创建空的FormData类型的实例
formData.append("name","value");
// 调用该方法，可以向对象中添加字符串形式的键值对类型数据
xhr.send(formData);
// FormData类型实际在初始化时，已经进行了序列化且在发送请求时，默认修改头部文件，故可以直接作为参数传入send方法，发送表单数据

// timeout超时
xhr.timeout=1000;
// 设置超时属性，时间为ms，在规定时间内，没有接受到响应，就会中断请求，并触发超时事件
xhr.ontimeout=function(){
    console.log("timeout");
    // 在超时后再访问响应相关属性，会报错
}
// 超时属性和超时事件设置，同样需要在发送请求前

// overrideMimeType
xhr.overrideMimeType("text/xml");
// 以参数MIME类型，覆盖响应返回的类型，参数为MIME类型的字符串，该方法仅能实现覆盖类型，而不能实现类型转换
// 需要在send发送请求前，调用该方法对响应类型进行设置


// 进度事件=>支持同类型的API，对接受响应进一步细化
loadstart
// 开始接受响应
progress
// 在接受响应期间持续触发
load
// 响应加载完成
error
// 响应加载失败
abort
// 响应加载完成前调用abort进行终止
loadend
// 响应接受结束
// 正常接受响应的过程，最先触发loadstart，接着持续触发progress，然后根据加载响应情况分别触发load，error和abort，最后触发loadend
// load事件
xhr.onload=function(){
    // 不用验证xhr的readyState==4，直接设置onload的响应加载成功事件
    if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
        // 仍需验证响应是否成功返回
        console.log(xhr.responceText);
        // 打印响应体文本
    }
}
// progress事件
xhr.onprogress=function(event){
    if(event.lengthComputable){
        // 响应加载的数据长度是否可计算
        console.log(`${event.position}/${event.totalSize}`);
        // 响应加载进度条
        // 响应加载的当前位置，以及相应加载的数据总字节数
    }
}
// 在progress事件中，可以访问event对象，event.target指向xhr，且event对象包含与响应加载情况相关的属性

// XHR跨源资源共享CORS
// 跨源资源共享实质为请求与响应包含对于HTTP头部信息，实现浏览器与服务器间的交流

// XHR支持原生的跨源资源共享
let xhrC=new XMLHttpRequest();
xhrC.open("post",urlC,true);
// 简单的POST和GET请求，无自定义HTTP头部，仅需使用绝对的跨源urlC
// 实质会在请求的HTTP头部添加一个包含当前源信息的Origin
// 在返回的响应头部的Access-Control-Allow-Origin包含对应的源信息，以此实现跨源访问
// 跨源访问限制：请求不能包含cookie，无法调用setRequestHeader()，getRequestHeaders()返回空字符串

// 预检请求
// 在对于复杂的请求(非get，post，自定义头部等)，会在该请求前发送一个预检请求，用于实现跨源访问
// 预见请求以OPOTIONS方法发送，HTTP头部包含以下信息
Origin
// 复杂请求的发送源信息
Access-Control-Request-Method
// 复杂请求的方法
Access-Control-Request-Headers
// 复杂请求的头部信息
// 如果对该复杂请求进行响应，则响应的头部信息中包含对应的信息
Access-Control-Allow-Origin
// 服务器允许跨源访问的对应的源信息
Access-Control-Allow-Methods
// 服务器允许的跨源访问的请求的方法
Access-Control-Allow-Headers
// 服务器允许的跨源访问的请求的头部信息
Access-Control-Max-Age
// 预检响应返回后在缓存中保存的最大时间
// 即在该最大时间内，允许的跨源请求，不再进行预检即可访问

// 凭证请求=>请求与响应均应设置
xhrC.withCredentials=true;
// 设置该XHR的该属性为true，可以在请求时发送凭证
Access-Control-Allow-Credentials
// 返回的响应的该值也设置为true，则会将响应交给对应发送凭证浏览器


// Image实现跨源资源共享
// 动态创建图像，指定src跨源地址发送单方面的GET请求
let img=new Image();
img.src="ulr+/test?name=value";
// 指定跨源地址以及GET查询字符串
img.onload=img.onerror=function(){
    console.log("done");
}
// 在浏览器中，图片信息可以实现跨源加载
// 而使用图片可以模拟GET请求进行跨源查询数据功能=>设置src属性为ulr查询字符串
// 仅能通过对应事件对响应是否完成进行检测，而无法访问响应数据
// 实质为单方面的GET请求，仅能检测响应是否成功


// JSONP实现跨源资源共享
// JSONP实质为JSON数据包含在callback回调函数内部
// 即动态创建<script>标签，指定src跨源地址，发送请求，获得的响应的类型为json，并在响应后会触发callback回调函数，将json数据传入回调函数进行数据处理
function datause(data){
    // data数据响应传输得到，为JSON形式，加载完成响应后，会将数据传入该回调函数
    console.log(data);
}
let script=document.createElement("script");
script.src="http://freegeoip.net/json/?callback=datause";
// 需指定跨源地址，并指定jsonp形式，以查询字符串的形式指定回调函数
document.body.appendChild(script);
// 需添加到DOM中时，才开始加载src
// 在响应加载完成时，会立即触发回调函数，进行响应数据处理
// 但是缺乏判断成功响应与失败响应的监控，故一般通过计时器限制等待事件
// 仅能在新仍条件下使用


// Beacon API
// 向服务器发送POST请求时，最好是等待页面信息完整时，尽可能多地发送待处理的信息，故最好的机会是在页面卸载前
// 而页面卸载之后，所有的异步请求都会取消
navigator.sendBeacon(url,data);
// 第一个参数为请求的目标地址，第二个参数为请求包含的数据，以字符串形式发送，限制了数据的类型
// 在Navigator对象上暴露的该方法，会发送向目标地址发送包含相关数据的POST请求
// 该方法会将请求推入到一个浏览器请求队列，该队列在页面卸载时，浏览器仍会主动地发送请求
// 该方法发送的请求会包含调用该方法时的cookie
// 可以使用在任意位置
// 该方法对于接受到的响应是不透明的，无法访问


// Websocket API
// 以自定义协议创建一个浏览器与服务器长时，双向的连接用于小型数据传输，而减小HTTP的负担
let socket=new WebSocket("ws://www.example.com/server.php");
// 创建一个Websocket对象实例，参数为自定义协议下的服务器地址
// 而服务器是否对连接进行回应，取决于服务器
socket.readyState
// 该属性反应WebSocket的状态 0：开始创建连接 1：成功创建练级 2：开始关闭连接 3：成功关闭连接
socket.close();
// 调用该方法后会立即切换到2，然后关闭成功后切换到3
socket.send("111");
// 向服务器发送数据，类型可以为字符串，ArrayBuffer，Blob类型
socket.binaryType
// 设置该属性，可以指定接受服务器的数据的类型
socket.onmessage=function(event){
    console.log(event.data);
}
// 在接受服务器的响应时，会触发该事件，通过事件对象的data属性，可以访问到响应的数据，类型为ArrayBuffer或者Blob
socket.onerror
// 连接发送错误事件
socket.onopen
// 连接创建成功事件
socket.onclose
// 连接关闭成功事件
// 以上关于Websocket的事件需要以DOM0形式添加
