// 模块模式：将代码按不同功能进行拆分成多个部分，再对其进行封装，在封装的基础上暴露公共接口，通过公共接口进行数据传输
// 模块标识符：用于标明模块的字符串，可以为标识字符串或模块的路径，用于指向模块
// 模块的依赖：模块间的关系描述，即本模块内部的功能实现依赖于其他模块的数据传输
// 依赖有向图：用于描述模块间的相互依赖关系
// 模块加载：在模块加载完成后会立即执行模块代码，而模块加载完成需要该模块的所有依赖均加载完成，如果依赖没有加载，会发送依赖加载的请求
// 同步加载：同时仅加载一个模块，不具有依赖关系模块也按顺序进行同步阻塞加载，可分为加载顺序执行和加载逆序执行
// 加载顺序执行：将顶层作为入口，按有向图顶层到底层的顺序进行加载，可以保障加载完成后，其依赖也加载完成，加载完成立即按顺序执行
// 加载逆序执行：将底层作为入口，依次发送由底层向顶层的加载请求，待整个有向图加载完成后，由底层向顶层逆序执行
// 入口：在整个模块依赖有向图中，用于代码执行的第一个模块，其引入整个依赖有向图模块的执行
// 异步加载:按需求进行模块的加载，即不具有依赖关系的模块可以实现异步加载
// 动态依赖：动态创建依赖关系，在模块内部创立某种条件，仅条件成立时，才能建立依赖关系（一般设置条件判断语句）
// 循环依赖：即依赖有向图闭合任意一个模块作为入口都能按依赖关系遍历完整的依赖有向图

// ES6前不支持原生的模块模式，需要利用不同方法进行模块的封装以及接口暴露
// IIFE立即执行匿名函数进行封装和接口暴露
let moduleA=(function(a){
    let b=a*2;
    let c=function(){
        console.log(b);
    }
    return {
        b:b,
        c:c
    };
})(10);
// 封装了一个名为模块A的代码，其具体功能为将一导入值乘2，并可以实现打印以及访问结果
// 用IIFE的参数作为导入接口，可以接受外部值传入模块
// 用IIFE的函数返回值作为导出接口，返回值为一个对象，通过声明的模块标识符进行访问对象
// 采用引用值作为返回值，可以避免在外部操作接口时对模块内部造成影响

moduleA=(function(module){
    module.d=b*3;
    module.a=function(){
        console.log(module.d);
    }
    return module;
})(moduleA);
// 模块增强模式，将模块作为参数传入，可以在匿名函数内部用参数属性和方法访问到原模块的接口，在IIFE内进行增强（新增功能并暴露接口），并将增强模块返回并赋值
// 一般不采用该方法进行模块操作，即难以对模块依赖进行管理

// CommonJS：用于编写JS中的模块接口语句规范，实质实现同步操作，将所有的模块加载完成，实现为加载逆序执行
require(URL);
// 依赖和导入接口，用于声明依赖关系，并请求加载依赖模块，实现从依赖模块导入行为
// 参数为模块的路径
exports
// 导出接口，可以导出值，如对象，类，简单值等
// CommonJS不能直接在浏览器中使用，需要相关模块工具将其转换，且对应的模块也需要进行封装，如采用函数闭包，在模块内部使用CommonJS

// AMD：异步按需请求加载依赖，利用函数对模块进行封装，并在模块内声明其自身依赖，按需对依赖进行加载
define("moduleA",["moduleB"],function(moduleB){
    let a=moduleB.b*2;
    return {
        a:a,
    };
});
// 第一个参数为模块标识符，第二个参数为传入函数的字符串数组，表明依赖模块，第三个参数为封装的模块，为匿名函数，接受参数，在匿名函数内部实现模块功能
define("moduleA",["require","exports"],function(require,exports){
    let moduleB=require(URL);
    exports.a=moduleB.b*2;
});
// 第二个参数为传入函数的字符串数组，可以为require和exports

// UMD：通用模块，实质为判断使用AMD还是CommonJS

// ES6的模块
// 模块的标识符：路径字符串，在封装时的src属性和导入和转移导出的from，均使用路径字符串作为模块标识
// 模块的封装
// ES6利用在HTML文档中的<script>标签进行封装模块
// <script type="module" src="路径字符串"></script>
// 外引式，用src指向模块内容
//<script type="module"> 模块代码</script> 
// 内嵌式，在标签内部嵌入模块内容，该方法的模块不能被其他模块的import导入实现依赖，故适合作为入口
// 模块的加载
// 对于模块的script标签，会自动默认为defer，即在解析到标签时，开始进行下载，而当整个文档解析完成后，才开始执行
// 实质为按需进行请求加载，会逐层发送加载请求，而不存在依赖关系的模块，其加载为异步实现

// 模块的导出和导入仅能在顶级使用
// 模块的导出=>export
let A="1",B="2",
c=function(){
    console.log("Hi");
}
export {A as a, B as b,default as moduleA};
// 命名导出，将某一变量进行导出，在其他模块导入时，可以使用名称进行访问
// 默认导出，将整个模块作为对象导出，在其他模块导入时，可以根据导出或导入设置的名称进行访问到整个模块
// 可以使用as对导出变量以及默认进行重命名

// 模块的导入=>import
import {a as x, b as y ,moduleA as obj} from '路径字符串';
console.log(x==obj.A) 
// true 均为1
console.log(y==obj.B)
// true 均为2
obj.c();
// Hi
import  * as M  from '路径字符串';
M.A;
// 1
M.B;
// 2
// 默认导入必须使用命名，即将default默认进行命名，将默认导入作为对象，可以访问到原模块的数据
// 命名导入可以通过变量访问到原模块的数据，且可以通过* as将命名导入都收集到一个对象中
// 可以使用as进行导入重命名

// 模块的转移导出=>中间模块将其依赖模块的导出作为自身导出，导出到其被依赖模块
export * from '路径字符串'
// 转移导出依赖模块的所有命名导出，此时可以直接在导入里使用依赖模块命名导出
export {A as B} from '路径字符串'
// 将依赖模块的A命名导出重命名为B，再由导入里使用B访问到依赖导出的A
export {default} from '路径字符串'
// 将依赖模块的默认导出作为自身的默认导出，在导入里仅能通过默认导入访问到依赖模块
export {a as default} from '路径字符串'
// 将依赖导出的默认导出作为命名导出，在导入里通过该命名，访问到依赖模块
// 注：在转移导出过程中，发生新值的重写会覆盖原值


