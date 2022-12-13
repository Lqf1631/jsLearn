// HTML模板 API
// 对于需要大量使用同一组的html元素时，可以考虑将其设置为html模板，在使用时直接添加
// 创建html模板=>template标签
<template>
    <p>1</p>
</template>
// 使用该标签时，页面并不会渲染标签内的内容
// 添加模板
let template=document.querySelector("template");
template.content;
// 该属性为一文本片段，实质为documentFragment
div.appendChild(template.content);
// 向div中添加该模板，会一次性将template标签内的内容添加
// template标签实质上包含一个documentFragment的文档片段，标签内容均添加在这一片段内
// 可以使用template.content属性访问到该片段，从而进行相关操作
// 在html中操作template标签，而在JS中实质操作的时template.content的文档片段

// 创建JS模板=>documentFragment
let f=document.createDocumentFragment();
// 创建一个文档片段
f.appendChild(document.createTextNode("aaa"));
// 操作文档片段方法进行添加设置模板
div.appendChild(f);
// 添加模板

// 在文档片段或者template内的元素不会被查询到，即可以保障css样式设置时的独立性（在片段内部进行css样式设置）
// 模板的默认行为为剪切
div.appendChild(f.cloneNode(true));
// 可以调用节点的克隆方法，进行复制


// 影子DOM API
let divShadow=div.attachShadow({mode:"open"});
// 对节点调用该方法，返回该节点的影子节点，参数为一对象，可设置mode类型为open或者closed
// 此时该节点为影子宿主
div.shadowRoot;
// 对于open影子，对影子宿主调用该属性，返回的是影子根，可以访问到该影子DOM，对于closed影子则不能
// 在影子DOM中的元素同样不能被外部查询，仅能在影子DOM内部查询，保障了其样式的独立性（在影子DOM内设置样式）

// 影子DOM中的元素和外部元素可以进行交互，移动

// 投射
// 页面会优先渲染影子DOM，而会覆盖影子宿主
// 默认整体投射：在影子DOM内设置slot标签，可以将影子宿主的子树投射覆盖slot标签
// 对于投射：在影子宿主的标签设置slot属性，对应影子DOM内的slot标签设置name属性，实现对应投射
// 投射的实现为内容，实际的DOM元素仍然存储在影子宿主上

// 事件重定向
// 在影子DOM内的元素触发的事件会外逃到影子宿主，再从外部进行冒泡，而在外部视为是影子宿主触发


// 自定义元素API
// 自定义元素既是DOM实体，也是JS对象，DOM实体中可以在HTML中设置属性值，也可以利用DOM设置，而JS对象同样具有属性值，因此二者的属性需要相互反射对应
class Xelement extends HTMLElement{
    constructor(){
        super();
        // 在构造函数内增加操作时，调用该方法，指向父类的构造函数
        this.flag=true;
        // 构造函数内部可以向该元素设置属性，或者在外部进行手动添加，而此时的属性仅会反应在JS代码内，对使用该标签的HTML无影响

        this.attachShadow({mode:true});
        this.shadowRoot.innerHTML=``;
        this.shadowRoot.appendChild(template);
        // 由于在使用该标签时，会优先进行创建，因此在构造函数内部可以设置影子DOM，而利用影子DOM为该自定义标签设置模板

        // 定义其余构造函数的行为，会在创建实例时触发

    }
    connectedCallback(){
        // 会在该节点连接到DOM上时进行触发
    }
    disconnectedCallback(){
        // 会在该节点离开DOM时触发
    }
    adoptedCallback(){
        // 会在调用document.adopt()时触发
    }

    static get observedAttributes(){
        return ["name"];
    }
    // 设置静态方法的监控属性的获得函数，返回一个对应的属性，该属性会传入到下面的回调函数的name参数中
    attributeChangedCallback(name,oldvalue,newValue){
        // 会在该节点的相关属性值（html上）发生改变时触发
        if(oldvalue!==newValue){
            this[name]=newValue;
        }
    }
    // 在DOM的节点的属性发变化时，会被静态方法监控到，从而将对应属性传给属性改变的回调函数，在回调函数内部，设置JS对象的属性变化
    // 即将DOM相关操作反射到JS中


    get flag(){
        return this.getAttribute("flag");
    }
    set flag(value){
        this.setAttribute("flag",value);
    }
    // 设置对应属性的获得函数和设置函数，会在JS中对相关属性进行修改时，反应到DOM上
    
}
// 自定义元素时，先需要定义该元素的类，一般为继承至HTMLElement或者具体的HTMLElement元素

customElements.define("my-x",Xelement);
// 第一个参数为自定义元素的标签名，第二个参数为自定义元素的类
// 该方法使得该标签为该类的一个具体实例
customElements.get("my-x");
// 参数为标签名
// 该方法会返回该标签的类
customElements.whenDefined("my-x");
// 参数为标签名，在该标签名被定义归类后，会返回一个期约
customElements.upgrade(x);
// 参数为一个自定义的元素节点，会将该自定义的元素节点进行升级
// 有时会先使用自定义元素，再对自定义元素进行定义
// 此时需和上面方法连用，在该标签得到定义归类后，对获得的节点进行更新
