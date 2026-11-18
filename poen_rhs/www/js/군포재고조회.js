var 군포창고_table;

async function 군포재고조회_시작() {
  flag_군포재고조회 = false;

  document
    .getElementById('filter-field')
    .addEventListener('change', 군포재고updateFilter);
  document
    .getElementById('filter-type')
    .addEventListener('change', 군포재고updateFilter);
  document
    .getElementById('filter-value')
    .addEventListener('keyup', 군포재고updateFilter);

  //Clear filters on "Clear Filters" button click
  document
    .getElementById('filter-clear')
    .addEventListener('click', function () {
      var fieldEl = document.getElementById('filter-field');
      var typeEl = document.getElementById('filter-type');
      var valueEl = document.getElementById('filter-value');
      fieldEl.value = '';
      typeEl.value = '=';
      valueEl.value = '';

      군포창고_table.clearFilter();
    });

  find_군포재고(군포재고, { 관리번호: { $exists: true } });
  await delay();

  if (군포재고_v != null) {
    군포창고조회(군포재고_v);

    품번별_수량집계(군포재고_v);

    입고처별_수량집계(군포재고_v);

    출고처별_수량집계(군포재고_v);
  }
}

function 군포_수량집계_year() {
  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString();
  var s_day = now.slice(0, 5) + '01-01';
  var e_day = now.slice(0, 5) + '12-31';

  document.getElementById('_검색일_from').value = s_day;
  document.getElementById('_검색일_to').value = e_day;
}

function 군포_수량집계_month() {
  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString();
  var s_day = now.slice(0, 8) + '01';
  var e_day;
  if (now.slice(5, 2) in ['01', '03', '05', '07', '08', '10', '12'])
    e_day = now.slice(0, 8) + '31';
  else if (now.slice(5, 2) == '02') e_day = now.slice(0, 8) + '28';
  else e_day = now.slice(0, 8) + '30';

  document.getElementById('_검색일_from').value = s_day;
  document.getElementById('_검색일_to').value = e_day;
}

async function 군포_수량집계_기간조회() {
  var 집계_today_begin =
    document.getElementById('_검색일_from').value + 'T00:00:000Z';
  var 집계_today_end =
    document.getElementById('_검색일_to').value + 'T23:59:000Z';
  var 구분 = '';

  if (document.getElementById('_검색일_from').value == '')
    집계_today_begin = '';
  if (document.getElementById('_검색일_to').value == '') 집계_today_end = '';

  console.log('begin:', 집계_today_begin, 'end:', 집계_today_end);

  count(군포재고, {
    관리번호: { $exists: true },
    입고일: { $gte: 집계_today_begin, $lte: 집계_today_end },
  });
  await delay();

  if (군포재고_cnt > 0) {
    find_군포재고(군포재고, {
      관리번호: { $exists: true },
      입고일: { $gte: 집계_today_begin, $lte: 집계_today_end },
    });
    await delay();

    군포창고조회(군포재고_v);

    품번별_수량집계(군포재고_v);

    입고처별_수량집계(군포재고_v);

    출고처별_수량집계(군포재고_v);
  } else {
    alert('검색 조건에 맞는 데이터가 없습니다');
  }
}
function 군포창고조회(data) {
  var datas = [];
  var cnt = 0;
  data.forEach(function (v) {
    cnt++;
    v.No = cnt;
    datas.push(v);
  });

  군포창고_table = new Tabulator('#grid_BSA', {
    layout: 'resizableColumnFit',
    data: datas,
    height: '700px',

    columns: [
      { title: 'No', field: 'No', sorter: 'string', width: '180' },
      { title: '일반/보증', field: '구분', sorter: 'string', width: '180' },
      { title: '입고일', field: '입고일', sorter: 'string', width: '180' },
      { title: '입고처', field: '입고처', sorter: 'string', width: '180' },
      { title: '부품번호', field: '부품번호', sorter: 'string', width: '180' },
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      {
        title: '재제조번호',
        field: '재제조번호',
        sorter: 'string',
        width: '180',
      },
      { title: 'RO번호', field: 'RO번호', sorter: 'string', width: '180' },
      { title: '생산연도', field: '생산연도', sorter: 'string', width: '180' },
      { title: 'ROM ID', field: 'ROM_ID', sorter: 'string', width: '180' },
      { title: '비고', field: '비고', sorter: 'string', width: '180' },
      { title: '보관위치', field: '보관위치', sorter: 'string', width: '180' },
      { title: '출고일', field: '출고일', sorter: 'string', width: '180' },
      { title: '출고처', field: '출고처', sorter: 'string', width: '180' },
    ],
  });

  군포창고_table.on('rowClick', async function (e, row) {
    console.log('selected 관리번호: ', row.getData().관리번호);
    document.getElementById('select_bsa').innerHTML = row.getData().관리번호;
  });
}

function 창고_export_excel() {
  var sheets = {
    군포창고재고: true,
  };
  군포창고_table.download('xlsx', '창고재고.xlsx', { sheets: sheets });
}

function 군포재고updateFilter() {
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
    군포창고_table.setFilter(filter, typeVal, valueEl.value);
  }
}

async function delete_군포재고_bsa() {
  var select_관리번호 = document.getElementById('select_bsa').value;

  deleteOne_군포재고(군포재고, select_관리번호);
  await delay();

  find_군포재고(군포재고, { 관리번호: { $exists: true } });
  await delay();

  군포창고조회(군포재고_v);
}

function 품번별_수량집계(data) {
  var 품번 = [];
  var count = [];

  data.forEach(async function (infos) {
    var index = 품번.indexOf(infos.부품번호);
    if (index < 0) {
      품번.push(infos.부품번호);
      count.push(1);
    } else {
      count[index]++;
    }
  });

  var datas = [];

  var cnt_index = 0;
  품번.forEach(function (item) {
    var v = {
      No: cnt_index + 1,
      부품번호: item,
      수량: count[cnt_index],
    };

    datas.push(v);

    cnt_index++;
  });

  품번_수량집계_table = new Tabulator('#grid_품번_수량집계', {
    layout: 'resizableColumnFit',
    data: datas,
    height: '700px',

    columns: [
      { title: 'No', field: 'No', sorter: 'string', width: '180' },
      { title: '부품번호', field: '부품번호', sorter: 'string', width: '180' },
      { title: '수량', field: '수량', sorter: 'string', width: '180' },
    ],
  });
}

function 입고처별_수량집계(data) {
  var 입고처 = [];
  var count = [];

  data.forEach(async function (infos) {
    var index = 입고처.indexOf(infos.입고처);
    if (index < 0) {
      입고처.push(infos.입고처);
      count.push(1);
    } else {
      count[index]++;
    }
  });

  var datas = [];

  var cnt_index = 0;
  입고처.forEach(function (item) {
    var v = {
      No: cnt_index + 1,
      입고처: item,
      수량: count[cnt_index],
    };

    datas.push(v);

    cnt_index++;
  });

  입고처_수량집계_table = new Tabulator('#grid_입고처_수량집계', {
    layout: 'resizableColumnFit',
    data: datas,
    height: '700px',

    columns: [
      { title: 'No', field: 'No', sorter: 'string', width: '180' },
      { title: '입고처', field: '입고처', sorter: 'string', width: '180' },
      { title: '수량', field: '수량', sorter: 'string', width: '180' },
    ],
  });
}

function 출고처별_수량집계(data) {
  var 출고처 = [];
  var count = [];

  data.forEach(async function (infos) {
    var index = 출고처.indexOf(infos.출고처);
    if (index < 0) {
      출고처.push(infos.출고처);
      count.push(1);
    } else {
      count[index]++;
    }
  });

  var datas = [];

  var cnt_index = 0;
  출고처.forEach(function (item) {
    var v = {
      No: cnt_index + 1,
      출고처: item,
      수량: count[cnt_index],
    };

    datas.push(v);

    cnt_index++;
  });

  출고처_수량집계_table = new Tabulator('#grid_출고처_수량집계', {
    layout: 'resizableColumnFit',
    data: datas,
    height: '700px',

    columns: [
      { title: 'No', field: 'No', sorter: 'string', width: '180' },
      { title: '출고처', field: '출고처', sorter: 'string', width: '180' },
      { title: '수량', field: '수량', sorter: 'string', width: '180' },
    ],
  });
}

function 출하처_콤보박스(e) {
  const value = e.value;

  _출고처.value = value;
}
