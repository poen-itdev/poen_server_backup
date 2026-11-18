var 분해조립투입일 = '';
async function 분해조립_재제조_시작() {
  await sleep(100);
  if (typeof _D == 'undefined') {
    await sleep(1);
    return;
  }
  flag_분해조립_재제조 = false;

  console.log('분해조립 재제조 시작');

  pushed = [];
  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString().slice(0, 19);

  find(BSA재제조, 관리번호);
  await delay();

  if (BSA재제조_v != null) {
    if (BSA재제조_v.분해조립투입일 != '') 분해조립투입일 = BSA재제조_v.분해조립투입일; //수정도 가능하도록 함
    else 분해조립투입일 = now; //분해조립투입일 자동 처리
  } else {
    분해조립투입일 = now;
  }

  flag_부품정보_list = true;
  await 부품정보_list_시작(); //부품정보 리스트 표출

  var 내부 = false;
  flag_불량의심부품 = false;
  await 불량의심부품_시작(내부); //불량의심부품 그림 표출

  //분래조립 재제조 데이터 로딩
  find(분해조립재제조, 관리번호);
  await delay();

  //교체부품 리스트 편집 테이블에 저장된 정보 표시
  교체부품_tabledata = JSON.parse(JSON.stringify(분해조립재제조_v));
  await 교체부품_table(교체부품_tabledata);

  //불량의심 부품의 모든 버튼에 크릭 이벤트 등록
  재제조_choisenButton();

  //부품 버튼의 색을 붉게 봐꿔줌
  draw_color(교체부품_tabledata);

  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString().slice(0, 19);

  if (_공정입고일.value == '') _공정입고일.value = now;
  //if (_공정완료일.value == "") _공정완료일.value = now;

  _작성자.value = worker;
}

var table_부품교환;

async function 교체부품_table(tabledata) {
  table_부품교환 = new Tabulator('#grid_교체부품', {
    layout: 'resizableColumnFit',
    height: 500,
    data: tabledata,

    columns: [
      { title: '품명', field: '품명', sorter: 'string' },
      { title: '교체전 품번', field: '교체전품번', sorter: 'string' },
      { title: '교체전 QR', field: '교체전QR', sorter: 'string' },
      { title: '신품/고품', field: '신품고품', editor: 'select', editorParams: { values: { 신품: '신품', 고품: '고품' } } },
      { title: '고품식별', field: '고품식별', editor: 'input' },
      { title: '교체후 품번', field: '교체후품번', editor: 'input' },
      { title: '교체후 QR', field: '교체후QR', editor: 'input' },
      { title: '교체사유', field: '교체사유', editor: 'textarea' },
      {
        formatter: 'buttonCross',
        width: 40,
        align: 'center',
        cellClick: async function (e, cell) {
          var row_index = cell.getRow()._row.position;
          var QR = 교체부품_tabledata[row_index - 1].교체전QR;
          if (pushed.indexOf(QR) != -1) pushed.splice(pushed.indexOf(QR), 1);
          console.log('delete:', QR);
          delete_분해조립재제조(분해조립재제조, QR);
          await delay();

          교체부품_tabledata.splice(row_index - 1, 1);
          교체부품_table(교체부품_tabledata);
        },
      },
    ],
  });
}

var 교체부품_tabledata = [];
function 재제조_choisenButton() {
  var buttons = document.querySelectorAll('button');
  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.getAttribute('value');
      if (value == null) return;
      console.log('value:', value);

      //부품 버튼 클릭시 버튼에서 부품의 정보를 추출하고 입고일과 완료일을 셋팅한다.
      var add_item = {
        관리번호: 관리번호,
        품명: value.replace('_A_', '').replace('_B_', '').replace('_C_', '').replace('_D_', '').replace('_D2_', '').replace('_QR', ''),
        교체전품번: document.getElementById(value.replace('QR', '품번')).value,
        교체전QR: document.getElementById(value).value,
        신품고품: '',
        고품식별: '',
        교체후품번: '',
        교체후QR: '',
        교체사유: '',
        공정입고일: _공정입고일.value,
        공정완료일: _공정완료일.value,
        작성자: worker,
      };

      if (add_item.교체전QR.trim() == '') return;
      button.style.backgroundColor = 'red'; //클릭하 부품의 색을 붉게 변화시킨다.

      //부품 선택 토글
      for (var i = 0; i < 교체부품_tabledata.length; i++) {
        if (교체부품_tabledata[i].교체전QR == add_item.교체전QR || pushed.indexOf(add_item.교체전QR) != -1) {
          document.getElementById(value.replace('_QR', '')).style.backgroundColor = 'salmon';

          if (pushed.indexOf(add_item.교체전QR) != -1) pushed.splice(pushed.indexOf(add_item.교체전QR), 1);
          교체부품_tabledata.splice(i, 1);
          교체부품_table(교체부품_tabledata);

          delete_분해조립재제조(분해조립재제조, add_item.교체전QR);
          await delay();

          return;
        }
      }

      //선택된 부품의 정보를 편집할수 있도록 표에 등록시킨다.
      교체부품_tabledata.push(add_item);
      교체부품_table(교체부품_tabledata);
    });
  });
}

//SAVE
async function 분해조립재제조_save() {
  var data = table_부품교환.getData();
  console.log(data.length);
  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString().slice(0, 19);

  //기존 정보를 모두 삭제한다.
  for (var i = 0; i < data.length; i++) {
    delete_분해조립재제조(분해조립재제조, data[i].교체전QR);
    await delay();
  }

  var flag_update = false;
  var flag_insert = false;

  //새로이 모든 정보를 업데이트한다.
  for (var i = 0; i < data.length; i++) {
    update_분해조립재제조(분해조립재제조, data[i]);
    await delay();

    console.log(update_count);
    console.log(insert_count);

    if (update_count > 0) flag_update = true;
    if (insert_count > 0) flag_insert = true;

    var doc = {
      관리번호: 관리번호,
      품명: data[i].품명,
      QR: data[i].교체전QR,
      폐기여부: '폐기',
      등록일: now,
      등록_작업자: worker,
    };

    update_고품정보(고품정보, doc);
    await delay();

    console.log(update_count);
    console.log(insert_count);

    if (update_count > 0) flag_update = true;
    if (insert_count > 0) flag_insert = true;

    //고품 부품 사용시 사용여부 정보를 고품정보에 기입한다.
    if (data[i].신품고품 != '고품') continue;

    doc = {};
    doc = {
      QR: data[i].교체후QR,
      사용여부: '사용',
      사용_관리번호: 관리번호,
      사용일: now,
      사용_작업자: worker,
    };

    update_고품정보(고품정보, doc);
    await delay();

    console.log(update_count);
    console.log(insert_count);

    if (update_count > 0) flag_update = true;
    if (insert_count > 0) flag_insert = true;
  }

  if (flag_update) alert('업데이트 되었습니다');
  else if (flag_insert) alert('저장 되었습니다');

  //기본정보에 분해조립 투입일고 완료일 기입
  var doc = {};
  doc.관리번호 = 관리번호;
  doc.분해조립투입일 = 분해조립투입일;
  doc.분해조립 = now;

  update(BSA재제조, doc);
  await delay();

  //기본정보를 불러와 쓰레기값 삭제 처리
  find(BSA재제조, _management_id.value);
  await delay();

  undefined_check(BSA재제조_v);

  //공정단계 자동 처리
  await 공정단계자동입력(_management_id.value);
}

//버튼의 색을 바꿔줌
var pushed = [];
function draw_color(data) {
  data.forEach((v) => {
    var id = v.품명;
    console.log(v);

    switch (차종) {
      case 'DE':
      case 'DE_EV':
      case 'OS':
      case 'OS_EV':
      case 'SK3':
      case 'SK3_EV':
      case 'LK':
      case 'LK_EV':
        id = '_A_' + id;
        break;

      case 'PU':
      case 'PU_EV':
      case 'HR':
      case 'HR_EV':
        id = '_B_' + id;
        break;

      case 'CV':
      case 'CV_EV':
      case 'NE':
      case 'NE_EV':
      case 'LM':
      case 'LM_EV':
        id = '_C_' + id;
        break;

        break;

      case 'CS':
      case 'CS_EV':
        id = '_D_' + id;
        break;

      default:
        alert('차종 정보를 확인해주세요');

        return;
        break;
    }
    document.getElementById(id).style.backgroundColor = 'red';
    pushed.push(id);
  });
}
