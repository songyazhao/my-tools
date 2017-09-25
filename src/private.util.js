/**
 * 数字补0
 * @param {Number} [num] [传入的数字]
 * @param {Number} [n] [n需要的字符长度]
 */
function PrefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}
//例如：传入6，需要的字符长度为3，调用方法后字符串结果为：006

//toFixed计算错误(依赖银行家舍入法的缺陷)解决方法
Number.prototype.toFixed = function(length)
{
    var carry = 0; //存放进位标志
    var num,multiple; //num为原浮点数放大multiple倍后的数，multiple为10的length次方
    var str = this + ''; //将调用该方法的数字转为字符串
    var dot = str.indexOf("."); //找到小数点的位置
    if(str.substr(dot+length+1,1)>=5) carry=1; //找到要进行舍入的数的位置，手动判断是否大于等于5，满足条件进位标志置为1
    multiple = Math.pow(10,length); //设置浮点数要扩大的倍数
    num = Math.floor(this * multiple) + carry; //去掉舍入位后的所有数，然后加上我们的手动进位数
    var result = num/multiple + ''; //将进位后的整数再缩小为原浮点数
    /*
    * 处理进位后无小数
    */
    dot = result.indexOf(".");
    if(dot < 0){
        result += '.';
        dot = result.indexOf(".");
    }
    /*
    * 处理多次进位
    */
    var len = result.length - (dot+1);
    if(len < length){
        for(var i = 0; i < length - len; i++){
            result += 0;
        }
    }
    return result;
}

/**
 * 千位分隔符
 * @param num {Number, Object}
 */
function toThousands(num) {
  return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

//随机颜色生成
var getRandomColor = function(){
  return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6);
}

/* 获得元素的位置信息 */
function getObjXy(obj){
    var xy = obj.getBoundingClientRect();
    var top = xy.top-document.documentElement.clientTop+document.documentElement.scrollTop,//document.documentElement.clientTop 在IE67中始终为2，其他高级点的浏览器为0
        bottom = xy.bottom,
        left = xy.left-document.documentElement.clientLeft+document.documentElement.scrollLeft,//document.documentElement.clientLeft 在IE67中始终为2，其他高级点的浏览器为0
        right = xy.right,
        width = xy.width||right - left, //IE67不存在width 使用right - left获得
        height = xy.height||bottom - top;

    return {
        top:top,
        right:right,
        bottom:bottom,
        left:left,
        width:width,
        height:height
    }
}


/* requestAnimationFrame */
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||// Webkit中此取消方法的名字变了
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

/* transitionend */
function whichTransitionEvent(){
    var t, el = document.createElement('fakeelement'),
        transitions = {
          'transition':'transitionend',
          'OTransition':'oTransitionEnd',
          'MozTransition':'transitionend',
          'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}
/* 监听变换事件! */
var transitionEvent = whichTransitionEvent();
transitionEvent && e.addEventListener(transitionEvent, function() {
    console.log('Transition complete!  This is the callback, no library needed!');
});

/* 探测浏览器种类 */
var isIE = navigator.userAgent.match(/msie|trident/i);
var isEdge = navigator.userAgent.match(/edge\//i);
var isOpera = navigator.userAgent.match(/Opera/i);
var isFF = navigator.userAgent.match(/Firefox/i);
var isChrome = navigator.userAgent.match(/Chrome/i);
var isSafari = navigator.userAgent.match(/Safari/i);
/*Android IOS系统判断*/
var isAndroid = navigator.userAgent.match(/android/i);
var isIOS = navigator.userAgent.match(/(iPhone|iPod|iPad);?/i);
var isQQ = navigator.userAgent.match('MQQBrowser')/* 微信和QQ内置浏览器 */


/* 获取url中"?"符后的字串 */
function GetUrlRequest() {
    var url = decodeURI(location.search);
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1),strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0].trim()] = strs[i].split("=")[1].trim()
        }
    }
    return theRequest;
}


/**
 * 生成指定范围随机整数
 * {Number, String} minnum 最小值
 * {Number, String} maxnum 最大值
 */
function GetRandomNum(minnum , maxnum){
    return Math.floor(minnum + Math.random() * (maxnum - minnum))
}


/**
* JQ扩展 POST方式跳转URL
* {String} url: 要跳转的url
* {Object} args: 附加参数
* {String} type: [get|post]
*/
$.extend({
    JumpURL:function(url,args,type){

        var form = $("<form method='"+ type +"'></form>"),
            input, type = type||'get'
        form.attr({"action":url});
        $.each(args,function(key,value){
            input = $("<input type='hidden'>");
            input.attr({"name":key});
            input.val(value);
            form.append(input);
        });

        form.appendTo(document.body);
        form.submit();
        document.body.removeChild(form[0]);
    }
});


/* 移动端虚拟按键弹出事件 */
var wHeight = window.innerHeight; //获取初始可视窗口高度
$(window).resize(function() { //监测窗口大小的变化事件
    var hh = windows.innerHeight; //当前可视窗口高度
    var viewTop = $(window).scrollTop(); //可视窗口高度顶部距离网页顶部的距离
    if (wHeight > hh) { //可以作为虚拟键盘弹出事件
        $("body,html").animate({
            scrollTop: viewTop + 100
        }); //调整可视页面的位置
    } else { //可以作为虚拟键盘关闭事件
        $("body,html").animate({
            scrollTop: viewTop - 100
        });
    }
    wHeight = hh;
});


/* 检测APP是否存在 */
function check_App (){

    if (navigator.userAgent.match(/android/i)) {
         // 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为
         // 否则打开a标签的href链接
         var isInstalled;
         //下面是安卓端APP接口调用的地址，自己根据情况去修改
         var ifrSrc = 'cartooncomicsshowtwo://platformapi/startApp? type=0&id=${com.id}&phone_num=${com.phone_num}';
         var ifr = document.createElement('iframe');
         ifr.src = ifrSrc;
         ifr.style.display = 'none';
         ifr.onload = function() {
         // alert('Is installed.');
         isInstalled = true;
         alert(isInstalled);
         document.getElementById('openApp0').click();};
         ifr.onerror = function() {
             // alert('May be not installed.');
             isInstalled = false;
             alert(isInstalled);
         }
         document.body.appendChild(ifr);
         setTimeout(function() {
             document.body.removeChild(ifr);
         },1000);
    }
    //ios判断  if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
         //Animation://com.yz.animation
         var isInstalled;
         //var gz = '{"comName":"${com.short_name}","comID":"${com.id}","comPhoneNum":"${com.phone_num}","type":"0"}';
         //var jsongz =JSON.parse(gz);

         //下面是IOS调用的地址，自己根据情况去修改
         var ifrSrc = 'Animation://?comName=${com.short_name}&comID=${com.id}&comPhoneNum=${com.phone_num}&type=0';var ifr = document.createElement('iframe');
         ifr.src = ifrSrc;
         ifr.style.display = 'none';
         ifr.onload = function() {
              // alert('Is installed.');
              isInstalled = true;
              alert(isInstalled);
              document.getElementById('openApp1').click();};
         ifr.onerror = function() {
              // alert('May be not installed.');
              isInstalled = false;
              alert(isInstalled);
         }
         document.body.appendChild(ifr);
         setTimeout(function() {
              document.body.removeChild(ifr);
         },1000);
    }
}


function getStyle(obj,oStyle){//获取非行间元素样式
    if (obj.currentStyle) {
        return obj.currentStyle[oStyle];
    } else{
        return getComputedStyle(obj,null)[oStyle];
    };
}
function nextNode(obj){//获取下一个兄弟节点
    if (obj.nextElementSibling) {
        return obj.nextElementSibling;
    } else{
        return obj.nextSibling;
    };
}
function preNode(obj){//获取上一个兄弟节点
    if (obj.previousElementSibling) {
        return obj.previousElementSibling;
    } else{
        return obj.previousSibling;
    };
}
function firstNode(obj){//获取第一个子节点
    if (obj.firstElementChild) {
        return obj.firstElementChild;//非IE678支持
    } else{
        return obj.firstChild;//IE678支持
    };
}
function lastNode(obj){//获取最后一个子节点
    if (obj.lastElementChild) {
        return obj.lastElementChild;//非IE678支持
    } else{
        return obj.lastChild;//IE678支持
    };
}
//阻止默认事件
function preDefault (objId) {
    document.getElementById(objId).oncontextmenu=function (ev) {
        var Event=ev||window.event;
        Event.preventDefault ? Event.preventDefault() : Event.returnValue=false;
    }
}
//返回顶部
function moveWindowtop (buttonId) {
    window.onscroll=function () {
        var btn = document.getElementById(buttonId);
        var sto = document.body.scrollTop||document.documentElement.scrollTop;
        var timer = null,step = 0;
        btn.onclick = function () {
            var start = sto,end = sto;
            sstep = 0;
            timer = setInterval(function () {
                step++;
                if (step==20) {clearInterval(timer);}
                start -= end/20;
                document.body.scrollTop = start;
                document.documentElement.scrollTop = start;
            }, 30)
        }
    }
}

//获取对象到body的距离
function offsetL (obj) {
    var l = 0,t = 0;
    while (obj) {
        l += obj.offsetLeft;
        t += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return{left:l,top:t};
}
function addEvent(obj,type,fn){//添加事件监听
    if (obj.addEventListener) {
        obj.addEventListener(type,fn,false);
    } else{
        obj.attachEvent('on'+type,fn);
    };
}
// /**
//  *事件添加函数
//  * @param {Object}   obj  需要绑定事件的对象
//  * @param {String}   type 事件类型
//  * @param {Function} fn   事件触发执行的函数
//  */
// function myAddEvent(obj, type, fn) {
//     //标准
//     if (obj.addEventListener) {
//         obj.addEventListener(type, function (ev) {
//             if ( false === fn.call(obj)) {
//                 ev.cancelBubble = true;
//                 ev.preventDefault();
//             }
//         }, false);
//     } else {
//         //IE
//         obj.attachEvent("on" + type, function () {
//             if (false === fn.call(obj)) {
//                 event.cancelBubble = true;
//                 return false;
//             }
//         });
//     }
// }
function removeEvent(obj,type,fn){//删除事件监听
    if (obj.removeEventListener) {
        obj.removeEventListener(type,fn,false);
    } else{
        obj.detachEvent('on'+type,fn);
    };
}
function setCookie(name,value,days) {//设置cookie
        var dates=new Date();
        dates.setDate(dates.getDate()+days);
        document.cookie=name+"="+escape(value)+"; expires="+dates;
    }
function getCookie(name){//获取cookie
    var arr=unescape(document.cookie).split('; ');
    for (var i = 0; i < arr.length; i++) {
        var arr2=arr[i].split('=');
        if (arr2[0]==name) {
            return arr2[1];
        };
    };
    return false;
}
function removeCookie(name){//删除cookie
    setCookie(name,'1',-2);
}


/**
*是否有某个class
* @param   {Object}     obj     需要检测是否含有class的对象
* @param   {String}     sClass  class
*/
function hasClass(obj, sClass) {
    return obj.className.match(new RegExp('(\\s|^)' + sClass + '(\\s|$)'));
}

/**
*添加class
* @param   {Object}     obj     需要添加class的对象
* @param   {String}     sClass  添加的class
*/
function addClass(obj, sClass) {
    obj.className === '' ? obj.className = sClass : obj.className = obj.className + ' ' + sClass;
}

/**
*去掉class
* @param   {Object}     obj     需要去掉class的对象
* @param   {String}     sClass  去掉的class
*/
function removeClass(obj , sClass) {
    if ( hasClass(obj, sClass) ) {
        var reg = new RegExp('(\\s|^)' + sClass + '(\\s|$)','i');
        obj.className = obj.className.replace(reg, '');
    }
}

/**
*切换class
* @param   {Object}     obj     需要切换class的对象
* @param   {String}     sClass  切换的class
*/
function toggleClass(obj , sClass){
    hasClass(obj , sClass) ? removeClass(obj , sClass) : addClass(obj , sClass);
}

/**
 * 清除掉一个nodeList对象中含有sClass这个class值的某个对象上的sClass
 * 注：该nodeList对象中的值最多只能含有想要被清除的class
 * @param   {Object}     nodeList     一个nodeList对象
 * @param   {number}     len          这个nodeList对象的长度
 * @param   {string}     sClass       想要清除的class名
 */
function clearClass(nodeList , len , sClass) {
    for (var i = 0; i < len; i++) {
        if (nodeList[i].className === sClass) {
            toggleClass(nodeList[i] , sClass);
            break;
        }
    }
}

/**
*hover函数
* @param   {Object}       obj     需要执行classHover的对象
* @param   {function}     fnOver  鼠标移入函数
* @param   {function}     fnOut   鼠标移出函数
*/
function hover(obj , fnOver , fnOut) {
    myAddEvent(obj , 'mouseenter' , fnOver);
    myAddEvent(obj , 'mouseleave' , fnOut);
}

/**
*classHover，主要是有一些hover函数移入移出执行的都是相同的操作：添加或去掉同一个class，因此简化一下
* @param   {Object}       obj     需要执行classHover的对象
* @param   {function}     fn      鼠标移入移出时的函数
*/
function classHover(obj , fn) {
    myAddEvent(obj , 'mouseenter' , fn);
    myAddEvent(obj , 'mouseleave' , fn);
}

/**
*函数节流
* @param   {function}       fn     需要延迟执行的函数
*/
function delayTrigger(fn , delay) {
    var timer = null;

    return function () {
        var context = this,
            args = arguments;

        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context , args);
        } , delay);
    }
}

/**
 * prototype继承函数
 * @param {object}      parent        父类
 * @param {object}      child         子类
 */
function extend(child , parent) {
    var p = parent.prototype,
        c = child.prototype;

    for (var i in p) {
        c[i] = p[i];
    }
}

/**
 * 任意值的缓冲运动框架
 * @param {object}   oEle         想要运动的那个对象
 * @param {json}     json         运动的目标
 * @param {number}   iCtrSpeed    可选，用来控制运动速度，默认为30
 * @param {function｝fn           可选，链式运动函数
 */
function move (oEle , json , iCtrSpeed , fn) {
    clearInterval(oEle.timer);
    if (!iCtrSpeed) {iCtrSpeed = 30;}
    oEle.timer = setInterval(function  () {

        var bStop = true;
        for (var attr in json) {
            var iSpeed = null,
                iCur = null;

            if (attr === 'opacity') {
                iCur = parseInt( parseFloat(getStyle(oEle , attr))*100 );
            } else {
                iCur = parseInt(getStyle(oEle , attr));
            }

            // 缓冲运动速度值
            iSpeed = (json[attr] - iCur)/8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            // 检测是否运动到目标，如果没有继续运动
            if (iCur != json[attr]) {
                bStop = false;
            }
            if (attr === 'opacity') {
                oEle.style.opacity = (iCur + iSpeed)/100;
                oEle.style.filter = 'alpha(opacity:'+ (iCur + iSpeed) +')';
            } else {
                oEle.style[attr] = iCur + iSpeed + 'px';
            }
        }
        if (bStop) {
            clearInterval(oEle.timer);
            fn && fn();
        }
    },iCtrSpeed);
}
