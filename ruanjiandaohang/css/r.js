(function(g){if(typeof Object.create!=="function"){Object.create=function(proto,propertiesObject){if(typeof proto!=='object'&&typeof proto!=='function'){throw new TypeError('Object prototype may only be an Object: '+proto);}else if(proto===null){throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");}if(typeof propertiesObject!='undefined')throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");function F(){}F.prototype=proto;return new F()}}

var createCurry=function(fn,args){if(args.length>=fn.length){return fn.apply(fn,args)}return function(){if(arguments.length==0)arguments=[null];return createCurry(fn,args.concat([].slice.apply(arguments)))}}
  
var curry=function(fn){if(typeof fn!='function')return null;return function(){if(arguments.length==0)arguments=[null];return createCurry(fn,[].slice.apply(arguments))}};

var flow=function(){var args=arguments;return function(x){for(var i=0;i<args.length;i++){if(typeof args[i]=='function'){x=args[i].call(null,x)}}return x}};var match=curry(function(q,str){return String.prototype.match.call(str,q)||[]});var replace=curry(function(q,r,str){return String.prototype.replace.call(str,q,r)});var trim=replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,'');var pad=curry(function(right,add,len,str){if(!isExist(right))right=false;if(!isExist(add))add='0';str=parseInt(str);if(!isString(str))str=str+'';var needLen=len-str.length;var needStr='';while(needStr.length<needLen){needStr+=add}needStr=needStr.substring(0,needLen);return right?str+needStr:needStr+str});

var checkType=curry(function(type,x){switch(type){case'array':return Object.prototype.toString.call(x)==='[object Array]';break;case'object':return Object.prototype.toString.call(x)==='[object Object]';break;case'regexp':return Object.prototype.toString.call(x)==='[object RegExp]';break;default:return typeof x==type}});var isObject=checkType('object');var isFunction=checkType('function');var isString=checkType('string');var isNumber=checkType('number');var isBoolean=checkType('boolean');var isArray=checkType('array');var isRegExp=checkType('regexp');var isExist=function(x){return x!=null};var isEmpty=function(x){if(!isExist(x))return true;if(isArray(x))x=x.toString();if(isString(x))return trim(x).length===0;if(isObject(x)){for(var p in x){if(x.hasOwnProperty(p)){return false}}return true}if(Math.abs(x-0)===0)return true;return false};var isNotEmpty=function(x){return!isEmpty(x)};var getDocument=curry(function(prop,get){return document.documentElement[prop]||document.body[prop]||0});var clientWidthBigThen=curry(function(w,get){return getDocument('clientWidth','')>=w});var isIos=flow(match(/(iPhone|iPod|ios|iPad)/i),isNotEmpty);var isAndroid=flow(match(/Android/i),isNotEmpty);var isOtherMobile=flow(match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i),isNotEmpty);var isMobile=function(){var u=navigator.userAgent;if(isIos(u))return'ios';if(isAndroid(u))return'android';if(isOtherMobile(u))return'mobile';return false};var deepCopy=function(sth){var re;if(isObject(sth)){re={};for(var key in sth){if(sth.hasOwnProperty(key)){re[key]=this.deepCopy(sth[key])}}}else{re=sth}return re};var toArray=function(sth){var re=[];if(isObject(sth)){for(var key in sth){if(sth.hasOwnProperty(key)){if(isObject(sth[key])){re.push(this.toArray(sth[key]))}else{re.push(sth[key])}}}}else{re.push(sth)}return re};var jsonEncode=function(str){return JSON.stringify(str)};var jsonDecode=function(str){var opt;try{opt=JSON.parse(str)}catch(e){opt=null;console.dir(e)}return opt};var isDate=match(/^\d{4}[-\/][01]\d[-\/][0-3]\d(\s+[0-2]\d(:[0-5]\d(:[0-5]\d)?)?)?/gi);var dateDiff=function(f,b,a){if(!isString(b)||!isString(a)||!isDate(b)||!isDate(a)){console.dir('date format is wrong');return null}b=new Date(replace(/\-/g,'/',b)).getTime();a=new Date(replace(/\-/g,'/',a)).getTime();if(isNaN(b)||isNaN(a)){console.dir('date format is wrong');return null}var diff=a-b;var div=1;switch(f){case'week':div=7*24*3600*1000;break;case'day':div=24*3600*1000;break;case'hour':div=3600*1000;break;case'minute':div=60*1000;break;case'second':div=1000;break;default:div=1}return Math.floor(diff/div)};var getCookie=function(name){var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");if(arr=document.cookie.match(reg)){return decodeURIComponent(arr[2])}return''};

var setCookie=function(cname,cvalue,exdays,currentPath){if(!isExist(exdays))exdays=1;exdays=exdays-0;if(isNaN(exdays))exdays=1;if(!isExist(currentPath)){path=';path=/'}else{path=''}var d=new Date();d.setTime(d.getTime()+(exdays*24*60*60*1000));var expires="expires="+d.toUTCString();document.cookie=cname+"="+encodeURIComponent(cvalue)+"; "+expires+path};var delCookie=function(name){setCookie(name,"",-1)};var returnTrue=function(){return true};var returnFalse=function(){return false};var of=function(x){return function(){return x}};var getSingle=function(fn){var x;return function(){return x||(x=fn.apply(x,arguments))}};var Lizus={curry:curry,flow:flow,of:of,getSingle:getSingle,returnFalse:returnFalse,returnTrue:returnTrue,match:match,replace:replace,deepCopy:deepCopy,toArray:toArray,jsonEncode:jsonEncode,jsonDecode:jsonDecode,lpad:pad(),rpad:pad(true),getCookie:getCookie,setCookie:setCookie,delCookie:delCookie,isObject:isObject,isString:isString,isBoolean:isBoolean,isNumber:isNumber,isArray:isArray,isFunction:isFunction,isRegExp:isRegExp,isExist:isExist,isEmpty:isEmpty,isNotEmpty:isNotEmpty,dateDiff:dateDiff,clientWidthBigThen:clientWidthBigThen,getDocument:getDocument,};var lizus=Object.create(Lizus);lizus.trim=trim;lizus.isMobile=isMobile;lizus.sm=clientWidthBigThen(768);lizus.md=clientWidthBigThen(992);lizus.lg=clientWidthBigThen(1200);lizus.st=getDocument('scrollTop');lizus.ct=getDocument('clientHeight');lizus.cl=getDocument('clientWidth');g.orz=lizus})(window);

(function($){orz.isjQuery=function(x){return x instanceof jQuery};orz.isScrolling=function(){if($('body').hasClass('scrolling'))return true;return false};orz.startScroll=function(j){$('body').addClass('scrolling');if(orz.isjQuery(j)){j.trigger('startScroll')}};orz.endScroll=function(j){$('body').removeClass('scrolling');if(orz.isjQuery(j)){j.trigger('endScroll')}}})(jQuery);

(function($){orz.scrollTo=function(j,offset,speed){if(orz.isMobile())return;if(orz.isScrolling())return;if(!orz.isjQuery(j))return;var t=j;if(t.length<1)return;var that=$(this);var diff=offset-0;var s=1000;var st=orz.st();var offset=t.offset();var l=offset.top;if(!isNaN(diff))l=l+diff;var len=Math.abs(st-l);if(isNaN(speed)||speed<=0)speed=s*len/4000;orz.startScroll(that);$('html,body').animate({scrollTop:l},speed,function(){orz.endScroll(that)});return false}})(jQuery);jQuery(function($){function getID(j){var href=j.attr('data-href');if(!href){href=j.attr('href')}var rs=href.split('#');var lh=location.href;var lhrs=lh.split('#');if(rs[0]&&rs[0]!=lhrs[0]){return''}return rs.pop()}$('body').on('click','.auto-scroll',function(){if(orz.isMobile())return;if(orz.isScrolling())return;var target=getID($(this));if(!target)return;var t=$('#'+target);if(t.length<1)return;var that=$(this);var diff=$(this).attr('data-offset')-0;var speed=$(this).attr('data-speed')-0;orz.scrollTo(t,diff,speed);return false})});

(function($){var p=$('.part');if(p.length<1)return;var arr=[];function part_offset_top(){p.each(function(){var of=$(this).offset();arr.push(Math.floor(of.top))})}function goto_current(index){var a=$('#goto dd');var b=$('#goto dt');if(a.length<1)return;var h=a.outerHeight();if(!a.eq(index).hasClass('current')){a.removeClass('current');a.eq(index).addClass('current');b.animate({'top':h*index+(a.outerHeight()-b.outerHeight())/2+1},50)}}function window_scroll(){var st=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;var limit=Math.ceil(st+20);var index=0;for(var i=0;i<arr.length;i++){if(limit>=arr[i]){index=i}else{break}}if(index<0)index=0;if(!p.eq(index).hasClass('current')){p.removeClass('current');p.eq(index).addClass('current');goto_current(index)}}part_offset_top();setTimeout(window_scroll,0);$(window).on('scroll',window_scroll)})(jQuery);

(function($){var s=$('.sidebar');if(s.length<1)return;var c=s.children('.content-sidebar');if(c.length<1)return;var $parent=s.parent();if($parent.length<1)return;var start=0,stop=0,cHeight=0;function init(){var soffset=s.offset();start=soffset.top;stop=start+$parent.height();cinit()}function cinit(){cHeight=c.height()}function cClear(){c.removeClass('fixed');c.removeClass('absolute')}function check_scroll(){var st=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;if(st<=start){cClear()}if(st>=stop-cHeight){c.removeClass('fixed');c.addClass('absolute');return}if(st<stop-cHeight&&st>start){c.removeClass('absolute');c.addClass('fixed')}}var dl=$('.content-sidebar dl');if(dl.length<1)return;var $part=$('.part');if($part.length<1)return;var arr=[];$part.each(function(){var title=$(this).attr('data-title');var id=$(this).attr('id');if(title&&id){arr.push({title:title,id:id})}});var html='';html+='<dt><span class="show-list"></span></dt>';for(var i=0;i<arr.length;i++){html+='<dd><a href="#'+arr[i].id+'" class="auto-scroll" data-offset="-20" data-speed=500>'+arr[i].title+'</a></dd>'}dl.html(html);init();check_scroll();$(window).on('resize',init);$(window).on('scroll',check_scroll);window.onload=function(){init()}})(jQuery);

/*禁止右键*/
document.oncontextmenu = function(){return false};

