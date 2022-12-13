// XML:以HTML格式的形式对数据进行结构化，在访问操作XML数据时，可以采用DOM的形式

// XML DOM
// 检验
document.implementation.hasFeature("XML","2.0");
// 已弃用，均返回true

// 创建XML文档，创建完成后XML文档为DOM形式，可以使用DOM进行操作
let xmldom1=document.implementation.createDocument("","root",null);
// 第一个参数为命名空间uri，第二个参数为XML文档中的documentElement文档元素的字符串，一般使用root，第三个参数为doctype文档类型，会在XML中创建一个文档类型标签
// 一般不常用第一第三个参数，故传值为""和null
// 返回一个Document类型的实例，可以访问到XML文档的document节点
let child=xmldom1.createElement("child");
xmldom1.documentElement.appendChild(child);
// 在XMLdocument节点上创建元素节点并添加到xml文档中，利用DOM实现结构化数据，但一般使用较少

// 解析XML文档字符串，将其转化为可操作的XMLDOM树结构
let parser=new DOMParser();
// 创建一个XML解析器实例
let xmldom2=parser.parseFromString("<root><child>aaaa</child></root>","text/xml");
// 第一个参数为XML文档字符串，第二个参数为解析的类型，为"text/xml"
// 返回一个以XML文档字符串解析后的XML文档的Document类型的实例
// 在解析错误时，根据浏览器不同，会将<parserError>作为root或在错误位置插入后返回，其中包含了错误信息

// 序列化XML文档，将其转化为字符串形式
let serializer=new XMLSerializer();
// 创建一个XML序列化器
let xmlstr=serializer.serializeToString(xmldom1);
// 参数为任意类型的DOM节点，可以为XML或HTML
// 返回值为以DOM序列化后的字符串


// XPath：利用XPath表达式，在XML文档中匹配对应节点
// XPath Evalueator对象：XPath的求值器对象，其上定义了与XPath求值匹配的相关方法，但是可以直接在XML的Document对象实例上调用
xmldom1.createExpression(ex,NSResolver);
// 第一个参数为XPath表达式类型为字符串，第二个参数为命名空间解决器对象，其实质为一函数，以匹配命名空间
// 根据XPath表达式和命名空间，返回一个XPathExpression对象实例，实质为XPath表达式的编译版本
xmldom1.createNSResolver(node);
// 参数为包含命名空间的XML文档的节点，返回值为NSResolver对象
xmldom1.evaluate(ex,node,NSResolver,XPathconst,null);
// 第一个参数为XPath表达式，类型为字符串，第二个参数为查找的上下文节点，第二个参数为NSResolver对象，或相关命名空间转换函数
// 第四个参数为匹配常量，表示返回对象类型，第五个参数为XPathResult对象，用于填充结果，常为null
// 返回一个XPath Result对象

let result=new XPathResult();
// XPath Result对象：XPath的求值方法返回的对象，其上包含了匹配XPath表达式的节点信息

// 匹配常量为集合，即将所有匹配的节点对象收集到该集合，包括有序和无序
result.ORDERED_NODE_ITERATOR_TYPE
// 返回对象包含匹配的有序集合
result.UNORDERED_NODE_ITERATOR_TYPE
// 返回对象包含匹配的无序集合
result.iterateNext();
// 调用该方法，实现节点对象的遍历

// 匹配常量为快照集合，即将快照时刻所有匹配的节点对象收集到快照集合，包括无序和有序
result.ORDERED_NODE_SNAPSHOT_TYPE
// 返回对象包含匹配的有序快照集合
result.UNORDERED_NODE_SNAPSHOT_TYPE
// 返回对象包含匹配的无序快照集合
result.snapshotItem();
result.snapshotLength;
// 类似于NodeList形式的节点数组，采用索引和长度进行遍历

// 匹配类型为单个节点
result.FIRST_ORDERED_NODE_TYPE
// 返回对象为包含第一个匹配的节点
result.singleNodeValue
// 该属性访问匹配的第一个节点

// 匹配类型为数字
result.NUMBER_TYPE
result.numberValue
// 返回对象包含匹配的节点个数
// 未匹配到未NaN

// 匹配类型为布尔值
result.BOOLEAN_TYPE
result.booleanValue
// 返回对象包含是否匹配节点的布尔值

// 匹配类型为字符串
result.STRING_TYPE
result.stringValue
// 返回对象包含第一个匹配节点的第一个子节点(如果为文本节点)
// 否则返回空字符串

// 匹配适应的对象类型
result.ANY_TYPE
result.resultType
// 可以根据该属性访问到对应选用的类型常量

// 命名空间
// 对于使用了命名空间的XML文档,需要传入NSResolver进行命名空间限制匹配
let nsResolver=xmldom1.createNSResolver(node);
// 对于已知XML文档中的某个节点包含了命名空间的定义,则使用该方法返回一个NSResolver
let nsResolver1=function(x){
    // 函数接受一个命名空间的前缀
    switch(x){
        // 根据前缀不同值
        case value:
            return uri;
            // 返回对应前缀命名空间的URI地址
    }
}
// 对于已知命名空间前缀和URI地址时,可以自定义nsResolver


// XSLT：XSLT文档实质为一种样式表文档，可以通过样式表文档，将XML文档转换为各种DOM类型的文档
let processor=new XSLTProcessor();
// 创建一个XSLT文档转换器
processor.importStylesheet(xslt);
// 将xslt文档样式表导入到转换器内
processor.reset();
// 重置转换器，以便导入新的XSLT样式表，重复使用同一个转换器，节约内存空间
processor.transformToDocument(xmldom);
// 参数为XML DOM，将其按XSLT样式表转化为其他类型的DOM，返回一个新类型DOM的Document节点对象
processor.transformToFragment(xmldom,document);
// 第一个参数为XML DOM，第二个参数为文档片段待插入的文档的Document节点对象
// 返回值为一个文档片段的Document节点对象
processor.setParameter(null,"a","A");
// 第一个参数为命名空间的URI，在使用命名空间下为null，第二个参数为设置参数名，第三个参数为设置参数值
// 将转换器中的XSLT样式表的对应参数设置为新值
processor.getParameter("a");
// 参数为转换器XSLT样式表中的对应参数，返回值为参数值
processor.clearParameters();
// 清空转换器中的XSLT样式表中设置的参数