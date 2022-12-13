// RegExp正则引用类型


// 1.创建正则
// (1)字面量形式
var pattern = /a/i;
// 字面量形式/ /内为正则模式，后加标记表示行为

// (2)引用类型实例化形式
var pattern=new RegExp("a","i");
// 参数均为字符串形式，第一个参数为正则模式，第二个参数为行为
// 采用引用类型创建正则时，可以使用变量拼串的形式来使用变量

// 创建正则时需注意对元字符的转义，选取\转义符在元字符之前进行转义
// 对于采用创建对象的形式时，参数为字符串，可能会多次转义

// 标记行为：
// i:忽略大小写
// g:全局匹配
// y:粘连模式，类似全局，但需要在lastIndex开始进行匹配判断
// u:匹配unicod编码
// s:全部字符，范围比通配符.更大，包括换行回车
// m:多行模式，一行匹配一个


// 2.RegExp实例属性
var A=new RegExp("aaa","i");
A.flags
// 标记的字符串
A.source
// 正则的字符串
A.lastIndex
// 下一步匹配时的起始位置或此步匹配的结束位置
A.dotAll
A.global
A.sticky
A.ignoreCase
A.unicode
A.multiline
// 布尔值，是否采用对应行为

// 3.RegExp继承方法
var A=new RegExp("aaa","i");
A.valueOf();
// 返回正则对象本身
A.toString();
A.toLocalString();
// 返回正则字面量

// 3.RegExp实例方法
// (1)exec()
var A=new RegExp("aaa","i");
var text="1111aaaa";
var B=A.exec(text);
// exec()方法接受参数为字符串，匹配成功返回一个数组，失败返回null一般与捕获组合用，返回数组为捕获组数组
B.input;
// 捕获组数组独有input属性，为正则匹配的字符串
B.index;
// 捕获组数组独有index属性，为正则匹配字符串的起始位置

// 对于全局或粘连匹配正则，使用exec方法时会更新lastIndex属性

// (2)test()
A.test(text);
// test()方法仅检验是否匹配成功，返回布尔值


// 3.RegExp本身属性
// 与test或exec方法联合使用，即在匹配正则后再使用该类属性
RegExp.input;                 RegExp["$_"];
// 正则匹配的字符串
RegExp.lastMatch;             RegExp["$&"];
// 字符串最后匹配的正则
RegExp.lastParen;             RegExp["$+"];
// 字符串最后匹配正则的捕获组
RegExp.leftContext;           RegExp["$`"];
// 字符串最后匹配的正则的左侧字符串
RegExp.rightContext;          RegExp["$'"];
// 字符串最后匹配的正则的右侧字符串