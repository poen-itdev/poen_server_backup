function loadPage(url) {
  //화면전환 마다 reset
  기초검사_DTC_count = 0;
  EOL_DTC_count = 0;

  const content = document.getElementById('content');

  //화면전환시 타이머 끔
  if (대기수량Timer != undefined) clearInterval(대기수량Timer);
  if (dashboardTimer != undefined) clearInterval(dashboardTimer);

  //child window의 화면만을 바꿈
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(`Failed to load page: ${url}`);
      }
    })
    .then((html) => {
      content.innerHTML = html;
    })
    .catch((error) => {
      console.error(error);
      content.innerHTML = `<p>오류가 발생했습니다. 페이지를 로드할 수 없습니다.</p>`;
    });
}
