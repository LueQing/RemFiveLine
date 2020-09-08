FiveLine = ["下加3间","下加2线","下加1线","下加1间","1线","1间","2线","2间","3线","3间","4线","4间"];
FiveLineAnswer = ["低音so","低音la","do","re","mi","fa","so","la","si","高音do","高音re","高音mi"];

FiveLine = {
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


num = Math.floor(Math.random()*12);
second = 0;
minute = 0;
ml = 0;
if (localStorage.getItem('total_right') == null) {
  localStorage.setItem('total_right', '0');
  localStorage.setItem('total_wrong', '0');
}
if (localStorage.getItem('total_minute') == null) {
  localStorage.setItem('total_minute', '0');
  localStorage.setItem('total_second', '0');
}
total_minute = Number(localStorage.getItem('total_minute'));
total_second = Number(localStorage.getItem('total_second'));
que = new Vue({
  el: "#app",
  data: {
    message: "",
    answer: "",
    score: "",
    up_que: "",
    ltime: "0",
    total_time: total_minute+"分"+total_second+"秒",
    total_right: Number(localStorage.getItem('total_right')),
    total_wrong: Number(localStorage.getItem('total_wrong')),
  },
});

function go(mes) { //上题
  que.message = "请问在"+mes+"上的是什么音?";
}

function ok(number) { //判题
  timerreset();
    if (que.answer == FiveLineAnswer[number]) {
        que.score = "回答正确"
        que.total_right += 1
        localStorage.setItem("total_right",que.total_right)
    } else {
        que.score = "你回答错误,正确答案是:" + FiveLineAnswer[number] + " 你的答案是: " + que.answer;
        que.total_wrong += 1
        localStorage.setItem("total_wrong",que.total_wrong)
    }
    doit()
    int=setInterval(timer,100);
}
function doit() { //随机挑选题目
    if (Math.floor(Math.random()*12) == num) {
      doit()
    } else {
      que.up_que = que.message
      num = Math.floor(Math.random()*12);
      go(FiveLine[num]);
    }
}

function timer() {
  ml = ml + 1;
  if (ml >= 10) {
    ml = 0;
    second += 1;
  }
  if (second >= 60) {
    second = 0;
    minute = minute + 1;
  }
  que.ltime = minute+'分'+second+'秒'+ml+'微秒';
}
function timerreset() {
  window.clearInterval(int);
  total_minute = total_minute + minute;
  total_second = total_second + second;
  if (total_second >= 60) {
    total_second -= 60;
    total_minute += 1;
  }
  localStorage.setItem("total_minute",total_minute);
  localStorage.setItem("total_second",total_second);
  minute=second=ml=0;
  que.ltime = "0分0秒0微秒";
  que.total_time = total_minute+"分"+total_second+"秒";
}

doit();
int=setInterval(timer,100);

document.onkeydown = function() {
  if (event.keyCode == 13) {
    ok(num);
  }
}