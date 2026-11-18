function EOL_재제조번호_시작() {
  EOL_시작(true);
}

//DTC 입력항목은 10개까지 틀리수 있다. '+'버튼을 불러서..
var EOL_DTC_count = 0;

async function EOL_시작(is재제조 = 0) {
  if (typeof _management_id == 'undefined') {
    await sleep(DELAY);
    return;
  }

  //EOL공정 대기 리스트
  if (flag_EOL == true) await EOL_list();
  flag_EOL = false;
  if (worker == '') return;

  if (is재제조 == 0) {
    //관리자 번호로 기본정보 조회
    if (_management_id.value.length == 0) return;

    find(BSA재제조, _management_id.value);
    await delay();
    if (BSA재제조_v != null) {
      _재제조번호.value = BSA재제조_v.재제조번호;
      _RO_no.value = BSA재제조_v.RO_no;
      _구분.value = BSA재제조_v.구분;
      _차종.value = BSA재제조_v.차종;
      _품번.value = BSA재제조_v.품번;
    } else {
      _재제조번호.value = '';
      _RO_no.value = '';
      _구분.value = '';
      _차종.value = '';
      _품번.value = '';
    }
  } else if (is재제조 == 1) {
    //재제조 번호로 관리자 번호로 기본정보 조회
    if (_재제조번호.value.length == 0) return;

    findOne_BSA재제조(BSA재제조, { 재제조번호: _재제조번호.value });
    await delay();

    if (BSA재제조_v != null) {
      _management_id.value = BSA재제조_v.관리번호;
      _RO_no.value = BSA재제조_v.RO_no;
      _구분.value = BSA재제조_v.구분;
      _차종.value = BSA재제조_v.차종;
      _품번.value = BSA재제조_v.품번;
    } else {
      _management_id.value = '';
      _RO_no.value = '';
      _구분.value = '';
      _차종.value = '';
      _품번.value = '';
    }
  } else if (is재제조 == 2) {
    //RO 번호로 기본정보 조회
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

  관리번호 = _management_id.value;
  console.log('load: ', _management_id.value);

  //EOL data를 관리자 번호로 조회
  find(EOL, _management_id.value);
  await delay();

  if (EOL_v != null) {
    _공정입고일.value = EOL_v.공정입고일;
    _공정완료일.value = EOL_v.공정완료일;
    _비고.value = EOL_v.비고;
    _QR기본.value = EOL_v.QR기본;
    _QR.value = EOL_v.QR;
    _검사자.value = EOL_v.검사자;
    _기밀검사_케이스.value = EOL_v.기밀검사_케이스;
    _기밀검사_케이스_값.value = EOL_v.기밀검사_케이스_특이사항;
    _기밀검사_냉각유로.value = EOL_v.기밀검사_냉각유로;
    _기밀검사_냉각유로_값.value = EOL_v.기밀검사_냉각유로_특이사항;
    _절연검사P.value = EOL_v.절연검사_Plus;
    _절연검사P_값.value = EOL_v.절연검사_Plus_특이사항;
    _절연검사M.value = EOL_v.절연검사_Minus;
    _절연검사M_값.value = EOL_v.절연검사_Minus_특이사항;
    _절연저항HVP.value = EOL_v.절연저항_HVP;
    _절연저항HVP_값.value = EOL_v.절연저항_HVP_특이사항;
    _절연저항HVN.value = EOL_v.절연저항_HVN;
    _절연저항HVN_값.value = EOL_v.절연저항_HVN_특이사항;
    _UPR_C조립.value = EOL_v.UPR_C조립;
    _UPR_C조립_특이사항.value = EOL_v.UPR_C조립_특이사항;
    _고장코드유무.value = EOL_v.고장코드유무;
    _통신검사_팩전압.value = EOL_v.통신검사_팩전압;
    _통신검사_팩전압_값.value = EOL_v.통신검사_팩전압_특이사항;
    _통신검사_셀전압편차.value = EOL_v.통신검사_셀전압편차;
    _통신검사_셀전압편차_값.value = EOL_v.통신검사_셀전압편차_특이사항;
    _셀전압MAX.value = EOL_v.통신검사_셀전압MAX;
    _셀전압MIN.value = EOL_v.통신검사_셀전압MIN;
    _통신검사_릴레이구동.value = EOL_v.통신검사_릴레이구동;
    _EOL항목검사.value = EOL_v.EOL항목검사;
    _커버류.value = EOL_v.커버류;
    _브라켓.value = EOL_v.브라켓;
    _ICUU.value = EOL_v.ICUU;
    _교체부품명.value = EOL_v.교체부품명;
    _공정흐름_이슈.value = EOL_v.공정흐름_이슈;
    _용량평가값.value = EOL_v.용량평가값;
    _육안검사_외부.value = EOL_v.육안검사_외부;
    _육안검사_내부.value = EOL_v.육안검사_내부;

    if (_검사자.value == '') _검사자.value = worker;

    //이미지 조회
    find(EOL_pic1, _management_id.value);
    await delay();
    if (EOL_pic1_v != null) {
      _img1.src = EOL_pic1_v.pic1;
      _img2.src = EOL_pic1_v.pic2;
      _img3.src = EOL_pic1_v.pic3;
      _img4.src = EOL_pic1_v.pic4;
      _img5.src = EOL_pic1_v.pic5;
      _img6.src = EOL_pic1_v.pic6;
      _img7.src = EOL_pic1_v.pic7;
      _img8.src = EOL_pic1_v.pic8;
      _img9.src = EOL_pic1_v.pic9;
      _img10.src = EOL_pic1_v.pic10;
    }

    find(EOL_pic2, _management_id.value);
    await delay();
    if (EOL_pic2_v != null) {
      _img11.src = EOL_pic2_v.pic1;
      _img12.src = EOL_pic2_v.pic2;
      _img13.src = EOL_pic2_v.pic3;
      _img14.src = EOL_pic2_v.pic4;
      _img15.src = EOL_pic2_v.pic5;
      _img16.src = EOL_pic2_v.pic6;
      _img17.src = EOL_pic2_v.pic7;
      _img18.src = EOL_pic2_v.pic8;
      _img19.src = EOL_pic2_v.pic9;
      _img20.src = EOL_pic2_v.pic10;
    }

    find(EOL_pic3, _management_id.value);
    await delay();
    if (EOL_pic3_v != null) {
      _img21.src = EOL_pic3_v.pic1;
      _img22.src = EOL_pic3_v.pic2;
      _img23.src = EOL_pic3_v.pic3;
      _img24.src = EOL_pic3_v.pic4;
      _img25.src = EOL_pic3_v.pic5;
    }
  } else {
    var DateTime = luxon.DateTime;
    var seoul = DateTime.local().setZone('Asia/Seoul');
    var now = seoul.toString().slice(0, 19);

    _비고.value = '';
    _QR기본.value = '';
    _QR.value = '';
    _검사자.value = '';
    _기밀검사_케이스.value = '';
    _기밀검사_케이스_값.value = '';
    _기밀검사_냉각유로.value = '';
    _기밀검사_냉각유로_값.value = '';
    _절연검사P.value = '';
    _절연검사P_값.value = '';
    _절연검사M.value = '';
    _절연검사M_값.value = '';
    _절연저항HVP_값.value = '';
    _절연저항HVN_값.value = '';
    _UPR_C조립.value = '';
    _UPR_C조립_특이사항.value = '';
    _고장코드유무.value = '';
    _통신검사_팩전압.value = '';
    _통신검사_팩전압_값.value = '';
    _통신검사_셀전압편차.value = '';
    _통신검사_셀전압편차_값.value = '';
    _셀전압MAX.value = '';
    _셀전압MIN.value = '';
    _통신검사_릴레이구동.value = '';
    _EOL항목검사.value = '';
    _커버류.value = '';
    _브라켓.value = '';
    _ICUU.value = '';
    _교체부품명.value = '';
    _공정흐름_이슈.value = '';
    _용량평가값.value = '';
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
    _img12.src = '';
    _img13.src = '';
    _img14.src = '';
    _img15.src = '';
    _img16.src = '';
    _img17.src = '';
    _img18.src = '';
    _img19.src = '';
    _img20.src = '';
    _img21.src = '';
    _img22.src = '';
    _img23.src = '';
    _img24.src = '';
    _img25.src = '';
  }

  //이미지 더블 클릭시 이미지 지움
  _img1.ondblclick = function (evt) {
    _img1.src = '';
  };

  //이미지 드래그 앤 드롭 처리
  _img1.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img1); //이미지를 일정한 레졸루션으로 축소
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
  _img12.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img12);
    }
    evt.preventDefault();
  };
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
      resize_pic(files[0], _img19);
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
  _img22.ondblclick = function (evt) {
    _img22.src = '';
  };
  _img22.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img22);
    }
    evt.preventDefault();
  };
  _img23.ondblclick = function (evt) {
    _img23.src = '';
  };
  _img23.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img23, true, true);
    }
    evt.preventDefault();
  };
  _img24.ondblclick = function (evt) {
    _img24.src = '';
  };
  _img24.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img24);
    }
    evt.preventDefault();
  };
  _img25.ondblclick = function (evt) {
    _img25.src = '';
  };
  _img25.ondrop = function (evt) {
    var files = evt.dataTransfer?.files;
    if (files.length > 0) {
      console.log('drag & drop');
      resize_pic(files[0], _img25);
    }
    evt.preventDefault();
  };

  //드래그 오버를 처리 안해주면 드래그 앤 드롭이 안됨
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

  _img22.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img23.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img24.ondragover = function (evt) {
    evt.preventDefault();
  };

  _img25.ondragover = function (evt) {
    evt.preventDefault();
  };

  //기본정보 조회
  find(BSA재제조, _management_id.value);
  await delay();

  if (BSA재제조_v != null) {
    _구분.value = BSA재제조_v.구분;
    _차종.value = BSA재제조_v.차종;
    _품번.value = BSA재제조_v.품번;
    _RO_no.value = BSA재제조_v.RO_no;
    if (BSA재제조_v.재제조번호 != undefined) _재제조번호.value = BSA재제조_v.재제조번호;
  }
}

//저장
async function EOL_SAVE() {
  if (worker == '') return;
  if (_management_id.value.length == 0) return;
  console.log('save: ', _management_id.value);

  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString().slice(0, 19);

  //공정완료일이 비었을때 현재 시간으로 자동 기입
  if (_공정완료일.value == '') _공정완료일.value = now;
  //if (계정_stat.완료일수정 != 'o' || _공정완료일.value == "") _공정완료일.value = now;

  var doc = JSON.parse(JSON.stringify(EOL_doc)); //EOL 다큐먼트 deep copy
  console.log('new doc:', doc);
  doc.관리번호 = _management_id.value.trim().toUpperCase();
  doc.구분 = _구분.value;
  doc.차종 = _차종.value;
  doc.품번 = _품번.value;
  doc.RO_no = _RO_no.value;
  doc.QR기본 = _QR기본.value;
  doc.공정입고일 = _공정입고일.value;
  doc.공정완료일 = _공정완료일.value;
  doc.비고 = _비고.value;
  doc.QR = _QR.value;
  doc.검사자 = _검사자.value;
  doc.기밀검사_케이스 = _기밀검사_케이스.value;
  doc.기밀검사_케이스_특이사항 = _기밀검사_케이스_값.value;
  doc.기밀검사_냉각유로 = _기밀검사_냉각유로.value;
  doc.기밀검사_냉각유로_특이사항 = _기밀검사_냉각유로_값.value;
  doc.절연검사_Plus = _절연검사P.value;
  doc.절연검사_Plus_특이사항 = _절연검사P_값.value;
  doc.절연검사_Minus = _절연검사M.value;
  doc.절연검사_Minus_특이사항 = _절연검사M_값.value;
  doc.절연저항_HVP = _절연저항HVP.value;
  doc.절연저항_HVP_특이사항 = _절연저항HVP_값.value;
  doc.절연저항_HVN = _절연저항HVN.value;
  doc.절연저항_HVN_특이사항 = _절연저항HVN_값.value;
  doc.고장코드유무 = _고장코드유무.value;
  doc.UPR_C조립 = _UPR_C조립.value;
  doc.UPR_C조립_특이사항 = _UPR_C조립_특이사항.value;
  doc.통신검사_팩전압 = _통신검사_팩전압.value;
  doc.통신검사_팩전압_특이사항 = _통신검사_팩전압_값.value;
  doc.통신검사_셀전압편차 = _통신검사_셀전압편차.value;
  doc.통신검사_셀전압편차_특이사항 = _통신검사_셀전압편차_값.value;
  doc.통신검사_셀전압MAX = _셀전압MAX.value;
  doc.통신검사_셀전압MIN = _셀전압MIN.value;
  doc.통신검사_릴레이구동 = _통신검사_릴레이구동.value;
  doc.EOL항목검사 = _EOL항목검사.value;
  doc.커버류 = _커버류.value;
  doc.브라켓 = _브라켓.value;
  doc.ICUU = _ICUU.value;
  doc.교체부품명 = _교체부품명.value;
  doc.공정흐름_이슈 = _공정흐름_이슈.value;
  doc.용량평가값 = _용량평가값.value;
  doc.육안검사_외부 = _육안검사_외부.value;
  doc.육안검사_내부 = _육안검사_내부.value;

  console.log(doc);
  update(EOL, doc);
  await delay();

  console.log(update_count);
  console.log(insert_count);

  if (update_count > 0) {
    alert('업데이트 되었습니다');
  }

  if (insert_count > 0) {
    alert('저장 되었습니다');
  }

  //기본정보 수정
  var _doc = {};
  _doc.관리번호 = _management_id.value;
  _doc.EOL투입일 = _공정입고일.value;
  _doc.EOL = _공정완료일.value;
  _doc.마지막충전일 = _공정완료일.value;

  update(BSA재제조, _doc);
  await delay();

  find(BSA재제조, _management_id.value);
  await delay();

  undefined_check(BSA재제조_v); //기본정보에서 'undefine' 항목을 클리어함

  select_pos = '';
  await 공정단계자동입력(관리번호); //공정 단계를 자동으로 체크해서 수정해줌

  //드래그 앤 드롭을 넣은 이미지 저장
  var _pic1_doc = JSON.parse(JSON.stringify(EOL_pic1_doc));
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

  update(EOL_pic1, _pic1_doc);
  await delay();

  console.log('EOL_pic1_update:', update_count);
  console.log('EOL_pic1_insert:', insert_count);

  var _pic2_doc = JSON.parse(JSON.stringify(EOL_pic2_doc));
  _pic2_doc.관리번호 = _management_id.value.trim().toUpperCase();
  _pic2_doc.pic1 = _img11.src;
  _pic2_doc.pic2 = _img12.src;
  _pic2_doc.pic3 = _img13.src;
  _pic2_doc.pic4 = _img14.src;
  _pic2_doc.pic5 = _img15.src;
  _pic2_doc.pic6 = _img16.src;
  _pic2_doc.pic7 = _img17.src;
  _pic2_doc.pic8 = _img18.src;
  _pic2_doc.pic9 = _img19.src;
  _pic2_doc.pic10 = _img20.src;

  update(EOL_pic2, _pic2_doc);
  await delay();

  console.log('EOL_pic2_update:', update_count);
  console.log('EOL_pic2_insert:', insert_count);

  var _pic3_doc = JSON.parse(JSON.stringify(EOL_pic3_doc));
  _pic3_doc.관리번호 = _management_id.value.trim().toUpperCase();
  _pic3_doc.pic1 = _img21.src;
  _pic3_doc.pic2 = _img22.src;
  _pic3_doc.pic3 = _img23.src;
  _pic3_doc.pic4 = _img24.src;
  _pic3_doc.pic5 = _img25.src;

  update(EOL_pic3, _pic3_doc);
  await delay();

  console.log('EOL_pic3_update:', update_count);
  console.log('EOL_pic3_insert:', insert_count);

  //출하정보 update
  find(출하정보, _management_id.value);
  await delay();

  if (출하정보_v == null) {
    var _doc = JSON.parse(JSON.stringify(출하정보_doc));
    _doc.관리번호 = _management_id.value;
    _doc.출하코드 = _QR.value;

    update(출하정보, _doc);
    await delay();
  } else {
    var _doc = {
      관리번호: _management_id.value,
      출하코드: _QR.value,
    };

    update(출하정보, _doc);
    await delay();
  }
}

function EOL_save() {
  EOL_SAVE();

  //이전페이지();
}

function _기밀검사_케이스_콤보박스(e) {
  const value = e.value;

  document.getElementById('_기밀검사_케이스').value = value;
}

function _기밀검사_냉각유로_콤보박스(e) {
  const value = e.value;

  document.getElementById('_기밀검사_냉각유로').value = value;
}

function _UPR_C조립_콤보박스(e) {
  const value = e.value;

  document.getElementById('_UPR_C조립').value = value;
  if (value == 'OK') {
    document.getElementById('_UPR_C조립_label').innerHTML = 'UPR_C조립 입력값';
  } else if (value == '미실시') {
    document.getElementById('_UPR_C조립_label').innerHTML = 'UPR_C조립 특이사항';
  }
}

function _절연검사p_콤보박스(e) {
  const value = e.value;

  document.getElementById('_절연검사P').value = value;
  if (value == 'OK') {
  } else if (value == '미실시') {
  }
}

function _절연검사M_콤보박스(e) {
  const value = e.value;

  document.getElementById('_절연검사M').value = value;
  if (value == 'OK') {
  } else if (value == '미실시') {
  }
}

function _절연저항HVP_콤보박스(e) {
  const value = e.value;

  document.getElementById('_절연저항HVP').value = value;
  if (value == 'OK') {
  } else if (value == '미실시') {
  }
}

function _절연저항HVN_콤보박스(e) {
  const value = e.value;

  document.getElementById('_절연저항HVN').value = value;
  if (value == 'OK') {
  } else if (value == '미실시') {
  }
}

function _통신검사_팩전압_콤보박스(e) {
  const value = e.value;

  document.getElementById('_통신검사_팩전압').value = value;
  if (value == 'OK') {
  } else if (value == '미실시') {
  }
}

function _통신검사_셀전압편차_콤보박스(e) {
  const value = e.value;

  document.getElementById('_통신검사_셀전압편차').value = value;
  if (value == 'OK') {
  } else if (value == '미실시') {
  }
}

function _통신검사_릴레이구동_콤보박스(e) {
  const value = e.value;

  document.getElementById('_통신검사_릴레이구동').value = value;
}

function _고장코드유무_콤보박스(e) {
  const value = e.value;

  document.getElementById('_고장코드유무').value = value;
}

function _EOL항목검사_콤보박스(e) {
  const value = e.value;

  document.getElementById('_EOL항목검사').value = value;
}

function _커버류_콤보박스(e) {
  const value = e.value;

  document.getElementById('_커버류').value = value;
}

function _브라켓_콤보박스(e) {
  const value = e.value;

  document.getElementById('_브라켓').value = value;
}

function _ICUU_콤보박스(e) {
  const value = e.value;

  document.getElementById('_ICUU').value = value;
}

//QR 라벨 PDF 자동 생성
async function EOL_QR_Label() {
  let hyundai_logo;
  convertImageToBase64('base/img/hyundai.jpg', async function (logo) {
    hyundai_logo = logo;
  });

  let qrcode;
  let pumbeon1 = '';
  let pumbeon2 = '';
  let sn = '';
  let html_string = '';

  let QR1 = document.getElementById('QR1');
  let QR2 = document.getElementById('QR2');

  QR1.style.display = 'block';
  QR2.style.display = 'block';

  //기본정보 조회
  find(BSA재제조, 관리번호);
  await delay();

  //시리얼 넘버 구함
  sn = BSA재제조_v.재제조번호;

  //QR코드 이미지 생성
  qrcode = new QRCode(document.getElementById('_QR'), {
    width: 100,
    height: 100,
  });

  var 배터리팩_제조번호 = prompt('배터리팩 제조번호를 입력하세요');
  qrcode.makeCode(배터리팩_제조번호 + ' ' + sn);
  let qrcode_base64 = qrcode._oDrawing._elCanvas.toDataURL('image/png');
  console.log(qrcode_base64);

  //pdf 문서 내용 구성
  document.getElementById('_QR_Label').innerHTML =
    "<div class='HHB' align='left' width='264'><h5>배터리 시스템 어셈블리</h5></div><div class='HHB'><h6>(Battery System Assembly)</h6></div><div><br/></div><div class='HHB' align='left'><h5>R" +
    BSA재제조_v.품번 +
    "</h5></div><div align='center' width='264'><img src='" +
    qrcode_base64 +
    "'></center></div><div><br/></div><div class='HHM' align='center'><h5>" +
    BSA재제조_v.재제조번호 +
    "</h5></div><div align='right'><img src='" +
    hyundai_logo +
    "'></div>";

  pdf(); //pdf 생성
}

//file 다운로드
function saveAs(uri, filename) {
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

//이미지를 문자로 변환 (base64)
function convertImageToBase64(imgUrl, callback) {
  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = image.naturalHeight;
    canvas.width = image.naturalWidth;
    ctx.drawImage(image, 0, 0);
    const dataUrl = canvas.toDataURL();
    callback && callback(dataUrl);
  };
  image.src = imgUrl;
}

function pdf() {
  var _QR_Label = document.getElementById('_QR_Label');
  var _width = 2400;
  var _height = 1700;

  html2canvas(_QR_Label, {
    width: (_width * window.innerWidth) / 1920,
    height: (_height * window.innerHeight) / 1080,
  }).then((canvas) => {
    var data = canvas.toDataURL();
    var canvas = document.getElementById('_canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = data;
    img.onload = function () {
      ctx.drawImage(img, 1920, 1080);
    };

    canvas.width = _width / 10;
    canvas.height = _height / 10;

    var docDefinition = {
      content: [
        {
          image: data,
          width: 1920,
          height: 1080,
        },
      ],
      pageSize: {
        width: 2.75591 * 72,
        height: 3.14961 * 72,
      },
      pageOrientation: 'portrait',
      pageMargins: [0, 0, 0, 0],
    };

    //pdf file name
    var DateTime = luxon.DateTime;
    var seoul = DateTime.local().setZone('Asia/Seoul');
    var now = seoul.toString().slice(0, 19);
    var file_name = now + '_QR.pdf';
    pdfMake.createPdf(docDefinition).download(file_name);
  });
  console.log('file name:', 'QR.pdf');
}

//EOL 공정대기 리스트 검색용 필터 설정
function EOL_updateFilter() {
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
    EOL_list_table.setFilter(filter, typeVal, valueEl.value);
  }
}

var EOL_list_table; //EOL 공정 대기 리스트
async function EOL_list() {
  findOne_BSA재제조(BSA재제조, { 공정단계: { $ne: '출하' }, 성능검사: { $ne: '' }, EOL: { $eq: '' }, 소재지: { $nin: ['공정대기', '품질대기', '구장'] }, 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 출하: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } });
  await delay();

  if (BSA재제조_v != null) {
    find_BSA재제조(BSA재제조, { 공정단계: { $ne: '출하' }, 성능검사: { $ne: '' }, EOL: { $eq: '' }, 소재지: { $nin: ['공정대기', '품질대기', '구장'] }, 완전분해: { $eq: '' }, 폐기: { $eq: '' }, 출하: { $eq: '' }, 구분: { $nin: ['일반기타', '보증기타'] } });
    await delay();
  }

  EOL_list_table = new Tabulator('#grid_list', {
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

  EOL_list_table.on('rowClick', async function (e, row) {
    console.log('selected 관리번호: ', row.getData().관리번호);

    _management_id.value = row.getData().관리번호;

    await sleep(1);

    var yes = confirm('선택한 BSA로 EOL 공정 정보입력을 시작하시겠습니까?');
    if (yes != true) return;

    EOL_시작();
  });

  //Update filters on value change
  document.getElementById('filter-field').addEventListener('change', EOL_updateFilter);
  document.getElementById('filter-type').addEventListener('change', EOL_updateFilter);
  document.getElementById('filter-value').addEventListener('keyup', EOL_updateFilter);

  //Clear filters on "Clear Filters" button click
  document.getElementById('filter-clear').addEventListener('click', function () {
    var fieldEl = document.getElementById('filter-field');
    var typeEl = document.getElementById('filter-type');
    var valueEl = document.getElementById('filter-value');
    fieldEl.value = '';
    typeEl.value = '=';
    valueEl.value = '';

    EOL_list_table.clearFilter();
  });
}
