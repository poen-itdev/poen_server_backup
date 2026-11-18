//계정
var _id;
var _passwd;
var _passwd2;
var _set_level;

async function 관리자_시작() {
  flag_관리자 = false; //main.js 시작 루프에서 쓰임

  _id = document.getElementById('_id');
  _passwd = document.getElementById('_passwd');
  _passwd2 = document.getElementById('_passwd2');
  _level = document.getElementById('_level');
  _이름 = document.getElementById('_이름');
  _기본정보 = document.getElementById('_기본정보');
  _입고 = document.getElementById('_입고');
  _세척 = document.getElementById('_세척');
  _기초검사 = document.getElementById('_기초검사');
  _분해조립 = document.getElementById('_분해조립');
  _성능검사 = document.getElementById('_성능검사');
  _EOL = document.getElementById('_EOL');
  _출하검사 = document.getElementById('_출하검사');
  _부품재고 = document.getElementById('_부품재고');
  _완료일수정 = document.getElementById('_완료일수정');
  _관리번호 = document.getElementById('_관리번호');

  //계정 리스트 조회
  find_계정(계정, { id: { $exists: true } });
  await delay();

  var table;
  if (계정_v != null) {
    table = new Tabulator('#grid_user_info', {
      layout: 'resizableColumnFit',
      data: 계정_v,
      height: '700px',

      columns: [
        { title: 'ID', field: 'id', sorter: 'string', width: '180' },
        { title: 'LEVEL', field: 'level', sorter: 'string', width: '180' },
        { title: '이름', field: '이름', sorter: 'string', width: '180' },
        { title: '기본정보', field: '기본정보', sorter: 'string', width: '180' },
        { title: '입고', field: '입고', sorter: 'string', width: '180' },
        { title: '세척', field: '세척', sorter: 'string', width: '180' },
        { title: '기초검사', field: '기초검사', sorter: 'string', width: '180' },
        { title: '분해조립', field: '분해조립', sorter: 'string', width: '180' },
        { title: '성능검사', field: '성능검사', sorter: 'string', width: '180' },
        { title: 'EOL', field: 'EOL', sorter: 'string', width: '180' },
        { title: '출하검사', field: '출하검사', sorter: 'string', width: '180' },
        { title: '부품재고', field: '부품재고', sorter: 'string', width: '180' },
        { title: '완료일수정', field: '완료일수정', sorter: 'string', width: '180' },
        { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      ],
    });
  }

  //계정 클릭시 해당 계정 정보 수정가능하도록 가져옴
  table.on('rowClick', async function (e, row) {
    console.log('selected 관리번호: ', row.getData().id);
    if (row.getData().id != '') {
      _id.value = row.getData().id;
      _level.value = row.getData().level;
      _이름.value = row.getData().이름;
      _기본정보.value = row.getData().기본정보;
      _입고.value = row.getData().입고;
      _세척.value = row.getData().세척;
      _기초검사.value = row.getData().기초검사;
      _분해조립.value = row.getData().분해조립;
      _성능검사.value = row.getData().성능검사;
      _EOL.value = row.getData().EOL;
      _출하검사.value = row.getData().출하검사;
      _부품재고.value = row.getData().부품재고;
      _완료일수정.value = row.getData().완료일수정;
      _관리번호.value = row.getData().관리번호;
    }
  });
}

//사용자 추가
async function add_user() {
  _passwd = document.getElementById('_passwd');
  _passwd2 = document.getElementById('_passwd2');
  if (_id.value == '' || _passwd.value == '') return;
  if (_passwd.value != _passwd2.value) {
    alert('패스워드가 서로 다름니다.');
    return;
  }

  //패스워드 암호화
  const hash = CryptoJS.MD5(_passwd.value.trim());

  var hash_str = hash.toString();
  var doc = JSON.parse(JSON.stringify(계정_doc)); //deep copy
  doc.id = _id.value.trim();
  doc.passwd = hash_str;
  doc.level = _level.value;
  doc.이름 = _이름.value;
  doc.기본정보 = _기본정보.value;
  doc.입고 = _입고.value;
  doc.세척 = _세척.value;
  doc.기초검사 = _기초검사.value;
  doc.분해조립 = _분해조립.value;
  doc.성능검사 = _성능검사.value;
  doc.EOL = _EOL.value;
  doc.출하검사 = _출하검사.value;
  doc.부품재고 = _부품재고.value;
  doc.완료일수정 = _완료일수정.value;
  doc.관리번호 = _관리번호.value;

  update_계정(계정, doc);
  await delay();

  console.log(update_count);
  console.log(insert_count);

  if (update_count > 0) {
    alert('업데이트 되었습니다');
  }

  if (insert_count > 0) {
    alert('저장 되었습니다');
  }

  관리자_시작(); //계정정보 재로드를 위해
}

//사용자 삭제
async function delete_user() {
  if (_id.value == '') return;

  delete_계정(_id.value);
  await delay();

  if (delete_count > 0) {
    alert('DELETE COMPLETE');
  }

  관리자_시작();
}
