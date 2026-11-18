let 브라켓 = '';
let S_PLUG = '';
let 접지 = '';

async function 출하정보_시작(is재제조 = 0) {
  if (worker == '') return;
  if (typeof _management_id == 'undefined') {
    await sleep(DELAY);
    return;
  }

  if (flag_출하 == true) await 출하정보_list();
  flag_출하 = false;

  if (is재제조 == 0) {
    //관리번호로 조회
    if (_management_id.value.length == 0) return;

    find(BSA재제조, _management_id.value);
    await delay();
    if (BSA재제조_v != null) {
      _재제조번호.value = BSA재제조_v.재제조번호;
      _RO_no.value = BSA재제조_v.RO_no;
      _차종.value = BSA재제조_v.차종;
      _품번.value = BSA재제조_v.품번;
    } else {
      _재제조번호.value = '';
      _RO_no.value = '';
      _차종.value = '';
      _품번.value = '';
    }
  } else if (is재제조 == 1) {
    //재제조번호로 조회
    if (_재제조번호.value.length == 0) return;

    findOne_BSA재제조(BSA재제조, { 재제조번호: _재제조번호.value });
    await delay();

    if (BSA재제조_v != null) {
      _management_id.value = BSA재제조_v.관리번호;
      _RO_no.value = BSA재제조_v.RO_no;
      _차종.value = BSA재제조_v.차종;
      _품번.value = BSA재제조_v.품번;
    } else {
      _management_id.value = '';
      _RO_no.value = '';
      _차종.value = '';
      _품번.value = '';
    }
  } else if (is재제조 == 2) {
    //RO 번호로 조회
    if (_RO_no.value.length == 0) return;

    findOne_BSA재제조(BSA재제조, { RO_no: _RO_no.value });
    await delay();

    if (BSA재제조_v != null) {
      _management_id.value = BSA재제조_v.관리번호;
      _재제조번호.value = BSA재제조_v.재제조번호;
      _차종.value = BSA재제조_v.차종;
      _품번.value = BSA재제조_v.품번;
    } else {
      _management_id.value = '';
      _재제조번호.value = '';
      _차종.value = '';
      _품번.value = '';
    }
  }

  console.log('load: ', _management_id.value);
  let 브라켓_text = document.getElementById('_브라켓');
  let s_plug_show = document.getElementById('_S_PLUG');
  let s_plug_show_비고 = document.getElementById('_S_PLUG_비고');
  s_plug_show.disabled = false; //차종별 항목의 차이가 있는 부품
  s_plug_show_비고.disabled = false; //차종별 항목의 차이가 있는 부품

  switch (_차종.value) {
    case 'DE':
    case 'DE_EV':
    case 'OS':
    case 'OS_EV':
    case 'SK3':
    case 'SK3_EV':
      브라켓_text.innerHTML = '브라켓 4개';
      break;

    case 'PU':
    case 'PU_EV':
    case 'HR':
    case 'HR_EV':
      브라켓_text.innerHTML = '브라켓 3개';
      s_plug_show.disabled = true;
      s_plug_show_비고.disabled = true;
      break;

    case 'CV':
    case 'CV_EV':
    case 'NE':
    case 'NE_EV':
      브라켓_text.innerHTML = '브라켓 9개( 55mm : 1개, 35mm : 8개 )';
      s_plug_show.disabled = true;
      s_plug_show_비고.disabled = true;
      break;

    case 'LK':
    case 'LK_EV':
      브라켓_text.innerHTML = '아이볼트 4개';
      break;

    case 'LM':
    case 'LM_EV':
      브라켓_text.innerHTML = '아이볼트 4개';
      s_plug_show.disabled = true;
      s_plug_show_비고.disabled = true;
      break;

    case 'CS':
    case 'CS_EV':
      브라켓_text.innerHTML = 'M1,S2/브라켓 4개/S1/브라켓 1개';
      s_plug_show.disabled = true;
      s_plug_show_비고.disabled = true;

      break;
    default:
      //alert('차종 정보를 확인해주세요');
      break;
  }

  //셀렉트 박스들의 첫번째 옵션을 기본으로 셋팅
  _bracket.options[0].selected = true;
  _S_PLUG.options[0].selected = true;
  _접지.options[0].selected = true;
  s1.options[0].selected = true;
  s2.options[0].selected = true;
  s3.options[0].selected = true;
  s4.options[0].selected = true;
  s5.options[0].selected = true;
  s6.options[0].selected = true;
  s7.options[0].selected = true;
  s8.options[0].selected = true;
  s9.options[0].selected = true;
  s10.options[0].selected = true;
  s11.options[0].selected = true;
  s12.options[0].selected = true;
  s13.options[0].selected = true;
  s14.options[0].selected = true;
  s15.options[0].selected = true;
  s16.options[0].selected = true;
  s17.options[0].selected = true;
  s18.options[0].selected = true;
  s19.options[0].selected = true;
  s20.options[0].selected = true;
  s21.options[0].selected = true;

  //출하정보 로딩
  find(출하정보, _management_id.value);
  await delay();
  if (출하정보_v != null) {
    console.log('관리번호:', 관리번호);

    _출하코드.value = 출하정보_v.출하코드;

    if (_출하코드.value == '') {
      //EOL에서 QR을 가져옴
      find(EOL, _management_id.value);
      await delay();

      if (EOL_v != null) {
        _출하코드.value = EOL_v.QR;
      }
    }

    _검사일.value = 출하정보_v.검사일;
    if (_검사자.value == '' || _검사자.value == undefined) _검사자.value = 계정_stat.이름;
    _출하코드.value = 출하정보_v.출하코드;
    _기초보고서_작성확인.value = 출하정보_v.기초보고서_작성확인;
    _완료보고서_작성확인.value = 출하정보_v.완료보고서_작성확인;
    _클린상태.value = 출하정보_v.클린상태;
    _팔레트_적정위치.value = 출하정보_v.팔레트_적정위치;
    _포장랩상태.value = 출하정보_v.포장랩상태;
    _UPR_QR.value = 출하정보_v.UPR_QR;
    _LWR_QR.value = 출하정보_v.LWR_QR;
    _HKMC_스티커_URP.value = 출하정보_v.HKMC_스티커_URP;
    _냉각유로_커버.value = 출하정보_v.냉각유로_커버;
    _브라켓_비고.value = 출하정보_v.브라켓_비고;
    _S_PLUG_비고.value = 출하정보_v.S_PLUG_비고;
    _접지_비고.value = 출하정보_v.접지_비고;
    _DTC.value = 출하정보_v.DTC;
    _DTC_현재.value = 출하정보_v.DTC_현재;
    _DTC_과거.value = 출하정보_v.DTC_과거;
    _배터리충전상태.value = 출하정보_v.배터리충전상태;
    _배터리충전상태_측정값.value = 출하정보_v.배터리충전상태_측정값;
    _BMS고장NO.value = 출하정보_v.BMS고장NO;
    _BMS융착NO.value = 출하정보_v.BMS융착NO;
    _배터리팩전압.value = 출하정보_v.배터리팩전압;
    _배터리팩_측정값.value = 출하정보_v.배터리팩_측정값;
    _배터리모듈온도.value = 출하정보_v.배터리모듈온도;
    _배터리모듈온도_최대.value = 출하정보_v.배터리모듈온도_최대;
    _배터리모듈온도_최소.value = 출하정보_v.배터리모듈온도_최소;
    _배터리셀전압.value = 출하정보_v.배터리셀전압;
    _배터리셀전압_최대.value = 출하정보_v.배터리셀전압_최대;
    _배터리셀전압_최소.value = 출하정보_v.배터리셀전압_최소;
    _셀전압편차.value = 출하정보_v.셀전압편차;
    _셀전압편차_측정값.value = 출하정보_v.셀전압편차_측정값;
    _절연저항.value = 출하정보_v.절연저항;
    _절연저항_측정값.value = 출하정보_v.절연저항_측정값;
    _SOH.value = 출하정보_v.SOH;
    _릴레이_강제구동.value = 출하정보_v.릴레이_강제구동;
    _커넥터_체결검사.value = 출하정보_v.커넥터_체결검사;

    브라켓 = 출하정보_v.브라켓;
    S_PLUG = 출하정보_v.S_PLUG;
    접지 = 출하정보_v.접지;

    if (String(_출하코드.value).trim() == '') {
      find(EOL, _management_id.value);
      await delay();

      if (EOL_v != null) {
        _출하코드.value = EOL_v.QR;
      }
    }

    if (브라켓 == 'OK') {
      _bracket.options[1].selected = true;
    } else if (브라켓 == 'NG') {
      _bracket.options[2].selected = true;
    } else {
      _bracket.options[0].selected = true;
    }

    if (S_PLUG == 'OK') {
      _S_PLUG.options[1].selected = true;
    } else if (S_PLUG == 'NG') {
      _S_PLUG.options[2].selected = true;
    } else {
      _S_PLUG.options[0].selected = true;
    }

    if (접지 == 'OK') {
      _접지.options[1].selected = true;
    } else if (접지 == 'NG') {
      _접지.options[2].selected = true;
    } else {
      _접지.options[0].selected = true;
    }
  } else {
    if (is재제조 == false) {
      _management_id = document.getElementById('_management_id');
    } else {
      _재제조번호 = document.getElementById('_재제조번호');
    }
    _출하코드.value = '';
    _검사일.value = '0000-00-00T00:00:00';
    _검사자.value = 계정_stat.이름;
    _기초보고서_작성확인.value = '';
    _완료보고서_작성확인.value = '';
    _클린상태.value = '';
    _팔레트_적정위치.value = '';
    _포장랩상태.value = '';
    _UPR_QR.value = '';
    _LWR_QR.value = '';
    _HKMC_스티커_URP.value = '';
    _냉각유로_커버.value = '';
    _브라켓_비고.value = '';
    _S_PLUG_비고.value = '';
    _접지_비고.value = '';
    _DTC.value = '';
    _DTC_현재.value = '';
    _DTC_과거.value = '';
    _배터리충전상태.value = '';
    _배터리충전상태_측정값.value = '';
    _BMS고장NO.value = '';
    _BMS융착NO.value = '';
    _배터리팩전압.value = '';
    _배터리팩_측정값.value = '';
    _배터리모듈온도.value = '';
    _배터리모듈온도_최대.value = '';
    _배터리모듈온도_최소.value = '';
    _배터리셀전압.value = '';
    _배터리셀전압_최대.value = '';
    _배터리셀전압_최소.value = '';
    _셀전압편차.value = '';
    _셀전압편차_측정값.value = '';
    _절연저항.value = '';
    _절연저항_측정값.value = '';
    _SOH.value = '';
    _릴레이_강제구동.value = '';
    _커넥터_체결검사.value = '';
  }
}

async function 출하정보_save() {
  if (worker == '') return;
  if (_management_id.value.length == 0) return;
  console.log('save: ', _management_id.value);

  //find(BSA재제조, _management_id.value);
  //await delay();

  //if (BSA재제조_v == null) {
  //	var _doc = JSON.parse(JSON.stringify(BSA재제조_doc));
  //	_doc.관리번호 = _management_id.value.trim().toUpperCase();
  //	_doc.출하검사 = _검사일.value.substr(0, 16);

  //	update(BSA재제조, _doc);
  //	await delay();
  //} else {
  var _doc = {
    관리번호: _management_id.value.toUpperCase(),
    출하검사: _검사일.value.substr(0, 16), //기본정보에 검사일 기입
  };
  update(BSA재제조, _doc);
  await delay();
  //}

  await 공정단계자동입력(_management_id.value);

  console.log(update_count);
  console.log(insert_count);

  //출하정보 저장
  var doc = JSON.parse(JSON.stringify(출하정보_doc));

  doc.관리번호 = _management_id.value.trim().toUpperCase();
  doc.출하코드 = _출하코드.value;
  doc.검사일 = _검사일.value;
  doc.검사자 = _검사자.value;
  doc.기초보고서_작성확인 = _기초보고서_작성확인.value;
  doc.완료보고서_작성확인 = _완료보고서_작성확인.value;
  doc.클린상태 = _클린상태.value;
  doc.팔레트_적정위치 = _팔레트_적정위치.value;
  doc.포장랩상태 = _포장랩상태.value;
  doc.UPR_QR = _UPR_QR.value;
  doc.LWR_QR = _LWR_QR.value;
  doc.HKMC_스티커_URP = _HKMC_스티커_URP.value;
  doc.냉각유로_커버 = _냉각유로_커버.value;
  doc.브라켓 = 브라켓;
  doc.브라켓_비고 = _브라켓_비고.value;
  doc.S_PLUG = S_PLUG;
  doc.S_PLUG_비고 = _S_PLUG_비고.value;
  doc.접지 = 접지;
  doc.접지_비고 = _접지_비고.value;
  doc.DTC = _DTC.value;
  doc.DTC_현재 = _DTC_현재.value;
  doc.DTC_과거 = _DTC_과거.value;
  doc.배터리충전상태 = _배터리충전상태.value;
  doc.배터리충전상태_측정값 = _배터리충전상태_측정값.value;
  doc.BMS고장NO = _BMS고장NO.value;
  doc.BMS융착NO = _BMS융착NO.value;
  doc.배터리팩전압 = _배터리팩전압.value;
  doc.배터리팩_측정값 = _배터리팩_측정값.value;
  doc.배터리모듈온도 = _배터리모듈온도.value;
  doc.배터리모듈온도_최대 = _배터리모듈온도_최대.value;
  doc.배터리모듈온도_최소 = _배터리모듈온도_최소.value;
  doc.배터리셀전압 = _배터리셀전압.value;
  doc.배터리셀전압_최대 = _배터리셀전압_최대.value;
  doc.배터리셀전압_최소 = _배터리셀전압_최소.value;
  doc.셀전압편차 = _셀전압편차.value;
  doc.셀전압편차_측정값 = _셀전압편차_측정값.value;
  doc.절연저항 = _절연저항.value;
  doc.절연저항_측정값 = _절연저항_측정값.value;
  doc.SOH = _SOH.value;
  doc.릴레이_강제구동 = _릴레이_강제구동.value;
  doc.커넥터_체결검사 = _커넥터_체결검사.value;

  update(출하정보, doc);
  await delay();

  console.log(update_count);
  console.log(insert_count);

  if (update_count > 0) {
    alert('업데이트 되었습니다');
  }

  if (insert_count > 0) {
    alert('저장 되었습니다');
  }
  console.log('=====>', doc.배터리팩_측정값);
  //이전페이지();
}

function _기초보고서_작성확인_콤보박스(e) {
  const value = e.value;

  document.getElementById('_기초보고서_작성확인').value = value;
}

function _완료보고서_작성확인_콤보박스(e) {
  const value = e.value;

  document.getElementById('_완료보고서_작성확인').value = value;
}

function _클린상태_콤보박스(e) {
  const value = e.value;

  document.getElementById('_클린상태').value = value;
}

function _팔레트_적정위치_콤보박스(e) {
  const value = e.value;

  document.getElementById('_팔레트_적정위치').value = value;
}

function _포장랩상태_콤보박스(e) {
  const value = e.value;

  document.getElementById('_포장랩상태').value = value;
}

function _UPR_QR_콤보박스(e) {
  const value = e.value;

  document.getElementById('_UPR_QR').value = value;
}

function _LWR_QR_콤보박스(e) {
  const value = e.value;

  document.getElementById('_LWR_QR').value = value;
}

function _HKMC_스티커_URP_콤보박스(e) {
  const value = e.value;

  document.getElementById('_HKMC_스티커_URP').value = value;
}

function _냉각유로_커버_콤보박스(e) {
  const value = e.value;

  document.getElementById('_냉각유로_커버').value = value;
}

function _브라켓_콤보박스(e) {
  const value = e.value;

  브라켓 = value;
}

function _S_PLUG_콤보박스(e) {
  const value = e.value;

  S_PLUG = value;
}

function _접지_콤보박스(e) {
  const value = e.value;

  접지 = value;
}

function _DTC_콤보박스(e) {
  const value = e.value;

  document.getElementById('_DTC').value = value;
}

function _배터리충전상태_콤보박스(e) {
  const value = e.value;

  document.getElementById('_배터리충전상태').value = value;
}

function _BMS고장NO_콤보박스(e) {
  const value = e.value;

  document.getElementById('_BMS고장NO').value = value;
}

function _BMS융착NO_콤보박스(e) {
  const value = e.value;

  document.getElementById('_BMS융착NO').value = value;
}

function _배터리팩전압_콤보박스(e) {
  const value = e.value;

  document.getElementById('_배터리팩전압').value = value;
}

function _배터리모듈온도_콤보박스(e) {
  const value = e.value;

  document.getElementById('_배터리모듈온도').value = value;
}

function _배터리셀전압_콤보박스(e) {
  const value = e.value;

  document.getElementById('_배터리셀전압').value = value;
}

function _셀전압편차_콤보박스(e) {
  const value = e.value;

  document.getElementById('_셀전압편차').value = value;
}

function _절연저항_콤보박스(e) {
  const value = e.value;

  document.getElementById('_절연저항').value = value;
}

function _SOH_콤보박스(e) {
  const value = e.value;

  document.getElementById('_SOH').value = value;
}

function _릴레이_강제구동_콤보박스(e) {
  const value = e.value;

  document.getElementById('_릴레이_강제구동').value = value;
}

function _커넥터_체결검사_콤보박스(e) {
  const value = e.value;

  document.getElementById('_커넥터_체결검사').value = value;
}

function 출하정보_updateFilter() {
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
    출하정보_list_table.setFilter(filter, typeVal, valueEl.value);
  }
}

var 출하정보_list_table;
async function 출하정보_list() {
  findOne_BSA재제조(BSA재제조, { 공정단계: { $ne: '출하' }, 성능검사: { $ne: '' }, EOL: { $ne: '' }, 소재지: { $nin: ['공정대기', '품질대기'] }, 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 출하검사: { $eq: '' }, 출하: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } });
  await delay();

  if (BSA재제조_v != null) {
    find_BSA재제조(BSA재제조, { 공정단계: { $ne: '출하' }, 성능검사: { $ne: '' }, EOL: { $ne: '' }, 소재지: { $nin: ['공정대기', '품질대기'] }, 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 출하검사: { $eq: '' }, 출하: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } });
    await delay();
  }

  출하정보_list_table = new Tabulator('#grid_list', {
    layout: 'resizableColumnFit',
    data: BSA재제조_v,
    height: '400px',

    columns: [
      { title: 'ID', field: '_id', sorter: 'string', width: '180' },
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      {
        title: '재제조번호',
        field: '재제조번호',
        sorter: 'string',
        width: '180',
      },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string', width: '180' },
      { title: '공정단계', field: '공정단계', sorter: 'string', width: '180' },
      { title: '소재지', field: '소재지', sorter: 'string', width: '180' },
      {
        title: '적재No',
        field: '적재No',
        sorter: 'string',
        visible: true,
        width: '180',
      }, //
      {
        title: '입고',
        field: '입고',
        sorter: 'string',
        visible: true,
        width: '180',
      }, //
      {
        title: '제조투입',
        field: '제조투입',
        sorter: 'string',
        visible: true,
        width: '180',
      }, //
      {
        title: '세척투입일',
        field: '세척투입일',
        sorter: 'string',
        width: '180',
      },
      {
        title: '세척',
        field: '세척',
        sorter: 'string',
        visible: true,
        width: '180',
      }, //
      {
        title: '기초검사투입일',
        field: '기초검사투입일',
        sorter: 'string',
        width: '180',
      },
      {
        title: '기초검사',
        field: '기초검사',
        sorter: 'string',
        visible: true,
        width: '180',
      }, //
      {
        title: '분해조립투입일',
        field: '분해조립투입일',
        sorter: 'string',
        width: '180',
      },
      {
        title: '분해조립',
        field: '분해조립',
        sorter: 'string',
        visible: true,
        width: '180',
      }, //
      {
        title: '성능검사투입일',
        field: '성능검사투입일',
        sorter: 'string',
        width: '180',
      },
      {
        title: '성능검사',
        field: '성능검사',
        sorter: 'string',
        visible: true,
        width: '180',
      }, //
      {
        title: 'EOL투입일',
        field: 'EOL투입일',
        sorter: 'string',
        width: '180',
      },
      {
        title: 'EOL',
        field: 'EOL',
        sorter: 'string',
        visible: true,
        width: '180',
      }, //
      { title: '출하검사', field: '출하검사', sorter: 'string', width: '180' },
      { title: '납품처', field: '납품처', sorter: 'string', width: '180' },
      { title: '출하', field: '출하', sorter: 'string', width: '180' },
      { title: '반품입고', field: '반품입고', sorter: 'string', width: '180' },
      { title: '재출하', field: '재출하', sorter: 'string', width: '180' },
      { title: '완전분해', field: '완전분해', sorter: 'string', width: '180' },
      {
        title: '완전분해사유',
        field: '완전분해사유',
        sorter: 'string',
        width: '180',
      },
      { title: '폐기', field: '폐기', sorter: 'string', width: '180' },
      { title: '폐기사유', field: '폐기사유', sorter: 'string', width: '180' },
      {
        title: '마지막충전일',
        field: '마지막충전일',
        sorter: 'string',
        width: '180',
      },
      { title: '출하예약', field: '출하예약', sorter: 'string', width: '180' },
      { title: '렉번호', field: '렉번호', sorter: 'string', width: '180' },
    ],
  });

  출하정보_list_table.on('rowClick', async function (e, row) {
    console.log('selected 관리번호: ', row.getData().관리번호);

    _management_id.value = row.getData().관리번호;

    await sleep(1);

    var yes = confirm('선택한 bsa로 출하정보입력을 시작하시겠습니까?');
    if (yes != true) return;

    flag_출하 = true;
  });

  //Update filters on value change
  document.getElementById('filter-field').addEventListener('change', 출하정보_updateFilter);
  document.getElementById('filter-type').addEventListener('change', 출하정보_updateFilter);
  document.getElementById('filter-value').addEventListener('keyup', 출하정보_updateFilter);

  //Clear filters on "Clear Filters" button click
  document.getElementById('filter-clear').addEventListener('click', function () {
    var fieldEl = document.getElementById('filter-field');
    var typeEl = document.getElementById('filter-type');
    var valueEl = document.getElementById('filter-value');
    fieldEl.value = '';
    typeEl.value = '=';
    valueEl.value = '';

    출하정보_list_table.clearFilter();
  });
}
