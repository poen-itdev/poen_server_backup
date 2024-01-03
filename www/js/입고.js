async function 입고_시작() {
  while (typeof _management_id == "undefined") {
    await sleep(DELAY);
  }

  const _입고기타 = document.getElementById("_입고_기타");
  const _입고일반 = document.getElementById("_입고_일반");

  if (level != "관리자") {
    _입고일반.style.display = "inline-block";
    _입고기타.style.display = "none";
  } else {
    _입고일반.style.display = "none";
    _입고기타.style.display = "inline-block";
  }

  flag_입고 = false;

  //if (_management_id.value.trim() == "조회 버튼을 누르세요")
  //	_management_id.value = 관리번호;
  console.log("load: ", _management_id.value);
  if (_management_id.value.length == 0) return;
  if ((_management_id.value == "") | (_management_id.value == "none")) return;

  _management_id.value = _management_id.value;
  count(입고, { 관리번호: _management_id.value });
  await delay();
  if (입고_cnt > 0) {
    find(입고, _management_id.value);
    await delay();
    console.log("입고 data:", 입고_v);

    _입고일.value = 입고_v.입고일;
    _입고처.value = 입고_v.입고처;
    _구분.value = 입고_v.구분;
    _차종.value = 입고_v.차종;
    _품번.value = 입고_v.품번;
    _RO_no.value = 입고_v.RO_no;
  } else {
    _입고일.value = "0000-00-00T00:00";
    _입고처.value = "";
    _구분.value = "";
    _차종.value = "";
    _품번.value = "";
    _RO_no.value = "";

    var DateTime = luxon.DateTime;
    var seoul = DateTime.local().setZone("Asia/Seoul");
    var now = seoul.toString().slice(0, 19);

    _입고일.value = now;
  }
}

async function 입고_save() {
  if (_management_id.value.length == 0) return;
  console.log("save: ", _management_id.value);
  _차종.value = _차종.value.replace("-", "_");
  var doc = JSON.parse(JSON.stringify(입고_doc));

  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone("Asia/Seoul");
  var now = seoul.toString().slice(0, 19);

  if (_입고일.value == "") _입고일.value = now;

  doc.관리번호 = _management_id.value.trim().toUpperCase();
  doc.입고일 = _입고일.value;
  doc.입고처 = _입고처.value;
  doc.구분 = _구분.value;
  doc.차종 = _차종.value;
  doc.품번 = _품번.value;
  doc.RO_no = _RO_no.value;

  if (_RO_no.value.length != 17 && _RO_no.value.length != 0) {
    var cnt = (_RO_no.value.match(/-/g) || []).length;
    if (_RO_no.value.length - cnt != 17) {
      alert("Ro 번호 자릴수가 다릅니다.(17)");
      return;
    }
  }

  if (_RO_no.value.length == 0) {
    alert("RO 번호가 입력되지 않았습니다.");
  }
  update(입고, doc);
  await delay();

  console.log(update_count);
  console.log(insert_count);

  if (update_count > 0) {
    alert("업데이트 되었습니다");
  }

  if (insert_count > 0) {
    alert("저장 되었습니다");
  }

  find(BSA재제조, _management_id.value);
  await delay();

  if (BSA재제조_v == null) {
    var _doc = JSON.parse(JSON.stringify(BSA재제조_doc));
    _doc.관리번호 = _management_id.value.trim().toUpperCase();
    _doc.입고 = _입고일.value;
    _doc.구분 = _구분.value;
    _doc.차종 = _차종.value;
    _doc.품번 = _품번.value;
    _doc.RO_no = _RO_no.value;
    _doc.렉번호 = select_pos;

    update(BSA재제조, _doc);
    await delay();

    select_pos = "";
  } else {
    var _doc = {
      관리번호: _management_id.value.toUpperCase(),
      입고: _입고일.value,
      구분: _구분.value,
      차종: _차종.value,
      품번: _품번.value,
      RO_no: _RO_no.value,
      렉번호: select_pos,
    };

    update(BSA재제조, _doc);
    await delay();

    select_pos = "";
  }

  await 공정단계자동입력(_management_id.value);
  //이전페이지();
}

function _구분_콤보박스(e) {
  const value = e.value;

  document.getElementById("_구분").value = value;
}

function _차종_리스트_콤보박스(e) {
  const value = e.value;

  document.getElementById("_차종").value = value;
}
