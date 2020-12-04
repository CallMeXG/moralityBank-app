//获取日期   今天 num = 0 ; 向前 num为负数 ; 向后，num为正数
function gainDateWithNumber(num) {
  var number = null;
  if (num === null || num === 0) {
    number = 0;
  } else {
    number = num;
  }
  var today = new Date();
  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * number;
  var targetday = new Date();
  targetday.setTime(targetday_milliseconds); //注意，这行是关键代码


  let lastY = targetday.getFullYear();
  let lastM = targetday.getMonth() + 1;
  let lastD = targetday.getDate();

  let startdate = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD);


  return startdate;
}

var now = new Date(); //当前日期
var nowMonth = now.getMonth(); //当前月
var nowYear = now.getFullYear(); //当前年

//获取本周开始日期
function showWeekFirstDay() {
  var Nowdate = new Date();
  var WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
  M = Number(WeekFirstDay.getMonth()) + 1
  return Nowdate.getFullYear() + "-" + (M < 10 ? "0" + M : M) + "-" + (WeekFirstDay.getDate() < 10 ? "0" + WeekFirstDay.getDate() : WeekFirstDay.getDate());
}

//获取本周结束日期
function showWeekLastDay() {
  var Nowdate = new Date();
  var WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
  var WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
  M = Number(WeekLastDay.getMonth()) + 1
  return Nowdate.getFullYear() + "-" + (M < 10 ? "0" + M : M) + "-" + (WeekLastDay.getDate() < 10 ? "0" + WeekLastDay.getDate() : WeekLastDay.getDate());
}


//格式化日期：yyyy-MM-dd
function formatDate(date) {
  var myyear = date.getFullYear();
  var mymonth = date.getMonth() + 1;
  var myweekday = date.getDate();

  if (mymonth < 10) {
    mymonth = "0" + mymonth;
  }
  if (myweekday < 10) {
    myweekday = "0" + myweekday;
  }
  return (myyear + "-" + mymonth + "-" + myweekday);
}

//获得本月的开始日期
function getMonthStartDate() {
  var monthStartDate = new Date(nowYear, nowMonth, 1);
  return formatDate(monthStartDate);
}

//获得本月的结束日期
function getMonthEndDate() {

  var days = getMonthDays(nowMonth);//获取当月总共有多少天
  var monthEndDate = new Date(nowYear, nowMonth, days);
  return formatDate(monthEndDate); //返回当月结束时间
}

function getMonthDays(myMonth) {
  var monthStartDate = new Date(nowYear, myMonth, 1);
  var monthEndDate = new Date(nowYear, myMonth + 1, 1);
  var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
  return days;
}

//根据 时间，毫秒，转化成 天，时分秒
function formatDuring(mss) {
  var days = parseInt(mss / (1000 * 60 * 60 * 24));
  var hours = parseInt(mss / (1000 * 60 * 60));
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = (mss % (1000 * 60)) / 1000;
  return hours + "小时" + minutes + "分";
}

function formatDuringDate(mss) {
  let date = new Date(mms)


}

//根据 时间，毫秒，转化成 天，时分秒
function formatDuringHtml(mss) {
  var days = parseInt(mss / (1000 * 60 * 60 * 24));
  var hours = parseInt(mss / (1000 * 60 * 60));
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = (mss % (1000 * 60)) / 1000;

  let reString = '<span style="font-size: 20px;margin-left: -2px;">'
    + hours
    + '</span><span style="font-size: 12px;\n' +
    'margin-left: -2px;\n' +
    'color: gray;"> 小时 </span>' +
    '<span style="font-size: 20px;margin-left: -2px;">' + minutes + '</span>' +
    '<span style="font-size: 12px;\n' +
    'margin-left: -2px;\n' +
    'color: gray;"> 分</span>'

  return reString;
}

//根据日期，获取礼拜几
function weekDataWithDate(paramDate) {
  var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  var myDate = new Date(Date.parse(paramDate));
  return weekDay[myDate.getDay()]
}

function thisMonthDate() {
  let monthLast = getMonthEndDate()
  let monthCount = monthLast.substr(8, 2)
  let monthArr = []
  for (let i = 0; i < monthCount; i++) {
    let date = monthLast.substr(5, 2) + '-' + (i < 9 ? '0' + (i + 1) : (i + 1))
    monthArr.push(date)
  }
  return monthArr
}

function todayToMonthStart() {
  let monthLast = gainDateWithNumber(0)
  let monthCount = monthLast.substr(8, 2)
  let monthArr = []
  for (let i = 0; i < monthCount; i++) {
    let date = monthLast.substr(5, 2) + '-' + (i < 9 ? '0' + (i + 1) : (i + 1))
    monthArr.push(date)
  }
  return monthArr
}


// 将时间戳转换成日期
function add0(m) {
  return m < 10 ? '0' + m : m;
}

//毫秒转标准日期格式
function formatDate(timeStamp) {
  let time = new Date(timeStamp),
    y = time.getFullYear(),
    m = time.getMonth() + 1,
    d = time.getDate(),
    h = time.getHours(),
    mm = time.getMinutes(),
    s = time.getSeconds();

  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}

function checkPhoneNumber(phoneNum) {
  console.log('aaaaa===',phoneNum)
  if (!(/^1[3456789]\d{9}$/.test(phoneNum))) {
    return false;
  } else {
    return true;
  }
}

function userIsSign(userMsg){
  if (userMsg === null || userMsg === undefined || userMsg === ''){
    return false;
  }
  else {
    return true;
  }
}
