<canvas with="100px" height="100px">不支持canvas</canvas>
// canvs标签内文字当浏览器不支持canvas时，会显示，而canvas标签基础属性为宽和高，即在页面上将该区域作为画布，可以在其上进行绘画操作
let canvas=document.getElementsByTagName("canvas")[0];
// 获得画布节点
let context=canvas.getContext("2d");
// 对画布节点调用该方法，参数为画布形式字符串，返回一个对应格式的画布上下文对象
canvas.toDataURL("img/png");
// 对画布节点调用该方法，参数为图片格式字符串，可以将画布上的内容转化为图片链接并返回，可以在域内进行链接引用
// 在canvas画布上，默认以左上为起始点，向右为x轴正方向，向下为y轴正方向

// 填充和描边属性
context.fillStyle;
// 设置画布的填充属性，可以为CSS格式颜色，渐变对象和图案对象，在后续的填充操作中会使用该属性
context.strokeStyle;
// 设置画布的描绘属性，为CSS格式颜色，在后续描绘操作中会使用该属性

// 渐变设置
let gradient=context.createLinearGradient(x0,y0,x1,y1);
// 在画布上的规定起始两点的位置的区域内创建线性渐变对象并返回
let gradient1=context.createRadialGradient(x0,y0,r0,x1,y1,r1);
// 在画布上的两圆形区域的重叠部分创建渐变对象并返回
gradient.addColorStop(0,"white");
gradient.addColorStop(1,"black");
// 设置渐变对象的渐变位置以及渐变颜色
context.fillStyle=gradient;
// 将画布的填充设置为渐变对象
// 即后续在渐变对象区域内进行填充绘制图案时，其填充属性为渐变对象，按渐变设置对其进行填充

// 图案设置
let draw=context.createPattern(canvas,"repeat");
// 第一个参数为canvas或者img标签中对应的图案数据（同域链接），第二个参数为重复设置，返回一图案对象
// 将对应的图案从画布起始位置开始进行图案设置，设置区域大小默认为图案大小，但可以设置其重复以拓展区域
context.fillStyle=draw;
// 将画布的填充属性设置为图案对象，在该图案对象区域内进行填充绘制图案时，其填充属性为图案对象，按图案设置对其进行填充

// 阴影设置
// 通过对画布阴影属性的设置，来对画布上绘制图案的阴影效果进行修改
context.shadowColor
// 阴影的颜色
context.shadowOffsetX
// 阴影在x方向的偏移值
context.shadowOffsetY
// 阴影在y方向的偏移值
context.shadowBlur
// 阴影的模糊程度，单位为px

// 绘制矩形
context.fillRect(x,y,w,h);
// 按矩形的起始位置和规定宽高和对应画布的填充属性进行矩形绘制，会填充为对应的填充属性，参数为矩形起始位置和矩形的宽高
context.strokeRect(x,y,w,h);
// 按矩形的起始位置和规定宽高和对应画布的描绘属性进行矩形绘制，会将矩形的边框设置为描绘属性值，参数为矩形的起始位置和矩形宽高
context.clearRect(x,y,w,h);
// 按矩形的起始位置和宽高绘制一个矩形，在该矩形区域内，画布所有的绘制会变为透明，实际为按矩形区域进行清除操作,在清除stroke绘制的矩形时，会导致边框变形

// 线条属性
context.lineWidth;
// 设置画布上线条的宽度
context.lineCap;
// 设置画布上线条的端点形式
context.lineJoin;
// 设置画布上线条的交点形式

// 绘制路径
// 一段路径绘制由beginPath开始，由下一个beginPath()结束
context.beginPath();
// 在调用绘制路径方法后，会将对应的路径操作的光标路径记录并绘制出对应路径线条
// 且该方法会清空光标位置
context.moveTo(x,y);
// 将光标位置移动到参数点，在过程中不进行路径记录
context.arc(x,y,r,s,e,false);
// 绘制弧线路径，会将光标位置移动到规定的起始位置，光标会按对应圆心坐标，圆半径，起始角度和结束角度移动，路径为圆弧，可以设置布尔值，表示是否逆时针
context.arcTo(x1,y1,x,y,r);
// 绘制弧线路径，会将光标移动到第一个规定点，并按半径圆弧形移动到第二个规定点
context.bezierCurveTo(cx1,cy1,cx2,cy2,x,y);
// 绘制三次贝塞尔曲线，从光标的当前位置开始到规定点，按两个对应参数的控制点进行绘制
context.quadraticCurveTo(c1x,cy1,x,y);
// 绘制二次贝塞尔曲线，从光标的当前位置开始到规定点，按一个对应参数的控制点进行绘制
context.lineTo(x,y);
// 绘制线段，从光标的当前位置开始到规定点
context.rect(x,y,w,h);
// 绘制矩形，光标将移动到起始位置，并按规定的宽度和高度绘制矩形，该矩形实际为路径线条，并非矩形图形
context.closePath();
// 调用该方法，会将光标从当前位置移动到起始位置并记录路径，形成一个封闭路径
context.fill();
// 将记录的路径封闭图形按填充属性进行填充
context.stroke();
// 按描绘属性，将记录的路径描绘在画布上
context.clip();
// 将对应的路径进行剪切操作
context.isPointInPath(x,y);
// 返回布尔值，判断参数点是否属于画布的路径上

// 绘制文字
// 文字属性：设置文字属性后，后续的文字都将按该属性进行描绘
context.font;
// 按CSS格式设置字体样式
context.textAlign;
// 文字段中心相对于参考点的水平对齐
context.textBaseline;
// 文字段中心相对于参考点的垂直对齐
context.fillText("string",x,y,maxWidth);
// 按填充属性和文字属性在对应参考点位置处绘制对应字符串参数文字,最后一个参数为文字段的最大宽度，在超过宽度时，会在水平方向上缩放,绘制文字为实心
context.strokeText("string",x,y,maxWidth);
// 按描绘属性和文字属性，在对应参考点位置处绘制对应字符串参数文字，最后一个参数为文字段的最大宽度，在超过宽度时，会在水平方向上缩放,绘制文字为空心
let textShape=context.measureText("string");
// 将画布中的对应参数字段字符串的大小信息对象返回
textShape.width;
// 常用该对象的width属性，表示文字段宽度

// 绘制图案
context.drawImage(img,x0,y0,w0,h0,x,y,w,h)
// 第一个参数为canvas或img节点，将从同域内引用的图案绘制到画布的指定位置
// 后续参数为指定原图案中的区域和在现画布上的区域，后续设定的值可以对图案尺寸进行一定程序缩放，但不影响整个画布的变化尺寸

// 图像数据
let dataObj=context.getImageData(x,y,w,h);
// 在画布上规定区域内，获得该区域的图像数据，返回一个图像数据对象
// 该数据对象上有一个data属性,利用数组存储着区域内每一个像素点的信息
let data=dataObj.data;
red=data[0];
blue=data[1];
green=data[2];
alpha=data[3];
// 第一个像素点的图像信息，为rgbr的顺序(红，蓝，绿，透明度)
// data对象实际为一数组，每间隔4个为一个像素的全部信息，保存了整个区域内每个像素的图像信息

// 图像变换
// 画布具有一个默认的变换矩阵
context.scale(x,y);
// 将画布的x轴和y轴方向扩大为参数x，y倍
context.rotate(Math.PI);
// 将画布沿顺时针方向旋转参数弧度
context.translate(x,y);
// 将画布的原点变化为对应参数位置
context.transform();
// 将画布的变换矩阵与参数矩阵作乘
context.setTransform();
// 将画布的变化矩阵设置为初始值，再与参数矩阵作乘

// 画布属性及变换存储
context.save();
// 将当前的画布属性及变换信息存储到暂存栈内
context.restore();
// 将暂存栈内的存储信息提取出来，设置为当前画布的属性及变换
// 属性及变化信息是存储在暂存栈内，实质为栈形式，先进后出

// 画布合成属性设置
context.globalAlpha
// 0-1之间的数值，表明画布中图像的透明度
context.globalCompositeOperation
// 描述新绘制的图案与画布原有图案的融合行为，为字符串
"source-over"
// 新绘制图案在原图形上边，对其进行覆盖 =>新+旧+新重
"source-in"
// 画布上仅有新图形与原图形的重叠部分，且新图形在原图形上边 =>新重
"source-atop"
// 画布上有新图形和原图形的重叠部分以及原图形 =>旧+新重
"source-out"
// 画布上仅有新图形与原图形的不重叠部分 =>新不重
"destination-in"
// 画布上仅有新图形与原图形的重叠部分，且新图形在原图形下边 =>新不重+旧不重
"destination-over"
// 新图形绘制在原图形下边，原图形对其覆盖 =>新+旧+旧重
"destination-atop"
// 新图形在原图形下边，原图形与新图形不重叠部分透明 =>旧重+新
"destination-out"
// 新图形及原图形重叠部分消失 =>旧不重
"copy"
// 新图形完全取代原图形
"lighter"
// 新图形与原图形重叠区域像素相加，变亮
"xor"
// 新图形与原图形作异或操作 => 新不重+旧不重