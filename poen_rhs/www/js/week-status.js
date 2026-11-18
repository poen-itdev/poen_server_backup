var row_one_id = '';
var chart;

async function 주간현황_시작() {
  if (typeof _검색일 == 'undefined') {
    await sleep(DELAY);
    return;
  }

  flag_주간현황 = false;
  if (worker == '') return;

  주간_조회();
}

function 날짜_조회() {
  if (worker == '') return;
  var search_day = _검색일.value;

  주간_조회(search_day);
}

async function 주간_조회(search_day = '') {
  if (worker == '') return;
  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString();
  var now2 = seoul.toString();
  var today = now.slice(0, 10);
  var week = seoul.weekday;
  var start = parseInt(today.split('-')[2], 10) - (week - 1);
  var end = parseInt(today.split('-')[2], 10) + (7 - week);
  var week_start = today.slice(0, 8) + start + 'T00:00:00';
  var week_end = today.slice(0, 8) + end + 'T23:59:59';

  if (search_day == '') {
    _검색일.value = today;
  } else {
    now = new Date(search_day);
    now2 = new Date(search_day);
    today = now2.toISOString().slice(0, 10);
    _검색일.value = today;

    week = now.getDay();
    start = week - 1;
    end = 7 - week;
    week_start = new Date(now.setDate(now.getDate() - start));
    week_end = new Date(now2.setDate(now2.getDate() + end));
    week_start = week_start.toISOString();
    week_end = week_end.toISOString();
    chart.destroy();
  }

  console.log('today:', today, 'week:', week, 'week start:', week_start, 'week end:', week_end);

  const count_입고 = await 주간입고_table(week_start, week_end);
  const count_제조완료 = await 주간제조완료_table(week_start, week_end);
  const count_출하 = await 주간출하_table(week_start, week_end);
  주간차트(count_입고, count_제조완료, count_출하);
}

async function 주간차트(count_입고 = 0, count_제조완료 = 0, count_출하 = 0) {
  if (worker == '') return;
  const canvas = document.getElementById('chart');

  chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['입고', '제조완료', '출하'],
      datasets: [
        {
          label: '입고 vs 제조완료 vs 출하',
          data: [count_입고, count_제조완료, count_출하],
          backgroundColor: ['rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(124, 75, 192, 0.2)'],
          borderColor: ['rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgba(124, 75, 192, 0.2)'],
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          title: {
            display: true,
            text: '갯수',
          },
          min: 0,
          ticks: {
            // forces step size to be 50 units
            stepSize: 1,
          },
          beginAtZero: true,
        },
      },
    },
  });
}

async function 주간입고_table(week_start = '', week_end = '') {
  if (worker == '') return;
  var tabledata_BSA_입고 = [];
  if (level == 'kia_일반') {
    find_BSA재제조(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 입고: { $gte: week_start, $lte: week_end }, 구분: '일반' });
    await delay();
  } else if (level == 'hyundai_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      입고: { $gte: week_start, $lte: week_end },
      구분: '일반',
    });
    await delay();
  } else if (level == 'kia_보증') {
    find_BSA재제조(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 입고: { $gte: week_start, $lte: week_end }, 구분: '보증' });
    await delay();
  } else if (level == 'hyundai_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      입고: { $gte: week_start, $lte: week_end },
      구분: '보증',
    });
    await delay();
  } else {
    find_BSA재제조(BSA재제조, { 입고: { $gte: week_start, $lte: week_end } });
    await delay();
  }

  if (BSA재제조_v == null) return;

  for (var i = 0; i < BSA재제조_v.length; i++) {
    delete BSA재제조_v[i].적재No;
    delete BSA재제조_v[i].제조투입;
    delete BSA재제조_v[i].세척;
    delete BSA재제조_v[i].기초검사;
    delete BSA재제조_v[i].분해조립;
    delete BSA재제조_v[i].성능검사;
    delete BSA재제조_v[i].EOL;
    delete BSA재제조_v[i].출하;
    delete BSA재제조_v[i].마지막충전일;
  }

  tabledata_BSA_입고 = JSON.parse(JSON.stringify(BSA재제조_v));
  var table = new Tabulator('#grid_입고', {
    layout: 'resizableColumnFit',
    height: 500,
    data: tabledata_BSA_입고,
    //autoColumns:true,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string' },
      { title: '차종', field: '차종', sorter: 'string' },
      { title: '품번', field: '품번', sorter: 'string' },
      { title: 'RO no', field: 'RO_no', sorter: 'string' },
      { title: '공정단계', field: '공정단계', sorter: 'string' },
      { title: '입고', field: '입고', sorter: 'string' },
      { title: '소재지', field: '소재지', sorter: 'string' },
    ],
  });

  return BSA재제조_v.length;
}

async function 주간제조완료_table(week_start = '', week_end = '') {
  if (worker == '') return;
  var tabledata_BSA_제조완료 = [];

  if (level == 'kia_일반') {
    find_BSA재제조(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, EOL: { $gte: week_start, $lte: week_end }, 구분: '일반' });
    await delay();
  } else if (level == 'hyundai_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      EOL: { $gte: week_start, $lte: week_end },
      구분: '일반',
    });
    await delay();
  } else if (level == 'kia_보증') {
    find_BSA재제조(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, EOL: { $gte: week_start, $lte: week_end }, 구분: '보증' });
    await delay();
  } else if (level == 'hyundai_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      EOL: { $gte: week_start, $lte: week_end },
      구분: '보증',
    });
    await delay();
  } else {
    find_BSA재제조(BSA재제조, { EOL: { $gte: week_start, $lte: week_end } });
    await delay();
  }

  if (BSA재제조_v == null) return;

  for (var i = 0; i < BSA재제조_v.length; i++) {
    delete BSA재제조_v[i].적재No;
    delete BSA재제조_v[i].제조투입;
    delete BSA재제조_v[i].세척;
    delete BSA재제조_v[i].기초검사;
    delete BSA재제조_v[i].분해조립;
    delete BSA재제조_v[i].성능검사;
    delete BSA재제조_v[i].EOL;
    delete BSA재제조_v[i].출하;
    delete BSA재제조_v[i].마지막충전일;
  }
  tabledata_BSA_제조완료 = JSON.parse(JSON.stringify(BSA재제조_v));

  var table = new Tabulator('#grid_제조완료', {
    layout: 'resizableColumnFit',
    height: 500,
    data: tabledata_BSA_제조완료,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string' },
      { title: '차종', field: '차종', sorter: 'string' },
      { title: '품번', field: '품번', sorter: 'string' },
      { title: 'RO no', field: 'RO_no', sorter: 'string' },
      { title: '공정단계', field: '공정단계', sorter: 'string' },
      { title: '입고', field: '입고', sorter: 'string' },
      { title: '소재지', field: '소재지', sorter: 'string' },
    ],
  });

  return BSA재제조_v.length;
}

async function 주간출하_table(week_start, week_end) {
  if (worker == '') return;
  var tabledata_BSA_출하 = [];
  if (level == 'kia_일반') {
    find_BSA재제조(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 출하: { $gte: week_start, $lte: week_end }, 구분: '일반' });
    await delay();
  } else if (level == 'hyundai_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      출하: { $gte: week_start, $lte: week_end },
      구분: '일반',
    });
    await delay();
  } else if (level == 'kia_보증') {
    find_BSA재제조(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 출하: { $gte: week_start, $lte: week_end }, 구분: '보증' });
    await delay();
  } else if (level == 'hyundai_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      출하: { $gte: week_start, $lte: week_end },
      구분: '보증',
    });
    await delay();
  } else {
    find_BSA재제조(BSA재제조, { 출하: { $gte: week_start, $lte: week_end } });
    await delay();
  }

  if (BSA재제조_v == null) return;

  for (var i = 0; i < BSA재제조_v.length; i++) {
    delete BSA재제조_v[i].적재No;
    delete BSA재제조_v[i].입고;
    delete BSA재제조_v[i].제조투입;
    delete BSA재제조_v[i].세척;
    delete BSA재제조_v[i].기초검사;
    delete BSA재제조_v[i].분해조립;
    delete BSA재제조_v[i].성능검사;
    delete BSA재제조_v[i].EOL;
    delete BSA재제조_v[i].마지막충전일;
  }
  tabledata_BSA_출하 = JSON.parse(JSON.stringify(BSA재제조_v));

  var table = new Tabulator('#grid_출하', {
    layout: 'resizableColumnFit',
    height: 500,
    data: tabledata_BSA_출하,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string' },
      { title: '차종', field: '차종', sorter: 'string' },
      { title: '품번', field: '품번', sorter: 'string' },
      { title: 'RO no', field: 'RO_no', sorter: 'string' },
      { title: '공정단계', field: '공정단계', sorter: 'string' },
      { title: '출하', field: '출하', sorter: 'string' },
      { title: '소재지', field: '소재지', sorter: 'string' },
    ],
  });

  return BSA재제조_v.length;
}
