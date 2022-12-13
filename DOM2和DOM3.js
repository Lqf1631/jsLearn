// DOM2和DOM3采用模块思想，对DOM功能进行完善
// DOM Core 针对DOM中XML文档的命名空间进行拓展
// DOM HTML 补充DOM中HTML文档的功能
// DOM Syle 补充DOM和CSS联系以操控DOM文档的样式
// DOM Tranversal and range DOM中的遍历和范围选取
// DOM MutationOberver 观察DOM的变化进而做出对应操作
// DOM Event 添加检测变化的事件属性，在发生变化时触发事件


// DOM Core
// 在XML文档中，主要针对数据的存储和描述以及传递，XML文档中会采用不同的语言进行描述
// 在合法的元素标签中，利用xmlns：进行命名空间的声明
<xhtml:html xmlns:xhtml="">
    <xhtml:body></xhtml:body>
</xhtml:html>
// 其中xmlns用于声明命名空间，xhtml为命名空间的前缀，""中为命名空间的URI
// 在同一个XML文档中选用不同的语言，对不同的语言创建命名空间，再在空间内添加对应的节点树结构，完成XML文档
// 在不同命名空间的标签中，需要加命名空间的前缀以表明标签属于命名空间

// Node变化
node.localName;
// 节点不含命名空间的节点名
node.namespaceURI;
// 节点的命名空间URI
node.prefix;
// 节点的命名空间前缀
node.nodeName=node.prefix+node.localName;
node.lookupNamespaceURI();
// 参数为节点命名空间前缀，返回为节点命名空间地址
node.lookupPrefix();
// 参数为节点命名空间地址，返回为节点命名空间前缀
node.isDefaultNamespace();
// 参数为命名空间URI
// 布尔值，该节点的默认空间是否是该URI

// Document变化 =>节点创建和节点获取
document.getElementsByTagNameNS();
// 第一个参数为命名空间，第二个参数为标签名
// 返回在该命名空间，匹配该标签名的元素节点的节点列表
document.createElementNS();
// 第一个参数为命名空间，第二个参数为标签名
// 在该命名空间下，创建一个元素节点
document.createAttributeNS();
// 第一个参数为命名空间，第二个参数为属性名
// 在该命名空间下，创建一个属性节点

// Element变化 =>属性操作
element.getAttributeNS();
// 第一个参数为命名空间，第二个参数为属性名
// 在该命名空间下，获得该元素的特定属性的属性值
element.setAttributeNS();
// 第一个参数为命名空间，第二个参数为属性名，第三个参数为属性值
// 在该命名空间下，设置该元素的属性名和属性值
element.hasAttributeNS();
// 第一个参数为命名空间，第二个参数为属性名
// 在该命名空间下，检测该元素是否含有该属性
element.removeAttributeNS();
// 第一个参数为命名空间，第二个参数为属性名
// 在该命名空间下，将该元素的特定属性移除

// 将属性视为属性节点
element.getAttributeNodeNS();
// 第一个参数为命名空间，第二个参数为属性名
// 在该命名空间下，获得该元素的特定属性的属性值
element.setAttributeNodeNS();
// 第一个参数为命名空间，第二个参数为属性节点对象
// 在该命名空间下，将该属性节点设置为该元素的属性

// 将属性作为element.attributes中的属性节点
element.attributes.getNamedItemNS();
// 第一个参数为命名空间，第二个参数为属性名
// 在该命名空间下，获得该元素的特定属性的属性值
element.attributes.setNamedItemNS();
// 第一个参数为命名空间，第二个参数为属性节点
// 在该命名空间下，将特定的属性节点设置为该元素的属性
element.attributes.removeNamedItemNS();
// 第一个参数为命名空间，第二个参数为属性名
// 在该命名空间下，将该元素的特定属性进行删除


// DOM HTML
// Document类型变化
document.importNode();
// 第一个参数为其他文档中的节点，第二个参数为布尔值，设置是否复制子树
// 将其他文档中的节点进行复制，且onerDocument自动修改
document.implementation.createDocument();
// 第一个参数为命名空间，第二个参数为包含元素标签名，第三个参数为文档类型的对象
// 创建一个新文档，规定文档的类型以及文档内的标签元素，（HTML中的标签元素为html）
document.implementation.createDocumentType();
// 创建一个文档类型对象，第一个参数为name，第二个参数为publucID，第三个参数为systemID
document.implementation.createHTMLDocument();
// 创建一个新的HTML文档，参数为新文档的title

// DocumentType类型变化
// 新增一些属性用于指向<!DOCTYPE>中一些有用信息
document.doctype.internalSubset
// 该标签中的特殊声明
document.doctype.publicId
// 该标签中public指向的信息
document.doctype.systemId

// Node类型变化
node.isSameNode();
node.isEqualNode();
// 参数为节点，比较两个节点是否一致，返回布尔值
// same为指针指向同一个节点
// equal为节点的属性，类型，标签以及子树均一致

// 支持向节点中添加额外数据，并控制节点变化时，数据的变化操作
node.setUerData();
// 第一个参数为数据的键，第二个参数为数据的值，第三个参数为处理函数
// 处理函数fun(){}
// 第一个参数为描述节点变化类型的数值，第二个参数为数据键，第三个参数为数据值，第四个参数为源节点，第五个参数为目标节点
node.getUserData();
// 参数为数据的键
// 通过该对象上的数据的键，访问对应数据值

// HTMLFragment类型变化
// 新增文档中内嵌窗格的属性
fragement.contentDocument
// 该属性指向该内嵌窗格的document对象
fragement.contentWindow
// 该属性指向该内嵌窗格的Window全局对象


// DOM Style
// 在文档中的样式设置主要分为样式表（内部样式表style和外部样式表link）和元素特定样式（style属性设置）
// 元素特定样式
// 在JS中，元素的style属性为一个对象，具有与CSS中对应的属性名来设置和获取样式
// JS中的style对象样式属性为驼峰式，而采用字面量或者字符串样式时，仍采用-的css形式
style.getPropertyPriority();
// 参数为样式属性字符串，返回值为字符串，表明是否对该样式采用!important，未使用为空字符串
style.getPropertyValue();
// 参数为样式属性字符串，返回值为属性值
style.setProperty();
// 第一个参数为样式属性字符串，第二个参数为样式属性值，第三个参数为字符串，是否采用!important，向style对象中添加特定样式属性
style.removeProperty();
// 参数为样式属性字符串，移除该样式属性
style.length;
// 该对象中的属性长度
style.item();
// 利用该方法或者[]进行查询，返回值为样式属性字符串
style.parentRule;
// 如果该样式对象采用其他规则进行内嵌，则该属性指向该外部规则
style.cssText;
// 该属性为css代码，修改会重写整个样式

// 样式表
// 通过style和link标签进行样式表设定来设置元素样式
document.styleSheets
// 所有的样式表都存储在该属性中，表现为一数组
// 样式表为StyleSheet对象的实例，而css样式表为CSSStyleSheet(继承至StyleSheet)的实例

// 样式表属性(只读)
styleSheet.disabled
// 该属性可修改，布尔值，样式表是否禁用
styleSheet.href
// 样式表的外引链接
styleSheet.type
// 样式表的类型
styleSheet.media
// 样式表支持的媒体，为一集合
styleSheet.onwerNode
// 包含样式表的节点link/style
styleSheet.title
// 包含样式表的节点的title
styleSheet.parentStyleSheet
// 采用内嵌式的样式表的外部样式表

// CSS样式表属性
css.cssRules;
// css样式表中的规则，以数组形式存储，实质为选择器加样式设置
css.onwerRule;
// 该样式表采用其他规则内嵌时，指向该规则
css.insertRule();
// 第一个参数为规则文本，第二个参数为插入位置索引
css.deleteRule();
// 参数为索引，删除索引位置处的规则

// CSSRule对象
rule.cssText;
// 规则的css代码文本，包括整个选择器和样式设置
rule.style;
// 该规则下的style对象，将样式表与元素的style属性联系
rule.parentstyleSheet;
// 包含该规则的样式表
rule.type
// 规则的类型
rule.selectorText;
// 规则的选择器文本

// 计算样式
// 元素的样式最终由继承，样式表和style属性按一定关系计算确定
element.implementation.getComputedStyle();
// 返回一个style对象，包含元素最终表现出的样式，包括了一些默认样式

// DOM中关于元素尺寸的操作
// 对于尺寸操作，读取尺寸后一般借助中间变量进行存储，减小内存消耗 

// 偏移尺寸（只读）
// 元素相对于包含元素的距离，包括元素的内容，边框，内边距和滚动条
// 偏移尺寸指的是包含元素和被包含元素之间的外边框距离
element.offsetTop
// 元素边框外侧上部相对于包含元素边框外侧上部的距离
element.offsetLeft
// 元素边框外侧左部相对于包含元素边框外侧侧左部的距离
element.offsetHeiht
// 元素外边框间的高度
element.offsetWidth
// 元素外边框间的宽度
element.offsetParent
// 元素的包含元素 
// ！！！包含元素并非该元素的父元素，而是在该元素的上级元素中第一个包含尺寸信息的元素
// div的包含元素为body故其offset值与getElementLeft()和getElementTop()一致

// 客户端尺寸（只读）
element.clientWidth
element.clientHeight
// 元素内边距和内容的高度和宽度
document.documentElement.clientHeight
document.documentElement.clientWidth
// 确定浏览器的视口尺寸

// 滚动尺寸
// <html>元素在内容和内边框超过视口时，会自动设置滚动条，而其他元素需设置overflow属性
element.scrollHeight
// 在无滚动条时，元素的内边距和内容的高度
element.scrollWidth
// 在无滚动条时，元素的内边距和内容的宽度
element.scrollTop
// 在有滚动条时，滚动条相对于上侧滚动距离
element.scrollLeft
// 在有滚动条时，滚动条相对于左侧滚动距离

// 获取元素尺寸
let domRect=element.getBoundingClientRect();
// 返回包含该元素尺寸相对于视口信息的DOMRect对象
domRect.left
// 该元素左侧距离视口左侧的距离
domRect.right
// 该元素右侧距离视口左侧的距离
domRect.top
// 该元素上侧距离视口上侧的距离
domRect.bottom
// 该元素下侧距离视口下侧的距离
domRect.height
// 该元素的高度
domRect.width
// 该元素的宽度


// DOM遍历
// DOM以根节点为起始，按顺序进行深度优先遍历，即按根节点的子DOM树顺序，遍历到最后一个节点后再进行反向回溯，直至遍历完整个根节点的子节点树

let root=document.body;
let filter=function accepteNode(node){
    // 参数为节点
    return node.tagName.toLowerCase()=="div"?
    NodeFilter.FILTER_ACCEPT:
    // 接受该种节点
    NodeFilter.FILTER_SKIP;
    // 跳过该种节点
}
// NodeIterator遍历
let a=document.createNodeIterator(root,NodeFilter.SHOW_ELEMENT,filter,flase);
// 第一个参数为根节点
// 第二个参数为筛选常量，按节点类型筛选节点，可以进行组合
// 第三个参数为具有acceptNode方法的对象或者是acceptNode函数，用于自定义筛选
a.nextNode();
// 将遍历正向移动一步，返回的是遍历所处节点
// 第一次调用时，返回的是root节点
// 到最后节点时，返回值为null
a.previousNode();
// 将遍历反向移动一步，返回的是遍历所处节点
// 根节点调用该方法，返回null

// TreeWalker遍历
let filter2=function accepteNode(node){
    // 参数为节点
    return node.tagName.toLowerCase()=="div"?
    NodeFilter.FILTER_REJECT:
    // 跳过该种节点及其子节点树
    NodeFilter.FILTER_ACCEPT;
    // 接受该种节点
}
let b=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT,filter2,flase);
// TreeWalker除了NodeIterator的方法外，还可以根据节点关系进行移动
// 并有一个currentNode属性指向最后一次方法返回节点，可以利用该属性进行灵活位置设置
b.currentNode;
// 指向遍历所处的当前节点，可以进行修改来改变遍历所处位置
// 默认为根节点
// 即此时未调用的方法时，初始位置为根节点
b.firstChild();
// 移动到当前节点的第一个子节点
b.lastChild();
// 移动到当前节点的最后一个子节点
b.nextSibling();
// 移动到当前节点的下一个同胞节点
b.previousSibling();
// 移动到当前节点的上一个同胞节点
b.parentNode();
// 移动到当前节点的父节点

// 对比：nodeIterator遍历第一次调用nextNode时会返回根节点，再次调用方法，从根节点开始
// treeWalker的遍历起始位置为根节点，可以使用currentNode进行访问


// 范围操作
// 对于DOM树可以创建范围从中选取出文档片段，实现进一步操作
let r=document.createRange();

// 相关属性
r.startContainer
// 范围内第一个子节点的父节点
r.endContainer
// 范围内最后一个子节点的父节点
r.startOffset
// 范围内第一个子节点在父节点的子节点列表中的索引
r.endOffset
// 范围内最后个子节点在父节点的子节点列表中的索引
r.commonAncestorContainer
// 文档树中第一个子节点包含startContainer和endContainer的节点
// 如果范围包含文本，则文本节点为containner，offset为文本位置在文本节点索引

// 相关方法
// 参数均为节点对象
// 下列方法操作修改范围后，对应的属性会相应发生变化
r.setStartBefore();
// 将范围的开始位置设置在该节点之前
r.setStartAfter();
// 将范围的开始位置设置在该节点之后
r.setEndBefore();
// 将范围的结束位置设置在该节点之前
r.setEndAfter();
// 将范围的结束位置设置在该节点之后

// 范围简单设定
// 简单设定仅传入节点，自动将该节点中包含的信息设定为范围，以该节点或其子节点树起始和终止
// 设定的范围包括节点和节点子节点树
r.selectNode();
// 参数为节点，将该包括该节点的整个子节点树设置为范围
r.selectNodeContents();
// 参数为节点，将不含该节点的整个子节点树设置为范围

// 范围复杂设定
// 第一个参数为start/endContainer的节点，第二个参数为start/endOffset的索引位置
r.setStart();
r.setEnd();
// 对于复杂设定，需传入范围的起始位置和终止位置，利用该方法可以进行节点内部再细分为范围（文本节点）

// 范围操作
// 范围是将文档中的信息进行划分，再将其以指针的形式复制到文档片段（DocumentFragment）中
// 在下述方法中利用文档片段操作直接处理文档，需要保障获取范围以及操作范围时原文档的完整
// 对于以节点划分的范围，无需重构节点树
// 对于在节点内部划分的范围，需重构节点树，保障节点树完整，再进行调用操作方法
r.deleteContents();
// 在重构的原文档中，删除该范围
r.extractContents();
// 在重构的原文档中，删除该范围，并将删除的该范围进行返回
// 返回一个文档片段DocumentFragment
r.cloneContents();
// 在重构的原文档中，将对应的范围进行复制，复制后的范围操作不再与此前联系
// 返回一个文档片段DocumentFragment

// 范围插入
r.insertNode();
// 参数为节点，在该范围前的位置处插入参数节点
r.surroundContents();
// 参数为节点，先在原文档中提取出范围，在范围位置插入节点，再将范围插入到该节点中
// 由于该操作缺乏重构原文档，故范围为跨节点时，会报错

// 范围折叠 
// 一个范围内不包含任何的文档信息，则该范围被折叠
r.collapse();
// 参数为布尔值，true表明在范围的起始位置进行折叠
// 单向操作，一旦折叠，不能进行展开
r.collapsed;
// 布尔值，查询范围是否被折叠
// 范围折叠可以用于检测两节点是否相邻
// 以前节点后，后节点前作为范围划定，查询折叠属性，折叠则表明两节点相邻

// 范围比较
// 比较两个范围的边界的对应位置
let r2=document.createRange();
let num=Range.START_TO_START;
r.compareBoundaryPoints(num,r2);
// 第一个参数为数字，表明比较的形式
Range.START_TO_START;(0)
Range.START_TO_END;(1)
Range.END_TO_END;(2)
Range.END_TO_START;(3)
// 第二个参数为范围
// 比较后，前为-1，等为0；后为1

// 范围复制
r.cloneRange();
// 返回为范围的复制范围副本，对复制范围进行操作，不影响原文档
// 类型为范围Range

// 范围的内存释放
// 在使用完范围后，可以先切断与文档联系，再进行内存释放
r.detach();
// 切断联系
r=null;
// 内存释放
