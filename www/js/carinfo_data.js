async function 배터리입력_시작() {
  while (typeof _qr_code == "undefined") {
    await sleep(DELAY);
  }

  console.log("load: ", _qr_code.value);
  if (_qr_code.value.length == 0) return;

  findOne_배터리입력(배터리입력, { qr_code: _qr_code.value });
  await delay();
  if (배터리입력_v != null) {
    console.log("배터리 data:", 배터리입력_v);

    _생산일.value = 배터리입력_v.생산일;
    _방문업체.value = 배터리입력_v.방문업체;
    _차종.value = 배터리입력_v.차종;
    _품번.value = 배터리입력_v.품번;
    _ROM_no.value = 배터리입력_v.ROM_no;
  } else {
    _생산일.value = "0000-00-00";
    _방문업체.value = "";
    _차종.value = "";
    _품번.value = "";
    _ROM_no.value = "";

    var DateTime = luxon.DateTime;
    var seoul = DateTime.local().setZone("Asia/Seoul");
    var now = seoul.toString().slice(0, 10);

    _생산일.value = now;
  }
}

async function 배터리입력_save() {
  if (_qr_code.value.length == 0) return;
  console.log("save: ", _qr_code.value);
  var doc = JSON.parse(JSON.stringify(배터리입력_doc));

  console.log(doc);

  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone("Asia/Seoul");
  var now = seoul.toString().slice(0, 10);

  if (_생산일.value == "") _생산일.value = now;

  doc.qr_code = _qr_code.value.trim().toUpperCase();
  console.log("qr:", qr_code);
  doc.생산일 = _생산일.value;
  doc.방문업체 = _방문업체.value;
  doc.차종 = _차종.value;
  doc.품번 = _품번.value;
  doc.ROM_no = _ROM_no.value;

  update(배터리입력, doc);
  await delay();
  console.log("qr:", doc);

  console.log("업데이트", update_count);
  console.log("저장", insert_count);

  if (update_count > 0) {
    alert("업데이트 되었습니다");
  }

  if (insert_count > 0) {
    alert("저장 되었습니다");
  }
}

function _차종_리스트_콤보박스(e) {
  const value = e.value;

  document.getElementById("_차종").value = value;
}
function _방문업체_리스트_콤보박스(e) {
  const value = e.value;

  document.getElementById("_방문업체").value = value;
}
