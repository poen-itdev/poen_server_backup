//각 부품들의 차종별 리스트 배열 선언
var DE_SK3_LWR_CASE = [];
var OS_LWR_CASE = [];
var HR_PU_LWR_CASE = [];
var CV_LWR_CASE = [];
var NE_LWR_CASE = [];
var JW_LWR_CASE = [];
var CS_LWR_CASE = [];
var LK_LWR_CASE = [];
var LK_FC_LWR_CASE = [];
var LM_LWR_CASE = [];

var DE_SK3_UPR_CASE = [];
var OS_UPR_CASE = [];
var HR_PU_UPR_CASE = [];
var CV_UPR_CASE = [];
var NE_UPR_CASE = [];
var JW_UPR_CASE = [];
var CS_UPR_CASE = [];
var LK_UPR_CASE = [];
var LK_FC_UPR_CASE = [];
var LM_UPR_CASE = [];

var DE_SK3_S_PLUG = [];
var OS_S_PLUG = [];
var HR_PU_S_PLUG = [];
var CV_S_PLUG = [];
var NE_S_PLUG = [];
var JW_S_PLUG = [];
var CS_S_PLUG = [];
var LK_S_PLUG = [];
var LK_FC_S_PLUG = [];
var LM_S_PLUG = [];

var DE_SK3_SPA = [];
var OS_SPA = [];
var HR_PU_SPA = [];
var CV_SPA = [];
var NE_SPA = [];
var JW_SPA = [];
var CS_SPA = [];
var LK_SPA = [];
var LK_FC_SPA = [];
var LM_SPA = [];

var DE_SK3_HV_CNTR = [];
var OS_HV_CNTR = [];
var HR_PU_HV_CNTR = [];
var CV_HV_CNTR = [];
var NE_HV_CNTR = [];
var JW_HV_CNTR = [];
var CS_HV_CNTR = [];
var LK_HV_CNTR = [];
var LK_FC_HV_CNTR = [];
var LM_HV_CNTR = [];

var DE_SK3_HT_CNTR = [];
var OS_HT_CNTR = [];
var HR_PU_HT_CNTR = [];
var CV_HT_CNTR = [];
var NE_HT_CNTR = [];
var JW_HT_CNTR = [];
var CS_HT_CNTR = [];
var LK_HT_CNTR = [];
var LK_FC_HT_CNTR = [];
var LM_HT_CNTR = [];

var DE_SK3_PRA = [];
var OS_PRA = [];
var HR_PU_PRA = [];
var CV_PRA = [];
var NE_PRA = [];
var JW_PRA = [];
var CS_PRA = [];
var LK_PRA = [];
var LK_FC_PRA = [];
var LM_PRA = [];

var DE_SK3_FUSE = [];
var OS_FUSE = [];
var HR_PU_FUSE = [];
var CV_FUSE = [];
var NE_FUSE = [];
var JW_FUSE = [];
var CS_FUSE = [];
var LK_FUSE = [];
var LK_FC_FUSE = [];
var LM_FUSE = [];

var DE_SK3_RELAY = [];
var OS_RELAY = [];
var HR_PU_RELAY = [];
var CV_RELAY = [];
var NE_RELAY = [];
var JW_RELAY = [];
var CS_RELAY = [];
var LK_RELAY = [];
var LK_FC_RELAY = [];
var LM_RELAY = [];

var DE_SK3_LV_W_H = [];
var OS_LV_W_H = [];
var HR_PU_LV_W_H = [];
var CV_LV_W_H = [];
var NE_LV_W_H = [];
var JW_LV_W_H = [];
var CS_LV_W_H = [];
var LK_LV_W_H = [];
var LK_FC_LV_W_H = [];
var LM_LV_W_H = [];

var DE_SK3_HV_W_H = [];
var OS_HV_W_H = [];
var HR_PU_HV_W_H = [];
var CV_HV_W_H = [];
var NE_HV_W_H = [];
var JW_HV_W_H = [];
var CS_HV_W_H = [];
var LK_HV_W_H = [];
var LK_FC_HV_W_H = [];
var LM_HV_W_H = [];

var DE_SK3_BMU = [];
var OS_BMU = [];
var HR_PU_BMU = [];
var CV_BMU = [];
var NE_BMU = [];
var JW_BMU = [];
var CS_BMU = [];
var LK_BMU = [];
var LK_FC_BMU = [];
var LM_BMU = [];

var DE_SK3_온도센서 = [];
var OS_온도센서 = [];
var HR_PU_온도센서 = [];
var CV_온도센서 = [];
var NE_온도센서 = [];
var JW_온도센서 = [];
var CS_온도센서 = [];
var LK_온도센서 = [];
var LK_FC_온도센서 = [];
var LM_온도센서 = [];

var DE_SK3_CMU = [];
var OS_CMU = [];
var HR_PU_CMU = [];
var CV_CMU = [];
var NE_CMU = [];
var JW_CMU = [];
var CS_CMU = [];
var LK_CMU = [];
var LK_FC_CMU = [];
var LM_CMU = [];

var DE_SK3_MODULE = [];
var OS_MODULE = [];
var HR_PU_MODULE = [];
var CV_MODULE = [];
var NE_MODULE = [];
var JW_MODULE = [];
var CS_MODULE = [];
var LK_MODULE = [];
var LK_FC_MODULE = [];
var LM_MODULE = [];

async function 부품정보_list_시작() {
  await sleep(100);
  if (typeof _D == 'undefined') {
    await sleep(1);
    return;
  }
  flag_부품정보_list = false;

  console.log(관리번호, 차종);

  _management_id.value = 관리번호;
  _차종.value = 차종;

  var sels = document.querySelectorAll('.select_box');
  sels.forEach((sel) => {
    sel.addEventListener('change', get_sel_value);
  });

  auto_focus();

  //차종별 표시항목들을 일단 모두 숨김
  _A.style.display = 'none';
  _B.style.display = 'none';
  _C.style.display = 'none';
  _D.style.display = 'none';
  _D2.style.display = 'none';

  _img_1.style.display = 'none';
  _img_2.style.display = 'none';
  _img_3.style.display = 'none';
  _img_4.style.display = 'none';
  _img_5.style.display = 'none';

  //기존의 입력된 데이터값을 불러옴
  await 부품정보_list_load();

  //부품별 저장된 품번들을 불러옴
  await 품번_list();

  //차종별 화면 부품 그림 표시
  switch (차종) {
    case 'DE':
    case 'DE_EV':
    case 'OS':
    case 'OS_EV':
    case 'SK3':
    case 'SK3_EV':
    case 'LK':
    case 'LK_EV':
      _A.style.display = 'block';
      _B.style.display = 'none';
      _C.style.display = 'none';
      _D.style.display = 'none';
      _D2.style.display = 'none';

      _img_1.style.display = 'block';
      _img_2.style.display = 'none';
      _img_3.style.display = 'none';
      _img_4.style.display = 'none';
      _img_5.style.display = 'none';

      _A_UPR_CASE_QR.focus(); //첫번째 항목에 포커스 이동
      select_box_set_A(); //차종에 맞추어 품번의 셀렉트  리스트 입력
      break;

    case 'PU':
    case 'PU_EV':
    case 'HR':
    case 'HR_EV':
      _A.style.display = 'none';
      _B.style.display = 'block';
      _C.style.display = 'none';
      _D.style.display = 'none';
      _D2.style.display = 'none';

      _img_1.style.display = 'none';
      _img_2.style.display = 'block';
      _img_3.style.display = 'none';
      _img_4.style.display = 'none';
      _img_5.style.display = 'none';

      _B_UPR_CASE_QR.focus();
      select_box_set_B();
      break;

    case 'CV':
    case 'CV_EV':
    case 'NE':
    case 'NE_EV':
    case 'LM':
    case 'LM_EV':
      _A.style.display = 'none';
      _B.style.display = 'none';
      _C.style.display = 'block';
      _D.style.display = 'none';
      _D2.style.display = 'none';

      _img_1.style.display = 'none';
      _img_2.style.display = 'none';
      _img_3.style.display = 'block';
      _img_4.style.display = 'none';
      _img_5.style.display = 'none';

      _C_UPR_CASE_QR.focus();
      select_box_set_C();
      break;

    case 'CS':
    case 'CS_EV':
      _A.style.display = 'none';
      _B.style.display = 'none';
      _C.style.display = 'none';
      _D.style.display = 'block';
      _D2.style.display = 'block';

      _img_1.style.display = 'none';
      _img_2.style.display = 'none';
      _img_3.style.display = 'none';
      _img_4.style.display = 'block';
      _img_5.style.display = 'block';

      _D_UPR_CASE_QR.focus();
      select_box_set_D();
      break;

    default:
      alert('차종 정보를 확인해주세요');

      return;
      break;
  }
}

async function 품번_list() {
  //차종별 각 부품들의 품번을 저장할 배열을 선언
  DE_SK3_LWR_CASE = [];
  OS_LWR_CASE = [];
  HR_PU_LWR_CASE = [];
  CV_LWR_CASE = [];
  NE_LWR_CASE = [];
  JW_LWR_CASE = [];
  CS_LWR_CASE = [];
  LK_LWR_CASE = [];
  LKFC_LWR_CASE = [];
  LM_LWR_CASE = [];

  DE_SK3_UPR_CASE = [];
  OS_UPR_CASE = [];
  HR_PU_UPR_CASE = [];
  CV_UPR_CASE = [];
  NE_UPR_CASE = [];
  JW_UPR_CASE = [];
  CS_UPR_CASE = [];
  LK_UPR_CASE = [];
  LKFC_UPR_CASE = [];
  LM_UPR_CASE = [];

  DE_SK3_S_PLUG = [];
  OS_S_PLUG = [];
  HR_PU_S_PLUG = [];
  CV_S_PLUG = [];
  NE_S_PLUG = [];
  JW_S_PLUG = [];
  CS_S_PLUG = [];
  LK_S_PLUG = [];
  LKFC_S_PLUG = [];
  LM_S_PLUG = [];

  DE_SK3_SPA = [];
  OS_SPA = [];
  HR_PU_SPA = [];
  CV_SPA = [];
  NE_SPA = [];
  JW_SPA = [];
  CS_SPA = [];
  LK_SPA = [];
  LKFC_SPA = [];
  LM_SPA = [];

  DE_SK3_HV_CNTR = [];
  OS_HV_CNTR = [];
  HR_PU_HV_CNTR = [];
  CV_HV_CNTR = [];
  NE_HV_CNTR = [];
  JW_HV_CNTR = [];
  CS_HV_CNTR = [];
  LK_HV_CNTR = [];
  LKFC_HV_CNTR = [];
  LM_HV_CNTR = [];

  DE_SK3_HT_CNTR = [];
  OS_HT_CNTR = [];
  HR_PU_HT_CNTR = [];
  CV_HT_CNTR = [];
  NE_HT_CNTR = [];
  JW_HT_CNTR = [];
  CS_HT_CNTR = [];
  LK_HT_CNTR = [];
  LKFC_HT_CNTR = [];
  LM_HT_CNTR = [];

  DE_SK3_PRA = [];
  OS_PRA = [];
  HR_PU_PRA = [];
  CV_PRA = [];
  NE_PRA = [];
  JW_PRA = [];
  CS_PRA = [];
  LK_PRA = [];
  LKFC_PRA = [];
  LM_PRA = [];

  DE_SK3_FUSE = [];
  OS_FUSE = [];
  HR_PU_FUSE = [];
  CV_FUSE = [];
  NE_FUSE = [];
  JW_FUSE = [];
  CS_FUSE = [];
  LK_FUSE = [];
  LKFC_FUSE = [];
  LM_FUSE = [];

  DE_SK3_RELAY = [];
  OS_RELAY = [];
  HR_PU_RELAY = [];
  CV_RELAY = [];
  NE_RELAY = [];
  JW_RELAY = [];
  CS_RELAY = [];
  LK_RELAY = [];
  LKFC_RELAY = [];

  DE_SK3_LV_W_H = [];
  OS_LV_W_H = [];
  HR_PU_LV_W_H = [];
  CV_LV_W_H = [];
  NE_LV_W_H = [];
  JW_LV_W_H = [];
  CS_LV_W_H = [];
  LK_LV_W_H = [];
  LKFC_LV_W_H = [];
  LM_LV_W_H = [];

  DE_SK3_HV_W_H = [];
  OS_HV_W_H = [];
  HR_PU_HV_W_H = [];
  CV_HV_W_H = [];
  NE_HV_W_H = [];
  JW_HV_W_H = [];
  CS_HV_W_H = [];
  LK_HV_W_H = [];
  LKFC_HV_W_H = [];
  LM_HV_W_H = [];

  DE_SK3_BMU = [];
  OS_BMU = [];
  HR_PU_BMU = [];
  CV_BMU = [];
  NE_BMU = [];
  JW_BMU = [];
  CS_BMU = [];
  LK_BMU = [];
  LKFC_BMU = [];
  LM_BMU = [];

  DE_SK3_온도센서 = [];
  OS_온도센서 = [];
  HR_PU_온도센서 = [];
  CV_온도센서 = [];
  NE_온도센서 = [];
  JW_온도센서 = [];
  CS_온도센서 = [];
  LK_온도센서 = [];
  LKFC_온도센서 = [];
  LM_온도센서 = [];

  DE_SK3_CMU = [];
  OS_CMU = [];
  HR_PU_CMU = [];
  CV_CMU = [];
  NE_CMU = [];
  JW_CMU = [];
  CS_CMU = [];
  LK_CMU = [];
  LKFC_CMU = [];
  LM_CMU = [];

  DE_SK3_MODULE = [];
  OS_MODULE = [];
  HR_PU_MODULE = [];
  CV_MODULE = [];
  NE_MODULE = [];
  JW_MODULE = [];
  CS_MODULE = [];
  LK_MODULE = [];
  LKFC_MODULE = [];
  LM_MODULE = [];

  //저장된 품번을 각 차종 및 부품별로 불러옴
  find_품번(품번, { 번호: { $exists: true } });
  await delay();

  if (품번_v != null) {
    품번_v.forEach(function (품번) {
      switch (품번.차종) {
        case 'DE/SK3':
        case 'DE_SK3':
          DE_SK3_LWR_CASE.push(품번.LWR_CASE);
          DE_SK3_UPR_CASE.push(품번.UPR_CASE);
          DE_SK3_S_PLUG.push(품번.S_PLUG);
          DE_SK3_SPA.push(품번.SPA);
          DE_SK3_HV_CNTR.push(품번.HV_CNTR);
          DE_SK3_HT_CNTR.push(품번.HT_CNTR);
          DE_SK3_PRA.push(품번.PRA);
          DE_SK3_FUSE.push(품번.FUSE);
          DE_SK3_RELAY.push(품번.RELAY);
          DE_SK3_LV_W_H.push(품번.LV_W_H);
          DE_SK3_HV_W_H.push(품번.HV_W_H);
          DE_SK3_BMU.push(품번.BMU);
          DE_SK3_온도센서.push(품번.온도센서);
          DE_SK3_CMU.push(품번.CMU);
          DE_SK3_MODULE.push(품번.MODULE);

          break;

        case 'OS':
          OS_LWR_CASE.push(품번.LWR_CASE);
          OS_UPR_CASE.push(품번.UPR_CASE);
          OS_S_PLUG.push(품번.S_PLUG);
          OS_SPA.push(품번.SPA);
          OS_HV_CNTR.push(품번.HV_CNTR);
          OS_HT_CNTR.push(품번.HT_CNTR);
          OS_PRA.push(품번.PRA);
          OS_FUSE.push(품번.FUSE);
          OS_RELAY.push(품번.RELAY);
          OS_LV_W_H.push(품번.LV_W_H);
          OS_HV_W_H.push(품번.HV_W_H);
          OS_BMU.push(품번.BMU);
          OS_온도센서.push(품번.온도센서);
          OS_CMU.push(품번.CMU);
          OS_MODULE.push(품번.MODULE);

          break;

        case 'HR/PU':
          HR_PU_LWR_CASE.push(품번.LWR_CASE);
          HR_PU_UPR_CASE.push(품번.UPR_CASE);
          HR_PU_HV_CNTR.push(품번.HV_CNTR);
          HR_PU_HT_CNTR.push(품번.HT_CNTR);
          HR_PU_PRA.push(품번.PRA);
          HR_PU_FUSE.push(품번.FUSE);
          HR_PU_LV_W_H.push(품번.LV_W_H);
          HR_PU_HV_W_H.push(품번.HV_W_H);
          HR_PU_BMU.push(품번.BMU);
          HR_PU_온도센서.push(품번.온도센서);
          HR_PU_CMU.push(품번.CMU);
          HR_PU_MODULE.push(품번.MODULE);

          break;

        case 'CV':
          CV_LWR_CASE.push(품번.LWR_CASE);
          CV_UPR_CASE.push(품번.UPR_CASE);
          CV_S_PLUG.push(품번.S_PLUG);
          CV_HV_CNTR.push(품번.HV_CNTR);
          CV_HT_CNTR.push(품번.HT_CNTR);
          CV_PRA.push(품번.PRA);
          CV_FUSE.push(품번.FUSE);
          CV_LV_W_H.push(품번.LV_W_H);
          CV_HV_W_H.push(품번.HV_W_H);
          CV_BMU.push(품번.BMU);
          CV_온도센서.push(품번.온도센서);
          CV_CMU.push(품번.CMU);
          CV_MODULE.push(품번.MODULE);

          break;

        case 'NE':
          NE_LWR_CASE.push(품번.LWR_CASE);
          NE_UPR_CASE.push(품번.UPR_CASE);
          NE_S_PLUG.push(품번.S_PLUG);
          NE_SPA.push(품번.SPA);
          NE_HV_CNTR.push(품번.HV_CNTR);
          NE_HT_CNTR.push(품번.HT_CNTR);
          NE_PRA.push(품번.PRA);
          NE_FUSE.push(품번.FUSE);
          NE_RELAY.push(품번.RELAY);
          NE_LV_W_H.push(품번.LV_W_H);
          NE_HV_W_H.push(품번.HV_W_H);
          NE_BMU.push(품번.BMU);
          NE_온도센서.push(품번.온도센서);
          NE_CMU.push(품번.CMU);
          NE_MODULE.push(품번.MODULE);

          break;

        case 'JW':
          JW_LWR_CASE.push(품번.LWR_CASE);
          JW_UPR_CASE.push(품번.UPR_CASE);
          JW_S_PLUG.push(품번.S_PLUG);
          JW_SPA.push(품번.SPA);
          JW_HV_CNTR.push(품번.HV_CNTR);
          JW_HT_CNTR.push(품번.HT_CNTR);
          JW_PRA.push(품번.PRA);
          JW_FUSE.push(품번.FUSE);
          JW_RELAY.push(품번.RELAY);
          JW_LV_W_H.push(품번.LV_W_H);
          JW_HV_W_H.push(품번.HV_W_H);
          JW_BMU.push(품번.BMU);
          JW_온도센서.push(품번.온도센서);
          JW_CMU.push(품번.CMU);
          JW_MODULE.push(품번.MODULE);

          break;

        case 'CS':
          CS_LWR_CASE.push(품번.LWR_CASE);
          CS_UPR_CASE.push(품번.UPR_CASE);
          CS_S_PLUG.push(품번.S_PLUG);
          CS_SPA.push(품번.SPA);
          CS_HV_CNTR.push(품번.HV_CNTR);
          CS_HT_CNTR.push(품번.HT_CNTR);
          CS_PRA.push(품번.PRA);
          CS_FUSE.push(품번.FUSE);
          CS_RELAY.push(품번.RELAY);
          CS_LV_W_H.push(품번.LV_W_H);
          CS_HV_W_H.push(품번.HV_W_H);
          CS_BMU.push(품번.BMU);
          CS_온도센서.push(품번.온도센서);
          CS_CMU.push(품번.CMU);
          CS_MODULE.push(품번.MODULE);

          break;

        case 'LK':
          LK_LWR_CASE.push(품번.LWR_CASE);
          LK_UPR_CASE.push(품번.UPR_CASE);
          LK_S_PLUG.push(품번.S_PLUG);
          LK_SPA.push(품번.SPA);
          LK_HV_CNTR.push(품번.HV_CNTR);
          LK_HT_CNTR.push(품번.HT_CNTR);
          LK_PRA.push(품번.PRA);
          LK_FUSE.push(품번.FUSE);
          LK_RELAY.push(품번.RELAY);
          LK_LV_W_H.push(품번.LV_W_H);
          LK_HV_W_H.push(품번.HV_W_H);
          LK_BMU.push(품번.BMU);
          LK_온도센서.push(품번.온도센서);
          LK_CMU.push(품번.CMU);
          LK_MODULE.push(품번.MODULE);

          break;

        case 'LKFC':
          LKFC_LWR_CASE.push(품번.LWR_CASE);
          LKFC_UPR_CASE.push(품번.UPR_CASE);
          LKFC_S_PLUG.push(품번.S_PLUG);
          LKFC_SPA.push(품번.SPA);
          LKFC_HV_CNTR.push(품번.HV_CNTR);
          LKFC_HT_CNTR.push(품번.HT_CNTR);
          LKFC_PRA.push(품번.PRA);
          LKFC_FUSE.push(품번.FUSE);
          LKFC_RELAY.push(품번.RELAY);
          LKFC_LV_W_H.push(품번.LV_W_H);
          LKFC_HV_W_H.push(품번.HV_W_H);
          LKFC_BMU.push(품번.BMU);
          LKFC_온도센서.push(품번.온도센서);
          LKFC_CMU.push(품번.CMU);
          LKFC_MODULE.push(품번.MODULE);

          break;

        case 'LM':
          LM_LWR_CASE.push(품번.LWR_CASE);
          LM_UPR_CASE.push(품번.UPR_CASE);
          LM_S_PLUG.push(품번.S_PLUG);
          LM_SPA.push(품번.SPA);
          LM_HV_CNTR.push(품번.HV_CNTR);
          LM_HT_CNTR.push(품번.HT_CNTR);
          LM_PRA.push(품번.PRA);
          LM_FUSE.push(품번.FUSE);
          LM_LV_W_H.push(품번.LV_W_H);
          LM_HV_W_H.push(품번.HV_W_H);
          LM_BMU.push(품번.BMU);
          LM_온도센서.push(품번.온도센서);
          LM_CMU.push(품번.CMU);
          LM_MODULE.push(품번.MODULE);

          break;

        default:
          console.log('품번 data의 차종을 확인하세요:', 품번.차종);
      }
    });
  }
}

function select_box_set_A() {
  var option;
  var option_1;
  var option_2;
  var option_3;
  var option_4;
  var option_5;

  //os/de/sk3/lk
  switch (차종) {
    case 'DE':
    case 'DE_EV':
    case 'SK3':
    case 'SK3_EV':
      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_LWR_CASE_SEL.appendChild(option);

      DE_SK3_LWR_CASE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_LWR_CASE_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_UPR_CASE_SEL.appendChild(option);

      DE_SK3_UPR_CASE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_UPR_CASE_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_S_PLUG_SEL.appendChild(option);

      DE_SK3_S_PLUG.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_S_PLUG_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_SPA_SEL.appendChild(option);

      DE_SK3_SPA.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_SPA_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_HV_CNTR_SEL.appendChild(option);

      DE_SK3_HV_CNTR.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_HV_CNTR_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_HT_CNTR_SEL.appendChild(option);

      DE_SK3_HT_CNTR.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_HT_CNTR_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_PRA_SEL.appendChild(option);

      DE_SK3_PRA.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_PRA_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_LV_W_H_SEL.appendChild(option);

      DE_SK3_LV_W_H.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_LV_W_H_SEL.appendChild(option);
      });

      var option_1 = document.createElement('option');
      var option_2 = document.createElement('option');
      var option_3 = document.createElement('option');
      var option_4 = document.createElement('option');
      var option_5 = document.createElement('option');
      option_1.value = '';
      option_2.value = '';
      option_3.value = '';
      option_4.value = '';
      option_5.value = '';

      option_1.text = '---';
      option_2.text = '---';
      option_3.text = '---';
      option_4.text = '---';
      option_5.text = '---';

      _A_HV_W_H_1_SEL.appendChild(option_1);
      _A_HV_W_H_2_SEL.appendChild(option_2);
      _A_HV_W_H_3_SEL.appendChild(option_3);
      _A_HV_W_H_4_SEL.appendChild(option_4);
      _A_HV_W_H_5_SEL.appendChild(option_5);

      DE_SK3_HV_W_H.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        var option_3 = document.createElement('option');
        var option_4 = document.createElement('option');
        var option_5 = document.createElement('option');

        option_1.value = v;
        option_2.value = v;
        option_3.value = v;
        option_4.value = v;
        option_5.value = v;

        option_1.text = v;
        option_2.text = v;
        option_3.text = v;
        option_4.text = v;
        option_5.text = v;

        _A_HV_W_H_1_SEL.appendChild(option_1);
        _A_HV_W_H_2_SEL.appendChild(option_2);
        _A_HV_W_H_3_SEL.appendChild(option_3);
        _A_HV_W_H_4_SEL.appendChild(option_4);
        _A_HV_W_H_5_SEL.appendChild(option_5);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_BMU_SEL.appendChild(option);

      DE_SK3_BMU.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_BMU_SEL.appendChild(option);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_3 = document.createElement('option');
      option_4 = document.createElement('option');
      option_5 = document.createElement('option');
      option_6 = document.createElement('option');

      option_1.value = '';
      option_2.value = '';
      option_3.value = '';
      option_4.value = '';
      option_5.value = '';
      option_6.value = '';

      option_1.text = '---';
      option_2.text = '---';
      option_3.text = '---';
      option_4.text = '---';
      option_5.text = '---';
      option_6.text = '---';

      _A_CMU_1_SEL.appendChild(option_1);
      _A_CMU_2_SEL.appendChild(option_2);
      _A_CMU_3_SEL.appendChild(option_3);
      _A_CMU_4_SEL.appendChild(option_4);
      _A_CMU_5_SEL.appendChild(option_5);

      DE_SK3_CMU.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        var option_3 = document.createElement('option');
        var option_4 = document.createElement('option');
        var option_5 = document.createElement('option');

        option_1.value = v;
        option_2.value = v;
        option_3.value = v;
        option_4.value = v;
        option_5.value = v;

        option_1.text = v;
        option_2.text = v;
        option_3.text = v;
        option_4.text = v;
        option_5.text = v;

        _A_CMU_1_SEL.appendChild(option_1);
        _A_CMU_2_SEL.appendChild(option_2);
        _A_CMU_3_SEL.appendChild(option_3);
        _A_CMU_4_SEL.appendChild(option_4);
        _A_CMU_5_SEL.appendChild(option_5);
      });

      break;

    case 'OS':
    case 'OS_EV':
      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_LWR_CASE_SEL.appendChild(option);

      OS_LWR_CASE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_LWR_CASE_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_UPR_CASE_SEL.appendChild(option);

      OS_UPR_CASE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_UPR_CASE_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_S_PLUG_SEL.appendChild(option);

      OS_S_PLUG.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_S_PLUG_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_SPA_SEL.appendChild(option);

      OS_SPA.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_SPA_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_HV_CNTR_SEL.appendChild(option);

      OS_HV_CNTR.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_HV_CNTR_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_HT_CNTR_SEL.appendChild(option);

      OS_HT_CNTR.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_HT_CNTR_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_PRA_SEL.appendChild(option);

      OS_PRA.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_PRA_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_LV_W_H_SEL.appendChild(option);

      OS_LV_W_H.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_LV_W_H_SEL.appendChild(option);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_3 = document.createElement('option');
      option_4 = document.createElement('option');
      option_5 = document.createElement('option');

      option_1.value = '';
      option_2.value = '';
      option_3.value = '';
      option_4.value = '';
      option_5.value = '';

      option_1.text = '---';
      option_2.text = '---';
      option_3.text = '---';
      option_4.text = '---';
      option_5.text = '---';

      _A_HV_W_H_1_SEL.appendChild(option_1);
      _A_HV_W_H_2_SEL.appendChild(option_2);
      _A_HV_W_H_3_SEL.appendChild(option_3);
      _A_HV_W_H_4_SEL.appendChild(option_4);
      _A_HV_W_H_5_SEL.appendChild(option_5);

      OS_HV_W_H.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        var option_3 = document.createElement('option');
        var option_4 = document.createElement('option');
        var option_5 = document.createElement('option');

        option_1.value = v;
        option_2.value = v;
        option_3.value = v;
        option_4.value = v;
        option_5.value = v;

        option_1.text = option_1.value;
        option_2.text = option_2.value;
        option_3.text = option_3.value;
        option_4.text = option_4.value;
        option_5.text = option_5.value;

        _A_HV_W_H_1_SEL.appendChild(option_1);
        _A_HV_W_H_2_SEL.appendChild(option_2);
        _A_HV_W_H_3_SEL.appendChild(option_3);
        _A_HV_W_H_4_SEL.appendChild(option_4);
        _A_HV_W_H_5_SEL.appendChild(option_5);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_BMU_SEL.appendChild(option);

      OS_BMU.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_BMU_SEL.appendChild(option);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_3 = document.createElement('option');
      option_4 = document.createElement('option');
      option_5 = document.createElement('option');

      option_1.value = '';
      option_2.value = '';
      option_3.value = '';
      option_4.value = '';
      option_5.value = '';

      option_1.text = '---';
      option_2.text = '---';
      option_3.text = '---';
      option_4.text = '---';
      option_5.text = '---';

      _A_CMU_1_SEL.appendChild(option_1);
      _A_CMU_2_SEL.appendChild(option_2);
      _A_CMU_3_SEL.appendChild(option_3);
      _A_CMU_4_SEL.appendChild(option_4);
      _A_CMU_5_SEL.appendChild(option_5);

      OS_CMU.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        var option_3 = document.createElement('option');
        var option_4 = document.createElement('option');
        var option_5 = document.createElement('option');

        option_1.value = v;
        option_2.value = v;
        option_3.value = v;
        option_4.value = v;
        option_5.value = v;

        option_1.text = v;
        option_2.text = v;
        option_3.text = v;
        option_4.text = v;
        option_5.text = v;

        _A_CMU_1_SEL.appendChild(option_1);
        _A_CMU_2_SEL.appendChild(option_2);
        _A_CMU_3_SEL.appendChild(option_3);
        _A_CMU_4_SEL.appendChild(option_4);
        _A_CMU_5_SEL.appendChild(option_5);
      });

      break;

    case 'LK':
    case 'LK_EV':
      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_LWR_CASE_SEL.appendChild(option);

      LK_LWR_CASE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_LWR_CASE_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_UPR_CASE_SEL.appendChild(option);

      LK_UPR_CASE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_UPR_CASE_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_S_PLUG_SEL.appendChild(option);

      LK_S_PLUG.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_S_PLUG_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_SPA_SEL.appendChild(option);

      LK_SPA.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_SPA_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_HV_CNTR_SEL.appendChild(option);

      LK_HV_CNTR.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_HV_CNTR_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_HT_CNTR_SEL.appendChild(option);

      LK_HT_CNTR.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_HT_CNTR_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_PRA_SEL.appendChild(option);

      LK_PRA.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_PRA_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_LV_W_H_SEL.appendChild(option);

      LK_LV_W_H.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_LV_W_H_SEL.appendChild(option);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_3 = document.createElement('option');
      option_4 = document.createElement('option');
      option_5 = document.createElement('option');

      option_1.value = '';
      option_2.value = '';
      option_3.value = '';
      option_4.value = '';
      option_5.value = '';

      option_1.text = '---';
      option_2.text = '---';
      option_3.text = '---';
      option_4.text = '---';
      option_5.text = '---';

      _A_HV_W_H_1_SEL.appendChild(option_1);
      _A_HV_W_H_2_SEL.appendChild(option_2);
      _A_HV_W_H_3_SEL.appendChild(option_3);
      _A_HV_W_H_4_SEL.appendChild(option_4);
      _A_HV_W_H_5_SEL.appendChild(option_5);

      LK_HV_W_H.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        var option_3 = document.createElement('option');
        var option_4 = document.createElement('option');
        var option_5 = document.createElement('option');

        option_1.value = v;
        option_2.value = v;
        option_3.value = v;
        option_4.value = v;
        option_5.value = v;

        option_1.text = v;
        option_2.text = v;
        option_3.text = v;
        option_4.text = v;
        option_5.text = v;

        _A_HV_W_H_1_SEL.appendChild(option_1);
        _A_HV_W_H_2_SEL.appendChild(option_2);
        _A_HV_W_H_3_SEL.appendChild(option_3);
        _A_HV_W_H_4_SEL.appendChild(option_4);
        _A_HV_W_H_5_SEL.appendChild(option_5);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_BMU_SEL.appendChild(option);

      LK_BMU.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_BMU_SEL.appendChild(option);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_3 = document.createElement('option');
      option_4 = document.createElement('option');
      option_5 = document.createElement('option');

      option_1.value = '';
      option_2.value = '';
      option_3.value = '';
      option_4.value = '';
      option_5.value = '';

      option_1.text = '---';
      option_2.text = '---';
      option_3.text = '---';
      option_4.text = '---';
      option_5.text = '---';

      _A_CMU_1_SEL.appendChild(option_1);
      _A_CMU_2_SEL.appendChild(option_2);
      _A_CMU_3_SEL.appendChild(option_3);
      _A_CMU_4_SEL.appendChild(option_4);
      _A_CMU_5_SEL.appendChild(option_5);

      LK_CMU.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        var option_3 = document.createElement('option');
        var option_4 = document.createElement('option');
        var option_5 = document.createElement('option');

        option_1.value = v;
        option_2.value = v;
        option_3.value = v;
        option_4.value = v;
        option_5.value = v;

        option_1.text = v;
        option_2.text = v;
        option_3.text = v;
        option_4.text = v;
        option_5.text = v;

        _A_CMU_1_SEL.appendChild(option_1);
        _A_CMU_2_SEL.appendChild(option_2);
        _A_CMU_3_SEL.appendChild(option_3);
        _A_CMU_4_SEL.appendChild(option_4);
        _A_CMU_5_SEL.appendChild(option_5);
      });

      break;

    case 'LKFC':
      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_LWR_CASE_SEL.appendChild(option);

      LKFC_LWR_CASE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_LWR_CASE_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_UPR_CASE_SEL.appendChild(option);

      LKFC_UPR_CASE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_UPR_CASE_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_S_PLUG_SEL.appendChild(option);

      LKFC_S_PLUG.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_S_PLUG_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_SPA_SEL.appendChild(option);

      LKFC_SPA.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_SPA_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_HV_CNTR_SEL.appendChild(option);

      LKFC_HV_CNTR.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_HV_CNTR_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_HT_CNTR_SEL.appendChild(option);

      LKFC_HT_CNTR.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_HT_CNTR_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_PRA_SEL.appendChild(option);

      LKFC_PRA.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_PRA_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_LV_W_H_SEL.appendChild(option);

      LKFC_LV_W_H.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_LV_W_H_SEL.appendChild(option);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_3 = document.createElement('option');
      option_4 = document.createElement('option');
      option_5 = document.createElement('option');

      option_1.value = '';
      option_2.value = '';
      option_3.value = '';
      option_4.value = '';
      option_5.value = '';

      option_1.text = '---';
      option_2.text = '---';
      option_3.text = '---';
      option_4.text = '---';
      option_5.text = '---';

      _A_HV_W_H_1_SEL.appendChild(option_1);
      _A_HV_W_H_2_SEL.appendChild(option_2);
      _A_HV_W_H_3_SEL.appendChild(option_3);
      _A_HV_W_H_4_SEL.appendChild(option_4);
      _A_HV_W_H_5_SEL.appendChild(option_5);

      LKFC_HV_W_H.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        var option_3 = document.createElement('option');
        var option_4 = document.createElement('option');
        var option_5 = document.createElement('option');

        option_1.value = v;
        option_2.value = v;
        option_3.value = v;
        option_4.value = v;
        option_5.value = v;

        option_1.text = v;
        option_2.text = v;
        option_3.text = v;
        option_4.text = v;
        option_5.text = v;

        _A_HV_W_H_1_SEL.appendChild(option_1);
        _A_HV_W_H_2_SEL.appendChild(option_2);
        _A_HV_W_H_3_SEL.appendChild(option_3);
        _A_HV_W_H_4_SEL.appendChild(option_4);
        _A_HV_W_H_5_SEL.appendChild(option_5);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _A_BMU_SEL.appendChild(option);

      LKFC_BMU.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _A_BMU_SEL.appendChild(option);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_3 = document.createElement('option');
      option_4 = document.createElement('option');
      option_5 = document.createElement('option');

      option_1.value = '';
      option_2.value = '';
      option_3.value = '';
      option_4.value = '';
      option_5.value = '';

      option_1.text = '---';
      option_2.text = '---';
      option_3.text = '---';
      option_4.text = '---';
      option_5.text = '---';

      _A_CMU_1_SEL.appendChild(option_1);
      _A_CMU_2_SEL.appendChild(option_2);
      _A_CMU_3_SEL.appendChild(option_3);
      _A_CMU_4_SEL.appendChild(option_4);
      _A_CMU_5_SEL.appendChild(option_5);

      LKFC_CMU.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        var option_3 = document.createElement('option');
        var option_4 = document.createElement('option');
        var option_5 = document.createElement('option');

        option_1.value = v;
        option_2.value = v;
        option_3.value = v;
        option_4.value = v;
        option_5.value = v;

        option_1.text = v;
        option_2.text = v;
        option_3.text = v;
        option_4.text = v;
        option_5.text = v;

        _A_CMU_1_SEL.appendChild(option_1);
        _A_CMU_2_SEL.appendChild(option_2);
        _A_CMU_3_SEL.appendChild(option_3);
        _A_CMU_4_SEL.appendChild(option_4);
        _A_CMU_5_SEL.appendChild(option_5);
      });

      break;
  }
}

function select_box_set_B() {
  //HR / PU
  var option;
  var option_1;
  var option_2;
  var option_3;
  var option_4;
  var option_5;

  switch (차종) {
    case 'HR':
    case 'HR_EV':
    case 'PU':
    case 'PU_EV':
      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _B_LWR_CASE_SEL.appendChild(option);

      HR_PU_LWR_CASE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _B_LWR_CASE_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _B_UPR_CASE_SEL.appendChild(option);

      HR_PU_UPR_CASE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _B_UPR_CASE_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _B_HV_CNTR_SEL.appendChild(option);

      HR_PU_HV_CNTR.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _B_HV_CNTR_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _B_HT_CNTR_SEL.appendChild(option);

      HR_PU_HT_CNTR.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _B_HT_CNTR_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _B_PRA_SEL.appendChild(option);

      HR_PU_PRA.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _B_PRA_SEL.appendChild(option);
      });

      // option = document.createElement("option");
      // option.value = "";
      // option.text = "---";
      // _B_FUSE_SEL.appendChild(option);

      // HR_PU_FUSE.forEach(function (v) {
      //   if (v == "") return;
      //   var option = document.createElement("option");
      //   option.value = v;
      //   option.text = v;
      //   _B_FUSE_SEL.appendChild(option);
      // });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _B_LV_W_H_SEL.appendChild(option);

      HR_PU_LV_W_H.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _B_LV_W_H_SEL.appendChild(option);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');

      option_1.value = '';
      option_2.value = '';

      option_1.text = '---';
      option_2.text = '---';

      _B_HV_W_H_1_SEL.appendChild(option_1);
      _B_HV_W_H_2_SEL.appendChild(option_2);

      HR_PU_HV_W_H.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        option_1.value = v;
        option_2.value = v;
        option_1.text = v;
        option_2.text = v;
        _B_HV_W_H_1_SEL.appendChild(option_1);
        _B_HV_W_H_2_SEL.appendChild(option_2);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _B_BMU_SEL.appendChild(option);

      HR_PU_BMU.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _B_BMU_SEL.appendChild(option);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_3 = document.createElement('option');
      option_4 = document.createElement('option');
      option_5 = document.createElement('option');

      option_1.value = '';
      option_2.value = '';
      option_3.value = '';
      option_4.value = '';
      option_5.value = '';

      option_1.text = '---';
      option_2.text = '---';
      option_3.text = '---';
      option_4.text = '---';
      option_5.text = '---';

      _B_CMU_1_SEL.appendChild(option_1);
      _B_CMU_2_SEL.appendChild(option_2);
      _B_CMU_3_SEL.appendChild(option_3);
      _B_CMU_4_SEL.appendChild(option_4);
      _B_CMU_5_SEL.appendChild(option_5);

      HR_PU_CMU.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        var option_3 = document.createElement('option');
        var option_4 = document.createElement('option');
        var option_5 = document.createElement('option');

        option_1.value = v;
        option_2.value = v;
        option_3.value = v;
        option_4.value = v;
        option_5.value = v;

        option_1.text = v;
        option_2.text = v;
        option_3.text = v;
        option_4.text = v;
        option_5.text = v;

        _B_CMU_1_SEL.appendChild(option_1);
        _B_CMU_2_SEL.appendChild(option_2);
        _B_CMU_3_SEL.appendChild(option_3);
        _B_CMU_4_SEL.appendChild(option_4);
        _B_CMU_5_SEL.appendChild(option_5);
      });

      break;
  }
}

function select_box_set_C() {
  //NE/CV/JW1/LM
  var option;
  var option_1;
  var option_2;
  var option_3;
  var option_4;
  var option_5;
  var option_6;
  var option_7;
  var option_8;

  switch (차종) {
    case 'CV':
    case 'CV_EV':
      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_LWR_CASE_SEL.appendChild(option);

      CV_LWR_CASE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_LWR_CASE_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_UPR_CASE_SEL.appendChild(option);

      CV_UPR_CASE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_UPR_CASE_SEL.appendChild(option);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_1.value = '';
      option_2.value = '';
      option_1.text = '---';
      option_2.text = '---';
      _C_HV_CNTR_1_SEL.appendChild(option_1);
      _C_HV_CNTR_2_SEL.appendChild(option_2);

      CV_HV_CNTR.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        option_1.value = v;
        option_1.value = v;
        option_2.text = v;
        option_2.text = v;
        _C_HV_CNTR_1_SEL.appendChild(option_1);
        _C_HV_CNTR_2_SEL.appendChild(option_2);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_HT_CNTR_SEL.appendChild(option);

      CV_HT_CNTR.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_HT_CNTR_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_PRA_SEL.appendChild(option);

      CV_PRA.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_PRA_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_FUSE_SEL.appendChild(option);

      CV_FUSE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_FUSE_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_LV_W_H_SEL.appendChild(option);

      CV_LV_W_H.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_LV_W_H_SEL.appendChild(option);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_3 = document.createElement('option');
      option_4 = document.createElement('option');
      option_5 = document.createElement('option');
      option_6 = document.createElement('option');
      option_7 = document.createElement('option');
      option_8 = document.createElement('option');

      option_1.value = '';
      option_2.value = '';
      option_3.value = '';
      option_4.value = '';
      option_5.value = '';
      option_6.value = '';
      option_7.value = '';
      option_8.value = '';

      option_1.text = '---';
      option_2.text = '---';
      option_3.text = '---';
      option_4.text = '---';
      option_5.text = '---';
      option_6.text = '---';
      option_7.text = '---';
      option_8.text = '---';

      _C_HV_W_H_1_SEL.appendChild(option_1);
      _C_HV_W_H_2_SEL.appendChild(option_2);
      _C_HV_W_H_3_SEL.appendChild(option_3);
      _C_HV_W_H_4_SEL.appendChild(option_4);
      _C_HV_W_H_5_SEL.appendChild(option_5);
      _C_HV_W_H_6_SEL.appendChild(option_6);
      _C_HV_W_H_7_SEL.appendChild(option_7);
      _C_HV_W_H_8_SEL.appendChild(option_8);

      CV_HV_W_H.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        var option_3 = document.createElement('option');
        var option_4 = document.createElement('option');
        var option_5 = document.createElement('option');
        var option_6 = document.createElement('option');
        var option_7 = document.createElement('option');
        var option_8 = document.createElement('option');

        option_1.value = v;
        option_2.value = v;
        option_3.value = v;
        option_4.value = v;
        option_5.value = v;
        option_6.value = v;
        option_7.value = v;
        option_8.value = v;

        option_1.text = v;
        option_2.text = v;
        option_3.text = v;
        option_4.text = v;
        option_5.text = v;
        option_6.text = v;
        option_7.text = v;
        option_8.text = v;

        _C_HV_W_H_1_SEL.appendChild(option_1);
        _C_HV_W_H_2_SEL.appendChild(option_2);
        _C_HV_W_H_3_SEL.appendChild(option_3);
        _C_HV_W_H_4_SEL.appendChild(option_4);
        _C_HV_W_H_5_SEL.appendChild(option_5);
        _C_HV_W_H_6_SEL.appendChild(option_6);
        _C_HV_W_H_7_SEL.appendChild(option_7);
        _C_HV_W_H_8_SEL.appendChild(option_8);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_BMU_SEL.appendChild(option);

      CV_BMU.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_BMU_SEL.appendChild(option);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_3 = document.createElement('option');
      option_4 = document.createElement('option');
      option_5 = document.createElement('option');
      option_6 = document.createElement('option');
      option_7 = document.createElement('option');
      option_8 = document.createElement('option');
      option_1.value = '';
      option_2.value = '';
      option_3.value = '';
      option_4.value = '';
      option_5.value = '';
      option_6.value = '';
      option_7.value = '';
      option_8.value = '';
      option_1.text = '---';
      option_2.text = '---';
      option_3.text = '---';
      option_4.text = '---';
      option_5.text = '---';
      option_6.text = '---';
      option_7.text = '---';
      option_8.text = '---';
      _C_CMU_1_SEL.appendChild(option_1);
      _C_CMU_2_SEL.appendChild(option_2);
      _C_CMU_3_SEL.appendChild(option_3);
      _C_CMU_4_SEL.appendChild(option_4);
      _C_CMU_5_SEL.appendChild(option_5);
      _C_CMU_6_SEL.appendChild(option_6);
      _C_CMU_7_SEL.appendChild(option_7);
      _C_CMU_8_SEL.appendChild(option_8);

      CV_CMU.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        var option_3 = document.createElement('option');
        var option_4 = document.createElement('option');
        var option_5 = document.createElement('option');
        var option_6 = document.createElement('option');
        var option_7 = document.createElement('option');
        var option_8 = document.createElement('option');
        option_1.value = v;
        option_2.value = v;
        option_3.value = v;
        option_4.value = v;
        option_5.value = v;
        option_6.value = v;
        option_7.value = v;
        option_8.value = v;
        option_1.text = v;
        option_2.text = v;
        option_3.text = v;
        option_4.text = v;
        option_5.text = v;
        option_6.text = v;
        option_7.text = v;
        option_8.text = v;
        _C_CMU_1_SEL.appendChild(option_1);
        _C_CMU_2_SEL.appendChild(option_2);
        _C_CMU_3_SEL.appendChild(option_3);
        _C_CMU_4_SEL.appendChild(option_4);
        _C_CMU_5_SEL.appendChild(option_5);
        _C_CMU_6_SEL.appendChild(option_6);
        _C_CMU_7_SEL.appendChild(option_7);
        _C_CMU_8_SEL.appendChild(option_8);
      });

      break;

    case 'NE':
    case 'NE_EV':
      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_LWR_CASE_SEL.appendChild(option);

      NE_LWR_CASE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_LWR_CASE_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_UPR_CASE_SEL.appendChild(option);

      NE_UPR_CASE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_UPR_CASE_SEL.appendChild(option);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_1.value = '';
      option_2.value = '';
      option_1.text = '---';
      option_2.text = '---';
      _C_HV_CNTR_1_SEL.appendChild(option_1);
      _C_HV_CNTR_2_SEL.appendChild(option_2);

      NE_HV_CNTR.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        option_1.value = v;
        option_2.value = v;
        option_1.text = v;
        option_2.text = v;
        _C_HV_CNTR_1_SEL.appendChild(option_1);
        _C_HV_CNTR_2_SEL.appendChild(option_2);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_HT_CNTR_SEL.appendChild(option);

      NE_HT_CNTR.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_HT_CNTR_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_PRA_SEL.appendChild(option);

      NE_PRA.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_PRA_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_FUSE_SEL.appendChild(option);

      NE_FUSE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_FUSE_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_LV_W_H_SEL.appendChild(option);

      NE_LV_W_H.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_LV_W_H_SEL.appendChild(option);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_3 = document.createElement('option');
      option_4 = document.createElement('option');
      option_5 = document.createElement('option');
      option_6 = document.createElement('option');
      option_7 = document.createElement('option');
      option_8 = document.createElement('option');
      option_1.value = '';
      option_2.value = '';
      option_3.value = '';
      option_4.value = '';
      option_5.value = '';
      option_6.value = '';
      option_7.value = '';
      option_8.value = '';
      option_1.text = '---';
      option_2.text = '---';
      option_3.text = '---';
      option_4.text = '---';
      option_5.text = '---';
      option_6.text = '---';
      option_7.text = '---';
      option_8.text = '---';
      _C_HV_W_H_1_SEL.appendChild(option_1);
      _C_HV_W_H_2_SEL.appendChild(option_2);
      _C_HV_W_H_3_SEL.appendChild(option_3);
      _C_HV_W_H_4_SEL.appendChild(option_4);
      _C_HV_W_H_5_SEL.appendChild(option_5);
      _C_HV_W_H_6_SEL.appendChild(option_6);
      _C_HV_W_H_7_SEL.appendChild(option_7);
      _C_HV_W_H_8_SEL.appendChild(option_8);

      NE_HV_W_H.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        var option_3 = document.createElement('option');
        var option_4 = document.createElement('option');
        var option_5 = document.createElement('option');
        var option_6 = document.createElement('option');
        var option_7 = document.createElement('option');
        var option_8 = document.createElement('option');
        option_1.value = v;
        option_2.value = v;
        option_3.value = v;
        option_4.value = v;
        option_5.value = v;
        option_6.value = v;
        option_7.value = v;
        option_8.value = v;
        option_1.text = v;
        option_2.text = v;
        option_3.text = v;
        option_4.text = v;
        option_5.text = v;
        option_6.text = v;
        option_7.text = v;
        option_8.text = v;
        _C_HV_W_H_1_SEL.appendChild(option_1);
        _C_HV_W_H_2_SEL.appendChild(option_2);
        _C_HV_W_H_3_SEL.appendChild(option_3);
        _C_HV_W_H_4_SEL.appendChild(option_4);
        _C_HV_W_H_5_SEL.appendChild(option_5);
        _C_HV_W_H_6_SEL.appendChild(option_6);
        _C_HV_W_H_7_SEL.appendChild(option_7);
        _C_HV_W_H_8_SEL.appendChild(option_8);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_BMU_SEL.appendChild(option);

      NE_BMU.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_BMU_SEL.appendChild(option);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_3 = document.createElement('option');
      option_4 = document.createElement('option');
      option_5 = document.createElement('option');
      option_6 = document.createElement('option');
      option_7 = document.createElement('option');
      option_8 = document.createElement('option');
      option_1.value = '';
      option_2.value = '';
      option_3.value = '';
      option_4.value = '';
      option_5.value = '';
      option_6.value = '';
      option_7.value = '';
      option_8.value = '';
      option_1.text = '---';
      option_2.text = '---';
      option_3.text = '---';
      option_4.text = '---';
      option_5.text = '---';
      option_6.text = '---';
      option_7.text = '---';
      option_8.text = '---';
      _C_CMU_1_SEL.appendChild(option_1);
      _C_CMU_2_SEL.appendChild(option_2);
      _C_CMU_3_SEL.appendChild(option_3);
      _C_CMU_4_SEL.appendChild(option_4);
      _C_CMU_5_SEL.appendChild(option_5);
      _C_CMU_6_SEL.appendChild(option_6);
      _C_CMU_7_SEL.appendChild(option_7);
      _C_CMU_8_SEL.appendChild(option_8);

      NE_CMU.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        var option_3 = document.createElement('option');
        var option_4 = document.createElement('option');
        var option_5 = document.createElement('option');
        var option_6 = document.createElement('option');
        var option_7 = document.createElement('option');
        var option_8 = document.createElement('option');
        option_1.value = v;
        option_2.value = v;
        option_3.value = v;
        option_4.value = v;
        option_5.value = v;
        option_6.value = v;
        option_7.value = v;
        option_8.value = v;
        option_1.text = v;
        option_2.text = v;
        option_3.text = v;
        option_4.text = v;
        option_5.text = v;
        option_6.text = v;
        option_7.text = v;
        option_8.text = v;
        _C_CMU_1_SEL.appendChild(option_1);
        _C_CMU_2_SEL.appendChild(option_2);
        _C_CMU_3_SEL.appendChild(option_3);
        _C_CMU_4_SEL.appendChild(option_4);
        _C_CMU_5_SEL.appendChild(option_5);
        _C_CMU_6_SEL.appendChild(option_6);
        _C_CMU_7_SEL.appendChild(option_7);
        _C_CMU_8_SEL.appendChild(option_8);
      });

      break;

    case 'JW':
    case 'JW_EV':
      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_LWR_CASE_SEL.appendChild(option);

      JW_LWR_CASE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_LWR_CASE_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_UPR_CASE_SEL.appendChild(option);

      JW_UPR_CASE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_UPR_CASE_SEL.appendChild(option);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_1.value = '';
      option_2.value = '';
      option_1.text = '---';
      option_2.text = '---';
      _C_HV_CNTR_1_SEL.appendChild(option_1);
      _C_HV_CNTR_2_SEL.appendChild(option_2);

      JW_HV_CNTR.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        option_1.value = v;
        option_2.value = v;
        option_1.text = v;
        option_2.text = v;
        _C_HV_CNTR_1_SEL.appendChild(option_1);
        _C_HV_CNTR_2_SEL.appendChild(option_2);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_HT_CNTR_SEL.appendChild(option);

      JW_HT_CNTR.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_HT_CNTR_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_PRA_SEL.appendChild(option);

      JW_PRA.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_PRA_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_FUSE_SEL.appendChild(option);

      JW_FUSE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_FUSE_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_LV_W_H_SEL.appendChild(option);

      JW_LV_W_H.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_LV_W_H_SEL.appendChild(option);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_3 = document.createElement('option');
      option_4 = document.createElement('option');
      option_5 = document.createElement('option');
      option_6 = document.createElement('option');
      option_7 = document.createElement('option');
      option_8 = document.createElement('option');
      option_1.value = '';
      option_2.value = '';
      option_3.value = '';
      option_4.value = '';
      option_5.value = '';
      option_6.value = '';
      option_7.value = '';
      option_8.value = '';
      option_1.text = '---';
      option_2.text = '---';
      option_3.text = '---';
      option_4.text = '---';
      option_5.text = '---';
      option_6.text = '---';
      option_7.text = '---';
      option_8.text = '---';
      _C_HV_W_H_1_SEL.appendChild(option_1);
      _C_HV_W_H_2_SEL.appendChild(option_2);
      _C_HV_W_H_3_SEL.appendChild(option_3);
      _C_HV_W_H_4_SEL.appendChild(option_4);
      _C_HV_W_H_5_SEL.appendChild(option_5);
      _C_HV_W_H_6_SEL.appendChild(option_6);
      _C_HV_W_H_7_SEL.appendChild(option_7);
      _C_HV_W_H_8_SEL.appendChild(option_8);

      JW_HV_W_H.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        var option_3 = document.createElement('option');
        var option_4 = document.createElement('option');
        var option_5 = document.createElement('option');
        var option_6 = document.createElement('option');
        var option_7 = document.createElement('option');
        var option_8 = document.createElement('option');
        option_1.value = v;
        option_2.value = v;
        option_3.value = v;
        option_4.value = v;
        option_5.value = v;
        option_6.value = v;
        option_7.value = v;
        option_8.value = v;
        option_1.text = v;
        option_2.text = v;
        option_3.text = v;
        option_4.text = v;
        option_5.text = v;
        option_6.text = v;
        option_7.text = v;
        option_8.text = v;
        _C_HV_W_H_1_SEL.appendChild(option_1);
        _C_HV_W_H_2_SEL.appendChild(option_2);
        _C_HV_W_H_3_SEL.appendChild(option_3);
        _C_HV_W_H_4_SEL.appendChild(option_4);
        _C_HV_W_H_5_SEL.appendChild(option_5);
        _C_HV_W_H_6_SEL.appendChild(option_6);
        _C_HV_W_H_7_SEL.appendChild(option_7);
        _C_HV_W_H_8_SEL.appendChild(option_8);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_BMU_SEL.appendChild(option);

      JW_BMU.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_BMU_SEL.appendChild(option);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_3 = document.createElement('option');
      option_4 = document.createElement('option');
      option_5 = document.createElement('option');
      option_6 = document.createElement('option');
      option_7 = document.createElement('option');
      option_8 = document.createElement('option');
      option_1.value = '';
      option_2.value = '';
      option_3.value = '';
      option_4.value = '';
      option_5.value = '';
      option_6.value = '';
      option_7.value = '';
      option_8.value = '';
      option_1.text = '---';
      option_2.text = '---';
      option_3.text = '---';
      option_4.text = '---';
      option_5.text = '---';
      option_6.text = '---';
      option_7.text = '---';
      option_8.text = '---';
      _C_CMU_1_SEL.appendChild(option_1);
      _C_CMU_2_SEL.appendChild(option_2);
      _C_CMU_3_SEL.appendChild(option_3);
      _C_CMU_4_SEL.appendChild(option_4);
      _C_CMU_5_SEL.appendChild(option_5);
      _C_CMU_6_SEL.appendChild(option_6);
      _C_CMU_7_SEL.appendChild(option_7);
      _C_CMU_8_SEL.appendChild(option_8);

      JW_CMU.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        var option_3 = document.createElement('option');
        var option_4 = document.createElement('option');
        var option_5 = document.createElement('option');
        var option_6 = document.createElement('option');
        var option_7 = document.createElement('option');
        var option_8 = document.createElement('option');
        option_1.value = v;
        option_2.value = v;
        option_3.value = v;
        option_4.value = v;
        option_5.value = v;
        option_6.value = v;
        option_7.value = v;
        option_8.value = v;
        option_1.text = v;
        option_2.text = v;
        option_3.text = v;
        option_4.text = v;
        option_5.text = v;
        option_6.text = v;
        option_7.text = v;
        option_8.text = v;
        _C_CMU_1_SEL.appendChild(option_1);
        _C_CMU_2_SEL.appendChild(option_2);
        _C_CMU_3_SEL.appendChild(option_3);
        _C_CMU_4_SEL.appendChild(option_4);
        _C_CMU_5_SEL.appendChild(option_5);
        _C_CMU_6_SEL.appendChild(option_6);
        _C_CMU_7_SEL.appendChild(option_7);
        _C_CMU_8_SEL.appendChild(option_8);
      });

      break;

    case 'LM':
    case 'LM_EV':
      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_LWR_CASE_SEL.appendChild(option);

      LM_LWR_CASE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_LWR_CASE_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_UPR_CASE_SEL.appendChild(option);

      LM_UPR_CASE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_UPR_CASE_SEL.appendChild(option);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_1.value = '';
      option_2.value = '';
      option_1.text = '---';
      option_2.text = '---';
      _C_HV_CNTR_1_SEL.appendChild(option_1);
      _C_HV_CNTR_2_SEL.appendChild(option_2);

      LM_HV_CNTR.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        option_1.value = v;
        option_2.value = v;
        option_1.text = v;
        option_2.text = v;
        _C_HV_CNTR_1_SEL.appendChild(option_1);
        _C_HV_CNTR_2_SEL.appendChild(option_2);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_HT_CNTR_SEL.appendChild(option);

      LM_HT_CNTR.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_HT_CNTR_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_PRA_SEL.appendChild(option);

      LM_PRA.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_PRA_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_FUSE_SEL.appendChild(option);

      LM_FUSE.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_FUSE_SEL.appendChild(option);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_LV_W_H_SEL.appendChild(option);

      LM_LV_W_H.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_LV_W_H_SEL.appendChild(option);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_3 = document.createElement('option');
      option_4 = document.createElement('option');
      option_5 = document.createElement('option');
      option_6 = document.createElement('option');
      option_7 = document.createElement('option');
      option_8 = document.createElement('option');
      option_1.value = '';
      option_2.value = '';
      option_3.value = '';
      option_4.value = '';
      option_5.value = '';
      option_6.value = '';
      option_7.value = '';
      option_8.value = '';
      option_1.text = '---';
      option_2.text = '---';
      option_3.text = '---';
      option_4.text = '---';
      option_5.text = '---';
      option_6.text = '---';
      option_7.text = '---';
      option_8.text = '---';
      _C_HV_W_H_1_SEL.appendChild(option_1);
      _C_HV_W_H_2_SEL.appendChild(option_2);
      _C_HV_W_H_3_SEL.appendChild(option_3);
      _C_HV_W_H_4_SEL.appendChild(option_4);
      _C_HV_W_H_5_SEL.appendChild(option_5);
      _C_HV_W_H_6_SEL.appendChild(option_6);
      _C_HV_W_H_7_SEL.appendChild(option_7);
      _C_HV_W_H_8_SEL.appendChild(option_8);

      LM_HV_W_H.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        var option_3 = document.createElement('option');
        var option_4 = document.createElement('option');
        var option_5 = document.createElement('option');
        var option_6 = document.createElement('option');
        var option_7 = document.createElement('option');
        var option_8 = document.createElement('option');
        option_1.value = v;
        option_2.value = v;
        option_3.value = v;
        option_4.value = v;
        option_5.value = v;
        option_6.value = v;
        option_7.value = v;
        option_8.value = v;
        option_1.text = v;
        option_2.text = v;
        option_3.text = v;
        option_4.text = v;
        option_5.text = v;
        option_6.text = v;
        option_7.text = v;
        option_8.text = v;
        _C_HV_W_H_1_SEL.appendChild(option_1);
        _C_HV_W_H_2_SEL.appendChild(option_2);
        _C_HV_W_H_3_SEL.appendChild(option_3);
        _C_HV_W_H_4_SEL.appendChild(option_4);
        _C_HV_W_H_5_SEL.appendChild(option_5);
        _C_HV_W_H_6_SEL.appendChild(option_6);
        _C_HV_W_H_7_SEL.appendChild(option_7);
        _C_HV_W_H_8_SEL.appendChild(option_8);
      });

      option = document.createElement('option');
      option.value = '';
      option.text = '---';
      _C_BMU_SEL.appendChild(option);

      LM_BMU.forEach(function (v) {
        if (v == '') return;
        var option = document.createElement('option');
        option.value = v;
        option.text = v;
        _C_BMU_SEL.appendChild(option);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_3 = document.createElement('option');
      option_4 = document.createElement('option');
      option_5 = document.createElement('option');
      option_6 = document.createElement('option');
      option_7 = document.createElement('option');
      option_8 = document.createElement('option');
      option_1.value = '';
      option_2.value = '';
      option_3.value = '';
      option_4.value = '';
      option_5.value = '';
      option_6.value = '';
      option_7.value = '';
      option_8.value = '';
      option_1.text = '---';
      option_2.text = '---';
      option_3.text = '---';
      option_4.text = '---';
      option_5.text = '---';
      option_6.text = '---';
      option_7.text = '---';
      option_8.text = '---';
      _C_CMU_1_SEL.appendChild(option_1);
      _C_CMU_2_SEL.appendChild(option_2);
      _C_CMU_3_SEL.appendChild(option_3);
      _C_CMU_4_SEL.appendChild(option_4);
      _C_CMU_5_SEL.appendChild(option_5);
      _C_CMU_6_SEL.appendChild(option_6);
      _C_CMU_7_SEL.appendChild(option_7);
      _C_CMU_8_SEL.appendChild(option_8);

      LM_CMU.forEach(function (v) {
        if (v == '') return;
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        var option_3 = document.createElement('option');
        var option_4 = document.createElement('option');
        var option_5 = document.createElement('option');
        var option_6 = document.createElement('option');
        var option_7 = document.createElement('option');
        var option_8 = document.createElement('option');
        option_1.value = v;
        option_2.value = v;
        option_3.value = v;
        option_4.value = v;
        option_5.value = v;
        option_6.value = v;
        option_7.value = v;
        option_8.value = v;
        option_1.text = v;
        option_2.text = v;
        option_3.text = v;
        option_4.text = v;
        option_5.text = v;
        option_6.text = v;
        option_7.text = v;
        option_8.text = v;
        _C_CMU_1_SEL.appendChild(option_1);
        _C_CMU_2_SEL.appendChild(option_2);
        _C_CMU_3_SEL.appendChild(option_3);
        _C_CMU_4_SEL.appendChild(option_4);
        _C_CMU_5_SEL.appendChild(option_5);
        _C_CMU_6_SEL.appendChild(option_6);
        _C_CMU_7_SEL.appendChild(option_7);
        _C_CMU_8_SEL.appendChild(option_8);
      });

      break;
  }
}

function select_box_set_D() {
  //cs
  var option;
  var option_1;
  var option_2;
  var option_3;
  var option_4;
  var option_5;

  switch (차종) {
    case 'CS':
    case 'CS_EV':
      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_1.value = '';
      option_2.value = '';
      option_1.text = '---';
      option_2.text = '---';
      _D_LWR_CASE_SEL.appendChild(option_1);
      _D2_LWR_CASE_SEL.appendChild(option_2);

      CS_LWR_CASE.forEach(function (v) {
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        option_1.value = v;
        option_2.value = v;
        option_1.text = v;
        option_2.text = v;
        _D_LWR_CASE_SEL.appendChild(option_1);
        _D2_LWR_CASE_SEL.appendChild(option_2);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_1.value = '';
      option_2.value = '';
      option_1.text = '---';
      option_2.text = '---';
      _D_UPR_CASE_SEL.appendChild(option_1);
      _D2_UPR_CASE_SEL.appendChild(option_2);

      CS_UPR_CASE.forEach(function (v) {
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        option_1.value = v;
        option_2.value = v;
        option_1.text = v;
        option_2.text = v;
        _D_UPR_CASE_SEL.appendChild(option_1);
        _D2_UPR_CASE_SEL.appendChild(option_2);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_3 = document.createElement('option');
      option_4 = document.createElement('option');
      option_1.value = '';
      option_2.value = '';
      option_3.value = '';
      option_4.value = '';
      option_1.text = '---';
      option_2.text = '---';
      option_3.text = '---';
      option_4.text = '---';
      _D_HV_CNTR_1_SEL.appendChild(option_1);
      _D_HV_CNTR_2_SEL.appendChild(option_2);
      _D2_HV_CNTR_1_SEL.appendChild(option_3);
      _D2_HV_CNTR_2_SEL.appendChild(option_4);

      CS_HV_CNTR.forEach(function (v) {
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        var option_3 = document.createElement('option');
        var option_4 = document.createElement('option');
        option_1.value = v;
        option_2.value = v;
        option_3.value = v;
        option_4.value = v;
        option_1.text = v;
        option_2.text = v;
        option_3.text = v;
        option_4.text = v;
        _D_HV_CNTR_1_SEL.appendChild(option_1);
        _D_HV_CNTR_2_SEL.appendChild(option_2);
        _D2_HV_CNTR_1_SEL.appendChild(option_3);
        _D2_HV_CNTR_2_SEL.appendChild(option_4);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_1.value = '';
      option_2.value = '';
      option_1.text = '---';
      option_2.text = '---';
      _D_LV_W_H_SEL.appendChild(option_1);
      _D2_LV_W_H_SEL.appendChild(option_2);

      CS_LV_W_H.forEach(function (v) {
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        option_1.value = v;
        option_2.value = v;
        option_1.text = v;
        option_2.text = v;
        _D_LV_W_H_SEL.appendChild(option_1);
        _D2_LV_W_H_SEL.appendChild(option_2);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_3 = document.createElement('option');
      option_1.value = '';
      option_2.value = '';
      option_3.value = '';
      option_1.text = '---';
      option_2.text = '---';
      option_3.text = '---';
      _D_HV_W_H_1_SEL.appendChild(option_1);
      _D_HV_W_H_2_SEL.appendChild(option_2);
      _D2_HV_W_H_1_SEL.appendChild(option_3);

      CS_HV_W_H.forEach(function (v) {
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        var option_3 = document.createElement('option');
        option_1.value = v;
        option_2.value = v;
        option_3.value = v;
        option_1.text = v;
        option_2.text = v;
        option_3.text = v;
        _D_HV_W_H_1_SEL.appendChild(option_1);
        _D_HV_W_H_2_SEL.appendChild(option_2);
        _D2_HV_W_H_1_SEL.appendChild(option_3);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_1.value = '';
      option_2.value = '';
      option_1.text = '---';
      option_2.text = '---';
      _D_BMU_SEL.appendChild(option_1);
      _D2_BMU_SEL.appendChild(option_2);

      CS_BMU.forEach(function (v) {
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        option_1.value = v;
        option_2.value = v;
        option_1.text = v;
        option_2.text = v;
        _D_BMU_SEL.appendChild(option_1);
        _D2_BMU_SEL.appendChild(option_2);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_1.value = '';
      option_2.value = '';
      option_1.text = '---';
      option_2.text = '---';
      _D_CMU_1_SEL.appendChild(option_1);
      _D2_CMU_1_SEL.appendChild(option_2);

      CS_CMU.forEach(function (v) {
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        option_1.value = v;
        option_2.value = v;
        option_1.text = v;
        option_2.text = v;
        _D_CMU_1_SEL.appendChild(option_1);
        _D2_CMU_1_SEL.appendChild(option_2);
      });

      option_1 = document.createElement('option');
      option_2 = document.createElement('option');
      option_1.value = '';
      option_2.value = '';
      option_1.text = '---';
      option_2.text = '---';
      _D_RELAY_SEL.appendChild(option_1);
      _D2_RELAY_SEL.appendChild(option_2);

      CS_RELAY.forEach(function (v) {
        var option_1 = document.createElement('option');
        var option_2 = document.createElement('option');
        option_1.value = v;
        option_2.value = v;
        option_1.text = v;
        option_2.text = v;
        _D_RELAY_SEL.appendChild(option_1);
        _D2_RELAY_SEL.appendChild(option_2);
      });

      break;
  }
}

async function 부품정보_list_load() {
  if (_management_id.value == '') return;

  find(부품정보_list, _management_id.value);
  await delay();

  if (부품정보_list_v == null) return;

  switch (차종) {
    case 'DE':
    case 'DE_EV':
    case 'OS':
    case 'OS_EV':
    case 'SK3':
    case 'SK3_EV':
    case 'LK':
    case 'LK_EV':
      _A_LWR_CASE_QR.value = 부품정보_list_v.A_LWR_CASE_QR;
      _A_UPR_CASE_QR.value = 부품정보_list_v.A_UPR_CASE_QR;
      _A_S_PLUG_QR.value = 부품정보_list_v.A_S_PLUG_QR;
      _A_SPA_QR.value = 부품정보_list_v.A_SPA_QR;
      _A_HV_CNTR_QR.value = 부품정보_list_v.A_HV_CNTR_QR;
      _A_HT_CNTR_QR.value = 부품정보_list_v.A_HT_CNTR_QR;
      _A_PRA_QR.value = 부품정보_list_v.A_PRA_QR;
      _A_LV_W_H_QR.value = 부품정보_list_v.A_LV_W_H_QR;
      _A_HV_W_H_1_QR.value = 부품정보_list_v.A_HV_W_H_1_QR;
      _A_HV_W_H_2_QR.value = 부품정보_list_v.A_HV_W_H_2_QR;
      _A_HV_W_H_3_QR.value = 부품정보_list_v.A_HV_W_H_3_QR;
      _A_HV_W_H_4_QR.value = 부품정보_list_v.A_HV_W_H_4_QR;
      _A_HV_W_H_5_QR.value = 부품정보_list_v.A_HV_W_H_5_QR;
      _A_BMU_QR.value = 부품정보_list_v.A_BMU_QR;
      _A_CMU_1_QR.value = 부품정보_list_v.A_CMU_1_QR;
      _A_CMU_2_QR.value = 부품정보_list_v.A_CMU_2_QR;
      _A_CMU_3_QR.value = 부품정보_list_v.A_CMU_3_QR;
      _A_CMU_4_QR.value = 부품정보_list_v.A_CMU_4_QR;
      _A_CMU_5_QR.value = 부품정보_list_v.A_CMU_5_QR;
      _A_MODULE_1_QR.value = 부품정보_list_v.A_MODULE_1_QR;
      _A_MODULE_2_QR.value = 부품정보_list_v.A_MODULE_2_QR;
      _A_MODULE_3_QR.value = 부품정보_list_v.A_MODULE_3_QR;
      _A_MODULE_4_QR.value = 부품정보_list_v.A_MODULE_4_QR;
      _A_MODULE_5_QR.value = 부품정보_list_v.A_MODULE_5_QR;

      _A_LWR_CASE_품번.value = 부품정보_list_v.A_LWR_CASE_품번;
      _A_UPR_CASE_품번.value = 부품정보_list_v.A_UPR_CASE_품번;
      _A_S_PLUG_품번.value = 부품정보_list_v.A_S_PLUG_품번;
      _A_SPA_품번.value = 부품정보_list_v.A_SPA_품번;
      _A_HT_CNTR_품번.value = 부품정보_list_v.A_HT_CNTR_품번;
      _A_HV_CNTR_품번.value = 부품정보_list_v.A_HV_CNTR_품번;
      _A_PRA_품번.value = 부품정보_list_v.A_PRA_품번;
      _A_LV_W_H_품번.value = 부품정보_list_v.A_LV_W_H_품번;
      _A_HV_W_H_1_품번.value = 부품정보_list_v.A_HV_W_H_1_품번;
      _A_HV_W_H_2_품번.value = 부품정보_list_v.A_HV_W_H_2_품번;
      _A_HV_W_H_3_품번.value = 부품정보_list_v.A_HV_W_H_3_품번;
      _A_HV_W_H_4_품번.value = 부품정보_list_v.A_HV_W_H_4_품번;
      _A_HV_W_H_5_품번.value = 부품정보_list_v.A_HV_W_H_5_품번;
      _A_BMU_품번.value = 부품정보_list_v.A_BMU_품번;
      _A_CMU_1_품번.value = 부품정보_list_v.A_CMU_1_품번;
      _A_CMU_2_품번.value = 부품정보_list_v.A_CMU_2_품번;
      _A_CMU_3_품번.value = 부품정보_list_v.A_CMU_3_품번;
      _A_CMU_4_품번.value = 부품정보_list_v.A_CMU_4_품번;
      _A_CMU_5_품번.value = 부품정보_list_v.A_CMU_5_품번;
      _A_MODULE_1_품번.value = 부품정보_list_v.A_MODULE_1_품번;
      _A_MODULE_2_품번.value = 부품정보_list_v.A_MODULE_2_품번;
      _A_MODULE_3_품번.value = 부품정보_list_v.A_MODULE_3_품번;
      _A_MODULE_4_품번.value = 부품정보_list_v.A_MODULE_4_품번;
      _A_MODULE_5_품번.value = 부품정보_list_v.A_MODULE_5_품번;

      break;

    case 'PU':
    case 'PU_EV':
    case 'HR':
    case 'HR_EV':
      _B_UPR_CASE_QR.value = 부품정보_list_v.B_UPR_CASE_QR;
      _B_LWR_CASE_QR.value = 부품정보_list_v.B_LWR_CASE_QR;
      _B_HV_CNTR_QR.value = 부품정보_list_v.B_HV_CNTR_QR;
      _B_HT_CNTR_QR.value = 부품정보_list_v.B_HT_CNTR_QR;
      _B_PRA_QR.value = 부품정보_list_v.B_PRA_QR;
      _B_HV_W_H_1_QR.value = 부품정보_list_v.B_HV_W_H_1_QR;
      _B_HV_W_H_2_QR.value = 부품정보_list_v.B_HV_W_H_2_QR;
      _B_LV_W_H_QR.value = 부품정보_list_v.B_LV_W_H_QR;
      _B_BMU_QR.value = 부품정보_list_v.B_BMU_QR;
      _B_CMU_1_QR.value = 부품정보_list_v.B_CMU_1_QR;
      _B_CMU_2_QR.value = 부품정보_list_v.B_CMU_2_QR;
      _B_CMU_3_QR.value = 부품정보_list_v.B_CMU_3_QR;
      _B_CMU_4_QR.value = 부품정보_list_v.B_CMU_4_QR;
      _B_CMU_5_QR.value = 부품정보_list_v.B_CMU_5_QR;
      _B_MODULE_1_QR.value = 부품정보_list_v.B_MODULE_1_QR;
      _B_MODULE_2_QR.value = 부품정보_list_v.B_MODULE_2_QR;
      _B_MODULE_3_QR.value = 부품정보_list_v.B_MODULE_3_QR;
      _B_MODULE_4_QR.value = 부품정보_list_v.B_MODULE_4_QR;
      _B_MODULE_5_QR.value = 부품정보_list_v.B_MODULE_5_QR;
      _B_MODULE_6_QR.value = 부품정보_list_v.B_MODULE_6_QR;
      _B_MODULE_7_QR.value = 부품정보_list_v.B_MODULE_7_QR;
      _B_MODULE_8_QR.value = 부품정보_list_v.B_MODULE_8_QR;
      _B_MODULE_9_QR.value = 부품정보_list_v.B_MODULE_9_QR;
      _B_MODULE_10_QR.value = 부품정보_list_v.B_MODULE_10_QR;
      _B_UPR_CASE_품번.value = 부품정보_list_v.B_UPR_CASE_품번;
      _B_LWR_CASE_품번.value = 부품정보_list_v.B_LWR_CASE_품번;
      _B_HV_CNTR_품번.value = 부품정보_list_v.B_HV_CNTR_품번;
      _B_HT_CNTR_품번.value = 부품정보_list_v.B_HT_CNTR_품번;
      _B_PRA_품번.value = 부품정보_list_v.B_PRA_품번;
      _B_HV_W_H_1_품번.value = 부품정보_list_v.B_HV_W_H_1_품번;
      _B_HV_W_H_2_품번.value = 부품정보_list_v.B_HV_W_H_2_품번;
      _B_LV_W_H_품번.value = 부품정보_list_v.B_LV_W_H_품번;
      _B_BMU_품번.value = 부품정보_list_v.B_BMU_품번;
      _B_CMU_1_품번.value = 부품정보_list_v.B_CMU_1_품번;
      _B_CMU_2_품번.value = 부품정보_list_v.B_CMU_2_품번;
      _B_CMU_3_품번.value = 부품정보_list_v.B_CMU_3_품번;
      _B_CMU_4_품번.value = 부품정보_list_v.B_CMU_4_품번;
      _B_CMU_5_품번.value = 부품정보_list_v.B_CMU_5_품번;
      _B_MODULE_1_품번.value = 부품정보_list_v.B_MODULE_1_품번;
      _B_MODULE_2_품번.value = 부품정보_list_v.B_MODULE_2_품번;
      _B_MODULE_3_품번.value = 부품정보_list_v.B_MODULE_3_품번;
      _B_MODULE_4_품번.value = 부품정보_list_v.B_MODULE_4_품번;
      _B_MODULE_5_품번.value = 부품정보_list_v.B_MODULE_5_품번;
      _B_MODULE_6_품번.value = 부품정보_list_v.B_MODULE_6_품번;
      _B_MODULE_7_품번.value = 부품정보_list_v.B_MODULE_7_품번;
      _B_MODULE_8_품번.value = 부품정보_list_v.B_MODULE_8_품번;
      _B_MODULE_9_품번.value = 부품정보_list_v.B_MODULE_9_품번;
      _B_MODULE_10_품번.value = 부품정보_list_v.B_MODULE_10_품번;

      break;

    case 'CV':
    case 'CV_EV':
    case 'NE':
    case 'NE_EV':
    case 'LM':
    case 'LM_EV':
      _C_LWR_CASE_QR.value = 부품정보_list_v.C_LWR_CASE_QR;
      _C_UPR_CASE_QR.value = 부품정보_list_v.C_UPR_CASE_QR;
      _C_HV_CNTR_1_QR.value = 부품정보_list_v.C_HV_CNTR_1_QR;
      _C_HV_CNTR_2_QR.value = 부품정보_list_v.C_HV_CNTR_2_QR;
      _C_HT_CNTR_QR.value = 부품정보_list_v.C_HT_CNTR_QR;
      _C_PRA_QR.value = 부품정보_list_v.C_PRA_QR;
      _C_FUSE_QR.value = 부품정보_list_v.C_FUSE_QR;
      _C_LV_W_H_QR.value = 부품정보_list_v.C_LV_W_H_QR;
      _C_HV_W_H_1_QR.value = 부품정보_list_v.C_HV_W_H_1_QR;
      _C_HV_W_H_2_QR.value = 부품정보_list_v.C_HV_W_H_2_QR;
      _C_HV_W_H_3_QR.value = 부품정보_list_v.C_HV_W_H_3_QR;
      _C_HV_W_H_4_QR.value = 부품정보_list_v.C_HV_W_H_4_QR;
      _C_HV_W_H_5_QR.value = 부품정보_list_v.C_HV_W_H_5_QR;
      _C_HV_W_H_6_QR.value = 부품정보_list_v.C_HV_W_H_6_QR;
      _C_HV_W_H_7_QR.value = 부품정보_list_v.C_HV_W_H_7_QR;
      _C_HV_W_H_8_QR.value = 부품정보_list_v.C_HV_W_H_8_QR;
      _C_BMU_QR.value = 부품정보_list_v.C_BMU_QR;
      _C_CMU_1_QR.value = 부품정보_list_v.C_CMU_1_QR;
      _C_CMU_2_QR.value = 부품정보_list_v.C_CMU_2_QR;
      _C_CMU_3_QR.value = 부품정보_list_v.C_CMU_3_QR;
      _C_CMU_4_QR.value = 부품정보_list_v.C_CMU_4_QR;
      _C_CMU_5_QR.value = 부품정보_list_v.C_CMU_5_QR;
      _C_CMU_6_QR.value = 부품정보_list_v.C_CMU_6_QR;
      _C_CMU_7_QR.value = 부품정보_list_v.C_CMU_7_QR;
      _C_CMU_8_QR.value = 부품정보_list_v.C_CMU_8_QR;
      _C_MODULE_1_QR.value = 부품정보_list_v.C_MODULE_1_QR;
      _C_MODULE_2_QR.value = 부품정보_list_v.C_MODULE_2_QR;
      _C_MODULE_3_QR.value = 부품정보_list_v.C_MODULE_3_QR;
      _C_MODULE_4_QR.value = 부품정보_list_v.C_MODULE_4_QR;
      _C_MODULE_5_QR.value = 부품정보_list_v.C_MODULE_5_QR;
      _C_MODULE_6_QR.value = 부품정보_list_v.C_MODULE_6_QR;
      _C_MODULE_7_QR.value = 부품정보_list_v.C_MODULE_7_QR;
      _C_MODULE_8_QR.value = 부품정보_list_v.C_MODULE_8_QR;
      _C_MODULE_9_QR.value = 부품정보_list_v.C_MODULE_9_QR;
      _C_MODULE_10_QR.value = 부품정보_list_v.C_MODULE_10_QR;
      _C_MODULE_11_QR.value = 부품정보_list_v.C_MODULE_11_QR;
      _C_MODULE_12_QR.value = 부품정보_list_v.C_MODULE_12_QR;
      _C_MODULE_13_QR.value = 부품정보_list_v.C_MODULE_13_QR;
      _C_MODULE_14_QR.value = 부품정보_list_v.C_MODULE_14_QR;
      _C_MODULE_15_QR.value = 부품정보_list_v.C_MODULE_15_QR;
      _C_MODULE_16_QR.value = 부품정보_list_v.C_MODULE_16_QR;
      _C_MODULE_17_QR.value = 부품정보_list_v.C_MODULE_17_QR;
      _C_MODULE_18_QR.value = 부품정보_list_v.C_MODULE_18_QR;
      _C_MODULE_19_QR.value = 부품정보_list_v.C_MODULE_19_QR;
      _C_MODULE_20_QR.value = 부품정보_list_v.C_MODULE_20_QR;
      _C_MODULE_21_QR.value = 부품정보_list_v.C_MODULE_21_QR;
      _C_MODULE_22_QR.value = 부품정보_list_v.C_MODULE_22_QR;
      _C_MODULE_23_QR.value = 부품정보_list_v.C_MODULE_23_QR;
      _C_MODULE_24_QR.value = 부품정보_list_v.C_MODULE_24_QR;
      _C_MODULE_25_QR.value = 부품정보_list_v.C_MODULE_25_QR;
      _C_MODULE_26_QR.value = 부품정보_list_v.C_MODULE_26_QR;
      _C_MODULE_27_QR.value = 부품정보_list_v.C_MODULE_27_QR;
      _C_MODULE_28_QR.value = 부품정보_list_v.C_MODULE_28_QR;
      _C_MODULE_29_QR.value = 부품정보_list_v.C_MODULE_29_QR;
      _C_MODULE_30_QR.value = 부품정보_list_v.C_MODULE_30_QR;
      _C_MODULE_31_QR.value = 부품정보_list_v.C_MODULE_31_QR;
      _C_MODULE_32_QR.value = 부품정보_list_v.C_MODULE_32_QR;
      _C_UPR_CASE_품번.value = 부품정보_list_v.C_UPR_CASE_품번;
      _C_LWR_CASE_품번.value = 부품정보_list_v.C_LWR_CASE_품번;
      _C_HV_CNTR_1_품번.value = 부품정보_list_v.C_HV_CNTR_1_품번;
      _C_HV_CNTR_2_품번.value = 부품정보_list_v.C_HV_CNTR_2_품번;
      _C_HT_CNTR_품번.value = 부품정보_list_v.C_HT_CNTR_품번;
      _C_PRA_품번.value = 부품정보_list_v.C_PRA_품번;
      _C_FUSE_품번.value = 부품정보_list_v.C_FUSE_품번;
      _C_LV_W_H_품번.value = 부품정보_list_v.C_LV_W_H_품번;
      _C_HV_W_H_1_품번.value = 부품정보_list_v.C_HV_W_H_1_품번;
      _C_HV_W_H_2_품번.value = 부품정보_list_v.C_HV_W_H_2_품번;
      _C_HV_W_H_3_품번.value = 부품정보_list_v.C_HV_W_H_3_품번;
      _C_HV_W_H_4_품번.value = 부품정보_list_v.C_HV_W_H_4_품번;
      _C_HV_W_H_5_품번.value = 부품정보_list_v.C_HV_W_H_5_품번;
      _C_HV_W_H_6_품번.value = 부품정보_list_v.C_HV_W_H_6_품번;
      _C_HV_W_H_7_품번.value = 부품정보_list_v.C_HV_W_H_7_품번;
      _C_HV_W_H_8_품번.value = 부품정보_list_v.C_HV_W_H_8_품번;
      _C_BMU_품번.value = 부품정보_list_v.C_BMU_품번;
      _C_CMU_1_품번.value = 부품정보_list_v.C_CMU_1_품번;
      _C_CMU_2_품번.value = 부품정보_list_v.C_CMU_2_품번;
      _C_CMU_3_품번.value = 부품정보_list_v.C_CMU_3_품번;
      _C_CMU_4_품번.value = 부품정보_list_v.C_CMU_4_품번;
      _C_CMU_5_품번.value = 부품정보_list_v.C_CMU_5_품번;
      _C_CMU_6_품번.value = 부품정보_list_v.C_CMU_6_품번;
      _C_CMU_7_품번.value = 부품정보_list_v.C_CMU_7_품번;
      _C_CMU_8_품번.value = 부품정보_list_v.C_CMU_8_품번;
      _C_MODULE_1_품번.value = 부품정보_list_v.C_MODULE_1_품번;
      _C_MODULE_2_품번.value = 부품정보_list_v.C_MODULE_2_품번;
      _C_MODULE_3_품번.value = 부품정보_list_v.C_MODULE_3_품번;
      _C_MODULE_4_품번.value = 부품정보_list_v.C_MODULE_4_품번;
      _C_MODULE_5_품번.value = 부품정보_list_v.C_MODULE_5_품번;
      _C_MODULE_6_품번.value = 부품정보_list_v.C_MODULE_6_품번;
      _C_MODULE_7_품번.value = 부품정보_list_v.C_MODULE_7_품번;
      _C_MODULE_8_품번.value = 부품정보_list_v.C_MODULE_8_품번;
      _C_MODULE_9_품번.value = 부품정보_list_v.C_MODULE_9_품번;
      _C_MODULE_10_품번.value = 부품정보_list_v.C_MODULE_10_품번;
      _C_MODULE_11_품번.value = 부품정보_list_v.C_MODULE_11_품번;
      _C_MODULE_12_품번.value = 부품정보_list_v.C_MODULE_12_품번;
      _C_MODULE_13_품번.value = 부품정보_list_v.C_MODULE_13_품번;
      _C_MODULE_14_품번.value = 부품정보_list_v.C_MODULE_14_품번;
      _C_MODULE_15_품번.value = 부품정보_list_v.C_MODULE_15_품번;
      _C_MODULE_16_품번.value = 부품정보_list_v.C_MODULE_16_품번;
      _C_MODULE_17_품번.value = 부품정보_list_v.C_MODULE_17_품번;
      _C_MODULE_18_품번.value = 부품정보_list_v.C_MODULE_18_품번;
      _C_MODULE_19_품번.value = 부품정보_list_v.C_MODULE_19_품번;
      _C_MODULE_20_품번.value = 부품정보_list_v.C_MODULE_20_품번;
      _C_MODULE_21_품번.value = 부품정보_list_v.C_MODULE_21_품번;
      _C_MODULE_22_품번.value = 부품정보_list_v.C_MODULE_22_품번;
      _C_MODULE_23_품번.value = 부품정보_list_v.C_MODULE_23_품번;
      _C_MODULE_24_품번.value = 부품정보_list_v.C_MODULE_24_품번;
      _C_MODULE_25_품번.value = 부품정보_list_v.C_MODULE_25_품번;
      _C_MODULE_26_품번.value = 부품정보_list_v.C_MODULE_26_품번;
      _C_MODULE_27_품번.value = 부품정보_list_v.C_MODULE_27_품번;
      _C_MODULE_28_품번.value = 부품정보_list_v.C_MODULE_28_품번;
      _C_MODULE_29_품번.value = 부품정보_list_v.C_MODULE_29_품번;
      _C_MODULE_30_품번.value = 부품정보_list_v.C_MODULE_30_품번;
      _C_MODULE_31_품번.value = 부품정보_list_v.C_MODULE_31_품번;
      _C_MODULE_32_품번.value = 부품정보_list_v.C_MODULE_32_품번;

      break;

    case 'CS':
    case 'CS_EV':
      _D_LWR_CASE_QR.value = 부품정보_list_v.D_LWR_CASE_QR;
      _D_UPR_CASE_QR.value = 부품정보_list_v.D_UPR_CASE_QR;
      _D_HV_CNTR_1_QR.value = 부품정보_list_v.D_HV_CNTR_1_QR;
      _D_HV_CNTR_2_QR.value = 부품정보_list_v.D_HV_CNTR_2_QR;
      _D_RELAY_QR.value = 부품정보_list_v.D_RELAY_QR;
      _D_LV_W_H_QR.value = 부품정보_list_v.D_LV_W_H_QR;
      _D_HV_W_H_1_QR.value = 부품정보_list_v.D_HV_W_H_1_QR;
      _D_HV_W_H_2_QR.value = 부품정보_list_v.D_HV_W_H_2_QR;
      _D_BMU_QR.value = 부품정보_list_v.D_BMU_QR;
      _D_CMU_1_QR.value = 부품정보_list_v.D_CMU_1_QR;
      _D_MODULE_1_QR.value = 부품정보_list_v.D_MODULE_1_QR;
      _D_MODULE_2_QR.value = 부품정보_list_v.D_MODULE_2_QR;

      _D2_LWR_CASE_QR.value = 부품정보_list_v.D2_LWR_CASE_QR;
      _D2_UPR_CASE_QR.value = 부품정보_list_v.D2_UPR_CASE_QR;
      _D2_HV_CNTR_1_QR.value = 부품정보_list_v.D2_HV_CNTR_1_QR;
      _D2_HV_CNTR_2_QR.value = 부품정보_list_v.D2_HV_CNTR_2_QR;
      _D2_RELAY_QR.value = 부품정보_list_v.D2_RELAY_QR;
      _D2_LV_W_H_QR.value = 부품정보_list_v.D2_LV_W_H_QR;
      _D2_HV_W_H_1_QR.value = 부품정보_list_v.D2_HV_W_H_1_QR;
      _D2_BMU_QR.value = 부품정보_list_v.D2_BMU_QR;
      _D2_CMU_1_QR.value = 부품정보_list_v.D2_CMU_1_QR;
      _D2_MODULE_1_QR.value = 부품정보_list_v.D2_MODULE_1_QR;

      _D_UPR_CASE_품번.value = 부품정보_list_v.D_UPR_CASE_품번;
      _D_LWR_CASE_품번.value = 부품정보_list_v.D_LWR_CASE_품번;
      _D_HV_CNTR_1_품번.value = 부품정보_list_v.D_HV_CNTR_1_품번;
      _D_HV_CNTR_2_품번.value = 부품정보_list_v.D_HV_CNTR_2_품번;
      _D_RELAY_품번.value = 부품정보_list_v.D_RELAY_품번;
      _D_LV_W_H_품번.value = 부품정보_list_v.D_LV_W_H_품번;
      _D_HV_W_H_1_품번.value = 부품정보_list_v.D_HV_W_H_1_품번;
      _D_HV_W_H_2_품번.value = 부품정보_list_v.D_HV_W_H_2_품번;
      _D_BMU_품번.value = 부품정보_list_v.D_BMU_품번;
      _D_CMU_1_품번.value = 부품정보_list_v.D_CMU_1_품번;
      _D_MODULE_1_품번.value = 부품정보_list_v.D_MODULE_1_품번;
      _D_MODULE_2_품번.value = 부품정보_list_v.D_MODULE_2_품번;

      _D2_LWR_CASE_품번.value = 부품정보_list_v.D2_LWR_CASE_품번;
      _D2_UPR_CASE_품번.value = 부품정보_list_v.D2_UPR_CASE_품번;
      _D2_HV_CNTR_1_품번.value = 부품정보_list_v.D2_HV_CNTR_1_품번;
      _D2_HV_CNTR_2_품번.value = 부품정보_list_v.D2_HV_CNTR_2_품번;
      _D2_RELAY_품번.value = 부품정보_list_v.D2_RELAY_품번;
      _D2_HV_W_H_1_품번.value = 부품정보_list_v.D2_HV_W_H_1_품번;
      _D2_LV_W_H_품번.value = 부품정보_list_v.D2_LV_W_H_품번;
      _D2_BMU_품번.value = 부품정보_list_v.D2_BMU_품번;
      _D2_CMU_1_품번.value = 부품정보_list_v.D2_CMU_1_품번;
      _D2_MODULE_1_품번.value = 부품정보_list_v.D2_MODULE_1_품번;

      break;

    default:
      console.log('차종을 확인하세요');

      break;
  }

  check_complete();
}

async function 부품정보_list_save() {
  if (_management_id.value == '') return;

  new_type = 'none';
  new_reply = false;

  compare_품번();

  var doc = 부품정보_list_doc;
  doc.관리번호 = _management_id.value;

  switch (차종) {
    case 'DE':
    case 'DE_EV':
    case 'OS':
    case 'OS_EV':
    case 'SK3':
    case 'SK3_EV':
    case 'LK':
    case 'LK_EV':
      doc.A_UPR_CASE_QR = _A_UPR_CASE_QR.value;
      doc.A_LWR_CASE_QR = _A_LWR_CASE_QR.value;
      doc.A_S_PLUG_QR = _A_S_PLUG_QR.value;
      doc.A_SPA_QR = _A_SPA_QR.value;
      doc.A_HT_CNTR_QR = _A_HT_CNTR_QR.value;
      doc.A_HV_CNTR_QR = _A_HV_CNTR_QR.value;
      doc.A_PRA_QR = _A_PRA_QR.value;
      doc.A_LV_W_H_QR = _A_LV_W_H_QR.value;
      doc.A_HV_W_H_1_QR = _A_HV_W_H_1_QR.value;
      doc.A_HV_W_H_2_QR = _A_HV_W_H_2_QR.value;
      doc.A_HV_W_H_3_QR = _A_HV_W_H_3_QR.value;
      doc.A_HV_W_H_4_QR = _A_HV_W_H_4_QR.value;
      doc.A_HV_W_H_5_QR = _A_HV_W_H_5_QR.value;
      doc.A_BMU_QR = _A_BMU_QR.value;
      doc.A_CMU_1_QR = _A_CMU_1_QR.value;
      doc.A_CMU_2_QR = _A_CMU_2_QR.value;
      doc.A_CMU_3_QR = _A_CMU_3_QR.value;
      doc.A_CMU_4_QR = _A_CMU_4_QR.value;
      doc.A_CMU_5_QR = _A_CMU_5_QR.value;
      doc.A_MODULE_1_QR = _A_MODULE_1_QR.value;
      doc.A_MODULE_2_QR = _A_MODULE_2_QR.value;
      doc.A_MODULE_3_QR = _A_MODULE_3_QR.value;
      doc.A_MODULE_4_QR = _A_MODULE_4_QR.value;
      doc.A_MODULE_5_QR = _A_MODULE_5_QR.value;
      doc.A_UPR_CASE_품번 = _A_UPR_CASE_품번.value;
      doc.A_LWR_CASE_품번 = _A_LWR_CASE_품번.value;
      doc.A_S_PLUG_품번 = _A_S_PLUG_품번.value;
      doc.A_SPA_품번 = _A_SPA_품번.value;
      doc.A_HT_CNTR_품번 = _A_HT_CNTR_품번.value;
      doc.A_HV_CNTR_품번 = _A_HV_CNTR_품번.value;
      doc.A_PRA_품번 = _A_PRA_품번.value;
      doc.A_LV_W_H_품번 = _A_LV_W_H_품번.value;
      doc.A_HV_W_H_1_품번 = _A_HV_W_H_1_품번.value;
      doc.A_HV_W_H_2_품번 = _A_HV_W_H_2_품번.value;
      doc.A_HV_W_H_3_품번 = _A_HV_W_H_3_품번.value;
      doc.A_HV_W_H_4_품번 = _A_HV_W_H_4_품번.value;
      doc.A_HV_W_H_5_품번 = _A_HV_W_H_5_품번.value;
      doc.A_BMU_품번 = _A_BMU_품번.value;
      doc.A_CMU_1_품번 = _A_CMU_1_품번.value;
      doc.A_CMU_2_품번 = _A_CMU_2_품번.value;
      doc.A_CMU_3_품번 = _A_CMU_3_품번.value;
      doc.A_CMU_4_품번 = _A_CMU_4_품번.value;
      doc.A_CMU_5_품번 = _A_CMU_5_품번.value;
      doc.A_MODULE_1_품번 = _A_MODULE_1_품번.value;
      doc.A_MODULE_2_품번 = _A_MODULE_2_품번.value;
      doc.A_MODULE_3_품번 = _A_MODULE_3_품번.value;
      doc.A_MODULE_4_품번 = _A_MODULE_4_품번.value;
      doc.A_MODULE_5_품번 = _A_MODULE_5_품번.value;

      break;

    case 'PU':
    case 'PU_EV':
    case 'HR':
    case 'HR_EV':
      doc.B_UPR_CASE_QR = _B_UPR_CASE_QR.value;
      doc.B_LWR_CASE_QR = _B_LWR_CASE_QR.value;
      doc.B_HV_CNTR_QR = _B_HV_CNTR_QR.value;
      doc.B_HT_CNTR_QR = _B_HT_CNTR_QR.value;
      doc.B_PRA_QR = _B_PRA_QR.value;
      // doc.B_FUSE_QR = _B_FUSE_QR.value;
      doc.B_HV_W_H_1_QR = _B_HV_W_H_1_QR.value;
      doc.B_HV_W_H_2_QR = _B_HV_W_H_2_QR.value;
      doc.B_LV_W_H_QR = _B_LV_W_H_QR.value;
      doc.B_BMU_QR = _B_BMU_QR.value;
      doc.B_CMU_1_QR = _B_CMU_1_QR.value;
      doc.B_CMU_2_QR = _B_CMU_2_QR.value;
      doc.B_CMU_3_QR = _B_CMU_3_QR.value;
      doc.B_CMU_4_QR = _B_CMU_4_QR.value;
      doc.B_CMU_5_QR = _B_CMU_5_QR.value;
      doc.B_MODULE_1_QR = _B_MODULE_1_QR.value;
      doc.B_MODULE_2_QR = _B_MODULE_2_QR.value;
      doc.B_MODULE_3_QR = _B_MODULE_3_QR.value;
      doc.B_MODULE_4_QR = _B_MODULE_4_QR.value;
      doc.B_MODULE_5_QR = _B_MODULE_5_QR.value;
      doc.B_MODULE_6_QR = _B_MODULE_6_QR.value;
      doc.B_MODULE_7_QR = _B_MODULE_7_QR.value;
      doc.B_MODULE_8_QR = _B_MODULE_8_QR.value;
      doc.B_MODULE_9_QR = _B_MODULE_9_QR.value;
      doc.B_MODULE_10_QR = _B_MODULE_10_QR.value;
      doc.B_UPR_CASE_품번 = _B_UPR_CASE_품번.value;
      doc.B_LWR_CASE_품번 = _B_LWR_CASE_품번.value;
      doc.B_HV_CNTR_품번 = _B_HV_CNTR_품번.value;
      doc.B_HT_CNTR_품번 = _B_HT_CNTR_품번.value;
      doc.B_PRA_품번 = _B_PRA_품번.value;
      // doc.B_FUSE_품번 = _B_FUSE_품번.value;
      doc.B_HV_W_H_1_품번 = _B_HV_W_H_1_품번.value;
      doc.B_HV_W_H_2_품번 = _B_HV_W_H_2_품번.value;
      doc.B_LV_W_H_품번 = _B_LV_W_H_품번.value;
      doc.B_BMU_품번 = _B_BMU_품번.value;
      doc.B_CMU_1_품번 = _B_CMU_1_품번.value;
      doc.B_CMU_2_품번 = _B_CMU_2_품번.value;
      doc.B_CMU_3_품번 = _B_CMU_3_품번.value;
      doc.B_CMU_4_품번 = _B_CMU_4_품번.value;
      doc.B_CMU_5_품번 = _B_CMU_5_품번.value;
      doc.B_MODULE_1_품번 = _B_MODULE_1_품번.value;
      doc.B_MODULE_2_품번 = _B_MODULE_2_품번.value;
      doc.B_MODULE_3_품번 = _B_MODULE_3_품번.value;
      doc.B_MODULE_4_품번 = _B_MODULE_4_품번.value;
      doc.B_MODULE_5_품번 = _B_MODULE_5_품번.value;
      doc.B_MODULE_6_품번 = _B_MODULE_6_품번.value;
      doc.B_MODULE_7_품번 = _B_MODULE_7_품번.value;
      doc.B_MODULE_8_품번 = _B_MODULE_8_품번.value;
      doc.B_MODULE_9_품번 = _B_MODULE_9_품번.value;
      doc.B_MODULE_10_품번 = _B_MODULE_10_품번.value;

      break;

    case 'CV':
    case 'CV_EV':
    case 'NE':
    case 'NE_EV':
    case 'LM':
    case 'LM_EV':
      doc.C_UPR_CASE_QR = _C_UPR_CASE_QR.value;
      doc.C_LWR_CASE_QR = _C_LWR_CASE_QR.value;
      doc.C_HV_CNTR_1_QR = _C_HV_CNTR_1_QR.value;
      doc.C_HV_CNTR_2_QR = _C_HV_CNTR_2_QR.value;
      doc.C_HT_CNTR_QR = _C_HT_CNTR_QR.value;
      doc.C_PRA_QR = _C_PRA_QR.value;
      doc.C_FUSE_QR = _C_FUSE_QR.value;
      doc.C_LV_W_H_QR = _C_LV_W_H_QR.value;
      doc.C_HV_W_H_1_QR = _C_HV_W_H_1_QR.value;
      doc.C_HV_W_H_2_QR = _C_HV_W_H_2_QR.value;
      doc.C_HV_W_H_3_QR = _C_HV_W_H_3_QR.value;
      doc.C_HV_W_H_4_QR = _C_HV_W_H_4_QR.value;
      doc.C_HV_W_H_5_QR = _C_HV_W_H_5_QR.value;
      doc.C_HV_W_H_6_QR = _C_HV_W_H_6_QR.value;
      doc.C_HV_W_H_7_QR = _C_HV_W_H_7_QR.value;
      doc.C_HV_W_H_8_QR = _C_HV_W_H_8_QR.value;
      doc.C_BMU_QR = _C_BMU_QR.value;
      doc.C_CMU_1_QR = _C_CMU_1_QR.value;
      doc.C_CMU_2_QR = _C_CMU_2_QR.value;
      doc.C_CMU_3_QR = _C_CMU_3_QR.value;
      doc.C_CMU_4_QR = _C_CMU_4_QR.value;
      doc.C_CMU_5_QR = _C_CMU_5_QR.value;
      doc.C_CMU_6_QR = _C_CMU_6_QR.value;
      doc.C_CMU_7_QR = _C_CMU_7_QR.value;
      doc.C_CMU_8_QR = _C_CMU_8_QR.value;
      doc.C_MODULE_1_QR = _C_MODULE_1_QR.value;
      doc.C_MODULE_2_QR = _C_MODULE_2_QR.value;
      doc.C_MODULE_3_QR = _C_MODULE_3_QR.value;
      doc.C_MODULE_4_QR = _C_MODULE_4_QR.value;
      doc.C_MODULE_5_QR = _C_MODULE_5_QR.value;
      doc.C_MODULE_6_QR = _C_MODULE_6_QR.value;
      doc.C_MODULE_7_QR = _C_MODULE_7_QR.value;
      doc.C_MODULE_8_QR = _C_MODULE_8_QR.value;
      doc.C_MODULE_9_QR = _C_MODULE_9_QR.value;
      doc.C_MODULE_10_QR = _C_MODULE_10_QR.value;
      doc.C_MODULE_11_QR = _C_MODULE_11_QR.value;
      doc.C_MODULE_12_QR = _C_MODULE_12_QR.value;
      doc.C_MODULE_13_QR = _C_MODULE_13_QR.value;
      doc.C_MODULE_14_QR = _C_MODULE_14_QR.value;
      doc.C_MODULE_15_QR = _C_MODULE_15_QR.value;
      doc.C_MODULE_16_QR = _C_MODULE_16_QR.value;
      doc.C_MODULE_17_QR = _C_MODULE_17_QR.value;
      doc.C_MODULE_18_QR = _C_MODULE_18_QR.value;
      doc.C_MODULE_19_QR = _C_MODULE_19_QR.value;
      doc.C_MODULE_20_QR = _C_MODULE_20_QR.value;
      doc.C_MODULE_21_QR = _C_MODULE_21_QR.value;
      doc.C_MODULE_22_QR = _C_MODULE_22_QR.value;
      doc.C_MODULE_23_QR = _C_MODULE_23_QR.value;
      doc.C_MODULE_24_QR = _C_MODULE_24_QR.value;
      doc.C_MODULE_25_QR = _C_MODULE_25_QR.value;
      doc.C_MODULE_26_QR = _C_MODULE_26_QR.value;
      doc.C_MODULE_27_QR = _C_MODULE_27_QR.value;
      doc.C_MODULE_28_QR = _C_MODULE_28_QR.value;
      doc.C_MODULE_29_QR = _C_MODULE_29_QR.value;
      doc.C_MODULE_30_QR = _C_MODULE_30_QR.value;
      doc.C_MODULE_31_QR = _C_MODULE_31_QR.value;
      doc.C_MODULE_32_QR = _C_MODULE_32_QR.value;
      doc.C_UPR_CASE_품번 = _C_UPR_CASE_품번.value;
      doc.C_LWR_CASE_품번 = _C_LWR_CASE_품번.value;
      doc.C_HV_CNTR_1_품번 = _C_HV_CNTR_1_품번.value;
      doc.C_HV_CNTR_2_품번 = _C_HV_CNTR_2_품번.value;
      doc.C_HT_CNTR_품번 = _C_HT_CNTR_품번.value;
      doc.C_PRA_품번 = _C_PRA_품번.value;
      doc.C_FUSE_품번 = _C_FUSE_품번.value;
      doc.C_LV_W_H_품번 = _C_LV_W_H_품번.value;
      doc.C_HV_W_H_1_품번 = _C_HV_W_H_1_품번.value;
      doc.C_HV_W_H_2_품번 = _C_HV_W_H_2_품번.value;
      doc.C_HV_W_H_3_품번 = _C_HV_W_H_3_품번.value;
      doc.C_HV_W_H_4_품번 = _C_HV_W_H_4_품번.value;
      doc.C_HV_W_H_5_품번 = _C_HV_W_H_5_품번.value;
      doc.C_HV_W_H_6_품번 = _C_HV_W_H_6_품번.value;
      doc.C_HV_W_H_7_품번 = _C_HV_W_H_7_품번.value;
      doc.C_HV_W_H_8_품번 = _C_HV_W_H_8_품번.value;
      doc.C_BMU_품번 = _C_BMU_품번.value;
      doc.C_CMU_1_품번 = _C_CMU_1_품번.value;
      doc.C_CMU_2_품번 = _C_CMU_2_품번.value;
      doc.C_CMU_3_품번 = _C_CMU_3_품번.value;
      doc.C_CMU_4_품번 = _C_CMU_4_품번.value;
      doc.C_CMU_5_품번 = _C_CMU_5_품번.value;
      doc.C_CMU_6_품번 = _C_CMU_6_품번.value;
      doc.C_CMU_7_품번 = _C_CMU_7_품번.value;
      doc.C_CMU_8_품번 = _C_CMU_8_품번.value;
      doc.C_MODULE_1_품번 = _C_MODULE_1_품번.value;
      doc.C_MODULE_2_품번 = _C_MODULE_2_품번.value;
      doc.C_MODULE_3_품번 = _C_MODULE_3_품번.value;
      doc.C_MODULE_4_품번 = _C_MODULE_4_품번.value;
      doc.C_MODULE_5_품번 = _C_MODULE_5_품번.value;
      doc.C_MODULE_6_품번 = _C_MODULE_6_품번.value;
      doc.C_MODULE_7_품번 = _C_MODULE_7_품번.value;
      doc.C_MODULE_8_품번 = _C_MODULE_8_품번.value;
      doc.C_MODULE_9_품번 = _C_MODULE_9_품번.value;
      doc.C_MODULE_10_품번 = _C_MODULE_10_품번.value;
      doc.C_MODULE_11_품번 = _C_MODULE_11_품번.value;
      doc.C_MODULE_12_품번 = _C_MODULE_12_품번.value;
      doc.C_MODULE_13_품번 = _C_MODULE_13_품번.value;
      doc.C_MODULE_14_품번 = _C_MODULE_14_품번.value;
      doc.C_MODULE_15_품번 = _C_MODULE_15_품번.value;
      doc.C_MODULE_16_품번 = _C_MODULE_16_품번.value;
      doc.C_MODULE_17_품번 = _C_MODULE_17_품번.value;
      doc.C_MODULE_18_품번 = _C_MODULE_18_품번.value;
      doc.C_MODULE_19_품번 = _C_MODULE_19_품번.value;
      doc.C_MODULE_20_품번 = _C_MODULE_20_품번.value;
      doc.C_MODULE_21_품번 = _C_MODULE_21_품번.value;
      doc.C_MODULE_22_품번 = _C_MODULE_22_품번.value;
      doc.C_MODULE_23_품번 = _C_MODULE_23_품번.value;
      doc.C_MODULE_24_품번 = _C_MODULE_24_품번.value;
      doc.C_MODULE_25_품번 = _C_MODULE_25_품번.value;
      doc.C_MODULE_26_품번 = _C_MODULE_26_품번.value;
      doc.C_MODULE_27_품번 = _C_MODULE_27_품번.value;
      doc.C_MODULE_28_품번 = _C_MODULE_28_품번.value;
      doc.C_MODULE_29_품번 = _C_MODULE_29_품번.value;
      doc.C_MODULE_30_품번 = _C_MODULE_30_품번.value;
      doc.C_MODULE_31_품번 = _C_MODULE_31_품번.value;
      doc.C_MODULE_32_품번 = _C_MODULE_32_품번.value;

      break;

    case 'CS':
    case 'CS_EV':
      doc.D_UPR_CASE_QR = _D_UPR_CASE_QR.value;
      doc.D_LWR_CASE_QR = _D_LWR_CASE_QR.value;
      doc.D_HV_CNTR_1_QR = _D_HV_CNTR_1_QR.value;
      doc.D_HV_CNTR_2_QR = _D_HV_CNTR_2_QR.value;
      doc.D_RELAY_QR = _D_RELAY_QR.value;
      doc.D_LV_W_H_QR = _D_LV_W_H_QR.value;
      doc.D_HV_W_H_1_QR = _D_HV_W_H_1_QR.value;
      doc.D_HV_W_H_2_QR = _D_HV_W_H_2_QR.value;
      doc.D_BMU_QR = _D_BMU_QR.value;
      doc.D_CMU_1_QR = _D_CMU_1_QR.value;
      doc.D_MODULE_1_QR = _D_MODULE_1_QR.value;
      doc.D_MODULE_2_QR = _D_MODULE_2_QR.value;
      doc.D2_HV_W_H_1_QR = _D2_HV_W_H_1_QR.value;
      doc.D2_CMU_1_QR = _D2_CMU_1_QR.value;
      doc.D2_RELAY_QR = _D2_RELAY_QR.value;
      doc.D2_BMU_QR = _D2_BMU_QR.value;
      doc.D2_HV_CNTR_1_QR = _D2_HV_CNTR_1_QR.value;
      doc.D2_HV_CNTR_2_QR = _D2_HV_CNTR_2_QR.value;
      doc.D2_LWR_CASE_QR = _D2_LWR_CASE_QR.value;
      doc.D2_UPR_CASE_QR = _D2_UPR_CASE_QR.value;
      doc.D2_LV_W_H_QR = _D2_LV_W_H_QR.value;
      doc.D2_MODULE_1_QR = _D2_MODULE_1_QR.value;
      doc.D_UPR_CASE_품번 = _D_UPR_CASE_품번.value;
      doc.D_LWR_CASE_품번 = _D_LWR_CASE_품번.value;
      doc.D_HV_CNTR_1_품번 = _D_HV_CNTR_1_품번.value;
      doc.D_HV_CNTR_2_품번 = _D_HV_CNTR_2_품번.value;
      doc.D_RELAY_품번 = _D_RELAY_품번.value;
      doc.D_LV_W_H_품번 = _D_LV_W_H_품번.value;
      doc.D_HV_W_H_1_품번 = _D_HV_W_H_1_품번.value;
      doc.D_HV_W_H_2_품번 = _D_HV_W_H_2_품번.value;
      doc.D_BMU_품번 = _D_BMU_품번.value;
      doc.D_CMU_1_품번 = _D_CMU_1_품번.value;
      doc.D_MODULE_1_품번 = _D_MODULE_1_품번.value;
      doc.D_MODULE_2_품번 = _D_MODULE_2_품번.value;
      doc.D2_HV_W_H_1_품번 = _D2_HV_W_H_1_품번.value;
      doc.D2_CMU_1_품번 = _D2_CMU_1_품번.value;
      doc.D2_RELAY_품번 = _D2_RELAY_품번.value;
      doc.D2_BMU_품번 = _D2_BMU_품번.value;
      doc.D2_HV_CNTR_1_품번 = _D2_HV_CNTR_1_품번.value;
      doc.D2_HV_CNTR_2_품번 = _D2_HV_CNTR_2_품번.value;
      doc.D2_LWR_CASE_품번 = _D2_LWR_CASE_품번.value;
      doc.D2_UPR_CASE_품번 = _D2_UPR_CASE_품번.value;
      doc.D2_LV_W_H_품번 = _D2_LV_W_H_품번.value;
      doc.D2_MODULE_1_품번 = _D2_MODULE_1_품번.value;

      break;
    default:
      console.log('차종을 확인하세요');

      break;
  }

  update(부품정보_list, doc);
  await delay();

  console.log(update_count);
  console.log(insert_count);

  if (update_count > 0) {
    alert('부품정보가 업데이트 되었습니다');
  }

  if (insert_count > 0) {
    alert('부품정보가 저장 되었습니다');
  }
}

function auto_focus() {
  _A_UPR_CASE_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_UPR_CASE_품번.focus();
    if (_A_UPR_CASE_QR.value != '' && _A_UPR_CASE_품번.value != '') {
      _A_UPR_CASE.style.backgroundColor = 'salmon';
      _A_UPR_CASE.style.color = 'white';
    }
  };

  _A_LWR_CASE_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_LWR_CASE_품번.focus();
    if (_A_LWR_CASE_QR.value != '' && _A_LWR_CASE_품번.value != '') {
      _A_LWR_CASE.style.backgroundColor = 'salmon';
      _A_LWR_CASE.style.color = 'white';
    }
  };

  _A_S_PLUG_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_S_PLUG_품번.focus();
    if (_A_S_PLUG_QR.value != '' && _A_S_PLUG_품번.value != '') {
      _A_S_PLUG.style.backgroundColor = 'salmon';
      _A_S_PLUG.style.color = 'white';
    }
  };

  _A_SPA_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_SPA_품번.focus();
    if (_A_SPA_QR.value != '' && _A_SPA_품번.value != '') {
      _A_SPA.style.backgroundColor = 'salmon';
      _A_SPA.style.color = 'white';
    }
  };

  _A_HT_CNTR_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_HT_CNTR_품번.focus();
    if (_A_HT_CNTR_QR.value != '' && _A_HT_CNTR_품번.value != '') {
      _A_HT_CNTR.style.backgroundColor = 'salmon';
      _A_HT_CNTR.style.color = 'white';
    }
  };

  _A_HV_CNTR_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_HV_CNTR_품번.focus();
    if (_A_HV_CNTR_QR.value != '' && _A_HV_CNTR_품번.value != '') {
      _A_HV_CNTR.style.backgroundColor = 'salmon';
      _A_HV_CNTR.style.color = 'white';
    }
  };

  _A_PRA_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_PRA_품번.focus();
    if (_A_PRA_QR.value != '' && _A_PRA_품번.value != '') {
      _A_PRA.style.backgroundColor = 'salmon';
      _A_PRA.style.color = 'white';
    }
  };

  _A_LV_W_H_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_LV_W_H_품번.focus();
    if (_A_LV_W_H_QR.value != '' && _A_LV_W_H_품번.value != '') {
      _A_LV_W_H.style.backgroundColor = 'salmon';
      _A_LV_W_H.style.color = 'white';
    }
  };

  _A_HV_W_H_1_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_HV_W_H_1_품번.focus();
    if (_A_HV_W_H_1_QR.value != '' && _A_HV_W_H_1_품번.value != '') {
      _A_HV_W_H_1.style.backgroundColor = 'salmon';
      _A_HV_W_H_1.style.color = 'white';
    }
  };

  _A_HV_W_H_2_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_HV_W_H_2_품번.focus();
    if (_A_HV_W_H_2_QR.value != '' && _A_HV_W_H_2_품번.value != '') {
      _A_HV_W_H_2.style.backgroundColor = 'salmon';
      _A_HV_W_H_2.style.color = 'white';
    }
  };
  _A_HV_W_H_3_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_HV_W_H_3_품번.focus();
    if (_A_HV_W_H_3_QR.value != '' && _A_HV_W_H_3_품번.value != '') {
      _A_HV_W_H_3.style.backgroundColor = 'salmon';
      _A_HV_W_H_3.style.color = 'white';
    }
  };

  _A_HV_W_H_4_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_HV_W_H_4_품번.focus();
    if (_A_HV_W_H_4_QR.value != '' && _A_HV_W_H_4_품번.value != '') {
      _A_HV_W_H_4.style.backgroundColor = 'salmon';
      _A_HV_W_H_4.style.color = 'white';
    }
  };

  _A_HV_W_H_5_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_HV_W_H_5_품번.focus();
    if (_A_HV_W_H_5_QR.value != '' && _A_HV_W_H_5_품번.value != '') {
      _A_HV_W_H_5.style.backgroundColor = 'salmon';
      _A_HV_W_H_5.style.color = 'white';
    }
  };

  _A_BMU_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_BMU_품번.focus();
    if (_A_BMU_QR.value != '' && _A_BMU_품번.value != '') {
      _A_BMU.style.backgroundColor = 'salmon';
      _A_BMU.style.color = 'white';
    }
  };

  _A_CMU_1_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_CMU_1_품번.focus();
    if (_A_CMU_1_QR.value != '' && _A_CMU_1_품번.value != '') {
      _A_CMU_1.style.backgroundColor = 'salmon';
      _A_CMU_1.style.color = 'white';
    }
  };

  _A_CMU_2_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_CMU_2_품번.focus();
    if (_A_CMU_2_QR.value != '' && _A_CMU_2_품번.value != '') {
      _A_CMU_2.style.backgroundColor = 'salmon';
      _A_CMU_2.style.color = 'white';
    }
  };

  _A_CMU_3_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_CMU_3_품번.focus();
    if (_A_CMU_3_QR.value != '' && _A_CMU_3_품번.value != '') {
      _A_CMU_3.style.backgroundColor = 'salmon';
      _A_CMU_3.style.color = 'white';
    }
  };

  _A_CMU_4_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_CMU_4_품번.focus();
    if (_A_CMU_4_QR.value != '' && _A_CMU_4_품번.value != '') {
      _A_CMU_4.style.backgroundColor = 'salmon';
      _A_CMU_4.style.color = 'white';
    }
  };

  _A_CMU_5_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_CMU_5_품번.focus();
    if (_A_CMU_5_QR.value != '' && _A_CMU_5_품번.value != '') {
      _A_CMU_5.style.backgroundColor = 'salmon';
      _A_CMU_5.style.color = 'white';
    }
  };

  _A_MODULE_1_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_MODULE_1_품번.focus();
    if (_A_MODULE_1_QR.value != '' && _A_MODULE_1_품번.value != '') {
      _A_MODULE_1.style.backgroundColor = 'salmon';
      _A_MODULE_1.style.color = 'white';
    }
  };

  _A_MODULE_2_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_MODULE_2_품번.focus();
    if (_A_MODULE_2_QR.value != '' && _A_MODULE_2_품번.value != '') {
      _A_MODULE_2.style.backgroundColor = 'salmon';
      _A_MODULE_2.style.color = 'white';
    }
  };

  _A_MODULE_3_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_MODULE_3_품번.focus();
    if (_A_MODULE_3_QR.value != '' && _A_MODULE_3_품번.value != '') {
      _A_MODULE_3.style.backgroundColor = 'salmon';
      _A_MODULE_3.style.color = 'white';
    }
  };

  _A_MODULE_4_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_MODULE_4_품번.focus();
    if (_A_MODULE_4_QR.value != '' && _A_MODULE_4_품번.value != '') {
      _A_MODULE_4.style.backgroundColor = 'salmon';
      _A_MODULE_4.style.color = 'white';
    }
  };

  _A_MODULE_5_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _A_MODULE_5_품번.focus();
    if (_A_MODULE_5_QR.value != '' && _A_MODULE_5_품번.value != '') {
      _A_MODULE_5.style.backgroundColor = 'salmon';
      _A_MODULE_5.style.color = 'white';
    }
  };

  _B_UPR_CASE_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_UPR_CASE_품번.focus();
    if (_B_UPR_CASE_QR.value != '' && _B_UPR_CASE_품번.value != '') {
      _B_UPR_CASE.style.backgroundColor = 'salmon';
      _B_UPR_CASE.style.color = 'white';
    }
  };

  _B_LWR_CASE_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_LWR_CASE_품번.focus();
    if (_B_LWR_CASE_QR.value != '' && _B_LWR_CASE_품번.value != '') {
      _B_LWR_CASE.style.backgroundColor = 'salmon';
      _B_LWR_CASE.style.color = 'white';
    }
  };

  _B_HV_CNTR_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_HV_CNTR_품번.focus();
    if (_B_HV_CNTR_QR.value != '' && _B_HV_CNTR_품번.value != '') {
      _B_HV_CNTR.style.backgroundColor = 'salmon';
      _B_HV_CNTR.style.color = 'white';
    }
  };

  _B_HT_CNTR_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_HT_CNTR_품번.focus();
    if (_B_HT_CNTR_QR.value != '' && _B_HT_CNTR_품번.value != '') {
      _B_HT_CNTR.style.backgroundColor = 'salmon';
      _B_HT_CNTR.style.color = 'white';
    }
  };

  _B_PRA_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_PRA_품번.focus();
    if (_B_PRA_QR.value != '' && _B_PRA_품번.value != '') {
      _B_PRA.style.backgroundColor = 'salmon';
      _B_PRA.style.color = 'white';
    }
  };

  _B_HV_W_H_1_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_HV_W_H_1_품번.focus();
    if (_B_HV_W_H_1_QR.value != '' && _B_HV_W_H_1_품번.value != '') {
      _B_HV_W_H_1.style.backgroundColor = 'salmon';
      _B_HV_W_H_1.style.color = 'white';
    }
  };

  _B_HV_W_H_2_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_HV_W_H_2_품번.focus();
    if (_B_HV_W_H_2_QR.value != '' && _B_HV_W_H_2_품번.value != '') {
      _B_HV_W_H_2.style.backgroundColor = 'salmon';
      _B_HV_W_H_2.style.color = 'white';
    }
  };

  _B_LV_W_H_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_LV_W_H_품번.focus();
    if (_B_LV_W_H_QR.value != '' && _B_LV_W_H_품번.value != '') {
      _B_LV_W_H.style.backgroundColor = 'salmon';
      _B_LV_W_H.style.color = 'white';
    }
  };

  _B_BMU_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_BMU_품번.focus();
    if (_B_BMU_QR.value != '' && _B_BMU_품번.value != '') {
      _B_BMU.style.backgroundColor = 'salmon';
      _B_BMU.style.color = 'white';
    }
  };

  _B_CMU_1_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_CMU_1_품번.focus();
    if (_B_CMU_1_QR.value != '' && _B_CMU_1_품번.value != '') {
      _B_CMU_1.style.backgroundColor = 'salmon';
      _B_CMU_1.style.color = 'white';
    }
  };

  _B_CMU_2_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_CMU_2_품번.focus();
    if (_B_CMU_2_QR.value != '' && _B_CMU_2_품번.value != '') {
      _B_CMU_2.style.backgroundColor = 'salmon';
      _B_CMU_2.style.color = 'white';
    }
  };

  _B_CMU_3_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_CMU_3_품번.focus();
    if (_B_CMU_3_QR.value != '' && _B_CMU_3_품번.value != '') {
      _B_CMU_3.style.backgroundColor = 'salmon';
      _B_CMU_3.style.color = 'white';
    }
  };

  _B_CMU_4_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_CMU_4_품번.focus();
    if (_B_CMU_4_QR.value != '' && _B_CMU_4_품번.value != '') {
      _B_CMU_4.style.backgroundColor = 'salmon';
      _B_CMU_4.style.color = 'white';
    }
  };

  _B_CMU_5_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_CMU_5_품번.focus();
    if (_B_CMU_5_QR.value != '' && _B_CMU_5_품번.value != '') {
      _B_CMU_5.style.backgroundColor = 'salmon';
      _B_CMU_5.style.color = 'white';
    }
  };

  _B_MODULE_1_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_MODULE_1_품번.focus();
    if (_B_MODULE_1_QR.value != '' && _B_MODULE_1_품번.value != '') {
      _B_MODULE_1.style.backgroundColor = 'salmon';
      _B_MODULE_1.style.color = 'white';
    }
  };

  _B_MODULE_2_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_MODULE_2_품번.focus();
    if (_B_MODULE_2_QR.value != '' && _B_MODULE_2_품번.value != '') {
      _B_MODULE_2.style.backgroundColor = 'salmon';
      _B_MODULE_2.style.color = 'white';
    }
  };

  _B_MODULE_3_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_MODULE_3_품번.focus();
    if (_B_MODULE_3_QR.value != '' && _B_MODULE_3_품번.value != '') {
      _B_MODULE_3.style.backgroundColor = 'salmon';
      _B_MODULE_3.style.color = 'white';
    }
  };

  _B_MODULE_4_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_MODULE_4_품번.focus();
    if (_B_MODULE_4_QR.value != '' && _B_MODULE_4_품번.value != '') {
      _B_MODULE_4.style.backgroundColor = 'salmon';
      _B_MODULE_4.style.color = 'white';
    }
  };

  _B_MODULE_5_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_MODULE_5_품번.focus();
    if (_B_MODULE_5_QR.value != '' && _B_MODULE_5_품번.value != '') {
      _B_MODULE_5.style.backgroundColor = 'salmon';
      _B_MODULE_5.style.color = 'white';
    }
  };

  _B_MODULE_6_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_MODULE_6_품번.focus();
    if (_B_MODULE_6_QR.value != '' && _B_MODULE_6_품번.value != '') {
      _B_MODULE_6.style.backgroundColor = 'salmon';
      _B_MODULE_6.style.color = 'white';
    }
  };

  _B_MODULE_7_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_MODULE_7_품번.focus();
    if (_B_MODULE_7_QR.value != '' && _B_MODULE_7_품번.value != '') {
      _B_MODULE_7.style.backgroundColor = 'salmon';
      _B_MODULE_7.style.color = 'white';
    }
  };

  _B_MODULE_8_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_MODULE_8_품번.focus();
    if (_B_MODULE_8_QR.value != '' && _B_MODULE_8_품번.value != '') {
      _B_MODULE_8.style.backgroundColor = 'salmon';
      _B_MODULE_8.style.color = 'white';
    }
  };

  _B_MODULE_9_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_MODULE_9_품번.focus();
    if (_B_MODULE_9_QR.value != '' && _B_MODULE_9_품번.value != '') {
      _B_MODULE_9.style.backgroundColor = 'salmon';
      _B_MODULE_9.style.color = 'white';
    }
  };

  _B_MODULE_10_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _B_MODULE_10_품번.focus();
    if (_B_MODULE_10_QR.value != '' && _B_MODULE_10_품번.value != '') {
      _B_MODULE_10.style.backgroundColor = 'salmon';
      _B_MODULE_10.style.color = 'white';
    }
  };

  _C_UPR_CASE_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_UPR_CASE_품번.focus();
    if (_C_UPR_CASE_QR.value != '' && _C_UPR_CASE_품번.value != '') {
      _C_UPR_CASE.style.backgroundColor = 'salmon';
      _C_UPR_CASE.style.color = 'white';
    }
  };

  _C_LWR_CASE_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_LWR_CASE_품번.focus();
    if (_C_LWR_CASE_QR.value != '' && _C_LWR_CASE_품번.value != '') {
      _C_LWR_CASE.style.backgroundColor = 'salmon';
      _C_LWR_CASE.style.color = 'white';
    }
  };

  _C_HV_CNTR_1_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HV_CNTR_1_품번.focus();
    if (_C_HV_CNTR_1_QR.value != '' && _C_HV_CNTR_1_품번.value != '') {
      _C_HV_CNTR_1.style.backgroundColor = 'salmon';
      _C_HV_CNTR_1.style.color = 'white';
    }
  };

  _C_HV_CNTR_2_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HV_CNTR_2_품번.focus();
    if (_C_HV_CNTR_2_QR.value != '' && _C_HV_CNTR_2_품번.value != '') {
      _C_HV_CNTR_2.style.backgroundColor = 'salmon';
      _C_HV_CNTR_2.style.color = 'white';
    }
  };

  _C_HT_CNTR_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HT_CNTR_품번.focus();
    if (_C_HT_CNTR_QR.value != '' && _C_HT_CNTR_품번.value != '') {
      _C_HT_CNTR.style.backgroundColor = 'salmon';
      _C_HT_CNTR.style.color = 'white';
    }
  };

  _C_PRA_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_PRA_품번.focus();
    if (_C_PRA_QR.value != '' && _C_PRA_품번.value != '') {
      _C_PRA.style.backgroundColor = 'salmon';
      _C_PRA.style.color = 'white';
    }
  };

  _C_FUSE_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_FUSE_품번.focus();
    if (_C_FUSE_QR.value != '' && _C_FUSE_품번.value != '') {
      _C_FUSE.style.backgroundColor = 'salmon';
      _C_FUSE.style.color = 'white';
    }
  };

  _C_LV_W_H_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_LV_W_H_품번.focus();
    if (_C_LV_W_H_QR.value != '' && _C_LV_W_H_품번.value != '') {
      _C_LV_W_H.style.backgroundColor = 'salmon';
      _C_LV_W_H.style.color = 'white';
    }
  };

  _C_HV_W_H_1_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HV_W_H_1_품번.focus();
    if (_C_HV_W_H_1_QR.value != '' && _C_HV_W_H_1_품번.value != '') {
      _C_HV_W_H_1.style.backgroundColor = 'salmon';
      _C_HV_W_H_1.style.color = 'white';
    }
  };

  _C_HV_W_H_2_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HV_W_H_2_품번.focus();
    if (_C_HV_W_H_2_QR.value != '' && _C_HV_W_H_2_품번.value != '') {
      _C_HV_W_H_2.style.backgroundColor = 'salmon';
      _C_HV_W_H_2.style.color = 'white';
    }
  };

  _C_HV_W_H_3_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HV_W_H_3_품번.focus();
    if (_C_HV_W_H_3_QR.value != '' && _C_HV_W_H_3_품번.value != '') {
      _C_HV_W_H_3.style.backgroundColor = 'salmon';
      _C_HV_W_H_3.style.color = 'white';
    }
  };

  _C_HV_W_H_4_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HV_W_H_4_품번.focus();
    if (_C_HV_W_H_4_QR.value != '' && _C_HV_W_H_4_품번.value != '') {
      _C_HV_W_H_4.style.backgroundColor = 'salmon';
      _C_HV_W_H_4.style.color = 'white';
    }
  };

  _C_HV_W_H_5_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HV_W_H_5_품번.focus();
    if (_C_HV_W_H_5_QR.value != '' && _C_HV_W_H_5_품번.value != '') {
      _C_HV_W_H_5.style.backgroundColor = 'salmon';
      _C_HV_W_H_5.style.color = 'white';
    }
  };

  _C_HV_W_H_6_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HV_W_H_6_품번.focus();
    if (_C_HV_W_H_6_QR.value != '' && _C_HV_W_H_6_품번.value != '') {
      _C_HV_W_H_6.style.backgroundColor = 'salmon';
      _C_HV_W_H_6.style.color = 'white';
    }
  };

  _C_HV_W_H_7_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HV_W_H_7_품번.focus();
    if (_C_HV_W_H_7_QR.value != '' && _C_HV_W_H_7_품번.value != '') {
      _C_HV_W_H_7.style.backgroundColor = 'salmon';
      _C_HV_W_H_7.style.color = 'white';
    }
  };

  _C_HV_W_H_8_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HV_W_H_8_품번.focus();
    if (_C_HV_W_H_8_QR.value != '' && _C_HV_W_H_8_품번.value != '') {
      _C_HV_W_H_8.style.backgroundColor = 'salmon';
      _C_HV_W_H_8.style.color = 'white';
    }
  };

  _C_BMU_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_BMU_품번.focus();
    if (_C_BMU_QR.value != '' && _C_BMU_품번.value != '') {
      _C_BMU.style.backgroundColor = 'salmon';
      _C_BMU.style.color = 'white';
    }
  };

  _C_CMU_1_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_CMU_1_품번.focus();
    if (_C_CMU_1_QR.value != '' && _C_CMU_1_품번.value != '') {
      _C_CMU_1.style.backgroundColor = 'salmon';
      _C_CMU_1.style.color = 'white';
    }
  };

  _C_CMU_2_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_CMU_2_품번.focus();
    if (_C_CMU_2_QR.value != '' && _C_CMU_2_품번.value != '') {
      _C_CMU_2.style.backgroundColor = 'salmon';
      _C_CMU_2.style.color = 'white';
    }
  };

  _C_CMU_3_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_CMU_3_품번.focus();
    if (_C_CMU_3_QR.value != '' && _C_CMU_3_품번.value != '') {
      _C_CMU_3.style.backgroundColor = 'salmon';
      _C_CMU_3.style.color = 'white';
    }
  };

  _C_CMU_4_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_CMU_4_품번.focus();
    if (_C_CMU_4_QR.value != '' && _C_CMU_4_품번.value != '') {
      _C_CMU_4.style.backgroundColor = 'salmon';
      _C_CMU_4.style.color = 'white';
    }
  };

  _C_CMU_5_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_CMU_5_품번.focus();
    if (_C_CMU_5_QR.value != '' && _C_CMU_5_품번.value != '') {
      _C_CMU_5.style.backgroundColor = 'salmon';
      _C_CMU_5.style.color = 'white';
    }
  };

  _C_CMU_6_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_CMU_6_품번.focus();
    if (_C_CMU_6_QR.value != '' && _C_CMU_6_품번.value != '') {
      _C_CMU_6.style.backgroundColor = 'salmon';
      _C_CMU_6.style.color = 'white';
    }
  };

  _C_CMU_7_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_CMU_7_품번.focus();
    if (_C_CMU_7_QR.value != '' && _C_CMU_7_품번.value != '') {
      _C_CMU_7.style.backgroundColor = 'salmon';
      _C_CMU_7.style.color = 'white';
    }
  };

  _C_CMU_8_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_CMU_8_품번.focus();
    if (_C_CMU_8_QR.value != '' && _C_CMU_8_품번.value != '') {
      _C_CMU_8.style.backgroundColor = 'salmon';
      _C_CMU_8.style.color = 'white';
    }
  };

  _C_MODULE_1_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_1_품번.focus();
    if (_C_MODULE_1_QR.value != '' && _C_MODULE_1_품번.value != '') {
      _C_MODULE_1.style.backgroundColor = 'salmon';
      _C_MODULE_1.style.color = 'white';
    }
  };

  _C_MODULE_2_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_2_품번.focus();
    if (_C_MODULE_2_QR.value != '' && _C_MODULE_2_품번.value != '') {
      _C_MODULE_2.style.backgroundColor = 'salmon';
      _C_MODULE_2.style.color = 'white';
    }
  };

  _C_MODULE_3_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_3_품번.focus();
    if (_C_MODULE_3_QR.value != '' && _C_MODULE_3_품번.value != '') {
      _C_MODULE_3.style.backgroundColor = 'salmon';
      _C_MODULE_3.style.color = 'white';
    }
  };

  _C_MODULE_4_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_4_품번.focus();
    if (_C_MODULE_4_QR.value != '' && _C_MODULE_4_품번.value != '') {
      _C_MODULE_4.style.backgroundColor = 'salmon';
      _C_MODULE_4.style.color = 'white';
    }
  };

  _C_MODULE_5_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_5_품번.focus();
    if (_C_MODULE_5_QR.value != '' && _C_MODULE_5_품번.value != '') {
      _C_MODULE_5.style.backgroundColor = 'salmon';
      _C_MODULE_5.style.color = 'white';
    }
  };

  _C_MODULE_6_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_6_품번.focus();
    if (_C_MODULE_6_QR.value != '' && _C_MODULE_6_품번.value != '') {
      _C_MODULE_6.style.backgroundColor = 'salmon';
      _C_MODULE_6.style.color = 'white';
    }
  };

  _C_MODULE_7_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_7_품번.focus();
    if (_C_MODULE_7_QR.value != '' && _C_MODULE_7_품번.value != '') {
      _C_MODULE_7.style.backgroundColor = 'salmon';
      _C_MODULE_7.style.color = 'white';
    }
  };

  _C_MODULE_8_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_8_품번.focus();
    if (_C_MODULE_8_QR.value != '' && _C_MODULE_8_품번.value != '') {
      _C_MODULE_8.style.backgroundColor = 'salmon';
      _C_MODULE_8.style.color = 'white';
    }
  };

  _C_MODULE_9_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_9_품번.focus();
    if (_C_MODULE_9_QR.value != '' && _C_MODULE_9_품번.value != '') {
      _C_MODULE_9.style.backgroundColor = 'salmon';
      _C_MODULE_9.style.color = 'white';
    }
  };

  _C_MODULE_10_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_10_품번.focus();
    if (_C_MODULE_10_QR.value != '' && _C_MODULE_10_품번.value != '') {
      _C_MODULE_10.style.backgroundColor = 'salmon';
      _C_MODULE_10.style.color = 'white';
    }
  };

  _C_MODULE_11_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_11_품번.focus();
    if (_C_MODULE_11_QR.value != '' && _C_MODULE_11_품번.value != '') {
      _C_MODULE_11.style.backgroundColor = 'salmon';
      _C_MODULE_11.style.color = 'white';
    }
  };

  _C_MODULE_12_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_12_품번.focus();
    if (_C_MODULE_12_QR.value != '' && _C_MODULE_12_품번.value != '') {
      _C_MODULE_12.style.backgroundColor = 'salmon';
      _C_MODULE_12.style.color = 'white';
    }
  };

  _C_MODULE_13_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_13_품번.focus();
    if (_C_MODULE_13_QR.value != '' && _C_MODULE_13_품번.value != '') {
      _C_MODULE_13.style.backgroundColor = 'salmon';
      _C_MODULE_13.style.color = 'white';
    }
  };

  _C_MODULE_14_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_14_품번.focus();
    if (_C_MODULE_14_QR.value != '' && _C_MODULE_14_품번.value != '') {
      _C_MODULE_14.style.backgroundColor = 'salmon';
      _C_MODULE_14.style.color = 'white';
    }
  };

  _C_MODULE_15_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_15_품번.focus();
    if (_C_MODULE_15_QR.value != '' && _C_MODULE_15_품번.value != '') {
      _C_MODULE_15.style.backgroundColor = 'salmon';
      _C_MODULE_15.style.color = 'white';
    }
  };

  _C_MODULE_16_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_16_품번.focus();
    if (_C_MODULE_16_QR.value != '' && _C_MODULE_16_품번.value != '') {
      _C_MODULE_16.style.backgroundColor = 'salmon';
      _C_MODULE_16.style.color = 'white';
    }
  };

  _C_MODULE_17_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_17_품번.focus();
    if (_C_MODULE_17_QR.value != '' && _C_MODULE_17_품번.value != '') {
      _C_MODULE_17.style.backgroundColor = 'salmon';
      _C_MODULE_17.style.color = 'white';
    }
  };

  _C_MODULE_18_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_18_품번.focus();
    if (_C_MODULE_18_QR.value != '' && _C_MODULE_18_품번.value != '') {
      _C_MODULE_18.style.backgroundColor = 'salmon';
      _C_MODULE_18.style.color = 'white';
    }
  };

  _C_MODULE_19_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_19_품번.focus();
    if (_C_MODULE_19_QR.value != '' && _C_MODULE_19_품번.value != '') {
      _C_MODULE_19.style.backgroundColor = 'salmon';
      _C_MODULE_19.style.color = 'white';
    }
  };

  _C_MODULE_20_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_20_품번.focus();
    if (_C_MODULE_20_QR.value != '' && _C_MODULE_20_품번.value != '') {
      _C_MODULE_20.style.backgroundColor = 'salmon';
      _C_MODULE_20.style.color = 'white';
    }
  };

  _C_MODULE_21_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_21_품번.focus();
    if (_C_MODULE_21_QR.value != '' && _C_MODULE_21_품번.value != '') {
      _C_MODULE_21.style.backgroundColor = 'salmon';
      _C_MODULE_21.style.color = 'white';
    }
  };

  _C_MODULE_22_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_22_품번.focus();
    if (_C_MODULE_22_QR.value != '' && _C_MODULE_22_품번.value != '') {
      _C_MODULE_22.style.backgroundColor = 'salmon';
      _C_MODULE_22.style.color = 'white';
    }
  };

  _C_MODULE_23_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_23_품번.focus();
    if (_C_MODULE_23_QR.value != '' && _C_MODULE_23_품번.value != '') {
      _C_MODULE_23.style.backgroundColor = 'salmon';
      _C_MODULE_23.style.color = 'white';
    }
  };

  _C_MODULE_24_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_24_품번.focus();
    if (_C_MODULE_24_QR.value != '' && _C_MODULE_24_품번.value != '') {
      _C_MODULE_24.style.backgroundColor = 'salmon';
      _C_MODULE_24.style.color = 'white';
    }
  };

  _C_MODULE_25_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_25_품번.focus();
    if (_C_MODULE_25_QR.value != '' && _C_MODULE_25_품번.value != '') {
      _C_MODULE_25.style.backgroundColor = 'salmon';
      _C_MODULE_25.style.color = 'white';
    }
  };

  _C_MODULE_26_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_26_품번.focus();
    if (_C_MODULE_26_QR.value != '' && _C_MODULE_26_품번.value != '') {
      _C_MODULE_26.style.backgroundColor = 'salmon';
      _C_MODULE_26.style.color = 'white';
    }
  };

  _C_MODULE_27_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_27_품번.focus();
    if (_C_MODULE_27_QR.value != '' && _C_MODULE_27_품번.value != '') {
      _C_MODULE_27.style.backgroundColor = 'salmon';
      _C_MODULE_27.style.color = 'white';
    }
  };

  _C_MODULE_28_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_28_품번.focus();
    if (_C_MODULE_28_QR.value != '' && _C_MODULE_28_품번.value != '') {
      _C_MODULE_28.style.backgroundColor = 'salmon';
      _C_MODULE_28.style.color = 'white';
    }
  };

  _C_MODULE_29_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_29_품번.focus();
    if (_C_MODULE_29_QR.value != '' && _C_MODULE_29_품번.value != '') {
      _C_MODULE_29.style.backgroundColor = 'salmon';
      _C_MODULE_29.style.color = 'white';
    }
  };

  _C_MODULE_30_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_30_품번.focus();
    if (_C_MODULE_30_QR.value != '' && _C_MODULE_30_품번.value != '') {
      _C_MODULE_30.style.backgroundColor = 'salmon';
      _C_MODULE_30.style.color = 'white';
    }
  };

  _C_MODULE_31_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_31_품번.focus();
    if (_C_MODULE_31_QR.value != '' && _C_MODULE_31_품번.value != '') {
      _C_MODULE_31.style.backgroundColor = 'salmon';
      _C_MODULE_31.style.color = 'white';
    }
  };

  _C_MODULE_32_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_32_품번.focus();
    if (_C_MODULE_32_QR.value != '' && _C_MODULE_32_품번.value != '') {
      _C_MODULE_32.style.backgroundColor = 'salmon';
      _C_MODULE_32.style.color = 'white';
    }
  };

  _D_UPR_CASE_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D_UPR_CASE_품번.focus();
    if (_D_UPR_CASE_QR.value != '' && _D_UPR_CASE_품번.value != '') {
      _D_UPR_CASE.style.backgroundColor = 'salmon';
      _D_UPR_CASE.style.color = 'white';
    }
  };

  _D_LWR_CASE_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D_LWR_CASE_품번.focus();
    if (_D_LWR_CASE_QR.value != '' && _D_LWR_CASE_품번.value != '') {
      _D_LWR_CASE.style.backgroundColor = 'salmon';
      _D_LWR_CASE.style.color = 'white';
    }
  };

  _D_HV_CNTR_1_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D_HV_CNTR_1_품번.focus();
    if (_D_HV_CNTR_1_QR.value != '' && _D_HV_CNTR_1_품번.value != '') {
      _D_HV_CNTR_1.style.backgroundColor = 'salmon';
      _D_HV_CNTR_1.style.color = 'white';
    }
  };

  _D_HV_CNTR_2_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D_HV_CNTR_2_품번.focus();
    if (_D_HV_CNTR_2_QR.value != '' && _D_HV_CNTR_2_품번.value != '') {
      _D_HV_CNTR_2.style.backgroundColor = 'salmon';
      _D_HV_CNTR_2.style.color = 'white';
    }
  };

  _D_RELAY_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D_RELAY_품번.focus();
    if (_D_RELAY_QR.value != '' && _D_RELAY_품번.value != '') {
      _D_RELAY.style.backgroundColor = 'salmon';
      _D_RELAY.style.color = 'white';
    }
  };

  _D_LV_W_H_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D_LV_W_H_품번.focus();
    if (_D_LV_W_H_QR.value != '' && _D_LV_W_H_품번.value != '') {
      _D_LV_W_H.style.backgroundColor = 'salmon';
      _D_LV_W_H.style.color = 'white';
    }
  };

  _D_HV_W_H_1_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D_HV_W_H_1_품번.focus();
    if (_D_HV_W_H_1_QR.value != '' && _D_HV_W_H_1_품번.value != '') {
      _D_HV_W_H_1.style.backgroundColor = 'salmon';
      _D_HV_W_H_1.style.color = 'white';
    }
  };

  _D_HV_W_H_2_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D_HV_W_H_2_품번.focus();
    if (_D_HV_W_H_2_QR.value != '' && _D_HV_W_H_2_품번.value != '') {
      _D_HV_W_H_2.style.backgroundColor = 'salmon';
      _D_HV_W_H_2.style.color = 'white';
    }
  };

  _D_BMU_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D_BMU_품번.focus();
    if (_D_BMU_QR.value != '' && _D_BMU_품번.value != '') {
      _D_BMU.style.backgroundColor = 'salmon';
      _D_BMU.style.color = 'white';
    }
  };

  _D_CMU_1_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D_CMU_1_품번.focus();
    if (_D_CMU_1_QR.value != '' && _D_CMU_1_품번.value != '') {
      _D_CMU_1.style.backgroundColor = 'salmon';
      _D_CMU_1.style.color = 'white';
    }
  };

  _D_MODULE_1_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D_MODULE_1_품번.focus();
    if (_D_MODULE_1_QR.value != '' && _D_MODULE_1_품번.value != '') {
      _D_MODULE_1.style.backgroundColor = 'salmon';
      _D_MODULE_1.style.color = 'white';
    }
  };

  _D_MODULE_2_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D_MODULE_2_품번.focus();
    if (_D_MODULE_2_QR.value != '' && _D_MODULE_2_품번.value != '') {
      _D_MODULE_2.style.backgroundColor = 'salmon';
      _D_MODULE_2.style.color = 'white';
    }
  };

  _D2_HV_W_H_1_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D2_HV_W_H_1_품번.focus();
    if (_D2_HV_W_H_1_QR.value != '' && _D2_HV_W_H_1_품번.value != '') {
      _D2_HV_W_H_1.style.backgroundColor = 'salmon';
      _D2_HV_W_H_1.style.color = 'white';
    }
  };

  _D2_CMU_1_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D2_CMU_1_품번.focus();
    if (_D2_CMU_1_QR.value != '' && _D2_CMU_1_품번.value != '') {
      _D2_CMU_1.style.backgroundColor = 'salmon';
      _D2_CMU_1.style.color = 'white';
    }
  };

  _D2_RELAY_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D2_RELAY_품번.focus();
    if (_D2_RELAY_QR.value != '' && _D2_RELAY_품번.value != '') {
      _D2_RELAY.style.backgroundColor = 'salmon';
      _D2_RELAY.style.color = 'white';
    }
  };

  _D2_BMU_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D2_BMU_품번.focus();
    if (_D2_BMU_QR.value != '' && _D2_BMU_품번.value != '') {
      _D2_BMU.style.backgroundColor = 'salmon';
      _D2_BMU.style.color = 'white';
    }
  };

  _D2_HV_CNTR_1_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D2_HV_CNTR_1_품번.focus();
    if (_D2_HV_CNTR_1_QR.value != '' && _D2_HV_CNTR_1_품번.value != '') {
      _D2_HV_CNTR_1.style.backgroundColor = 'salmon';
      _D2_HV_CNTR_1.style.color = 'white';
    }
  };

  _D2_HV_CNTR_2_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D2_HV_CNTR_2_품번.focus();
    if (_D2_HV_CNTR_2_QR.value != '' && _D2_HV_CNTR_2_품번.value != '') {
      _D2_HV_CNTR_2.style.backgroundColor = 'salmon';
      _D2_HV_CNTR_2.style.color = 'white';
    }
  };

  _D2_LWR_CASE_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D2_LWR_CASE_품번.focus();
    if (_D2_LWR_CASE_QR.value != '' && _D2_LWR_CASE_품번.value != '') {
      _D2_LWR_CASE.style.backgroundColor = 'salmon';
      _D2_LWR_CASE.style.color = 'white';
    }
  };

  _D2_UPR_CASE_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D2_UPR_CASE_품번.focus();
    if (_D2_UPR_CASE_QR.value != '' && _D2_UPR_CASE_품번.value != '') {
      _D2_UPR_CASE.style.backgroundColor = 'salmon';
      _D2_UPR_CASE.style.color = 'white';
    }
  };

  _D2_LV_W_H_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D2_LV_W_H_품번.focus();
    if (_D2_LV_W_H_QR.value != '' && _D2_LV_W_H_품번.value != '') {
      _D2_LV_W_H.style.backgroundColor = 'salmon';
      _D2_LV_W_H.style.color = 'white';
    }
  };

  _D2_MODULE_1_QR.onkeydown = function (event) {
    if (event.keyCode == 13) _D2_MODULE_1_품번.focus();
    if (_D2_MODULE_1_QR.value != '' && _D2_MODULE_1_품번.value != '') {
      _D2_MODULE_1.style.backgroundColor = 'salmon';
      _D2_MODULE_1.style.color = 'white';
    }
  };

  _A_UPR_CASE_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_LWR_CASE_QR.focus();
    if (_A_UPR_CASE_QR.value != '' && _A_UPR_CASE_품번.value != '') {
      _A_UPR_CASE.style.backgroundColor = 'salmon';
      _A_UPR_CASE.style.color = 'white';
    }
  };

  _A_LWR_CASE_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_S_PLUG_QR.focus();
    if (_A_LWR_CASE_QR.value != '' && _A_LWR_CASE_품번.value != '') {
      _A_LWR_CASE.style.backgroundColor = 'salmon';
      _A_LWR_CASE.style.color = 'white';
    }
  };

  _A_S_PLUG_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_SPA_QR.focus();
    if (_A_S_PLUG_QR.value != '' && _A_S_PLUG_품번.value != '') {
      _A_S_PLUG.style.backgroundColor = 'salmon';
      _A_S_PLUG.style.color = 'white';
    }
  };

  _A_SPA_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_HT_CNTR_QR.focus();
    if (_A_SPA_QR.value != '' && _A_SPA_품번.value != '') {
      _A_SPA.style.backgroundColor = 'salmon';
      _A_SPA.style.color = 'white';
    }
  };

  _A_HT_CNTR_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_HV_CNTR_QR.focus();
    if (_A_HT_CNTR_QR.value != '' && _A_HT_CNTR_품번.value != '') {
      _A_HT_CNTR.style.backgroundColor = 'salmon';
      _A_HT_CNTR.style.color = 'white';
    }
  };

  _A_HV_CNTR_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_PRA_QR.focus();
    if (_A_HV_CNTR_QR.value != '' && _A_HV_CNTR_품번.value != '') {
      _A_HV_CNTR.style.backgroundColor = 'salmon';
      _A_HV_CNTR.style.color = 'white';
    }
  };

  _A_PRA_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_LV_W_H_QR.focus();
    if (_A_PRA_QR.value != '' && _A_PRA_품번.value != '') {
      _A_PRA.style.backgroundColor = 'salmon';
      _A_PRA.style.color = 'white';
    }
  };

  _A_LV_W_H_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_HV_W_H_1_QR.focus();
    if (_A_LV_W_H_QR.value != '' && _A_LV_W_H_품번.value != '') {
      _A_LV_W_H.style.backgroundColor = 'salmon';
      _A_LV_W_H.style.color = 'white';
    }
  };

  _A_HV_W_H_1_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_HV_W_H_2_QR.focus();
    if (_A_HV_W_H_1_QR.value != '' && _A_HV_W_H_1_품번.value != '') {
      _A_HV_W_H_1.style.backgroundColor = 'salmon';
      _A_HV_W_H_1.style.color = 'white';
    }
  };

  _A_HV_W_H_2_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_HV_W_H_3_QR.focus();
    if (_A_HV_W_H_2_QR.value != '' && _A_HV_W_H_2_품번.value != '') {
      _A_HV_W_H_2.style.backgroundColor = 'salmon';
      _A_HV_W_H_2.style.color = 'white';
    }
  };

  _A_HV_W_H_3_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_HV_W_H_4_QR.focus();
    if (_A_HV_W_H_3_QR.value != '' && _A_HV_W_H_3_품번.value != '') {
      _A_HV_W_H_3.style.backgroundColor = 'salmon';
      _A_HV_W_H_3.style.color = 'white';
    }
  };

  _A_HV_W_H_4_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_HV_W_H_5_QR.focus();
    if (_A_HV_W_H_4_QR.value != '' && _A_HV_W_H_4_품번.value != '') {
      _A_HV_W_H_4.style.backgroundColor = 'salmon';
      _A_HV_W_H_4.style.color = 'white';
    }
  };

  _A_HV_W_H_5_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_BMU_QR.focus();
    if (_A_HV_W_H_5_QR.value != '' && _A_HV_W_H_5_품번.value != '') {
      _A_HV_W_H_5.style.backgroundColor = 'salmon';
      _A_HV_W_H_5.style.color = 'white';
    }
  };

  _A_BMU_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_CMU_1_QR.focus();
    if (_A_BMU_QR.value != '' && _A_BMU_품번.value != '') {
      _A_BMU.style.backgroundColor = 'salmon';
      _A_BMU.style.color = 'white';
    }
  };

  _A_CMU_1_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_CMU_2_QR.focus();
    if (_A_CMU_1_QR.value != '' && _A_CMU_1_품번.value != '') {
      _A_CMU_1.style.backgroundColor = 'salmon';
      _A_CMU_1.style.color = 'white';
    }
  };

  _A_CMU_2_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_CMU_3_QR.focus();
    if (_A_CMU_2_QR.value != '' && _A_CMU_2_품번.value != '') {
      _A_CMU_2.style.backgroundColor = 'salmon';
      _A_CMU_2.style.color = 'white';
    }
  };

  _A_CMU_3_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_CMU_4_QR.focus();
    if (_A_CMU_3_QR.value != '' && _A_CMU_3_품번.value != '') {
      _A_CMU_3.style.backgroundColor = 'salmon';
      _A_CMU_3.style.color = 'white';
    }
  };

  _A_CMU_4_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_CMU_5_QR.focus();
    if (_A_CMU_4_QR.value != '' && _A_CMU_4_품번.value != '') {
      _A_CMU_4.style.backgroundColor = 'salmon';
      _A_CMU_4.style.color = 'white';
    }
  };

  _A_CMU_5_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_MODULE_1_QR.focus();
    if (_A_CMU_5_QR.value != '' && _A_CMU_5_품번.value != '') {
      _A_CMU_5.style.backgroundColor = 'salmon';
      _A_CMU_5.style.color = 'white';
    }
  };

  _A_MODULE_1_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_MODULE_2_QR.focus();
    if (_A_MODULE_1_QR.value != '' && _A_MODULE_1_품번.value != '') {
      _A_MODULE_1.style.backgroundColor = 'salmon';
      _A_MODULE_1.style.color = 'white';
    }
  };

  _A_MODULE_2_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_MODULE_3_QR.focus();
    if (_A_MODULE_2_QR.value != '' && _A_MODULE_2_품번.value != '') {
      _A_MODULE_2.style.backgroundColor = 'salmon';
      _A_MODULE_2.style.color = 'white';
    }
  };

  _A_MODULE_3_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_MODULE_4_QR.focus();
    if (_A_MODULE_3_QR.value != '' && _A_MODULE_3_품번.value != '') {
      _A_MODULE_3.style.backgroundColor = 'salmon';
      _A_MODULE_3.style.color = 'white';
    }
  };

  _A_MODULE_4_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _A_MODULE_5_QR.focus();
    if (_A_MODULE_4_QR.value != '' && _A_MODULE_4_품번.value != '') {
      _A_MODULE_4.style.backgroundColor = 'salmon';
      _A_MODULE_4.style.color = 'white';
    }
  };

  _A_MODULE_5_품번.onkeydown = function (event) {
    if (_A_MODULE_5_QR.value != '' && _A_MODULE_5_품번.value != '') {
      _A_MODULE_5.style.backgroundColor = 'salmon';
      _A_MODULE_5.style.color = 'white';
    }
    //_A_MODULE_5_품번.focus();
  };

  _B_UPR_CASE_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_LWR_CASE_QR.focus();
    if (_B_UPR_CASE_QR.value != '' && _B_UPR_CASE_품번.value != '') {
      _B_UPR_CASE.style.backgroundColor = 'salmon';
      _B_UPR_CASE.style.color = 'white';
    }
  };

  _B_LWR_CASE_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_HV_CNTR_QR.focus();
    if (_B_LWR_CASE_QR.value != '' && _B_LWR_CASE_품번.value != '') {
      _B_LWR_CASE.style.backgroundColor = 'salmon';
      _B_LWR_CASE.style.color = 'white';
    }
  };

  _B_HV_CNTR_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_HT_CNTR_QR.focus();
    if (_B_HV_CNTR_QR.value != '' && _B_HV_CNTR_품번.value != '') {
      _B_HV_CNTR.style.backgroundColor = 'salmon';
      _B_HV_CNTR.style.color = 'white';
    }
  };

  _B_HT_CNTR_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_PRA_QR.focus();
    if (_B_HT_CNTR_QR.value != '' && _B_HT_CNTR_품번.value != '') {
      _B_HT_CNTR.style.backgroundColor = 'salmon';
      _B_HT_CNTR.style.color = 'white';
    }
  };

  _B_PRA_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_HV_W_H_1_QR.focus();
    if (_B_PRA_QR.value != '' && _B_PRA_품번.value != '') {
      _B_PRA.style.backgroundColor = 'salmon';
      _B_PRA.style.color = 'white';
    }
  };

  _B_HV_W_H_1_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_HV_W_H_2_QR.focus();
    if (_B_HV_W_H_1_QR.value != '' && _B_HV_W_H_1_품번.value != '') {
      _B_HV_W_H_1.style.backgroundColor = 'salmon';
      _B_HV_W_H_1.style.color = 'white';
    }
  };

  _B_HV_W_H_2_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_LV_W_H_QR.focus();
    if (_B_HV_W_H_2_QR.value != '' && _B_HV_W_H_2_품번.value != '') {
      _B_HV_W_H_2.style.backgroundColor = 'salmon';
      _B_HV_W_H_2.style.color = 'white';
    }
  };

  _B_LV_W_H_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_BMU_QR.focus();
    if (_B_LV_W_H_QR.value != '' && _B_LV_W_H_품번.value != '') {
      _B_LV_W_H.style.backgroundColor = 'salmon';
      _B_LV_W_H.style.color = 'white';
    }
  };

  _B_BMU_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_CMU_1_QR.focus();
    if (_B_BMU_QR.value != '' && _B_BMU_품번.value != '') {
      _B_BMU.style.backgroundColor = 'salmon';
      _B_BMU.style.color = 'white';
    }
  };

  _B_CMU_1_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_CMU_2_QR.focus();
    if (_B_CMU_1_QR.value != '' && _B_CMU_1_품번.value != '') {
      _B_CMU_1.style.backgroundColor = 'salmon';
      _B_CMU_1.style.color = 'white';
    }
  };

  _B_CMU_2_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_CMU_3_QR.focus();
    if (_B_CMU_2_QR.value != '' && _B_CMU_2_품번.value != '') {
      _B_CMU_2.style.backgroundColor = 'salmon';
      _B_CMU_2.style.color = 'white';
    }
  };

  _B_CMU_3_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_CMU_4_QR.focus();
    if (_B_CMU_3_QR.value != '' && _B_CMU_3_품번.value != '') {
      _B_CMU_3.style.backgroundColor = 'salmon';
      _B_CMU_3.style.color = 'white';
    }
  };

  _B_CMU_4_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_CMU_5_QR.focus();
    if (_B_CMU_4_QR.value != '' && _B_CMU_4_품번.value != '') {
      _B_CMU_4.style.backgroundColor = 'salmon';
      _B_CMU_4.style.color = 'white';
    }
  };

  _B_CMU_5_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_MODULE_1_QR.focus();
    if (_B_CMU_5_QR.value != '' && _B_CMU_5_품번.value != '') {
      _B_CMU_5.style.backgroundColor = 'salmon';
      _B_CMU_5.style.color = 'white';
    }
  };

  _B_MODULE_1_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_MODULE_2_QR.focus();
    if (_B_MODULE_1_QR.value != '' && _B_MODULE_1_품번.value != '') {
      _B_MODULE_1.style.backgroundColor = 'salmon';
      _B_MODULE_1.style.color = 'white';
    }
  };

  _B_MODULE_2_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_MODULE_3_QR.focus();
    if (_B_MODULE_2_QR.value != '' && _B_MODULE_2_품번.value != '') {
      _B_MODULE_2.style.backgroundColor = 'salmon';
      _B_MODULE_2.style.color = 'white';
    }
  };

  _B_MODULE_3_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_MODULE_4_QR.focus();
    if (_B_MODULE_3_QR.value != '' && _B_MODULE_3_품번.value != '') {
      _B_MODULE_3.style.backgroundColor = 'salmon';
      _B_MODULE_3.style.color = 'white';
    }
  };

  _B_MODULE_4_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_MODULE_5_QR.focus();
    if (_B_MODULE_4_QR.value != '' && _B_MODULE_4_품번.value != '') {
      _B_MODULE_4.style.backgroundColor = 'salmon';
      _B_MODULE_4.style.color = 'white';
    }
  };

  _B_MODULE_5_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_MODULE_6_QR.focus();
    if (_B_MODULE_5_QR.value != '' && _B_MODULE_5_품번.value != '') {
      _B_MODULE_5.style.backgroundColor = 'salmon';
      _B_MODULE_5.style.color = 'white';
    }
  };

  _B_MODULE_6_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_MODULE_7_QR.focus();
    if (_B_MODULE_6_QR.value != '' && _B_MODULE_6_품번.value != '') {
      _B_MODULE_6.style.backgroundColor = 'salmon';
      _B_MODULE_6.style.color = 'white';
    }
  };

  _B_MODULE_7_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_MODULE_8_QR.focus();
    if (_B_MODULE_7_QR.value != '' && _B_MODULE_7_품번.value != '') {
      _B_MODULE_7.style.backgroundColor = 'salmon';
      _B_MODULE_7.style.color = 'white';
    }
  };

  _B_MODULE_8_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_MODULE_9_QR.focus();
    if (_B_MODULE_8_QR.value != '' && _B_MODULE_8_품번.value != '') {
      _B_MODULE_8.style.backgroundColor = 'salmon';
      _B_MODULE_8.style.color = 'white';
    }
  };

  _B_MODULE_9_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _B_MODULE_10_QR.focus();
    if (_B_MODULE_9_QR.value != '' && _B_MODULE_9_품번.value != '') {
      _B_MODULE_9.style.backgroundColor = 'salmon';
      _B_MODULE_9.style.color = 'white';
    }
  };

  _B_MODULE_10_품번.onkeydown = function (event) {
    if (_B_MODULE_10_QR.value != '' && _B_MODULE_10_품번.value != '') {
      _B_MODULE_10.style.backgroundColor = 'salmon';
      _B_MODULE_10.style.color = 'white';
    }
    //_B_MODULE_10_QR.focus();
  };

  _C_UPR_CASE_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_LWR_CASE_QR.focus();
    if (_C_UPR_CASE_QR.value != '' && _C_UPR_CASE_품번.value != '') {
      _C_UPR_CASE.style.backgroundColor = 'salmon';
      _C_UPR_CASE.style.color = 'white';
    }
  };

  _C_LWR_CASE_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HV_CNTR_1_QR.focus();
    if (_C_LWR_CASE_QR.value != '' && _C_LWR_CASE_품번.value != '') {
      _C_LWR_CASE.style.backgroundColor = 'salmon';
      _C_LWR_CASE.style.color = 'white';
    }
  };

  _C_HV_CNTR_1_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HV_CNTR_2_QR.focus();
    if (_C_HV_CNTR_1_QR.value != '' && _C_HV_CNTR_1_품번.value != '') {
      _C_HV_CNTR_1.style.backgroundColor = 'salmon';
      _C_HV_CNTR_1.style.color = 'white';
    }
  };

  _C_HV_CNTR_2_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HT_CNTR_QR.focus();
    if (_C_HV_CNTR_2_QR.value != '' && _C_HV_CNTR_2_품번.value != '') {
      _C_HV_CNTR_2.style.backgroundColor = 'salmon';
      _C_HV_CNTR_2.style.color = 'white';
    }
  };

  _C_HT_CNTR_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_PRA_QR.focus();
    if (_C_HT_CNTR_QR.value != '' && _C_HT_CNTR_품번.value != '') {
      _C_HT_CNTR.style.backgroundColor = 'salmon';
      _C_HT_CNTR.style.color = 'white';
    }
  };

  _C_PRA_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_FUSE_QR.focus();
    if (_C_PRA_QR.value != '' && _C_PRA_품번.value != '') {
      _C_PRA.style.backgroundColor = 'salmon';
      _C_PRA.style.color = 'white';
    }
  };

  _C_FUSE_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_LV_W_H_QR.focus();
    if (_C_FUSE_QR.value != '' && _C_FUSE_품번.value != '') {
      _C_FUSE.style.backgroundColor = 'salmon';
      _C_FUSE.style.color = 'white';
    }
  };

  _C_LV_W_H_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HV_W_H_1_QR.focus();
    if (_C_LV_W_H_QR.value != '' && _C_LV_W_H_품번.value != '') {
      _C_LV_W_H.style.backgroundColor = 'salmon';
      _C_LV_W_H.style.color = 'white';
    }
  };

  _C_HV_W_H_1_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HV_W_H_2_QR.focus();
    if (_C_HV_W_H_1_QR.value != '' && _C_HV_W_H_1_품번.value != '') {
      _C_HV_W_H_1.style.backgroundColor = 'salmon';
      _C_HV_W_H_1.style.color = 'white';
    }
  };

  _C_HV_W_H_2_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HV_W_H_3_QR.focus();
    if (_C_HV_W_H_2_QR.value != '' && _C_HV_W_H_2_품번.value != '') {
      _C_HV_W_H_2.style.backgroundColor = 'salmon';
      _C_HV_W_H_2.style.color = 'white';
    }
  };

  _C_HV_W_H_3_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HV_W_H_4_QR.focus();
    if (_C_HV_W_H_3_QR.value != '' && _C_HV_W_H_3_품번.value != '') {
      _C_HV_W_H_3.style.backgroundColor = 'salmon';
      _C_HV_W_H_3.style.color = 'white';
    }
  };

  _C_HV_W_H_4_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HV_W_H_5_QR.focus();
    if (_C_HV_W_H_4_QR.value != '' && _C_HV_W_H_4_품번.value != '') {
      _C_HV_W_H_4.style.backgroundColor = 'salmon';
      _C_HV_W_H_4.style.color = 'white';
    }
  };

  _C_HV_W_H_5_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HV_W_H_6_QR.focus();
    if (_C_HV_W_H_5_QR.value != '' && _C_HV_W_H_5_품번.value != '') {
      _C_HV_W_H_5.style.backgroundColor = 'salmon';
      _C_HV_W_H_5.style.color = 'white';
    }
  };

  _C_HV_W_H_6_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HV_W_H_7_QR.focus();
    if (_C_HV_W_H_6_QR.value != '' && _C_HV_W_H_6_품번.value != '') {
      _C_HV_W_H_6.style.backgroundColor = 'salmon';
      _C_HV_W_H_6.style.color = 'white';
    }
  };

  _C_HV_W_H_7_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_HV_W_H_8_QR.focus();
    if (_C_HV_W_H_7_QR.value != '' && _C_HV_W_H_7_품번.value != '') {
      _C_HV_W_H_7.style.backgroundColor = 'salmon';
      _C_HV_W_H_7.style.color = 'white';
    }
  };

  _C_HV_W_H_8_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_BMU_QR.focus();
    if (_C_HV_W_H_8_QR.value != '' && _C_HV_W_H_8_품번.value != '') {
      _C_HV_W_H_8.style.backgroundColor = 'salmon';
      _C_HV_W_H_8.style.color = 'white';
    }
  };

  _C_BMU_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_CMU_1_QR.focus();
    if (_C_BMU_QR.value != '' && _C_BMU_품번.value != '') {
      _C_BMU.style.backgroundColor = 'salmon';
      _C_BMU.style.color = 'white';
    }
  };

  _C_CMU_1_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_CMU_2_QR.focus();
    if (_C_CMU_1_QR.value != '' && _C_CMU_1_품번.value != '') {
      _C_CMU_1.style.backgroundColor = 'salmon';
      _C_CMU_1.style.color = 'white';
    }
  };

  _C_CMU_2_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_CMU_3_QR.focus();
    if (_C_CMU_2_QR.value != '' && _C_CMU_2_품번.value != '') {
      _C_CMU_2.style.backgroundColor = 'salmon';
      _C_CMU_2.style.color = 'white';
    }
  };

  _C_CMU_3_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_CMU_4_QR.focus();
    if (_C_CMU_3_QR.value != '' && _C_CMU_3_품번.value != '') {
      _C_CMU_3.style.backgroundColor = 'salmon';
      _C_CMU_3.style.color = 'white';
    }
  };

  _C_CMU_4_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_CMU_5_QR.focus();
    if (_C_CMU_4_QR.value != '' && _C_CMU_4_품번.value != '') {
      _C_CMU_4.style.backgroundColor = 'salmon';
      _C_CMU_4.style.color = 'white';
    }
  };

  _C_CMU_5_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_CMU_6_QR.focus();
    if (_C_CMU_5_QR.value != '' && _C_CMU_5_품번.value != '') {
      _C_CMU_5.style.backgroundColor = 'salmon';
      _C_CMU_5.style.color = 'white';
    }
  };

  _C_CMU_6_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_CMU_7_QR.focus();
    if (_C_CMU_6_QR.value != '' && _C_CMU_6_품번.value != '') {
      _C_CMU_6.style.backgroundColor = 'salmon';
      _C_CMU_6.style.color = 'white';
    }
  };

  _C_CMU_7_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_CMU_8_QR.focus();
    if (_C_CMU_7_QR.value != '' && _C_CMU_7_품번.value != '') {
      _C_CMU_7.style.backgroundColor = 'salmon';
      _C_CMU_7.style.color = 'white';
    }
  };

  _C_CMU_8_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_1_QR.focus();
    if (_C_CMU_8_QR.value != '' && _C_CMU_8_품번.value != '') {
      _C_CMU_8.style.backgroundColor = 'salmon';
      _C_CMU_8.style.color = 'white';
    }
  };

  _C_MODULE_1_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_2_QR.focus();
    if (_C_MODULE_1_QR.value != '' && _C_MODULE_1_품번.value != '') {
      _C_MODULE_1.style.backgroundColor = 'salmon';
      _C_MODULE_1.style.color = 'white';
    }
  };

  _C_MODULE_2_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_3_QR.focus();
    if (_C_MODULE_2_QR.value != '' && _C_MODULE_2_품번.value != '') {
      _C_MODULE_2.style.backgroundColor = 'salmon';
      _C_MODULE_2.style.color = 'white';
    }
  };

  _C_MODULE_3_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_4_QR.focus();
    if (_C_MODULE_3_QR.value != '' && _C_MODULE_3_품번.value != '') {
      _C_MODULE_3.style.backgroundColor = 'salmon';
      _C_MODULE_3.style.color = 'white';
    }
  };

  _C_MODULE_4_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_5_QR.focus();
    if (_C_MODULE_4_QR.value != '' && _C_MODULE_4_품번.value != '') {
      _C_MODULE_4.style.backgroundColor = 'salmon';
      _C_MODULE_4.style.color = 'white';
    }
  };

  _C_MODULE_5_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_6_QR.focus();
    if (_C_MODULE_5_QR.value != '' && _C_MODULE_5_품번.value != '') {
      _C_MODULE_5.style.backgroundColor = 'salmon';
      _C_MODULE_5.style.color = 'white';
    }
  };

  _C_MODULE_6_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_7_QR.focus();
    if (_C_MODULE_6_QR.value != '' && _C_MODULE_6_품번.value != '') {
      _C_MODULE_6.style.backgroundColor = 'salmon';
      _C_MODULE_6.style.color = 'white';
    }
  };

  _C_MODULE_7_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_8_QR.focus();
    if (_C_MODULE_7_QR.value != '' && _C_MODULE_7_품번.value != '') {
      _C_MODULE_7.style.backgroundColor = 'salmon';
      _C_MODULE_7.style.color = 'white';
    }
  };

  _C_MODULE_8_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_9_QR.focus();
    if (_C_MODULE_8_QR.value != '' && _C_MODULE_8_품번.value != '') {
      _C_MODULE_8.style.backgroundColor = 'salmon';
      _C_MODULE_8.style.color = 'white';
    }
  };

  _C_MODULE_9_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_10_QR.focus();
    if (_C_MODULE_9_QR.value != '' && _C_MODULE_9_품번.value != '') {
      _C_MODULE_9.style.backgroundColor = 'salmon';
      _C_MODULE_9.style.color = 'white';
    }
  };

  _C_MODULE_10_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_11_QR.focus();
    if (_C_MODULE_10_QR.value != '' && _C_MODULE_10_품번.value != '') {
      _C_MODULE_10.style.backgroundColor = 'salmon';
      _C_MODULE_10.style.color = 'white';
    }
  };

  _C_MODULE_11_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_12_QR.focus();
    if (_C_MODULE_11_QR.value != '' && _C_MODULE_11_품번.value != '') {
      _C_MODULE_11.style.backgroundColor = 'salmon';
      _C_MODULE_11.style.color = 'white';
    }
  };

  _C_MODULE_12_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_13_QR.focus();
    if (_C_MODULE_12_QR.value != '' && _C_MODULE_12_품번.value != '') {
      _C_MODULE_12.style.backgroundColor = 'salmon';
      _C_MODULE_12.style.color = 'white';
    }
  };

  _C_MODULE_13_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_14_QR.focus();
    if (_C_MODULE_13_QR.value != '' && _C_MODULE_13_품번.value != '') {
      _C_MODULE_13.style.backgroundColor = 'salmon';
      _C_MODULE_13.style.color = 'white';
    }
  };

  _C_MODULE_14_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_15_QR.focus();
    if (_C_MODULE_14_QR.value != '' && _C_MODULE_14_품번.value != '') {
      _C_MODULE_14.style.backgroundColor = 'salmon';
      _C_MODULE_14.style.color = 'white';
    }
  };

  _C_MODULE_15_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_16_QR.focus();
    if (_C_MODULE_15_QR.value != '' && _C_MODULE_15_품번.value != '') {
      _C_MODULE_15.style.backgroundColor = 'salmon';
      _C_MODULE_15.style.color = 'white';
    }
  };

  _C_MODULE_16_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_17_QR.focus();
    if (_C_MODULE_16_QR.value != '' && _C_MODULE_16_품번.value != '') {
      _C_MODULE_16.style.backgroundColor = 'salmon';
      _C_MODULE_16.style.color = 'white';
    }
  };

  _C_MODULE_17_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_18_QR.focus();
    if (_C_MODULE_17_QR.value != '' && _C_MODULE_17_품번.value != '') {
      _C_MODULE_17.style.backgroundColor = 'salmon';
      _C_MODULE_17.style.color = 'white';
    }
  };

  _C_MODULE_18_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_19_QR.focus();
    if (_C_MODULE_18_QR.value != '' && _C_MODULE_18_품번.value != '') {
      _C_MODULE_18.style.backgroundColor = 'salmon';
      _C_MODULE_18.style.color = 'white';
    }
  };

  _C_MODULE_19_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_20_QR.focus();
    if (_C_MODULE_19_QR.value != '' && _C_MODULE_19_품번.value != '') {
      _C_MODULE_19.style.backgroundColor = 'salmon';
      _C_MODULE_19.style.color = 'white';
    }
  };

  _C_MODULE_20_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_21_QR.focus();
    if (_C_MODULE_20_QR.value != '' && _C_MODULE_20_품번.value != '') {
      _C_MODULE_20.style.backgroundColor = 'salmon';
      _C_MODULE_20.style.color = 'white';
    }
  };

  _C_MODULE_21_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_22_QR.focus();
    if (_C_MODULE_21_QR.value != '' && _C_MODULE_21_품번.value != '') {
      _C_MODULE_21.style.backgroundColor = 'salmon';
      _C_MODULE_21.style.color = 'white';
    }
  };

  _C_MODULE_22_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_23_QR.focus();
    if (_C_MODULE_22_QR.value != '' && _C_MODULE_22_품번.value != '') {
      _C_MODULE_22.style.backgroundColor = 'salmon';
      _C_MODULE_22.style.color = 'white';
    }
  };

  _C_MODULE_23_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_24_QR.focus();
    if (_C_MODULE_23_QR.value != '' && _C_MODULE_23_품번.value != '') {
      _C_MODULE_23.style.backgroundColor = 'salmon';
      _C_MODULE_23.style.color = 'white';
    }
  };

  _C_MODULE_24_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_25_QR.focus();
    if (_C_MODULE_24_QR.value != '' && _C_MODULE_24_품번.value != '') {
      _C_MODULE_24.style.backgroundColor = 'salmon';
      _C_MODULE_24.style.color = 'white';
    }
  };

  _C_MODULE_25_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_26_QR.focus();
    if (_C_MODULE_25_QR.value != '' && _C_MODULE_25_품번.value != '') {
      _C_MODULE_25.style.backgroundColor = 'salmon';
      _C_MODULE_25.style.color = 'white';
    }
  };

  _C_MODULE_26_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_27_QR.focus();
    if (_C_MODULE_26_QR.value != '' && _C_MODULE_26_품번.value != '') {
      _C_MODULE_26.style.backgroundColor = 'salmon';
      _C_MODULE_26.style.color = 'white';
    }
  };

  _C_MODULE_27_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_28_QR.focus();
    if (_C_MODULE_27_QR.value != '' && _C_MODULE_27_품번.value != '') {
      _C_MODULE_27.style.backgroundColor = 'salmon';
      _C_MODULE_27.style.color = 'white';
    }
  };

  _C_MODULE_28_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_29_QR.focus();
    if (_C_MODULE_28_QR.value != '' && _C_MODULE_28_품번.value != '') {
      _C_MODULE_28.style.backgroundColor = 'salmon';
      _C_MODULE_28.style.color = 'white';
    }
  };

  _C_MODULE_29_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_30_QR.focus();
    if (_C_MODULE_29_QR.value != '' && _C_MODULE_29_품번.value != '') {
      _C_MODULE_29.style.backgroundColor = 'salmon';
      _C_MODULE_29.style.color = 'white';
    }
  };

  _C_MODULE_30_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_31_QR.focus();
    if (_C_MODULE_30_QR.value != '' && _C_MODULE_30_품번.value != '') {
      _C_MODULE_30.style.backgroundColor = 'salmon';
      _C_MODULE_30.style.color = 'white';
    }
  };

  _C_MODULE_31_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _C_MODULE_32_QR.focus();
    if (_C_MODULE_31_QR.value != '' && _C_MODULE_31_품번.value != '') {
      _C_MODULE_31.style.backgroundColor = 'salmon';
      _C_MODULE_31.style.color = 'white';
    }
  };

  _C_MODULE_32_품번.onkeydown = function (event) {
    if (_C_MODULE_32_QR.value != '' && _C_MODULE_32_품번.value != '') {
      _C_MODULE_32.style.backgroundColor = 'salmon';
      _C_MODULE_32.style.color = 'white';
    }
    //_C_MODULE_32_품번.focus();
  };

  _D_UPR_CASE_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _D_LWR_CASE_QR.focus();
    if (_D_UPR_CASE_QR.value != '' && _D_UPR_CASE_품번.value != '') {
      _D_UPR_CASE.style.backgroundColor = 'salmon';
      _D_UPR_CASE.style.color = 'white';
    }
  };

  _D_LWR_CASE_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _D_HV_CNTR_1_QR.focus();
    if (_D_LWR_CASE_QR.value != '' && _D_LWR_CASE_품번.value != '') {
      _D_LWR_CASE.style.backgroundColor = 'salmon';
      _D_LWR_CASE.style.color = 'white';
    }
  };

  _D_HV_CNTR_1_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _D_HV_CNTR_2_QR.focus();
    if (_D_HV_CNTR_1_QR.value != '' && _D_HV_CNTR_1_품번.value != '') {
      _D_HV_CNTR_1.style.backgroundColor = 'salmon';
      _D_HV_CNTR_1.style.color = 'white';
    }
  };

  _D_HV_CNTR_2_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _D_RELAY_QR.focus();
    if (_D_HV_CNTR_2_QR.value != '' && _D_HV_CNTR_2_품번.value != '') {
      _D_HV_CNTR_2.style.backgroundColor = 'salmon';
      _D_HV_CNTR_2.style.color = 'white';
    }
  };

  _D_RELAY_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _D_LV_W_H_QR.focus();
    if (_D_RELAY_QR.value != '' && _D_RELAY_품번.value != '') {
      _D_RELAY.style.backgroundColor = 'salmon';
      _D_RELAY.style.color = 'white';
    }
  };

  _D_LV_W_H_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _D_HV_W_H_1_QR.focus();
    if (_D_LV_W_H_QR.value != '' && _C_LV_W_H_품번.value != '') {
      _D_LV_W_H.style.backgroundColor = 'salmon';
      _D_LV_W_H.style.color = 'white';
    }
  };

  _D_HV_W_H_1_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _D_HV_W_H_2_QR.focus();
    if (_D_HV_W_H_1_QR.value != '' && _D_HV_W_H_1_품번.value != '') {
      _D_HV_W_H_1.style.backgroundColor = 'salmon';
      _D_HV_W_H_1.style.color = 'white';
    }
  };

  _D_HV_W_H_2_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _D_BMU_QR.focus();
    if (_D_HV_W_H_2_QR.value != '' && _D_HV_W_H_2_품번.value != '') {
      _D_HV_W_H_2.style.backgroundColor = 'salmon';
      _D_HV_W_H_2.style.color = 'white';
    }
  };

  _D_BMU_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _D_CMU_1_QR.focus();
    if (_D_BMU_QR.value != '' && _D_BMU_품번.value != '') {
      _D_BMU.style.backgroundColor = 'salmon';
      _D_BMU.style.color = 'white';
    }
  };

  _D_CMU_1_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _D_MODULE_1_QR.focus();
    if (_D_CMU_1_QR.value != '' && _D_CMU_1_품번.value != '') {
      _D_CMU_1.style.backgroundColor = 'salmon';
      _D_CMU_1.style.color = 'white';
    }
  };

  _D_MODULE_1_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _D_MODULE_2_QR.focus();
    if (_D_MODULE_1_QR.value != '' && _D_MODULE_1_품번.value != '') {
      _D_MODULE_1.style.backgroundColor = 'salmon';
      _D_MODULE_1.style.color = 'white';
    }
  };

  _D_MODULE_2_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _D2_HV_W_H_1_QR.focus();
    if (_D_MODULE_2_QR.value != '' && _D_MODULE_2_품번.value != '') {
      _D_MODULE_2.style.backgroundColor = 'salmon';
      _D_MODULE_2.style.color = 'white';
    }
  };

  _D2_HV_W_H_1_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _D2_CMU_1_QR.focus();
    if (_D2_HV_W_H_1_QR.value != '' && _D2_HV_W_H_1_품번.value != '') {
      _D2_HV_W_H_1.style.backgroundColor = 'salmon';
      _D2_HV_W_H_1.style.color = 'white';
    }
  };

  _D2_CMU_1_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _D2_RELAY_QR.focus();
    if (_D2_CMU_1_QR.value != '' && _D2_CMU_1_품번.value != '') {
      _D2_CMU_1.style.backgroundColor = 'salmon';
      _D2_CMU_1.style.color = 'white';
    }
  };

  _D2_RELAY_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _D2_BMU_QR.focus();
    if (_D2_RELAY_QR.value != '' && _D2_RELAY_품번.value != '') {
      _D2_RELAY.style.backgroundColor = 'salmon';
      _D2_RELAY.style.color = 'white';
    }
  };

  _D2_BMU_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _D2_HV_CNTR_1_QR.focus();
    if (_D2_BMU_QR.value != '' && _D2_BMU_품번.value != '') {
      _D2_BMU.style.backgroundColor = 'salmon';
      _D2_BMU.style.color = 'white';
    }
  };

  _D2_HV_CNTR_1_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _D2_HV_CNTR_2_QR.focus();
    if (_D2_HV_CNTR_1_QR.value != '' && _D2_HV_CNTR_1_품번.value != '') {
      _D2_HV_CNTR_1.style.backgroundColor = 'salmon';
      _D2_HV_CNTR_1.style.color = 'white';
    }
  };

  _D2_HV_CNTR_2_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _D2_LWR_CASE_QR.focus();
    if (_D2_HV_CNTR_2_QR.value != '' && _D2_HV_CNTR_2_품번.value != '') {
      _D2_HV_CNTR_2.style.backgroundColor = 'salmon';
      _D2_HV_CNTR_2.style.color = 'white';
    }
  };

  _D2_LWR_CASE_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _D2_UPR_CASE_QR.focus();
    if (_D2_LWR_CASE_QR.value != '' && _D2_LWR_CASE_품번.value != '') {
      _D2_LWR_CASE.style.backgroundColor = 'salmon';
      _D2_LWR_CASE.style.color = 'white';
    }
  };

  _D2_UPR_CASE_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _D2_LV_W_H_QR.focus();
    if (_D2_UPR_CASE_QR.value != '' && _D2_UPR_CASE_품번.value != '') {
      _D2_UPR_CASE.style.backgroundColor = 'salmon';
      _D2_UPR_CASE.style.color = 'white';
    }
  };

  _D2_LV_W_H_품번.onkeydown = function (event) {
    if (event.keyCode == 13) _D2_MODULE_1_QR.focus();
    if (_D2_LV_W_H_QR.value != '' && _D2_LV_W_H_품번.value != '') {
      _D2_LV_W_H.style.backgroundColor = 'salmon';
      _D2_LV_W_H.style.color = 'white';
    }
  };

  _D2_MODULE_1_품번.onkeydown = function (event) {
    if (_D2_MODULE_1_QR.value != '' && _D2_MODULE_1_품번.value != '') {
      _D2_MODULE_1.style.backgroundColor = 'salmon';
      _D2_MODULE_1.style.color = 'white';
    }
  };
}

function get_sel_value(event) {
  const button = event.target;
  const id = button.id;

  var selectbox = document.getElementById(id);
  var value = selectbox.options[selectbox.selectedIndex].value;
  var _품번_box = id.slice(0, -4) + '_품번';

  document.getElementById(_품번_box).value = value;
}

async function compare_품번() {
  switch (차종) {
    case 'DE':
    case 'DE_EV':
    case 'SK3':
    case 'SK3_EV':
      if (DE_SK3_LWR_CASE.indexOf(_A_LWR_CASE_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'LWR_CASE', _A_LWR_CASE_품번.value.toUpperCase());
      if (DE_SK3_UPR_CASE.indexOf(_A_UPR_CASE_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'UPR_CASE', _A_UPR_CASE_품번.value.toUpperCase());
      if (DE_SK3_S_PLUG.indexOf(_A_S_PLUG_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'S_PLUG', _A_S_PLUG_품번.value.toUpperCase());
      if (DE_SK3_SPA.indexOf(_A_SPA_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'SPA', _A_SPA_품번.value.toUpperCase());
      if (DE_SK3_HV_CNTR.indexOf(_A_HV_CNTR_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'HV_CNTR', _A_HV_CNTR_품번.value.toUpperCase());
      if (DE_SK3_HT_CNTR.indexOf(_A_HT_CNTR_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'HT_CNTR', _A_HT_CNTR_품번.value.toUpperCase());
      if (DE_SK3_PRA.indexOf(_A_PRA_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'PRA', _A_PRA_품번.value.toUpperCase());
      if (DE_SK3_LV_W_H.indexOf(_A_LV_W_H_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'LV_W_H', _A_LV_W_H_품번.value.toUpperCase());
      if (DE_SK3_HV_W_H.indexOf(_A_HV_W_H_1_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'HV_W_H', _A_HV_W_H_1_품번.value.toUpperCase());
      if (DE_SK3_HV_W_H.indexOf(_A_HV_W_H_2_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'HV_W_H', _A_HV_W_H_2_품번.value.toUpperCase());
      if (DE_SK3_HV_W_H.indexOf(_A_HV_W_H_3_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'HV_W_H', _A_HV_W_H_3_품번.value.toUpperCase());
      if (DE_SK3_HV_W_H.indexOf(_A_HV_W_H_4_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'HV_W_H', _A_HV_W_H_4_품번.value.toUpperCase());
      if (DE_SK3_HV_W_H.indexOf(_A_HV_W_H_5_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'HV_W_H', _A_HV_W_H_5_품번.value.toUpperCase());
      if (DE_SK3_BMU.indexOf(_A_BMU_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'BMU', _A_BMU_품번.value.toUpperCase());
      if (DE_SK3_CMU.indexOf(_A_CMU_1_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'CMU', _A_CMU_1_품번.value.toUpperCase());
      if (DE_SK3_CMU.indexOf(_A_CMU_2_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'CMU', _A_CMU_2_품번.value.toUpperCase());
      if (DE_SK3_CMU.indexOf(_A_CMU_3_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'CMU', _A_CMU_3_품번.value.toUpperCase());
      if (DE_SK3_CMU.indexOf(_A_CMU_4_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'CMU', _A_CMU_4_품번.value.toUpperCase());
      if (DE_SK3_CMU.indexOf(_A_CMU_5_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'CMU', _A_CMU_5_품번.value.toUpperCase());
      if (DE_SK3_MODULE.indexOf(_A_MODULE_1_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'MODULE', _A_MODULE_1_품번.value.toUpperCase());
      if (DE_SK3_MODULE.indexOf(_A_MODULE_2_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'MODULE', _A_MODULE_2_품번.value.toUpperCase());
      if (DE_SK3_MODULE.indexOf(_A_MODULE_3_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'MODULE', _A_MODULE_3_품번.value.toUpperCase());
      if (DE_SK3_MODULE.indexOf(_A_MODULE_4_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'MODULE', _A_MODULE_4_품번.value.toUpperCase());
      if (DE_SK3_MODULE.indexOf(_A_MODULE_5_품번.value.toUpperCase()) == -1) await save_품번('DE_SK3', 'MODULE', _A_MODULE_5_품번.value.toUpperCase());

      break;

    case 'OS':
    case 'OS_EV':
      if (OS_LWR_CASE.indexOf(_A_LWR_CASE_품번.value.toUpperCase()) == -1) await save_품번('OS', 'LWR_CASE', _A_LWR_CASE_품번.value.toUpperCase());
      if (OS_UPR_CASE.indexOf(_A_UPR_CASE_품번.value.toUpperCase()) == -1) await save_품번('OS', 'UPR_CASE', _A_UPR_CASE_품번.value.toUpperCase());
      if (OS_S_PLUG.indexOf(_A_S_PLUG_품번.value.toUpperCase()) == -1) await save_품번('OS', 'S_PLUG', _A_S_PLUG_품번.value.toUpperCase());
      if (OS_SPA.indexOf(_A_SPA_품번.value.toUpperCase()) == -1) await save_품번('OS', 'SPA', _A_SPA_품번.value.toUpperCase());
      if (OS_HV_CNTR.indexOf(_A_HV_CNTR_품번.value.toUpperCase()) == -1) await save_품번('OS', 'HV_CNTR', _A_HV_CNTR_품번.value.toUpperCase());
      if (OS_HT_CNTR.indexOf(_A_HT_CNTR_품번.value.toUpperCase()) == -1) await save_품번('OS', 'HT_CNTR', _A_HT_CNTR_품번.value.toUpperCase());
      if (OS_PRA.indexOf(_A_PRA_품번.value.toUpperCase()) == -1) await save_품번('OS', 'PRA', _A_PRA_품번.value.toUpperCase());
      if (OS_LV_W_H.indexOf(_A_LV_W_H_품번.value.toUpperCase()) == -1) await save_품번('OS', 'LV_W_H', _A_LV_W_H_품번.value.toUpperCase());
      if (OS_HV_W_H.indexOf(_A_HV_W_H_1_품번.value.toUpperCase()) == -1) await save_품번('OS', 'HV_W_H', _A_HV_W_H_1_품번.value.toUpperCase());
      if (OS_HV_W_H.indexOf(_A_HV_W_H_2_품번.value.toUpperCase()) == -1) await save_품번('OS', 'HV_W_H', _A_HV_W_H_2_품번.value.toUpperCase());
      if (OS_HV_W_H.indexOf(_A_HV_W_H_3_품번.value.toUpperCase()) == -1) await save_품번('OS', 'HV_W_H', _A_HV_W_H_3_품번.value.toUpperCase());
      if (OS_HV_W_H.indexOf(_A_HV_W_H_4_품번.value.toUpperCase()) == -1) await save_품번('OS', 'HV_W_H', _A_HV_W_H_4_품번.value.toUpperCase());
      if (OS_HV_W_H.indexOf(_A_HV_W_H_5_품번.value.toUpperCase()) == -1) await save_품번('OS', 'HV_W_H', _A_HV_W_H_5_품번.value.toUpperCase());
      if (OS_BMU.indexOf(_A_BMU_품번.value.toUpperCase()) == -1) await save_품번('OS', 'BMU', _A_BMU_품번.value.toUpperCase());
      if (OS_CMU.indexOf(_A_CMU_1_품번.value.toUpperCase()) == -1) await save_품번('OS', 'CMU', _A_CMU_1_품번.value.toUpperCase());
      if (OS_CMU.indexOf(_A_CMU_2_품번.value.toUpperCase()) == -1) await save_품번('OS', 'CMU', _A_CMU_2_품번.value.toUpperCase());
      if (OS_CMU.indexOf(_A_CMU_3_품번.value.toUpperCase()) == -1) await save_품번('OS', 'CMU', _A_CMU_3_품번.value.toUpperCase());
      if (OS_CMU.indexOf(_A_CMU_4_품번.value.toUpperCase()) == -1) await save_품번('OS', 'CMU', _A_CMU_4_품번.value.toUpperCase());
      if (OS_CMU.indexOf(_A_CMU_5_품번.value.toUpperCase()) == -1) await save_품번('OS', 'CMU', _A_CMU_5_품번.value.toUpperCase());
      if (OS_MODULE.indexOf(_A_MODULE_1_품번.value.toUpperCase()) == -1) await save_품번('OS', 'MODULE', _A_MODULE_1_품번.value.toUpperCase());
      if (OS_MODULE.indexOf(_A_MODULE_2_품번.value.toUpperCase()) == -1) await save_품번('OS', 'MODULE', _A_MODULE_2_품번.value.toUpperCase());
      if (OS_MODULE.indexOf(_A_MODULE_3_품번.value.toUpperCase()) == -1) await save_품번('OS', 'MODULE', _A_MODULE_3_품번.value.toUpperCase());
      if (OS_MODULE.indexOf(_A_MODULE_4_품번.value.toUpperCase()) == -1) await save_품번('OS', 'MODULE', _A_MODULE_4_품번.value.toUpperCase());
      if (OS_MODULE.indexOf(_A_MODULE_5_품번.value.toUpperCase()) == -1) await save_품번('OS', 'MODULE', _A_MODULE_5_품번.value.toUpperCase());

      break;

    case 'HR':
    case 'HR_EV':
    case 'PU':
    case 'PU_EV':
      if (HR_PU_LWR_CASE.indexOf(_B_LWR_CASE_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'LWR_CASE', _B_LWR_CASE_품번.value.toUpperCase());
      if (HR_PU_UPR_CASE.indexOf(_B_UPR_CASE_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'UPR_CASE', _B_UPR_CASE_품번.value.toUpperCase());
      if (HR_PU_HV_CNTR.indexOf(_B_HV_CNTR_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'HV_CNTR', _B_HV_CNTR_품번.value.toUpperCase());
      if (HR_PU_HT_CNTR.indexOf(_B_HT_CNTR_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'HT_CNTR', _B_HT_CNTR_품번.value.toUpperCase());
      if (HR_PU_PRA.indexOf(_B_PRA_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'PRA', _B_PRA_품번.value.toUpperCase());
      if (HR_PU_LV_W_H.indexOf(_B_LV_W_H_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'LV_W_H', _B_LV_W_H_품번.value.toUpperCase());
      if (HR_PU_HV_W_H.indexOf(_B_HV_W_H_1_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'HV_W_H', _B_HV_W_H_1_품번.value.toUpperCase());
      if (HR_PU_HV_W_H.indexOf(_B_HV_W_H_2_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'HV_W_H', _B_HV_W_H_2_품번.value.toUpperCase());
      if (HR_PU_BMU.indexOf(_B_BMU_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'BMU', _B_BMU_품번.value.toUpperCase());
      if (HR_PU_CMU.indexOf(_B_CMU_1_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'CMU', _B_CMU_1_품번.value.toUpperCase());
      if (HR_PU_CMU.indexOf(_B_CMU_2_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'CMU', _B_CMU_2_품번.value.toUpperCase());
      if (HR_PU_CMU.indexOf(_B_CMU_3_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'CMU', _B_CMU_3_품번.value.toUpperCase());
      if (HR_PU_CMU.indexOf(_B_CMU_4_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'CMU', _B_CMU_4_품번.value.toUpperCase());
      if (HR_PU_CMU.indexOf(_B_CMU_5_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'CMU', _B_CMU_5_품번.value.toUpperCase());
      if (HR_PU_MODULE.indexOf(_B_MODULE_1_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'MODULE', _B_MODULE_1_품번.value.toUpperCase());
      if (HR_PU_MODULE.indexOf(_B_MODULE_2_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'MODULE', _B_MODULE_2_품번.value.toUpperCase());
      if (HR_PU_MODULE.indexOf(_B_MODULE_3_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'MODULE', _B_MODULE_3_품번.value.toUpperCase());
      if (HR_PU_MODULE.indexOf(_B_MODULE_4_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'MODULE', _B_MODULE_4_품번.value.toUpperCase());
      if (HR_PU_MODULE.indexOf(_B_MODULE_5_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'MODULE', _B_MODULE_5_품번.value.toUpperCase());
      if (HR_PU_MODULE.indexOf(_B_MODULE_6_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'MODULE', _B_MODULE_6_품번.value.toUpperCase());
      if (HR_PU_MODULE.indexOf(_B_MODULE_7_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'MODULE', _B_MODULE_7_품번.value.toUpperCase());
      if (HR_PU_MODULE.indexOf(_B_MODULE_8_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'MODULE', _B_MODULE_8_품번.value.toUpperCase());
      if (HR_PU_MODULE.indexOf(_B_MODULE_9_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'MODULE', _B_MODULE_9_품번.value.toUpperCase());
      if (HR_PU_MODULE.indexOf(_B_MODULE_10_품번.value.toUpperCase()) == -1) await save_품번('HR/PU', 'MODULE', _B_MODULE_10_품번.value.toUpperCase());

      break;

    case 'CV':
    case 'CV_EV':
      if (CV_LWR_CASE.indexOf(_C_LWR_CASE_품번.value.toUpperCase()) == -1) await save_품번('CV', 'LWR_CASE', _A_LWR_CASE_품번.value.toUpperCase());
      if (CV_UPR_CASE.indexOf(_C_UPR_CASE_품번.value.toUpperCase()) == -1) await save_품번('CV', 'UPR_CASE', _A_UPR_CASE_품번.value.toUpperCase());
      if (CV_HV_CNTR.indexOf(_C_HV_CNTR_1_품번.value.toUpperCase()) == -1) await save_품번('CV', 'HV_CNTR', _C_HV_CNTR_1_품번.value.toUpperCase());
      if (CV_HV_CNTR.indexOf(_C_HV_CNTR_2_품번.value.toUpperCase()) == -1) await save_품번('CV', 'HV_CNTR', _C_HV_CNTR_2_품번.value.toUpperCase());
      if (CV_HT_CNTR.indexOf(_C_HT_CNTR_품번.value.toUpperCase()) == -1) await save_품번('CV', 'HT_CNTR', _C_HT_CNTR_품번.value.toUpperCase());
      if (CV_PRA.indexOf(_C_PRA_품번.value.toUpperCase()) == -1) await save_품번('CV', 'PRA', _C_PRA_품번.value.toUpperCase());
      if (CV_FUSE.indexOf(_C_FUSE_품번.value.toUpperCase()) == -1) await save_품번('CV', 'FUSE', _C_FUSE_품번.value.toUpperCase());
      if (CV_LV_W_H.indexOf(_C_LV_W_H_품번.value.toUpperCase()) == -1) await save_품번('CV', 'LV_W_H', _C_LV_W_H_품번.value.toUpperCase());
      if (CV_HV_W_H.indexOf(_C_HV_W_H_1_품번.value.toUpperCase()) == -1) await save_품번('CV', 'HV_W_H', _C_HV_W_H_1_품번.value.toUpperCase());
      if (CV_HV_W_H.indexOf(_C_HV_W_H_2_품번.value.toUpperCase()) == -1) await save_품번('CV', 'HV_W_H', _C_HV_W_H_2_품번.value.toUpperCase());
      if (CV_HV_W_H.indexOf(_C_HV_W_H_3_품번.value.toUpperCase()) == -1) await save_품번('CV', 'HV_W_H', _C_HV_W_H_3_품번.value.toUpperCase());
      if (CV_HV_W_H.indexOf(_C_HV_W_H_4_품번.value.toUpperCase()) == -1) await save_품번('CV', 'HV_W_H', _C_HV_W_H_4_품번.value.toUpperCase());
      if (CV_HV_W_H.indexOf(_C_HV_W_H_5_품번.value.toUpperCase()) == -1) await save_품번('CV', 'HV_W_H', _C_HV_W_H_5_품번.value.toUpperCase());
      if (CV_HV_W_H.indexOf(_C_HV_W_H_6_품번.value.toUpperCase()) == -1) await save_품번('CV', 'HV_W_H', _C_HV_W_H_6_품번.value.toUpperCase());
      if (CV_HV_W_H.indexOf(_C_HV_W_H_7_품번.value.toUpperCase()) == -1) await save_품번('CV', 'HV_W_H', _C_HV_W_H_7_품번.value.toUpperCase());
      if (CV_HV_W_H.indexOf(_C_HV_W_H_8_품번.value.toUpperCase()) == -1) await save_품번('CV', 'HV_W_H', _C_HV_W_H_8_품번.value.toUpperCase());
      if (CV_BMU.indexOf(_C_BMU_품번.value.toUpperCase()) == -1) await save_품번('CV', 'BMU', _C_BMU_품번.value.toUpperCase());
      if (CV_CMU.indexOf(_C_CMU_1_품번.value.toUpperCase()) == -1) await save_품번('CV', 'CMU', _C_CMU_1_품번.value.toUpperCase());
      if (CV_CMU.indexOf(_C_CMU_2_품번.value.toUpperCase()) == -1) await save_품번('CV', 'CMU', _C_CMU_2_품번.value.toUpperCase());
      if (CV_CMU.indexOf(_C_CMU_3_품번.value.toUpperCase()) == -1) await save_품번('CV', 'CMU', _C_CMU_3_품번.value.toUpperCase());
      if (CV_CMU.indexOf(_C_CMU_4_품번.value.toUpperCase()) == -1) await save_품번('CV', 'CMU', _C_CMU_4_품번.value.toUpperCase());
      if (CV_CMU.indexOf(_C_CMU_5_품번.value.toUpperCase()) == -1) await save_품번('CV', 'CMU', _C_CMU_5_품번.value.toUpperCase());
      if (CV_CMU.indexOf(_C_CMU_6_품번.value.toUpperCase()) == -1) await save_품번('CV', 'CMU', _C_CMU_6_품번.value.toUpperCase());
      if (CV_CMU.indexOf(_C_CMU_7_품번.value.toUpperCase()) == -1) await save_품번('CV', 'CMU', _C_CMU_7_품번.value.toUpperCase());
      if (CV_CMU.indexOf(_C_CMU_8_품번.value.toUpperCase()) == -1) await save_품번('CV', 'CMU', _C_CMU_8_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_1_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_1_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_2_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_2_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_3_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_3_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_4_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_4_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_5_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_5_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_6_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_6_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_7_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_7_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_8_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_8_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_9_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_9_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_10_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_10_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_11_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_11_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_12_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_12_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_13_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_13_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_14_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_14_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_15_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_15_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_16_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_16_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_17_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_17_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_18_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_18_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_19_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_19_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_20_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_20_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_21_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_21_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_22_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_22_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_23_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_23_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_23_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_23_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_24_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_24_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_25_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_25_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_26_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_26_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_27_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_27_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_28_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_28_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_29_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_29_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_30_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_30_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_31_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_31_품번.value.toUpperCase());
      if (CV_MODULE.indexOf(_C_MODULE_32_품번.value.toUpperCase()) == -1) await save_품번('CV', 'MODULE', _C_MODULE_32_품번.value.toUpperCase());

      break;

    case 'NE':
    case 'NE_EV':
      if (NE_LWR_CASE.indexOf(_C_LWR_CASE_품번.value.toUpperCase()) == -1) await save_품번('NE', 'LWR_CASE', _C_LWR_CASE_품번.value.toUpperCase());
      if (NE_UPR_CASE.indexOf(_C_UPR_CASE_품번.value.toUpperCase()) == -1) await save_품번('NE', 'UPR_CASE', _C_UPR_CASE_품번.value.toUpperCase());
      if (NE_HV_CNTR.indexOf(_C_HV_CNTR_1_품번.value.toUpperCase()) == -1) await save_품번('NE', 'HV_CNTR', _C_HV_CNTR_1_품번.value.toUpperCase());
      if (NE_HV_CNTR.indexOf(_C_HV_CNTR_2_품번.value.toUpperCase()) == -1) await save_품번('NE', 'HV_CNTR', _C_HV_CNTR_2_품번.value.toUpperCase());
      if (NE_HT_CNTR.indexOf(_C_HT_CNTR_품번.value.toUpperCase()) == -1) await save_품번('NE', 'HT_CNTR', _C_HT_CNTR_품번.value.toUpperCase());
      if (NE_PRA.indexOf(_C_PRA_품번.value.toUpperCase()) == -1) await save_품번('NE', 'PRA', _C_PRA_품번.value.toUpperCase());
      if (NE_FUSE.indexOf(_C_FUSE_품번.value.toUpperCase()) == -1) await save_품번('NE', 'FUSE', _C_FUSE_품번.value.toUpperCase());
      if (NE_LV_W_H.indexOf(_C_LV_W_H_품번.value.toUpperCase()) == -1) await save_품번('NE', 'LV_W_H', _C_LV_W_H_품번.value.toUpperCase());
      if (NE_HV_W_H.indexOf(_C_HV_W_H_1_품번.value.toUpperCase()) == -1) await save_품번('NE', 'HV_W_H', _C_HV_W_H_1_품번.value.toUpperCase());
      if (NE_HV_W_H.indexOf(_C_HV_W_H_2_품번.value.toUpperCase()) == -1) await save_품번('NE', 'HV_W_H', _C_HV_W_H_2_품번.value.toUpperCase());
      if (NE_HV_W_H.indexOf(_C_HV_W_H_3_품번.value.toUpperCase()) == -1) await save_품번('NE', 'HV_W_H', _C_HV_W_H_3_품번.value.toUpperCase());
      if (NE_HV_W_H.indexOf(_C_HV_W_H_4_품번.value.toUpperCase()) == -1) await save_품번('NE', 'HV_W_H', _C_HV_W_H_4_품번.value.toUpperCase());
      if (NE_HV_W_H.indexOf(_C_HV_W_H_5_품번.value.toUpperCase()) == -1) await save_품번('NE', 'HV_W_H', _C_HV_W_H_5_품번.value.toUpperCase());
      if (NE_HV_W_H.indexOf(_C_HV_W_H_6_품번.value.toUpperCase()) == -1) await save_품번('NE', 'HV_W_H', _C_HV_W_H_6_품번.value.toUpperCase());
      if (NE_HV_W_H.indexOf(_C_HV_W_H_7_품번.value.toUpperCase()) == -1) await save_품번('NE', 'HV_W_H', _C_HV_W_H_7_품번.value.toUpperCase());
      if (NE_HV_W_H.indexOf(_C_HV_W_H_8_품번.value.toUpperCase()) == -1) await save_품번('NE', 'HV_W_H', _C_HV_W_H_8_품번.value.toUpperCase());
      if (NE_BMU.indexOf(_C_BMU_품번.value.toUpperCase()) == -1) await save_품번('NE', 'BMU', _C_BMU_품번.value.toUpperCase());
      if (NE_CMU.indexOf(_C_CMU_1_품번.value.toUpperCase()) == -1) await save_품번('NE', 'CMU', _C_CMU_1_품번.value.toUpperCase());
      if (NE_CMU.indexOf(_C_CMU_2_품번.value.toUpperCase()) == -1) await save_품번('NE', 'CMU', _C_CMU_2_품번.value.toUpperCase());
      if (NE_CMU.indexOf(_C_CMU_3_품번.value.toUpperCase()) == -1) await save_품번('NE', 'CMU', _C_CMU_3_품번.value.toUpperCase());
      if (NE_CMU.indexOf(_C_CMU_4_품번.value.toUpperCase()) == -1) await save_품번('NE', 'CMU', _C_CMU_4_품번.value.toUpperCase());
      if (NE_CMU.indexOf(_C_CMU_5_품번.value.toUpperCase()) == -1) await save_품번('NE', 'CMU', _C_CMU_5_품번.value.toUpperCase());
      if (NE_CMU.indexOf(_C_CMU_6_품번.value.toUpperCase()) == -1) await save_품번('NE', 'CMU', _C_CMU_6_품번.value.toUpperCase());
      if (NE_CMU.indexOf(_C_CMU_7_품번.value.toUpperCase()) == -1) await save_품번('NE', 'CMU', _C_CMU_7_품번.value.toUpperCase());
      if (NE_CMU.indexOf(_C_CMU_8_품번.value.toUpperCase()) == -1) await save_품번('NE', 'CMU', _C_CMU_8_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_1_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_1_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_2_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_2_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_3_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_3_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_4_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_4_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_5_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_5_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_6_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_6_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_7_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_7_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_8_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_8_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_9_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_9_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_10_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_10_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_11_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_11_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_12_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_12_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_13_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_13_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_14_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_14_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_15_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_15_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_16_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_16_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_17_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_17_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_18_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_18_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_19_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_19_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_20_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_20_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_21_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_21_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_22_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_22_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_23_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_23_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_23_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_23_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_24_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_24_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_25_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_25_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_26_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_26_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_27_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_27_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_28_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_28_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_29_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_29_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_30_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_30_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_31_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_31_품번.value.toUpperCase());
      if (NE_MODULE.indexOf(_C_MODULE_32_품번.value.toUpperCase()) == -1) await save_품번('NE', 'MODULE', _C_MODULE_32_품번.value.toUpperCase());

      break;

    case 'JW':
    case 'JW_EV':
      if (JW_LWR_CASE.indexOf(_C_LWR_CASE_품번.value.toUpperCase()) == -1) await save_품번('JW', 'LWR_CASE', _C_LWR_CASE_품번.value.toUpperCase());
      if (JW_UPR_CASE.indexOf(_C_UPR_CASE_품번.value.toUpperCase()) == -1) await save_품번('JW', 'UPR_CASE', _C_UPR_CASE_품번.value.toUpperCase());
      if (JW_HV_CNTR.indexOf(_C_HV_CNTR_1_품번.value.toUpperCase()) == -1) await save_품번('JW', 'HV_CNTR', _C_HV_CNTR_1_품번.value.toUpperCase());
      if (JW_HV_CNTR.indexOf(_C_HV_CNTR_2_품번.value.toUpperCase()) == -1) await save_품번('JW', 'HV_CNTR', _C_HV_CNTR_2_품번.value.toUpperCase());
      if (JW_HT_CNTR.indexOf(_C_HT_CNTR_품번.value.toUpperCase()) == -1) await save_품번('JW', 'HT_CNTR', _C_HT_CNTR_품번.value.toUpperCase());
      if (JW_PRA.indexOf(_C_PRA_품번.value.toUpperCase()) == -1) await save_품번('JW', 'PRA', _C_PRA_품번.value.toUpperCase());
      if (JW_FUSE.indexOf(_C_FUSE_품번.value.toUpperCase()) == -1) await save_품번('JW', 'FUSE', _C_FUSE_품번.value.toUpperCase());
      if (JW_RELAY.indexOf(_C_RELAY_품번.value.toUpperCase()) == -1) await save_품번('JW', 'RELAY', _C_RELAY_품번.value.toUpperCase());
      if (JW_HV_W_H.indexOf(_C_HV_W_H_1_품번.value.toUpperCase()) == -1) await save_품번('JW', 'HV_W_H', _C_HV_W_H_1_품번.value.toUpperCase());
      if (JW_HV_W_H.indexOf(_C_HV_W_H_2_품번.value.toUpperCase()) == -1) await save_품번('JW', 'HV_W_H', _C_HV_W_H_2_품번.value.toUpperCase());
      if (JW_HV_W_H.indexOf(_C_HV_W_H_3_품번.value.toUpperCase()) == -1) await save_품번('JW', 'HV_W_H', _C_HV_W_H_3_품번.value.toUpperCase());
      if (JW_HV_W_H.indexOf(_C_HV_W_H_4_품번.value.toUpperCase()) == -1) await save_품번('JW', 'HV_W_H', _C_HV_W_H_4_품번.value.toUpperCase());
      if (JW_HV_W_H.indexOf(_C_HV_W_H_5_품번.value.toUpperCase()) == -1) await save_품번('JW', 'HV_W_H', _C_HV_W_H_5_품번.value.toUpperCase());
      if (JW_HV_W_H.indexOf(_C_HV_W_H_6_품번.value.toUpperCase()) == -1) await save_품번('JW', 'HV_W_H', _C_HV_W_H_6_품번.value.toUpperCase());
      if (JW_HV_W_H.indexOf(_C_HV_W_H_7_품번.value.toUpperCase()) == -1) await save_품번('JW', 'HV_W_H', _C_HV_W_H_7_품번.value.toUpperCase());
      if (JW_HV_W_H.indexOf(_C_HV_W_H_8_품번.value.toUpperCase()) == -1) await save_품번('JW', 'HV_W_H', _C_HV_W_H_8_품번.value.toUpperCase());
      if (JW_BMU.indexOf(_C_BMU_품번.value.toUpperCase()) == -1) await save_품번('JW', 'BMU', _C_BMU_품번.value.toUpperCase());
      if (JW_CMU.indexOf(_C_CMU_1_품번.value.toUpperCase()) == -1) await save_품번('JW', 'CMU', _C_CMU_1_품번.value.toUpperCase());
      if (JW_CMU.indexOf(_C_CMU_2_품번.value.toUpperCase()) == -1) await save_품번('JW', 'CMU', _C_CMU_2_품번.value.toUpperCase());
      if (JW_CMU.indexOf(_C_CMU_3_품번.value.toUpperCase()) == -1) await save_품번('JW', 'CMU', _C_CMU_3_품번.value.toUpperCase());
      if (JW_CMU.indexOf(_C_CMU_4_품번.value.toUpperCase()) == -1) await save_품번('JW', 'CMU', _C_CMU_4_품번.value.toUpperCase());
      if (JW_CMU.indexOf(_C_CMU_5_품번.value.toUpperCase()) == -1) await save_품번('JW', 'CMU', _C_CMU_5_품번.value.toUpperCase());
      if (JW_CMU.indexOf(_C_CMU_6_품번.value.toUpperCase()) == -1) await save_품번('JW', 'CMU', _C_CMU_6_품번.value.toUpperCase());
      if (JW_CMU.indexOf(_C_CMU_7_품번.value.toUpperCase()) == -1) await save_품번('JW', 'CMU', _C_CMU_7_품번.value.toUpperCase());
      if (JW_CMU.indexOf(_C_CMU_8_품번.value.toUpperCase()) == -1) await save_품번('JW', 'CMU', _C_CMU_8_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_1_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_1_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_2_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_2_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_3_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_3_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_4_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_4_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_5_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_5_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_6_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_6_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_7_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_7_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_8_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_8_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_9_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_9_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_10_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_10_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_11_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_11_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_12_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_12_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_13_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_13_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_14_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_14_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_15_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_15_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_16_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_16_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_17_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_17_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_18_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_18_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_19_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_19_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_20_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_20_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_21_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_21_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_22_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_22_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_23_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_23_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_23_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_23_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_24_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_24_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_25_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_25_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_26_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_26_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_27_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_27_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_28_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_28_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_29_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_29_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_30_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_30_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_31_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_31_품번.value.toUpperCase());
      if (JW_MODULE.indexOf(_C_MODULE_32_품번.value.toUpperCase()) == -1) await save_품번('JW', 'MODULE', _C_MODULE_32_품번.value.toUpperCase());

      break;

    case 'CS':
    case 'CS_EV':
      if (CS_LWR_CASE.indexOf(_D_LWR_CASE_품번.value.toUpperCase()) == -1) await save_품번('CS', 'LWR_CASE', _D_LWR_CASE_품번.value.toUpperCase());
      if (CS_UPR_CASE.indexOf(_D_UPR_CASE_품번.value.toUpperCase()) == -1) await save_품번('CS', 'UPR_CASE', _D_UPR_CASE_품번.value.toUpperCase());
      if (CS_HV_CNTR.indexOf(_D_HV_CNTR_1_품번.value.toUpperCase()) == -1) await save_품번('CS', 'HV_CNTR', _D_HV_CNTR_1_품번.value.toUpperCase());
      if (CS_HT_CNTR.indexOf(_D_HV_CNTR_2_품번.value.toUpperCase()) == -1) await save_품번('CS', 'HT_CNTR', _D_HV_CNTR_2_품번.value.toUpperCase());
      if (CS_RELAY.indexOf(_D_RELAY_품번.value.toUpperCase()) == -1) await save_품번('CS', 'RELAY', _D_RELAY_품번.value.toUpperCase());
      if (CS_LV_W_H.indexOf(_D_LV_W_H_품번.value.toUpperCase()) == -1) await save_품번('CS', 'LV_W_H', _D_LV_W_H_품번.value.toUpperCase());
      if (CS_HV_W_H.indexOf(_D_HV_W_H_1_품번.value.toUpperCase()) == -1) await save_품번('CS', 'HV_W_H', _D_HV_W_H_1_품번.value.toUpperCase());
      if (CS_HV_W_H.indexOf(_D_HV_W_H_2_품번.value.toUpperCase()) == -1) await save_품번('CS', 'HV_W_H', _D_HV_W_H_2_품번.value.toUpperCase());
      if (CS_BMU.indexOf(_D_BMU_품번.value.toUpperCase()) == -1) await save_품번('CS', 'BMU', _D_BMU_품번.value.toUpperCase());
      if (CS_CMU.indexOf(_D_CMU_1_품번.value.toUpperCase()) == -1) await save_품번('CS', 'CMU', _D_CMU_1_품번.value.toUpperCase());
      if (CS_MODULE.indexOf(_D_MODULE_1_품번.value.toUpperCase()) == -1) await save_품번('CS', 'MODULE', _D_MODULE_1_품번.value.toUpperCase());
      if (CS_MODULE.indexOf(_D_MODULE_2_품번.value.toUpperCase()) == -1) await save_품번('CS', 'MODULE', _D_MODULE_2_품번.value.toUpperCase());

      if (CS_LWR_CASE.indexOf(_D2_LWR_CASE_품번.value.toUpperCase()) == -1) await save_품번('CS', 'LWR_CASE', _D2_LWR_CASE_품번.value.toUpperCase());
      if (CS_UPR_CASE.indexOf(_D2_UPR_CASE_품번.value.toUpperCase()) == -1) await save_품번('CS', 'UPR_CASE', _D2_UPR_CASE_품번.value.toUpperCase());
      if (CS_HV_CNTR.indexOf(_D2_HV_CNTR_1_품번.value.toUpperCase()) == -1) await save_품번('CS', 'HV_CNTR', _D2_HV_CNTR_1_품번.value.toUpperCase());
      if (CS_HT_CNTR.indexOf(_D2_HV_CNTR_2_품번.value.toUpperCase()) == -1) await save_품번('CS', 'HT_CNTR', _D2_HV_CNTR_2_품번.value.toUpperCase());
      if (CS_RELAY.indexOf(_D2_RELAY_품번.value.toUpperCase()) == -1) await save_품번('CS', 'RELAY', _D2_RELAY_품번.value.toUpperCase());
      if (CS_LV_W_H.indexOf(_D2_LV_W_H_품번.value.toUpperCase()) == -1) await save_품번('CS', 'LV_W_H', _D2_LV_W_H_품번.value.toUpperCase());
      if (CS_HV_W_H.indexOf(_D2_HV_W_H_1_품번.value.toUpperCase()) == -1) await save_품번('CS', 'HV_W_H', _D2_HV_W_H_1_품번.value.toUpperCase());
      if (CS_BMU.indexOf(_D2_BMU_품번.value.toUpperCase()) == -1) await save_품번('CS', 'BMU', _D2_BMU_품번.value.toUpperCase());
      if (CS_CMU.indexOf(_D2_CMU_1_품번.value.toUpperCase()) == -1) await save_품번('CS', 'CMU', _D2_CMU_품번.value.toUpperCase());
      if (CS_MODULE.indexOf(_D2_MODULE_1_품번.value.toUpperCase()) == -1) await save_품번('CS', 'MODULE', _D2_MODULE_1_품번.value.toUpperCase());

      break;

    case 'LK':
    case 'LK_EV':
      if (LK_LWR_CASE.indexOf(_A_LWR_CASE_품번.value.toUpperCase()) == -1) await save_품번('LK', 'LWR_CASE', _A_LWR_CASE_품번.value.toUpperCase());
      if (LK_UPR_CASE.indexOf(_A_UPR_CASE_품번.value.toUpperCase()) == -1) await save_품번('LK', 'UPR_CASE', _A_UPR_CASE_품번.value.toUpperCase());
      if (LK_S_PLUG.indexOf(_A_S_PLUG_품번.value.toUpperCase()) == -1) await save_품번('LK', 'S_PLUG', _A_S_PLUG_품번.value.toUpperCase());
      if (LK_SPA.indexOf(_A_SPA_품번.value.toUpperCase()) == -1) await save_품번('LK', 'SPA', _A_SPA_품번.value.toUpperCase());
      if (LK_HV_CNTR.indexOf(_A_HV_CNTR_품번.value.toUpperCase()) == -1) await save_품번('LK', 'HV_CNTR', _A_HV_CNTR_품번.value.toUpperCase());
      if (LK_HT_CNTR.indexOf(_A_HT_CNTR_품번.value.toUpperCase()) == -1) await save_품번('LK', 'HT_CNTR', _A_HT_CNTR_품번.value.toUpperCase());
      if (LK_PRA.indexOf(_A_PRA_품번.value.toUpperCase()) == -1) await save_품번('LK', 'PRA', _A_PRA_품번.value.toUpperCase());
      if (LK_LV_W_H.indexOf(_A_LV_W_H_품번.value.toUpperCase()) == -1) await save_품번('LK', 'LV_W_H', _A_LV_W_H_품번.value.toUpperCase());
      if (LK_HV_W_H.indexOf(_A_HV_W_H_1_품번.value.toUpperCase()) == -1) await save_품번('LK', 'HV_W_H', _A_HV_W_H_1_품번.value.toUpperCase());
      if (LK_HV_W_H.indexOf(_A_HV_W_H_2_품번.value.toUpperCase()) == -1) await save_품번('LK', 'HV_W_H', _A_HV_W_H_2_품번.value.toUpperCase());
      if (LK_HV_W_H.indexOf(_A_HV_W_H_3_품번.value.toUpperCase()) == -1) await save_품번('LK', 'HV_W_H', _A_HV_W_H_3_품번.value.toUpperCase());
      if (LK_HV_W_H.indexOf(_A_HV_W_H_4_품번.value.toUpperCase()) == -1) await save_품번('LK', 'HV_W_H', _A_HV_W_H_4_품번.value.toUpperCase());
      if (LK_HV_W_H.indexOf(_A_HV_W_H_5_품번.value.toUpperCase()) == -1) await save_품번('LK', 'HV_W_H', _A_HV_W_H_5_품번.value.toUpperCase());
      if (LK_BMU.indexOf(_A_BMU_품번.value.toUpperCase()) == -1) await save_품번('LK', 'BMU', _A_BMU_품번.value.toUpperCase());
      if (LK_CMU.indexOf(_A_CMU_1_품번.value.toUpperCase()) == -1) await save_품번('LK', 'CMU', _A_CMU_1_품번.value.toUpperCase());
      if (LK_CMU.indexOf(_A_CMU_2_품번.value.toUpperCase()) == -1) await save_품번('LK', 'CMU', _A_CMU_2_품번.value.toUpperCase());
      if (LK_CMU.indexOf(_A_CMU_3_품번.value.toUpperCase()) == -1) await save_품번('LK', 'CMU', _A_CMU_3_품번.value.toUpperCase());
      if (LK_CMU.indexOf(_A_CMU_4_품번.value.toUpperCase()) == -1) await save_품번('LK', 'CMU', _A_CMU_4_품번.value.toUpperCase());
      if (LK_CMU.indexOf(_A_CMU_5_품번.value.toUpperCase()) == -1) await save_품번('LK', 'CMU', _A_CMU_5_품번.value.toUpperCase());
      if (LK_MODULE.indexOf(_A_MODULE_1_품번.value.toUpperCase()) == -1) await save_품번('LK', 'MODULE', _A_MODULE_1_품번.value.toUpperCase());
      if (LK_MODULE.indexOf(_A_MODULE_2_품번.value.toUpperCase()) == -1) await save_품번('LK', 'MODULE', _A_MODULE_2_품번.value.toUpperCase());
      if (LK_MODULE.indexOf(_A_MODULE_3_품번.value.toUpperCase()) == -1) await save_품번('LK', 'MODULE', _A_MODULE_3_품번.value.toUpperCase());
      if (LK_MODULE.indexOf(_A_MODULE_4_품번.value.toUpperCase()) == -1) await save_품번('LK', 'MODULE', _A_MODULE_4_품번.value.toUpperCase());
      if (LK_MODULE.indexOf(_A_MODULE_5_품번.value.toUpperCase()) == -1) await save_품번('LK', 'MODULE', _A_MODULE_5_품번.value.toUpperCase());

      break;

    case 'LKFC':
    case 'LKFC_EV':
      if (LKFC_LWR_CASE.indexOf(_A_LWR_CASE_품번.value.toUpperCase()) == -1) await save_품번('LKFC', 'LWR_CASE', _A_LWR_CASE_품번.value.toUpperCase());
      if (LKFC_UPR_CASE.indexOf(_A_UPR_CASE_품번.value.toUpperCase()) == -1) await save_품번('LKFC', 'UPR_CASE', _A_UPR_CASE_품번.value.toUpperCase());
      if (LKFC_S_PLUG.indexOf(_A_S_PLUG_품번.value.toUpperCase()) == -1) await save_품번('LKFC', 'S_PLUG', _A_S_PLUG_품번.value.toUpperCase());
      if (LKFC_SPA.indexOf(_A_SPA_품번.value.toUpperCase()) == -1) await save_품번('LKFC', 'SPA', _A_SPA_품번.value.toUpperCase());
      if (LKFC_HV_CNTR.indexOf(_A_HV_CNTR_품번.value.toUpperCase()) == -1) await save_품번('LKFC', 'HV_CNTR', _A_HV_CNTR_품번.value.toUpperCase());
      if (LKFC_HT_CNTR.indexOf(_A_HT_CNTR_품번.value.toUpperCase()) == -1) await save_품번('LKFC', 'HT_CNTR', _A_HT_CNTR_품번.value.toUpperCase());
      if (LKFC_PRA.indexOf(_A_PRA_품번.value.toUpperCase()) == -1) await save_품번('LKFC', 'PRA', _A_PRA_품번.value.toUpperCase());
      if (LKFC_LV_W_H.indexOf(_A_LV_W_H_품번.value.toUpperCase()) == -1) await save_품번('LKFC', 'LV_W_H', _A_LV_W_H_품번.value.toUpperCase());
      if (LKFC_HV_W_H.indexOf(_A_HV_W_H_1_품번.value.toUpperCase()) == -1) await save_품번('LKFC', 'HV_W_H', _A_HV_W_H_1_품번.value.toUpperCase());
      if (LKFC_HV_W_H.indexOf(_A_HV_W_H_2_품번.value.toUpperCase()) == -1) await save_품번('LKFC', 'HV_W_H', _A_HV_W_H_2_품번.value.toUpperCase());
      if (LKFC_HV_W_H.indexOf(_A_HV_W_H_3_품번.value.toUpperCase()) == -1) await save_품번('LKFC', 'HV_W_H', _A_HV_W_H_3_품번.value.toUpperCase());
      if (LKFC_HV_W_H.indexOf(_A_HV_W_H_4_품번.value.toUpperCase()) == -1) await save_품번('LKFC', 'HV_W_H', _A_HV_W_H_4_품번.value.toUpperCase());
      if (LKFC_HV_W_H.indexOf(_A_HV_W_H_5_품번.value.toUpperCase()) == -1) await save_품번('LKFC', 'HV_W_H', _A_HV_W_H_5_품번.value.toUpperCase());
      if (LKFC_BMU.indexOf(_A_BMU_품번.value.toUpperCase()) == -1) await save_품번('LKFC', 'BMU', _A_BMU_품번.value.toUpperCase());
      if (LKFC_CMU.indexOf(_A_CMU_1_품번.value.toUpperCase()) == -1) await save_품번('LKFC', 'CMU', _A_CMU_1_품번.value.toUpperCase());
      if (LKFC_CMU.indexOf(_A_CMU_2_품번.value.toUpperCase()) == -1) await save_품번('LKFC', 'CMU', _A_CMU_2_품번.value.toUpperCase());
      if (LKFC_CMU.indexOf(_A_CMU_3_품번.value.toUpperCase()) == -1) await save_품번('LKFC', 'CMU', _A_CMU_3_품번.value.toUpperCase());
      if (LKFC_CMU.indexOf(_A_CMU_4_품번.value.toUpperCase()) == -1) await save_품번('LKFC', 'CMU', _A_CMU_4_품번.value.toUpperCase());
      if (LKFC_CMU.indexOf(_A_CMU_5_품번.value.toUpperCase()) == -1) await save_품번('LKFC', 'CMU', _A_CMU_5_품번.value.toUpperCase());

      break;

    case 'LM':
    case 'LM_EV':
      if (LM_LWR_CASE.indexOf(_C_LWR_CASE_품번.value.toUpperCase()) == -1) await save_품번('LM', 'LWR_CASE', _C_LWR_CASE_품번.value.toUpperCase());
      if (LM_UPR_CASE.indexOf(_C_UPR_CASE_품번.value.toUpperCase()) == -1) await save_품번('LM', 'UPR_CASE', _C_UPR_CASE_품번.value.toUpperCase());
      if (LM_HV_CNTR.indexOf(_C_HV_CNTR_1_품번.value.toUpperCase()) == -1) await save_품번('LM', 'HV_CNTR', _C_HV_CNTR_1_품번.value.toUpperCase());
      if (LM_HV_CNTR.indexOf(_C_HV_CNTR_2_품번.value.toUpperCase()) == -1) await save_품번('LM', 'HV_CNTR', _C_HV_CNTR_2_품번.value.toUpperCase());
      if (LM_HT_CNTR.indexOf(_C_HT_CNTR_품번.value.toUpperCase()) == -1) await save_품번('LM', 'HT_CNTR', _C_HT_CNTR_품번.value.toUpperCase());
      if (LM_PRA.indexOf(_C_PRA_품번.value.toUpperCase()) == -1) await save_품번('LM', 'PRA', _C_PRA_품번.value.toUpperCase());
      if (LM_FUSE.indexOf(_C_FUSE_품번.value.toUpperCase()) == -1) await save_품번('LM', 'FUSE', _C_FUSE_품번.value.toUpperCase());
      if (LM_LV_W_H.indexOf(_C_LV_W_H_품번.value.toUpperCase()) == -1) await save_품번('LM', 'LV_W_H', _C_LV_W_H_품번.value.toUpperCase());
      if (LM_HV_W_H.indexOf(_C_HV_W_H_1_품번.value.toUpperCase()) == -1) await save_품번('LM', 'HV_W_H', _C_HV_W_H_1_품번.value.toUpperCase());
      if (LM_HV_W_H.indexOf(_C_HV_W_H_2_품번.value.toUpperCase()) == -1) await save_품번('LM', 'HV_W_H', _C_HV_W_H_2_품번.value.toUpperCase());
      if (LM_HV_W_H.indexOf(_C_HV_W_H_3_품번.value.toUpperCase()) == -1) await save_품번('LM', 'HV_W_H', _C_HV_W_H_3_품번.value.toUpperCase());
      if (LM_HV_W_H.indexOf(_C_HV_W_H_4_품번.value.toUpperCase()) == -1) await save_품번('LM', 'HV_W_H', _C_HV_W_H_4_품번.value.toUpperCase());
      if (LM_HV_W_H.indexOf(_C_HV_W_H_5_품번.value.toUpperCase()) == -1) await save_품번('LM', 'HV_W_H', _C_HV_W_H_5_품번.value.toUpperCase());
      if (LM_HV_W_H.indexOf(_C_HV_W_H_6_품번.value.toUpperCase()) == -1) await save_품번('LM', 'HV_W_H', _C_HV_W_H_6_품번.value.toUpperCase());
      if (LM_HV_W_H.indexOf(_C_HV_W_H_7_품번.value.toUpperCase()) == -1) await save_품번('LM', 'HV_W_H', _C_HV_W_H_7_품번.value.toUpperCase());
      if (LM_HV_W_H.indexOf(_C_HV_W_H_8_품번.value.toUpperCase()) == -1) await save_품번('LM', 'HV_W_H', _C_HV_W_H_8_품번.value.toUpperCase());
      if (LM_BMU.indexOf(_C_BMU_품번.value.toUpperCase()) == -1) await save_품번('LM', 'BMU', _C_BMU_품번.value.toUpperCase());
      if (LM_CMU.indexOf(_C_CMU_1_품번.value.toUpperCase()) == -1) await save_품번('LM', 'CMU', _C_CMU_1_품번.value.toUpperCase());
      if (LM_CMU.indexOf(_C_CMU_2_품번.value.toUpperCase()) == -1) await save_품번('LM', 'CMU', _C_CMU_2_품번.value.toUpperCase());
      if (LM_CMU.indexOf(_C_CMU_3_품번.value.toUpperCase()) == -1) await save_품번('LM', 'CMU', _C_CMU_3_품번.value.toUpperCase());
      if (LM_CMU.indexOf(_C_CMU_4_품번.value.toUpperCase()) == -1) await save_품번('LM', 'CMU', _C_CMU_4_품번.value.toUpperCase());
      if (LM_CMU.indexOf(_C_CMU_5_품번.value.toUpperCase()) == -1) await save_품번('LM', 'CMU', _C_CMU_5_품번.value.toUpperCase());
      if (LM_CMU.indexOf(_C_CMU_6_품번.value.toUpperCase()) == -1) await save_품번('LM', 'CMU', _C_CMU_6_품번.value.toUpperCase());
      if (LM_CMU.indexOf(_C_CMU_7_품번.value.toUpperCase()) == -1) await save_품번('LM', 'CMU', _C_CMU_7_품번.value.toUpperCase());
      if (LM_CMU.indexOf(_C_CMU_8_품번.value.toUpperCase()) == -1) await save_품번('LM', 'CMU', _C_CMU_8_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_1_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_1_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_2_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_2_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_3_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_3_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_4_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_4_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_5_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_5_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_6_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_6_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_7_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_7_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_8_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_8_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_9_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_9_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_10_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_10_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_11_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_11_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_12_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_12_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_13_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_13_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_14_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_14_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_15_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_15_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_16_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_16_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_17_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_17_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_18_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_18_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_19_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_19_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_20_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_20_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_21_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_21_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_22_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_22_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_23_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_23_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_23_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_23_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_24_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_24_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_25_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_25_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_26_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_26_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_27_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_27_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_28_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_28_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_29_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_29_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_30_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_30_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_31_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_31_품번.value.toUpperCase());
      if (LM_MODULE.indexOf(_C_MODULE_32_품번.value.toUpperCase()) == -1) await save_품번('LM', 'MODULE', _C_MODULE_32_품번.value.toUpperCase());

      break;

    default:
      console.log('품번 data의 차종을 확인하세요');

      break;
  }
}

var new_type = 'none';
var new_reply = false;
async function save_품번(_차종, _종류, _품번) {
  if (new_type == false) return;
  if (_품번 == '') return;
  console.log('새로운 품번 발생!');

  if (new_type != true) new_type = confirm('새로운 품번을 등록하시겠습니까?');
  if (new_type == false) return;

  품번_list();

  _품번 = _품번.toUpperCase();

  find_품번(품번, { 번호: { $exists: true } });
  await delay();

  var no = 품번_v.length + 1;
  console.log('no:', no);

  var doc = JSON.parse(JSON.stringify(품번_doc));
  doc.번호 = no.toString();
  doc.차종 = _차종;
  if (_차종 == 'DE_SK3') doc.차종 = 'DE/SK3';
  var str = 'doc.' + _종류 + " = '" + _품번 + "';";
  eval(str);

  update_품번(품번, doc);
  await delay();

  var str = _차종 + '_' + _종류 + '.push(' + "'" + _품번 + "');";
  eval(str);

  if (new_reply == false) {
    if (update_count > 0) {
      new_reply = true;
      alert('품번정보가 업데이트 되었습니다');
    }

    if (insert_count > 0) {
      new_reply = true;
      alert('품번정보가 저장 되었습니다');
    }
  }
}

function check_complete() {
  if (_A_UPR_CASE_QR.value != '' && _A_UPR_CASE_품번.value != '') {
    _A_UPR_CASE.style.backgroundColor = 'salmon';
    _A_UPR_CASE.style.color = 'white';
  }

  if (_A_LWR_CASE_QR.value != '' && _A_LWR_CASE_품번.value != '') {
    _A_LWR_CASE.style.backgroundColor = 'salmon';
    _A_LWR_CASE.style.color = 'white';
  }

  if (_A_S_PLUG_QR.value != '' && _A_S_PLUG_품번.value != '') {
    _A_S_PLUG.style.backgroundColor = 'salmon';
    _A_S_PLUG.style.color = 'white';
  }

  if (_A_SPA_QR.value != '' && _A_SPA_품번.value != '') {
    _A_SPA.style.backgroundColor = 'salmon';
    _A_SPA.style.color = 'white';
  }

  if (_A_HT_CNTR_QR.value != '' && _A_HT_CNTR_품번.value != '') {
    _A_HT_CNTR.style.backgroundColor = 'salmon';
    _A_HT_CNTR.style.color = 'white';
  }

  if (_A_HV_CNTR_QR.value != '' && _A_HV_CNTR_품번.value != '') {
    _A_HV_CNTR.style.backgroundColor = 'salmon';
    _A_HV_CNTR.style.color = 'white';
  }

  if (_A_PRA_QR.value != '' && _A_PRA_품번.value != '') {
    _A_PRA.style.backgroundColor = 'salmon';
    _A_PRA.style.color = 'white';
  }

  if (_A_LV_W_H_QR.value != '' && _A_LV_W_H_품번.value != '') {
    _A_LV_W_H.style.backgroundColor = 'salmon';
    _A_LV_W_H.style.color = 'white';
  }

  if (_A_HV_W_H_1_QR.value != '' && _A_HV_W_H_1_품번.value != '') {
    _A_HV_W_H_1.style.backgroundColor = 'salmon';
    _A_HV_W_H_1.style.color = 'white';
  }

  if (_A_HV_W_H_2_QR.value != '' && _A_HV_W_H_2_품번.value != '') {
    _A_HV_W_H_2.style.backgroundColor = 'salmon';
    _A_HV_W_H_2.style.color = 'white';
  }

  if (_A_HV_W_H_3_QR.value != '' && _A_HV_W_H_3_품번.value != '') {
    _A_HV_W_H_3.style.backgroundColor = 'salmon';
    _A_HV_W_H_3.style.color = 'white';
  }

  if (_A_HV_W_H_4_QR.value != '' && _A_HV_W_H_4_품번.value != '') {
    _A_HV_W_H_4.style.backgroundColor = 'salmon';
    _A_HV_W_H_4.style.color = 'white';
  }

  if (_A_HV_W_H_5_QR.value != '' && _A_HV_W_H_5_품번.value != '') {
    _A_HV_W_H_5.style.backgroundColor = 'salmon';
    _A_HV_W_H_5.style.color = 'white';
  }

  if (_A_BMU_QR.value != '' && _A_BMU_품번.value != '') {
    _A_BMU.style.backgroundColor = 'salmon';
    _A_BMU.style.color = 'white';
  }

  if (_A_CMU_1_QR.value != '' && _A_CMU_1_품번.value != '') {
    _A_CMU_1.style.backgroundColor = 'salmon';
    _A_CMU_1.style.color = 'white';
  }

  if (_A_CMU_2_QR.value != '' && _A_CMU_2_품번.value != '') {
    _A_CMU_2.style.backgroundColor = 'salmon';
    _A_CMU_2.style.color = 'white';
  }

  if (_A_CMU_3_QR.value != '' && _A_CMU_3_품번.value != '') {
    _A_CMU_3.style.backgroundColor = 'salmon';
    _A_CMU_3.style.color = 'white';
  }

  if (_A_CMU_4_QR.value != '' && _A_CMU_4_품번.value != '') {
    _A_CMU_4.style.backgroundColor = 'salmon';
    _A_CMU_4.style.color = 'white';
  }

  if (_A_CMU_5_QR.value != '' && _A_CMU_5_품번.value != '') {
    _A_CMU_5.style.backgroundColor = 'salmon';
    _A_CMU_5.style.color = 'white';
  }

  if (_A_MODULE_1_QR.value != '' && _A_MODULE_1_품번.value != '') {
    _A_MODULE_1.style.backgroundColor = 'salmon';
    _A_MODULE_1.style.color = 'white';
  }

  if (_A_MODULE_2_QR.value != '' && _A_MODULE_2_품번.value != '') {
    _A_MODULE_2.style.backgroundColor = 'salmon';
    _A_MODULE_2.style.color = 'white';
  }

  if (_A_MODULE_3_QR.value != '' && _A_MODULE_3_품번.value != '') {
    _A_MODULE_3.style.backgroundColor = 'salmon';
    _A_MODULE_3.style.color = 'white';
  }

  if (_A_MODULE_4_QR.value != '' && _A_MODULE_4_품번.value != '') {
    _A_MODULE_4.style.backgroundColor = 'salmon';
    _A_MODULE_4.style.color = 'white';
  }

  if (_A_MODULE_5_QR.value != '' && _A_MODULE_5_품번.value != '') {
    _A_MODULE_5.style.backgroundColor = 'salmon';
    _A_MODULE_5.style.color = 'white';
  }

  if (_B_UPR_CASE_QR.value != '' && _B_UPR_CASE_품번.value != '') {
    _B_UPR_CASE.style.backgroundColor = 'salmon';
    _B_UPR_CASE.style.color = 'white';
  }

  if (_B_LWR_CASE_QR.value != '' && _B_LWR_CASE_품번.value != '') {
    _B_LWR_CASE.style.backgroundColor = 'salmon';
    _B_LWR_CASE.style.color = 'white';
  }

  if (_B_HV_CNTR_QR.value != '' && _B_HV_CNTR_품번.value != '') {
    _B_HV_CNTR.style.backgroundColor = 'salmon';
    _B_HV_CNTR.style.color = 'white';
  }

  if (_B_HT_CNTR_QR.value != '' && _B_HT_CNTR_품번.value != '') {
    _B_HT_CNTR.style.backgroundColor = 'salmon';
    _B_HT_CNTR.style.color = 'white';
  }

  if (_B_PRA_QR.value != '' && _B_PRA_품번.value != '') {
    _B_PRA.style.backgroundColor = 'salmon';
    _B_PRA.style.color = 'white';
  }

  if (_B_HV_W_H_1_QR.value != '' && _B_HV_W_H_1_품번.value != '') {
    _B_HV_W_H_1.style.backgroundColor = 'salmon';
    _B_HV_W_H_1.style.color = 'white';
  }

  if (_B_HV_W_H_2_QR.value != '' && _B_HV_W_H_2_품번.value != '') {
    _B_HV_W_H_2.style.backgroundColor = 'salmon';
    _B_HV_W_H_2.style.color = 'white';
  }

  if (_B_LV_W_H_QR.value != '' && _B_LV_W_H_품번.value != '') {
    _B_LV_W_H.style.backgroundColor = 'salmon';
    _B_LV_W_H.style.color = 'white';
  }

  if (_B_BMU_QR.value != '' && _B_BMU_품번.value != '') {
    _B_BMU.style.backgroundColor = 'salmon';
    _B_BMU.style.color = 'white';
  }

  if (_B_CMU_1_QR.value != '' && _B_CMU_1_품번.value != '') {
    _B_CMU_1.style.backgroundColor = 'salmon';
    _B_CMU_1.style.color = 'white';
  }

  if (_B_CMU_2_QR.value != '' && _B_CMU_2_품번.value != '') {
    _B_CMU_2.style.backgroundColor = 'salmon';
    _B_CMU_2.style.color = 'white';
  }

  if (_B_CMU_3_QR.value != '' && _B_CMU_3_품번.value != '') {
    _B_CMU_3.style.backgroundColor = 'salmon';
    _B_CMU_3.style.color = 'white';
  }

  if (_B_CMU_4_QR.value != '' && _B_CMU_4_품번.value != '') {
    _B_CMU_4.style.backgroundColor = 'salmon';
    _B_CMU_4.style.color = 'white';
  }

  if (_B_CMU_5_QR.value != '' && _B_CMU_5_품번.value != '') {
    _B_CMU_5.style.backgroundColor = 'salmon';
    _B_CMU_5.style.color = 'white';
  }

  if (_B_MODULE_1_QR.value != '' && _B_MODULE_1_품번.value != '') {
    _B_MODULE_1.style.backgroundColor = 'salmon';
    _B_MODULE_1.style.color = 'white';
  }

  if (_B_MODULE_2_QR.value != '' && _B_MODULE_2_품번.value != '') {
    _B_MODULE_2.style.backgroundColor = 'salmon';
    _B_MODULE_2.style.color = 'white';
  }

  if (_B_MODULE_3_QR.value != '' && _B_MODULE_3_품번.value != '') {
    _B_MODULE_3.style.backgroundColor = 'salmon';
    _B_MODULE_3.style.color = 'white';
  }

  if (_B_MODULE_4_QR.value != '' && _B_MODULE_4_품번.value != '') {
    _B_MODULE_4.style.backgroundColor = 'salmon';
    _B_MODULE_4.style.color = 'white';
  }

  if (_B_MODULE_5_QR.value != '' && _B_MODULE_5_품번.value != '') {
    _B_MODULE_5.style.backgroundColor = 'salmon';
    _B_MODULE_5.style.color = 'white';
  }

  if (_B_MODULE_6_QR.value != '' && _B_MODULE_6_품번.value != '') {
    _B_MODULE_6.style.backgroundColor = 'salmon';
    _B_MODULE_6.style.color = 'white';
  }

  if (_B_MODULE_7_QR.value != '' && _B_MODULE_7_품번.value != '') {
    _B_MODULE_7.style.backgroundColor = 'salmon';
    _B_MODULE_7.style.color = 'white';
  }

  if (_B_MODULE_8_QR.value != '' && _B_MODULE_8_품번.value != '') {
    _B_MODULE_8.style.backgroundColor = 'salmon';
    _B_MODULE_8.style.color = 'white';
  }

  if (_B_MODULE_9_QR.value != '' && _B_MODULE_9_품번.value != '') {
    _B_MODULE_9.style.backgroundColor = 'salmon';
    _B_MODULE_9.style.color = 'white';
  }

  if (_B_MODULE_10_QR.value != '' && _B_MODULE_10_품번.value != '') {
    _B_MODULE_10.style.backgroundColor = 'salmon';
    _B_MODULE_10.style.color = 'white';
  }

  if (_C_UPR_CASE_QR.value != '' && _C_UPR_CASE_품번.value != '') {
    _C_UPR_CASE.style.backgroundColor = 'salmon';
    _C_UPR_CASE.style.color = 'white';
  }

  if (_C_LWR_CASE_QR.value != '' && _C_LWR_CASE_품번.value != '') {
    _C_LWR_CASE.style.backgroundColor = 'salmon';
    _C_LWR_CASE.style.color = 'white';
  }

  if (_C_HV_CNTR_1_QR.value != '' && _C_HV_CNTR_1_품번.value != '') {
    _C_HV_CNTR_1.style.backgroundColor = 'salmon';
    _C_HV_CNTR_1.style.color = 'white';
  }

  if (_C_HV_CNTR_2_QR.value != '' && _C_HV_CNTR_2_품번.value != '') {
    _C_HV_CNTR_2.style.backgroundColor = 'salmon';
    _C_HV_CNTR_2.style.color = 'white';
  }

  if (_C_HT_CNTR_QR.value != '' && _C_HT_CNTR_품번.value != '') {
    _C_HT_CNTR.style.backgroundColor = 'salmon';
    _C_HT_CNTR.style.color = 'white';
  }

  if (_C_PRA_QR.value != '' && _C_PRA_품번.value != '') {
    _C_PRA.style.backgroundColor = 'salmon';
    _C_PRA.style.color = 'white';
  }

  if (_C_FUSE_QR.value != '' && _C_FUSE_품번.value != '') {
    _C_FUSE.style.backgroundColor = 'salmon';
    _C_FUSE.style.color = 'white';
  }

  if (_C_LV_W_H_QR.value != '' && _C_LV_W_H_품번.value != '') {
    _C_LV_W_H.style.backgroundColor = 'salmon';
    _C_LV_W_H.style.color = 'white';
  }

  if (_C_HV_W_H_1_QR.value != '' && _C_HV_W_H_1_품번.value != '') {
    _C_HV_W_H_1.style.backgroundColor = 'salmon';
    _C_HV_W_H_1.style.color = 'white';
  }

  if (_C_HV_W_H_2_QR.value != '' && _C_HV_W_H_2_품번.value != '') {
    _C_HV_W_H_2.style.backgroundColor = 'salmon';
    _C_HV_W_H_2.style.color = 'white';
  }

  if (_C_HV_W_H_3_QR.value != '' && _C_HV_W_H_3_품번.value != '') {
    _C_HV_W_H_3.style.backgroundColor = 'salmon';
    _C_HV_W_H_3.style.color = 'white';
  }

  if (_C_HV_W_H_4_QR.value != '' && _C_HV_W_H_4_품번.value != '') {
    _C_HV_W_H_4.style.backgroundColor = 'salmon';
    _C_HV_W_H_4.style.color = 'white';
  }

  if (_C_HV_W_H_5_QR.value != '' && _C_HV_W_H_5_품번.value != '') {
    _C_HV_W_H_5.style.backgroundColor = 'salmon';
    _C_HV_W_H_5.style.color = 'white';
  }

  if (_C_HV_W_H_6_QR.value != '' && _C_HV_W_H_6_품번.value != '') {
    _C_HV_W_H_6.style.backgroundColor = 'salmon';
    _C_HV_W_H_6.style.color = 'white';
  }

  if (_C_HV_W_H_7_QR.value != '' && _C_HV_W_H_7_품번.value != '') {
    _C_HV_W_H_7.style.backgroundColor = 'salmon';
    _C_HV_W_H_7.style.color = 'white';
  }

  if (_C_HV_W_H_8_QR.value != '' && _C_HV_W_H_8_품번.value != '') {
    _C_HV_W_H_8.style.backgroundColor = 'salmon';
    _C_HV_W_H_8.style.color = 'white';
  }

  if (_C_BMU_QR.value != '' && _C_BMU_품번.value != '') {
    _C_BMU.style.backgroundColor = 'salmon';
    _C_BMU.style.color = 'white';
  }

  if (_C_CMU_1_QR.value != '' && _C_CMU_1_품번.value != '') {
    _C_CMU_1.style.backgroundColor = 'salmon';
    _C_CMU_1.style.color = 'white';
  }

  if (_C_CMU_2_QR.value != '' && _C_CMU_2_품번.value != '') {
    _C_CMU_2.style.backgroundColor = 'salmon';
    _C_CMU_2.style.color = 'white';
  }

  if (_C_CMU_3_QR.value != '' && _C_CMU_3_품번.value != '') {
    _C_CMU_3.style.backgroundColor = 'salmon';
    _C_CMU_3.style.color = 'white';
  }

  if (_C_CMU_4_QR.value != '' && _C_CMU_4_품번.value != '') {
    _C_CMU_4.style.backgroundColor = 'salmon';
    _C_CMU_4.style.color = 'white';
  }

  if (_C_CMU_5_QR.value != '' && _C_CMU_5_품번.value != '') {
    _C_CMU_5.style.backgroundColor = 'salmon';
    _C_CMU_5.style.color = 'white';
  }

  if (_C_CMU_6_QR.value != '' && _C_CMU_6_품번.value != '') {
    _C_CMU_6.style.backgroundColor = 'salmon';
    _C_CMU_6.style.color = 'white';
  }

  if (_C_CMU_7_QR.value != '' && _C_CMU_7_품번.value != '') {
    _C_CMU_7.style.backgroundColor = 'salmon';
    _C_CMU_7.style.color = 'white';
  }

  if (_C_CMU_8_QR.value != '' && _C_CMU_8_품번.value != '') {
    _C_CMU_8.style.backgroundColor = 'salmon';
    _C_CMU_8.style.color = 'white';
  }

  if (_C_MODULE_1_QR.value != '' && _C_MODULE_1_품번.value != '') {
    _C_MODULE_1.style.backgroundColor = 'salmon';
    _C_MODULE_1.style.color = 'white';
  }

  if (_C_MODULE_2_QR.value != '' && _C_MODULE_2_품번.value != '') {
    _C_MODULE_2.style.backgroundColor = 'salmon';
    _C_MODULE_2.style.color = 'white';
  }

  if (_C_MODULE_3_QR.value != '' && _C_MODULE_3_품번.value != '') {
    _C_MODULE_3.style.backgroundColor = 'salmon';
    _C_MODULE_3.style.color = 'white';
  }

  if (_C_MODULE_4_QR.value != '' && _C_MODULE_4_품번.value != '') {
    _C_MODULE_4.style.backgroundColor = 'salmon';
    _C_MODULE_4.style.color = 'white';
  }

  if (_C_MODULE_5_QR.value != '' && _C_MODULE_5_품번.value != '') {
    _C_MODULE_5.style.backgroundColor = 'salmon';
    _C_MODULE_5.style.color = 'white';
  }

  if (_C_MODULE_6_QR.value != '' && _C_MODULE_6_품번.value != '') {
    _C_MODULE_6.style.backgroundColor = 'salmon';
    _C_MODULE_6.style.color = 'white';
  }

  if (_C_MODULE_7_QR.value != '' && _C_MODULE_7_품번.value != '') {
    _C_MODULE_7.style.backgroundColor = 'salmon';
    _C_MODULE_7.style.color = 'white';
  }

  if (_C_MODULE_8_QR.value != '' && _C_MODULE_8_품번.value != '') {
    _C_MODULE_8.style.backgroundColor = 'salmon';
    _C_MODULE_8.style.color = 'white';
  }

  if (_C_MODULE_9_QR.value != '' && _C_MODULE_9_품번.value != '') {
    _C_MODULE_9.style.backgroundColor = 'salmon';
    _C_MODULE_9.style.color = 'white';
  }

  if (_C_MODULE_10_QR.value != '' && _C_MODULE_10_품번.value != '') {
    _C_MODULE_10.style.backgroundColor = 'salmon';
    _C_MODULE_10.style.color = 'white';
  }

  if (_C_MODULE_11_QR.value != '' && _C_MODULE_11_품번.value != '') {
    _C_MODULE_11.style.backgroundColor = 'salmon';
    _C_MODULE_11.style.color = 'white';
  }

  if (_C_MODULE_12_QR.value != '' && _C_MODULE_12_품번.value != '') {
    _C_MODULE_12.style.backgroundColor = 'salmon';
    _C_MODULE_12.style.color = 'white';
  }

  if (_C_MODULE_13_QR.value != '' && _C_MODULE_13_품번.value != '') {
    _C_MODULE_13.style.backgroundColor = 'salmon';
    _C_MODULE_13.style.color = 'white';
  }

  if (_C_MODULE_14_QR.value != '' && _C_MODULE_14_품번.value != '') {
    _C_MODULE_14.style.backgroundColor = 'salmon';
    _C_MODULE_14.style.color = 'white';
  }

  if (_C_MODULE_15_QR.value != '' && _C_MODULE_15_품번.value != '') {
    _C_MODULE_15.style.backgroundColor = 'salmon';
    _C_MODULE_15.style.color = 'white';
  }

  if (_C_MODULE_16_QR.value != '' && _C_MODULE_16_품번.value != '') {
    _C_MODULE_16.style.backgroundColor = 'salmon';
    _C_MODULE_16.style.color = 'white';
  }

  if (_C_MODULE_17_QR.value != '' && _C_MODULE_17_품번.value != '') {
    _C_MODULE_17.style.backgroundColor = 'salmon';
    _C_MODULE_17.style.color = 'white';
  }

  if (_C_MODULE_18_QR.value != '' && _C_MODULE_18_품번.value != '') {
    _C_MODULE_18.style.backgroundColor = 'salmon';
    _C_MODULE_18.style.color = 'white';
  }

  if (_C_MODULE_19_QR.value != '' && _C_MODULE_19_품번.value != '') {
    _C_MODULE_19.style.backgroundColor = 'salmon';
    _C_MODULE_19.style.color = 'white';
  }

  if (_C_MODULE_20_QR.value != '' && _C_MODULE_20_품번.value != '') {
    _C_MODULE_20.style.backgroundColor = 'salmon';
    _C_MODULE_20.style.color = 'white';
  }

  if (_C_MODULE_21_QR.value != '' && _C_MODULE_21_품번.value != '') {
    _C_MODULE_21.style.backgroundColor = 'salmon';
    _C_MODULE_21.style.color = 'white';
  }

  if (_C_MODULE_22_QR.value != '' && _C_MODULE_22_품번.value != '') {
    _C_MODULE_22.style.backgroundColor = 'salmon';
    _C_MODULE_22.style.color = 'white';
  }

  if (_C_MODULE_23_QR.value != '' && _C_MODULE_23_품번.value != '') {
    _C_MODULE_23.style.backgroundColor = 'salmon';
    _C_MODULE_23.style.color = 'white';
  }

  if (_C_MODULE_24_QR.value != '' && _C_MODULE_24_품번.value != '') {
    _C_MODULE_24.style.backgroundColor = 'salmon';
    _C_MODULE_24.style.color = 'white';
  }

  if (_C_MODULE_25_QR.value != '' && _C_MODULE_25_품번.value != '') {
    _C_MODULE_25.style.backgroundColor = 'salmon';
    _C_MODULE_25.style.color = 'white';
  }

  if (_C_MODULE_26_QR.value != '' && _C_MODULE_26_품번.value != '') {
    _C_MODULE_26.style.backgroundColor = 'salmon';
    _C_MODULE_26.style.color = 'white';
  }

  if (_C_MODULE_27_QR.value != '' && _C_MODULE_27_품번.value != '') {
    _C_MODULE_27.style.backgroundColor = 'salmon';
    _C_MODULE_27.style.color = 'white';
  }

  if (_C_MODULE_28_QR.value != '' && _C_MODULE_28_품번.value != '') {
    _C_MODULE_28.style.backgroundColor = 'salmon';
    _C_MODULE_28.style.color = 'white';
  }

  if (_C_MODULE_29_QR.value != '' && _C_MODULE_29_품번.value != '') {
    _C_MODULE_29.style.backgroundColor = 'salmon';
    _C_MODULE_29.style.color = 'white';
  }

  if (_C_MODULE_30_QR.value != '' && _C_MODULE_30_품번.value != '') {
    _C_MODULE_30.style.backgroundColor = 'salmon';
    _C_MODULE_30.style.color = 'white';
  }

  if (_C_MODULE_31_QR.value != '' && _C_MODULE_31_품번.value != '') {
    _C_MODULE_31.style.backgroundColor = 'salmon';
    _C_MODULE_31.style.color = 'white';
  }

  if (_C_MODULE_32_QR.value != '' && _C_MODULE_32_품번.value != '') {
    _C_MODULE_32.style.backgroundColor = 'salmon';
    _C_MODULE_32.style.color = 'white';
  }

  if (_D_UPR_CASE_QR.value != '' && _D_UPR_CASE_품번.value != '') {
    _D_UPR_CASE.style.backgroundColor = 'salmon';
    _D_UPR_CASE.style.color = 'white';
  }

  if (_D_LWR_CASE_QR.value != '' && _D_LWR_CASE_품번.value != '') {
    _D_LWR_CASE.style.backgroundColor = 'salmon';
    _D_LWR_CASE.style.color = 'white';
  }

  if (_D_HV_CNTR_1_QR.value != '' && _D_HV_CNTR_1_품번.value != '') {
    _D_HV_CNTR_1.style.backgroundColor = 'salmon';
    _D_HV_CNTR_1.style.color = 'white';
  }

  if (_D_HV_CNTR_2_QR.value != '' && _D_HV_CNTR_2_품번.value != '') {
    _D_HV_CNTR_2.style.backgroundColor = 'salmon';
    _D_HV_CNTR_2.style.color = 'white';
  }

  if (_D_RELAY_QR.value != '' && _D_RELAY_품번.value != '') {
    _D_RELAY.style.backgroundColor = 'salmon';
    _D_RELAY.style.color = 'white';
  }

  if (_D_LV_W_H_QR.value != '' && _D_LV_W_H_품번.value != '') {
    _D_LV_W_H.style.backgroundColor = 'salmon';
    _D_LV_W_H.style.color = 'white';
  }

  if (_D_HV_W_H_1_QR.value != '' && _D_HV_W_H_1_품번.value != '') {
    _D_HV_W_H_1.style.backgroundColor = 'salmon';
    _D_HV_W_H_1.style.color = 'white';
  }

  if (_D_HV_W_H_2_QR.value != '' && _D_HV_W_H_2_품번.value != '') {
    _D_HV_W_H_2.style.backgroundColor = 'salmon';
    _D_HV_W_H_2.style.color = 'white';
  }

  if (_D_BMU_QR.value != '' && _D_BMU_품번.value != '') {
    _D_BMU.style.backgroundColor = 'salmon';
    _D_BMU.style.color = 'white';
  }

  if (_D_CMU_1_QR.value != '' && _D_CMU_1_품번.value != '') {
    _D_CMU_1.style.backgroundColor = 'salmon';
    _D_CMU_1.style.color = 'white';
  }

  if (_D_MODULE_1_QR.value != '' && _D_MODULE_1_품번.value != '') {
    _D_MODULE_1.style.backgroundColor = 'salmon';
    _D_MODULE_1.style.color = 'white';
  }

  if (_D_MODULE_2_QR.value != '' && _D_MODULE_2_품번.value != '') {
    _D_MODULE_2.style.backgroundColor = 'salmon';
    _D_MODULE_2.style.color = 'white';
  }

  if (_D2_HV_W_H_1_QR.value != '' && _D2_HV_W_H_1_품번.value != '') {
    _D2_HV_W_H_1.style.backgroundColor = 'salmon';
    _D2_HV_W_H_1.style.color = 'white';
  }

  if (_D2_CMU_1_QR.value != '' && _D2_CMU_1_품번.value != '') {
    _D2_CMU_1.style.backgroundColor = 'salmon';
    _D2_CMU_1.style.color = 'white';
  }

  if (_D2_RELAY_QR.value != '' && _D2_RELAY_품번.value != '') {
    _D2_RELAY.style.backgroundColor = 'salmon';
    _D2_RELAY.style.color = 'white';
  }

  if (_D2_BMU_QR.value != '' && _D2_BMU_품번.value != '') {
    _D2_BMU.style.backgroundColor = 'salmon';
    _D2_BMU.style.color = 'white';
  }

  if (_D2_HV_CNTR_1_QR.value != '' && _D2_HV_CNTR_1_품번.value != '') {
    _D2_HV_CNTR_1.style.backgroundColor = 'salmon';
    _D2_HV_CNTR_1.style.color = 'white';
  }

  if (_D2_HV_CNTR_2_QR.value != '' && _D2_HV_CNTR_2_품번.value != '') {
    _D2_HV_CNTR_2.style.backgroundColor = 'salmon';
    _D2_HV_CNTR_2.style.color = 'white';
  }

  if (_D2_LWR_CASE_QR.value != '' && _D2_LWR_CASE_품번.value != '') {
    _D2_LWR_CASE.style.backgroundColor = 'salmon';
    _D2_LWR_CASE.style.color = 'white';
  }

  if (_D2_UPR_CASE_QR.value != '' && _D2_UPR_CASE_품번.value != '') {
    _D2_UPR_CASE.style.backgroundColor = 'salmon';
    _D2_UPR_CASE.style.color = 'white';
  }

  if (_D2_LV_W_H_QR.value != '' && _D2_LV_W_H_품번.value != '') {
    _D2_LV_W_H.style.backgroundColor = 'salmon';
    _D2_LV_W_H.style.color = 'white';
  }

  if (_D2_MODULE_1_QR.value != '' && _D2_MODULE_1_품번.value != '') {
    _D2_MODULE_1.style.backgroundColor = 'salmon';
    _D2_MODULE_1.style.color = 'white';
  }
}

var items = [];
async function 부품정보_list_table() {
  if (_management_id.value == '') return;

  items = [];
  var item = { 품명: '', QR: '', 품번: '' };

  switch (차종) {
    case 'DE':
    case 'DE_EV':
    case 'OS':
    case 'OS_EV':
    case 'SK3':
    case 'SK3_EV':
    case 'LK':
    case 'LK_EV':
      item.품명 = 'UPR_CASE';
      item.품번 = _A_UPR_CASE_품번.value;
      item.QR = _A_UPR_CASE_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'LWR_CASE';
      item.품번 = _A_LWR_CASE_품번.value;
      item.QR = _A_LWR_CASE_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'S_PLUG';
      item.품번 = _A_S_PLUG_품번.value;
      item.QR = _A_S_PLUG_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'SPA';
      item.품번 = _A_SPA_품번.value;
      item.QR = _A_SPA_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HT_CNTR';
      item.품번 = _A_HT_CNTR_품번.value;
      item.QR = _A_HT_CNTR_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_CNTR';
      item.품번 = _A_HV_CNTR_품번.value;
      item.QR = _A_HV_CNTR_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'PRA';
      item.품번 = _A_PRA_품번.value;
      item.QR = _A_PRA_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'LV_W_H';
      item.품번 = _A_LV_W_H_품번.value;
      item.QR = _A_LV_W_H_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_W_H_1';
      item.품번 = _A_HV_W_H_1_품번.value;
      item.QR = _A_HV_W_H_1_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_W_H_2';
      item.품번 = _A_HV_W_H_2_품번.value;
      item.QR = _A_HV_W_H_2_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_W_H_3';
      item.품번 = _A_HV_W_H_3_품번.value;
      item.QR = _A_HV_W_H_3_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_W_H_4';
      item.품번 = _A_HV_W_H_4_품번.value;
      item.QR = _A_HV_W_H_4_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_W_H_5';
      item.품번 = _A_HV_W_H_5_품번.value;
      item.QR = _A_HV_W_H_5_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'BMU =';
      item.품번 = _A_BMU_품번.value;
      item.QR = _A_BMU_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'CMU_1';
      item.품번 = _A_CMU_1_품번.value;
      item.QR = _A_CMU_1_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'CMU_2';
      item.품번 = _A_CMU_2_품번.value;
      item.QR = _A_CMU_2_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'CMU_3';
      item.품번 = _A_CMU_3_품번.value;
      item.QR = _A_CMU_3_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'CMU_4';
      item.품번 = _A_CMU_4_품번.value;
      item.QR = _A_CMU_4_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'CMU_5';
      item.품번 = _A_CMU_5_품번.value;
      item.QR = _A_CMU_5_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_1';
      item.품번 = _A_MODULE_1_품번.value;
      item.QR = _A_MODULE_1_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_2';
      item.품번 = _A_MODULE_2_품번.value;
      item.QR = _A_MODULE_2_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_3';
      item.품번 = _A_MODULE_3_품번.value;
      item.QR = _A_MODULE_3_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_4';
      item.품번 = _A_MODULE_4_품번.value;
      item.QR = _A_MODULE_4_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_5';
      item.품번 = _A_MODULE_5_품번.value;
      item.QR = _A_MODULE_5_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };

      break;

    case 'PU':
    case 'PU_EV':
    case 'HR':
    case 'HR_EV':
      item.품명 = 'UPR_CASE';
      item.품번 = _B_UPR_CASE_품번.value;
      item.QR = _B_UPR_CASE_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'LWR_CASE';
      item.품번 = _B_LWR_CASE_품번.value;
      item.QR = _B_LWR_CASE_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_CNTR';
      item.품번 = _B_HV_CNTR_품번.value;
      item.QR = _B_HV_CNTR_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HT_CNTR';
      item.품번 = _B_HT_CNTR_품번.value;
      item.QR = _B_HT_CNTR_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'PRA';
      item.품번 = _B_PRA_품번.value;
      item.QR = _B_PRA_QR.value;
      items.push(item);

      // item = { 품명: "", QR: "", 품번: "" };
      // item.품명 = "FUSE";
      // item.품번 = _B_FUSE_품번.value;
      // item.QR = _B_FUSE_QR.value;
      // items.push(item);

      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_W_H_1';
      item.품번 = _B_HV_W_H_1_품번.value;
      item.QR = _B_HV_W_H_1_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_W_H_2';
      item.품번 = _B_HV_W_H_2_품번.value;
      item.QR = _B_HV_W_H_2_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'LV_W_H';
      item.품번 = _B_LV_W_H_품번.value;
      item.QR = _B_LV_W_H_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'BMU';
      item.품번 = _B_BMU_품번.value;
      item.QR = _B_BMU_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'CMU_1';
      item.품번 = _B_CMU_1_품번.value;
      item.QR = _B_CMU_1_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'CMU_2';
      item.품번 = _B_CMU_2_품번.value;
      item.QR = _B_CMU_2_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'CMU_3';
      item.품번 = _B_CMU_3_품번.value;
      item.QR = _B_CMU_3_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'CMU_4';
      item.품번 = _B_CMU_4_품번.value;
      item.QR = _B_CMU_4_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'CMU_5';
      item.품번 = _B_CMU_5_품번.value;
      item.QR = _B_CMU_5_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_1';
      item.품번 = _B_MODULE_1_품번.value;
      item.QR = _B_MODULE_1_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_2';
      item.품번 = _B_MODULE_2_품번.value;
      item.QR = _B_MODULE_2_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_3';
      item.품번 = _B_MODULE_3_품번.value;
      item.QR = _B_MODULE_3_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_4';
      item.품번 = _B_MODULE_4_품번.value;
      item.QR = _B_MODULE_4_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_5';
      item.품번 = _B_MODULE_5_품번.value;
      item.QR = _B_MODULE_5_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_6';
      item.품번 = _B_MODULE_6_품번.value;
      item.QR = _B_MODULE_6_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_7';
      item.품번 = _B_MODULE_7_품번.value;
      item.QR = _B_MODULE_7_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_8';
      item.품번 = _B_MODULE_8_품번.value;
      item.QR = _B_MODULE_8_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_9';
      item.품번 = _B_MODULE_9_품번.value;
      item.QR = _B_MODULE_9_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_10';
      item.품번 = _B_MODULE_10_품번.value;
      item.QR = _B_MODULE_10_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };

      break;

    case 'CV':
    case 'CV_EV':
    case 'NE':
    case 'NE_EV':
    case 'LM':
    case 'LM_EV':
      item.품명 = 'UPR_CASE';
      item.품번 = _C_UPR_CASE_품번.value;
      item.QR = _C_UPR_CASE_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'LWR_CASE';
      item.품번 = _C_LWR_CASE_품번.value;
      item.QR = _C_LWR_CASE_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_CNTR_1';
      item.품번 = _C_HV_CNTR_1_품번.value;
      item.QR = _C_HV_CNTR_1_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_CNTR_2';
      item.품번 = _C_HV_CNTR_2_품번.value;
      item.QR = _C_HV_CNTR_2_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HT_CNTR';
      item.품번 = _C_HT_CNTR_품번.value;
      item.QR = _C_HT_CNTR_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'PRA';
      item.품번 = _C_PRA_품번.value;
      item.QR = _C_PRA_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'FUSE';
      item.품번 = _C_FUSE_품번.value;
      item.QR = _C_FUSE_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'LV_W_H';
      item.품번 = _C_LV_W_H_품번.value;
      item.QR = _C_LV_W_H_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_W_H_1';
      item.품번 = _C_HV_W_H_1_품번.value;
      item.QR = _C_HV_W_H_1_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_W_H_2';
      item.품번 = _C_HV_W_H_2_품번.value;
      item.QR = _C_HV_W_H_2_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_W_H_3';
      item.품번 = _C_HV_W_H_3_품번.value;
      item.QR = _C_HV_W_H_3_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_W_H_4';
      item.품번 = _C_HV_W_H_4_품번.value;
      item.QR = _C_HV_W_H_4_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_W_H_5';
      item.품번 = _C_HV_W_H_5_품번.value;
      item.QR = _C_HV_W_H_5_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_W_H_6';
      item.품번 = _C_HV_W_H_6_품번.value;
      item.QR = _C_HV_W_H_6_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_W_H_7';
      item.품번 = _C_HV_W_H_7_품번.value;
      item.QR = _C_HV_W_H_7_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_W_H_8';
      item.품번 = _C_HV_W_H_8_품번.value;
      item.QR = _C_HV_W_H_8_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'BMU';
      item.품번 = _C_BMU_품번.value;
      item.QR = _C_BMU_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'CMU_1';
      item.품번 = _C_CMU_1_품번.value;
      item.QR = _C_CMU_1_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'CMU_2';
      item.품번 = _C_CMU_2_품번.value;
      item.QR = _C_CMU_2_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'CMU_3';
      item.품번 = _C_CMU_3_품번.value;
      item.QR = _C_CMU_3_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'CMU_4';
      item.품번 = _C_CMU_4_품번.value;
      item.QR = _C_CMU_4_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'CMU_5';
      item.품번 = _C_CMU_5_품번.value;
      item.QR = _C_CMU_5_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'CMU_6';
      item.품번 = _C_CMU_6_품번.value;
      item.QR = _C_CMU_6_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'CMU_7';
      item.품번 = _C_CMU_7_품번.value;
      item.QR = _C_CMU_7_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'CMU_8';
      item.품번 = _C_CMU_8_품번.value;
      item.QR = _C_CMU_8_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_1';
      item.품번 = _C_MODULE_1_품번.value;
      item.QR = _C_MODULE_1_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_2';
      item.품번 = _C_MODULE_2_품번.value;
      item.QR = _C_MODULE_2_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_3';
      item.품번 = _C_MODULE_3_품번.value;
      item.QR = _C_MODULE_3_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_4';
      item.품번 = _C_MODULE_4_품번.value;
      item.QR = _C_MODULE_4_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_5';
      item.품번 = _C_MODULE_5_품번.value;
      item.QR = _C_MODULE_5_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_6';
      item.품번 = _C_MODULE_6_품번.value;
      item.QR = _C_MODULE_6_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_7';
      item.품번 = _C_MODULE_7_품번.value;
      item.QR = _C_MODULE_7_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_8';
      item.품번 = _C_MODULE_8_품번.value;
      item.QR = _C_MODULE_8_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_9';
      item.품번 = _C_MODULE_9_품번.value;
      item.QR = _C_MODULE_9_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_10';
      item.품번 = _C_MODULE_10_품번.value;
      item.QR = _C_MODULE_10_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_11';
      item.품번 = _C_MODULE_11_품번.value;
      item.QR = _C_MODULE_11_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_12';
      item.품번 = _C_MODULE_12_품번.value;
      item.QR = _C_MODULE_12_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_13';
      item.품번 = _C_MODULE_13_품번.value;
      item.QR = _C_MODULE_13_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_14';
      item.품번 = _C_MODULE_14_품번.value;
      item.QR = _C_MODULE_14_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_15';
      item.품번 = _C_MODULE_15_품번.value;
      item.QR = _C_MODULE_15_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_16';
      item.품번 = _C_MODULE_16_품번.value;
      item.QR = _C_MODULE_16_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_17';
      item.품번 = _C_MODULE_17_품번.value;
      item.QR = _C_MODULE_17_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_18';
      item.품번 = _C_MODULE_18_품번.value;
      item.QR = _C_MODULE_18_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_19';
      item.품번 = _C_MODULE_19_품번.value;
      item.QR = _C_MODULE_19_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_20';
      item.품번 = _C_MODULE_20_품번.value;
      item.QR = _C_MODULE_20_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_21';
      item.품번 = _C_MODULE_21_품번.value;
      item.QR = _C_MODULE_21_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_22';
      item.품번 = _C_MODULE_22_품번.value;
      item.QR = _C_MODULE_22_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_23';
      item.품번 = _C_MODULE_23_품번.value;
      item.QR = _C_MODULE_23_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_24';
      item.품번 = _C_MODULE_24_품번.value;
      item.QR = _C_MODULE_24_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_25';
      item.품번 = _C_MODULE_25_품번.value;
      item.QR = _C_MODULE_25_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_26';
      item.품번 = _C_MODULE_26_품번.value;
      item.QR = _C_MODULE_26_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_27';
      item.품번 = _C_MODULE_27_품번.value;
      item.QR = _C_MODULE_27_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_28';
      item.품번 = _C_MODULE_28_품번.value;
      item.QR = _C_MODULE_28_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_29';
      item.품번 = _C_MODULE_29_품번.value;
      item.QR = _C_MODULE_29_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_30';
      item.품번 = _C_MODULE_30_품번.value;
      item.QR = _C_MODULE_30_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_31';
      item.품번 = _C_MODULE_31_품번.value;
      item.QR = _C_MODULE_31_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_32';
      item.품번 = _C_MODULE_32_품번.value;
      item.QR = _C_MODULE_32_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };

      break;

    case 'CS':
    case 'CS_EV':
      item.품명 = 'UPR_CASE';
      item.품번 = _D_UPR_CASE_품번.value;
      item.QR = _D_UPR_CASE_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'LWR_CASE';
      item.품번 = _D_LWR_CASE_품번.value;
      item.QR = _D_LWR_CASE_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_CNTR_1';
      item.품번 = _D_HV_CNTR_1_품번.value;
      item.QR = _D_HV_CNTR_1_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_CNTR_2';
      item.품번 = _D_HV_CNTR_2_품번.value;
      item.QR = _D_HV_CNTR_2_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'RELAY';
      item.품번 = _D_RELAY_품번.value;
      item.QR = _D_RELAY_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'LV_W_H';
      item.품번 = _D_LV_W_H_품번.value;
      item.QR = _D_LV_W_H_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_W_H_1';
      item.품번 = _D_HV_W_H_1_품번.value;
      item.QR = _D_HV_W_H_1_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_W_H_2';
      item.품번 = _D_HV_W_H_2_품번.value;
      item.QR = _D_HV_W_H_2_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'BMU';
      item.품번 = _D_BMU_품번.value;
      item.QR = _D_BMU_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'CMU_1';
      item.품번 = _D_CMU_1_품번.value;
      item.QR = _D_CMU_1_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_1';
      item.품번 = _D_MODULE_1_품번.value;
      item.QR = _D_MODULE_1_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_2';
      item.품번 = _D_MODULE_2_품번.value;
      item.QR = _D_MODULE_2_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_W_H_1';
      item.품번 = _D2_HV_W_H_1_품번.value;
      item.QR = _D2_HV_W_H_1_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'CMU_1';
      item.품번 = _D2_CMU_1_품번.value;
      item.QR = _D2_CMU_1_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'RELAY';
      item.품번 = _D2_RELAY_품번.value;
      item.QR = _D2_RELAY_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'BMU';
      item.품번 = _D2_BMU_품번.value;
      item.QR = _D2_BMU_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_CNTR_1';
      item.품번 = _D2_HV_CNTR_1_품번.value;
      item.QR = _D2_HV_CNTR_1_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'HV_CNTR_2';
      item.품번 = _D2_HV_CNTR_2_품번.value;
      item.QR = _D2_HV_CNTR_2_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'LWR_CASE';
      item.품번 = _D2_LWR_CASE_품번.value;
      item.QR = _D2_LWR_CASE_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'UPR_CASE';
      item.품번 = _D2_UPR_CASE_품번.value;
      item.QR = _D2_UPR_CASE_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'LV_W_H';
      item.품번 = _D2_LV_W_H_품번.value;
      item.QR = _D2_LV_W_H_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };
      item.품명 = 'MODULE_1';
      item.품번 = _D2_MODULE_1_품번.value;
      item.QR = _D2_MODULE_1_QR.value;
      items.push(item);
      item = { 품명: '', QR: '', 품번: '' };

      break;
    default:
      console.log('차종을 확인하세요');
      return;

      break;
  }

  for (var i = 0; i < items.length; i++) {
    items[i].관리번호 = 관리번호;
    items[i].차종 = 차종;
  }

  var item_list_table = new Tabulator('#grid_item_list', {
    layout: 'resizableColumnFit',
    height: 200,
    data: items,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string', width: '180' },
      { title: '차종', field: '차종', sorter: 'string', width: '180' },
      { title: '품명', field: '품명', sorter: 'string', width: '180' },
      { title: 'QR', field: 'QR', sorter: 'string', width: '180' },
      { title: '품번', field: '품번', sorter: 'string', width: '180' },
    ],
  });

  await sleep(1);

  var sheets = {
    부품정보_리스트: true,
  };
  item_list_table.download('xlsx', '부품정보_리스트.xlsx', { sheets: sheets });
}
