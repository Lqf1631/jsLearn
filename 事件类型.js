// 1.用户界面事件
// 与浏览器BOM交互相关的事件
// load
// 在window，<img>，<object>，窗格，<script>，<link>上触发，表明相关资源已经加载完成
// 在window上添加事件处理程序
function a(event){
    console.log(this);
    console.log(event.target);
    // 其event对象的target为document
}
window.addEventListener("load",a,false);
// DOM2方式添加、
document.body.onload=a;
// html方式添加，由于html中没有window，故添加在body上

// <img>上添加事件处理程序进行动态加载检测
window.addEventListener("load",()=>{
    // 由于操作DOM树，需保证DOM加载完成
    let img=document.createElement("img");
    img.addEventListener("load",a,false);
    // 由于预加载的存在，故需先设置事件处理程序，再进行资源加载
    img.src="";
    // 在设置src属性后，立即开始加载资源
    document.body.appendChild(img);
    // 在添加到DOM前进行预加载
},false);

// <script>和<link>上添加事件处理程序进行动态加载检测
window.addEventListener("load",()=>{
    let script=document.createElement("script");
    script.addEventListener("load",a,false);
    script.src="";
    document.body.appendChild(script);
    // 由于该标签要求在设置src并且添加到DOM树后才加载资源，故无关设置顺序
},false);

unload
// 一般用于一个页面导航到另一个页面时触发事件，在window，窗格上资源卸载时触发
// 对应事件处理程序中不应包含加载的资源，即操作DOM和修改页面外观会报错
// 一般用于资源释放

resize
// 当页面窗口被缩放时，触发在window对象上
// 不同浏览器体现在触发的界限上，即缩放到多少程度或者缩放结束时触发
// 可能出现连续触发的情况，故为保证浏览器响应，其事件处理程序需保证简洁

scroll
// 当该元素的滚动条滚动时，在该元素上触发
// 可能出现连续触发的情况，故为保证浏览器响应，其事件处理程序需保证简洁

absort
// 当<object>还未加载完成就被中断时，在<object>上触发该事件

error
// 当页面中js报错时在window触发，在<object>,<img>,窗格等资源加载中断时在对应元素上触发


// 焦点事件
// 页面上焦点在元素间变化时，在对应元素上触发
focus
// 该元素获得焦点，在该元素上触发，不能冒泡
blur
// 该元素失去焦点，在该元素上触发，不能冒泡
focusin
// 该元素获得焦点，在该元素上触发，实现冒泡
focusout
// 该元素失去焦点，在该元素上触发，实现冒泡


// 鼠标事件
click
// 单机鼠标左键，在对应元素上触发，冒泡
dblclick
// 双击鼠标左键，在对应元素上触发，冒泡
mosedown
// 按下鼠标按键，在对应元素上触发，冒泡，不能通过键盘触发
moseup
// 松开鼠标按键，在对应元素上触发，冒泡，不能通过键盘触发
moseenter
// 鼠标由元素外部移动到元素内部，在对应元素上触发，不冒泡
moseleave
// 鼠标由元素内部移动到元素外部，在对应元素上触发，不冒泡
moseover
// 鼠标由元素外部移动到元素内部，在对应元素上触发，冒泡，不能通过键盘触发
moseout
// 鼠标由一个元素内部移动到另一个元素（该元素的子元素），在对应元素上触发，冒泡，不能通过键盘触发
mosemove
// 鼠标在元素内移动，在对应元素上反复触发，冒泡，不能通过键盘触发
let event5=new MouseEvent();
event5.clientX;event5.clientY
// 鼠标的视口位置
event5.pageX;event5.pageY
// 鼠标的页面位置
event5.screenX;event5.screenY
// 鼠标的屏幕位置
event5.altKey;event5.ctrlKey;event5.metaKey;event5.shiftKey
// 布尔值，是否设置了修饰键
event5.relatedTarget
// moseout和mouseover专属，涉及到非事件目标元素的另一个相关元素
event5.toElement
event5.fromElement
// IE中提供的相关元素的属性
event5.button
// mousedown和mouseup专属，对应整数表示鼠标按键
event5.detail
// 整数，在给定位置上，鼠标单击的次数，初始值为1，会在鼠标移动时刷新为0

// 滚轮事件
mousewheel
// 在鼠标滚轮滚动时，可以在任何鼠标设定光标的元素上触发，再冒泡到document和window
// 滚轮事件对象
// 具有鼠标事件的属性
wheelDelta
// 向前一次滚动为+120，向后一次滚动为-120


// 键盘事件
keydown
// 按下键盘，持续按下会持续触发
keypress
// 对字段进行修改时触发，可以在任意焦点元素上触发，持续按下会持续触发
keyup
// 松开键盘
// 键盘按下后触发keydown，如果存在修改字段则触发keypress，持续按下会反复触发这两个事件，直到松开按键触发keyup
textInput || input
// 在文本编辑区的元素触发，仅在新加入字符时触发
let event3=new KeyboardEvent();
event3.key;
// 该属性值在keydown和keyup,keypress触发时的对应按键的字符串名
event3.getModifierState();
// 参数为修饰键的大写字符串，返回布尔值，表明是否触发了该修饰键
// 一般采用对应的如altkey属性实现该功能
event3.data;
// textInput触发时，存储新插入的字符


// HTML5事件
contextmenu
// 当调用页面的菜单栏时触发，类似于鼠标事件（一般在页面上单机右键会触发菜单弹出）
// 在对应的单击右键的元素上触发，冒泡到document，故可以在document上添加同类型的事件处理程序
// 事件对象与鼠标事件对象类似，存储着鼠标光标的位置信息，便于控制菜单栏弹出位置
// 常用于利用preventDefault阻止默认菜单栏弹出，在事件处理程序中定义新的菜单栏弹出，再利用click事件处理程序对菜单进行消去

beforunload
// 在unload事件之前触发，在window对象上触发，默认行为为弹出确认框，用于确认是否进行页面卸载
// 在事件处理程序中，将returnValue和return设置为同一个非空字符串，会弹出对话框

DOMcontentloaded
// 在DOM树加载完成后而再load事件之前，在document上触发，再冒泡到window
// 用于操作DOM树前对DOM加载情况检测
// 在不支持该事件时，可以利用
setTimeout(() => {
    // 相关操作DOM树的程序
}, 0);
// 利用单线程加载，在DOM加载过程结束后，才将相关操作DOM树的程序推入执行队列

// readystatechange事件
// 反应对象或者网页加载状态事件，在加载状态发生变化时，在对应的对象上触发
// 对象加载状态为
// uninitialized 未初始化
// loading 加载数据中
// loaded 加载数据完成
// interactive 可以实现交互
// complete 加载完成
// 但不同对象其不一定全具有以上的加载过程，且其过程顺序也不一定按该顺序
// 模拟DOMcontentloaded
document.addEventListener("readystatechange",function(){
    if(document.readyState=="interactive"||document.readyState=="complete"){
        document.removeEventListener("readystatechange",arguments.callee);
        // 保障仅触发一次，在触发后取消该事件处理程序，由于是在匿名函数内部取消，故可以使用arguments.callee指向该匿名函数(箭头匿名函数无效，因为不能调用arguments.callee)
        console.log("DOM yes");
    }
});
// 其触发顺序与load比与资源大小相关，且其不同状态先触发的顺序也与load状态相关

pageshow,pagehide
// 在页面前进或者后退时，会保障加载流畅，会将整个页面信息进行缓存
// pageshow在页面显示时在window上触发，新页面会在load之后触发，来自缓存的页面不触发load
// pagehidden在页面卸载时在window上触发，在unload之前触发
// 事件对象具有presisted属性，该属性反应页面来源是否为缓存或页面卸载后是否保存到缓存中

hashchange
// 在运用AJAX，网页URL的散列值hash会发生变化，在其变化时，在window上触发该事件
let event4=new HashChangeEvent();
// 事件对象里新增对应变化URL的属性
event4.newURL;
// 变化后的新URL
event4.oldURL;
// 变化前的老URL
location.hash;
// 如需访问hash采用location的对应属性


// 合成事件
// 利用IME进行键盘组合键输入键盘中没有的字符
compositionstart
// IME开始输入
compositionend
// IME结束输入
conpositionupadte
// IME对字段更新
let event6=new CompositionEvent();
event6.data
// 在开始时为选择字段
// 在更新时为当前输入的字符
// 在结束时为全部操作字符


// 设备事件
// 在移动设备上，设备所处的位置，朝向发生变化时，触发的事件，在window上触发和在window上添加事件处理程序
origationchange
window.orientation
// 该属性储存着设备的朝向信息，在其改变时，会在window上触发oritationchange事件

deviceorientation
// 当可以获得设备加速器信息时，当对应的三维坐标朝向信息发生改变时，在window上触发deviceorientation事件
let event2=new DeviceOrientationEvent();
event2.alpha;
// 水平转角
event2.beta;
// 垂直转角
event2.gamma;
// 扭转角度
event2.absolute;
// 布尔值，是否返回绝对值
event2.compassCalibrated;
// 布尔值，是否校正指南针

devicemotion
// 当设备的位置信息发生改变时，在window对象上触发devicemotion事件，表示设备的朝向以及移动
let event1=new DeviceMotionEvent();
event1.acceleration
// 对象，包含设备在三个方向上移动的加速度(不含重力加速度)
event1.accelerationIncludingGravity
// 对象，包含设备在三个方向上移动的加速度(不含重力加速度)
event1.rotationRate
// 对象，包含设备在三个方向上的转角信息
event1.interval
// 设备触发该事件的间隔事件


// 触摸事件=>实现冒泡，可以被取消
// 在手机浏览器上实现，元素被触摸时，在对应元素上触发，且与鼠标事件对应触发
// touchstart
// 用户触摸页面元素，在对应元素上触发
// touchmove
// 用户在屏幕上滑动，在对应元素上连续触发，默认事件处理程序为视口上下移动，可以用preventDefault()进行取消
// touchend
// 用户结束触摸，在对应元素上触发
// touchcancel
// 系统取消对触摸的监控时触发

// 触摸事件对象
// 触摸事件的事件对象具有鼠标事件对象的属性
// 还具有特殊属性
let tEvent=new TouchEvent();
tEvent.touches;
// Touch对象的数组，表式屏幕上的所有触点
tEvent.targetTouches;
// 在触摸事件中用于目标事件的触点
tEvent.changedTouches;
// 在触摸事件中触点信息改变的触点

// 触点对象
let touch=new Touch();
touch.clientX;touch.clientY
// 触点在视口中的位置
touch.screenX;touch.screenY
// 触点在屏幕中的位置
touch.pageX;touch.pageY
// 触点在页面中的位置
touch.identifier;
// 触点的id
touch.target;
// 触点相关的触摸事件的事件目标


// 手势事件=>冒泡
// 当两个手指在屏幕上的对应元素进行相对转角以及相对位移变化时触发的事件
getsturestart
// 一个手指在屏幕上，另一个手指触摸屏幕
getstureend
// 其中一个手指离开屏幕
getsturechange
// 两手指的相对位置改变

// 手势事件对象
rotation
// 手势的相对转角，顺正逆负
scale
// 手势的相对距离，以原始位置为1