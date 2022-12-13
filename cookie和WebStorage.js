// cookie 客户端存储技术，即将客户特有的信息存储在客户端上
// cookie技术由服务器设置，服务器返回的HTTP响应头部包含cookie的设置信息，浏览器接受响应后按设置信息创建cookie，并在设置条件下发送每次请头部求包含cookie
// HTTP响应头部信息设置cookie：
// Set-Cookie:name=value;expires=time;domain=.work.com;path=/;secure
// name和value为cookie的名和值，必须经过URL编码
// expires为过期时间，为规定的时间格式，在设置后会在浏览器中保存到过期时间，未设置会在结束会话后立即删除
// domain为创建cookie的域，对应的cookie仅在该域下才会随请求头部发送到服务器，可以设置为子域
// path为路径，即仅在该域下包含该路劲的页面才会将cookie随请求头部发送到服务器
// 设置cookie仅在服务器响应头部发送给浏览器，浏览器请求头部仅包含name=value的键值对

// cookie限制：由于cookie会在请求头部发送，故限制cookie的大小，避免影响性能，不适合大规模存储数据
// 每个域cookie的个数有限，总字节数有限
// 单个cookie的字节数有限
// 浏览器的cookie个数有限
// 限制cookie的通信：即浏览器请求头部包含cookie键值对，以及服务器响应头部包含Set-cookie以保证指定域内访问指定的cookie
// 浏览器限制cookie的存储，不被恶意利用

// 子cookie：为避免超过域对cookie的个数限制，嵌套设置键值对信息，实现子cookie
// 格式为：name=name1=value1&name2=value2&name3=value3

// JS相关cookie操作，利用类进行封装
// 不含子cookie
class CookieUtil{
    static set(name,value,expires,domain,path,secure){
        // 参数分别为cookie名，cookie值，cookie时间，cookie域，cookie路径，以上为字符串形式，cookie安全为布尔值
        let cookie=`${encodeURIComponent(name)}=`;
        cookie+=`${encodeURIComponent(value)}`;
        if(expires){
            cookie+=`; expires=${expires}`;
        }
        if(domain){
            cookie+=`; domain=${domain}`;
        }
        if(path){
            cookie+=`; path=${path}`;
        }
        if(secure){
            cookie+=`; secure`;
        }
        document.cookie=cookie;
    };
    // 设置cookie

    static get(name){
        let URLName=encodeURIComponent(name);
        let start=document.cookie.indexOf(URLName);
        if(start!==-1){
            // 能找到对应name
            let end=document.cookie.indexOf(";",start);
            if(end==-1){
                // 以name=value结尾，即在最后位置
                end=document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(start+URLName.length+1,end)); 
        }
        return null;
    };
    // 获得对应cookie,根据name获取value
    
    static delete(name,value,domain,path,secure){
        this.set(name,value,new Date(0),domain,path,secure);
    };
    // 删除对应cookie
}

// 包含子cookie的封装，实质是将子cookie作为父cookie值value以对象形式传入，再对对象操作转换为字符串
class SubCookieUtil{
    static getAll(name){
        let URLName=encodeURIComponent(name);
        let start=document.cookie.indexOf(URLName);
        if(start!==-1){
            // 能找到对应name
            let end=document.cookie.indexOf(";",start);
            if(end==-1){
                // 以name=value结尾，即在最后位置
                end=document.cookie.length;
            }
            let value=document.cookie.substring(start+URLName.length+1,end);
            let arr=value.split("&");
            let valueObj={};
            for(let i=0;i<arr.length;i++){
                let subarr=arr[i].split("=");
                valueObj[decodeURIComponent(subarr[0])]=decodeURIComponent(subarr[1]);
            }
            return valueObj;
        }
        return null;
    };
    // 根据name获得全部子cookie

    static getSub(name,subname){
        let obj=this.getAll(name);
        if(obj[subname]){
            return obj[subname];
        }
        else{
            return null;
        }
    }
    // 根据父cookie的name值和子cookie的name值返回value

    static setAll(name,value,expires,domain,path,secure){
        // 参数分别为cookie名，cookie值，cookie时间，cookie域，cookie路径，以上为字符串形式，cookie安全为布尔值
        // cookie值value为包含子cookie键值对的对象
        let cookie=`${encodeURIComponent(name)}=`;
        let arr=new Array();
        for(let name in value){
            arr.push(`${name}=${value[name]}`);
        };
        // 将对象转换为数组，一个键值对对应数组中的一个字符串
        for(let i=0;i<arr.length;i++){
            let subarr=arr[i].split("=");
            if(i==0){
                cookie+=`${encodeURIComponent(subarr[0])}=${encodeURIComponent(subarr[1])}`
            }
            else{
                cookie+=`&${encodeURIComponent(subarr[0])}=${encodeURIComponent(subarr[1])}`
            }
        }
        // 针对包含子cookie的value值需要进行拆分，对子cookie的name和value进行编码，而保留=和&
        if(expires){
            cookie+=`; expires=${expires}`;
        }
        if(domain){
            cookie+=`; domain=${domain}`;
        }
        if(path){
            cookie+=`; path=${path}`;
        }
        if(secure){
            cookie+=`; secure`;
        }
        document.cookie=cookie;
    };

    static setSub(name,subName,subValue,expires,domain,path,secure){
        let value=this.getAll(name);
        value[subName]=subValue;
        this.setAll(name,value,expires,domain,path,secure);
    }
    // 将某一个子cookie的键值对进行修改或添加，再将新的子cookie作为value值设置cookie

    static deleteAll(name,value,domain,path,secure){
        this.setAll(name,value,new Date(0),domain,path,secure);
    }
    // 根据提供的cookie信息（名，值，域，路径和安全）删除对应的cookie

    static deleteSub(name,subName,expires,domain,path,secure){
        let value=this.getAll(name);
        // 以对象形式获得子cookie
        delete value[subName];
        // 删除子cookie键值对
        this.setAll(name,value,expires,domain,path,secure);
    }
}


// WebStorage
// 用于存储不频繁向服务器发送的数据以及需要长期保留的数据
let storage=new Storage();
// 创建Storage对象的实例，该对象用于存储以字符串形式的键值对数据
// 该对象实质为有序的键值对对象，可以通过length和索引进行循环遍历
storage.getItem("name");
// 参数为键，通过键名查找并返回值
storage.setItem("name","value");
// 参数为键，值，设置键值对
storage.removeItem("name");
// 参数为键，删除对应键的键值对
storage.clear();
// 情况所有键值对
storage.key(index);
// 参数为索引，根据索引位置返回键
storage.length;
// 键值对个数

sessionStorage
// 在window对象上定义的storage实例，可以直接使用
// 用于存储会话数据信息，即在页面刷新后仍保存，但在页面关闭后删除的数据
// 采用同步阻塞的方式写入数据，即写入后可以立即访问
// 但在多页面情况下，仅保留初始页面存储的信息

localStorage
// 在window对象上定义的storage实例，可以直接使用
// 用于存储长久的数据信息，除非清空浏览器缓存，否则会一直记录在磁盘中
// 同源（同域，同端口，同协议）的文件会访问到同一个loacalStorge对象

// storage事件
// 在同源的不同文件上，对storage对象进行修改，会在其他文件上触发storage事件
// 该事件为window对象上触发
window.addEventListener("storage",(event)=>{
    event.domain;
    // 触发storage事件的文件的域
    event.key;
    // 修改的storage对象的键
    event.newValue;
    // 修改的storage对象的新值
    event.oldValue;
    // 修改的storage对象的旧值
})
// 该事件不区分sessionStorage和localStorage

// 限制:同源的storage对象的大小限制(同源为一个storage对象)