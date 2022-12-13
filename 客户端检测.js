// 客户端检测
// 检测客户端的相关信息加以操作或作为判断

// 1.能力检测
// 对于不同的浏览器，其具有不同的能力特性，可以针对不同的能力进行检测，以确保能力使用
function getElementId(id){
    if(document.getElementById){
        return document.getElementById(id);
    }
    else{
        throw "wrong";
    }
}
getElementId("body");
// 将某一特性用函数进行包装，利用逻辑if检测，存在这一特性则返回期待特性执行后的值，不存在则抛出错误
let a=!!document.getElementById
let b=typeof document.getElementsByTagName =="function"
function fun(){
    if(!a){
        return false;
    }
    if(!b){
        return false;
    }
    // 相关包含该特性的代码
}
fun();
// 在能力检测时，需切实检测对象，仅针对后续使用的能力进行检测
// 在能力检测时，需按照常用顺序进行依次检测
// 对于多个特性可集中在一起进行检测，检测布尔值可以进行相关赋值，便于后续使用
// 对于不同特性需注意检测方法，不仅针对是否存在，还需注意是否具备特性功能
// 故对某些特性检测需采用typeof操作符

// 浏览器分析
// 针对不同浏览器的差异性能力进行检测,以确定浏览器的类型


// 2.用户代理检测
// 在浏览器向服务器传输数据时,需传输特定字符串以标记浏览器类型
// 该字符串为用户代理字符串
window.navigator.userAgent
// 在navigator对象的userAgent属性中储存,反应浏览器相关信息以及相关操作系统等信息
// 对于该字符串可以进行提取拆分,再进行相关操作

window.navigator.userAgent._defineGetter_('userAgent',()=>{string});
// 部分浏览器支持该方法进行用户代理字符串修改
// 第一个参数为修改属性名,为一字符串
// 第二个参数为函数,修改第一个参数的值为函数的返回值

// 用户代理字符串可以进行伪造,故仅在信任用户代理字符串时,采用用户代理检测来处理浏览器的信息


// 3.软硬件检测
// 浏览器以运行设备的部分信息储存在navigator对象以及screen对象上

// (1).浏览器及运行环境信息
navigator.oscpu
// 浏览器运行环境及架构信息，对应用户代理字符串的部分字符串
navigator.vendor
// 浏览器的开发商信息
navigator.platform
// 浏览器的运行环境信息

// (2)浏览器运行设备信息
screen.colorDepth
screen.pixelDepth
// 都为浏览器运行设备的屏幕每单位像素的位深
screen.orientation
// 浏览器运行设备屏幕的旋转以及浏览器朝向信息，为一个对象
screen.orientation.type
screen.orientation.angle

navigator.hardwareConcurrency
// 浏览器可调用的运行设备最大的线程数
navigator.deviceMemory
// 浏览器运行设备的内存
navigator.maxTouchPoints
// 浏览器运行设备的最大触控点数

// (3)浏览器状态管理
// 通过navigator对象的相关API可以对浏览器运行设备的状态进行管理
// 地理位置
navigator.geolocation
// geolocationAPI用于控制浏览器的访问地理信息
navigator.geolocation.getCurrentPosition();
// 获得当前地理信息，第一个参数为获取成功回调函数，第二个参数为获取失败回调函数
// 会将包含地理信息的对象传入第一个回调函数，会将错误信息对象传入第二个回调函数
// 假设将地理信息对象表示为p，错误信息对象表示为e 
p.coords
// 包含地理信息对象
p.timestapm
// 时间戳
p.coords.speed
// 移动速度
p.coords.heading
// 朝向
p.coords.longtitude
p.coords.latitude
// 经纬度
p.coords.accuracy
// 经纬度精度
p.coords.altitude
// 高度
p.coords.altitudeAccuracy
// 高度精度
e.code
// 错误信息编号
e.message
// 错误信息简短描述

// 联网状态
navigator.onLine
// 布尔值，反应设备是否联网
let connect=navigator.connection
// 反应设备联网信息的对象
connect.downlink
// 网络带宽
connect.downlinkMax
// 网络下行最大带宽
connect.type
// 网络连接方式
connect.rtt
// 网络实际返回时间
connect.effectiveType
// 网络连接形式
connect.saveData
// 布尔值，是否节流模式
connect.onchange
// 用于网络连接状态改变的事件属性，添加事件

// 电池状态
navigator.getBattery();
// 该方法返回一个期约，解决为一个反应电池信息的实例对象
navigator.getBattery().then((battery)=>{
    console.log(battery.charging);
    // 布尔值，电池是否在充电
    console.log(battery.chargingTime);
    // 电池距离充满电的时间
    console.log(battery.dischargingTime);
    // 电池距离用完电的时间
    console.log(battery.level);
    // 电池百分比
})
// 以上的属性都具有对应的on事件属性，用于在电池信息改变时，添加事件  
