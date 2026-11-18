async function 기초보고서_시작() {
  while (_management_id == undefined) {
    await sleep(1);
  }
  flag_기초보고서 = false;

  기초보고서_조회(false);
  console.log('->', 관리번호);
}

async function 기초보고서_조회(is재제조번호 = false) {
  _management_id.value = 관리번호;

  if (is재제조번호 == true) {
    //재제조 번호로 조회
    findOne_BSA재제조(BSA재제조, { 재제조번호: _재제조번호.value });
    await delay();

    if (BSA재제조_v != null) {
      _management_id.value = BSA재제조_v.관리번호;
      _재제조번호.value = BSA재제조_v.재제조번호;
    }
  } else {
    //관리번호로 조회
    findOne_BSA재제조(BSA재제조, { 관리번호: _management_id.value });
    await delay();

    if (BSA재제조_v != null) {
      _management_id.value = BSA재제조_v.관리번호;
      _재제조번호.value = BSA재제조_v.재제조번호;
    }
  }

  //입고 데이터 조회
  findOne_입고(입고, { 관리번호: _management_id.value });
  await delay();

  if (입고_v != null) {
    _차종.innerHTML = 입고_v.차종;
    _입고일.innerHTML = 입고_v.입고일;

    //차종별 표시할 부분만 표시
    switch (입고_v.차종) {
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
      case 'SK3_EV':
        showTable('_OS_SK3_EV');
        break;

      case 'PU_EV':
        showTable('_PU_EV');
        break;

      default:
        showTable('_CS_EV');
        alert('차종을 확인해 주세요');
    }
  }

  //입고 사진 로딩
  find(입고_pic, _management_id.value);
  await delay();

  if (입고_pic_v != null) {
    _입고사진.src = 입고_pic_v.pic1;
  }

  //사용 변수 선언 및 초기화
  var 외부검사 = '';
  var 외부검사사유 = '';
  var 내부검사 = '';
  var 내부검사사유 = '';
  var 케이스 = '';
  var 케이스감압량 = '';
  var 냉각유로 = '';
  var 냉각유로감압량 = '';
  var 부품정보유무 = 'NG';
  var 절연검사_B_P = '';
  var 절연검사_B_N = '';
  var 절연검사_B_P판정 = '';
  var 절연검사_B_N판정 = '';

  //부푸정보 유무 체크
  find(부품정보_list, _management_id.value);
  await delay();

  if (부품정보_list_v != null) {
    부품정보유무 = 'OK';
  }

  //세척 데이터 로드
  find(세척, _management_id.value);
  await delay();

  if (세척_v != null) {
    외부검사 = 세척_v.육안검사_외부;
    외부검사사유 = 세척_v.육안검사_외부_특이사항;
    케이스 = 세척_v.기밀검사_케이스;
    케이스감압량 = 세척_v.기밀검사_케이스_특이사항;
  }

  //불량 의심 부품 코멘트 로딩
  find(불량의심부품, _management_id.value);
  await delay();

  if (불량의심부품_v != null) {
    _재제조comment.innerHTML = 불량의심부품_v.재제조comment;
  }

  //기초검사 데이터 로딩
  findOne_기초검사(기초검사, { 관리번호: _management_id.value });
  await delay();

  if (기초검사_v != null) {
    var 고장코드 =
      기초검사_v.통신검사_DTC코드1 == '' &&
      기초검사_v.통신검사_DTC코드2 == '' &&
      기초검사_v.통신검사_DTC코드3 == '' &&
      기초검사_v.통신검사_DTC코드4 == '' &&
      기초검사_v.통신검사_DTC코드5 == '' &&
      기초검사_v.통신검사_DTC코드6 == '' &&
      기초검사_v.통신검사_DTC코드7 == '' &&
      기초검사_v.통신검사_DTC코드8 == '' &&
      기초검사_v.통신검사_DTC코드9 == '' &&
      기초검사_v.통신검사_DTC코드10 == ''
        ? 'OK'
        : 'NG';

    //고장사유 멘트 만들기
    var 고장사유 =
      기초검사_v.통신검사_DTC코드1 +
      ' ' +
      기초검사_v.통신검사_DTC코드2 +
      ' ' +
      기초검사_v.통신검사_DTC코드3 +
      ' ' +
      기초검사_v.통신검사_DTC코드4 +
      ' ' +
      기초검사_v.통신검사_DTC코드5 +
      ' ' +
      기초검사_v.통신검사_DTC코드6 +
      ' ' +
      기초검사_v.통신검사_DTC코드7 +
      ' ' +
      기초검사_v.통신검사_DTC코드8 +
      ' ' +
      기초검사_v.통신검사_DTC코드9 +
      ' ' +
      기초검사_v.통신검사_DTC코드10;

    console.log('고장코드 사유:', 고장사유);

    //common (차종에 상관없이 모두 쓰이는 부분)
    _VIN.innerHTML = 기초검사_v.VIN;
    _RO.innerHTML = 기초검사_v.RO_no;
    _주행거리.innerHTML = 기초검사_v.주행거리;
    _차량번호.innerHTML = 기초검사_v.차량번호;
    _생산일.innerHTML = 기초검사_v.BSA생산일자;
    _판매일.innerHTML = 기초검사_v.BSA판매일자;
    _수리일.innerHTML = 기초검사_v.BSA수리일자;
    _관리번호.innerHTML = _management_id.value;
    _필드현상.innerHTML = 기초검사_v.필드현상;
    _센터진단.innerHTML = 기초검사_v.센터진단내용;
    _센터조치.innerHTML = 기초검사_v.AS센터조치;
    _작성자.innerHTML = worker;
    _작성일.innerHTML = 기초검사_v.공정완료일;
    _분석결과값.innerHTML = 기초검사_v.분석결과;

    내부검사 = 기초검사_v.육안검사_내부;
    내부검사사유 = 기초검사_v.육안검사_내부_특이사항;

    냉각유로 = 기초검사_v.기밀검사_냉각유로;
    냉각유로감압량 = 기초검사_v.기밀검사_냉각유로_특이사항;

    절연검사_B_P = 기초검사_v.절연검사_Plus;
    절연검사_B_P판정 = 기초검사_v.절연검사_Plus판정;
    절연검사_B_N = 기초검사_v.절연검사_Minus;
    절연검사_B_N판정 = 기초검사_v.절연검사_Minus판정;

    //차종별 세부항목 처리
    switch (차종) {
      case 'CS':
      case 'CS_EV':
        _CS_외부점검.innerHTML = 외부검사;
        _CS_외부점검사유.innerHTML = 외부검사사유;
        _CS_내부점검.innerHTML = 기초검사_v.육안검사_내부;
        _CS_내부점검사유.innerHTML = 기초검사_v.육안검사_내부_특이사항;
        _CS_케이스.innerHTML = 케이스;
        _CS_케이스감압량.innerHTML = 케이스감압량;
        _CS_냉각유로.innerHTML = 기초검사_v.기밀검사_냉각유로;
        _CS_냉각유로감압량.innerHTML = 기초검사_v.기밀검사_냉각유로_특이사항;
        _CS_PRA_P.innerHTML = 기초검사_v.절연검사_Plus판정;
        _CS_PRA_P값.innerHTML = 기초검사_v.절연검사_Plus;
        _CS_PRA_N.innerHTML = 기초검사_v.절연검사_Minus판정;
        _CS_PRA_N값.innerHTML = 기초검사_v.절연검사_Minus;
        _CS_팩전압.innerHTML = 기초검사_v.통신검사_팩전압판정;
        _CS_팩전압값.innerHTML = 기초검사_v.통신검사_팩전압;
        _CS_셀전압편차.innerHTML = 기초검사_v.통신검사_셀전압편차판정;
        _CS_셀전압편차값.innerHTML = 기초검사_v.통신검사_셀전압편차;
        _CS_릴레이제어.innerHTML = 기초검사_v.통신검사_릴레이구동;
        _CS_릴레이제어사유.innerHTML = 기초검사_v.통신검사_릴레이구동사유;
        _CS_고장코드.innerHTML = 고장코드;
        _CS_고장코드사유.innerHTML = 고장사유;
        _CS_입고정보.innerHTML = 부품정보유무;
        _CS_입고정보사유.innerHTML = 부품정보유무 == 'OK' ? '' : '부품정보 누락';
        _CS_재제조이력.innerHTML = 'OK';
        _CS_재제조이력사유.innerHTML = '';
        break;

      case 'CV':
      case 'CV_EV':
        _CV_외부점검.innerHTML = 외부검사;
        _CV_외부점검사유.innerHTML = 외부검사사유;
        _CV_내부점검.innerHTML = 기초검사_v.육안검사_내부;
        _CV_내부점검사유.innerHTML = 기초검사_v.육안검사_내부_특이사항;
        _CV_케이스.innerHTML = 케이스;
        _CV_케이스감압량.innerHTML = 케이스감압량;
        _CV_냉각유로.innerHTML = 기초검사_v.기밀검사_냉각유로;
        _CV_냉각유로감압량.innerHTML = 기초검사_v.기밀검사_냉각유로_특이사항;
        _CV_PRA_P.innerHTML = 기초검사_v.절연검사_Plus판정;
        _CV_PRA_P값.innerHTML = 기초검사_v.절연검사_Plus;
        _CV_PRA_N.innerHTML = 기초검사_v.절연검사_Minus판정;
        _CV_PRA_N값.innerHTML = 기초검사_v.절연검사_Minus;
        _CV_팩전압.innerHTML = 기초검사_v.통신검사_팩전압판정;
        _CV_팩전압값.innerHTML = 기초검사_v.통신검사_팩전압;
        _CV_셀전압편차.innerHTML = 기초검사_v.통신검사_셀전압편차판정;
        _CV_셀전압편차값.innerHTML = 기초검사_v.통신검사_셀전압편차;
        _CV_릴레이제어.innerHTML = 기초검사_v.통신검사_릴레이구동;
        _CV_릴레이제어사유.innerHTML = 기초검사_v.통신검사_릴레이구동사유;
        _CV_고장코드.innerHTML = 고장코드;
        _CV_고장코드사유.innerHTML = 고장사유;
        _CV_입고정보.innerHTML = 부품정보유무;
        _CV_입고정보사유.innerHTML = '';
        _CV_재제조이력.innerHTML = 'OK';
        _CV_재제조이력사유.innerHTML = '';
        break;

      case 'DE':
      case 'DE_EV':
        _DE_외부점검.innerHTML = 외부검사;
        _DE_외부점검사유.innerHTML = 외부검사사유;
        _DE_내부점검.innerHTML = 기초검사_v.육안검사_내부;
        _DE_내부점검사유.innerHTML = 기초검사_v.육안검사_내부_특이사항;
        _DE_케이스.innerHTML = 케이스;
        _DE_케이스감압량.innerHTML = 케이스감압량;
        _DE_냉각유로.innerHTML = 기초검사_v.기밀검사_냉각유로;
        _DE_냉각유로감압량.innerHTML = 기초검사_v.기밀검사_냉각유로_특이사항;
        _DE_PRA_P.innerHTML = 기초검사_v.절연검사_Plus판정;
        _DE_PRA_P값.innerHTML = 기초검사_v.절연검사_Plus;
        _DE_PRA_N.innerHTML = 기초검사_v.절연검사_Minus판정;
        _DE_PRA_N값.innerHTML = 기초검사_v.절연검사_Minus;
        _DE_팩전압.innerHTML = 기초검사_v.통신검사_팩전압판정;
        _DE_팩전압값.innerHTML = 기초검사_v.통신검사_팩전압;
        _DE_셀전압편차.innerHTML = 기초검사_v.통신검사_셀전압편차판정;
        _DE_셀전압편차값.innerHTML = 기초검사_v.통신검사_셀전압편차;
        _DE_릴레이제어.innerHTML = 기초검사_v.통신검사_릴레이구동;
        _DE_릴레이제어사유.innerHTML = 기초검사_v.통신검사_릴레이구동사유;
        _DE_고장코드.innerHTML = 고장코드;
        _DE_고장코드사유.innerHTML = 고장사유;
        _DE_입고정보.innerHTML = 부품정보유무;
        _DE_입고정보사유.innerHTML = '';
        _DE_재제조이력.innerHTML = 'OK';
        _DE_재제조이력사유.innerHTML = '';
        break;

      case 'HR':
      case 'HR_EV':
        _HR_외부점검.innerHTML = 외부검사;
        _HR_외부점검사유.innerHTML = 외부검사사유;
        _HR_내부점검.innerHTML = 기초검사_v.육안검사_내부;
        _HR_내부점검사유.innerHTML = 기초검사_v.육안검사_내부_특이사항;
        _HR_케이스.innerHTML = 케이스;
        _HR_케이스감압량.innerHTML = 케이스감압량;
        _HR_냉각유로.innerHTML = 기초검사_v.기밀검사_냉각유로;
        _HR_냉각유로감압량.innerHTML = 기초검사_v.기밀검사_냉각유로_특이사항;
        _HR_PRA_P.innerHTML = 기초검사_v.절연검사_Plus판정;
        _HR_PRA_P값.innerHTML = 기초검사_v.절연검사_Plus;
        _HR_PRA_N.innerHTML = 기초검사_v.절연검사_Minus판정;
        _HR_PRA_N값.innerHTML = 기초검사_v.절연검사_Minus;
        _HR_HV커넥터_P.innerHTML = 기초검사_v.절연검사_Minus판정;
        _HR_팩전압.innerHTML = 기초검사_v.통신검사_팩전압판정;
        _HR_팩전압값.innerHTML = 기초검사_v.통신검사_팩전압;
        _HR_셀전압편차.innerHTML = 기초검사_v.통신검사_셀전압편차판정;
        _HR_셀전압편차값.innerHTML = 기초검사_v.통신검사_셀전압편차;
        _HR_릴레이제어.innerHTML = 기초검사_v.통신검사_릴레이구동;
        _HR_릴레이제어사유.innerHTML = 기초검사_v.통신검사_릴레이구동사유;
        _HR_고장코드.innerHTML = 고장코드;
        _HR_고장코드사유.innerHTML = 고장사유;
        _HR_입고정보.innerHTML = 부품정보유무;
        _HR_입고정보사유.innerHTML = '';
        _HR_재제조이력.innerHTML = 'OK';
        _HR_재제조이력사유.innerHTML = '';
        break;

      case 'LK':
      case 'LK_EV':
        _LK_외부점검.innerHTML = 외부검사;
        _LK_외부점검사유.innerHTML = 외부검사사유;
        _LK_내부점검.innerHTML = 기초검사_v.육안검사_내부;
        _LK_내부점검사유.innerHTML = 기초검사_v.육안검사_내부_특이사항;
        _LK_케이스.innerHTML = 케이스;
        _LK_케이스감압량.innerHTML = 케이스감압량;
        _LK_냉각유로.innerHTML = 기초검사_v.기밀검사_냉각유로;
        _LK_냉각유로감압량.innerHTML = 기초검사_v.기밀검사_냉각유로_특이사항;
        _LK_PRA_P.innerHTML = 기초검사_v.절연검사_Plus판정;
        _LK_PRA_P값.innerHTML = 기초검사_v.절연검사_Plus;
        _LK_PRA_N.innerHTML = 기초검사_v.절연검사_Minus판정;
        _LK_PRA_N값.innerHTML = 기초검사_v.절연검사_Minus;
        _LK_팩전압.innerHTML = 기초검사_v.통신검사_팩전압판정;
        _LK_팩전압값.innerHTML = 기초검사_v.통신검사_팩전압;
        _LK_셀전압편차.innerHTML = 기초검사_v.통신검사_셀전압편차판정;
        _LK_셀전압편차값.innerHTML = 기초검사_v.통신검사_셀전압편차;
        _LK_릴레이제어.innerHTML = 기초검사_v.통신검사_릴레이구동;
        _LK_릴레이제어사유.innerHTML = 기초검사_v.통신검사_릴레이구동사유;
        _LK_고장코드.innerHTML = 고장코드;
        _LK_고장코드사유.innerHTML = 고장사유;
        _LK_입고정보.innerHTML = 부품정보유무;
        _LK_입고정보사유.innerHTML = '';
        _LK_재제조이력.innerHTML = 'OK';
        _LK_재제조이력사유.innerHTML = '';
        break;

      case 'LM':
      case 'LM_EV':
        _LM_외부점검.innerHTML = 외부검사;
        _LM_외부점검사유.innerHTML = 외부검사사유;
        _LM_내부점검.innerHTML = 기초검사_v.육안검사_내부;
        _LM_내부점검사유.innerHTML = 기초검사_v.육안검사_내부_특이사항;
        _LM_케이스.innerHTML = 케이스;
        _LM_케이스감압량.innerHTML = 케이스감압량;
        _LM_냉각유로.innerHTML = 기초검사_v.기밀검사_냉각유로;
        _LM_냉각유로감압량.innerHTML = 기초검사_v.기밀검사_냉각유로_특이사항;
        _LM_PRA_P.innerHTML = 기초검사_v.절연검사_Plus판정;
        _LM_PRA_P값.innerHTML = 기초검사_v.절연검사_Plus;
        _LM_PRA_N.innerHTML = 기초검사_v.절연검사_Minus판정;
        _LM_PRA_N값.innerHTML = 기초검사_v.절연검사_Minus;
        _LM_팩전압.innerHTML = 기초검사_v.통신검사_팩전압판정;
        _LM_팩전압값.innerHTML = 기초검사_v.통신검사_팩전압;
        _LM_셀전압편차.innerHTML = 기초검사_v.통신검사_셀전압편차판정;
        _LM_셀전압편차값.innerHTML = 기초검사_v.통신검사_셀전압편차;
        _LM_릴레이제어.innerHTML = 기초검사_v.통신검사_릴레이구동;
        _LM_릴레이제어사유.innerHTML = 기초검사_v.통신검사_릴레이구동사유;
        _LM_고장코드.innerHTML = 고장코드;
        _LM_고장코드사유.innerHTML = 고장사유;
        _LM_입고정보.innerHTML = 부품정보유무;
        _LM_입고정보사유.innerHTML = '';
        _LM_재제조이력.innerHTML = 'OK';
        _LM_재제조이력사유.innerHTML = '';
        break;

      case 'NE':
      case 'NE_EV':
        _NE_외부점검.innerHTML = 외부검사;
        _NE_외부점검사유.innerHTML = 외부검사사유;
        _NE_내부점검.innerHTML = 기초검사_v.육안검사_내부;
        _NE_내부점검사유.innerHTML = 기초검사_v.육안검사_내부_특이사항;
        _NE_케이스.innerHTML = 케이스;
        _NE_케이스감압량.innerHTML = 케이스감압량;
        _NE_냉각유로.innerHTML = 기초검사_v.기밀검사_냉각유로;
        _NE_냉각유로감압량.innerHTML = 기초검사_v.기밀검사_냉각유로_특이사항;
        _NE_PRA_P.innerHTML = 기초검사_v.절연검사_Plus판정;
        _NE_PRA_P값.innerHTML = 기초검사_v.절연검사_Plus;
        _NE_PRA_N.innerHTML = 기초검사_v.절연검사_Minus판정;
        _NE_PRA_N값.innerHTML = 기초검사_v.절연검사_Minus;
        _NE_팩전압.innerHTML = 기초검사_v.통신검사_팩전압판정;
        _NE_팩전압값.innerHTML = 기초검사_v.통신검사_팩전압;
        _NE_셀전압편차.innerHTML = 기초검사_v.통신검사_셀전압편차판정;
        _NE_셀전압편차값.innerHTML = 기초검사_v.통신검사_셀전압편차;
        _NE_릴레이제어.innerHTML = 기초검사_v.통신검사_릴레이구동;
        _NE_릴레이제어사유.innerHTML = 기초검사_v.통신검사_릴레이구동사유;
        _NE_고장코드.innerHTML = 고장코드;
        _NE_고장코드사유.innerHTML = 고장사유;
        _NE_입고정보.innerHTML = 부품정보유무;
        _NE_입고정보사유.innerHTML = '';
        _NE_재제조이력.innerHTML = 'OK';
        _NE_재제조이력사유.innerHTML = '';
        break;

      case 'OS':
      case 'OS_EV':
      case 'SK3':
      case 'SK3_EV':
        _OS_SK3_외부점검.innerHTML = 외부검사;
        _OS_SK3_외부점검사유.innerHTML = 외부검사사유;
        _OS_SK3_내부점검.innerHTML = 기초검사_v.육안검사_내부;
        _OS_SK3_내부점검사유.innerHTML = 기초검사_v.육안검사_내부_특이사항;
        _OS_SK3_케이스.innerHTML = 케이스;
        _OS_SK3_케이스감압량.innerHTML = 케이스감압량;
        _OS_SK3_냉각유로.innerHTML = 기초검사_v.기밀검사_냉각유로;
        _OS_SK3_냉각유로감압량.innerHTML = 기초검사_v.기밀검사_냉각유로_특이사항;
        _OS_SK3_PRA_P.innerHTML = 기초검사_v.절연검사_Plus판정;
        _OS_SK3_PRA_P값.innerHTML = 기초검사_v.절연검사_Plus;
        _OS_SK3_PRA_N.innerHTML = 기초검사_v.절연검사_Minus판정;
        _OS_SK3_PRA_N값.innerHTML = 기초검사_v.절연검사_Minus;
        _OS_SK3_팩전압.innerHTML = 기초검사_v.통신검사_팩전압판정;
        _OS_SK3_팩전압값.innerHTML = 기초검사_v.통신검사_팩전압;
        _OS_SK3_셀전압편차.innerHTML = 기초검사_v.통신검사_셀전압편차판정;
        _OS_SK3_셀전압편차값.innerHTML = 기초검사_v.통신검사_셀전압편차;
        _OS_SK3_릴레이제어.innerHTML = 기초검사_v.통신검사_릴레이구동;
        _OS_SK3_릴레이제어사유.innerHTML = 기초검사_v.통신검사_릴레이구동사유;
        _OS_SK3_고장코드.innerHTML = 고장코드;
        _OS_SK3_고장코드사유.innerHTML = 고장사유;
        _OS_SK3_입고정보.innerHTML = 부품정보유무;
        _OS_SK3_입고정보사유.innerHTML = '';
        _OS_SK3_재제조이력.innerHTML = 'OK';
        _OS_SK3_재제조이력사유.innerHTML = '';
        break;

      case 'PU_EV':
      case 'PU':
        _PU_외부점검.innerHTML = 외부검사;
        _PU_외부점검사유.innerHTML = 외부검사사유;
        _PU_내부점검.innerHTML = 기초검사_v.육안검사_내부;
        _PU_내부점검사유.innerHTML = 기초검사_v.육안검사_내부_특이사항;
        _PU_케이스.innerHTML = 케이스;
        _PU_케이스감압량.innerHTML = 케이스감압량;
        _PU_냉각유로.innerHTML = 기초검사_v.기밀검사_냉각유로;
        _PU_냉각유로감압량.innerHTML = 기초검사_v.기밀검사_냉각유로_특이사항;
        _PU_PRA_P.innerHTML = 기초검사_v.절연검사_Plus판정;
        _PU_PRA_P값.innerHTML = 기초검사_v.절연검사_Plus;
        _PU_PRA_N.innerHTML = 기초검사_v.절연검사_Minus판정;
        _PU_PRA_N값.innerHTML = 기초검사_v.절연검사_Minus;
        _PU_팩전압.innerHTML = 기초검사_v.통신검사_팩전압판정;
        _PU_팩전압값.innerHTML = 기초검사_v.통신검사_팩전압;
        _PU_셀전압편차.innerHTML = 기초검사_v.통신검사_셀전압편차판정;
        _PU_셀전압편차값.innerHTML = 기초검사_v.통신검사_셀전압편차;
        _PU_릴레이제어.innerHTML = 기초검사_v.통신검사_릴레이구동;
        _PU_릴레이제어사유.innerHTML = 기초검사_v.통신검사_릴레이구동사유;
        _PU_고장코드.innerHTML = 고장코드;
        _PU_고장코드사유.innerHTML = 고장사유;
        _PU_입고정보.innerHTML = 부품정보유무;
        _PU_입고정보사유.innerHTML = '';
        _PU_재제조이력.innerHTML = 'OK';
        _PU_재제조이력사유.innerHTML = '';
        break;

      default:
        alert('차종을 확인해 주세요');
    }
  }

  find(세척_pic, _management_id.value);
  await delay();

  if (세척_pic_v != null) {
    //기밀검사-케이스
    _측정사진1.src = 세척_pic_v.pic1;
    _측정값사진1.src = 세척_pic_v.pic2;
    _기밀검사_특이사항1.src = 세척_pic_v.pic3;
    _기밀검사_특이사항2.src = 세척_pic_v.pic4;

    //육안검사 외부1
    _top_pic.src = 세척_pic_v.pic5;
    _front_pic.src = 세척_pic_v.pic6;
    _left_pic.src = 세척_pic_v.pic7;
    _bottom_pic.src = 세척_pic_v.pic8;
    _rear_pic.src = 세척_pic_v.pic9;
    _right_pic.src = 세척_pic_v.pic10;

    //육안검사 외부 2
    _이상부위_외부1.src = 세척_pic_v.pic11;
    _이상부위_외부2.src = 세척_pic_v.pic12;
    _이상부위_외부3.src = 세척_pic_v.pic13;
    _이상부위_외부4.src = 세척_pic_v.pic14;
  }

  _육안검사_결과.innerHTML = 외부검사;
  _육안검사_결과2.innerHTML = 외부검사사유;

  _육안검사_내부_결과.innerHTML = 내부검사;
  _육안검사_내부_결과2.innerHTML = 내부검사사유;

  //사진 로딩
  find(기초검사_pic1, _management_id.value);
  await delay();

  if (기초검사_pic1_v != null) {
    // qr code
    _BSA_QR.src = 기초검사_pic1_v.pic1;

    //육안검사 내부 1
    _allImg.src = 기초검사_pic1_v.pic2;
    _BMU.src = 기초검사_pic1_v.pic3;
    _CMU.src = 기초검사_pic1_v.pic4;
    _PRA.src = 기초검사_pic1_v.pic5;

    //육안검사 내부 2
    _이상부위_내부1.src = 기초검사_pic1_v.pic6;
    _이상부위_내부2.src = 기초검사_pic1_v.pic7;
    _이상부위_내부3.src = 기초검사_pic1_v.pic8;
    _이상부위_내부4.src = 기초검사_pic1_v.pic9;

    //기밀검사 -냉각유로
    _측정사진2.src = 기초검사_pic1_v.pic10;
  }

  find(기초검사_pic2, _management_id.value);
  await delay();

  if (기초검사_pic2_v != null) {
    //기밀검사 -냉각유로
    _측정값사진2.src = 기초검사_pic2_v.pic1;

    //절연검사
    _절연측정사진1.src = 기초검사_pic2_v.pic2;
    _절연측정값사진1.src = 기초검사_pic2_v.pic3;
    _절연측정사진2.src = 기초검사_pic2_v.pic4;

    //절연검사
    _절연측정값사진2.src = 기초검사_pic2_v.pic5;

    //CAN통신검사
    _CAN현재.src = 기초검사_pic2_v.pic6;
    _CAN진단.src = 기초검사_pic2_v.pic7;
    _CAN과거.src = 기초검사_pic2_v.pic8;
    _PDS진단1.src = 기초검사_pic2_v.pic9;
    _PDS진단2.src = 기초검사_pic2_v.pic10;
  }

  //기밀검사 - 케이스
  _케이스.innerHTML = 케이스 + ' : ' + 케이스감압량;
  _냉각유로.innerHTML = 냉각유로 + ' : ' + 냉각유로감압량;

  //절연저항검사
  _절연PRA_P.innerHTML = 절연검사_B_P + ' : ' + 절연검사_B_P판정;
  _절연PRA_N.innerHTML = 절연검사_B_N + ' : ' + 절연검사_B_N판정;
}

function showTable(tableId) {
  // 모든 테이블을 숨김
  const tables = document.querySelectorAll('.tableAll');
  for (let i = 0; i < tables.length; i++) {
    tables[i].style.display = 'none';
  }
  // 선택된 테이블만 표시
  const table = document.getElementById(tableId);
  table.style.display = 'block';
}

async function 기초보고서_save(type = 0) {
  var _date = new Date();
  var file_name = '기초보고서_' + _date + '.pdf';
  var _width = 4200;
  var _height = 2200;

  //기초보고서 저장항목들 저장
  var doc = JSON.parse(JSON.stringify(기초보고서_doc));
  doc.level = '작업자';
  doc.기초보고서 = _cb기초보고서.checked; //각 항목 숨기고 보여주는 기능이 필요했으나 후에 요구사항이 사라져 완성된 기능은 아님
  doc.육안검사외부 = _cb육안검사외부.checked;
  doc.육안검사외부상세 = _cb육안검사외부상세.checked;
  doc.육안검사내부 = _cb육안검사내부.checked;
  doc.육안검사내부상세 = _cb육안검사내부상세.checked;
  doc.기밀검사 = _cb기밀검사.checked;
  doc.절연저항검사 = _cb절연저항검사.checked;
  doc.CAN통신검사 = _cbCAN통신검사.checked;

  update_보고서(기초보고서, doc);
  await delay();

  //이후는 PDF 파일로 만드는 부분임
  if (type == 0) {
    type = document.getElementById('_기초보고서');
    file_name = '기초보고서' + _date + '.pdf';
    _width = 3900;
    _height = 1800;
  }

  if (type == '육외') {
    type = document.getElementById('_육안검사외부1');
    file_name = '기초보고서_육안검사외부' + _date + '.pdf';
    _width = 3600;
    _height = 2000;
  }

  if (type == '육외상') {
    type = document.getElementById('_육안검사외부2');
    file_name = '기초보고서_육안검사외부_상세' + _date + '.pdf';
    _width = 3700;
    _height = 2400;
  }

  if (type == '육내') {
    type = document.getElementById('_육안검사내부1');
    file_name = '기초보고서_육안검사내부' + _date + '.pdf';
    _width = 3650;
    _height = 2700;
  }

  if (type == '육내상') {
    type = document.getElementById('_육안검사내부2');
    file_name = '기초보고서_육안검사내부_상세' + _date + '.pdf';
    _width = 3800;
    _height = 2300;
  }

  if (type == '기밀') {
    type = document.getElementById('_기밀검사');
    file_name = '기초보고서_기밀검사' + _date + '.pdf';
    _width = 3400;
    _height = 2600;
  }

  if (type == '기밀특이') {
    type = document.getElementById('_기밀검사2');
    file_name = '기초보고서_기밀검사_특이사항' + _date + '.pdf';
    _width = 3600;
    _height = 2300;
  }

  if (type == '절연') {
    type = document.getElementById('_절연저항검사');
    file_name = '기초보고서_절연검사' + _date + '.pdf';
    _width = 3600;
    _height = 2600;
  }

  if (type == 'CAN') {
    type = document.getElementById('_CAN통신검사');
    file_name = '기초보고서_CAN통신검사' + _date + '.pdf';
    _width = 3600;
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
