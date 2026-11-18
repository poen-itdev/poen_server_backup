var dashboard_chart;
var 날짜지정조회 = false;
var today_begin;
var today_end;
var 입고cnt = 0;
var 세척cnt = 0;
var 기초검사cnt = 0;
var 분해조립cnt = 0;
var 성능검사cnt = 0;
var EOLcnt = 0;
var 출하검사cnt = 0;
var 출하cnt = 0;
var wait_start = false;
var dashboardTimer;

async function 대시보드_시작() {
  await sleep(100);
  if (document.getElementById('입고') == undefined) {
    await sleep(1);
    return;
  }

  if (worker == '') return;
  flag_대시보드 = false;

  //각 공정 클릭시 당일 작업된 배터리팩 기본정보를 표로 출력
  document.getElementById('입고').addEventListener('click', function () {
    dash_입고_당일_get(today_begin, today_end);
  });
  document.getElementById('세척').addEventListener('click', function () {
    dash_세척_당일_get(today_begin, today_end);
  });
  document.getElementById('기초').addEventListener('click', function () {
    dash_기초검사_당일_get(today_begin, today_end);
  });
  document.getElementById('분해').addEventListener('click', function () {
    dash_분해조립_당일_get(today_begin, today_end);
  });
  document.getElementById('성능').addEventListener('click', function () {
    dash_성능검사_당일_get(today_begin, today_end);
  });
  document.getElementById('EOL').addEventListener('click', function () {
    dash_EOL_당일_get(today_begin, today_end);
  });
  document.getElementById('출하검사').addEventListener('click', function () {
    dash_출하검사_당일_get(today_begin, today_end);
  });
  document.getElementById('출하').addEventListener('click', function () {
    dash_출하_당일_get(today_begin, today_end);
  });

  //30초 마다 총합계 조회
  if (dashboardTimer != undefined) clearInterval(dashboardTimer);
  dashboardTimer = setInterval(function () {
    총합계_조회();
  }, 1000 * 30);

  총합계_조회();
}

function dashboard_조회() {
  today_begin = document.getElementById('_검색일_from').value + 'T00:00:000Z';
  today_end = document.getElementById('_검색일_to').value + 'T24:00:000Z';
  if (wait_start == true) return; //조회 버튼을 빠르게 여러번 누르는것 방지
  wait_start = true;

  setTimeout(function () {
    wait_start = false;
  }, 5000);

  조회_list(today_begin, today_end);
  날짜지정조회 = true;
}

function 총합계_조회() {
  //한국 시간을 기준으로 시작 날짜와 끝 날짜를 구함
  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString();
  today_begin = now.slice(0, 10) + 'T00:00:000Z';
  today_end = now.slice(0, 10) + 'T24:00:000Z';

  if (날짜지정조회 == true) {
    today_begin = document.getElementById('_검색일_from').value + 'T00:00:000Z';
    today_end = document.getElementById('_검색일_to').value + 'T24:00:000Z';
  }
  조회_list(today_begin, today_end);
}

async function 조회_list(today_begin, today_end) {
  console.log(today_begin, today_end);

  //각 공정별 전체 완료 누적 및 당일 완료 누적
  await dash_입고(today_begin, today_end, '입고');
  await dash_입고_당일(today_begin, today_end, '입고당일');
  await dash_세척(today_begin, today_end, '세척');
  await dash_세척_당일(today_begin, today_end, '세척당일');
  await dash_기초검사(today_begin, today_end, '기초검사');
  await dash_기초검사_당일(today_begin, today_end, '기초검사당일');
  await dash_분해조립(today_begin, today_end, '분해조립');
  await dash_분해조립_당일(today_begin, today_end, '분해조립당일');
  await dash_성능검사(today_begin, today_end, '성능검사');
  await dash_성능검사_당일(today_begin, today_end, '성능검사당일');
  await dash_EOL(today_begin, today_end, 'EOL');
  await dash_EOL_당일(today_begin, today_end, 'EOL당일');
  await dash_출하검사(today_begin, today_end, '출하정보');
  await dash_출하검사_당일(today_begin, today_end, '출하정보당일');
  await dash_출하(today_begin, today_end, '출하');
  await dash_출하_당일(today_begin, today_end, '출하당일');
}

async function dash_입고(today_begin, today_end) {
  //외부 제공용 계정 처리
  if (level == 'kia_일반') {
    count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 입고: { $exists: true, $ne: 'none', $ne: '' }, 구분: '일반', 완전분해: '', 폐기: '' }, '입고');
    await delay();
  } else if (level == 'hyundai_일반') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        입고: { $exists: true, $ne: 'none', $ne: '' },
        구분: '일반',
        완전분해: '',
        폐기: '',
      },
      '입고'
    );
    await delay();
  } else if (level == 'kia_보증') {
    count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 입고: { $exists: true, $ne: 'none', $ne: '' }, 구분: '보증', 완전분해: '', 폐기: '' }, '입고');
    await delay();
  } else if (level == 'hyundai_보증') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        입고: { $exists: true, $ne: 'none', $ne: '' },
        구분: '보증',
        완전분해: '',
        폐기: '',
      },
      '입고'
    );
    await delay();
  } else {
    count(BSA재제조, { 입고: { $exists: true, $ne: 'none', $ne: '' } }, '입고');
    await delay();
  }
  입고cnt = option_입고_cnt;
}

async function dash_입고_당일(today_begin, today_end) {
  //외부 제공용 계정 처리
  if (level == 'kia_일반') {
    count(
      BSA재제조,
      { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 입고: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end }, 구분: '일반', 완전분해: '', 폐기: '' },
      '입고당일'
    );
    await delay();
  } else if (level == 'hyundai_일반') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        입고: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
        구분: '일반',
        완전분해: '',
        폐기: '',
      },
      '입고당일'
    );
  } else if (level == 'kia_보증') {
    count(
      BSA재제조,
      { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 입고: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end }, 구분: '보증', 완전분해: '', 폐기: '' },
      '입고당일'
    );
    await delay();
  } else if (level == 'hyundai_보증') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        입고: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
        구분: '보증',
        완전분해: '',
        폐기: '',
      },
      '입고당일'
    );
    await delay();
  } else {
    count(BSA재제조, { 입고: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end } }, '입고당일');
    await delay();
  }
  입고당일 = option_입고당일_cnt;

  document.getElementById('num1').innerHTML = 입고cnt + ' (' + 입고당일 + ')';
}

async function dash_입고_당일_get(today_begin, today_end) {
  if (입고당일 == 0) return;
  if (level == 'kia_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] },
      입고: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '일반',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'hyundai_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      입고: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '일반',
      완전분해: '',
      폐기: '',
    });
  } else if (level == 'kia_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] },
      입고: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '보증',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'hyundai_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      입고: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '보증',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else {
    find_BSA재제조(BSA재제조, { 입고: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end } });
    await delay();
  }

  당일목록('입고', BSA재제조_v);
}

async function dash_세척(today_begin, today_end) {
  if (level == 'kia_일반') {
    count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 세척: { $exists: true, $ne: 'none', $ne: '' }, 구분: '일반', 완전분해: '', 폐기: '' }, '세척');
    await delay();
  } else if (level == 'hyundai_일반') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        세척: { $exists: true, $ne: 'none', $ne: '' },
        구분: '일반',
        완전분해: '',
        폐기: '',
      },
      '세척'
    );
    await delay();
  } else if (level == 'kia_보증') {
    count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 세척: { $exists: true, $ne: 'none', $ne: '' }, 구분: '보증', 완전분해: '', 폐기: '' }, '세척');
    await delay();
  } else if (level == 'hyundai_보증') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        세척: { $exists: true, $ne: 'none', $ne: '' },
        구분: '보증',
        완전분해: '',
        폐기: '',
      },
      '세척'
    );
    await delay();
  } else {
    count(BSA재제조, { 세척: { $exists: true, $ne: 'none', $ne: '' } }, '세척');
    await delay();
  }

  세척cnt = option_세척_cnt;
}

var 세척당일 = 0;

async function dash_세척_당일(today_begin, today_end) {
  if (level == 'kia_일반') {
    count(
      BSA재제조,
      { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 세척: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end }, 구분: '일반', 완전분해: '', 폐기: '' },
      '세척당일'
    );
    await delay();
  } else if (level == 'hyundai_일반') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        세척: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
        구분: '일반',
        완전분해: '',
        폐기: '',
      },
      '세척당일'
    );
    await delay();
  } else if (level == 'kia_보증') {
    count(
      BSA재제조,
      { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 세척: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end }, 구분: '보증', 완전분해: '', 폐기: '' },
      '세척당일'
    );
    await delay();
  } else if (level == 'hyundai_보증') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        세척: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
        구분: '보증',
        완전분해: '',
        폐기: '',
      },
      '세척당일'
    );
    await delay();
  } else {
    count(BSA재제조, { 세척: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end } }, '세척당일');
    await delay();
  }

  세척당일 = option_세척당일_cnt;

  document.getElementById('num2').innerHTML = 세척cnt + ' (' + 세척당일 + ')';
}

async function dash_세척_당일_get(today_begin, today_end) {
  if (세척당일 == 0) return;
  if (level == 'kia_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] },
      세척: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '일반',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'hyundai_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      세척: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '일반',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'kia_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] },
      세척: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '보증',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'hyundai_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      세척: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '보증',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else {
    find_BSA재제조(BSA재제조, { 세척: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end } });
    await delay();
  }

  당일목록('세척', BSA재제조_v);
}

var 기초검사당일 = 0;

async function dash_기초검사(today_begin, today_end) {
  if (level == 'kia_일반') {
    count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 기초검사: { $exists: true, $ne: 'none', $ne: '' }, 구분: '일반', 완전분해: '', 폐기: '' }, '기초검사');
    await delay();
  } else if (level == 'hyundai_일반') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        기초검사: { $exists: true, $ne: 'none', $ne: '' },
        구분: '일반',
        완전분해: '',
        폐기: '',
      },
      '기초검사'
    );
    await delay();
  } else if (level == 'kia_보증') {
    count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 기초검사: { $exists: true, $ne: 'none', $ne: '' }, 구분: '보증', 완전분해: '', 폐기: '' }, '기초검사');
    await delay();
  } else if (level == 'hyundai_보증') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        기초검사: { $exists: true, $ne: 'none', $ne: '' },
        구분: '보증',
        완전분해: '',
        폐기: '',
      },
      '기초검사'
    );
    await delay();
  } else {
    count(BSA재제조, { 기초검사: { $exists: true, $ne: 'none', $ne: '' } }, '기초검사');
    await delay();
  }
  기초검사cnt = option_기초검사_cnt;
}

async function dash_기초검사_당일(today_begin, today_end) {
  if (level == 'kia_일반') {
    count(
      BSA재제조,
      { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 기초검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end }, 구분: '일반', 완전분해: '', 폐기: '' },
      '기초검사당일'
    );
    await delay();
  } else if (level == 'hyundai_일반') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        기초검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
        구분: '일반',
        완전분해: '',
        폐기: '',
      },
      '기초검사당일'
    );
    await delay();
  } else if (level == 'kia_보증') {
    count(
      BSA재제조,
      { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 기초검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end }, 구분: '보증', 완전분해: '', 폐기: '' },
      '기초검사당일'
    );
    await delay();
  } else if (level == 'hyundai_보증') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        기초검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
        구분: '보증',
        완전분해: '',
        폐기: '',
      },
      '기초검사당일'
    );
    await delay();
  } else {
    count(BSA재제조, { 기초검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end } }, '기초검사당일');
    await delay();
  }
  기초검사당일 = option_기초검사당일_cnt;

  document.getElementById('num3').innerHTML = 기초검사cnt + ' (' + 기초검사당일 + ')';
}

async function dash_기초검사_당일_get(today_begin, today_end) {
  if (기초검사당일 == 0) return;
  if (level == 'kia_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] },
      기초검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '일반',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'hyundai_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      기초검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '일반',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'kia_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] },
      기초검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '보증',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'hyundai_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      기초검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '보증',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else {
    find_BSA재제조(BSA재제조, { 기초검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end } });
    await delay();
  }

  당일목록('기초검사', BSA재제조_v);
}

var 분해조립당일 = 0;

async function dash_분해조립(today_begin, today_end) {
  if (level == 'kia_일반') {
    count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 분해조립: { $exists: true, $ne: 'none', $ne: '' }, 구분: '일반', 완전분해: '', 폐기: '' }, '분해조립');
    await delay();
  } else if (level == 'hyundai_일반') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        분해조립: { $exists: true, $ne: 'none', $ne: '' },
        구분: '일반',
        완전분해: '',
        폐기: '',
      },
      '분해조립'
    );
    await delay();
  } else if (level == 'kia_보증') {
    count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 분해조립: { $exists: true, $ne: 'none', $ne: '' }, 구분: '보증', 완전분해: '', 폐기: '' }, '분해조립');
    await delay();
  } else if (level == 'hyundai_보증') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        분해조립: { $exists: true, $ne: 'none', $ne: '' },
        구분: '보증',
        완전분해: '',
        폐기: '',
      },
      '분해조립'
    );
    await delay();
  } else {
    count(BSA재제조, { 분해조립: { $exists: true, $ne: 'none', $ne: '' } }, '분해조립');
    await delay();
  }

  분해조립cnt = option_분해조립_cnt;
}

async function dash_분해조립_당일(today_begin, today_end) {
  if (level == 'kia_일반') {
    count(
      BSA재제조,
      { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 분해조립: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end }, 구분: '일반', 완전분해: '', 폐기: '' },
      '분해조립당일'
    );
    await delay();
  } else if (level == 'hyundai_일반') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        분해조립: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
        구분: '일반',
        완전분해: '',
        폐기: '',
      },
      '분해조립당일'
    );
    await delay();
  } else if (level == 'kia_보증') {
    count(
      BSA재제조,
      { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 분해조립: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end }, 구분: '보증', 완전분해: '', 폐기: '' },
      '분해조립당일'
    );
    await delay();
  } else if (level == 'hyundai_보증') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        분해조립: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
        구분: '보증',
        완전분해: '',
        폐기: '',
      },
      '분해조립당일'
    );
    await delay();
  } else {
    count(BSA재제조, { 분해조립: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end } }, '분해조립당일');
    await delay();
  }

  분해조립당일 = option_분해조립당일_cnt;

  document.getElementById('num4').innerHTML = 분해조립cnt + ' (' + 분해조립당일 + ')';
}

async function dash_분해조립_당일_get(today_begin, today_end) {
  if (분해조립당일 == 0) return;
  if (level == 'kia_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] },
      분해조립: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '일반',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'hyundai_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      분해조립: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '일반',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'kia_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] },
      분해조립: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '보증',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'hyundai_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      분해조립: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '보증',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else {
    find_BSA재제조(BSA재제조, { 분해조립: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end } });
    await delay();
  }

  당일목록('분해조립', BSA재제조_v);
}

var 성능검사당일 = 0;
async function dash_성능검사(today_begin, today_end) {
  if (level == 'kia_일반') {
    count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 성능검사: { $exists: true, $ne: 'none', $ne: '' }, 구분: '일반', 완전분해: '', 폐기: '' }, '성능검사');
    await delay();
  } else if (level == 'hyundai_일반') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        성능검사: { $exists: true, $ne: 'none', $ne: '' },
        구분: '일반',
        완전분해: '',
        폐기: '',
      },
      '성능검사'
    );
    await delay();
  } else if (level == 'kia_보증') {
    count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 성능검사: { $exists: true, $ne: 'none', $ne: '' }, 구분: '일반', 구분: '보증', 완전분해: '', 폐기: '' }, '성능검사');
    await delay();
  } else if (level == 'hyundai_보증') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        성능검사: { $exists: true, $ne: 'none', $ne: '' },
        구분: '일반',
        구분: '보증',
        완전분해: '',
        폐기: '',
      },
      '성능검사'
    );
    await delay();
  } else {
    count(BSA재제조, { 성능검사: { $exists: true, $ne: 'none', $ne: '' } }, '성능검사');
    await delay();
  }

  성능검사cnt = option_성능검사_cnt;
}

async function dash_성능검사_당일(today_begin, today_end) {
  if (level == 'kia_일반') {
    count(
      BSA재제조,
      { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 성능검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end }, 구분: '일반', 완전분해: '', 폐기: '' },
      '성능검사당일'
    );
    await delay();
  } else if (level == 'hyundai_일반') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        성능검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
        구분: '일반',
        완전분해: '',
        폐기: '',
      },
      '성능검사당일'
    );
    await delay();
  } else if (level == 'kia_보증') {
    count(
      BSA재제조,
      { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 성능검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end }, 구분: '보증', 완전분해: '', 폐기: '' },
      '성능검사당일'
    );
    await delay();
  } else if (level == 'hyundai_보증') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        성능검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
        구분: '보증',
        완전분해: '',
        폐기: '',
      },
      '성능검사당일'
    );
    await delay();
  } else {
    count(BSA재제조, { 성능검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end } }, '성능검사당일');
    await delay();
  }

  성능검사당일 = option_성능검사당일_cnt;

  document.getElementById('num5').innerHTML = 성능검사cnt + ' (' + 성능검사당일 + ')';
}

async function dash_성능검사_당일_get(today_begin, today_end) {
  if (성능검사당일 == 0) return;
  if (level == 'kia_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] },
      성능검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '일반',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'hyundai_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      성능검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '일반',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'kia_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] },
      성능검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '보증',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'hyundai_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      성능검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '보증',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else {
    find_BSA재제조(BSA재제조, { 성능검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end } });
    await delay();
  }

  당일목록('성능검사', BSA재제조_v);
}

var EOL당일 = 0;

async function dash_EOL(today_begin, today_end) {
  if (level == 'kia_일반') {
    count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, EOL: { $exists: true, $ne: 'none', $ne: '' }, 구분: '일반', 완전분해: '', 폐기: '' }, 'EOL');
    await delay();
  } else if (level == 'hyundai_일반') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        EOL: { $exists: true, $ne: 'none', $ne: '' },
        구분: '일반',
        완전분해: '',
        폐기: '',
      },
      'EOL'
    );
    await delay();
  } else if (level == 'kia_보증') {
    count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, EOL: { $exists: true, $ne: 'none', $ne: '' }, 구분: '일반', 구분: '보증', 완전분해: '', 폐기: '' }, 'EOL');
    await delay();
  } else if (level == 'hyundai_보증') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        EOL: { $exists: true, $ne: 'none', $ne: '' },
        구분: '일반',
        구분: '보증',
        완전분해: '',
        폐기: '',
      },
      'EOL'
    );
    await delay();
  } else {
    count(BSA재제조, { EOL: { $exists: true, $ne: 'none', $ne: '' } }, 'EOL');
    await delay();
  }

  EOLcnt = option_EOL_cnt;
}

async function dash_EOL_당일(today_begin, today_end) {
  if (level == 'kia_일반') {
    count(
      BSA재제조,
      { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, EOL: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end }, 구분: '일반', 완전분해: '', 폐기: '' },
      'EOL당일'
    );
    await delay();
  } else if (level == 'hyundai_일반') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        EOL: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
        구분: '일반',
        완전분해: '',
        폐기: '',
      },
      'EOL당일'
    );
    await delay();
  } else if (level == 'kia_보증') {
    count(
      BSA재제조,
      { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, EOL: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end }, 구분: '보증', 완전분해: '', 폐기: '' },
      'EOL당일'
    );
    await delay();
  } else if (level == 'hyundai_보증') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        EOL: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
        구분: '보증',
        완전분해: '',
        폐기: '',
      },
      'EOL당일'
    );
    await delay();
  } else {
    count(BSA재제조, { EOL: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end } }, 'EOL당일');
    await delay();
  }

  EOL당일 = option_EOL당일_cnt;

  document.getElementById('num6').innerHTML = EOLcnt + ' (' + EOL당일 + ')';
}

async function dash_EOL_당일_get(today_begin, today_end) {
  if (EOL당일 == 0) return;
  if (level == 'kia_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] },
      EOL: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '일반',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'hyundai_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      EOL: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '일반',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'kia_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] },
      EOL: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '보증',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'hyundai_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      EOL: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '보증',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else {
    find_BSA재제조(BSA재제조, { EOL: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end } });
    await delay();
  }

  당일목록('EOL', BSA재제조_v);
}

var 출하검사당일 = 0;

async function dash_출하검사(today_begin, today_end) {
  if (level == 'kia_일반') {
    count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 출하검사: { $exists: true, $ne: 'none', $ne: '' }, 구분: '일반', 완전분해: '', 폐기: '' }, '출하정보');
    await delay();
  } else if (level == 'hyundai_일반') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        출하검사: { $exists: true, $ne: 'none', $ne: '' },
        구분: '일반',
        완전분해: '',
        폐기: '',
      },
      '출하정보'
    );
    await delay();
  } else if (level == 'kia_보증') {
    count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 출하검사: { $exists: true, $ne: 'none', $ne: '' }, 구분: '보증', 완전분해: '', 폐기: '' }, '출하정보');
    await delay();
  } else if (level == 'hyundai_보증') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        출하검사: { $exists: true, $ne: 'none', $ne: '' },
        구분: '보증',
        완전분해: '',
        폐기: '',
      },
      '출하정보'
    );
    await delay();
  } else {
    count(BSA재제조, { 출하검사: { $exists: true, $ne: 'none', $ne: '' } }, '출하정보');
    await delay();
  }

  출하검사cnt = option_출하정보_cnt;
}

async function dash_출하검사_당일(today_begin, today_end) {
  if (level == 'kia_일반') {
    count(
      BSA재제조,
      { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 출하검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end }, 구분: '일반', 완전분해: '', 폐기: '' },
      '출하정보당일'
    );
    await delay();
  } else if (level == 'hyundai_일반') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        출하검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
        구분: '일반',
        완전분해: '',
        폐기: '',
      },
      '출하정보당일'
    );
    await delay();
  } else if (level == 'kia_보증') {
    count(
      BSA재제조,
      { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 출하검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end }, 구분: '보증', 완전분해: '', 폐기: '' },
      '출하정보당일'
    );
    await delay();
  } else if (level == 'hyundai_보증') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        출하검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
        구분: '보증',
        완전분해: '',
        폐기: '',
      },
      '출하정보당일'
    );
    await delay();
  } else {
    count(BSA재제조, { 출하검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end } }, '출하정보당일');
    await delay();
  }
  출하검사당일 = option_출하정보당일_cnt;

  document.getElementById('num7').innerHTML = 출하검사cnt + ' (' + 출하검사당일 + ')';
}

async function dash_출하검사_당일_get(today_begin, today_end) {
  if (출하검사당일 == 0) return;
  if (level == 'kia_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] },
      출하검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '일반',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'hyundai_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      출하검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '일반',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'kia_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] },
      출하검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '보증',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'hyundai_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      출하검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '보증',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else {
    find_BSA재제조(BSA재제조, { 출하검사: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end } });
    await delay();
  }

  당일목록('출하검사', BSA재제조_v);
}

var 출하당일 = 0;

async function dash_출하(today_begin, today_end) {
  if (level == 'kia_일반') {
    count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 출하: { $exists: true, $ne: 'none', $ne: '' }, 구분: '일반', 완전분해: '', 폐기: '' }, '출하');
    await delay();
  } else if (level == 'hyundai_일반') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        출하: { $exists: true, $ne: 'none', $ne: '' },
        구분: '일반',
        완전분해: '',
        폐기: '',
      },
      '출하'
    );
    await delay();
  } else if (level == 'kia_보증') {
    count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 출하: { $exists: true, $ne: 'none', $ne: '' }, 구분: '보증', 완전분해: '', 폐기: '' }, '출하');
    await delay();
  } else if (level == 'hyundai_보증') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        출하: { $exists: true, $ne: 'none', $ne: '' },
        구분: '보증',
        완전분해: '',
        폐기: '',
      },
      '출하'
    );
    await delay();
  } else {
    count(BSA재제조, { 출하: { $exists: true, $ne: 'none', $ne: '' } }, '출하');
    await delay();
  }
  출하cnt = option_출하_cnt;
}

async function dash_출하_당일(today_begin, today_end) {
  if (level == 'kia_일반') {
    count(
      BSA재제조,
      { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 출하: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end }, 구분: '일반', 완전분해: '', 폐기: '' },
      '출하당일'
    );
    await delay();
  } else if (level == 'hyundai_일반') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        출하: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
        구분: '일반',
        완전분해: '',
        폐기: '',
      },
      '출하당일'
    );
    await delay();
  } else if (level == 'kia_보증') {
    count(
      BSA재제조,
      { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 출하: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end }, 구분: '보증', 완전분해: '', 폐기: '' },
      '출하당일'
    );
    await delay();
  } else if (level == 'hyundai_보증') {
    count(
      BSA재제조,
      {
        차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
        출하: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
        구분: '보증',
        완전분해: '',
        폐기: '',
      },
      '출하당일'
    );
    await delay();
  } else {
    count(BSA재제조, { 출하: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end } }, '출하당일');
    await delay();
  }
  출하당일 = option_출하당일_cnt;

  document.getElementById('num8').innerHTML = 출하cnt + ' (' + 출하당일 + ')';
}

async function dash_출하_당일_get(today_begin, today_end) {
  if (출하당일 == 0) return;
  if (level == 'kia_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] },
      출하: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '일반',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'hyundai_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      출하: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '일반',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'kia_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] },
      출하: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '보증',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else if (level == 'hyundai_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      출하: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end },
      구분: '보증',
      완전분해: '',
      폐기: '',
    });
    await delay();
  } else {
    find_BSA재제조(BSA재제조, { 출하: { $exists: true, $ne: 'none', $ne: '', $gte: today_begin, $lt: today_end } });
    await delay();
  }

  당일목록('출하', BSA재제조_v);
}

//공정 클릭시 해당 공정의 당일 완료 배터리팩 기본 정보 출력
async function 당일목록(공정, data) {
  var 공정_tabledata_BSA = data;
  선택공정 = 공정;

  document.getElementById('공정라벨').innerHTML = 선택공정 + ' 당일 목록';

  BSA대기수량_table = new Tabulator('#grid_공정', {
    layout: 'resizableColumnFit',
    data: 공정_tabledata_BSA,
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
      { title: '적재No', field: '적재No', sorter: 'string', visible: true, width: '180' },
      { title: '입고', field: '입고', sorter: 'string', visible: true, width: '180' },
      { title: '제조투입', field: '제조투입', sorter: 'string', visible: true, width: '180' },
      { title: '세척투입일', field: '세척투입일', sorter: 'string', width: '180' },
      { title: '세척', field: '세척', sorter: 'string', visible: true, width: '180' },
      { title: '기초검사투입일', field: '기초검사투입일', sorter: 'string', width: '180' },
      { title: '기초검사', field: '기초검사', sorter: 'string', visible: true, width: '180' },
      { title: '분해조립투입일', field: '분해조립투입일', sorter: 'string', width: '180' },
      { title: '분해조립', field: '분해조립', sorter: 'string', visible: true, width: '180' },
      { title: '성능검사투입일', field: '성능검사투입일', sorter: 'string', width: '180' },
      { title: '성능검사', field: '성능검사', sorter: 'string', visible: true, width: '180' },
      { title: 'EOL투입일', field: 'EOL투입일', sorter: 'string', width: '180' },
      { title: 'EOL', field: 'EOL', sorter: 'string', visible: true, width: '180' },
      { title: '출하', field: '출하', sorter: 'string', width: '180' },
      { title: '반품입고', field: '반품입고', sorter: 'string', width: '180' },
      { title: '재출하', field: '재출하', sorter: 'string', width: '180' },
      { title: '완전분해', field: '완전분해', sorter: 'string', width: '180' },
      { title: '폐기', field: '폐기', sorter: 'string', width: '180' },
    ],
  });

  //대기수량의 경우 더블 클릭시 기본정보입력 페이지로 이동하여 정보 수정 가능
  BSA대기수량_table.on('rowDblClick', async function (e, row) {
    console.log('selected 관리번호: ', row.getData().관리번호);
    관리번호 = row.getData().관리번호;

    pre_관리번호 = '';
    loadPage('base/item-details.html');
  });
}
