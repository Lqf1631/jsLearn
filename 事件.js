// 事件
// 事件：浏览器或者页面中某些具有特殊意义的时刻，一般出现在用户进行了某些操作
// 事件处理程序：在事件发生时进行响应，进行某些操作


// 事件流
// 在针对页面的某些节点时，该节点触发了某些事件，而节点被包含在其他节点内，其外部节点也应对应触发该事件
// 事件流指事件在节点层级之间的传递方式和顺序
// 在事件的事件流中的节点均可以设置事件处理程序对事件进行响应以及对后续事件流的处理（如中断事件流）

// 冒泡模型：
// 即最内侧的节点最先触发事件，然后按由内到外的顺序依次触发事件
// 该模型可以拓展事件传输形式，使得目标节点以及其外层节点依次触发事件

// 捕获模型：
// 即最外侧的节点最先触发事件，然后依次传递到最内侧的事件目标节点上
// 该模型可以实现在事件到达目标节点之前，对事件进行捕获

// DOM捕获冒泡事件流模型
// DOM中将事件流进行阶段划分，分为捕获阶段，到达阶段，冒泡阶段
// 即事件最先从外层向内传递，到达事件目标时，再由内向外传递
// 现代浏览器在事件处理程序时，将捕获，冒泡阶段拓展包括到达阶段，故在事件流过程中，在捕获阶段和冒泡阶段均可以在目标节点上添加处理程序进行响应


// 事件处理程序
// 在事件流的传输过程中，可以对任意事件流的节点添加对应程度，对事件进行响应处理，该程序为事件处理程序

// HTML属性方法
<body onclick="console.log('aaa')"></body>
// 在html文档中，直接设置元素的on+事件属性，其属性值为JS代码的字符串，或定义的函数，注意其中的html特殊符号的转义以及引号的使用
// 实质将事件处理程序属性值利用函数进行包装，且包装函数利用with扩大作用域
// 作用域拓展到整个文档，this，以及兄弟表单成员，即with(document),with(this),with(this.form)
// 包装函数内包含一个event局部变量，保存着关于该事件的一些信息
// 缺点：
// (1)时机问题：即在on+事件属性引用定义函数时，需保证函数定义后才引用，否则会报错，一般处理是采用try-catch进行包装
// (2)包装函数作用域拓展问题，不同浏览器实现不一
// (3)强耦合问题，在修改时，会逐一对设置属性的html元素进行修改

// DOM0方法=>添加在事件流的冒泡阶段，即不能实现到达目标前的捕获
function a(){
    console.log("aaa");
}
document.body.onclick=a;
// 利用DOM获得节点，在JS中设置节点的on+事件属性，其属性值为函数
// 该方法会将事件处理程序函数视为该节点对象的方法
// 该方法会将event作为参数传入函数
// 函数的作用域为该节点对象，即this值指向节点对象
document.body.onclick=null;
// 通过设置该属性为null进行内存释放
// html方法也可以用该方法进行内存释放
// ！！！由于是采用js进行操作节点属性，且js和文档加载异步进行，故需等对应的js代码加载完成时，才能实现事件的处理

// DOM2方法=>可以添加在事件流的任意阶段
document.body.addEventListener("click",a,false);
// 在需要添加的节点上调用该方法
// 第一个参数为事件类型的字符串，第二个参数为事件处理程序，以函数形式作为参数，第三个参数为布尔值，表明是否添加到捕获阶段
// 该方法的事件处理程序的作用域为对应元素节点
// 多次调用该方法可以添加多条事件处理程序，其按顺序执行
document.body.removeEventListener("click",a,false);
// 利用该方法，在确定函数名的条件下，可以在对应事件以及对应阶段下取消对应的事件处理程序函数
// 即采用addEventListener添加的匿名函数作为事件处理程序不能被移除

// IE特有方法=>添加到事件流的冒泡阶段
document.body.attachEvent("onclick",a);
// 第一个参数为对应的on+事件名，第二个参数为事件处理程序函数
// 该方法添加后，作用域为全局对象，即this值window
document.body.detachEvent("onclick",a);
// 对应的移除事件处理程序方法


// 事件对象
// 在事件处理程序中可以访问event事件对象，其包含了事件的各类信息
// 在html方法中，事件对象作为包装函数的局部变量，直接访问
// 在其余方法中，事件对象作为参数传递到事件处理程序的函数内
// 该对象仅在事件处理程序执行期间存在，执行完毕被销毁

// DOM中的事件对象
window.addEventListener("load",(event)=>{
    event.bubbles;
    // 布尔值，该事件是否冒泡
    event.cancelable;
    // 布尔值，该事件是否可以取消默认行为
    event.defaultPrevented;
    // 布尔值，该事件是否取消了默认操作
    event.preventDefault();
    // 调用该方法，取消该事件的默认操作
    // 如取消定义了href的a标签click的跳转默认操作
    event.stopImmediatePropagation();
    // 拦截事件流，并阻止后续的事件处理程序
    event.stopPropagation();
    // 拦截事件流，取消后续的捕获或冒泡
    event.type;
    // 事件类型
    event.eventPhase;
    // 事件触发事件处理程序的阶段
    // 在目标节点上触发为目标阶段，其余根据添加设置
    event.currentTarget;
    // 指向事件本身
    event.target;
    // 指向事件目标
    event.isTrusted;
    // 布尔值，事件为默认或是自定义

},false);

//  IE中的事件对象
window.attachEvent("onload",(event)=>{
    event.screenElement;
    // 事件目标
    event.type;
    // 事件类型
    event.returnValue;
    // 布尔值，是否取消了默认行为(false取消默认)
    event.cancelBulle;
    // 布尔值，是否取消了冒泡(true为取消)
});


// 事件模拟
// 利用JS创建事件对象，再设置事件对象的属性，将事件对象添加到节点上，即可以在节点上立即触发该事件
// DOM中的事件模拟：
let event1=document.createEvent();
// 创建事件，参数为事件类型字符串
event1.initEvent();
// 事件属性添加，参数为对应事件属性的属性值
node.dispatchEvent(event1);
// 事件触发，将事件添加到节点上并触发，参数为事件对象，会立即执行对应的事件处理程序
// 在派发时，事件的target会被指定为调用该方法的节点

// 通用事件 Event
let e1=document.createEvent("Events");
e1.initEvent("click",true,true);
document.dispatchEvent(e1);

// 鼠标事件 MouseEvent
let e2=document.createEvent("MouseEvent");
e2.initMouseEvent("click",true,true,document.defaultView,0);
document.dispatchEvent(e2);

// 键盘事件 KeyboardEvent
if(document.implementation.hasFeature("KeyboardEvents","3.0")){
    let e3=document.createEvent("KeyboardEvent");
    e3.initKeyboardEvent("keydown",true,true,document.defaultView);
    document.dispatchEvent(e3);
}

// HTML事件 HTMLEvents
let e4=document.createEvent("HTMLEvents");
e4.initEvent("focus",true,true);
document.dispatchEvent(e4);

// 自定义事件 CustomEvent
if(document.implementation.hasFeature("CustomEvents","3.0")){
    // 自定义事件需检验是否支持
    let e5=document.createElement("CustomEvent");
    e5.initCustomEvent("myEvent",true,true,"aaa");
    // 自定义事件的类型为自定义的名称字符串
    document.dispatchEvent(e5);
    // 将自定义事件派送到节点时，立即触发事件，运行事件处理程序
}
document.addEventListener("myEvent",(event)=>{console.log(event.detail)});

// IE中的事件模拟
let E=document.createEventObject();
// 创建通用事件对象
E.clientX=100;
E.clientY=0;
// 添加自定义属性
document.fireEvent("onclick",E);
// 派发事件到节点，并触发该事件
// 第一个参数为事件处理程序类型，第二个参数为事件对象
// 在派发时，对应的screenElement会被指定为调用该方法的节点，type会被指定为对应事件


// 内存与性能
// 在事件处理程序添加的过程中，由于事件处理程序为一函数对象，会占用内存，且在添加时操作DOM会消耗内存
// 故在事件处理程序添加时，需注意内存管理
// 事件委派
// 利用事件冒泡，将同一类型的事件添加到不同的节点上时，可以添加到节点的祖先节点上，再利用target进行区分
// 仅操作一次获得祖先节点的DOM，且合并为一个事件处理程序，方便管理，节约内存
// 祖先节点尽量设置为document，此时不用等待页面加载完成，在页面出现时，即可调用document（click,mousedown,mouseup,keydown,keypress）

// 事件处理程序删除
// 事件处理程序与节点关联后，当节点从节点树中删除，以及整个页面被卸载时，对应的事件处理程序不会被垃圾回收
// 对于节点删除，在节点删除前应将对应的事件处理程序进行移除，或者使用事件委派，将事件处理程序委派在未删除的祖先节点上
// 对于页面卸载，采用onunload事件处理程序，在该程序内，对整个页面中的事件处理程序进行移除（使用onunload后的页面不会进入缓存）
// 即onload内进行的操作，在onunload内进行释放


// 浏览器兼容
// 定义一个对象进行包装，其具有特殊方法，方法可以对不同浏览器进行能力检测，选择对应方法进行操作
// 在使用其对应方法时，仅需调用该对象包装后的方法，实现跨浏览器兼容
const eventCross={
    addEvent(node,type,fun){
        if(node.addEventListener){
            node.addEventListener(type,fun,false);
        }
        else if(node.attachEvent){
            node.attachEvent("on"+type,fun);
        }
        else{
            node["on"+type]=fun;
        }
    },
    removeEvent(node,type,fun){
        if(node.removeEventListener){
            node.removeEventListener(type,fun,false);
        }
        else if(node.detachEvent){
            node.detachEvent("on"+type,fun);
        }
        else{
            node["on"+type]=null;
        }
    },
    getTarget(event){
        return event.target?event.target:event.screenElement;
    },
    preventDefault(event){
        if(event.preventDefault){
            event.preventDefault();
        }
        else if(event.returnValue){
            event.returnValue=false;
        }
        else{
            throw "no method"
        }
    },
    stopPropagation(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }
        else if(event.cancelBulle){
            event.cancelBulle=true;
        }
        else{
            throw "no method"
        }
    },
}
