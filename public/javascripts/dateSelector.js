/**
 * Created by wangrunbo on 16/08/21.
 */

var month_big = ["1","3","5","7","8","10","12"]; //包含所有大月的数组
var month_small = ["4","6","9","11"]; //包含所有小月的数组

//页面加载时调用的初始化select控件的option的函数
function date_select_init() {

    var select_year = document.getElementById("y"); //获取id为"year"的下拉列表框
    var select_month = document.getElementById("m"); //获取id为"month"的下拉列表框

    var now = new Date();
    var now_year = now.getFullYear();

    //将年份选项初始化，从1980到2000
    for(var y = now_year; y > now_year-50; y--) {
        select_year_option = new Option(y, y);
        select_year.options.add(select_year_option);
    }

    //将月份选项初始化，从1到12
    for(var m = 1; m <= 12; m++) {
        select_month_option = new Option(m, m);
        select_month.options.add(select_month_option);
    }

    //调用swap_day函数初始化日期
    swap_day();
}

//判断数组array中是否包含元素obj的函数，包含则返回true，不包含则返回false
function array_contain(array, obj) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === obj) {
            return true;
        }
    }
    return false;
}

//根据年份和月份调整日期的函数
function swap_day() {
    var select_month = document.getElementById("m"); //获取id为"month"的下拉列表框
    var select_day = document.getElementById("d"); //获取id为"day"的下拉列表框

    select_day.innerHTML = ""; //在调整前先清空日期选项里面的原有选项
    var month = select_month.options[select_month.selectedIndex].value; //获取被选中的月份month

    //如果month被包含在month_big数组中，即被选中月份是大月，则将日期选项初始化为31天
    if(array_contain(month_big, month)) {
        for(var d = 1; d <= 31; d++) {
            select_day_option = new Option(d, d);
            select_day.options.add(select_day_option);
        }
    }

    //如果month被包含在month_small数组中，即被选中月份是小月，则将日期选项初始化为30天
    else if(array_contain(month_small, month)) {
        for(var d = 1; d <= 30; d++) {
            select_day_option = new Option(d, d);
            select_day.options.add(select_day_option);
        }
    }

    //如果month为2，即被选中的月份是2月，则调用initFeb()函数来初始化日期选项
    else {
        initFeb();
    }
}

//判断年份year是否为闰年，是闰年则返回true，否则返回false
function isLeapYear(year) {
    var a = year % 4;
    var b = year % 100;
    var c = year % 400;
    return ( (a == 0) && (b != 0) ) || (c == 0)
}

//根据年份是否闰年来初始化二月的日期选项
function initFeb() {
    var select_year = document.getElementById("y"); //获取id为"year"的下拉列表框
    var select_day = document.getElementById("d"); //获取id为"day"的下拉列表框
    var year = parseInt(select_year.options[select_year.selectedIndex].value); //获取被选中的年份并转换成Int

    //如果是闰年，则将日期选项初始化为29天
    if(isLeapYear(year)) {
        for(var d = 1; d <= 29; d++) {
            select_day_option = new Option(d, d);
            select_day.options.add(select_day_option);
        }
    }

    //如果不是闰年，则将日期选项初始化为28天
    else {
        for(var d = 1; d <= 28; d++) {
            select_day_option = new Option(d, d);
            select_day.options.add(select_day_option);
        }
    }
}