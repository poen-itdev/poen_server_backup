var _chart;

//각 타입 막대의 색상을 랜덤하게 만들기 위해
function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return String(Math.floor(Math.random() * (max - min + 1)) + min); //최댓값도 포함, 최솟값도 포함
}

async function 생산현황_시작() {
  if (worker == '') return;
  if (document.getElementById('_chart') == undefined) {
    await sleep(DELAY);
    return;
  }

  flag_생산현황 = false;

  품번_조회();
}

//품번별 카운트 조회
async function 품번_조회() {
  if (worker == '') return;
  var labels = [];
  var counts = [];
  var background_color = [];
  var border_color = [];

  if (level == 'kia_일반') {
    count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 출하: { $exists: true }, 품번: { $exists: true }, 구분: '일반' });
    await delay();
  } else if (level == 'hyundai_일반') {
    count(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      출하: { $exists: true },
      품번: { $exists: true },
      구분: '일반',
    });
    await delay();
  } else if (level == 'kia_보증') {
    count(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 출하: { $exists: true }, 품번: { $exists: true }, 구분: '보증' });
    await delay();
  } else if (level == 'hyundai_보증') {
    count(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      출하: { $exists: true },
      품번: { $exists: true },
      구분: '보증',
    });
    await delay();
  } else {
    //출하된 배터리팩만 카운트
    count(BSA재제조, { 출하: { $exists: true }, 품번: { $exists: true } });
    await delay();
  }
  if (BSA재제조_cnt < 1) return;

  if (level == 'kia_일반') {
    find_BSA재제조(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 출하: { $exists: true }, 품번: { $exists: true }, 구분: '일반' });
    await delay();
  } else if (level == 'hyundai_일반') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      출하: { $exists: true },
      품번: { $exists: true },
      구분: '일반',
    });
    await delay();
  } else if (level == 'kia_보증') {
    find_BSA재제조(BSA재제조, { 차종: { $in: ['DE', 'DE_EV', 'DEPBV', 'DEPBV-EV', 'CV', 'CV_EV', 'MV', 'MV_EV', 'PU', 'PU_EV', 'SG2', 'SG2-EV', 'TAM', 'TAM-EV', 'PS', 'PS_EV', 'SK3'] }, 출하: { $exists: true }, 품번: { $exists: true }, 구분: '보증' });
    await delay();
  } else if (level == 'hyundai_보증') {
    find_BSA재제조(BSA재제조, {
      차종: { $in: ['OS', 'OS_EV', 'NE', 'NE_EV', 'HR', 'HR_EV', 'LK', 'LK_EV', 'LM', 'LM_EV', 'LKFC', 'LKFC-EV', 'CS', 'CS-EV', 'CS_EV', 'SX2', 'SX2-EV', 'AE', 'AE_EV', 'CE', 'CE_EV', 'ME', 'ME_EV', 'FE', 'FE_EV', 'RG3', 'RG3-EV', 'JW', 'JW_EV', 'JK', 'JK_EV', 'JX', 'JX_EV'] },
      출하: { $exists: true },
      품번: { $exists: true },
      구분: '보증',
    });
    await delay();
  } else {
    //품번이 있고 출하된 배터리팩 기본정보 조회
    find_BSA재제조(BSA재제조, { 출하: { $exists: true }, 품번: { $exists: true } });
    await delay();
  }

  BSA재제조_v.forEach(function (doc) {
    //배터리팩 기본정보에서 품번을 가져와 X축 라벨로 쓰고 각 라벨별 색상을 만듬
    if (labels.indexOf(doc.품번) < 0) {
      //조회 데이터에서 처음 나타난 품번일 경우
      labels.push(doc.품번); //라벨 배열에 추가
      counts.push(1); // 수량을 1로 함

      var back_rand1 = rand(0, 255);
      var back_rand2 = rand(0, 255);
      var back_rand3 = rand(0, 255);

      var border1 = back_rand1;
      var border2 = back_rand2;
      var border3 = back_rand3;

      background_color.push('rgba(' + back_rand1 + ', ' + back_rand2 + ', ' + back_rand3 + ', 0.2)');
      border_color.push('rgb(' + border1 + ', ' + border2 + ', ' + border3 + ')');
    } else {
      //조회 데이터에서 이미 라벨 배열에 같은것이 있는 품번일 경우
      var no = labels.indexOf(doc.품번);
      counts[no]++; //수량 1 증가
    }
  });

  console.log(labels);
  console.log(count);
  console.log(background_color);
  console.log(border_color);

  품번차트(labels, counts, background_color, border_color); //차트를 생성
}

//차트생성 함수
async function 품번차트(labels, counts, background_color, border_color) {
  if (worker == '') return;
  const canvas = document.getElementById('_chart');

  if (_chart != undefined) {
    _chart.destroy();
  }

  _chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labels, //품번 목록을 넣은 라벨 배열(X축)
      datasets: [
        {
          label: '출하 품번(누적)', //title
          data: counts,
          backgroundColor: background_color,
          borderColor: border_color,
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          //Y축
          title: {
            display: true,
            text: '갯수',
          },
          min: 0,
          ticks: {
            // forces step size to be 50 units
            stepSize: 1,
          },
          beginAtZero: true,
        },
      },
    },
  });
}
