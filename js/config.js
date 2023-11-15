function changeBackColor() {
    var r = document.getElementById("bgColorR").value;
    var g = document.getElementById("bgColorG").value;
    var b = document.getElementById("bgColorB").value;

    // localStorage
    localStorage.setItem('main-bg-color_R', r);
    localStorage.setItem('main-bg-color_G', g);
    localStorage.setItem('main-bg-color_B', b);
    // change css
    var rgb = "rgb(" + r + "," + g + "," + b + ")";
    document.documentElement.style.setProperty('--main-bg-color', rgb);
}

//
function resetBackColor() {
    // localStorage reset
    localStorage.removeItem('main-bg-color_R');
    localStorage.removeItem('main-bg-color_G');
    localStorage.removeItem('main-bg-color_B');

    document.getElementById("bgColorR").value = parseInt('ff', 16);
    document.getElementById("bgColorG").value = parseInt('57', 16);
    document.getElementById("bgColorB").value = parseInt('22', 16);

    changeBackColor();
}

// localStorage get
function setBackColor() {
    //
    if (localStorage.getItem('main-bg-color_B') == null) { //取得 //空値　くうち

        resetBackColor();

    } else {

        let r = localStorage.getItem('main-bg-color_R');
        let g = localStorage.getItem('main-bg-color_G');
        let b = localStorage.getItem('main-bg-color_B');

        // slideBar
        document.getElementById("bgColorR").value = r;
        document.getElementById("bgColorG").value = g;
        document.getElementById("bgColorB").value = b;

        changeBackColor();
    }
}

// change font color
function changeFontColor() {
    var r = document.getElementById("fontColorR").value;
    var g = document.getElementById("fontColorG").value;
    var b = document.getElementById("fontColorB").value;

    // localStorage
    localStorage.setItem('main-font-color_R', r);
    localStorage.setItem('main-font-color_G', g);
    localStorage.setItem('main-font-color_B', b);
    // change css
    var rgb = "rgb(" + r + "," + g + "," + b + ")";
    document.documentElement.style.setProperty('--main-font-color', rgb);
}

//
function resetFontColor() {
    // localStorage reset
    localStorage.removeItem('main-font-color_R');
    localStorage.removeItem('main-font-color_G');
    localStorage.removeItem('main-font-color_B');

    document.getElementById("fontColorR").value = parseInt('19', 16);
    document.getElementById("fontColorG").value = parseInt('19', 16);
    document.getElementById("fontColorB").value = parseInt('70', 16);

    changeFontColor();
}

// localStorage get
function setFontColor() {
    //
    if (localStorage.getItem('main-font-color_B') == null) { //取得 //空値　くうち

        resetFontColor();

    } else {

        let r = localStorage.getItem('main-font-color_R');
        let g = localStorage.getItem('main-font-color_G');
        let b = localStorage.getItem('main-font-color_B');

        // slideBar
        document.getElementById("fontColorR").value = r;
        document.getElementById("fontColorG").value = g;
        document.getElementById("fontColorB").value = b;

        changeFontColor();
    }
}