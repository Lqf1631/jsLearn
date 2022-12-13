// Selector API
// 与css选择器相适应的API，方便地与CSS选择器的进行相关操作
element.querySelector()
// 参数为css选择器，返回值为调用该方法的节点的与选择器匹配的第一个后代元素(在子节点树中进行选择器匹配)
element.querySelectorAll()
// 参数为css选择器，返回值为调用该方法的节点的与选择器匹配的全部后代元素(在子节点树中进行选择器匹配)
// 返回值为NodeList的一个“快照”，实际为静态的节点列表
element.matches()
// 参数为css选择器，将调用该方法的节点与选择器进行匹配，返回布尔值

// Element Transversal API
// 由于在文档中，元素间的空格换行会实现为文本节点，如果仅操作子元素节点，则利用该API
element.childElementCount
// 子元素节点的个数
element.firstELementChild
// 第一个子元素节点
element.lastElementChild
// 最后一个子元素节点
element.previousElementSimbling
// 该节点的上一个同胞元素节点
element.nextElementSimbling
// 该节点的下一个同胞元素节点
element.childern
// 专有拓展，仅包含元素节点的HTMLCollection

// HTML5拓展
// (1)CSS类操作
document.getElementsByClassName()
// 参数为节点的类属性字符串，可以包含多个类名的字符串如“A B”会不关注顺序地所搜A类和B类节点，返回值为HTMLCollection
element.classList
// 对于类名进行字符串操作，将类名视为一类数组的classList结构，方便操作
element.classList.add();
// 参数为类名字符串，向该节点的类中增加新的类
element.classList.remove();
// 参数为类名字符串，向该节点的类中删除该类名
element.classList.toggle();
// 参数为类名字符串，节点的类名包含该参数，则将其删除，未包含则将其新增
element.classList.cotains();
// 参数为类名字符串，判断该节点是否为该类

// (2)焦点管理
// 焦点可以通过TAB键或element.focus()进行移动
document.activeElement
// 该属性指向焦点聚焦元素
// 在页面加载前为null，页面加载后默认不操作时为body
// 用于管理焦点位置
document.hasFocus();
// 返回布尔值，判断焦点是否在当前页面

// (3)HTMLDocument新增属性
document.readyState
// 页面加载完成为：readey
// 页面未加载完成为：loading
document.compatMode
// 页面渲染模式
// 标准模式和混杂模式，不同的标识字符串
document.head
// 指向head标签

// (4)自定义数据属性
// 可以向元素内自定义语义无关的属性
// 属性用data-作为前标，后可以接任何命名
// 自定义属性作为键值对的映射存储在dataset对象中
// 可以通过对象的data-后的名作为键来访问和修改值

// (5)页面滚动
element.scrollIntoView()
// 在元素节点上调用该方法，将滚动页面使得该元素出现在视口中
// 第一个参数为布尔值，true时出现在视口顶端，false出现在视口底端，默认为true
// 第二个参数为滚动描述对象
// 用behavior,block,inline描述滚动过程，垂直布局和水平布局

// (6)插入标记
element.innerHTML
// 该属性返回整个element元素节点的子节点树，为字符串形式，内容根据浏览器存在差异
// 可以重写该属性来替换掉该节点的整个子节点树，以字符串形式，但字符串中的部分特殊字符如果对于HTML编码，则会转码
element.outterHTML
// 与innerHTML差异在操作包含该节点本身
element.innerText
// 该属性返回整个element元素节点的子文本节点，同一级会进行合并，非同级会按一定顺序
// 可以重写该属性来向掉该节点的插入一个子文本节点，以字符串形式
element.innerHTML=element.innerHTML
// 通过再次设置可以删除掉字符串中的标签
element.insertAdjacnetHTML();
element.insertAdjacnetText();
// 在调用该方法的元素节点的指定位置插入HTML或文本
// 第一个参数为描述位置字符串
// beforebegin
// beforeend
// afterbegin
// afterend
// begin指该元素节点的起始标签
// after指该元素节点的结束标签
// 第二个参数为插入HTML或文本，字符串形式
// 在使用以上方法插入HTML时，原有HTML中如果与JS或事件程序相绑定，则需要手动释放，避免占用内存
// 尽可能较少innerHTML/innerText/outterHTML使用，会查询整个子节点树，在使用时最好借助中间变量
// 且以上的属性使用时，插入<script>和<style>等非受控标签，不会产生作用，但是会显示在innerHTML和outerHTML内

// 专有拓展
// 未被HTML5标准化但是部分浏览器支持
element/document.cotains()
// 参数为节点，查询是否包含后代关系
node.compareDocumentPosition();
// 参数为节点，比较两个节点的关系，返回值为位掩码
// 具有断开，领先，随后，包含，被包含关系，其位掩码满足关系时，会累加
// 判断时需要将位掩码转化为布尔值
!!(result & 0x10);
// 用于判定是否包含关系的转化