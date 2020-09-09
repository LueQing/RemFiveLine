let FiveLine = {
    "下加3间": "低音so",
    "下加2线": "低音la",
    "下加1线": "do",
    "下加1间": "re",
    "1线": "mi",
    "1间": "fa",
    "2线": "so",
    "2间": "la",
    "3线": "si",
    "3间": "高音do",
    "4线": "高音re",
    "4间": "高音mi",
    "5线": "高音fa"
  };

let FiveLineQuestions = ["下加3间","下加2线","下加1线","下加1间","1线","1间","2线","2间","3线","3间","4线","4间","5线"];

let now = "";
let nowTime = "";
let second = 0;
let minute = 0;

function total_questions_add(num) {
    let total_right = Number(localStorage.getItem("total_right"));
    let total_wrong = Number(localStorage.getItem("total_wrong"));
    if (num > 0) {
        total_right += num;
        localStorage.setItem('total_right', total_right);
    } else {
        total_wrong -= num;
        localStorage.setItem('total_wrong', total_wrong);
    }
}

function update_total_questions() {
    document.getElementById('total_right').innerHTML = "你一共对了: " + Number(localStorage.getItem("total_right")) + " 题";
    document.getElementById('total_wrong').innerHTML = "你一共错了: " + Number(localStorage.getItem("total_wrong")) + " 题";
}

function SendQuestion() {
    let randint = Math.floor(Math.random()*13);
    if (randint == now) {
        SendQuestion();
    } else {
        document.getElementById("question").innerHTML = "请问" + FiveLineQuestions[randint] + "发的是什么音";
        now = FiveLineQuestions[randint];
    }
    int = setInterval(timer,1000);
}

function SendAnswer() {
    window.clearInterval(int);
    total_time_add()
    update_total_times();
    let Answer = document.getElementById("answer");
    if (Answer.value == FiveLine[now]) {
        total_questions_add(1);
        document.getElementById("last").innerHTML = "上一题是: 请问" + now + "发的是什么音"+";你答对了"
    } else {
        total_questions_add(-1);
        document.getElementById("last").innerHTML = "上一题是: 请问" + now + "发的是什么音"+";你答错了,正确答案为:  " + FiveLine[now]
    }


    Answer.value = "";
    update_total_questions();
    SendQuestion();
}

function timer() {
    second += 1;
    if (second >= 60) {
      second = 0;
      minute = minute + 1;
    }
    nowTime = minute+'分'+second+'秒';
    document.getElementById("lasttime").innerHTML = "对这道题已经耗时:" + nowTime;
}

function total_time_add() {
    minute = 0;
    second = 0;
    let total_minute = Number(localStorage.getItem("total_minute"));
    let total_second = Number(localStorage.getItem("total_second"));
    total_minute += minute;
    total_second += second;
    if (total_second >= 60) {
        total_minute += 1;
        total_second -= 60;
    }    
    localStorage.setItem('total_minute', total_minute);
    localStorage.setItem('total_second', total_second);
}
function update_total_times() {
    let total_minute = Number(localStorage.getItem("total_minute"));
    let total_second = Number(localStorage.getItem("total_second"));
    document.getElementById("total_time").innerHTML = "你一共花了:  " + total_minute + "分" + total_second + "秒";
}

function init() {
    if (localStorage.getItem('total_right') == null) {
        localStorage.setItem('total_right', '0');
        localStorage.setItem('total_wrong', '0');
    
        localStorage.setItem('total_minute', '0');
        localStorage.setItem('total_second', '0');
    }

    update_total_questions();
    update_total_times();
    SendQuestion();
}