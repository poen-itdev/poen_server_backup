history.pushState(null, null, location.href); //브라우저 이전으로 이동 버튼 작동 막음
window.onpopstate = function (event) {
  history.go(1);
};

//$(document).ready(function () {
  //마우스 우측 버튼 사용 막기.
//  if (window.addEventListener) {
//    window.addEventListener(
//      'contextmenu',
//      function (e) {
//        try {
//          if (typeof e != 'undefined') {
//            e.preventDefault();
//            return false;
//          } else {
//            return false;
//          }
//        } catch (e) {}
//      },
//      false
//    );
//  } else {
//    window.attachEvent('oncontextmenu', function (e) {
//      try {
//        if (typeof e != 'undefined') {
//          e.preventDefault();
//          return false;
//        } else {
//          return false;
//        }
//      } catch (e) {}
//    });
//  }
//  var handlemouseEvent = function (e) {
//    try {
//      if (typeof e == 'undefined') {
//        if (window.event.button && window.event.button == '2') {
//          return false;
//        }
//      } else if ((e.which && e.which == 3) || (e.button && e.button == 2)) {
//        e.preventDefault();
//        return false;
//      }
//    } catch (e) {}
//  };
//  window.onkeydown = handlemouseEvent;
//  window.onkeyup = handlemouseEvent;
// 개발자도구 실행 감지.
//  console.log(
//    Object.defineProperties(new Error(), {
//      toString: {
//        value() {
//          new Error().stack.includes('toString@') && alert('Safari devtools');
//        },
//      },
//      message: {
//        get() {
//          if (navigator.appVersion.indexOf('MSIE 6.0') >= 0) {
//            parent.window.close();
//          } else {
//            parent.window.open('about:blank', '_self').close();
//          }
//        },
//      },
 //   })
//  );
//});

// Detect Key Shortcuts f12 및 특수키 조합 막기
//window.addEventListener('keydown', function (e) {
//  if (
    // CMD + Alt + I (Chrome, Firefox, Safari)
 //   (e.metaKey == true && e.altKey == true && e.keyCode == 73) ||
    // CMD + Alt + J (Chrome)
//    (e.metaKey == true && e.altKey == true && e.keyCode == 74) ||
    // CMD + Alt + C (Chrome)
//    (e.metaKey == true && e.altKey == true && e.keyCode == 67) ||
    // CMD + Shift + C (Chrome)
//    (e.metaKey == true && e.shiftKey == true && e.keyCode == 67) ||
    // Ctrl + Shift + I (Chrome, Firefox, Safari, Edge)
//    (e.ctrlKey == true && e.shiftKey == true && e.keyCode == 73) ||
    // Ctrl + Shift + J (Chrome, Edge)
//    (e.ctrlKey == true && e.shiftKey == true && e.keyCode == 74) ||
    // Ctrl + Shift + C (Chrome, Edge)
//    (e.ctrlKey == true && e.shiftKey == true && e.keyCode == 67) ||
    // F12 (Chome, Firefox, Edge)
//    e.keyCode == 123 ||
    // CMD + Alt + U, Ctrl + U (View source: Chrome, Firefox, Safari, Edge)
//    (e.metaKey == true && e.altKey == true && e.keyCode == 85) ||
//    (e.ctrlKey == true && e.keyCode == 85)
//  ) {
//    e.preventDefault();
//    return false;
//  }
//});

//메뉴에서  관리자 버튼과 부품재고 버튼을 숨김
admin_btn.style.display = 'none';
부품재고_btn.style.display = 'none';

// 작업자와 계정 레벨
//var _worker = sessionStorage.getItem('worker');
var _level = sessionStorage.getItem('level');
if (worker == null) {
  worker = '';
  _level = '';
}

var flag_show = false;

const _login_info = document.getElementById('login_info');
const _admin_btn = document.getElementById('admin_btn');
const _부품재고_btn = document.getElementById('부품재고_btn');

console.log('worker:', worker);

//login 화면 표출
async function check_login() {
  if (worker == '' || worker == null) {
    loadPage('base/login.html');
    await sleep(300);
    change_label(); //in login.js (메뉴의 로그인/로그아웃 글자 변경)

    _login_info.innerHTML = '';
    _admin_btn.style.display = 'none'; //관리자 버튼 숨김
    _부품재고_btn.style.display = 'none'; //부품재고 버튼 숨김

    //엔터키를 누르면 포커스 이동 및 로그인이 되도록함
    const check_id = document.getElementById('_id');
    const check_passwd = document.getElementById('_passwd');
    check_id.onkeydown = function (event) {
      if (event.keyCode == 13) {
        //enter key
        check_passwd.focus();
      }
    };

    check_passwd.onkeydown = function (event) {
      if (event.keyCode == 13) {
        login(); //login.js
      }
    };
  }
}

check_login();

//각 화면당 시작 함수를 실행하게끔 하기위한 플래그
var flag_재제조현황 = false;
var flag_상세입력 = false;
var flag_년간현황 = false;
var flag_월간현황 = false;
var flag_주간현황 = false;
var flag_생산현황 = false;
var flag_대시보드 = false;
var flag_대기수량_현황 = false;
var flag_부품재고 = false;
var flag_수량집계 = false;
var flag_창고수량집계 = false;
var flag_신품정보 = false;
var flag_재충전정보 = false;
var flag_관리자 = false;
var flag_repeat_생산현황 = false;
var flag_repeat_대시보드 = false;
var flag_repeat_대기수량_현황 = false;
var flag_BSA_제외분류 = false;
var flag_입고 = false;
var flag_세척 = false;
var flag_기초검사 = false;
var flag_기초보고서 = false;
var flag_분해조립 = false;
var flag_new_분해조립 = false;
var flag_성능검사 = false;
var flag_EOL = false;
var flag_출하 = false;
var flag_구장재고 = false;
var flag_군포재고 = false;
var flag_제주재고 = false;
var flag_구장재고조회 = false;
var flag_군포재고조회 = false;
var flag_제주재고조회 = false;
var flag_부품정보_list = false;
var flag_racks = false;
var flag_불량의심부품 = false;
var flag_기초보고서 = false;
var flag_분해조립_재제조 = false;
var flag_분해조립_공정대기 = false;
var flag_분해조립_폐기자재 = false;
var flag_완료보고서 = false;

//각 화면에 해당하는 시작함수를 실행
var interval = setInterval(function () {
  if (flag_재제조현황 == true) {
    console.log('재제조현황');
    stop_repeat();
    재제조현황_시작();
  }
  if (flag_상세입력 == true) {
    console.log('상세입력');
    stop_repeat();
    상세입력_시작();
  }
  if (flag_년간현황 == true) {
    console.log('년간현황');
    stop_repeat();
    년간현황_시작();
  }
  if (flag_월간현황 == true) {
    console.log('월간현황');
    stop_repeat();
    월간현황_시작();
  }
  if (flag_주간현황 == true) {
    console.log('주간현황');
    stop_repeat();
    주간현황_시작();
  }
  if (flag_재충전정보 == true) {
    console.log('재충전정보');
    stop_repeat();
    재충전정보_시작();
  }
  if (flag_부품재고 == true) {
    console.log('부품재고');
    stop_repeat();
    부품재고_시작();
  }
  if (flag_수량집계 == true) {
    console.log('수량집계');
    stop_repeat();
    수량집계_시작();
  }
  if (flag_창고수량집계 == true) {
    console.log('창고수량집계');
    stop_repeat();
    창고수량집계_시작();
  }
  if (flag_신품정보 == true) {
    console.log('신품정보');
    신품정보_시작();
  }

  if (flag_구장재고 == true) {
    console.log('구장재고');
    stop_repeat();
    구장재고_시작();
  }
  if (flag_군포재고 == true) {
    console.log('군포재고');
    stop_repeat();
    군포재고_시작();
  }
  if (flag_제주재고 == true) {
    console.log('제주재고');
    stop_repeat();
    제주재고_시작();
  }
  if (flag_구장재고조회 == true) {
    console.log('구장재고조회');
    stop_repeat();
    구장재고조회_시작();
  }
  if (flag_군포재고조회 == true) {
    console.log('군포재고조회');
    stop_repeat();
    군포재고조회_시작();
  }
  if (flag_제주재고조회 == true) {
    console.log('제주재고조회');
    stop_repeat();
    제주재고조회_시작();
  }
  if (flag_생산현황 == true) {
    console.log('생산현황');
    stop_repeat();
    생산현황_시작();
  }
  if (flag_대시보드 == true) {
    console.log('대시보드');
    날짜지정조회 = false;
    stop_repeat();
    start_repeat_대시보드();
    대시보드_시작();
  }
  if (flag_대기수량_현황 == true) {
    console.log('대기수량_현황');
    stop_repeat();
    start_repeat_대기수량_현황();
    대기수량_현황_시작();
  }
  if (flag_BSA_제외분류 == true) {
    console.log('BSA 제외분류');
    stop_repeat();
    stop_repeat();
    BSA_제외분류_시작();
  }
  if (flag_관리자 == true) {
    console.log('관리자');
    stop_repeat();
    관리자_시작();
  }
  if (flag_입고 == true) {
    console.log('입고');
    stop_repeat();
    입고_시작();
  }
  if (flag_세척 == true) {
    console.log('세척');
    stop_repeat();
    세척_시작();
  }
  if (flag_기초검사 == true) {
    console.log('기초검사');
    stop_repeat();
    기초검사_시작();
  }
  if (flag_기초보고서 == true) {
    console.log('기초보고서');
    stop_repeat();
    기초보고서_시작();
  }
  if (flag_분해조립 == true) {
    console.log('분해조립');
    stop_repeat();
    분해조립_시작();
  }
  if (flag_new_분해조립 == true) {
    console.log('new 분해조립');
    stop_repeat();
    new_분해조립_시작();
  }
  if (flag_성능검사 == true) {
    console.log('성능검사');
    stop_repeat();
    성능검사_시작();
  }
  if (flag_EOL == true) {
    console.log('EOL');
    stop_repeat();
    EOL_시작();
  }
  if (flag_출하 == true) {
    console.log('출하');
    stop_repeat();
    출하정보_시작();
  }
  if (flag_racks == true) {
    console.log('racks');
    stop_repeat();
    loadPage('base/rack_배치도.html');
    racks_시작();
  }
  if (flag_불량의심부품 == true) {
    console.log('불량의심부품');
    stop_repeat();
    불량의심부품_시작();
  }
  if (flag_부품정보_list == true) {
    console.log('부품정보');
    stop_repeat();
    부품정보_list_시작();
  }
  if (flag_기초보고서 == true) {
    console.log('기초보고서');
    stop_repeat();
    기초보고서_시작();
  }
  if (flag_분해조립_재제조 == true) {
    console.log('분해조립 재제조');
    stop_repeat();
    분해조립_재제조_시작();
  }
  if (flag_분해조립_공정대기 == true) {
    console.log('분해조립 공정대기');
    stop_repeat();
    분해조립_공정대기_시작();
  }
  if (flag_분해조립_폐기자재 == true) {
    console.log('분해조립 폐기자재');
    stop_repeat();
    분해조립_폐기자재_시작();
  }
  if (flag_완료보고서 == true) {
    console.log('완료보고서');
    stop_repeat();
    완료보고서_시작();
  }
}, 1000);

//반복 실행 플래그 모두 끔
function stop_repeat() {
  console.log('stop repeat');
  flag_repeat_생산현황 = false;
  flag_repeat_대시보드 = false;
  flag_repeat_대기수량_현황 = false;
}

//생산현황 반복 플래그만 켬
function start_repeat_생산현황() {
  console.log('start 생산현황 repeat');
  flag_repeat_대시보드 = false;
  flag_repeat_생산현황 = true;
}

//대시보드 반복 플래그만 켬
function start_repeat_대시보드() {
  console.log('start dashboard repeat');
  flag_repeat_대기수량_현황 = false;
  flag_repeat_대시보드 = true;
}

//대기수량 현황만 반복 플래그를 켬
function start_repeat_대기수량_현황() {
  console.log('start BSA 수량 현황 repeat');
  flag_repeat_생산현황 = false;
  flag_repeat_대시보드 = false;
  flag_repeat_대기수량_현황 = true;
}

//공정 선택 화면으로 이동
function 이전페이지() {
  loadPage('base/item-details.html');
}

//기초검사 공정으로 이동
function 기초검사_이전페이지() {
  flag_기초검사 = true;
  loadPage('base/기초검사.html');
}
