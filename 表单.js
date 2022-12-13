// 表单

// 1.表单基础
// form表单对象实例的属性，方法和访问
let form=new HTMLFormElement();
form.acceptCharset;
// 服务器接受表单的字符集
form.enctype
// 表单提交时的编码方式
form.target
// 表单提交以及响应的窗口
form.method
// 表单提交的方法
form.action
// 表单提交的地址
form.elements
// 表单的字段元素，以字符串形式存储
form.length
// 表单的字段元素长度
form.submit();
// 提交表单，不触发submit事件
form.reset();
// 重置表单，触发reset事件

// 表单提交
// 利用提交或图像input和提交button用作提交按钮进行提交，触发submit事件
// 直接调用submit()方法进行提交表单，不触发submit事件
// 提交一次表单后，未避免重复触发，在form上添加onsubmit事件处理程序，屏蔽提交按钮

// 表单重置
// 利用重置input和重置button用作重置按钮进行重置,会将表单字段恢复到第一次渲染状态
// 直接调用reset方法进行重置表单
// 二者均触发reset事件,但是一般不采用重置表单,而是返回上一个页面实现重置表单的功能

// 表单字段
// <input> <select> <textarea> <filedset> <button>
// 表单字段访问
form.elements[0];
form.elements["aaa"];
// 表单内的控件字段除了常规DOM,可以采用表单元素访问,其将控件字段作为数组顺序存储
// 通过索引或name进行访问,同名的name仅能访问第一个

// 表单字段属性
let e=new HTMLInputElement();
e.disabled;
// 控件字段是否被禁用
e.name;
// 控件字段名
e.type;
// 控件字段类型
e.readOnly;
// 控件字段为只读字段
e.tabIndex;
// 控件字段在TAB键下的切换顺序
e.value;
// 控件字段的值
e.form;
// 指针,指向表单元素

// 表单字段方法
e.focus();
// 使得焦点聚焦到该控件字段元素
autofucos
// 在HTML标签中设置,使得页面加载时,自动聚焦到该标签
e.blur();
// 该控件字段元素失焦

// 表单字段事件
focus;
// 控件字段获得焦点
blur
// 控件字段失去焦点
chenge
// 控件字段值改变（对于input和textarea，还需要同时失焦才触发）


// 2.文本输入框编程
// input标签：单行文本框 size：以字符数计的宽度 value：默认值可以设置属性，为文本框的输入 文本框内值 maxLength：以字符数计的最大字符数
// textarea标签：多行文本框 rols：以字符数计的行数 cows：以字符数计的列数 value：默认其标签闭合内的文本，为文本框的输入
// 选择文本
e.select();
// 选择文本框内的全部文本，部分浏览器同时会使文本框聚焦
// 调用该方法后会触发select事件
// 获得选择文本
e.selectionStart
// 文本框选中字符串的起始索引
e.selectionEnd
// 文本框选中字符串的终止索引
e.value.substring(e.selectionStart,e.selectionEnd);
// 获得在文本框内选择的字符串
// 部分选择
e.setSelectionRange(0,e.value.length);
// 参数为文本框内字符串的起始索引和结束索引，前闭后开
// 需要在页面中显示出选择效果，需要在调用该方法前或后使得该文本框聚焦
// 在IE中，需要进行范围操作，先将范围折叠到文本框起始位置，moveStart移动到起始位置，moveEnd移动到结束索引，利用range.text

// 验证输入=>限制输入(非有效的字符不能进行输入操作)
// 为文本框元素添加keypress/textInput事件，判断输入字符，在需要屏蔽时调用event.preventDefault()
// 在HTML5中已经采用标签自身性质进行验证

// 剪切板处理
// 剪切板事件：
cut
beforecut
// 剪切
paste
beforepaste
// 粘贴
copy
beforecopy
// 复制
// 对于before事件，除IE外浏览器为在右键出现菜单栏时触发
// 访问剪切板
event.clipboardData
// 对于非IE浏览器，在事件处理函数内访问event的该属性
window.clipboardData
// 对于IE浏览器,在事件处理函数内访问window的该属性
event.clipboardData.getData();
// 参数为返回数据类型,IE期待text/url,其余浏览器期待MIME,而text会被认为text/plain,获得剪切板内指定类型的内容
event.clipboardData.setData();
// 第一个参数为数据类型,第二个参数为数据内容,设置剪切板的内容
event.clipboardData.clearData();
// 清除剪切板内容

// 自动切换
// 使用keyup事件,在已知输入框需要输入的字符串长度时,当输入完成,自动跳转到下一个文本框
// e.value.length=e.maxLength 

// HTML5文本框自带验证=>仅验证有效性而不限制输入
required
// 向标签直接添加该属性或利用JS设置属性值为true
// 该文本框必须输入内容才有效
type="email"/"url"
// 该文本框必须输入邮箱或网址格式的内容
// 检验是否支持该功能,仅需设置后,检验type值是否不为text(不支持的浏览器,设置后type值会自动变为text)
type="number","range","datetime","datetime-local","date","year","month","week","time"
// 时间,数字,范围验证
// 文本框为该类型时,具有额外属性
e.max;
e.min;
e.step;
// 用于限制其最大最小值,以及规定步长(步长外为无效)
// 文本框额外具有以下方法
e.stepUp()
// 使得文本框内值增加一个步长
e.stepDown()
// 使得文本框内值减小一个步长
e.checkValidity();
// 检验该文本框是否有效,返回布尔值
let v=e.validity;
// 该属性为以对象,对象内的属性为无效原因,属性值为布尔值
v.stepMismatch
v.typeMismatch
v.valueMissing
v.rangeOverflow
v.rangeUnderflow
v.customError
v.tooLong
form.noValidate
// 直接向标签中添加该属性,或者利用JS设置其值为true,会屏蔽掉该表单以下所有控件字段的HTML5有效性验证操作
let button=new HTMLButtonElement;
button.type="submit";
button.formNoValidate;
// 当表单内不止有一个提交按钮时
// 直接向标签中添加该属性或利用JS设置其值为true,会使得按下该提交按钮时,表单不进行HTML5有效性验证直接提交


// 选择框编程=>select
// select作为选择框，将选项以下拉菜单的形式出现，可以为单选和多选，一般格式为select选择框包含多个option选项，可以设定为多选或单选
// radio和checkbox作为选择标识，仅表现为一个标记，一般在其后加文字，利用label将点击文字链接到标识，表明选择该选项，会将选项逐一展示在页面中

// select元素的属性和方法
let select=new HTMLSelectElement();
select.options
// 选择框内选项数组
select.add();
// 向选择框内添加选项的方法
select.remove();
// 选择框内移除选项的方法
select.selectedIndex;
// 选择框内选中的第一个选项的索引
// 设置该属性会重新选择到该设置值
select.multiple;
// 布尔值，设置选择框是否可以多选
select.size;
// 选择款出现的行数大小
select.type;
// 选择款类型，仅为"select-one"或"select-multiple"
select.value;
// 根据第一个选择的选项的value或text确定

// option元素的属性和方法
let option=new HTMLOptionElement();
option.index;
// 选项在选择框内的索引
option.label;
// 选项的label标签
option.text;
// 选项的文本
option.value;
// 选项的值
option.selected;
// 布尔值，选项是否被选中
// 设置该值，复选框可以添加一个选中选项，单选框会重新选择该选项

// 访问选中选项
select.options[select.selectedIndex]
// 单选框，利用select.selectedIndex
for(let o of select.options){
    if(option.selected){
        // 相关操作
    }
}
// 多选框，遍历所有的选项，筛选出selected的选项

// 增加选项
let o=new Option("text","value");
// 创建选项，利用相关构造函数，第一个参数为选项文本，第二个参数为选项值
// 返回一个HTMLOptionElement的实例
select.add(o,undefined);
// 第一个参数为添加的选项，第二个参数为在该选项前添加选项
// 对选项框调用方法，在第二个参数的选项框前添加选项，如果添加在末尾，第二个参数为undefined

// 删减选项
// 选择款remove方法
select.remove(option.index);
// 参数为选项在选择框里的索引
// removeChild通用方法
select.removeChild(option);
// 设置选项为null
select.options[option.index]=null;
// 将select的选项数组对于索引设置为null

// 选项重排和移动
let select1=new HTMLSelectElement();
select1.appendChild(option);
// 将已有元素作为参数，会先在DOM中删除该元素，再添加到对应位置，实现移动
select.insertBefore(option,select.options[option.index-1]);
// 将选项在选项框内向前移动一步
select.insertBefore(option,select.options[option.index+2]);
// 将选项在选项框内向后移动一步
// 选项的重排和移动操作之后，对应的select.options的index会实时变化


// 富文本编程
// 富文本即采用一个可编辑的内嵌窗格，在其上进行实时数据输入，再通过表单进行提交
// 富文本创建
<iframe src contenteditable></iframe>
// 通过内嵌网格进行外引一个html文档作为富文本的编辑区域
// 访问内嵌网格
frames["name"];
// 在DOM中将内嵌网格按顺序存储在frames数组中，按顺序或name进行访问
contentEditable
// 值为true，flase，inherit
// 在HTML中设置contenteditable属性可以将所有元素的内容变化实时编辑的状态
// JS中将节点的contentEditable属性设置，将该节点内容变为实时编辑状态
frames["name"].document.designMode
// 值为"on"或者"off"
// 设置该属性可以将其修改为实时编辑状态
// 需在window中添加load事件，等待其窗格加载完成后再设置
// 窗格内的实时编辑实质上作用在窗格文档的body的innerHTML上

// 富文本交互
frames["name"].document.execCommand("bold",false,null);
// 在窗格文档上调用该方法，第一个参数为命令的字符串，第二个参数为是否显示命令菜单，为保证浏览器兼容设置为false，第三个参数为命令值
// 通过在窗格上调用该方法，可以进行窗格内的文档的初始化，剪切板操作以及在光标所在位置处进行相关操作
// 实质需要在窗格事件内进行调用
frames["name"].document.queryCommandEnabled("bold");
frames["name"].document.queryCommandState("bold");
frames["name"].document.queryCommandValue("bold");
// 在窗格文档上调用查询命令方法，参数均为命令字符串，分别查询命令是否适用，命令状态，以及命令值
// ！！！注：注意执行顺序，即需要先将目前的窗口变为窗格内的窗口，才能进行富文本交互操作

// 富文本选取
frames["name"].getSelection();
// 在窗格中进行选区操作后，可以在窗格上调用该方法，返回一个选取对象
// 该对象具有一些关于选区范围的属性
// 该对象具有将选取与DOM范围结合操作，实现富文本的精确控制操作
// ！！！注：注意执行的顺序，即需先向富文本区域进行选区操作，才能得到一个非空的选取对象，该对象包含了一个DOM范围

// 富文本提交
// form表单内设置一个具体hidden属性的文本类型控件，用于存储富文本区域内的信息
// 在form提交之前或在sumbit事件中，将窗格内的内容赋值给该隐藏控件的value，再进行提交操作
