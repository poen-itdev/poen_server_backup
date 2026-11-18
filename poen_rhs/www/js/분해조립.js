var 재제조번호 = '';

//신버전의 분해조립 메인 화면(이하 분해조립 재제조, 공정대기, 완전분해 3가지 버튼으로 상세 작업이 나뉜다)
async function new_분해조립_시작() {
  //if(flag_loaded == true) return;
  if (worker == '') return;
  if (typeof _management_id == 'undefined') {
    await sleep(DELAY);
    return;
  }
  console.log('new 분해조립 start');
  if (flag_new_분해조립 == true) {
    flag_new_분해조립 = false;
    await new_분해조립_list();

    _management_id.value = 관리번호;
    _재제조번호.value = 재제조번호;
    _차종.value = 차종;
    _차종_title.value = 차종;

    분해조립_조회();
  }
}

//기초보고서, 불량의심부품 화면을 화면에 표출한다. 작업자는 이를 보고 어떤 상세 작업을 할지 선택한다
async function 분해조립_조회() {
  if (_management_id.value != '') {
    관리번호 = _management_id.value;

    find(BSA재제조, 관리번호);
    await delay();

    if (BSA재제조_v != null) {
      차종 = BSA재제조_v.차종;
      _차종.value = 차종;
      _차종_title.value = 차종;

      await 분해조립_기초보고서_조회();
      await 불량의심부품_시작();
    }
  } else {
    if (_재제조번호.value != '') {
      재제조번호 = _재제조번호.value;
      findOne_BSA재제조(BSA재제조, { 재제조번호: _재제조번호.value });
      await delay();

      if (BSA재제조_v != null) {
        관리번호 = BSA재제조_v.관리번호;
        _management_id.value = 관리번호;

        차종 = BSA재제조_v.차종;
        _차종.value = 차종;
        _차종_title.value = 차종;

        await 분해조립_기초보고서_조회();
        await 불량의심부품_시작();
      }
    }
  }
}

//분해조립 공정대기 리스트를 표출한다.
async function new_분해조립_list() {
  findOne_BSA재제조(BSA재제조, {
    공정단계: { $ne: '출하' },
    기초검사: { $ne: '' },
    분해조립: { $eq: '' },
    성능검사: { $eq: '' },
    EOL: { $eq: '' },
    소재지: { $nin: ['공정대기', '품질대기', '구장'] },
    완전분해: { $eq: '' },
    폐기: { $eq: '' },
    출하: { $eq: '' },
    구분: { $nin: ['일반기타', '보증기타'] },
  });
  await delay();

  if (BSA재제조_v != null) {
    find_BSA재제조(BSA재제조, {
      공정단계: { $ne: '출하' },
      기초검사: { $ne: '' },
      분해조립: { $eq: '' },
      성능검사: { $eq: '' },
      EOL: { $eq: '' },
      소재지: { $nin: ['공정대기', '품질대기', '구장'] },
      완전분해: { $eq: '' },
      폐기: { $eq: '' },
      출하: { $eq: '' },
      구분: { $nin: ['일반기타', '보증기타'] },
    });
    await delay();
  }

  console.log(BSA재제조_v);

  new_분해조립_list_table = new Tabulator('#grid_list', {
    layout: 'resizableColumnFit',
    data: BSA재제조_v,
    height: '400px',

    columns: [
      { title: 'ID', field: '_id', sorter: 'string', width: '180' },
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '재제조번호', field: '재제조번호', sorter: 'string', width: '180' },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string', width: '180' },
      { title: '공정단계', field: '공정단계', sorter: 'string', width: '180' },
      { title: '소재지', field: '소재지', sorter: 'string', width: '180' },
      { title: '적재No', field: '적재No', sorter: 'string', visible: true, width: '180' }, //
      { title: '입고', field: '입고', sorter: 'string', visible: true, width: '180' }, //
      { title: '제조투입', field: '제조투입', sorter: 'string', visible: true, width: '180' }, //
      { title: '세척투입일', field: '세척투입일', sorter: 'string', width: '180' },
      { title: '세척', field: '세척', sorter: 'string', visible: true, width: '180' }, //
      { title: '기초검사투입일', field: '기초검사투입일', sorter: 'string', width: '180' },
      { title: '기초검사', field: '기초검사', sorter: 'string', visible: true, width: '180' }, //
      { title: '분해조립투입일', field: '분해조립투입일', sorter: 'string', width: '180' },
      { title: '분해조립', field: '분해조립', sorter: 'string', visible: true, width: '180' }, //
      { title: '성능검사투입일', field: '성능검사투입일', sorter: 'string', width: '180' },
      { title: '성능검사', field: '성능검사', sorter: 'string', visible: true, width: '180' }, //
      { title: 'EOL투입일', field: 'EOL투입일', sorter: 'string', width: '180' },
      { title: 'EOL', field: 'EOL', sorter: 'string', visible: true, width: '180' }, //
      { title: '출하검사', field: '출하검사', sorter: 'string', width: '180' },
      { title: '납품처', field: '납품처', sorter: 'string', width: '180' },
      { title: '출하', field: '출하', sorter: 'string', width: '180' },
      { title: '반품입고', field: '반품입고', sorter: 'string', width: '180' },
      { title: '재출하', field: '재출하', sorter: 'string', width: '180' },
      { title: '완전분해', field: '완전분해', sorter: 'string', width: '180' },
      { title: '완전분해사유', field: '완전분해사유', sorter: 'string', width: '180' },
      { title: '폐기', field: '폐기', sorter: 'string', width: '180' },
      { title: '폐기사유', field: '폐기사유', sorter: 'string', width: '180' },
      { title: '마지막충전일', field: '마지막충전일', sorter: 'string', width: '180' },
      { title: '출하예약', field: '출하예약', sorter: 'string', width: '180' },
      { title: '렉번호', field: '렉번호', sorter: 'string', width: '180' },
    ],
  });

  new_분해조립_list_table.on('rowClick', async function (e, row) {
    console.log('selected 관리번호: ', row.getData().관리번호);
    console.log('selected 차종: ', row.getData().차종);

    //선택한 배터리팩 정보의 정보에서 상세 작업에 필요한 부분들을 가져온다
    관리번호 = row.getData().관리번호;
    차종 = row.getData().차종;
    _management_id.value = 관리번호;
    _재제조번호.value = row.getData().재제조번호;
    _차종.value = 차종;
    _차종_title.value = 차종;

    await sleep(1);

    var yes = confirm('선택한 BSA로 분해조립 공정 정보입력을 시작하시겠습니까?');
    if (yes != true) return;

    await 분해조립_기초보고서_조회();
    await 불량의심부품_시작();
  });

  //Update filters on value change
  document.getElementById('filter-field').addEventListener('change', new_분해조립_updateFilter);
  document.getElementById('filter-type').addEventListener('change', new_분해조립_updateFilter);
  document.getElementById('filter-value').addEventListener('keyup', new_분해조립_updateFilter);

  //Clear filters on "Clear Filters" button click
  document.getElementById('filter-clear').addEventListener('click', function () {
    var fieldEl = document.getElementById('filter-field');
    var typeEl = document.getElementById('filter-type');
    var valueEl = document.getElementById('filter-value');
    fieldEl.value = '';
    typeEl.value = '=';
    valueEl.value = '';

    new_분해조립_list_table.clearFilter();
  });
}

//이전 화면으로 돌아가기(공정 선택화면)
function new_분해조립_exit() {
  back();
}

//기초보고서 정보를 화면에 표시한다.(기초검사.js 코드 내용과 동일하다)
async function 분해조립_기초보고서_조회() {
  find(입고, 관리번호);
  await delay();

  if (입고_v != null) {
    _차종.innerHTML = 입고_v.차종;
    _입고일.innerHTML = 입고_v.입고일;

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
      //alert("차종을 확인해 주세요");
    }
  }

  find(입고_pic, 관리번호);
  await delay();

  if (입고_pic_v != null) {
    _입고사진.src = 입고_pic_v.pic1;
  }

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

  find(부품정보_list, 관리번호);
  await delay();

  if (부품정보_list_v != null) {
    부품정보유무 = 'OK';
  }

  find(세척, 관리번호);
  await delay();

  if (세척_v != null) {
    외부검사 = 세척_v.육안검사_외부;
    외부검사사유 = 세척_v.육안검사_외부_특이사항;
    케이스 = 세척_v.기밀검사_케이스;
    케이스감압량 = 세척_v.기밀검사_케이스_특이사항;
  }

  find(불량의심부품, 관리번호);
  await delay();

  if (불량의심부품_v != null) {
    _재제조comment.innerHTML = 불량의심부품_v.재제조comment;
  }

  findOne_기초검사(기초검사, { 관리번호: 관리번호 });
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

    //common
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

  find(기초검사_pic1, 관리번호);
  await delay();

  if (기초검사_pic1_v != null) {
    // qr code
    _BSA_QR.src = 기초검사_pic1_v.pic1;
  }
}

function new_분해조립_updateFilter() {
  var fieldEl = document.getElementById('filter-field');
  var typeEl = document.getElementById('filter-type');
  var valueEl = document.getElementById('filter-value');

  var filterVal = fieldEl.options[fieldEl.selectedIndex].value;
  var typeVal = typeEl.options[typeEl.selectedIndex].value;

  var filter = filterVal == 'function' ? customFilter : filterVal;

  if (filterVal == 'function') {
    typeEl.disabled = true;
    valueEl.disabled = true;
  } else {
    typeEl.disabled = false;
    valueEl.disabled = false;
  }

  if (filterVal) {
    new_분해조립_list_table.setFilter(filter, typeVal, valueEl.value);
  }
}
