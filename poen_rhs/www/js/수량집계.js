//표에서 데이터 조회 필터 처리
function 신품_updateFilter() {
  var fieldEl = document.getElementById('new_filter-field');
  var typeEl = document.getElementById('new_filter-type');
  var valueEl = document.getElementById('new_filter-value');

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
    table_부품집계.setFilter(filter, typeVal, valueEl.value);
  }
}

async function 수량집계_시작() {
  if (worker == '') return;

  const grid_부품집계 = document.getElementById('grid_부품집계');
  if (typeof grid_부품집계 == 'undefined') {
    await sleep(DELAY);
    return;
  }

  flag_수량집계 = false;

  //Update filters on value change
  document.getElementById('new_filter-field').addEventListener('change', 신품_updateFilter);
  document.getElementById('new_filter-type').addEventListener('change', 신품_updateFilter);
  document.getElementById('new_filter-value').addEventListener('keyup', 신품_updateFilter);

  //Clear filters on "Clear Filters" button click
  document.getElementById('new_filter-clear').addEventListener('click', function () {
    var fieldEl = document.getElementById('new_filter-field');
    var typeEl = document.getElementById('new_filter-type');
    var valueEl = document.getElementById('new_filter-value');
    fieldEl.value = '';
    typeEl.value = '=';
    valueEl.value = '';

    table_부품집계.clearFilter();
  });

  수량집계_조회();
}

function 수량집계_year() {
  //year 누르면 해당 년의 기간 설정
  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString();
  var s_day = now.slice(0, 5) + '01-01';
  var e_day = now.slice(0, 5) + '12-31';

  document.getElementById('_검색일_from').value = s_day;
  document.getElementById('_검색일_to').value = e_day;
}

function 수량집계_month() {
  //month를 누르면 해달 월 기간 설정
  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString();
  var s_day = now.slice(0, 8) + '01';
  var e_day = now.slice(0, 10);

  document.getElementById('_검색일_from').value = s_day;
  document.getElementById('_검색일_to').value = e_day;
}

function 수량집계_기간조회() {
  var 집계_today_begin = document.getElementById('_검색일_from').value + 'T00:00:000Z';
  var 집계_today_end = document.getElementById('_검색일_to').value + 'T23:59:000Z';
  var 구분 = '';

  if (document.getElementById('_검색일_from').value == '') 집계_today_begin = '';
  if (document.getElementById('_검색일_to').value == '') 집계_today_end = '';

  if (document.getElementById('_일반').checked == true) 구분 = '일반';
  if (document.getElementById('_보증').checked == true) 구분 = '보증';
  if (document.getElementById('_all').checked == true) 구분 = 'all';

  console.log('수량집계 기간조회:', 집계_today_begin, 집계_today_end, 구분);
  수량집계_조회(집계_today_begin, 집계_today_end, 구분);
}

async function 수량집계_조회(집계_today_begin = '', 집계_today_end = '', 구분 = 'all') {
  var begin = 집계_today_begin;
  var end = 집계_today_end;

  await BSA_info(begin, end, 구분);
  await BMA_info(begin, end, 구분);
  await 자재재료_info(begin, end, 구분);
  await 부품_info(begin, end, 구분);

  alert('집계가 완료되었습니다.');
}

async function BSA_info(begin = '', end = '', 구분 = 'all') {
  var counts = [];
  var types_list = [];

  if (begin == '' || end == '') {
    //전체 조회
    if (구분 == 'all') {
      find_BSA재제조(BSA재제조, { 품번: { $exists: true } });
      await delay();
    } else {
      find_BSA재제조(BSA재제조, { 품번: { $exists: true }, 구분: { $eq: 구분 } });
      await delay();
    }
  } else {
    //부분 조회
    if (구분 == 'all') {
      find_BSA재제조(BSA재제조, { 품번: { $exists: true }, 입고: { $gte: begin, $lte: end } });
      await delay();
    } else {
      find_BSA재제조(BSA재제조, { 품번: { $exists: true }, 입고: { $gte: begin, $lte: end }, 구분: { $eq: 구분 } });
      await delay();
    }
  }

  if (BSA재제조_v == null) return;

  BSA재제조_v.forEach(function (info) {
    if (types_list.indexOf(info.품번) < 0) {
      //리스트에 없는 품번일 경우
      types_list.push(info.품번); //리스트에 품번 저장

      var count = {
        //카운트 초기화
        입고: 0,
        작업: 0,
        완료: 0,
        출고: 0,
      };

      switch (
        info.공정단계 //공정 단계 카운트
      ) {
        case '입고':
          count.입고++;
          break;

        case '제조완료':
          count.완료++;
          break;

        case '출하':
          count.출고++;
          break;

        case '세척':
        case '기초검사':
        case '분해조립':
        case '성능검사':
        case 'EOL':
        case '출하검사':
          count.작업++;
          break;

        default:
          console.log(info.공정단계);
          break;
      }

      counts.push(count);
    } else {
      //리스트에 있는 품번일 경우
      var no = types_list.indexOf(info.품번);

      switch (info.공정단계) {
        case '입고':
          counts[no].입고++;
          break;

        case '제조완료':
          counts[no].완료++;
          break;

        case '출하':
          counts[no].출고++;
          break;

        case '세척':
        case '기초검사':
        case '분해조립':
        case '성능검사':
        case 'EOL':
        case '출하검사':
          counts[no].작업++;
          break;

        default:
          console.log(info.공정단계);
          break;
      }
    }
  });

  //배터리팩 재고 표 만들기
  BSA재고(types_list, counts);
}

async function BMA_info(begin = '', end = '', 구분 = 'all') {
  var counts = [];
  var types_list = [];

  if (begin == '' || end == '') {
    //전체 조회
    if (구분 == 'all') {
      find_고품정보(고품정보, { 품명: 'BMA', 폐기여부: '폐기' });
      await delay();
    } else {
      find_고품정보(고품정보, { 품명: 'BMA', 폐기여부: '폐기', 구분: { $eq: 구분 } });
      await delay();
    }
  } else {
    //기간 조회
    if (구분 == 'all') {
      find_고품정보(고품정보, { 품명: 'BMA', 폐기여부: '폐기', 등록일: { $gte: begin, $lte: end } });
      await delay();
    } else {
      find_고품정보(고품정보, { 품명: 'BMA', 폐기여부: '폐기', 등록일: { $gte: begin, $lte: end }, 구분: { $eq: 구분 } });
      await delay();
    }
  }

  if (고품정보_v == null) return;

  고품정보_v.forEach(function (info) {
    if (types_list.indexOf(info.품번) < 0) {
      //리스트에 없는 품번일때
      types_list.push(info.품번);

      var count = {
        입고: 0,
        출고: 0,
      };

      if (info.등록일 != '' && info.등록일 != undefined) {
        count.입고++;
      }

      if (info.사용일 != '' && info.사용일 != undefined) {
        count.출고++;
      }

      counts.push(count);
    } else {
      //리스트에 있는 품번일때
      var no = types_list.indexOf(info.품번);

      if (info.등록일 != '' && info.등록일 != undefined) {
        counts[no].입고++;
      }

      if (info.사용일 != '' && info.사용일 != undefined) {
        counts[no].출고++;
      }
    }
  });

  //BMA재고팩 만들기
  BMA재고(types_list, counts);
}

async function 자재재료_info(begin = '', end = '', 구분 = 'all') {
  var counts = [];
  var types_list = [];
  var 품명_list = [];

  if (begin == '' || end == '') {
    if (구분 == 'all') {
      find_고품정보(고품정보, { 폐기여부: '자재' });
      await delay();
    } else {
      find_고품정보(고품정보, { 폐기여부: '자재', 구분: { $eq: 구분 } });
      await delay();
    }
  } else {
    if (구분 == 'all') {
      find_고품정보(고품정보, { 폐기여부: '자재', 등록일: { $gte: begin, $lte: end } });
      await delay();
    } else {
      find_고품정보(고품정보, { 폐기여부: '자재', 등록일: { $gte: begin, $lte: end }, 구분: { $eq: 구분 } });
      await delay();
    }
  }

  if (고품정보_v == null) return;
  고품정보_v.forEach(function (info) {
    if (types_list.indexOf(info.품번) < 0) {
      //리스트에 없는 품번일때
      types_list.push(info.품번);
      품명_list.push(info.품명);

      var count = {
        입고: 0,
        출고: 0,
      };

      if (info.등록일 != '' && info.등록일 != undefined) {
        count.입고++;
      }

      if (info.사용일 != '' && info.사용일 != undefined) {
        count.출고++;
      }

      counts.push(count);
    } else {
      //리스트에 있는 품번일때
      var no = types_list.indexOf(info.품번);

      if (info.등록일 != '' && info.등록일 != undefined) {
        counts[no].입고++;
      }

      if (info.사용일 != '' && info.사용일 != undefined) {
        counts[no].출고++;
      }
    }
  });

  자재재고(품명_list, types_list, counts);
}

async function 부품_info(begin = '', end = '', 구분 = 'all') {
  부품정보처리(begin, end); //클라이언트에서 과부하 가능성이 있어 서버에 처리하는 부분을 두고 결과를 요청한다.
  await delay();

  //표 그리는 부분
  부품재고(부품정보_result);
}

var table_BSA;
function BSA재고(품번_list, datas) {
  var BSA집계_datas = [];

  for (var i = 0; i < 품번_list.length; i++) {
    var _datas = {
      //표에 나타낼 정보 가공 부분
      품번: 품번_list[i],
      입고수: datas[i].입고,
      작업수: datas[i].작업,
      출고수: datas[i].출고,
      완료수: datas[i].완료,
    };
    BSA집계_datas.push(_datas);
  }

  //표 그리는 부분
  table_BSA = new Tabulator('#grid_BSA집계', {
    layout: 'resizableColumnFit',
    data: BSA집계_datas,
    height: '700px',

    columns: [
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: '입고수', field: '입고수', sorter: 'string', width: '180' },
      { title: '작업수', field: '작업수', sorter: 'string', width: '180' },
      { title: '출고수', field: '출고수', sorter: 'string', width: '180' },
      { title: '완료수', field: '완료수', sorter: 'string', width: '180' },
    ],
  });
}

var table_BMA;
function BMA재고(품번_list, datas) {
  var BMA집계_datas = [];

  for (var i = 0; i < 품번_list.length; i++) {
    var _datas = {
      //표에 나타낼 정보 가공
      품번: 품번_list[i],
      입고수: datas[i].입고,
      출고수: datas[i].출고,
      합계: datas[i].입고 - datas[i].출고,
    };
    BMA집계_datas.push(_datas);
  }

  if (BMA집계_datas.length == 0) {
    console.log('BMA재고 EMPTY');
    return;
  }

  //표 그리는 부분
  table_BMA = new Tabulator('#grid_BMA집계', {
    layout: 'resizableColumnFit',
    data: BMA집계_datas,
    height: '400px',

    columns: [
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: '입고수', field: '입고수', sorter: 'string', width: '180' },
      { title: '출고수', field: '출고수', sorter: 'string', width: '180' },
      { title: '합계', field: '합계', sorter: 'string', width: '180' },
    ],
  });
}

var table_자재재고;
function 자재재고(품명_list, 품번_list, datas) {
  var 자재집계_datas = [];

  for (var i = 0; i < 품번_list.length; i++) {
    var _datas = {
      // 정보 가공 부분
      품명: 품명_list[i],
      품번: 품번_list[i],
      입고수: datas[i].입고,
      출고수: datas[i].출고,
      합계: datas[i].입고 - datas[i].출고,
    };
    자재집계_datas.push(_datas);
  }

  if (자재집계_datas.length == 0) {
    console.log('자재재고 EMPTY');
    return;
  }

  //표 그리는 부분
  table_자재재고 = new Tabulator('#grid_자재집계', {
    layout: 'resizableColumnFit',
    data: 자재집계_datas,
    height: '400px',

    columns: [
      { title: '품명', field: '품명', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: '입고수', field: '입고수', sorter: 'string', width: '180' },
      { title: '출고수', field: '출고수', sorter: 'string', width: '180' },
      { title: '합계', field: '합계', sorter: 'string', width: '180' },
    ],
  });
}

var table_부품집계;
function 부품재고(부품정보) {
  console.log(부품정보);
  var 부품집계_datas = [];

  for (var j = 0; j < 부품정보.품번.length; j++) {
    var _datas = {
      //정보 가공 부분
      품번: 부품정보.품번[j],
      차종: 부품정보.차종[j],
      품명: 부품정보.품명[j],
      입고수: 부품정보.counts[j].입고,
      출고수: -1 * 부품정보.counts[j].출고, // -1 * : -부호 제거
      합계: 부품정보.counts[j].입고 + 부품정보.counts[j].출고,
    };

    부품집계_datas.push(_datas);
  }

  if (부품집계_datas.length == 0) {
    console.log('부품재고 EMPTY');
    return;
  }

  table_부품집계 = new Tabulator('#grid_부품집계', {
    layout: 'resizableColumnFit',
    data: 부품집계_datas,
    height: '700px',

    columns: [
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품명', field: '품명', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: '입고수', field: '입고수', sorter: 'string', width: '180' },
      { title: '출고수', field: '출고수', sorter: 'string', width: '180' },
      { title: '합계', field: '합계', sorter: 'string', width: '180' },
    ],
  });
}

//엑셀로 출력 부분
function 수량집계_export_to_excel() {
  var sheets = {
    BSA집계: true,
    BSA집계: table_BSA,
    BMA집계: table_BMA,
    자재집계: table_자재재고,
  };
  table_BSA.download('xlsx', 'RHMS_수량집계.xlsx', { sheets: sheets });
}

//엑셀로 출력 부분
function 부품집계_export_to_excel() {
  var sheets = {
    부품집계: true,
    부품집계: table_부품집계,
  };
  table_BSA.download('xlsx', 'RHMS_부품수량집계.xlsx', { sheets: sheets });
}
