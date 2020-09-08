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

let now = 20;

if (localStorage.getItem('total_right') == null) {
    localStorage.setItem('total_right', '0');
    localStorage.setItem('total_wrong', '0');

    localStorage.setItem('total_minute', '0');
    localStorage.setItem('total_second', '0');
}

function SendQuestion() {
    let randint = Math.floor(Math.random()*13);
    if (randint == now) {
        SendQuestion();
    } else {
        document.getElementById("question").innerHTML = "请问" + FiveLineQuestions[randint] + "发的是什么音";
        now = randint;
    }
}

function SendAnswer() {

}