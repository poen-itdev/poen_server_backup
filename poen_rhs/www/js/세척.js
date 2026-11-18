//재제조번호 자동생성
var 입력재제조번호 = '';
var today_count = 0;

async function 세척_시작(is재제조 = 0) {
  //is재제조가 1이면 재제조번호로 조회
  //ui가 다 로딩될때까지 기다림
  while (_management_id == undefined) {
    await sleep(DELAY);
  }
  if (flag_세척 == true) {
    //flag_세척은 main.js에서 다룸, 화면에 해당하는 함수 실행
    flag_세척 = false;
    await 세척_list(); //입고된 리스트를 보여줌
  }

  if (is재제조 == 0) {
    //관리자 번호로 조회
    if (_management_id.value.length == 0) return;

    find(BSA재제조, _management_id.value); //조회
    await delay(); //응답을 기다림

    if (BSA재제조_v != null) {
      //DB에서 값을 읽어와 화면에 뿌려줌
      _재제조번호.value = BSA재제조_v.재제조번호;
      _구분.value = BSA재제조_v.구분;
      _차종.value = BSA재제조_v.차종;
      _품번.value = BSA재제조_v.품번;
      _RO_no.value = BSA재제조_v.RO_no;
    } else {
      //새로운 관리번호이면 화면 항목들의 값을 지워줌
      _재제조번호.value = '';
      _구분.value = '';
      _차종.value = '';
      _품번.value = '';
      _RO_no.value = '';
    }
  } else if (is재제조 == 1) {
    //재제조번호로 조회할때
    if (_재제조번호.value.length == 0) return;

    findOne_BSA재제조(BSA재제조, { 재제조번호: _재제조번호.value });
    await delay();

    if (BSA재제조_v != null) {
      _management_id.value = BSA재제조_v.관리번호;
      _구분.value = BSA재제조_v.구분;
      _차종.value = BSA재제조_v.차종;
      _품번.value = BSA재제조_v.품번;
      _RO_no.value = BSA재제조_v.RO_no;
    } else {
      _management_id.value = '';
      _구분.value = '';
      _차종.value = '';
      _품번.value = '';
      _RO_no.value = '';
    }
  } else if (is재제조 == 2) {
    if (_RO_no.value.length == 0) return;

    findOne_BSA재제조(BSA재제조, { RO_no: _RO_no.value });
    await delay();

    if (BSA재제조_v != null) {
      _management_id.value = BSA재제조_v.관리번호;
      _재제조번호.value = BSA재제조_v.재제조번호;
      _구분.value = BSA재제조_v.구분;
      _차종.value = BSA재제조_v.차종;
      _품번.value = BSA재제조_v.품번;
    } else {
      _management_id.value = '';
      _재제조번호.value = '';
      _구분.value = '';
      _차종.value = '';
      _품번.value = '';
    }
  }

  console.log('load: ', _management_id.value);

  관리번호 = _management_id.value;

  if (_재제조번호.value == '') {
    console.log('make product key');
    var DateTime = luxon.DateTime;
    var seoul = DateTime.local().setZone('Asia/Seoul');
    var change_year = seoul.toString().slice(5, 10);
    console.log('01-01? :', change_year);

    findOne_변수(변수, { 구분: 'mado_product_no' });
    await delay();

    console.log('변수:', 변수_v);
    if (변수_v == null) {
      today_count = String(1);
    } else {
      today_count = Number(변수_v.값) + 1;
      today_count = today_count.toString();
    }

    if (change_year == '01-01') {
      today_count = String(1);
    }

    var product_no;
    product_no = await make_md_product_no(today_count);

    console.log('product no:', product_no);

    _재제조번호.value = product_no;
    입력재제조번호 = product_no;
  }

  find(세척, _management_id.value);
  await delay();

  if (세척_v != null) {
    _공정입고일.value = 세척_v.공정입고일;
    _공정완료일.value = 세척_v.공정완료일;
    _어퍼케이스재사용가능.value = 세척_v.어퍼케이스재사용가능;
    _기밀검사_케이스.value = 세척_v.기밀검사_케이스;
    _기밀검사_케이스_특이사항.value = 세척_v.기밀검사_케이스_특이사항;
    _육안검사_외부.value = 세척_v.육안검사_외부;
    _육안검사_외부_특이사항.value = 세척_v.육안검사_외부_특이사항;
    _특이사항.value = 세척_v.특이사항;

    find(세척_pic, _management_id.value);
    await delay();

    if (세척_pic_v != null) {
      _img1.src = 세척_pic_v.pic1;
      _img2.src = 세척_pic_v.pic2;
      _img3.src = 세척_pic_v.pic3;
      _img4.src = 세척_pic_v.pic4;
      _img5.src = 세척_pic_v.pic5;
      _img6.src = 세척_pic_v.pic6;
      _img7.src = 세척_pic_v.pic7;
      _img8.src = 세척_pic_v.pic8;
      _img9.src = 세척_pic_v.pic9;
      _img10.src = 세척_pic_v.pic10;
      _img11.src = 세척_pic_v.pic11;
      _img12.src = 세척_pic_v.pic12;
      _img13.src = 세척_pic_v.pic13;
      _img14.src = 세척_pic_v.pic14;
      _img15.src = 세척_pic_v.pic15;
    }
  } else {
    _공정입고일.value = '0000-00-00T00:00';
    _공정완료일.value = '0000-00-00T00:00';
    _어퍼케이스재사용가능.value = '';
    _기밀검사_케이스.value = '';
    _기밀검사_케이스_특이사항.value = '';
    _육안검사_외부.value = '';
    _육안검사_외부_특이사항.value = '';
    _특이사항.value = '';

    _img1.src = '';
    _img2.src = '';
    _img3.src = '';
    _img4.src = '';
    _img5.src = '';
    _img6.src = '';
    _img7.src = '';
    _img8.src = '';
    _img9.src = '';
    _img10.src = '';
    _img11.src = '';
    _img12.src = '';
    _img13.src = '';
    _img14.src = '';
    _img15.src = '';

    var DateTime = luxon.DateTime;
    var seoul = DateTime.local().setZone('Asia/Seoul');
    var now = seoul.toString().slice(0, 19);

    _공정입고일.value = now;
  }

  _img1.ondblclick = function (evt) {
    _img1.src = '';
  };
  _img1.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img1);
    }
    evt.preventDefault();
  };

  _img2.ondblclick = function (evt) {
    _img2.src = '';
  };
  _img2.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img2);
    }
    evt.preventDefault();
  };

  _img3.ondblclick = function (evt) {
    _img3.src = '';
  };
  _img3.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img3);
    }
    evt.preventDefault();
  };

  _img4.ondblclick = function (evt) {
    _img4.src = '';
  };
  _img4.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img4);
    }
    evt.preventDefault();
  };

  _img5.ondblclick = function (evt) {
    _img5.src = '';
  };
  _img5.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img5);
    }
    evt.preventDefault();
  };

  _img6.ondblclick = function (evt) {
    _img6.src = '';
  };
  _img6.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img6);
    }
    evt.preventDefault();
  };

  _img7.ondblclick = function (evt) {
    _img7.src = '';
  };
  _img7.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img7);
    }
    evt.preventDefault();
  };

  _img8.ondblclick = function (evt) {
    _img8.src = '';
  };
  _img8.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img8);
    }
    evt.preventDefault();
  };

  _img9.ondblclick = function (evt) {
    _img9.src = '';
  };
  _img9.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img9);
    }
    evt.preventDefault();
  };

  _img10.ondblclick = function (evt) {
    _img10.src = '';
  };
  _img10.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img10);
    }
    evt.preventDefault();
  };

  _img11.ondblclick = function (evt) {
    _img11.src = '';
  };
  _img11.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img11);
    }
    evt.preventDefault();
  };

  _img12.ondblclick = function (evt) {
    _img12.src = '';
  };
  _img12.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img12);
    }
    evt.preventDefault();
  };

  _img13.ondblclick = function (evt) {
    _특이사항_box.src = '';
  };
  _img13.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img13);
    }
    evt.preventDefault();
  };

  _img14.ondblclick = function (evt) {
    _img14.src = '';
  };
  _img14.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img14);
    }
    evt.preventDefault();
  };

  _img15.ondblclick = function (evt) {
    _img15.src = '';
  };
  _img15.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img15);
    }
    evt.preventDefault();
  };

  _img1.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img2.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img3.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img4.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img5.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img6.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img7.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img8.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img9.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img10.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img11.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img12.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img13.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img14.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img15.ondragover = function (evt) {
    evt.preventDefault();
  };
}

async function 세척_save() {
  if (_management_id.value.length == 0) return;
  console.log('save: ', _management_id.value);

  var doc = JSON.parse(JSON.stringify(세척_doc));

  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString().slice(0, 19);

  if (_공정입고일.value == '') _공정입고일.value = now;
  if (_공정완료일.value == '') _공정완료일.value = now;
  //if (계정_stat.완료일수정 != 'o' || _공정완료일.value == "") _공정완료일.value = now;
  doc.관리번호 = _management_id.value.trim().toUpperCase();
  doc.재제조번호 = _재제조번호.value;
  doc.구분 = _구분.value;
  doc.차종 = _차종.value;
  doc.품번 = _품번.value;
  doc.RO_no = _RO_no.value;
  doc.공정입고일 = _공정입고일.value;
  doc.공정완료일 = _공정완료일.value;
  doc.어퍼케이스재사용가능 = _어퍼케이스재사용가능.value;
  doc.기밀검사_케이스 = _기밀검사_케이스.value;
  doc.기밀검사_케이스_특이사항 = _기밀검사_케이스_특이사항.value;
  doc.육안검사_외부 = _육안검사_외부.value;
  doc.육안검사_외부_특이사항 = _육안검사_외부_특이사항.value;
  doc.특이사항 = _특이사항.value;

  update(세척, doc);
  await delay();

  console.log(update_count);
  console.log(insert_count);

  if (update_count > 0) {
    alert('업데이트 되었습니다');
    변수저장(today_count);
  }

  if (insert_count > 0) {
    alert('저장 되었습니다');
    변수저장(today_count);
  }

  var _doc = {
    관리번호: _management_id.value.toUpperCase(),
    재제조번호: _재제조번호.value,
    세척투입일: _공정입고일.value,
    세척: _공정완료일.value,
  };

  update(BSA재제조, _doc);
  await delay();

  find(BSA재제조, _management_id.value);
  await delay();

  undefined_check(BSA재제조_v);

  await 공정단계자동입력(_management_id.value);

  var _pic_doc = JSON.parse(JSON.stringify(세척_pic_doc));
  _pic_doc.관리번호 = _management_id.value.trim().toUpperCase();
  _pic_doc.pic1 = _img1.src;
  _pic_doc.pic2 = _img2.src;
  _pic_doc.pic3 = _img3.src;
  _pic_doc.pic4 = _img4.src;
  _pic_doc.pic5 = _img5.src;
  _pic_doc.pic6 = _img6.src;
  _pic_doc.pic7 = _img7.src;
  _pic_doc.pic8 = _img8.src;
  _pic_doc.pic9 = _img9.src;
  _pic_doc.pic10 = _img10.src;
  _pic_doc.pic11 = _img11.src;
  _pic_doc.pic12 = _img12.src;
  _pic_doc.pic13 = _img13.src;
  _pic_doc.pic14 = _img14.src;
  _pic_doc.pic15 = _img15.src;

  update(세척_pic, _pic_doc);
  await delay();

  console.log('세척_pic_update:', update_count);
  console.log('세척_pic_insert:', insert_count);
  //이전페이지();
}

function _어퍼케이스재사용가능_콤보박스(e) {
  const value = e.value;

  document.getElementById('_어퍼케이스재사용가능').value = value;
}

function _기밀검사_케이스_콤보박스(e) {
  const value = e.value;

  document.getElementById('_기밀검사_케이스').value = value;
}

async function 세척_카메라시작() {
  if (관리번호 == '') return;
  await 세척_save();

  세척_사진촬영(관리번호);
}

function 세척_updateFilter() {
  var fieldEl = document.getElementById('filter-field');
  var typeEl = document.getElementById('filter-type');
  var valueEl = document.getElementById('filter-value');

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
    세척_list_table.setFilter(filter, typeVal, valueEl.value);
  }
}

var 세척_list_table;

async function 세척_list() {
  findOne_BSA재제조(BSA재제조, {
    공정단계: { $ne: '출하' },
    입고: { $ne: '' },
    세척: { $eq: '' },
    기초검사: { $eq: '' },
    분해조립: { $eq: '' },
    성능검사: { $eq: '' },
    EOL: { $eq: '' },
    소재지: { $nin: ['공정대기', '품질대기', '구장'] },
    완전분해: { $eq: '' },
    폐기: { $eq: '' },
    출하: { $eq: '' },
    구분: { $nin: ['일반기타', '보증기타'] },
  });
  await delay();

  if (BSA재제조_v != null) {
    find_BSA재제조(BSA재제조, {
      공정단계: { $ne: '출하' },
      입고: { $ne: '' },
      세척: { $eq: '' },
      기초검사: { $eq: '' },
      분해조립: { $eq: '' },
      성능검사: { $eq: '' },
      EOL: { $eq: '' },
      소재지: { $nin: ['공정대기', '품질대기', '구장'] },
      완전분해: { $eq: '' },
      폐기: { $eq: '' },
      출하: { $eq: '' },
      구분: { $nin: ['일반기타', '보증기타'] },
    });
    await delay();
  }
  세척_list_table = new Tabulator('#grid_list', {
    layout: 'resizableColumnFit',
    data: BSA재제조_v,
    height: '400px',

    columns: [
      { title: 'ID', field: '_id', sorter: 'string', width: '180' },
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '재제조번호', field: '재제조번호', sorter: 'string', width: '180' },
      { title: '구분', field: '구분', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
      { title: 'RO_no', field: 'RO_no', sorter: 'string', width: '180' },
      { title: '공정단계', field: '공정단계', sorter: 'string', width: '180' },
      { title: '소재지', field: '소재지', sorter: 'string', width: '180' },
      { title: '적재No', field: '적재No', sorter: 'string', visible: true, width: '180' }, //
      { title: '입고', field: '입고', sorter: 'string', visible: true, width: '180' }, //
      { title: '제조투입', field: '제조투입', sorter: 'string', visible: true, width: '180' }, //
      { title: '세척투입일', field: '세척투입일', sorter: 'string', width: '180' },
      { title: '세척', field: '세척', sorter: 'string', visible: true, width: '180' }, //
      { title: '기초검사투입일', field: '기초검사투입일', sorter: 'string', width: '180' },
      { title: '기초검사', field: '기초검사', sorter: 'string', visible: true, width: '180' }, //
      { title: '분해조립투입일', field: '분해조립투입일', sorter: 'string', width: '180' },
      { title: '분해조립', field: '분해조립', sorter: 'string', visible: true, width: '180' }, //
      { title: '성능검사투입일', field: '성능검사투입일', sorter: 'string', width: '180' },
      { title: '성능검사', field: '성능검사', sorter: 'string', visible: true, width: '180' }, //
      { title: 'EOL투입일', field: 'EOL투입일', sorter: 'string', width: '180' },
      { title: 'EOL', field: 'EOL', sorter: 'string', visible: true, width: '180' }, //
      { title: '출하검사', field: '출하검사', sorter: 'string', width: '180' },
      { title: '납품처', field: '납품처', sorter: 'string', width: '180' },
      { title: '출하', field: '출하', sorter: 'string', width: '180' },
      { title: '반품입고', field: '반품입고', sorter: 'string', width: '180' },
      { title: '재출하', field: '재출하', sorter: 'string', width: '180' },
      { title: '완전분해', field: '완전분해', sorter: 'string', width: '180' },
      { title: '완전분해사유', field: '완전분해사유', sorter: 'string', width: '180' },
      { title: '폐기', field: '폐기', sorter: 'string', width: '180' },
      { title: '폐기사유', field: '폐기사유', sorter: 'string', width: '180' },
      { title: '마지막충전일', field: '마지막충전일', sorter: 'string', width: '180' },
      { title: '출하예약', field: '출하예약', sorter: 'string', width: '180' },
      { title: '렉번호', field: '렉번호', sorter: 'string', width: '180' },
    ],
  });

  세척_list_table.on('rowClick', async function (e, row) {
    console.log('selected 관리번호: ', row.getData().관리번호);

    _management_id.value = row.getData().관리번호;

    await sleep(1);

    var yes = confirm('선택한 BSA로 세척 공정 정보입력을 시작하시겠습니까?');
    if (yes != true) return;

    세척_시작();
  });

  //Update filters on value change
  document.getElementById('filter-field').addEventListener('change', 세척_updateFilter);
  document.getElementById('filter-type').addEventListener('change', 세척_updateFilter);
  document.getElementById('filter-value').addEventListener('keyup', 세척_updateFilter);

  //Clear filters on "Clear Filters" button click
  document.getElementById('filter-clear').addEventListener('click', function () {
    var fieldEl = document.getElementById('filter-field');
    var typeEl = document.getElementById('filter-type');
    var valueEl = document.getElementById('filter-value');
    fieldEl.value = '';
    typeEl.value = '=';
    valueEl.value = '';

    세척_list_table.clearFilter();
  });
}

async function 변수저장(today_count) {
  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var year = seoul.toString().slice(0, 4);

  doc = JSON.parse(JSON.stringify(변수_doc));
  doc.구분 = 'mado_product_no';
  doc.값 = today_count;

  update(변수, doc);
  await delay();
}

function _육안검사외부_콤보박스(e) {
  const value = e.value;

  document.getElementById('_육안검사_외부').value = value;
}
