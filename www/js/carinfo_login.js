// login
"use strict";

async function login() {
  const userId = document.getElementById("id");
  const userPw = document.getElementById("passwd");
  const loginBtn = document.getElementById("loginBtn");

  console.log(loginBtn);
  const request = {
    id: userId.value,
    password: userPw.value,
  };
  console.log(request);

  if (userId.value == "" || userPw.value == "") return;

  const hash = CryptoJS.MD5(userPw.value);

  findOne_계정(계정, { id: userId.value, passwd: hash.toString() });
  await delay();

  if (계정_v != null) {
    alert("로그인 성공");
    loadPage("base/carinfo__main.html");
  }
}
