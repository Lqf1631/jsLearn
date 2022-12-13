// MutationObserver接口
// MutationObserver接口用于观察DOM节点树中的变化，对变化信息进行记录

// 创建观察实例
let observer=new MutationObserver((MutationRecords,observer)=>{
    console.log(MutationRecords);
    console.log(observer);
})
// 采用构造函数创建实例，参数为一个回调函数，在关联DOM节点变化时，会触发回调函数，其为异步执行过程
// 传给回调函数的参数包含节点变化信息与实例本身，在回调函数中处理相关参数

// MutationRecord实例
// 回调函数的第一个参数为MutationRecord组成的对象数组
// 实例的关联节点每修改一次，会将修改信息创建为一个Mutation实例
// 该实例的相关属性存储着具体的改变信息
type
// 修改类型，包括节点，属性，文本
target
// 修改节点
attributeName
// 修改属性名
attributeNameSpace
// 修改属性空间名
oldValue
// 原始值
addNodes
// 添加子节点的节点列表
removeNodes
// 删除子节点的节点列表
previousSibling
// 修改子节点的上一个同胞节点
nextSibling
// 修改子节点的下一个同胞节点

// MutationObserverInit实例
// 限制观察节点的改变信息
// 其属性对应该节点的该种变化是否能触发回调函数以及相关信息存储
subtree
// 子节点树
// 即DOM节点变化包含其子节点树中的节点
// 一旦建立关联，及时后续子节点被移除节点数，引用关联仍然存在
attributes
// 属性
attributeOldValue
// 属性修改是否记录原始值
attributeFilter
// 字符串数组，设置特定属性修改
childList
// 子节点

// 关联节点
observer.observe(document.body,MutationObserverInit);
// 对实例调用observe方法，进行关联节点
// 第一个参数为节点，第二个参数为控制观察节点信息的对象
// 多重关联
observer.observe(document.documentElement,{childList:true});
// 关联html节点，限制观察其子节点变化
observer.observe(document.body,{attributes:true});
// 关联body节点，限制观察其属性变化
// 可以对同一实例多次调用该方法，使其关联到多个节点

// 解除关联
observer.disconnect();
// 调用该方法会解除实例上所有的关联节点
// 同步调用该方法，由于其回调函数是异步触发，即使在将其推入消息队列后仍会在disconnect后执行，则不会触发回调函数
// 在触发回调函数后解除关联，需要利用setTimeout()将disconnect在回调函数后异步调用
// 重新关联
// 在利用disconnect解除关联后，实例仍然存在，可以利用observe方法进行重新关联
// 重新关联后，新关联DOM在修改时，会触发回调函数
// 由于回调函数是异步执行，需注意整个解除，关联，修改顺序

// MutationObserver性能与内存
// 在关联DOM节点改变后，其改变信息会直接传递到MutationRecord实例，随后传递到MutationObserver实例的记录队列中
// 回调以微任务执行，实现同步触发，当记录列表中没有微任务时，执行回调，保障回调唯一性，同时也使其记录信息数组完整，同步执行时所有关联DOM改变都被记录
// 当回调执行完毕后，记录队列会被清除，释放内存
// 一般修改信息会被回调函数处理
// 而对于采用disconnect在回调之前解除关联的实例
// 如果需要访问实例的MutationRecord信息，可以调用takeRecords方法
observer.takeRecords();
// 方法返回MutationRecord实例数组，同时会清空消息队列
// 清除消息队列后，不会再触发回调函数

// MutationObserver与关联节点为非对称引用
// 关联节点删除，MutationObserver删除
// MutationObserver删除，对关联节点无影响

// MutationRecord实例维持着关联节点的引用
// 对于该实例，尽量通过属性提取信息，再解除引用，完成内存释放
