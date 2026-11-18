var 마도창고_table;
var 구장창고_table;
var 군포창고_table;
var 제주창고_table;

async function 창고재고조회_시작() {
  flag_창고재고조회 = false;

  창고_수량집계();
}

function 창고_수량집계_year() {
  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString();
  var s_day = now.slice(0, 5) + '01-01';
  var e_day = now.slice(0, 5) + '12-31';

  document.getElementById('_검색일_from').value = s_day;
  document.getElementById('_검색일_to').value = e_day;
}

function 창고_수량집계_month() {
  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString();
  var s_day = now.slice(0, 8) + '01';
  var e_day;
  if (now.slice(5, 2) in ['01', '03', '05', '07', '08', '10', '12']) e_day = now.slice(0, 8) + '31';
  else if (now.slice(5, 2) == '02') e_day = now.slice(0, 8) + '28';
  else e_day = now.slice(0, 8) + '30';

  document.getElementById('_검색일_from').value = s_day;
  document.getElementById('_검색일_to').value = e_day;
}

async function 창고_수량집계() {
  var 집계_today_begin = document.getElementById('_검색일_from').value + 'T00:00:000Z';
  var 집계_today_end = document.getElementById('_검색일_to').value + 'T23:59:000Z';
  var 구분 = '';

  if (document.getElementById('_검색일_from').value == '') 집계_today_begin = '';
  if (document.getElementById('_검색일_to').value == '') 집계_today_end = '';

  console.log('begin:', 집계_today_begin, 'end:', 집계_today_end);

  if (집계_today_end == '' || 집계_today_begin == '') {
    findOne_구장재고(구장재고, { 관리번호: { $exists: true } });
    await delay();

    findOne_군포재고(군포재고, { 관리번호: { $exists: true } });
    await delay();

    findOne_제주재고(제주재고, { 관리번호: { $exists: true } });
    await delay();
  } else {
    findOne_구장재고(구장재고, { 관리번호: { $exists: true }, 입고일: { $gte: 집계_today_begin, $lte: 집계_today_end } });
    await delay();

    findOne_군포재고(군포재고, { 관리번호: { $exists: true }, 입고일: { $gte: 집계_today_begin, $lte: 집계_today_end } });
    await delay();

    findOne_제주재고(제주재고, { 관리번호: { $exists: true }, 입고일: { $gte: 집계_today_begin, $lte: 집계_today_end } });
    await delay();
  }

  if (집계_today_end == '' || 집계_today_begin == '') {
    if (구장재고_v != null) {
      find_구장재고(구장재고, { 관리번호: { $exists: true } });
      await delay();
    }

    if (군포재고_v != null) {
      find_군포재고(구장재고, { 관리번호: { $exists: true } });
      await delay();
    }

    if (제주재고_v != null) {
      find_제주재고(구장재고, { 관리번호: { $exists: true } });
      await delay();
    }
  } else {
    if (구장재고_v != null) {
      find_구장재고(구장재고, { 관리번호: { $exists: true }, 입고일: { $gte: 집계_today_begin, $lte: 집계_today_end } });
      await delay();
    }

    if (군포재고_v != null) {
      find_군포재고(군포재고, { 관리번호: { $exists: true }, 입고일: { $gte: 집계_today_begin, $lte: 집계_today_end } });
      await delay();
    }

    if (제주재고_v != null) {
      find_제주재고(제주재고, { 관리번호: { $exists: true }, 입고일: { $gte: 집계_today_begin, $lte: 집계_today_end } });
      await delay();
    }
  }

  구장창고(구장재고_v);

  군포창고(군포재고_v);

  제주창고(제주재고_v);
}

function 구장창고(data) {
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

  구장창고_table = new Tabulator('#grid_구장창고', {
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

function 군포창고(data) {
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

  군포창고_table = new Tabulator('#grid_군포창고', {
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

function 제주창고(data) {
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

  제주창고_table = new Tabulator('#grid_제주창고', {
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
