var row_one_id = '';
var chart;
var year = '2023';
var month = '1';

function yearOnChange(e) {
  year = e.options[e.selectedIndex].text;
}

function monthOnChange(e) {
  month = e.options[e.selectedIndex].text;
}

async function 월간현황_시작() {
  if (document.getElementById('_검색일_year') == undefined) {
    await sleep(DELAY);
    return;
  }

  flag_월간현황 = false;
  if (worker == '') return;

  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString();
  var year = now.slice(0, 4);
  var month = seoul.toString().slice(6, 7);
  var addYear;
  var addMonth;

  //년도를 2021 부터 지금 까지 목록을 만든다.
  if (parseInt(year, 10) > 2020) {
    for (var i = parseInt(year, 10); i > 2020; i--) {
      console.log('YEAR:', year);

      addYear = document.createElement('option');
      addYear.innerText = String(i);
      addYear.value = String(i);

      document.getElementById('_검색일_year').appendChild(addYear);
      console.log(i);
    }

    //디폴트 선택 년도 설정
    document.getElementById('_검색일_year').options.selected = true;
  }

  //월 선탁 목록을 1 ~ 12 까지 만든다.
  for (var i = 1; i <= 12; i++) {
    var str = i.toString().padStart(2, '0');
    addMonth = document.createElement('option');
    addMonth.innerText = String(str);
    addMonth.value = String(str);

    document.getElementById('_검색일_month').appendChild(addMonth);
    console.log(str);
  }

  var cnt = parseInt(month, 10) - 1;
  console.log('=>', month, cnt);
  //현재달을 디폴트로 선택
  document.getElementById('_검색일_month').options[cnt].selected = true;

  월간_조회();
}

//월간조회 인자 flag_id_search 가 true면 선택한 년월로 조검검색한다.
async function 월간_조회(flag_id_search = false) {
  if (worker == '') return;
  if (flag_id_search == false) {
    var DateTime = luxon.DateTime;
    var seoul = DateTime.local().setZone('Asia/Seoul');
    var now = seoul.toString();
    var today = now.slice(0, 10);
    await sleep(DELAY);

    var s_day = now.slice(0, 8) + '01' + 'T00:00:00.000Z';
    var e_day = now.slice(0, 8) + '31' + 'T00:00:00.000Z';

    const count_입고 = await 월간입고_table(s_day, e_day, flag_id_search);
    const count_제조완료 = await 월간제조완료_table(s_day, e_day, flag_id_search);
    const count_출하 = await 월간출하_table(s_day, e_day, flag_id_search);

    월간차트(count_입고, count_제조완료, count_출하);
  } else {
    year = document.getElementById('_검색일_year').value;
    month = document.getElementById('_검색일_month').value;
    var search_day = year + '-' + month + '-';
    var s_day = search_day.slice(0, 8) + '01' + 'T00:00:00.000Z';
    var e_day = search_day.slice(0, 8) + '31' + 'T00:00:00.000Z';

    console.log('search start: ', s_day, e_day);

    const count_입고 = await 월간입고_table(s_day, e_day, flag_id_search);
    const count_제조완료 = await 월간제조완료_table(s_day, e_day, flag_id_search);
    const count_출하 = await 월간출하_table(s_day, e_day, flag_id_search);

    if (chart != undefined) chart.destroy();

    월간차트(count_입고, count_제조완료, count_출하);
  }
}

async function 월간차트(count_입고 = 0, count_제조완료 = 0, count_출하 = 0) {
  if (worker == '') return;
  const canvas = document.getElementById('chart');

  chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['입고', '제조완료', '출하'],
      datasets: [
        {
          label: '입고 vs 제조완료 vs출하',
          data: [count_입고, count_제조완료, count_출하],
          backgroundColor: ['rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(75, 124, 124, 0.2)'],
          borderColor: ['rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgba(75, 124, 124, 0.2)'],
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

async function 월간입고_table(s_day, e_day, flag_id_search = false, search_month = '') {
  if (worker == '') return;
  var tabledata_BSA_입고 = [];
  var result_count = 0;

  if (level == 'kia_일반') {
    find_BSA재제조(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 입고: { $gte: s_day, $lte: e_day }, 구분: '일반' });
    await delay();
  } else if (level == 'hyundai_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      입고: { $gte: s_day, $lte: e_day },
      구분: '일반',
    });
    await delay();
  } else if (level == 'kia_보증') {
    find_BSA재제조(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 입고: { $gte: s_day, $lte: e_day }, 구분: '보증' });
    await delay();
  } else if (level == 'hyundai_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      입고: { $gte: s_day, $lte: e_day },
      구분: '보증',
    });
    await delay();
  } else {
    find_BSA재제조(BSA재제조, { 입고: { $gte: s_day, $lte: e_day } });
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
      { title: 'RO_no', field: 'RO_no', sorter: 'string' },
      { title: '공정단계', field: '공정단계', sorter: 'string' },
      //{title:"적재No", field:"적재No", sorter:"string"},
      { title: '입고', field: '입고', sorter: 'string' },
      //{title:"제조투입", field:"제조투입", sorter:"string"},
      //{title:"세척", field:"세척", sorter:"string"},
      //{title:"기초검사", field:"기초검사", sorter:"string"},
      //{title:"분해조립", field:"분해조립", sorter:"string"},
      //{title:"성능검사", field:"성능검사", sorter:"string"},
      //{title:"EOL", field:"EOL", sorter:"string"},
      //{title:"출하", field:"출하", sorter:"string"},
      { title: '소재지', field: '소재지', sorter: 'string' },
    ],
  });

  return BSA재제조_v.length;
}

async function 월간제조완료_table(s_day, e_day, flag_id_search = false, search_month = '') {
  if (worker == '') return;
  var tabledata_BSA_제조완료 = [];
  var result_count = 0;

  //외부에 주는 계정 처리
  if (level == 'kia_일반') {
    find_BSA재제조(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, EOL: { $gte: s_day, $lte: e_day }, 구분: '일반' });
    await delay();
  } else if (level == 'hyundai_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      EOL: { $gte: s_day, $lte: e_day },
      구분: '일반',
    });
    await delay();
  } else if (level == 'kia_보증') {
    find_BSA재제조(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, EOL: { $gte: s_day, $lte: e_day }, 구분: '보증' });
    await delay();
  } else if (level == 'hyundai_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      EOL: { $gte: s_day, $lte: e_day },
      구분: '보증',
    });
    await delay();
  } else {
    find_BSA재제조(BSA재제조, { EOL: { $gte: s_day, $lte: e_day } });
    await delay();
  }

  if (BSA재제조_v == null) return;

  //표시하지 않을 항목 제거
  for (var i = 0; i < BSA재제조_v.length; i++) {
    delete BSA재제조_v[i].적재No;
    //delete BSA재제조_v[i].입고;
    delete BSA재제조_v[i].제조투입;
    delete BSA재제조_v[i].세척;
    delete BSA재제조_v[i].기초검사;
    delete BSA재제조_v[i].분해조립;
    delete BSA재제조_v[i].성능검사;
    delete BSA재제조_v[i].EOL;
    delete BSA재제조_v[i].마지막충전일;
  }

  tabledata_BSA_제조완료 = JSON.parse(JSON.stringify(BSA재제조_v));

  var table = new Tabulator('#grid_제조완료', {
    layout: 'resizableColumnFit',
    height: 500,
    data: tabledata_BSA_제조완료,
    //autoColumns:true,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string' },
      { title: '차종', field: '차종', sorter: 'string' },
      { title: '품번', field: '품번', sorter: 'string' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string' },
      { title: '공정단계', field: '공정단계', sorter: 'string' },
      //{title:"적재No", field:"적재No", sorter:"string"},
      { title: '입고', field: '입고', sorter: 'string' },
      //{title:"제조투입", field:"제조투입", sorter:"string"},
      //{title:"세척", field:"세척", sorter:"string"},
      //{title:"기초검사", field:"기초검사", sorter:"string"},
      //{title:"분해조립", field:"분해조립", sorter:"string"},
      //{title:"성능검사", field:"성능검사", sorter:"string"},
      //{title:"EOL", field:"EOL", sorter:"string"},
      //{title:"출하", field:"출하", sorter:"string"},
      { title: '소재지', field: '소재지', sorter: 'string' },
    ],
  });

  return BSA재제조_v.length;
}

async function 월간출하_table(s_day, e_day, flag_id_search = false, search_month = '') {
  if (worker == '') return;
  var tabledata_BSA_출하 = [];
  var result_count = 0;

  if (level == 'kia_일반') {
    find_BSA재제조(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 출하: { $gte: s_day, $lte: e_day }, 구분: '일반' });
    await delay();
  } else if (level == 'hyundai_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      출하: { $gte: s_day, $lte: e_day },
      구분: '일반',
    });
    await delay();
  } else if (level == 'kia_보증') {
    find_BSA재제조(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 출하: { $gte: s_day, $lte: e_day }, 구분: '보증' });
    await delay();
  } else if (level == 'hyundai_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      출하: { $gte: s_day, $lte: e_day },
      구분: '보증',
    });
    await delay();
  } else {
    find_BSA재제조(BSA재제조, { 출하: { $gte: s_day, $lte: e_day } });
    await delay();
  }

  if (BSA재제조_v == null) return;

  //불필요한 항목 제거
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
      { title: 'RO_no', field: 'RO_no', sorter: 'string' },
      { title: '공정단계', field: '공정단계', sorter: 'string' },
      { title: '출하', field: '출하', sorter: 'string' },
      { title: '소재지', field: '소재지', sorter: 'string' },
    ],
  });

  return BSA재제조_v.length;
}
