let db;
const DB_NAME = "jibunDB";
const DB_STORE = "jibunSTORE";

// DB init
function initDB() {
    // DB open
    let openRequest = indexedDB.open(DB_NAME);

    // DB new/upgrade
    openRequest.onupgradeneeded = function (event) {
        db = event.target.result;
        // objectStore
        let store = db.createObjectStore(DB_STORE, { keyPath: "yyyymmddhhmm" });
        // index
        store.createIndex("yyyymmdd", "yyyymmdd", { unique: false });
        console.log("IndexedDB の準備（新規作成／バージョン更新）が完了しました。");
    }

    // DB open : success
    openRequest.onsuccess = function (event) {
        console.log("IndexedDB のオープンに成功しました。");
        db = event.target.result;
    }
    // fail
    openRequest.onerror = function (event) {
        console.log("IndexedDB のオープンに失敗しました。");
    };
}

//  DB setValue
function setValue() {
    //parameter
    let day = sessionStorage.getItem("day");
    let hour = document.getElementById("hour").value;
    let minute = document.getElementById("minute").value;
    let memo = document.getElementById("memo").value;
    let idx = String(year) + (("0" + month).slice(-2)) + (("0" + day).slice(-2));
    let key = idx + hour + minute;

    const transaction = db.transaction([DB_STORE], "readwrite");
    const store = transaction.objectStore(DB_STORE);
    const request = store.put({
        "yyyymmdd": idx,
        "yyyymmddhhmm": key,
        "hour": hour,
        "minute": minute,
        "memo": memo,
        "date": new Date()
    });

    // Put request
    request.onsuccess = function (event) {
        // reset value default
        document.getElementById("hour").value = "00";
        document.getElementById("minute").value = "00";
        document.getElementById("memo").value = "";
    }

    // fail
    request.onerror = function (event) {
        console.error(event.target.errorCode);
    }

    // 
    getDayData();
}

// indexDB get 
function getDayData() {
    // parameter
    let day = sessionStorage.getItem("day");
    let idx = String(year) + (("0" + month).slice(-2)) + (("0" + day).slice(-2));

    //init
    const result = document.getElementById("result");
    result.innerHTML = "";

    // transaction
    const transaction = db.transaction([DB_STORE], "readonly");
    // objectStore
    const store = transaction.objectStore(DB_STORE);
    // request(openCursor)
    const request = store.index("yyyymmdd").openCursor(IDBKeyRange.only(idx));

    // success: request(openCursor)
    request.onsuccess = function (event) {
        //
        if (event.target.result == null) return;

        //Cursor
        const cursor = event.target.result;
        // 
        let resultStr = "";
        resultStr += "<input class='deleteBtn' type='button' value='削除'";
        resultStr += " onclick='deleteValue(" + cursor.value.yyyymmddhhmm + ")'>";
        resultStr += "&nbsp;";
        resultStr += cursor.value.hour + ":" + cursor.value.minute;
        resultStr += "<p>" + cursor.value.memo + "</p><hr>";

        result.innerHTML += resultStr;

        cursor.continue();
    }
    //error: request(openCursor)
    request.onerror = function (event) {
        console.error(event.target.errorCode);
    }
}

// delete
function deleteValue(key) {
    if (confirm("このデータを削除します。よろしいですか。")) {

        // transaction
        const transaction = db.transaction([DB_STORE], "readwrite");
        // objectStore
        const store = transaction.objectStore(DB_STORE);
        // request (delete)
        const request = store.delete(String(key));

        // success
        request.onsuccess = function () {
            //
            getDayData();
        }
        // error
        request.onerror = function (event) {
            console.error(event.target.errorCode);
        }
    }
}

//delete month
function deleteMonthDate(year, month) {
    if (confirm(year + " 年" + month + " 月のデータを削除します。よろしいですか。")) {

        // params
        let lowerKey = String(year) + (("0" + month).slice(-2)) + "000000";
        let upperKey = String(year) + (("0" + month).slice(-2)) + "999999";

        // transaction
        const transaction = db.transaction([DB_STORE], "readwrite");
        // objectStore
        const store = transaction.objectStore(DB_STORE);
        // request (delete)
        const request = store.delete(IDBKeyRange.bound(lowerKey, upperKey));

        // success: request(delete)
        request.onsuccess = function () {
            alert(year + " 年" + month + " 月のデータを削除します。よろしいですか。");
        }
        // error
    }
}

// delete all
function deleteAll() {
    if (confirm("すべてのデータを削除します。よろしいですか。")) {

        // transaction
        const transaction = db.transaction([DB_STORE], "readwrite");
        // objectStore
        const store = transaction.objectStore(DB_STORE);
        // request (clear)
        const request = store.clear();

        // success
        request.onsuccess = function () {
            alert("すべてのデータを削除しました。");
        }
        // error:request(clear)
        request.onerror = function (event) {
            console.error(event.target.errorCode);
        }
    }
}