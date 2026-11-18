var BSA대기수량_table;
var BSA출하수량_table;
var 출하대기_BSA_관리번호 = '';
var 선택대기공정 = '세척';
var 대기수량Timer;

async function 대기수량_현황_시작() {
  flag_대기수량_현황 = false;
  if (worker == '') return;

  대기수량_현황_조회();

  document.getElementById('filter-field').addEventListener('change', BSA대기수량_updateFilter);
  document.getElementById('filter-type').addEventListener('change', BSA대기수량_updateFilter);
  document.getElementById('filter-value').addEventListener('keyup', BSA대기수량_updateFilter);

  //Clear filters on "Clear Filters" button click
  document.getElementById('filter-clear').addEventListener('click', function () {
    var fieldEl = document.getElementById('filter-field');
    var typeEl = document.getElementById('filter-type');
    var valueEl = document.getElementById('filter-value');
    fieldEl.value = '';
    typeEl.value = '=';
    valueEl.value = '';

    BSA출하수량_table.clearFilter();
  });

  document.getElementById('세척').addEventListener('click', function () {
    대기목록('세척'); //각 박스 클릭시 수량에 해당하는 배터리팩의 기본정보 표시
  });

  document.getElementById('기초').addEventListener('click', function () {
    대기목록('기초검사');
  });

  document.getElementById('분해').addEventListener('click', function () {
    대기목록('분해조립');
  });

  document.getElementById('성능').addEventListener('click', function () {
    대기목록('성능검사');
  });

  document.getElementById('EOL').addEventListener('click', function () {
    대기목록('EOL');
  });

  document.getElementById('공정대기').addEventListener('click', function () {
    대기목록('공정대기');
  });

  document.getElementById('품질대기').addEventListener('click', function () {
    대기목록('품질대기');
  });

  if (대기수량Timer != undefined) clearInterval(대기수량Timer);
  대기수량Timer = setInterval(function () {
    대기수량_현황_조회();
  }, 1000 * 30);
}

async function 대기수량_현황_조회() {
  await 세척대기();
  await 기초검사대기();
  await 분해조립대기();
  await 성능검사대기();
  await EOL대기();
  await 출하대기();
  await 공정대기();
  await 품질대기();

  console.log('update');
}

//각 항목의 대기 수량 표시
async function 세척대기() {
  count(
    BSA재제조,
    {
      입고: { $ne: '' },
      세척: { $eq: '' },
      기초검사: { $eq: '' },
      분해조립: { $eq: '' },
      성능검사: { $eq: '' },
      EOL: { $eq: '' },
      출하검사: { $eq: '' },
      소재지: { $nin: ['공정대기', '품질대기', '구장'] },
      완전분해: { $eq: '' },
      폐기: { $eq: '' },
      출하: { $eq: '' },
      구분: { $nin: ['일반기타', '보증기타'] },
    },
    세척
  );
  await delay();

  document.getElementById('check_num2').innerHTML = option_세척_cnt;
}

async function 기초검사대기() {
  count(BSA재제조, { 세척: { $ne: '' }, 기초검사: { $eq: '' }, 분해조립: { $eq: '' }, 성능검사: { $eq: '' }, EOL: { $eq: '' }, 출하검사: { $eq: '' }, 소재지: { $nin: ['공정대기', '품질대기', '구장'] }, 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 출하: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } }, 기초검사);
  await delay();

  document.getElementById('check_num3').innerHTML = option_기초검사_cnt;
}

async function 분해조립대기() {
  count(BSA재제조, { 기초검사: { $ne: '' }, 분해조립: { $eq: '' }, 성능검사: { $eq: '' }, EOL: { $eq: '' }, 출하검사: { $eq: '' }, 소재지: { $nin: ['공정대기', '품질대기', '구장'] }, 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 출하: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } }, 분해조립);
  await delay();

  document.getElementById('check_num4').innerHTML = option_분해조립_cnt;
}

async function 성능검사대기() {
  count(BSA재제조, { 분해조립: { $ne: '' }, 성능검사: { $eq: '' }, EOL: { $eq: '' }, 출하검사: { $eq: '' }, 소재지: { $nin: ['공정대기', '품질대기', '구장'] }, 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 출하: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } }, 성능검사);
  await delay();

  document.getElementById('check_num5').innerHTML = option_성능검사_cnt;
}

async function EOL대기() {
  count(BSA재제조, { 성능검사: { $ne: '' }, EOL: { $eq: '' }, 출하검사: { $eq: '' }, 소재지: { $nin: ['공정대기', '품질대기', '구장'] }, 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 출하: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } }, EOL);
  await delay();

  document.getElementById('check_num6').innerHTML = option_EOL_cnt;
}

async function 출하대기() {
  count(BSA재제조, { $or: [{ EOL: { $ne: '' } }, { 출하검사: { $ne: '' } }], 소재지: { $nin: ['공정대기', '품질대기', '구장'] }, 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 출하: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } }, 출하정보);
  await delay();

  document.getElementById('check_num7').innerHTML = option_출하정보_cnt;
}

async function 공정대기() {
  count(BSA재제조, { 소재지: '공정대기', 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } });
  await delay();

  document.getElementById('check_num8').innerHTML = BSA재제조_cnt;
}

async function 품질대기() {
  count(BSA재제조, { 소재지: '품질대기', 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } });
  await delay();

  document.getElementById('check_num9').innerHTML = BSA재제조_cnt;

  await 출하대기목록();
  await 대기목록(선택대기공정);
}

//공정에 해당하는 대기 배터리팩 기본정보 리스트 표출
async function 대기목록(공정) {
  var 대기_tabledata_BSA = [];
  선택대기공정 = 공정;

  document.getElementById('대기라벨').innerHTML = 선택대기공정 + ' 대기 목록';

  if (공정 != '공정대기' && 공정 != '품질대기') {
    switch (공정) {
      case '세척':
        findOne_BSA재제조(BSA재제조, {
          공정단계: { $ne: '출하' },
          입고: { $ne: '' },
          세척: { $eq: '' },
          기초검사: { $eq: '' },
          분해조립: { $eq: '' },
          성능검사: { $eq: '' },
          EOL: { $eq: '' },
          출하검사: { $eq: '' },
          소재지: { $nin: ['공정대기', '품질대기', '구장'] },
          완전분해: { $eq: '' },
          폐기: { $eq: '' },
          출하: { $eq: '' },
          구분: { $nin: ['일반기타', '보증기타'] },
        });
        await delay();

        if (BSA재제조_v == null) {
          대기_tabledata_BSA = [];
        } else {
          find_BSA재제조(BSA재제조, {
            공정단계: { $ne: '출하' },
            입고: { $ne: '' },
            세척: { $eq: '' },
            기초검사: { $eq: '' },
            분해조립: { $eq: '' },
            성능검사: { $eq: '' },
            EOL: { $eq: '' },
            출하검사: { $eq: '' },
            소재지: { $nin: ['공정대기', '품질대기', '구장'] },
            완전분해: { $eq: '' },
            폐기: { $eq: '' },
            출하: { $eq: '' },
            구분: { $nin: ['일반기타', '보증기타'] },
          });
          await delay();

          대기_tabledata_BSA = BSA재제조_v;
        }
        break;

      case '기초검사':
        findOne_BSA재제조(BSA재제조, {
          공정단계: { $ne: '출하' },
          세척: { $ne: '' },
          기초검사: { $eq: '' },
          분해조립: { $eq: '' },
          성능검사: { $eq: '' },
          EOL: { $eq: '' },
          출하검사: { $eq: '' },
          소재지: { $nin: ['공정대기', '품질대기', '구장'] },
          완전분해: { $eq: '' },
          폐기: { $eq: '' },
          출하: { $eq: '' },
          구분: { $nin: ['일반기타', '보증기타'] },
        });
        await delay();

        if (BSA재제조_v == null) {
          대기_tabledata_BSA = [];
        } else {
          find_BSA재제조(BSA재제조, {
            공정단계: { $ne: '출하' },
            세척: { $ne: '' },
            기초검사: { $eq: '' },
            분해조립: { $eq: '' },
            성능검사: { $eq: '' },
            EOL: { $eq: '' },
            출하검사: { $eq: '' },
            소재지: { $nin: ['공정대기', '품질대기', '구장'] },
            완전분해: { $eq: '' },
            폐기: { $eq: '' },
            출하: { $eq: '' },
            구분: { $nin: ['일반기타', '보증기타'] },
          });
          await delay();

          대기_tabledata_BSA = BSA재제조_v;
        }
        break;

      case '분해조립':
        findOne_BSA재제조(BSA재제조, {
          공정단계: { $ne: '출하' },
          기초검사: { $ne: '' },
          분해조립: { $eq: '' },
          성능검사: { $eq: '' },
          EOL: { $eq: '' },
          출하검사: { $eq: '' },
          소재지: { $nin: ['공정대기', '품질대기', '구장'] },
          완전분해: { $eq: '' },
          폐기: { $eq: '' },
          출하: { $eq: '' },
          구분: { $nin: ['일반기타', '보증기타'] },
        });
        await delay();

        if (BSA재제조_v == null) {
          대기_tabledata_BSA = [];
        } else {
          find_BSA재제조(BSA재제조, {
            공정단계: { $ne: '출하' },
            기초검사: { $ne: '' },
            분해조립: { $eq: '' },
            성능검사: { $eq: '' },
            EOL: { $eq: '' },
            출하검사: { $eq: '' },
            소재지: { $nin: ['공정대기', '품질대기', '구장'] },
            완전분해: { $eq: '' },
            폐기: { $eq: '' },
            출하: { $eq: '' },
            구분: { $nin: ['일반기타', '보증기타'] },
          });
          await delay();

          대기_tabledata_BSA = BSA재제조_v;
        }
        break;

      case '성능검사':
        findOne_BSA재제조(BSA재제조, {
          공정단계: { $ne: '출하' },
          분해조립: { $ne: '' },
          성능검사: { $eq: '' },
          EOL: { $eq: '' },
          출하검사: { $eq: '' },
          소재지: { $nin: ['공정대기', '품질대기', '구장'] },
          완전분해: { $eq: '' },
          폐기: { $eq: '' },
          출하: { $eq: '' },
          구분: { $nin: ['일반기타', '보증기타'] },
        });
        await delay();

        if (BSA재제조_v == null) {
          대기_tabledata_BSA = [];
        } else {
          find_BSA재제조(BSA재제조, { 공정단계: { $ne: '출하' }, 분해조립: { $ne: '' }, 성능검사: { $eq: '' }, EOL: { $eq: '' }, 소재지: { $nin: ['공정대기', '품질대기', '구장'] }, 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 출하: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } });
          await delay();

          대기_tabledata_BSA = BSA재제조_v;
        }
        break;

      case 'EOL':
        findOne_BSA재제조(BSA재제조, { 공정단계: { $ne: '출하' }, 성능검사: { $ne: '' }, EOL: { $eq: '' }, 출하검사: { $eq: '' }, 소재지: { $nin: ['공정대기', '품질대기', '구장'] }, 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 출하: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } });
        await delay();

        if (BSA재제조_v == null) {
          대기_tabledata_BSA = [];
        } else {
          find_BSA재제조(BSA재제조, { 공정단계: { $ne: '출하' }, 성능검사: { $ne: '' }, EOL: { $eq: '' }, 출하검사: { $eq: '' }, 소재지: { $nin: ['공정대기', '품질대기', '구장'] }, 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 출하: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } });
          await delay();

          대기_tabledata_BSA = BSA재제조_v;
        }
        break;
    }
  } else if (공정 == '공정대기') {
    findOne_BSA재제조(BSA재제조, { 소재지: '공정대기' });
    await delay();

    if (BSA재제조_v == null) {
      대기_tabledata_BSA = [];
    } else {
      find_BSA재제조(BSA재제조, { 소재지: '공정대기', 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } });
      await delay();

      대기_tabledata_BSA = BSA재제조_v;
    }
  } else if (공정 == '품질대기') {
    findOne_BSA재제조(BSA재제조, { 소재지: '품질대기' });
    await delay();

    if (BSA재제조_v == null) {
      대기_tabledata_BSA = [];
    } else {
      find_BSA재제조(BSA재제조, { 소재지: '품질대기', 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } });
      await delay();

      대기_tabledata_BSA = BSA재제조_v;
    }
  }

  BSA대기수량_table = new Tabulator('#grid_대기', {
    layout: 'resizableColumnFit',
    data: 대기_tabledata_BSA,
    height: '300px',

    columns: [
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
    ],
  });
}

async function 출하대기목록() {
  var 출하대기_tabledata_BSA = [];

  findOne_BSA재제조(BSA재제조, { $or: [{ EOL: { $ne: '' } }, { 출하검사: { $ne: '' } }], 소재지: { $nin: ['공정대기', '품질대기', '구장'] }, 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 출하: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } });
  await delay();

  if (BSA재제조_v == null) return;

  find_BSA재제조(BSA재제조, { $or: [{ EOL: { $ne: '' } }, { 출하검사: { $ne: '' } }], 소재지: { $nin: ['공정대기', '품질대기', '구장'] }, 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 출하: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } });
  await delay();

  출하대기_tabledata_BSA = BSA재제조_v;

  BSA출하수량_table = new Tabulator('#grid_출하대기', {
    layout: 'resizableColumnFit',
    data: 출하대기_tabledata_BSA,
    height: '700px',

    columns: [
      { title: '출하예약', field: '출하예약', sorter: 'string', width: '180' },
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
    ],
    rowFormatter: function (row) {
      if (row.getData().출하예약 === '예약') {
        const children = row.getElement().childNodes;
        children.forEach((child) => {
          child.style.backgroundColor = 'pink';
        });
      }
    },
  });

  BSA출하수량_table.on('rowClick', async function (e, row) {
    console.log('selected 관리번호: ', row.getData().관리번호);
    출하대기_BSA_관리번호 = row.getData().관리번호;

    document.getElementById('출하예약_관리번호').innerHTML = '출하 예약 관리번호: ' + 출하대기_BSA_관리번호;
  });
}

function BSA대기수량_updateFilter() {
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
    BSA출하수량_table.setFilter(filter, typeVal, valueEl.value.trim());
  }
}

async function 출하예약() {
  if (출하대기_BSA_관리번호 == '') {
    alert('출하 예약할 BSA를 선택하세요');
    return;
  }

  var doc = {
    관리번호: 출하대기_BSA_관리번호,
    출하예약: '예약',
  };

  update(BSA재제조, doc);
  await delay();

  console.log(update_count);
  console.log(insert_count);

  if (update_count > 0) {
    alert('업데이트 되었습니다');
  }

  if (insert_count > 0) {
    alert('저장 되었습니다');
  }

  대기수량_현황_조회();
}

async function 출하예약취소() {
  if (출하대기_BSA_관리번호 == '') {
    alert('출하 예약 취소할 BSA를 선택하세요');
    return;
  }

  var doc = {
    관리번호: 출하대기_BSA_관리번호,
    출하예약: '',
  };

  update(BSA재제조, doc);
  await delay();

  console.log(update_count);
  console.log(insert_count);

  if (update_count > 0) {
    alert('업데이트 되었습니다');
  }

  if (insert_count > 0) {
    alert('저장 되었습니다');
  }

  대기수량_현황_조회();
}

function export_출하대기() {
  var sheets = {
    출하대기: true,
  };
  BSA출하수량_table.download('xlsx', 'RHMS_출하대기.xlsx', { sheets: sheets });
}
