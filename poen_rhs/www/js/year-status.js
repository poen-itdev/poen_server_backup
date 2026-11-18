var row_one_id = '';
var chart;
var year = '2023';

function yearOnChange(e) {
  year = e.options[e.selectedIndex].text;
}

async function 년간현황_시작() {
  if (typeof document.getElementById('_검색일') == 'undefined') {
    await sleep(DELAY);
    return;
  }

  flag_년간현황 = false;
  if (worker == '') return;

  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString();
  var year = now.slice(0, 4);
  var addYear;
  if (parseInt(year, 10) > 2020) {
    for (var i = parseInt(year, 10); i > 2020; i--) {
      console.log('YEAR:', year);
      addYear = document.createElement('option');
      addYear.innerText = String(i);
      addYear.value = String(i);

      document.getElementById('_검색일').appendChild(addYear);
    }
  }

  년간_조회();
}

async function 년간_조회(flag_id_search = false) {
  if (worker == '') return;
  if (flag_id_search == false) {
    var DateTime = luxon.DateTime;
    var seoul = DateTime.local().setZone('Asia/Seoul');
    var now = seoul.toString();
    var today = now.slice(0, 10);
    await sleep(DELAY);
    _검색일.value = today;

    var s_day = now.slice(0, 5) + '01-01' + 'T00:00:00.000Z';
    var e_day = now.slice(0, 5) + '12-31' + 'T00:00:00.000Z';

    const count_입고 = await 년간입고_table(s_day, e_day, flag_id_search);
    const count_출하 = await 년간출하_table(s_day, e_day, flag_id_search);

    년간차트(count_입고, count_출하);

    var all_counts = [];
    for (i = 1; i <= 12; i++) {
      var s_day = now.slice(0, 5) + i.toString().padStart(2, '0') + '-01' + 'T00:00:00.000Z';
      var e_day = now.slice(0, 5) + i.toString().padStart(2, '0') + '-31' + 'T00:00:00.000Z';
      if (level == 'kia_일반') {
        count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 입고: { $gte: s_day, $lte: e_day }, 구분: '일반' });
        await delay();
      } else if (level == 'hyundai_일반') {
        count(BSA재제조, {
          차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
          입고: { $gte: s_day, $lte: e_day },
          구분: '일반',
        });
        await delay();
      } else if (level == 'kia_보증') {
        count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 입고: { $gte: s_day, $lte: e_day }, 구분: '보증' });
        await delay();
      } else if (level == 'hyundai_보증') {
        count(BSA재제조, {
          차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
          입고: { $gte: s_day, $lte: e_day },
          구분: '보증',
        });
        await delay();
      } else {
        count(BSA재제조, { 입고: { $gte: s_day, $lte: e_day } });
        await delay();
      }
      all_counts.push(BSA재제조_cnt);
    }

    for (i = 1; i <= 12; i++) {
      var s_day = now.slice(0, 5) + i.toString().padStart(2, '0') + '-01' + 'T00:00:00.000Z';
      var e_day = now.slice(0, 5) + i.toString().padStart(2, '0') + '-31' + 'T00:00:00.000Z';
      if (level == 'kia_일반') {
        count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 출하: { $gte: s_day, $lte: e_day }, 구분: '일반' });
        await delay();
      } else if (level == 'hyundai_일반') {
        count(BSA재제조, {
          차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
          출하: { $gte: s_day, $lte: e_day },
          구분: '일반',
        });
        await delay();
      } else if (level == 'kia_보증') {
        count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 출하: { $gte: s_day, $lte: e_day }, 구분: '보증' });
        await delay();
      } else if (level == 'hyundai_보증') {
        count(BSA재제조, {
          차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
          출하: { $gte: s_day, $lte: e_day },
          구분: '보증',
        });
        await delay();
      } else {
        count(BSA재제조, { 출하: { $gte: s_day, $lte: e_day } });
        await delay();
      }
      all_counts.push(BSA재제조_cnt);
    }

    년간차트_detail(all_counts);
  } else {
    var search_day = year + '-';
    var s_day = search_day.slice(0, 5) + '01-01' + 'T00:00:00.000Z';
    var e_day = search_day.slice(0, 5) + '12-31' + 'T00:00:00.000Z';

    console.log('search start: ', s_day, e_day);

    const count_입고 = await 년간입고_table(s_day, e_day, flag_id_search);
    const count_출하 = await 년간출하_table(s_day, e_day, flag_id_search);

    chart.destroy();
    console.log('test:', count_입고, count_출하);
    년간차트(count_입고, count_출하);

    var all_counts = [];
    for (i = 1; i <= 12; i++) {
      var s_day = search_day.slice(0, 5) + i.toString().padStart(2, '0') + '-01' + 'T00:00:00.000Z';
      var e_day = search_day.slice(0, 5) + i.toString().padStart(2, '0') + '-31' + 'T00:00:00.000Z';

      if (level == 'kia_일반') {
        count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 입고: { $gte: s_day, $lte: e_day }, 구분: '일반' });
        await delay();
      } else if (level == 'hyundai_일반') {
        count(BSA재제조, {
          차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
          입고: { $gte: s_day, $lte: e_day },
          구분: '일반',
        });
        await delay();
      } else if (level == 'kia_보증') {
        count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 입고: { $gte: s_day, $lte: e_day }, 구분: '보증' });
        await delay();
      } else if (level == 'hyundai_보증') {
        count(BSA재제조, {
          차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
          입고: { $gte: s_day, $lte: e_day },
          구분: '보증',
        });
        await delay();
      } else {
        count(BSA재제조, { 입고: { $gte: s_day, $lte: e_day } });
        await delay();
      }
      all_counts.push(BSA재제조_cnt);
    }

    for (i = 1; i <= 12; i++) {
      var s_day = search_day.slice(0, 5) + i.toString().padStart(2, '0') + '-01' + 'T00:00:00.000Z';
      var e_day = search_day.slice(0, 5) + i.toString().padStart(2, '0') + '-31' + 'T00:00:00.000Z';
      if (level == 'kia_일반') {
        count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 출하: { $gte: s_day, $lte: e_day }, 구분: '일반' });
        await delay();
      } else if (level == 'hyundai_일반') {
        count(BSA재제조, {
          차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
          출하: { $gte: s_day, $lte: e_day },
          구분: '일반',
        });
        await delay();
      } else if (level == 'kia_보증') {
        count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 출하: { $gte: s_day, $lte: e_day }, 구분: '보증' });
        await delay();
      } else if (level == 'hyundai_보증') {
        count(BSA재제조, {
          차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
          출하: { $gte: s_day, $lte: e_day },
          구분: '보증',
        });
        await delay();
      } else {
        count(BSA재제조, { 출하: { $gte: s_day, $lte: e_day } });
        await delay();
      }
      all_counts.push(BSA재제조_cnt);
    }

    chart_detail.destroy();
    년간차트_detail(all_counts);
  }
}

async function 년간차트(count_입고 = 0, count_출하 = 0) {
  if (worker == '') return;
  const canvas = document.getElementById('chart');

  chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['입고', '출하'],
      datasets: [
        {
          label: '입고 vs 출하',
          data: [count_입고, count_출하],
          backgroundColor: ['rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
          borderColor: ['rgb(255, 205, 86)', 'rgb(75, 192, 192)'],
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

async function 년간차트_detail(counts) {
  if (worker == '') return;
  const canvas = document.getElementById('chart-detail');

  chart_detail = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      datasets: [
        {
          label: '입고 vs 출하',
          data: counts,
          backgroundColor: [
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgb(255, 205, 86)',
            'rgb(255, 205, 86)',
            'rgb(255, 205, 86)',
            'rgb(255, 205, 86)',
            'rgb(255, 205, 86)',
            'rgb(255, 205, 86)',
            'rgb(255, 205, 86)',
            'rgb(255, 205, 86)',
            'rgb(255, 205, 86)',
            'rgb(255, 205, 86)',
            'rgb(255, 205, 86)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
          ],
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

async function 년간입고_table(s_day, e_day, flag_id_search = false, search_month = '') {
  if (worker == '') return;
  var tabledata_BSA_입고 = [];

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
    delete BSA재제조_v[i].출하;
    delete BSA재제조_v[i].마지막충전일;
  }
  tabledata_BSA_입고 = BSA재제조_v;

  var table = new Tabulator('#grid_입고', {
    layout: 'resizableColumnFit',
    height: 500,
    data: tabledata_BSA_입고,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string' },
      { title: '차종', field: '차종', sorter: 'string' },
      { title: '품번', field: '품번', sorter: 'string' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string' },
      { title: '공정단계', field: '공정단계', sorter: 'string' },
      { title: '입고', field: '입고', sorter: 'string' },
      { title: '소재지', field: '소재지', sorter: 'string' },
    ],
  });

  return BSA재제조_v.length;
}

async function 년간출하_table(s_day, e_day, flag_id_search = false, search_month = '') {
  if (worker == '') return;
  var tabledata_BSA_출하 = [];

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

  tabledata_BSA_출하 = BSA재제조_v;

  var table = new Tabulator('#grid_출하', {
    layout: 'resizableColumnFit',
    height: 500,
    data: tabledata_BSA_출하,
    //autoColumns:true,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string' },
      { title: '차종', field: '차종', sorter: 'string' },
      { title: '품번', field: '품번', sorter: 'string' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string' },
      { title: '공정단계', field: '공정단계', sorter: 'string' },
      //{title:"적재No", field:"적재No", sorter:"string"},
      //{title:"입고", field:"입고", sorter:"string"},
      //{title:"제조투입", field:"제조투입", sorter:"string"},
      //{title:"세척", field:"세척", sorter:"string"},
      //{title:"기초검사", field:"기초검사", sorter:"string"},
      //{title:"분해조립", field:"분해조립", sorter:"string"},
      //{title:"성능검사", field:"성능검사", sorter:"string"},
      //{title:"EOL", field:"EOL", sorter:"string"},
      { title: '출하', field: '출하', sorter: 'string' },
      { title: '소재지', field: '소재지', sorter: 'string' },
    ],
  });

  return BSA재제조_v.length;
}
