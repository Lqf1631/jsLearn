// BOM
// 浏览器对象模型，用于操作除网页页面以外的浏览器行为

// 1.window对象
// window对象既是浏览器的JS接口，也是ES6的全局对象，连接浏览器和JS
// window作为全局对象时，用var创建的变量会作为window对象的属性，创建的函数会作为window对象的方法
// window对象的属性可以用作检验是否定义该变量，未定义则未undefined，不会抛错

// (1)页面窗口位置
window.screenTop 
window.screenLeft
// 表示页面窗口相对于左边和上边的距离
window.moveTo(x,y);
window.moveBy(x,y);
// 第一个参数表示水平位移以向右为正，第二个参数表示竖向位移以向下为正
// 将页面窗口移动到或者移动一定参数距离

// (2)页面窗口关系
top
// 该对象表示最上层页面窗口对象
parent
// 该对象表示top对象的父窗口对象
self
// 始终指向window对象本身

// (3)像素比
// 在不同分辨率屏幕下，未保持显示大小一致，需将物理像素进行不同程度的缩放达到各个屏幕一致的逻辑像素
window.devicePixelRatio
// 物理像素与逻辑像素的比值为像素比

// (4)窗口大小
window.outerHeight
window.outerWidth
// 浏览器窗口自身大小
window.innerHeight
window.innerWidth
// 浏览器视口大小，不包括浏览器边框和工具栏等
document.documentElement.clientHeight
document.documentElement.clientWidth
document.body.clientHeight
document.body.clientWidth
// 对于非手机浏览器，在标准模式下documentElement为视口大小，非标准模式下视口大小为body
// 对于手机IE浏览器，ducumentElement为可见视口大小，body为布局视口大小
// 对于手机非IE浏览器，body为可见视口大小
window.resizeTo(x,y);
window.resizeBy(x,y);
// 将页面窗口缩放或者缩放到一定倍数
// 参数按百分比的数字表示：100为100%

// (4)视口位置
// 当浏览器窗口大小无法满足整个页面大小时，需设置浏览器的视口位置
window.scrollX
window.scrollY
window.pageXOffset
window.pageYOffset
// 页面视口位置到左侧和上侧的距离，以水平向右，竖直向下为正
window.scroll(x,y)
window.scrollTo(x,y);
// 将页面视口移动到一定位置，以最左侧和最右侧为参考，水平向右，竖直向下为正
window.scrollBy(x,y);
// 将页面视口移动多少距离
let o={
    left:100,
    top:100,
    behavior:'smooth',
    // 平滑移动
}
// 三者皆可接受一个对象参数用以描述移动参数

// (5)导航与窗口打开
let new_window=window.open("http://www.baidu.com/","baidu","status:yes,height:200,width:100");
// 第一个参数为网页URL，第二个参数为窗口名，第三个参数为描述特性字符串，第四个参数为新窗口是否在浏览器记录中替换当前页面
// 如果第二个参数为已有窗口，则会在对应窗口中打开该网页URL，否则将会创建一个该名称的新窗口，并在该窗口中打开URL
// 第三个参数为特性字符串，即以逗号分隔，中间不包含空格，用以描述网页特性的字符串
// 该方法返回一个新打开窗口的window对象，便于对后续进行操作
new_window.close();
// 对于采用window.open()打开的窗口，可以采用该方法进行关闭
top.close();
// 用于关闭最上层用window.open()打开的窗口
new_window.opener=null;
// window.open打开的窗口的该属性指向原窗口，可以设置其值为null而切断二者联系
// 弹窗屏蔽程序
// 当浏览器自身屏蔽时，window.open返回值为null
// 当外部程序屏蔽时，window.open会报错

// (6)计时器
let a=setTimeout(console.log,1000,"Hi");
// 在一定等待时间后，将函数推入执行队列
// 第一个参数为函数本省，可以用匿名函数包装执行代码
// 第二个参数为等待推入执行队列时间
// 第三个参数为传入函数参数
// 返回值为一定时间后推入某一函数这一行为，可以利用返回值进行操作
a.clearTimeout();
// 在未推入执行队列时取消推入操作
let num=1;
let b=setInterval(()=>{console.log("Hi");num++},1000);
// 经过一定时间，循环将函数推入执行队列
// 第一个参数为函数本身，可以用匿名函数包装执行代码
// 第二个参数为等待推入执行队列时间
// 第三个参数为传入函数参数
// 返回值为这一行为本身,可以利用返回值进行操作
if(num==5){
    b.clearTimeout();
}
// 在执行5次后取消循环推入队列行为

// (7)对话框
// 代码在执行对话框该行后会暂停，弹出相应对话框并返回值，待点击关闭对话框后，继续执行
alert("Hi");
// 仅能点击确认来进行关闭，对话框显示参数字符串，用作提示
confirm("Are you sure");
// 点击确认或取消均可关闭，显示参数字符串，点击确认返回true，点击取消返回false，用作判断
prompt("WRITE YOUR NAME","tom");
// 点击确认或取消均可关闭，显示参数字符串，输入框显示第二个默认字符串，点击确认返回输入框内容，点击取消返回null




// 2.location对象
// 既是window对象的属性，也是document对象的属性，window.location和document.location指向同一对象
// 控制浏览器的加载信息(URL)以及一般导航功能
// 相关属性表示浏览器加载信息的离散化数据
// location.hash 页面加载的URL散列值
// location.protocol 页面加载的协议
// location.host location.hostname 页面加载的服务器信息
// location.search 页面加载的搜索字符串
// location.pathname 页面加载的服务器路径
// location.href 页面加载的完整URL(toString方法返回值)

// 对于搜索字符串一般为?A=a&B=b形式
// 搜索字符串需进行处理,去掉?,以&拆分并将A=a转化为键值对形式进行存储,方便处理
// URLSearchParams对象
// 用于处理搜索字符串的引用类型
let s="?A=a&B=b";
let p=new URLSearchParams(s);
p.get("A");
// a
// 获得搜索字符串中的值
p.set("C","c");
// 新增搜索字符串中的值
p.has("B");
// 查询字符串中的值

// location导航功能
// 修改location对象的除hash以外的属性,页面会自动重新加载
location.assign();
// 参数为导航页面的URL,会导航到该页面并留下原页面的浏览记录
location.replace();
// 参数为导航页面的URL,会导航到该页面,但不留下原页面的浏览记录
location.reload();
// 以浏览器最有效的形式重新加载页面
// 可能会加载也可能不会加载,取决于网络延迟,系统资源
// 形式为从服务器重新加载或从缓存中加载,传入true参数,设置仅从服务器加载


// 3.history对象
// 表示浏览器的浏览记录的对象,在不暴露浏览器浏览记录情况下,进行前进返回操作或对浏览器历史状态进行管理
history.go();
// 参数为一整数,负数为后退,正数为前进,数字大小为页面数
history.forward();
history.back();
// history.go()的衍生
history.length
//浏览器浏览记录的数目



// 4.navigator对象
// 反应浏览器自身的信息,一般用于客户端的浏览器信息检测和网页注册桌面程序
// 相关属性及方法反应浏览器信息以及对浏览器进行相关操作
// 浏览器插件检测
// 对于非IE以及IE10以上的浏览器,利用navigator.plugins
// navigator.plugins是一个对象数组,反应的是浏览器插件的相关信息
function test(pluginsName){
    let name=pluginsName.toLowerCase();
    for(let plugin of window.navigator.plugins){
        if(plugin.name.toLocaleLowerCase().indexOf(name)){
            return true;
        }
        return false;
    }
}
// 将检测插件名在navigator.plugins插件对象数组中的插件名name属性进行对照，查询是否含有此插件

// 对于IE10以下，采用ActiveXObject引用类型，检测是否含有该实例
// 插件在ActiveXObject以唯一字符串为参数传入创建实例
function test1(pluginString){
    try {
        new ActiveXObject(pluginString);
        return true;
    }
    catch(ex){
        return false;
    }
}
// 对于安装的插件，利用对应字符串创建ActiveXObject实例不会抛出错误；未安装的插件则抛出错误

// 将网页注册为应用程序
navigator.registerProtocolHandler()
// 三个参数，第一个参数为处理协议，第二个参数为网页URL，第三个参数为应用程序名称

// 5.screen对象
// 完全的客户端对象,反应客户端的屏幕信息