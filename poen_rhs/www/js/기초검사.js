var 기초검사_DTC_count = 0; //MAX 10

async function 기초검사_시작(is재제조 = 0) {
  while (typeof _management_id == 'undefined') {
    await sleep(DELAY);
  }

  //기초검사 공정 대기 list
  if (flag_기초검사 == true) await 기초검사_list();
  flag_기초검사 = false;

  console.log('DTC count:', 기초검사_DTC_count);

  //DTC 입력란 갯수를 초기화하여 화면 구성
  _기초검사_delete_all();
  기초검사_DTC_count = 0;

  if (_management_id.value.length == 0) _management_id.value = 관리번호;
  if (is재제조 == 0) {
    //관리자 번호로 조회
    if (_management_id.value.length == 0) return;

    관리번호 = _management_id.value;
    find(BSA재제조, _management_id.value);
    await delay();
    if (BSA재제조_v != null) {
      _재제조번호.value = BSA재제조_v.재제조번호;
      _구분.value = BSA재제조_v.구분;
      _차종.value = BSA재제조_v.차종;
      _품번.value = BSA재제조_v.품번;
      _RO_no.value = BSA재제조_v.RO_no;
      관리번호 = _management_id.value;

      차종 = BSA재제조_v.차종;
    } else {
      _재제조번호.value = '';
      _구분.value = '';
      _차종.value = '';
      _품번.value = '';
      _RO_no.value = '';

      차종 = '';
    }
  } else if (is재제조 == 1) {
    //재제조번호로 조회
    if (_재제조번호.value.length == 0) return;

    findOne_BSA재제조(BSA재제조, { 재제조번호: _재제조번호.value });
    await delay();

    if (BSA재제조_v != null) {
      _management_id.value = BSA재제조_v.관리번호;
      _구분.value = BSA재제조_v.구분;
      _차종.value = BSA재제조_v.차종;
      _품번.value = BSA재제조_v.품번;
      _RO_no.value = BSA재제조_v.RO_no;
      관리번호 = _management_id.value;

      차종 = BSA재제조_v.차종;
    } else {
      _management_id.value = '';
      _구분.value = '';
      _차종.value = '';
      _품번.value = '';
      _RO_no.value = '';

      차종 = '';
    }
  } else if (is재제조 == 2) {
    //RO번호로 조회
    if (_RO_no.value.length == 0) return;

    findOne_BSA재제조(BSA재제조, { RO_no: _RO_no.value });
    await delay();

    if (BSA재제조_v != null) {
      _management_id.value = BSA재제조_v.관리번호;
      _재제조번호.value = BSA재제조_v.재제조번호;
      _구분.value = BSA재제조_v.구분;
      _차종.value = BSA재제조_v.차종;
      _품번.value = BSA재제조_v.품번;
      관리번호 = _management_id.value;

      차종 = BSA재제조_v.차종;
    } else {
      _management_id.value = '';
      _재제조번호.value = '';
      _구분.value = '';
      _차종.value = '';
      _품번.value = '';

      차종 = '';
    }
  }

  console.log('load: ', _management_id.value);

  //관리자 번호로 기초검사 항목 조회
  find(기초검사, _management_id.value);
  await delay();
  if (기초검사_v != null) {
    //데이터 로딩
    _공정입고일.value = 기초검사_v.공정입고일;
    _RO_no.value = 기초검사_v.RO_no;
    _VIN.value = 기초검사_v.VIN;
    _QRCode.value = 기초검사_v.QRcode;
    _주행거리.value = 기초검사_v.주행거리;
    _차량번호.value = 기초검사_v.차량번호;
    _육안검사_내부.value = 기초검사_v.육안검사_내부;
    _육안검사_내부_특이사항.value = 기초검사_v.육안검사_내부_특이사항;
    _기밀검사_냉각유로.value = 기초검사_v.기밀검사_냉각유로;
    _기밀검사_냉각유로_특이사항.value = 기초검사_v.기밀검사_냉각유로_특이사항;
    _절연검사P판정.value = 기초검사_v.절연검사_Plus판정;
    _절연검사P.value = 기초검사_v.절연검사_Plus;
    _절연검사N판정.value = 기초검사_v.절연검사_Minus판정;
    _절연검사N.value = 기초검사_v.절연검사_Minus;
    _센서데이터진단.value = 기초검사_v.센서데이터진단;
    _센서데이터진단_판정.value = 기초검사_v.센서데이터진단_판정;

    if (기초검사_v.통신검사_DTC코드1 != '' && 기초검사_v.통신검사_DTC코드1 != 'udefined') {
      _기초검사_add_DTC_Code();
      _통신검사_DTC코드1.value = 기초검사_v.통신검사_DTC코드1;
    }

    if (기초검사_v.통신검사_DTC코드2 != '' && 기초검사_v.통신검사_DTC코드2 != 'udefined') {
      _기초검사_add_DTC_Code();
      _통신검사_DTC코드2.value = 기초검사_v.통신검사_DTC코드2;
    }

    if (기초검사_v.통신검사_DTC코드3 != '' && 기초검사_v.통신검사_DTC코드3 != 'udefined') {
      _기초검사_add_DTC_Code();
      _통신검사_DTC코드3.value = 기초검사_v.통신검사_DTC코드3;
    }

    if (기초검사_v.통신검사_DTC코드4 != '' && 기초검사_v.통신검사_DTC코드4 != 'udefined') {
      _기초검사_add_DTC_Code();
      _통신검사_DTC코드4.value = 기초검사_v.통신검사_DTC코드4;
    }

    if (기초검사_v.통신검사_DTC코드5 != '' && 기초검사_v.통신검사_DTC코드5 != 'udefined') {
      _기초검사_add_DTC_Code();
      _통신검사_DTC코드5.value = 기초검사_v.통신검사_DTC코드5;
    }

    if (기초검사_v.통신검사_DTC코드6 != '' && 기초검사_v.통신검사_DTC코드6 != 'udefined') {
      _기초검사_add_DTC_Code();
      _통신검사_DTC코드6.value = 기초검사_v.통신검사_DTC코드6;
    }

    if (기초검사_v.통신검사_DTC코드7 != '' && 기초검사_v.통신검사_DTC코드7 != 'udefined') {
      _기초검사_add_DTC_Code();
      _통신검사_DTC코드7.value = 기초검사_v.통신검사_DTC코드7;
    }

    if (기초검사_v.통신검사_DTC코드8 != '' && 기초검사_v.통신검사_DTC코드8 != 'udefined') {
      _기초검사_add_DTC_Code();
      _통신검사_DTC코드8.value = 기초검사_v.통신검사_DTC코드8;
    }

    if (기초검사_v.통신검사_DTC코드9 != '' && 기초검사_v.통신검사_DTC코드9 != 'udefined') {
      _기초검사_add_DTC_Code();
      _통신검사_DTC코드9.value = 기초검사_v.통신검사_DTC코드9;
    }

    if (기초검사_v.통신검사_DTC코드10 != '' && 기초검사_v.통신검사_DTC코드10 != 'udefined') {
      _기초검사_add_DTC_Code();
      _통신검사_DTC코드10.value = 기초검사_v.통신검사_DTC코드10;
    }

    _통신검사_팩전압.value = 기초검사_v.통신검사_팩전압;
    _통신검사_팩전압판정.value = 기초검사_v.통신검사_팩전압판정;
    _통신검사_셀전압편차.value = 기초검사_v.통신검사_셀전압편차;
    _통신검사_셀전압편차판정.value = 기초검사_v.통신검사_셀전압편차판정;
    _통신검사_릴레이구동.value = 기초검사_v.통신검사_릴레이구동;
    _통신검사_릴레이구동사유.value = 기초검사_v.통신검사_릴레이구동사유;
    _BSA생산일자.value = 기초검사_v.BSA생산일자;
    _BSA판매일자.value = 기초검사_v.BSA판매일자;
    _BSA수리일자.value = 기초검사_v.BSA수리일자;
    _BMA_ROM_ID.value = 기초검사_v.BMA_ROM_ID;
    _공정완료일.value = 기초검사_v.공정완료일;
    _분석결과.value = 기초검사_v.분석결과;
    _비고.value = 기초검사_v.비고;
    _센터진단내용.value = 기초검사_v.센터진단내용;
    _필드현상.value = 기초검사_v.필드현상;
    _AS센터조치.value = 기초검사_v.AS센터조치;
    _검사자.value = 기초검사_v.검사자;

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

    //이미지 로딩
    find(기초검사_pic1, _management_id.value);
    await delay();

    if (기초검사_pic1_v != null) {
      _img1.src = 기초검사_pic1_v.pic1;
      _img2.src = 기초검사_pic1_v.pic2;
      _img3.src = 기초검사_pic1_v.pic3;
      _img4.src = 기초검사_pic1_v.pic4;
      _img5.src = 기초검사_pic1_v.pic5;
      _img6.src = 기초검사_pic1_v.pic6;
      _img7.src = 기초검사_pic1_v.pic7;
      _img8.src = 기초검사_pic1_v.pic8;
      _img9.src = 기초검사_pic1_v.pic9;
      _img10.src = 기초검사_pic1_v.pic10;
    }
    _img11.src = '';
    //_img12.sr = ''; //안쓰임
    _img13.src = '';
    _img14.src = '';
    _img15.src = '';
    _img16.src = '';
    _img17.src = '';
    _img18.src = '';
    _img19.src = '';
    _img20.src = '';
    _img21.src = '';

    find(기초검사_pic2, _management_id.value);
    await delay();

    if (기초검사_pic2_v != null) {
      _img11.src = 기초검사_pic2_v.pic1;
      //_img12.src = 기초검사_pic2_v.pic11;
      _img13.src = 기초검사_pic2_v.pic2;
      _img14.src = 기초검사_pic2_v.pic3;
      _img15.src = 기초검사_pic2_v.pic4;
      _img16.src = 기초검사_pic2_v.pic5;
      _img17.src = 기초검사_pic2_v.pic6;
      _img18.src = 기초검사_pic2_v.pic7;
      _img19.src = 기초검사_pic2_v.pic8;
      _img20.src = 기초검사_pic2_v.pic9;
      _img21.src = 기초검사_pic2_v.pic10;
    }
  } else {
    //기존에 없던 관리번호이면 항목들 데이터 초기화
    _공정입고일.value = '0000-00-00T00:00';
    _VIN.value = '';
    _QRCode.value = '';
    _주행거리.value = '';
    _차량번호.value = '';
    _육안검사_내부.value = '';
    _육안검사_내부_특이사항.value = '';
    _기밀검사_냉각유로.value = '';
    _기밀검사_냉각유로_특이사항.value = '';
    _절연검사P판정.value = '';
    _절연검사P.value = '';
    _절연검사N판정.value = '';
    _절연검사N.value = '';
    _센서데이터진단.value = '';
    _센서데이터진단_판정.value = '';
    _통신검사_팩전압.value = '';
    _통신검사_팩전압판정.value = '';
    _통신검사_셀전압편차.value = '';
    _통신검사_셀전압편차판정.value = '';
    _통신검사_릴레이구동.value = '';
    _통신검사_릴레이구동사유.value = '';
    _BSA생산일자.value = '';
    _BSA판매일자.value = '';
    _BSA수리일자.value = '';
    _BMA_ROM_ID.value = '';
    //_고장현상코드.value = '';
    //_고장현상명.value = '';
    //_문제Cell_No.value = '';
    //_문제BMA_No.value = '';
    //_문제BMA_cnt.value = '';
    _공정완료일.value = '0000-00-00T00:00';
    _분석결과.value = '';
    _비고.value = '';
    _센터진단내용.value = '';
    _필드현상.value = '';
    _AS센터조치.value = '';
    _검사자.value = 계정_stat.이름;

    var DateTime = luxon.DateTime;
    var seoul = DateTime.local().setZone('Asia/Seoul');
    var now = seoul.toString().slice(0, 19);

    _공정입고일.value = now;

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
    //_img12.src = "";
    _img13.src = '';
    _img14.src = '';
    _img15.src = '';
    _img16.src = '';
    _img17.src = '';
    _img18.src = '';
    _img19.src = '';
    _img20.src = '';
    _img21.src = '';
  }

  //더블 클릭시 이미지 지움
  _img1.ondblclick = function (evt) {
    _img1.src = '';
  };

  //드래그 앤 드롭으로 넣기
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

  //_img12.ondrop = function (evt) {
  //	var files = evt.dataTransfer?.files;
  //	if (files.length > 0) {
  //		console.log("drag & drop");
  //            resize_pic(files[0], _img12);
  //	}
  //	evt.preventDefault();
  //};

  _img13.ondblclick = function (evt) {
    _img13.src = '';
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

  _img16.ondblclick = function (evt) {
    _img16.src = '';
  };
  _img16.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img16);
    }
    evt.preventDefault();
  };

  _img17.ondblclick = function (evt) {
    _img17.src = '';
  };
  _img17.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img17);
    }
    evt.preventDefault();
  };

  _img18.ondblclick = function (evt) {
    _img18.src = '';
  };
  _img18.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img18);
    }
    evt.preventDefault();
  };

  _img19.ondblclick = function (evt) {
    _img19.src = '';
  };
  _img19.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img19, true);
    }
    evt.preventDefault();
  };

  _img20.ondblclick = function (evt) {
    _img20.src = '';
  };
  _img20.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img20);
    }
    evt.preventDefault();
  };

  _img21.ondblclick = function (evt) {
    _img21.src = '';
  };
  _img21.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img21);
    }
    evt.preventDefault();
  };

  _img1.ondragover = function (evt) {
    evt.preventDefault();
    console.log('dragover!');
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

  //_img12.ondragover = function (evt) {
  //	evt.preventDefault();
  //};

  _img13.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img14.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img15.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img16.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img17.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img18.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img19.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img20.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img21.ondragover = function (evt) {
    evt.preventDefault();
  };
}

function 기초검사_save() {
  기초검사_SAVE();

  //이전페이지();
}

async function 기초검사_SAVE() {
  var progress = document.getElementById('progress');
  if (_management_id.value.length == 0) return;
  console.log('save: ', _management_id.value);

  관리번호 = _management_id.value.trim().toUpperCase();

  if (_RO_no.value.length != 17 && _RO_no.value.length != 0) {
    var cnt = (_RO_no.value.match(/-/g) || []).length;
    if (_RO_no.value.length - cnt != 17) {
      alert('Ro 번호 자릴수가 다릅니다.(17)');
      return;
    }
  }

  if (_RO_no.value.length == 0) {
    alert('RO 번호가 입력되지 않았습니다.');
  }

  if (_VIN.value.length != 17 && _VIN.value.length != 0) {
    var cnt = (_VIN.value.match(/-/g) || []).length;
    if (_VIN.value.length - cnt != 17) {
      alert('VIN이 자릿수가 다릅니다.(17)');
      return;
    }
  }

  if (_VIN.value.length == 0) {
    alert('VIN 번호가 입력되지 않았습니다.');
  }

  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString().slice(0, 19);

  if (_공정입고일.value == '') _공정입고일.value = now;
  if (_공정완료일.value == '') _공정완료일.value = now;
  //if (계정_stat.완료일수정 != 'o' || _공정완료일.value == "") _공정완료일.value = now;

  var doc = JSON.parse(JSON.stringify(기초검사_doc));
  doc.관리번호 = _management_id.value.trim().toUpperCase();
  doc.구분 = _구분.value;
  doc.차종 = _차종.value;
  doc.품번 = _품번.value;
  doc.RO_no = _RO_no.value;
  doc.공정입고일 = _공정입고일.value;
  doc.VIN = _VIN.value;
  doc.QRcode = _QRCode.value;
  doc.주행거리 = _주행거리.value;
  doc.차량번호 = _차량번호.value;
  doc.육안검사_내부 = _육안검사_내부.value;
  doc.육안검사_내부_특이사항 = _육안검사_내부_특이사항.value;
  doc.기밀검사_냉각유로 = _기밀검사_냉각유로.value;
  doc.기밀검사_냉각유로_특이사항 = _기밀검사_냉각유로_특이사항.value;
  doc.절연검사_Plus판정 = _절연검사P판정.value;
  doc.절연검사_Plus = _절연검사P.value;
  doc.절연검사_Minus판정 = _절연검사N판정.value;
  doc.절연검사_Minus = _절연검사N.value;
  doc.센서데이터진단 = _센서데이터진단.value;
  doc.센서데이터진단_판정 = _센서데이터진단_판정.value;
  var oCurrentRow;
  var tb = document.getElementById('tb');
  var rowIcnt = tb.rows.length - 17;
  var code_no = rowIcnt - 22;
  console.log('save rowIcnt:', rowIcnt);
  console.log('save code_no:', code_no);

  progress.value = 10;

  if (code_no == 10) {
    doc.통신검사_DTC코드1 = _통신검사_DTC코드1.value;
    doc.통신검사_DTC코드2 = _통신검사_DTC코드2.value;
    doc.통신검사_DTC코드3 = _통신검사_DTC코드3.value;
    doc.통신검사_DTC코드4 = _통신검사_DTC코드4.value;
    doc.통신검사_DTC코드5 = _통신검사_DTC코드5.value;
    doc.통신검사_DTC코드6 = _통신검사_DTC코드6.value;
    doc.통신검사_DTC코드7 = _통신검사_DTC코드7.value;
    doc.통신검사_DTC코드8 = _통신검사_DTC코드8.value;
    doc.통신검사_DTC코드9 = _통신검사_DTC코드9.value;
    doc.통신검사_DTC코드10 = _통신검사_DTC코드10.value;
  } else if (code_no == 9) {
    doc.통신검사_DTC코드1 = _통신검사_DTC코드1.value;
    doc.통신검사_DTC코드2 = _통신검사_DTC코드2.value;
    doc.통신검사_DTC코드3 = _통신검사_DTC코드3.value;
    doc.통신검사_DTC코드4 = _통신검사_DTC코드4.value;
    doc.통신검사_DTC코드5 = _통신검사_DTC코드5.value;
    doc.통신검사_DTC코드6 = _통신검사_DTC코드6.value;
    doc.통신검사_DTC코드7 = _통신검사_DTC코드7.value;
    doc.통신검사_DTC코드8 = _통신검사_DTC코드8.value;
    doc.통신검사_DTC코드9 = _통신검사_DTC코드9.value;
    doc.통신검사_DTC코드10 = '';
  } else if (code_no == 8) {
    doc.통신검사_DTC코드1 = _통신검사_DTC코드1.value;
    doc.통신검사_DTC코드2 = _통신검사_DTC코드2.value;
    doc.통신검사_DTC코드3 = _통신검사_DTC코드3.value;
    doc.통신검사_DTC코드4 = _통신검사_DTC코드4.value;
    doc.통신검사_DTC코드5 = _통신검사_DTC코드5.value;
    doc.통신검사_DTC코드6 = _통신검사_DTC코드6.value;
    doc.통신검사_DTC코드7 = _통신검사_DTC코드7.value;
    doc.통신검사_DTC코드8 = _통신검사_DTC코드8.value;
    doc.통신검사_DTC코드9 = '';
    doc.통신검사_DTC코드10 = '';
  } else if (code_no == 7) {
    doc.통신검사_DTC코드1 = _통신검사_DTC코드1.value;
    doc.통신검사_DTC코드2 = _통신검사_DTC코드2.value;
    doc.통신검사_DTC코드3 = _통신검사_DTC코드3.value;
    doc.통신검사_DTC코드4 = _통신검사_DTC코드4.value;
    doc.통신검사_DTC코드5 = _통신검사_DTC코드5.value;
    doc.통신검사_DTC코드6 = _통신검사_DTC코드6.value;
    doc.통신검사_DTC코드7 = _통신검사_DTC코드7.value;
    doc.통신검사_DTC코드8 = '';
    doc.통신검사_DTC코드9 = '';
    doc.통신검사_DTC코드10 = '';
  } else if (code_no == 6) {
    doc.통신검사_DTC코드1 = _통신검사_DTC코드1.value;
    doc.통신검사_DTC코드2 = _통신검사_DTC코드2.value;
    doc.통신검사_DTC코드3 = _통신검사_DTC코드3.value;
    doc.통신검사_DTC코드4 = _통신검사_DTC코드4.value;
    doc.통신검사_DTC코드5 = _통신검사_DTC코드5.value;
    doc.통신검사_DTC코드6 = _통신검사_DTC코드6.value;
    doc.통신검사_DTC코드7 = '';
    doc.통신검사_DTC코드8 = '';
    doc.통신검사_DTC코드9 = '';
    doc.통신검사_DTC코드10 = '';
  } else if (code_no == 5) {
    doc.통신검사_DTC코드1 = _통신검사_DTC코드1.value;
    doc.통신검사_DTC코드2 = _통신검사_DTC코드2.value;
    doc.통신검사_DTC코드3 = _통신검사_DTC코드3.value;
    doc.통신검사_DTC코드4 = _통신검사_DTC코드4.value;
    doc.통신검사_DTC코드5 = _통신검사_DTC코드5.value;
    doc.통신검사_DTC코드6 = '';
    doc.통신검사_DTC코드7 = '';
    doc.통신검사_DTC코드8 = '';
    doc.통신검사_DTC코드9 = '';
    doc.통신검사_DTC코드10 = '';
  } else if (code_no == 4) {
    doc.통신검사_DTC코드1 = _통신검사_DTC코드1.value;
    doc.통신검사_DTC코드2 = _통신검사_DTC코드2.value;
    doc.통신검사_DTC코드3 = _통신검사_DTC코드3.value;
    doc.통신검사_DTC코드4 = _통신검사_DTC코드4.value;
    doc.통신검사_DTC코드5 = '';
    doc.통신검사_DTC코드6 = '';
    doc.통신검사_DTC코드7 = '';
    doc.통신검사_DTC코드8 = '';
    doc.통신검사_DTC코드9 = '';
    doc.통신검사_DTC코드10 = '';
  } else if (code_no == 3) {
    doc.통신검사_DTC코드1 = _통신검사_DTC코드1.value;
    doc.통신검사_DTC코드2 = _통신검사_DTC코드2.value;
    doc.통신검사_DTC코드3 = _통신검사_DTC코드3.value;
    doc.통신검사_DTC코드4 = '';
    doc.통신검사_DTC코드5 = '';
    doc.통신검사_DTC코드6 = '';
    doc.통신검사_DTC코드7 = '';
    doc.통신검사_DTC코드8 = '';
    doc.통신검사_DTC코드9 = '';
    doc.통신검사_DTC코드10 = '';
  } else if (code_no == 2) {
    doc.통신검사_DTC코드1 = _통신검사_DTC코드1.value;
    doc.통신검사_DTC코드2 = _통신검사_DTC코드2.value;
    doc.통신검사_DTC코드3 = '';
    doc.통신검사_DTC코드4 = '';
    doc.통신검사_DTC코드5 = '';
    doc.통신검사_DTC코드6 = '';
    doc.통신검사_DTC코드7 = '';
    doc.통신검사_DTC코드8 = '';
    doc.통신검사_DTC코드9 = '';
    doc.통신검사_DTC코드10 = '';
  } else if (code_no == 1) {
    doc.통신검사_DTC코드1 = _통신검사_DTC코드1.value;
    doc.통신검사_DTC코드2 = '';
    doc.통신검사_DTC코드3 = '';
    doc.통신검사_DTC코드4 = '';
    doc.통신검사_DTC코드5 = '';
    doc.통신검사_DTC코드6 = '';
    doc.통신검사_DTC코드7 = '';
    doc.통신검사_DTC코드8 = '';
    doc.통신검사_DTC코드9 = '';
    doc.통신검사_DTC코드10 = '';
  }

  doc.통신검사_팩전압판정 = _통신검사_팩전압판정.value;
  doc.통신검사_팩전압 = _통신검사_팩전압.value;
  doc.통신검사_셀전압편차판정 = _통신검사_셀전압편차판정.value;
  doc.통신검사_셀전압편차 = _통신검사_셀전압편차.value;
  doc.통신검사_릴레이구동 = _통신검사_릴레이구동.value;
  doc.통신검사_릴레이구동사유 = _통신검사_릴레이구동사유.value;
  doc.BSA생산일자 = _BSA생산일자.value;
  doc.BSA판매일자 = _BSA판매일자.value;
  doc.BSA수리일자 = _BSA수리일자.value;
  doc.BMA_ROM_ID = _BMA_ROM_ID.value;
  doc.공정완료일 = _공정완료일.value;
  doc.분석결과 = _분석결과.value;
  doc.비고 = _비고.value;
  doc.센터진단내용 = _센터진단내용.value;
  doc.필드현상 = _필드현상.value;
  doc.AS센터조치 = _AS센터조치.value;
  doc.검사자 = _검사자.value;

  console.log('save data:', doc);
  update(기초검사, doc);
  await delay();

  console.log(update_count);
  console.log(insert_count);

  if (update_count > 0) {
    alert('업데이트 되었습니다');
  }

  if (insert_count > 0) {
    alert('저장 되었습니다');
  }

  progress.value = 30;

  var _doc = {
    관리번호: _management_id.value.toUpperCase(),
    기초검사투입일: _공정입고일.value,
    기초검사: _공정완료일.value,
    RO_no: _RO_no.value,
  };

  update(BSA재제조, _doc);
  await delay();

  find(BSA재제조, _management_id.value);
  await delay();

  undefined_check(BSA재제조_v);

  await 공정단계자동입력(_management_id.value);

  progress.value = 50;

  var _pic1_doc = JSON.parse(JSON.stringify(기초검사_pic1_doc));
  _pic1_doc.관리번호 = _management_id.value.trim().toUpperCase();
  _pic1_doc.pic1 = _img1.src;
  _pic1_doc.pic2 = _img2.src;
  _pic1_doc.pic3 = _img3.src;
  _pic1_doc.pic4 = _img4.src;
  _pic1_doc.pic5 = _img5.src;
  _pic1_doc.pic6 = _img6.src;
  _pic1_doc.pic7 = _img7.src;
  _pic1_doc.pic8 = _img8.src;
  _pic1_doc.pic9 = _img9.src;
  _pic1_doc.pic10 = _img10.src;

  update(기초검사_pic1, _pic1_doc);
  await delay();

  progress.value = 70;

  console.log('세척_pic1_update:', update_count);
  console.log('세척_pic1_insert:', insert_count);

  var _pic2_doc = JSON.parse(JSON.stringify(기초검사_pic2_doc));
  _pic2_doc.관리번호 = _management_id.value.trim().toUpperCase();
  _pic2_doc.pic1 = _img11.src;
  _pic2_doc.pic2 = _img13.src;
  _pic2_doc.pic3 = _img14.src;
  _pic2_doc.pic4 = _img15.src;
  _pic2_doc.pic5 = _img16.src;
  _pic2_doc.pic6 = _img17.src;
  _pic2_doc.pic7 = _img18.src;
  _pic2_doc.pic8 = _img19.src;
  _pic2_doc.pic9 = _img20.src;
  _pic2_doc.pic10 = _img21.src;
  //_pic2_doc.pic11 = _img12.src;

  update(기초검사_pic2, _pic2_doc);
  await delay();

  console.log('세척_pic2_update:', update_count);
  console.log('세척_pic2_insert:', insert_count);

  flag_불량의심부품 = true;
  progress.value = 100;

  loadPage('base/불량의심부품.html');
}

function _육안검사내부_콤보박스(e) {
  const value = e.value;

  document.getElementById('_육안검사_내부').value = value;
}

function _기밀검사_냉각유로_콤보박스(e) {
  const value = e.value;

  document.getElementById('_기밀검사_냉각유로').value = value;
}

function _절연검사P_콤보박스(e) {
  const value = e.value;

  document.getElementById('_절연검사P판정').value = value;
}

function _절연검사N_콤보박스(e) {
  const value = e.value;

  document.getElementById('_절연검사N판정').value = value;
}
function _센서데이터진단_콤보박스(e) {
  const value = e.value;

  document.getElementById('_센서데이터진단_판정').value = value;
}

function _기초검사_통신검사_팩전압_콤보박스(e) {
  const value = e.value;

  document.getElementById('_통신검사_팩전압판정').value = value;
}

function _통신검사_셀전압_콤보박스(e) {
  const value = e.value;

  document.getElementById('_통신검사_셀전압편차판정').value = value;
}

function _육안검사내부_콤보박스(e) {
  const value = e.value;

  document.getElementById('_육안검사_내부').value = value;
}

function _통신검사_릴레이구동_콤보박스(e) {
  const value = e.value;

  document.getElementById('_통신검사_릴레이구동').value = value;
}

function _기초검사_add_DTC_Code() {
  기초검사_DTC_count++;

  var oCurrentRow;
  var tb = document.getElementById('tb');
  var rowIcnt = tb.rows.length - 15;
  var code_no = 기초검사_DTC_count;
  console.log('row count:', rowIcnt);
  console.log('code No:', code_no);
  if (code_no > 10) return false;

  oCurrentRow = tb.insertRow(rowIcnt);
  var insert_string = '<td><label for="_통신검사_DTC코드"' + code_no + '><b>통신검사 DTC코드 ' + code_no + '</b></label></td><td><input type="text" id="_통신검사_DTC코드' + code_no + '" size="40" required></td><td><button onClick="_기초검사_delete_row(' + rowIcnt + ');">삭제</button></td>';
  console.log(insert_string);
  oCurrentRow.innerHTML = insert_string;
}

function _기초검사_delete_row(index) {
  var tb = document.getElementById('tb');
  var rowIcnt = tb.rows.length - 16;

  console.log('index:', index, 'rowIcnt:', rowIcnt);
  if (index == rowIcnt) {
    tb.deleteRow(index);
    기초검사_DTC_count--;
  }
}

function _기초검사_delete_all() {
  while (기초검사_DTC_count > 0) {
    var tb = document.getElementById('tb');
    var rowIcnt = tb.rows.length - 16;

    tb.deleteRow(rowIcnt);
    기초검사_DTC_count--;
  }
}

async function 기초검사_카메라시작() {
  if (_management_id.value == '') rturn;

  기초검사_SAVE();

  기초검사_사진촬영(_management_id.value);
}

function 기초검사_updateFilter() {
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
    기초검사_list_table.setFilter(filter, typeVal, valueEl.value);
  }
}

var 기초검사_list_table;
async function 기초검사_list() {
  findOne_BSA재제조(BSA재제조, {
    공정단계: { $ne: '출하' },
    세척: { $ne: '' },
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
      세척: { $ne: '' },
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

  기초검사_list_table = new Tabulator('#grid_list', {
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
      },
      {
        title: '입고',
        field: '입고',
        sorter: 'string',
        visible: true,
        width: '180',
      },
      {
        title: '제조투입',
        field: '제조투입',
        sorter: 'string',
        visible: true,
        width: '180',
      },
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
      },
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
      },
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
      },
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
      },
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
      },
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

  기초검사_list_table.on('rowClick', async function (e, row) {
    console.log('selected 관리번호: ', row.getData().관리번호);

    _management_id.value = row.getData().관리번호;

    await sleep(1);

    var yes = confirm('선택한 BSA로 기초검사 공정 정보입력을 시작하시겠습니까?');
    if (yes != true) return;

    기초검사_시작();
  });

  //Update filters on value change
  document.getElementById('filter-field').addEventListener('change', 기초검사_updateFilter);
  document.getElementById('filter-type').addEventListener('change', 기초검사_updateFilter);
  document.getElementById('filter-value').addEventListener('keyup', 기초검사_updateFilter);

  //Clear filters on "Clear Filters" button click
  document.getElementById('filter-clear').addEventListener('click', function () {
    var fieldEl = document.getElementById('filter-field');
    var typeEl = document.getElementById('filter-type');
    var valueEl = document.getElementById('filter-value');
    fieldEl.value = '';
    typeEl.value = '=';
    valueEl.value = '';

    기초검사_list_table.clearFilter();
  });
}

async function 기초보고서_load() {
  flag_기초보고서 = true;
  loadPage('base/기초보고서.html');
}
