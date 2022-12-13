// DOM基础
// DOM：文档对象模型，是HTML和XML文档的应用编程接口，通过DOM对文档进行描述以在不同环境下实现文档的操作
// DOM将文档描述为具有节点层级的节点树形式，文档中的所有信息都被抽象为节点，信息的关系被抽象为节点数状关系
// 利用DOM的节点树的形式，可以方便访问文档中的各种信息，实现相关操作
// js中将DOM节点实现为节点对象，将节点的信息作为属性包装，将相关操作实现为方法函数

// DOM使用
// (1)动态脚本或动态样式
// 在页面中本身不存在，依赖于页面中的现有脚本，通过DOM创建新的脚本或者样式
// 即先通过原有<script>标签引入脚本，在脚本中利用DOM创建新的标签用于引入外部脚本或样式
// 动态脚本或动态样式的加载过程是一个异步过程，即脚本加载与脚本中对于页面的操作是异步实现
// (2)表格操作
// DOM操作表格具有独立的方法与属性，利用该方法与属性可以极大地减小appendChild操作
// 该方法与属性主要针对表格中的元素节点，对于文本节点无作用
// tBodies tHead tFoot Caption 都具有create和delete方法
// rows代表行 cells代表单元格 具有对应insertRow/insertCell方法用于创建行和创建单元格
// (3)NodeList
// DOM操作中返回节点列表，如HTMLCellection和namedNodeList时，其具有动态变化的特点
// 即其节点列表会实时随着节点树的变化而改变
// 在循环中含有添加节点操作并使用NodeList.length属性时，采用中间变量将其初始值进行固定，或采用从后向前方式，固定初始的长度
// 应尽可能减少返回NodeList方法使用，因为会有遍历操作，尽可能进行赋值储存，方便后续使用


// 1.node类型
// DOM中的node接口，在js中实现为node类型，是所有节点类型的来源
// 所有其他节点类型均支持node类型中的方法与属性

// (1)节点信息属性
nodeName
// 节点名
nodeValue
// 节点值
// 节点值和节点属性依赖于节点类型
nodeType
// 节点类型
// 共包含有12种类型，用数字进行标号

// (2)节点关系属性及方法
parenNode
// 父节点，仅一个
childNodes
// 子节点，实现为nodeList的节点列表，是类数组的结构，可以通过[]和item()按顺序访问
firstChild
// 第一个子节点
lastChild
// 最后一个子节点
nextSimbling
// 在同一子节点列表里，某一节点的下一个节点
previousSimbling
// 在同一个子节点列表里，某一节点的上一个节点
hasChildNodes
// 节点相关方法，返回值为布尔值，表示是否含有子节点

// ！！！注：以上子节点和父节点关系体现仅包含一层关系

ownerDocument
// 指向文档节点document

// (3)操作节点方法
appendChild()
// 参数为节点，在父节点调用方法，将参数节点添加到子节点列表末尾
removeChild()
// 参数为节点，在父节点调用方法，将参数节点移除出整个节点树，但仍属于该文档
// 返回值为移除的该节点
insertBefore()
// 第一个参数为插入节点，第二个节点为位置节点，在父节点上调用方法，将参数节点添加到位置节点的previousSimbling位置
replaceChild()
// 第一个参数为加入节点，第二个参数为被替换节点，在父节点上调用方法，实现节点替换
// 返回值为被替换节点，处于和removeChild方法处理后相同状态

// ！！！注：操作节点方法依赖于节点关系，必须访问父节点才能实现操作，可以借用parentNode访问

// (4)特殊方法
cloneNode()
// 对某一节点调用方法，实现对该节点的复制，返回值为复制节点
// 返回值的节点处于一个孤儿状态，需要进行插入节点树操作
// 参数可选true，为深复制，包含整个子节点树，未设置参数为浅复制
normalize()
// 父节点调用该方法，实现对子节点列表中的文本节点的规范化


// 2.Document类型
// Document类型为表示整个文档，为节点树的根节点
// 针对HTML文档派生出HTMLDocument类型
// 在使用时采用HTMLDocument的实例document，实现对HTML页面的信息使用以及相关操作
// document也是window对象的属性，故为一全局属性

// (1)基础信息
nodeType=9
nodeValue=null
nodeName
// 标识为document
parentNode=null
ownerDocument=null

// (2)子节点
document.documentElement
// 子节点可以包含元素节点html（文档元素），该属性指向该子节点
document.body
// 为方便使用，具有该属性，指向body元素
document.doctype
// 子节点可以包含DocumentType类型，该属性指向该类型节点

// (3)HTMLDocument属性
// document对象作为HTMLDocument的实例，具备特有属性，反应出页面的信息
document.title
// 页面的title信息，可以进行修改但是不能修改HTML中title标签内的值 
document.URL
// 页面的URL
document.domain
// 页面的域名，可以实现修改，但是仅能单向缩小修改即修改为包含的域名
// 对于页面中的窗格，通过修改缩小域名，可以实现窗格JS传输
document.referrer
// 打开当前页面的上一级页面，没有为null

// (4)特殊属性
// 特殊属性用于便捷访问HTML中的特定标签
document.anchors
// 带有name属性的a标签
document.images
// img标签
document.forms
// form标签
document.links
// 带有href属性的a标签

// 返回值均实现为HTMLCollection实例

// (5)访问标签
document.getElementById()
// 参数为节点id，返回值为该节点对象
document.getElementsByName()
// 参数为节点name，返回值为一组具有该name的节点
document.getElementsByTagName()
// 参数为节点标签名，返回值为一组具有该标签名的节点
document.getElementsByClassName()
// 参数为节点classname，返回值为一组具有该classname的节点

// 返回一组节点的方法实现的都是HTMLCollection的实例
// 为一类数组结构，可以采用[]按数字顺序(item()方法)或是直接按name(namedItem()方法访问)
// 采用name放回时，按name访问仅获取到第一个

// (6)兼容性检测
document.implementation.hasFeature()
// 该方法返回布尔值表示是否兼容
// 第一个参数为检测内容,第二个参数为版本
// 逐渐淘汰后,默认返回值为true

// (7)添加内容
document.write();
document.writeln();
// 参数为写入内容字符串,witeln会在末尾自带一个换行
// 在页面加载未完成时,直接在文档中写入内容,其会在对应位置转化为节点树的一部分
// 若在页面加载完成后调用方法,会表现为对页面重写
// 不能直接包含</script>标签,需进行转义为<\/script>
document.open();
document.close();
// 打开和关闭网页流


// 3.DocumentType类型
// 文档中的<!DOCTYPE>标签在DOM描述为DocumentType类型的节点
nodeName
// 表示DocumentType的字符串
nodeValue=null
nodeType=10
parentNode
// 父节点为Document类型
// 无子节点
document.doctype
// 该属性指向在文档中的DocumentType节点类型的一个对象实例
document.doctype.name
// 指向紧跟其后用于声明文档类型的字符


// 4.DocumentFragment类型
nodeValue=null
nodeName
// 表示该类型的字符串
nodeType=11
parentNode=null
// 无子节点

// 在节点树种没有体现的节点类型,表现为轻型的文档形式
// 用于作为与文档的中间仓库形式
document.createDocumentFragment()
// 创建DocumentFragment类型的一个节点
// 可以在该节点种添加任意子节点以及子节点树
// 采用插入节点方法将DocumentFragment类型的节点作为参数时,会将其子节点树整个添加到调用方法的节点上
// 从而实现一次性操作添加文档内容,避免多次修改渲染问题


// 5.Element类型
// 文档中的元素(标签)在DOM中实现为Element类型的节点
nodeName=tagName
// 元素标签名,在HTML为大写,XML为原始大小写
nodeValue=null
nodeType=1

// (1)HTMLElement属性
// 在HTML文档中,Element派生出HTMLElement
// 所有的元素标签均为HTMLElement或是其子类的实例
// 继承至HTMLElemnt的属性可以便捷访问元素节点属性
element.id;
// 元素节点id属性
element.className;
// 元素节点className属性
element.lang;
// 元素节点lang属性
element.dir;
// 元素节点dir属性
element.title;
// 元素节点title属性
// 这些属性均可进行访问和修改,修改结果会实时渲染到页面

// (2)操作属性方法
element.getAttribute();
// 参数为属性名,返回属性值
element.setAttribute();
// 第一个参数为属性名,第二个参数为属性值
element.removeAttribute();
// 参数为属性名.会移除整个属性

// 对于HTMLElement属性和HTML公认属性可以通过.属性方式来进行访问和修改添加
// 对于自定义属性,仅能通过上述方法进行操作
// 在获取属性方法,对于style属性和事件属性,会返回相应的源码字符串
// 在用.属性访问时,上述两类会返回对于对象以及函数


// (3)创建元素
document.createElement();
// 参数为元素标签名
// 创建为孤儿元素,可以添加对于的节点关系,再添加到节点树上

// (4)Attributs属性
element.attributes
// 该属性存储以属性节点组成的类数组形式的NamedNodeMap对象实例
// 属性节点表示为namedItem，也可以按排序访问
// 通过[]以排序顺序(item()方法)以属性名(namedItem()方法)访问
element.arrtibutes.getNamedItem()
// 参数为属性名，返回属性节点
element.attributes.setNamedItem()
// 参数为属性节点
element.arrtibutes.removeNamedItem()
// 参数为属性名，返回值为删除的属性节点

// 该属性在要求遍历节点所有属性时常用


// 6.Attr类型
// 元素节点中的属性信息在DOM中表现为Attr节点类型
nodeName
// 属性名
nodeValue
// 属性值
nodeType=4
parentNode=element
// 无子节点

// 相关属性
attr.name;
// 属性名
arrt.value;
// 属性值
attr.specific;
// 属性是否为默认值
document.createAttribute();
// 参数为属性名，返回一个属性节点，后续可以添加属性值

// 利用属性节点操作元素节点属性
element.getAttributeNode();
// 参数为属性名，返回值为属性节点
element.setAttributeNode();
// 参数为属性节点，在该元素节点中添加该属性
element.removeAttributeNode();
// 参数为属性名，返回值为属性节点


// 7.Text类型
// 文档中的文本信息在DOM中表现为Text类型节点
nodeName
// 表示该类型的字符串
nodeType=3
nodeValue=data
parentNode=element
// 无子节点

// (1)文本操作方法
text.appendText();
// 第一个参数为插入位置，第二个参数为文本内容
// 在紧跟插入位置后插入文本内容
text.deleteText();
// 第一个参数为删除位置，第二个参数为删除数量
// 删除包括删除位置开始的数量个文本
text.substringText();
// 第一个参数为复制开始位置，第二个参数为复制数量
// 从包括开始位置复制一定数量的文本并返回
text.replaceText();
// 第一个参数为删除位置，第二个参数为删除数量，第三个参数为插入文本
// 在删除了对应数量的文本后，在删除位置处插入文本

// (2)创建文本节点
document.createTextNode();
// 参数为文本内容，返回一个文本节点实例

// (3)文本节点拆分与合并
// 在文档解析过程中，元素节点仅包含一个子文本节点
// 而在利用DOM进行操作节点时，会出现多个子文本节点，其互为同胞文本节点
element.normalize();
// 在父元素节点上调用该方法，会合并子节点中所有的同胞文本节点，使其规范化
text.splitText();
// 参数为分割位置
// 调用该方法的文本节点会保留从起始到分割位置前闭后开的文本
// 返回值为分割位置到末尾的前闭后开文本


// 8.Conment类型
// 文档中的注释信息表现为DOM的Conment类型节点
// 和Text类型继承同一个基类，具有相同的文本的操作方法
nodeType=8
nodeValue=data
// 注释内容
nodeName
// 表示该类型的字符串
// 无子类
document.createComment();
// 参数为注释内容，返回值为Conment的实例


// 9.CDATASection类型
nodeName
// 表示该类型的字符串
nodeValue
// 区域内的值
nodeType=4
// 无子类
// 为Text类型派生，具有相同的文本操作方法，特指在XML中的一段区域
document.createCDATASection();
// 参数为区域名，返回一个区域实例
// 在HTML中多被表现为Element类型和Text类型