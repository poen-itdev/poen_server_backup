//tabulator.js 로 표를 만들기 위한 변수들
var row_one_id = ''; //선택한 관리번호
var 재제조번호;
var BSA_data = []; //표 data
var tabledata_BSA = []; //표 data
var _id; //기본정보 중복시 분별을위한 mongoDB 기본 프라이머리키
var m_id; //기본정보 표에서 클릭해 선택한 관리자번호
var m_ids = [];
var flag_id_search = 0;

var table;
var table_입고;
var table_세척;
var table_기초검사;
var table_분해조립;
var table_분해조립new;
var table_성능검사;
var table_EOL;
var table_출하정보;
var table_특이사항;
var table_교체부품상세1;
var table_교체부품상세2;
var table_교체부품상세3;
var table_교체부품상세4;
var table_교체부품상세5;
var table_교체부품상세6;
var table_교체부품상세7;
var table_교체부품상세8;
var table_교체부품상세9;
var table_교체부품상세10;
var table_data;

//tabulator.js 에서 기본 제공해주는 검색 필터 함수
function updateFilter() {
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
    table.setFilter(filter, typeVal, valueEl.value);
  }
}

async function 재제조현황_시작() {
  flag_재제조현황 = false;

  if (worker == '') return;

  //검색 필터
  //Update filters on value change
  document.getElementById('filter-field').addEventListener('change', updateFilter);
  document.getElementById('filter-type').addEventListener('change', updateFilter);
  document.getElementById('filter-value').addEventListener('keyup', updateFilter);

  //Clear filters on "Clear Filters" button click
  document.getElementById('filter-clear').addEventListener('click', function () {
    var fieldEl = document.getElementById('filter-field');
    var typeEl = document.getElementById('filter-type');
    var valueEl = document.getElementById('filter-value');
    fieldEl.value = '';
    typeEl.value = '=';
    valueEl.value = '';

    table.clearFilter();
  });

  재제조현황_조회();
}

async function 재제조현황_조회() {
  if (worker == '') return;

  reset_result();

  find_BSA재제조(BSA재제조, { 관리번호: { $exists: true } }); //BSA재제조 collection 전체 조회
  await delay();

  BSA_data = BSA재제조_v;

  table = new Tabulator('#grid_BSA', {
    initialSort: [
      { column: '관리번호', dir: 'asc' }, //sort by this first
      { column: '입고', dir: 'desc' }, //then sort by this second
    ],
    layout: 'resizableColumnFit',
    data: BSA_data,
    height: '600px',

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
      { title: '소재지사유', field: '소재지사유', sorter: 'string', width: '180' },
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
      {
        formatter: 'buttonCross',
        width: 40,
        align: 'center',
        cellClick: function (e, cell) {
          delete_bsa_중복정보();
          cell.getRow().delete();
        },
      },
    ],
  });

  table_data = BSA재제조_v; //후에 기본정보들이 필요할때 쓰기위해

  var progress = document.getElementById('progress');
  table.on('rowClick', async function (e, row) {
    //click 한 배터리팩관련 공정정보 보여줌
    console.log('selected 관리번호: ', row.getData().관리번호);
    m_id = row.getData().관리번호;
    _id = row.getData()._id;
    row_one_id = m_id;

    document.getElementById('m_id').innerHTML = '관리번호: ' + m_id;

    await sleep(1);
    await grid_입고(m_id);
    progress.value = (1 / 19) * 100;

    await grid_세척(m_id);
    progress.value = (2 / 19) * 100;

    await grid_기초검사(m_id);
    progress.value = (3 / 19) * 100;

    await grid_분해조립(m_id);
    progress.value = (4 / 19) * 100;

    await grid_분해조립new(m_id);
    progress.value = (5 / 19) * 100;

    await grid_성능검사(m_id);
    progress.value = (6 / 19) * 100;

    await grid_EOL(m_id);
    progress.value = (7 / 19) * 100;

    await grid_출하정보(m_id);
    progress.value = (8 / 19) * 100;

    await grid_특이사항(m_id);
    progress.value = (9 / 19) * 100;

    await grid_교체부품상세1(m_id);
    progress.value = (10 / 19) * 100;

    await grid_교체부품상세2(m_id);
    progress.value = (11 / 19) * 100;

    await grid_교체부품상세3(m_id);
    progress.value = (12 / 19) * 100;

    await grid_교체부품상세4(m_id);
    progress.value = (13 / 19) * 100;

    await grid_교체부품상세5(m_id);
    progress.value = (14 / 19) * 100;

    await grid_교체부품상세6(m_id);
    progress.value = (15 / 19) * 100;

    await grid_교체부품상세7(m_id);
    progress.value = (16 / 19) * 100;

    await grid_교체부품상세8(m_id);
    progress.value = (17 / 19) * 100;

    await grid_교체부품상세9(m_id);
    progress.value = (18 / 19) * 100;

    await grid_교체부품상세10(m_id);
    progress.value = (19 / 19) * 100;

    return;
  });

  //전체 공정 data를 보여줌
  
  await sleep(1);

  await grid_입고();
  progress.value = (1 / 19) * 100;

  await grid_세척();
  progress.value = (2 / 19) * 100;

  await grid_기초검사();
  progress.value = (3 / 19) * 100;

  await grid_분해조립new();
  progress.value = (4 / 19) * 100;

  await grid_성능검사();
  progress.value = (5 / 19) * 100;

  await grid_EOL();
  progress.value = (6 / 19) * 100;

  await grid_출하정보();
  progress.value = (7 / 19) * 100;

  await grid_특이사항();
  progress.value = (8 / 19) * 100;

  await grid_교체부품상세1();
  progress.value = (9 / 19) * 100;

  await grid_교체부품상세2();
  progress.value = (10 / 19) * 100;

  await grid_교체부품상세3();
  progress.value = (11 / 19) * 100;

  await grid_교체부품상세4();
  progress.value = (12 / 19) * 100;

  await grid_교체부품상세5();
  progress.value = (13 / 19) * 100;

  await grid_교체부품상세6();
  progress.value = (14 / 19) * 100;

  await grid_교체부품상세7();
  progress.value = (15 / 19) * 100;

  await grid_교체부품상세8();
  progress.value = (16 / 19) * 100;

  await grid_교체부품상세9();
  progress.value = (17 / 19) * 100;

  await grid_교체부품상세10();
  progress.value = (18 / 19) * 100;

  await grid_분해조립();
  progress.value = (19 / 19) * 100;

  alert('로딩이 완료되었습니다');
}

//기본정보 오른쪽 끝의 'X'표를 눌렀을때 해당 배터리팩의 기본정보만 지움
async function delete_bsa_중복정보() {
  //초기 과거데이터를 넣었을때 관리번호가 중복되는 data가 있어 만듬
  if (계정_stat.관리번호 != 'o') return;
  console.log('delete : ', _id);
  var ok = window.confirm('BSA기본정보에서만 지워집니다. 계속하겠습니까?');
  if (ok == false) return;

  deleteOneBSA(BSA재제조, _id);
  await delay();

  var fieldEl = document.getElementById('filter-field');
  var typeEl = document.getElementById('filter-type');
  var valueEl = document.getElementById('filter-value');
  fieldEl.value = '';
  typeEl.value = '=';
  valueEl.value = '';

  table.clearFilter();

  if (delete_count > 0) {
    alert('삭제 되었습니다.');
  }
}

//선택학 배터리팩을 모든 공정과 기본정보에서 지움
async function delete_bsa() {
  var ok = window.confirm('동일한(대소문자 동일 취급) 관리번호는 모두 지워집니다. 계속하겠습니까?');
  if (ok == false) return;

  deleteOne(BSA재제조, row_one_id);
  await delay();

  progress.value = (1 / 18) * 100;

  deleteOne(입고, row_one_id);
  await delay();

  progress.value = (2 / 18) * 100;

  deleteOne(입고_pic, row_one_id);
  await delay();

  progress.value = (3 / 18) * 100;

  deleteOne(세척, row_one_id);
  await delay();

  progress.value = (4 / 18) * 100;

  deleteOne(세척_pic, row_one_id);
  await delay();

  progress.value = (5 / 18) * 100;

  deleteOne(기초검사, row_one_id);
  await delay();

  progress.value = (6 / 18) * 100;

  deleteOne(기초검사_pic1, row_one_id);
  await delay();

  deleteOne(기초검사_pic2, row_one_id);
  await delay();

  deleteOne(기초검사_pic3, row_one_id);
  await delay();

  deleteOne(기초검사_pic4, row_one_id);
  await delay();

  progress.value = (7 / 18) * 100;

  deleteOne(분해조립, row_one_id);
  await delay();

  deleteOne(분해조립재제조, row_one_id);
  await delay();
  progress.value = (8 / 18) * 100;

  deleteOne(분해조립_pic, row_one_id);
  await delay();

  progress.value = (9 / 18) * 100;

  deleteOne(성능검사, row_one_id);
  await delay();

  progress.value = (10 / 18) * 100;

  deleteOne(성능검사_pic, row_one_id);
  await delay();

  progress.value = (11 / 18) * 100;

  deleteOne(EOL, row_one_id);
  await delay();

  progress.value = (12 / 18) * 100;

  deleteOne(EOL_pic, row_one_id);
  await delay();

  progress.value = (13 / 18) * 100;

  deleteOne(출하정보, row_one_id);
  await delay();

  progress.value = (13 / 18) * 100;

  deleteOne(출하_pic, row_one_id);
  await delay();

  progress.value = (14 / 18) * 100;

  deleteOne(특이사항, row_one_id);
  await delay();

  progress.value = (15 / 18) * 100;

  deleteOne(특이사항_pic, row_one_id);
  await delay();

  progress.value = (16 / 18) * 100;

  deleteOne(교체부품상세1, row_one_id);
  await delay();
  progress.value = (17 / 18) * 100;

  deleteOne(교체부품상세2, row_one_id);
  await delay();
  progress.value = (18 / 18) * 100;

  deleteOne(교체부품상세3, row_one_id);
  await delay();
  progress.value = (19 / 18) * 100;

  deleteOne(교체부품상세4, row_one_id);
  await delay();
  progress.value = (20 / 18) * 100;

  deleteOne(교체부품상세5, row_one_id);
  await delay();
  progress.value = (21 / 18) * 100;

  deleteOne(교체부품상세6, row_one_id);
  await delay();
  progress.value = (22 / 18) * 100;

  deleteOne(교체부품상세7, row_one_id);
  await delay();
  progress.value = (23 / 18) * 100;

  deleteOne(교체부품상세8, row_one_id);
  await delay();
  progress.value = (24 / 18) * 100;

  deleteOne(교체부품상세9, row_one_id);
  await delay();
  progress.value = (25 / 18) * 100;

  deleteOne(교체부품상세10, row_one_id);
  await delay();
  progress.value = (26 / 18) * 100;

  var fieldEl = document.getElementById('filter-field');
  var typeEl = document.getElementById('filter-type');
  var valueEl = document.getElementById('filter-value');
  fieldEl.value = '';
  typeEl.value = '=';
  valueEl.value = '';

  table.clearFilter();

  alert('삭제 되었습니다.');

  재제조현황_조회();
}

async function grid_입고(m_id = '') {
  if (worker == '') return; //로그인하지 않았다면 조회 거부

  var tabledata_입고 = [];

  if (m_id == '') {
    //입고 전체 data
    find_입고(입고, { 관리번호: { $exists: true } });
    await delay();

    tabledata_입고 = 입고_v;
  } else {
    //선택한 배터리팩의 입고 data
    find(입고, m_id);
    await delay();

    tabledata_입고.push(입고_v);
  }

  if (tabledata_입고 == null) return;

  table_입고 = new Tabulator('#grid_입고정보', {
    initialSort: [
      { column: '관리번호', dir: 'asc' }, //sort by this first
      { column: '입고일', dir: 'desc' }, //then sort by this second
    ],
    layout: 'resizableColumnFit',
    height: '300px',
    data: tabledata_입고,
    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '입고일', field: '입고일', sorter: 'string', width: '180' },
      { title: '입고처', field: '입고처', sorter: 'string', width: '180' },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: 'RO No.', field: 'RO_no', sorter: 'string', width: '180' },
      { title: '보관위치', field: '보관위치', sorter: 'string', width: '180' },
    ],
  });
}

async function grid_세척(m_id = '') {
  if (worker == '') return;

  var tabledata_세척 = [];

  if (m_id == '') {
    find_세척(세척, { 관리번호: { $exists: true } });
    await delay();

    tabledata_세척 = 세척_v;
  } else {
    find(세척, m_id);
    await delay();

    tabledata_세척.push(세척_v);
  }

  if (tabledata_세척 == null) return;

  table_세척 = new Tabulator('#grid_세척정보', {
    initialSort: [
      { column: '관리번호', dir: 'asc' }, //sort by this first
      { column: '공정입고일', dir: 'desc' }, //then sort by this second
    ],
    layout: 'resizableColumnFit',
    height: 130,
    data: tabledata_세척,
    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '재제조번호', field: '재제조번호', sorter: 'string', width: '180' },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: 'RO No.', field: 'RO_no', sorter: 'string', width: '180' },
      { title: '공정입고일', field: '공정입고일', sorter: 'string', width: '180' },
      { title: '공정완료일', field: '공정완료일', sorter: 'string', width: '180' },
      { title: '어퍼케이스재사용가능', field: '어퍼케이스재사용가능', sorter: 'string', width: '180' },
      { title: '기밀검사 케이스', field: '기밀검사_케이스', sorter: 'string', width: '180' },
      { title: '기밀검사 케이스 특이사항', field: '기밀검사_케이스_특이사항', sorter: 'string', width: '180' },
      { title: '육안검사_외부', field: '육안검사_외부', sorter: 'string', width: '180' },
      { title: '육안검사_외부_특이사항', field: '육안검사_외부_특이사항', sorter: 'string', width: '180' },
      { title: '특이사항', field: '특이사항', sorter: 'string', width: '180' },
    ],
  });
}

async function grid_기초검사(m_id = '') {
  if (worker == '') return;

  tabledata_기초검사 = [];

  if (m_id == '') {
    find_기초검사(기초검사, { 관리번호: { $exists: true } });
    await delay();

    tabledata_기초검사 = 기초검사_v;
  } else {
    find(기초검사, m_id);
    await delay();

    tabledata_기초검사.push(기초검사_v);
  }

  if (tabledata_기초검사 == null) return;

  table_기초검사 = new Tabulator('#grid_기초검사', {
    initialSort: [
      { column: '관리번호', dir: 'asc' }, //sort by this first
      { column: '공정입고일', dir: 'desc' }, //then sort by this second
    ],
    layout: 'resizableColumnFit',
    height: 130,
    data: tabledata_기초검사,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '재제조번호', field: '재제조번호', sorter: 'string', width: '180' },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string', width: '180' },
      { title: 'VIN', field: 'VIN', sorter: 'string', width: '180' },
      { title: 'QR', field: 'QRcode', sorter: 'string', width: '180' },
      { title: '주행거리', field: '주행거리', sorter: 'string', width: '180' },
      { title: '차량번호', field: '차량번호', sorter: 'string', width: '180' },
      { title: '육안검사 내부', field: '육안검사_외부', sorter: 'string', width: '180' },
      { title: '육안검사 내부 특이사항', field: '육안검사_내부_특이사항', sorter: 'string', width: '180' },
      { title: '기밀검사 냉각유로', field: '기밀검사_냉각유로', sorter: 'string', width: '180' },
      { title: '기밀검사 냉각유로 특이사항', field: '기밀검사_냉각유로_특이사항', sorter: 'string', width: '180' },
      { title: '절연검사 B+', field: '절연검사_Plus', sorter: 'string', width: '180' },
      { title: '절연검사 B-', field: '절연검사_Minus', sorter: 'string', width: '180' },
      { title: '통신검사 DTC코드1', field: '통신검사_DTC코드1', sorter: 'string', width: '180' },
      { title: '통신검사 DTC코드2', field: '통신검사_DTC코드2', sorter: 'string', width: '180' },
      //{ title: "통신검사 DTC코드3", field: "통신검사_DTC코드3", sorter: "string", width: "180" },
      //{ title: "통신검사 DTC코드4", field: "통신검사_DTC코드4", sorter: "string", width: "180" },
      //{ title: "통신검사 DTC코드5", field: "통신검사_DTC코드5", sorter: "string", width: "180" },
      //{ title: "통신검사 DTC코드6", field: "통신검사_DTC코드6", sorter: "string", width: "180" },
      //{ title: "통신검사 DTC코드7", field: "통신검사_DTC코드7", sorter: "string", width: "180" },
      //{ title: "통신검사 DTC코드8", field: "통신검사_DTC코드8", sorter: "string", width: "180" },
      //{ title: "통신검사 DTC코드9", field: "통신검사_DTC코드9", sorter: "string", width: "180" },
      //{ title: "통신검사 DTC코드10", field: "통신검사_DTC코드10", sorter: "string", width: "180" },
      { title: '통신검사 팩전압', field: '통신검사_팩전압', sorter: 'string', width: '180' },
      { title: '통신검사 셀전압편차', field: '통신검사_셀전압편차', sorter: 'string', width: '180' },
      { title: '통신검사 릴레이구동', field: '통신검사_릴레이구동', sorter: 'string', width: '180' },
      //{ title: "고장현상코드", field: "고장현상코드", sorter: "string", width: "180"},
      //{ title: "고장현상명", field: "고장현상명", sorter: "string", width: "180"},
      //{ title: "문제Cell No", field: "문제Cell_No", sorter: "string", width: "180"},
      //{ title: "문제BMA No", field: "문제BMA_No", sorter: "string", width: "180"},
      //{ title: "문제BMA 수량", field: "문제BMA_cnt", sorter: "string", width: "180"},
      { title: '공정입고일', field: '공정입고일', sorter: 'string', width: '180' },
      { title: '공정완료일', field: '공정완료일', sorter: 'string', width: '180' },
      { title: '분석결과', field: '분석결과', sorter: 'string', width: '180' },
      { title: '비고', field: '비고', sorter: 'string', width: '180' },
      { title: '센터 진단내용', field: '센터진단내용', sorter: 'string', width: '180' },
      { title: '검사자', field: '검사자', sorter: 'string', width: '180' },
    ],
  });
}

async function grid_분해조립(m_id = '') {
  if (worker == '') return;

  var tabledata_분해조립 = [];

  if (m_id == '') {
    find_분해조립(분해조립, { 관리번호: { $exists: true } });
    await delay();

    tabledata_분해조립 = 분해조립_v;
  } else {
    find(분해조립, m_id);
    await delay();

    tabledata_분해조립.push(분해조립_v);
  }

  if (tabledata_분해조립 == null) return;

  table_분해조립 = new Tabulator('#grid_분해조립', {
    initialSort: [
      { column: '관리번호', dir: 'asc' }, //sort by this first
      { column: '공정입고일', dir: 'desc' }, //then sort by this second
    ],
    layout: 'resizableColumnFit',
    height: 130,
    data: tabledata_분해조립,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '재제조번호', field: '재제조번호', sorter: 'string', width: '180' },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string', width: '180' },
      { title: 'BMU 1(교환전)', field: 'BMU1', sorter: 'string', width: '180' },
      { title: 'BMU 1(교환후)', field: 'BMU1_2', sorter: 'string', width: '180' },
      { title: 'BMU 2(교환전)', field: 'BMU2', sorter: 'string', width: '180' },
      { title: 'BMU 2(교환후)', field: 'BMU2_2', sorter: 'string', width: '180' },
      //{ title: "BMU 3(교환전)", field: "BMU3", sorter: "string", width: "180" },
      //{ title: "BMU 3(교환후)", field: "BMU3_2", sorter: "string", width: "180" },
      //{ title: "BMU 4(교환전)", field: "BMU4", sorter: "string", width: "180" },
      //{ title: "BMU 4(교환후)", field: "BMU4_2", sorter: "string", width: "180" },
      //{ title: "BMU 5(교환전)", field: "BMU5", sorter: "string", width: "180" },
      //{ title: "BMU 5(교환후)", field: "BMU5_2", sorter: "string", width: "180" },
      //{ title: "BMU 6(교환전)", field: "BMU6", sorter: "string", width: "180" },
      //{ title: "BMU 6(교환후)", field: "BMU6_2", sorter: "string", width: "180" },
      //{ title: "BMU 7(교환전)", field: "BMU7", sorter: "string", width: "180" },
      //{ title: "BMU 7(교환후)", field: "BMU7_2", sorter: "string", width: "180" },
      //{ title: "BMU 8(교환전)", field: "BMU8", sorter: "string", width: "180" },
      //{ title: "BMU 8(교환후)", field: "BMU8_2", sorter: "string", width: "180" },
      //{ title: "BMU 9(교환전)", field: "BMU9", sorter: "string", width: "180" },
      //{ title: "BMU 9(교환후)", field: "BMU9_2", sorter: "string", width: "180" },
      //{ title: "BMU 10(교환전)", field: "BMU10", sorter: "string", width: "180" },
      //{ title: "BMU 10(교환후)", field: "BMU10_2", sorter: "string", width: "180" },
      { title: 'CMU 1(교환전)', field: 'CMU1', sorter: 'string', width: '180' },
      { title: 'CMU 1(교환후)', field: 'CMU1_2', sorter: 'string', width: '180' },
      { title: 'CMU 2(교환전)', field: 'CMU2', sorter: 'string', width: '180' },
      { title: 'CMU 2(교환후)', field: 'CMU2_2', sorter: 'string', width: '180' },
      { title: 'CMU 3(교환전)', field: 'CMU3', sorter: 'string', width: '180' },
      { title: 'CMU 3(교환후)', field: 'CMU3_2', sorter: 'string', width: '180' },
      { title: 'CMU 4(교환전)', field: 'CMU4', sorter: 'string', width: '180' },
      { title: 'CMU 4(교환후)', field: 'CMU4_2', sorter: 'string', width: '180' },
      { title: 'CMU 5(교환전)', field: 'CMU5', sorter: 'string', width: '180' },
      { title: 'CMU 5(교환후)', field: 'CMU5_2', sorter: 'string', width: '180' },
      { title: 'CMU 6(교환전)', field: 'CMU6', sorter: 'string', width: '180' },
      { title: 'CMU 6(교환후)', field: 'CMU6_2', sorter: 'string', width: '180' },
      { title: 'CMU 7(교환전)', field: 'CMU7', sorter: 'string', width: '180' },
      { title: 'CMU 7(교환후)', field: 'CMU7_2', sorter: 'string', width: '180' },
      { title: 'CMU 8(교환전)', field: 'CMU8', sorter: 'string', width: '180' },
      { title: 'CMU 8(교환후)', field: 'CMU8_2', sorter: 'string', width: '180' },
      { title: 'CMU 9(교환전)', field: 'CMU9', sorter: 'string', width: '180' },
      { title: 'CMU 9(교환후)', field: 'CMU9_2', sorter: 'string', width: '180' },
      { title: 'CMU 10(교환전)', field: 'CMU10', sorter: 'string', width: '180' },
      { title: 'CMU 10(교환후)', field: 'CMU10_2', sorter: 'string', width: '180' },
      { title: 'PRA 1(교환전)', field: 'PRA1', sorter: 'string', width: '180' },
      { title: 'PRA 1(교환후)', field: 'PRA1_2', sorter: 'string', width: '180' },
      { title: 'PRA 2(교환전)', field: 'PRA2', sorter: 'string', width: '180' },
      { title: 'PRA 2(교환후)', field: 'PRA2_2', sorter: 'string', width: '180' },
      //{ title: "PRA 3(교환전)", field: "PRA3", sorter: "string", width: "180" },
      //{ title: "PRA 3(교환후)", field: "PRA3_2", sorter: "string", width: "180" },
      //{ title: "PRA 4(교환전)", field: "PRA4", sorter: "string", width: "180" },
      //{ title: "PRA 4(교환후)", field: "PRA4_2", sorter: "string", width: "180" },
      //{ title: "PRA 5(교환전)", field: "PRA5", sorter: "string", width: "180" },
      //{ title: "PRA 5(교환후)", field: "PRA5_2", sorter: "string", width: "180" },
      //{ title: "PRA 6(교환전)", field: "PRA6", sorter: "string", width: "180" },
      //{ title: "PRA 6(교환후)", field: "PRA6_2", sorter: "string", width: "180" },
      //{ title: "PRA 7(교환전)", field: "PRA7", sorter: "string", width: "180" },
      //{ title: "PRA 7(교환후)", field: "PRA7_2", sorter: "string", width: "180" },
      //{ title: "PRA 8(교환전)", field: "PRA8", sorter: "string", width: "180" },
      //{ title: "PRA 8(교환후)", field: "PRA8_2", sorter: "string", width: "180" },
      //{ title: "PRA 9(교환전)", field: "PRA9", sorter: "string", width: "180" },
      //{ title: "PRA 9(교환후)", field: "PRA9_2", sorter: "string", width: "180" },
      //{ title: "PRA 10(교환전)", field: "PRA10", sorter: "string", width: "180" },
      //{ title: "PRA 10(교환후)", field: "PRA10_2", sorter: "string", width: "180" },
      { title: 'SPA 1(교환전)', field: 'SPA1', sorter: 'string', width: '180' },
      { title: 'SPA 1(교환후)', field: 'SPA1_2', sorter: 'string', width: '180' },
      { title: 'SPA 2(교환전)', field: 'SPA2', sorter: 'string', width: '180' },
      { title: 'SPA 2(교환후)', field: 'SPA2_2', sorter: 'string', width: '180' },
      //{ title: "SPA 3(교환전)", field: "SPA3", sorter: "string", width: "180" },
      //{ title: "SPA 3(교환후)", field: "SPA3_2", sorter: "string", width: "180" },
      //{ title: "SPA 4(교환전)", field: "SPA4", sorter: "string", width: "180" },
      //{ title: "SPA 4(교환후)", field: "SPA4_2", sorter: "string", width: "180" },
      //{ title: "SPA 5(교환전)", field: "SPA5", sorter: "string", width: "180" },
      //{ title: "SPA 5(교환후)", field: "SPA5_2", sorter: "string", width: "180" },
      //{ title: "SPA 6(교환전)", field: "SPA6", sorter: "string", width: "180" },
      //{ title: "SPA 6(교환후)", field: "SPA6_2", sorter: "string", width: "180" },
      //{ title: "SPA 7(교환전)", field: "SPA7", sorter: "string", width: "180" },
      //{ title: "SPA 7(교환후)", field: "SPA7_2", sorter: "string", width: "180" },
      //{ title: "SPA 8(교환전)", field: "SPA8", sorter: "string", width: "180" },
      //{ title: "SPA 8(교환후)", field: "SPA8_2", sorter: "string", width: "180" },
      //{ title: "SPA 9(교환전)", field: "SPA9", sorter: "string", width: "180" },
      //{ title: "SPA 9(교환후)", field: "SPA9_2", sorter: "string", width: "180" },
      //{ title: "SPA 10(교환전)", field: "SPA10", sorter: "string", width: "180" },
      //{ title: "SPA 10(교환후)", field: "SPA10_2", sorter: "string", width: "180" },
      { title: 'LWR Case 1(교환전)', field: 'LWR_C1', sorter: 'string', width: '180' },
      { title: 'LWR Case 1(교환후)', field: 'LWR_C1_2', sorter: 'string', width: '180' },
      { title: 'LWR Case 2(교환전)', field: 'LWR_C2', sorter: 'string', width: '180' },
      { title: 'LWR Case 2(교환후)', field: 'LWR_C2_2', sorter: 'string', width: '180' },
      //{ title: "LWR Case 3(교환전)", field: "LWR_C3", sorter: "string", width: "180" },
      //{ title: "LWR Case 3(교환후)", field: "LWR_C3_2", sorter: "string", width: "180" },
      //{ title: "LWR Case 4(교환전)", field: "LWR_C4", sorter: "string", width: "180" },
      //{ title: "LWR Case 4(교환후)", field: "LWR_C4_2", sorter: "string", width: "180" },
      //{ title: "LWR Case 5(교환전)", field: "LWR_C5", sorter: "string", width: "180" },
      //{ title: "LWR Case 5(교환후)", field: "LWR_C5_2", sorter: "string", width: "180" },
      //{ title: "LWR Case 6(교환전)", field: "LWR_C6", sorter: "string", width: "180" },
      //{ title: "LWR Case 6(교환후)", field: "LWR_C6_2", sorter: "string", width: "180" },
      //{ title: "LWR Case 7(교환전)", field: "LWR_C7", sorter: "string", width: "180" },
      //{ title: "LWR Case 7(교환후)", field: "LWR_C7_2", sorter: "string", width: "180" },
      //{ title: "LWR Case 8(교환전)", field: "LWR_C8", sorter: "string", width: "180" },
      //{ title: "LWR Case 8(교환후)", field: "LWR_C8_2", sorter: "string", width: "180" },
      //{ title: "LWR Case 9(교환전)", field: "LWR_C9", sorter: "string", width: "180" },
      //{ title: "LWR Case 9(교환후)", field: "LWR_C9_2", sorter: "string", width: "180" },
      //{ title: "LWR Case 10(교환전)", field: "LWR_C10", sorter: "string", width: "180" },
      //{ title: "LWR Case 10(교환후)", field: "LWR_C10_2", sorter: "string", width: "180" },
      { title: 'UPR Case 1(교환전)', field: 'UPR_C1', sorter: 'string', width: '180' },
      { title: 'UPR Case 1(교환후)', field: 'UPR_C1_2', sorter: 'string', width: '180' },
      { title: 'UPR Case 2(교환전)', field: 'UPR_C2', sorter: 'string', width: '180' },
      { title: 'UPR Case 2(교환후)', field: 'UPR_C2_2', sorter: 'string', width: '180' },
      //{ title: "UPR Case 3(교환전)", field: "UPR_C3", sorter: "string", width: "180" },
      //{ title: "UPR Case 3(교환후)", field: "UPR_C3_2", sorter: "string", width: "180" },
      //{ title: "UPR Case 4(교환전)", field: "UPR_C4", sorter: "string", width: "180" },
      //{ title: "UPR Case 4(교환후)", field: "UPR_C4_2", sorter: "string", width: "180" },
      //{ title: "UPR Case 5(교환전)", field: "UPR_C5", sorter: "string", width: "180" },
      //{ title: "UPR Case 5(교환후)", field: "UPR_C5_2", sorter: "string", width: "180" },
      //{ title: "UPR Case 6(교환전)", field: "UPR_C6", sorter: "string", width: "180" },
      //{ title: "UPR Case 6(교환후)", field: "UPR_C6_2", sorter: "string", width: "180" },
      //{ title: "UPR Case 7(교환전)", field: "UPR_C7", sorter: "string", width: "180" },
      //{ title: "UPR Case 7(교환후)", field: "UPR_C7_2", sorter: "string", width: "180" },
      //{ title: "UPR Case 8(교환전)", field: "UPR_C8", sorter: "string", width: "180" },
      //{ title: "UPR Case 8(교환후)", field: "UPR_C8_2", sorter: "string", width: "180" },
      //{ title: "UPR Case 9(교환전)", field: "UPR_C9", sorter: "string", width: "180" },
      //{ title: "UPR Case 9(교환후)", field: "UPR_C9_2", sorter: "string", width: "180" },
      //{ title: "UPR Case 10(교환전)", field: "UPR_C10", sorter: "string", width: "180" },
      //{ title: "UPR Case 10(교환후)", field: "UPR_C10_2", sorter: "string", width: "180" },
      { title: 'PBE(교환전)', field: 'PBE', sorter: 'string', width: '180' },
      { title: 'PBE(교환후)', field: 'PBE_2', sorter: 'string', width: '180' },
      { title: 'Gasket(교환전)', field: 'Gasket', sorter: 'string', width: '180' },
      { title: 'Gasket(교환후)', field: 'Gasket_2', sorter: 'string', width: '180' },
      { title: 'Relay 1(교환전)', field: 'Relay1', sorter: 'string', width: '180' },
      { title: 'Relay 1(교환후)', field: 'Relay1_2', sorter: 'string', width: '180' },
      { title: 'Relay 2(교환전)', field: 'Relay2', sorter: 'string', width: '180' },
      { title: 'Relay 2(교환후)', field: 'Relay2_2', sorter: 'string', width: '180' },
      //{ title: "Relay 3(교환전)", field: "Relay3", sorter: "string", width: "180" },
      //{ title: "Relay 3(교환후)", field: "Relay3_2", sorter: "string", width: "180" },
      //{ title: "Relay 4(교환전)", field: "Relay4", sorter: "string", width: "180" },
      //{ title: "Relay 4(교환후)", field: "Relay4_2", sorter: "string", width: "180" },
      //{ title: "Relay 5(교환전)", field: "Relay5", sorter: "string", width: "180" },
      //{ title: "Relay 5(교환후)", field: "Relay5_2", sorter: "string", width: "180" },
      //{ title: "Relay 6(교환전)", field: "Relay6", sorter: "string", width: "180" },
      //{ title: "Relay 6(교환후)", field: "Relay6_2", sorter: "string", width: "180" },
      //{ title: "Relay 7(교환전)", field: "Relay7", sorter: "string", width: "180" },
      //{ title: "Relay 7(교환후)", field: "Relay7_2", sorter: "string", width: "180" },
      //{ title: "Relay 8(교환전)", field: "Relay8", sorter: "string", width: "180" },
      //{ title: "Relay 8(교환후)", field: "Relay8_2", sorter: "string", width: "180" },
      //{ title: "Relay 9(교환전)", field: "Relay9", sorter: "string", width: "180" },
      //{ title: "Relay 9(교환후)", field: "Relay9_2", sorter: "string", width: "180" },
      //{ title: "Relay 10(교환전)", field: "Relay10", sorter: "string", width: "180" },
      //{ title: "Relay 10(교환후)", field: "Relay10_2", sorter: "string", width: "180" },
      { title: 'HV CNTR 1(교환전)', field: 'HV_CNTR1', sorter: 'string', width: '180' },
      { title: 'HV CNTR 1(교환후)', field: 'HV_CNTR1_2', sorter: 'string', width: '180' },
      { title: 'HV CNTR 2(교환전)', field: 'HV_CNTR2', sorter: 'string', width: '180' },
      { title: 'HV CNTR 2(교환후)', field: 'HV_CNTR2_2', sorter: 'string', width: '180' },
      //{ title: "HV CNTR 3(교환전)", field: "HV_CNTR3", sorter: "string", width: "180" },
      //{ title: "HV CNTR 3(교환후)", field: "HV_CNTR3_2", sorter: "string", width: "180" },
      //{ title: "HV CNTR 4(교환전)", field: "HV_CNTR4", sorter: "string", width: "180" },
      //{ title: "HV CNTR 4(교환후)", field: "HV_CNTR4_2", sorter: "string", width: "180" },
      //{ title: "HV CNTR 5(교환전)", field: "HV_CNTR5", sorter: "string", width: "180" },
      //{ title: "HV CNTR 5(교환후)", field: "HV_CNTR5_2", sorter: "string", width: "180" },
      //{ title: "HV CNTR 6(교환전)", field: "HV_CNTR6", sorter: "string", width: "180" },
      //{ title: "HV CNTR 6(교환후)", field: "HV_CNTR6_2", sorter: "string", width: "180" },
      //{ title: "HV CNTR 7(교환전)", field: "HV_CNTR7", sorter: "string", width: "180" },
      //{ title: "HV CNTR 7(교환후)", field: "HV_CNTR7_2", sorter: "string", width: "180" },
      //{ title: "HV CNTR 8(교환전)", field: "HV_CNTR8", sorter: "string", width: "180" },
      //{ title: "HV CNTR 8(교환후)", field: "HV_CNTR8_2", sorter: "string", width: "180" },
      //{ title: "HV CNTR 9(교환전)", field: "HV_CNTR9", sorter: "string", width: "180" },
      //{ title: "HV CNTR 9(교환후)", field: "HV_CNTR9_2", sorter: "string", width: "180" },
      //{ title: "HV CNTR 10(교환전)", field: "HV_CNTR10", sorter: "string", width: "180" },
      //{ title: "HV CNTR 10(교환후)", field: "HV_CNTR10_2", sorter: "string", width: "180" },
      { title: 'Heating CNTR 1(교환전)', field: 'Heating_CNTR1', sorter: 'string', width: '180' },
      { title: 'Heating CNTR 1(교환후)', field: 'Heating_CNTR1_2', sorter: 'string', width: '180' },
      { title: 'Heating CNTR 2(교환전)', field: 'Heating_CNTR2', sorter: 'string', width: '180' },
      { title: 'Heating CNTR 2(교환후)', field: 'Heating_CNTR2_2', sorter: 'string', width: '180' },
      //{ title: "Heating CNTR 3(교환전)", field: "Heating_CNTR3", sorter: "string", width: "180" },
      //{ title: "Heating CNTR 3(교환후)", field: "Heating_CNTR3_2", sorter: "string", width: "180" },
      //{ title: "Heating CNTR 4(교환전)", field: "Heating_CNTR4", sorter: "string", width: "180" },
      //{ title: "Heating CNTR 4(교환후)", field: "Heating_CNTR4_2", sorter: "string", width: "180" },
      //{ title: "Heating CNTR 5(교환전)", field: "Heating_CNTR5", sorter: "string", width: "180" },
      //{ title: "Heating CNTR 5(교환후)", field: "Heating_CNTR5_2", sorter: "string", width: "180" },
      //{ title: "Heating CNTR 6(교환전)", field: "Heating_CNTR6", sorter: "string", width: "180" },
      //{ title: "Heating CNTR 6(교환후)", field: "Heating_CNTR6_2", sorter: "string", width: "180" },
      //{ title: "Heating CNTR 7(교환전)", field: "Heating_CNTR7", sorter: "string", width: "180" },
      //{ title: "Heating CNTR 7(교환후)", field: "Heating_CNTR7_2", sorter: "string", width: "180" },
      //{ title: "Heating CNTR 8(교환전)", field: "Heating_CNTR8", sorter: "string", width: "180" },
      //{ title: "Heating CNTR 8(교환후)", field: "Heating_CNTR8_2", sorter: "string", width: "180" },
      //{ title: "Heating CNTR 9(교환전)", field: "Heating_CNTR9", sorter: "string", width: "180" },
      //{ title: "Heating CNTR 9(교환후)", field: "Heating_CNTR9_2", sorter: "string", width: "180" },
      //{ title: "Heating CNTR 10(교환전)", field: "Heating_CNTR10", sorter: "string", width: "180" },
      //{ title: "Heating CNTR 10(교환후)", field: "Heating_CNTR10_2", sorter: "string", width: "180" },
      { title: 'FuseBox 1(교환전)', field: 'FuseBox1', sorter: 'string', width: '180' },
      { title: 'FuseBox 1(교환후)', field: 'FuseBox1_2', sorter: 'string', width: '180' },
      { title: 'FuseBox 2(교환전)', field: 'FuseBox2', sorter: 'string', width: '180' },
      { title: 'FuseBox 2(교환후)', field: 'FuseBox2_2', sorter: 'string', width: '180' },
      //{ title: "FuseBox 3(교환전)", field: "FuseBox3", sorter: "string", width: "180" },
      //{ title: "FuseBox 3(교환후)", field: "FuseBox3_2", sorter: "string", width: "180" },
      //{ title: "FuseBox 4(교환전)", field: "FuseBox4", sorter: "string", width: "180" },
      //{ title: "FuseBox 4(교환후)", field: "FuseBox4_2", sorter: "string", width: "180" },
      //{ title: "FuseBox 5(교환전)", field: "FuseBox5", sorter: "string", width: "180" },
      //{ title: "FuseBox 5(교환후)", field: "FuseBox5_2", sorter: "string", width: "180" },
      //{ title: "FuseBox 6(교환전)", field: "FuseBox6", sorter: "string", width: "180" },
      //{ title: "FuseBox 6(교환후)", field: "FuseBox6_2", sorter: "string", width: "180" },
      //{ title: "FuseBox 7(교환전)", field: "FuseBox7", sorter: "string", width: "180" },
      //{ title: "FuseBox 7(교환후)", field: "FuseBox7_2", sorter: "string", width: "180" },
      //{ title: "FuseBox 8(교환전)", field: "FuseBox8", sorter: "string", width: "180" },
      //{ title: "FuseBox 8(교환후)", field: "FuseBox8_2", sorter: "string", width: "180" },
      //{ title: "FuseBox 9(교환전)", field: "FuseBox9", sorter: "string", width: "180" },
      //{ title: "FuseBox 9(교환후)", field: "FuseBox9_2", sorter: "string", width: "180" },
      //{ title: "FuseBox 10(교환전)", field: "FuseBox10", sorter: "string", width: "180" },
      //{ title: "FuseBox 10(교환후)", field: "FuseBox10_2", sorter: "string", width: "180" },
      { title: 'LV W/H 1(교환전)', field: 'LV_W_H1', sorter: 'string', width: '180' },
      { title: 'LV W/H 1(교환후)', field: 'LV_W_H1_2', sorter: 'string', width: '180' },
      { title: 'LV W/H 2(교환전)', field: 'LV_W_H2', sorter: 'string', width: '180' },
      { title: 'LV W/H 2(교환후)', field: 'LV_W_H2_2', sorter: 'string', width: '180' },
      //{ title: "LV W/H 3(교환전)", field: "LV_W_H3", sorter: "string", width: "180" },
      //{ title: "LV W/H 3(교환후)", field: "LV_W_H3_2", sorter: "string", width: "180" },
      //{ title: "LV W/H 4(교환전)", field: "LV_W_H4", sorter: "string", width: "180" },
      //{ title: "LV W/H 4(교환후)", field: "LV_W_H4_2", sorter: "string", width: "180" },
      //{ title: "LV W/H 5(교환전)", field: "LV_W_H5", sorter: "string", width: "180" },
      //{ title: "LV W/H 5(교환후)", field: "LV_W_H5_2", sorter: "string", width: "180" },
      //{ title: "LV W/H 6(교환전)", field: "LV_W_H6", sorter: "string", width: "180" },
      //{ title: "LV W/H 6(교환후)", field: "LV_W_H6_2", sorter: "string", width: "180" },
      //{ title: "LV W/H 7(교환전)", field: "LV_W_H7", sorter: "string", width: "180" },
      //{ title: "LV W/H 7(교환후)", field: "LV_W_H7_2", sorter: "string", width: "180" },
      //{ title: "LV W/H 8(교환전)", field: "LV_W_H8", sorter: "string", width: "180" },
      //{ title: "LV W/H 8(교환후)", field: "LV_W_H8_2", sorter: "string", width: "180" },
      //{ title: "LV W/H 9(교환전)", field: "LV_W_H9", sorter: "string", width: "180" },
      //{ title: "LV W/H 9(교환후)", field: "LV_W_H9_2", sorter: "string", width: "180" },
      //{ title: "LV W/H 10(교환전)", field: "LV_W_H10", sorter: "string", width: "180" },
      //{ title: "LV W/H 10(교환후)", field: "LV_W_H10_2", sorter: "string", width: "180" },
      { title: 'HV W/H 1(교환전)', field: 'HV_W_H1', sorter: 'string', width: '180' },
      { title: 'HV W/H 1(교환후)', field: 'HV_W_H1_2', sorter: 'string', width: '180' },
      { title: 'HV W/H 2(교환전)', field: 'HV_W_H2', sorter: 'string', width: '180' },
      { title: 'HV W/H 2(교환후)', field: 'HV_W_H2_2', sorter: 'string', width: '180' },
      { title: 'HV W/H 3(교환전)', field: 'HV_W_H3', sorter: 'string', width: '180' },
      { title: 'HV W/H 3(교환후)', field: 'HV_W_H3_2', sorter: 'string', width: '180' },
      { title: 'HV W/H 4(교환전)', field: 'HV_W_H4', sorter: 'string', width: '180' },
      { title: 'HV W/H 4(교환후)', field: 'HV_W_H4_2', sorter: 'string', width: '180' },
      { title: 'HV W/H 5(교환전)', field: 'HV_W_H5', sorter: 'string', width: '180' },
      { title: 'HV W/H 5(교환후)', field: 'HV_W_H5_2', sorter: 'string', width: '180' },
      { title: 'HV W/H 6(교환전)', field: 'HV_W_H6', sorter: 'string', width: '180' },
      { title: 'HV W/H 6(교환후)', field: 'HV_W_H6_2', sorter: 'string', width: '180' },
      { title: 'HV W/H 7(교환전)', field: 'HV_W_H7', sorter: 'string', width: '180' },
      { title: 'HV W/H 7(교환후)', field: 'HV_W_H7_2', sorter: 'string', width: '180' },
      { title: 'HV W/H 8(교환전)', field: 'HV_W_H8', sorter: 'string', width: '180' },
      { title: 'HV W/H 8(교환후)', field: 'HV_W_H8_2', sorter: 'string', width: '180' },
      { title: 'HV W/H 9(교환전)', field: 'HV_W_H9', sorter: 'string', width: '180' },
      { title: 'HV W/H 9(교환후)', field: 'HV_W_H9_2', sorter: 'string', width: '180' },
      { title: 'HV W/H 10(교환전)', field: 'HV_W_H10', sorter: 'string', width: '180' },
      { title: 'HV W/H 10(교환후)', field: 'HV_W_H10_2', sorter: 'string', width: '180' },
      { title: '온도센서 1(교환전)', field: '온도센서1', sorter: 'string', width: '180' },
      { title: '온도센서 1(교환후)', field: '온도센서1_2', sorter: 'string', width: '180' },
      { title: '온도센서 2(교환전)', field: '온도센서2', sorter: 'string', width: '180' },
      { title: '온도센서 2(교환후)', field: '온도센서2_2', sorter: 'string', width: '180' },
      { title: '온도센서 3(교환전)', field: '온도센서3', sorter: 'string', width: '180' },
      { title: '온도센서 3(교환후)', field: '온도센서3_2', sorter: 'string', width: '180' },
      { title: '온도센서 4(교환전)', field: '온도센서4', sorter: 'string', width: '180' },
      { title: '온도센서 4(교환후)', field: '온도센서4_2', sorter: 'string', width: '180' },
      { title: '온도센서 5(교환전)', field: '온도센서5', sorter: 'string', width: '180' },
      { title: '온도센서 5(교환후)', field: '온도센서5_2', sorter: 'string', width: '180' },
      { title: '온도센서 6(교환전)', field: '온도센서6', sorter: 'string', width: '180' },
      { title: '온도센서 6(교환후)', field: '온도센서6_2', sorter: 'string', width: '180' },
      { title: '온도센서 7(교환전)', field: '온도센서7', sorter: 'string', width: '180' },
      { title: '온도센서 7(교환후)', field: '온도센서7_2', sorter: 'string', width: '180' },
      { title: '온도센서 8(교환전)', field: '온도센서8', sorter: 'string', width: '180' },
      { title: '온도센서 8(교환후)', field: '온도센서8_2', sorter: 'string', width: '180' },
      { title: '온도센서 9(교환전)', field: '온도센서9', sorter: 'string', width: '180' },
      { title: '온도센서 9(교환후)', field: '온도센서9_2', sorter: 'string', width: '180' },
      { title: '온도센서 10(교환전)', field: '온도센서10', sorter: 'string', width: '180' },
      { title: '온도센서 10(교환후)', field: '온도센서10_2', sorter: 'string', width: '180' },
      { title: 'Busbars(교환전)', field: 'Busbars', sorter: 'string', width: '180' },
      { title: 'Busbars(교환후)', field: 'Busbars_2', sorter: 'string', width: '180' },
      { title: 'BMA 1(교환전)', field: 'BMA1', sorter: 'string', width: '180' },
      { title: 'BMA 1(교환후)', field: 'BMA1_2', sorter: 'string', width: '180' },
      { title: 'BMA 2(교환전)', field: 'BMA2', sorter: 'string', width: '180' },
      { title: 'BMA 2(교환후)', field: 'BMA2_2', sorter: 'string', width: '180' },
      { title: 'BMA 3(교환전)', field: 'BMA3', sorter: 'string', width: '180' },
      { title: 'BMA 3(교환후)', field: 'BMA3_2', sorter: 'string', width: '180' },
      { title: 'BMA 4(교환전)', field: 'BMA4', sorter: 'string', width: '180' },
      { title: 'BMA 4(교환후)', field: 'BMA4_2', sorter: 'string', width: '180' },
      { title: 'BMA 5(교환전)', field: 'BMA5', sorter: 'string', width: '180' },
      { title: 'BMA 5(교환후)', field: 'BMA5_2', sorter: 'string', width: '180' },
      { title: 'BMA 6(교환전)', field: 'BMA6', sorter: 'string', width: '180' },
      { title: 'BMA 6(교환후)', field: 'BMA6_2', sorter: 'string', width: '180' },
      { title: 'BMA 7(교환전)', field: 'BMA7', sorter: 'string', width: '180' },
      { title: 'BMA 7(교환후)', field: 'BMA7_2', sorter: 'string', width: '180' },
      { title: 'BMA 8(교환전)', field: 'BMA8', sorter: 'string', width: '180' },
      { title: 'BMA 8(교환후)', field: 'BMA8_2', sorter: 'string', width: '180' },
      { title: 'BMA 9(교환전)', field: 'BMA9', sorter: 'string', width: '180' },
      { title: 'BMA 9(교환후)', field: 'BMA9_2', sorter: 'string', width: '180' },
      { title: 'BMA 10(교환전)', field: 'BMA10', sorter: 'string', width: '180' },
      { title: 'BMA 10(교환후)', field: 'BMA10_2', sorter: 'string', width: '180' },
      { title: 'ETC', field: 'ETC', sorter: 'string', width: '180' },
      { title: '공정입고일', field: '공정입고일', sorter: 'string', width: '180' },
      { title: '공정완료일', field: '공정완료일', sorter: 'string', width: '180' },
      { title: '작업자', field: '작업자', sorter: 'string', width: '180' },
    ],
  });
}

async function grid_분해조립new(m_id = '') {
  //if (worker == '') return;

  var tabledata_분해조립new = [];

  if (m_id == '') {
    find_분해조립재제조(분해조립재제조, { 관리번호: { $exists: true } });
    await delay();

    tabledata_분해조립new = 분해조립재제조_v;
  } else {
    find(분해조립재제조, m_id);
    await delay();

    tabledata_분해조립new.push(분해조립재제조_v);
  }

  if (tabledata_분해조립new == null) return;

  table_분해조립new = new Tabulator('#grid_분해조립new', {
    initialSort: [
      { column: '관리번호', dir: 'asc' }, //sort by this first
    ],
    layout: 'resizableColumnFit',
    height: 200,
    data: tabledata_분해조립new,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string' },
      { title: '품명', field: '품명', sorter: 'string' },
      { title: '교체전 품번', field: '교체전품번', sorter: 'string' },
      { title: '교체전 QR', field: '교체전QR', sorter: 'string' },
      { title: '신품/고품', field: '신품고품', sorter: 'string' },
      { title: '고품식별', field: '고품식별', sorter: 'string' },
      { title: '교체후 품번', field: '교체후품번', sorter: 'string' },
      { title: '교체후 QR', field: '교체후QR', sorter: 'string' },
      { title: '교체사유', field: '교체사유', sorter: 'string' },
      { title: '공정입고일', field: '공정입고일', sorter: 'string' },
      { title: '공정완료일', field: '공정완료일', sorter: 'string' },
      { title: '작성자', field: '작성자', sorter: 'string' },
    ],
  });
}

async function grid_성능검사(m_id = '') {
  if (worker == '') return;

  var tabledata_성능검사 = [];

  if (m_id == '') {
    find_성능검사(성능검사, { 관리번호: { $exists: true } });
    await delay();

    tabledata_성능검사 = 성능검사_v;
  } else {
    find(성능검사, m_id);
    await delay();

    tabledata_성능검사.push(성능검사_v);
  }

  if (tabledata_성능검사 == null) return;

  table_성능검사 = new Tabulator('#grid_성능검사', {
    initialSort: [
      { column: '관리번호', dir: 'asc' }, //sort by this first
      { column: '공정입고일', dir: 'desc' }, //then sort by this second
    ],
    layout: 'resizableColumnFit',
    height: 130,
    data: tabledata_성능검사,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '재제조번호', field: '재제조번호', sorter: 'string', width: '180' },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string', width: '180' },
      { title: '용량평가', field: '용량평가', sorter: 'string', width: '180' },
      { title: 'SOC60Percent', field: 'SOC60Percent', sorter: 'string', width: '180' },
      { title: 'DCIR', field: 'DCIR', sorter: 'string', width: '180' },
      { title: 'DCIR_Charge', field: 'DCIR_Charge', sorter: 'string', width: '180' },
      { title: 'DCIR_Discharge', field: 'DCIR_Discharge', sorter: 'string', width: '180' },
      { title: '분해조립_재의뢰사유', field: '분해조립_재의뢰사유', sorter: 'string', width: '180' },
      { title: '공정입고일', field: '공정입고일', sorter: 'string', width: '180' },
      { title: '공정완료일', field: '공정완료일', sorter: 'string', width: '180' },
      { title: '검사자', field: '검사자', sorter: 'string', width: '180' },
    ],
  });
}

async function grid_EOL(m_id = '') {
  if (worker == '') return;

  var tabledata_EOL = [];
  if (m_id == '') {
    find_EOL(EOL, { 관리번호: { $exists: true } });
    await delay();

    tabledata_EOL = EOL_v;
  } else {
    find(EOL, m_id);
    await delay();

    tabledata_EOL.push(EOL_v);
  }

  if (tabledata_EOL == null) return;

  table_EOL = new Tabulator('#grid_EOL', {
    initialSort: [
      { column: '관리번호', dir: 'asc' }, //sort by this first
      { column: '공정입고일', dir: 'desc' }, //then sort by this second
    ],
    layout: 'resizableColumnFit',
    height: 130,
    data: tabledata_EOL,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '재제조번호', field: '재제조번호', sorter: 'string', width: '180' },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string', width: '180' },
      { title: 'UPR/C 조립', field: 'UPR_C조립', sorter: 'string', width: '180' },
      { title: '기밀검사 케이스', field: '기밀검사_케이스', sorter: 'string', width: '180' },
      { title: '기밀검사 케이스 값', field: '기밀검사_케이스_특이사항', sorter: 'string', width: '180' },
      { title: '기밀검사 냉각유로', field: '기밀검사_냉각유로', sorter: 'string', width: '180' },
      { title: '기밀검사 냉각유로 값', field: '기밀검사_냉각유로_특이사항', sorter: 'string', width: '180' },
      { title: '절연검사 +', field: '절연검사_Plus', sorter: 'string', width: '180' },
      { title: '절연검사 + 값', field: '절연검사_Plus_특이사항', sorter: 'string', width: '180' },
      { title: '절연검사 -', field: '절연검사_Minus', sorter: 'string', width: '180' },
      { title: '절연검사 - 값', field: '절연검사_Minus_특이사항', sorter: 'string', width: '180' },
      { title: '절연저항 HV+', field: '절연저항_HVP', sorter: 'string', width: '180' },
      { title: '절연저항 HV+ 값', field: '절연저항_HVP_특이사항', sorter: 'string', width: '180' },
      { title: '절연저항 HV-', field: '절연저항_HVN', sorter: 'string', width: '180' },
      { title: '절연저항 HV- 값', field: '절연저항_HVN_특이사항', sorter: 'string', width: '180' },
      { title: '통신검사 DTC코드1', field: '통신검사_DTC코드1', sorter: 'string', width: '180' },
      { title: '통신검사 DTC코드2', field: '통신검사_DTC코드2', sorter: 'string', width: '180' },
      { title: '통신검사 DTC코드3', field: '통신검사_DTC코드3', sorter: 'string', width: '180' },
      { title: '통신검사 DTC코드4', field: '통신검사_DTC코드4', sorter: 'string', width: '180' },
      //{ title: "통신검사 DTC코드5", field: "통신검사_DTC코드5", sorter: "string", width: "180" },
      //{ title: "통신검사 DTC코드6", field: "통신검사_DTC코드6", sorter: "string", width: "180" },
      //{ title: "통신검사 DTC코드7", field: "통신검사_DTC코드7", sorter: "string", width: "180" },
      //{ title: "통신검사 DTC코드8", field: "통신검사_DTC코드8", sorter: "string", width: "180" },
      //{ title: "통신검사 DTC코드9", field: "통신검사_DTC코드9", sorter: "string", width: "180" },
      //{ title: "통신검사 DTC코드10", field: "통신검사_DTC코드10", sorter: "string", width: "180" },
      { title: '통신검사 팩전압', field: '통신검사_팩전압', sorter: 'string', width: '180' },
      { title: '통신검사 팩전압 값', field: '통신검사_팩전압_특이사항', sorter: 'string', width: '180' },
      { title: '통신검사 셀전압편차', field: '통신검사_셀전압편차', sorter: 'string', width: '180' },
      { title: '통신검사 셀전압편차 값', field: '통신검사_셀전압편차_특이사항', sorter: 'string', width: '180' },
      { title: '통신검사 릴레이구동', field: '통신검사_릴레이구동', sorter: 'string', width: '180' },
      { title: '통신검사 릴레이구동_특이사항', field: '통신검사_릴레이구동_특이사항', sorter: 'string', width: '180' },
      { title: '공정입고일', field: '공정입고일', sorter: 'string', width: '180' },
      { title: '공정완료일', field: '공정완료일', sorter: 'string', width: '180' },
      { title: '비고', field: '비고', sorter: 'string', width: '180' },
      { title: 'QR', field: 'QR', sorter: 'string', width: '180' },
      { title: '검사자', field: '검사자', sorter: 'string', width: '180' },
    ],
  });
}

async function grid_출하정보(m_id = '') {
  if (worker == '') return;

  var tabledata_출하정보 = [];

  if (m_id == '') {
    find_출하정보(출하정보, { 관리번호: { $exists: true } });
    await delay();

    tabledata_출하정보 = 출하정보_v;
  } else {
    find(출하정보, m_id);
    await delay();

    tabledata_출하정보.push(출하정보_v);
  }

  if (tabledata_출하정보 == null) return;
  table_출하정보 = new Tabulator('#grid_출하정보', {
    initialSort: [
      { column: '관리번호', dir: 'asc' }, //sort by this first
      { column: '검사일', dir: 'desc' }, //then sort by this second
    ],
    layout: 'resizableColumnFit',
    height: 130,
    data: tabledata_출하정보,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '출하코드', field: '출하코드', sorter: 'string', width: '180' },
      { title: '검사일', field: '검사일', sorter: 'string', width: '180' },
      { title: '검사자', field: '검사자', sorter: 'string', width: '180' },
      { title: '기초보고서 작성확인', field: '기초보고서_작성확인', sorter: 'string', width: '180' },
      { title: '완료보고서 작성확인', field: '완료보고서_작성확인', sorter: 'string', width: '180' },
      { title: '클린상태', field: '클린상태', sorter: 'string', width: '180' },
      { title: '팔레트_적정위치', field: '팔레트_적정위치', sorter: 'string', width: '180' },
      { title: '포장랩상태', field: '포장랩상태', sorter: 'string', width: '180' },
      { title: 'UPR_QR', field: 'UPR_QR', sorter: 'string', width: '180' },
      { title: 'LWR_QR', field: 'LWR_QR', sorter: 'string', width: '180' },
      { title: 'HKMC_스티커_URP', field: 'HKMC_스티커_URP', sorter: 'string', width: '180' },
      { title: '브라켓', field: '브라켓', sorter: 'string', width: '180' },
      { title: '브라켓 비고', field: '브라켓_비고', sorter: 'string', width: '180' },
      { title: 'S PLUG', field: 'S_PLUG', sorter: 'string', width: '180' },
      { title: 'S PLUG 비고', field: 'S_PLUG_비고', sorter: 'string', width: '180' },
      { title: '접지', field: '접지', sorter: 'string', width: '180' },
      { title: '접지_비고', field: '접지_비고', sorter: 'string', width: '180' },
      { title: 'DTC', field: 'DTC', sorter: 'string', width: '180' },
      { title: 'DTC_현재', field: 'DTC_현재', sorter: 'string', width: '180' },
      { title: 'DTC_과거', field: 'DTC_과거', sorter: 'string', width: '180' },
      { title: '배터리충전상태', field: '배터리충전상태', sorter: 'string', width: '180' },
      { title: '배터리충전상태_측정값', field: '배터리충전상태_측정값', sorter: 'string', width: '180' },
      { title: 'BMS고장NO', field: 'BMS고장NO', sorter: 'string', width: '180' },
      { title: 'BMS융착NO', field: 'BMS융착NO', sorter: 'string', width: '180' },
      { title: '배터리팩 전압', field: '배터리팩전압', sorter: 'string', width: '180' },
      { title: '배터리팩 측정값', field: '배터리팩_측정값', sorter: 'string', width: '180' },
      { title: '배터리모듈온도', field: '배터리모듈온도', sorter: 'string', width: '180' },
      { title: '배터리모듈 온도 최대', field: '배터리모듈온도_최대', sorter: 'string', width: '180' },
      { title: '배터리모듈 온도 최소', field: '배터리모듈온도_최소', sorter: 'string', width: '180' },
      { title: '배터리셀전압', field: '배터리셀전압', sorter: 'string', width: '180' },
      { title: '배터리셀전압 최대', field: '배터리셀전압_최대', sorter: 'string', width: '180' },
      { title: '배터리셀전압 최소', field: '배터리셀전압_최소', sorter: 'string', width: '180' },
      { title: '셀전압편차', field: '셀전압편차', sorter: 'string', width: '180' },
      { title: '셀전압편차_측정값', field: '셀전압편차_측정값', sorter: 'string', width: '180' },
      { title: '절연저항', field: '절연저항', sorter: 'string', width: '180' },
      { title: '절연저항_측정값', field: '절연저항_측정값', sorter: 'string', width: '180' },
      { title: 'SOH', field: 'SOH', sorter: 'string', width: '180' },
      { title: '릴레이 강제구동', field: '릴레이_강제구동', sorter: 'string', width: '180' },
      { title: '커넥터 체결검사', field: '커넥터_체결검사', sorter: 'string', width: '180' },
    ],
  });
}

async function grid_특이사항(m_id = '') {
  if (worker == '') return;

  var tabledata_특이사항 = [];

  if (m_id == '') {
    find_특이사항(특이사항, { 관리번호: { $exists: true } });
    await delay();

    tabledata_특이사항 = 특이사항_v;
  } else {
    find(특이사항, m_id);
    await delay();

    tabledata_특이사항.push(특이사항_v);
  }

  if (tabledata_특이사항 == null) return;

  table_특이사항 = new Tabulator('#grid_특이사항', {
    layout: 'resizableColumnFit',
    height: 130,
    data: tabledata_특이사항,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '재제조번호', field: '재제조번호', sorter: 'string', width: '180' },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string', width: '180' },
      { title: '특이사항', field: '특이사항', sorter: 'string', width: '180' },
    ],
  });
}

async function grid_교체부품상세1(m_id = '') {
  if (worker == '') return;
  var tabledata_교체부품상세1 = [];

  if (m_id == '') {
    find_교체부품상세(교체부품상세1, { 관리번호: { $exists: true } });
    await delay();

    tabledata_교체부품상세1 = 교체부품상세1_v;
  } else {
    find(교체부품상세1, m_id);
    await delay();

    tabledata_교체부품상세1.push(교체부품상세1_v);
  }

  if (tabledata_교체부품상세1 == null) return;

  table_교체부품상세1 = new Tabulator('#grid_교체부품상세1', {
    layout: 'resizableColumnFit',
    height: 130,
    data: tabledata_교체부품상세1,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '재제조번호', field: '재제조번호', sorter: 'string', width: '180' },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string', width: '180' },
      {
        title: 'ORIGIN 관리번호',
        field: 'ORIGIN_관리번호',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 품명',
        field: '교체전_품명',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 품번',
        field: '교체전_품번',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 QR',
        field: '교체전_QR',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 신품_고품',
        field: '교체후_신품_고품',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 고품식별',
        field: '교체후_고품식별',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 품번',
        field: '교체후_품번',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 QR',
        field: '교체후_QR',
        sorter: 'string',
        width: '180',
      },
      { title: '교체사유', field: '교체사유', sorter: 'string', width: '180' },
    ],
  });
}

async function grid_교체부품상세2(m_id = '') {
  if (worker == '') return;
  var tabledata_교체부품상세2 = [];

  if (m_id == '') {
    find_교체부품상세(교체부품상세2, { 관리번호: { $exists: true } });
    await delay();

    tabledata_교체부품상세2 = 교체부품상세2_v;
  } else {
    find(교체부품상세2, m_id);
    await delay();

    tabledata_교체부품상세2.push(교체부품상세2_v);
  }

  if (tabledata_교체부품상세2 == null) return;

  table_교체부품상세2 = new Tabulator('#grid_교체부품상세2', {
    layout: 'resizableColumnFit',
    height: 130,
    data: tabledata_교체부품상세2,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '재제조번호', field: '재제조번호', sorter: 'string', width: '180' },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string', width: '180' },
      {
        title: 'ORIGIN 관리번호',
        field: 'ORIGIN_관리번호',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 품명',
        field: '교체전_품명',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 품번',
        field: '교체전_품번',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 QR',
        field: '교체전_QR',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 신품_고품',
        field: '교체후_신품_고품',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 고품식별',
        field: '교체후_고품식별',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 품번',
        field: '교체후_품번',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 QR',
        field: '교체후_QR',
        sorter: 'string',
        width: '180',
      },
      { title: '교체사유', field: '교체사유', sorter: 'string', width: '180' },
    ],
  });
}

async function grid_교체부품상세3(m_id = '') {
  if (worker == '') return;
  var tabledata_교체부품상세3 = [];

  if (m_id == '') {
    find_교체부품상세(교체부품상세3, { 관리번호: { $exists: true } });
    await delay();

    tabledata_교체부품상세3 = 교체부품상세3_v;
  } else {
    find(교체부품상세3, m_id);
    await delay();

    tabledata_교체부품상세3.push(교체부품상세3_v);
  }

  if (tabledata_교체부품상세3 == null) return;

  table_교체부품상세3 = new Tabulator('#grid_교체부품상세3', {
    layout: 'resizableColumnFit',
    height: 130,
    data: tabledata_교체부품상세3,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '재제조번호', field: '재제조번호', sorter: 'string', width: '180' },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string', width: '180' },
      {
        title: 'ORIGIN 관리번호',
        field: 'ORIGIN_관리번호',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 품명',
        field: '교체전_품명',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 품번',
        field: '교체전_품번',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 QR',
        field: '교체전_QR',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 신품_고품',
        field: '교체후_신품_고품',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 고품식별',
        field: '교체후_고품식별',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 품번',
        field: '교체후_품번',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 QR',
        field: '교체후_QR',
        sorter: 'string',
        width: '180',
      },
      { title: '교체사유', field: '교체사유', sorter: 'string', width: '180' },
    ],
  });
}

async function grid_교체부품상세4(m_id = '') {
  if (worker == '') return;
  var tabledata_교체부품상세4 = [];

  if (m_id == '') {
    find_교체부품상세(교체부품상세4, { 관리번호: { $exists: true } });
    await delay();

    tabledata_교체부품상세4 = 교체부품상세4_v;
  } else {
    find(교체부품상세4, m_id);
    await delay();

    tabledata_교체부품상세4.push(교체부품상세4_v);
  }

  if (tabledata_교체부품상세4 == null) return;
  table_교체부품상세4 = new Tabulator('#grid_교체부품상세4', {
    layout: 'resizableColumnFit',
    height: 130,
    data: tabledata_교체부품상세4,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '재제조번호', field: '재제조번호', sorter: 'string', width: '180' },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string', width: '180' },
      {
        title: 'ORIGIN 관리번호',
        field: 'ORIGIN_관리번호',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 품명',
        field: '교체전_품명',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 품번',
        field: '교체전_품번',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 QR',
        field: '교체전_QR',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 신품_고품',
        field: '교체후_신품_고품',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 고품식별',
        field: '교체후_고품식별',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 품번',
        field: '교체후_품번',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 QR',
        field: '교체후_QR',
        sorter: 'string',
        width: '180',
      },
      { title: '교체사유', field: '교체사유', sorter: 'string', width: '180' },
    ],
  });
}

async function grid_교체부품상세5(m_id = '') {
  if (worker == '') return;
  var tabledata_교체부품상세5 = [];

  if (m_id == '') {
    find_교체부품상세(교체부품상세5, { 관리번호: { $exists: true } });
    await delay();

    tabledata_교체부품상세5 = 교체부품상세5_v;
  } else {
    find(교체부품상세5, m_id);
    await delay();

    tabledata_교체부품상세5.push(교체부품상세5_v);
  }

  if (tabledata_교체부품상세5 == null) return;

  table_교체부품상세5 = new Tabulator('#grid_교체부품상세5', {
    layout: 'resizableColumnFit',
    height: 130,
    data: tabledata_교체부품상세5,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '재제조번호', field: '재제조번호', sorter: 'string', width: '180' },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string', width: '180' },
      {
        title: 'ORIGIN 관리번호',
        field: 'ORIGIN_관리번호',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 품명',
        field: '교체전_품명',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 품번',
        field: '교체전_품번',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 QR',
        field: '교체전_QR',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 신품_고품',
        field: '교체후_신품_고품',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 고품식별',
        field: '교체후_고품식별',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 품번',
        field: '교체후_품번',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 QR',
        field: '교체후_QR',
        sorter: 'string',
        width: '180',
      },
      { title: '교체사유', field: '교체사유', sorter: 'string', width: '180' },
    ],
  });
}

async function grid_교체부품상세6(m_id = '') {
  if (worker == '') return;
  var tabledata_교체부품상세6 = [];

  if (m_id == '') {
    find_교체부품상세(교체부품상세6, { 관리번호: { $exists: true } });
    await delay();

    tabledata_교체부품상세6 = 교체부품상세6_v;
  } else {
    find(교체부품상세6, m_id);
    await delay();

    tabledata_교체부품상세6.push(교체부품상세6_v);
  }

  if (tabledata_교체부품상세6 == null) return;
  table_교체부품상세6 = new Tabulator('#grid_교체부품상세6', {
    layout: 'resizableColumnFit',
    height: 130,
    data: tabledata_교체부품상세6,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '재제조번호', field: '재제조번호', sorter: 'string', width: '180' },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string', width: '180' },
      {
        title: 'ORIGIN 관리번호',
        field: 'ORIGIN_관리번호',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 품명',
        field: '교체전_품명',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 품번',
        field: '교체전_품번',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 QR',
        field: '교체전_QR',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 신품_고품',
        field: '교체후_신품_고품',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 고품식별',
        field: '교체후_고품식별',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 품번',
        field: '교체후_품번',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 QR',
        field: '교체후_QR',
        sorter: 'string',
        width: '180',
      },
      { title: '교체사유', field: '교체사유', sorter: 'string', width: '180' },
    ],
  });
}

async function grid_교체부품상세7(m_id = '') {
  if (worker == '') return;
  var tabledata_교체부품상세7 = [];

  if (m_id == '') {
    find_교체부품상세(교체부품상세7, { 관리번호: { $exists: true } });
    await delay();

    tabledata_교체부품상세7 = 교체부품상세7_v;
  } else {
    find(교체부품상세7, m_id);
    await delay();

    tabledata_교체부품상세7.push(교체부품상세7_v);
  }

  if (tabledata_교체부품상세7 == null) return;
  table_교체부품상세7 = new Tabulator('#grid_교체부품상세7', {
    layout: 'resizableColumnFit',
    height: 130,
    data: tabledata_교체부품상세7,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '재제조번호', field: '재제조번호', sorter: 'string', width: '180' },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string', width: '180' },
      {
        title: 'ORIGIN 관리번호',
        field: 'ORIGIN_관리번호',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 품명',
        field: '교체전_품명',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 품번',
        field: '교체전_품번',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 QR',
        field: '교체전_QR',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 신품_고품',
        field: '교체후_신품_고품',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 고품식별',
        field: '교체후_고품식별',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 품번',
        field: '교체후_품번',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 QR',
        field: '교체후_QR',
        sorter: 'string',
        width: '180',
      },
      { title: '교체사유', field: '교체사유', sorter: 'string', width: '180' },
    ],
  });
}

async function grid_교체부품상세8(m_id = '') {
  if (worker == '') return;
  var tabledata_교체부품상세8 = [];

  if (m_id == '') {
    find_교체부품상세(교체부품상세8, { 관리번호: { $exists: true } });
    await delay();

    tabledata_교체부품상세8 = 교체부품상세8_v;
  } else {
    find(교체부품상세8, m_id);
    await delay();

    tabledata_교체부품상세8.push(교체부품상세8_v);
  }

  if (tabledata_교체부품상세8 == null) return;
  table_교체부품상세8 = new Tabulator('#grid_교체부품상세8', {
    layout: 'resizableColumnFit',
    height: 130,
    data: tabledata_교체부품상세8,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '재제조번호', field: '재제조번호', sorter: 'string', width: '180' },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string', width: '180' },
      {
        title: 'ORIGIN 관리번호',
        field: 'orogin_관리번호',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 품명',
        field: '교체전_품명',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 품번',
        field: '교체전_품번',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 QR',
        field: '교체전_QR',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 신품_고품',
        field: '교체후_신품_고품',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 고품식별',
        field: '교체후_고품식별',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 품번',
        field: '교체후_품번',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 QR',
        field: '교체후_QR',
        sorter: 'string',
        width: '180',
      },
      { title: '교체사유', field: '교체사유', sorter: 'string', width: '180' },
    ],
  });
}

async function grid_교체부품상세9(m_id = '') {
  if (worker == '') return;
  var tabledata_교체부품상세9 = [];

  if (m_id == '') {
    find_교체부품상세(교체부품상세9, { 관리번호: { $exists: true } });
    await delay();

    tabledata_교체부품상세9 = 교체부품상세9_v;
  } else {
    find(교체부품상세9, m_id);
    await delay();

    tabledata_교체부품상세9.push(교체부품상세9_v);
  }

  if (tabledata_교체부품상세9 == null) return;

  table_교체부품상세9 = new Tabulator('#grid_교체부품상세9', {
    layout: 'resizableColumnFit',
    height: 130,
    data: tabledata_교체부품상세9,
    //autoColumns:true,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '재제조번호', field: '재제조번호', sorter: 'string', width: '180' },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string', width: '180' },
      {
        title: 'OROGIN 관리번호',
        field: 'ORIGIN_관리번호',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 품명',
        field: '교체전_품명',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 품번',
        field: '교체전_품번',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 QR',
        field: '교체전_QR',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 신품_고품',
        field: '교체후_신품_고품',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 고품식별',
        field: '교체후_고품식별',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 품번',
        field: '교체후_품번',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 QR',
        field: '교체후_QR',
        sorter: 'string',
        width: '180',
      },
      { title: '교체사유', field: '교체사유', sorter: 'string', width: '180' },
    ],
  });
}

async function grid_교체부품상세10(m_id = '') {
  if (worker == '') return;
  var tabledata_교체부품상세10 = [];

  if (m_id == '') {
    find_교체부품상세(교체부품상세10, { 관리번호: { $exists: true } });
    await delay();

    tabledata_교체부품상세10 = 교체부품상세10_v;
  } else {
    find(교체부품상세10, m_id);
    await delay();

    tabledata_교체부품상세10.push(교체부품상세10_v);
  }

  if (tabledata_교체부품상세10 == null) return;
  table_교체부품상세10 = new Tabulator('#grid_교체부품상세10', {
    layout: 'resizableColumnFit',
    height: 130,
    data: tabledata_교체부품상세10,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '재제조번호', field: '재제조번호', sorter: 'string', width: '180' },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string', width: '180' },
      {
        title: 'ORIGIN 관리번호',
        field: 'ORIGIN_관리번호',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 품명',
        field: '교체전_품명',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 품번',
        field: '교체전_품번',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체전 QR',
        field: '교체전_QR',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 신품_고품',
        field: '교체후_신품_고품',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 고품식별',
        field: '교체후_고품식별',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 품번',
        field: '교체후_품번',
        sorter: 'string',
        width: '180',
      },
      {
        title: '교체후 QR',
        field: '교체후_QR',
        sorter: 'string',
        width: '180',
      },
      { title: '교체사유', field: '교체사유', sorter: 'string', width: '180' },
    ],
  });
}

function export_excel() {
  var sheets = {
    BSA기본정보: true,
    입고: table_입고,
    세척: table_세척,
    기초검사: table_기초검사,
    분해조립: table_분해조립,
    분해조립new: table_분해조립new,
    성능검사: table_성능검사,
    EOL: table_EOL,
    출하정보: table_출하정보,
    특이사항: table_특이사항,
    교체부품상세1: table_교체부품상세1,
    교체부품상세2: table_교체부품상세2,
    교체부품상세3: table_교체부품상세3,
    교체부품상세4: table_교체부품상세4,
    교체부품상세5: table_교체부품상세5,
    교체부품상세6: table_교체부품상세6,
    교체부품상세7: table_교체부품상세7,
    교체부품상세8: table_교체부품상세8,
    교체부품상세9: table_교체부품상세9,
    교체부품상세10: table_교체부품상세10,
  };
  table.download('xlsx', '재제조_bsa_data.xlsx', { sheets: sheets });
}

async function 관리번호_변경() {
  await copy();
  await delete_bsa();
}

async function copy_기본정보(mid, new_mid) {
  find(BSA재제조, m_id);
  await delay();

  var doc = BSA재제조_v;
  if (doc != null) {
    doc.관리번호 = new_mid;

    update(BSA재제조, doc);
    await delay();
  }
}

async function copy_입고(mid, new_mid) {
  find(입고, m_id);
  await delay();

  doc = 입고_v;
  if (doc != null) {
    doc.관리번호 = new_mid;

    update(입고, doc);
    await delay();
  }
}

async function copy_세척(mid, new_mid) {
  find(세척, m_id);
  await delay();

  doc = 세척_v;
  if (doc != null) {
    doc.관리번호 = new_mid;

    update(세척, doc);
    await delay();
  }
}

async function copy_기초검사(mid, new_mid) {
  find(기초검사, m_id);
  await delay();

  doc = 기초검사_v;
  if (doc != null) {
    doc.관리번호 = new_mid;

    update(기초검사, doc);
    await delay();
  }
}

async function copy_분해조립(mid, new_mid) {
  find(분해조립, m_id);
  await delay();

  doc = 분해조립_v;
  if (doc != null) {
    doc.관리번호 = new_mid;

    update(분해조립, doc);
    await delay();
  }
}

async function copy_성능검사(mid, new_mid) {
  find(성능검사, mid);
  await delay();

  doc = 성능검사_v;
  if (doc != null) {
    doc.관리번호 = new_mid;

    update(성능검사, doc);
    await delay();
  }
}

async function copy_EOL(mid, new_mid) {
  find(EOL, mid);
  await delay();

  doc = EOL_v;
  if (doc != null) {
    doc.관리번호 = new_mid;

    update(EOL, doc);
    await delay();
  }
}

async function copy_출하정보(mid, new_mid) {
  find(출하정보, m_id);
  await delay();

  doc = 출하정보_v;
  if (doc != null) {
    doc.관리번호 = new_mid;

    update(출하정보, doc);
    await delay();
  }
}

async function copy_특이사항(mid, new_mid) {
  find(특이사항, m_id);
  await delay();

  doc = 특이사항_v;
  if (doc != null) {
    doc.관리번호 = new_mid;

    update(특이사항, doc);
    await delay();
  }
}

async function copy_교체부품상세1(mid, new_mid) {
  find(교체부품상세1, m_id);
  await delay();

  doc = 교체부품상세1_v;
  if (doc != null) {
    doc.관리번호 = new_mid;

    update(교체부품상세1, doc);
    await delay();
  }
}

async function copy_교체부품상세2(mid, new_mid) {
  find(교체부품상세2, m_id);
  await delay();

  doc = 교체부품상세2_v;
  if (doc != null) {
    doc.관리번호 = new_mid;

    update(교체부품상세2, doc);
    await delay();
  }
}

async function copy_교체부품상세3(mid, new_mid) {
  find(교체부품상세3, m_id);
  await delay();

  doc = 교체부품상세3_v;
  if (doc != null) {
    doc.관리번호 = new_mid;

    update(교체부품상세3, doc);
    await delay();
  }
}

async function copy_교체부품상세4(mid, new_mid) {
  find(교체부품상세4, m_id);
  await delay();

  doc = 교체부품상세4_v;
  if (doc != null) {
    doc.관리번호 = new_mid;

    update(교체부품상세4, doc);
    await delay();
  }
}

async function copy_교체부품상세5(mid, new_mid) {
  find(교체부품상세5, m_id);
  await delay();

  doc = 교체부품상세5_v;
  if (doc != null) {
    doc.관리번호 = new_mid;

    update(교체부품상세5, doc);
    await delay();
  }
}

async function copy_교체부품상세6(mid, new_mid) {
  find(교체부품상세6, m_id);
  await delay();

  doc = 교체부품상세6_v;
  if (doc != null) {
    doc.관리번호 = new_mid;

    update(교체부품상세6, doc);
    await delay();
  }
}

async function copy_교체부품상세7(mid, new_mid) {
  find(교체부품상세7, m_id);
  await delay();

  doc = 교체부품상세7_v;
  if (doc != null) {
    doc.관리번호 = new_mid;

    update(교체부품상세7, doc);
    await delay();
  }
}

async function copy_교체부품상세8(mid, new_mid) {
  find(교체부품상세8, m_id);
  await delay();

  doc = 교체부품상세8_v;
  if (doc != null) {
    doc.관리번호 = new_mid;

    update(교체부품상세8, doc);
    await delay();
  }
}

async function copy_교체부품상세9(mid, new_mid) {
  find(교체부품상세9, m_id);
  await delay();

  doc = 교체부품상세9_v;
  if (doc != null) {
    doc.관리번호 = new_mid;

    update(교체부품상세9, doc);
    await delay();
  }
}

async function copy_교체부품상세10(mid, new_mid) {
  find(교체부품상세10, m_id);
  await delay();

  doc = 교체부품상세10_v;
  if (doc != null) {
    doc.관리번호 = new_mid;

    update(교체부품상세10, doc);
    await delay();
  }
}

async function copy() {
  var new_m_id = document.getElementById('copy_관리번호').value;
  if (new_m_id == '') {
    return;
  }

  if (m_id == '') {
    alert('변경을 원하시는 BSA를 선택해 주세요');
    return;
  }

  await copy_기본정보(m_id, new_m_id);
  progress.value = (1 / 19) * 100;

  await copy_입고(m_id, new_m_id);
  progress.value = (2 / 19) * 100;

  await copy_세척(m_id, new_m_id);
  progress.value = (3 / 19) * 100;

  await copy_기초검사(m_id, new_m_id);
  progress.value = (4 / 19) * 100;

  await copy_분해조립(m_id, new_m_id);
  progress.value = (5 / 19) * 100;

  await copy_성능검사(m_id, new_m_id);
  progress.value = (6 / 19) * 100;

  await copy_EOL(m_id, new_m_id);
  progress.value = (7 / 19) * 100;

  await copy_출하정보(m_id, new_m_id);
  progress.value = (8 / 19) * 100;

  await copy_특이사항(m_id, new_m_id);
  progress.value = (9 / 19) * 100;

  await copy_교체부품상세1(m_id, new_m_id);
  progress.value = (10 / 19) * 100;

  await copy_교체부품상세2(m_id, new_m_id);
  progress.value = (11 / 19) * 100;

  await copy_교체부품상세3(m_id, new_m_id);
  progress.value = (12 / 19) * 100;

  await copy_교체부품상세4(m_id, new_m_id);
  progress.value = (13 / 19) * 100;

  await copy_교체부품상세5(m_id, new_m_id);
  progress.value = (14 / 19) * 100;

  await copy_교체부품상세6(m_id, new_m_id);
  progress.value = (15 / 19) * 100;

  await copy_교체부품상세7(m_id, new_m_id);
  progress.value = (16 / 19) * 100;

  await copy_교체부품상세8(m_id, new_m_id);
  progress.value = (17 / 19) * 100;

  await copy_교체부품상세9(m_id, new_m_id);
  progress.value = (18 / 19) * 100;

  await copy_교체부품상세10(m_id, new_m_id);
  progress.value = (19 / 19) * 100;

  console.log('Copy 완료');
  재제조현황_조회();

  alert('복사가 완료되었습니다');
}
