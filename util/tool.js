/**
 * ############################################################
 * 本脚本放置工具类函数，只做数据处理类工具，不直接对用户层提供服务
 * ############################################################
 */


function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}


/**
 * 获取本周七天的日期
 * retrun [4,5,6,7,8,9,10]
 */
function getWeekList() {
	const dateOfToday = Date.now()
	const dayOfToday = (new Date().getDay() + 7 - 1) % 7
	const daysOfThisWeek = Array.from(new Array(7))
		.map((_, i) => {
			const date = new Date(dateOfToday + (i - dayOfToday) * 1000 * 60 * 60 * 24)
			return date.getDate()
		})
	return daysOfThisWeek
}


function dateFtt(fmt,date)
{ //author: meizz   
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
} 


//SHA1工具包，将字符串编码为utf8码数组，已调试
function encodeUTF8(s) {
	var i, r = [], c, x;
	for (i = 0; i < s.length; i++)
		if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
		else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
		else {
			if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
				c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
					r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
			else r.push(0xE0 + (c >> 12 & 0xF));
			r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
		};
	return r;
};


// 字符串加密成SHA-1 散列 十六进制 40位字符串，已调试
function sha1(s) {
	var data = new Uint8Array(encodeUTF8(s))
	var i, j, t;
	var l = ((data.length + 8) >>> 6 << 4) + 16, s = new Uint8Array(l << 2);
	s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
	for (t = new DataView(s.buffer), i = 0; i < l; i++)s[i] = t.getUint32(i << 2);
	s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
	s[l - 1] = data.length << 3;
	var w = [], f = [
		function () { return m[1] & m[2] | ~m[1] & m[3]; },
		function () { return m[1] ^ m[2] ^ m[3]; },
		function () { return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]; },
		function () { return m[1] ^ m[2] ^ m[3]; }
	], rol = function (n, c) { return n << c | n >>> (32 - c); },
		k = [1518500249, 1859775393, -1894007588, -899497514],
		m = [1732584193, -271733879, null, null, -1009589776];
	m[2] = ~m[0], m[3] = ~m[1];
	for (i = 0; i < s.length; i += 16) {
		var o = m.slice(0);
		for (j = 0; j < 80; j++)
			w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
				t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
				m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
		for (j = 0; j < 5; j++)m[j] = m[j] + o[j] | 0;
	};
	t = new DataView(new Uint32Array(m).buffer);
	for (var i = 0; i < 5; i++)m[i] = t.getUint32(i << 2);

	var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
		return (e < 16 ? "0" : "") + e.toString(16);
	}).join("");

	return hex;
};



module.exports =
	{
		encodeUTF8: encodeUTF8,
		sha1: sha1,
		rand: rand,
		getWeekList: getWeekList,
		dateFtt:dateFtt
	}