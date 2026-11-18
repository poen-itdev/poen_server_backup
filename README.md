# poen_server_backup

운영 서버(211.34.105.77, 한국IDC) 해지 전 `/home/poen/data/git` 저장소 백업 (2026-11-18)

| 폴더 | 내용 |
|---|---|
| poen_rhs | RHS 재제조 관리 웹 (운영) |
| poen_doc | 문서 |
| poen_gui | KCL 재제조 BMS 검사 PC 프로그램 (C#) |
| electronic_car | 22004 글로비스 전기차진단 프로젝트 자료 |

- 각 폴더는 원래 저장소의 커밋 기록을 그대로 포함합니다. 하나만 따로 빼려면: `git subtree split --prefix=poen_rhs -b poen_rhs_only`
- poen_rhs의 다른 브랜치(carinfo, debug, oversea)는 `poen_rhs/<브랜치명>` 브랜치로 보관했습니다.
- poen_rhs 기록에서 예전에 실수로 커밋된 `server/db/`(DB 저널), `server/nohup.out`(로그)은 GitHub 용량 제한 때문에 제거했습니다.
- DB 데이터, server/excel 검사 데이터는 git에 포함되지 않습니다 (별도 백업).
