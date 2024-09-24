const luxon = require('luxon');
const http = require('http');
const mongo = require('mongodb');
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const HTMLtoDOCX = require('./node_modules/html-to-docx/dist/html-to-docx.umd');
const process = require('process');
const server = http.createServer(app);
const io = require('socket.io')(server, { maxHttpBufferSize: 1e7, pingTimeout: 5000, pingInterval: 10000 });
const { MongoClient } = require('mongodb');
const morgan = require('morgan'); //debug msg
const logger = require('./winston');
const ps = require('ps-node');
const multer = require('multer');
const ration = require('ration.js');
const uri = 'mongodb://poen:poen4upoen4u@localhost:27017/poenDB';
const db_name = 'poenDB';
var no = 1;

const 계정_ = {
  _id: 0,
  id: 1,
  passwd: 1,
  level: 1,
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'excel/tmp');
  },
  filename: function (req, file, cb) {
    if (no > 6) no = 1;
    console.log('file No:', no);
    cb(null, file.fieldname + no + '.csv');
    no++;
  },
});

const upload = multer({ storage: storage });

const rations = {
  maxRequestsPerTimeFrame: 600,
  timeFrameInSeconds: 30,
  removeRecordsAfter: 1000 * 60,
  dropConnections: false,
};
ration.setRations(rations);

var db;
var 관리번호 = '';
var client;
var _lastest_제제조번호 = '';
var _old_year = '2023';

const 자재입출고_ = {
  _id: 0,
  QR: 1,
  날짜: 1,
  구분: 1,
  차종: 1,
  품명: 1,
  품번: 1,
  단가: 1,
  수량: 1,
  LotNo: 1,
  비고: 1,
  사용관리번호: 1,
};

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, '../')));
app.use('/base', express.static(path.join(__dirname, '../www')));
app.use('/excel', express.static(path.join(__dirname, './excel')));
app.use(express.json());
app.use(express.urlencoded());
app.use(ration.startRations);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../www/index.html'));
});

app.get('/apk', (req, res) => {
  res.sendFile(path.join(__dirname, '../app/poen_rhs.apk'));
});

app.get('/manual', (req, res) => {
  res.sendFile(path.join(__dirname, '../doc/RHMS_Manual.pdf'));
});

app.get('/qr_label', (req, res) => {
  res.sendFile(path.join(__dirname, '../doc/qr_label.docx'));
});

app.get('/tesseract', (req, res) => {
  res.sendFile(path.join(__dirname, '../www/tesseract_ocr.html'));
});

app.get('/agreement', (req, res) => {
  res.sendFile(path.join(__dirname, '../www/agreement.html'));
});

app.get('/introduction', (req, res) => {
	res.sendFile(path.join(__dirname, '../www/introduction.html'));
});

app.get('/confirm_doc', (req, res) => {
  res.sendFile(path.join(__dirname, '../www/거래확인서.html'));
});

app.get('/confirm_doc_search', (req, res) => {
  res.sendFile(path.join(__dirname, '../www/거래확인서조회.html'));
});

app.get('/agreement_doc', (req, res) => {
  res.sendFile(path.join(__dirname, '../www/제공동의서.html'));
});

app.get('/agreement_doc_search', (req, res) => {
  res.sendFile(path.join(__dirname, '../www/제공동의서조회.html'));
});

app.post('/upload_excel', upload.array('excel', 6), (req, res, next) => {
  console.log('upload excel OK');
  res.send(200);
});

client = new MongoClient(uri);

server.listen(80, () => {
  console.log('listening on *:80');
});

io.on('connection', async function (socket) {
  var id = '';
  var passwd = '';
  var login = false;
  var client_ip = socket.request.connection.remoteAddress;
  var idx = client_ip.lastIndexOf(':');
  if (~idx && ~client_ip.indexOf('.')) client_ip = client_ip.slice(idx + 1);

  console.log('connected ip', client_ip);

  socket.on('용량평가', async function (path) {
    console.log('용량평가 path:', path);

    var data = 용량평가(path);
    if (data == null || data == undefined) return;

    var old_type = '';
    var old_dischargecap = 0.0;
    data = data.replace(/\(Ah\)/g, '');
    data = JSON.parse(data);
    //console.log('read 용량평가:', data);
    for (var i = 0; i < data.length; i++) {
      //console.log(data[i]);
      if (data[i].StepType == 'REST' && old_type == 'DISCHARGE') {
        break;
      }
      old_type = data[i].StepType;
      if (data[i].DischargeCap != undefined) old_dischargecap = data[i].DischargeCap;
    }

    console.log('용량평가:', old_dischargecap);
    socket.timeout(2000).emit('용량평가_result', Number(old_dischargecap));
  });

  socket.on('SOC60Percent', async function (path) {
    console.log('SOC60Percent path:', path);

    var data = SOC60Percent(path);
    if (data == null || data == undefined) return;
    data = data.replace(/\(V\)/g, '');
    data = JSON.parse(data);

    var last = data[data.length - 2];
    var last_volt = last.Volt;

    console.log(last);
    console.log(last_volt);
    socket.timeout(2000).emit('SOC60Percent_result', last_volt);
  });

  socket.on('DCIR', async function (path) {
    console.log('DCIR path:', path);
    var data = DCIR(path);
    //console.log(data);
    if (data == null || data == undefined) return;
    //data = data.replace(/ȧ��\)/g, '');
    data = JSON.parse(data);

    var old_DCIR = 0;
    var DCIR1 = 0;
    var DCIR2 = 0;
    var DCIR3 = 0;
    var DCIR4 = 0;
    var DCIR5 = 0;
    var DCIR6 = 0;

    var vol1 = 0;
    var vol2 = 0;
    var vol3 = 0;
    var vol4 = 0;
    var vol5 = 0;
    var vol6 = 0;
    var vol7 = 0;
    var vol8 = 0;
    var vol9 = 0;
    var vol10 = 0;
    var vol11 = 0;
    var vol12 = 0;

    var curr1 = 0;
    var curr2 = 0;
    var curr3 = 0;
    var curr4 = 0;
    var curr5 = 0;
    var curr6 = 0;

    for (var i = 0; i < data.length; i++) {
      if (old_DCIR > 0 && data[i].DCIR == 0) {
        if (DCIR2 == 0) DCIR2 = old_DCIR;
        else if (DCIR4 == 0) DCIR4 = old_DCIR;
        else if (DCIR6 == 0) DCIR6 = old_DCIR;

        if (DCIR6 != 0) break;
      }

      if (old_DCIR < 0 && data[i].DCIR == 0) {
        if (DCIR1 == 0) DCIR1 = old_DCIR;
        else if (DCIR3 == 0) DCIR3 = old_DCIR;
        else if (DCIR5 == 0) DCIR5 = old_DCIR;

        if (DCIR6 != 0) break;
      }

      old_DCIR = data[i].DCIR;
      if (i == data.length - 1) console.log(data[i].DCIR);

      if (i > 1 && data[i - 1].StepType == 'REST' && (data[i].StepType == 'DISCHARGE' || data[i].StepType == 'CHARGE')) {
        if (vol1 == 0) vol1 = data[i - 1].Volt;
        else if (vol3 == 0) vol3 = data[i - 1].Volt;
        else if (vol5 == 0) vol5 = data[i - 1].Volt;
        else if (vol7 == 0) vol7 = data[i - 1].Volt;
        else if (vol9 == 0) vol9 = data[i - 1].Volt;
        else if (vol11 == 0) vol11 = data[i - 1].Volt;
      }

      if ((data[i].StepType == 'DISCHARGE' || data[i].StepType == 'CHARGE') && data[i + 1].StepType == 'REST') {
        if (vol2 == 0) vol2 = data[i].Volt;
        else if (vol4 == 0) vol4 = data[i].Volt;
        else if (vol6 == 0) vol6 = data[i].Volt;
        else if (vol8 == 0) vol8 = data[i].Volt;
        else if (vol10 == 0) vol10 = data[i].Volt;
        else if (vol12 == 0) vol12 = data[i].Volt;

        if (curr1 == 0) curr1 = data[i].Curr;
        else if (curr2 == 0) curr2 = data[i].Curr;
        else if (curr3 == 0) curr3 = data[i].Curr;
        else if (curr4 == 0) curr4 = data[i].Curr;
        else if (curr5 == 0) curr5 = data[i].Curr;
        else if (curr6 == 0) curr6 = data[i].Curr;
      }
    }

    var DCIR_total = (Math.abs(Number(DCIR1)) + Number(DCIR2) + Math.abs(Number(DCIR3)) + Number(DCIR4) + Math.abs(Number(DCIR5)) + Math.abs(Number(DCIR6))) / 6;
    var result = {
      DCIR: Math.abs(DCIR_total),
      DCIR1: Math.abs(DCIR1),
      DCIR2: Math.abs(DCIR2),
      DCIR3: Math.abs(DCIR3),
      DCIR4: Math.abs(DCIR4),
      DCIR5: Math.abs(DCIR5),
      DCIR6: Math.abs(DCIR6),
      VOLT1: Math.abs(vol1),
      VOLT2: Math.abs(vol2),
      VOLT3: Math.abs(vol3),
      VOLT4: Math.abs(vol4),
      VOLT5: Math.abs(vol5),
      VOLT6: Math.abs(vol6),
      VOLT7: Math.abs(vol7),
      VOLT8: Math.abs(vol8),
      VOLT9: Math.abs(vol9),
      VOLT10: Math.abs(vol10),
      VOLT11: Math.abs(vol11),
      VOLT12: Math.abs(vol12),
      CURR1: Math.round(Math.abs(curr1)),
      CURR2: Math.round(Math.abs(curr2)),
      CURR3: Math.round(Math.abs(curr3)),
      CURR4: Math.round(Math.abs(curr4)),
      CURR5: Math.round(Math.abs(curr5)),
      CURR6: Math.round(Math.abs(curr6)),
    };
    socket.timeout(2000).emit('DCIR_result', result);
    console.log(result);
  });

  socket.on('성능검사_data', async function (path) {
    console.log('성능검사 data path:', path);
    var data = 용량평가(path);
    if (data == null || data == undefined) return;
    data = data.replace(/\(V\)/g, '');
    data = data.replace(/\(A\)/g, '');
    data = data.replace(/\(Ah\)/g, '');

    data = JSON.parse(data);

    var data_point = [];
    for (var i = 0; i < data.length; i++) {
      var totTime = Math.floor(Number(data[i].TotTime));
      var tmp = {
        time: totTime,
        volt: data[i].Volt,
        curr: data[i].Curr,
        cap: data[i].Cap,
      };

      if (tmp.time != undefined) {
        data_point.push(tmp);
      }
    }

    socket.timeout(2000).emit('성능검사_data_result', data_point);
    //console.log(data_point);
  });

  socket.on('file_list', async function (list) {
    no = 1;
    console.log('file list');

    const result = file_list(list);

    socket.timeout(2000).emit('file_list_result', result);
    logger.info('file list:' + JSON.stringify(list));
  });

  socket.on('file_list2', async function (list) {
    no = 1;
    console.log('file list');

    const result = file_list2(list);

    socket.timeout(2000).emit('file_list_result', result);
    logger.info('file list:' + JSON.stringify(list));
  });

  socket.on('insert', async function (worker, col, doc) {
    if (login == false || worker != id) {
      socket.timeout(2000).emit('insert_result', 0);
      return;
    }

    console.log('request insert');

    const result = await insert(col, doc);
    socket.timeout(2000).emit('insert_result', result);
    logger.info('worker:' + worker + ' insert col:' + col + 'doc:' + JSON.stringify(doc));
  });

  socket.on('insertMany', async function (worker, col, doc) {
    if (login == false || worker != id) {
      socket.timeout(2000).emit('insert_result', 0);
      return;
    }
    console.log('request insertMany');

    const result = await insertMany(col, doc);
    socket.timeout(2000).emit('insert_result', result);
    logger.info('worker:' + worker + ' insert col:' + col + 'doc:' + JSON.stringify(doc));
  });

  socket.on('count', async function (_level, col, query, check, option = '') {
    if (login == false) {
      socket.timeout(2000).emit('count_result', col, 0, check, option);
      return;
    }
    console.log('request count');
    console.log(col, query, client_ip);
    const cnt = await count(col, query);
    socket.timeout(2000).emit('count_result', col, cnt, check, option);
    //logger.info('worker:'+ worker + ' count col:' + col +'query:'+ JSON.stringify(query));
    //
  });

  socket.on('find', async function (worker, col, query, options, check) {
    if (login == false || worker != id) {
      socket.timeout(2000).emit('find_result', col, null, check);
      return;
    }

    console.log('request find');
    const result_array = await find(col, query, options);
    socket.timeout(2000).emit('find_result', col, result_array, check);
    ////logger.info('worker:'+ worker + ' find col:' + col +'query:'+ JSON.stringify(query));
  });

  socket.on('findOne', async function (worker, col, query, options, check) {
    if (col != '계정' && (login == false || worker != id)) {
      socket.timeout(2000).emit('find_result', col, null, check);
      return;
    }

    console.log('request findOne');
    const result_array = await findOne(col, query, options);
    socket.timeout(2000).emit('find_result', col, result_array, check);

    ////logger.info('worker:'+ worker + ' find col:' + col +'query:'+ JSON.stringify(query));
  });

  socket.on('update', async function (worker, col, filter, doc) {
    if (login == false || worker != id) {
      const result = null;
      socket.timeout(2000).emit('update_result', result);
      return;
    }
    console.log('request update');
    logger.info('client ip:' + client_ip + ' worker:' + worker + ' update col:' + col + 'doc:' + JSON.stringify(doc));

    const result = await update(col, filter, doc);
    socket.timeout(2000).emit('update_result', result);
  });

  socket.on('delete', async function (worker, col, query) {
    if (login == false || worker != id) {
      socket.timeout(2000).emit('delete_result', 0);
    }

    console.log('request delete');
    logger.info('worker:' + worker + ' delete col:' + col + 'query:' + JSON.stringify(query));
    const result_count = await deleteOne(col, query);
    socket.timeout(2000).emit('delete_result', result_count);
  });

  socket.on('count_agree', async function (level, col, query, check, option = '') {
    console.log('request count agree');
    if (col != '제공동의서' && col != '거래확인서') return;
    const cnt = await count(col, query);
    socket.timeout(2000).emit('count_result', col, cnt, check, option);
    //logger.info('worker:'+ worker + ' count col:' + col +'query:'+ JSON.stringify(query));
    //
  });

  socket.on('find_agree', async function (worker, col, query, options, check) {
    console.log('request find agree');
    if (col != '제공동의서' && col != '거래확인서') return;
    const result_array = await find(col, query, options);
    socket.timeout(2000).emit('find_result', col, result_array, check);
    ////logger.info('worker:'+ worker + ' find col:' + col +'query:'+ JSON.stringify(query));
  });

  socket.on('findOne_agree', async function (worker, col, query, options, check) {
    console.log('request findone agree');
    if (col != '제공동의서' && col != '거래확인서') return;
    const result_array = await findOne(col, query, options);
    socket.timeout(2000).emit('find_result', col, result_array, check);
    ////logger.info('worker:'+ worker + ' find col:' + col +'query:'+ JSON.stringify(query));
  });

  socket.on('update_agree', async function (worker, col, filter, doc) {
    console.log('request update agree');
    if (col != '제공동의서' && col != '거래확인서') return;
    logger.info('worker:' + worker + ' update col:' + col + 'doc:' + JSON.stringify(doc));

    const result = await update(col, filter, doc);
    socket.timeout(2000).emit('update_result', result);
  });

  socket.on('delete_agree', async function (worker, col, query) {
    console.log('request delete agree');
    if (col != '제공동의서' && col != '거래확인서') return;
    logger.info('worker:' + worker + ' delete col:' + col + 'query:' + JSON.stringify(query));
    const result_count = await deleteOne(col, query);
    socket.timeout(2000).emit('delete_result', result_count);
  });

  socket.on('delete_by_id', async function (worker, col, id) {
    console.log('request delete by id');
    logger.info('worker:' + worker + ' delete col:' + col);
    console.log('delete:', id);
    const result_count = await deleteOneById(col, id);
    socket.timeout(2000).emit('delete_result', result_count);
  });

  socket.on('drop', async function (worker, col) {
    if (login == false) {
      socket.timeout(2000).emit('drop_result', 'null');
      return;
    }
    console.log('request drop:', col);
    logger.info('worker:' + worker + ' drop col:' + col);
    const result = await drop(col);
    socket.timeout(2000).emit('drop_result', result);
  });

  socket.on('부품정보', async function (start, end) {
    if (login == false) {
      socket.timeout(2000).emit('부품정보_result', 'null');
      return;
    }
    console.log('request 부품정보:', start, end);
    const result = await 부품_info(start, end);
    socket.timeout(2000).emit('부품정보_result', result);
  });

  socket.on('계정정보', async function (_id, _passwd) {
    const result_array = await findOne('계정', { id: _id, passwd: _passwd }, { sort: { kind: 1 }, projection: 계정_ });
    if (result_array != null) {
      id = _id;
      login = true;
    }
  });

  process.on('exit', function (code) {
    console.log('Exit : ', code);
    client.close();
  });
});

var flag_autobackup_db = false;

setInterval(function () {
  ps.lookup({ command: 'bash' }, (err, resultList) => {
    if (err) {
      console.log('Error getting list:', err);
    } else {
      resultList.forEach((process) => {
        if (process.arguments == './auto_backup_db.sh') {
          flag_autobackup_db = true;
        } else {
          flag_autobackup_db = false;
        }
      });

      if (flag_autobackup_db == true) {
        io.sockets.timeout(2000).emit('auto_backup_db_status', true);
      } else if (flag_autobackup_db == false) {
        io.sockets.timeout(2000).emit('auto_backup_db_status', false);
      }
    }
  });
}, 10000);

async function distinct(col, query, field_name) {
  try {
    const database = client.db(db_name);
    const collection = database.collection(col);
    const result_array = await collection.distinct(field_name, query);
    console.log('db: ', db_name, 'collection: ', col, 'query: ', query, 'field name: ', field_name, 'result_array: ', result_array);

    return result_array;
  } catch (err) {
    console.error(err);
    logger.info(err);
    return null;
  } finally {
  }
}

async function insert(col, doc) {
  try {
    const database = client.db(db_name);
    const collection = database.collection(col);
    const result = await collection.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);

    return result.insertedId;
  } catch (err) {
    console.error(err);
    logger.info(err);
    return null;
  } finally {
  }
}

async function insertMany(col, doc) {
  try {
    const database = client.db(db_name);
    const collection = database.collection(col);
    const result = await collection.insertMany(doc);
    //console.log(`A document was inserted with the _id: ${result.insertedId}`);

    return result.insertedId;
  } catch (err) {
    console.error(err);
    logger.info(err);
    return null;
  } finally {
  }
}

async function count(col, query) {
  try {
    const database = client.db(db_name);
    const collection = database.collection(col);
    const cnt = await collection.countDocuments(query);
    //console.log('db: ', db_name, 'collection: ', col, 'count: ', cnt, 'by :', query);
    return cnt;
  } catch (err) {
    console.error(err);
    logger.info(err);
    return 0;
  } finally {
  }
}

/**
 * const options = {
 * 	sort: { kind: 1 },
 * 	projection: { _id: 0, title: 1, content: 1, kind: 1, imbd: 1},
 * }
 */
async function find(col, query, options) {
  try {
    const database = client.db(db_name);
    const collection = database.collection(col);
    const cursor = await collection.find(query, options);
    const result_array = await cursor.toArray();
    //console.log('finded (', col, ':', query, ') :', result_array);
    return result_array;
  } catch (err) {
    console.error(err);
    logger.info(err);
    return null;
  } finally {
  }
}

async function findOne(col, query, options) {
  try {
    const database = client.db(db_name);
    const collection = database.collection(col);
    const result = await collection.findOne(query, options);
    //console.log('finded (', col, ':', query, ') :', result_array);
    return result;
  } catch (err) {
    console.error(err);
    logger.info(err);
    return null;
  } finally {
  }
}

async function drop(col) {
  try {
    const database = client.db(db_name);
    const collection = await database.collection(col);
    const result = await collection.drop(function (err, result) {
      if (err) throw err;
      if (result) console.log(col, 'Collection successfully dropped');
    });
    return result;
  } catch (err) {
    console.error(err);
    logger.info(err);
    return null;
  } finally {
  }
}

async function update(col, filter, updateDoc) {
  try {
    const options = { upsert: true };
    const database = client.db(db_name);
    const collection = await database.collection(col);
    const result = await collection.updateOne(filter, updateDoc, options);
    console.log(`Updated ${result.modifiedCount} documents`);
    console.log(`Inserted ${result.upsertedCount} documents`);
    console.log(updateDoc);
    return result;
  } catch (err) {
    console.error(err);
    logger.info(err);
    return null;
  } finally {
  }
}

async function deleteOneById(col, id) {
  try {
    const database = client.db(db_name);
    const collection = database.collection(col);
    const o_id = new mongo.ObjectId(id);
    const result = await collection.deleteOne({ _id: o_id });
    console.log(`Delete ${result.deletedCount} documents`);
    return result.deletedCount;
  } catch (err) {
    console.error(err);
    logger.info(err);
    return 0;
  } finally {
  }
}

async function deleteOne(col, query) {
  try {
    const database = client.db(db_name);
    const collection = database.collection(col);
    const result = await collection.deleteOne(query);
    console.log(`Delete ${result.deletedCount} documents`);
    console.log(query);
    return result.deletedCount;
  } catch (err) {
    console.error(err);
    logger.info(err);
    return 0;
  } finally {
  }
}

function file_list(list) {
  no = 1;
  try {
    list.관리번호 = list.관리번호.replace('#', '');
    console.log(list);
    if (list.관리번호 != '') {
      var dir = 'excel/' + list.관리번호;

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    } else {
      return false;
    }

    var n = 1;
    if (list.f1 != '') {
      var old_path = 'excel/tmp/excel' + n + '.csv';
      if (fs.existsSync(dir)) {
        var new_path = 'excel/' + list.관리번호 + '/excel1.csv';
        fs.rename(old_path, new_path, function (err) {
          if (err) {
            console.log(err);
            console.log('fail rename');
          } else {
            console.log('successfully rename');
          }
        });
      }
      n++;
    }

    if (list.f2 != '') {
      var old_path = 'excel/tmp/excel' + n + '.csv';
      if (fs.existsSync(dir)) {
        var new_path = 'excel/' + list.관리번호 + '/excel2.csv';
        fs.rename(old_path, new_path, function (err) {
          if (err) {
            console.log(err);
            console.log('fail rename');
          } else {
            console.log('successfully rename');
          }
        });
      }
      n++;
    }

    if (list.f3 != '') {
      var old_path = 'excel/tmp/excel' + n + '.csv';
      if (fs.existsSync(dir)) {
        var new_path = 'excel/' + list.관리번호 + '/excel3.csv';
        fs.rename(old_path, new_path, function (err) {
          if (err) {
            console.log(err);
            console.log('fail rename');
          } else {
            console.log('successfully rename');
          }
        });
      }
      n++;
    }

    if (list.f4 != '') {
      var old_path = 'excel/tmp/excel' + n + '.csv';
      if (fs.existsSync(dir)) {
        var new_path = 'excel/' + list.관리번호 + '/excel4.csv';
        fs.rename(old_path, new_path, function (err) {
          if (err) {
            console.log(err);
            console.log('fail rename');
          } else {
            console.log('successfully rename');
          }
        });
      }
      n++;
    }

    if (list.f5 != '') {
      var old_path = 'excel/tmp/excel' + n + '.csv';
      if (fs.existsSync(dir)) {
        var new_path = 'excel/' + list.관리번호 + '/excel5.csv';
        fs.rename(old_path, new_path, function (err) {
          if (err) {
            console.log(err);
            console.log('fail rename');
          } else {
            console.log('successfully rename');
          }
        });
      }
      n++;
    }

    if (list.f6 != '') {
      var old_path = 'excel/tmp/excel' + n + '.csv';
      if (fs.existsSync(dir)) {
        var new_path = 'excel/' + list.관리번호 + '/excel6.csv';
        fs.rename(old_path, new_path, function (err) {
          if (err) {
            console.log(err);
            console.log('fail rename');
          } else {
            console.log('successfully rename');
          }
        });
      }
    }

    n = 1;

    return true;
  } catch (err) {
    console.log(err);
    return false;
  } finally {
  }
}

function file_list2(list) {
  console.log('test:', list);
  no = 1;
  try {
    list.관리번호 = list.관리번호.replace('#', '');
    console.log(list);
    if (list.관리번호 != '') {
      var dir = 'excel/' + list.관리번호;

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    } else {
      return false;
    }

    var n = 1;
    if (list.f1 != '') {
      var old_path = 'excel/tmp/excel' + n + '.csv';
      if (fs.existsSync(dir)) {
        var new_path = 'excel/' + list.관리번호 + '/DCIR.csv';
        fs.rename(old_path, new_path, function (err) {
          if (err) {
            console.log(err);
            console.log('fail rename');
          }
          console.log('successfully rename');
        });
      }
      n++;
    }

    if (list.f2 != '') {
      var old_path = 'excel/tmp/excel' + n + '.csv';
      if (fs.existsSync(dir)) {
        var new_path = 'excel/' + list.관리번호 + '/용량평가.csv';
        fs.rename(old_path, new_path, function (err) {
          if (err) {
            console.log(err);
            console.log('fail rename');
          }
          console.log('successfully rename');
        });
      }
      n++;
    }

    if (list.f3 != '') {
      var old_path = 'excel/tmp/excel' + n + '.csv';
      if (fs.existsSync(dir)) {
        var new_path = 'excel/' + list.관리번호 + '/진단.png';
        fs.rename(old_path, new_path, function (err) {
          if (err) {
            console.log(err);
            console.log('fail rename');
          }
          console.log('successfully rename');
        });
      }
      n++;
    }

    n = 1;

    return true;
  } catch (err) {
    console.log(err);
    return false;
  } finally {
  }
}

function 용량평가(path) {
  var result = csvFileToJSON(path);
  return result;
}

function SOC60Percent(path) {
  var result = csvFileToJSON(path);
  return result;
}

function DCIR(path) {
  var result = DCIRcsvFileToJSON(path);
  return result;
}

function csvFileToJSON(path) {
  try {
    const file_csv = fs.readFileSync(path);
    const string_csv = file_csv.toString();
    return csvToJSON(string_csv);
  } catch (err) {
    console.log(err);
  } finally {
  }
}

function DCIRcsvFileToJSON(path) {
  try {
    const file_csv = fs.readFileSync(path);
    const string_csv = file_csv.toString();
    return DCIRcsvToJSON(string_csv);
  } catch (err) {
    console.log(err);
  } finally {
  }
}

function csvToJSON(csv_string) {
  try {
    const rows = csv_string.split('\r\n');
    const jsonArray = [];
    const header = rows[0].split(',');
    console.log(header);

    for (let i = 1; i < rows.length; i++) {
      let obj = {};
      let row = rows[i].split(',');

      for (let j = 0; j < header.length; j++) {
        obj[header[j]] = row[j];
      }

      jsonArray.push(obj);
    }

    return JSON.stringify(jsonArray);
  } catch (err) {
    console.log(err);
  } finally {
  }
}

function DCIRcsvToJSON(csv_string) {
  try {
    const rows = csv_string.split('\r\n');
    const jsonArray = [];
    const header = ['Time', 'Channel', 'EndReason', 'LoopCount', 'CycleNo', 'StepNo', 'StepType', 'StepTime', 'TotTime', 'Volt', 'Curr', 'Cap(Ah)', 'TotalCap(Ah)', 'ChargeCap(Ah)', 'DischargeCap(Ah)', 'Watt(W)', 'WH(Wh)', 'TotalWH(Wh)', 'ChargeWH(Wh)', 'DischargeWH', 'DCIR', 'AvgCur(A)'];
    console.log(header);

    for (let i = 1; i < rows.length; i++) {
      let obj = {};
      let row = rows[i].split(',');

      for (let j = 0; j < header.length; j++) {
        obj[header[j]] = row[j];
      }

      jsonArray.push(obj);
    }

    return JSON.stringify(jsonArray);
  } catch (err) {
    console.log(err);
  } finally {
  }
}

async function 부품_info(begin = '', end = '', 구분 = 'all') {
  try {
    var result_array;
    if (begin == '' || end == '') {
      result_array = await find('자재입출고', { QR: { $exists: true } }, { sort: { kind: 1 }, projection: 자재입출고_ });
    } else {
      result_array = await find('자재입출고', { QR: { $exists: true }, 날짜: { $gte: begin, $lte: end } }, { sort: { kind: 1 }, projection: 자재입출고_ });
    }

    if (result_array == null) return;

    var types_list = [];
    var 차종 = [];
    var 품명 = [];
    var counts = [];

    result_array.forEach(async function (info) {
      var 수량 = parseInt(info.수량.replace(/,/g, ''));
      if (types_list.indexOf(info.품번) < 0) {
        types_list.push(info.품번);

        차종.push(info.차종);
        품명.push(info.품명);
        var count = {
          입고: 0,
          출고: 0,
        };

        if (info.구분 == '입고') count.입고 = 수량;
        if (info.구분 == '출고') count.출고 = 수량;

        counts.push(count);
      } else {
        var no = types_list.indexOf(info.품번);
        if (info.구분 == '입고') counts[no].입고 = parseInt(counts[no].입고) + 수량;
        if (info.구분 == '출고') counts[no].출고 = parseInt(counts[no].출고) + 수량;
      }
    });

    var 부품정보 = {
      차종: 차종,
      품명: 품명,
      품번: types_list,
      counts: counts,
    };

    return 부품정보;
  } catch (err) {
    console.log(err);
  } finally {
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
