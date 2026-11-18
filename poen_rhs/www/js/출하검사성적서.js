async function 출하검사성적서_시작() {
  loadPage('base/출하검사성적서.html');
  await sleep(1);

  _management_id.value = 관리번호;
  출하검사성적서_조회();
}

async function 출하검사성적서_조회(is재제조번호 = false) {
  if (is재제조번호 == true) {
    //재제조번호로 관리자 번호를 구함
    findOne_BSA재제조(BSA재제조, { 재제조번호: _재제조번호.value });
    await delay();

    if (BSA재제조_v != null) {
      _management_id.value = BSA재제조_v.관리번호;
    }
  }

  if (_management_id.value.trim() == '조회 버튼을 누르세요') _management_id.value = 관리번호; //빈값이면 전역변수 관리번호로 기입

  console.log('load: ', _management_id.value);

  if (_management_id.value.length == 0) return;

  //기본정보 조회하여 재제조번호를 구함
  find(BSA재제조, _management_id.value);
  await delay();

  if (BSA재제조_v != null) {
    _재제조번호.innerHTML = BSA재제조_v.재제조번호;
  }

  //입고 데이터 쓰이는곳
  find(입고, _management_id.value);
  await delay();

  if (입고_v != 0) {
    _차종.innerHTML = 입고_v.차종;
    _품번.innerHTML = 입고_v.품번;
  }

  //기초검사에서 RO번호를 가져옴
  find(기초검사, _management_id.value);
  await delay();

  if (기초검사_v != null) {
    _RO.innerHTML = 기초검사_v.RO_no;
  }

  //출하정보를 로딩
  find(출하정보, _management_id.value);
  await delay();

  if (출하정보_v != null) {
    _출하일.innerHTML = 출하정보_v.출하일;
    _납품처.innerHTML = 출하정보_v.납품처;
    _검사일.innerHTML = 출하정보_v.검사일;
    _검사자.innerHTML = 출하정보_v.검사자;
    _기초보고서_OK.innerHTML = 출하정보_v.기초보고서_작성확인 == 'OK' ? 'OK' : '';
    _기초보고서_NG.innerHTML = 출하정보_v.기초보고서_작성확인 == 'NG' ? 'NG' : '';
    _완료보고서_OK.innerHTML = 출하정보_v.기초보고서_작성확인 == 'OK' ? 'OK' : '';
    _완료보고서_NG.innerHTML = 출하정보_v.기초보고서_작성확인 == 'NG' ? 'NG' : '';
    _릴레이동시구동_OK.innerHTML = 출하정보_v.릴레이_강제구동 == 'OK' ? 'OK' : '';
    _릴레이동시구동_NG.innerHTML = 출하정보_v.릴레이_강제구동 == 'NG' ? 'NG' : '';
    //_SOC전압_OK.innerHTML = 출하정보_v.SOC == 'OK' ? 'OK' : '';
    //_SOC전압_NG.innerHTML = 출하정보_v.SOC == 'NG' ? 'NG' : '';
    _팩전압.innerHTML = 출하정보_v.배터리팩전압;
    _셀전압_OK.innerHTML = 출하정보_v.배터리셀전압 == 'OK' ? 'OK' : '';
    _셀전압_NG.innerHTML = 출하정보_v.배터리셀전압 == 'NG' ? 'NG' : '';
    _셀전압_최대.innerHTML = 출하정보_v.배터리셀전압_최대;
    _셀전압_최소.innerHTML = 출하정보_v.배터리셀전압_최소;
    _셀전압편차_OK.innerHTML = 출하정보_v.셀전압편차 == 'OK' ? 'OK' : '';
    _셀전압편차_NG.innerHTML = 출하정보_v.셀전압편차 == 'NG' ? 'NG' : '';
    _셀전압편차_측정값.innerHTML = 출하정보_v.셀전압편차_측정값;
    //_DCIR_OK
    //_DCIR_NG
    //_DCIR_측정값
    //_용량평가_OK.innerHTML = 출하정보_v
    //_용량평가_NG.innerHTML = 출하정보_v
    //_용량평가_측정값
    //_케이스_OK
    //_케이스_NG
    //_케이스_측정값
    //_냉각유로 OK
    //_냉각유로 NG
    //_냉각유로 측정값
    //_접지 P OK
    //_접지 P NG
    //_접지 N OK
    //_접지 N NG
    //
    _DTC_OK.innerHTML = 출하정보_v.DTC == 'OK' ? 'OK' : '';
    _DTC_NG.innerHTML = 출하정보_v.DTC == 'NG' ? 'NG' : '';
    _DTC_현재.innerHTML = 출하정보_v.DTC_현재;
    _DTC_과거.innerHTML = 출하정보_v.DTC_과거;

    _배터리충전상태_OK.innerHTML = 출하정보_v.배터리충전상태 == 'OK' ? 'OK' : '';
    _배터리충전상태_NG.innerHTML = 출하정보_v.배터리충전상태 == 'NG' ? 'NG' : '';
    _배터리충전상태_측정값.innerHTML = 출하정보_v.배터리충전상태_측정값;
    _BMS고장NO_OK.innerHTML = 출하정보_v.BMS고장NO == 'OK' ? 'OK' : '';
    _BMS고장NO_NG.innerHTML = 출하정보_v.BMS고장NO == 'NG' ? 'NG' : '';
    _BMS융착NO_OK.innerHTML = 출하정보_v.BMS융착NO == 'OK' ? 'OK' : '';
    _BMS융착NO_NG.innerHTML = 출하정보_v.BMS융착NO == 'NG' ? 'NG' : '';
    _배터리팩전압_OK.innerHTML = 출하정보_v.배터리팩전압 == 'OK' ? 'OK' : '';
    _배터리팩전압_NG.innerHTML = 출하정보_v.배터리팩전압 == 'NG' ? 'NG' : '';
    _배터리모듈온도_OK.innerHTML = 출하정보_v.배터리모듈온도 == 'OK' ? 'OK' : '';
    _배터리모듈온도_NG.innerHTML = 출하정보_v.배터리모듈온도 == 'NG' ? 'NG' : '';
    _배터리모듈온도_최대.innerHTML = 출하정보_v.배터리모듈온도_최대;
    _배터리모듈온도_최소.innerHTML = 출하정보_v.배터리모듈온도_최소;
    _배터리셀간전압편차_OK.innerHTML = 출하정보_v.셀전압편차 == 'OK' ? 'OK' : '';
    _배터리셀간전압편차_NG.innerHTML = 출하정보_v.셀전압편차 == 'NG' ? 'NG' : '';
    _배터리셀간전압편차_측정값.innerHTML = 출하정보_v.셀전압편차_측정값;
    _절연저항_OK.innerHTML = 출하정보_v.절연저항 == 'OK' ? 'OK' : '';
    _절연저항_NG.innerHTML = 출하정보_v.절연저항 == 'NG' ? 'NG' : '';
    _절연저항_측정값.innerHTML = 출하정보_v.절연저항_측정값;
    _SOH_OK.innerHTML = 출하정보_v.SOH == 'OK' ? 'OK' : '';
    _SOH_NG.innerHTML = 출하정보_v.SOH == 'NG' ? 'NG' : '';
    //SOH측정값
    _릴레이강제구동_OK.innerHTML = 출하정보_v.릴레이_강제구동 == 'OK' ? 'OK' : '';
    _릴레이강제구동_NG.innerHTML = 출하정보_v.릴레이_강제구동 == 'NG' ? 'NG' : '';
    _커넥터체결검사_OK.innerHTML = 출하정보_v.커넥터체결검사 == 'OK' ? 'OK' : '';
    _커넥터체결검사_NG.innerHTML = 출하정보_v.커넥터체결검사 == 'NG' ? 'NG' : '';
  }
}

//출하검사 성적서 pdfㄹ 출력
async function 출하검사성적서_save() {
  var _date = new Date();
  var file_name = '출하검사성적서' + _date + '.pdf';

  html2canvas(document.getElementById('_출하검사성적서'), {
    width: (4200 * window.innerWidth) / 1920,
    height: (4600 * window.innerHeight) / 1080,
  }).then((canvas) => {
    var data = canvas.toDataURL();
    var canvas = document.getElementById('_canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = data;
    img.onload = function () {
      ctx.drawImage(img, 1920, 1080);
    };

    canvas.width = 420;
    canvas.width = 460;

    var docDefinition = {
      content: [
        {
          image: data,
          width: 1920,
          height: 1080,
        },
      ],
      pageSize: 'A4',
      pageOrientation: 'landscape',
    };
    pdfMake.createPdf(docDefinition).download(file_name);
  });
  console.log('file name:', file_name);
}
