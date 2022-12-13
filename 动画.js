// 动画：将画面按一定时间间隔进行变化，形成动画效果
// 需持续地将画面按照一定时间进行切换

// setInterval
// 会持续地将某一函数推入执行队列
(function(){
    let i=true;
    // 可以设置变量来控制当前页面会显示为哪个画面
    function animation(){
        if(i){
            // 画面1
            i=false;
            // 控制跳转到画面2
        }
        else{
            // 画面2
            i=true;
            // 控制跳转到画面1
        }
        // 页面改变(若干个单个画面的切换)
    }
    setInterval(animation,17);
})();
// 立即调用匿名函数将该操作进行封装，保证外部不能对其进行操作，维持代码稳定
// 缺点：setInterval会间歇地将函数推入执行队列，但是其间隔时间为推入队列的间隔时间，而并非实际的动画间隔
// setInterval的精度较低，导致时间间隔控制误差
// 为实现动画平滑连接且保证setInterval的精度，并给页面一定的渲染时间，一般间隔设置在17ms

requestAnimationFrame();
// 该方法返回一个请求ID，可以利用该ID在函数执行前将函数取消
// 参数为一函数，会将该函数推入到回调队列，使其再页面重绘前立即执行
// 该方法原理为在页面重构前会暴露一个hook钩子，该钩子实质为页面重绘之前的一个点，在重构前会先执行回调队列上的函数，而该方法会将参数函数推入到回调队列
// 在调用该方法时，向参数函数内传递一时间参数(DOMHighResTimeStamp实例)，即在该时间参数时，会立即调用参数函数
cancelAnimationFrame();
// 参数为requestAnimationFrame的返回值，可以将该函数在执行前从回调队列取消

function animation(){
    // 页面改变（若干个单个画面的切换）
    requestAnimationFrame(animation);
}
requestAnimationFrame(animation);
// 定义一个函数，函数内会使得页面重构，并且在函数内部调用requestAnimationFrame递归调用函数自身
// 在外部将该函数利用requestAnimation推入到回调队列中
// 页面重绘前，在回调队列中的函数执行，会使得该页面进行修改，再递归调用，又再次将函数推入到回调队列

// 在频繁进行重绘页面操作时，可以利用requestAnimationFrame进行节流，且保证该函数在重绘页面前进行执行
// 即通过设置标记的修改，控制在频繁重绘页面时，回调队列中仅有一个函数，即当前函数回调执行完，才重新添加
// 或与setTimeout连用，使得在一定时间内才向回调队列推入新的函数，并保证回调队列中为空或仅有一个，过滤多余回调

