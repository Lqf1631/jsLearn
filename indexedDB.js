// indexedDB => 浏览器的大型数据库API，用于存储对象解构的数据
// 存储在本地内存中，对于同源的页面，其数据库唯一，不能跨源访问且限制其数据库的大小
// 与数据库中的数据交互时为异步行为，实现为向数据库发送请求，对请求进行success事件和error事件监测实现异步操作

let openR=indexedDB.open("db",1);
// 直接在全局作用域上调用indexedDB的open方法，用于创建与数据库的连接
// 第一个参数为数据库名，第二个参数为版本信息，为整数
openR.onsuccess((event)=>{
    event.target.result;
    // 该属性指向数据库对象实例
});
openR.onerror((event)=>{
    event.target.errorCode;
    // 该属性为错误信息
});
openR.onupgradeneeded((event)=>{
    let db=event.target.result;
    if(db.objectStoreNames.contains("objStoreName")){
        // 该属性为数据库中对象存储空间名的组合字符串
        db.deleteObjectStore("objStoreName");
        // 如果数据库中原来存在该对象存储空间，则调用该方法进行删除
    }
    db.createObjectStore("objStoreName",{keyPath:"keyName"});
    // 第一个参数为对象存储空间名，第二个参数为将对象存储后用于定位的键，为包含键的对象，该键为待存储对象的特定属性
    // 调用该方法，创建名为参数的数据库对象存储空间

    // 实质上会创建对该对象存储空间进行更新，保证其存在且为空
});
// 该事件仅在该页面下第一次创建或更新数据库版本时才会触发
// 数据库在存储在本地，即创建或更新对本地进行操作，故页面刷新，关闭后再调用open，实际仅进行连接，不更新，不触发该事件
// 该事件一般用于为数据库添加对象存储空间，用于对象数据的存储操作

let db=new IDBDatabase();
let transaction=db.transaction("storeName","readwrite");
// 第一个参数为对象存储空间名，第二个参数为操作权限，包括readonly，readwrite，versionchange
// 在数据库实例上调用该方法，返回在数据库内对应存储空间的相关事务即权限下的操作
transaction.onerror=()=>{};
transaction.oncomplete=()=>{};
// 事务中包含多个对数据库的操作，各个操作均为异步过程，组合成的事务也为异步过程
// 可以通过error和complete事件对事务的完成情况进行监控，所有操作均成功为事务完成，存在报错则事务报错

let store=transaction.objectStore("storeName");
// 在事务实例上调用该方法，返回参数名的对象存储空间，可以在该对象存储空间上进行增删查改的操作
store.add(obj);
store.put(obj);
// 在对象存储空间上添加对象进行存储，参数为作为值的对象
// add在具有相同键时会报错，put会更新值
store.get(key);
// 在该存储空间上查找并返回对应键的值
store.delete(key);
// 在该存储空间上查找并删除对应键的值
store.clear();
// 在该存储空间上清除所有的对象数据
// 以上的方法均为异步操作，返回一个请求，需要对请求进行success和error的事件监控

let cursorR=store.openCursor(range,"nextunique");
// 在存储空间上调用该方法，返回一个创建游标的请求，第一个参数为游标范围，第二个参数为游标方向
// 游标方向：next，nextunique，prev，prevunique分别为顺，顺去重，逆，逆去重
cursorR.onsuccess=(event)=>{
    let cursor=event.target.result;
    // 在游标事件中，该属性为游标对象，指向游标的下一个对象数据
    // 游标是从-1位置开始，当游标移动到最后一个数据后，该属性指向null
    cursor.direction;
    // 游标的方向
    cursor.key;
    // 指向该位置处的对象数据的键
    cursor.value;
    // 指向该位置处对象数据的值
    cursor.primaryKey;
    // 区分为对象存储空间游标还是索引游标

    cursor.update(value);
    // 将该位置处的值用参数值进行更新
    cursor.delete();
    // 删除该位置处的值

    cursor.continue();
    // 游标前进一个位置
    cursor.advance(2);
    // 游标以参数数的步长进行前进
    // 以上的方法均会将游标移动,并重用同一个请求,即可以通过一个游标事件对所有游标移动过程进行多次监控
};

let range=IDBKeyRange.bound("lowKey","upKey",true,true);
// 创建一个设置上下界的范围
let lowRange=IDBKeyRange.lowerBound("lowKey",true);
// 创建一个设置下界的范围
let upRange=IDBKeyRange.upperBound("upKey",true);
// 创建一个设置上界的范围
let only=IDBKeyRange.only("key");
// 创建仅包含一个值的范围
// IDBKeyRange上调用相关方法进行创建
// 参数均为作为边界的键,后续参数为布尔值,true为不含边界

// 对于某些值需要多个键进行定位,将创建对象存储空间时参数传入键为主键
// 选取对象数据的额外属性,用作索引键,创建索引
let index=store.createIndex("indexName","pathName",{unique:true});
// 第一个参数为索引名,第二个参数为属性名,第三个参数为对象,指索引值是否唯一
// 该对象存储空间上调用该方法返回索引对象的实例
index=store.index("indexName");
// 在对象存储空间上调用该方法,可以返回已经创建的索引对象的实例

index.openCursor();
// 可以在索引对象上创建游标，根据索引键进行游标操作
// 此时游标key为索引键，游标值为主键
index.get(indexKey);
// 根据索引键返回对象数据
index.getKey(indexKey);
// 根据索引键返回主键
// 上述方法访问了数据库数据，即均返回一个异步请求对象

index.name;
// 索引名
index.keyPath;
// 索引键
index.unique;
// 索引键是否唯一
index.objectStore;
// 包含索引的存储空间

store.indexNames;
// 该属性为在对象存储空间上所有的索引名组合字符串
store.deleteIndex("indexName");
// 该方法会删除对象存储空间上参数名的索引
// 不访问数据库数据，为同步操作

