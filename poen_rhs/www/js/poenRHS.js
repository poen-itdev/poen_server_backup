const DELAY = 1;
const DELAY_SYS = 5000;

//collection name define
const 계정 = '계정';
const BSA재제조 = 'BSA재제조';
const 입고 = '입고';
const 세척 = '세척';
const 기초검사 = '기초검사';
const 성능검사 = '성능검사';
const EOL = 'EOL';
const 출하정보 = '출하정보';
const 분해조립 = '분해조립';
const 신품정보 = '신품정보';
const 고품정보 = '고품정보';
const 특이사항 = '특이사항';
const 교체부품상세1 = '교체부품상세1';
const 교체부품상세2 = '교체부품상세2';
const 교체부품상세3 = '교체부품상세3';
const 교체부품상세4 = '교체부품상세4';
const 교체부품상세5 = '교체부품상세5';
const 교체부품상세6 = '교체부품상세6';
const 교체부품상세7 = '교체부품상세7';
const 교체부품상세8 = '교체부품상세8';
const 교체부품상세9 = '교체부품상세9';
const 교체부품상세10 = '교체부품상세10';
const 자재입출고 = '자재입출고';
const 구장재고 = '구장재고';
const 군포재고 = '군포재고';
const 제주재고 = '제주재고';
const 입고_pic = '입고_pic';
const 세척_pic = '세척_pic';
const 기초검사_pic1 = '기초검사_pic1';
const 기초검사_pic2 = '기초검사_pic2';
const 기초검사_pic3 = '기초검사_pic3';
const 기초검사_pic4 = '기초검사_pic4';
const 분해조립_pic = '분해조립_pic';
const 성능검사_pic = '성능검사_pic';
const EOL_pic = 'EOL_pic';
const EOL_pic1 = 'EOL_pic1';
const EOL_pic2 = 'EOL_pic2';
const EOL_pic3 = 'EOL_pic3';
const 특이사항_pic = '특이사항_pic';
const 출하_pic = '출하_pic';
const 반품입고_pic = '반품입고_pic';
const 재출하_pic = '재출하_pic';
const 완전분해_pic = '완전분해_pic';
const 폐기_pic = '폐기_pic';
const 기초보고서 = '기초보고서';
const 완료보고서 = '완료보고서';
const 부품정보_list = '부품정보_list';
const 구자료 = '구자료';
const 품번 = '품번';
const 창고이동 = '창고이동';
const 변수 = '변수';
const 불량의심부품 = '불량의심부품';
const 분해조립재제조 = '분해조립재제조';
const 분해조립공정대기 = '분해조립공정대기';
const 분해조립폐기자재 = '분해조립폐기자재';

var cmd =''; //최근 실행한 커멘드

//count result
var BSA재제조_cnt = 0;
var 입고_cnt = 0;
var 세척_cnt = 0;
var 기초검사_cnt = 0;
var 성능검사_cnt = 0;
var EOL_cnt = 0;
var 출하정보_cnt = 0;
var 분해조립_cnt = 0;
var 신품정보_cnt = 0;
var 고품정보_cnt = 0;
var 특이사항_cnt = 0;
var 교체부품상세1_cnt = 0;
var 교체부품상세2_cnt = 0;
var 교체부품상세3_cnt = 0;
var 교체부품상세4_cnt = 0;
var 교체부품상세5_cnt = 0;
var 교체부품상세6_cnt = 0;
var 교체부품상세7_cnt = 0;
var 교체부품상세8_cnt = 0;
var 교체부품상세9_cnt = 0;
var 교체부품상세10_cnt = 0;
var 자재입출고_cnt = 0;
var 구장재고_cnt = 0;
var 군포재고_cnt = 0;
var 제주재고_cnt = 0;
var 입고_pic_cnt = 0;
var 세척_pic_cnt = 0;
var 기초검사_pic1_cnt = 0;
var 기초검사_pic2_cnt = 0;
var 기초검사_pic3_cnt = 0;
var 기초검사_pic4_cnt = 0;
var 분해조립_pic_cnt = 0;
var 성능검사_pic_cnt = 0;
var EOL_pic_cnt = 0;
var EOL_pic1_cnt = 0;
var EOL_pic2_cnt = 0;
var EOL_pic3_cnt = 0;
var 특이사항_pic_cnt = 0;
var 출하_pic_cnt = 0;
var 반품입고_pic_cnt = 0;
var 재출하_pic_cnt = 0;
var 완전분해_pic_cnt = 0;
var 폐기_pic_cnt = 0;
var 기초보고서_cnt = 0;
var 완료보고서_cnt = 0;
var 계정_cnt = 0;
var 부품정보_list_cnt = 0;
var 구자료_cnt = 0;
var 품번_cnt = 0;
var 창고이동_cnt = 0;
var 변수_cnt = 0;
var 불량의심부품_cnt = 0;
var 분해조립재제조_cnt = 0;
var 분해조립공정대기_cnt = 0;
var 분해조립폐기자재_cnt = 0;

//count result(dashboard)
var option_입고_cnt = 0;
var option_세척_cnt = 0;
var option_기초검사_cnt = 0;
var option_성능검사_cnt = 0;
var option_EOL_cnt = 0;
var option_출하정보_cnt = 0;
var option_출하_cnt = 0;
var option_입고당일_cnt = 0;
var option_세척당일_cnt = 0;
var option_기초검사당일_cnt = 0;
var option_성능검사당일_cnt = 0;
var option_EOL당일_cnt = 0;
var option_출하정보당일_cnt = 0;
var option_출하당일_cnt = 0;

//find result
var BSA재제조_v = [];
var 입고_v = [];
var 세척_v = [];
var 기초검사_v = [];
var 성능검사_v = [];
var EOL_v = [];
var 출하정보_v = [];
var 분해조립_v = [];
var 신품정보_v = [];
var 고품정보_v = [];
var 특이사항_v = [];
var 교체부품상세1_v = [];
var 교체부품상세2_v = [];
var 교체부품상세3_v = [];
var 교체부품상세4_v = [];
var 교체부품상세5_v = [];
var 교체부품상세6_v = [];
var 교체부품상세7_v = [];
var 교체부품상세8_v = [];
var 교체부품상세9_v = [];
var 교체부품상세10_v = [];
var 자재입출고_v = [];
var 구장재고_v = [];
var 군포재고_v = [];
var 제주재고_v = [];
var 입고_pic_v = [];
var 세척_pic_v = [];
var 기초검사_pic1_v = [];
var 기초검사_pic2_v = [];
var 기초검사_pic3_v = [];
var 기초검사_pic4_v = [];
var 분해조립_pic_v = [];
var 성능검사_pic_v = [];
var EOL_pic_v = [];
var EOL_pic1_v = [];
var EOL_pic2_v = [];
var EOL_pic3_v = [];
var 특이사항_pic_v = [];
var 출하_pic_v = [];
var 반품입고_pic_v = [];
var 재출하_pic_v = [];
var 완전분해_pic_v = [];
var 폐기_pic_v = [];
var 기초보고서_v = [];
var 완료보고서_v = [];
var 부품정보_list_v = [];
var 구자료_v = [];
var 품번_v = [];
var 불량의심부품_v = [];
var 분해조립재제조_v = [];
var 분해조립공정대기_v = [];
var 분해조립폐기자재_v = [];
var find_array = [];

//공정에 쓰이는 변수
var 관리번호 = '';
var 차종 = '';

//조회에 쓰이는 변수
var 교체부품상세No = '교체부품상세1';

//계정정보
var worker = '';
var level = '';

//성능검사 서버에 올린 파일에서 서버가 자료츨 추출해서 보내주는 결과
var 용량평가_result = 0;
var SOC60Persent_result = 0;
var DCIR_result = 0;
var DCIR1_result = 0;
var DCIR2_result = 0;
var DCIR3_result = 0;
var DCIR4_result = 0;
var DCIR5_result = 0;
var DCIR6_result = 0;
var VOLT1_result = 0;
var VOLT2_result = 0;
var VOLT3_result = 0;
var VOLT4_result = 0;
var VOLT5_result = 0;
var VOLT6_result = 0;
var VOLT7_result = 0;
var VOLT8_result = 0;
var VOLT9_result = 0;
var VOLT10_result = 0;
var VOLT11_result = 0;
var VOLT12_result = 0;
var CURR1_result = 0;
var CURR2_result = 0;
var CURR3_result = 0;
var CURR4_result = 0;
var CURR5_result = 0;
var CURR6_result = 0;
var 성능검사_data_result = [];
var delete_성능검사_data_result = false;

//엑셀 파일 업로드시 파일을 여러번 로딩하는 현상 막기위한 플레그
var flag_loaded = false;

//document define
const 계정_doc = {
	id: '',
	passwd: '',
	level: '',
	이름: '',
	기본정보: '',
	입고: '',
	세척: '',
	기초검사: '',
	분해조립: '',
	성능검사: '',
	EOL: '',
	출하검사: '',
	부품재고: '',
	완료일수정: '',
	관리번호: '',
};

const 구자료_doc = {
	품번: '',
	품명: '',
	수량: '',
	공급가액: '',
	부가세: '',
	합계: '',
	평균단가: '',
};

const BSA재제조_doc = {
	관리번호: '',
	재제조번호: '',
	구분: '',
	차종: '',
	품번: '',
	RO_no: '',
	공정단계: '',
	적재No: '',
	입고: '',
	제조투입: '',
	세척투입일: '',
	세척: '',
	기초검사투입일: '',
	기초검사: '',
	분해조립투입일: '',
	분해조립: '',
	성능검사투입일: '',
	성능검사: '',
	EOL투입일: '',
	EOL: '',
	QR_Label: '',
	출하검사: '',
	납품처: '',
	출하: '',
	소재지: '',
	소재지사유: '',
	마지막충전일: '',
	반품입고: '',
	재출하: '',
	완전분해: '',
	완전분해사유: '',
	폐기: '',
	폐기사유: '',
	출하예약: '',
	렉번호: '',
};

const 입고_doc = {
	관리번호: '',
	입고일: '',
	입고처: '',
	구분: '',
	차종: '',
	품번: '',
	RO_no: '',
	보관위치: '',
};

const 세척_doc = {
	관리번호: '',
	재제조번호: '',
	공정입고일: '',
	공정완료일: '',
	어퍼케이스재사용가능: '',
	기밀검사_케이스: '',
	기밀검사_케이스_특이사항: '',
	육안검사_외부: '',
	육안검사_외부_특이사항: '',
	특이사항: '',
	구분: '',
	차종: '',
	품번: '',
	RO_no: '',
};

const 기초검사_doc = {
	관리번호: '',
	공정입고일: '',
	재제조번호: '',
	RO_no: '',
	VIN: '',
	랙번호: '',
	QRCode: '',
	주행거리: '',
	차량번호: '',
	육안검사_내부: '',
	육안검사_내부_특이사항: '',
	기밀검사_냉각유로: '',
	기밀검사_냉각유로_특이사항: '',
	절연검사_Plus: '',
	절연검사_Plus판정: '',
	절연검사_Minus: '',
	절연검사_Minus판정: '',
	센서데이터진단: '',
	센서데이터진단_판정: '',
	통신검사_DTC코드1: '',
	통신검사_DTC코드1판정: '',
	통신검사_DTC코드2: '',
	통신검사_DTC코드2판정: '',
	통신검사_DTC코드3: '',
	통신검사_DTC코드3판정: '',
	통신검사_DTC코드4: '',
	통신검사_DTC코드4판정: '',
	통신검사_DTC코드5: '',
	통신검사_DTC코드5판정: '',
	통신검사_DTC코드6: '',
	통신검사_DTC코드6판정: '',
	통신검사_DTC코드7: '',
	통신검사_DTC코드7판정: '',
	통신검사_DTC코드8: '',
	통신검사_DTC코드8판정: '',
	통신검사_DTC코드9: '',
	통신검사_DTC코드9판정: '',
	통신검사_DTC코드10: '',
	통신검사_DTC코드10판정: '',
	통신검사_팩전압: '',
	통신검사_팩전압판정: '',
	통신검사_셀전압편차: '',
	통신검사_셀전압편차판정: '',
	통신검사_릴레이구동: '',
	통신검사_릴레이구동사유: '',
	BSA생산일자: '',
	BSA판매일자: '',
	BSA수리일자: '',
	BMA_ROM_ID: '',
	고장현상코드: '',
	고장현상명: '',
	문제Cell_No: '',
	문제BMA_No: '', //-
	문제BMA_cnt: '', //-
	공정완료일: '', //-
	분석결과: '',
	비고: '',
	센터진단내용: '',
	검사자: '',
	필드현상: '',
	AS센터조치: '',
	구분: '',
	차종: '',
	품번: '',
};

const 분해조립_doc = {
	관리번호: '',
	공정입고일: '',
	재제조번호: '',
	BMU1: '',
	BMU2: '',
	BMU3: '',
	BMU4: '',
	BMU5: '',
	BMU6: '',
	BMU7: '',
	BMU8: '',
	BMU9: '',
	BMU10: '',
	CMU1: '',
	CMU2: '',
	CMU3: '',
	CMU4: '',
	CMU5: '',
	CMU6: '',
	CMU7: '',
	CMU8: '',
	CMU9: '',
	CMU10: '',
	PRA1: '',
	PRA2: '',
	PRA3: '',
	PRA4: '',
	PRA5: '',
	PRA6: '',
	PRA7: '',
	PRA8: '',
	PRA9: '',
	PRA10: '',
	SPA1: '',
	SPA2: '',
	SPA3: '',
	SPA4: '',
	SPA5: '',
	SPA6: '',
	SPA7: '',
	SPA8: '',
	SPA9: '',
	SPA10: '',
	LWR_C1: '',
	LWR_C2: '',
	LWR_C3: '',
	LWR_C4: '',
	LWR_C5: '',
	LWR_C6: '',
	LWR_C7: '',
	LWR_C8: '',
	LWR_C9: '',
	LWR_C10: '',
	UPR_C1: '',
	UPR_C2: '',
	UPR_C3: '',
	UPR_C4: '',
	UPR_C5: '',
	UPR_C6: '',
	UPR_C7: '',
	UPR_C8: '',
	UPR_C9: '',
	UPR_C10: '',
	PBE: '',
	Gasket: '',
	Relay1: '',
	Relay2: '',
	Relay3: '',
	Relay4: '',
	Relay5: '',
	Relay6: '',
	Relay7: '',
	Relay8: '',
	Relay9: '',
	Relay10: '',
	HV_CNTR1: '',
	HV_CNTR2: '',
	HV_CNTR3: '',
	HV_CNTR4: '',
	HV_CNTR5: '',
	HV_CNTR6: '',
	HV_CNTR7: '',
	HV_CNTR8: '',
	HV_CNTR9: '',
	HV_CNTR10: '',
	Heating_CNTR1: '',
	Heating_CNTR2: '',
	Heating_CNTR3: '',
	Heating_CNTR4: '',
	Heating_CNTR5: '',
	Heating_CNTR6: '',
	Heating_CNTR7: '',
	Heating_CNTR8: '',
	Heating_CNTR9: '',
	Heating_CNTR10: '',
	FuseBox1: '',
	FuseBox2: '',
	FuseBox3: '',
	FuseBox4: '',
	FuseBox5: '',
	FuseBox6: '',
	FuseBox7: '',
	FuseBox8: '',
	FuseBox9: '',
	FuseBox10: '',
	LV_W_H1: '',
	LV_W_H2: '',
	LV_W_H3: '',
	LV_W_H4: '',
	LV_W_H5: '',
	LV_W_H6: '',
	LV_W_H7: '',
	LV_W_H8: '',
	LV_W_H9: '',
	LV_W_H10: '',
	HV_W_H1: '',
	HV_W_H2: '',
	HV_W_H3: '',
	HV_W_H4: '',
	HV_W_H5: '',
	HV_W_H6: '',
	HV_W_H7: '',
	HV_W_H8: '',
	HV_W_H9: '',
	HV_W_H10: '',
	온도센서1: '',
	온도센서2: '',
	온도센서3: '',
	온도센서4: '',
	온도센서5: '',
	온도센서6: '',
	온도센서7: '',
	온도센서8: '',
	온도센서9: '',
	온도센서10: '',
	Busbars: '',
	BMA1: '',
	BMA2: '',
	BMA3: '',
	BMA4: '',
	BMA5: '',
	BMA6: '',
	BMA7: '',
	BMA8: '',
	BMA9: '',
	BMA10: '',
	BMU1_2: '',
	BMU2_2: '',
	BMU3_2: '',
	BMU4_2: '',
	BMU5_2: '',
	BMU6_2: '',
	BMU7_2: '',
	BMU8_2: '',
	BMU9_2: '',
	BMU10_2: '',
	CMU1_2: '',
	CMU2_2: '',
	CMU3_2: '',
	CMU4_2: '',
	CMU5_2: '',
	CMU6_2: '',
	CMU7_2: '',
	CMU8_2: '',
	CMU9_2: '',
	CMU10_2: '',
	PRA1_2: '',
	PRA2_2: '',
	PRA3_2: '',
	PRA4_2: '',
	PRA5_2: '',
	PRA6_2: '',
	PRA7_2: '',
	PRA8_2: '',
	PRA9_2: '',
	PRA10_2: '',
	SPA1_2: '',
	SPA2_2: '',
	SPA3_2: '',
	SPA4_2: '',
	SPA5_2: '',
	SPA6_2: '',
	SPA7_2: '',
	SPA8_2: '',
	SPA9_2: '',
	SPA10_2: '',
	LWR_C1_2: '',
	LWR_C2_2: '',
	LWR_C3_2: '',
	LWR_C4_2: '',
	LWR_C5_2: '',
	LWR_C6_2: '',
	LWR_C7_2: '',
	LWR_C8_2: '',
	LWR_C9_2: '',
	LWR_C10_2: '',
	UPR_C1_2: '',
	UPR_C2_2: '',
	UPR_C3_2: '',
	UPR_C4_2: '',
	UPR_C5_2: '',
	UPR_C6_2: '',
	UPR_C7_2: '',
	UPR_C8_2: '',
	UPR_C9_2: '',
	UPR_C10_2: '',
	PBE_2: '',
	Gasket_2: '',
	Relay1_2: '',
	Relay2_2: '',
	Relay3_2: '',
	Relay4_2: '',
	Relay5_2: '',
	Relay6_2: '',
	Relay7_2: '',
	Relay8_2: '',
	Relay9_2: '',
	Relay10_2: '',
	HV_CNTR1_2: '',
	HV_CNTR2_2: '',
	HV_CNTR3_2: '',
	HV_CNTR4_2: '',
	HV_CNTR5_2: '',
	HV_CNTR6_2: '',
	HV_CNTR7_2: '',
	HV_CNTR8_2: '',
	HV_CNTR9_2: '',
	HV_CNTR10_2: '',
	Heating_CNTR1_2: '',
	Heating_CNTR2_2: '',
	Heating_CNTR3_2: '',
	Heating_CNTR4_2: '',
	Heating_CNTR5_2: '',
	Heating_CNTR6_2: '',
	Heating_CNTR7_2: '',
	Heating_CNTR8_2: '',
	Heating_CNTR9_2: '',
	Heating_CNTR10_2: '',
	FuseBox1_2: '',
	FuseBox2_2: '',
	FuseBox3_2: '',
	FuseBox4_2: '',
	FuseBox5_2: '',
	FuseBox6_2: '',
	FuseBox7_2: '',
	FuseBox8_2: '',
	FuseBox9_2: '',
	FuseBox10_2: '',
	LV_W_H1_2: '',
	LV_W_H2_2: '',
	LV_W_H3_2: '',
	LV_W_H4_2: '',
	LV_W_H5_2: '',
	LV_W_H6_2: '',
	LV_W_H7_2: '',
	LV_W_H8_2: '',
	LV_W_H9_2: '',
	LV_W_H10_2: '',
	HV_W_H1_2: '',
	HV_W_H2_2: '',
	HV_W_H3_2: '',
	HV_W_H4_2: '',
	HV_W_H5_2: '',
	HV_W_H6_2: '',
	HV_W_H7_2: '',
	HV_W_H8_2: '',
	HV_W_H9_2: '',
	HV_W_H10_2: '',
	온도센서1_2: '',
	온도센서2_2: '',
	온도센서3_2: '',
	온도센서4_2: '',
	온도센서5_2: '',
	온도센서6_2: '',
	온도센서7_2: '',
	온도센서8_2: '',
	온도센서9_2: '',
	온도센서10_2: '',
	Busbars_2: '',
	BMA1_2: '',
	BMA2_2: '',
	BMA3_2: '',
	BMA4_2: '',
	BMA5_2: '',
	BMA6_2: '',
	BMA7_2: '',
	BMA8_2: '',
	BMA9_2: '',
	BMA10_2: '',
	ETC: '',
	공정완료일: '',
	작업자: '',
	구분: '',
	차종: '',
	품번: '',
	RO_no: '',
};

const 분해조립재제조_doc = {
	관리번호: '',
	품명: '',
	교체전품번: '',
	교체전QR: '',
	신품고품: '',
	고품식별: '',
	교체후품번: '',
	교체후QR: '',
	교체사유: '',
	공정입고일: '',
	공정완료일: '',
	작성자: '',
};

const 분해조립공정대기_doc = {
	관리번호: '',
	품명: '',
	품번: '',
	QR: '',
	대기사유: '',
};

const 분해조립폐기자재_doc = {
	관리번호: '',
	품명: '',
	품번: '',
	QR: '',
	폐기사유: '',
};

const 성능검사_doc = {
	관리번호: '',
	공정입고일: '',
	재제조번호: '',
	용량평가: '',
	SOC60Percent: '',
	DCIR: '',
	DCIR_Charge1: '',
	DCIR_Charge2: '',
	DCIR_Charge3: '',
	DCIR_Charge4: '',
	DCIR_Charge5: '',
	DCIR_Charge6: '',
	VOLT1: '',
	VOLT2: '',
	VOLT3: '',
	VOLT4: '',
	VOLT5: '',
	VOLT6: '',
	VOLT7: '',
	VOLT8: '',
	VOLT9: '',
	VOLT10: '',
	VOLT11: '',
	VOLT12: '',
	CURR1: '',
	CURR2: '',
	CURR3: '',
	CURR4: '',
	CURR5: '',
	CURR6: '',
	분해조립_재의뢰사유: '',
	공정완료일: '',
	비고: '',
	검사자: '',
	f1: '',
	f2: '',
	f3: '',
	f4: '',
	f5: '',
	f6: '',
	구분: '',
	차종: '',
	품번: '',
	RO_no: '',
	chart: '',
};

const EOL_doc = {
	관리번호: '',
	공정입고일: '',
	QR기본: '',
	UPR_C조립: '',
	UPR_C조립_특이사항: '',
	기밀검사_케이스: '',
	기밀검사_케이스_특이사항: '',
	기밀검사_냉각유로: '',
	기밀검사_냉각유로_특이사항: '',
	절연검사_Plus: '',
	절연검사_Plus_특이사항: '',
	절연검사_Minus: '',
	절연검사_Minus_특이사항: '',
	절연저항_HVP: '',
	절연저항_HVP_특이사항: '',
	절연저항_HVN: '',
	절연저항_HVN_특이사항: '',
	통신검사_DTC코드1: '',
	통신검사_DTC코드2: '',
	통신검사_DTC코드3: '',
	통신검사_DTC코드4: '',
	통신검사_DTC코드5: '',
	통신검사_DTC코드6: '',
	통신검사_DTC코드7: '',
	통신검사_DTC코드8: '',
	통신검사_DTC코드9: '',
	통신검사_DTC코드10: '',
	통신검사_팩전압: '',
	통신검사_팩전압_특이사항: '',
	통신검사_셀전압편차: '',
	통신검사_셀전압편차_특이사항: '',
	통신검사_릴레이구동: '',
	통신검사_릴레이구동_특이사항: '',
	공정완료일: '',
	비고: '',
	분해조립_재의뢰사유: '',
	QR: '',
	검사자: '',
	UPR_C조립: '',
	UPR_C조립_특이사항: '',
	통신검사_셀전압MAX: '',
	통신검사_셀전압MIN: '',
	고장코드유무: '',
	EOL항목검사: '',
	커버류: '',
	브라켓: '',
	ICUU: '',
	교체부품명: '',
	공정흐름_이슈: '',
	용량평가값: '',
	절연저항_Plus: '',
	절연저항_Minus: '',
	육안검사_외부: '',
	육안검사_내부: '',
	구분: '',
	차종: '',
	품번: '',
	RO_no: '',
};

const 고품정보_doc = {
	관리번호: '',
	재제조번호: '',
	품명: '',
	구분: '',
	품번: '',
	번호: '',
	QR: '',
	폐기여부: '',
	사용여부: '',
	사용_관리번호: '',
	등록일: '',
	사용일: '',
	등록_작업자: '',
	사용_작업자: '',
	폐기품출고: '',
};

const 출하정보_doc = {
	관리번호: '',
	출하코드: '',
	검사일: '',
	검사자: '',
	기초보고서_작성확인: '',
	완료보고서_작성확인: '',
	클린상태: '',
	팔레트_적정위치: '',
	포장랩상태: '',
	UPR_QR: '',
	LWR_QR: '',
	HKMC_스티커_URP: '',
	냉각유로_커버: '',
	브라켓: '',
	브라켓_비고: '',
	S_PLUG: '',
	S_PLUG_비고: '',
	접지: '',
	접지_비고: '',
	DTC: '',
	DTC_현재: '',
	DTC_과거: '',
	배터리충전상태: '',
	배터리충전상태_측정값: '',
	BMS고장NO: '',
	BMS융착NO: '',
	배터리팩전압: '',
	배터리팩_측정값: '',
	배터리모듈온도: '',
	배터리모듈온도_최대: '',
	배터리모듈온도_최소: '',
	배터리셀전압: '',
	배터리셀전압_최대: '',
	배터리셀전압_최소: '',
	셀전압편차: '',
	셀전압편차_측정값: '',
	절연저항: '',
	절연저항_측정값: '',
	SOH: '',
	릴레이_강제구동: '',
	커넥터_체결검사: '',
	재제조번호: '',
	구분: '',
	차종: '',
	품번: '',
	RO_no: '',
};

const 특이사항_doc = {
	관리번호: '',
	특이사항: '',
	재제조번호: '',
	구분: '',
	차종: '',
	품번: '',
	RO_no: '',
};

const 교체부품상세_doc = {
	관리번호: '',
	공정입고일: '',
	ORIGIN_관리번호: '',
	교체전_품명: '',
	교체전_품번: '',
	교체전_QR: '',
	교체후_신품_고품: '',
	교체후_고품식별: '',
	교체후_품번: '',
	교체후_QR: '',
	교체사유: '',
	재제조번호: '',
	구분: '',
	차종: '',
	품번: '',
	RO_no: '',
};

const 구장재고_doc = {
	입고일: '',
	입고처: '',
	관리번호: '',
	재제조번호: '',
	RO번호: '',
	부품번호: '',
	생산연도: '',
	ROM_ID: '',
	보관위치: '',
	제조완료: '',
	출고일: '',
	출고처: '',
	비고: '',
};

const 군포재고_doc = {
	입고일: '',
	입고처: '',
	관리번호: '',
	재제조번호: '',
	RO번호: '',
	부품번호: '',
	생산연도: '',
	ROM_ID: '',
	보관위치: '',
	제조완료: '',
	출고일: '',
	출고처: '',
	비고: '',
};

const 제주재고_doc = {
	입고일: '',
	입고처: '',
	관리번호: '',
	재제조번호: '',
	RO번호: '',
	부품번호: '',
	생산연도: '',
	ROM_ID: '',
	보관위치: '',
	제조완료: '',
	출고일: '',
	출고처: '',
	비고: '',
};

const 창고이동_doc = {
	관리번호: '',
	재제조번호: '',
	이동경로: '',
};

const 입고_pic_doc = {
	관리번호: '',
	pic1: '',
	pic2: '',
	pic3: '',
	pic4: '',
	pic5: '',
	pic6: '',
	pic7: '',
	pic8: '',
	pic9: '',
	pic10: '',
	pic11: '',
	pic12: '',
	pic13: '',
	pic14: '',
	pic15: '',
	pic16: '',
	pic17: '',
	pic18: '',
	pic19: '',
	pic20: '',
	pic21: '',
	pic22: '',
	pic23: '',
	pic24: '',
	pic25: '',
	pic26: '',
	pic27: '',
	pic28: '',
	pic29: '',
	pic30: '',
};

const 세척_pic_doc = {
	관리번호: '',
	pic1: '',
	pic2: '',
	pic3: '',
	pic4: '',
	pic5: '',
	pic6: '',
	pic7: '',
	pic8: '',
	pic9: '',
	pic10: '',
	pic11: '',
	pic12: '',
	pic13: '',
	pic14: '',
	pic15: '',
	pic16: '',
	pic17: '',
	pic18: '',
	pic19: '',
	pic20: '',
	pic21: '',
	pic22: '',
	pic23: '',
	pic24: '',
	pic25: '',
	pic26: '',
	pic27: '',
	pic28: '',
	pic29: '',
	pic30: '',
};

const 기초검사_pic1_doc = {
	관리번호: '',
	pic1: '',
	pic2: '',
	pic3: '',
	pic4: '',
	pic5: '',
	pic6: '',
	pic7: '',
	pic8: '',
	pic9: '',
	pic10: '',
};

const 기초검사_pic2_doc = {
	관리번호: '',
	pic1: '',
	pic2: '',
	pic3: '',
	pic4: '',
	pic5: '',
	pic6: '',
	pic7: '',
	pic8: '',
	pic9: '',
	pic10: '',
};

const 기초검사_pic3_doc = {
	관리번호: '',
	pic1: '',
	pic2: '',
	pic3: '',
	pic4: '',
	pic5: '',
	pic6: '',
	pic7: '',
	pic8: '',
	pic9: '',
	pic10: '',
};

const 기초검사_pic4_doc = {
	관리번호: '',
	pic1: '',
	pic2: '',
	pic3: '',
	pic4: '',
	pic5: '',
	pic6: '',
	pic7: '',
	pic8: '',
	pic9: '',
	pic10: '',
};

const 분해조립_pic_doc = {
	관리번호: '',
	pic1: '',
	pic2: '',
	pic3: '',
	pic4: '',
	pic5: '',
	pic6: '',
	pic7: '',
	pic8: '',
	pic9: '',
	pic10: '',
	pic11: '',
	pic12: '',
	pic13: '',
	pic14: '',
	pic15: '',
	pic16: '',
	pic17: '',
	pic18: '',
	pic19: '',
	pic20: '',
	pic21: '',
	pic22: '',
	pic23: '',
	pic24: '',
	pic25: '',
	pic26: '',
	pic27: '',
	pic28: '',
	pic29: '',
	pic30: '',
};

const 성능검사_pic_doc = {
	관리번호: '',
	pic1: '',
	pic2: '',
	pic3: '',
	pic4: '',
	pic5: '',
	pic6: '',
	pic7: '',
	pic8: '',
	pic9: '',
	pic10: '',
	pic11: '',
	pic12: '',
	pic13: '',
	pic14: '',
	pic15: '',
	pic16: '',
	pic17: '',
	pic18: '',
	pic19: '',
	pic20: '',
	pic21: '',
	pic22: '',
	pic23: '',
	pic24: '',
	pic25: '',
	pic26: '',
	pic27: '',
	pic28: '',
	pic29: '',
	pic30: '',
};

const EOL_pic_doc = {
	관리번호: '',
	pic1: '',
	pic2: '',
	pic3: '',
	pic4: '',
	pic5: '',
	pic6: '',
	pic7: '',
	pic8: '',
	pic9: '',
	pic10: '',
	pic11: '',
	pic12: '',
	pic13: '',
	pic14: '',
	pic15: '',
	pic16: '',
	pic17: '',
	pic18: '',
	pic19: '',
	pic20: '',
	pic21: '',
	pic22: '',
	pic23: '',
	pic24: '',
	pic25: '',
	pic26: '',
	pic27: '',
	pic28: '',
	pic29: '',
	pic30: '',
};

const EOL_pic1_doc = {
	관리번호: '',
	pic1: '',
	pic2: '',
	pic3: '',
	pic4: '',
	pic5: '',
	pic6: '',
	pic7: '',
	pic8: '',
	pic9: '',
	pic10: '',
	pic11: '',
	pic12: '',
	pic13: '',
	pic14: '',
	pic15: '',
	pic16: '',
	pic17: '',
	pic18: '',
	pic19: '',
	pic20: '',
	pic21: '',
	pic22: '',
	pic23: '',
	pic24: '',
	pic25: '',
	pic26: '',
	pic27: '',
	pic28: '',
	pic29: '',
	pic30: '',
};

const EOL_pic2_doc = {
	관리번호: '',
	pic1: '',
	pic2: '',
	pic3: '',
	pic4: '',
	pic5: '',
	pic6: '',
	pic7: '',
	pic8: '',
	pic9: '',
	pic10: '',
	pic11: '',
	pic12: '',
	pic13: '',
	pic14: '',
	pic15: '',
	pic16: '',
	pic17: '',
	pic18: '',
	pic19: '',
	pic20: '',
	pic21: '',
	pic22: '',
	pic23: '',
	pic24: '',
	pic25: '',
	pic26: '',
	pic27: '',
	pic28: '',
	pic29: '',
	pic30: '',
};

const EOL_pic3_doc = {
	관리번호: '',
	pic1: '',
	pic2: '',
	pic3: '',
	pic4: '',
	pic5: '',
	pic6: '',
	pic7: '',
	pic8: '',
	pic9: '',
	pic10: '',
	pic11: '',
	pic12: '',
	pic13: '',
	pic14: '',
	pic15: '',
	pic16: '',
	pic17: '',
	pic18: '',
	pic19: '',
	pic20: '',
	pic21: '',
	pic22: '',
	pic23: '',
	pic24: '',
	pic25: '',
	pic26: '',
	pic27: '',
	pic28: '',
	pic29: '',
	pic30: '',
};

const 특이사항_pic_doc = {
	관리번호: '',
	pic1: '',
	pic2: '',
	pic3: '',
	pic4: '',
	pic5: '',
	pic6: '',
	pic7: '',
	pic8: '',
	pic9: '',
	pic10: '',
	pic11: '',
	pic12: '',
	pic13: '',
	pic14: '',
	pic15: '',
	pic16: '',
	pic17: '',
	pic18: '',
	pic19: '',
	pic20: '',
	pic21: '',
	pic22: '',
	pic23: '',
	pic24: '',
	pic25: '',
	pic26: '',
	pic27: '',
	pic28: '',
	pic29: '',
	pic30: '',
};

const 출하_pic_doc = {
	관리번호: '',
	pic1: '',
	pic2: '',
	pic3: '',
	pic4: '',
	pic5: '',
	pic6: '',
	pic7: '',
	pic8: '',
	pic9: '',
	pic10: '',
	pic11: '',
	pic12: '',
	pic13: '',
	pic14: '',
	pic15: '',
	pic16: '',
	pic17: '',
	pic18: '',
	pic19: '',
	pic20: '',
	pic21: '',
	pic22: '',
	pic23: '',
	pic24: '',
	pic25: '',
	pic26: '',
	pic27: '',
	pic28: '',
	pic29: '',
	pic30: '',
};

const 반품입고_pic_doc = {
	관리번호: '',
	pic1: '',
	pic2: '',
	pic3: '',
	pic4: '',
	pic5: '',
	pic6: '',
	pic7: '',
	pic8: '',
	pic9: '',
	pic10: '',
	pic11: '',
	pic12: '',
	pic13: '',
	pic14: '',
	pic15: '',
	pic16: '',
	pic17: '',
	pic18: '',
	pic19: '',
	pic20: '',
	pic21: '',
	pic22: '',
	pic23: '',
	pic24: '',
	pic25: '',
	pic26: '',
	pic27: '',
	pic28: '',
	pic29: '',
	pic30: '',
};

const 재출하_pic_doc = {
	관리번호: '',
	pic1: '',
	pic2: '',
	pic3: '',
	pic4: '',
	pic5: '',
	pic6: '',
	pic7: '',
	pic8: '',
	pic9: '',
	pic10: '',
	pic11: '',
	pic12: '',
	pic13: '',
	pic14: '',
	pic15: '',
	pic16: '',
	pic17: '',
	pic18: '',
	pic19: '',
	pic20: '',
	pic21: '',
	pic22: '',
	pic23: '',
	pic24: '',
	pic25: '',
	pic26: '',
	pic27: '',
	pic28: '',
	pic29: '',
	pic30: '',
};

const 완전분해_pic_doc = {
	관리번호: '',
	pic1: '',
	pic2: '',
	pic3: '',
	pic4: '',
	pic5: '',
	pic6: '',
	pic7: '',
	pic8: '',
	pic9: '',
	pic10: '',
	pic11: '',
	pic12: '',
	pic13: '',
	pic14: '',
	pic15: '',
	pic16: '',
	pic17: '',
	pic18: '',
	pic19: '',
	pic20: '',
	pic21: '',
	pic22: '',
	pic23: '',
	pic24: '',
	pic25: '',
	pic26: '',
	pic27: '',
	pic28: '',
	pic29: '',
	pic30: '',
};

const 폐기_pic_doc = {
	관리번호: '',
	pic1: '',
	pic2: '',
	pic3: '',
	pic4: '',
	pic5: '',
	pic6: '',
	pic7: '',
	pic8: '',
	pic9: '',
	pic10: '',
	pic11: '',
	pic12: '',
	pic13: '',
	pic14: '',
	pic15: '',
	pic16: '',
	pic17: '',
	pic18: '',
	pic19: '',
	pic20: '',
	pic21: '',
	pic22: '',
	pic23: '',
	pic24: '',
	pic25: '',
	pic26: '',
	pic27: '',
	pic28: '',
	pic29: '',
	pic30: '',
};

const 자재입출고_doc = {
	QR: '',
	날짜: '',
	구분: '',
	차종: '',
	품명: '',
	품번: '',
	단가: '',
	수량: '',
	위치: '',
	LotNo: '',
	비고: '',
	사용관리번호: '',
};

const 기초보고서_doc = {
	level: '',
	기초보고서: '',
	육안검사외부: '',
	육안검사외부상세: '',
	육안검사내부: '',
	육안검사내부상세: '',
	기밀검사: '',
};

const 부품정보_list_doc = {
	관리번호: '',
	A_UPR_CASE_QR: '',
	A_LWR_CASE_QR: '',
	A_S_PLUG_QR: '',
	A_SPA_QR: '',
	A_HT_CNTR_QR: '',
	A_HV_CNTR_QR: '',
	A_PRA_QR: '',
	A_LV_W_H_QR: '',
	A_HV_W_H_1_QR: '',
	A_HV_W_H_2_QR: '',
	A_HV_W_H_3_QR: '',
	A_HV_W_H_4_QR: '',
	A_HV_W_H_5_QR: '',
	A_BMU_QR: '',
	A_CMU_1_QR: '',
	A_CMU_2_QR: '',
	A_CMU_3_QR: '',
	A_CMU_4_QR: '',
	A_CMU_5_QR: '',
	A_MODULE_1_QR: '',
	A_MODULE_2_QR: '',
	A_MODULE_3_QR: '',
	A_MODULE_4_QR: '',
	A_MODULE_5_QR: '',
	B_UPR_CASE_QR: '',
	B_LWR_CASE_QR: '',
	B_HV_CNTR_QR: '',
	B_HT_CNTR_QR: '',
	B_PRA_QR: '',
	B_FUSE_QR: '',
	B_HV_W_H_1_QR: '',
	B_HV_W_H_2_QR: '',
	B_LV_W_H_QR: '',
	B_BMU_QR: '',
	B_CMU_1_QR: '',
	B_CMU_2_QR: '',
	B_CMU_3_QR: '',
	B_CMU_4_QR: '',
	B_CMU_5_QR: '',
	B_MODULE_1_QR: '',
	B_MODULE_2_QR: '',
	B_MODULE_3_QR: '',
	B_MODULE_4_QR: '',
	B_MODULE_5_QR: '',
	B_MODULE_6_QR: '',
	B_MODULE_7_QR: '',
	B_MODULE_8_QR: '',
	B_MODULE_9_QR: '',
	B_MODULE_10_QR: '',
	C_UPR_CASE_QR: '',
	C_LWR_CASE_QR: '',
	C_HV_CNTR_1_QR: '',
	C_HV_CNTR_2_QR: '',
	C_HT_CNTR_QR: '',
	C_PRA_QR: '',
	C_FUSE_QR: '',
	C_LV_W_H_QR: '',
	C_HV_W_H_1_QR: '',
	C_HV_W_H_2_QR: '',
	C_HV_W_H_3_QR: '',
	C_HV_W_H_4_QR: '',
	C_HV_W_H_5_QR: '',
	C_HV_W_H_6_QR: '',
	C_HV_W_H_7_QR: '',
	C_HV_W_H_8_QR: '',
	C_BMU_QR: '',
	C_CMU_1_QR: '',
	C_CMU_2_QR: '',
	C_CMU_3_QR: '',
	C_CMU_4_QR: '',
	C_CMU_5_QR: '',
	C_CMU_6_QR: '',
	C_CMU_7_QR: '',
	C_CMU_8_QR: '',
	C_MODULE_1_QR: '',
	C_MODULE_2_QR: '',
	C_MODULE_3_QR: '',
	C_MODULE_4_QR: '',
	C_MODULE_5_QR: '',
	C_MODULE_6_QR: '',
	C_MODULE_7_QR: '',
	C_MODULE_8_QR: '',
	C_MODULE_9_QR: '',
	C_MODULE_10_QR: '',
	C_MODULE_11_QR: '',
	C_MODULE_12_QR: '',
	C_MODULE_13_QR: '',
	C_MODULE_14_QR: '',
	C_MODULE_15_QR: '',
	C_MODULE_16_QR: '',
	C_MODULE_17_QR: '',
	C_MODULE_18_QR: '',
	C_MODULE_19_QR: '',
	C_MODULE_20_QR: '',
	C_MODULE_21_QR: '',
	C_MODULE_22_QR: '',
	C_MODULE_23_QR: '',
	C_MODULE_24_QR: '',
	C_MODULE_25_QR: '',
	C_MODULE_26_QR: '',
	C_MODULE_27_QR: '',
	C_MODULE_28_QR: '',
	C_MODULE_29_QR: '',
	C_MODULE_30_QR: '',
	C_MODULE_31_QR: '',
	C_MODULE_32_QR: '',
	D_UPR_CASE_QR: '',
	D_LWR_CASE_QR: '',
	D_HV_CNTR_1_QR: '',
	D_HV_CNTR_2_QR: '',
	D_RELAY_QR: '',
	D_LV_W_H_QR: '',
	D_HV_W_H_1_QR: '',
	D_HV_W_H_2_QR: '',
	D_BMU_QR: '',
	D_CMU_1_QR: '',
	D_MODULE_1_QR: '',
	D_MODULE_2_QR: '',
	D2_HV_W_H_1_QR: '',
	D2_CMU_1_QR: '',
	D2_RELAY_QR: '',
	D2_BMU_QR: '',
	D2_HV_CNTR_1_QR: '',
	D2_HV_CNTR_2_QR: '',
	D2_LWR_CASE_QR: '',
	D2_UPR_CASE_QR: '',
	D2_LV_W_H_QR: '',
	D2_MODULE_1_QR: '',
	A_UPR_CASE_품번: '',
	A_LWR_CASE_품번: '',
	A_S_PLUG_품번: '',
	A_SPA_품번: '',
	A_HT_CNTR_품번: '',
	A_HV_CNTR_품번: '',
	A_PRA_품번: '',
	A_LV_W_H_품번: '',
	A_HV_W_H_1_품번: '',
	A_HV_W_H_2_품번: '',
	A_HV_W_H_3_품번: '',
	A_HV_W_H_4_품번: '',
	A_HV_W_H_5_품번: '',
	A_BMU_품번: '',
	A_CMU_1_품번: '',
	A_CMU_2_품번: '',
	A_CMU_3_품번: '',
	A_CMU_4_품번: '',
	A_CMU_5_품번: '',
	A_MODULE_1_품번: '',
	A_MODULE_2_품번: '',
	A_MODULE_3_품번: '',
	A_MODULE_4_품번: '',
	A_MODULE_5_품번: '',
	B_UPR_CASE_품번: '',
	B_LWR_CASE_품번: '',
	B_HV_CNTR_품번: '',
	B_HT_CNTR_품번: '',
	B_PRA_품번: '',
	B_FUSE_품번: '',
	B_HV_W_H_1_품번: '',
	B_HV_W_H_2_품번: '',
	B_LV_W_H_품번: '',
	B_BMU_품번: '',
	B_CMU_1_품번: '',
	B_CMU_2_품번: '',
	B_CMU_3_품번: '',
	B_CMU_4_품번: '',
	B_CMU_5_품번: '',
	B_MODULE_1_품번: '',
	B_MODULE_2_품번: '',
	B_MODULE_3_품번: '',
	B_MODULE_4_품번: '',
	B_MODULE_5_품번: '',
	B_MODULE_6_품번: '',
	B_MODULE_7_품번: '',
	B_MODULE_8_품번: '',
	B_MODULE_9_품번: '',
	B_MODULE_10_품번: '',
	C_UPR_CASE_품번: '',
	C_LWR_CASE_품번: '',
	C_HV_CNTR_1_품번: '',
	C_HV_CNTR_2_품번: '',
	C_HT_CNTR_품번: '',
	C_PRA_품번: '',
	C_FUSE_품번: '',
	C_LV_W_H_품번: '',
	C_HV_W_H_1_품번: '',
	C_HV_W_H_2_품번: '',
	C_HV_W_H_3_품번: '',
	C_HV_W_H_4_품번: '',
	C_HV_W_H_5_품번: '',
	C_HV_W_H_6_품번: '',
	C_HV_W_H_7_품번: '',
	C_HV_W_H_8_품번: '',
	C_BMU_품번: '',
	C_CMU_1_품번: '',
	C_CMU_2_품번: '',
	C_CMU_3_품번: '',
	C_CMU_4_품번: '',
	C_CMU_5_품번: '',
	C_CMU_6_품번: '',
	C_CMU_7_품번: '',
	C_CMU_8_품번: '',
	C_MODULE_1_품번: '',
	C_MODULE_2_품번: '',
	C_MODULE_3_품번: '',
	C_MODULE_4_품번: '',
	C_MODULE_5_품번: '',
	C_MODULE_6_품번: '',
	C_MODULE_7_품번: '',
	C_MODULE_8_품번: '',
	C_MODULE_9_품번: '',
	C_MODULE_10_품번: '',
	C_MODULE_11_품번: '',
	C_MODULE_12_품번: '',
	C_MODULE_13_품번: '',
	C_MODULE_14_품번: '',
	C_MODULE_15_품번: '',
	C_MODULE_16_품번: '',
	C_MODULE_17_품번: '',
	C_MODULE_18_품번: '',
	C_MODULE_19_품번: '',
	C_MODULE_20_품번: '',
	C_MODULE_21_품번: '',
	C_MODULE_22_품번: '',
	C_MODULE_23_품번: '',
	C_MODULE_24_품번: '',
	C_MODULE_25_품번: '',
	C_MODULE_26_품번: '',
	C_MODULE_27_품번: '',
	C_MODULE_28_품번: '',
	C_MODULE_29_품번: '',
	C_MODULE_30_품번: '',
	C_MODULE_31_품번: '',
	C_MODULE_32_품번: '',
	D_UPR_CASE_품번: '',
	D_LWR_CASE_품번: '',
	D_HV_CNTR_1_품번: '',
	D_HV_CNTR_2_품번: '',
	D_RELAY_품번: '',
	D_LV_W_H_품번: '',
	D_HV_W_H_1_품번: '',
	D_HV_W_H_2_품번: '',
	D_BMU_품번: '',
	D_CMU_1_품번: '',
	D_MODULE_1_품번: '',
	D_MODULE_2_품번: '',
	D2_HV_W_H_1_품번: '',
	D2_CMU_1_품번: '',
	D2_RELAY_품번: '',
	D2_BMU_품번: '',
	D2_HV_CNTR_1_품번: '',
	D2_HV_CNTR_2_품번: '',
	D2_LWR_CASE_품번: '',
	D2_UPR_CASE_품번: '',
	D2_LV_W_H_품번: '',
	D2_MODULE_1_품번: '',
};

const 품번_doc = {
	번호: '',
	차종: '',
	품번: '',
	LWR_CASE: '',
	UPR_CASE: '',
	S_PLUG: '',
	SPA: '',
	HV_CNTR: '',
	HT_CNTR: '',
	PRA: '',
	FUSE: '',
	RELAY: '',
	LV_W_H: '',
	HV_W_H: '',
	BMU: '',
	온도센서: '',
	CMU: '',
	BMA: '',
};

//세척공정에서 최근 만든 재제조번호를 저장하기 위한 document define
const 변수_doc = {
	구분: '',
	값: '',
};

const 불량의심부품_doc = {
	관리번호: '',
	재제조comment: '',
	A_UPR_CASE: '',
	A_LWR_CASE: '',
	A_S_PLUG: '',
	A_SPA: '',
	A_HT_CNTR: '',
	A_HV_CNTR: '',
	A_PRA: '',
	A_LV_W_H: '',
	A_HV_W_H_1: '',
	A_HV_W_H_2: '',
	A_HV_W_H_3: '',
	A_HV_W_H_4: '',
	A_HV_W_H_5: '',
	A_BMU: '',
	A_CMU_1: '',
	A_CMU_2: '',
	A_CMU_3: '',
	A_CMU_4: '',
	A_CMU_5: '',
	A_MODULE_1: '',
	A_MODULE_2: '',
	A_MODULE_3: '',
	A_MODULE_4: '',
	A_MODULE_5: '',
	B_UPR_CASE: '',
	B_LWR_CASE: '',
	B_HV_CNTR: '',
	B_HT_CNTR: '',
	B_PRA: '',
	B_FUSE: '',
	B_HV_W_H_1: '',
	B_HV_W_H_2: '',
	B_LV_W_H: '',
	B_BMU: '',
	B_CMU_1: '',
	B_CMU_2: '',
	B_CMU_3: '',
	B_CMU_4: '',
	B_CMU_5: '',
	B_MODULE_1: '',
	B_MODULE_2: '',
	B_MODULE_3: '',
	B_MODULE_4: '',
	B_MODULE_5: '',
	B_MODULE_6: '',
	B_MODULE_7: '',
	B_MODULE_8: '',
	B_MODULE_9: '',
	B_MODULE_10: '',
	C_UPR_CASE: '',
	C_LWR_CASE: '',
	C_HV_CNTR_1: '',
	C_HV_CNTR_2: '',
	C_HT_CNTR: '',
	C_PRA: '',
	C_FUSE: '',
	C_LV_W_H: '',
	C_HV_W_H_1: '',
	C_HV_W_H_2: '',
	C_HV_W_H_3: '',
	C_HV_W_H_4: '',
	C_HV_W_H_5: '',
	C_HV_W_H_6: '',
	C_HV_W_H_7: '',
	C_HV_W_H_8: '',
	C_BMU: '',
	C_CMU_1: '',
	C_CMU_2: '',
	C_CMU_3: '',
	C_CMU_4: '',
	C_CMU_5: '',
	C_CMU_6: '',
	C_CMU_7: '',
	C_CMU_8: '',
	C_MODULE_1: '',
	C_MODULE_2: '',
	C_MODULE_3: '',
	C_MODULE_4: '',
	C_MODULE_5: '',
	C_MODULE_6: '',
	C_MODULE_7: '',
	C_MODULE_8: '',
	C_MODULE_9: '',
	C_MODULE_10: '',
	C_MODULE_11: '',
	C_MODULE_12: '',
	C_MODULE_13: '',
	C_MODULE_14: '',
	C_MODULE_15: '',
	C_MODULE_16: '',
	C_MODULE_17: '',
	C_MODULE_18: '',
	C_MODULE_19: '',
	C_MODULE_20: '',
	C_MODULE_21: '',
	C_MODULE_22: '',
	C_MODULE_23: '',
	C_MODULE_24: '',
	C_MODULE_25: '',
	C_MODULE_26: '',
	C_MODULE_27: '',
	C_MODULE_28: '',
	C_MODULE_29: '',
	C_MODULE_30: '',
	C_MODULE_31: '',
	C_MODULE_32: '',
	D_UPR_CASE: '',
	D_LWR_CASE: '',
	D_HV_CNTR_1: '',
	D_HV_CNTR_2: '',
	D_RELAY: '',
	D_LV_W_H: '',
	D_HV_W_H_1: '',
	D_HV_W_H_2: '',
	D_BMU: '',
	D_CMU_1: '',
	D_MODULE_1: '',
	D_MODULE_2: '',
	D2_HV_W_H_1: '',
	D2_CMU_1: '',
	D2_RELAY: '',
	D2_BMU: '',
	D2_HV_CNTR_1: '',
	D2_HV_CNTR_2: '',
	D2_LWR_CASE: '',
	D2_UPR_CASE: '',
	D2_LV_W_H: '',
	D2_MODULE_1: '',
};

const 완료보고서_doc = {
	관리번호: '',
	pic1: '',
	pic2: '',
	DCIR_file: '',
	용량평가_file: '',
	진단_file: '',
};

//projection define
const 계정_ = {
	_id: 0,
	id: 1,
	passwd: 1,
	level: 1,
	이름: 1,
	기본정보: 1,
	입고: 1,
	세척: 1,
	기초검사: 1,
	분해조립: 1,
	성능검사: 1,
	EOL: 1,
	출하검사: 1,
	부품재고: 1,
	완료일수정: 1,
	관리번호: 1,
};

const 구자료_ = {
	품번: 1,
	품명: 1,
	수량: 1,
	공급가액: 1,
	부가세: 1,
	합계: 1,
	평균단가: 1,
};

const BSA재제조_ = {
	_id: 1,
	관리번호: 1,
	재제조번호: 1,
	구분: 1,
	차종: 1,
	품번: 1,
	RO_no: 1,
	공정단계: 1,
	적재No: 1,
	입고: 1,
	제조투입: 1,
	세척투입일: 1,
	세척: 1,
	기초검사투입일: 1,
	기초검사: 1,
	분해조립투입일: 1,
	분해조립: 1,
	성능검사투입일: 1,
	성능검사: 1,
	EOL투입일: 1,
	EOL: 1,
	QR_Label: 1,
	출하검사: 1,
	납품처: 1,
	출하: 1,
	소재지: 1,
	소재지사유: 1,
	마지막충전일: 1,
	반품입고: 1,
	재출하: 1,
	완전분해: 1,
	완전분해사유: 1,
	폐기: 1,
	폐기사유: 1,
	출하예약: 1,
	렉번호: 1,
};

const 입고_ = {
	_id: 0,
	관리번호: 1,
	입고일: 1,
	입고처: 1,
	구분: 1,
	차종: 1,
	품번: 1,
	RO_no: 1,
	보관위치: 1,
};

const 세척_ = {
	_id: 0,
	관리번호: 1,
	재제조번호: 1,
	공정입고일: 1,
	공정완료일: 1,
	어퍼케이스재사용가능: 1,
	기밀검사_케이스: 1,
	기밀검사_케이스_특이사항: 1,
	육안검사_외부: 1,
	육안검사_외부_특이사항: 1,
	특이사항: 1,
	구분: 1,
	차종: 1,
	품번: 1,
	RO_no: 1,
};

const 기초검사_ = {
	_id: 0,
	관리번호: 1,
	공정입고일: 1,
	RO_no: 1,
	VIN: 1,
	랙번호: 1,
	QRcode: 1,
	주행거리: 1,
	차량번호: 1,
	육안검사_내부: 1,
	육안검사_내부_특이사항: 1,
	기밀검사_냉각유로: 1,
	기밀검사_냉각유로_특이사항: 1,
	절연검사_Plus: 1,
	절연검사_Plus판정: 1,
	절연검사_Minus: 1,
	절연검사_Minus판정: 1,
	센서데이터진단: 1,
	센서데이터진단_판정: 1,
	통신검사_DTC코드1: 1,
	통신검사_DTC코드1판정: 1,
	통신검사_DTC코드2: 1,
	통신검사_DTC코드2판정: 1,
	통신검사_DTC코드3: 1,
	통신검사_DTC코드3판정: 1,
	통신검사_DTC코드4: 1,
	통신검사_DTC코드4판정: 1,
	통신검사_DTC코드5: 1,
	통신검사_DTC코드5판정: 1,
	통신검사_DTC코드6: 1,
	통신검사_DTC코드6판정: 1,
	통신검사_DTC코드7: 1,
	통신검사_DTC코드7판정: 1,
	통신검사_DTC코드8: 1,
	통신검사_DTC코드8판정: 1,
	통신검사_DTC코드9: 1,
	통신검사_DTC코드9판정: 1,
	통신검사_DTC코드10: 1,
	통신검사_DTC코드10판정: 1,
	통신검사_팩전압: 1,
	통신검사_팩전압판정: 1,
	통신검사_셀전압편차: 1,
	통신검사_셀전압편차판정: 1,
	통신검사_릴레이구동: 1,
	통신검사_릴레이구동사유: 1,
	BSA생산일자: 1,
	BSA판매일자: 1,
	BSA수리일자: 1,
	BMA_ROM_ID: 1,
	고장현상코드: 1,
	고장현상명: 1,
	문제Cell_No: 1,
	문제BMA_No: 1,
	문제BMA_cnt: 1,
	공정완료일: 1,
	분석결과: 1,
	비고: 1,
	센터진단내용: 1,
	검사자: 1,
	필드현상: 1,
	AS센터조치: 1,
	재제조번호: 1,
	구분: 1,
	차종: 1,
	품번: 1,
	RO_no: 1,
};

const 분해조립_ = {
	_id: 0,
	관리번호: 1,
	공정입고일: 1,
	BMU1: 1,
	BMU2: 1,
	BMU3: 1,
	BMU4: 1,
	BMU5: 1,
	BMU6: 1,
	BMU7: 1,
	BMU8: 1,
	BMU9: 1,
	BMU10: 1,
	CMU1: 1,
	CMU2: 1,
	CMU3: 1,
	CMU4: 1,
	CMU5: 1,
	CMU6: 1,
	CMU7: 1,
	CMU8: 1,
	CMU9: 1,
	CMU10: 1,
	PRA1: 1,
	PRA2: 1,
	PRA3: 1,
	PRA4: 1,
	PRA5: 1,
	PRA6: 1,
	PRA7: 1,
	PRA8: 1,
	PRA9: 1,
	PRA10: 1,
	SPA1: 1,
	SPA2: 1,
	SPA3: 1,
	SPA4: 1,
	SPA5: 1,
	SPA6: 1,
	SPA7: 1,
	SPA8: 1,
	SPA9: 1,
	SPA10: 1,
	LWR_C1: 1,
	LWR_C2: 1,
	LWR_C3: 1,
	LWR_C4: 1,
	LWR_C5: 1,
	LWR_C6: 1,
	LWR_C7: 1,
	LWR_C8: 1,
	LWR_C9: 1,
	LWR_C10: 1,
	UPR_C1: 1,
	UPR_C2: 1,
	UPR_C3: 1,
	UPR_C4: 1,
	UPR_C5: 1,
	UPR_C6: 1,
	UPR_C7: 1,
	UPR_C: 1,
	UPR_C8: 1,
	UPR_C9: 1,
	UPR_C10: 1,
	PBE: 1,
	Gasket: 1,
	Relay1: 1,
	Relay2: 1,
	Relay3: 1,
	Relay4: 1,
	Relay5: 1,
	Relay6: 1,
	Relay7: 1,
	Relay8: 1,
	Relay9: 1,
	Relay10: 1,
	HV_CNTR1: 1,
	HV_CNTR2: 1,
	HV_CNTR3: 1,
	HV_CNTR4: 1,
	HV_CNTR5: 1,
	HV_CNTR6: 1,
	HV_CNTR7: 1,
	HV_CNTR8: 1,
	HV_CNTR9: 1,
	HV_CNTR10: 1,
	Heating_CNTR1: 1,
	Heating_CNTR2: 1,
	Heating_CNTR3: 1,
	Heating_CNTR4: 1,
	Heating_CNTR5: 1,
	Heating_CNTR6: 1,
	Heating_CNTR7: 1,
	Heating_CNTR8: 1,
	Heating_CNTR9: 1,
	Heating_CNTR10: 1,
	FuseBox1: 1,
	FuseBox2: 1,
	FuseBox3: 1,
	FuseBox4: 1,
	FuseBox5: 1,
	FuseBox6: 1,
	FuseBox7: 1,
	FuseBox8: 1,
	FuseBox9: 1,
	FuseBox10: 1,
	LV_W_H1: 1,
	LV_W_H2: 1,
	LV_W_H3: 1,
	LV_W_H4: 1,
	LV_W_H5: 1,
	LV_W_H6: 1,
	LV_W_H7: 1,
	LV_W_H8: 1,
	LV_W_H9: 1,
	LV_W_H10: 1,
	HV_W_H1: 1,
	HV_W_H2: 1,
	HV_W_H3: 1,
	HV_W_H4: 1,
	HV_W_H5: 1,
	HV_W_H6: 1,
	HV_W_H7: 1,
	HV_W_H8: 1,
	HV_W_H9: 1,
	HV_W_H10: 1,
	온도센서1: 1,
	온도센서2: 1,
	온도센서3: 1,
	온도센서4: 1,
	온도센서5: 1,
	온도센서6: 1,
	온도센서7: 1,
	온도센서8: 1,
	온도센서9: 1,
	온도센서10: 1,
	Busbars: 1,
	BMA1: 1,
	BMA2: 1,
	BMA3: 1,
	BMA4: 1,
	BMA5: 1,
	BMA6: 1,
	BMA7: 1,
	BMA8: 1,
	BMA9: 1,
	BMA10: 1,
	BMU1_2: 1,
	BMU2_2: 1,
	BMU3_2: 1,
	BMU4_2: 1,
	BMU5_2: 1,
	BMU6_2: 1,
	BMU7_2: 1,
	BMU8_2: 1,
	BMU9_2: 1,
	BMU10_2: 1,
	CMU1_2: 1,
	CMU2_2: 1,
	CMU3_2: 1,
	CMU4_2: 1,
	CMU5_2: 1,
	CMU6_2: 1,
	CMU7_2: 1,
	CMU8_2: 1,
	CMU9_2: 1,
	CMU10_2: 1,
	PRA1_2: 1,
	PRA2_2: 1,
	PRA3_2: 1,
	PRA4_2: 1,
	PRA5_2: 1,
	PRA6_2: 1,
	PRA7_2: 1,
	PRA8_2: 1,
	PRA9_2: 1,
	PRA10_2: 1,
	SPA1_2: 1,
	SPA2_2: 1,
	SPA3_2: 1,
	SPA4_2: 1,
	SPA5_2: 1,
	SPA6_2: 1,
	SPA7_2: 1,
	SPA8_2: 1,
	SPA9_2: 1,
	SPA10_2: 1,
	LWR_C1_2: 1,
	LWR_C2_2: 1,
	LWR_C3_2: 1,
	LWR_C4_2: 1,
	LWR_C5_2: 1,
	LWR_C6_2: 1,
	LWR_C7_2: 1,
	LWR_C8_2: 1,
	LWR_C9_2: 1,
	LWR_C10_2: 1,
	UPR_C1_2: 1,
	UPR_C2_2: 1,
	UPR_C3_2: 1,
	UPR_C4_2: 1,
	UPR_C5_2: 1,
	UPR_C6_2: 1,
	UPR_C7_2: 1,
	UPR_C8_2: 1,
	UPR_C9_2: 1,
	UPR_C10_2: 1,
	PBE_2: 1,
	Gasket_2: 1,
	Relay1_2: 1,
	Relay2_2: 1,
	Relay3_2: 1,
	Relay4_2: 1,
	Relay5_2: 1,
	Relay6_2: 1,
	Relay7_2: 1,
	Relay8_2: 1,
	Relay9_2: 1,
	Relay10_2: 1,
	HV_CNTR1_2: 1,
	HV_CNTR2_2: 1,
	HV_CNTR3_2: 1,
	HV_CNTR4_2: 1,
	HV_CNTR5_2: 1,
	HV_CNTR6_2: 1,
	HV_CNTR7_2: 1,
	HV_CNTR8_2: 1,
	HV_CNTR9_2: 1,
	HV_CNTR10_2: 1,
	Heating_CNTR1_2: 1,
	Heating_CNTR2_2: 1,
	Heating_CNTR3_2: 1,
	Heating_CNTR4_2: 1,
	Heating_CNTR5_2: 1,
	Heating_CNTR6_2: 1,
	Heating_CNTR7_2: 1,
	Heating_CNTR8_2: 1,
	Heating_CNTR9_2: 1,
	Heating_CNTR10_2: 1,
	FuseBox1_2: 1,
	FuseBox2_2: 1,
	FuseBox3_2: 1,
	FuseBox4_2: 1,
	FuseBox5_2: 1,
	FuseBox6_2: 1,
	FuseBox7_2: 1,
	FuseBox8_2: 1,
	FuseBox9_2: 1,
	FuseBox10_2: 1,
	LV_W_H1_2: 1,
	LV_W_H2_2: 1,
	LV_W_H3_2: 1,
	LV_W_H4_2: 1,
	LV_W_H5_2: 1,
	LV_W_H6_2: 1,
	LV_W_H7_2: 1,
	LV_W_H8_2: 1,
	LV_W_H9_2: 1,
	LV_W_H10_2: 1,
	HV_W_H1_2: 1,
	HV_W_H2_2: 1,
	HV_W_H3_2: 1,
	HV_W_H4_2: 1,
	HV_W_H5_2: 1,
	HV_W_H6_2: 1,
	HV_W_H7_2: 1,
	HV_W_H8_2: 1,
	HV_W_H9_2: 1,
	HV_W_H10_2: 1,
	온도센서1_2: 1,
	온도센서2_2: 1,
	온도센서3_2: 1,
	온도센서4_2: 1,
	온도센서5_2: 1,
	온도센서6_2: 1,
	온도센서7_2: 1,
	온도센서8_2: 1,
	온도센서9_2: 1,
	온도센서10_2: 1,
	Busbars_2: 1,
	BMA1_2: 1,
	BMA2_2: 1,
	BMA3_2: 1,
	BMA4_2: 1,
	BMA5_2: 1,
	BMA6_2: 1,
	BMA7_2: 1,
	BMA8_2: 1,
	BMA9_2: 1,
	BMA10_2: 1,
	ETC: 1,
	공정완료일: 1,
	작업자: 1,
	재제조번호: 1,
	구분: 1,
	차종: 1,
	품번: 1,
	RO_no: 1,
};

const 분해조립재제조_ = {
	_id: 0,
	관리번호: 1,
	품명: 1,
	교체전품번: 1,
	교체전QR: 1,
	신품고품: 1,
	고품식별: 1,
	교체후품번: 1,
	교체후QR: 1,
	교체사유: 1,
	공정입고일: 1,
	공정완료일: 1,
	작성자: 1,
};

const 분해조립공정대기_ = {
	_id: 0,
	관리번호: 1,
	품명: 1,
	품번: 1,
	QR: 1,
	대기사유: 1,
};

const 분해조립폐기자재_ = {
	_id: 0,
	관리번호: 1,
	품명: 1,
	품번: 1,
	QR: 1,
	폐기사유: 1,
};

const EOL_ = {
	_id: 0,
	관리번호: 1,
	QR기본: 1,
	공정입고일: 1,
	UPR_C조립: 1,
	UPR_C조립_특이사항: 1,
	기밀검사_케이스: 1,
	기밀검사_케이스_특이사항: 1,
	기밀검사_냉각유로: 1,
	기밀검사_냉각유로_특이사항: 1,
	절연검사_Plus: 1,
	절연검사_Plus_특이사항: 1,
	절연검사_Minus: 1,
	절연검사_Minus_특이사항: 1,
	절연저항_HVP: 1,
	절연저항_HVP_특이사항: 1,
	절연저항_HVN: 1,
	절연저항_HVN_특이사항: 1,
	토크검사_UPR_C: 1,
	토크검사_UPR_C_특이사항: 1,
	토크검사_버스바: 1,
	토크검사_버스바_특이사항: 1,
	통신검사_DTC코드1: 1,
	통신검사_DTC코드2: 1,
	통신검사_DTC코드3: 1,
	통신검사_DTC코드4: 1,
	통신검사_DTC코드5: 1,
	통신검사_DTC코드6: 1,
	통신검사_DTC코드7: 1,
	통신검사_DTC코드8: 1,
	통신검사_DTC코드9: 1,
	통신검사_DTC코드10: 1,
	통신검사_팩전압: 1,
	통신검사_팩전압_특이사항: 1,
	통신검사_셀전압편차: 1,
	통신검사_셀전압편차_특이사항: 1,
	통신검사_릴레이구동: 1,
	통신검사_릴레이구동_특이사항: 1,
	공정완료일: 1,
	비고: 1,
	분해조립_재의뢰사유: 1,
	QR: 1,
	검사자: 1,
	UPR_C조립: 1,
	UPR_C조립_특이사항: 1,
	통신검사_셀전압MAX: 1,
	통신검사_셀전압MIN: 1,
	EOL항목검사: 1,
	고장코드유무: 1,
	EOL항목검사: 1,
	커버류: 1,
	브라켓: 1,
	ICUU: 1,
	교체부품명: 1,
	공정흐름_이슈: 1,
	절연저항_Plus: 1,
	절연저항_Minus: 1,
	육안검사_외부: 1,
	육안검사_내부: 1,
	용량평가값: 1,
	재제조번호: 1,
	구분: 1,
	차종: 1,
	품번: 1,
	RO_no: 1,
};

const 성능검사_ = {
	_id: 0,
	관리번호: 1,
	공정입고일: 1,
	용량평가: 1,
	SOC60Percent: 1,
	DCIR: 1,
	DCIR_Charge1: 1,
	DCIR_Charge2: 1,
	DCIR_Charge3: 1,
	DCIR_Charge4: 1,
	DCIR_Charge5: 1,
	DCIR_Charge6: 1,
	VOLT1: 1,
	VOLT2: 1,
	VOLT3: 1,
	VOLT4: 1,
	VOLT5: 1,
	VOLT6: 1,
	VOLT7: 1,
	VOLT8: 1,
	VOLT9: 1,
	VOLT10: 1,
	VOLT11: 1,
	VOLT12: 1,
	CURR1: 1,
	CURR2: 1,
	CURR3: 1,
	CURR4: 1,
	CURR5: 1,
	CURR6: 1,
	분해조립_재의뢰사유: 1,
	공정완료일: 1,
	비고: 1,
	검사자: 1,
	f1: 1,
	f2: 1,
	f3: 1,
	f4: 1,
	f5: 1,
	f6: 1,
	재제조번호: 1,
	구분: 1,
	차종: 1,
	품번: 1,
	RO_no: 1,
	chart: 1,
};

const 고품정보_ = {
	_id: 0,
	관리번호: 1,
	품명: 1,
	구분: 1,
	품번: 1,
	번호: 1,
	QR: 1,
	폐기여부: 1,
	사용여부: 1,
	사용_관리번호: 1,
	등록일: 1,
	사용일: 1,
	등록_작업자: 1,
	사용_작업자: 1,
	폐기품출고: 1,
};

const 출하정보_ = {
	_id: 0,
	관리번호: 1,
	출하코드: 1,
	검사일: 1,
	검사자: 1,
	기초보고서_작성확인: 1,
	완료보고서_작성확인: 1,
	클린상태: 1,
	팔레트_적정위치: 1,
	포장랩상태: 1,
	UPR_QR: 1,
	LWR_QR: 1,
	HKMC_스티커_URP: 1,
	냉각유로_커버: 1,
	브라켓: 1,
	브라켓_비고: 1,
	S_PLUG: 1,
	S_PLUG_비고: 1,
	접지: 1,
	접지_비고: 1,
	DTC: 1,
	DTC_현재: 1,
	DTC_과거: 1,
	배터리충전상태: 1,
	배터리충전상태_측정값: 1,
	BMS고장NO: 1,
	BMS융착NO: 1,
	배터리팩전압: 1,
	배터리팩_측정값: 1,
	배터리모듈온도: 1,
	배터리모듈온도_최대: 1,
	배터리모듈온도_최소: 1,
	배터리셀전압: 1,
	배터리셀전압_최대: 1,
	배터리셀전압_최소: 1,
	셀전압편차: 1,
	셀전압편차_측정값: 1,
	절연저항: 1,
	절연저항_측정값: 1,
	SOH: 1,
	릴레이_강제구동: 1,
	커넥터_체결검사: 1,
	재제조번호: 1,
	구분: 1,
	차종: 1,
	품번: 1,
	RO_no: 1,
};

const 특이사항_ = {
	_id: 0,
	관리번호: 1,
	특이사항: 1,
	재제조번호: 1,
	구분: 1,
	차종: 1,
	품번: 1,
	RO_no: 1,
};

const 교체부품상세_ = {
	_id: 0,
	관리번호: 1,
	공정입고일: 1,
	ORIGIN_관리번호: 1,
	교체전_품명: 1,
	교체전_품번: 1,
	교체전_QR: 1,
	교체후_신품_고품: 1,
	교체후_고품식별: 1,
	교체후_품번: 1,
	교체후_QR: 1,
	교체사유: 1,
	공정완료일: 1,
	재제조번호: 1,
	구분: 1,
	차종: 1,
	품번: 1,
	RO_no: 1,
};

const 구장재고_ = {
	_id: 0,
	입고일: 1,
	입고처: 1,
	관리번호: 1,
	재제조번호: 1,
	RO번호: 1,
	부품번호: 1,
	생산연도: 1,
	ROM_ID: 1,
	보관위치: 1,
	제조완료: 1,
	출고일: 1,
	출고처: 1,
	비고: 1,
};

const 군포재고_ = {
	_id: 0,
	입고일: 1,
	입고처: 1,
	관리번호: 1,
	재제조번호: 1,
	RO번호: 1,
	부품번호: 1,
	생산연도: 1,
	ROM_ID: 1,
	보관위치: 1,
	제조완료: 1,
	출고일: 1,
	출고처: 1,
	비고: 1,
};

const 제주재고_ = {
	_id: 0,
	입고일: 1,
	입고처: 1,
	관리번호: 1,
	재제조번호: 1,
	RO번호: 1,
	부품번호: 1,
	생산연도: 1,
	ROM_ID: 1,
	보관위치: 1,
	제조완료: 1,
	출고일: 1,
	출고처: 1,
	비고: 1,
};

const 창고이동_ = {
	_id: 0,
	관리번호: 1,
	재제조번호: 1,
	이동경로: 1,
};

const 입고_pic_ = {
	_id: 0,
	관리번호: 1,
	pic1: 1,
	pic2: 1,
	pic3: 1,
	pic4: 1,
	pic5: 1,
	pic6: 1,
	pic7: 1,
	pic8: 1,
	pic9: 1,
	pic10: 1,
	pic11: 1,
	pic12: 1,
	pic13: 1,
	pic14: 1,
	pic15: 1,
	pic16: 1,
	pic17: 1,
	pic18: 1,
	pic19: 1,
	pic20: 1,
	pic21: 1,
	pic22: 1,
	pic23: 1,
	pic24: 1,
	pic25: 1,
	pic26: 1,
	pic27: 1,
	pic28: 1,
	pic29: 1,
	pic30: 1,
};

const 세척_pic_ = {
	_id: 0,
	관리번호: 1,
	pic1: 1,
	pic2: 1,
	pic3: 1,
	pic4: 1,
	pic5: 1,
	pic6: 1,
	pic7: 1,
	pic8: 1,
	pic9: 1,
	pic10: 1,
	pic11: 1,
	pic12: 1,
	pic13: 1,
	pic14: 1,
	pic15: 1,
	pic16: 1,
	pic17: 1,
	pic18: 1,
	pic19: 1,
	pic20: 1,
	pic21: 1,
	pic22: 1,
	pic23: 1,
	pic24: 1,
	pic25: 1,
	pic26: 1,
	pic27: 1,
	pic28: 1,
	pic29: 1,
	pic30: 1,
};

const 기초검사_pic1_ = {
	_id: 0,
	관리번호: 1,
	pic1: 1,
	pic2: 1,
	pic3: 1,
	pic4: 1,
	pic5: 1,
	pic6: 1,
	pic7: 1,
	pic8: 1,
	pic9: 1,
	pic10: 1,
};

const 기초검사_pic2_ = {
	_id: 0,
	관리번호: 1,
	pic1: 1,
	pic2: 1,
	pic3: 1,
	pic4: 1,
	pic5: 1,
	pic6: 1,
	pic7: 1,
	pic8: 1,
	pic9: 1,
	pic10: 1,
};

const 기초검사_pic3_ = {
	_id: 0,
	관리번호: 1,
	pic1: 1,
	pic2: 1,
	pic3: 1,
	pic4: 1,
	pic5: 1,
	pic6: 1,
	pic7: 1,
	pic8: 1,
	pic9: 1,
	pic10: 1,
};

const 기초검사_pic4_ = {
	_id: 0,
	관리번호: 1,
	pic1: 1,
	pic2: 1,
	pic3: 1,
	pic4: 1,
	pic5: 1,
	pic6: 1,
	pic7: 1,
	pic8: 1,
	pic9: 1,
	pic10: 1,
};

const 분해조립_pic_ = {
	_id: 0,
	관리번호: 1,
	pic1: 1,
	pic2: 1,
	pic3: 1,
	pic4: 1,
	pic5: 1,
	pic6: 1,
	pic7: 1,
	pic8: 1,
	pic9: 1,
	pic10: 1,
	pic11: 1,
	pic12: 1,
	pic13: 1,
	pic14: 1,
	pic15: 1,
	pic16: 1,
	pic17: 1,
	pic18: 1,
	pic19: 1,
	pic20: 1,
	pic21: 1,
	pic22: 1,
	pic23: 1,
	pic24: 1,
	pic25: 1,
	pic26: 1,
	pic27: 1,
	pic28: 1,
	pic29: 1,
	pic30: 1,
};

const 성능검사_pic_ = {
	_id: 0,
	관리번호: 1,
	pic1: 1,
	pic2: 1,
	pic3: 1,
	pic4: 1,
	pic5: 1,
	pic6: 1,
	pic7: 1,
	pic8: 1,
	pic9: 1,
	pic10: 1,
	pic11: 1,
	pic12: 1,
	pic13: 1,
	pic14: 1,
	pic15: 1,
	pic16: 1,
	pic17: 1,
	pic18: 1,
	pic19: 1,
	pic20: 1,
	pic21: 1,
	pic22: 1,
	pic23: 1,
	pic24: 1,
	pic25: 1,
	pic26: 1,
	pic27: 1,
	pic28: 1,
	pic29: 1,
	pic30: 1,
};

const EOL_pic_ = {
	_id: 0,
	관리번호: 1,
	pic1: 1,
	pic2: 1,
	pic3: 1,
	pic4: 1,
	pic5: 1,
	pic6: 1,
	pic7: 1,
	pic8: 1,
	pic9: 1,
	pic10: 1,
	pic11: 1,
	pic12: 1,
	pic13: 1,
	pic14: 1,
	pic15: 1,
	pic16: 1,
	pic17: 1,
	pic18: 1,
	pic19: 1,
	pic20: 1,
	pic21: 1,
	pic22: 1,
	pic23: 1,
	pic24: 1,
	pic25: 1,
	pic26: 1,
	pic27: 1,
	pic28: 1,
	pic29: 1,
	pic30: 1,
};

const EOL_pic1_ = {
	_id: 0,
	관리번호: 1,
	pic1: 1,
	pic2: 1,
	pic3: 1,
	pic4: 1,
	pic5: 1,
	pic6: 1,
	pic7: 1,
	pic8: 1,
	pic9: 1,
	pic10: 1,
	pic11: 1,
	pic12: 1,
	pic13: 1,
	pic14: 1,
	pic15: 1,
	pic16: 1,
	pic17: 1,
	pic18: 1,
	pic19: 1,
	pic20: 1,
	pic21: 1,
	pic22: 1,
	pic23: 1,
	pic24: 1,
	pic25: 1,
	pic26: 1,
	pic27: 1,
	pic28: 1,
	pic29: 1,
	pic30: 1,
};

const EOL_pic2_ = {
	_id: 0,
	관리번호: 1,
	pic1: 1,
	pic2: 1,
	pic3: 1,
	pic4: 1,
	pic5: 1,
	pic6: 1,
	pic7: 1,
	pic8: 1,
	pic9: 1,
	pic10: 1,
	pic11: 1,
	pic12: 1,
	pic13: 1,
	pic14: 1,
	pic15: 1,
	pic16: 1,
	pic17: 1,
	pic18: 1,
	pic19: 1,
	pic20: 1,
	pic21: 1,
	pic22: 1,
	pic23: 1,
	pic24: 1,
	pic25: 1,
	pic26: 1,
	pic27: 1,
	pic28: 1,
	pic29: 1,
	pic30: 1,
};

const EOL_pic3_ = {
	_id: 0,
	관리번호: 1,
	pic1: 1,
	pic2: 1,
	pic3: 1,
	pic4: 1,
	pic5: 1,
	pic6: 1,
	pic7: 1,
	pic8: 1,
	pic9: 1,
	pic10: 1,
	pic11: 1,
	pic12: 1,
	pic13: 1,
	pic14: 1,
	pic15: 1,
	pic16: 1,
	pic17: 1,
	pic18: 1,
	pic19: 1,
	pic20: 1,
	pic21: 1,
	pic22: 1,
	pic23: 1,
	pic24: 1,
	pic25: 1,
	pic26: 1,
	pic27: 1,
	pic28: 1,
	pic29: 1,
	pic30: 1,
};

const 특이사항_pic_ = {
	_id: 0,
	관리번호: 1,
	pic1: 1,
	pic2: 1,
	pic3: 1,
	pic4: 1,
	pic5: 1,
	pic6: 1,
	pic7: 1,
	pic8: 1,
	pic9: 1,
	pic10: 1,
	pic11: 1,
	pic12: 1,
	pic13: 1,
	pic14: 1,
	pic15: 1,
	pic16: 1,
	pic17: 1,
	pic18: 1,
	pic19: 1,
	pic20: 1,
	pic21: 1,
	pic22: 1,
	pic23: 1,
	pic24: 1,
	pic25: 1,
	pic26: 1,
	pic27: 1,
	pic28: 1,
	pic29: 1,
	pic30: 1,
};

const 출하_pic_ = {
	_id: 0,
	관리번호: 1,
	pic1: 1,
	pic2: 1,
	pic3: 1,
	pic4: 1,
	pic5: 1,
	pic6: 1,
	pic7: 1,
	pic8: 1,
	pic9: 1,
	pic10: 1,
	pic11: 1,
	pic12: 1,
	pic13: 1,
	pic14: 1,
	pic15: 1,
	pic16: 1,
	pic17: 1,
	pic18: 1,
	pic19: 1,
	pic20: 1,
	pic21: 1,
	pic22: 1,
	pic23: 1,
	pic24: 1,
	pic25: 1,
	pic26: 1,
	pic27: 1,
	pic28: 1,
	pic29: 1,
	pic30: 1,
};

const 반품입고_pic_ = {
	_id: 0,
	관리번호: 1,
	pic1: 1,
	pic2: 1,
	pic3: 1,
	pic4: 1,
	pic5: 1,
	pic6: 1,
	pic7: 1,
	pic8: 1,
	pic9: 1,
	pic10: 1,
	pic11: 1,
	pic12: 1,
	pic13: 1,
	pic14: 1,
	pic15: 1,
	pic16: 1,
	pic17: 1,
	pic18: 1,
	pic19: 1,
	pic20: 1,
	pic21: 1,
	pic22: 1,
	pic23: 1,
	pic24: 1,
	pic25: 1,
	pic26: 1,
	pic27: 1,
	pic28: 1,
	pic29: 1,
	pic30: 1,
};

const 재출하_pic_ = {
	_id: 0,
	관리번호: 1,
	pic1: 1,
	pic2: 1,
	pic3: 1,
	pic4: 1,
	pic5: 1,
	pic6: 1,
	pic7: 1,
	pic8: 1,
	pic9: 1,
	pic10: 1,
	pic11: 1,
	pic12: 1,
	pic13: 1,
	pic14: 1,
	pic15: 1,
	pic16: 1,
	pic17: 1,
	pic18: 1,
	pic19: 1,
	pic20: 1,
	pic21: 1,
	pic22: 1,
	pic23: 1,
	pic24: 1,
	pic25: 1,
	pic26: 1,
	pic27: 1,
	pic28: 1,
	pic29: 1,
	pic30: 1,
};

const 완전분해_pic_ = {
	_id: 0,
	관리번호: 1,
	pic1: 1,
	pic2: 1,
	pic3: 1,
	pic4: 1,
	pic5: 1,
	pic6: 1,
	pic7: 1,
	pic8: 1,
	pic9: 1,
	pic10: 1,
	pic11: 1,
	pic12: 1,
	pic13: 1,
	pic14: 1,
	pic15: 1,
	pic16: 1,
	pic17: 1,
	pic18: 1,
	pic19: 1,
	pic20: 1,
	pic21: 1,
	pic22: 1,
	pic23: 1,
	pic24: 1,
	pic25: 1,
	pic26: 1,
	pic27: 1,
	pic28: 1,
	pic29: 1,
	pic30: 1,
};

const 폐기_pic_ = {
	_id: 0,
	관리번호: 1,
	pic1: 1,
	pic2: 1,
	pic3: 1,
	pic4: 1,
	pic5: 1,
	pic6: 1,
	pic7: 1,
	pic8: 1,
	pic9: 1,
	pic10: 1,
	pic11: 1,
	pic12: 1,
	pic13: 1,
	pic14: 1,
	pic15: 1,
	pic16: 1,
	pic17: 1,
	pic18: 1,
	pic19: 1,
	pic20: 1,
	pic21: 1,
	pic22: 1,
	pic23: 1,
	pic24: 1,
	pic25: 1,
	pic26: 1,
	pic27: 1,
	pic28: 1,
	pic29: 1,
	pic30: 1,
};

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
	위치: 1,
	LotNo: 1,
	비고: 1,
	사용관리번호: 1,
};

const 기초보고서_ = {
	_id: 0,
	level: 1,
	기초보고서: 1,
	육안검사외부: 1,
	육안검사외부상세: 1,
	육안검사내부: 1,
	육안검사내부상세: 1,
	기밀검사: 1,
};

const 부품정보_list_ = {
	_id: 0,
	관리번호: 1,
	A_UPR_CASE_QR: 1,
	A_LWR_CASE_QR: 1,
	A_S_PLUG_QR: 1,
	A_SPA_QR: 1,
	A_HT_CNTR_QR: 1,
	A_HV_CNTR_QR: 1,
	A_PRA_QR: 1,
	A_LV_W_H_QR: 1,
	A_HV_W_H_1_QR: 1,
	A_HV_W_H_2_QR: 1,
	A_HV_W_H_3_QR: 1,
	A_HV_W_H_4_QR: 1,
	A_HV_W_H_5_QR: 1,
	A_BMU_QR: 1,
	A_CMU_1_QR: 1,
	A_CMU_2_QR: 1,
	A_CMU_3_QR: 1,
	A_CMU_4_QR: 1,
	A_CMU_5_QR: 1,
	A_MODULE_1_QR: 1,
	A_MODULE_2_QR: 1,
	A_MODULE_3_QR: 1,
	A_MODULE_4_QR: 1,
	A_MODULE_5_QR: 1,
	B_UPR_CASE_QR: 1,
	B_LWR_CASE_QR: 1,
	B_HV_CNTR_QR: 1,
	B_HT_CNTR_QR: 1,
	B_PRA_QR: 1,
	B_FUSE_QR: 1,
	B_HV_W_H_1_QR: 1,
	B_HV_W_H_2_QR: 1,
	B_LV_W_H_QR: 1,
	B_BMU_QR: 1,
	B_CMU_1_QR: 1,
	B_CMU_2_QR: 1,
	B_CMU_3_QR: 1,
	B_CMU_4_QR: 1,
	B_CMU_5_QR: 1,
	B_MODULE_1_QR: 1,
	B_MODULE_2_QR: 1,
	B_MODULE_3_QR: 1,
	B_MODULE_4_QR: 1,
	B_MODULE_5_QR: 1,
	B_MODULE_6_QR: 1,
	B_MODULE_7_QR: 1,
	B_MODULE_8_QR: 1,
	B_MODULE_9_QR: 1,
	B_MODULE_10_QR: 1,
	C_UPR_CASE_QR: 1,
	C_LWR_CASE_QR: 1,
	C_HV_CNTR_1_QR: 1,
	C_HV_CNTR_2_QR: 1,
	C_HT_CNTR_QR: 1,
	C_PRA_QR: 1,
	C_FUSE_QR: 1,
	C_LV_W_H_QR: 1,
	C_HV_W_H_1_QR: 1,
	C_HV_W_H_2_QR: 1,
	C_HV_W_H_3_QR: 1,
	C_HV_W_H_4_QR: 1,
	C_HV_W_H_5_QR: 1,
	C_HV_W_H_6_QR: 1,
	C_HV_W_H_7_QR: 1,
	C_HV_W_H_8_QR: 1,
	C_BMU_QR: 1,
	C_CMU_1_QR: 1,
	C_CMU_2_QR: 1,
	C_CMU_3_QR: 1,
	C_CMU_4_QR: 1,
	C_CMU_5_QR: 1,
	C_CMU_6_QR: 1,
	C_CMU_7_QR: 1,
	C_CMU_8_QR: 1,
	C_MODULE_1_QR: 1,
	C_MODULE_2_QR: 1,
	C_MODULE_3_QR: 1,
	C_MODULE_4_QR: 1,
	C_MODULE_5_QR: 1,
	C_MODULE_6_QR: 1,
	C_MODULE_7_QR: 1,
	C_MODULE_8_QR: 1,
	C_MODULE_9_QR: 1,
	C_MODULE_10_QR: 1,
	C_MODULE_11_QR: 1,
	C_MODULE_12_QR: 1,
	C_MODULE_13_QR: 1,
	C_MODULE_14_QR: 1,
	C_MODULE_15_QR: 1,
	C_MODULE_16_QR: 1,
	C_MODULE_17_QR: 1,
	C_MODULE_18_QR: 1,
	C_MODULE_19_QR: 1,
	C_MODULE_20_QR: 1,
	C_MODULE_21_QR: 1,
	C_MODULE_22_QR: 1,
	C_MODULE_23_QR: 1,
	C_MODULE_24_QR: 1,
	C_MODULE_25_QR: 1,
	C_MODULE_26_QR: 1,
	C_MODULE_27_QR: 1,
	C_MODULE_28_QR: 1,
	C_MODULE_29_QR: 1,
	C_MODULE_30_QR: 1,
	C_MODULE_31_QR: 1,
	C_MODULE_32_QR: 1,
	D_UPR_CASE_QR: 1,
	D_LWR_CASE_QR: 1,
	D_HV_CNTR_1_QR: 1,
	D_HV_CNTR_2_QR: 1,
	D_RELAY_QR: 1,
	D_LV_W_H_QR: 1,
	D_HV_W_H_1_QR: 1,
	D_HV_W_H_2_QR: 1,
	D_BMU_QR: 1,
	D_CMU_1_QR: 1,
	D_MODULE_1_QR: 1,
	D_MODULE_2_QR: 1,
	D2_HV_W_H_1_QR: 1,
	D2_CMU_1_QR: 1,
	D2_RELAY_QR: 1,
	D2_BMU_QR: 1,
	D2_HV_CNTR_1_QR: 1,
	D2_HV_CNTR_2_QR: 1,
	D2_LWR_CASE_QR: 1,
	D2_UPR_CASE_QR: 1,
	D2_LV_W_H_QR: 1,
	D2_MODULE_1_QR: 1,
	A_UPR_CASE_품번: 1,
	A_LWR_CASE_품번: 1,
	A_S_PLUG_품번: 1,
	A_SPA_품번: 1,
	A_HT_CNTR_품번: 1,
	A_HV_CNTR_품번: 1,
	A_PRA_품번: 1,
	A_LV_W_H_품번: 1,
	A_HV_W_H_1_품번: 1,
	A_HV_W_H_2_품번: 1,
	A_HV_W_H_3_품번: 1,
	A_HV_W_H_4_품번: 1,
	A_HV_W_H_5_품번: 1,
	A_BMU_품번: 1,
	A_CMU_1_품번: 1,
	A_CMU_2_품번: 1,
	A_CMU_3_품번: 1,
	A_CMU_4_품번: 1,
	A_CMU_5_품번: 1,
	A_MODULE_1_품번: 1,
	A_MODULE_2_품번: 1,
	A_MODULE_3_품번: 1,
	A_MODULE_4_품번: 1,
	A_MODULE_5_품번: 1,
	B_UPR_CASE_품번: 1,
	B_LWR_CASE_품번: 1,
	B_HV_CNTR_품번: 1,
	B_HT_CNTR_품번: 1,
	B_PRA_품번: 1,
	B_FUSE_품번: 1,
	B_HV_W_H_1_품번: 1,
	B_HV_W_H_2_품번: 1,
	B_LV_W_H_품번: 1,
	B_BMU_품번: 1,
	B_CMU_1_품번: 1,
	B_CMU_2_품번: 1,
	B_CMU_3_품번: 1,
	B_CMU_4_품번: 1,
	B_CMU_5_품번: 1,
	B_MODULE_1_품번: 1,
	B_MODULE_2_품번: 1,
	B_MODULE_3_품번: 1,
	B_MODULE_4_품번: 1,
	B_MODULE_5_품번: 1,
	B_MODULE_6_품번: 1,
	B_MODULE_7_품번: 1,
	B_MODULE_8_품번: 1,
	B_MODULE_9_품번: 1,
	B_MODULE_10_품번: 1,
	C_UPR_CASE_품번: 1,
	C_LWR_CASE_품번: 1,
	C_HV_CNTR_1_품번: 1,
	C_HV_CNTR_2_품번: 1,
	C_HT_CNTR_품번: 1,
	C_PRA_품번: 1,
	C_FUSE_품번: 1,
	C_LV_W_H_품번: 1,
	C_HV_W_H_1_품번: 1,
	C_HV_W_H_2_품번: 1,
	C_HV_W_H_3_품번: 1,
	C_HV_W_H_4_품번: 1,
	C_HV_W_H_5_품번: 1,
	C_HV_W_H_6_품번: 1,
	C_HV_W_H_7_품번: 1,
	C_HV_W_H_8_품번: 1,
	C_BMU_품번: 1,
	C_CMU_1_품번: 1,
	C_CMU_2_품번: 1,
	C_CMU_3_품번: 1,
	C_CMU_4_품번: 1,
	C_CMU_5_품번: 1,
	C_CMU_6_품번: 1,
	C_CMU_7_품번: 1,
	C_CMU_8_품번: 1,
	C_MODULE_1_품번: 1,
	C_MODULE_2_품번: 1,
	C_MODULE_3_품번: 1,
	C_MODULE_4_품번: 1,
	C_MODULE_5_품번: 1,
	C_MODULE_6_품번: 1,
	C_MODULE_7_품번: 1,
	C_MODULE_8_품번: 1,
	C_MODULE_9_품번: 1,
	C_MODULE_10_품번: 1,
	C_MODULE_11_품번: 1,
	C_MODULE_12_품번: 1,
	C_MODULE_13_품번: 1,
	C_MODULE_14_품번: 1,
	C_MODULE_15_품번: 1,
	C_MODULE_16_품번: 1,
	C_MODULE_17_품번: 1,
	C_MODULE_18_품번: 1,
	C_MODULE_19_품번: 1,
	C_MODULE_20_품번: 1,
	C_MODULE_21_품번: 1,
	C_MODULE_22_품번: 1,
	C_MODULE_23_품번: 1,
	C_MODULE_24_품번: 1,
	C_MODULE_25_품번: 1,
	C_MODULE_26_품번: 1,
	C_MODULE_27_품번: 1,
	C_MODULE_28_품번: 1,
	C_MODULE_29_품번: 1,
	C_MODULE_30_품번: 1,
	C_MODULE_31_품번: 1,
	C_MODULE_32_품번: 1,
	D_UPR_CASE_품번: 1,
	D_LWR_CASE_품번: 1,
	D_HV_CNTR_1_품번: 1,
	D_HV_CNTR_2_품번: 1,
	D_RELAY_품번: 1,
	D_LV_W_H_품번: 1,
	D_HV_W_H_1_품번: 1,
	D_HV_W_H_2_품번: 1,
	D_BMU_품번: 1,
	D_CMU_1_품번: 1,
	D_MODULE_1_품번: 1,
	D_MODULE_2_품번: 1,
	D2_HV_W_H_1_품번: 1,
	D2_CMU_1_품번: 1,
	D2_RELAY_품번: 1,
	D2_BMU_품번: 1,
	D2_HV_CNTR_1_품번: 1,
	D2_HV_CNTR_2_품번: 1,
	D2_LWR_CASE_품번: 1,
	D2_UPR_CASE_품번: 1,
	D2_LV_W_H_품번: 1,
	D2_MODULE_1_품번: 1,
};

const 품번_ = {
	_id: 0,
	번호: 1,
	차종: 1,
	품번: 1,
	LWR_CASE: 1,
	UPR_CASE: 1,
	S_PLUG: 1,
	SPA: 1,
	HV_CNTR: 1,
	HT_CNTR: 1,
	PRA: 1,
	FUSE: 1,
	RELAY: 1,
	LV_W_H: 1,
	HV_W_H: 1,
	BMU: 1,
	온도센서: 1,
	CMU: 1,
	BMA: 1,
};

const 변수_ = {
	_id: 0,
	구분: 1,
	값: 1,
};

const 불량의심부품_ = {
	_id: 0,
	관리번호: 1,
	재제조comment: 1,
	A_UPR_CASE: 1,
	A_LWR_CASE: 1,
	A_S_PLUG: 1,
	A_SPA: 1,
	A_HT_CNTR: 1,
	A_HV_CNTR: 1,
	A_PRA: 1,
	A_LV_W_H: 1,
	A_HV_W_H_1: 1,
	A_HV_W_H_2: 1,
	A_HV_W_H_3: 1,
	A_HV_W_H_4: 1,
	A_HV_W_H_5: 1,
	A_BMU: 1,
	A_CMU_1: 1,
	A_CMU_2: 1,
	A_CMU_3: 1,
	A_CMU_4: 1,
	A_CMU_5: 1,
	A_MODULE_1: 1,
	A_MODULE_2: 1,
	A_MODULE_3: 1,
	A_MODULE_4: 1,
	A_MODULE_5: 1,
	B_UPR_CASE: 1,
	B_LWR_CASE: 1,
	B_HV_CNTR: 1,
	B_HT_CNTR: 1,
	B_PRA: 1,
	B_FUSE: 1,
	B_HV_W_H_1: 1,
	B_HV_W_H_2: 1,
	B_LV_W_H: 1,
	B_BMU: 1,
	B_CMU_1: 1,
	B_CMU_2: 1,
	B_CMU_3: 1,
	B_CMU_4: 1,
	B_CMU_5: 1,
	B_MODULE_1: 1,
	B_MODULE_2: 1,
	B_MODULE_3: 1,
	B_MODULE_4: 1,
	B_MODULE_5: 1,
	B_MODULE_6: 1,
	B_MODULE_7: 1,
	B_MODULE_8: 1,
	B_MODULE_9: 1,
	B_MODULE_10: 1,
	C_UPR_CASE: 1,
	C_LWR_CASE: 1,
	C_HV_CNTR_1: 1,
	C_HV_CNTR_2: 1,
	C_HT_CNTR: 1,
	C_PRA: 1,
	C_FUSE: 1,
	C_LV_W_H: 1,
	C_HV_W_H_1: 1,
	C_HV_W_H_2: 1,
	C_HV_W_H_3: 1,
	C_HV_W_H_4: 1,
	C_HV_W_H_5: 1,
	C_HV_W_H_6: 1,
	C_HV_W_H_7: 1,
	C_HV_W_H_8: 1,
	C_BMU: 1,
	C_CMU_1: 1,
	C_CMU_2: 1,
	C_CMU_3: 1,
	C_CMU_4: 1,
	C_CMU_5: 1,
	C_CMU_6: 1,
	C_CMU_7: 1,
	C_CMU_8: 1,
	C_MODULE_1: 1,
	C_MODULE_2: 1,
	C_MODULE_3: 1,
	C_MODULE_4: 1,
	C_MODULE_5: 1,
	C_MODULE_6: 1,
	C_MODULE_7: 1,
	C_MODULE_8: 1,
	C_MODULE_9: 1,
	C_MODULE_10: 1,
	C_MODULE_11: 1,
	C_MODULE_12: 1,
	C_MODULE_13: 1,
	C_MODULE_14: 1,
	C_MODULE_15: 1,
	C_MODULE_16: 1,
	C_MODULE_17: 1,
	C_MODULE_18: 1,
	C_MODULE_19: 1,
	C_MODULE_20: 1,
	C_MODULE_21: 1,
	C_MODULE_22: 1,
	C_MODULE_23: 1,
	C_MODULE_24: 1,
	C_MODULE_25: 1,
	C_MODULE_26: 1,
	C_MODULE_27: 1,
	C_MODULE_28: 1,
	C_MODULE_29: 1,
	C_MODULE_30: 1,
	C_MODULE_31: 1,
	C_MODULE_32: 1,
	D_UPR_CASE: 1,
	D_LWR_CASE: 1,
	D_HV_CNTR_1: 1,
	D_HV_CNTR_2: 1,
	D_RELAY: 1,
	D_LV_W_H: 1,
	D_HV_W_H_1: 1,
	D_HV_W_H_2: 1,
	D_BMU: 1,
	D_CMU_1: 1,
	D_MODULE_1: 1,
	D_MODULE_2: 1,
	D2_HV_W_H_1: 1,
	D2_CMU_1: 1,
	D2_RELAY: 1,
	D2_BMU: 1,
	D2_HV_CNTR_1: 1,
	D2_HV_CNTR_2: 1,
	D2_LWR_CASE: 1,
	D2_UPR_CASE: 1,
	D2_LV_W_H: 1,
	D2_MODULE_1: 1,
};

const 완료보고서_ = {
	_id: 0,
	관리번호: 1,
	pic1: 1,
	pic2: 1,
	DCIR_file: 1,
	용량평가_file: 1,
	진단_file: 1,
};

var doc_count = 0;
var update_count = 0;
var insert_count = 0;
var delete_count = 0;
var insert_id = '';
var arregation_array = [];
var flag_arrivedMSG = false;
var check = 0;
var str = '';
var file_upload_result = false;

//계정이 가지는 권한정보
var 계정_stat = '';
var id = '';
var passwd = '';

//socket.io
var socket = io();
var io_status = false;

//서버와 연결
socket.on('connect', function () {
	io_status = true;
	document.getElementById('connection_status').innerHTML = '(연결)';
	console.log('connected');

	socket.emit('계정정보', id, passwd);
	//alert('서버와 연결됨');
	//loadPage("base/login.html");
});

//자동 백업 시스템 가동중인지 아닌지
socket.on('auto_backup_db_status', function (running) {
	//console.log('auto backup status:', running);
	if (running == true) str = '백업(O)';
	else str = '백업(X)';
	document.getElementById('auto_backup_db_status').innerHTML = str;
});

//재제조번호 초기화
socket.on('init_product_no', function () {
	init_product_no();
});

//EOL공정 QR label 다운로드
socket.on('qr_lebel_result', function (result) {
	//alert(result);
	if (result == 'complete') {
		var a = document.createElement('a');
		a.href = '/qr_label';
		a.download = 'EOL_QR_LABEL';

		a.click();
	}
});

//성능검사 파일 리스트 전송 결과
socket.on('file_list_result', async function (result) {
	flag_arrivedMSG = true;
	file_upload_result = result;
	if (file_upload_result == true) {
		alert('파일이 업로드 되었습니다');
	}
	console.log(result);
});

//성능검사 용량평가 결과
socket.on('용량평가_result', async function (data) {
	용량평가_result = data;
	console.log(data);
	flag_arrivedMSG = true;
});

//성능검사 SOC 60 Percent 결과
socket.on('SOC60Percent_result', async function (data) {
	SOC60Percent_result = data;
	console.log(data);
	flag_arrivedMSG = true;
});

//성능검사 DCIR 결과
socket.on('DCIR_result', async function (data) {
	DCIR_result = data.DCIR;
	DCIR1_result = data.DCIR1;
	DCIR2_result = data.DCIR2;
	DCIR3_result = data.DCIR3;
	DCIR4_result = data.DCIR4;
	DCIR5_result = data.DCIR5;
	DCIR6_result = data.DCIR6;
	VOLT1_result = data.VOLT1;
	VOLT2_result = data.VOLT2;
	VOLT3_result = data.VOLT3;
	VOLT4_result = data.VOLT4;
	VOLT5_result = data.VOLT5;
	VOLT6_result = data.VOLT6;
	VOLT7_result = data.VOLT7;
	VOLT8_result = data.VOLT8;
	VOLT9_result = data.VOLT9;
	VOLT10_result = data.VOLT10;
	VOLT11_result = data.VOLT11;
	VOLT12_result = data.VOLT12;
	CURR1_result = data.CURR1;
	CURR2_result = data.CURR2;
	CURR3_result = data.CURR3;
	CURR4_result = data.CURR4;
	CURR5_result = data.CURR5;
	CURR6_result = data.CURR6;
	console.log(data);
	flag_arrivedMSG = true;
});

//성능검사 capacity .csv file read result
socket.on('성능검사_data_result', async function (data) {
	성능검사_data_result = data;
	flag_arrivedMSG = true;
});

//성능검사 업로드된 파일 삭제 결과
socket.on('delete_성능검사_data_result', async function (data) {
	delete_성능검사_data_result = data;
	console.log(data);
	flag_arrivedMSG = true;
});

//부품정보 서버에서 처리 결과
socket.on('부품정보_result', async function (data) {
	부품정보_result = data;
	console.log(data);
	flag_arrivedMSG = true;
});

//insert 결과
socket.on('insert_result', async function (id) {
	//console.log('insert id: ', id);
	insert_id = id;
	flag_arrivedMSG = true;
});

//count 결과
socket.on('count_result', async function (col, count, rcv_check, option = '') {
	reset_count();

	if (rcv_check != check) return;
	switch (col) {
		case BSA재제조:
			BSA재제조_cnt = 0;
			BSA재제조_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 입고:
			입고_cnt = 0;
			입고_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 세척:
			세척_cnt = 0;
			세척_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 기초검사:
			기초검사_cnt = 0;
			기초검사_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 성능검사:
			성능검사_cnt = 0;
			성능검사_cnt = JSON.parse(JSON.stringify(count));
			break;

		case EOL:
			EOL_cnt = 0;
			EOL_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 출하정보:
			출하정보_cnt = 0;
			출하정보_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 분해조립:
			분해조립_cnt = 0;
			분해조립_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 신품정보:
			신품정보_cnt = 0;
			신품정보_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 고품정보:
			고품정보_cnt = 0;
			고품정보_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 특이사항:
			특이사항_cnt = 0;
			특이사항_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 교체부품상세1:
			교체부품상세1_cnt = 0;
			교체부품상세1_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 교체부품상세2:
			교체부품상세2_cnt = 0;
			교체부품상세2_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 교체부품상세3:
			교체부품상세3_cnt = 0;
			교체부품상세3_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 교체부품상세4:
			교체부품상세4_cnt = 0;
			교체부품상세4_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 교체부품상세5:
			교체부품상세5_cnt = 0;
			교체부품상세5_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 교체부품상세6:
			교체부품상세6_cnt = 0;
			교체부품상세6_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 교체부품상세7:
			교체부품상세7_cnt = 0;
			교체부품상세7_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 교체부품상세8:
			교체부품상세8_cnt = 0;
			교체부품상세8_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 교체부품상세9:
			교체부품상세9_cnt = 0;
			교체부품상세9_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 교체부품상세10:
			교체부품상세10_cnt = 0;
			교체부품상세10_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 자재입출고:
			자재입출고_cnt = 0;
			자재입출고_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 구장재고:
			구장재고_cnt = 0;
			구장재고_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 군포재고:
			군포재고_cnt = 0;
			군포재고_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 제주재고:
			제주재고_cnt = 0;
			제주재고_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 입고_pic:
			입고_pic_cnt = 0;
			입고_pic_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 세척_pic_cnt:
			세척_pic_cnt = 0;
			세척_pic_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 기초검사_pic1:
			기초검사_pic1_cnt = 0;
			기초검사_pic1_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 기초검사_pic2:
			기초검사_pic2_cnt = 0;
			기초검사_pic2_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 기초검사_pic3:
			기초검사_pic3_cnt = 0;
			기초검사_pic3_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 기초검사_pic4:
			기초검사_pic3_cnt = 0;
			기초검사_pic3_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 분해조립_pic:
			분해조립_pic_cnt = 0;
			분해조립_pic_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 성능검사_pic:
			성능검사_pic_cnt = 0;
			성능검사_pic_cnt = JSON.parse(JSON.stringify(count));
			break;

		case EOL_pic:
			EOL_pic_cnt = 0;
			EOL_pic_cnt = JSON.parse(JSON.stringify(count));
			break;

		case EOL_pic1:
			EOL_pic_cnt = 0;
			EOL_pic_cnt = JSON.parse(JSON.stringify(count));
			break;

		case EOL_pic2:
			EOL_pic_cnt = 0;
			EOL_pic_cnt = JSON.parse(JSON.stringify(count));
			break;

		case EOL_pic3:
			EOL_pic_cnt = 0;
			EOL_pic_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 특이사항:
			특이사항_pic_cnt = 0;
			특이사항_pic_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 출하_pic:
			출하_pic_cnt = 0;
			출하_pic_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 반품입고_pic:
			반품입고_pic_cnt = 0;
			반품입고_pic_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 재출하_pic:
			재출하_pic_cnt = 0;
			재출하_pic_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 완전분해_pic:
			완전분해_pic_cnt = 0;
			완전분해_pic_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 폐기_pic:
			폐기_pic_cnt = 0;
			폐기_pic_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 기초보고서:
			기초보고서_cnt = 0;
			기초보고서_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 완료보고서:
			완료보고서_cnt = 0;
			완료보고서_cnt = JSON.parse(JSON.stringify(count));
			break;

		case 계정:
			계정_cnt = 0;
			계정_cnt = JSON.parse(JSON.stringify(count));

		case 부품정보_list:
			부품정보_list_cnt = 0;
			부품정보_list_cnt = JSON.parse(JSON.stringify(count));

		case 품번:
			품번_cnt = 0;
			품번_cnt = JSON.parse(JSON.stringify(count));

		case 변수:
			변수_cnt = 0;
			변수_cnt = JSON.parse(JSON.stringify(count));

		case 불량의심부품:
			불량의심부품_cnt = 0;
			불량의심부품_cnt = JSON.parse(JSON.stringify(count));

		case 분해조립재제조:
			분해조립재제조_cnt = 0;
			분해조립재제조_cnt = JSON.parse(JSON.stringify(count));

		case 분해조립공정대기:
			분해조립공정대기_cnt = 0;
			분해조립공정대기_cnt = JSON.parse(JSON.stringify(count));

		case 분해조립폐기자재:
			분해조립폐기자재_cnt = 0;
			분해조립폐기자재_cnt = JSON.parse(JSON.stringify(count));

		default:
			doc_count = 0;
			doc_count = JSON.parse(JSON.stringify(count));
			break;
	}

	switch (option) {
		case '입고':
			option_입고_cnt = JSON.parse(JSON.stringify(BSA재제조_cnt));
			BSA재제조_cnt = 0;
			break;

		case '세척':
			option_세척_cnt = JSON.parse(JSON.stringify(BSA재제조_cnt));
			BSA재제조_cnt = 0;
			break;

		case '기초검사':
			option_기초검사_cnt = JSON.parse(JSON.stringify(BSA재제조_cnt));
			BSA재제조_cnt = 0;
			break;

		case '분해조립':
			option_분해조립_cnt = JSON.parse(JSON.stringify(BSA재제조_cnt));
			BSA재제조_cnt = 0;
			break;

		case '성능검사':
			option_성능검사_cnt = JSON.parse(JSON.stringify(BSA재제조_cnt));
			BSA재제조_cnt = 0;
			break;

		case 'EOL':
			option_EOL_cnt = JSON.parse(JSON.stringify(BSA재제조_cnt));
			BSA재제조_cnt = 0;
			break;

		case '출하정보':
			option_출하정보_cnt = JSON.parse(JSON.stringify(BSA재제조_cnt));
			BSA재제조_cnt = 0;
			break;

		case '출하':
			option_출하_cnt = JSON.parse(JSON.stringify(BSA재제조_cnt));
			BSA재제조_cnt = 0;
			break;

		case '입고당일':
			option_입고당일_cnt = JSON.parse(JSON.stringify(BSA재제조_cnt));
			BSA재제조_cnt = 0;
			break;

		case '세척당일':
			option_세척당일_cnt = JSON.parse(JSON.stringify(BSA재제조_cnt));
			BSA재제조_cnt = 0;
			break;

		case '기초검사당일':
			option_기초검사당일_cnt = JSON.parse(JSON.stringify(BSA재제조_cnt));
			BSA재제조_cnt = 0;
			break;

		case '분해조립당일':
			option_분해조립당일_cnt = JSON.parse(JSON.stringify(BSA재제조_cnt));
			BSA재제조_cnt = 0;
			break;

		case '성능검사당일':
			option_성능검사당일_cnt = JSON.parse(JSON.stringify(BSA재제조_cnt));
			BSA재제조_cnt = 0;
			break;

		case 'EOL당일':
			option_EOL당일_cnt = JSON.parse(JSON.stringify(BSA재제조_cnt));
			BSA재제조_cnt = 0;
			break;

		case '출하정보당일':
			option_출하정보당일_cnt = JSON.parse(JSON.stringify(BSA재제조_cnt));
			BSA재제조_cnt = 0;
			break;

		case '출하당일':
			option_출하당일_cnt = JSON.parse(JSON.stringify(BSA재제조_cnt));
			BSA재제조_cnt = 0;
			break;

		default:
			break;
	}

	flag_arrivedMSG = true;
});

//find 결과
socket.on('find_result', async function (col, result, rcv_check) {
	//reset_result();
	if (rcv_check != check) {
		if(cmd == '') return;
		flag_arrivedMSG = false;

		console.log('re cmd:' , cmd);
		check++;
		if (check > 10) check = 0;
		eval(cmd);

		return;
	}

	cmd = '';

	switch (col) {
		case BSA재제조:
			BSA재제조_v = [];
			BSA재제조_v = JSON.parse(JSON.stringify(result));
			break;

		case 입고:
			입고_v = [];
			입고_v = JSON.parse(JSON.stringify(result));
			break;

		case 세척:
			세척_v = [];
			세척_v = JSON.parse(JSON.stringify(result));
			break;

		case 기초검사:
			기초검사_v = [];
			기초검사_v = JSON.parse(JSON.stringify(result));
			break;

		case 성능검사:
			성능검사_v = [];
			성능검사_v = JSON.parse(JSON.stringify(result));
			break;

		case EOL:
			EOL_v = [];
			EOL_v = JSON.parse(JSON.stringify(result));
			break;

		case 출하정보:
			출하정보_v = [];
			출하정보_v = JSON.parse(JSON.stringify(result));
			break;

		case 분해조립:
			분해조립_v = [];
			분해조립_v = JSON.parse(JSON.stringify(result));
			break;

		case 신품정보:
			신품정보_v = [];
			신품정보_v = JSON.parse(JSON.stringify(result));
			break;

		case 고품정보:
			고품정보_v = [];
			고품정보_v = JSON.parse(JSON.stringify(result));
			break;

		case 특이사항:
			특이사항_v = [];
			특이사항_v = JSON.parse(JSON.stringify(result));
			break;

		case 교체부품상세1:
			교체부품상세1_v = [];
			교체부품상세1_v = JSON.parse(JSON.stringify(result));
			break;

		case 교체부품상세2:
			교체부품상세2_v = [];
			교체부품상세2_v = JSON.parse(JSON.stringify(result));
			break;

		case 교체부품상세3:
			교체부품상세3_v = [];
			교체부품상세3_v = JSON.parse(JSON.stringify(result));
			break;

		case 교체부품상세4:
			교체부품상세4_v = [];
			교체부품상세4_v = JSON.parse(JSON.stringify(result));
			break;

		case 교체부품상세5:
			교체부품상세5_v = [];
			교체부품상세5_v = JSON.parse(JSON.stringify(result));
			break;

		case 교체부품상세6:
			교체부품상세6_v = [];
			교체부품상세6_v = JSON.parse(JSON.stringify(result));
			break;

		case 교체부품상세7:
			교체부품상세7_v = [];
			교체부품상세7_v = JSON.parse(JSON.stringify(result));
			break;

		case 교체부품상세8:
			교체부품상세8_v = [];
			교체부품상세8_v = JSON.parse(JSON.stringify(result));
			break;

		case 교체부품상세9:
			교체부품상세9_v = [];
			교체부품상세9_v = JSON.parse(JSON.stringify(result));
			break;

		case 교체부품상세10:
			교체부품상세10_v = [];
			교체부품상세10_v = JSON.parse(JSON.stringify(result));
			break;

		case 자재입출고:
			자재입출고_v = [];
			자재입출고_v = JSON.parse(JSON.stringify(result));
			break;

		case 구장재고:
			구장재고_v = [];
			구장재고_v = JSON.parse(JSON.stringify(result));
			break;

		case 군포재고:
			군포재고_v = [];
			군포재고_v = JSON.parse(JSON.stringify(result));
			break;

		case 제주재고:
			제주재고_v = [];
			제주재고_v = JSON.parse(JSON.stringify(result));
			break;

		case 입고_pic:
			입고_pic_v = [];
			입고_pic_v = JSON.parse(JSON.stringify(result));
			break;

		case 세척_pic:
			세척_pic_v = [];
			세척_pic_v = JSON.parse(JSON.stringify(result));
			break;

		case 기초검사_pic1:
			기초검사_pic1_v = [];
			기초검사_pic1_v = JSON.parse(JSON.stringify(result));
			break;

		case 기초검사_pic2:
			기초검사_pic2_v = [];
			기초검사_pic2_v = JSON.parse(JSON.stringify(result));
			break;

		case 기초검사_pic3:
			기초검사_pic3_v = [];
			기초검사_pic3_v = JSON.parse(JSON.stringify(result));
			break;

		case 기초검사_pic4:
			기초검사_pic4_v = [];
			기초검사_pic4_v = JSON.parse(JSON.stringify(result));
			break;

		case 분해조립_pic:
			분해조립_pic_v = [];
			분해조립_pic_v = JSON.parse(JSON.stringify(result));
			break;

		case 성능검사_pic:
			성능검사_pic_v = [];
			성능검사_pic_v = JSON.parse(JSON.stringify(result));
			break;

		case EOL_pic:
			EOL_pic_v = [];
			EOL_pic_v = JSON.parse(JSON.stringify(result));
			break;

		case EOL_pic1:
			EOL_pic1_v = [];
			EOL_pic1_v = JSON.parse(JSON.stringify(result));
			break;

		case EOL_pic2:
			EOL_pic2_v = [];
			EOL_pic2_v = JSON.parse(JSON.stringify(result));
			break;

		case EOL_pic3:
			EOL_pic3_v = [];
			EOL_pic3_v = JSON.parse(JSON.stringify(result));
			break;

		case 특이사항:
			특이사항_pic_v = [];
			특이사항_pic_v = JSON.parse(JSON.stringify(result));
			break;

		case 출하_pic:
			출하_pic_v = [];
			출하_pic_v = JSON.parse(JSON.stringify(result));
			break;

		case 반품입고_pic:
			반품입고_pic_v = [];
			반품입고_pic_v = JSON.parse(JSON.stringify(result));
			break;

		case 재출하_pic:
			재출하_pic_v = [];
			재출하_pic_v = JSON.parse(JSON.stringify(result));
			break;

		case 완전분해_pic:
			완전분해_pic_v = [];
			완전분해_pic_v = JSON.parse(JSON.stringify(result));
			break;

		case 폐기_pic:
			폐기_pic_v = [];
			폐기_pic_v = JSON.parse(JSON.stringify(result));
			break;

		case 기초보고서:
			기초보고서_v = [];
			기초보고서_v = JSON.parse(JSON.stringify(result));
			break;

		case 완료보고서:
			완료보고서_v = [];
			완료보고서_v = JSON.parse(JSON.stringify(result));
			break;

		case 계정:
			계정_v = [];
			계정_v = JSON.parse(JSON.stringify(result));
			break;

		case 부품정보_list:
			부품정보_list_v = [];
			부품정보_list_v = JSON.parse(JSON.stringify(result));
			break;

		case 구자료:
			구자료_v = [];
			구자료_v = JSON.parse(JSON.stringify(result));
			break;

		case 품번:
			품번_v = [];
			품번_v = JSON.parse(JSON.stringify(result));
			break;

		case 변수:
			변수_v = [];
			변수_v = JSON.parse(JSON.stringify(result));

		case 불량의심부품:
			불량의심부품_v = [];
			불량의심부품_v = JSON.parse(JSON.stringify(result));
			break;

		case 분해조립재제조:
			분해조립재제조_v = [];
			분해조립재제조_v = JSON.parse(JSON.stringify(result)); 

			break;

		case 분해조립공정대기:
			분해조립공정대기_v = [];
			분해조립공정대기_v = JSON.parse(JSON.stringify(result));
			break;

		case 분해조립폐기자재:
			분해조립폐기자재_v = [];
			분해조립폐기자재_v = JSON.parse(JSON.stringify(result));
			break;

		default:
			find_array = [];
			find_array = JSON.parse(JSON.stringify(result));
			break;
	}

	flag_arrivedMSG = true;
});

//document udate result
socket.on('update_result', async function (result) {
	update_count = 0;
	insert_count = 0;
	if (result == null) return;
	//console.log('update result count: ', result.modifiedCount);
	//console.log('insert result count: ', result.upsertedCount);
	update_count = result.modifiedCount;
	insert_count = result.upsertedCount;
	flag_arrivedMSG = true;
});

//document delete result
socket.on('delete_result', async function (count) {
	console.log('delete result count: ', count);
	delete_count = count;
	flag_arrivedMSG = true;
});

//collection drop result
socket.on('drop_result', async function (result) {
	console.log('drop result: ', result);
	flag_arrivedMSG = true;
});

//socket.io 연결끊김
socket.on('disconnect', function (reason) {
	io_status = false;
	document.getElementById('connection_status').innerHTML = '(연결끊김)';
	console.log('disconnect:', reason);
	//alert('서버와 연결 끊김');
	//socket = io();
});

//find result 결과 변수 초기화
function reset_result() {
	BSA재제조_v = [];
	입고_v = [];
	세척_v = [];
	기초검사_v = [];
	성능검사_v = [];
	EOL_v = [];
	출하정보_v = [];
	분해조립_v = [];
	신품정보_v = [];
	고품정보_v = [];
	특이사항_v = [];
	교체부품상세1_v = [];
	교체부품상세2_v = [];
	교체부품상세3_v = [];
	교체부품상세4_v = [];
	교체부품상세5_v = [];
	교체부품상세6_v = [];
	교체부품상세7_v = [];
	교체부품상세8_v = [];
	교체부품상세9_v = [];
	교체부품상세10_v = [];
	자재입출고_v = [];
	구장재고_v = [];
	군포재고_v = [];
	제주재고_v = [];
	입고_pic_v = [];
	세척_pic_v = [];
	기초검사_pic1_v = [];
	기초검사_pic2_v = [];
	기초검사_pic3_v = [];
	기초검사_pic4_v = [];
	분해조립_pic_v = [];
	성능검사_pic_v = [];
	EOL_pic_v = [];
	EOL_pic1_v = [];
	EOL_pic2_v = [];
	EOL_pic3_v = [];
	특이사항_pic_v = [];
	출하_pic_v = [];
	반품입고_pic_v = [];
	재출하_pic_v = [];
	완전분해_pic_v = [];
	폐기_pic_v = [];
	기초보고서_v = [];
	완료보고서_v = [];
	부품정보_list_v = [];
	구자료_v = [];
	품번_v = [];
	불량의심부품_v = [];
	분해조립재제조_v = [];
	분해조립공정대기_v = [];
	분해조립폐기자재_v = [];
	find_array = [];
}

//count 초기화
function reset_count() {
	BSA재제조_cnt = 0;
	입고_cnt = 0;
	세척_cnt = 0;
	기초검사_cnt = 0;
	성능검사_cnt = 0;
	EOL_cnt = 0;
	출하정보_cnt = 0;
	분해조립_cnt = 0;
	신품정보_cnt = 0;
	고품정보_cnt = 0;
	특이사항_cnt = 0;
	교체부품상세1_cnt = 0;
	교체부품상세2_cnt = 0;
	교체부품상세3_cnt = 0;
	교체부품상세4_cnt = 0;
	교체부품상세5_cnt = 0;
	교체부품상세6_cnt = 0;
	교체부품상세7_cnt = 0;
	교체부품상세8_cnt = 0;
	교체부품상세9_cnt = 0;
	교체부품상세10_cnt = 0;
	자재입출고_cnt = 0;
	구장재고_cnt = 0;
	군포재고_cnt = 0;
	제주재고_cnt = 0;
	입고_pic_cnt = 0;
	세척_pic_cnt = 0;
	기초검사_pic1_cnt = 0;
	기초검사_pic2_cnt = 0;
	기초검사_pic3_cnt = 0;
	기초검사_pic4_cnt = 0;
	분해조립_pic_cnt = 0;
	성능검사_pic_cnt = 0;
	EOL_pic_cnt = 0;
	EOL_pic1_cnt = 0;
	EOL_pic2_cnt = 0;
	EOL_pic3_cnt = 0;
	특이사항_pic_cnt = 0;
	출하_pic_cnt = 0;
	반품입고_pic_cnt = 0;
	재출하_pic_cnt = 0;
	완전분해_pic_cnt = 0;
	폐기_pic_cnt = 0;
	기초보고서_cnt = 0;
	완료보고서_cnt = 0;
	부품정보_list_cnt = 0;
	품번_cnt = 0;
	불량의심부품_cnt = 0;
	분해조립재제조_cnt = 0;
	분해조립공정대기_cnt = 0;
	분해조립폐기자재_cnt = 0;
	doc_count = 0;
}

//성능검사 업로드 파일 리스트 전송
async function send_list(file_list) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	file_upload_result = false;
	socket.timeout(2000).emit('file_list', file_list);
}

//완료보고서 파일 업로드 파일 리스트 전송
async function send_list2(file_list) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	file_upload_result = false;
	socket.timeout(2000).emit('file_list2', file_list);
}

//QR label 만들기
async function make_qr_label(html_string) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('qr_label', html_string);
}

//mongoDB 결합 조회
async function aggregate() {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('aggregate', level);
}

//count
async function count(col, query, option = '') {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;
	socket.timeout(2000).emit('count', level, col, query, check, option);
}

//insert
async function insert(col, doc) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('insert', worker, col, doc);
}

//insertMany
async function insertMany(col, doc) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('insertMany', worker, col, doc);
}

//update
async function update(col, doc) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('update', worker, col, { 관리번호: doc.관리번호 }, { $set: doc });
}

//자재입출고 update(by QR)
async function update_자재입출고(col, doc) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('update', worker, col, { QR: doc.QR }, { $set: doc });
}

//보고서 update(by level)
async function update_보고서(col, doc) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('update', worker, col, { level: doc.level }, { $set: doc });
}

//update by 재제조번호
async function update_재제조번호(col, doc) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('update', worker, col, { 재제조번호: doc.재제조번호 }, { $set: doc });
}

//부품 구자료 엑셀 문서를 DB에 update하기위한것
async function update_구자료(col, doc) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('update', worker, col, { 품번: doc.품번 }, { $set: doc });
}

//계정정보 업데이트(by id)
async function update_계정(col, doc) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('update', worker, col, { id: doc.id }, { $set: doc });
}

//품번 업데이트(by 번호)
async function update_품번(col, doc) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('update', worker, col, { 번호: doc.번호 }, { $set: doc });
}

//재제조번호 자동으로 만들때 최근 번호를 저장하기 위한용도(범용적으로 쓸수 있겠끔 만들었음)
async function update_변수(col, doc) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('update', worker, col, { 구분: doc.구분 }, { $set: doc });
}

//신품정보를 업데이트
async function update_신품정보(col, doc) {
	if (socket == undefined) return;
	if (doc.QR == '') return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('update', worker, col, { QR: doc.QR }, { $set: doc });
}

//고품 정보를 업데이트
async function update_고품정보(col, doc) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('update', worker, col, { QR: doc.QR }, { $set: doc });
}

//분해조립재제조
async function update_분해조립재제조(col, doc) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('update', worker, col, { 교체전QR: doc.교체전QR }, { $set: doc });
}

//분해조립공정대기 업데이트
async function update_분해조립공정대기(col, doc) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('update', worker, col, { QR: doc.QR }, { $set: doc });
}

//분해조립폐기자재 업데이트
async function update_분해조립폐기자재(col, doc) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('update', worker, col, { QR: doc.QR }, { $set: doc });
}

//document update by id
async function update_by_id(col, doc) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('update_by_id', worker, col, { _id: doc.id }, { $set: doc });
}

//delete document by 관리번호
async function deleteOne(col, management_id) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('delete', worker, col, { 관리번호: management_id });
}

//document delete by id
async function deleteOneBSA(col, id) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('delete_by_id', worker, col, id);
}

//document delete by 재제조번호
async function deleteOne재제조번호(col, 재제조번호) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('delete', worker, col, { 재제조번호: 재제조번호 });
}

//document delete by 신품정보
async function deleteOne_신품정보(col, QR) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('delete', worker, col, { QR: QR });
}

//document delete by 고품정보
async function deleteOne_고품정보(col, QR) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('delete', worker, col, { QR: QR });
}

//document delete 구장정보
async function deleteOne_구장재고(col, 관리번호) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('delete', worker, col, { 관리번호: 관리번호 });
}

//document delete 군포재고
async function deleteOne_군포재고(col, 관리번호) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('delete', worker, col, { 관리번호: 관리번호 });
}

//document delete 제주재고
async function deleteOne_제주재고(col, 관리번호) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('delete', worker, col, { 관리번호: 관리번호 });
}

//document delete 분해조립재제조 by 관리번호
async function deleteOne_분해조립재제조(col, 관리번호) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('delete', worker, col, { 관리번호: { $eq: 관리번호 } });
}

//document delete 분해조립재제조 by 교체전QR
async function delete_분해조립재제조(col, 교체전QR) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('delete', worker, col, { 교체전QR: 교체전QR });
}

//document delete 분해조립공정대기 by 관리번호
async function deleteOne_분해조립공정대기(col, 관리번호) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('delete', worker, col, { 관리번호: 관리번호 });
}

//document delete 분해조립공정대기 by QR
async function delete_분해조립공정대기(col, QR) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('delete', worker, col, { QR: QR });
}
//document delete 분해조립폐기자재 by 관리번호
async function deleteOne_분해조립폐기자재(col, 관리번호) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('delete', worker, col, { 관리번호: 관리번호 });
}

//분해조립폐기자재 delete
async function delete_분해조립폐기자재(col, QR) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('delete', worker, col, { QR: QR });
}

//계정 delete
async function delete_계정(_id) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('delete', worker, 계정, { id: _id });
}

//drop collection
async function drop(_col) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('drop', worker, _col);
}

//부품정보처리를 서버에 의탁함
async function 부품정보처리(start, end) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('부품정보', start, end);
}

//find(조회)
async function find(col, management_id) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;

	console.log('find:', col, management_id);
	check++;
	if (check > 10) check = 0;

	switch (col) {
		case 'BSA재제조':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: BSA재제조_ }, check);
			break;

		case '입고':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 입고_ }, check);
			break;

		case '세척':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 세척_ }, check);
			break;

		case '기초검사':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 기초검사_ }, check);
			break;

		case '성능검사':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 성능검사_ }, check);
			break;

		case 'EOL':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: EOL_ }, check);
			break;

		case '출하정보':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 출하정보_ }, check);
			break;

		case '분해조립':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 분해조립_ }, check);
			break;

		case '분해조립_부품정보':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 분해조립_부품정보_ }, check);
			break;

		case '고품정보':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 고품정보_ }, check);
			break;

		case '신품정보':
			socket.timeout(2000).emit('findOne', worker, col, { QR: management_id }, { sort: { kind: 1 }, projection: 신품정보_ }, check);
			break;

		case '특이사항':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 특이사항_ }, check);
			break;

		case '교체부품상세1':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 교체부품상세_ }, check);
			break;

		case '교체부품상세2':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 교체부품상세_ }, check);
			break;

		case '교체부품상세3':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 교체부품상세_ }, check);
			break;

		case '교체부품상세4':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 교체부품상세_ }, check);
			break;

		case '교체부품상세5':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 교체부품상세_ }, check);
			break;

		case '교체부품상세6':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 교체부품상세_ }, check);
			break;

		case '교체부품상세7':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 교체부품상세_ }, check);
			break;

		case '교체부품상세8':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 교체부품상세_ }, check);
			break;

		case '교체부품상세9':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 교체부품상세_ }, check);
			break;

		case '교체부품상세10':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 교체부품상세_ }, check);
			break;

		case '입고_pic':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 입고_pic_ }, check);
			break;

		case '세척_pic':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 세척_pic_ }, check);
			break;

		case '기초검사_pic1':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 기초검사_pic1_ }, check);
			break;

		case '기초검사_pic2':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 기초검사_pic2_ }, check);
			break;

		case '기초검사_pic3':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 기초검사_pic3_ }, check);
			break;

		case '기초검사_pic4':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 기초검사_pic4_ }, check);
			break;

		case '분해조립_pic':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 분해조립_pic_ }, check);
			break;

		case '성능검사_pic':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 성능검사_pic_ }, check);
			break;

		case 'EOL_pic':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: EOL_pic_ }, check);
			break;

		case 'EOL_pic1':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: EOL_pic_ }, check);
			break;

		case 'EOL_pic2':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: EOL_pic_ }, check);
			break;

		case 'EOL_pic3':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: EOL_pic_ }, check);
			break;

		case '특이사항_pic':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 특이사항_pic_ }, check);
			break;

		case '출하_pic':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 출하_pic_ }, check);
			break;

		case '반품입고_pic':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 반품입고_pic_ }, check);
			break;

		case '재출하_pic':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 재출하_pic_ }, check);
			break;

		case '완전분해_pic':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 완전분해_pic_ }, check);
			break;

		case '폐기_pic':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 폐기_pic_ }, check);
			break;

		case '구장재고':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 구장재고_ }, check);
			break;

		case '군포재고':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 군포재고_ }, check);
			break;

		case '제주재고':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 제주재고_ }, check);
			break;

		case '창고이동':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 창고이동_ }, check);
			break;

		case '부품정보_list':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 부품정보_list_ }, check);
			break;

		case '품번':
			socket.timeout(2000).emit('findOne', worker, col, { 번호: management_id }, { sort: { kind: 1 }, projection: 품번_ }, check);
			break;

		case '변수':
			socket.timeout(2000).emit('findOne', worker, col, { 구분: management_id }, { sort: { kind: 1 }, projection: 변수_ }, check);
			break;

		case '불량의심부품':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 불량의심부품_ }, check);
			break;

		case '불량의심부품':
			socket.timeout(2000).emit('findOne', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 불량의심부품_ }, check);
			break;

		case '분해조립재제조':
			socket.timeout(2000).emit('find', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 분해조립재제조_ }, check);
			break;

		case '분해조립공정대기':
			socket.timeout(2000).emit('find', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 분해조립공정대기_ }, check);
			break;

		case '분해조립폐기자재':
			socket.timeout(2000).emit('find', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 분해조립폐기자재_ }, check);
			break;

		case '완료보고서':
			socket.timeout(2000).emit('find', worker, col, { 관리번호: management_id }, { sort: { kind: 1 }, projection: 완료보고서_ }, check);
			break;

		default:
			console.log('collection name is not match');
	}
}

//변수(최근 만든 재제조번호) 조회
async function findOne_변수(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;
	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 변수_ }, check);
}

//불량의심부품 조회
async function findOne_불량의심부품(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;
	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 불량의심부품_ }, check);
}

//분해조립재제조 조회
async function find_분해조립재제조(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++; // 조회 명령을 한번에 여러개 날렸을때 섞이는것 방지 목적
	if (check > 10) check = 0;
	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 분해조립재제조_ }, check);
}

//분해조립공정대기 조회
async function findOne_분해조립공정대기(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;
	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 분해조립공정대기_ }, check);
}

//분해조립폐기자재 조회
async function findOne_분해조립폐기자재(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;
	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 분해조립폐기자재_ }, check);
}

//품번 조회
async function findOne_품번(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;
	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 품번_ }, check);
}

//구자료 조회
async function findOne_구자료(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;
	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 구자료_ }, check);
}

//기초보고서 조회
async function findOne_기초보고서(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;
	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 기초보고서_ }, check);
}

//완료보고서 조회
async function findOne_완료보고서(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 완료보고서_ }, check);
}

//계정 조회
async function findOne_계정(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 계정_ }, check);
}

//구장재고 조회
async function findOne_구장재고(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 구장재고_ }, check);
}

//군포재고 조회
async function findOne_군포재고(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 군포재고_ }, check);
}

//제주재고 조회
async function findOne_제주재고(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 제주재고_ }, check);
}

//창고이동 조회
async function findOne_창고이동(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 창고이동_ }, check);
}

//신품정보 조회
async function findOne_신품정보(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 자재입출고_ }, check);
}

//고품정보 조회
async function findOne_고품정보(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 고품정보_ }, check);
}

//기본정보 조회
async function findOne_BSA재제조(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: BSA재제조_ }, check);
}

//입고 조회
async function findOne_입고(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 입고_ }, check);
}

//세척 조회
async function findOne_세척(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 세척_ }, check);
}

//기초검사 조회
async function findOne_기초검사(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 기초검사_ }, check);
}

//분해조립 조회
async function findOne_분해조립(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 분해조립_ }, check);
}

//성능검사 조회
async function findOne_성능검사(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 성능검사_ }, check);
}

//EOL 조회
async function findOne_EOL(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: EOL_ }, check);
}

//출하정보 조회
async function findOne_출하정보(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 출하정보_ }, check);
}

//특이사항 조회
async function findOne_특이사항(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 특이사항_ }, check);
}

//교체부품상세 조회
async function findOne_교체부품상세(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 교체부품상세_ }, check);
}

//자재입출고 조회
async function findOne_자재입출고(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 자재입출고_ }, check);
}

//부품정보 list 조회
async function findOne_부품정보_list(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('findOne', worker, col, query, { sort: { kind: 1 }, projection: 부품정보_list_ }, check);
}

//기초보고서 조회
async function find_기초보고서(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;
	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 기초보고서_ }, check);
}

//완료보고서 조회
async function find_완료보고서(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 완료보고서_ }, check);
}

//구자료 조회
async function find_구자료(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 구자료_ }, check);
}

//계정 조회
async function find_계정(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 계정_ }, check);
}

//분해조립재제조 조회
async function find_분해조립재제조(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;
	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 분해조립재제조_ }, check);
}

//분해조립공정대기 조회
async function find_분해조립공정대기(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;
	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 분해조립공정대기_ }, check);
}

//분해조립폐기자재 조회
async function find_분해조립폐기자재(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;
	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 분해조립폐기자재_ }, check);
}

//불량의심부품 조회
async function find_불량의심부품(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;
	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 불량의심부품_ }, check);
}

//품번 조회
async function find_품번(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;
	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 품번_ }, check);
}

//구장재고 조회
async function find_구장재고(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 구장재고_ }, check);
}

//군포재고 조회
async function find_군포재고(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 군포재고_ }, check);
}

//제주 재고 조회
async function find_제주재고(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 제주재고_ }, check);
}

//창고이동 조회
async function find_창고이동(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 창고이동_ }, check);
}

//신품정보 조회
async function find_신품정보(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 자재입출고_ }, check);
}

//고품정보 조회
async function find_고품정보(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 고품정보_ }, check);
}

//기본정보 조회
async function find_BSA재제조(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: BSA재제조_ }, check);
}

//입고 조회
async function find_입고(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 입고_ }, check);
}

//세척 조회
async function find_세척(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 세척_ }, check);
}

//기초검사 조회
async function find_기초검사(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 기초검사_ }, check);
}

//분해조립 조회
async function find_분해조립(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 분해조립_ }, check);
}

//성능검사 조회
async function find_성능검사(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 성능검사_ }, check);
}

//EOL 조회
async function find_EOL(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: EOL_ }, check);
}

//EOL 사진 조회
async function find_EOL_pic(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: EOL_pic_ }, check);
}

//출하정보 조회
async function find_출하정보(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 출하정보_ }, check);
}

//특이사항 조회
async function find_특이사항(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 특이사항_ }, check);
}

//세적에서 재제조번호 자동 생성에서 번호 초기화
function init_변수() {
	if (socket == undefined) return;

	socket.timeout(2000).emit('init_변수');
}

//교체부품상세 조회
async function find_교체부품상세(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 교체부품상세_ }, check);
}

//자재입출고 조회
async function find_자재입출고(col, query) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	check++;
	if (check > 10) check = 0;

	socket.timeout(2000).emit('find', worker, col, query, { sort: { kind: 1 }, projection: 자재입출고_ }, check);
}

//성능검사 용량평가 파일 PATH 전송
async function 용량평가(path) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('용량평가', path);
}

//성능검사 SOC60Percent 파일 PATH 전송
async function SOC60Percent(path) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('SOC60Percent', path);
}

//성능검사 DCIR PATH 전송
async function DCIR(path) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('DCIR', path);
}

//성능검사 data PATH
async function get_성능검사_data(path) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;
	socket.timeout(2000).emit('성능검사_data', path);
}

//성능검사 data  delete
async function delete_성능검사_data(관리번호) {
	if (socket == undefined) return;
	flag_arrivedMSG = false;

	const tmp_name = 관리번호.replace('#', '');
	const path = 'excel/' + tmp_name + '/excel1.csv';

	socket.timeout(2000).emit('delete_성능검사_data', path);
}

//sleep 구현
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

//서버에 요청을 보낸후 응답을 기다리는 함수
async function delay() {
	while (flag_arrivedMSG == false) {
		await sleep(1);
	}

	//return true;
}

//업체 구함
function 업체(code) {
	let result = 'kia';

	switch (code) {
		case 'DE_EV':
		case 'DEPBV_EV':
		case 'CV_EV':
		case 'MV_EV':
		case 'PU_EV':
		case 'SG2_EV':
		case 'TAM_EV':
		case 'PS_EV':
		case 'SK3_EV':
			result = 'kia';
			break;

		case 'OS_EV':
		case 'NE_EV':
		case 'HR_EV':
		case 'LK_EV':
		case 'LM_EV':
		case 'LKFC_EV':
		case 'CS_EV':
		case 'SX2_EV':
		case 'AE_EV':
		case 'CE_EV':
		case 'ME_EV':
		case 'FE_EV':
		case 'RG3_EV':
		case 'JW_EV':
		case 'JX_EV':
			result = 'hyundai';
			break;

		default:
			result = 'none';
			break;
	}

	return result;
}

//공정단계 정리(구 엑셀 문서로 올린 정보 정리)
async function 공정단계자동입력(_관리번호, 단계 = '') {
	findOne_BSA재제조(BSA재제조, { 관리번호: _관리번호, 공정단계: { $ne: '출하' } });
	await delay();

	if (BSA재제조_v == null) return;

	var _공정단계 = '입고';
	if (BSA재제조_v.입고 != '' && BSA재제조_v.입고 != undefined) _공정단계 = '세척';
	if (BSA재제조_v.세척 != '' && BSA재제조_v.세척 != undefined) _공정단계 = '기초검사';
	if (BSA재제조_v.기초검사 != '' && BSA재제조_v.기초검사 != undefined) _공정단계 = '분해조립';
	if (BSA재제조_v.분해조립 != '' && BSA재제조_v.분해조립 != undefined) _공정단계 = '성능검사';
	if (BSA재제조_v.성능검사 != '' && BSA재제조_v.성능검사 != undefined) _공정단계 = 'EOL';
	if (BSA재제조_v.EOL != '' && BSA재제조_v.EOL != undefined) _공정단계 = '제조완료';
	if (BSA재제조_v.출하검사 != '' && BSA재제조_v.출하검사 != undefined) _공정단계 = '제조완료';
	if (BSA재제조_v.출하 != '' && BSA재제조_v.출하 != undefined) _공정단계 = '출하';
	if (BSA재제조_v.완전분해 != '' && BSA재제조_v.완전분해 != undefined) _공정단계 = '완전분해';
	if (BSA재제조_v.폐기 != '' && BSA재제조_v.폐기 != undefined) _공정단계 = '폐기';
	if (단계 != '') _공정단계 = 단계;

	var doc = {
		관리번호: _관리번호,
		공정단계: _공정단계,
	};

	update(BSA재제조, doc);
	await delay();
}

//각 공정 처리후 공정 선택 화면으로 되돌아가기
function back() {
	loadPage('base/item-details.html');
}

//init 변수 (세척에서 재제조 번호 자동생성시 사용하는 값 저장위해)
async function init_변수() {
	var doc = 변수_doc;
	doc.구분 = 'mado_product_no';
	doc.값 = '855'; //임의의 재제조번호 시작값

	update_변수(변수, doc);
	await delay();

	if (update_count > 0) {
		alert('업데이트 되었습니다');
	}

	if (insert_count > 0) {
		alert('저장 되었습니다');
	}

	doc = 변수_doc;
	doc.구분 = 'hs_product_no';
	doc.값 = '855';

	update_변수(변수, doc);
	await delay();

	doc = 변수_doc;
	doc.구분 = 'jj_product_no';
	doc.값 = '0';

	update_변수(변수, doc);
	await delay();

	console.log('mado_product_no_complete');
}

//재제조번호 자동 생겅(세척 공정)
async function make_md_product_no(today_count) {
	var DateTime = luxon.DateTime;
	var seoul = DateTime.local().setZone('Asia/Seoul');
	var now = seoul.toString().substr(2, 2);

	var no = '#RS' + now + '-MD' + today_count.toString().padStart(4, '0');

	return no;
}

//재제조번호 자동 생성 시작값 초기화
async function init_product_no() {
	var doc = JSON.parse(JSON.stringify(변수_doc));
	doc.구분 = 'mado_product_no';
	doc.값 = '0';

	update('변수', doc);
	await delay();

	console.log(update_count);
	console.log(insert_count);

	doc = JSON.parse(JSON.stringify(변수_doc));
	doc.구분 = 'hs_product_no';
	doc.값 = '0';

	update('변수', doc);
	await delay();

	console.log(update_count);
	console.log(insert_count);

	doc = JSON.parse(JSON.stringify(변수_doc));
	doc.구분 = 'jj_product_no';
	doc.값 = '0';

	update('변수', doc);
	await delay();

	console.log(update_count);
	console.log(insert_count);

	console.log('mado_product_no_complete');
}

//기본정보의 쓰레기값 제거
async function undefined_check(BSA재제조_v) {
	if (BSA재제조_v == null) return;
	if (BSA재제조_v.입고 == undefined) BSA재제조_v.입고 = '';
	if (BSA재제조_v.제조투입 == undefined) BSA재제조_v.제조투입 = '';
	if (BSA재제조_v.세척투입일 == undefined) BSA재제조_v.세척투입일 = '';
	if (BSA재제조_v.세척 == undefined) BSA재제조_v.세척 = '';
	if (BSA재제조_v.기초검사투입일 == undefined) BSA재제조_v.기초검사투입일 = '';
	if (BSA재제조_v.기초검사 == undefined) BSA재제조_v.기초검사 = '';
	if (BSA재제조_v.분해조립투입일 == undefined) BSA재제조_v.분해조립투입일 = '';
	if (BSA재제조_v.분해조립 == undefined) BSA재제조_v.분해조립 = '';
	if (BSA재제조_v.성능검사투입일 == undefined) BSA재제조_v.성능검사투입일 = '';
	if (BSA재제조_v.성능검사 == undefined) BSA재제조_v.성능검사 = '';
	if (BSA재제조_v.EOL투입일 == undefined) BSA재제조_v.EOL투입일 = '';
	if (BSA재제조_v.EOL == undefined) BSA재제조_v.EOL = '';
	if (BSA재제조_v.출하검사 == undefined) BSA재제조_v.출하검사 = '';
	if (BSA재제조_v.출하 == undefined) BSA재제조_v.출하 = '';
	if (BSA재제조_v.소재지 == undefined) BSA재제조_v.소재지 = '';
	if (BSA재제조_v.마지막충전일 == undefined) BSA재제조_v.마지막충전일 = '';
	if (BSA재제조_v.반품입고 == undefined) BSA재제조_v.반품입고 = '';
	if (BSA재제조_v.재출하 == undefined) BSA재제조_v.재출하 = '';
	if (BSA재제조_v.완전분해 == undefined) BSA재제조_v.완전분해 = '';
	if (BSA재제조_v.폐기 == undefined) BSA재제조_v.폐기 = '';
	if (BSA재제조_v.출하예약 == undefined) BSA재제조_v.출하예약 = '';
	if (BSA재제조_v.렉번호 == undefined) BSA재제조_v.렉번호 = '';
}

//이미지 to Base64 text
const toBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;
	});

//드래그 앤 드롭으로 넣은 사진을 일정한 레졸루션으로 축소
async function resize_pic(file, img, 예외 = false, no = false) {
	if (예외 == false && no == false) {
		//선명도가 떨어져도 괜찮은 이미지
		ImageResizer.resizeImage(file, { maxWidth: 250, maxHeight: 250 }, async function (resultFile) {
			img.src = await toBase64(resultFile);
			console.log(img.src);
		});
	} else if (no == false) {
		//선명도가 높아야하는 이미지
		ImageResizer.resizeImage(file, { maxWidth: 2000, maxHeight: 2000 }, async function (resultFile) {
			img.src = await toBase64(resultFile);
			console.log(img.src);
		});
	} else {
		//사진 축소를 하지 않을 이미지
		img.src = await toBase64(file);
	}
}

//BASE64 string를 이미지 태그어 넣어 이미지로 보여줌
async function pic_to_img(_data, _img) {
	_img.src = _data;
	console.log(_img.src);
}

//socket.io 연결 강제로 끊음
function socket_disconnec() {
	socket.disconnect();
}

//파일 다운로드
function downloadURI(uri, name) {
	var link = document.createElement('a');
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	delete link;
}
