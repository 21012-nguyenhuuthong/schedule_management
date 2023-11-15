// holiday
function checkHoliday(year, month, day) {

    let dayOfWeek = new Date(year, month - 1, day).getDay();
    let numOfWeek = Math.floor((day - 1) / 7) + 1;

    // month
    switch (month) {

        // 1/1
        // 2mon
        case 1:
            if (day == 1) return true;
            if (dayOfWeek == 1 && numOfWeek == 2) return true;
            break;

        // 2/11
        // 2/23 >= 2020
        case 2:
            if (day == 11) return true;
            if (year >= 2020 && day == 23) return true;
            break;

        // 3/21~
        case 3:
            if (day == Math.floor(20.8431 + 0.242194 * (year - 1980))
                - Math.floor((year - 1980) / 4)) return true;
            break;

        // 4/29
        case 4:
            if (day == 29) return true;
            break;

        // 5/1 == 2019
        // 5/3
        // 5/4
        // 5/5
        case 5:
            if (year == 2019 && day == 1) return true;
            if (day == 3) return true;
            if (day == 4) return true;
            if (day == 5) return true;
            break;

        // 3mon != 2020 != 2021
        // 7/23 == 2020
        // 7/24 == 2020
        // 7/22 == 2021
        // 7/23 == 2021
        case 7:
            if (year != 2022 && year != 2021
                && dayOfWeek == 1 && numOfWeek == 3) return true;
            if (year == 2020 && day == 23) return true;
            if (year == 2020 && day == 24) return true;
            if (year == 2021 && day == 22) return true;
            if (year == 2021 && day == 23) return true;
            break;
        // 8/10 == 2020
        // 8/11 >= 2016 != 2020 != 2021
        // 8/8 == 2021
        case 8:
            if (year == 2020 & day == 10) return true;
            if (year != 2021 && year != 2020 && year >= 2016
                && day == 11) return true;
            if (year == 2021 && day == 8) return true;
            break;
        // 3mon
        // 9/23~
        case 9:
            if (dayOfWeek == 1 && numOfWeek == 3) return true;
            if (day == Math.floor(23.2488 + 0.242194 * (year - 1980))
                - Math.floor((year - 1980) / 4)) return true;
            break;

        // 2mon !=2020 !=2021
        // 10/22 == 2019
        case 10:
            if (year != 2020 && year != 2021
                && dayOfWeek == 1 && numOfWeek == 2) return true;
            if (year == 2019 && day == 22) return true;
            break;

        // 11/3
        // 11/23
        case 11:
            if (day == 3) return true;
            if (day == 23) return true;
            break;

        // 12/23 <= 2018
        case 12:
            if (year <= 2018 && day == 23) return true;
            break;
    }
    return false;

    // checkFurikae
    function checkFurikae(year, month, day) {
        let dayOfWeek = new Date(year, month - 1, day).getDate();
        let furikaeFlag = false;

        // mon dayOfWeek==1
        if (dayOfWeek == 1) {
            furikaeFlag = checkHoliday(year, month, day - 1);
        }

        // tuesday
        if (dayOfWeek == 2 && furikaeFlag != true) {
            furikaeFlag = checkHoliday(year, month, day - 1)
                && checkHoliday(year, month, day - 2);
        }

        // wednesday
        if (dayOfWeek == 3 && furikaeFlag != true) {
            furikaeFlag = checkHoliday(year, month, day - 1)
                && checkHoliday(year, month, day - 2)
                && checkHoliday(year, month, day - 3);
        }

        //
        if (dayOfWeek != 0 && dayOfWeek != 6 && furikaeFlag != true) {
            let prevDate = new Date(year, month - 1, day);
            let nextDate = new Date(year, month - 1, day);
            prevDate.setDate(prevDate.getDate() - 1);
            nextDate.setDate(nextDate.getDate() + 1);

            furikaeFlag = checkHoliday(prevDate.getFullYear(), prevDate.getMonth() + 1, prevDate.getDate())
                && checkHoliday(nextDate.getFullYear(), nextDate.getMonth() + 1, nextDate.getDate())
        }
        return furikaeFlag;
    }
}