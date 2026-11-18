async function passwd_change() {
  var _old_passwd = document.getElementById('_old_passwd');
  var _passwd1 = document.getElementById('_passwd1');
  var _passwd2 = document.getElementById('_passwd2');

  if (_passwd1.value != _passwd2.value) {
    alert('패스워드가 서로 다름니다.');
    return;
  }

  //hash 암호화
  const hash_old = CryptoJS.MD5(_old_passwd.value);

  //id와 패스워드가 일치하는 계정이 있는지 확인
  findOne_계정(계정, { id: worker, passwd: hash_old.toString() });
  await delay();

  console.log(계정_v);

  if (계정_v != null) {
    //일치하는 계정이 있다면
    const hash = CryptoJS.MD5(_passwd1.value.trim());

    var doc = {
      id: worker,
      passwd: hash.toString(), //변경된 패스워드 암호
    };

    console.log('hash:', hash.toString());

    update_계정(계정, doc); //계정은 id를 프라이머리키로함
    await delay();

    console.log(update_count);
    console.log(insert_count);

    if (update_count > 0) {
      alert('업데이트 되었습니다');
    }

    if (insert_count > 0) {
      alert('저장 되었습니다');
    }
  } else {
    alert('현재 Password가 틀렷습니다.');
  }
}
