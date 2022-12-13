// 定型数组
// JS中数组数据默认为双精度浮点值，为与特定API匹配（如WebGL），需指定数据类型的数据数组

// 1.ArrayBuffer对象
// 提供可以由JS访问的预分配内存
const buf=new ArrayBuffer(6);
// 创建一个大小为6字节的ArrayBuffer的内存区域，赋值给buf变量以便操作
buf.byteLength;
// ArrayBuffer对象的实例具有bytelength属性，为该内存区域的字节大小
buf.slice(4,6);
// 可以调用该方法，复制另一个不同大小的实例


// 2.DataView对象
// 在ArrayBuffer的区域进行数据的操作
// 在字节层面进行二进制操作,利用字符偏移量定位
const data=new DataView(buf,2,3);
// 第一个参数为ArrayBuffer缓冲，第二个参数为对应的索引位置，第三个参数为长度
// 即在ArrayBuffer的预内存上对应索引位置开始，划分一个指定长度的区域进行数据操作
// 需具有一定空间的预内存，否则会报错
data.byteLength
data.byteOffset
// 分别为对应数据操作的字节长度和起始位置
data.buffer
// 可以通过该属性访问对应的Arraybuffer对象实例
data.setInt16(3,20);
// set+对应ElementType方法，第一个参数为字符偏移量位置，第二个参数为写入数据,第三个参数为字节序
// 默认为大端字节序，设置true为小端字节序
// 该方法将在索引位置按字节序写入对应数据
data.getInt16(2,true);
// get+对应ElementType方法，第一个参数为字符偏移量位置，第二个参数为字节序
// 该方法可以按字节序获取对应属性类型的数据
// 默认为大端字节序，设置true为小端字节序


// 3.定型数组（typeedArray）
// 指定数据类型的数组

// (1)创建，创建时需指定数组元素属性类型
var arr=new Int16Array(buf);
// 使用预内存区域进行创建
var arr=new Int16Array(4);
// 使用自有缓冲进行创建
// 长度为4指有4个Int16类型的数据，共8字节
var arr=new Int16Array([1,2,3,4]);
// 在数组的基础上进行填充创建
var arr1=new Int32Array(6);
var arr=new Int16Array(arr1);
// 在定型数组的基础上进行填充创建，自动修改数据类型
var arr=Int16Array.from([2,3,4,5]);
// 调用from方法，对可迭代对象进行填充创建
var arr=Int16Array.of(2,3,4,5);
// 调用of方法，利用一组参数进行创建

// (2)方法，属性
arr.BYTES_PER_ELEMENT
Int16Array.BYTES_PER_ELEMENT
// 返回元素属性的字节数
arr.buffer
// 访问原ArrayBuffer预内存
// 具有与一般数组类似的方法，属性，但定型数组不具有修改数组长度大小的相关方法
// 可以通过for-of迭代

arr.set([1,2,3],2);
// 第一个参数为数组或定型数组,第二个参数为索引
// 在索引位置开始设置数据的定型数组,无返回值
arr.subarray(2,3);
// 返回一个规定原定型数组起始位置到终止位置的复制的定型数组

// (3)上下溢
// 当设置数据超出定型数组的范围时,会按相关规则进行转化
