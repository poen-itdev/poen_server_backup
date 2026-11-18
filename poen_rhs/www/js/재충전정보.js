async function 재충전정보_시작() {
  if (worker == '') return;
  var _loaded = document.getElementById('grid_재충전정보');
  if (typeof _loaded == 'undefined') {
    await sleep(DELAY);
    return;
  }

  flag_재충전정보 = false;

  var tabledata = [];
  var DateTime = luxon.DateTime;
  var seoul = DateTime.local().setZone('Asia/Seoul');
  var now = seoul.toString();
  var year = now.substr(0, 4);
  var month = String(Number(now.substr(5, 2)) - 3).padStart(2, '0'); //석달전
  var day = now.substr(8, 2);
  var 기준일 = year + '-' + month + '-' + day + 'T00:00:00Z'; //석달전일자

  console.log('검색 기준일:', 기준일, now);
  find_BSA재제조(BSA재제조, { 마지막충전일: { $lte: 기준일, $ne: '' }, 공정단계: { $ne: '출하' } }); //석달전보다 더 전에것 조회
  await delay();

  if (BSA재제조_v > 0) tabledata = BSA재제조_v;

  var table_고품정보 = new Tabulator('#grid_재충전정보', {
    layout: 'resizableColumnFit',
    height: 1500,
    data: tabledata,

    columns: [
      { title: '관리번호', field: '관리번호', sorter: 'string' },
      { title: '재제조번호', field: '재제조번호', sorter: 'string' },
      { title: '마지막충전일', field: '마지막충전일', sorter: 'string' },
    ],
  });
}
