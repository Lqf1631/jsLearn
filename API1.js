// XDM API=>跨域传输信息(跨窗口，跨工作者线程)
window.postMessage("Hi",url,arr);
// 第一个参数为字符串形式的消息，第二个参数为目标地址，类型为字符串，第三个参数为传输的对象数组（一般用于工作者线程的传输）
// 由当前窗口（线程）向目标窗口（线程）传递一个字符串形式的消息
window.addEventListener("message",(event)=>{
    event.origin;
    // 信息传递的源头，一般由于在初始进行验证信息来源
    event.data;
    // 信息的消息字符串
    event.source.postMessage();
    // 指向当前窗口（线程），一般用于在接受信息后，向信息来源再反传消息
});
// 在一个窗口（线程）接受到一个postMessage传递的消息时，会触发message事件，事件对象额外具有与传递信息相关的属性，以便对传递信息进行处理
// 对于非字符串形式的消息，在传递过程中需调用json的字符串转换方法，在接受消息事件中再进行转化


// Encoder/Decoder API=>编码器和解码器，字符串转化为定型数组
// 批量编码，解码
// 将字符串整个同步进行编码或解码,在字符串较长时,耗费时间久
let encoder=new TextEncoder();
// 创建一个编码器对象的实例
encoder.encode("aaa");
// 调用编码器对象的encode编码方法,参数为一字符串
// 该方法按照utf-8的编码形式,将该字符串编码为一个Uint8Array定型数组,返回值为该定型数组
let text=encoder.encodeInto("aaa",uint8Array);
// 第一个参数为待编码的字符串,第二个参数为Unit8Array定型数组,返回一个字典对象
text.read;
text.written;
// 字典对象具有以上属性,分别为在编码过程中读取的字符串位数以及写入定型数组的位数,当某一位不够时,会自动停止该方法
let decoder=new TextDecoder("UTF-8");
// 创建一个解码器对象的实例,参数为解码形式的字符串
decoder.decode(uint8Array);
// 参数为某一类型的定型数组,会将该定型数组按创建时传入的解码形式进行对应解码,返回值为解码后的字符串


// File API=>网页读取文件
<input type="file" multiple></input>
// 在网页中读取文件设置类型为文件的输入框,将文件作为表单形式进行上传,可选参数multiple设置是否多选文件

// 对于表单上提交的文件,通过input的change事件进行监控,在其内可以访问文件的基础信息,以及对文件进行读取操作
input.addEventListener("change",()=>{
    form.files
    // 在表单内,文件存储为files数组,可以利用该数组进行访问在该表单内上传的文件
    let file=form.files[0];
    file.type
    // 文件的MIME类型
    file.size
    // 文件的大小
    file.name
    // 文件名
    file.lastModifiedDate
    // 文件最后修改事件
});

// FileReader 异步文件读取器
// 该文件读取器读取时为一异步过程,需对读取过程进行事件监控,执行异步操作
let reader=new FileReader();
// 创建一个文件读取器对象的实例
reader.readAsArrayBuffer(file);
// 将文件数据读取为定型数组的形式
reader.readAsBinaryString(file);
// 将文件数据读取为二进制形式编码
reader.readAsDataURL(file);
// 将文件数据读取为URL形式,可以在使用url的位置直接调用,来引向文件内容
reader.readAsText(file);
// 将文件数据读取为文字的形式
reader.result;
// 以上方法其参数都为文件对象,而调用方法后,其读取结果都存储在result属性中

// 在文件读取过程中,文件读取器本身会触发一系列事件
reader.onload=function(){};
// 文件读取成功事件
reader.onerror=function(){
    reader.error.code;
    // 此时文件读取器具有error对象,该对象的code属性表明错误原有
};
// 文件读取失败事件
reader.onprogress=function(event){
    event.maxLength;
    // 文件的最大长度
    event.total;
    // 文件的总值
    event.loaded;
    // 文件目前的加载值
}
// 文件正在读取事件,为反应读取情况,event事件对象具有额外的属性
reader.abort();
reader.onabort=function(){}
// 在文件读取成功之前,可以调用该方法,使得文件读取处于停止状态,此时会触发文件读取器停止状态
reader.onloadend=function(){}
// 当文件读取成功,失败,停止时,都会触发该事件,表明文件读取器加载结束状态
// 一般文件读取器也设置在文件input的change事件内,确保文件上传后,读取文件信息,再对文件信息进行处理

// FileReaderSync 同步文件读取器
// 具有与异步文件读取器同样的方法,属性,但为同步读取过程,此后的代码会等待读取停止时再执行
// 一般用于工作者线程,即在另一个线程中进行同步读取,保证主线程的流畅

// Blob对象=>文件读取片段
// Blob对象为File对象的超类,还具有File对象相同的属性和方法
let blob=new Blob();
// 利用构造函数对参数进行包装,返回一个Blob对象的实例
// Blob对象指不可修改的二进制数据
// 实质可以为对象数组,字符串数组,ArrayBuffers等
file.slice(start,number);
// 对于File实例可以调用该方法,进行部分读取文件信息,第一个参数为起始字节位置,第二个参数为包含字节数
// 该方法返回一个Blob对象的实例,实质为读取的部分文件信息
blob.slice();
// Blob对象还可以利用该方法进行进一步细分

// 对象URL
let url=window.URL.createObjectURL();
// 参数为File实例或者Blob实例,创建一个url地址,可以在使用url的位置进行调用
// 利用该地址,可以仅加载地址信息而不用加载整个File或者Blob
window.URL.revokeObjectURL(url);
// 参数为对象URL,在不使用该地址后调用该方法进行内存释放,否则会保留到页面卸载

// 拖拽API
// 拖拽事件=>拖拽包括拖拽元素和目标元素,具有不同的触发事件
// 拖拽元素事件:=>触发在拖拽元素上
dragstart
// 当鼠标点击可拖拽元素时触发,在该事件中可以设置可拖拽元素的dataTranfer.effectAllowed行为
drag
// 触发dragstart事件后,会立即触发drag事件,在未松开鼠标时,会持续触发
dragend
// 当拖拽时鼠标松开,即可触发该事件
// 目标元素事件:=>触发在目标元素上
dragenter
// 当拖拽元素的鼠标进入目标元素内触发,在该事件中可以设置目标元素的dataTransfer.dropEffect行为
dragover
// 当触发dragenter事件后,会立即触发dragover事件,且如果光标未移开目标元素,会持续触发该事件
dragleave
// 当触发以上两事件后,如果鼠标未松开且移除目标元素,会触发该事件
drop
// 当触发dragenter和dragover事件后,鼠标松开,表示拖拽元素到目标,会触发该事件

input.dragable=true;
// 原生的可拖拽元素为文本,图片,链接,设置dragable属性,可以使得任意元素编为可拖拽
div.addEventListener("dragenter",(event)=>{
    event.preventDefault();
});
div.addEventListener("dragover",(event)=>{
    event.preventDefault();
});
// 将元素的以上两事件取消默认行为后,即可将任意元素设置为拖拽的目标元素
div.addEventListener("drop",(event)=>{
    event.preventDefault();
})
// 对于firefox需额外取消drop

// dataTransfer对象
// 定义拖拽行为,还需使用dataTransfer对象作为拖拽元素与目标元素的桥梁,设置其属性使其拖拽元素与目标元素交互
let dataTransfer=new DataTransfer();
// 该对象实际仅能在拖拽事件中进行访问
// 该对象按不同MIME类型,存储拖拽对象的信息,可以在拖拽对象事件内进行设置,在目标事件对象内进行获取
dataTransfer.getData();
// 参数为MIME类型的字符串,指定获得在dataTransfer内存储的MIME类型的数据
// 在未设置时,会取得默认设置的数据
dataTransfer.setData();
// 第一个参数为MIME类型字符串,第二个参数为数据
// 设置该MIME类型存储为对应数据
dataTransfer.clearData();
// 参数为MIME类型的字符串
// 直接清除整个该类型的数据
// 以上的MIME类型一般未text或者url,在此时可以对MIME进行简写

dataTransfer.effectAllowed
"copy"
"move"
"link"
"unitialized"
"copyLink"
"moveLink"
"none"
"all"
// 该属性在dragenter事件内设置,定义拖拽元素的行为
dataTransfer.dropEffect
"copy"
"move"
"link"
"none"
// 该属性在dragenter事件内设置,定义目标元素的行为
// 当拖拽元素与目标元素行为一致时,才能显示出对应整个拖拽的行为

dataTransfer.setDragImage(img,10,10);
// 第一个参数为html元素,后续参数为偏移量
// 在拖拽元素时,在光标后渲染出对应元素,且光标在元素中出现参数的偏移
dataTransfer.files();
// 在拖拽本地文件到网页时,该方法返回一个对应File对象实例
dataTransfer.types
// 该属性存储着MIME类型字符串数组


// 媒体元素API
// 利用audio标签和video标签可以在网页中添加音频和视频资源
// 标签内文本为不知处该标签时显示
// 标签至少包含一个src属性,用于指定源文件
// 浏览器支持不同类型的音频视频格式以及解码方式
// 去掉src,在标签内添内嵌source标签表明不同的格式
// source标签内使用type规定格式,内含codecs规定解码方式 type="audio/mpeg codecs='v8,vorbis'"
// audio和video支持多种属性，方法，事件用于设置音频视频

// 音频对象
let audio=new Audio();
// 创建一个音频对象实例，构造函数参数为地址字符串
audio.play();
// 播放开始
audio.pause();
// 播放停止
// 以上方法需要等待对应资源加载完成，一般在音频，视频事件内使用
// 对应的视频具有对应方法，但是不能使用构造函数创建实例

// 检测解码器
audio.canPlayType(type);
// 参数为type字符串，type内如果仅包含MIME类型，在支持时很可能返回字符串"maybe",type还包括解码方式时，在支持时很可能返回字符串"probablely"
// 不支持时返回null


