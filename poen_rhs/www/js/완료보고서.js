//필요한 데이터
var 입고_data;
var 입고_pic_data;
var 세척_data;
var 기초_data;
var 기초_pic_data;
var 성능_data;
var EOL_data;
var EOL_pic1_data;
var EOL_pic2_data;
var EOL_pic3_data;
var 완료보고서_data;

var flag_입고정보 = false;

async function 완료보고서_시작() {
  while (_management_id == undefined) {
    await sleep(1);
  }
  flag_완료보고서 = false;

  await 완료보고서_조회();
}

async function 완료보고서_조회(is재제조번호 = false) {
  if (is재제조번호 == true) {
    //재제조번호로 관리번호를 구함
    findOne_BSA재제조(BSA재제조, { 재제조번호: _재제조번호.value });
    await delay();

    if (BSA재제조_v != null) {
      관리번호 = BSA재제조_v.관리번호;
      _management_id.value = 관리번호;
    }
  }

  if (_management_id.value == '') _management_id.value = 관리번호;
  else 관리번호 = _management_id.value;

  if (is재제조번호 == false) {
    //관리번호로 재제조 번호를 구함
    find(BSA재제조, 관리번호);
    await delay();

    if (BSA재제조_v != null) {
      _재제조번호.value = BSA재제조_v.재제조번호;
    }
  }

  //필요한 데이터를 DB에 조회해서 얻는 부분
  find(입고, 관리번호);
  await delay();

  if (입고_v != null) {
    입고_data = JSON.parse(JSON.stringify(입고_v));
  }

  find(입고_pic, 관리번호);
  await delay();

  if (입고_pic_v != null) {
    입고_pic_data = JSON.parse(JSON.stringify(입고_pic_v));
  }

  find(세척, 관리번호);
  await delay();

  if (세척_v != null) {
    세척_data = JSON.parse(JSON.stringify(세척_v));
    await delay();
  }

  find(기초검사, 관리번호);
  await delay();

  if (기초검사_v != null) {
    기초_data = JSON.parse(JSON.stringify(기초검사_v));
  }

  find(기초검사_pic1, 관리번호);
  await delay();

  if (기초검사_pic1_v != null) {
    기초_pic_data = JSON.parse(JSON.stringify(기초검사_pic1_v));
  }

  find(성능검사, 관리번호);
  await delay();

  if (성능검사_v != null) {
    성능_data = JSON.parse(JSON.stringify(성능검사_v));
  }

  find(EOL, 관리번호);
  await delay();

  if (EOL_v != null) {
    EOL_data = JSON.parse(JSON.stringify(EOL_v));
  }

  //용량평가 그래프를 로딩하는 부분
  find(완료보고서, 관리번호);
  await delay();

  if (완료보고서_v != null && 완료보고서_v[0] != undefined) {
    완료보고서_data = await JSON.parse(JSON.stringify(완료보고서_v[0]));

    //pic_to_img(완료보고서_data.pic1, _img1);
    pic_to_img(완료보고서_data.pic2, _img2);
  }

  //부품정보 유무 파악
  find(부품정보_list, 관리번호);
  await delay();

  if (부품정보_list_v != null) {
    flag_입고정보 = true;
  }

  //입고 데이터가 쓰이는 부분
  if (입고_data != null) {
    _RONo.innerHTML = 입고_data.RONo;
    _입고일.innerHTML = 입고_data.입고일;
    _차종.innerHTML = 입고_data.차종;
    console.log('차종:', 입고_data.차종);

    //차종별 표 표출
    switch (입고_data.차종) {
      case 'CS_EV':
        showTable('_CS_EV');
        break;

      case 'CV_EV':
        showTable('_CV_EV');
        break;

      case 'DE_EV':
        showTable('_DE_EV');
        break;

      case 'HR_EV':
        showTable('_HR_EV');
        break;

      case 'PU_EV':
        showTable('_PU_EV');
        break;

      case 'LK_EV':
        showTable('_LK_EV');
        break;

      case 'LM_EV':
        showTable('_LM_EV');
        break;

      case 'NE_EV':
        showTable('_NE_EV');
        break;

      case 'OS_EV':
        showTable('_OS_EV');
        break;

      case 'SK3_EV':
        showTable('_SK3_EV');
        break;

      default:
        showTable('_CS_EV');
        alert('차종을 확인해 주세요');
    }
  } else {
    _RONo.innerHTML = '';
    _입고일.innerHTML = '';
  }

  //기초검사 데이터가 쓰이는 부분
  if (기초_data != null) {
    _VINNo.innerHTML = 기초_data.VIN;
    _RONo.innerHTML = 기초_data.RO_no;
    _주행거리.innerHTML = 기초_data.주행거리;
    _차량번호.innerHTML = 기초_data.차량번호;
    _생산일.innerHTML = 기초_data.BSA생산일자;
    _판매일.innerHTML = 기초_data.BSA판매일자;
    _수리일.innerHTML = 기초_data.BSA수리일자;
    _작성자.innerHTML = worker;
  }

  //기초검사 사진이 쓰이는 부분
  if (기초_pic_data != null) {
    _BSA_QR.src = 기초_pic_data.pic1;
  }

  //EOL 데이터가 쓰이는 부분
  if (EOL_data != null) {
    _부품현황.innerHTML = EOL_data.교체부품명;
    _이슈입력.innerHTML = EOL_data.공정흐름_이슈;
    _작성일.innerHTML = EOL_data.공정완료일;
    _결과.innerHTML = EOL_data.용량평가값;

    switch (입고_data.차종) {
      case 'CS_EV':
        _CS_외부점검.innerHTML = EOL_data.육안검사_외부;
        if (EOL_data.육안검사_외부 == 'OK') _CS_외부점검사유.innerHTML = '이상없음';
        _CS_내부점검.innerHTML = EOL_data.육안검사_내부;
        if (EOL_data.육안검사_내부 == 'OK') _CS_내부점검사유.innerHTML = '이상없음';
        _CS_케이스.innerHTML = EOL_data.기밀검사_케이스;
        _CS_케이스감압량.innerHTML = EOL_data.기밀검사_케이스_특이사항;
        _CS_냉각유로.innerHTML = EOL_data.기밀검사_냉각유로;
        _CS_냉각유로감압량.innerHTML = EOL_data.기밀검사_냉각유로_특이사항;
        _CS_PRA_P.innerHTML = EOL_data.절연검사_Plus;
        _CS_PRA_P값.innerHTML = EOL_data.절연검사_Plus_특이사항;
        _CS_PRA_N.innerHTML = EOL_data.절연검사_Minus;
        _CS_PRA_N값.innerHTML = EOL_data.절연검사_Minus_특이사항;
        _CS_팩전압.innerHTML = EOL_data.통신검사_팩전압;
        _CS_팩전압값.innerHTML = EOL_data.통신검사_팩전압_특이사항;
        _CS_셀전압편차.innerHTML = EOL_data.통신검사_셀전압편차;
        _CS_셀전압편차값.innerHTML = EOL_data.통신검사_셀전압편차_특이사항;
        _CS_릴레이제어.innerHTML = EOL_data.통신검사_릴레이구동;
        _CS_릴레이제어사유.innerHTML = EOL_data.통신검사_릴레이구동사유;
        _CS_고장코드.innerHTML = EOL_data.고장코드유무;
        //_CS_고장코드사유.innerHTML;
        _CS_입고정보.innerHTML = flag_입고정보 ? 'OK' : 'NG';
        //_CS_입고정보사유.innerHTML;
        _CS_재제조이력.innerHTML = 'OK';
        //_CS_재제조이력사유.innerHTML;
        _CS_출하QR.innerHTML = EOL_data.QR != '' ? 'OK' : 'NG';
        _CS_출하QR사유.innerHTML = EOL_data.QR;
        _CS_커버류.innerHTML = EOL_data.커버류;
        if (EOL_data.커버류 == '장착확인') _CS_커버류확인.innerHTML = '커버 장착 확인';
        else _CS_커버류확인.innerHTML = '커버 비장착';
        _CS_브라켓정보.innerHTML = EOL_data.브라켓;
        if (EOL_data.브라켓 == '장착확인') _CS_브라켓값.innerHTML = '재고 부족 시 영업팀과 협의 요망';
        else _CS_브라켓값.innerHTML = '재고 부족 영업팀과 협의 요망';
        break;

      case 'CV_EV':
        _CV_외부점검.innerHTML = EOL_data.육안검사_외부;
        if (_CV_외부점검.innerHTML == 'OK') _CV_외부점검사유.innerHTML = '이상없음';
        _CV_내부점검.innerHTML = EOL_data.육안검사_내부;
        if (_CV_내부점검.innerHTML == 'OK') _CV_내부점검사유.innerHTML = '이상없음';
        _CV_케이스.innerHTML = EOL_data.기밀검사_케이스;
        _CV_케이스감압량.innerHTML = EOL_data.기밀검사_케이스_특이사항;
        _CV_냉각유로.innerHTML = EOL_data.기밀검사_냉각유로;
        _CV_냉각유로감압량.innerHTML = EOL_data.기밀검사_냉각유로_특이사항;
        _CV_PRA_P.innerHTML = EOL_data.절연검사_Plus;
        _CV_PRA_P값.innerHTML = EOL_data.절연검사_Plus_특이사항;
        _CV_PRA_N.innerHTML = EOL_data.절연검사_Minus;
        _CV_PRA_N값.innerHTML = EOL_data.절연검사_Minus_특이사항;
        _CV_팩전압.innerHTML = EOL_data.통신검사_팩전압;
        _CV_팩전압값.innerHTML = EOL_data.통신검사_팩전압_특이사항;
        _CV_셀전압편차.innerHTML = EOL_data.통신검사_셀전압편차;
        _CV_셀전압편차값.innerHTML = EOL_data.통신검사_셀전압편차_특이사항;
        _CV_릴레이제어.innerHTML = EOL_data.통신검사_릴레이구동;
        _CV_릴레이제어사유.innerHTML = EOL_data.통신검사_릴레이구동사유;
        _CV_고장코드.innerHTML = EOL_data.고장코드유무;
        //_CV_고장코드사유.innerHTML;
        _CV_입고정보.innerHTML = flag_입고정보 ? 'OK' : 'NG';
        //_CV_입고정보사유.innerHTML;
        _CV_재제조이력.innerHTML = 'OK';
        //_CV_재제조이력사유.innerHTML;
        _CS_출하QR.innerHTML = EOL_data.QR != '' ? 'OK' : 'NG';
        _CV_출하QR사유.innerHTML = EOL_data.QR;
        _CV_커버류.innerHTML = EOL_data.커버류;
        if (EOL_data.커버류 == '장착확인') _CV_커버류확인.innerHTML = '커버 장착 확인';
        else _CV_커버류확인.innerHTML = '커버 비장착';
        _CV_브라켓정보.innerHTML = EOL_data.브라켓;
        if (EOL_data.브라켓 == '장착확인') _CV_브라켓값.innerHTML = '재고 부족 시 영업팀과 협의 요망';
        else _CV_브라켓값.innerHTML = '재고 부족 영업팀과 협의 요망';
        _CV_ICCU.innerHTML = EOL_data.ICCU;
        //_CV_ICCU값.innerHTML;
        break;

      case 'DE_EV':
        _DE_외부점검.innerHTML = EOL_data.육안검사_외부;
        if (_DE_외부점검.innerHTML == 'OK') _DE_외부점검사유.innerHTML = '이상없음';
        _DE_내부점검.innerHTML = EOL_data.육안검사_내부;
        if (_DE_내부점검.innerHTML == 'OK') _DE_내부점검사유.innerHTML = '이상없음';
        _DE_케이스.innerHTML = EOL_data.기밀검사_케이스;
        _DE_케이스감압량.innerHTML = EOL_data.기밀검사_케이스_특이사항;
        _DE_냉각유로.innerHTML = EOL_data.기밀검사_냉각유로;
        _DE_냉각유로감압량.innerHTML = EOL_data.기밀검사_냉각유로_특이사항;
        _DE_PRA_P.innerHTML = EOL_data.절연검사_Plus;
        _DE_PRA_P값.innerHTML = EOL_data.절연검사_Plus_특이사항;
        _DE_PRA_N.innerHTML = EOL_data.절연검사_Minus;
        _DE_PRA_N값.innerHTML = EOL_data.절연검사_Minus_특이사항;
        _DE_팩전압.innerHTML = EOL_data.통신검사_팩전압;
        _DE_팩전압값.innerHTML = EOL_data.통신검사_팩전압_특이사항;
        _DE_셀전압편차.innerHTML = EOL_data.통신검사_셀전압편차;
        _DE_셀전압편차값.innerHTML = EOL_data.통신검사_셀전압편차_특이사항;
        _DE_릴레이제어.innerHTML = EOL_data.통신검사_릴레이구동;
        _DE_릴레이제어사유.innerHTML = EOL_data.통신검사_릴레이구동사유;
        _DE_고장코드.innerHTML = EOL_data.고장코드유무;
        //_DE_고장코드사유.innerHTML;
        _DE_입고정보.innerHTML = flag_입고정보 ? 'OK' : 'NG';
        //_DE_입고정보사유.innerHTML;
        _DE_재제조이력.innerHTML = 'OK';
        //_DE_재제조이력사유.innerHTML;
        _DE_출하QR.innerHTML = EOL_data.QR != '' ? 'OK' : 'NG';
        _DE_출하QR사유.innerHTML = EOL_data.QR;
        _DE_커버류.innerHTML = EOL_data.커버류;
        if (EOL_data.커버류 == '장착확인') _DE_커버류확인.innerHTML = '커버 장착 확인';
        else _DE_커버류확인.innerHTML = '커버 비장착';
        _DE_브라켓정보.innerHTML = EOL_data.브라켓;
        if (EOL_data.브라켓 == '장착확인') _DE_브라켓값.innerHTML = '재고 부족 시 영업팀과 협의 요망';
        else _DE_브라켓값.innerHTML = '재고 부족 영업팀과 협의 요망';
        break;

      case 'HR_EV':
        _HR_외부점검.innerHTML = EOL_data.육안검사_외부;
        if (_HR_외부점검.innerHTML == 'OK') _HR_외부점검사유.innerHTML = '이상없음';
        _HR_내부점검.innerHTML = EOL_data.육안검사_내부;
        if (_HR_내부점검.innerHTMl == 'OK') _HR_내부점검사유.innerHTML = '이상없음';
        _HR_케이스.innerHTML = EOL_data.기밀검사_케이스;
        _HR_케이스감압량.innerHTML = EOL_data.기밀검사_케이스_특이사항;
        _HR_냉각유로.innerHTML = EOL_data.기밀검사_냉각유로;
        _HR_냉각유로감압량.innerHTML = EOL_data.기밀검사_냉각유로_특이사항;
        _HR_PRA_P.innerHTML = EOL_data.절연검사_Plus;
        _HR_PRA_P값.innerHTML = EOL_data.절연검사_Plus_특이사항;
        _HR_PRA_N.innerHTML = EOL_data.절연검사_Minus;
        _HR_PRA_N값.innerHTML = EOL_data.절연검사_Minus_특이사항;
        _HR_팩전압.innerHTML = EOL_data.통신검사_팩전압;
        _HR_팩전압값.innerHTML = EOL_data.통신검사_팩전압_특이사항;
        _HR_셀전압편차.innerHTML = EOL_data.통신검사_셀전압편차;
        _HR_셀전압편차값.innerHTML = EOL_data.통신검사_셀전압편차_특이사항;
        _HR_릴레이제어.innerHTML = EOL_data.통신검사_릴레이구동;
        _HR_릴레이제어사유.innerHTML = EOL_data.통신검사_릴레이구동사유;
        _HR_고장코드.innerHTML = EOL_data.고장코드유무;
        //_HR_고장코드사유.innerHTML;
        _HR_입고정보.innerHTML = flag_입고정보 ? 'OK' : 'NG';
        //_HR_입고정보사유.innerHTML;
        _HR_재제조이력.innerHTML = 'OK';
        //_HR_재제조이력사유.innerHTML;
        _HR_출하QR.innerHTML = EOL_data.QR != '' ? 'OK' : 'NG';
        _HR_출하QR사유.innerHTML = EOL_data.QR;
        _HR_커버류.innerHTML = EOL_data.커버류;
        if (EOL_data.커버류 == '장착확인') _HR_커버류확인.innerHTML = '커버 장착 확인';
        else _HR_커버류확인.innerHTML = '커버 비장착';
        _HR_브라켓정보.innerHTML = EOL_data.브라켓;
        if (EOL_data.브라켓 == '장착확인') _HR_브라켓값.innerHTML = '재고 부족 시 영업팀과 협의 요망';
        else _HR_브라켓값.innerHTML = '재고 부족 영업팀과 협의 요망';
        break;

      case 'PU_EV':
        _PU_외부점검.innerHTML = EOL_data.육안검사_외부;
        if (_PU_외부점검.innerHTML == 'OK') _PU_외부점검사유.innerHTML = '이상없음';
        _PU_내부점검.innerHTML = EOL_data.육안검사_내부;
        if (_PU_내부점검.innerHTML == 'Ok') _PU_내부점검사유.innerHTML = '이상없음';
        _PU_케이스.innerHTML = EOL_data.기밀검사_케이스;
        _PU_케이스감압량.innerHTML = EOL_data.기밀검사_케이스_특이사항;
        _PU_냉각유로.innerHTML = EOL_data.기밀검사_냉각유로;
        _PU_냉각유로감압량.innerHTML = EOL_data.기밀검사_냉각유로_특이사항;
        _PU_PRA_P.innerHTML = EOL_data.절연검사_Plus;
        _PU_PRA_P값.innerHTML = EOL_data.절연검사_Plus_특이사항;
        _PU_PRA_N.innerHTML = EOL_data.절연검사_Minus;
        _PU_PRA_N값.innerHTML = EOL_data.절연검사_Minus_특이사항;
        _PU_팩전압.innerHTML = EOL_data.통신검사_팩전압;
        _PU_팩전압값.innerHTML = EOL_data.통신검사_팩전압_특이사항;
        _PU_셀전압편차.innerHTML = EOL_data.통신검사_셀전압편차;
        _PU_셀전압편차값.innerHTML = EOL_data.통신검사_셀전압편차_특이사항;
        _PU_릴레이제어.innerHTML = EOL_data.통신검사_릴레이구동;
        _PU_릴레이제어사유.innerHTML = EOL_data.통신검사_릴레이구동사유;
        _PU_고장코드.innerHTML = EOL_data.고장코드유무;
        //_PU_고장코드사유.innerHTML;
        _PU_입고정보.innerHTML = flag_입고정보 ? 'OK' : 'NG';
        //_PU_입고정보사유.innerHTML;
        _PU_재제조이력.innerHTML = 'OK';
        //_PU_재제조이력사유.innerHTML;
        _PU_출하QR.innerHTML = EOL_data.QR != '' ? 'OK' : 'NG';
        _PU_출하QR사유.innerHTML = EOL_data.QR;
        _PU_커버류.innerHTML = EOL_data.커버류;
        if (EOL_data.커버류 == '장착확인') _PU_커버류확인.innerHTML = '커버 장착 확인';
        else _PU_커버류확인.innerHTML = '커버 비장착';
        _PU_브라켓정보.innerHTML = EOL_data.브라켓;
        if (EOL_data.브라켓 == '장착확인') _PU_브라켓값.innerHTML = '재고 부족 시 영업팀과 협의 요망';
        else _PU_브라켓값.innerHTML = '재고 부족 영업팀과 협의 요망';
        break;

      case 'LK_EV':
        _LK_FC_외부점검.innerHTML = EOL_data.육안검사_외부;
        if (_LK_FC_외부점검.innerHTML == 'OK') _LK_FC_외부점검사유.innerHTML = '이상없음';
        _LK_FC_내부점검.innerHTML = EOL_data.육안검사_내부;
        if (_LK_FC_내부점검.innerHTML == 'OK') _LK_FC_내부점검사유.innerHTML = '이상없음';
        _LK_FC_케이스.innerHTML = EOL_data.기밀검사_케이스;
        _LK_FC_케이스감압량.innerHTML = EOL_data.기밀검사_케이스_특이사항;
        _LK_FC_냉각유로.innerHTML = EOL_data.기밀검사_냉각유로;
        _LK_FC_냉각유로감압량.innerHTML = EOL_data.기밀검사_냉각유로_특이사항;
        _LK_FC_PRA_P.innerHTML = EOL_data.절연검사_Plus;
        _LK_FC_PRA_P값.innerHTML = EOL_data.절연검사_Plus_특이사항;
        _LK_FC_PRA_N.innerHTML = EOL_data.절연검사_Minus;
        _LK_FC_PRA_N값.innerHTML = EOL_data.절연검사_Minus_특이사항;
        _LK_FC_팩전압.innerHTML = EOL_data.통신검사_팩전압;
        _LK_FC_팩전압값.innerHTML = EOL_data.통신검사_팩전압_특이사항;
        _LK_FC_셀전압편차.innerHTML = EOL_data.통신검사_셀전압편차;
        _LK_FC_셀전압편차값.innerHTML = EOL_data.통신검사_셀전압편차_특이사항;
        _LK_FC_릴레이제어.innerHTML = EOL_data.통신검사_릴레이구동;
        _LK_FC_릴레이제어사유.innerHTML = EOL_data.통신검사_릴레이구동사유;
        _LK_FC_고장코드.innerHTML = EOL_data.고장코드유무;
        //_LK_FC_고장코드사유.innerHTML;
        _LK_FC_입고정보.innerHTML = flag_입고정보 ? 'OK' : 'NG';
        //_LK_FC_입고정보사유.innerHTML;
        _LK_FC_재제조이력.innerHTML = 'OK';
        //_LK_FC_재제조이력사유.innerHTML;
        _LK_FC_출하QR.innerHTML = EOL_data.QR != '' ? 'OK' : 'NG';
        _LK_FC_출하QR사유.innerHTML = EOL_data.QR;
        _LK_FC_커버류.innerHTML = EOL_data.커버류;
        if (EOL_data.커버류 == '장착확인') _LK_FC_커버류확인.innerHTML = '커버 장착 확인';
        else _LK_FC_커버류확인.innerHTML = '커버 비장착';
        _LK_FC_브라켓정보.innerHTML = EOL_data.브라켓;
        if (EOL_data.브라켓 == '장착확인') _LK_FC_브라켓값.innerHTML = '재고 부족 시 영업팀과 협의 요망';
        else _LK_FC_브라켓값.innerHTML = '재고 부족 영업팀과 협의 요망';
        break;

      case 'LM_EV':
        _LM_외부점검.innerHTML = EOL_data.육안검사_외부;
        if (_LM_외부점검.innerHTML == 'OK') _LM_외부점검사유.innerHTML = '이상없음';
        _LM_내부점검.innerHTML = EOL_data.육안검사_내부;
        if (_LM_내부점검.innerHTML == 'OK') _LM_내부점검사유.innerHTML = '이상없음';
        _LM_케이스.innerHTML = EOL_data.기밀검사_케이스;
        _LM_케이스감압량.innerHTML = EOL_data.기밀검사_케이스_특이사항;
        _LM_냉각유로.innerHTML = EOL_data.기밀검사_냉각유로;
        _LM_냉각유로감압량.innerHTML = EOL_data.기밀검사_냉각유로_특이사항;
        _LM_PRA_P.innerHTML = EOL_data.절연검사_Plus;
        _LM_PRA_P값.innerHTML = EOL_data.절연검사_Plus_특이사항;
        _LM_PRA_N.innerHTML = EOL_data.절연검사_Minus;
        _LM_PRA_N값.innerHTML = EOL_data.절연검사_Minus_특이사항;
        _LM_팩전압.innerHTML = EOL_data.통신검사_팩전압;
        _LM_팩전압값.innerHTML = EOL_data.통신검사_팩전압_특이사항;
        _LM_셀전압편차.innerHTML = EOL_data.통신검사_셀전압편차;
        _LM_셀전압편차값.innerHTML = EOL_data.통신검사_셀전압편차_특이사항;
        _LM_릴레이제어.innerHTML = EOL_data.통신검사_릴레이구동;
        _LM_릴레이제어사유.innerHTML = EOL_data.통신검사_릴레이구동사유;
        _LM_고장코드.innerHTML = EOL_data.고장코드유무;
        //_LM_고장코드사유.innerHTML;
        _LM_입고정보.innerHTML = flag_입고정보 ? 'OK' : 'NG';
        //_LM_입고정보사유.innerHTML;
        _LM_재제조이력.innerHTML = 'OK';
        //_LM_재제조이력사유.innerHTML;
        _LM_출하QR.innerHTML = EOL_data.QR != '' ? 'OK' : 'NG';
        _LM_출하QR사유.innerHTML = EOL_data.QR;
        _LM_커버류.innerHTML = EOL_data.커버류;
        if (EOL_data.커버류 == '장착확인') _LM_커버류확인.innerHTML = '커버 장착 확인';
        else _LM_커버류확인.innerHTML = '커버 비장착';
        _LM_브라켓정보.innerHTML = EOL_data.브라켓;
        if (EOL_data.브라켓 == '장착확인') _LM_브라켓값.innerHTML = '재고 부족 시 영업팀과 협의 요망';
        else _LM_브라켓값.innerHTML = '재고 부족 영업팀과 협의 요망';
        break;

      case 'NE_EV':
        _NE_외부점검.innerHTML = EOL_data.육안검사_외부;
        if (_NE_외부점검.innerHTML == 'OK') _NE_외부점검사유.innerHTML = '';
        _NE_내부점검.innerHTML = EOL_data.육안검사_내부;
        if (_NE_내부점검.innerHTML == 'OK') _NE_내부점검사유.innerHTML = '';
        _NE_케이스.innerHTML = EOL_data.기밀검사_케이스;
        _NE_케이스감압량.innerHTML = EOL_data.기밀검사_케이스_특이사항;
        _NE_냉각유로.innerHTML = EOL_data.기밀검사_냉각유로;
        _NE_냉각유로감압량.innerHTML = EOL_data.기밀검사_냉각유로_특이사항;
        _NE_PRA_P.innerHTML = EOL_data.절연검사_Plus;
        _NE_PRA_P값.innerHTML = EOL_data.절연검사_Plus_특이사항;
        _NE_PRA_N.innerHTML = EOL_data.절연검사_Minus;
        _NE_PRA_N값.innerHTML = EOL_data.절연검사_Minus_특이사항;
        _NE_팩전압.innerHTML = EOL_data.통신검사_팩전압;
        _NE_팩전압값.innerHTML = EOL_data.통신검사_팩전압_특이사항;
        _NE_셀전압편차.innerHTML = EOL_data.통신검사_셀전압편차;
        _NE_셀전압편차값.innerHTML = EOL_data.통신검사_셀전압편차_특이사항;
        _NE_릴레이제어.innerHTML = EOL_data.통신검사_릴레이구동;
        _NE_릴레이제어사유.innerHTML = EOL_data.통신검사_릴레이구동사유;
        _NE_고장코드.innerHTML = EOL_data.고장코드유무;
        //_NE_고장코드사유.innerHTML;
        _NE_입고정보.innerHTML = flag_입고정보 ? 'OK' : 'NG';
        //_NE_입고정보사유.innerHTML;
        _NE_재제조이력.innerHTML = 'OK';
        //_NE_재제조이력사유.innerHTML;
        _NE_출하QR.innerHTML = EOL_data.QR != '' ? 'OK' : 'NG';
        _NE_출하QR사유.innerHTML = EOL_data.QR;
        _NE_커버류.innerHTML = EOL_data.커버류;
        if (EOL_data.커버류 == '장착확인') _NE_커버류확인.innerHTML = '커버 장착 확인';
        else _NE_커버류확인.innerHTML = '커버 비장착';
        _NE_브라켓정보.innerHTML = EOL_data.브라켓;
        if (EOL_data.브라켓 == '장착확인') _NE_브라켓값.innerHTML = '재고 부족 시 영업팀과 협의 요망';
        else _NE_브라켓값.innerHTML = '재고 부족 영업팀과 협의 요망';
        break;

      case 'OS_EV':
        console.log(EOL_data);
        _OS_외부점검.innerHTML = EOL_data.육안검사_외부;
        if (_OS_외부점검.innerHTML == 'OK') _OS_외부점검사유.innerHTML = '';
        _OS_내부점검.innerHTML = EOL_data.육안검사_내부;
        if (_OS_내부점검.innerHTMl == 'Ok') _OS_내부점검사유.innerHTML = '';
        _OS_케이스.innerHTML = EOL_data.기밀검사_케이스;
        _OS_케이스감압량.innerHTML = EOL_data.기밀검사_케이스_특이사항;
        _OS_냉각유로.innerHTML = EOL_data.기밀검사_냉각유로;
        _OS_냉각유로감압량.innerHTML = EOL_data.기밀검사_냉각유로_특이사항;
        _OS_PRA_P.innerHTML = EOL_data.절연검사_Plus;
        _OS_PRA_P값.innerHTML = EOL_data.절연검사_Plus_특이사항;
        _OS_PRA_N.innerHTML = EOL_data.절연검사_Minus;
        _OS_PRA_N값.innerHTML = EOL_data.절연검사_Minus_특이사항;
        _OS_팩전압.innerHTML = EOL_data.통신검사_팩전압;
        _OS_팩전압값.innerHTML = EOL_data.통신검사_팩전압_특이사항;
        _OS_셀전압편차.innerHTML = EOL_data.통신검사_셀전압편차;
        _OS_셀전압편차값.innerHTML = EOL_data.통신검사_셀전압편차_특이사항;
        _OS_릴레이제어.innerHTML = EOL_data.통신검사_릴레이구동;
        _OS_릴레이제어사유.innerHTML = EOL_data.통신검사_릴레이구동사유;
        _OS_고장코드.innerHTML = EOL_data.고장코드유무;
        //_OS_고장코드사유.innerHTML;
        _OS_입고정보.innerHTML = flag_입고정보 ? 'OK' : 'NG';
        //_OS_입고정보사유.innerHTML;
        _OS_재제조이력.innerHTML = 'OK';
        //_OS_재제조이력사유.innerHTML;
        _OS_출하QR.innerHTML = EOL_data.QR != '' ? 'OK' : 'NG';
        _OS_출하QR사유.innerHTML = EOL_data.QR;
        _OS_커버류.innerHTML = EOL_data.커버류;
        if (EOL_data.커버류 == '장착확인') _OS_커버류확인.innerHTML = '커버 장착 확인';
        else _OS_커버류확인.innerHTML = '커버 비장착';
        _OS_브라켓정보.innerHTML = EOL_data.브라켓;
        if (EOL_data.브라켓 == '장착확인') _OS_브라켓값.innerHTML = '재고 부족 시 영업팀과 협의 요망';
        else _OS_브라켓값.innerHTML = '재고 부족 영업팀과 협의 요망';
        break;

      case 'SK3_EV':
        _SK3_외부점검.innerHTML = EOL_data.육안검사_외부;
        if (_SK3_외부점검.innerHTML == 'OK') _SK3_외부점검사유.innerHTML = '';
        _SK3_내부점검.innerHTML = EOL_data.육안검사_내부;
        if (_SK3_내부점검.innerHTML == 'OK') _SK3_내부점검사유.innerHTML = '';
        _SK3_케이스.innerHTML = EOL_data.기밀검사_케이스;
        _SK3_케이스감압량.innerHTML = EOL_data.기밀검사_케이스_특이사항;
        _SK3_냉각유로.innerHTML = EOL_data.기밀검사_냉각유로;
        _SK3_냉각유로감압량.innerHTML = EOL_data.기밀검사_냉각유로_특이사항;
        _SK3_PRA_P.innerHTML = EOL_data.절연검사_Plus;
        _SK3_PRA_P값.innerHTML = EOL_data.절연검사_Plus_특이사항;
        _SK3_PRA_N.innerHTML = EOL_data.절연검사_Minus;
        _SK3_PRA_N값.innerHTML = EOL_data.절연검사_Minus_특이사항;
        _SK3_팩전압.innerHTML = EOL_data.통신검사_팩전압;
        _SK3_팩전압값.innerHTML = EOL_data.통신검사_팩전압_특이사항;
        _SK3_셀전압편차.innerHTML = EOL_data.통신검사_셀전압편차;
        _SK3_셀전압편차값.innerHTML = EOL_data.통신검사_셀전압편차_특이사항;
        _SK3_릴레이제어.innerHTML = EOL_data.통신검사_릴레이구동;
        _SK3_릴레이제어사유.innerHTML = EOL_data.통신검사_릴레이구동사유;
        _SK3_고장코드.innerHTML = EOL_data.고장코드유무;
        //_SK3_고장코드사유.innerHTML;
        _SK3_입고정보.innerHTML = flag_입고정보 ? 'OK' : 'NG';
        //_SK3_입고정보사유.innerHTML;
        _SK3_재제조이력.innerHTML = 'OK';
        //_SK3_재제조이력사유.innerHTML;
        _SK3_출하QR.innerHTML = EOL_data.QR != '' ? 'OK' : 'NG';
        _SK3_출하QR사유.innerHTML = EOL_data.QR;
        _SK3_커버류.innerHTML = EOL_data.커버류;
        if (EOL_data.커버류 == '장착확인') _SK3_커버류확인.innerHTML = '커버 장착 확인';
        else _SK3_커버류확인.innerHTML = '커버 비장착';
        _SK3_브라켓정보.innerHTML = EOL_data.브라켓;
        if (EOL_data.브라켓 == '장착확인') _SK3_브라켓값.innerHTML = '재고 부족 시 영업팀과 협의 요망';
        else _SK3_브라켓값.innerHTML = '재고 부족 영업팀과 협의 요망';
        break;

      default:
        alert('차종을 확인해 주세요');
    }
  }

  //EOL 사진 및 데이터가 쓰이는 부분
  find(EOL_pic1, 관리번호);
  await delay();

  if (EOL_pic1_v != null) {
    EOL_pic1_data = JSON.parse(JSON.stringify(EOL_pic1_v));
  }

  if (EOL_pic1_data != null) {
    _입고사진.src = EOL_pic1_data.pic7;

    _top_pic.src = EOL_pic1_data.pic1;
    _front_pic.src = EOL_pic1_data.pic2;
    _left_pic.src = EOL_pic1_data.pic3;
    _bottom_pic.src = EOL_pic1_data.pic4;
    _rear_pic.src = EOL_pic1_data.pic5;
    _right_pic.src = EOL_pic1_data.pic6;
    _육안검사_결과.innerHTML = EOL_data.육안검사_외부;

    //육안검사 내부
    _allImg.src = EOL_pic1_data.pic7;
    _BMU.src = EOL_pic1_data.pic8;
    _CMU.src = EOL_pic1_data.pic9;
    _PRA.src = EOL_pic1_data.pic10;
    _육안검사_내부_결과.innerHTML = EOL_data.육안검사_내부;
  }

  find(EOL_pic2, 관리번호);
  await delay();

  if (EOL_pic2_v != null) {
    EOL_pic2_data = JSON.parse(JSON.stringify(EOL_pic2_v));
  }

  if (EOL_pic2_data != null) {
    //기밀검사
    _측정사진1.src = EOL_pic2_data.pic1;
    _측정값사진1.src = EOL_pic2_data.pic2;
    _측정사진2.src = EOL_pic2_data.pic3;
    _측정값사진2.src = EOL_pic2_data.pic4;
    _케이스.innerHTML = EOL_data.기밀검사_케이스;
    _냉각유로.innerHTML = EOL_data.기밀검사_냉각유로;

    //절연 저항 검사
    _절연측정사진1.src = EOL_pic2_data.pic5;
    _절연측정값사진1.src = EOL_pic2_data.pic6;
    _절연측정사진2.src = EOL_pic2_data.pic7;
    _절연측정값사진2.src = EOL_pic2_data.pic8;
    _절연PRA_P.innerHTML = EOL_data.절연검사_Plus;
    _절연PRA_N.innerHTML = EOL_data.절연검사_Minus;
  }

  find(EOL_pic3, 관리번호);
  await delay();

  if (EOL_pic3_v != null) {
    EOL_pic3_data = JSON.parse(JSON.stringify(EOL_pic3_v));
  }

  if (EOL_pic3_data != null) {
    //CAN 통신 검사 - G-SCAN 진단결과
    _CAN현재.src = EOL_pic3_data.pic1;
    _CAN과거.src = EOL_pic3_data.pic2;
    _CAN진단.src = EOL_pic3_data.pic3;

    //CAN 통신 검사
    _PDS진단1.src = EOL_pic3_data.pic4;
    _PDS진단2.src = EOL_pic3_data.pic5;

    _EOL항목검사사진.src = EOL_pic3_data.pic4;
    _CELL전압검사사진.src = EOL_pic3_data.pic5;
  }

  if (EOL_data != undefined) {
    _EOL항목_릴레이제어.innerHTML = EOL_data.통신검사_릴레이구동;
    _EOL항목_팩전압.innerHTML = EOL_data.통신검사_팩전압_특이사항;
    _EOL항목검사.innerHTML = EOL_data.통신검사_릴레이구동 == 'OK' && EOL_data.통신검사_팩전압 == 'OK' ? 'OK' : 'NG';

    _CELL전압_MAX.innerHTML = EOL_data.통신검사_셀전압MAX;
    _CELL전압_MIN.innerHTML = EOL_data.통신검사_셀전압MIN;
    _CELL전압_편차.innerHTML = EOL_data.통신검사_셀전압편차_특이사항;
    _CELL전압검사.innerHTML = EOL_data.통신검사_셀전압MAX != '' && EOL_data.통신검사_셀전압MIN != '' && EOL_data.통신검사_CELL전압_편차 != '' ? 'OK' : 'NG';
  }

  //DCIR
  //_img1.ondblclick = function (evt) {
  //  _img1.src = "";
  //};
  //_img1.ondrop = function (evt) {
  //  var files = evt.dataTransfer?.files;
  //  if (files.length > 0) {
  //    console.log("drag & drop");
  //   resize_pic(files[0], _img1, true);
  //  }
  //  evt.preventDefault();
  //};

  //_img1.ondragover = function (evt) {
  //  evt.preventDefault();
  //  console.log("dragover!");
  //};

  //DCIR 표와 그래프를 성능검사 데이터에서 가져와 만드는 부분(성능검사에서 파일 업로드후 값 추출후 저장하면 해당 값들이 저장됨)
  if (성능_data != undefined) {
    var _chart = new Chart(_DCIR_canvas, {
      type: 'line',
      data: {
        labels: ['Discharge', 'Charge', 'Discharge', 'Charge', 'Discharge', 'Charge'],
        datasets: [
          {
            label: 'DC-IR 계산값',
            data: [성능_data.DCIR_Charge1, 성능_data.DCIR_Charge2, 성능_data.DCIR_Charge3, 성능_data.DCIR_Charge4, 성능_data.DCIR_Charge5, 성능_data.DCIR_Charge6],
          },
        ],
      },
      options: {
        pointRadius: 10,
        pointHoverRadius: 10,
        scales: {
          y: {
            min: Number(성능_data.DCIR_Charge1) - 30,
            max: Number(성능_data.DCIR_Charge1) + 30,
          },
        },
      },
    });

    _전류A1.innerHTML = 성능_data.CURR1;
    _전류A2.innerHTML = 성능_data.CURR3;
    _전류A3.innerHTML = 성능_data.CURR5;

    _전압V1.innerHTML = 성능_data.VOLT1;
    _전압V2.innerHTML = 성능_data.VOLT2;
    _전압V3.innerHTML = 성능_data.VOLT3;
    _전압V4.innerHTML = 성능_data.VOLT4;
    _전압V5.innerHTML = 성능_data.VOLT5;
    _전압V6.innerHTML = 성능_data.VOLT6;
    _전압V7.innerHTML = 성능_data.VOLT7;
    _전압V8.innerHTML = 성능_data.VOLT8;
    _전압V9.innerHTML = 성능_data.VOLT9;
    _전압V10.innerHTML = 성능_data.VOLT10;
    _전압V11.innerHTML = 성능_data.VOLT11;
    _전압V12.innerHTML = 성능_data.VOLT12;

    _DCIR_Charge1.innerHTML = 성능_data.DCIR_Charge1;
    _DCIR_Charge2.innerHTML = 성능_data.DCIR_Charge2;
    _DCIR_Charge3.innerHTML = 성능_data.DCIR_Charge3;
    _DCIR_Charge4.innerHTML = 성능_data.DCIR_Charge4;
    _DCIR_Charge5.innerHTML = 성능_data.DCIR_Charge5;
    _DCIR_Charge6.innerHTML = 성능_data.DCIR_Charge6;

    _DCIR검사_결과.innerHTML = Number(성능_data.DCIR).toFixed(2);
  }

  //용량평가
  _img2.ondblclick = function (evt) {
    _img2.src = '';
  };

  //드래그앤드롭으로도 넣을 수 있게만든부분
  _img2.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img2, true);
    }
    evt.preventDefault();
  };

  _img2.ondragover = function (evt) {
    evt.preventDefault();
  };

  //성능검사 데이터중 그래프 이미지를 사용하는 부분
  if (성능_data != undefined) {
    if (_img2.src == '') _img2.src = 성능_data.chart;
    _용량평가_결과.innerHTML = Number(성능_data.용량평가).toFixed(2);
  }
}

function showTable(tableId) {
  // 모든 테이블을 숨김
  const tables = document.querySelectorAll('.tableAll');
  for (let i = 0; i < tables.length; i++) {
    tables[i].style.display = 'none';
  }
  // 선택된 테이블만 표시
  document.getElementById(tableId).style.display = 'table';
}

//저장 버튼을 누르면 용량평가 그래프 이미지를 저장
async function 완료보고서_save() {
  var doc = {
    관리번호: 관리번호,
    //pic1: _img1.src,
    pic2: _img2.src,
  };

  update(완료보고서, doc);
  await delay();

  console.log(update_count);
  console.log(insert_count);

  if (update_count > 0) {
    alert('업데이트 되었습니다');
  }

  if (insert_count > 0) {
    alert('저장 되었습니다');
  }
}

//완료보고서를 PDF로 출력하는 부분
async function 완료보고서_save_pdf(type = 0) {
  var _date = new Date();
  var file_name = '완료보고서' + _date + '.pdf';
  var _width = 4000;
  var _height = 2000;

  if (type == 0) type = document.getElementById('_완료보고서');

  if (type == '육외') {
    type = document.getElementById('_육안검사외부');
    file_name = '완료보고서_육안검사외부' + _date + '.pdf';
    _width = 4000;
    _height = 2000;
  }

  if (type == '육내') {
    type = document.getElementById('_육안검사내부');
    file_name = '완료보고서_육안검사내부' + _date + '.pdf';
    _width = 4200;
    _height = 2700;
  }

  if (type == '기밀') {
    type = document.getElementById('_기밀검사');
    file_name = '완료보고서_기밀검사' + _date + '.pdf';
    _width = 4200;
    _height = 2700;
  }

  if (type == '절연') {
    type = document.getElementById('_절연저항검사');
    file_name = '완료보고서_절연저항검사' + _date + '.pdf';
    _width = 4200;
    _height = 2700;
  }

  if (type == 'CAN1') {
    type = document.getElementById('_CAN통신검사');
    file_name = '완료보고서_CAN통신검사' + _date + '.pdf';
    _width = 4200;
    _height = 2000;
  }

  if (type == 'CAN2') {
    type = document.getElementById('_CAN통신검사2');
    file_name = '완료보고서_CAN통신검사2' + _date + '.pdf';
    _width = 4200;
    _height = 2400;
  }

  if (type == 'DCIR') {
    type = document.getElementById('_DCIR검사');
    file_name = '완료보고서_DCIR검사' + _date + '.pdf';
    _width = 3700;
    _height = 3000;
  }

  if (type == '용량') {
    type = document.getElementById('_용량평가');
    file_name = '완료보고서_용량평가' + _date + '.pdf';
    _width = 4200;
    _height = 2000;
  }

  html2canvas(type, {
    width: (_width * window.innerWidth) / 1920,
    height: (_height * window.innerHeight) / 1080,
  }).then((canvas) => {
    var data = canvas.toDataURL();
    var canvas = document.getElementById('_canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = data;
    img.onload = function () {
      ctx.drawImage(img, 1920, 1080);
    };

    canvas.width = _width / 10;
    canvas.height = _height / 10;

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

function download() {
  downloadURI(_CAN진단.src, 관리번호 + '_' + '센서진단.png');
}
