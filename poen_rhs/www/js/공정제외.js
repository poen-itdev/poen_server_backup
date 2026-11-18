var BSA제외분류_table;
var 선택제외분류 = '폐기';

async function BSA_제외분류_시작() {
  flag_BSA_제외분류 = false;
  if (worker == '') return;
  await sleep(200);
  BSA_제외분류_조회();

  document.getElementById('일반기타').addEventListener('click', function () {
    제외목록('일반기타');
  });
  document.getElementById('보증기타').addEventListener('click', function () {
    제외목록('보증기타');
  });
  document.getElementById('완전분해').addEventListener('click', function () {
    제외목록('완전분해');
  });
  document.getElementById('폐기').addEventListener('click', function () {
    제외목록('폐기');
  });
}

//대시보드 집계에 제외된 배터리팩 조회
async function BSA_제외분류_조회() {
  await 일반기타();
  await 보증기타();
  await 완전분해();
  await 폐기();

  console.log('update');
}

async function 일반기타() {
  count(BSA재제조, { 구분: '일반기타' }); //입고  구분란이 일반기타인 것들(관리자 모드에서만 선택가능)
  await delay();

  document.getElementById('check_num1').innerHTML = BSA재제조_cnt;
}

async function 보증기타() {
  count(BSA재제조, { 구분: '보증기타' }); //입고 구분란이 보증기타인것들(관리자 모드에서만 선택 가능)
  await delay();

  document.getElementById('check_num2').innerHTML = BSA재제조_cnt;
}

async function 완전분해() {
  count(BSA재제조, { 완전분해: { $ne: '', $exists: true } });
  await delay();

  document.getElementById('check_num3').innerHTML = BSA재제조_cnt;
}

async function 폐기() {
  count(BSA재제조, { 폐기: { $ne: '', $exists: true } });
  await delay();

  document.getElementById('check_num4').innerHTML = BSA재제조_cnt;
}

//박스 클릭시 해당 제외 배터리팩 기본정보 리스트를 표출
async function 제외목록(제외) {
  var 제외_tabledata_BSA = [];
  선택제외분류 = 제외;

  document.getElementById('제외분류').innerHTML = 제외 + ' 목록';

  switch (제외) {
    case '일반기타':
      count(BSA재제조, { 구분: '일반기타' });
      await delay();

      if (BSA재제조_cnt == 0) {
        제외_tabledata_BSA = [];
      } else {
        find_BSA재제조(BSA재제조, { 구분: '일반기타' });
        await delay();
        제외_tabledata_BSA = JSON.parse(JSON.stringify(BSA재제조_v));
      }

      break;

    case '보증기타':
      count(BSA재제조, { 구분: '보증기타' });
      await delay();

      if (BSA재제조_cnt == 0) {
        제외_tabledata_BSA = [];
      } else {
        find_BSA재제조(BSA재제조, { 구분: '보증기타' });
        await delay();

        제외_tabledata_BSA = JSON.parse(JSON.stringify(BSA재제조_v));
      }

      break;

    case '완전분해':
      count(BSA재제조, { 완전분해: { $ne: '', $exists: true } });
      await delay();

      if (BSA재제조_cnt == 0) {
        제외_tabledata_BSA = [];
      } else {
        find_BSA재제조(BSA재제조, { 완전분해: { $ne: '', $exists: true } });
        await delay();

        제외_tabledata_BSA = JSON.parse(JSON.stringify(BSA재제조_v));
      }

      break;

    case '폐기':
      count(BSA재제조, { 폐기: { $ne: '', $exists: true } });
      await delay();

      if (BSA재제조_cnt == 0) {
        제외_tabledata_BSA = [];
      } else {
        find_BSA재제조(BSA재제조, { 폐기: { $ne: '', $exists: true } });
        await delay();

        제외_tabledata_BSA = JSON.parse(JSON.stringify(BSA재제조_v));
      }

      break;
  }

  BSA제외분류_table = new Tabulator('#grid_제외분류', {
    layout: 'resizableColumnFit',
    data: 제외_tabledata_BSA,
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
      { title: '폐기', field: '폐기', sorter: 'string', width: '180' },
    ],
  });
}
