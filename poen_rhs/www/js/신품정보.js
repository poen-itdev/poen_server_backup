var m_id = '';
var tabledata = [];

async function 신품정보_시작() {
  //.csv 파일 입력 처리부분 선언
  flag_신품정보 = false;
  await sleep(100);

  read_신품정보_func_csv();
  console.log('==>', read_신품정보_func_csv);
}

async function 신품정보등록_조회() {
  if (worker == '') return;
  if (typeof _QR == 'undefined') {
    await sleep(DELAY);
    return;
  }
  flag_신품정보 = false;
  if (_QR.value.length == 0) return;
  console.log('load: ', _QR.value);
  if ((_QR.value == '') | (_QR.value == 'none')) return;

  //신품정보는 자재입출고 다큐먼트를 사용하고 프라이머리 키는 QR임
  findOne_자재입출고(자재입출고, { QR: _QR.value });
  await delay();

  if (자재입출고_v != null) {
    _QR.value = 자재입출고_v.QR;
    _날짜.value = 자재입출고_v.날짜;
    _구분.value = 자재입출고_v.구분;
    _차종.value = 자재입출고_v.차종;
    _품명.value = 자재입출고_v.품명;
    _품번.value = 자재입출고_v.품번;
    _단가.value = 자재입출고_v.단가;
    _수량.value = 자재입출고_v.수량;
    _위치.value = 자재입출고_v.위치;
    _LotNo.value = 자재입출고_v.LotNo;
    _비고.value = 자재입출고_v.비고;
  } else {
    _QR.value = '';
    _날짜.value = '';
    _구분.value = '';
    _차종.value = '';
    _품명.value = '';
    _품번.value = '';
    _단가.value = '';
    _수량.value = '';
    _위치.value = '';
    _LotNo.value = '';
    _비고.value = '';
  }
}

async function 신품정보_save() {
  if (worker == '') if (_QR.value.length == 0) return;
  console.log('save: ', _QR.value);

  var doc = 자재입출고_doc;
  doc.QR = _QR.value;
  doc.날짜 = _날짜.value;
  doc.구분 = _구분.value;
  doc.차종 = _차종.value;
  doc.품명 = _품명.value;
  doc.품번 = _품번.value;
  doc.단가 = _단가.value;
  doc.수량 = _수량.value;
  doc.위치 = _위치.value;
  doc.LotNo = _LotNo.value;
  doc.비고 = _비고.value;

  update_신품정보(자재입출고, doc);
  await delay();

  console.log(update_count);
  console.log(insert_count);

  if (update_count > 0) {
    alert('업데이트 되었습니다');
  }

  if (insert_count > 0) {
    alert('저장 되었습니다');
  }
}

function _구분_콤보박스(e) {
  const value = e.value;

  document.getElementById('_구분').value = value;
}

function _품명_콤보박스(e) {
  const value = e.value;

  document.getElementById('_품명').value = value;
}

function _사용여부_콤보박스(e) {
  const value = e.value;

  document.getElementById('_사용여부').value = value;
}

//엑셀 파일을 읽어와 기존 데이터를 지우고 다시 넣음 (마도 친사원이 매일 업데이트)
var flag_신품정보_엑셀 = false;
function read_신품정보_func_csv() {
  _재고관리_csv.addEventListener('input', function (event) {
    const target = event.target;
    const files = target.files;
    const file = files[0];

    const reader = new FileReader();
    reader.addEventListener('load', async function () {
      if (flag_신품정보_엑셀 == true) return;
      flag_신품정보_엑셀 = true;

      const res = d3.csvParse(reader.result);
      var docs = [];

      drop(자재입출고); //기존 자재입출고 컬렉션 제거
      await delay();

      for (var i = 0; i < res.length; i++) {
        //if (res[i].QR != '') docs.push(res[i]);
        docs.push(res[i]);
        if ((i > 0 && i % 2000 == 0) || i == res.length - 1) {
          insertMany(자재입출고, docs); //엑셀에서 읽어들인 새로운 다큐먼트들로 자재입출고 컬렉션을 다시만듬
          await delay();

          console.log('processing:', i, docs.length);

          docs = [];

          await sleep(1);
        }
      }
      console.log('complete:', res.length);
      alert('업로드가 완료되었습니다. 새로고침후 다시 로그인하세요');
    });
    console.log(file);
    reader.readAsText(file);
  });
}

//사용하지 않는 함수(필요할지 몰라 남겨둠)
async function 신품정보_insert(val) {
  var doc = 자재입출고_doc;

  doc.QR = val.QR.trim();
  doc.날짜 = val.날짜;
  doc.구분 = val.구분;
  doc.차종 = val.차종;
  doc.품명 = val.품명;
  doc.품번 = val.품번;
  doc.수량 = val.수량;
  doc.위치 = val.위치;
  doc.LotNo = val.LotNo;
  doc.비고 = val.비고;
  doc.사용관리번호 = '';
  update_신품정보(자재입출고, doc);
  await delay();

  console.log('+');
}
