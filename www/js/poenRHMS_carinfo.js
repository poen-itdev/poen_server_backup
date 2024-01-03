const DELAY = 1;
const 계정 = "계정";
const 배터리입력 = "배터리입력";

var 계정_v = [];
var 배터리입력_v = [];

var 계정_cnt = 0;
var 배터리입력_cnt = 0;

var qr_code = "";
var 차종 = "";
var worker = "";

var flag_loaded = false;

const 계정_doc = {
  id: "",
  passwd: "",
  이름: "",
  기본정보: "",
};

const 배터리입력_doc = {
  qr_code: "",
  차종: "",
  품번: "",
  ROM_no: "",
  생산일: "",
  방문업체: "",
};

const 계정_ = {
  _id: 0,
  id: 1,
  passwd: 1,
  이름: 1,
  기본정보: 1,
};

const 배터리입력_ = {
  _id: 1,
  qr_code: 1,
  차종: 1,
  품번: 1,
  ROM_no: 1,
  생산일: 1,
  방문업체: 1,
};

var doc_count = 0;
var update_count = 0;
var insert_count = 0;
var delete_count = 0;
var insert_id = "";
var find_array = [];
var arregation_array = [];
var flag_arrivedMSG = false;
var check = 0;
var str = "";

var socket = io();
socket.on("connect", function () {
  console.log("connected");
  loadPage("base/carinfo__login.html");
});

socket.on("qr_lebel_result", function (result) {
  //alert(result);
  if (result == "complete") {
    var a = document.createElement("a");
    a.href = "/qr_label";
    a.download = "EOL_QR_LABEL";

    a.click();
  }
});

socket.on("insert_result", async function (id) {
  //console.log('insert id: ', id);
  insert_id = id;
  flag_arrivedMSG = true;
});

socket.on("count_result", async function (col, count, rcv_check) {
  reset_count();

  console.log("count_result", count);

  if (rcv_check != check) return;
  배터리입력_cnt = count;
  flag_arrivedMSG = true;
});

socket.on("find_result", async function (col, result, rcv_check) {
  find_array = [];
  if (rcv_check != check) return;

  배터리입력_v = JSON.parse(JSON.stringify(result));

  flag_arrivedMSG = true;
});

socket.on("update_result", async function (result) {
  update_count = 0;
  insert_count = 0;
  if (result == null) return;
  //console.log('update result count: ', result.modifiedCount);
  //console.log('insert result count: ', result.upsertedCount);
  update_count = result.modifiedCount;
  insert_count = result.upsertedCount;
  flag_arrivedMSG = true;
});

socket.on("delete_result", async function (count) {
  console.log("delete result count: ", count);
  delete_count = count;
  flag_arrivedMSG = true;
});

socket.on("disconnect", function () {
  console.log("disconnect");
});

function reset_result() {
  배터리입력_v = [];
  find_array = [];
}

function reset_count() {
  배터리입력_cnt = 0;
  doc_count = 0;
}

async function count(col, query) {
  if (socket == undefined) return;
  flag_arrivedMSG = false;
  check++;
  if (check > 10) check = 0;
  socket.emit("count", col, query, check);
}

async function insert(col, doc) {
  if (socket == undefined) return;
  flag_arrivedMSG = false;
  socket.emit("insert", worker, col, doc);
}

async function insertMany(col, doc) {
  if (socket == undefined) return;
  flag_arrivedMSG = false;
  socket.emit("insertMany", worker, col, doc);
}

async function update(col, doc) {
  if (socket == undefined) return;
  flag_arrivedMSG = false;
  socket.emit("update", worker, col, { qr_code: doc.qr_code }, { $set: doc });
}

async function update_계정(col, doc) {
  if (socket == undefined) return;
  flag_arrivedMSG = false;
  socket.emit("update", worker, col, { id: doc.id }, { $set: doc });
}

async function deleteOne(col, qr_code) {
  if (socket == undefined) return;
  flag_arrivedMSG = false;
  socket.emit("delete", worker, col, { qr_code: qr_code });
}

async function deleteOneId(col, id) {
  if (socket == undefined) return;
  flag_arrivedMSG = false;
  socket.emit("delete_by_id", worker, col, id);
}

async function delete_계정(_id) {
  if (socket == undefined) return;
  flag_arrivedMSG = false;
  socket.emit("delete", worker, 계정, { id: _id });
}

async function drop(_col) {
  if (socket == undefined) return;
  flag_arrivedMSG = false;
  socket.emit("drop", worker, _col);
}

async function find(col, qr_code) {
  if (socket == undefined) return;
  flag_arrivedMSG = false;

  console.log("find:", col, qr_code);
  check++;
  if (check > 10) check = 0;

  switch (col) {
    case "배터리입력":
      socket.emit(
        "findOne",
        col,
        { qr_code: qr_code },
        { sort: { kind: 1 }, projection: 배터리입력_ },
        check
      );
      break;

    default:
      console.log("collection name is not match");
  }
}

async function findOne_배터리입력(col, query) {
  if (socket == undefined) return;
  flag_arrivedMSG = false;
  check++;
  if (check > 10) check = 0;

  socket.emit(
    "findOne",
    worker,
    col,
    query,
    { sort: { kind: 1 }, projection: 배터리입력_ },
    check
  );
}

async function findOne_계정(col, query) {
  if (socket == undefined) return;
  flag_arrivedMSG = false;
  check++;
  if (check > 10) check = 0;

  socket.emit(
    "findOne",
    worker,
    col,
    query,
    { sort: { kind: 1 }, projection: 계정_ },
    check
  );
}

async function find_계정(col, query) {
  if (socket == undefined) return;
  flag_arrivedMSG = false;
  check++;
  if (check > 10) check = 0;

  socket.emit(
    "find",
    worker,
    col,
    query,
    { sort: { kind: 1 }, projection: 계정_ },
    check
  );
}

function back() {
  loadPage("base/carinfo__main.html");
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
