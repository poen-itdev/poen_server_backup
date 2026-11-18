//해외향 작업이후 안쓰게된 기능임
var tabledata = [];
async function 고품정보등록_시작() {
  if (worker == '') return;
  if (typeof _management_id == 'undefined') {
    await sleep(DELAY);
    return;
  }
  _management_id.value = 관리번호;

  if (_management_id.value.length == 0) return;
  console.log('load: ', _management_id.value);
  if ((_management_id.value == '') | (_management_id.value == 'none')) return;

  _작업자.value = worker;

  count(고품정보, { 관리번호: _management_id.value });
  await delay();
  if (고품정보_cnt > 0) {
    find(고품정보, _management_id.value);
    await delay();
    tabledata = 고품정보_v;
  } else {
    _품명.value = '';
    _구분.value = '';
    _품번.value = '';
    _번호.value = '';
    _QR.value = '';
    _폐기여부.value = '';
    _작업자.value = '';
  }

  var table_고품정보 = new Tabulator('#grid_고품정보', {
    layout: 'resizableColumnFit',
    height: 1500,
    data: tabledata,

    columns: [
      { title: '품명', field: '품명', sorter: 'string' },
      { title: '구분', field: '구분', sorter: 'string' },
      { title: '품번', field: '품번', sorter: 'string' },
      { title: '번호', field: '번호', sorter: 'string' },
      { title: 'QR', field: 'QR', sorter: 'string' },
      { title: '폐기여부', field: '폐기여부', sorter: 'string' },
      { title: '작업자', field: '등록_작업자', sorter: 'string' },
      { title: '등록일', field: '등록일', sorter: 'string' },
      { title: '사용일', field: '사용일', sorter: 'string' },
    ],
  });
}

async function 고품정보_save() {
  if (worker == '') return;
  if (_management_id.value.length == 0) return;
  console.log('save: ', _management_id.value);

  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString().substr(0, 19);
  var doc = 고품정보_doc;

  doc.관리번호 = _management_id.value.trim().toUpperCase();
  doc.구분 = _구분.value;
  doc.품명 = _품명.value;
  doc.품번 = _품번.value;
  doc.번호 = _번호.value;
  doc.QR = _QR.value;
  doc.폐기여부 = _폐기여부.value;
  doc.등록일 = now;
  doc.등록_작업자 = _작업자.value;

  update_고품정보(고품정보, doc);
  await delay();

  console.log(update_count);
  console.log(insert_count);

  if (update_count > 0) {
    alert('업데이트 되었습니다');
  }

  if (insert_count > 0) {
    alert('저장 되었습니다');
  }

  고품정보등록_시작();
}

function _품명_콤보박스(e) {
  const value = e.value;

  document.getElementById('_품명').value = value;
}

function _구분_콤보박스(e) {
  const value = e.value;

  document.getElementById('_구분').value = value;
}

function _번호_콤보박스(e) {
  const value = e.value;

  document.getElementById('_번호').value = value;
}

function _폐기여부_콤보박스(e) {
  const value = e.value;

  document.getElementById('_폐기여부').value = value;
}
