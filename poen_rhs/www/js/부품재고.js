var 신품_QR = '';
var 고품_QR = '';
var table_신품재고;
var table_고품재고;
var tabledata_신품재고 = [];
var tabledata_고품재고 = [];

function 신품재고_updateFilter() {
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
    console.log('in setFilter:', filter, typeVal, valueEl.value);

    table_신품재고.setFilter(filter, typeVal, valueEl.value);
  }
}

function 고품재고_updateFilter() {
  var fieldEl = document.getElementById('old_filter-field');
  var typeEl = document.getElementById('old_filter-type');
  var valueEl = document.getElementById('old_filter-value');

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
    table_고품재고.setFilter(filter, typeVal, valueEl.value);
  }
}

async function 부품재고_시작() {
  flag_부품재고 = false;
  if (worker == '') return;
  var _loaded = document.getElementById('grid_고품재고');
  while (_loaded == undefined) {
    await sleep(DELAY);
  }

  //다음 3가지의 표를 화면에 표시
  await 신품재고();
  await 품번단가평균();
  await 고품재고();
}

//신품정보를 신품_QR에 맞추어 삭제
async function 신품정보_삭제() {
  deleteOne_신품정보(자재입출고, 신품_QR);
  await delay();

  if (delete_count > 0) {
    alert('삭제 되었습니다.');
    부품재고_시작();
  }

  document.getElementById('신품_QR').innerHTML = '';
}

async function 고품정보_삭제() {
  deleteOne_고품정보(고품정보, 고품_QR);
  await delay();

  if (delete_count > 0) {
    alert('삭제 되었습니다.');
    부품재고_시작();
  }

  document.getElementById('고품_QR').innerHTML = '';
}

//폐기품 표에서 하나를 선택후 출고 버튼을 누르면 출고 시간이 저장되고 표에서 표시
async function 폐기품출고() {
  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString();

  var doc = {
    QR: 고품_QR,
    폐기품출고: now.substr(0, 19),
  };

  update_고품정보(고품정보, doc);
  await delay();

  if (update_count > 0) {
    부품재고_시작();
  }
}

//선택된 부품 출고 취소
async function 폐기품출고취소() {
  var doc = {
    QR: 고품_QR,
    폐기품출고: '',
  };

  update_고품정보(고품정보, doc);
  await delay();

  if (update_count > 0) {
    부품재고_시작();
  }
}

async function 신품재고() {
  findOne_자재입출고(자재입출고, { QR: { $exists: true } });
  await delay();

  if (자재입출고_v != null) {
    find_자재입출고(자재입출고, { QR: { $exists: true } });
    await delay();

    tabledata_신품재고 = JSON.parse(JSON.stringify(자재입출고_v));
  } else {
    return;
  }

  table_신품재고 = new Tabulator('#grid_신품재고', {
    layout: 'resizableColumnFit',
    height: '700px',
    data: tabledata_신품재고,

    columns: [
      { title: 'QR', field: 'QR', sorter: 'string', width: '180' },
      { title: '날짜', field: '날짜', sorter: 'string', width: '180' },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품명', field: '품명', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: '단가', field: '단가', sorter: 'string', width: '180' },
      { title: '수량', field: '수량', sorter: 'string', width: '180' },
      { title: '위치', field: '위치', sorter: 'string', width: '180' },
      { title: 'LotNo', field: 'LotNo', sorter: 'string', width: '180' },
      { title: '비고', field: '비고', sorter: 'string', width: '180' },
      { title: '사용관리번호', field: '사용관리번호', sorter: 'string', width: '180' },
    ],
  });

  //하나를 선택시 표아래 QR이 표시
  table_신품재고.on('rowClick', async function (e, row) {
    console.log('selected QR: ', row.getData().QR);
    신품_QR = row.getData().QR;

    document.getElementById('신품_QR').innerHTML = 'QR: ' + 신품_QR;
  });

  //Update filters on value change
  document.getElementById('new_filter-field').addEventListener('change', 신품재고_updateFilter);
  document.getElementById('new_filter-type').addEventListener('change', 신품재고_updateFilter);
  document.getElementById('new_filter-value').addEventListener('keyup', 신품재고_updateFilter);

  //Clear filters on "Clear Filters" button click
  document.getElementById('new_filter-clear').addEventListener('click', function () {
    var fieldEl = document.getElementById('new_filter-field');
    var typeEl = document.getElementById('new_filter-type');
    var valueEl = document.getElementById('new_filter-value');
    fieldEl.value = '';
    typeEl.value = '=';
    valueEl.value = '';

    table_신품재고.clearFilter();
  });
}

//품번별 단가 평균값들을 구해서 표시해줌
async function 품번단가평균() {
  var 품번 = [];
  var count = [];
  var 수량 = [];
  var 단가합 = [];

  findOne_자재입출고(자재입출고, { QR: { $exists: true } });
  await delay();

  if (자재입출고_v != null) {
    find_자재입출고(자재입출고, { QR: { $exists: true } });
    await delay();

    var infos = 자재입출고_v;
    for (var i = 0; i < infos.length; i++) {
      var date_start = new Date('2023-12-1'); //회계쪽이랑 이날 부터 계산하기로 합의, 이전값은 구자료로 처리
      var date_date = new Date(infos.날짜); //기간 구간에것만 계산

      //if(date_date < date_start) return;

      if (품번.indexOf(infos[i].품번) < 0) {
        //새로운 품번일때
        품번.push(infos[i].품번); //새로운 품번값을 배열에 저장, 배열이 품번 리스트 저장용도임
        수량.push(Number(infos[i].수량.replace(',', '')));

        if (infos[i].단가 != undefined && infos[i].단가 != '' && typeof Number(infos[i].단가) == 'number') {
          단가합.push(Number(infos[i].단가.replace(',', ''))); //단가들을 단가합 배열에 리스트로 저장
          count.push(1); // 해당 단가의 갯수리스트에 1로 등록
        } else {
          단가합.push(0); //단가가 없는 항목은 0을 처리
          count.push(0);
        }
      } else {
        //품번배열의 리스트에 있는 품번일때
        var no = 품번.indexOf(infos[i].품번);
        if (infos[i].단가 != undefined && infos[i].단가 != '' && typeof Number(infos[i].단가) == 'number') {
          단가합[no] = Number(infos[i].단가.replace(',', ''));
          count[no]++;
        }
        수량[no] += Number(infos[i].수량.replace(',', ''));
      }
    }
  }

  //구자료에서 단가합 처리(그동안 회계쪽에서 누적되어온 단가합과 갯수를을 계산에 포함시켜주는 부분
  find_구자료(구자료, { 품번: { $exists: true } }); //구자료는 엑셀 .csv 파일로 넣었음(더이상 작업 불필요)
  await delay();

  if (구자료_v != null) {
    구자료_v.forEach(function (infos) {
      var no = 품번.indexOf(infos.품번);
      if (no >= 0) {
        console.log(typeof infos.평균단가, infos.평균단가);
        단가합[no] += Number(infos.평균단가.replace(',', ''));
        count[no]++;
      }
    });
  }

  var list = [];
  for (var i = 0; i < 품번.length; i++) {
    if (Number(count[i]) == 0) continue;

    //품번별 자료를 만듬)
    var item = {
      품번: 품번[i],
      수량: 수량[i],
      평균단가: (Number(단가합[i]) / Number(count[i])).toLocaleString('ko-KR'),
      합계: ((Number(단가합[i]) / Number(count[i])) * Number(수량[i])).toLocaleString('ko-KR'),
    };

    list.push(item);
  }

  if (list == undefined) return;

  //품번별 평균단가 리스트를 표로 보여줌
  var table_평균단가 = new Tabulator('#grid_품번별단가평균', {
    layout: 'resizableColumnFit',
    height: '700px',
    data: list,

    columns: [
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: '수량', field: '수량', sorter: 'string', width: '180' },
      { title: '평균단가', field: '평균단가', sorter: 'string', width: '180' },
      { title: '합계', field: '합계', sorter: 'string', width: '180' },
    ],
  });
}

//고품재고를 보여줌 (고품정보 입력은 분해조립 완전분해에서 자동으로 기입됨)
async function 고품재고() {
  findOne_고품정보(고품정보, { 관리번호: { $exists: true } });
  await delay();

  if (고품정보_v != null) {
    find_고품정보(고품정보, { 관리번호: { $exists: true } });
    await delay();

    tabledata_고품재고 = JSON.parse(JSON.stringify(고품정보_v));
  } else {
    return;
  }

  table_고품재고 = new Tabulator('#grid_고품재고', {
    layout: 'resizableColumnFit',
    height: '700px',
    data: tabledata_고품재고,

    columns: [
      { title: 'QR', field: 'QR', sorter: 'string', width: '180' },
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '품명', field: '품명', sorter: 'string', width: '180' },
      //{ title: "구분", field: "구", sorter: "string", width: '180' },
      //{ title: "번호", field: "번호", sorter: "string", width: '180' },
      { title: '폐기여부', field: '폐기여부', sorter: 'string', width: '180' },
      { title: '사용여부', field: '사용여부', sorter: 'string', width: '180' },
      { title: '사용 관리번호', field: '사용_관리번호', sorter: 'string', width: '180' },
      { title: '등록 작업자', field: '등록_작업자', sorter: 'string', width: '180' },
      { title: '사용 작업자', field: '사용_작업자', sorter: 'string', width: '180' },
      { title: '등록일', field: '등록일', sorter: 'string', width: '180' },
      { title: '사용일', field: '사용일', sorter: 'string', width: '180' },
      { title: '폐기품출고', field: '폐기품출고', sorter: 'string', width: '180' },
    ],
  });

  table_고품재고.on('rowClick', async function (e, row) {
    console.log('selected QR: ', row.getData().QR);
    고품_QR = row.getData().QR;

    document.getElementById('고품_QR').innerHTML = 'QR: ' + 고품_QR;
  });

  //고품재고 표의 검색 필터 셋팅
  //Update filters on value change
  document.getElementById('old_filter-field').addEventListener('change', 고품재고_updateFilter);
  document.getElementById('old_filter-type').addEventListener('change', 고품재고_updateFilter);
  document.getElementById('old_filter-value').addEventListener('keyup', 고품재고_updateFilter);

  //Clear filters on "Clear Filters" button click
  document.getElementById('old_filter-clear').addEventListener('click', function () {
    var fieldEl = document.getElementById('old_filter-field');
    var typeEl = document.getElementById('old_filter-type');
    var valueEl = document.getElementById('old_filter-value');
    fieldEl.value = '';
    typeEl.value = '=';
    valueEl.value = '';

    table_고품재고.clearFilter();
  });
}
