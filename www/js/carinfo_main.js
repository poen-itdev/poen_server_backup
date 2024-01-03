var flag_show = false;

var flag_배터리입력 = false;

var interval = setInterval(function () {
  if (flag_배터리입력 == true) {
    console.log("배터리입력");
    stop_repeat();
    배터리입력_시작();
  }
  //if (flag_상세입력 == true) { console.log('상세입력'); stop_repeat(); 상세입력_시작(); }
}, 1000);

function stop_repeat() {
  console.log("stop repeat");
}

function 이전페이지() {
  back();
}
