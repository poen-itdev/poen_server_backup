const DELAY = 1;
const 거래확인서 = '거래확인서';
const 제공동의서 = '제공동의서';
const worker = '영업팀_고객';
const level = '작업자';

const 거래확인서_doc = {
  날짜ID: '',
  금액: '',
  성명: '',
  서명성명: '',
  생년월일: '',
  고객_주소: '',
  고객_전화번호: '',
  email: '',
  서명: '',
  제조사: '',
  제조년도: '',
  누적거리: '',
  차량번호: '',
  차대번호: '',
  상호: '',
  수리처_주소: '',
  수리처_전화번호: '',
  year: '',
  month: '',
  day: '',
};

const 거래확인서_ = {
  _id: 0,
  날짜ID: 1,
  금액: 1,
  성명: 1,
  서명성명: 1,
  생년월일: 1,
  고객_주소: 1,
  고객_전화번호: 1,
  email: 1,
  서명: 1,
  제조사: 1,
  제조년도: 1,
  누적거리: 1,
  차량번호: 1,
  차대번호: 1,
  상호: 1,
  수리처_주소: 1,
  수리처_전화번호: 1,
  year: 1,
  month: 1,
  day: 1,
};

const 제공동의서_doc = {
  날짜ID: '',
  ok1: '',
  no1: '',
  ok2: '',
  no2: '',
  year: '',
  month: '',
  day: '',
  성명: '',
  서명: '',
};

const 제공동의서_ = {
  _id: 0,
  날짜ID: 1,
  ok1: 1,
  no1: 1,
  ok2: 1,
  no2: 1,
  year: 1,
  month: 1,
  day: 1,
  성명: 1,
  서명: 1,
};

var doc_count = 0;
var update_count = 0;
var insert_count = 0;
var delete_count = 0;
var insert_id = '';
var find_array = [];
var arregation_array = [];
var flag_arrivedMSG = false;
var check = 0;
var str = '';

const socket = io();
socket.on('connect', function () {
  console.log('connected');
});

socket.on('insert_result', async function (id) {
  insert_id = id;
  flag_arrivedMSG = true;
});

socket.on('count_result', async function (col, count, rcv_check) {
  doc_count = 0;
  doc_count = count;
  flag_arrivedMSG = true;
});

socket.on('find_result', async function (col, result, rcv_check) {
  find_array = [];
  if (rcv_check != check) return;

  find_array = JSON.parse(JSON.stringify(result));

  flag_arrivedMSG = true;
});

socket.on('update_result', async function (result) {
  update_count = 0;
  insert_count = 0;
  if (result == null) return;
  update_count = result.modifiedCount;
  insert_count = result.upsertedCount;

  flag_arrivedMSG = true;
});

socket.on('delete_result', async function (count) {
  console.log('delete result count: ', count);
  delete_count = count;
  flag_arrivedMSG = true;
});

socket.on('disconnect', function () {
  console.log('disconnect');
});

async function count(col, query) {
  if (socket == undefined) return;
  await sleep(DELAY);
  flag_arrivedMSG = false;
  doc_count = 0;
  check++;
  if (check > 10) check = 0;
  socket.emit('count_agree', level, col, query, check);
}

async function insert(col, doc) {
  if (socket == undefined) return;
  await sleep(DELAY);
  flag_arrivedMSG = false;
  socket.emit('insert_agree', worker, col, doc);
}

async function insertMany(col, doc) {
  if (socket == undefined) return;
  flag_arrivedMSG = false;
  socket.emit('insertMany', worker, col, doc);
}

async function update_거래확인서(col, doc) {
  if (socket == undefined) return;
  await sleep(DELAY);

  flag_arrivedMSG = false;
  console.log('worker :', worker);
  console.log('doc :', doc);

  socket.emit('update_agree', worker, col, { 날짜ID: doc.날짜ID }, { $set: doc });
}

async function update_제공동의서(col, doc) {
  if (socket == undefined) return;
  await sleep(DELAY);

  flag_arrivedMSG = false;
  console.log('worker :', worker);
  console.log('doc :', doc);

  socket.emit('update_agree', worker, col, { 날짜ID: doc.날짜ID }, { $set: doc });
}

async function deleteOne(col, 날짜ID) {
  if (socket == undefined) return;
  await sleep(DELAY);
  flag_arrivedMSG = false;
  socket.emit('delete_agree', worker, col, { 날짜ID: 날짜ID });
  console.log('===>', col, 날짜ID);
}

async function find_거래확인서(col, query) {
  if (socket == undefined) return;
  flag_arrivedMSG = false;
  check++;
  if (check > 10) check = 0;

  console.log(worker, col, query, 거래확인서, check);
  socket.emit('find_agree', worker, col, query, { sort: { kind: 1 }, projection: 거래확인서_ }, check);
}

async function find_제공동의서(col, query) {
  if (socket == undefined) return;
  flag_arrivedMSG = false;
  check++;
  if (check > 10) check = 0;

  console.log(worker, col, query, 제공동의서, check);
  socket.emit('find_agree', worker, col, query, { sort: { kind: 1 }, projection: 제공동의서_ }, check);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delay() {
  while (flag_arrivedMSG == false) {
    await sleep(1);
  }
  return true;
}
