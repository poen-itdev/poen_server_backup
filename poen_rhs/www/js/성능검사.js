//업로드한 파일 리스트
var 성능검사_filelist = {
  f1: '',
  f2: '',
  f3: '',
  f4: '',
  f5: '',
  f6: '',
};
async function 성능검사_시작(is재제조 = 0) {
  if (typeof _management_id == 'undefined') {
    await sleep(DELAY);
    return;
  }

  if (flag_성능검사 == true) await 성능검사_list(); //성능검사 공정 대기 리스트
  flag_성능검사 = false;
  if (worker == '') return;

  fileUploading(); //파일 업로드관련 버튼들 속성 셋팅
  _btn_upload.disabled = false; //파일 업로드시 완료전까지 업로드 버튼 클릭 막음

  const form = document.querySelector('form'); //post 방식의 업로드
  //form.addEventListener('submit', handleSubmit);
  console.log('작업자:', 계정_stat.이름);
  _검사자.value = 계정_stat.이름;

  if (is재제조 == 0) {
    //관리번호로 조회
    if (_management_id.value.length == 0) return;

    find(BSA재제조, _management_id.value);
    await delay();
    if (BSA재제조_v != null) {
      _재제조번호.value = BSA재제조_v.재제조번호;
      _구분.value = BSA재제조_v.구분;
      _차종.value = BSA재제조_v.차종;
      _품번.value = BSA재제조_v.품번;
      _RO_no.value = BSA재제조_v.RO_no;
    } else {
      _재제조번호.value = '';
      _구분.value = '';
      _차종.value = '';
      _품번.value = '';
      _RO_no.value = '';
    }
  } else if (is재제조 == 1) {
    //재제조 번호로 조회
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
    //재제조번호로 조회
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

  //성능 검사 데이터 조회
  관리번호 = _management_id.value;
  find(성능검사, _management_id.value);
  await delay();

  if (성능검사_v != null) {
    _공정입고일.value = 성능검사_v.공정입고일;
    _용량평가.value = 성능검사_v.용량평가;
    _SOC60Percent.value = 성능검사_v.SOC60Percent;
    _DCIR.value = 성능검사_v.DCIR;
    _DCIR_Charge1.value = 성능검사_v.DCIR_Charge1;
    _DCIR_Charge2.value = 성능검사_v.DCIR_Charge2;
    _DCIR_Charge3.value = 성능검사_v.DCIR_Charge3;
    _DCIR_Charge4.value = 성능검사_v.DCIR_Charge4;
    _DCIR_Charge5.value = 성능검사_v.DCIR_Charge5;
    _DCIR_Charge6.value = 성능검사_v.DCIR_Charge6;

    VOLT1_result = 성능검사_v.VOLT1;
    VOLT2_result = 성능검사_v.VOLT2;
    VOLT3_result = 성능검사_v.VOLT3;
    VOLT4_result = 성능검사_v.VOLT4;
    VOLT5_result = 성능검사_v.VOLT5;
    VOLT6_result = 성능검사_v.VOLT6;
    VOLT7_result = 성능검사_v.VOLT7;
    VOLT8_result = 성능검사_v.VOLT8;
    VOLT9_result = 성능검사_v.VOLT9;
    VOLT10_result = 성능검사_v.VOLT10;
    VOLT11_result = 성능검사_v.VOLT11;
    VOLT12_result = 성능검사_v.VOLT12;

    CURR1_result = 성능검사_v.CURR1;
    CURR2_result = 성능검사_v.CURR2;
    CURR3_result = 성능검사_v.CURR3;
    CURR4_result = 성능검사_v.CURR4;
    CURR5_result = 성능검사_v.CURR5;
    CURR6_result = 성능검사_v.CURR6;

    _분해조립_재의뢰사유.value = 성능검사_v.분해조립_재의뢰사유;
    _공정완료일.value = 성능검사_v.공정완료일;
    _검사자.value = 성능검사_v.검사자;

    성능검사_filelist.f1 = 성능검사_v.f1;
    성능검사_filelist.f2 = 성능검사_v.f2;
    성능검사_filelist.f3 = 성능검사_v.f3;
    성능검사_filelist.f4 = 성능검사_v.f4;
    성능검사_filelist.f5 = 성능검사_v.f5;
    성능검사_filelist.f6 = 성능검사_v.f6;

    check_file();
    console.log(성능검사_v);
  } else {
    _공정입고일.value = '0000-00-00T00:00';
    _용량평가.value = '';
    _SOC60Percent.value = '';
    _DCIR.value = '';
    _DCIR_Charge1.value = '';
    _DCIR_Charge2.value = '';
    _DCIR_Charge3.value = '';

    VOLT1_result = '';
    VOLT2_result = '';
    VOLT3_result = '';
    VOLT4_result = '';
    VOLT5_result = '';
    VOLT6_result = '';
    VOLT7_result = '';
    VOLT8_result = '';
    VOLT9_result = '';
    VOLT10_result = '';
    VOLT11_result = '';
    VOLT12_result = '';

    CURR1_result = '';
    CURR2_result = '';
    CURR3_result = '';
    CURR4_result = '';
    CURR5_result = '';
    CURR6_result = '';

    _분해조립_재의뢰사유.value = '';
    _공정완료일.value = '0000-00-00T00:00';
    _검사자.value = 계정_stat.이름;

    var DateTime = luxon.DateTime;
    var seoul = DateTime.local().setZone('Asia/Seoul');
    var now = seoul.toString().slice(0, 19);

    _공정입고일.value = now;

    성능검사_filelist.f1 = '';
    성능검사_filelist.f2 = '';
    성능검사_filelist.f3 = '';
    성능검사_filelist.f4 = '';
    성능검사_filelist.f5 = '';
    성능검사_filelist.f6 = '';

    _file_exist1.style.backgroundColor = 'white';
    _file_exist2.style.backgroundColor = 'white';
    _file_exist3.style.backgroundColor = 'white';
    _file_exist4.style.backgroundColor = 'white';
    _file_exist5.style.backgroundColor = 'white';
    _file_exist6.style.backgroundColor = 'white';
  }
}

async function 성능검사_save() {
  if (worker == '') return;
  while (_management_id == undefined) {
    await sleep(DELAY);
  }
  if (_management_id.value.length == 0) return;
  console.log('save: ', _management_id.value);

  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString().slice(0, 19);

  if (_공정입고일.value == '') _공정입고일.value = now;
  if (_공정완료일.value == '') _공정완료일.value = now;
  //if (계정_stat.완료일수정 != 'o' || _공정완료일.value == "") _공정완료일.value = now;

  var doc = {};
  doc.관리번호 = _management_id.value.trim().toUpperCase();
  doc.구분 = _구분.value;
  doc.차종 = _차종.value;
  doc.품번 = _품번.value;
  doc.RO_no = _RO_no.value;
  doc.공정입고일 = _공정입고일.value;
  doc.용량평가 = _용량평가.value;
  doc.SOC60Percent = _SOC60Percent.value;
  doc.DCIR = _DCIR.value;
  doc.DCIR_Charge1 = _DCIR_Charge1.value;
  doc.DCIR_Charge2 = _DCIR_Charge2.value;
  doc.DCIR_Charge3 = _DCIR_Charge3.value;
  doc.DCIR_Charge4 = _DCIR_Charge4.value;
  doc.DCIR_Charge5 = _DCIR_Charge5.value;
  doc.DCIR_Charge6 = _DCIR_Charge6.value;
  doc.VOLT1 = VOLT1_result;
  doc.VOLT2 = VOLT2_result;
  doc.VOLT3 = VOLT3_result;
  doc.VOLT4 = VOLT4_result;
  doc.VOLT5 = VOLT5_result;
  doc.VOLT6 = VOLT6_result;
  doc.VOLT7 = VOLT7_result;
  doc.VOLT8 = VOLT8_result;
  doc.VOLT9 = VOLT9_result;
  doc.VOLT10 = VOLT10_result;
  doc.VOLT11 = VOLT11_result;
  doc.VOLT12 = VOLT12_result;
  doc.CURR1 = CURR1_result;
  doc.CURR2 = CURR2_result;
  doc.CURR3 = CURR3_result;
  doc.CURR4 = CURR4_result;
  doc.CURR5 = CURR5_result;
  doc.CURR6 = CURR6_result;
  doc.분해조립_재의뢰사유 = _분해조립_재의뢰사유.value;
  doc.공정완료일 = _공정완료일.value;
  if (level == '관리자') doc.공정완료일 = _공정완료일.value;
  doc.검사자 = _검사자.value;

  //차트 이미지를 저장(완료보고서에 쓰임)
  const canvas = document.getElementById('_chart');
  doc.chart = canvas.toDataURL();

  update(성능검사, doc);
  await delay();

  console.log(update_count);
  console.log(insert_count);

  if (insert_count > 0) {
    alert('저장 되었습니다');
  } else if (update_count > 0) {
    alert('업데이트 되었습니다');
  }

  var update_cnt = update_count;
  var insert_cnt = insert_count;

  //기본정보에 성능검사 작업 일자 등록
  var doc = {};
  doc.관리번호 = _management_id.value;
  doc.성능검사투입일 = _공정입고일.value;
  doc.성능검사 = _공정완료일.value;

  update(BSA재제조, doc);
  await delay();

  find(BSA재제조, _management_id.value);
  await delay();

  undefined_check(BSA재제조_v);

  //공정단계를 EOL로 넘김
  await 공정단계자동입력(_management_id.value);
  //이전페이지();
}

async function file_upload() {
  _btn_upload.disabled = true;
  _process.style.color = 'red';
  _process.innerHTML = '파일 업로드 중입니다.';

  //_form.submit();
  _file_upload();

  await sleep(1000 * 20);

  _send_filelist();
  _btn_upload.disabled = false;
  _process.style.color = 'blue';
  _process.innerHTML = '파일 업로드 완료하였습니다.';
}

function 성능검사_updateFilter() {
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
    성능검사_list_table.setFilter(filter, typeVal, valueEl.value);
  }
}

var 성능검사_list_table;
async function 성능검사_list() {
  findOne_BSA재제조(BSA재제조, { 공정단계: { $ne: '출하' }, 분해조립: { $ne: '' }, 성능검사: { $eq: '' }, EOL: { $eq: '' }, 소재지: { $nin: ['공정대기', '품질대기', '구장'] }, 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 출하: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } });
  await delay();

  if (BSA재제조_v != null) {
    find_BSA재제조(BSA재제조, { 공정단계: { $ne: '출하' }, 분해조립: { $ne: '' }, 성능검사: { $eq: '' }, EOL: { $eq: '' }, 소재지: { $nin: ['공정대기', '품질대기', '구장'] }, 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 출하: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } });
    await delay();
  }

  성능검사_list_table = new Tabulator('#grid_list', {
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

  성능검사_list_table.on('rowClick', async function (e, row) {
    console.log('selected 관리번호: ', row.getData().관리번호);

    _management_id.value = row.getData().관리번호;

    await sleep(1);

    var yes = confirm('선택한 BSA로 성능검사 공정 정보입력을 시작하시겠습니까?');
    if (yes != true) return;

    성능검사_시작();
  });

  //Update filters on value change
  document.getElementById('filter-field').addEventListener('change', 성능검사_updateFilter);
  document.getElementById('filter-type').addEventListener('change', 성능검사_updateFilter);
  document.getElementById('filter-value').addEventListener('keyup', 성능검사_updateFilter);

  //Clear filters on "Clear Filters" button click
  document.getElementById('filter-clear').addEventListener('click', function () {
    var fieldEl = document.getElementById('filter-field');
    var typeEl = document.getElementById('filter-type');
    var valueEl = document.getElementById('filter-value');
    fieldEl.value = '';
    typeEl.value = '=';
    valueEl.value = '';

    성능검사_list_table.clearFilter();
  });
}

//POST방식으로 파일 업로드(form 태그 영역 내에 input 태그가 영향을 받음)
async function _file_upload() {
  //console.log('submit event:', event);
  //event.preventDefault();
  //const form = event.currentTarget;
  const url = new URL(_form.action);
  const formData = new FormData(_form);
  const searchParams = new URLSearchParams(formData);

  $.ajax({
    type: 'POST',
    async: true,
    cache: false,
    timeout: 3000,
    processData: false,
    contentType: false,
    enctype: 'multipart/form-data',
    url: url,
    data: formData,
    dataType: 'file',
    success: function (data) {
      console.log('success');
    },
  });
}

//파일 업로드 input 태그 및 다운로드 버튼 UI 셋팅
function fileUploading() {
  var fileUploadSets = document.querySelectorAll('.process__file');

  fileUploadSets.forEach(function (fileUploadSet) {
    var downloadFileBtn = fileUploadSet.querySelector('.in-file');
    var fileInput = fileUploadSet.querySelector('.file_upload');
    var deleteButton = fileUploadSet.querySelector('.delete_icon');
    var uploadLabel = fileUploadSet.querySelector('.upload_label');

    function updateUpload() {
      if (fileInput.files.length > 0) {
        var fileNames = '';
        for (var i = 0; i < fileInput.files.length; i++) {
          fileNames += fileInput.files[i].name + ', ';
        }
        uploadLabel.textContent = fileNames.slice(0, -6);
        uploadLabel.style.backgroundColor = '#11a85f';
        uploadLabel.style.color = 'white';
        deleteButton.style.display = 'inline';
        downloadFileBtn.style.display = 'block';
      } else {
        // uploadLabel.textContent = "파일 선택";
        uploadLabel.innerHTML = "<i class='fa-regular fa-file'></i>&nbsp; 파일 선택";
        uploadLabel.style.backgroundColor = 'initial';
        uploadLabel.style.color = '#11a85f';
        deleteButton.style.display = 'none';
      }
    }

    downloadFileBtn.style.display = 'block';

    fileInput.addEventListener('change', function () {
      updateUpload();
    });

    // 삭제 버튼(click) 이벤트 처리
    deleteButton.addEventListener('click', function () {
      fileInput.value = '';
      updateUpload();
      deleteButton.style.display = 'none';
      //downloadFileBtn.style.display = "none";
    });

    // 드래그 앤 드롭 이벤트 처리
    fileUploadSet.addEventListener('dragover', function (event) {
      event.preventDefault();
      fileUploadSet.classList.add('dragover');
    });

    fileUploadSet.addEventListener('dragenter', function (event) {
      event.preventDefault();
      fileUploadSet.classList.add('dragover');
    });

    fileUploadSet.addEventListener('dragleave', function (event) {
      event.preventDefault();
      fileUploadSet.classList.remove('dragover');
    });

    fileUploadSet.addEventListener('drop', function (event) {
      event.preventDefault();
      fileUploadSet.classList.remove('dragover');

      var files = event.dataTransfer.files;
      if (files.length > 0) {
        fileInput.files = files;
        var fileNames = '';
        for (var i = 0; i < files.length; i++) {
          fileNames += files[i].name + ', ';
        }
        updateUpload();
      }
    });
  });
}

async function _send_filelist() {
  var filelist = {
    관리번호: 관리번호,
  };
  if (_file1.files[0] == undefined || _file1.files[0] == null) filelist.f1 = '';
  else filelist.f1 = _file1.files[0].name;
  if (_file2.files[0] == undefined || _file2.files[0] == null) filelist.f2 = '';
  else filelist.f2 = _file2.files[0].name;
  if (_file3.files[0] == undefined || _file3.files[0] == null) filelist.f3 = '';
  else filelist.f3 = _file3.files[0].name;
  if (_file4.files[0] == undefined || _file4.files[0] == null) filelist.f4 = '';
  else filelist.f4 = _file4.files[0].name;
  if (_file5.files[0] == undefined || _file5.files[0] == null) filelist.f5 = '';
  else filelist.f5 = _file5.files[0].name;
  if (_file6.files[0] == undefined || _file6.files[0] == null) filelist.f6 = '';
  else filelist.f6 = _file6.files[0].name;

  console.log(filelist);

  send_list(filelist); //파일 리스트를 서버로 보냄
  await delay();

  //성능검사 file1~6 별 업로드 유무를 저장
  var doc = {};
  doc.관리번호 = 관리번호;
  if (성능검사_filelist.f1 == '' || 성능검사_filelist.f1 == undefined) doc.f1 = filelist.f1;
  if (성능검사_filelist.f2 == '' || 성능검사_filelist.f2 == undefined) doc.f2 = filelist.f2;
  if (성능검사_filelist.f3 == '' || 성능검사_filelist.f3 == undefined) doc.f3 = filelist.f3;
  if (성능검사_filelist.f4 == '' || 성능검사_filelist.f4 == undefined) doc.f4 = filelist.f4;
  if (성능검사_filelist.f5 == '' || 성능검사_filelist.f5 == undefined) doc.f5 = filelist.f5;
  if (성능검사_filelist.f6 == '' || 성능검사_filelist.f6 == undefined) doc.f6 = filelist.f6;

  console.log('update 성능검사 doc:', doc);
  update(성능검사, doc);
  await delay();

  check_file();
}

//다운로드 버튼 처리
function download1() {
  관리번호 = _management_id.value;
  console.log('download file 1');
  const a = document.createElement('a');
  a.download = 'file1.csv';
  const tmp_name = 관리번호.replace('#', '');
  a.href = 'excel/' + tmp_name + '/excel1.csv';
  console.log(a.href);
  a.click();
}

function download2() {
  관리번호 = _management_id.value;
  const a = document.createElement('a');
  a.download = 'file2.csv';
  const tmp_name = 관리번호.replace('#', '');
  a.href = 'excel/' + tmp_name + '/excel2.csv';
  a.click();
}

function download3() {
  const a = document.createElement('a');
  a.download = 'file3.csv';
  const tmp_name = 관리번호.replace('#', '');
  a.href = 'excel/' + tmp_name + '/excel3.csv';
  a.click();
}

function download4() {
  const a = document.createElement('a');
  a.download = 'file4.csv';
  const tmp_name = 관리번호.replace('#', '');
  a.href = 'excel/' + tmp_name + '/excel4.csv';
  a.click();
}

function download5() {
  const a = document.createElement('a');
  a.download = 'file5.csv';
  const tmp_name = 관리번호.replace('#', '');
  a.href = 'excel/' + tmp_name + '/excel5.csv';
  a.click();
}

function download6() {
  const a = document.createElement('a');
  a.download = 'file6.csv';
  const tmp_name = 관리번호.replace('#', '');
  a.href = 'excel/' + tmp_name + '/excel6.csv';
  a.click();
}

async function 성능검사_분해조립재의뢰() {
  doc = {
    관리번호: 관리번호,
    분해조립: '',
    성능검사: '',
    공정단계: '분해조립',
  };
  update(BSA재제조, doc);
  await delay();

  이전페이지();
}

//업로드된 파일이 있는 부분은 노란색으로 처리, 파일에서 data 추출하고 그래프 처리
async function check_file() {
  find(성능검사, 관리번호);
  await delay();

  const v = 성능검사_v;
  const yes = confirm('파일에서 DATA를 추출 하시겠습니까?');
  console.log('start check file:', v);
  var flag_용량평가 = false;
  var flag_SOC = false;
  var flag_DCIR = false;
  if (v.f1 != '' && v.f1 != undefined && v.f1 != null) {
    _file_exist1.style.backgroundColor = 'yellow';
    if (yes == true) await read_용량평가();
    flag_용량평가 = true;
  } else {
    _file_exist1.style.backgroundColor = 'white';
  }
  if (v.f2 != '' && v.f2 != undefined && v.f2 != null) {
    _file_exist2.style.backgroundColor = 'yellow';
  } else {
    _file_exist2.style.backgroundColor = 'white';
  }
  if (v.f3 != '' && v.f3 != undefined && v.f3 != null) {
    _file_exist3.style.backgroundColor = 'yellow';
    if (yes == true) await read_SOC60Percent();
    flag_SOC = true;
  } else {
    _file_exist3.style.backgroundColor = 'white';
  }
  if (v.f4 != '' && v.f4 != undefined && v.f4 != null) {
    _file_exist4.style.backgroundColor = 'yellow';
  } else {
    _file_exist4.style.backgroundColor = 'white';
  }
  if (v.f5 != '' && v.f5 != undefined && v.f5 != null) {
    _file_exist5.style.backgroundColor = 'yellow';
    if (yes == true) await read_DCIR();
    flag_DCIR = true;
  } else {
    _file_exist5.style.backgroundColor = 'white';
  }
  if (v.f6 != '' && v.f6 != undefined) {
    _file_exist6.style.backgroundColor = 'yellow';
  } else {
    _file_exist6.style.backgroundColor = 'white';
  }

  //성능검사_save();

  if (flag_용량평가 == true) {
    console.log('그래프 그리기');
    read_data();
  }
}

async function chartDraw(data) {
  const canvas = document.getElementById('_chart');

  if (_chart != undefined) {
    _chart.destroy();
  }

  const labels = data.map((d) => d.time);
  _chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Volt',
          data: data.map((d) => d.volt),
          borderColor: 'red',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          yAxisID: 'y1',
          borderWidth: 1,
          pointRadius: 0,
        },
        {
          label: 'Curr',
          data: data.map((d) => d.curr),
          borderColor: 'green',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          yAxisID: 'y2',
          borderWidth: 1,
          pointRadius: 0,
        },
        {
          label: 'Cap',
          data: data.map((d) => d.cap),
          borderColor: 'blue',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          yAxisID: 'y3',
          borderWidth: 1,
          pointRadius: 0,
        },
      ],
    },
  });
}

async function read_용량평가() {
  const tmp_name = 관리번호.replace('#', '');
  const path = 'excel/' + tmp_name + '/excel1.csv';

  용량평가(path);
  await delay();

  _용량평가.value = Number(용량평가_result).toFixed(2);

  console.log('용량평가 result:', 용량평가_result);
}

async function read_SOC60Percent() {
  const tmp_name = 관리번호.replace('#', '');
  const path = 'excel/' + tmp_name + '/excel3.csv';

  SOC60Percent(path);
  await delay();

  _SOC60Percent.value = Number(SOC60Percent_result).toFixed(2);

  console.log('SOC60Percent result:', SOC60Percent_result);
}

async function read_DCIR() {
  const tmp_name = 관리번호.replace('#', '');
  const path = 'excel/' + tmp_name + '/excel5.csv';

  DCIR(path); //서버에 저장된 파일에서 DCIR 데이터 추출 요청
  await delay();

  _DCIR.value = Number(DCIR_result).toFixed(2);
  _DCIR_Charge1.value = Number(DCIR1_result).toFixed(2);
  _DCIR_Charge2.value = Number(DCIR2_result).toFixed(2);
  _DCIR_Charge3.value = Number(DCIR3_result).toFixed(2);
  _DCIR_Charge4.value = Number(DCIR4_result).toFixed(2);
  _DCIR_Charge5.value = Number(DCIR5_result).toFixed(2);
  _DCIR_Charge6.value = Number(DCIR6_result).toFixed(2);

  VOLT1_result = Number(VOLT1_result).toFixed(2);
  VOLT2_result = Number(VOLT2_result).toFixed(2);
  VOLT3_result = Number(VOLT3_result).toFixed(2);
  VOLT4_result = Number(VOLT4_result).toFixed(2);
  VOLT5_result = Number(VOLT5_result).toFixed(2);
  VOLT6_result = Number(VOLT6_result).toFixed(2);
  VOLT7_result = Number(VOLT7_result).toFixed(2);
  VOLT8_result = Number(VOLT8_result).toFixed(2);
  VOLT9_result = Number(VOLT9_result).toFixed(2);
  VOLT10_result = Number(VOLT10_result).toFixed(2);
  VOLT11_result = Number(VOLT11_result).toFixed(2);
  VOLT12_result = Number(VOLT12_result).toFixed(2);

  CURR1_result = Number(CURR1_result).toFixed(2);
  CURR2_result = Number(CURR2_result).toFixed(2);
  CURR3_result = Number(CURR3_result).toFixed(2);
  CURR4_result = Number(CURR4_result).toFixed(2);
  CURR5_result = Number(CURR5_result).toFixed(2);
  CURR6_result = Number(CURR6_result).toFixed(2);

  console.log('DCIR result:', DCIR_result, DCIR1_result, DCIR2_result, DCIR3_result, DCIR4_result, DCIR5_result, DCIR6_result);
}

//그래프 그리는 부분
async function read_data() {
  const tmp_name = 관리번호.replace('#', '');
  const path = 'excel/' + tmp_name + '/excel1.csv';

  console.log('path:', path);
  get_성능검사_data(path); //서버에 성능검사 data 요청
  await delay();

  chartDraw(성능검사_data_result); //그래프 그림
  //console.log('get 성능검사 data result:', 성능검사_data_result);
}
