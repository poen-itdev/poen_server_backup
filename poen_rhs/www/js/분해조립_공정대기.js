async function 분해조립_공정대기_시작() {
  await sleep(100);
  if (typeof _D == 'undefined') {
    await sleep(1);
    return;
  }
  flag_분해조립_공정대기 = false;

  console.log('분해조립 공정대기 시작');

  //기본정보의 소재지를 공정 대기로 바꾸어 저장한다.
  var doc = {
    관리번호: 관리번호,
    소재지: '공정대기',
  };

  update(BSA재제조, doc);
  await delay();

  //부품정보 리스트를 화면에 표출한다.
  flag_부품정보_list = true;
  await 부품정보_list_시작();

  //불량의심 부품을 화면에 표시한다
  var 내부 = false;
  flag_불량의심부품 = false;
  await 불량의심부품_시작(내부);

  //저장된 분해조립 공정대기 리스트를 표시한다
  find(분해조립공정대기, 관리번호);
  await delay();

  분해조립공정대기_tabledata = JSON.parse(JSON.stringify(분해조립공정대기_v));
  await 분해조립공정대기_table(분해조립공정대기_tabledata);

  //불량의심 부품 그림에서 모든 버튼에 click 이벤트를 등록한다.
  공정대기_choisenButton();

  //저장된 부품 정보로 화면에 붉게 표시해 준다.
  draw_color(분해조립공정대기_tabledata);

  //기본 정보를 로딩한다.
  find(BSA재제조, 관리번호);
  await delay();

  if (BSA재제조_v != null) {
    _재제조번호.value = BSA재제조_v.재제조번호;
    _RO_no.value = BSA재제조_v.RO_no;
    _구분.value = BSA재제조_v.구분;
    _품번.value = BSA재제조_v.품번;
    _VIN.value = BSA재제조_v.VIN;
  }
}

//공정대기 사유 부품즐의 정보를 표시한다.
var table_공정대기;
async function 분해조립공정대기_table(tabledata) {
  table_공정대기 = new Tabulator('#grid_교체부품', {
    layout: 'resizableColumnFit',
    height: 500,
    data: tabledata,

    columns: [
      { title: '품명', field: '품명', sorter: 'string' },
      { title: '품번', field: '품번', sorter: 'string' },
      { title: 'QR', field: 'QR', sorter: 'string' },
      { title: '대기사유', field: '대기사유', editor: 'textarea' },
    ],
  });
}

//불량의심부품 그림의 각 버튼에 클릭 이벤트 등록
var 분해조립공정대기_tabledata = [];
function 공정대기_choisenButton() {
  var buttons = document.querySelectorAll('button');
  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.getAttribute('value');
      if (value == null) return;
      console.log('value:', value);

      //선택한 버튼의 정보를 바탕으로 해당 부품의 정보를 추출한다.
      var add_item = {
        관리번호: 관리번호,
        품명: value.replace('_A_', '').replace('_B_', '').replace('_C_', '').replace('_D_', '').replace('_D2_', '').replace('_QR', ''),
        품번: document.getElementById(value.replace('QR', '품번')).value,
        QR: document.getElementById(value).value,
        대기사유: '',
      };

      if (add_item.QR.trim() == '') return;
      button.style.backgroundColor = 'red'; //붉게 표시해 준다

      //이미 붉은 버튼은 연분홍으로 되돌린다.(토글 기능)
      for (var i = 0; i < 분해조립공정대기_tabledata.length; i++) {
        if (분해조립공정대기_tabledata[i].QR == add_item.QR || pushed.indexOf(add_item.QR) != -1) {
          document.getElementById(value.replace('_QR', '')).style.backgroundColor = 'salmon';
          if (pushed.indexOf(add_item.QR) != -1) pushed.splice(pushed.indexOf(add_item.QR), 1);
          분해조립공정대기_tabledata.splice(i, 1);
          분해조립공정대기_table(분해조립공정대기_tabledata);

          delete_분해조립공정대기(분해조립공정대기, add_item.QR);
          await delay();
          return;
        }
      }

      //공정대기 사유 부분들의 정보를 표출하고 나머지 필요 정보를 입력 가능한 상태로 바꾼다.
      분해조립공정대기_tabledata.push(add_item);
      분해조립공정대기_table(분해조립공정대기_tabledata);
    });
  });
}

//SAVE
async function 분해조립공정대기_save() {
  var data = table_공정대기.getData();

  //기존 정부를 모두 삭제
  for (var i = 0; i < data.length; i++) {
    delete_분해조립공정대기(공정대기, data[i].QR);
    await delay();
  }

  //모든 데이터 다시 업데이트
  for (var i = 0; i < data.length; i++) {
    console.log(data[i]);
    update_분해조립공정대기(분해조립공정대기, data[i]);
    await delay();

    console.log(update_count);
    console.log(insert_count);
  }

  if (update_count > 0) {
    alert('업데이트 되었습니다');
  }

  if (insert_count > 0) {
    alert('저장 되었습니다');
  }
}

//선택된 버튼을 붉게 표시
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
