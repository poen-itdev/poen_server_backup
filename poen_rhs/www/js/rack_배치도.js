var select_pos = ''; //rack 그림에서 선택한 rack
var 창고 = '';
var 보관렉_table;

async function racks_시작() {
  console.log('racks start');
  if (flag_racks == true) await rack_list();
  flag_racks = false;

  while (document.getElementById('_제주') == undefined) {
    await sleep(1);
  }

  //모든 버튼에 click 이벤트를 등록함
  var buttons = document.querySelectorAll('.rack');
  buttons.forEach((button) => {
    button.addEventListener('click', getButtonValue);
  });

  //일단 모든 창고를 안보이게함
  document.getElementById('_마도').style.display = 'none';
  document.getElementById('_마도출고').style.display = 'none';
  document.getElementById('_구장').style.display = 'none';
  //document.getElementById('_군포').style.display = 'none';
  document.getElementById('_제주').style.display = 'none';

  창고선택();

  if (창고 == '마도보관' || 창고 == '마도출고') {
    find_BSA재제조(BSA재제조, { EOL: { $ne: '' }, 렉번호: { $ne: '' } });
    await delay();

    var 마도출고_buttons = document.querySelectorAll('.rack');
    for (var i = 0; i < BSA재제조_v.length; i++) {
      for (var j = 0; j < 마도출고_buttons.length; j++) {
        if (BSA재제조_v[i].렉번호 == 마도출고_buttons[j].value) {
          마도출고_buttons[j].innerHTML = BSA재제조_v[i].관리번호;
          마도출고_buttons[j].title = 'Ro No:' + BSA재제조_v.RONo + '\n차종: ' + BSA재제조_v[i].차종 + '\n품번:' + BSA재제조_v[i].품번;
        }
      }
    }
  }
}

//해당 창고만 보이도록 함
function 창고선택() {
  if (창고 == '마도') {
    document.getElementById('_마도').style.display = 'block';
  } else if (창고 == '마도보관') {
    document.getElementById('_마도출고').style.display = 'block';
  } else if (창고 == '마도출고') {
    document.getElementById('_마도출고').style.display = 'block';
  } else if (창고 == '구장') {
    document.getElementById('_구장').style.display = 'block';
  } else if (창고 == '군포') {
    //document.getElementById('_군포').style.display = 'block';
  } else if (창고 == '제주') {
    document.getElementById('_제주').style.display = 'block';
  }
}

//모든 rack에 버튼 click 시 실행할 함수를 등록함
async function getButtonValue(event) {
  const button = event.target;
  const value = button.value;
  console.log(value);

  var yes = 'true';
  if (창고 != '마도출고') {
    yes = confirm('선택 Rack 번호: ' + value + '\n정보를 입력하시겠습니까?');
  } else {
    //출고시 문구
    yes = confirm('선택 Rack 번호: ' + value + '\n' + button.innerHTML + '을 출하 하시겠습니까?');
  }
  if (yes == true) {
    select_pos = value; //선택 rack 위치

    if (창고 == '마도') {
      //마도 창고 입고시
      flag_입고 = true;
      loadPage('base/입고.html');
    } else if (창고 == '마도출고') {
      //마도 출고시 실행
      //flag_상세입력 = true;

      var DateTime = luxon.DateTime;
      var seoul = DateTime.local().setZone('Asia/Seoul');
      var now = seoul.toString().slice(0, 19);
      var doc = {
        관리번호: button.innerHTML,
        출하: now,
        공정단계: '출하',
        렉번호: '',
      };

      update(BSA재제조, doc);
      await delay();

      if (update_count > 0) {
        alert('보관정보 입력 완료 되었습니다.');
      }

      이전페이지();
    } else if (창고 == '마도보관') {
      //마도 보관시
      var doc = {
        관리번호: 관리번호,
        렉번호: button.value,
      };

      update(BSA재제조, doc);
      await delay();

      if (update_count > 0) {
        alert('출하보관렉 입고 완료 되었습니다.');
      }
      이전페이지();
    } else if (창고 == '군포') {
      //flag_군포재고 = true;
      //loadPage('base/군포재고.html');
    } else if (창고 == '구장') {
      flag_구장재고 = true;
      loadPage('base/구장재고.html');
    } else if (창고 == '제주') {
      flag_제주재고 = true;
      loadPage('base/제주재고.html');
    }
    창고 = '';
  }
}

async function rack_list() {
  findOne_BSA재제조(BSA재제조, { 공정단계: { $ne: '출하' }, 성능검사: { $ne: '' }, EOL: { $ne: '' }, 소재지: { $nin: ['공정대기', '품질대기'] }, 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 출하검사: { $eq: '' }, 출하: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } });
  await delay();

  if (BSA재제조_v != null) {
    find_BSA재제조(BSA재제조, { 공정단계: { $ne: '출하' }, 성능검사: { $ne: '' }, EOL: { $ne: '' }, 소재지: { $nin: ['공정대기', '품질대기'] }, 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 출하검사: { $eq: '' }, 출하: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } });
    await delay();
  }

  if (창고 == '마도출고') return;
  보관렉_table = new Tabulator('#grid_list', {
    layout: 'resizableColumnFit',
    data: BSA재제조_v,
    height: '400px',

    columns: [
      { title: 'ID', field: '_id', sorter: 'string', width: '180' },
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      {
        title: '재제조번호',
        field: '재제조번호',
        sorter: 'string',
        width: '180',
      },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string', width: '180' },
      { title: '공정단계', field: '공정단계', sorter: 'string', width: '180' },
      { title: '소재지', field: '소재지', sorter: 'string', width: '180' },
      {
        title: '적재No',
        field: '적재No',
        sorter: 'string',
        visible: true,
        width: '180',
      }, //
      {
        title: '입고',
        field: '입고',
        sorter: 'string',
        visible: true,
        width: '180',
      }, //
      {
        title: '제조투입',
        field: '제조투입',
        sorter: 'string',
        visible: true,
        width: '180',
      }, //
      {
        title: '세척투입일',
        field: '세척투입일',
        sorter: 'string',
        width: '180',
      },
      {
        title: '세척',
        field: '세척',
        sorter: 'string',
        visible: true,
        width: '180',
      }, //
      {
        title: '기초검사투입일',
        field: '기초검사투입일',
        sorter: 'string',
        width: '180',
      },
      {
        title: '기초검사',
        field: '기초검사',
        sorter: 'string',
        visible: true,
        width: '180',
      }, //
      {
        title: '분해조립투입일',
        field: '분해조립투입일',
        sorter: 'string',
        width: '180',
      },
      {
        title: '분해조립',
        field: '분해조립',
        sorter: 'string',
        visible: true,
        width: '180',
      }, //
      {
        title: '성능검사투입일',
        field: '성능검사투입일',
        sorter: 'string',
        width: '180',
      },
      {
        title: '성능검사',
        field: '성능검사',
        sorter: 'string',
        visible: true,
        width: '180',
      }, //
      {
        title: 'EOL투입일',
        field: 'EOL투입일',
        sorter: 'string',
        width: '180',
      },
      {
        title: 'EOL',
        field: 'EOL',
        sorter: 'string',
        visible: true,
        width: '180',
      }, //
      { title: '출하검사', field: '출하검사', sorter: 'string', width: '180' },
      { title: '납품처', field: '납품처', sorter: 'string', width: '180' },
      { title: '출하', field: '출하', sorter: 'string', width: '180' },
      { title: '반품입고', field: '반품입고', sorter: 'string', width: '180' },
      { title: '재출하', field: '재출하', sorter: 'string', width: '180' },
      { title: '완전분해', field: '완전분해', sorter: 'string', width: '180' },
      {
        title: '완전분해사유',
        field: '완전분해사유',
        sorter: 'string',
        width: '180',
      },
      { title: '폐기', field: '폐기', sorter: 'string', width: '180' },
      { title: '폐기사유', field: '폐기사유', sorter: 'string', width: '180' },
      {
        title: '마지막충전일',
        field: '마지막충전일',
        sorter: 'string',
        width: '180',
      },
      { title: '출하예약', field: '출하예약', sorter: 'string', width: '180' },
      { title: '렉번호', field: '렉번호', sorter: 'string', width: '180' },
    ],
  });

  보관렉_table.on('rowClick', async function (e, row) {
    console.log('selected 관리번호: ', row.getData().관리번호);

    var yes = confirm('선택한 배터리팩을 선택하시겠습니까?');
    if (yes != true) return;

    관리번호 = row.getData().관리번호;
  });

  //Update filters on value change
  document.getElementById('filter-field').addEventListener('change', 출하정보_updateFilter);
  document.getElementById('filter-type').addEventListener('change', 출하정보_updateFilter);
  document.getElementById('filter-value').addEventListener('keyup', 출하정보_updateFilter);

  //Clear filters on "Clear Filters" button click
  document.getElementById('filter-clear').addEventListener('click', function () {
    var fieldEl = document.getElementById('filter-field');
    var typeEl = document.getElementById('filter-type');
    var valueEl = document.getElementById('filter-value');
    fieldEl.value = '';
    typeEl.value = '=';
    valueEl.value = '';

    출하정보_list_table.clearFilter();
  });
}
