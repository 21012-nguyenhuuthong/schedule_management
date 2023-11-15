// makeCalendar
function makeCalendar(year, month) {
    // (1 - 31)
    const monthDays = new Date(year, month, 0).getDate();
    // date
    const firstDay = new Date(year, month - 1, 1).getDay();
    // 
    const lastDay = new Date(year, month - 1, monthDays).getDay();
    //
    let dayOfWeek = firstDay;

    //
    let str = '';
    str += '<table>';
    str += '<tr>';
    str += '<th id="sun">日</th>';
    str += '<th id="mon">月</th>';
    str += '<th id="tue">火</th>';
    str += '<th id="wed">水</th>';
    str += '<th id="thu">木</th>';
    str += '<th id="fri">金</th>';
    str += '<th id="sat">土</th>';
    str += '</tr>';

    str += '<tr>';
    //
    for (let i = 0; i < firstDay; i++) {
        str += '<td>&nbsp;</td>';
    }

    //
    for (let j = 1; j <= monthDays; j++) {
        //
        if ((firstDay + j) % 7 == 1) {
            dayOfWeek = 0;
            str += '</tr>';
            str += '<tr>';
        }
        str += '<td ';
        str += ' year="' + year + '"';
        str += ' month="' + month + '"';
        str += ' day="' + j + '"';
        str += ' dayOfWeek="' + dayOfWeek + '"';
        if (year == new Date().getFullYear()
            && month == new Date().getMonth() + 1
            && j == new Date().getDate()
        ) {
            str += 'id="today"';
        }
        // holiday
        if (dayOfWeek == 0
            || checkHoliday(year, month, j)
            // || checkFurikae(year, month, j)
        ) {
            str += 'class="holiday"';
        }
        //
        str += 'onclick="selectDay(this);"';

        str += '>' + j + '</td>';
        dayOfWeek++;
    }
    //
    for (let k = 0; k < (6 - lastDay); k++) {
        str += '<td>&nbsp;</td>';
    }

    str += '</tr>';
    str += '</table>';

    // calendar
    document.getElementById("headerYear").innerHTML = year;
    document.getElementById("headerMonth").innerHTML = month;

    // calendar
    document.getElementById("calendar").innerHTML = str;

}

// selectDay
function selectDay(e) {

    // select
    var year = e.getAttribute("year");
    var month = e.getAttribute("month");
    var day = e.getAttribute("day");
    let dayOfWeek = '日月火水木金土'[e.getAttribute("dayOfWeek")];

    // select day
    showInputArea();
    document.getElementById("selectInfo").innerHTML = '<h2>' +
        month + '月' + day + '日 (' + dayOfWeek + ') の予定<h2>';

    //day sessionStorage
    sessionStorage.setItem("day", day);

    //
    getDayData();
}