//로그인 버튼을 눌렀을때
async function login() {
  console.log('try login');
  const _id = document.getElementById('_id');
  const _passwd = document.getElementById('_passwd');

  if (_id.value == '' || _passwd.value == '') return;

  //암호화
  const hash = CryptoJS.MD5(_passwd.value);

  //해당 계정 정보 가져옴
  findOne_계정(계정, { id: _id.value, passwd: hash.toString() });
  await delay();

  if (계정_v != null) {
    id = _id.value;
    passwd = hash.toString();

    socket.emit('계정정보', id, passwd);

    if (worker == '') {
      //로그인 상황
      worker = _id.value; //worker
      console.log('작업자:', worker);

      계정_stat = 계정_v; //계정 정보 권한

      //sessionStorage.setItem('worker',  worker);
      sessionStorage.setItem('level', 계정_stat.level);

      alert('로그인 성공');

      setTimeout(async function () {
        //1초 후
        //대시보드 시작
        loadPage('base/dashboard.html');
        start_repeat_대시보드();
        대시보드_시작();

        //관리자 메뉴 관리자일때만 표출
        if (level == '관리자') admin_btn.style.display = 'block';
        부품재고_btn.style.display = 'block'; //부품재고 메뉴는 로그인하면 보이도록 함

        //한국의 시간대에 맞도록 하여 날짜와 시간을 구함
        var DateTime = luxon.DateTime;
        var seoul = DateTime.local().setZone('Asia/Seoul');
        var now = seoul.toString();
        var year = now.substr(0, 4);
        var month = String(Number(now.substr(5, 2)) - 3).padStart(2, '0'); // 3달전
        var day = now.substr(8, 2);
        var 기준일 = year + '-' + month + '-' + day + 'T00:00:00Z';

        //3달보다 더 오래된 배터리팩은 알람을 띄움
        count(BSA재제조, {
          마지막충전일: { $lte: 기준일, $ne: '' },
          공정단계: { $ne: '출하' },
        });
        await delay();

        console.log('recharge_count: ', doc_count);
        if (doc_count > 0) {
          alert('재충전이 필요한 BSA가 있습니다.');
        }
      }, 1000);

      await sleep(1);

      //공지사항
      //alert('#공지사항#\nVersion update sky 0.77\n1. 보안 업데이트');
    } else if (worker == _id.value) {
      //로그아웃 상황
      worker = '';
      level = '';
      id = '';
      passwd = '';
      sessionStorage.clear();
      admin_btn.style.display = 'none';
      부품재고_btn.style.display = 'none';
      const _login_info = document.getElementById('login_info');
    }
    change_label();
  } else {
    alert('계정 정보가 맞지 않습니다');
  }
}

async function change_label() {
  await sleep(10);
  const _login_btn = document.getElementById('login_btn');
  const _login_info = document.getElementById('login_info');

  if (_login_btn.innerHTML == '로그아웃') {
    sessionStorage.clear();
    worker = '';
    level = '';
    admin_btn.style.display = 'none';
    _login_btn.innerHTML = '로그인';
    _login_info.innerHTML = '';
    const _admin_btn = document.getElementById('부품재고_btn');
    _admin_btn.style.display = 'none';
    const _부품재고_btn = document.getElementById('부품재고_btn');
    _부품재고_btn.style.display = 'none';
  }

  var _worker = sessionStorage.getItem('worker');
  level = sessionStorage.getItem('level');

  if (_worker != '' && _worker != null) worker = _worker;
  console.log('worker in change label :', worker);

  if (worker == '' || worker == 'null' || worker == null) {
    worker = '';
    level = '';
    admin_btn.style.display = 'none';
    _login_btn.innerHTML = '로그인';
    _login_info.innerHTML = '';
  } else {
    _login_btn.innerHTML = '로그아웃';
    _login_info.innerHTML = worker;
  }

  //관리자 계정이 없거나 관리자 계정으로 로그인 했으면 관리자 메뉴를 표출함
  //  find_계정(계정, { id: "admin" });
  //  await delay();
  //
  //  if (계정_v == null || level == "admin") {
  //    admin_btn.style.display = "block";
  //  }
}
