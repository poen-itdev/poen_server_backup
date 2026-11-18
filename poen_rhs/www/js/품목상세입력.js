var pre_관리번호 = '';
var 차종 = '';
var flag_입고_complete = false;

async function 상세입력_시작(is재제조번호 = false) {
  if (typeof _폐기 == 'undefined') {
    await sleep(DELAY);
    return;
  }

  //기존에 기본정보 페이지에서 각 공정입력으로 들어갔기에 이곳에 값 리셋 이 있게 되었다.
  flag_상세입력 = false;
  first_분해조립 = true;

  기초검사_DTC_count = 0;
  EOL_DTC_count = 0;
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

  if (_management_id.value == '') _management_id.value = 관리번호;

  if (is재제조번호 == false) {
    //관리번호로 로딩
    _management_id.value = _management_id.value.trim().toUpperCase();
    if (_management_id.value == '조회를 누르세요') _management_id.value = 관리번호;

    console.log('load: ', _management_id.value);
    if (_management_id.value.length == 0 && _재제조번호.value.length == 0) return;

    관리번호 = _management_id.value.trim().toUpperCase();
    console.log('관리번호:', 관리번호);

    _재제조번호.value = '';
    _구분.value = '';
    _차종.value = '';
    _품번.value = '';
    _RO_no.value = '';
    _공정단계.value = '';
    _적재No.value = '';
    _입고.value = '';
    _제조투입.value = '';
    _세척투입일.value = '';
    _세척.value = '';
    _기초검사투입일.value = '';
    _기초검사.value = '';
    _분해조립투입일.value = '';
    _분해조립.value = '';
    _성능검사투입일.value = '';
    _성능검사.value = '';
    _EOL투입일.value = '';
    _EOL.value = '';
    _출하검사.value = '';
    _출하.value = '';
    _납품처.value = '';
    _소재지.value = '';
    _소재지사유.value = '';
    _반품입고.value = '';
    _재출하.value = '';
    _완전분해.value = '';
    _폐기.value = '';
    _완전분해사유.value = '';
    _폐기사유.value = '';
    _렉번호.value = '';

    //고객사별 대응 코드
    if (level == 'kia_일반') {
      findOne_BSA재제조(BSA재제조, {
        차종: {
          $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'],
        },
        관리번호: _management_id.value,
        구분: '일반',
      });
      await delay();
    } else if (level == 'hyundai_일반') {
      findOne_BSA재제조(BSA재제조, {
        차종: {
          $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'],
        },
        관리번호: _management_id.value,
        구분: '일반',
      });
      await delay();
    } else if (level == 'kia_보증') {
      findOne_BSA재제조(BSA재제조, {
        차종: {
          $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'],
        },
        관리번호: _management_id.value,
        구분: '보증',
      });
      await delay();
    } else if (level == 'hyundai_보증') {
      findOne_BSA재제조(BSA재제조, {
        차종: {
          $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'],
        },
        관리번호: _management_id.value,
        구분: '보증',
      });
      await delay();
    } else {
      find(BSA재제조, _management_id.value);
      await delay();
    }
  } else {
    //재제조번호로 조회
    console.log('재제조번호:', _재제조번호.value);
    if (level == 'kia_일반') {
      findOne_BSA재제조(BSA재제조, {
        차종: {
          $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'],
        },
        재제조번호: _재제조번호.value,
        구분: '일반',
      });
      await delay();
    } else if (level == 'hyundai_일반') {
      findOne_BSA재제조(BSA재제조, {
        차종: {
          $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'],
        },
        재제조번호: _재제조번호.value,
        구분: '일반',
      });
      await delay();
    } else if (level == 'kia_보증') {
      findOne_BSA재제조(BSA재제조, {
        차종: {
          $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'],
        },
        재제조번호: _재제조번호.value,
        구분: '보증',
      });
      await delay();
    } else if (level == 'hyundai_보증') {
      findOne_BSA재제조(BSA재제조, {
        차종: {
          $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'],
        },
        재제조번호: _재제조번호.value,
        구분: '보증',
      });
      await delay();
    } else {
      findOne_BSA재제조(BSA재제조, { 재제조번호: _재제조번호.value });
      await delay();
    }
  }
  if (BSA재제조_v != null) {
    if (is재제조번호 == false) {
      관리번호 = _management_id.value.trim().toUpperCase();
      pre_관리번호 = 관리번호;
      sessionStorage.setItem('manage_id', 관리번호);

      if (level == 'kia_일반') {
        findOne_BSA재제조(BSA재제조, {
          차종: {
            $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'],
          },
          관리번호: _management_id.value,
          구분: '일반',
        });
        await delay();
      } else if (level == 'hyundai_일반') {
        findOne_BSA재제조(BSA재제조, {
          차종: {
            $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'],
          },
          관리번호: _management_id.value,
          구분: '일반',
        });
        await delay();
      } else if (level == 'kia_보증') {
        findOne_BSA재제조(BSA재제조, {
          차종: {
            $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'],
          },
          관리번호: _management_id.value,
          구분: '보증',
        });
        await delay();
      } else if (level == 'hyundai_보증') {
        findOne_BSA재제조(BSA재제조, {
          차종: {
            $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'],
          },
          관리번호: _management_id.value,
          구분: '보증',
        });
        await delay();
      } else {
        findOne_BSA재제조(BSA재제조, { 관리번호: _management_id.value });
        await delay();
      }
    } else {
      _재제조번호.value = _재제조번호.value.trim();
      console.log('load: ', _재제조번호.value);

      if (_management_id.value.length == 0 && _재제조번호.value.length == 0) return;

      _management_id.value = '';
      _구분.value = '';
      _차종.value = '';
      _품번.value = '';
      _RO_no.value = '';
      _공정단계.value = '';
      _적재No.value = '';
      _입고.value = '';
      _제조투입.value = '';
      _세척투입일.value = '';
      _세척.value = '';
      _기초검사투입일.value = '';
      _기초검사.value = '';
      _분해조립투입일.value = '';
      _분해조립.value = '';
      _성능검사투입일.value = '';
      _성능검사.value = '';
      _EOL투입일.value = '';
      _EOL.value = '';
      _출하검사.value = '';
      _출하.value = '';
      _납품처.value = '';
      _소재지.value = '';
      _소재지사유.value = '';
      _반품입고.value = '';
      _재출하.value = '';
      _완전분해.value = '';
      _폐기.value = '';
      _완전분해사유.value = '';
      _폐기사유.value = '';
      _렉번호.value = '';

      if (level == 'kia_일반') {
        findOne_BSA재제조(BSA재제조, {
          차종: {
            $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'],
          },
          재제조번호: _재제조번호.value,
          구분: '일반',
        });
        await delay();
      } else if (level == 'hyundai_일반') {
        findOne_BSA재제조(BSA재제조, {
          차종: {
            $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'],
          },
          재제조번호: _재제조번호.value,
          구분: '일반',
        });
        await delay();
      } else if (level == 'kia_보증') {
        findOne_BSA재제조(BSA재제조, {
          차종: {
            $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'],
          },
          재제조번호: _재제조번호.value,
          구분: '보증',
        });
        await delay();
      } else if (level == 'hyundai_보증') {
        findOne_BSA재제조(BSA재제조, {
          차종: {
            $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'],
          },
          재제조번호: _재제조번호.value,
          구분: '보증',
        });
        await delay();
      } else {
        findOne_BSA재제조(BSA재제조, { 재제조번호: _재제조번호.value });
        await delay();
      }
    }

    _management_id.value = BSA재제조_v.관리번호;
    _재제조번호.value = BSA재제조_v.재제조번호;
    _구분.value = BSA재제조_v.구분;
    _차종.value = BSA재제조_v.차종;
    _품번.value = BSA재제조_v.품번;
    _RO_no.value = BSA재제조_v.RO_no;
    _공정단계.value = BSA재제조_v.공정단계;
    _적재No.value = BSA재제조_v.적재No;
    if (BSA재제조_v.입고 != undefined) _입고.value = BSA재제조_v.입고.substr(0, 16);
    if (BSA재제조_v.제조투입 != undefined) _제조투입.value = BSA재제조_v.제조투입.substr(0, 16);
    if (BSA재제조_v.세척투입일 != undefined) _세척투입일.value = BSA재제조_v.세척투입일.substr(0, 16);
    if (BSA재제조_v.세척 != undefined) _세척.value = BSA재제조_v.세척.substr(0, 16);
    if (BSA재제조_v.기초검사투입일 != undefined) _기초검사투입일.value = BSA재제조_v.기초검사투입일.substr(0, 16);
    if (BSA재제조_v.기초검사 != undefined) _기초검사.value = BSA재제조_v.기초검사.substr(0, 16);
    if (BSA재제조_v.분해조립투입일 != undefined) _분해조립투입일.value = BSA재제조_v.분해조립투입일.substr(0, 16);
    if (BSA재제조_v.분해조립 != undefined) _분해조립.value = BSA재제조_v.분해조립.substr(0, 16);
    if (BSA재제조_v.성능검사투입일 != undefined) _성능검사투입일.value = BSA재제조_v.성능검사투입일.substr(0, 16);
    if (BSA재제조_v.성능검사 != undefined) _성능검사.value = BSA재제조_v.성능검사.substr(0, 16);
    if (BSA재제조_v.EOL투입일 != undefined) _EOL투입일.value = BSA재제조_v.EOL투입일.substr(0, 16);
    if (BSA재제조_v.EOL != undefined) _EOL.value = BSA재제조_v.EOL.substr(0, 16);
    if (BSA재제조_v.출하검사 != undefined) _출하검사.value = BSA재제조_v.출하검사.substr(0, 16);
    _납품처.value = BSA재제조_v.납품처;
    if (BSA재제조_v.출하 != undefined) _출하.value = BSA재제조_v.출하.substr(0, 16);
    //if (BSA재제조_v.출하.length > 5) _공정단계.value = "출하";
    if (BSA재제조_v.소재지 != undefined) _소재지.value = BSA재제조_v.소재지.substr(0, 16);
    _소재지사유.value = BSA재제조_v.소재지사유;
    if (BSA재제조_v.마지막충전일 != undefined) _마지막충전일.value = BSA재제조_v.마지막충전일.substr(0, 16);
    if (BSA재제조_v.반품입고 != undefined) _반품입고.value = BSA재제조_v.반품입고.substr(0, 16);
    if (BSA재제조_v.재출하 != undefined) _재출하.value = BSA재제조_v.재출하.substr(0, 16);
    if (BSA재제조_v.완전분해 != undefined) _완전분해.value = BSA재제조_v.완전분해.substr(0, 16);
    if (BSA재제조_v.폐기 != undefined) _폐기.value = BSA재제조_v.폐기.substr(0, 16);
    _완전분해사유.value = BSA재제조_v.완전분해사유;
    _폐기사유.value = BSA재제조_v.폐기사유;
    if (BSA재제조_v.출하예약 != undefined) _출하예약.value = BSA재제조_v.출하예약.substr(0, 16);
    if (BSA재제조_v.렉번호 != undefined) _렉번호.value = BSA재제조_v.렉번호.substr(0, 16);
    if (select_pos != '') _렉번호.value = select_pos;
  } else {
    //저장된 데이터가 없으면 리셋
    if (is재제조번호 == false) {
      _재제조번호.value = '';
    } else {
      _management_id.value = '';
    }

    _재제조번호.value = '';
    _구분.value = '';
    _차종.value = '';
    _품번.value = '';
    _RO_no.value = '';
    _공정단계.value = '';
    _적재No.value = '';
    _입고.value = '0000-00-00T00:00';
    _제조투입.value = '0000-00-00T00:00';
    _세척투입일.value = '0000-00-00T00:00';
    _세척.value = '0000-00-00T00:00';
    _기초검사투입일.value = '0000-00-00T00:00';
    _기초검사.value = '0000-00-00T00:00';
    _분해조립투입일.value = '0000-00-00T00:00';
    _분해조립.value = '0000-00-00T00:00';
    _성능검사투입일.value = '0000-00-00T00:00';
    _성능검사.value = '0000-00-00T00:00';
    _EOL투입일.value = '0000-00-00T00:00';
    _EOL.value = '0000-00-00T00:00';
    _출하검사.value = '0000-00-00T00:00';
    _출하.value = '0000-00-00T00:00';
    _납품처.value = '';
    _소재지.value = '';
    _소재지사유.value = '';
    _마지막충전일.value = '0000-00-00T00:00';
    _반품입고.value = '0000-00-00T00:00';
    _재출하.value = '0000-00-00T00:00';
    _완전분해.value = '0000-00-00T00:00';
    _완전분해사유.value = '';
    _폐기.value = '0000-00-00T00:00';
    _폐기사유.value = '';
    _출하예약.value = '';
    _렉번호.value = '';

    //item_detail_save(true);
  }

  _완전분해.onchange = function (e) {
    _공정단계.value = '완전분해';
  };

  _폐기.onchange = function (e) {
    _공정단계.value = '폐기';
  };
}

async function item_detail_save(flag_result = false) {
  if (worker == '') return;
  if (_management_id.value.length == 0) return;
  if (_management_id.value.slice(0, 2) == '조회') return;
  console.log('save: ', _management_id.value);

  관리번호 = _management_id.value.trim().toUpperCase();

  var doc = JSON.parse(JSON.stringify(BSA재제조_doc));
  doc.관리번호 = _management_id.value.trim().toUpperCase();
  doc.재제조번호 = _재제조번호.value.trim();
  doc.구분 = _구분.value;
  doc.차종 = _차종.value;
  doc.품번 = _품번.value;
  doc.RO_no = _RO_no.value;
  doc.적재No = _적재No.value;
  doc.입고 = _입고.value;
  doc.제조투입 = _제조투입.value;
  doc.세척투입일 = _세척투입일.value;
  doc.세척 = _세척.value;
  doc.기초검사투입일 = _기초검사투입일.value;
  doc.기초검사 = _기초검사.value;
  doc.분해조립투입일 = _분해조립투입일.value;
  doc.분해조립 = _분해조립.value;
  doc.성능검사투입일 = _성능검사투입일.value;
  doc.성능검사 = _성능검사.value;
  doc.EOL투입일 = _EOL투입일.value;
  doc.EOL = _EOL.value;
  doc.출하검사 = _출하검사.value;
  doc.출하 = _출하.value;
  if (_출하.value != '') _공정단계.value = '출하';
  doc.공정단계 = _공정단계.value;
  doc.납품처 = _납품처.value;
  doc.소재지 = _소재지.value;
  doc.소재지사유 = _소재지사유.value;
  doc.마지막충전일 = _마지막충전일.value;
  doc.반품입고 = _반품입고.value;
  doc.재출하 = _재출하.value;
  doc.완전분해 = _완전분해.value;
  doc.완전분해사유 = _완전분해사유.value;
  doc.폐기 = _폐기.value;
  doc.폐기사유 = _폐기사유.value;
  doc.출하예약 = _출하예약.value;
  doc.렉번호 = _렉번호.value;

  update(BSA재제조, doc);
  await delay();

  console.log(update_count);
  console.log(insert_count);

  if (update_count > 0) {
    alert('업데이트 되었습니다');
  }

  if (insert_count > 0) {
    alert('신규 항목이 저장 되었습니다');
  }
}

//구버전에서 공정단계에 들어가기위해 만들었던 코드... 지금은 안쓰님
async function processStep() {
  if (worker == '') return;
  if (_management_id.value.length == 0) return;
  pre_관리번호 = '';
  관리번호 = _management_id.value.trim().toUpperCase();

  var step = _공정단계.value;

  if (flag_입고_complete == false && step != '입고') {
    alert('입고 정보를 입력해 주세요!');
    step = '입고';
  }

  switch (step) {
    case '입고':
      flag_입고 = true;
      loadPage('base/입고.html');
      break;

    case '제조투입':
      break;

    case '세척':
      flag_세척 = true;
      loadPage('base/세척.html');
      break;

    case '기초검사':
      flag_기초검사 = true;
      loadPage('base/기초검사.html');
      break;

    case '분해조립':
      flag_분해조립 = true;
      flag_loaded = false;
      loadPage('base/분해조립.html');
      break;

    case '성능검사':
      flag_성능검사 = true;
      loadPage('base/성능검사.html');
      break;

    case 'EOL':
      flag_EOL = true;
      loadPage('base/EOL.html');
      break;

    case '제조완료':
      break;

    case '출하검사':
      flag_출하 = true;
      loadPage('base/출하정보.html');
      break;

    case '출하':
      break;

    default:
      alert('잘못된 공정명입니다');
      break;
  }
}

//고품정보등록은 이제 안쓰인다.
async function func_고품정보등록() {
  if (worker == '') return;
  if (_management_id.value.length == 0) return;
  관리번호 = _management_id.value;
  await sleep(1);

  loadPage('base/고품정보.html');
}
//교체부품상세는 과거 엑셀 로 관리하던 문서와 호환시키려고 만들었다.
function func_교체부품상세() {
  if (worker == '') return;
  if (_management_id.value.length == 0) return;

  loadPage('base/교체부품상세.html');
}

//특이 사항 입력 화면으로
function func_특이사항() {
  if (worker == '') return;
  if (_management_id.value.length == 0) return;
  loadPage('base/특이사항.html');
}

function 공정입력_콤보박스(e) {
  const value = e.value;

  document.getElementById('_공정단계').value = value;
}

function 소재지_콤보박스(e) {
  const value = e.value;

  document.getElementById('_소재지').value = value;
}

function 출하예약_콤보박스(e) {
  const value = e.value;

  document.getElementById('_출하예약').value = value;
}

function 교체부품상세_콤보박스(e) {
  const value = e.value;

  교체부품상세No = value;
}
