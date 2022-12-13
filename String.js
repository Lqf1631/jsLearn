// String对象

// 1.创建String对象
var str=new String("aaa");
var str=new Object("aaa");
// 采用String引用类型的实例化或者Object引用类型的实例化创建
// Object通过识别实参的类型，可以创建对应原始值的包装类型的实例


// 2.length属性
str.length;
// 属性值为数字，表示字符串的16位码元的数量


// 3.继承方法
str.valueOf();
str.toString();
str.toLocaleString();
// 均返回对应的字符串


// 4.字符方法
str.charAt(1);
// 参数为字符串索引，返回值为对应索引位置的字符
str.charCodeAt(1);
// 参数位字符串索引，返回值为对应索引位置的字符的编码，为10进制
String.fromCharCode(65,64);
// 该方法为String对象本身的方法，参数为字符编码（10进制/16进制），返回值为字符拼串后的字符串

// 涉及到增补平面字符时，其由一个代理对即两个16位的码元组成
// 码点：为16进制的码元时，码点与码元相等，为代理对时，码点为代理对，即两个码元
str.codePointAt(2);
// 参数位字符串索引，返回值为对应索引位置的字符的码点，为10进制
// 若字符串开头位置处为非增补平面字符，该方法返回值混乱
// 可以采用字符串展开成数组，再进行遍历操作[..."aaa"]=>["a","a","a"];
String.fromCodePoint(65,64);
// 该方法为String对象本身的方法，参数为字符码点（10进制/16进制），返回值为字符拼串后的字符串


// 5.规范化方法
str.normalize();
// 参数为对应规范的字符串，字符串可能形式一致而编码不同，进行规范化后，形式一致的字符串比较后为相等
str==str.normalize("NFC");
// 判断字符是否以该种规范进行规范化
let str1="aaa";
let str2="bbb";
str1.normalize("NFD")==str2.normalize("NFD");
// 比较两字符串规范化后是否一致


// 6.操作方法
// (1)提取拼串方法
str.concat("aaa"," bbb");
// 参数为若干个字符串，返回值为拼串后的字符串，实际为复制操作，不影响原字符串
// (2)提取字串方法(不影响原字符串)
str.slice(2,3);
// 两个参数，第二个参数非必须，为空时默认为字符串结束
// 第一个参数指提取开始位置，第二个参数为提取结束位置，前闭后开[)
// 自动排序由小到大，若为负数则变为负数+str.length
str.substring(3,5);
// 两个参数，第二个参数非必须，为空时默认为字符串结束
// 第一个参数指提取开始位置，第二个参数为提取结束位置，前闭后开[)
// 自动排序由小到大，若为负数则变为0
str.substr(4,5);
// 第一个参数为提取开始位置，第二个参数为提取子串的长度
// 第一个参数为负数时变为负数+length；第二个参数为负数时变为0


// 7.索引方法
str.indexOf("aa",2);
// 第一个参数为搜索的字符串，返回值为对应索引位置，未找到返回-1
// 第二个参数为搜索起始位置，正向搜索，找到一个匹配时停止
str.lastIndexOf("aa",2);
// 参数为搜索的字符串，返回值为对应索引位置，未找到返回-1
// 第二个参数为搜索起始位置，反向搜索，找到一个匹配时停止

function index(str,substr){
    let arr=[];
    let i=str.indexOf(substr);
    while(i>-1){
        arr.push(i);
        i=str.indexOf(substr,i+1);
    }
    return arr;
}
// 查找子字符串在对应字符串中的所有位置


// 8.包含方法
str.startsWith("aa",0);
// 第一个参数为包含的子字符串，第二个参数为起始位置，
// 该方法检查从第二个参数起始位置是否为第一个参数的子字符串，返回布尔值
str.endsWith("aa",3);
// 第一个参数为包含的子字符串，第二个参数为字符串的位数
// 该方法检查第二个参数长度的字符串是否以第一个参数的子字符串结尾，返回布尔值
str.includes("aa",2);
// 第一个参数为包含的子字符串，第二个参数为起始位置
// 该方法检查从起始位置开始之后的字符串是否含有子字符串，返回布尔值


// 9.去掉空格方法
str.trim();
// 返回一个去掉起始和末尾位置的空格的字符串副本，不修改原字符串
str.trimEnd();
// 返回一个去掉末尾位置空格的字符串副本，不修改原字符串
str.trimStart();
// 返回一个去掉起始位置空格的字符串副本，不修改原字符串


// 10.重复方法
str.repeat(2);
// 参数为字符串重复次数，返回原字符串重复n次的副本，不修改原字符串


// 11.填充方法
str.padStart("aa",5);
// 第一个参数为填充字符串，默认为空格，第二个参数为最终字符串的位数
// 返回一个第二个参数位数的字符串，由第一个参数重复填充在原字符串的左侧
str.padEnd("aa",5);
// 第一个参数为填充字符串，默认为空格，第二个参数为最终字符串的位数
// 返回一个第二个参数位数的字符串，由第一个参数重复填充在原字符串的右侧


// 12.大小写方法
str.toLocaleLowerCase();
str.toLocaleUpperCase();
str.toLowerCase();
str.toUpperCase();
// 返回大/小写重写之后的字符串，locale方法可以根据当地地区习惯进行大小写改变


// 13.比较方法
str.localeCompare("abc");
// 将原字符串与参数输入字符串按当地地区习惯（一般为字母表顺序进行比较）
// 返回比较结果，负数（-1）为小于，正数（1）为大于，0为等于


// 14.迭代与结构方法
for(const str1 of str){
    console.log(str1);
}
// for-of自动迭代字符串中的字符，可以对每个迭代字符赋值给变量进行操作

let arr=[...str];
// 通过...解构操作符解构字符串为数组

// 手动调用迭代器
let  striterator=str[Symbol.iterator]();
// 通过迭代操作符创建一个迭代器方法
striterator.next();
// 对迭代器方法调用next()方法可以访问每次迭代


// 15.正则相关方法
// (1)匹配方法
str.match(/ata/g);
/ata/g.exec(str);
// 参数为正则表达式或正则对象,为正则exec()方法的镜像，返回匹配的数组
str.search(/a/g);
// 参数为正则表达式或正则对象，返回第一个匹配的字符的位置索引，未匹配成功则返回-1

// (2)替换方法
str.replace(/a/g,"b");
// 第一个参数为正则或字符串，第二个参数为字符串或函数
// 返回一个由第二个参数替换第一个参数的新字符串，在非全局正则时，仅替换一次匹配项

// (3)分割方法
str.split(" ",3);
// 第一个参数为正则或字符串，第二个参数为返回数组位数
// 按第一个参数为分隔符分割字符串，返回分割完成后的数组