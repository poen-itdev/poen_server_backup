//분해조립에 쓰이는 전역변수
var 신품_docs = [];
var 고품_docs = [];
var BMU_count = 1;
var CMU_count = 1;
var PRA_count = 1;
var SPA_count = 1;
var LWR_C_count = 1;
var UPR_C_count = 1;
var PBE_count = 1;
var Gasket_count = 1;
var Relay_count = 1;
var HV_CNTR_count = 1;
var Heating_CNTR_count = 1;
var FuseBox_count = 1;
var LV_W_H_count = 1;
var HV_W_H_count = 1;
var 온도센서_count = 1;
var Busbars_count = 1;
var BMA_count = 1;
var first_분해조립 = true; //분해조립 공정 대기 배터리팩 기분정보를 한번만 읽어 오기 위한것

async function 분해조립_재제조번호_시작() {
  분해조립_시작(true);
}

async function 분해조립_시작(is재제조 = 0) {
  //if(flag_loaded == true) return;
  if (worker == '') return;
  if (typeof _management_id == 'undefined') {
    await sleep(DELAY);
    return;
  }

  await sleep(1);

  if (flag_분해조립 == true) await 분해조립_list();

  flag_분해조립 = false;
  flag_loaded = true;

  분해조립_loading(); //분해조립 항목을 만듬 ( + ) 버튼이 있어 데이터 마다 상이한 항목 리스트가 만들어짐

  if (is재제조 == 0) {
    //관리번호로 조회
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
    //재제조번호로 관리번호를 찾음
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
    //RO 번호로 관리번호를 찾음
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

  //분해조립 조회
  find(분해조립, _management_id.value);
  await delay();

  if (분해조립_v != null) {
    var no_count = 7;
    _공정입고일.value = 분해조립_v.공정입고일;
    _BMU1.value = 분해조립_v.BMU1; //각 항목마다 2개의 값을 저장하고 로딩함
    _BMU1_2.value = 분해조립_v.BMU1_2;
    if (분해조립_v.BMU2 != '') {
      BMU_count += 1; // 분해조립 항목 BMU  번호
      type_add('BMU', 'BMU', no_count, BMU_count); //분해조립 항목을 늘임
      document.getElementById('_BMU2').value = 분해조립_v.BMU2;
      document.getElementById('_BMU2_2').value = 분해조립_v.BMU2_2;
    }
    if (분해조립_v.BMU3 != '') {
      BMU_count += 1;
      type_add('BMU', 'BMU', no_count, BMU_count);
      document.getElementById('_BMU3').value = 분해조립_v.BMU3;
      document.getElementById('_BMU3_2').value = 분해조립_v.BMU3_2;
    }
    if (분해조립_v.BMU4 != '') {
      BMU_count += 1;
      type_add('BMU', 'BMU', no_count, BMU_count);
      document.getElementById('_BMU4').value = 분해조립_v.BMU4;
      document.getElementById('_BMU4_2').value = 분해조립_v.BMU4_2;
    }
    if (분해조립_v.BMU5 != '') {
      BMU_count += 1;
      type_add('BMU', 'BMU', no_count, BMU_count);
      document.getElementById('_BMU5').value = 분해조립_v.BMU5;
      document.getElementById('_BMU5_2').value = 분해조립_v.BMU5_2;
    }
    if (분해조립_v.BMU6 != '') {
      BMU_count += 1;
      type_add('BMU', 'BMU', no_count, BMU_count);
      document.getElementById('_BMU6').value = 분해조립_v.BMU6;
      document.getElementById('_BMU6_2').value = 분해조립_v.BMU6_2;
    }
    if (분해조립_v.BMU7 != '') {
      BMU_count += 1;
      type_add('BMU', 'BMU', no_count, BMU_count);
      document.getElementById('_BMU7').value = 분해조립_v.BMU7;
      document.getElementById('_BMU7_2').value = 분해조립_v.BMU7_2;
    }
    if (분해조립_v.BMU8 != '') {
      BMU_count += 1;
      type_add('BMU', 'BMU', no_count, BMU_count);
      document.getElementById('_BMU8').value = 분해조립_v.BMU8;
      document.getElementById('_BMU8_2').value = 분해조립_v.BMU8_2;
    }
    if (분해조립_v.BMU9 != '') {
      BMU_count += 1;
      type_add('BMU', 'BMU', no_count, BMU_count);
      document.getElementById('_BMU9').value = 분해조립_v.BMU9;
      document.getElementById('_BMU9_2').value = 분해조립_v.BMU9_2;
    }
    if (분해조립_v.BMU10 != '') {
      BMU_count += 1;
      type_add('BMU', 'BMU', no_count, BMU_count);
      document.getElementById('_BMU10').value = 분해조립_v.BMU10;
      document.getElementById('_BMU10_2').value = 분해조립_v.BMU10_2;
    }

    _CMU1.value = 분해조립_v.CMU1;
    _CMU1_2.value = 분해조립_v.CMU1_2;
    no_count += BMU_count + 1;
    for (var i = 2; i <= 10; i++)
      eval(
        //실행중 코드 만드는  eval을 사용하여 BMU 처럼 반복하는 작업을 단순화
        'if(분해조립_v.CMU' +
          i +
          " != '' || (분해조립_v.CMU" +
          i +
          "_2 != '' && 분해조립_v.CMU" +
          i +
          '_2 != undefined)) ' +
          "{ CMU_count += 1; type_add('CMU', 'CMU', no_count, CMU_count); document.getElementById('_CMU" +
          i +
          "').value = " +
          '분해조립_v.CMU' +
          i +
          "; document.getElementById('_CMU" +
          i +
          "_2').value = " +
          '분해조립_v.CMU' +
          i +
          '_2;}'
      );

    _PRA1.value = 분해조립_v.PRA1;
    _PRA1_2.value = 분해조립_v.PRA1_2;
    no_count += CMU_count + 1;
    for (var i = 2; i <= 10; i++)
      eval(
        'if(분해조립_v.PRA' +
          i +
          " != '' || (분해조립_v.PRA" +
          i +
          "_2 != '' && 분해조립_v.PRA" +
          i +
          '_2 != undefined)) ' +
          "{ PRA_count += 1; type_add('PRA', 'PRA', no_count, PRA_count); document.getElementById('_PRA" +
          i +
          "').value = " +
          '분해조립_v.PRA' +
          i +
          "; document.getElementById('_PRA" +
          i +
          "_2').value = " +
          '분해조립_v.PRA' +
          i +
          '_2; }'
      );

    _SPA1.value = 분해조립_v.SPA1;
    _SPA1_2.value = 분해조립_v.SPA1_2;
    no_count += PRA_count + 1;
    for (var i = 2; i <= 10; i++)
      eval(
        'if(분해조립_v.SPA' +
          i +
          " != '' || (분해조립_v.SPA" +
          i +
          "_2 != '' && 분해조립_v.SPA" +
          i +
          '_2 != undefined)) ' +
          "{ SPA_count += 1; type_add('SPA', 'SPA', no_count, SPA_count); document.getElementById('_SPA" +
          i +
          "').value = " +
          '분해조립_v.SPA' +
          i +
          "; document.getElementById('_SPA" +
          i +
          "_2').value = " +
          '분해조립_v.SPA' +
          i +
          '_2; }'
      );

    _LWR_C1.value = 분해조립_v.LWR_C1;
    _LWR_C1_2.value = 분해조립_v.LWR_C1_2;
    no_count += SPA_count + 1;
    for (var i = 2; i <= 10; i++)
      eval(
        'if(분해조립_v.LWR_C' +
          i +
          " != '' || (분해조립_v.LWR_C" +
          i +
          "_2 != '' && 분해조립_v.LWR_C" +
          i +
          '_2 != undefined)) ' +
          "{ LWR_C_count += 1; type_add('LWR Case', 'LWR_C', no_count, LWR_C_count); document.getElementById('_LWR_C" +
          i +
          "').value = " +
          '분해조립_v.LWR_C' +
          i +
          "; document.getElementById('_LWR_C" +
          i +
          "_2').value = " +
          '분해조립_v.LWR_C' +
          i +
          '_2; }'
      );

    _UPR_C1.value = 분해조립_v.UPR_C1;
    _UPR_C1_2.value = 분해조립_v.UPR_C1_2;
    no_count += LWR_C_count + 1;
    for (var i = 2; i <= 10; i++)
      eval(
        'if(분해조립_v.UPR_C' +
          i +
          " != '' || (분해조립_v.UPR_C" +
          i +
          "_2 != '' && 분해조립_v.UPR_C" +
          i +
          '_2 != undefined)) ' +
          "{ UPR_C_count += 1; type_add('UPR Case', 'UPR_C', no_count, UPR_C_count); document.getElementById('_UPR_C" +
          i +
          "').value = " +
          '분해조립_v.UPR_C' +
          i +
          "; document.getElementById('_UPR_C" +
          i +
          "_2').value = " +
          '분해조립_v.UPR_C' +
          i +
          '_2; }'
      );

    _PBE.value = 분해조립_v.PBE;
    _PBE_2.value = 분해조립_v.PBE_2;
    _Gasket.value = 분해조립_v.Gasket;
    _Gasket_2.value = 분해조립_v.Gasket_2;

    _Relay1.value = 분해조립_v.Relay1;
    _Relay1_2.value = 분해조립_v.Relay1_2;
    no_count += 2 + UPR_C_count + 3;
    for (var i = 2; i <= 10; i++)
      eval(
        'if(분해조립_v.Relay' +
          i +
          " != '' || (분해조립_v.Relay" +
          i +
          "_2 != '' && 분해조립_v.Relay" +
          i +
          '_2 != undefined)) ' +
          "{ Relay_count += 1; type_add('Relay', 'Relay', no_count, Relay_count); document.getElementById('_Relay" +
          i +
          "').value = " +
          '분해조립_v.Relay' +
          i +
          "; document.getElementById('_Relay" +
          i +
          "_2').value = " +
          '분해조립_v.Relay' +
          i +
          '_2;}'
      );

    _HV_CNTR1.value = 분해조립_v.HV_CNTR1;
    _HV_CNTR1_2.value = 분해조립_v.HV_CNTR1_2;
    no_count += Relay_count + 1;
    for (var i = 2; i <= 10; i++)
      eval(
        'if(분해조립_v.HV_CNTR' +
          i +
          " != '' || (분해조립_v.HV_CNTR" +
          i +
          "_2 != '' && 분해조립_v.HV_CNTR" +
          i +
          '_2 != undefined)) ' +
          "{ HV_CNTR_count += 1; type_add('HV CNTR', 'HV_CNTR', no_count, HV_CNTR_count); document.getElementById('_HV_CNTR" +
          i +
          "').value = " +
          '분해조립_v.HV_CNTR' +
          i +
          "; document.getElementById('_HV_CNTR" +
          i +
          "_2').value = " +
          '분해조립_v.HV_CNTR' +
          i +
          '_2; }'
      );

    _Heating_CNTR1.value = 분해조립_v.Heating_CNTR1;
    _Heating_CNTR1_2.value = 분해조립_v.Heating_CNTR1_2;
    no_count += HV_CNTR_count + 1;
    for (var i = 2; i <= 10; i++)
      eval(
        'if(분해조립_v.Heating_CNTR' +
          i +
          " != '' || (분해조립_v.Heating_CNTR" +
          i +
          "_2 != '' && 분해조립_v.Heating_CNTR" +
          i +
          '_2 != undefined)) ' +
          "{ Heating_CNTR_count += 1; type_add('Heating CNTR', 'Heating_CNTR', no_count, Heating_CNTR_count); document.getElementById('_Heating_CNTR" +
          i +
          "').value = " +
          '분해조립_v.Heating_CNTR' +
          i +
          "; document.getElementById('_Heating_CNTR" +
          i +
          "_2').value = " +
          '분해조립_v.Heating_CNTR' +
          i +
          '_2;}'
      );

    _FuseBox1.value = 분해조립_v.FuseBox1;
    _FuseBox1_2.value = 분해조립_v.FuseBox1_2;
    no_count += Heating_CNTR_count + 1;
    for (var i = 2; i <= 10; i++)
      eval(
        'if(분해조립_v.FuseBox' +
          i +
          " != '' || (분해조립_v.FuseBox" +
          i +
          "_2 != '' && 분해조립_v.FuseBox" +
          i +
          '_2 != undefined)) ' +
          "{ FuseBox_count += 1; type_add('FuseBox', 'FuseBox', no_count, FuseBox_count); document.getElementById('_FuseBox" +
          i +
          "').value = " +
          '분해조립_v.FuseBox' +
          i +
          "; document.getElementById('_FuseBox" +
          i +
          "_2').value = " +
          '분해조립_v.FuseBox' +
          i +
          '_2;}'
      );

    _LV_W_H1.value = 분해조립_v.LV_W_H1;
    _LV_W_H1_2.value = 분해조립_v.LV_W_H1_2;
    no_count += FuseBox_count + 1;
    for (var i = 2; i <= 10; i++)
      eval(
        'if(분해조립_v.LV_W_H' +
          i +
          " != '' || (분해조립_v.LV_W_H" +
          i +
          "_2 != '' && 분해조립_v.LV_W_H" +
          i +
          '_2 != undefined)) ' +
          "{ LV_W_H_count += 1; type_add('LV W/H', 'LV_W_H', no_count, LV_W_H_count); document.getElementById('_LV_W_H" +
          i +
          "').value = " +
          '분해조립_v.LV_W_H' +
          i +
          "; document.getElementById('_LV_W_H" +
          i +
          "_2').value = " +
          '분해조립_v.LV_W_H' +
          i +
          '_2;}'
      );

    _HV_W_H1.value = 분해조립_v.HV_W_H1;
    _HV_W_H1_2.value = 분해조립_v.HV_W_H1_2;
    no_count += LV_W_H_count + 1;
    for (var i = 2; i <= 10; i++)
      eval(
        'if(분해조립_v.HV_W_H' +
          i +
          " != '' || (분해조립_v.HV_W_H" +
          i +
          "_2 != '' && 분해조립_v.HV_W_H" +
          i +
          '_2 != undefined)) ' +
          "{ HV_W_H_count += 1; type_add('HV W/H', 'HV_W_H', no_count, HV_W_H_count); document.getElementById('_HV_W_H" +
          i +
          "').value = " +
          '분해조립_v.HV_W_H' +
          i +
          "; document.getElementById('_HV_W_H" +
          i +
          "_2').value = " +
          '분해조립_v.HV_W_H' +
          i +
          '_2;}'
      );

    _온도센서1.value = 분해조립_v.온도센서1;
    _온도센서1_2.value = 분해조립_v.온도센서1_2;
    no_count += HV_W_H_count + 1;
    for (var i = 2; i <= 10; i++)
      eval(
        'if(분해조립_v.온도센서' +
          i +
          " != '' || (분해조립_v.온도센서" +
          i +
          "_2 != '' && 분해조립_v.온도센서" +
          i +
          '_2 != undefined)) ' +
          "{ 온도센서_count += 1; type_add('온도센서', '온도센서', no_count, 온도센서_count); document.getElementById('_온도센서" +
          i +
          "').value = " +
          '분해조립_v.온도센서' +
          i +
          "; document.getElementById('_온도센서" +
          i +
          "_2').value = " +
          '분해조립_v.온도센서' +
          i +
          '_2;}'
      );

    _Busbars.value = 분해조립_v.Busbars;
    _Busbars_2.value = 분해조립_v.Busbars_2;

    _BMA1.value = 분해조립_v.BMA1;
    _BMA1_2.value = 분해조립_v.BMA1_2;
    no_count += 1 + 온도센서_count + 2;
    for (var i = 2; i <= 10; i++)
      eval(
        'if(분해조립_v.BMA' +
          i +
          " != '' || (분해조립_v.BMA" +
          i +
          "_2 != '' && 분해조립_v.BMA" +
          i +
          '_2 != undefined)) ' +
          "{ BMA_count += 1; type_add('배터리모듈', 'BMA', no_count, BMA_count); document.getElementById('_BMA" +
          i +
          "').value = " +
          '분해조립_v.BMA' +
          i +
          "; document.getElementById('_BMA" +
          i +
          "_2').value = " +
          '분해조립_v.BMA' +
          i +
          '_2;}'
      );

    _ETC.value = 분해조립_v.ETC;
    _공정완료일.value = 분해조립_v.공정완료일;
    _작업자.value = 분해조립_v.작업자;

    find(성능검사, _management_id.value);
    await delay();

    if (성능검사_v != null) {
      if (성능검사_v.분해조립_재의뢰사유 != '') _분해조립_재의뢰사유.value = 성능검사_v.분해조립_재의뢰사유;
    }

    find(EOL, _management_id.value);
    await delay();

    if (EOL_v != null) {
      if (EOL_v.분해조립_재의뢰사유 != '') _분해조립_재의뢰사유.value = 성능검사_v.분해조립_재의뢰사유;
    }
  } else {
    //없는 관리번호이면 항목을 초기화
    _공정입고일.value = '0000-00-00T00:00';
    for (var i = 1; i <= 10; i++) eval('if(typeof _BMU' + i + " != 'undefined') _BMU" + i + ".value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _BMU' + i + "_2 != 'undefined') _BMU" + i + "_2.value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _CMU' + i + " != 'undefined') _CMU" + i + ".value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _CMU' + i + "_2 != 'undefined') _CMU" + i + "_2.value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _PRA' + i + " != 'undefined') _PRA" + i + ".value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _PRA' + i + "_2 != 'undefined') _PRA" + i + "_2.value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _SPA' + i + " != 'undefined') _SPA" + i + ".value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _SPA' + i + "_2 != 'undefined') _SPA" + i + "_2.value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _LWR_C' + i + " != 'undefined') _LWR_C" + i + ".value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _LWR_C' + i + "_2 != 'undefined') _LWR_C" + i + "_2.value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _UPR_C' + i + " != 'undefined') _UPR_C" + i + ".value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _UPR_C' + i + "_2 != 'undefined') _UPR_C" + i + "_2.value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _HV_CNTR' + i + " != 'undefined') _HV_CNTR" + i + ".value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _HV_CNTR' + i + "_2 != 'undefined') _HV_CNTR" + i + "_2.value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _Heating_CNTR' + i + " != 'undefined') _Heating_CNTR" + i + ".value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _Heating_CNTR' + i + "_2 != 'undefined') _Heating_CNTR" + i + "_2.value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _FuseBox' + i + " != 'undefined') _FuseBox" + i + ".value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _FuseBox' + i + "_2 != 'undefined') _FuseBox" + i + "_2.value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _LV_W_H' + i + " != 'undefined') _LV_W_H" + i + ".value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _LV_W_H' + i + "_2 != 'undefined') _LV_W_H" + i + "_2.value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _HV_W_H' + i + " != 'undefined') _HV_W_H" + i + ".value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _HV_W_H' + i + "_2 != 'undefined') _HV_W_H" + i + "_2.value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _온도센서' + i + " != 'undefined') _온도센서" + i + ".value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _온도센서' + i + "_2 != 'undefined') _온도센서" + i + "_2.value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _Relay' + i + " != 'undefined') _Relay" + i + ".value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _Relay' + i + "_2 != 'undefined') _Relay" + i + "_2.value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _BMA' + i + " != 'undefined') _BMA" + i + ".value = '';");
    for (var i = 1; i <= 10; i++) eval('if(typeof _BMA' + i + "_2 != 'undefined') _BMA" + i + "_2.value = '';");
    _PBE.value = '';
    _Gasket.value = '';
    _Busbars.value = '';
    _ETC.value = '';
    _공정완료일.value = '0000-00-00T00:00';
    _작업자.value = 계정_stat.이름;

    var DateTime = luxon.DateTime;
    var seoul = DateTime.local().setZone('Asia/Seoul');
    var now = seoul.toString().substr(0, 19);

    _공정입고일.value = now;
  }

  // '+' 버튼을 눌렀을때를 처리
  const tbody = document.querySelector('#_tb tbody');
  if (first_분해조립 == true) {
    //이벤트가 한번만 등록되게하기 위한것
    first_분해조립 = false;

    tbody.addEventListener('click', function (e) {
      const cell = e.target.closest('td'); //테이블에서 클릭한 셀
      if (!cell) return;
      const row = cell.parentElement; //클릭한 줄
      const row_index = row.rowIndex; //줄의 번호
      const cell_index = cell.cellIndex; //셀의 번호
      console.log('row:', row_index);
      console.log('col:', cell_index);
      if (row_index < 2 || cell_index != 2) return; // '+' 가 아닌 위치는 처리안함
      var str = row.children[0].innerText; //선택한 부품의 라벨
      var type = str.slice(0, -2); //라벨에서 번호를 떼고 부품명만 가져옴
      var no = str.slice(-2); //라벨에서 번호만 가져옴
      console.log('type:', type, 'no:', no);

      //'-' 버튼이면 한줄 삭제 (첫번째 줄은 고정으로 '+' 버튼을 가지고 '+' 버튼으로 새로이 생성된 버튼은 '-'만 가짐
      if (no != 1) {
        _delete_row(row_index, no, type);
      }

      //각 부품의 '+' 버튼은 각 항목을 한줄씩 더함
      if (str == 'BMU 1') {
        if (BMU_count != 10) {
          BMU_count++;
          type_add('BMU', 'BMU', row_index, BMU_count);
        }
      }
      if (str == 'CMU 1') {
        if (CMU_count != 10) {
          CMU_count++;
          type_add('CMU', 'CMU', row_index, CMU_count);
        }
      }
      if (str == 'PRA 1') {
        if (PRA_count != 10) {
          PRA_count++;
          type_add('PRA', 'PRA', row_index, PRA_count);
        }
      }
      if (str == 'SPA 1') {
        if (SPA_count != 10) {
          SPA_count++;
          type_add('SPA', 'SPA', row_index, SPA_count);
        }
      }
      if (str == 'LWR Case 1') {
        if (LWR_C_count != 10) {
          LWR_C_count++;
          type_add('LWR Case', 'LWR_C', row_index, LWR_C_count);
        }
      }
      if (str == 'UPR Case 1') {
        if (UPR_C_count != 10) {
          UPR_C_count++;
          type_add('UPR Case', 'UPR_C', row_index, UPR_C_count);
        }
      }
      if (str == 'Relay 1') {
        if (Relay_count != 10) {
          Relay_count++;
          type_add('Relay', 'Relay', row_index, Relay_count);
        }
      }
      if (str == 'HV CNTR 1') {
        if (HV_CNTR_count != 10) {
          HV_CNTR_count++;
          type_add('HV CNTR', 'HV_CNTR', row_index, HV_CNTR_count);
        }
      }
      if (str == 'Heating CNTR 1') {
        if (Heating_CNTR_count != 10) {
          Heating_CNTR_count++;
          type_add('Heating CNTR', 'Heating_CNTR', row_index, Heating_CNTR_count);
        }
      }
      if (str == 'FuseBox 1') {
        if (FuseBox_count != 10) {
          FuseBox_count++;
          type_add('FuseBox', 'FuseBox', row_index, FuseBox_count);
        }
      }
      if (str == 'LV W/H 1') {
        if (LV_W_H_count != 10) {
          LV_W_H_count++;
          type_add('LV W/H', 'LV_W_H', row_index, LV_W_H_count);
        }
      }
      if (str == 'HV W/H 1') {
        if (HV_W_H_count != 10) {
          HV_W_H_count++;
          type_add('HV W/H', 'HV_W_H', row_index, HV_W_H_count);
        }
      }
      if (str == '온도센서 1') {
        if (온도센서_count != 10) {
          온도센서_count++;
          type_add('온도센서', '온도센서', row_index, 온도센서_count);
        }
      }
      if (str == '배터리모듈 1') {
        if (BMA_count != 10) {
          BMA_count++;
          type_add('배터리모듈', 'BMA', row_index, BMA_count);
        }
      }
    });
  }
}

async function 분해조립_save() {
  if (worker == '') return;
  if (_management_id.value.length == 0) return;
  console.log('save: ', _management_id.value);

  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString().slice(0, 19);

  //일자입력란이 비었으면 자동으로 현재 날짜입력
  if (_공정입고일.value == '') _공정입고일.value = now;
  if (_공정완료일.value == '') _공정완료일.value = now;
  //if(계정_stat.완료일수정 != 'o' || _공정완료일.value == "") _공정완료일.value = now;

  //분해조립 document 변수를 deep copy함
  var doc = JSON.parse(JSON.stringify(분해조립_doc));

  console.log('분해조립 init SAVE:', doc);

  doc.관리번호 = _management_id.value.trim().toUpperCase();
  doc.구분 = _구분.value;
  doc.차종 = _차종.value;
  doc.품번 = _품번.value;
  doc.RO_no = _RO_no.value;
  doc.공정입고일 = _공정입고일.value;
  if (level == '관리자') doc.공정입고일 = _공정입고일.value; //분해조립 공정입고일은 관리자만 수정 가능

  //doc에 부품들의 값을 입력하는것 eval로 실행중 코딩으로 구현
  for (var i = 1; i <= BMU_count; i++) eval("var item = document.getElementById('_BMU" + i + "'); if(typeof item != 'undefined') doc.BMU" + i + ' = item.value;');
  for (var i = 1; i <= BMU_count; i++) eval("var item = document.getElementById('_BMU" + i + "_2'); if(typeof item != 'undefined') doc.BMU" + i + '_2 = item.value;');
  for (var i = 1; i <= CMU_count; i++) eval("var item = document.getElementById('_CMU" + i + "'); if(typeof item != 'undefined') doc.CMU" + i + ' = item.value;');
  for (var i = 1; i <= CMU_count; i++) eval("var item = document.getElementById('_CMU" + i + "_2'); if(typeof item != 'undefined') doc.CMU" + i + '_2 = item.value;');
  for (var i = 1; i <= PRA_count; i++) eval("var item = document.getElementById('_PRA" + i + "'); if(typeof item != 'undefined') doc.PRA" + i + ' = item.value;');
  for (var i = 1; i <= PRA_count; i++) eval("var item = document.getElementById('_PRA" + i + "_2'); if(typeof item != 'undefined') doc.PRA" + i + '_2 = item.value;');
  for (var i = 1; i <= SPA_count; i++) eval("var item = document.getElementById('_SPA" + i + "'); if(typeof item != 'undefined') doc.SPA" + i + ' = item.value;');
  for (var i = 1; i <= SPA_count; i++) eval("var item = document.getElementById('_SPA" + i + "_2'); if(typeof item != 'undefined') doc.SPA" + i + '_2 = item.value;');
  for (var i = 1; i <= LWR_C_count; i++) eval("var item = document.getElementById('_LWR_C" + i + "'); if(typeof item != 'undefined') doc.LWR_C" + i + ' = item.value;');
  for (var i = 1; i <= LWR_C_count; i++) eval("var item = document.getElementById('_LWR_C" + i + "_2'); if(typeof item != 'undefined') doc.LWR_C" + i + '_2 = item.value;');
  for (var i = 1; i <= UPR_C_count; i++) eval("var item = document.getElementById('_UPR_C" + i + "'); if(typeof item != 'undefined') doc.UPR_C" + i + ' = item.value;');
  for (var i = 1; i <= UPR_C_count; i++) eval("var item = document.getElementById('_UPR_C" + i + "_2'); if(typeof item != 'undefined') doc.UPR_C" + i + '_2 = item.value;');
  for (var i = 1; i <= Relay_count; i++) eval("var item = document.getElementById('_Relay" + i + "'); if(typeof item != 'undefined') doc.Relay" + i + ' = item.value;');
  for (var i = 1; i <= Relay_count; i++) eval("var item = document.getElementById('_Relay" + i + "_2'); if(typeof item != 'undefined') doc.Relay" + i + '_2 = item.value;');
  for (var i = 1; i <= HV_CNTR_count; i++) eval("var item = document.getElementById('_HV_CNTR" + i + "'); if(typeof item != 'undefined') doc.HV_CNTR" + i + ' = item.value;');
  for (var i = 1; i <= HV_CNTR_count; i++) eval("var item = document.getElementById('_HV_CNTR" + i + "_2'); if(typeof item != 'undefined') doc.HV_CNTR" + i + '_2 = item.value;');
  for (var i = 1; i <= Heating_CNTR_count; i++) eval("var item = document.getElementById('_Heating_CNTR" + i + "'); if(typeof item != 'undefined') doc.Heating_CNTR" + i + ' = item.value;');
  for (var i = 1; i <= Heating_CNTR_count; i++) eval("var item = document.getElementById('_Heating_CNTR" + i + "_2'); if(typeof item != 'undefined') doc.Heating_CNTR" + i + '_2 = item.value;');
  for (var i = 1; i <= FuseBox_count; i++) eval("var item = document.getElementById('_FuseBox" + i + "'); if(typeof item != 'undefined') doc.FuseBox" + i + ' = item.value;');
  for (var i = 1; i <= FuseBox_count; i++) eval("var item = document.getElementById('_FuseBox" + i + "_2'); if(typeof item != 'undefined') doc.FuseBox" + i + '_2 = item.value;');
  for (var i = 1; i <= LV_W_H_count; i++) eval("var item = document.getElementById('_LV_W_H" + i + "'); if(typeof item != 'undefined') doc.LV_W_H" + i + ' = item.value;');
  for (var i = 1; i <= LV_W_H_count; i++) eval("var item = document.getElementById('_LV_W_H" + i + "_2'); if(typeof item != 'undefined') doc.LV_W_H" + i + '_2 = item.value;');
  for (var i = 1; i <= HV_W_H_count; i++) eval("var item = document.getElementById('_HV_W_H" + i + "'); if(typeof item != 'undefined') doc.HV_W_H" + i + ' = item.value;');
  for (var i = 1; i <= HV_W_H_count; i++) eval("var item = document.getElementById('_HV_W_H" + i + "_2'); if(typeof item != 'undefined') doc.HV_W_H" + i + '_2 = item.value;');
  for (var i = 1; i <= 온도센서_count; i++) eval("var item = document.getElementById('_온도센서" + i + "'); if(typeof item != 'undefined') doc.온도센서" + i + ' = item.value;');
  for (var i = 1; i <= 온도센서_count; i++) eval("var item = document.getElementById('_온도센서" + i + "_2'); if(typeof item != 'undefined') doc.온도센서" + i + '_2 = item.value;');
  for (var i = 1; i <= BMA_count; i++) eval("var item = document.getElementById('_BMA" + i + "'); if(typeof item != 'undefined') doc.BMA" + i + ' = item.value;');
  for (var i = 1; i <= BMA_count; i++) eval("var item = document.getElementById('_BMA" + i + "_2'); if(typeof item != 'undefined') doc.BMA" + i + '_2 = item.value;');
  doc.PBE = _PBE.value;
  doc.PBE_2 = _PBE_2.value;
  doc.Gasket = _Gasket.value;
  doc.Gasket_2 = _Gasket_2.value;
  doc.Busbars = _Busbars.value;
  doc.Busbars_2 = _Busbars_2.value;
  doc.ETC = _ETC.value;
  doc.공정완료일 = _공정완료일.value;
  if (level == '관리자') doc.공정완료일 = _공정완료일.value;
  doc.작업자 = _작업자.value;

  //신품 작업시
  console.log(신품_docs);
  신품_docs.forEach(async function (new_doc) {
    update_신품정보(자재입출고, new_doc);
    await delay();

    console.log(update_count);
    console.log(insert_count);
  });

  console.log(고품_docs);
  고품_docs.forEach(async function (old_doc) {
    update_고품정보(고품정보, old_doc);
    await delay();

    console.log(update_count);
    console.log(insert_count);
  });

  console.log('분해조립 SAVE:', doc);
  update(분해조립, doc);
  await delay();

  console.log(update_count);
  console.log(insert_count);

  if (update_count > 0) {
    alert('업데이트 되었습니다');
  }

  if (insert_count > 0) {
    alert('저장 되었습니다');
  }

  //find(BSA재제조, _management_id.value);
  //await delay();

  //if (BSA재제조_v == null) {
  //	var _doc = JSON.parse(JSON.stringify(BSA재제조_doc));
  //	_doc.관리번호 = _management_id.value.trim().toUpperCase();
  //	_doc.분해조립투입일 = _공정입고일.value;
  //	_doc.분해조립 = _공정완료일.value;

  //	update(BSA재제조, _doc);
  //	await delay();
  //} else {
  var _doc = {
    관리번호: _management_id.value.toUpperCase(),
    분해조립투입일: _공정입고일.value,
    분해조립: _공정완료일.value,
  };

  update(BSA재제조, _doc);
  await delay();
  //}

  await 공정단계자동입력(_management_id.value);
  //이전페이지();
}

//사용안함
async function request_신품QR() {
  var 교체후_QR = prompt('교체후 QR을 입력하세요');
  var 교체후_품번 = prompt('교체후 품번을 입력하세요');
  var str = '교체후 QR:' + 교체후_QR + ', 교체후 품번:' + 교체후_품번;
  var 교체전_QR = prompt('교체전 QR을 입력하세요');
  var 교체전_품번 = prompt('교체전 품번을 입력하세요');
  str += ', 교체전 QR:' + 교체전_QR + ', 교체전 품번:' + 교체전_품번;
  console.log(str);

  return str;
}

//고품정보에 사용한 BSA 정보를 기입함
async function request_고품QR() {
  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString().substr(0, 19);
  var 교체후_QR = prompt('교체후 QR을 입력하세요');

  findOne_고품정보(고품정보, { QR: 교체후_QR });
  await delay();

  if (고품정보_v != null) {
    var doc = JSON.parse(JSON.stringify(고품정보_doc));
    doc.관리번호 = 고품정보_v.관리번호;
    doc.품명 = 고품정보_v.품명;
    doc.번호 = 고품정보_v.번호;
    doc.QR = 고품정보_v.QR;
    doc.폐기여부 = 고품정보_v.폐기여부;
    doc.사용여부 = '사용';
    doc.사용일 = now;
    doc.사용_작업자 = _작업자.value;
    doc.사용_관리번호 = _management_id.value.trim().toUpperCase();
    고품_docs.push(doc);
    console.log(고품_docs);
  } else {
    //alert('해당 QR을 부품재고에서 찾을 수 없습니다.');
  }

  //var 교체후_품번 = prompt('교체후 품번을 입력하세요');
  //var str = '교체후 QR:' + 교체후_QR + ', 교체후 품번:' + 교체후_품번;
  //var 교체전_QR = prompt('교체전 QR을 입력하세요');
  //var 교체전_품번 = prompt('교체전 품번을 입력하세요');
  //str += ', 교체전 QR:' + 교체전_QR + ', 교체전 품번:' + 교체전_품번;
  var str = '교체후 QR:' + 교체후_QR;
  console.log(str);

  return str;
}

async function _콤보박스(type, e) {
  var value = e.value;

  if (value == '신품 교체') {
    //var 관련번호 = await request_신품QR();
    //value = value + '(' + 관련번호 + ')';
  }

  if (value == '고품 교체') {
    var 관련번호 = await request_고품QR();
    value = value + '(' + 관련번호 + ')';
  }

  console.log('test:', type);
  document.getElementById(type).value = value;
}

async function type_add(name, type, row_index, no) {
  if (no > 10) return;

  const _tb = document.getElementById('_tb');
  console.log('type:', '_' + type + no);
  var current_row;
  current_row = _tb.insertRow(row_index + no);
  var insert_string =
    '<td><label for="_' +
    type +
    no +
    '"><b>' +
    name +
    ' ' +
    no +
    '</b></label></td><td class="td_plus">교환전&nbsp;<input type="text" id="_' +
    type +
    no +
    '" size="100" value=\' \' required>&nbsp;<select name="language" onchange="_콤보박스(\'_' +
    type +
    no +
    '\', this);"><option value="">---</option><option value="신품 교체">신품 교체</option><option value="고품 교체">고품 교체</option><option value="N/A">N/A</option></select><br/>교환후&nbsp;<input type="text" id="_' +
    type +
    no +
    '_2" size="100" value=\' \' required>&nbsp;<select name="language" onchange="_콤보박스(\'_' +
    type +
    no +
    '_2\', this);"><option value="">---</option><option value="신품 교체">신품 교체</option><option value="고품 교체">고품 교체</option><option value="N/A">N/A</option></select></td><td class="minus"><button>-</button></td></tr>';
  console.log(insert_string);
  current_row.innerHTML = insert_string;
  await sleep(1);
}

function _delete_row(index, no, type) {
  const _tb = document.getElementById('_tb');
  type = type.trim();
  console.log(index, no, type, BMU_count);

  if (type == 'BMU' && no == BMU_count) {
    _tb.deleteRow(index);
    BMU_count = no - 1;
  }

  if (type == 'CMU' && no == CMU_count) {
    _tb.deleteRow(index);
    CMU_count = no - 1;
  }

  if (type == 'PRA' && no == PRA_count) {
    _tb.deleteRow(index);
    PRA_count = no - 1;
  }

  if (type == 'SPA' && no == SPA_count) {
    _tb.deleteRow(index);
    SPA_count = no - 1;
  }

  if (type == 'LWR Case' && no == LWR_C_count) {
    _tb.deleteRow(index);
    LWR_C_count = no - 1;
  }

  if (type == 'UPR Case' && no == UPR_C_count) {
    _tb.deleteRow(index);
    UPR_C_count = no - 1;
  }

  if (type == 'PBE' && no == PBE_count) {
    _tb.deleteRow(index);
    PBE_count = no - 1;
  }

  if (type == 'Gasket' && no == Gasket_count) {
    _tb.deleteRow(index);
    Gasket_count = no - 1;
  }

  if (type == 'Relay' && no == Relay_count) {
    _tb.deleteRow(index);
    Relay_count = no - 1;
  }

  if (type == 'HV CNTR' && no == HV_CNTR_count) {
    _tb.deleteRow(index);
    HV_CNTR_count = no - 1;
  }

  if (type == 'Heating CNTR' && no == Heating_CNTR_count) {
    _tb.deleteRow(index);
    Heating_CNTR_count = no - 1;
  }

  if (type == 'FuseBox' && no == FuseBox_count) {
    _tb.deleteRow(index);
    FuseBox_count = no - 1;
  }

  if (type == 'LV W/H' && no == LV_W_H_count) {
    _tb.deleteRow(index);
    LV_W_H_count = no - 1;
  }

  if (type == 'HV W/H' && no == HV_W_H_count) {
    _tb.deleteRow(index);
    HV_W_H_count = no - 1;
  }

  if (type == '온도센서' && no == 온도센서_count) {
    _tb.deleteRow(index);
    온도센서_count = no - 1;
  }

  if (type == '배터리모듈' && no == BMA_count) {
    _tb.deleteRow(index);
    BMA_count = no - 1;
  }
}

function _delete_all() {
  const _tb = document.getElementById('_tb');

  while (BMA_count > 1) {
    var index = _tb.rows.length - 5;
    _tb.deleteRow(index);
    BMA_count--;
  }

  while (온도센서_count > 1) {
    var index = _tb.rows.length - 9;
    _tb.deleteRow(index);
    온도센서_count--;
  }

  while (HV_W_H_count > 1) {
    var index = _tb.rows.length - 11;
    _tb.deleteRow(index);
    HV_W_H_count--;
  }

  while (LV_W_H_count > 1) {
    var index = _tb.rows.length - 13;
    _tb.deleteRow(index);
    LV_W_H_count--;
  }

  while (FuseBox_count > 1) {
    var index = _tb.rows.length - 15;
    _tb.deleteRow(index);
    FuseBox_count--;
  }

  while (Heating_CNTR_count > 1) {
    var index = _tb.rows.length - 17;
    _tb.deleteRow(index);
    Heating_CNTR_count--;
  }

  while (HV_CNTR_count > 1) {
    var index = _tb.rows.length - 19;
    _tb.deleteRow(index);
    HV_CNTR_count--;
  }

  while (Relay_count > 1) {
    var index = _tb.rows.length - 21;
    _tb.deleteRow(index);
    Relay_count--;
  }

  while (UPR_C_count > 1) {
    var index = _tb.rows.length - 27;
    _tb.deleteRow(index);
    UPR_C_count--;
  }

  while (LWR_C_count > 1) {
    var index = _tb.rows.length - 29;
    _tb.deleteRow(index);
    LWR_C_count--;
  }

  while (SPA_count > 1) {
    var index = _tb.rows.length - 31;
    _tb.deleteRow(index);
    SPA_count--;
  }

  while (PRA_count > 1) {
    var index = _tb.rows.length - 33;
    _tb.deleteRow(index);
    PRA_count--;
  }

  while (CMU_count > 1) {
    var index = _tb.rows.length - 35;
    _tb.deleteRow(index);
    CMU_count--;
  }

  while (BMU_count > 1) {
    var index = _tb.rows.length - 37;
    _tb.deleteRow(index);
    BMU_count--;
  }
}

function 분해조립_updateFilter() {
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
    분해조립_list_table.setFilter(filter, typeVal, valueEl.value);
  }
}

var 분해조립_list_table;
async function 분해조립_list() {
  findOne_BSA재제조(BSA재제조, {
    공정단계: { $ne: '출하' },
    기초검사: { $ne: '' },
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
      기초검사: { $ne: '' },
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

  console.log(BSA재제조_v);

  분해조립_list_table = new Tabulator('#grid_list', {
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

  분해조립_list_table.on('rowClick', async function (e, row) {
    console.log('selected 관리번호: ', row.getData().관리번호);

    _management_id.value = row.getData().관리번호;

    await sleep(1);

    var yes = confirm('선택한 BSA로 분해조립 공정 정보입력을 시작하시겠습니까?');
    if (yes != true) return;

    분해조립_시작(0);
  });

  //Update filters on value change
  document.getElementById('filter-field').addEventListener('change', 분해조립_updateFilter);
  document.getElementById('filter-type').addEventListener('change', 분해조립_updateFilter);
  document.getElementById('filter-value').addEventListener('keyup', 분해조립_updateFilter);

  //Clear filters on "Clear Filters" button click
  document.getElementById('filter-clear').addEventListener('click', function () {
    var fieldEl = document.getElementById('filter-field');
    var typeEl = document.getElementById('filter-type');
    var valueEl = document.getElementById('filter-value');
    fieldEl.value = '';
    typeEl.value = '=';
    valueEl.value = '';

    분해조립_list_table.clearFilter();
  });
}

function 분해조립_loading() {
  for (var i = 1; i <= 10; i++) eval('if(typeof _BMU' + i + " != 'undefined') _BMU" + i + ".value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _BMU' + i + "_2 != 'undefined') _BMU" + i + "_2.value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _CMU' + i + " != 'undefined') _CMU" + i + ".value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _CMU' + i + "_2 != 'undefined') _CMU" + i + "_2.value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _PRA' + i + " != 'undefined') _PRA" + i + ".value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _PRA' + i + "_2 != 'undefined') _PRA" + i + "_2.value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _SPA' + i + " != 'undefined') _SPA" + i + ".value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _SPA' + i + "_2 != 'undefined') _SPA" + i + "_2.value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _LWR_C' + i + " != 'undefined') _LWR_C" + i + ".value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _LWR_C' + i + "_2 != 'undefined') _LWR_C" + i + "_2.value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _UPR_C' + i + " != 'undefined') _UPR_C" + i + ".value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _UPR_C' + i + "_2 != 'undefined') _UPR_C" + i + "_2.value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _HV_CNTR' + i + " != 'undefined') _HV_CNTR" + i + ".value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _HV_CNTR' + i + "_2 != 'undefined') _HV_CNTR" + i + "_2.value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _Heating_CNTR' + i + " != 'undefined') _Heating_CNTR" + i + ".value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _Heating_CNTR' + i + "_2 != 'undefined') _Heating_CNTR" + i + "_2.value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _FuseBox' + i + " != 'undefined') _FuseBox" + i + ".value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _FuseBox' + i + "_2 != 'undefined') _FuseBox" + i + "_2.value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _LV_W_H' + i + " != 'undefined') _LV_W_H" + i + ".value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _LV_W_H' + i + "_2 != 'undefined') _LV_W_H" + i + "_2.value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _HV_W_H' + i + " != 'undefined') _HV_W_H" + i + ".value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _HV_W_H' + i + "_2 != 'undefined') _HV_W_H" + i + "_2.value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _온도센서' + i + " != 'undefined') _온도센서" + i + ".value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _온도센서' + i + "_2 != 'undefined') _온도센서" + i + "_2.value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _Relay' + i + " != 'undefined') _Relay" + i + ".value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _Relay' + i + "_2 != 'undefined') _Relay" + i + "_2.value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _BMA' + i + " != 'undefined') _BMA" + i + ".value = '';");
  for (var i = 1; i <= 10; i++) eval('if(typeof _BMA' + i + "_2 != 'undefined') _BMA" + i + "_2.value = '';");

  _delete_all();

  BMU_count = 1;
  CMU_count = 1;
  PRA_count = 1;
  SPA_count = 1;
  LWR_C_count = 1;
  UPR_C_count = 1;
  PBE_count = 1;
  Gasket_count = 1;
  Relay_count = 1;
  HV_CNTR_count = 1;
  Heating_CNTR_count = 1;
  FuseBox_count = 1;
  LV_W_H_count = 1;
  HV_W_H_count = 1;
  온도센서_count = 1;
  Busbars_count = 1;
  BMA_count = 1;
}

function 분해조립_exit() {
  분해조립_loading();
  back();
}
