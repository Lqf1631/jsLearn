// Web Crypto API
// 生成真随机数的API
Math.random();
// 按一定算法生成，0-1之间的双精度浮点值的伪随机数，具有一定的规律，一般用于将需要提供随机数进行计算的位置
crypto.getRandomValues(new Uint8Array(1));
// 参数为一个规定了长度的定型数组
// 按定型数组的类型和长度，生成在定型数组范围内的随机数填充该定型数组
crypto.getRandomValues(new Uint32Array(1))/0xFFFFFFFF
// 该操作生成了0-1之间的真随机数，为双精度浮点值类型，是Math.random的真随机


// Web CryptoSubtle API
// 对数据进行密码操作的API，此处的数据一般为以ArrayBuffer为格式的二进制数据，且以下的密码操作，返回值为一个期约，故需搭配期约或异步函数进行异步操作
crypto.subtle
// 该属性返回一个CrytoSubtle的实例，可以在该实例上调用相关密码学的方法进行操作

// 密码摘要数据
let digest=crypto.subtle.digest("SHA-258",ArrayBuffer);
// 第一个参数为摘要算法字符串，第二个参数为ArrayBuffer的一个定型数组，存储着需要返回密码学摘要的数据
// 返回对象为一个期约，落定为一个密码学摘要，形式为指定算法计算出的ArrayBuffer实例，用于存储密码学摘要
Array.from(new Uint8Array(digest)).map((x)=>{return x.toString(16).padStart(2,'0')}).join("");
// 将ArrayBuffer内存储的二进制数据转化为Uint8的定型数组，再将其创建一个新数组，调用转为为16进制字符串，并再指定位置填充后拼串
// 将二进制数据的密码学摘要转化为16进制的字符串进行操作

// 密钥对象
crypto.subtle.generateKey(param,true,keyUsages);
// 第一个参数为加密算法对象，包含了加密算法信息，第二个参数布尔值，是否可以从密钥对象中直接提取密钥数据
// 第三个参数为密钥对象的行为的字符串数组，限制了返回的密钥对象可以操作的方法
// 该方法返回一个期约，落定为一个密钥对象CryptoKey
let param1={
    name:"ECSSA",
    namedCurve:"P-256"
}
let keyUsages1=["verify","sign"]
// 在该算法对象下，返回非对称密钥，可以进行私有密钥签名和公开密钥验证操作

// 从密钥对象导出密钥数据，导入密钥数据到密钥对象
crypto.subtle.exportKey("jwk",CryptoKey);
// 第一个参数为密钥数据类型字符串，第二个参数为密钥对象
// 返回一个期约，落定为给的形式的密钥数据ArrayBuffer，从密钥对象中导出密钥数据
crypto.subtle.importKey("jwk",keyArrayBuffer,param,true,keyUsages);
// 参数为导出密钥方法和创建密钥对象方法的参数组合
// 根据提供的参数以及密钥数据，生成一个对应的密钥对象

// 利用非对称密钥，对数据进行签名和验证操作
let signedArrayBuffer=crypto.subtle.sign(signParam,privateKeyObj,ArrayBuffer);
// 第一个参数为签名算法对象，第二个参数为私有密钥对象，第三个参数为存储在ArrayBuffer中的数据
// 使用私有密钥，按照对应签名算法，对一个二进制数据进行签名，返回一个期约，落定为签名后的数据ArrayBuffer
crypto.subtle.verify(signParam,publicKeyObj,signedArrayBuffer,ArrayBuffer);
// 第一个参数为对应签名的算法对象，第二个参数为公开密钥对象，第三个参数为签名后的数据，第四个参数为原数据
// 使用公开密钥以及对应的签名算法，验证签名后的数据和原始数据的一致性，返回一个期约，落定为布尔值

// 利用对称密钥对数据进行加密和解密操作
let encryptData=crypto.subtle.encrypt(encryptParam,keyObj,data);
// 第一关参数为加密算法，第二个参数为对称密钥对象，第三个参数为待加密数据
// 利用对称密钥对象，按照加密算法对待加密数据进行加密，返回一个期约，落定为加密后的数据
let decryptData=crypto.subtle.decrypt(encryptData,keyObj,encryptData);
// 第一个参数为加密算法，第二个参数为对称密钥对象，第三个参数为待解密数据
// 利用对称密钥对象，按照对应的加密算法，对加密数据进行解密，返回一个期约，落定为解密后的数据

// 包装和解包
// 对于一个密钥对象，在非安全的渠道下，可以利用一个包装解包密钥对象对其进行包装和解包操作
let key=crypto.subtle.wrapKey("raw",keyObj,wrapKeyObj,wrapKeyParam);
// 第一个参数为密钥数据类型字符串，第二个参数为待包装密钥对象，第三个参数为包装密钥对象，第四个参数为包装算法对象
// 利用包装密钥对象对待包装密钥对象进行包装，返回一个期约，落定为指定类型数据的密钥数据ArrayBuffer，实质包含了导出密钥数据操作
let unwrapKeyObj=crypto.subtle.unwrapKey("raw",key,wrapKeyObj,wrapKeyParam,param,true,keyUsages);
// 第一个参数为密钥数据类型字符串，第二个参数为包装密钥数据，第三个参数为包装密钥对象，第四个参数为包装密钥算法，后续参数为创建密钥对象的参数
// 实质是将包装的密钥数据按对应数据类型，包装对象和包装算法进行解包，再将解包后的密钥数据按相关参数进行导入操作，创建一个新的解包后的密钥对象
// 返回一个期约，落定为解包后的密钥对象

// 主密钥派生密钥
crypto.subtle.deriveBits(param,keyObj,length);
// 第一个参数为派生算法对象（基于原密钥对象的算法进行改进），第二个参数为主密钥对象，第三个参数为派生密钥长度
// 返回一个期约，落定为派生密钥数据，类型为ArrayBuffer
crypto.subtle.deriveKey(param,keyObj,deriveParam,true,keyUsages);
// 第一个参数为派生算法对象（基于原密钥对象的算法进行改进），第二个参数为主密钥对象，后续参数为创建密钥对象的参数
// 返回一个期约，落定为指定类型的密钥对象
// 实质是根据派生算法和主密钥，派生出派生密钥数据，再将数据创建指定类型的对象，实质包含导入操作


