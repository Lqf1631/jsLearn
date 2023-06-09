// JSON:用于结构化数据，便于数据传输以及数据访问
// 语法：
// 简单值：布尔，字符串，数字，null（无undefined）
// 数组
// 对象：属性名必须使用""，且默认无缩进换行，故需要和JS进行解析与序列化
// JSON无变量，函数，因为仅对数据进行结构化操作

// 序列化：JS格式转化为JSON格式，一般针对对象转化，且默认会跳过函数以及变量
JSON.stringify(js,(key,value)=>{
    switch(key){
        case "":
            return value;
        case "":
            return undefined;
    }
},"--"/4);
// 将JS格式转化为JSON格式
// 第一个参数为待序列化的JS类型的数据，第二个参数为替代函数，第三个参数控制缩进和换行
// 替代函数，第一个参数为属性名，第二个参数为属性值，在替代函数中，根据属性名的差异，对不同的属性值进行操作,再返回属性值
// 返回undefined则删除该属性，属性名为字符串类型，其传入对象时，具有对应属性名，传入非对象时，属性名为空字符串，同时还会对数组进行解构
// 第三个参数控制缩进换行，为数值时为缩进空格数，为字符串时，为以该字符串进行缩进，最大缩进值为10，缩进后默认换行
JSON.parse(json,fun);
// 将JSON格式转化为JS格式
// 第一个参数为待解析的JSON类型的数据，第二个参数为还原函数，与替代函数对应

// JS和JSON转化的方法实质为深复制，即深度访问到堆内存内的数据，将数据进行替代或还原操作，再控制输出数据的形式输出数据

// toJSON()方法=>自定义序列化
const a={
    name:"a",
    value:1,
    toJSON:function(){
        return this.name
    }
    // 不能采用匿名函数形式
}
// 在JS类型的对象中定义该方法，在对其调用JSON.stringify()操作时，会优先调用该方法，返回对应的值，再将值传入后续的替代函数中