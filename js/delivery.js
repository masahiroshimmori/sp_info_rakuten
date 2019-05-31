// JavaScript Document

/****************
配送時間や発送日はこちらで設定

●時までにの部分はshippingLimitTimeを変更してください。
いつ発送の部分はshippingDayを変更してください。

shippingLimitTimeには注文締め切り時間を入れてください。

【16時までの注文で】の場合は
var shippingLimitTime = 16;←これは説明用なのでここに入れても反応しません！入力はもうちょっと下にあります。

【10時までの注文で】の場合は
var shippingLimitTime = 10;←これは説明用なのでここに入れても反応しません！入力はもうちょっと下にあります。


shippingDayにはいつ発送するかの「出荷までの日付」を入れてください。

当日発送の場合は
var shippingDay = 0;←これは説明用なのでここに入れても反応しません！入力はもうちょっと下にあります。

翌日発送の場合は
var shippingDay = 1;←これは説明用なのでここに入れても反応しません！入力はもうちょっと下にあります。



例えば
var shippingLimitTime = 16;←これは説明用なのでここに入れても反応しません！入力はもうちょっと下にあります。
var shippingDay = 0;←これは説明用なのでここに入れても反応しません！入力はもうちょっと下にあります。
にした場合は
今日の16時までの注文で0日以内に出荷しますという意味になりますので、
本日出荷という意味合いです。

var shippingLimitTime = 16;←これは説明用なのでここに入れても反応しません！入力はもうちょっと下にあります。
var shippingDay = 1;←これは説明用なのでここに入れても反応しません！入力はもうちょっと下にあります。
にした場合は
今日の16時までの注文で1日以内に出荷しますという意味になりますので、
明日出荷という意味合いです。

16時を超えた場合は自動的に日付が繰り上がります。
また繰り上がった際、次に設定します休日分を加味して計算します。
。
******************/

//↓↓入力はここへ↓↓

var shippingLimitTime = 16;
var shippingDay = 0; 
    
//配送時間設定はここまで！次は休業日設定へ↓
    
    
thisDay = new Date();
timeStamp = thisDay.getTime();
myMonth = thisDay.getMonth() + 1;
myDate  = thisDay.getDate();
myHours = thisDay.getHours();
myDay   = thisDay.getDay();
myWeekTbl = new Array( "日","月","火","水","木","金","土" );


/**************

休日の設定はこちら（該当なしの項目は行ごと削除してください）
ここに設定したものを加味して出荷日を計算させます。
※原則土日祝日がお休みになるように記載しました。
また、振り替え休日の設定は不要です。土日と祝日が重なった場合自動的に振り替え休日を加味します。

monthは月、dateは日付、ndayは曜日,nofwは週をあらわす。

**************/
    
function isHoliday (year, month, date, nday) {
  nofw    = Math.floor((date - 1) / 7) + 1;
  shunbun = Math.floor(20.8431+0.242194*(year-1980)-Math.floor((year-1980)/4));
  syubun  = Math.floor(23.2488+0.242194*(year-1980)-Math.floor((year-1980)/4));
  if (month ==  1 && date ==  1)               { return 1; } // 元旦（毎年１月１日）
  if (month ==  1 && nday ==  1 && nofw ==  2) { return 1; } // 成人の日（毎年１月の第二月曜日）
  if (month ==  2 && date == 11)               { return 1; } // 建国記念の日（毎年２月１１日）
  if (month ==  3 && date == shunbun)          { return 1; } // 春分の日（毎年春分の日）
  if (month ==  4 && date == 29)               { return 1; } // 昭和の日（毎年４月２９日）
  if (month ==  5 && date >=  3 && date <=  5) { return 1; } // 憲法記念日～こどもの日（毎年５月３−５日まで）
  if (month ==  7 && nday ==  1 && nofw ==  3) { return 1; } // 海の日（毎年７月の第３月曜日）
  if (month ==  8 && date == 11)               { return 1; } // 山の日（毎年8月11日）    
  if (month ==  9 && nday ==  1 && nofw ==  3) { return 1; } // 敬老の日（毎年９月の第３月曜日）
  if (month ==  9 && date == syubun)           { return 1; } // 秋分の日（毎年９月秋分の日）
  if (month ==  9 && nday ==  2 && nofw ==  3 && date+1 == syubun) { return 1; } // 9月第3火曜の翌日が秋分の日→国民の休日
  if (month == 10 && nday ==  1 && nofw ==  2) { return 1; } // 体育の日（毎年１０月の第二月曜日）
  if (month == 11 && date ==  3)               { return 1; } // 文化の日（毎年１１月３日）
  if (month == 11 && date == 23)               { return 1; } // 勤労感謝の日（毎年１１月２３日）
  if (nday  ==  0)                             { return 2; } // 日曜
  if (nday  ==  6)                             { return 2; } // 土曜

//ここから臨時休業上記以外の休業日または今年限定の休み（例：即位の日・不定期なお盆休みなどの設定）
    
  if (year == 2019 && month ==  4 && date == 30)               { return 1; } // 2019年限定の退位の日
  if (year == 2019 && month ==  5 && date == 1)                { return 1; } // 2019年限定の即位の日
  if (year == 2019 && month ==  5 && date == 2)                { return 1; } // 2019年限定の特別休日
  if (year == 2019 && month ==  10 && date == 22)              { return 1; } // 2019年限定の即位礼正殿の儀
    
//ここまで臨時休業

    
/**************

休日の設定はここまで！
以下は触らないで下さい

**************/
    
  return 0;
}

function dispDateW () {
  return dispDate(1);
}

function dispDate1W (h) {
  return dispDate1(h, 1);
}

function dispDate2W (n, h) {
  return dispDate2(n, h, 1);
}

function dispDate (w) {
  return dateFormat(myMonth,myDate,myDay,w);
}

function dispDate1 (h, w) {
  return dispDate2(0, h, w);
}

function dispDate2 (n, h, w) {
  var i = 0;
  while (i <= n) {
    thisDay.setTime(timeStamp + (1000*60*60*24 * i));
    myYear2  = thisDay.getFullYear();
    myMonth2 = thisDay.getMonth() + 1;
    myDate2  = thisDay.getDate();
    myDay2   = thisDay.getDay();
    if (isHoliday(myYear2,myMonth2,myDate2,myDay2) == 0 && i == 0 && h <= myHours) { n++; }  // 翌日扱い
    if (isHoliday(myYear2,myMonth2,myDate2,myDay2) >= 1){ n++; }  // 休日
    if (isHoliday(myYear2,myMonth2,myDate2,myDay2) == 1 && myDay2 == 0){ n++; }  // 振替休日
    i++;
  }
  return dateFormat(myMonth2,myDate2,myDay2,w);
}

function dateFormat (month, date, week, w) {
  if (w == 1) { return month+"月"+date+"日("+myWeekTbl[week]+")"; }
  else { return month+"月"+date+"日"; }
}

$(function(){countDown();});
function countDown(){
    var d = dispDate1W(shippingLimitTime);
    var h = shippingLimitTime;
    var strDate = dispDate2W(shippingDay,shippingLimitTime);
    
	$(".time_at").text(d + h + ':00');
	$(".date_at").text(strDate);
    }