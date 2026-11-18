# poen_server_backup

운영 서버(211.34.105.77, 한국IDC) 해지 전, 서버 안에 있던 git 저장소(`/home/poen/data/git`)를 하나로 모아 둔 백업입니다. (2026-11-18)

원래는 저장소 4개가 따로 있었는데, 이 저장소 하나에 **폴더 4개**로 합쳐 넣었습니다. 각 폴더는 원래 저장소의 커밋 기록을 그대로 갖고 있습니다.

## 폴더 구성 (`main` 브랜치)

| 폴더 | 원래 저장소 | 내용 | 커밋 수 |
|---|---|---|---|
| `poen_rhs/` | poen_rhs.git | RHS 재제조 관리 웹 (운영 중이던 프로그램) | 1,043 (+운영서버 변경 1) |
| `poen_doc/` | poen_doc.git | 문서 | 3 |
| `poen_gui/` | poen_gui.git | KCL 재제조 BMS 검사 PC 프로그램 (C#, `KCL_reBMS_Prj.exe`) | 13 |
| `electronic_car/` | electronic_car.git | 22004 글로비스 전기차진단 프로젝트 자료 (문서) | 1 |

## 브랜치 구성

브랜치는 4개이고, **폴더 4개는 전부 `main` 브랜치 안에** 있습니다.

| 브랜치 | 내용 |
|---|---|
| `main` | 폴더 4개 전부 (각 저장소의 master 브랜치) |
| `poen_rhs/carinfo` | poen_rhs 저장소의 carinfo 브랜치 |
| `poen_rhs/debug` | poen_rhs 저장소의 debug 브랜치 |
| `poen_rhs/oversea` | poen_rhs 저장소의 oversea 브랜치 |

- `poen_rhs/...` 브랜치 3개는 poen_rhs에만 있던 곁가지 브랜치를 그대로 보관한 것입니다.
- 이 브랜치들은 폴더 4개 구조가 아니라 **poen_rhs 원래 구조**(`server/`, `www/` ... 가 최상위)로 되어 있습니다. GitHub에서 이 브랜치로 바꾸면 폴더 4개가 아니라 poen_rhs 파일만 보이는데, 정상입니다.
- 나머지 3개 저장소(poen_doc, poen_gui, electronic_car)는 원래 master 브랜치 하나뿐이었습니다.

## 원본과 달라진 점

- poen_rhs 기록에서 예전에 실수로 커밋된 `server/db/`(DB 저널 파일), `server/nohup.out`(서버 로그)을 지웠습니다. 파일 하나가 100MB를 넘어서 GitHub에 올라가지 않기 때문입니다. 코드와 커밋 기록은 그대로이고, 커밋 ID만 원본과 다릅니다.
- `main`의 마지막 커밋은 운영 서버에 커밋 안 된 채로 있던 변경입니다. (`poen_rhs/server/auto_backup_db.sh`: DB 자동백업 간격 30분 → 60분)
- poen_homepage, poen_recycle 저장소는 필요 없어서 넣지 않았습니다.

## git에 없는 것 (따로 백업)

아래는 git에 들어 있지 않아서 따로 보관했습니다.

- 운영 DB (MongoDB poenDB, 사진 포함)
- `poen_rhs/server/excel/` 검사 데이터 (약 3GB)
- 운영 서버 git 원본 6개 (homepage, recycle 포함, 손대지 않은 원본)

---

## poen-itdev 조직으로 옮기는 방법

### 방법 1. 이 저장소를 통째로 옮기기 (가장 간단)

폴더 4개, 브랜치 4개, 커밋 기록이 그대로 옮겨집니다.

1. 이 저장소 GitHub 페이지 → **Settings** → 맨 아래 **Danger Zone** → **Transfer ownership**
2. New owner에 `poen-itdev` 입력 → 저장소 이름 입력해서 확인
3. 옮긴 뒤 주소: `https://github.com/poen-itdev/poen_server_backup`

- poen-itdev 조직에 **저장소 만들기 권한**이 있어야 옮길 수 있습니다. 권한이 없으면 조직 Owner에게 권한을 요청하거나, Owner를 이 저장소에 초대해서 Owner가 옮기면 됩니다.
- 예전 주소(kyoungjin95/...)로 접속해도 GitHub가 새 주소로 자동 연결해 줍니다.

### 방법 2. 원래처럼 저장소 4개로 다시 나눠서 옮기기

폴더 하나를 커밋 기록째 떼어서 새 저장소로 만듭니다.

1. GitHub에서 `poen-itdev` 조직에 빈 저장소 생성 (Private, README 체크 안 함)
   예: `poen_rhs`, `poen_doc`, `poen_gui`, `electronic_car`
2. PC에서 실행:

```bash
git clone git@github.com:kyoungjin95/poen_server_backup.git
cd poen_server_backup

# poen_rhs 폴더만 기록째 떼어내기 → poen_rhs_only 브랜치가 생김 (1~2분 걸림)
git subtree split --prefix=poen_rhs -b poen_rhs_only

# 새 저장소의 master로 올리기
git push git@github.com:poen-itdev/poen_rhs.git poen_rhs_only:master

# poen_rhs의 곁가지 브랜치 3개도 같이 올리기 (이미 원래 구조라 그대로 올리면 됨)
git push git@github.com:poen-itdev/poen_rhs.git \
  origin/poen_rhs/carinfo:refs/heads/carinfo \
  origin/poen_rhs/debug:refs/heads/debug \
  origin/poen_rhs/oversea:refs/heads/oversea
```

다른 폴더도 같은 방식입니다. (곁가지 브랜치는 poen_rhs에만 있습니다)

```bash
git subtree split --prefix=poen_doc -b poen_doc_only
git push git@github.com:poen-itdev/poen_doc.git poen_doc_only:master

git subtree split --prefix=poen_gui -b poen_gui_only
git push git@github.com:poen-itdev/poen_gui.git poen_gui_only:master

git subtree split --prefix=electronic_car -b electronic_car_only
git push git@github.com:poen-itdev/electronic_car.git electronic_car_only:master
```

다 옮긴 뒤 새 저장소 내용을 확인하고, 이 저장소(poen_server_backup)는 지우거나 Archive(읽기 전용) 처리하면 됩니다.
