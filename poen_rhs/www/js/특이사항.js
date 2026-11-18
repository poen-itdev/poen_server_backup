async function 특이사항_시작() {
  if (worker == '') return;
  if (typeof _management_id == 'undefined') {
    await sleep(DELAY);
  }

  _management_id.value = 관리번호;

  if (_management_id.value.length == 0) return;
  console.log('load: ', _management_id.value);
  if (_management_id.value == '' || _management_id.value == 'none') return;

  //특이사항 로딩
  find(특이사항, _management_id.value);
  await delay();

  if (특이사항_v != null) {
    _특이사항.value = 특이사항_v.특이사항;
  } else {
    _특이사항.value = '';
  }
}

async function 특이사항_save() {
  if (worker == '') return;
  if (_management_id.value.length == 0) return;
  console.log('save: ', _management_id.value);

  //특이사항 저장
  var doc = 특이사항_doc;
  doc.관리번호 = _management_id.value.trim().toUpperCase();
  doc.특이사항 = _특이사항.value;

  update(특이사항, doc);
  await delay();

  console.log(update_count);
  console.log(insert_count);

  if (update_count > 0) {
    alert('업데이트 되었습니다');
  }

  if (insert_count > 0) {
    alert('저장 되었습니다');
  }

  이전페이지();
}
