
namespace KCL_reBMS_Prj
{
    partial class MainForm
    {
        /// <summary>
        /// 필수 디자이너 변수입니다.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 사용 중인 모든 리소스를 정리합니다.
        /// </summary>
        /// <param name="disposing">관리되는 리소스를 삭제해야 하면 true이고, 그렇지 않으면 false입니다.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form 디자이너에서 생성한 코드

        /// <summary>
        /// 디자이너 지원에 필요한 메서드입니다. 
        /// 이 메서드의 내용을 코드 편집기로 수정하지 마세요.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea1 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend1 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.Windows.Forms.DataVisualization.Charting.Series series1 = new System.Windows.Forms.DataVisualization.Charting.Series();
            this.timer1 = new System.Windows.Forms.Timer(this.components);
            this.pbPoenLogo = new System.Windows.Forms.PictureBox();
            this.backgroundWorker1 = new System.ComponentModel.BackgroundWorker();
            this.tabPage4 = new System.Windows.Forms.TabPage();
            this.groupBox4 = new System.Windows.Forms.GroupBox();
            this.lbMonitoringCycleTime = new System.Windows.Forms.Label();
            this.tbMonitoringCycleTime = new System.Windows.Forms.TextBox();
            this.btMonitoringCycleTimeSet = new System.Windows.Forms.Button();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.btFactoryInit = new System.Windows.Forms.Button();
            this.gbBMUVersion = new System.Windows.Forms.GroupBox();
            this.tbBMUVersion = new System.Windows.Forms.TextBox();
            this.gbConnection = new System.Windows.Forms.GroupBox();
            this.btConnect = new System.Windows.Forms.Button();
            this.cbPort = new System.Windows.Forms.ComboBox();
            this.gbSOH = new System.Windows.Forms.GroupBox();
            this.label61 = new System.Windows.Forms.Label();
            this.btInitSOH = new System.Windows.Forms.Button();
            this.lbSOH = new System.Windows.Forms.Label();
            this.tbSOH = new System.Windows.Forms.TextBox();
            this.tbSetSOH = new System.Windows.Forms.TextBox();
            this.btSetSOH = new System.Windows.Forms.Button();
            this.gbSOC = new System.Windows.Forms.GroupBox();
            this.label60 = new System.Windows.Forms.Label();
            this.lbSOC = new System.Windows.Forms.Label();
            this.tbSOC = new System.Windows.Forms.TextBox();
            this.btInitSOC = new System.Windows.Forms.Button();
            this.tbSetSOC = new System.Windows.Forms.TextBox();
            this.btSetSOC = new System.Windows.Forms.Button();
            this.tabPage2 = new System.Windows.Forms.TabPage();
            this.pnSaveFileRelease = new System.Windows.Forms.Panel();
            this.btLoadFileProtect = new System.Windows.Forms.Button();
            this.btSaveFileProtect = new System.Windows.Forms.Button();
            this.panel4 = new System.Windows.Forms.Panel();
            this.btProtectSettingLoad = new System.Windows.Forms.Button();
            this.btProtectSettingSave = new System.Windows.Forms.Button();
            this.gbProtectRelease = new System.Windows.Forms.GroupBox();
            this.lbinterLockErrorPR = new System.Windows.Forms.Label();
            this.lbSelfSystemDiagPR = new System.Windows.Forms.Label();
            this.cbProtectReleaseRetain13 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseRetain14 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseRetain12 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseValue14 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseValue13 = new System.Windows.Forms.NumericUpDown();
            this.lbCommunicationErrorPR = new System.Windows.Forms.Label();
            this.cbProtectReleaseValue12 = new System.Windows.Forms.NumericUpDown();
            this.lbSLMPR = new System.Windows.Forms.Label();
            this.lbCurrentSensorErrorPR = new System.Windows.Forms.Label();
            this.cbProtectReleaseValue4 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseValue3 = new System.Windows.Forms.NumericUpDown();
            this.label189 = new System.Windows.Forms.Label();
            this.cbProtectReleaseValue11 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseValue10 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseValue9 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseValue8 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseValue7 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseValue6 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseValue5 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseValue2 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseValue1 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseRetain4 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseRetain3 = new System.Windows.Forms.NumericUpDown();
            this.lbPOVPR = new System.Windows.Forms.Label();
            this.lbPLVPR = new System.Windows.Forms.Label();
            this.cbProtectReleaseRetain10 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseRetain11 = new System.Windows.Forms.NumericUpDown();
            this.label188 = new System.Windows.Forms.Label();
            this.cbProtectReleaseRetain9 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseRetain8 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseRetain7 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseRetain6 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseRetain5 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseRetain2 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectReleaseRetain1 = new System.Windows.Forms.NumericUpDown();
            this.lbCDPR = new System.Windows.Forms.Label();
            this.lbCOVPR = new System.Windows.Forms.Label();
            this.lbCLVPR = new System.Windows.Forms.Label();
            this.lbCOTPR = new System.Windows.Forms.Label();
            this.lbCLTPR = new System.Windows.Forms.Label();
            this.lbCOAPR = new System.Windows.Forms.Label();
            this.lbDOAPR = new System.Windows.Forms.Label();
            this.gbProtectSet = new System.Windows.Forms.GroupBox();
            this.lbCDP = new System.Windows.Forms.Label();
            this.lbinterLockErrorP = new System.Windows.Forms.Label();
            this.lbSelfSystemDiagP = new System.Windows.Forms.Label();
            this.cbProtectEnable14 = new System.Windows.Forms.CheckBox();
            this.cbProtectEnable13 = new System.Windows.Forms.CheckBox();
            this.cbProtectEnable12 = new System.Windows.Forms.CheckBox();
            this.cbProtectRetainTime13 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectRetainTime14 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectRetainTime12 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectValue14 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectValue13 = new System.Windows.Forms.NumericUpDown();
            this.lbCommunicationErrorP = new System.Windows.Forms.Label();
            this.cbProtectValue12 = new System.Windows.Forms.NumericUpDown();
            this.lbSLMP = new System.Windows.Forms.Label();
            this.lbCurrentSensorErrorP = new System.Windows.Forms.Label();
            this.cbProtectRetainTime4 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectRetainTime3 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectRetainTime10 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectRetainTime11 = new System.Windows.Forms.NumericUpDown();
            this.label88 = new System.Windows.Forms.Label();
            this.cbProtectRetainTime9 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectRetainTime8 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectRetainTime7 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectRetainTime6 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectRetainTime5 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectRetainTime2 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectRetainTime1 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectEnable4 = new System.Windows.Forms.CheckBox();
            this.cbProtectEnable3 = new System.Windows.Forms.CheckBox();
            this.cbProtectValue4 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectValue3 = new System.Windows.Forms.NumericUpDown();
            this.lbPLVP = new System.Windows.Forms.Label();
            this.lbPOVP = new System.Windows.Forms.Label();
            this.cbProtectEnable11 = new System.Windows.Forms.CheckBox();
            this.cbProtectEnable10 = new System.Windows.Forms.CheckBox();
            this.cbProtectEnable9 = new System.Windows.Forms.CheckBox();
            this.cbProtectEnable8 = new System.Windows.Forms.CheckBox();
            this.cbProtectEnable7 = new System.Windows.Forms.CheckBox();
            this.cbProtectEnable6 = new System.Windows.Forms.CheckBox();
            this.cbProtectEnable5 = new System.Windows.Forms.CheckBox();
            this.cbProtectEnable2 = new System.Windows.Forms.CheckBox();
            this.cbProtectEnable1 = new System.Windows.Forms.CheckBox();
            this.label190 = new System.Windows.Forms.Label();
            this.lbCOAP = new System.Windows.Forms.Label();
            this.cbProtectValue11 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectValue10 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectValue9 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectValue8 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectValue7 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectValue6 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectValue5 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectValue2 = new System.Windows.Forms.NumericUpDown();
            this.cbProtectValue1 = new System.Windows.Forms.NumericUpDown();
            this.lbDOAP = new System.Windows.Forms.Label();
            this.lbCLTP = new System.Windows.Forms.Label();
            this.lbCOTP = new System.Windows.Forms.Label();
            this.lbCLVP = new System.Windows.Forms.Label();
            this.lbCOVP = new System.Windows.Forms.Label();
            this.tabPage1 = new System.Windows.Forms.TabPage();
            this.gbLoggingStatus = new System.Windows.Forms.GroupBox();
            this.btLoggingStart = new System.Windows.Forms.Button();
            this.button2 = new System.Windows.Forms.Button();
            this.tbLogStatus = new System.Windows.Forms.TextBox();
            this.gbVoltage = new System.Windows.Forms.GroupBox();
            this.pnModule = new System.Windows.Forms.Panel();
            this.lb_IC10 = new System.Windows.Forms.Label();
            this.chart1 = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.lb_IC9 = new System.Windows.Forms.Label();
            this.lb_IC8 = new System.Windows.Forms.Label();
            this.lb_IC7 = new System.Windows.Forms.Label();
            this.lb_IC6 = new System.Windows.Forms.Label();
            this.lb_IC5 = new System.Windows.Forms.Label();
            this.lb_IC4 = new System.Windows.Forms.Label();
            this.lb_IC3 = new System.Windows.Forms.Label();
            this.lb_IC2 = new System.Windows.Forms.Label();
            this.lb_IC1 = new System.Windows.Forms.Label();
            this.panel2 = new System.Windows.Forms.Panel();
            this.btVoltageView = new System.Windows.Forms.Button();
            this.lbCell6Value = new System.Windows.Forms.Label();
            this.lbCell10Value = new System.Windows.Forms.Label();
            this.lbCell5Value = new System.Windows.Forms.Label();
            this.lbCell9Value = new System.Windows.Forms.Label();
            this.lbCell4Value = new System.Windows.Forms.Label();
            this.lbCell8Value = new System.Windows.Forms.Label();
            this.lbCell3Value = new System.Windows.Forms.Label();
            this.lbCell7Value = new System.Windows.Forms.Label();
            this.lbCell2Value = new System.Windows.Forms.Label();
            this.lbCell1Value = new System.Windows.Forms.Label();
            this.lbCell1 = new System.Windows.Forms.Label();
            this.lbCell2 = new System.Windows.Forms.Label();
            this.lbCell7 = new System.Windows.Forms.Label();
            this.lbCell3 = new System.Windows.Forms.Label();
            this.lbCell8 = new System.Windows.Forms.Label();
            this.lbCell4 = new System.Windows.Forms.Label();
            this.lbCell9 = new System.Windows.Forms.Label();
            this.lbCell5 = new System.Windows.Forms.Label();
            this.lbCell10 = new System.Windows.Forms.Label();
            this.lbCell6 = new System.Windows.Forms.Label();
            this.gbCommand = new System.Windows.Forms.GroupBox();
            this.pbRelay = new System.Windows.Forms.PictureBox();
            this.btRelayOFF = new System.Windows.Forms.Button();
            this.btRelayOn = new System.Windows.Forms.Button();
            this.gbTemperature = new System.Windows.Forms.GroupBox();
            this.lbTemp4 = new System.Windows.Forms.Label();
            this.lbTemp4Value = new System.Windows.Forms.Label();
            this.lbTemp3 = new System.Windows.Forms.Label();
            this.lbTemp3Value = new System.Windows.Forms.Label();
            this.lbTemp2 = new System.Windows.Forms.Label();
            this.lbTemp2Value = new System.Windows.Forms.Label();
            this.lbTemp1 = new System.Windows.Forms.Label();
            this.lbTemp1Value = new System.Windows.Forms.Label();
            this.gbSystemStatus = new System.Windows.Forms.GroupBox();
            this.lbTCell = new System.Windows.Forms.Label();
            this.lbStatus = new System.Windows.Forms.Label();
            this.lbCCVStateStatus = new System.Windows.Forms.Label();
            this.lbCCVState = new System.Windows.Forms.Label();
            this.lbOCVStateStatus = new System.Windows.Forms.Label();
            this.lbOCVState = new System.Windows.Forms.Label();
            this.lbWarnningStatus = new System.Windows.Forms.Label();
            this.lbWarnning = new System.Windows.Forms.Label();
            this.lbProtectStatus = new System.Windows.Forms.Label();
            this.lbProtect = new System.Windows.Forms.Label();
            this.lbSerialStatus = new System.Windows.Forms.Label();
            this.lbSerial = new System.Windows.Forms.Label();
            this.lbInterLockStatus = new System.Windows.Forms.Label();
            this.lbCurSensorStatus = new System.Windows.Forms.Label();
            this.lbTCellStatus = new System.Windows.Forms.Label();
            this.lbVCellStatus = new System.Windows.Forms.Label();
            this.lbLineStatus = new System.Windows.Forms.Label();
            this.lbInterLock = new System.Windows.Forms.Label();
            this.lbCurSensor = new System.Windows.Forms.Label();
            this.lbVCell = new System.Windows.Forms.Label();
            this.lbRelayStatus = new System.Windows.Forms.Label();
            this.lbStandbyStatus = new System.Windows.Forms.Label();
            this.lbRelay = new System.Windows.Forms.Label();
            this.lbStandby = new System.Windows.Forms.Label();
            this.gbSystemInfo = new System.Windows.Forms.GroupBox();
            this.lbMaxCellVoltageValue = new System.Windows.Forms.Label();
            this.lbMinCellVoltageValue = new System.Windows.Forms.Label();
            this.lbCdcValue = new System.Windows.Forms.Label();
            this.lbCccValue = new System.Windows.Forms.Label();
            this.lbMinTemp = new System.Windows.Forms.Label();
            this.lbFrontSohValue = new System.Windows.Forms.Label();
            this.lbMaxTemp = new System.Windows.Forms.Label();
            this.lbCurrentValue = new System.Windows.Forms.Label();
            this.lbCdc = new System.Windows.Forms.Label();
            this.lbFrontSocValue = new System.Windows.Forms.Label();
            this.lbCcc = new System.Windows.Forms.Label();
            this.lbMinTempValue = new System.Windows.Forms.Label();
            this.lbCurrent = new System.Windows.Forms.Label();
            this.lbPackVoltageValue = new System.Windows.Forms.Label();
            this.lbMaxCellVoltage = new System.Windows.Forms.Label();
            this.lbMaxTempValue = new System.Windows.Forms.Label();
            this.lbMinCellVoltage = new System.Windows.Forms.Label();
            this.lbFrontSoh = new System.Windows.Forms.Label();
            this.lbFrontSoc = new System.Windows.Forms.Label();
            this.lbPackVoltage = new System.Windows.Forms.Label();
            this.tcBMS = new System.Windows.Forms.TabControl();
            this.tabPage3 = new System.Windows.Forms.TabPage();
            this.pnSaveFile = new System.Windows.Forms.Panel();
            this.btLoadFile = new System.Windows.Forms.Button();
            this.btSaveFile = new System.Windows.Forms.Button();
            this.panel1 = new System.Windows.Forms.Panel();
            this.btWarnningSettingLoad = new System.Windows.Forms.Button();
            this.btWarnningSettingSave = new System.Windows.Forms.Button();
            this.gbWarnningRelease = new System.Windows.Forms.GroupBox();
            this.cbWarnningReleaseValue4 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningReleaseValue3 = new System.Windows.Forms.NumericUpDown();
            this.label187 = new System.Windows.Forms.Label();
            this.cbWarnningReleaseValue10 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningReleaseValue9 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningReleaseValue8 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningReleaseValue7 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningReleaseValue6 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningReleaseValue5 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningReleaseValue2 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningReleaseValue1 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningReleaseRetain4 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningReleaseRetain3 = new System.Windows.Forms.NumericUpDown();
            this.lbPOVWR = new System.Windows.Forms.Label();
            this.lbPLVWR = new System.Windows.Forms.Label();
            this.cbWarnningReleaseRetain10 = new System.Windows.Forms.NumericUpDown();
            this.label185 = new System.Windows.Forms.Label();
            this.cbWarnningReleaseRetain9 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningReleaseRetain8 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningReleaseRetain7 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningReleaseRetain6 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningReleaseRetain5 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningReleaseRetain2 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningReleaseRetain1 = new System.Windows.Forms.NumericUpDown();
            this.lbLSOCWR = new System.Windows.Forms.Label();
            this.lbCDWR = new System.Windows.Forms.Label();
            this.lbCOVWR = new System.Windows.Forms.Label();
            this.lbCLVWR = new System.Windows.Forms.Label();
            this.lbCOTWR = new System.Windows.Forms.Label();
            this.lbCLTWR = new System.Windows.Forms.Label();
            this.lbCOAWR = new System.Windows.Forms.Label();
            this.lbDOAWR = new System.Windows.Forms.Label();
            this.gbWarnningSet = new System.Windows.Forms.GroupBox();
            this.lbPOVW = new System.Windows.Forms.Label();
            this.cbWarnningEnable4 = new System.Windows.Forms.CheckBox();
            this.cbWarnningEnable3 = new System.Windows.Forms.CheckBox();
            this.cbWarnningValue4 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningValue3 = new System.Windows.Forms.NumericUpDown();
            this.lbPLVW = new System.Windows.Forms.Label();
            this.cbWarnningEnable11 = new System.Windows.Forms.CheckBox();
            this.cbWarnningEnable10 = new System.Windows.Forms.CheckBox();
            this.cbWarnningEnable9 = new System.Windows.Forms.CheckBox();
            this.cbWarnningEnable8 = new System.Windows.Forms.CheckBox();
            this.cbWarnningEnable7 = new System.Windows.Forms.CheckBox();
            this.cbWarnningEnable6 = new System.Windows.Forms.CheckBox();
            this.cbWarnningEnable5 = new System.Windows.Forms.CheckBox();
            this.cbWarnningEnable2 = new System.Windows.Forms.CheckBox();
            this.cbWarnningEnable1 = new System.Windows.Forms.CheckBox();
            this.label186 = new System.Windows.Forms.Label();
            this.cbWarnningRetainTime4 = new System.Windows.Forms.NumericUpDown();
            this.lbCOAW = new System.Windows.Forms.Label();
            this.cbWarnningRetainTime3 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningValue11 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningValue10 = new System.Windows.Forms.NumericUpDown();
            this.lbLSOCW = new System.Windows.Forms.Label();
            this.cbWarnningValue9 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningValue8 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningValue7 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningValue6 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningValue5 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningValue2 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningRetainTime10 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningValue1 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningRetainTime11 = new System.Windows.Forms.NumericUpDown();
            this.lbCDW = new System.Windows.Forms.Label();
            this.lbDOAW = new System.Windows.Forms.Label();
            this.lbLSOHW = new System.Windows.Forms.Label();
            this.label127 = new System.Windows.Forms.Label();
            this.cbWarnningRetainTime9 = new System.Windows.Forms.NumericUpDown();
            this.lbCLTW = new System.Windows.Forms.Label();
            this.cbWarnningRetainTime8 = new System.Windows.Forms.NumericUpDown();
            this.lbCOTW = new System.Windows.Forms.Label();
            this.lbCLVW = new System.Windows.Forms.Label();
            this.cbWarnningRetainTime7 = new System.Windows.Forms.NumericUpDown();
            this.lbCOVW = new System.Windows.Forms.Label();
            this.cbWarnningRetainTime1 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningRetainTime6 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningRetainTime2 = new System.Windows.Forms.NumericUpDown();
            this.cbWarnningRetainTime5 = new System.Windows.Forms.NumericUpDown();
            this.tabPage5 = new System.Windows.Forms.TabPage();
            this.gbLoggingSetting = new System.Windows.Forms.GroupBox();
            this.label62 = new System.Windows.Forms.Label();
            this.tbLogPath = new System.Windows.Forms.TextBox();
            this.tbLogFileName = new System.Windows.Forms.TextBox();
            this.button4 = new System.Windows.Forms.Button();
            this.btLogPath = new System.Windows.Forms.Button();
            this.label2 = new System.Windows.Forms.Label();
            this.ICStatus = new System.Windows.Forms.Label();
            this.lbIC = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.pbPoenLogo)).BeginInit();
            this.tabPage4.SuspendLayout();
            this.groupBox4.SuspendLayout();
            this.groupBox1.SuspendLayout();
            this.gbBMUVersion.SuspendLayout();
            this.gbConnection.SuspendLayout();
            this.gbSOH.SuspendLayout();
            this.gbSOC.SuspendLayout();
            this.tabPage2.SuspendLayout();
            this.pnSaveFileRelease.SuspendLayout();
            this.panel4.SuspendLayout();
            this.gbProtectRelease.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain13)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain14)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain12)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue14)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue13)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue12)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue4)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue3)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue11)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue10)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue9)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue8)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue7)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue6)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue5)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain4)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain3)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain10)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain11)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain9)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain8)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain7)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain6)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain5)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain1)).BeginInit();
            this.gbProtectSet.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime13)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime14)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime12)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue14)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue13)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue12)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime4)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime3)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime10)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime11)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime9)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime8)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime7)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime6)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime5)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue4)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue3)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue11)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue10)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue9)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue8)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue7)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue6)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue5)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue1)).BeginInit();
            this.tabPage1.SuspendLayout();
            this.gbLoggingStatus.SuspendLayout();
            this.gbVoltage.SuspendLayout();
            this.pnModule.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.chart1)).BeginInit();
            this.panel2.SuspendLayout();
            this.gbCommand.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pbRelay)).BeginInit();
            this.gbTemperature.SuspendLayout();
            this.gbSystemStatus.SuspendLayout();
            this.gbSystemInfo.SuspendLayout();
            this.tcBMS.SuspendLayout();
            this.tabPage3.SuspendLayout();
            this.pnSaveFile.SuspendLayout();
            this.panel1.SuspendLayout();
            this.gbWarnningRelease.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseValue4)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseValue3)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseValue10)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseValue9)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseValue8)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseValue7)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseValue6)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseValue5)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseValue2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseValue1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseRetain4)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseRetain3)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseRetain10)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseRetain9)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseRetain8)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseRetain7)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseRetain6)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseRetain5)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseRetain2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseRetain1)).BeginInit();
            this.gbWarnningSet.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue4)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue3)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime4)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime3)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue11)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue10)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue9)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue8)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue7)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue6)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue5)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime10)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime11)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime9)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime8)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime7)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime6)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime5)).BeginInit();
            this.tabPage5.SuspendLayout();
            this.gbLoggingSetting.SuspendLayout();
            this.SuspendLayout();
            // 
            // timer1
            // 
            this.timer1.Enabled = true;
            this.timer1.Tick += new System.EventHandler(this.timer1_Tick);
            // 
            // pbPoenLogo
            // 
            this.pbPoenLogo.BackColor = System.Drawing.Color.Linen;
            this.pbPoenLogo.Dock = System.Windows.Forms.DockStyle.Top;
            this.pbPoenLogo.Location = new System.Drawing.Point(0, 0);
            this.pbPoenLogo.Name = "pbPoenLogo";
            this.pbPoenLogo.Size = new System.Drawing.Size(1828, 90);
            this.pbPoenLogo.TabIndex = 0;
            this.pbPoenLogo.TabStop = false;
            // 
            // tabPage4
            // 
            this.tabPage4.Controls.Add(this.groupBox4);
            this.tabPage4.Controls.Add(this.groupBox1);
            this.tabPage4.Controls.Add(this.gbBMUVersion);
            this.tabPage4.Controls.Add(this.gbConnection);
            this.tabPage4.Controls.Add(this.gbSOH);
            this.tabPage4.Controls.Add(this.gbSOC);
            this.tabPage4.Location = new System.Drawing.Point(4, 22);
            this.tabPage4.Name = "tabPage4";
            this.tabPage4.Size = new System.Drawing.Size(1782, 781);
            this.tabPage4.TabIndex = 2;
            this.tabPage4.Text = "Setting";
            this.tabPage4.UseVisualStyleBackColor = true;
            // 
            // groupBox4
            // 
            this.groupBox4.BackColor = System.Drawing.Color.Azure;
            this.groupBox4.Controls.Add(this.lbMonitoringCycleTime);
            this.groupBox4.Controls.Add(this.tbMonitoringCycleTime);
            this.groupBox4.Controls.Add(this.btMonitoringCycleTimeSet);
            this.groupBox4.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.groupBox4.Location = new System.Drawing.Point(281, 18);
            this.groupBox4.Name = "groupBox4";
            this.groupBox4.Size = new System.Drawing.Size(214, 218);
            this.groupBox4.TabIndex = 23;
            this.groupBox4.TabStop = false;
            this.groupBox4.Text = "Monitoring Time";
            // 
            // lbMonitoringCycleTime
            // 
            this.lbMonitoringCycleTime.BackColor = System.Drawing.Color.PaleTurquoise;
            this.lbMonitoringCycleTime.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lbMonitoringCycleTime.Font = new System.Drawing.Font("굴림", 8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbMonitoringCycleTime.Location = new System.Drawing.Point(28, 43);
            this.lbMonitoringCycleTime.Name = "lbMonitoringCycleTime";
            this.lbMonitoringCycleTime.Size = new System.Drawing.Size(160, 26);
            this.lbMonitoringCycleTime.TabIndex = 32;
            this.lbMonitoringCycleTime.Text = "Monitoring Cycle Time";
            this.lbMonitoringCycleTime.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // tbMonitoringCycleTime
            // 
            this.tbMonitoringCycleTime.BackColor = System.Drawing.Color.Azure;
            this.tbMonitoringCycleTime.Location = new System.Drawing.Point(54, 86);
            this.tbMonitoringCycleTime.Name = "tbMonitoringCycleTime";
            this.tbMonitoringCycleTime.Size = new System.Drawing.Size(106, 26);
            this.tbMonitoringCycleTime.TabIndex = 31;
            this.tbMonitoringCycleTime.Text = "1000";
            this.tbMonitoringCycleTime.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            // 
            // btMonitoringCycleTimeSet
            // 
            this.btMonitoringCycleTimeSet.Location = new System.Drawing.Point(54, 116);
            this.btMonitoringCycleTimeSet.Name = "btMonitoringCycleTimeSet";
            this.btMonitoringCycleTimeSet.Size = new System.Drawing.Size(106, 47);
            this.btMonitoringCycleTimeSet.TabIndex = 30;
            this.btMonitoringCycleTimeSet.Text = "SET";
            this.btMonitoringCycleTimeSet.UseVisualStyleBackColor = true;
            this.btMonitoringCycleTimeSet.Click += new System.EventHandler(this.btMonitoringCycleTimeSet_Click);
            // 
            // groupBox1
            // 
            this.groupBox1.BackColor = System.Drawing.Color.Azure;
            this.groupBox1.Controls.Add(this.btFactoryInit);
            this.groupBox1.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.groupBox1.Location = new System.Drawing.Point(23, 250);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(472, 91);
            this.groupBox1.TabIndex = 22;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "FACTORY RESET";
            // 
            // btFactoryInit
            // 
            this.btFactoryInit.Location = new System.Drawing.Point(168, 25);
            this.btFactoryInit.Name = "btFactoryInit";
            this.btFactoryInit.Size = new System.Drawing.Size(137, 48);
            this.btFactoryInit.TabIndex = 22;
            this.btFactoryInit.Text = "공장초기화";
            this.btFactoryInit.UseVisualStyleBackColor = true;
            this.btFactoryInit.Click += new System.EventHandler(this.btFactoryInit_Click);
            // 
            // gbBMUVersion
            // 
            this.gbBMUVersion.BackColor = System.Drawing.Color.Azure;
            this.gbBMUVersion.Controls.Add(this.tbBMUVersion);
            this.gbBMUVersion.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.gbBMUVersion.Location = new System.Drawing.Point(23, 173);
            this.gbBMUVersion.Name = "gbBMUVersion";
            this.gbBMUVersion.Size = new System.Drawing.Size(240, 54);
            this.gbBMUVersion.TabIndex = 21;
            this.gbBMUVersion.TabStop = false;
            this.gbBMUVersion.Text = "BMU Version";
            // 
            // tbBMUVersion
            // 
            this.tbBMUVersion.BackColor = System.Drawing.Color.Azure;
            this.tbBMUVersion.Location = new System.Drawing.Point(21, 20);
            this.tbBMUVersion.Name = "tbBMUVersion";
            this.tbBMUVersion.Size = new System.Drawing.Size(199, 26);
            this.tbBMUVersion.TabIndex = 4;
            this.tbBMUVersion.Text = "0.0.0";
            this.tbBMUVersion.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            // 
            // gbConnection
            // 
            this.gbConnection.BackColor = System.Drawing.Color.Azure;
            this.gbConnection.Controls.Add(this.btConnect);
            this.gbConnection.Controls.Add(this.cbPort);
            this.gbConnection.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.gbConnection.Location = new System.Drawing.Point(23, 18);
            this.gbConnection.Name = "gbConnection";
            this.gbConnection.Size = new System.Drawing.Size(240, 140);
            this.gbConnection.TabIndex = 20;
            this.gbConnection.TabStop = false;
            this.gbConnection.Text = "Connection";
            // 
            // btConnect
            // 
            this.btConnect.Location = new System.Drawing.Point(21, 77);
            this.btConnect.Name = "btConnect";
            this.btConnect.Size = new System.Drawing.Size(199, 36);
            this.btConnect.TabIndex = 1;
            this.btConnect.Text = "연결 하기";
            this.btConnect.UseVisualStyleBackColor = true;
            this.btConnect.Click += new System.EventHandler(this.btConnect_Click);
            // 
            // cbPort
            // 
            this.cbPort.Font = new System.Drawing.Font("굴림", 15F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.cbPort.FormattingEnabled = true;
            this.cbPort.Items.AddRange(new object[] {
            "COM1",
            "COM2",
            "COM3",
            "COM4",
            "COM5",
            "COM6",
            "COM7",
            "COM8",
            "COM9",
            "COM10",
            "COM11",
            "COM12",
            "COM13",
            "COM14",
            "COM15",
            "COM16",
            "COM17",
            "COM18",
            "COM19",
            "COM20",
            "COM21",
            "COM22",
            "COM23",
            "COM24",
            "COM25",
            "COM26",
            "COM27",
            "COM28",
            "COM29",
            "COM30"});
            this.cbPort.Location = new System.Drawing.Point(21, 41);
            this.cbPort.Name = "cbPort";
            this.cbPort.Size = new System.Drawing.Size(199, 28);
            this.cbPort.TabIndex = 0;
            this.cbPort.Text = "COM1";
            // 
            // gbSOH
            // 
            this.gbSOH.BackColor = System.Drawing.Color.Azure;
            this.gbSOH.Controls.Add(this.label61);
            this.gbSOH.Controls.Add(this.btInitSOH);
            this.gbSOH.Controls.Add(this.lbSOH);
            this.gbSOH.Controls.Add(this.tbSOH);
            this.gbSOH.Controls.Add(this.tbSetSOH);
            this.gbSOH.Controls.Add(this.btSetSOH);
            this.gbSOH.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.gbSOH.Location = new System.Drawing.Point(23, 535);
            this.gbSOH.Name = "gbSOH";
            this.gbSOH.Size = new System.Drawing.Size(472, 154);
            this.gbSOH.TabIndex = 18;
            this.gbSOH.TabStop = false;
            this.gbSOH.Text = "SOH";
            // 
            // label61
            // 
            this.label61.BackColor = System.Drawing.Color.PaleTurquoise;
            this.label61.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.label61.Font = new System.Drawing.Font("굴림", 8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label61.Location = new System.Drawing.Point(188, 28);
            this.label61.Name = "label61";
            this.label61.Size = new System.Drawing.Size(106, 26);
            this.label61.TabIndex = 30;
            this.label61.Text = "SOC SET";
            this.label61.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // btInitSOH
            // 
            this.btInitSOH.Location = new System.Drawing.Point(315, 28);
            this.btInitSOH.Name = "btInitSOH";
            this.btInitSOH.Size = new System.Drawing.Size(106, 110);
            this.btInitSOH.TabIndex = 24;
            this.btInitSOH.Text = "SOH 초기화 (100%)";
            this.btInitSOH.UseVisualStyleBackColor = true;
            this.btInitSOH.Click += new System.EventHandler(this.btInitSOH_Click);
            // 
            // lbSOH
            // 
            this.lbSOH.BackColor = System.Drawing.Color.PaleTurquoise;
            this.lbSOH.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lbSOH.Font = new System.Drawing.Font("굴림", 8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbSOH.Location = new System.Drawing.Point(39, 50);
            this.lbSOH.Name = "lbSOH";
            this.lbSOH.Size = new System.Drawing.Size(131, 26);
            this.lbSOH.TabIndex = 28;
            this.lbSOH.Text = "SOH";
            this.lbSOH.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // tbSOH
            // 
            this.tbSOH.BackColor = System.Drawing.Color.Azure;
            this.tbSOH.Location = new System.Drawing.Point(39, 79);
            this.tbSOH.Name = "tbSOH";
            this.tbSOH.Size = new System.Drawing.Size(131, 26);
            this.tbSOH.TabIndex = 27;
            this.tbSOH.Text = "0";
            this.tbSOH.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            // 
            // tbSetSOH
            // 
            this.tbSetSOH.BackColor = System.Drawing.Color.Azure;
            this.tbSetSOH.Location = new System.Drawing.Point(188, 58);
            this.tbSetSOH.Name = "tbSetSOH";
            this.tbSetSOH.Size = new System.Drawing.Size(106, 26);
            this.tbSetSOH.TabIndex = 25;
            this.tbSetSOH.Text = "0";
            this.tbSetSOH.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            // 
            // btSetSOH
            // 
            this.btSetSOH.Location = new System.Drawing.Point(188, 90);
            this.btSetSOH.Name = "btSetSOH";
            this.btSetSOH.Size = new System.Drawing.Size(106, 48);
            this.btSetSOH.TabIndex = 23;
            this.btSetSOH.Text = "SET SOH";
            this.btSetSOH.UseVisualStyleBackColor = true;
            this.btSetSOH.Click += new System.EventHandler(this.btSetSOH_Click);
            // 
            // gbSOC
            // 
            this.gbSOC.BackColor = System.Drawing.Color.Azure;
            this.gbSOC.Controls.Add(this.label60);
            this.gbSOC.Controls.Add(this.lbSOC);
            this.gbSOC.Controls.Add(this.tbSOC);
            this.gbSOC.Controls.Add(this.btInitSOC);
            this.gbSOC.Controls.Add(this.tbSetSOC);
            this.gbSOC.Controls.Add(this.btSetSOC);
            this.gbSOC.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.gbSOC.Location = new System.Drawing.Point(23, 369);
            this.gbSOC.Name = "gbSOC";
            this.gbSOC.Size = new System.Drawing.Size(472, 148);
            this.gbSOC.TabIndex = 17;
            this.gbSOC.TabStop = false;
            this.gbSOC.Text = "SOC";
            // 
            // label60
            // 
            this.label60.BackColor = System.Drawing.Color.PaleTurquoise;
            this.label60.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.label60.Font = new System.Drawing.Font("굴림", 8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label60.Location = new System.Drawing.Point(188, 23);
            this.label60.Name = "label60";
            this.label60.Size = new System.Drawing.Size(106, 26);
            this.label60.TabIndex = 29;
            this.label60.Text = "SOC SET";
            this.label60.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lbSOC
            // 
            this.lbSOC.BackColor = System.Drawing.Color.PaleTurquoise;
            this.lbSOC.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lbSOC.Font = new System.Drawing.Font("굴림", 8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbSOC.Location = new System.Drawing.Point(39, 51);
            this.lbSOC.Name = "lbSOC";
            this.lbSOC.Size = new System.Drawing.Size(131, 26);
            this.lbSOC.TabIndex = 28;
            this.lbSOC.Text = "SOC";
            this.lbSOC.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // tbSOC
            // 
            this.tbSOC.BackColor = System.Drawing.Color.Azure;
            this.tbSOC.Location = new System.Drawing.Point(39, 80);
            this.tbSOC.Name = "tbSOC";
            this.tbSOC.Size = new System.Drawing.Size(131, 26);
            this.tbSOC.TabIndex = 27;
            this.tbSOC.Text = "0";
            this.tbSOC.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            // 
            // btInitSOC
            // 
            this.btInitSOC.Location = new System.Drawing.Point(315, 25);
            this.btInitSOC.Name = "btInitSOC";
            this.btInitSOC.Size = new System.Drawing.Size(106, 105);
            this.btInitSOC.TabIndex = 23;
            this.btInitSOC.Text = "SOC 초기화 (OCV Table)";
            this.btInitSOC.UseVisualStyleBackColor = true;
            this.btInitSOC.Click += new System.EventHandler(this.btInitSOC_Click);
            // 
            // tbSetSOC
            // 
            this.tbSetSOC.BackColor = System.Drawing.Color.Azure;
            this.tbSetSOC.Location = new System.Drawing.Point(188, 52);
            this.tbSetSOC.Name = "tbSetSOC";
            this.tbSetSOC.Size = new System.Drawing.Size(106, 26);
            this.tbSetSOC.TabIndex = 25;
            this.tbSetSOC.Text = "0";
            this.tbSetSOC.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            // 
            // btSetSOC
            // 
            this.btSetSOC.Location = new System.Drawing.Point(188, 83);
            this.btSetSOC.Name = "btSetSOC";
            this.btSetSOC.Size = new System.Drawing.Size(106, 47);
            this.btSetSOC.TabIndex = 23;
            this.btSetSOC.Text = "SET";
            this.btSetSOC.UseVisualStyleBackColor = true;
            this.btSetSOC.Click += new System.EventHandler(this.btSetSOC_Click);
            // 
            // tabPage2
            // 
            this.tabPage2.BackColor = System.Drawing.Color.Transparent;
            this.tabPage2.Controls.Add(this.pnSaveFileRelease);
            this.tabPage2.Controls.Add(this.panel4);
            this.tabPage2.Controls.Add(this.gbProtectRelease);
            this.tabPage2.Controls.Add(this.gbProtectSet);
            this.tabPage2.Location = new System.Drawing.Point(4, 22);
            this.tabPage2.Name = "tabPage2";
            this.tabPage2.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage2.Size = new System.Drawing.Size(1782, 781);
            this.tabPage2.TabIndex = 3;
            this.tabPage2.Text = "Protect";
            // 
            // pnSaveFileRelease
            // 
            this.pnSaveFileRelease.BackColor = System.Drawing.Color.White;
            this.pnSaveFileRelease.Controls.Add(this.btLoadFileProtect);
            this.pnSaveFileRelease.Controls.Add(this.btSaveFileProtect);
            this.pnSaveFileRelease.Location = new System.Drawing.Point(684, 575);
            this.pnSaveFileRelease.Name = "pnSaveFileRelease";
            this.pnSaveFileRelease.Size = new System.Drawing.Size(234, 57);
            this.pnSaveFileRelease.TabIndex = 9;
            // 
            // btLoadFileProtect
            // 
            this.btLoadFileProtect.Location = new System.Drawing.Point(121, 16);
            this.btLoadFileProtect.Name = "btLoadFileProtect";
            this.btLoadFileProtect.Size = new System.Drawing.Size(99, 23);
            this.btLoadFileProtect.TabIndex = 14;
            this.btLoadFileProtect.Text = "PC -> GUI";
            this.btLoadFileProtect.UseVisualStyleBackColor = true;
            this.btLoadFileProtect.Click += new System.EventHandler(this.btLoadFileProtect_Click);
            // 
            // btSaveFileProtect
            // 
            this.btSaveFileProtect.Location = new System.Drawing.Point(17, 16);
            this.btSaveFileProtect.Name = "btSaveFileProtect";
            this.btSaveFileProtect.Size = new System.Drawing.Size(98, 23);
            this.btSaveFileProtect.TabIndex = 15;
            this.btSaveFileProtect.Text = "GUI -> PC";
            this.btSaveFileProtect.UseVisualStyleBackColor = true;
            this.btSaveFileProtect.Click += new System.EventHandler(this.btSaveFileProtect_Click);
            // 
            // panel4
            // 
            this.panel4.BackColor = System.Drawing.Color.White;
            this.panel4.Controls.Add(this.btProtectSettingLoad);
            this.panel4.Controls.Add(this.btProtectSettingSave);
            this.panel4.Location = new System.Drawing.Point(941, 575);
            this.panel4.Name = "panel4";
            this.panel4.Size = new System.Drawing.Size(228, 57);
            this.panel4.TabIndex = 5;
            // 
            // btProtectSettingLoad
            // 
            this.btProtectSettingLoad.Location = new System.Drawing.Point(122, 16);
            this.btProtectSettingLoad.Name = "btProtectSettingLoad";
            this.btProtectSettingLoad.Size = new System.Drawing.Size(88, 23);
            this.btProtectSettingLoad.TabIndex = 14;
            this.btProtectSettingLoad.Text = "BMS -> GUI";
            this.btProtectSettingLoad.UseVisualStyleBackColor = true;
            this.btProtectSettingLoad.Click += new System.EventHandler(this.btProtectSettingLoad_Click);
            // 
            // btProtectSettingSave
            // 
            this.btProtectSettingSave.Location = new System.Drawing.Point(18, 16);
            this.btProtectSettingSave.Name = "btProtectSettingSave";
            this.btProtectSettingSave.Size = new System.Drawing.Size(98, 23);
            this.btProtectSettingSave.TabIndex = 15;
            this.btProtectSettingSave.Text = "GUI -> BMS";
            this.btProtectSettingSave.UseVisualStyleBackColor = true;
            this.btProtectSettingSave.Click += new System.EventHandler(this.btProtectSettingSave_Click);
            // 
            // gbProtectRelease
            // 
            this.gbProtectRelease.BackColor = System.Drawing.Color.GhostWhite;
            this.gbProtectRelease.Controls.Add(this.lbinterLockErrorPR);
            this.gbProtectRelease.Controls.Add(this.lbSelfSystemDiagPR);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseRetain13);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseRetain14);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseRetain12);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseValue14);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseValue13);
            this.gbProtectRelease.Controls.Add(this.lbCommunicationErrorPR);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseValue12);
            this.gbProtectRelease.Controls.Add(this.lbSLMPR);
            this.gbProtectRelease.Controls.Add(this.lbCurrentSensorErrorPR);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseValue4);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseValue3);
            this.gbProtectRelease.Controls.Add(this.label189);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseValue11);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseValue10);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseValue9);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseValue8);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseValue7);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseValue6);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseValue5);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseValue2);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseValue1);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseRetain4);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseRetain3);
            this.gbProtectRelease.Controls.Add(this.lbPOVPR);
            this.gbProtectRelease.Controls.Add(this.lbPLVPR);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseRetain10);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseRetain11);
            this.gbProtectRelease.Controls.Add(this.label188);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseRetain9);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseRetain8);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseRetain7);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseRetain6);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseRetain5);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseRetain2);
            this.gbProtectRelease.Controls.Add(this.cbProtectReleaseRetain1);
            this.gbProtectRelease.Controls.Add(this.lbCDPR);
            this.gbProtectRelease.Controls.Add(this.lbCOVPR);
            this.gbProtectRelease.Controls.Add(this.lbCLVPR);
            this.gbProtectRelease.Controls.Add(this.lbCOTPR);
            this.gbProtectRelease.Controls.Add(this.lbCLTPR);
            this.gbProtectRelease.Controls.Add(this.lbCOAPR);
            this.gbProtectRelease.Controls.Add(this.lbDOAPR);
            this.gbProtectRelease.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.gbProtectRelease.Location = new System.Drawing.Point(603, 19);
            this.gbProtectRelease.Name = "gbProtectRelease";
            this.gbProtectRelease.Size = new System.Drawing.Size(566, 538);
            this.gbProtectRelease.TabIndex = 3;
            this.gbProtectRelease.TabStop = false;
            this.gbProtectRelease.Text = "Protect Release Value";
            // 
            // lbinterLockErrorPR
            // 
            this.lbinterLockErrorPR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbinterLockErrorPR.Location = new System.Drawing.Point(15, 461);
            this.lbinterLockErrorPR.Name = "lbinterLockErrorPR";
            this.lbinterLockErrorPR.Size = new System.Drawing.Size(176, 25);
            this.lbinterLockErrorPR.TabIndex = 91;
            this.lbinterLockErrorPR.Text = "Inter Lock Error";
            this.lbinterLockErrorPR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbSelfSystemDiagPR
            // 
            this.lbSelfSystemDiagPR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbSelfSystemDiagPR.Location = new System.Drawing.Point(15, 493);
            this.lbSelfSystemDiagPR.Name = "lbSelfSystemDiagPR";
            this.lbSelfSystemDiagPR.Size = new System.Drawing.Size(176, 25);
            this.lbSelfSystemDiagPR.TabIndex = 90;
            this.lbSelfSystemDiagPR.Text = "Self System Diag";
            this.lbSelfSystemDiagPR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // cbProtectReleaseRetain13
            // 
            this.cbProtectReleaseRetain13.Location = new System.Drawing.Point(406, 458);
            this.cbProtectReleaseRetain13.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseRetain13.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseRetain13.Name = "cbProtectReleaseRetain13";
            this.cbProtectReleaseRetain13.ReadOnly = true;
            this.cbProtectReleaseRetain13.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseRetain13.TabIndex = 86;
            this.cbProtectReleaseRetain13.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // cbProtectReleaseRetain14
            // 
            this.cbProtectReleaseRetain14.Location = new System.Drawing.Point(406, 490);
            this.cbProtectReleaseRetain14.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseRetain14.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseRetain14.Name = "cbProtectReleaseRetain14";
            this.cbProtectReleaseRetain14.ReadOnly = true;
            this.cbProtectReleaseRetain14.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseRetain14.TabIndex = 85;
            this.cbProtectReleaseRetain14.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // cbProtectReleaseRetain12
            // 
            this.cbProtectReleaseRetain12.Location = new System.Drawing.Point(406, 426);
            this.cbProtectReleaseRetain12.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseRetain12.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseRetain12.Name = "cbProtectReleaseRetain12";
            this.cbProtectReleaseRetain12.ReadOnly = true;
            this.cbProtectReleaseRetain12.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseRetain12.TabIndex = 84;
            this.cbProtectReleaseRetain12.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // cbProtectReleaseValue14
            // 
            this.cbProtectReleaseValue14.Location = new System.Drawing.Point(260, 490);
            this.cbProtectReleaseValue14.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseValue14.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseValue14.Name = "cbProtectReleaseValue14";
            this.cbProtectReleaseValue14.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseValue14.TabIndex = 83;
            this.cbProtectReleaseValue14.Value = new decimal(new int[] {
            1,
            0,
            0,
            0});
            // 
            // cbProtectReleaseValue13
            // 
            this.cbProtectReleaseValue13.Location = new System.Drawing.Point(260, 458);
            this.cbProtectReleaseValue13.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseValue13.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseValue13.Name = "cbProtectReleaseValue13";
            this.cbProtectReleaseValue13.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseValue13.TabIndex = 82;
            this.cbProtectReleaseValue13.Value = new decimal(new int[] {
            1,
            0,
            0,
            0});
            // 
            // lbCommunicationErrorPR
            // 
            this.lbCommunicationErrorPR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCommunicationErrorPR.Location = new System.Drawing.Point(15, 398);
            this.lbCommunicationErrorPR.Name = "lbCommunicationErrorPR";
            this.lbCommunicationErrorPR.Size = new System.Drawing.Size(195, 25);
            this.lbCommunicationErrorPR.TabIndex = 81;
            this.lbCommunicationErrorPR.Text = "Communication Error";
            this.lbCommunicationErrorPR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // cbProtectReleaseValue12
            // 
            this.cbProtectReleaseValue12.Location = new System.Drawing.Point(260, 426);
            this.cbProtectReleaseValue12.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseValue12.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseValue12.Name = "cbProtectReleaseValue12";
            this.cbProtectReleaseValue12.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseValue12.TabIndex = 80;
            this.cbProtectReleaseValue12.Value = new decimal(new int[] {
            1,
            0,
            0,
            0});
            // 
            // lbSLMPR
            // 
            this.lbSLMPR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbSLMPR.Location = new System.Drawing.Point(15, 366);
            this.lbSLMPR.Name = "lbSLMPR";
            this.lbSLMPR.Size = new System.Drawing.Size(195, 25);
            this.lbSLMPR.TabIndex = 78;
            this.lbSLMPR.Text = "Sensing Line Measure";
            this.lbSLMPR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCurrentSensorErrorPR
            // 
            this.lbCurrentSensorErrorPR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCurrentSensorErrorPR.Location = new System.Drawing.Point(15, 430);
            this.lbCurrentSensorErrorPR.Name = "lbCurrentSensorErrorPR";
            this.lbCurrentSensorErrorPR.Size = new System.Drawing.Size(195, 25);
            this.lbCurrentSensorErrorPR.TabIndex = 79;
            this.lbCurrentSensorErrorPR.Text = "Current Sensor Error";
            this.lbCurrentSensorErrorPR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // cbProtectReleaseValue4
            // 
            this.cbProtectReleaseValue4.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbProtectReleaseValue4.Location = new System.Drawing.Point(260, 168);
            this.cbProtectReleaseValue4.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseValue4.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseValue4.Name = "cbProtectReleaseValue4";
            this.cbProtectReleaseValue4.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseValue4.TabIndex = 54;
            this.cbProtectReleaseValue4.Value = new decimal(new int[] {
            295,
            0,
            0,
            0});
            // 
            // cbProtectReleaseValue3
            // 
            this.cbProtectReleaseValue3.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbProtectReleaseValue3.Location = new System.Drawing.Point(260, 136);
            this.cbProtectReleaseValue3.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseValue3.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseValue3.Name = "cbProtectReleaseValue3";
            this.cbProtectReleaseValue3.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseValue3.TabIndex = 55;
            this.cbProtectReleaseValue3.Value = new decimal(new int[] {
            4106,
            0,
            0,
            65536});
            // 
            // label189
            // 
            this.label189.Location = new System.Drawing.Point(255, 46);
            this.label189.Name = "label189";
            this.label189.Size = new System.Drawing.Size(125, 22);
            this.label189.TabIndex = 53;
            this.label189.Text = "Value";
            // 
            // cbProtectReleaseValue11
            // 
            this.cbProtectReleaseValue11.Location = new System.Drawing.Point(260, 394);
            this.cbProtectReleaseValue11.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseValue11.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseValue11.Name = "cbProtectReleaseValue11";
            this.cbProtectReleaseValue11.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseValue11.TabIndex = 52;
            this.cbProtectReleaseValue11.Value = new decimal(new int[] {
            1,
            0,
            0,
            0});
            // 
            // cbProtectReleaseValue10
            // 
            this.cbProtectReleaseValue10.Location = new System.Drawing.Point(260, 362);
            this.cbProtectReleaseValue10.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseValue10.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseValue10.Name = "cbProtectReleaseValue10";
            this.cbProtectReleaseValue10.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseValue10.TabIndex = 51;
            this.cbProtectReleaseValue10.Value = new decimal(new int[] {
            1,
            0,
            0,
            0});
            // 
            // cbProtectReleaseValue9
            // 
            this.cbProtectReleaseValue9.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbProtectReleaseValue9.Location = new System.Drawing.Point(260, 330);
            this.cbProtectReleaseValue9.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseValue9.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseValue9.Name = "cbProtectReleaseValue9";
            this.cbProtectReleaseValue9.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseValue9.TabIndex = 44;
            this.cbProtectReleaseValue9.Value = new decimal(new int[] {
            170,
            0,
            0,
            -2147483648});
            // 
            // cbProtectReleaseValue8
            // 
            this.cbProtectReleaseValue8.Location = new System.Drawing.Point(260, 298);
            this.cbProtectReleaseValue8.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseValue8.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseValue8.Name = "cbProtectReleaseValue8";
            this.cbProtectReleaseValue8.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseValue8.TabIndex = 45;
            this.cbProtectReleaseValue8.Value = new decimal(new int[] {
            95,
            0,
            0,
            0});
            // 
            // cbProtectReleaseValue7
            // 
            this.cbProtectReleaseValue7.Location = new System.Drawing.Point(260, 266);
            this.cbProtectReleaseValue7.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseValue7.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseValue7.Name = "cbProtectReleaseValue7";
            this.cbProtectReleaseValue7.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseValue7.TabIndex = 46;
            this.cbProtectReleaseValue7.Value = new decimal(new int[] {
            22,
            0,
            0,
            -2147483648});
            // 
            // cbProtectReleaseValue6
            // 
            this.cbProtectReleaseValue6.Location = new System.Drawing.Point(260, 234);
            this.cbProtectReleaseValue6.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseValue6.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseValue6.Name = "cbProtectReleaseValue6";
            this.cbProtectReleaseValue6.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseValue6.TabIndex = 47;
            this.cbProtectReleaseValue6.Value = new decimal(new int[] {
            47,
            0,
            0,
            0});
            // 
            // cbProtectReleaseValue5
            // 
            this.cbProtectReleaseValue5.Location = new System.Drawing.Point(260, 202);
            this.cbProtectReleaseValue5.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseValue5.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseValue5.Name = "cbProtectReleaseValue5";
            this.cbProtectReleaseValue5.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseValue5.TabIndex = 48;
            this.cbProtectReleaseValue5.Value = new decimal(new int[] {
            450,
            0,
            0,
            0});
            // 
            // cbProtectReleaseValue2
            // 
            this.cbProtectReleaseValue2.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbProtectReleaseValue2.Location = new System.Drawing.Point(258, 104);
            this.cbProtectReleaseValue2.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseValue2.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseValue2.Name = "cbProtectReleaseValue2";
            this.cbProtectReleaseValue2.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseValue2.TabIndex = 49;
            this.cbProtectReleaseValue2.Value = new decimal(new int[] {
            3010,
            0,
            0,
            0});
            // 
            // cbProtectReleaseValue1
            // 
            this.cbProtectReleaseValue1.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbProtectReleaseValue1.Location = new System.Drawing.Point(258, 70);
            this.cbProtectReleaseValue1.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseValue1.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseValue1.Name = "cbProtectReleaseValue1";
            this.cbProtectReleaseValue1.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseValue1.TabIndex = 50;
            this.cbProtectReleaseValue1.Value = new decimal(new int[] {
            4190,
            0,
            0,
            0});
            // 
            // cbProtectReleaseRetain4
            // 
            this.cbProtectReleaseRetain4.Location = new System.Drawing.Point(408, 172);
            this.cbProtectReleaseRetain4.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseRetain4.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseRetain4.Name = "cbProtectReleaseRetain4";
            this.cbProtectReleaseRetain4.ReadOnly = true;
            this.cbProtectReleaseRetain4.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseRetain4.TabIndex = 29;
            this.cbProtectReleaseRetain4.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // cbProtectReleaseRetain3
            // 
            this.cbProtectReleaseRetain3.Location = new System.Drawing.Point(407, 138);
            this.cbProtectReleaseRetain3.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseRetain3.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseRetain3.Name = "cbProtectReleaseRetain3";
            this.cbProtectReleaseRetain3.ReadOnly = true;
            this.cbProtectReleaseRetain3.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseRetain3.TabIndex = 30;
            this.cbProtectReleaseRetain3.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // lbPOVPR
            // 
            this.lbPOVPR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbPOVPR.Location = new System.Drawing.Point(12, 136);
            this.lbPOVPR.Name = "lbPOVPR";
            this.lbPOVPR.Size = new System.Drawing.Size(193, 25);
            this.lbPOVPR.TabIndex = 26;
            this.lbPOVPR.Text = "Pack Over Voltage(mV)";
            this.lbPOVPR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbPLVPR
            // 
            this.lbPLVPR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbPLVPR.Location = new System.Drawing.Point(13, 169);
            this.lbPLVPR.Name = "lbPLVPR";
            this.lbPLVPR.Size = new System.Drawing.Size(208, 25);
            this.lbPLVPR.TabIndex = 25;
            this.lbPLVPR.Text = "Pack Under Voltage(mV)";
            this.lbPLVPR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // cbProtectReleaseRetain10
            // 
            this.cbProtectReleaseRetain10.Location = new System.Drawing.Point(406, 361);
            this.cbProtectReleaseRetain10.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseRetain10.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseRetain10.Name = "cbProtectReleaseRetain10";
            this.cbProtectReleaseRetain10.ReadOnly = true;
            this.cbProtectReleaseRetain10.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseRetain10.TabIndex = 24;
            this.cbProtectReleaseRetain10.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // cbProtectReleaseRetain11
            // 
            this.cbProtectReleaseRetain11.Location = new System.Drawing.Point(406, 393);
            this.cbProtectReleaseRetain11.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseRetain11.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseRetain11.Name = "cbProtectReleaseRetain11";
            this.cbProtectReleaseRetain11.ReadOnly = true;
            this.cbProtectReleaseRetain11.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseRetain11.TabIndex = 23;
            this.cbProtectReleaseRetain11.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // label188
            // 
            this.label188.Location = new System.Drawing.Point(404, 46);
            this.label188.Name = "label188";
            this.label188.Size = new System.Drawing.Size(162, 16);
            this.label188.TabIndex = 22;
            this.label188.Text = "Retain Time(ms)";
            // 
            // cbProtectReleaseRetain9
            // 
            this.cbProtectReleaseRetain9.Location = new System.Drawing.Point(407, 329);
            this.cbProtectReleaseRetain9.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseRetain9.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseRetain9.Name = "cbProtectReleaseRetain9";
            this.cbProtectReleaseRetain9.ReadOnly = true;
            this.cbProtectReleaseRetain9.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseRetain9.TabIndex = 15;
            this.cbProtectReleaseRetain9.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // cbProtectReleaseRetain8
            // 
            this.cbProtectReleaseRetain8.Location = new System.Drawing.Point(406, 297);
            this.cbProtectReleaseRetain8.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseRetain8.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseRetain8.Name = "cbProtectReleaseRetain8";
            this.cbProtectReleaseRetain8.ReadOnly = true;
            this.cbProtectReleaseRetain8.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseRetain8.TabIndex = 16;
            this.cbProtectReleaseRetain8.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // cbProtectReleaseRetain7
            // 
            this.cbProtectReleaseRetain7.Location = new System.Drawing.Point(406, 265);
            this.cbProtectReleaseRetain7.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseRetain7.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseRetain7.Name = "cbProtectReleaseRetain7";
            this.cbProtectReleaseRetain7.ReadOnly = true;
            this.cbProtectReleaseRetain7.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseRetain7.TabIndex = 17;
            this.cbProtectReleaseRetain7.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // cbProtectReleaseRetain6
            // 
            this.cbProtectReleaseRetain6.Location = new System.Drawing.Point(407, 236);
            this.cbProtectReleaseRetain6.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseRetain6.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseRetain6.Name = "cbProtectReleaseRetain6";
            this.cbProtectReleaseRetain6.ReadOnly = true;
            this.cbProtectReleaseRetain6.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseRetain6.TabIndex = 18;
            this.cbProtectReleaseRetain6.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // cbProtectReleaseRetain5
            // 
            this.cbProtectReleaseRetain5.Location = new System.Drawing.Point(408, 205);
            this.cbProtectReleaseRetain5.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseRetain5.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseRetain5.Name = "cbProtectReleaseRetain5";
            this.cbProtectReleaseRetain5.ReadOnly = true;
            this.cbProtectReleaseRetain5.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseRetain5.TabIndex = 19;
            this.cbProtectReleaseRetain5.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // cbProtectReleaseRetain2
            // 
            this.cbProtectReleaseRetain2.Location = new System.Drawing.Point(407, 106);
            this.cbProtectReleaseRetain2.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseRetain2.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseRetain2.Name = "cbProtectReleaseRetain2";
            this.cbProtectReleaseRetain2.ReadOnly = true;
            this.cbProtectReleaseRetain2.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseRetain2.TabIndex = 20;
            this.cbProtectReleaseRetain2.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // cbProtectReleaseRetain1
            // 
            this.cbProtectReleaseRetain1.Location = new System.Drawing.Point(407, 71);
            this.cbProtectReleaseRetain1.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectReleaseRetain1.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectReleaseRetain1.Name = "cbProtectReleaseRetain1";
            this.cbProtectReleaseRetain1.ReadOnly = true;
            this.cbProtectReleaseRetain1.Size = new System.Drawing.Size(120, 26);
            this.cbProtectReleaseRetain1.TabIndex = 21;
            this.cbProtectReleaseRetain1.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // lbCDPR
            // 
            this.lbCDPR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCDPR.Location = new System.Drawing.Point(15, 204);
            this.lbCDPR.Name = "lbCDPR";
            this.lbCDPR.Size = new System.Drawing.Size(177, 25);
            this.lbCDPR.TabIndex = 1;
            this.lbCDPR.Text = "Cell Voltage Diff(mV)";
            this.lbCDPR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCOVPR
            // 
            this.lbCOVPR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCOVPR.Location = new System.Drawing.Point(12, 69);
            this.lbCOVPR.Name = "lbCOVPR";
            this.lbCOVPR.Size = new System.Drawing.Size(193, 25);
            this.lbCOVPR.TabIndex = 7;
            this.lbCOVPR.Text = "Cell Over Voltage(mV)";
            this.lbCOVPR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCLVPR
            // 
            this.lbCLVPR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCLVPR.Location = new System.Drawing.Point(12, 103);
            this.lbCLVPR.Name = "lbCLVPR";
            this.lbCLVPR.Size = new System.Drawing.Size(209, 25);
            this.lbCLVPR.TabIndex = 6;
            this.lbCLVPR.Text = "Cell Under Voltage(mV)";
            this.lbCLVPR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCOTPR
            // 
            this.lbCOTPR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCOTPR.Location = new System.Drawing.Point(15, 237);
            this.lbCOTPR.Name = "lbCOTPR";
            this.lbCOTPR.Size = new System.Drawing.Size(177, 25);
            this.lbCOTPR.TabIndex = 5;
            this.lbCOTPR.Text = "Cell Over Temp(℃)";
            this.lbCOTPR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCLTPR
            // 
            this.lbCLTPR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCLTPR.Location = new System.Drawing.Point(14, 267);
            this.lbCLTPR.Name = "lbCLTPR";
            this.lbCLTPR.Size = new System.Drawing.Size(177, 25);
            this.lbCLTPR.TabIndex = 4;
            this.lbCLTPR.Text = "Cell Under Temp(℃)";
            this.lbCLTPR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCOAPR
            // 
            this.lbCOAPR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCOAPR.Location = new System.Drawing.Point(14, 301);
            this.lbCOAPR.Name = "lbCOAPR";
            this.lbCOAPR.Size = new System.Drawing.Size(221, 25);
            this.lbCOAPR.TabIndex = 3;
            this.lbCOAPR.Text = "Charging Over Current(A)";
            this.lbCOAPR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbDOAPR
            // 
            this.lbDOAPR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbDOAPR.Location = new System.Drawing.Point(14, 335);
            this.lbDOAPR.Name = "lbDOAPR";
            this.lbDOAPR.Size = new System.Drawing.Size(221, 25);
            this.lbDOAPR.TabIndex = 2;
            this.lbDOAPR.Text = "DisChargingOverCurren(A)";
            this.lbDOAPR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // gbProtectSet
            // 
            this.gbProtectSet.BackColor = System.Drawing.Color.GhostWhite;
            this.gbProtectSet.Controls.Add(this.lbCDP);
            this.gbProtectSet.Controls.Add(this.lbinterLockErrorP);
            this.gbProtectSet.Controls.Add(this.lbSelfSystemDiagP);
            this.gbProtectSet.Controls.Add(this.cbProtectEnable14);
            this.gbProtectSet.Controls.Add(this.cbProtectEnable13);
            this.gbProtectSet.Controls.Add(this.cbProtectEnable12);
            this.gbProtectSet.Controls.Add(this.cbProtectRetainTime13);
            this.gbProtectSet.Controls.Add(this.cbProtectRetainTime14);
            this.gbProtectSet.Controls.Add(this.cbProtectRetainTime12);
            this.gbProtectSet.Controls.Add(this.cbProtectValue14);
            this.gbProtectSet.Controls.Add(this.cbProtectValue13);
            this.gbProtectSet.Controls.Add(this.lbCommunicationErrorP);
            this.gbProtectSet.Controls.Add(this.cbProtectValue12);
            this.gbProtectSet.Controls.Add(this.lbSLMP);
            this.gbProtectSet.Controls.Add(this.lbCurrentSensorErrorP);
            this.gbProtectSet.Controls.Add(this.cbProtectRetainTime4);
            this.gbProtectSet.Controls.Add(this.cbProtectRetainTime3);
            this.gbProtectSet.Controls.Add(this.cbProtectRetainTime10);
            this.gbProtectSet.Controls.Add(this.cbProtectRetainTime11);
            this.gbProtectSet.Controls.Add(this.label88);
            this.gbProtectSet.Controls.Add(this.cbProtectRetainTime9);
            this.gbProtectSet.Controls.Add(this.cbProtectRetainTime8);
            this.gbProtectSet.Controls.Add(this.cbProtectRetainTime7);
            this.gbProtectSet.Controls.Add(this.cbProtectRetainTime6);
            this.gbProtectSet.Controls.Add(this.cbProtectRetainTime5);
            this.gbProtectSet.Controls.Add(this.cbProtectRetainTime2);
            this.gbProtectSet.Controls.Add(this.cbProtectRetainTime1);
            this.gbProtectSet.Controls.Add(this.cbProtectEnable4);
            this.gbProtectSet.Controls.Add(this.cbProtectEnable3);
            this.gbProtectSet.Controls.Add(this.cbProtectValue4);
            this.gbProtectSet.Controls.Add(this.cbProtectValue3);
            this.gbProtectSet.Controls.Add(this.lbPLVP);
            this.gbProtectSet.Controls.Add(this.lbPOVP);
            this.gbProtectSet.Controls.Add(this.cbProtectEnable11);
            this.gbProtectSet.Controls.Add(this.cbProtectEnable10);
            this.gbProtectSet.Controls.Add(this.cbProtectEnable9);
            this.gbProtectSet.Controls.Add(this.cbProtectEnable8);
            this.gbProtectSet.Controls.Add(this.cbProtectEnable7);
            this.gbProtectSet.Controls.Add(this.cbProtectEnable6);
            this.gbProtectSet.Controls.Add(this.cbProtectEnable5);
            this.gbProtectSet.Controls.Add(this.cbProtectEnable2);
            this.gbProtectSet.Controls.Add(this.cbProtectEnable1);
            this.gbProtectSet.Controls.Add(this.label190);
            this.gbProtectSet.Controls.Add(this.lbCOAP);
            this.gbProtectSet.Controls.Add(this.cbProtectValue11);
            this.gbProtectSet.Controls.Add(this.cbProtectValue10);
            this.gbProtectSet.Controls.Add(this.cbProtectValue9);
            this.gbProtectSet.Controls.Add(this.cbProtectValue8);
            this.gbProtectSet.Controls.Add(this.cbProtectValue7);
            this.gbProtectSet.Controls.Add(this.cbProtectValue6);
            this.gbProtectSet.Controls.Add(this.cbProtectValue5);
            this.gbProtectSet.Controls.Add(this.cbProtectValue2);
            this.gbProtectSet.Controls.Add(this.cbProtectValue1);
            this.gbProtectSet.Controls.Add(this.lbDOAP);
            this.gbProtectSet.Controls.Add(this.lbCLTP);
            this.gbProtectSet.Controls.Add(this.lbCOTP);
            this.gbProtectSet.Controls.Add(this.lbCLVP);
            this.gbProtectSet.Controls.Add(this.lbCOVP);
            this.gbProtectSet.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.gbProtectSet.Location = new System.Drawing.Point(34, 19);
            this.gbProtectSet.Name = "gbProtectSet";
            this.gbProtectSet.Size = new System.Drawing.Size(563, 538);
            this.gbProtectSet.TabIndex = 4;
            this.gbProtectSet.TabStop = false;
            this.gbProtectSet.Text = "Protect Value";
            // 
            // lbCDP
            // 
            this.lbCDP.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCDP.Location = new System.Drawing.Point(8, 199);
            this.lbCDP.Name = "lbCDP";
            this.lbCDP.Size = new System.Drawing.Size(176, 25);
            this.lbCDP.TabIndex = 78;
            this.lbCDP.Text = "Cell Voltage Diff(mV)";
            this.lbCDP.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbinterLockErrorP
            // 
            this.lbinterLockErrorP.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbinterLockErrorP.Location = new System.Drawing.Point(8, 453);
            this.lbinterLockErrorP.Name = "lbinterLockErrorP";
            this.lbinterLockErrorP.Size = new System.Drawing.Size(176, 25);
            this.lbinterLockErrorP.TabIndex = 71;
            this.lbinterLockErrorP.Text = "Inter Lock Error";
            this.lbinterLockErrorP.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbSelfSystemDiagP
            // 
            this.lbSelfSystemDiagP.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbSelfSystemDiagP.Location = new System.Drawing.Point(8, 485);
            this.lbSelfSystemDiagP.Name = "lbSelfSystemDiagP";
            this.lbSelfSystemDiagP.Size = new System.Drawing.Size(176, 25);
            this.lbSelfSystemDiagP.TabIndex = 70;
            this.lbSelfSystemDiagP.Text = "Self System Diag";
            this.lbSelfSystemDiagP.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // cbProtectEnable14
            // 
            this.cbProtectEnable14.Location = new System.Drawing.Point(534, 483);
            this.cbProtectEnable14.Name = "cbProtectEnable14";
            this.cbProtectEnable14.Size = new System.Drawing.Size(23, 25);
            this.cbProtectEnable14.TabIndex = 69;
            this.cbProtectEnable14.UseVisualStyleBackColor = true;
            // 
            // cbProtectEnable13
            // 
            this.cbProtectEnable13.Location = new System.Drawing.Point(534, 452);
            this.cbProtectEnable13.Name = "cbProtectEnable13";
            this.cbProtectEnable13.Size = new System.Drawing.Size(23, 25);
            this.cbProtectEnable13.TabIndex = 68;
            this.cbProtectEnable13.UseVisualStyleBackColor = true;
            // 
            // cbProtectEnable12
            // 
            this.cbProtectEnable12.Location = new System.Drawing.Point(534, 422);
            this.cbProtectEnable12.Name = "cbProtectEnable12";
            this.cbProtectEnable12.Size = new System.Drawing.Size(23, 25);
            this.cbProtectEnable12.TabIndex = 67;
            this.cbProtectEnable12.UseVisualStyleBackColor = true;
            // 
            // cbProtectRetainTime13
            // 
            this.cbProtectRetainTime13.Location = new System.Drawing.Point(394, 455);
            this.cbProtectRetainTime13.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectRetainTime13.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectRetainTime13.Name = "cbProtectRetainTime13";
            this.cbProtectRetainTime13.ReadOnly = true;
            this.cbProtectRetainTime13.Size = new System.Drawing.Size(120, 26);
            this.cbProtectRetainTime13.TabIndex = 66;
            this.cbProtectRetainTime13.Value = new decimal(new int[] {
            10,
            0,
            0,
            0});
            // 
            // cbProtectRetainTime14
            // 
            this.cbProtectRetainTime14.Location = new System.Drawing.Point(394, 487);
            this.cbProtectRetainTime14.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectRetainTime14.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectRetainTime14.Name = "cbProtectRetainTime14";
            this.cbProtectRetainTime14.ReadOnly = true;
            this.cbProtectRetainTime14.Size = new System.Drawing.Size(120, 26);
            this.cbProtectRetainTime14.TabIndex = 65;
            this.cbProtectRetainTime14.Value = new decimal(new int[] {
            10,
            0,
            0,
            0});
            // 
            // cbProtectRetainTime12
            // 
            this.cbProtectRetainTime12.Location = new System.Drawing.Point(394, 423);
            this.cbProtectRetainTime12.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectRetainTime12.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectRetainTime12.Name = "cbProtectRetainTime12";
            this.cbProtectRetainTime12.ReadOnly = true;
            this.cbProtectRetainTime12.Size = new System.Drawing.Size(120, 26);
            this.cbProtectRetainTime12.TabIndex = 64;
            this.cbProtectRetainTime12.Value = new decimal(new int[] {
            10,
            0,
            0,
            0});
            // 
            // cbProtectValue14
            // 
            this.cbProtectValue14.Enabled = false;
            this.cbProtectValue14.Location = new System.Drawing.Point(247, 486);
            this.cbProtectValue14.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectValue14.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectValue14.Name = "cbProtectValue14";
            this.cbProtectValue14.ReadOnly = true;
            this.cbProtectValue14.Size = new System.Drawing.Size(120, 26);
            this.cbProtectValue14.TabIndex = 63;
            // 
            // cbProtectValue13
            // 
            this.cbProtectValue13.Enabled = false;
            this.cbProtectValue13.Location = new System.Drawing.Point(247, 454);
            this.cbProtectValue13.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectValue13.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectValue13.Name = "cbProtectValue13";
            this.cbProtectValue13.ReadOnly = true;
            this.cbProtectValue13.Size = new System.Drawing.Size(120, 26);
            this.cbProtectValue13.TabIndex = 62;
            // 
            // lbCommunicationErrorP
            // 
            this.lbCommunicationErrorP.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCommunicationErrorP.Location = new System.Drawing.Point(8, 390);
            this.lbCommunicationErrorP.Name = "lbCommunicationErrorP";
            this.lbCommunicationErrorP.Size = new System.Drawing.Size(195, 25);
            this.lbCommunicationErrorP.TabIndex = 61;
            this.lbCommunicationErrorP.Text = "Communication Error";
            this.lbCommunicationErrorP.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // cbProtectValue12
            // 
            this.cbProtectValue12.Enabled = false;
            this.cbProtectValue12.Location = new System.Drawing.Point(247, 422);
            this.cbProtectValue12.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectValue12.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectValue12.Name = "cbProtectValue12";
            this.cbProtectValue12.ReadOnly = true;
            this.cbProtectValue12.Size = new System.Drawing.Size(120, 26);
            this.cbProtectValue12.TabIndex = 60;
            // 
            // lbSLMP
            // 
            this.lbSLMP.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbSLMP.Location = new System.Drawing.Point(8, 358);
            this.lbSLMP.Name = "lbSLMP";
            this.lbSLMP.Size = new System.Drawing.Size(195, 25);
            this.lbSLMP.TabIndex = 58;
            this.lbSLMP.Text = "Sensing Line Measure";
            this.lbSLMP.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCurrentSensorErrorP
            // 
            this.lbCurrentSensorErrorP.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCurrentSensorErrorP.Location = new System.Drawing.Point(8, 422);
            this.lbCurrentSensorErrorP.Name = "lbCurrentSensorErrorP";
            this.lbCurrentSensorErrorP.Size = new System.Drawing.Size(195, 25);
            this.lbCurrentSensorErrorP.TabIndex = 59;
            this.lbCurrentSensorErrorP.Text = "Current Sensor Error";
            this.lbCurrentSensorErrorP.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // cbProtectRetainTime4
            // 
            this.cbProtectRetainTime4.Location = new System.Drawing.Point(395, 165);
            this.cbProtectRetainTime4.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectRetainTime4.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectRetainTime4.Name = "cbProtectRetainTime4";
            this.cbProtectRetainTime4.ReadOnly = true;
            this.cbProtectRetainTime4.Size = new System.Drawing.Size(120, 26);
            this.cbProtectRetainTime4.TabIndex = 56;
            this.cbProtectRetainTime4.Value = new decimal(new int[] {
            3000,
            0,
            0,
            0});
            // 
            // cbProtectRetainTime3
            // 
            this.cbProtectRetainTime3.Location = new System.Drawing.Point(394, 131);
            this.cbProtectRetainTime3.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectRetainTime3.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectRetainTime3.Name = "cbProtectRetainTime3";
            this.cbProtectRetainTime3.ReadOnly = true;
            this.cbProtectRetainTime3.Size = new System.Drawing.Size(120, 26);
            this.cbProtectRetainTime3.TabIndex = 57;
            this.cbProtectRetainTime3.Value = new decimal(new int[] {
            3000,
            0,
            0,
            0});
            // 
            // cbProtectRetainTime10
            // 
            this.cbProtectRetainTime10.Location = new System.Drawing.Point(394, 359);
            this.cbProtectRetainTime10.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectRetainTime10.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectRetainTime10.Name = "cbProtectRetainTime10";
            this.cbProtectRetainTime10.ReadOnly = true;
            this.cbProtectRetainTime10.Size = new System.Drawing.Size(120, 26);
            this.cbProtectRetainTime10.TabIndex = 55;
            this.cbProtectRetainTime10.Value = new decimal(new int[] {
            10,
            0,
            0,
            0});
            // 
            // cbProtectRetainTime11
            // 
            this.cbProtectRetainTime11.Location = new System.Drawing.Point(394, 391);
            this.cbProtectRetainTime11.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectRetainTime11.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectRetainTime11.Name = "cbProtectRetainTime11";
            this.cbProtectRetainTime11.ReadOnly = true;
            this.cbProtectRetainTime11.Size = new System.Drawing.Size(120, 26);
            this.cbProtectRetainTime11.TabIndex = 54;
            this.cbProtectRetainTime11.Value = new decimal(new int[] {
            10,
            0,
            0,
            0});
            // 
            // label88
            // 
            this.label88.AutoSize = true;
            this.label88.Location = new System.Drawing.Point(389, 40);
            this.label88.Name = "label88";
            this.label88.Size = new System.Drawing.Size(125, 16);
            this.label88.TabIndex = 53;
            this.label88.Text = "Retain Time(ms)";
            // 
            // cbProtectRetainTime9
            // 
            this.cbProtectRetainTime9.Location = new System.Drawing.Point(394, 327);
            this.cbProtectRetainTime9.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectRetainTime9.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectRetainTime9.Name = "cbProtectRetainTime9";
            this.cbProtectRetainTime9.ReadOnly = true;
            this.cbProtectRetainTime9.Size = new System.Drawing.Size(120, 26);
            this.cbProtectRetainTime9.TabIndex = 46;
            this.cbProtectRetainTime9.Value = new decimal(new int[] {
            10,
            0,
            0,
            0});
            // 
            // cbProtectRetainTime8
            // 
            this.cbProtectRetainTime8.Location = new System.Drawing.Point(394, 294);
            this.cbProtectRetainTime8.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectRetainTime8.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectRetainTime8.Name = "cbProtectRetainTime8";
            this.cbProtectRetainTime8.ReadOnly = true;
            this.cbProtectRetainTime8.Size = new System.Drawing.Size(120, 26);
            this.cbProtectRetainTime8.TabIndex = 47;
            this.cbProtectRetainTime8.Value = new decimal(new int[] {
            10,
            0,
            0,
            0});
            // 
            // cbProtectRetainTime7
            // 
            this.cbProtectRetainTime7.Location = new System.Drawing.Point(394, 262);
            this.cbProtectRetainTime7.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectRetainTime7.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectRetainTime7.Name = "cbProtectRetainTime7";
            this.cbProtectRetainTime7.ReadOnly = true;
            this.cbProtectRetainTime7.Size = new System.Drawing.Size(120, 26);
            this.cbProtectRetainTime7.TabIndex = 48;
            this.cbProtectRetainTime7.Value = new decimal(new int[] {
            3000,
            0,
            0,
            0});
            // 
            // cbProtectRetainTime6
            // 
            this.cbProtectRetainTime6.Location = new System.Drawing.Point(394, 229);
            this.cbProtectRetainTime6.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectRetainTime6.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectRetainTime6.Name = "cbProtectRetainTime6";
            this.cbProtectRetainTime6.ReadOnly = true;
            this.cbProtectRetainTime6.Size = new System.Drawing.Size(120, 26);
            this.cbProtectRetainTime6.TabIndex = 49;
            this.cbProtectRetainTime6.Value = new decimal(new int[] {
            3000,
            0,
            0,
            0});
            // 
            // cbProtectRetainTime5
            // 
            this.cbProtectRetainTime5.Location = new System.Drawing.Point(395, 198);
            this.cbProtectRetainTime5.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectRetainTime5.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectRetainTime5.Name = "cbProtectRetainTime5";
            this.cbProtectRetainTime5.ReadOnly = true;
            this.cbProtectRetainTime5.Size = new System.Drawing.Size(120, 26);
            this.cbProtectRetainTime5.TabIndex = 50;
            this.cbProtectRetainTime5.Value = new decimal(new int[] {
            3000,
            0,
            0,
            0});
            // 
            // cbProtectRetainTime2
            // 
            this.cbProtectRetainTime2.Location = new System.Drawing.Point(394, 99);
            this.cbProtectRetainTime2.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectRetainTime2.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectRetainTime2.Name = "cbProtectRetainTime2";
            this.cbProtectRetainTime2.ReadOnly = true;
            this.cbProtectRetainTime2.Size = new System.Drawing.Size(120, 26);
            this.cbProtectRetainTime2.TabIndex = 51;
            this.cbProtectRetainTime2.Value = new decimal(new int[] {
            3000,
            0,
            0,
            0});
            // 
            // cbProtectRetainTime1
            // 
            this.cbProtectRetainTime1.Location = new System.Drawing.Point(394, 64);
            this.cbProtectRetainTime1.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectRetainTime1.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectRetainTime1.Name = "cbProtectRetainTime1";
            this.cbProtectRetainTime1.ReadOnly = true;
            this.cbProtectRetainTime1.Size = new System.Drawing.Size(120, 26);
            this.cbProtectRetainTime1.TabIndex = 52;
            this.cbProtectRetainTime1.Value = new decimal(new int[] {
            3000,
            0,
            0,
            0});
            // 
            // cbProtectEnable4
            // 
            this.cbProtectEnable4.Location = new System.Drawing.Point(534, 167);
            this.cbProtectEnable4.Name = "cbProtectEnable4";
            this.cbProtectEnable4.Size = new System.Drawing.Size(23, 25);
            this.cbProtectEnable4.TabIndex = 45;
            this.cbProtectEnable4.UseVisualStyleBackColor = true;
            // 
            // cbProtectEnable3
            // 
            this.cbProtectEnable3.Location = new System.Drawing.Point(534, 132);
            this.cbProtectEnable3.Name = "cbProtectEnable3";
            this.cbProtectEnable3.Size = new System.Drawing.Size(23, 25);
            this.cbProtectEnable3.TabIndex = 44;
            this.cbProtectEnable3.UseVisualStyleBackColor = true;
            // 
            // cbProtectValue4
            // 
            this.cbProtectValue4.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbProtectValue4.Location = new System.Drawing.Point(247, 166);
            this.cbProtectValue4.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectValue4.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectValue4.Name = "cbProtectValue4";
            this.cbProtectValue4.Size = new System.Drawing.Size(120, 26);
            this.cbProtectValue4.TabIndex = 40;
            this.cbProtectValue4.Value = new decimal(new int[] {
            294,
            0,
            0,
            0});
            // 
            // cbProtectValue3
            // 
            this.cbProtectValue3.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbProtectValue3.Location = new System.Drawing.Point(247, 133);
            this.cbProtectValue3.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectValue3.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectValue3.Name = "cbProtectValue3";
            this.cbProtectValue3.Size = new System.Drawing.Size(120, 26);
            this.cbProtectValue3.TabIndex = 41;
            this.cbProtectValue3.Value = new decimal(new int[] {
            4116,
            0,
            0,
            65536});
            // 
            // lbPLVP
            // 
            this.lbPLVP.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbPLVP.Location = new System.Drawing.Point(8, 167);
            this.lbPLVP.Name = "lbPLVP";
            this.lbPLVP.Size = new System.Drawing.Size(210, 25);
            this.lbPLVP.TabIndex = 38;
            this.lbPLVP.Text = "Pack Under Voltage(V)";
            this.lbPLVP.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbPOVP
            // 
            this.lbPOVP.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbPOVP.Location = new System.Drawing.Point(8, 133);
            this.lbPOVP.Name = "lbPOVP";
            this.lbPOVP.Size = new System.Drawing.Size(190, 25);
            this.lbPOVP.TabIndex = 39;
            this.lbPOVP.Text = "Pack Over Voltage(V)";
            this.lbPOVP.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // cbProtectEnable11
            // 
            this.cbProtectEnable11.Location = new System.Drawing.Point(534, 388);
            this.cbProtectEnable11.Name = "cbProtectEnable11";
            this.cbProtectEnable11.Size = new System.Drawing.Size(23, 25);
            this.cbProtectEnable11.TabIndex = 37;
            this.cbProtectEnable11.UseVisualStyleBackColor = true;
            // 
            // cbProtectEnable10
            // 
            this.cbProtectEnable10.Location = new System.Drawing.Point(534, 357);
            this.cbProtectEnable10.Name = "cbProtectEnable10";
            this.cbProtectEnable10.Size = new System.Drawing.Size(23, 25);
            this.cbProtectEnable10.TabIndex = 36;
            this.cbProtectEnable10.UseVisualStyleBackColor = true;
            // 
            // cbProtectEnable9
            // 
            this.cbProtectEnable9.Location = new System.Drawing.Point(534, 327);
            this.cbProtectEnable9.Name = "cbProtectEnable9";
            this.cbProtectEnable9.Size = new System.Drawing.Size(23, 25);
            this.cbProtectEnable9.TabIndex = 35;
            this.cbProtectEnable9.UseVisualStyleBackColor = true;
            // 
            // cbProtectEnable8
            // 
            this.cbProtectEnable8.Location = new System.Drawing.Point(534, 293);
            this.cbProtectEnable8.Name = "cbProtectEnable8";
            this.cbProtectEnable8.Size = new System.Drawing.Size(23, 25);
            this.cbProtectEnable8.TabIndex = 34;
            this.cbProtectEnable8.UseVisualStyleBackColor = true;
            // 
            // cbProtectEnable7
            // 
            this.cbProtectEnable7.Location = new System.Drawing.Point(534, 263);
            this.cbProtectEnable7.Name = "cbProtectEnable7";
            this.cbProtectEnable7.Size = new System.Drawing.Size(23, 25);
            this.cbProtectEnable7.TabIndex = 33;
            this.cbProtectEnable7.UseVisualStyleBackColor = true;
            // 
            // cbProtectEnable6
            // 
            this.cbProtectEnable6.Location = new System.Drawing.Point(534, 231);
            this.cbProtectEnable6.Name = "cbProtectEnable6";
            this.cbProtectEnable6.Size = new System.Drawing.Size(23, 25);
            this.cbProtectEnable6.TabIndex = 32;
            this.cbProtectEnable6.UseVisualStyleBackColor = true;
            // 
            // cbProtectEnable5
            // 
            this.cbProtectEnable5.Location = new System.Drawing.Point(534, 199);
            this.cbProtectEnable5.Name = "cbProtectEnable5";
            this.cbProtectEnable5.Size = new System.Drawing.Size(23, 25);
            this.cbProtectEnable5.TabIndex = 30;
            this.cbProtectEnable5.UseVisualStyleBackColor = true;
            // 
            // cbProtectEnable2
            // 
            this.cbProtectEnable2.Location = new System.Drawing.Point(534, 99);
            this.cbProtectEnable2.Name = "cbProtectEnable2";
            this.cbProtectEnable2.Size = new System.Drawing.Size(23, 25);
            this.cbProtectEnable2.TabIndex = 29;
            this.cbProtectEnable2.UseVisualStyleBackColor = true;
            // 
            // cbProtectEnable1
            // 
            this.cbProtectEnable1.Location = new System.Drawing.Point(534, 65);
            this.cbProtectEnable1.Name = "cbProtectEnable1";
            this.cbProtectEnable1.Size = new System.Drawing.Size(23, 25);
            this.cbProtectEnable1.TabIndex = 28;
            this.cbProtectEnable1.UseVisualStyleBackColor = true;
            // 
            // label190
            // 
            this.label190.Location = new System.Drawing.Point(244, 40);
            this.label190.Name = "label190";
            this.label190.Size = new System.Drawing.Size(125, 22);
            this.label190.TabIndex = 26;
            this.label190.Text = "Value";
            // 
            // lbCOAP
            // 
            this.lbCOAP.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCOAP.Location = new System.Drawing.Point(6, 291);
            this.lbCOAP.Name = "lbCOAP";
            this.lbCOAP.Size = new System.Drawing.Size(236, 25);
            this.lbCOAP.TabIndex = 14;
            this.lbCOAP.Text = "Charging Over Current(A)";
            this.lbCOAP.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // cbProtectValue11
            // 
            this.cbProtectValue11.Enabled = false;
            this.cbProtectValue11.Location = new System.Drawing.Point(247, 390);
            this.cbProtectValue11.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectValue11.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectValue11.Name = "cbProtectValue11";
            this.cbProtectValue11.ReadOnly = true;
            this.cbProtectValue11.Size = new System.Drawing.Size(120, 26);
            this.cbProtectValue11.TabIndex = 13;
            // 
            // cbProtectValue10
            // 
            this.cbProtectValue10.Enabled = false;
            this.cbProtectValue10.Location = new System.Drawing.Point(247, 358);
            this.cbProtectValue10.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectValue10.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectValue10.Name = "cbProtectValue10";
            this.cbProtectValue10.ReadOnly = true;
            this.cbProtectValue10.Size = new System.Drawing.Size(120, 26);
            this.cbProtectValue10.TabIndex = 11;
            // 
            // cbProtectValue9
            // 
            this.cbProtectValue9.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbProtectValue9.Location = new System.Drawing.Point(247, 326);
            this.cbProtectValue9.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectValue9.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectValue9.Name = "cbProtectValue9";
            this.cbProtectValue9.Size = new System.Drawing.Size(120, 26);
            this.cbProtectValue9.TabIndex = 8;
            this.cbProtectValue9.Value = new decimal(new int[] {
            180,
            0,
            0,
            -2147483648});
            // 
            // cbProtectValue8
            // 
            this.cbProtectValue8.Location = new System.Drawing.Point(247, 293);
            this.cbProtectValue8.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectValue8.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectValue8.Name = "cbProtectValue8";
            this.cbProtectValue8.Size = new System.Drawing.Size(120, 26);
            this.cbProtectValue8.TabIndex = 8;
            this.cbProtectValue8.Value = new decimal(new int[] {
            100,
            0,
            0,
            0});
            // 
            // cbProtectValue7
            // 
            this.cbProtectValue7.Location = new System.Drawing.Point(247, 261);
            this.cbProtectValue7.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectValue7.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectValue7.Name = "cbProtectValue7";
            this.cbProtectValue7.Size = new System.Drawing.Size(120, 26);
            this.cbProtectValue7.TabIndex = 8;
            this.cbProtectValue7.Value = new decimal(new int[] {
            25,
            0,
            0,
            -2147483648});
            // 
            // cbProtectValue6
            // 
            this.cbProtectValue6.Location = new System.Drawing.Point(247, 229);
            this.cbProtectValue6.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectValue6.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectValue6.Name = "cbProtectValue6";
            this.cbProtectValue6.Size = new System.Drawing.Size(120, 26);
            this.cbProtectValue6.TabIndex = 8;
            this.cbProtectValue6.Value = new decimal(new int[] {
            50,
            0,
            0,
            0});
            // 
            // cbProtectValue5
            // 
            this.cbProtectValue5.Location = new System.Drawing.Point(247, 198);
            this.cbProtectValue5.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectValue5.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectValue5.Name = "cbProtectValue5";
            this.cbProtectValue5.Size = new System.Drawing.Size(120, 26);
            this.cbProtectValue5.TabIndex = 8;
            this.cbProtectValue5.Value = new decimal(new int[] {
            500,
            0,
            0,
            0});
            // 
            // cbProtectValue2
            // 
            this.cbProtectValue2.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbProtectValue2.Location = new System.Drawing.Point(247, 99);
            this.cbProtectValue2.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectValue2.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectValue2.Name = "cbProtectValue2";
            this.cbProtectValue2.Size = new System.Drawing.Size(120, 26);
            this.cbProtectValue2.TabIndex = 8;
            this.cbProtectValue2.Value = new decimal(new int[] {
            3000,
            0,
            0,
            0});
            // 
            // cbProtectValue1
            // 
            this.cbProtectValue1.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbProtectValue1.Location = new System.Drawing.Point(247, 65);
            this.cbProtectValue1.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbProtectValue1.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbProtectValue1.Name = "cbProtectValue1";
            this.cbProtectValue1.Size = new System.Drawing.Size(120, 26);
            this.cbProtectValue1.TabIndex = 8;
            this.cbProtectValue1.Value = new decimal(new int[] {
            4200,
            0,
            0,
            0});
            // 
            // lbDOAP
            // 
            this.lbDOAP.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbDOAP.Location = new System.Drawing.Point(8, 325);
            this.lbDOAP.Name = "lbDOAP";
            this.lbDOAP.Size = new System.Drawing.Size(226, 25);
            this.lbDOAP.TabIndex = 2;
            this.lbDOAP.Text = "DisChargingOverCurren(A)";
            this.lbDOAP.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCLTP
            // 
            this.lbCLTP.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCLTP.Location = new System.Drawing.Point(8, 259);
            this.lbCLTP.Name = "lbCLTP";
            this.lbCLTP.Size = new System.Drawing.Size(176, 25);
            this.lbCLTP.TabIndex = 4;
            this.lbCLTP.Text = "Cell Under Temp(℃)";
            this.lbCLTP.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCOTP
            // 
            this.lbCOTP.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCOTP.Location = new System.Drawing.Point(8, 230);
            this.lbCOTP.Name = "lbCOTP";
            this.lbCOTP.Size = new System.Drawing.Size(176, 25);
            this.lbCOTP.TabIndex = 5;
            this.lbCOTP.Text = "Cell Over Temp(℃)";
            this.lbCOTP.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCLVP
            // 
            this.lbCLVP.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCLVP.Location = new System.Drawing.Point(6, 100);
            this.lbCLVP.Name = "lbCLVP";
            this.lbCLVP.Size = new System.Drawing.Size(192, 25);
            this.lbCLVP.TabIndex = 6;
            this.lbCLVP.Text = "Cell Under Voltage(mV)";
            this.lbCLVP.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCOVP
            // 
            this.lbCOVP.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCOVP.Location = new System.Drawing.Point(6, 66);
            this.lbCOVP.Name = "lbCOVP";
            this.lbCOVP.Size = new System.Drawing.Size(197, 25);
            this.lbCOVP.TabIndex = 7;
            this.lbCOVP.Text = "Cell Over Voltage(mV)";
            this.lbCOVP.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // tabPage1
            // 
            this.tabPage1.Controls.Add(this.gbLoggingStatus);
            this.tabPage1.Controls.Add(this.gbVoltage);
            this.tabPage1.Controls.Add(this.gbCommand);
            this.tabPage1.Controls.Add(this.gbTemperature);
            this.tabPage1.Controls.Add(this.gbSystemStatus);
            this.tabPage1.Controls.Add(this.gbSystemInfo);
            this.tabPage1.Location = new System.Drawing.Point(4, 22);
            this.tabPage1.Name = "tabPage1";
            this.tabPage1.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage1.Size = new System.Drawing.Size(1782, 781);
            this.tabPage1.TabIndex = 0;
            this.tabPage1.Text = "BMS";
            this.tabPage1.UseVisualStyleBackColor = true;
            // 
            // gbLoggingStatus
            // 
            this.gbLoggingStatus.BackColor = System.Drawing.Color.Azure;
            this.gbLoggingStatus.Controls.Add(this.btLoggingStart);
            this.gbLoggingStatus.Controls.Add(this.button2);
            this.gbLoggingStatus.Controls.Add(this.tbLogStatus);
            this.gbLoggingStatus.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.gbLoggingStatus.Location = new System.Drawing.Point(1120, 26);
            this.gbLoggingStatus.Name = "gbLoggingStatus";
            this.gbLoggingStatus.Size = new System.Drawing.Size(641, 713);
            this.gbLoggingStatus.TabIndex = 2;
            this.gbLoggingStatus.TabStop = false;
            this.gbLoggingStatus.Text = "Logging Status";
            // 
            // btLoggingStart
            // 
            this.btLoggingStart.BackColor = System.Drawing.Color.MediumAquamarine;
            this.btLoggingStart.Font = new System.Drawing.Font("굴림", 11F);
            this.btLoggingStart.Location = new System.Drawing.Point(17, 664);
            this.btLoggingStart.Name = "btLoggingStart";
            this.btLoggingStart.Size = new System.Drawing.Size(209, 33);
            this.btLoggingStart.TabIndex = 2;
            this.btLoggingStart.Text = "로깅 시작";
            this.btLoggingStart.UseCompatibleTextRendering = true;
            this.btLoggingStart.UseMnemonic = false;
            this.btLoggingStart.UseVisualStyleBackColor = false;
            this.btLoggingStart.Click += new System.EventHandler(this.btLoggingStart_Click);
            // 
            // button2
            // 
            this.button2.BackColor = System.Drawing.Color.MediumAquamarine;
            this.button2.Location = new System.Drawing.Point(414, 665);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(209, 32);
            this.button2.TabIndex = 1;
            this.button2.Text = "Clear";
            this.button2.UseVisualStyleBackColor = false;
            this.button2.Click += new System.EventHandler(this.btLogClear_Click);
            // 
            // tbLogStatus
            // 
            this.tbLogStatus.Font = new System.Drawing.Font("굴림체", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.tbLogStatus.Location = new System.Drawing.Point(17, 25);
            this.tbLogStatus.Multiline = true;
            this.tbLogStatus.Name = "tbLogStatus";
            this.tbLogStatus.Size = new System.Drawing.Size(606, 619);
            this.tbLogStatus.TabIndex = 0;
            // 
            // gbVoltage
            // 
            this.gbVoltage.BackColor = System.Drawing.Color.GhostWhite;
            this.gbVoltage.Controls.Add(this.pnModule);
            this.gbVoltage.Controls.Add(this.panel2);
            this.gbVoltage.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.gbVoltage.Location = new System.Drawing.Point(28, 24);
            this.gbVoltage.Name = "gbVoltage";
            this.gbVoltage.Size = new System.Drawing.Size(614, 375);
            this.gbVoltage.TabIndex = 1;
            this.gbVoltage.TabStop = false;
            this.gbVoltage.Text = "Voltage(V)";
            // 
            // pnModule
            // 
            this.pnModule.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.pnModule.Controls.Add(this.lb_IC10);
            this.pnModule.Controls.Add(this.chart1);
            this.pnModule.Controls.Add(this.lb_IC9);
            this.pnModule.Controls.Add(this.lb_IC8);
            this.pnModule.Controls.Add(this.lb_IC7);
            this.pnModule.Controls.Add(this.lb_IC6);
            this.pnModule.Controls.Add(this.lb_IC5);
            this.pnModule.Controls.Add(this.lb_IC4);
            this.pnModule.Controls.Add(this.lb_IC3);
            this.pnModule.Controls.Add(this.lb_IC2);
            this.pnModule.Controls.Add(this.lb_IC1);
            this.pnModule.Location = new System.Drawing.Point(29, 25);
            this.pnModule.Name = "pnModule";
            this.pnModule.Size = new System.Drawing.Size(150, 328);
            this.pnModule.TabIndex = 2;
            // 
            // lb_IC10
            // 
            this.lb_IC10.BackColor = System.Drawing.Color.LightBlue;
            this.lb_IC10.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lb_IC10.Location = new System.Drawing.Point(-1, 293);
            this.lb_IC10.Name = "lb_IC10";
            this.lb_IC10.Size = new System.Drawing.Size(150, 33);
            this.lb_IC10.TabIndex = 2;
            this.lb_IC10.Tag = "8";
            this.lb_IC10.Text = "Module 10";
            this.lb_IC10.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lb_IC10.Click += new System.EventHandler(this.lbIC_Click);
            // 
            // chart1
            // 
            chartArea1.Name = "ChartArea1";
            this.chart1.ChartAreas.Add(chartArea1);
            legend1.Name = "Legend1";
            this.chart1.Legends.Add(legend1);
            this.chart1.Location = new System.Drawing.Point(98, 305);
            this.chart1.Name = "chart1";
            series1.ChartArea = "ChartArea1";
            series1.Legend = "Legend1";
            series1.Name = "Series1";
            this.chart1.Series.Add(series1);
            this.chart1.Size = new System.Drawing.Size(300, 300);
            this.chart1.TabIndex = 1;
            this.chart1.Text = "chart1";
            // 
            // lb_IC9
            // 
            this.lb_IC9.BackColor = System.Drawing.Color.LightBlue;
            this.lb_IC9.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lb_IC9.Location = new System.Drawing.Point(-1, 260);
            this.lb_IC9.Name = "lb_IC9";
            this.lb_IC9.Size = new System.Drawing.Size(150, 33);
            this.lb_IC9.TabIndex = 0;
            this.lb_IC9.Tag = "8";
            this.lb_IC9.Text = "Module 9";
            this.lb_IC9.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lb_IC9.Click += new System.EventHandler(this.lbIC_Click);
            // 
            // lb_IC8
            // 
            this.lb_IC8.BackColor = System.Drawing.Color.LightBlue;
            this.lb_IC8.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lb_IC8.Location = new System.Drawing.Point(-1, 227);
            this.lb_IC8.Name = "lb_IC8";
            this.lb_IC8.Size = new System.Drawing.Size(150, 33);
            this.lb_IC8.TabIndex = 0;
            this.lb_IC8.Tag = "7";
            this.lb_IC8.Text = "Module 8";
            this.lb_IC8.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lb_IC8.Click += new System.EventHandler(this.lbIC_Click);
            // 
            // lb_IC7
            // 
            this.lb_IC7.BackColor = System.Drawing.Color.LightBlue;
            this.lb_IC7.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lb_IC7.Location = new System.Drawing.Point(-1, 195);
            this.lb_IC7.Name = "lb_IC7";
            this.lb_IC7.Size = new System.Drawing.Size(150, 33);
            this.lb_IC7.TabIndex = 0;
            this.lb_IC7.Tag = "6";
            this.lb_IC7.Text = "Module 7";
            this.lb_IC7.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lb_IC7.Click += new System.EventHandler(this.lbIC_Click);
            // 
            // lb_IC6
            // 
            this.lb_IC6.BackColor = System.Drawing.Color.LightBlue;
            this.lb_IC6.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lb_IC6.Location = new System.Drawing.Point(-1, 164);
            this.lb_IC6.Name = "lb_IC6";
            this.lb_IC6.Size = new System.Drawing.Size(150, 33);
            this.lb_IC6.TabIndex = 0;
            this.lb_IC6.Tag = "5";
            this.lb_IC6.Text = "Module 6";
            this.lb_IC6.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lb_IC6.Click += new System.EventHandler(this.lbIC_Click);
            // 
            // lb_IC5
            // 
            this.lb_IC5.BackColor = System.Drawing.Color.LightBlue;
            this.lb_IC5.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lb_IC5.Location = new System.Drawing.Point(-1, 132);
            this.lb_IC5.Name = "lb_IC5";
            this.lb_IC5.Size = new System.Drawing.Size(150, 33);
            this.lb_IC5.TabIndex = 0;
            this.lb_IC5.Tag = "4";
            this.lb_IC5.Text = "Module 5";
            this.lb_IC5.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lb_IC5.Click += new System.EventHandler(this.lbIC_Click);
            // 
            // lb_IC4
            // 
            this.lb_IC4.BackColor = System.Drawing.Color.LightBlue;
            this.lb_IC4.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lb_IC4.Location = new System.Drawing.Point(-1, 99);
            this.lb_IC4.Name = "lb_IC4";
            this.lb_IC4.Size = new System.Drawing.Size(150, 33);
            this.lb_IC4.TabIndex = 0;
            this.lb_IC4.Tag = "3";
            this.lb_IC4.Text = "Module 4";
            this.lb_IC4.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lb_IC4.Click += new System.EventHandler(this.lbIC_Click);
            // 
            // lb_IC3
            // 
            this.lb_IC3.BackColor = System.Drawing.Color.LightBlue;
            this.lb_IC3.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lb_IC3.Location = new System.Drawing.Point(-1, 66);
            this.lb_IC3.Name = "lb_IC3";
            this.lb_IC3.Size = new System.Drawing.Size(150, 33);
            this.lb_IC3.TabIndex = 0;
            this.lb_IC3.Tag = "2";
            this.lb_IC3.Text = "Module 3";
            this.lb_IC3.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lb_IC3.Click += new System.EventHandler(this.lbIC_Click);
            // 
            // lb_IC2
            // 
            this.lb_IC2.BackColor = System.Drawing.Color.LightBlue;
            this.lb_IC2.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lb_IC2.Location = new System.Drawing.Point(-1, 32);
            this.lb_IC2.Name = "lb_IC2";
            this.lb_IC2.Size = new System.Drawing.Size(150, 33);
            this.lb_IC2.TabIndex = 0;
            this.lb_IC2.Tag = "1";
            this.lb_IC2.Text = "Module 2";
            this.lb_IC2.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lb_IC2.Click += new System.EventHandler(this.lbIC_Click);
            // 
            // lb_IC1
            // 
            this.lb_IC1.BackColor = System.Drawing.Color.DodgerBlue;
            this.lb_IC1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lb_IC1.Location = new System.Drawing.Point(-1, -1);
            this.lb_IC1.Name = "lb_IC1";
            this.lb_IC1.Size = new System.Drawing.Size(150, 33);
            this.lb_IC1.TabIndex = 0;
            this.lb_IC1.Tag = "0";
            this.lb_IC1.Text = "Module 1";
            this.lb_IC1.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lb_IC1.Click += new System.EventHandler(this.lbIC_Click);
            // 
            // panel2
            // 
            this.panel2.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.panel2.Controls.Add(this.btVoltageView);
            this.panel2.Controls.Add(this.lbCell6Value);
            this.panel2.Controls.Add(this.lbCell10Value);
            this.panel2.Controls.Add(this.lbCell5Value);
            this.panel2.Controls.Add(this.lbCell9Value);
            this.panel2.Controls.Add(this.lbCell4Value);
            this.panel2.Controls.Add(this.lbCell8Value);
            this.panel2.Controls.Add(this.lbCell3Value);
            this.panel2.Controls.Add(this.lbCell7Value);
            this.panel2.Controls.Add(this.lbCell2Value);
            this.panel2.Controls.Add(this.lbCell1Value);
            this.panel2.Controls.Add(this.lbCell1);
            this.panel2.Controls.Add(this.lbCell2);
            this.panel2.Controls.Add(this.lbCell7);
            this.panel2.Controls.Add(this.lbCell3);
            this.panel2.Controls.Add(this.lbCell8);
            this.panel2.Controls.Add(this.lbCell4);
            this.panel2.Controls.Add(this.lbCell9);
            this.panel2.Controls.Add(this.lbCell5);
            this.panel2.Controls.Add(this.lbCell10);
            this.panel2.Controls.Add(this.lbCell6);
            this.panel2.Location = new System.Drawing.Point(185, 25);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(400, 328);
            this.panel2.TabIndex = 1;
            // 
            // btVoltageView
            // 
            this.btVoltageView.Location = new System.Drawing.Point(291, 288);
            this.btVoltageView.Name = "btVoltageView";
            this.btVoltageView.Size = new System.Drawing.Size(104, 23);
            this.btVoltageView.TabIndex = 1;
            this.btVoltageView.Text = "View";
            this.btVoltageView.UseVisualStyleBackColor = true;
            this.btVoltageView.Click += new System.EventHandler(this.btVoltageView_Click);
            // 
            // lbCell6Value
            // 
            this.lbCell6Value.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCell6Value.Location = new System.Drawing.Point(286, 88);
            this.lbCell6Value.Name = "lbCell6Value";
            this.lbCell6Value.Size = new System.Drawing.Size(74, 17);
            this.lbCell6Value.TabIndex = 0;
            this.lbCell6Value.Text = "3.600 V";
            this.lbCell6Value.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCell10Value
            // 
            this.lbCell10Value.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCell10Value.Location = new System.Drawing.Point(287, 187);
            this.lbCell10Value.Name = "lbCell10Value";
            this.lbCell10Value.Size = new System.Drawing.Size(74, 17);
            this.lbCell10Value.TabIndex = 0;
            this.lbCell10Value.Text = "3.600 V";
            this.lbCell10Value.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCell5Value
            // 
            this.lbCell5Value.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCell5Value.Location = new System.Drawing.Point(96, 186);
            this.lbCell5Value.Name = "lbCell5Value";
            this.lbCell5Value.Size = new System.Drawing.Size(74, 17);
            this.lbCell5Value.TabIndex = 0;
            this.lbCell5Value.Text = "3.600 V";
            this.lbCell5Value.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCell9Value
            // 
            this.lbCell9Value.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCell9Value.Location = new System.Drawing.Point(287, 162);
            this.lbCell9Value.Name = "lbCell9Value";
            this.lbCell9Value.Size = new System.Drawing.Size(74, 17);
            this.lbCell9Value.TabIndex = 0;
            this.lbCell9Value.Text = "3.600 V";
            this.lbCell9Value.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCell4Value
            // 
            this.lbCell4Value.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCell4Value.Location = new System.Drawing.Point(96, 160);
            this.lbCell4Value.Name = "lbCell4Value";
            this.lbCell4Value.Size = new System.Drawing.Size(74, 17);
            this.lbCell4Value.TabIndex = 0;
            this.lbCell4Value.Text = "3.600 V";
            this.lbCell4Value.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCell8Value
            // 
            this.lbCell8Value.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCell8Value.Location = new System.Drawing.Point(287, 137);
            this.lbCell8Value.Name = "lbCell8Value";
            this.lbCell8Value.Size = new System.Drawing.Size(74, 17);
            this.lbCell8Value.TabIndex = 0;
            this.lbCell8Value.Text = "3.600 V";
            this.lbCell8Value.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCell3Value
            // 
            this.lbCell3Value.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCell3Value.Location = new System.Drawing.Point(96, 136);
            this.lbCell3Value.Name = "lbCell3Value";
            this.lbCell3Value.Size = new System.Drawing.Size(74, 17);
            this.lbCell3Value.TabIndex = 0;
            this.lbCell3Value.Text = "3.600 V";
            this.lbCell3Value.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCell7Value
            // 
            this.lbCell7Value.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCell7Value.Location = new System.Drawing.Point(287, 112);
            this.lbCell7Value.Name = "lbCell7Value";
            this.lbCell7Value.Size = new System.Drawing.Size(74, 17);
            this.lbCell7Value.TabIndex = 0;
            this.lbCell7Value.Text = "3.600 V";
            this.lbCell7Value.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCell2Value
            // 
            this.lbCell2Value.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCell2Value.Location = new System.Drawing.Point(96, 111);
            this.lbCell2Value.Name = "lbCell2Value";
            this.lbCell2Value.Size = new System.Drawing.Size(74, 17);
            this.lbCell2Value.TabIndex = 0;
            this.lbCell2Value.Text = "3.600 V";
            this.lbCell2Value.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCell1Value
            // 
            this.lbCell1Value.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCell1Value.Location = new System.Drawing.Point(96, 86);
            this.lbCell1Value.Name = "lbCell1Value";
            this.lbCell1Value.Size = new System.Drawing.Size(74, 17);
            this.lbCell1Value.TabIndex = 0;
            this.lbCell1Value.Text = "3.600 V";
            this.lbCell1Value.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCell1
            // 
            this.lbCell1.Font = new System.Drawing.Font("함초롬바탕", 13F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCell1.Location = new System.Drawing.Point(21, 85);
            this.lbCell1.Name = "lbCell1";
            this.lbCell1.Size = new System.Drawing.Size(69, 25);
            this.lbCell1.TabIndex = 0;
            this.lbCell1.Text = "Cell 1";
            // 
            // lbCell2
            // 
            this.lbCell2.Font = new System.Drawing.Font("함초롬바탕", 13F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCell2.Location = new System.Drawing.Point(21, 110);
            this.lbCell2.Name = "lbCell2";
            this.lbCell2.Size = new System.Drawing.Size(69, 25);
            this.lbCell2.TabIndex = 0;
            this.lbCell2.Text = "Cell 2";
            // 
            // lbCell7
            // 
            this.lbCell7.Font = new System.Drawing.Font("함초롬바탕", 13F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCell7.Location = new System.Drawing.Point(212, 111);
            this.lbCell7.Name = "lbCell7";
            this.lbCell7.Size = new System.Drawing.Size(77, 25);
            this.lbCell7.TabIndex = 0;
            this.lbCell7.Text = "Cell 7";
            // 
            // lbCell3
            // 
            this.lbCell3.Font = new System.Drawing.Font("함초롬바탕", 13F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCell3.Location = new System.Drawing.Point(21, 135);
            this.lbCell3.Name = "lbCell3";
            this.lbCell3.Size = new System.Drawing.Size(69, 25);
            this.lbCell3.TabIndex = 0;
            this.lbCell3.Text = "Cell 3";
            // 
            // lbCell8
            // 
            this.lbCell8.Font = new System.Drawing.Font("함초롬바탕", 13F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCell8.Location = new System.Drawing.Point(212, 136);
            this.lbCell8.Name = "lbCell8";
            this.lbCell8.Size = new System.Drawing.Size(77, 25);
            this.lbCell8.TabIndex = 0;
            this.lbCell8.Text = "Cell 8";
            // 
            // lbCell4
            // 
            this.lbCell4.Font = new System.Drawing.Font("함초롬바탕", 13F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCell4.Location = new System.Drawing.Point(21, 160);
            this.lbCell4.Name = "lbCell4";
            this.lbCell4.Size = new System.Drawing.Size(69, 25);
            this.lbCell4.TabIndex = 0;
            this.lbCell4.Text = "Cell 4";
            // 
            // lbCell9
            // 
            this.lbCell9.Font = new System.Drawing.Font("함초롬바탕", 13F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCell9.Location = new System.Drawing.Point(212, 161);
            this.lbCell9.Name = "lbCell9";
            this.lbCell9.Size = new System.Drawing.Size(77, 25);
            this.lbCell9.TabIndex = 0;
            this.lbCell9.Text = "Cell 9";
            // 
            // lbCell5
            // 
            this.lbCell5.Font = new System.Drawing.Font("함초롬바탕", 13F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCell5.Location = new System.Drawing.Point(21, 185);
            this.lbCell5.Name = "lbCell5";
            this.lbCell5.Size = new System.Drawing.Size(69, 25);
            this.lbCell5.TabIndex = 0;
            this.lbCell5.Text = "Cell 5";
            // 
            // lbCell10
            // 
            this.lbCell10.Font = new System.Drawing.Font("함초롬바탕", 13F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCell10.Location = new System.Drawing.Point(212, 186);
            this.lbCell10.Name = "lbCell10";
            this.lbCell10.Size = new System.Drawing.Size(77, 25);
            this.lbCell10.TabIndex = 0;
            this.lbCell10.Text = "Cell 10";
            // 
            // lbCell6
            // 
            this.lbCell6.Font = new System.Drawing.Font("함초롬바탕", 13F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCell6.Location = new System.Drawing.Point(211, 87);
            this.lbCell6.Name = "lbCell6";
            this.lbCell6.Size = new System.Drawing.Size(69, 25);
            this.lbCell6.TabIndex = 0;
            this.lbCell6.Text = "Cell 6";
            // 
            // gbCommand
            // 
            this.gbCommand.BackColor = System.Drawing.Color.GhostWhite;
            this.gbCommand.Controls.Add(this.pbRelay);
            this.gbCommand.Controls.Add(this.btRelayOFF);
            this.gbCommand.Controls.Add(this.btRelayOn);
            this.gbCommand.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.gbCommand.Location = new System.Drawing.Point(900, 26);
            this.gbCommand.Name = "gbCommand";
            this.gbCommand.Size = new System.Drawing.Size(202, 373);
            this.gbCommand.TabIndex = 1;
            this.gbCommand.TabStop = false;
            this.gbCommand.Text = "Command";
            // 
            // pbRelay
            // 
            this.pbRelay.Image = global::KCL_reBMS_Prj.Properties.Resources.Bopen;
            this.pbRelay.InitialImage = global::KCL_reBMS_Prj.Properties.Resources.Bopen;
            this.pbRelay.Location = new System.Drawing.Point(50, 90);
            this.pbRelay.Name = "pbRelay";
            this.pbRelay.Size = new System.Drawing.Size(100, 50);
            this.pbRelay.TabIndex = 5;
            this.pbRelay.TabStop = false;
            // 
            // btRelayOFF
            // 
            this.btRelayOFF.Location = new System.Drawing.Point(41, 222);
            this.btRelayOFF.Name = "btRelayOFF";
            this.btRelayOFF.Size = new System.Drawing.Size(118, 32);
            this.btRelayOFF.TabIndex = 0;
            this.btRelayOFF.Text = "릴레이 OFF";
            this.btRelayOFF.UseVisualStyleBackColor = true;
            this.btRelayOFF.Click += new System.EventHandler(this.btRelayOFF_Click);
            // 
            // btRelayOn
            // 
            this.btRelayOn.Location = new System.Drawing.Point(41, 175);
            this.btRelayOn.Name = "btRelayOn";
            this.btRelayOn.Size = new System.Drawing.Size(118, 32);
            this.btRelayOn.TabIndex = 0;
            this.btRelayOn.Text = "릴레이 ON";
            this.btRelayOn.UseVisualStyleBackColor = true;
            this.btRelayOn.Click += new System.EventHandler(this.btRelayOn_Click);
            // 
            // gbTemperature
            // 
            this.gbTemperature.BackColor = System.Drawing.Color.GhostWhite;
            this.gbTemperature.Controls.Add(this.lbTemp4);
            this.gbTemperature.Controls.Add(this.lbTemp4Value);
            this.gbTemperature.Controls.Add(this.lbTemp3);
            this.gbTemperature.Controls.Add(this.lbTemp3Value);
            this.gbTemperature.Controls.Add(this.lbTemp2);
            this.gbTemperature.Controls.Add(this.lbTemp2Value);
            this.gbTemperature.Controls.Add(this.lbTemp1);
            this.gbTemperature.Controls.Add(this.lbTemp1Value);
            this.gbTemperature.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.gbTemperature.Location = new System.Drawing.Point(654, 24);
            this.gbTemperature.Name = "gbTemperature";
            this.gbTemperature.Size = new System.Drawing.Size(240, 375);
            this.gbTemperature.TabIndex = 1;
            this.gbTemperature.TabStop = false;
            this.gbTemperature.Text = "Temperature(℃)";
            // 
            // lbTemp4
            // 
            this.lbTemp4.Font = new System.Drawing.Font("굴림", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbTemp4.Location = new System.Drawing.Point(38, 227);
            this.lbTemp4.Name = "lbTemp4";
            this.lbTemp4.Size = new System.Drawing.Size(40, 25);
            this.lbTemp4.TabIndex = 1;
            this.lbTemp4.Text = "T4";
            this.lbTemp4.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lbTemp4Value
            // 
            this.lbTemp4Value.Font = new System.Drawing.Font("굴림", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbTemp4Value.Location = new System.Drawing.Point(126, 227);
            this.lbTemp4Value.Name = "lbTemp4Value";
            this.lbTemp4Value.Size = new System.Drawing.Size(70, 25);
            this.lbTemp4Value.TabIndex = 2;
            this.lbTemp4Value.Text = "15 ℃";
            // 
            // lbTemp3
            // 
            this.lbTemp3.Font = new System.Drawing.Font("굴림", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbTemp3.Location = new System.Drawing.Point(38, 194);
            this.lbTemp3.Name = "lbTemp3";
            this.lbTemp3.Size = new System.Drawing.Size(40, 25);
            this.lbTemp3.TabIndex = 3;
            this.lbTemp3.Text = "T3";
            this.lbTemp3.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lbTemp3Value
            // 
            this.lbTemp3Value.Font = new System.Drawing.Font("굴림", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbTemp3Value.Location = new System.Drawing.Point(126, 194);
            this.lbTemp3Value.Name = "lbTemp3Value";
            this.lbTemp3Value.Size = new System.Drawing.Size(70, 25);
            this.lbTemp3Value.TabIndex = 4;
            this.lbTemp3Value.Text = "15 ℃";
            // 
            // lbTemp2
            // 
            this.lbTemp2.Font = new System.Drawing.Font("굴림", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbTemp2.Location = new System.Drawing.Point(38, 161);
            this.lbTemp2.Name = "lbTemp2";
            this.lbTemp2.Size = new System.Drawing.Size(40, 25);
            this.lbTemp2.TabIndex = 5;
            this.lbTemp2.Text = "T2";
            this.lbTemp2.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lbTemp2Value
            // 
            this.lbTemp2Value.Font = new System.Drawing.Font("굴림", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbTemp2Value.Location = new System.Drawing.Point(126, 161);
            this.lbTemp2Value.Name = "lbTemp2Value";
            this.lbTemp2Value.Size = new System.Drawing.Size(70, 25);
            this.lbTemp2Value.TabIndex = 6;
            this.lbTemp2Value.Text = "15 ℃";
            // 
            // lbTemp1
            // 
            this.lbTemp1.Font = new System.Drawing.Font("굴림", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbTemp1.Location = new System.Drawing.Point(38, 127);
            this.lbTemp1.Name = "lbTemp1";
            this.lbTemp1.Size = new System.Drawing.Size(40, 25);
            this.lbTemp1.TabIndex = 7;
            this.lbTemp1.Text = "T1";
            this.lbTemp1.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lbTemp1Value
            // 
            this.lbTemp1Value.Font = new System.Drawing.Font("굴림", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbTemp1Value.Location = new System.Drawing.Point(126, 127);
            this.lbTemp1Value.Name = "lbTemp1Value";
            this.lbTemp1Value.Size = new System.Drawing.Size(70, 25);
            this.lbTemp1Value.TabIndex = 8;
            this.lbTemp1Value.Text = "15 ℃";
            // 
            // gbSystemStatus
            // 
            this.gbSystemStatus.BackColor = System.Drawing.Color.GhostWhite;
            this.gbSystemStatus.Controls.Add(this.ICStatus);
            this.gbSystemStatus.Controls.Add(this.lbIC);
            this.gbSystemStatus.Controls.Add(this.lbTCell);
            this.gbSystemStatus.Controls.Add(this.lbStatus);
            this.gbSystemStatus.Controls.Add(this.lbCCVStateStatus);
            this.gbSystemStatus.Controls.Add(this.lbCCVState);
            this.gbSystemStatus.Controls.Add(this.lbOCVStateStatus);
            this.gbSystemStatus.Controls.Add(this.lbOCVState);
            this.gbSystemStatus.Controls.Add(this.lbWarnningStatus);
            this.gbSystemStatus.Controls.Add(this.lbWarnning);
            this.gbSystemStatus.Controls.Add(this.lbProtectStatus);
            this.gbSystemStatus.Controls.Add(this.lbProtect);
            this.gbSystemStatus.Controls.Add(this.lbSerialStatus);
            this.gbSystemStatus.Controls.Add(this.lbSerial);
            this.gbSystemStatus.Controls.Add(this.lbInterLockStatus);
            this.gbSystemStatus.Controls.Add(this.lbCurSensorStatus);
            this.gbSystemStatus.Controls.Add(this.lbTCellStatus);
            this.gbSystemStatus.Controls.Add(this.lbVCellStatus);
            this.gbSystemStatus.Controls.Add(this.lbLineStatus);
            this.gbSystemStatus.Controls.Add(this.lbInterLock);
            this.gbSystemStatus.Controls.Add(this.lbCurSensor);
            this.gbSystemStatus.Controls.Add(this.lbVCell);
            this.gbSystemStatus.Controls.Add(this.lbRelayStatus);
            this.gbSystemStatus.Controls.Add(this.lbStandbyStatus);
            this.gbSystemStatus.Controls.Add(this.lbRelay);
            this.gbSystemStatus.Controls.Add(this.lbStandby);
            this.gbSystemStatus.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.gbSystemStatus.Location = new System.Drawing.Point(654, 422);
            this.gbSystemStatus.Name = "gbSystemStatus";
            this.gbSystemStatus.Size = new System.Drawing.Size(448, 320);
            this.gbSystemStatus.TabIndex = 1;
            this.gbSystemStatus.TabStop = false;
            this.gbSystemStatus.Text = "System Status";
            // 
            // lbTCell
            // 
            this.lbTCell.Font = new System.Drawing.Font("함초롬바탕", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbTCell.Location = new System.Drawing.Point(243, 179);
            this.lbTCell.Name = "lbTCell";
            this.lbTCell.Size = new System.Drawing.Size(147, 25);
            this.lbTCell.TabIndex = 10;
            this.lbTCell.Text = "셀 온도센서 선 감지";
            this.lbTCell.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbStatus
            // 
            this.lbStatus.Font = new System.Drawing.Font("함초롬바탕", 14F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbStatus.Location = new System.Drawing.Point(89, 52);
            this.lbStatus.Name = "lbStatus";
            this.lbStatus.Size = new System.Drawing.Size(58, 25);
            this.lbStatus.TabIndex = 26;
            this.lbStatus.Text = "상태";
            this.lbStatus.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lbCCVStateStatus
            // 
            this.lbCCVStateStatus.BackColor = System.Drawing.Color.Red;
            this.lbCCVStateStatus.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lbCCVStateStatus.Location = new System.Drawing.Point(163, 238);
            this.lbCCVStateStatus.Name = "lbCCVStateStatus";
            this.lbCCVStateStatus.Size = new System.Drawing.Size(21, 22);
            this.lbCCVStateStatus.TabIndex = 25;
            // 
            // lbCCVState
            // 
            this.lbCCVState.Font = new System.Drawing.Font("함초롬바탕", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCCVState.Location = new System.Drawing.Point(29, 235);
            this.lbCCVState.Name = "lbCCVState";
            this.lbCCVState.Size = new System.Drawing.Size(118, 25);
            this.lbCCVState.TabIndex = 24;
            this.lbCCVState.Text = "CCV State";
            this.lbCCVState.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lbOCVStateStatus
            // 
            this.lbOCVStateStatus.BackColor = System.Drawing.Color.Red;
            this.lbOCVStateStatus.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lbOCVStateStatus.Location = new System.Drawing.Point(163, 207);
            this.lbOCVStateStatus.Name = "lbOCVStateStatus";
            this.lbOCVStateStatus.Size = new System.Drawing.Size(21, 22);
            this.lbOCVStateStatus.TabIndex = 23;
            // 
            // lbOCVState
            // 
            this.lbOCVState.Font = new System.Drawing.Font("함초롬바탕", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbOCVState.Location = new System.Drawing.Point(29, 204);
            this.lbOCVState.Name = "lbOCVState";
            this.lbOCVState.Size = new System.Drawing.Size(118, 25);
            this.lbOCVState.TabIndex = 22;
            this.lbOCVState.Text = "OCV State";
            this.lbOCVState.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lbWarnningStatus
            // 
            this.lbWarnningStatus.BackColor = System.Drawing.Color.Red;
            this.lbWarnningStatus.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lbWarnningStatus.Location = new System.Drawing.Point(163, 178);
            this.lbWarnningStatus.Name = "lbWarnningStatus";
            this.lbWarnningStatus.Size = new System.Drawing.Size(21, 22);
            this.lbWarnningStatus.TabIndex = 21;
            // 
            // lbWarnning
            // 
            this.lbWarnning.Font = new System.Drawing.Font("함초롬바탕", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbWarnning.Location = new System.Drawing.Point(29, 175);
            this.lbWarnning.Name = "lbWarnning";
            this.lbWarnning.Size = new System.Drawing.Size(118, 25);
            this.lbWarnning.TabIndex = 20;
            this.lbWarnning.Text = "Warnning";
            this.lbWarnning.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lbProtectStatus
            // 
            this.lbProtectStatus.BackColor = System.Drawing.Color.Red;
            this.lbProtectStatus.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lbProtectStatus.Location = new System.Drawing.Point(163, 149);
            this.lbProtectStatus.Name = "lbProtectStatus";
            this.lbProtectStatus.Size = new System.Drawing.Size(21, 22);
            this.lbProtectStatus.TabIndex = 19;
            // 
            // lbProtect
            // 
            this.lbProtect.Font = new System.Drawing.Font("함초롬바탕", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbProtect.Location = new System.Drawing.Point(29, 146);
            this.lbProtect.Name = "lbProtect";
            this.lbProtect.Size = new System.Drawing.Size(118, 25);
            this.lbProtect.TabIndex = 18;
            this.lbProtect.Text = "Protect";
            this.lbProtect.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lbSerialStatus
            // 
            this.lbSerialStatus.BackColor = System.Drawing.Color.Red;
            this.lbSerialStatus.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lbSerialStatus.Location = new System.Drawing.Point(407, 210);
            this.lbSerialStatus.Name = "lbSerialStatus";
            this.lbSerialStatus.Size = new System.Drawing.Size(18, 18);
            this.lbSerialStatus.TabIndex = 17;
            // 
            // lbSerial
            // 
            this.lbSerial.Font = new System.Drawing.Font("함초롬바탕", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbSerial.Location = new System.Drawing.Point(243, 207);
            this.lbSerial.Name = "lbSerial";
            this.lbSerial.Size = new System.Drawing.Size(162, 25);
            this.lbSerial.TabIndex = 16;
            this.lbSerial.Text = "USBSerial/UARTSerial";
            this.lbSerial.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbInterLockStatus
            // 
            this.lbInterLockStatus.BackColor = System.Drawing.Color.Red;
            this.lbInterLockStatus.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lbInterLockStatus.Location = new System.Drawing.Point(407, 91);
            this.lbInterLockStatus.Name = "lbInterLockStatus";
            this.lbInterLockStatus.Size = new System.Drawing.Size(18, 18);
            this.lbInterLockStatus.TabIndex = 12;
            // 
            // lbCurSensorStatus
            // 
            this.lbCurSensorStatus.BackColor = System.Drawing.Color.Red;
            this.lbCurSensorStatus.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lbCurSensorStatus.Location = new System.Drawing.Point(407, 121);
            this.lbCurSensorStatus.Name = "lbCurSensorStatus";
            this.lbCurSensorStatus.Size = new System.Drawing.Size(18, 18);
            this.lbCurSensorStatus.TabIndex = 13;
            // 
            // lbTCellStatus
            // 
            this.lbTCellStatus.BackColor = System.Drawing.Color.Red;
            this.lbTCellStatus.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lbTCellStatus.Location = new System.Drawing.Point(407, 182);
            this.lbTCellStatus.Name = "lbTCellStatus";
            this.lbTCellStatus.Size = new System.Drawing.Size(18, 18);
            this.lbTCellStatus.TabIndex = 14;
            // 
            // lbVCellStatus
            // 
            this.lbVCellStatus.BackColor = System.Drawing.Color.Red;
            this.lbVCellStatus.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lbVCellStatus.Location = new System.Drawing.Point(407, 152);
            this.lbVCellStatus.Name = "lbVCellStatus";
            this.lbVCellStatus.Size = new System.Drawing.Size(18, 18);
            this.lbVCellStatus.TabIndex = 15;
            // 
            // lbLineStatus
            // 
            this.lbLineStatus.Font = new System.Drawing.Font("함초롬바탕", 14F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbLineStatus.Location = new System.Drawing.Point(242, 51);
            this.lbLineStatus.Name = "lbLineStatus";
            this.lbLineStatus.Size = new System.Drawing.Size(113, 25);
            this.lbLineStatus.TabIndex = 7;
            this.lbLineStatus.Text = "감지선 검출";
            this.lbLineStatus.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lbInterLock
            // 
            this.lbInterLock.Font = new System.Drawing.Font("함초롬바탕", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbInterLock.Location = new System.Drawing.Point(243, 87);
            this.lbInterLock.Name = "lbInterLock";
            this.lbInterLock.Size = new System.Drawing.Size(162, 25);
            this.lbInterLock.TabIndex = 8;
            this.lbInterLock.Text = "InterLock/Contactor";
            this.lbInterLock.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCurSensor
            // 
            this.lbCurSensor.Font = new System.Drawing.Font("함초롬바탕", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCurSensor.Location = new System.Drawing.Point(243, 118);
            this.lbCurSensor.Name = "lbCurSensor";
            this.lbCurSensor.Size = new System.Drawing.Size(147, 25);
            this.lbCurSensor.TabIndex = 9;
            this.lbCurSensor.Text = "전류 선 감지";
            this.lbCurSensor.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbVCell
            // 
            this.lbVCell.Font = new System.Drawing.Font("함초롬바탕", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbVCell.Location = new System.Drawing.Point(243, 149);
            this.lbVCell.Name = "lbVCell";
            this.lbVCell.Size = new System.Drawing.Size(147, 25);
            this.lbVCell.TabIndex = 11;
            this.lbVCell.Text = "셀 전압 선 감지";
            this.lbVCell.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbRelayStatus
            // 
            this.lbRelayStatus.BackColor = System.Drawing.Color.Red;
            this.lbRelayStatus.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lbRelayStatus.Location = new System.Drawing.Point(163, 121);
            this.lbRelayStatus.Name = "lbRelayStatus";
            this.lbRelayStatus.Size = new System.Drawing.Size(21, 22);
            this.lbRelayStatus.TabIndex = 1;
            // 
            // lbStandbyStatus
            // 
            this.lbStandbyStatus.BackColor = System.Drawing.Color.Red;
            this.lbStandbyStatus.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lbStandbyStatus.Location = new System.Drawing.Point(163, 91);
            this.lbStandbyStatus.Name = "lbStandbyStatus";
            this.lbStandbyStatus.Size = new System.Drawing.Size(21, 22);
            this.lbStandbyStatus.TabIndex = 1;
            // 
            // lbRelay
            // 
            this.lbRelay.Font = new System.Drawing.Font("함초롬바탕", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbRelay.Location = new System.Drawing.Point(29, 118);
            this.lbRelay.Name = "lbRelay";
            this.lbRelay.Size = new System.Drawing.Size(118, 25);
            this.lbRelay.TabIndex = 0;
            this.lbRelay.Text = "Relay";
            this.lbRelay.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lbStandby
            // 
            this.lbStandby.Font = new System.Drawing.Font("함초롬바탕", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbStandby.Location = new System.Drawing.Point(29, 88);
            this.lbStandby.Name = "lbStandby";
            this.lbStandby.Size = new System.Drawing.Size(118, 25);
            this.lbStandby.TabIndex = 0;
            this.lbStandby.Text = "Standby";
            this.lbStandby.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // gbSystemInfo
            // 
            this.gbSystemInfo.BackColor = System.Drawing.Color.GhostWhite;
            this.gbSystemInfo.Controls.Add(this.lbMaxCellVoltageValue);
            this.gbSystemInfo.Controls.Add(this.lbMinCellVoltageValue);
            this.gbSystemInfo.Controls.Add(this.lbCdcValue);
            this.gbSystemInfo.Controls.Add(this.lbCccValue);
            this.gbSystemInfo.Controls.Add(this.lbMinTemp);
            this.gbSystemInfo.Controls.Add(this.lbFrontSohValue);
            this.gbSystemInfo.Controls.Add(this.lbMaxTemp);
            this.gbSystemInfo.Controls.Add(this.lbCurrentValue);
            this.gbSystemInfo.Controls.Add(this.lbCdc);
            this.gbSystemInfo.Controls.Add(this.lbFrontSocValue);
            this.gbSystemInfo.Controls.Add(this.lbCcc);
            this.gbSystemInfo.Controls.Add(this.lbMinTempValue);
            this.gbSystemInfo.Controls.Add(this.lbCurrent);
            this.gbSystemInfo.Controls.Add(this.lbPackVoltageValue);
            this.gbSystemInfo.Controls.Add(this.lbMaxCellVoltage);
            this.gbSystemInfo.Controls.Add(this.lbMaxTempValue);
            this.gbSystemInfo.Controls.Add(this.lbMinCellVoltage);
            this.gbSystemInfo.Controls.Add(this.lbFrontSoh);
            this.gbSystemInfo.Controls.Add(this.lbFrontSoc);
            this.gbSystemInfo.Controls.Add(this.lbPackVoltage);
            this.gbSystemInfo.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.gbSystemInfo.Location = new System.Drawing.Point(28, 422);
            this.gbSystemInfo.Name = "gbSystemInfo";
            this.gbSystemInfo.Size = new System.Drawing.Size(614, 320);
            this.gbSystemInfo.TabIndex = 1;
            this.gbSystemInfo.TabStop = false;
            this.gbSystemInfo.Text = "System Info";
            // 
            // lbMaxCellVoltageValue
            // 
            this.lbMaxCellVoltageValue.Font = new System.Drawing.Font("함초롬바탕", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbMaxCellVoltageValue.Location = new System.Drawing.Point(205, 244);
            this.lbMaxCellVoltageValue.Name = "lbMaxCellVoltageValue";
            this.lbMaxCellVoltageValue.Size = new System.Drawing.Size(89, 25);
            this.lbMaxCellVoltageValue.TabIndex = 0;
            this.lbMaxCellVoltageValue.Text = "0.000 V";
            // 
            // lbMinCellVoltageValue
            // 
            this.lbMinCellVoltageValue.Font = new System.Drawing.Font("함초롬바탕", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbMinCellVoltageValue.Location = new System.Drawing.Point(205, 196);
            this.lbMinCellVoltageValue.Name = "lbMinCellVoltageValue";
            this.lbMinCellVoltageValue.Size = new System.Drawing.Size(89, 25);
            this.lbMinCellVoltageValue.TabIndex = 0;
            this.lbMinCellVoltageValue.Text = "0.000 V";
            // 
            // lbCdcValue
            // 
            this.lbCdcValue.Font = new System.Drawing.Font("함초롬바탕", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCdcValue.Location = new System.Drawing.Point(472, 244);
            this.lbCdcValue.Name = "lbCdcValue";
            this.lbCdcValue.Size = new System.Drawing.Size(89, 25);
            this.lbCdcValue.TabIndex = 0;
            this.lbCdcValue.Text = "0 Ah";
            // 
            // lbCccValue
            // 
            this.lbCccValue.Font = new System.Drawing.Font("함초롬바탕", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCccValue.Location = new System.Drawing.Point(472, 196);
            this.lbCccValue.Name = "lbCccValue";
            this.lbCccValue.Size = new System.Drawing.Size(89, 25);
            this.lbCccValue.TabIndex = 0;
            this.lbCccValue.Text = "0 Ah";
            // 
            // lbMinTemp
            // 
            this.lbMinTemp.Font = new System.Drawing.Font("함초롬바탕", 14.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbMinTemp.Location = new System.Drawing.Point(349, 99);
            this.lbMinTemp.Name = "lbMinTemp";
            this.lbMinTemp.Size = new System.Drawing.Size(111, 25);
            this.lbMinTemp.TabIndex = 0;
            this.lbMinTemp.Text = "최소 온도";
            this.lbMinTemp.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lbFrontSohValue
            // 
            this.lbFrontSohValue.Font = new System.Drawing.Font("함초롬바탕", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbFrontSohValue.Location = new System.Drawing.Point(205, 148);
            this.lbFrontSohValue.Name = "lbFrontSohValue";
            this.lbFrontSohValue.Size = new System.Drawing.Size(89, 25);
            this.lbFrontSohValue.TabIndex = 0;
            this.lbFrontSohValue.Text = "0 %";
            // 
            // lbMaxTemp
            // 
            this.lbMaxTemp.Font = new System.Drawing.Font("함초롬바탕", 14.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbMaxTemp.Location = new System.Drawing.Point(349, 51);
            this.lbMaxTemp.Name = "lbMaxTemp";
            this.lbMaxTemp.Size = new System.Drawing.Size(111, 25);
            this.lbMaxTemp.TabIndex = 0;
            this.lbMaxTemp.Text = "최대 온도";
            this.lbMaxTemp.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lbCurrentValue
            // 
            this.lbCurrentValue.Font = new System.Drawing.Font("함초롬바탕", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCurrentValue.Location = new System.Drawing.Point(472, 148);
            this.lbCurrentValue.Name = "lbCurrentValue";
            this.lbCurrentValue.Size = new System.Drawing.Size(89, 25);
            this.lbCurrentValue.TabIndex = 0;
            this.lbCurrentValue.Text = "0 A";
            // 
            // lbCdc
            // 
            this.lbCdc.Font = new System.Drawing.Font("함초롬바탕", 14.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCdc.Location = new System.Drawing.Point(349, 243);
            this.lbCdc.Name = "lbCdc";
            this.lbCdc.Size = new System.Drawing.Size(111, 25);
            this.lbCdc.TabIndex = 0;
            this.lbCdc.Text = "방전적산량";
            this.lbCdc.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lbFrontSocValue
            // 
            this.lbFrontSocValue.Font = new System.Drawing.Font("함초롬바탕", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbFrontSocValue.Location = new System.Drawing.Point(205, 100);
            this.lbFrontSocValue.Name = "lbFrontSocValue";
            this.lbFrontSocValue.Size = new System.Drawing.Size(89, 25);
            this.lbFrontSocValue.TabIndex = 0;
            this.lbFrontSocValue.Text = "0 %";
            // 
            // lbCcc
            // 
            this.lbCcc.Font = new System.Drawing.Font("함초롬바탕", 14.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCcc.Location = new System.Drawing.Point(349, 195);
            this.lbCcc.Name = "lbCcc";
            this.lbCcc.Size = new System.Drawing.Size(111, 25);
            this.lbCcc.TabIndex = 0;
            this.lbCcc.Text = "충전적산량";
            this.lbCcc.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lbMinTempValue
            // 
            this.lbMinTempValue.Font = new System.Drawing.Font("함초롬바탕", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbMinTempValue.Location = new System.Drawing.Point(472, 100);
            this.lbMinTempValue.Name = "lbMinTempValue";
            this.lbMinTempValue.Size = new System.Drawing.Size(89, 25);
            this.lbMinTempValue.TabIndex = 0;
            this.lbMinTempValue.Text = "0 ℃";
            // 
            // lbCurrent
            // 
            this.lbCurrent.Font = new System.Drawing.Font("함초롬바탕", 14.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCurrent.Location = new System.Drawing.Point(349, 147);
            this.lbCurrent.Name = "lbCurrent";
            this.lbCurrent.Size = new System.Drawing.Size(111, 25);
            this.lbCurrent.TabIndex = 0;
            this.lbCurrent.Text = "전류량";
            this.lbCurrent.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lbPackVoltageValue
            // 
            this.lbPackVoltageValue.Font = new System.Drawing.Font("함초롬바탕", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbPackVoltageValue.Location = new System.Drawing.Point(205, 52);
            this.lbPackVoltageValue.Name = "lbPackVoltageValue";
            this.lbPackVoltageValue.Size = new System.Drawing.Size(89, 25);
            this.lbPackVoltageValue.TabIndex = 0;
            this.lbPackVoltageValue.Text = "0 V";
            // 
            // lbMaxCellVoltage
            // 
            this.lbMaxCellVoltage.Font = new System.Drawing.Font("함초롬바탕", 14.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbMaxCellVoltage.Location = new System.Drawing.Point(48, 243);
            this.lbMaxCellVoltage.Name = "lbMaxCellVoltage";
            this.lbMaxCellVoltage.Size = new System.Drawing.Size(146, 25);
            this.lbMaxCellVoltage.TabIndex = 0;
            this.lbMaxCellVoltage.Text = "최대 셀전압";
            this.lbMaxCellVoltage.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lbMaxTempValue
            // 
            this.lbMaxTempValue.Font = new System.Drawing.Font("함초롬바탕", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbMaxTempValue.Location = new System.Drawing.Point(472, 52);
            this.lbMaxTempValue.Name = "lbMaxTempValue";
            this.lbMaxTempValue.Size = new System.Drawing.Size(89, 25);
            this.lbMaxTempValue.TabIndex = 0;
            this.lbMaxTempValue.Text = "0 ℃";
            // 
            // lbMinCellVoltage
            // 
            this.lbMinCellVoltage.Font = new System.Drawing.Font("함초롬바탕", 14.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbMinCellVoltage.Location = new System.Drawing.Point(48, 195);
            this.lbMinCellVoltage.Name = "lbMinCellVoltage";
            this.lbMinCellVoltage.Size = new System.Drawing.Size(146, 25);
            this.lbMinCellVoltage.TabIndex = 0;
            this.lbMinCellVoltage.Text = "최소셀전압";
            this.lbMinCellVoltage.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lbFrontSoh
            // 
            this.lbFrontSoh.Font = new System.Drawing.Font("함초롬바탕", 14.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbFrontSoh.Location = new System.Drawing.Point(48, 147);
            this.lbFrontSoh.Name = "lbFrontSoh";
            this.lbFrontSoh.Size = new System.Drawing.Size(146, 25);
            this.lbFrontSoh.TabIndex = 0;
            this.lbFrontSoh.Text = "SOH";
            this.lbFrontSoh.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lbFrontSoc
            // 
            this.lbFrontSoc.Font = new System.Drawing.Font("함초롬바탕", 14.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbFrontSoc.Location = new System.Drawing.Point(48, 99);
            this.lbFrontSoc.Name = "lbFrontSoc";
            this.lbFrontSoc.Size = new System.Drawing.Size(146, 25);
            this.lbFrontSoc.TabIndex = 0;
            this.lbFrontSoc.Text = "SOC";
            this.lbFrontSoc.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lbPackVoltage
            // 
            this.lbPackVoltage.Font = new System.Drawing.Font("함초롬바탕", 14.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbPackVoltage.Location = new System.Drawing.Point(48, 51);
            this.lbPackVoltage.Name = "lbPackVoltage";
            this.lbPackVoltage.Size = new System.Drawing.Size(146, 25);
            this.lbPackVoltage.TabIndex = 0;
            this.lbPackVoltage.Text = "Pack Voltage";
            this.lbPackVoltage.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // tcBMS
            // 
            this.tcBMS.Controls.Add(this.tabPage1);
            this.tcBMS.Controls.Add(this.tabPage3);
            this.tcBMS.Controls.Add(this.tabPage2);
            this.tcBMS.Controls.Add(this.tabPage4);
            this.tcBMS.Controls.Add(this.tabPage5);
            this.tcBMS.Location = new System.Drawing.Point(26, 111);
            this.tcBMS.Name = "tcBMS";
            this.tcBMS.SelectedIndex = 0;
            this.tcBMS.Size = new System.Drawing.Size(1790, 807);
            this.tcBMS.TabIndex = 3;
            // 
            // tabPage3
            // 
            this.tabPage3.BackColor = System.Drawing.Color.Transparent;
            this.tabPage3.Controls.Add(this.pnSaveFile);
            this.tabPage3.Controls.Add(this.panel1);
            this.tabPage3.Controls.Add(this.gbWarnningRelease);
            this.tabPage3.Controls.Add(this.gbWarnningSet);
            this.tabPage3.Location = new System.Drawing.Point(4, 22);
            this.tabPage3.Name = "tabPage3";
            this.tabPage3.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage3.Size = new System.Drawing.Size(1782, 781);
            this.tabPage3.TabIndex = 4;
            this.tabPage3.Text = "Warnning";
            // 
            // pnSaveFile
            // 
            this.pnSaveFile.BackColor = System.Drawing.Color.White;
            this.pnSaveFile.Controls.Add(this.btLoadFile);
            this.pnSaveFile.Controls.Add(this.btSaveFile);
            this.pnSaveFile.Location = new System.Drawing.Point(772, 511);
            this.pnSaveFile.Name = "pnSaveFile";
            this.pnSaveFile.Size = new System.Drawing.Size(234, 57);
            this.pnSaveFile.TabIndex = 8;
            // 
            // btLoadFile
            // 
            this.btLoadFile.Location = new System.Drawing.Point(121, 16);
            this.btLoadFile.Name = "btLoadFile";
            this.btLoadFile.Size = new System.Drawing.Size(99, 23);
            this.btLoadFile.TabIndex = 14;
            this.btLoadFile.Text = "PC -> GUI";
            this.btLoadFile.UseVisualStyleBackColor = true;
            this.btLoadFile.Click += new System.EventHandler(this.btLoadFile_Click);
            // 
            // btSaveFile
            // 
            this.btSaveFile.Location = new System.Drawing.Point(17, 16);
            this.btSaveFile.Name = "btSaveFile";
            this.btSaveFile.Size = new System.Drawing.Size(98, 23);
            this.btSaveFile.TabIndex = 15;
            this.btSaveFile.Text = "GUI -> PC";
            this.btSaveFile.UseVisualStyleBackColor = true;
            this.btSaveFile.Click += new System.EventHandler(this.btSaveFile_Click);
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.White;
            this.panel1.Controls.Add(this.btWarnningSettingLoad);
            this.panel1.Controls.Add(this.btWarnningSettingSave);
            this.panel1.Location = new System.Drawing.Point(1034, 511);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(234, 57);
            this.panel1.TabIndex = 7;
            // 
            // btWarnningSettingLoad
            // 
            this.btWarnningSettingLoad.Location = new System.Drawing.Point(121, 16);
            this.btWarnningSettingLoad.Name = "btWarnningSettingLoad";
            this.btWarnningSettingLoad.Size = new System.Drawing.Size(99, 23);
            this.btWarnningSettingLoad.TabIndex = 14;
            this.btWarnningSettingLoad.Text = "BMS -> GUI";
            this.btWarnningSettingLoad.UseVisualStyleBackColor = true;
            this.btWarnningSettingLoad.Click += new System.EventHandler(this.btWarnningSettingLoad_Click);
            // 
            // btWarnningSettingSave
            // 
            this.btWarnningSettingSave.Location = new System.Drawing.Point(17, 16);
            this.btWarnningSettingSave.Name = "btWarnningSettingSave";
            this.btWarnningSettingSave.Size = new System.Drawing.Size(98, 23);
            this.btWarnningSettingSave.TabIndex = 15;
            this.btWarnningSettingSave.Text = "GUI -> BMS";
            this.btWarnningSettingSave.UseVisualStyleBackColor = true;
            this.btWarnningSettingSave.Click += new System.EventHandler(this.btWarnningSettingSave_Click);
            // 
            // gbWarnningRelease
            // 
            this.gbWarnningRelease.BackColor = System.Drawing.Color.GhostWhite;
            this.gbWarnningRelease.Controls.Add(this.cbWarnningReleaseValue4);
            this.gbWarnningRelease.Controls.Add(this.cbWarnningReleaseValue3);
            this.gbWarnningRelease.Controls.Add(this.label187);
            this.gbWarnningRelease.Controls.Add(this.cbWarnningReleaseValue10);
            this.gbWarnningRelease.Controls.Add(this.cbWarnningReleaseValue9);
            this.gbWarnningRelease.Controls.Add(this.cbWarnningReleaseValue8);
            this.gbWarnningRelease.Controls.Add(this.cbWarnningReleaseValue7);
            this.gbWarnningRelease.Controls.Add(this.cbWarnningReleaseValue6);
            this.gbWarnningRelease.Controls.Add(this.cbWarnningReleaseValue5);
            this.gbWarnningRelease.Controls.Add(this.cbWarnningReleaseValue2);
            this.gbWarnningRelease.Controls.Add(this.cbWarnningReleaseValue1);
            this.gbWarnningRelease.Controls.Add(this.cbWarnningReleaseRetain4);
            this.gbWarnningRelease.Controls.Add(this.cbWarnningReleaseRetain3);
            this.gbWarnningRelease.Controls.Add(this.lbPOVWR);
            this.gbWarnningRelease.Controls.Add(this.lbPLVWR);
            this.gbWarnningRelease.Controls.Add(this.cbWarnningReleaseRetain10);
            this.gbWarnningRelease.Controls.Add(this.label185);
            this.gbWarnningRelease.Controls.Add(this.cbWarnningReleaseRetain9);
            this.gbWarnningRelease.Controls.Add(this.cbWarnningReleaseRetain8);
            this.gbWarnningRelease.Controls.Add(this.cbWarnningReleaseRetain7);
            this.gbWarnningRelease.Controls.Add(this.cbWarnningReleaseRetain6);
            this.gbWarnningRelease.Controls.Add(this.cbWarnningReleaseRetain5);
            this.gbWarnningRelease.Controls.Add(this.cbWarnningReleaseRetain2);
            this.gbWarnningRelease.Controls.Add(this.cbWarnningReleaseRetain1);
            this.gbWarnningRelease.Controls.Add(this.lbLSOCWR);
            this.gbWarnningRelease.Controls.Add(this.lbCDWR);
            this.gbWarnningRelease.Controls.Add(this.lbCOVWR);
            this.gbWarnningRelease.Controls.Add(this.lbCLVWR);
            this.gbWarnningRelease.Controls.Add(this.lbCOTWR);
            this.gbWarnningRelease.Controls.Add(this.lbCLTWR);
            this.gbWarnningRelease.Controls.Add(this.lbCOAWR);
            this.gbWarnningRelease.Controls.Add(this.lbDOAWR);
            this.gbWarnningRelease.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.gbWarnningRelease.Location = new System.Drawing.Point(636, 21);
            this.gbWarnningRelease.Name = "gbWarnningRelease";
            this.gbWarnningRelease.Size = new System.Drawing.Size(632, 473);
            this.gbWarnningRelease.TabIndex = 5;
            this.gbWarnningRelease.TabStop = false;
            this.gbWarnningRelease.Text = "Warnning Release Value";
            // 
            // cbWarnningReleaseValue4
            // 
            this.cbWarnningReleaseValue4.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbWarnningReleaseValue4.Location = new System.Drawing.Point(289, 167);
            this.cbWarnningReleaseValue4.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningReleaseValue4.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningReleaseValue4.Name = "cbWarnningReleaseValue4";
            this.cbWarnningReleaseValue4.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningReleaseValue4.TabIndex = 63;
            this.cbWarnningReleaseValue4.Value = new decimal(new int[] {
            30478,
            0,
            0,
            131072});
            // 
            // cbWarnningReleaseValue3
            // 
            this.cbWarnningReleaseValue3.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbWarnningReleaseValue3.Location = new System.Drawing.Point(289, 134);
            this.cbWarnningReleaseValue3.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningReleaseValue3.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningReleaseValue3.Name = "cbWarnningReleaseValue3";
            this.cbWarnningReleaseValue3.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningReleaseValue3.TabIndex = 64;
            this.cbWarnningReleaseValue3.Value = new decimal(new int[] {
            40572,
            0,
            0,
            131072});
            // 
            // label187
            // 
            this.label187.Location = new System.Drawing.Point(286, 39);
            this.label187.Name = "label187";
            this.label187.Size = new System.Drawing.Size(125, 22);
            this.label187.TabIndex = 62;
            this.label187.Text = "Value";
            // 
            // cbWarnningReleaseValue10
            // 
            this.cbWarnningReleaseValue10.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbWarnningReleaseValue10.Location = new System.Drawing.Point(289, 365);
            this.cbWarnningReleaseValue10.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningReleaseValue10.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningReleaseValue10.Name = "cbWarnningReleaseValue10";
            this.cbWarnningReleaseValue10.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningReleaseValue10.TabIndex = 60;
            this.cbWarnningReleaseValue10.Value = new decimal(new int[] {
            25,
            0,
            0,
            0});
            // 
            // cbWarnningReleaseValue9
            // 
            this.cbWarnningReleaseValue9.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbWarnningReleaseValue9.Location = new System.Drawing.Point(289, 335);
            this.cbWarnningReleaseValue9.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningReleaseValue9.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningReleaseValue9.Name = "cbWarnningReleaseValue9";
            this.cbWarnningReleaseValue9.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningReleaseValue9.TabIndex = 53;
            this.cbWarnningReleaseValue9.Value = new decimal(new int[] {
            140,
            0,
            0,
            -2147483648});
            // 
            // cbWarnningReleaseValue8
            // 
            this.cbWarnningReleaseValue8.Location = new System.Drawing.Point(289, 302);
            this.cbWarnningReleaseValue8.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningReleaseValue8.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningReleaseValue8.Name = "cbWarnningReleaseValue8";
            this.cbWarnningReleaseValue8.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningReleaseValue8.TabIndex = 54;
            this.cbWarnningReleaseValue8.Value = new decimal(new int[] {
            85,
            0,
            0,
            0});
            // 
            // cbWarnningReleaseValue7
            // 
            this.cbWarnningReleaseValue7.Location = new System.Drawing.Point(289, 270);
            this.cbWarnningReleaseValue7.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningReleaseValue7.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningReleaseValue7.Name = "cbWarnningReleaseValue7";
            this.cbWarnningReleaseValue7.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningReleaseValue7.TabIndex = 55;
            this.cbWarnningReleaseValue7.Value = new decimal(new int[] {
            17,
            0,
            0,
            -2147483648});
            // 
            // cbWarnningReleaseValue6
            // 
            this.cbWarnningReleaseValue6.Location = new System.Drawing.Point(289, 236);
            this.cbWarnningReleaseValue6.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningReleaseValue6.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningReleaseValue6.Name = "cbWarnningReleaseValue6";
            this.cbWarnningReleaseValue6.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningReleaseValue6.TabIndex = 56;
            this.cbWarnningReleaseValue6.Value = new decimal(new int[] {
            42,
            0,
            0,
            0});
            // 
            // cbWarnningReleaseValue5
            // 
            this.cbWarnningReleaseValue5.Location = new System.Drawing.Point(289, 201);
            this.cbWarnningReleaseValue5.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningReleaseValue5.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningReleaseValue5.Name = "cbWarnningReleaseValue5";
            this.cbWarnningReleaseValue5.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningReleaseValue5.TabIndex = 57;
            this.cbWarnningReleaseValue5.Value = new decimal(new int[] {
            350,
            0,
            0,
            0});
            // 
            // cbWarnningReleaseValue2
            // 
            this.cbWarnningReleaseValue2.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbWarnningReleaseValue2.Location = new System.Drawing.Point(289, 99);
            this.cbWarnningReleaseValue2.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningReleaseValue2.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningReleaseValue2.Name = "cbWarnningReleaseValue2";
            this.cbWarnningReleaseValue2.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningReleaseValue2.TabIndex = 58;
            this.cbWarnningReleaseValue2.Value = new decimal(new int[] {
            3110,
            0,
            0,
            0});
            // 
            // cbWarnningReleaseValue1
            // 
            this.cbWarnningReleaseValue1.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbWarnningReleaseValue1.Location = new System.Drawing.Point(289, 65);
            this.cbWarnningReleaseValue1.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningReleaseValue1.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningReleaseValue1.Name = "cbWarnningReleaseValue1";
            this.cbWarnningReleaseValue1.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningReleaseValue1.TabIndex = 59;
            this.cbWarnningReleaseValue1.Value = new decimal(new int[] {
            4140,
            0,
            0,
            0});
            // 
            // cbWarnningReleaseRetain4
            // 
            this.cbWarnningReleaseRetain4.Location = new System.Drawing.Point(450, 167);
            this.cbWarnningReleaseRetain4.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningReleaseRetain4.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningReleaseRetain4.Name = "cbWarnningReleaseRetain4";
            this.cbWarnningReleaseRetain4.ReadOnly = true;
            this.cbWarnningReleaseRetain4.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningReleaseRetain4.TabIndex = 29;
            this.cbWarnningReleaseRetain4.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // cbWarnningReleaseRetain3
            // 
            this.cbWarnningReleaseRetain3.Location = new System.Drawing.Point(450, 133);
            this.cbWarnningReleaseRetain3.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningReleaseRetain3.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningReleaseRetain3.Name = "cbWarnningReleaseRetain3";
            this.cbWarnningReleaseRetain3.ReadOnly = true;
            this.cbWarnningReleaseRetain3.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningReleaseRetain3.TabIndex = 30;
            this.cbWarnningReleaseRetain3.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // lbPOVWR
            // 
            this.lbPOVWR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbPOVWR.Location = new System.Drawing.Point(57, 129);
            this.lbPOVWR.Name = "lbPOVWR";
            this.lbPOVWR.Size = new System.Drawing.Size(198, 25);
            this.lbPOVWR.TabIndex = 26;
            this.lbPOVWR.Text = "Pack Over Voltage(mV)";
            this.lbPOVWR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbPLVWR
            // 
            this.lbPLVWR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbPLVWR.Location = new System.Drawing.Point(57, 163);
            this.lbPLVWR.Name = "lbPLVWR";
            this.lbPLVWR.Size = new System.Drawing.Size(210, 25);
            this.lbPLVWR.TabIndex = 25;
            this.lbPLVWR.Text = "Pack Under Voltage(mV)";
            this.lbPLVWR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // cbWarnningReleaseRetain10
            // 
            this.cbWarnningReleaseRetain10.Location = new System.Drawing.Point(450, 367);
            this.cbWarnningReleaseRetain10.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningReleaseRetain10.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningReleaseRetain10.Name = "cbWarnningReleaseRetain10";
            this.cbWarnningReleaseRetain10.ReadOnly = true;
            this.cbWarnningReleaseRetain10.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningReleaseRetain10.TabIndex = 24;
            this.cbWarnningReleaseRetain10.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // label185
            // 
            this.label185.Location = new System.Drawing.Point(447, 39);
            this.label185.Name = "label185";
            this.label185.Size = new System.Drawing.Size(104, 20);
            this.label185.TabIndex = 22;
            this.label185.Text = "Retain Time(ms)";
            // 
            // cbWarnningReleaseRetain9
            // 
            this.cbWarnningReleaseRetain9.Location = new System.Drawing.Point(450, 335);
            this.cbWarnningReleaseRetain9.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningReleaseRetain9.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningReleaseRetain9.Name = "cbWarnningReleaseRetain9";
            this.cbWarnningReleaseRetain9.ReadOnly = true;
            this.cbWarnningReleaseRetain9.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningReleaseRetain9.TabIndex = 15;
            this.cbWarnningReleaseRetain9.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // cbWarnningReleaseRetain8
            // 
            this.cbWarnningReleaseRetain8.Location = new System.Drawing.Point(450, 302);
            this.cbWarnningReleaseRetain8.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningReleaseRetain8.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningReleaseRetain8.Name = "cbWarnningReleaseRetain8";
            this.cbWarnningReleaseRetain8.ReadOnly = true;
            this.cbWarnningReleaseRetain8.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningReleaseRetain8.TabIndex = 16;
            this.cbWarnningReleaseRetain8.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // cbWarnningReleaseRetain7
            // 
            this.cbWarnningReleaseRetain7.Location = new System.Drawing.Point(450, 268);
            this.cbWarnningReleaseRetain7.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningReleaseRetain7.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningReleaseRetain7.Name = "cbWarnningReleaseRetain7";
            this.cbWarnningReleaseRetain7.ReadOnly = true;
            this.cbWarnningReleaseRetain7.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningReleaseRetain7.TabIndex = 17;
            this.cbWarnningReleaseRetain7.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // cbWarnningReleaseRetain6
            // 
            this.cbWarnningReleaseRetain6.Location = new System.Drawing.Point(450, 234);
            this.cbWarnningReleaseRetain6.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningReleaseRetain6.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningReleaseRetain6.Name = "cbWarnningReleaseRetain6";
            this.cbWarnningReleaseRetain6.ReadOnly = true;
            this.cbWarnningReleaseRetain6.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningReleaseRetain6.TabIndex = 18;
            this.cbWarnningReleaseRetain6.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // cbWarnningReleaseRetain5
            // 
            this.cbWarnningReleaseRetain5.Location = new System.Drawing.Point(450, 201);
            this.cbWarnningReleaseRetain5.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningReleaseRetain5.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningReleaseRetain5.Name = "cbWarnningReleaseRetain5";
            this.cbWarnningReleaseRetain5.ReadOnly = true;
            this.cbWarnningReleaseRetain5.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningReleaseRetain5.TabIndex = 19;
            this.cbWarnningReleaseRetain5.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // cbWarnningReleaseRetain2
            // 
            this.cbWarnningReleaseRetain2.Location = new System.Drawing.Point(450, 99);
            this.cbWarnningReleaseRetain2.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningReleaseRetain2.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningReleaseRetain2.Name = "cbWarnningReleaseRetain2";
            this.cbWarnningReleaseRetain2.ReadOnly = true;
            this.cbWarnningReleaseRetain2.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningReleaseRetain2.TabIndex = 20;
            this.cbWarnningReleaseRetain2.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // cbWarnningReleaseRetain1
            // 
            this.cbWarnningReleaseRetain1.Location = new System.Drawing.Point(450, 65);
            this.cbWarnningReleaseRetain1.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningReleaseRetain1.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningReleaseRetain1.Name = "cbWarnningReleaseRetain1";
            this.cbWarnningReleaseRetain1.ReadOnly = true;
            this.cbWarnningReleaseRetain1.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningReleaseRetain1.TabIndex = 21;
            this.cbWarnningReleaseRetain1.Value = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            // 
            // lbLSOCWR
            // 
            this.lbLSOCWR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbLSOCWR.Location = new System.Drawing.Point(58, 365);
            this.lbLSOCWR.Name = "lbLSOCWR";
            this.lbLSOCWR.Size = new System.Drawing.Size(197, 25);
            this.lbLSOCWR.TabIndex = 12;
            this.lbLSOCWR.Text = "Low SOC";
            this.lbLSOCWR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCDWR
            // 
            this.lbCDWR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCDWR.Location = new System.Drawing.Point(57, 199);
            this.lbCDWR.Name = "lbCDWR";
            this.lbCDWR.Size = new System.Drawing.Size(185, 25);
            this.lbCDWR.TabIndex = 1;
            this.lbCDWR.Text = "Cell Voltage Diff(mV)";
            this.lbCDWR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCOVWR
            // 
            this.lbCOVWR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCOVWR.Location = new System.Drawing.Point(57, 61);
            this.lbCOVWR.Name = "lbCOVWR";
            this.lbCOVWR.Size = new System.Drawing.Size(185, 25);
            this.lbCOVWR.TabIndex = 7;
            this.lbCOVWR.Text = "Cell Over Voltage(mV)";
            this.lbCOVWR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCLVWR
            // 
            this.lbCLVWR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCLVWR.Location = new System.Drawing.Point(57, 95);
            this.lbCLVWR.Name = "lbCLVWR";
            this.lbCLVWR.Size = new System.Drawing.Size(198, 25);
            this.lbCLVWR.TabIndex = 6;
            this.lbCLVWR.Text = "Cell Under Voltage(mV)";
            this.lbCLVWR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCOTWR
            // 
            this.lbCOTWR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCOTWR.Location = new System.Drawing.Point(57, 233);
            this.lbCOTWR.Name = "lbCOTWR";
            this.lbCOTWR.Size = new System.Drawing.Size(185, 25);
            this.lbCOTWR.TabIndex = 5;
            this.lbCOTWR.Text = "Cell Over Temp(℃)";
            this.lbCOTWR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCLTWR
            // 
            this.lbCLTWR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCLTWR.Location = new System.Drawing.Point(57, 268);
            this.lbCLTWR.Name = "lbCLTWR";
            this.lbCLTWR.Size = new System.Drawing.Size(185, 25);
            this.lbCLTWR.TabIndex = 4;
            this.lbCLTWR.Text = "Cell Under Temp(℃)";
            this.lbCLTWR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbCOAWR
            // 
            this.lbCOAWR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCOAWR.Location = new System.Drawing.Point(57, 302);
            this.lbCOAWR.Name = "lbCOAWR";
            this.lbCOAWR.Size = new System.Drawing.Size(226, 25);
            this.lbCOAWR.TabIndex = 3;
            this.lbCOAWR.Text = "Charging Over Current(A)";
            this.lbCOAWR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbDOAWR
            // 
            this.lbDOAWR.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbDOAWR.Location = new System.Drawing.Point(57, 336);
            this.lbDOAWR.Name = "lbDOAWR";
            this.lbDOAWR.Size = new System.Drawing.Size(226, 25);
            this.lbDOAWR.TabIndex = 2;
            this.lbDOAWR.Text = "DisChargingOverCurren(A)";
            this.lbDOAWR.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // gbWarnningSet
            // 
            this.gbWarnningSet.BackColor = System.Drawing.Color.GhostWhite;
            this.gbWarnningSet.Controls.Add(this.lbPOVW);
            this.gbWarnningSet.Controls.Add(this.cbWarnningEnable4);
            this.gbWarnningSet.Controls.Add(this.cbWarnningEnable3);
            this.gbWarnningSet.Controls.Add(this.cbWarnningValue4);
            this.gbWarnningSet.Controls.Add(this.cbWarnningValue3);
            this.gbWarnningSet.Controls.Add(this.lbPLVW);
            this.gbWarnningSet.Controls.Add(this.cbWarnningEnable11);
            this.gbWarnningSet.Controls.Add(this.cbWarnningEnable10);
            this.gbWarnningSet.Controls.Add(this.cbWarnningEnable9);
            this.gbWarnningSet.Controls.Add(this.cbWarnningEnable8);
            this.gbWarnningSet.Controls.Add(this.cbWarnningEnable7);
            this.gbWarnningSet.Controls.Add(this.cbWarnningEnable6);
            this.gbWarnningSet.Controls.Add(this.cbWarnningEnable5);
            this.gbWarnningSet.Controls.Add(this.cbWarnningEnable2);
            this.gbWarnningSet.Controls.Add(this.cbWarnningEnable1);
            this.gbWarnningSet.Controls.Add(this.label186);
            this.gbWarnningSet.Controls.Add(this.cbWarnningRetainTime4);
            this.gbWarnningSet.Controls.Add(this.lbCOAW);
            this.gbWarnningSet.Controls.Add(this.cbWarnningRetainTime3);
            this.gbWarnningSet.Controls.Add(this.cbWarnningValue11);
            this.gbWarnningSet.Controls.Add(this.cbWarnningValue10);
            this.gbWarnningSet.Controls.Add(this.lbLSOCW);
            this.gbWarnningSet.Controls.Add(this.cbWarnningValue9);
            this.gbWarnningSet.Controls.Add(this.cbWarnningValue8);
            this.gbWarnningSet.Controls.Add(this.cbWarnningValue7);
            this.gbWarnningSet.Controls.Add(this.cbWarnningValue6);
            this.gbWarnningSet.Controls.Add(this.cbWarnningValue5);
            this.gbWarnningSet.Controls.Add(this.cbWarnningValue2);
            this.gbWarnningSet.Controls.Add(this.cbWarnningRetainTime10);
            this.gbWarnningSet.Controls.Add(this.cbWarnningValue1);
            this.gbWarnningSet.Controls.Add(this.cbWarnningRetainTime11);
            this.gbWarnningSet.Controls.Add(this.lbCDW);
            this.gbWarnningSet.Controls.Add(this.lbDOAW);
            this.gbWarnningSet.Controls.Add(this.lbLSOHW);
            this.gbWarnningSet.Controls.Add(this.label127);
            this.gbWarnningSet.Controls.Add(this.cbWarnningRetainTime9);
            this.gbWarnningSet.Controls.Add(this.lbCLTW);
            this.gbWarnningSet.Controls.Add(this.cbWarnningRetainTime8);
            this.gbWarnningSet.Controls.Add(this.lbCOTW);
            this.gbWarnningSet.Controls.Add(this.lbCLVW);
            this.gbWarnningSet.Controls.Add(this.cbWarnningRetainTime7);
            this.gbWarnningSet.Controls.Add(this.lbCOVW);
            this.gbWarnningSet.Controls.Add(this.cbWarnningRetainTime1);
            this.gbWarnningSet.Controls.Add(this.cbWarnningRetainTime6);
            this.gbWarnningSet.Controls.Add(this.cbWarnningRetainTime2);
            this.gbWarnningSet.Controls.Add(this.cbWarnningRetainTime5);
            this.gbWarnningSet.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.gbWarnningSet.Location = new System.Drawing.Point(18, 21);
            this.gbWarnningSet.Name = "gbWarnningSet";
            this.gbWarnningSet.Size = new System.Drawing.Size(598, 473);
            this.gbWarnningSet.TabIndex = 6;
            this.gbWarnningSet.TabStop = false;
            this.gbWarnningSet.Text = "Warnning Value";
            // 
            // lbPOVW
            // 
            this.lbPOVW.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbPOVW.Location = new System.Drawing.Point(12, 130);
            this.lbPOVW.Name = "lbPOVW";
            this.lbPOVW.Size = new System.Drawing.Size(198, 25);
            this.lbPOVW.TabIndex = 55;
            this.lbPOVW.Text = "Pack Over Voltage(V)";
            this.lbPOVW.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // cbWarnningEnable4
            // 
            this.cbWarnningEnable4.Location = new System.Drawing.Point(543, 166);
            this.cbWarnningEnable4.Name = "cbWarnningEnable4";
            this.cbWarnningEnable4.Size = new System.Drawing.Size(23, 25);
            this.cbWarnningEnable4.TabIndex = 54;
            this.cbWarnningEnable4.UseVisualStyleBackColor = true;
            // 
            // cbWarnningEnable3
            // 
            this.cbWarnningEnable3.Location = new System.Drawing.Point(543, 132);
            this.cbWarnningEnable3.Name = "cbWarnningEnable3";
            this.cbWarnningEnable3.Size = new System.Drawing.Size(23, 25);
            this.cbWarnningEnable3.TabIndex = 53;
            this.cbWarnningEnable3.UseVisualStyleBackColor = true;
            // 
            // cbWarnningValue4
            // 
            this.cbWarnningValue4.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbWarnningValue4.Location = new System.Drawing.Point(250, 161);
            this.cbWarnningValue4.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningValue4.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningValue4.Name = "cbWarnningValue4";
            this.cbWarnningValue4.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningValue4.TabIndex = 49;
            this.cbWarnningValue4.Value = new decimal(new int[] {
            3038,
            0,
            0,
            65536});
            // 
            // cbWarnningValue3
            // 
            this.cbWarnningValue3.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbWarnningValue3.Location = new System.Drawing.Point(250, 127);
            this.cbWarnningValue3.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningValue3.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningValue3.Name = "cbWarnningValue3";
            this.cbWarnningValue3.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningValue3.TabIndex = 50;
            this.cbWarnningValue3.Value = new decimal(new int[] {
            4067,
            0,
            0,
            65536});
            // 
            // lbPLVW
            // 
            this.lbPLVW.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbPLVW.Location = new System.Drawing.Point(13, 162);
            this.lbPLVW.Name = "lbPLVW";
            this.lbPLVW.Size = new System.Drawing.Size(199, 25);
            this.lbPLVW.TabIndex = 47;
            this.lbPLVW.Text = "Pack Under Voltage(V)";
            this.lbPLVW.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // cbWarnningEnable11
            // 
            this.cbWarnningEnable11.Location = new System.Drawing.Point(543, 391);
            this.cbWarnningEnable11.Name = "cbWarnningEnable11";
            this.cbWarnningEnable11.Size = new System.Drawing.Size(23, 25);
            this.cbWarnningEnable11.TabIndex = 46;
            this.cbWarnningEnable11.UseVisualStyleBackColor = true;
            // 
            // cbWarnningEnable10
            // 
            this.cbWarnningEnable10.Location = new System.Drawing.Point(543, 360);
            this.cbWarnningEnable10.Name = "cbWarnningEnable10";
            this.cbWarnningEnable10.Size = new System.Drawing.Size(23, 25);
            this.cbWarnningEnable10.TabIndex = 45;
            this.cbWarnningEnable10.UseVisualStyleBackColor = true;
            // 
            // cbWarnningEnable9
            // 
            this.cbWarnningEnable9.Location = new System.Drawing.Point(543, 330);
            this.cbWarnningEnable9.Name = "cbWarnningEnable9";
            this.cbWarnningEnable9.Size = new System.Drawing.Size(23, 25);
            this.cbWarnningEnable9.TabIndex = 44;
            this.cbWarnningEnable9.UseVisualStyleBackColor = true;
            // 
            // cbWarnningEnable8
            // 
            this.cbWarnningEnable8.Location = new System.Drawing.Point(543, 296);
            this.cbWarnningEnable8.Name = "cbWarnningEnable8";
            this.cbWarnningEnable8.Size = new System.Drawing.Size(23, 25);
            this.cbWarnningEnable8.TabIndex = 43;
            this.cbWarnningEnable8.UseVisualStyleBackColor = true;
            // 
            // cbWarnningEnable7
            // 
            this.cbWarnningEnable7.Location = new System.Drawing.Point(543, 266);
            this.cbWarnningEnable7.Name = "cbWarnningEnable7";
            this.cbWarnningEnable7.Size = new System.Drawing.Size(23, 25);
            this.cbWarnningEnable7.TabIndex = 42;
            this.cbWarnningEnable7.UseVisualStyleBackColor = true;
            // 
            // cbWarnningEnable6
            // 
            this.cbWarnningEnable6.Location = new System.Drawing.Point(543, 232);
            this.cbWarnningEnable6.Name = "cbWarnningEnable6";
            this.cbWarnningEnable6.Size = new System.Drawing.Size(23, 25);
            this.cbWarnningEnable6.TabIndex = 41;
            this.cbWarnningEnable6.UseVisualStyleBackColor = true;
            // 
            // cbWarnningEnable5
            // 
            this.cbWarnningEnable5.Location = new System.Drawing.Point(543, 199);
            this.cbWarnningEnable5.Name = "cbWarnningEnable5";
            this.cbWarnningEnable5.Size = new System.Drawing.Size(23, 25);
            this.cbWarnningEnable5.TabIndex = 40;
            this.cbWarnningEnable5.UseVisualStyleBackColor = true;
            // 
            // cbWarnningEnable2
            // 
            this.cbWarnningEnable2.Location = new System.Drawing.Point(543, 100);
            this.cbWarnningEnable2.Name = "cbWarnningEnable2";
            this.cbWarnningEnable2.Size = new System.Drawing.Size(23, 25);
            this.cbWarnningEnable2.TabIndex = 39;
            this.cbWarnningEnable2.UseVisualStyleBackColor = true;
            // 
            // cbWarnningEnable1
            // 
            this.cbWarnningEnable1.Location = new System.Drawing.Point(543, 63);
            this.cbWarnningEnable1.Name = "cbWarnningEnable1";
            this.cbWarnningEnable1.Size = new System.Drawing.Size(23, 25);
            this.cbWarnningEnable1.TabIndex = 38;
            this.cbWarnningEnable1.UseVisualStyleBackColor = true;
            // 
            // label186
            // 
            this.label186.Location = new System.Drawing.Point(247, 36);
            this.label186.Name = "label186";
            this.label186.Size = new System.Drawing.Size(125, 22);
            this.label186.TabIndex = 24;
            this.label186.Text = "Value";
            // 
            // cbWarnningRetainTime4
            // 
            this.cbWarnningRetainTime4.Location = new System.Drawing.Point(398, 161);
            this.cbWarnningRetainTime4.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningRetainTime4.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningRetainTime4.Name = "cbWarnningRetainTime4";
            this.cbWarnningRetainTime4.ReadOnly = true;
            this.cbWarnningRetainTime4.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningRetainTime4.TabIndex = 27;
            this.cbWarnningRetainTime4.Value = new decimal(new int[] {
            3000,
            0,
            0,
            0});
            // 
            // lbCOAW
            // 
            this.lbCOAW.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCOAW.Location = new System.Drawing.Point(13, 294);
            this.lbCOAW.Name = "lbCOAW";
            this.lbCOAW.Size = new System.Drawing.Size(231, 25);
            this.lbCOAW.TabIndex = 14;
            this.lbCOAW.Text = "Charging Over Current(A)";
            this.lbCOAW.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // cbWarnningRetainTime3
            // 
            this.cbWarnningRetainTime3.Location = new System.Drawing.Point(398, 127);
            this.cbWarnningRetainTime3.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningRetainTime3.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningRetainTime3.Name = "cbWarnningRetainTime3";
            this.cbWarnningRetainTime3.ReadOnly = true;
            this.cbWarnningRetainTime3.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningRetainTime3.TabIndex = 28;
            this.cbWarnningRetainTime3.Value = new decimal(new int[] {
            3000,
            0,
            0,
            0});
            // 
            // cbWarnningValue11
            // 
            this.cbWarnningValue11.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbWarnningValue11.Location = new System.Drawing.Point(250, 388);
            this.cbWarnningValue11.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningValue11.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningValue11.Name = "cbWarnningValue11";
            this.cbWarnningValue11.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningValue11.TabIndex = 13;
            this.cbWarnningValue11.Value = new decimal(new int[] {
            85,
            0,
            0,
            0});
            // 
            // cbWarnningValue10
            // 
            this.cbWarnningValue10.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbWarnningValue10.Location = new System.Drawing.Point(250, 356);
            this.cbWarnningValue10.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningValue10.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningValue10.Name = "cbWarnningValue10";
            this.cbWarnningValue10.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningValue10.TabIndex = 11;
            this.cbWarnningValue10.Value = new decimal(new int[] {
            20,
            0,
            0,
            0});
            // 
            // lbLSOCW
            // 
            this.lbLSOCW.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbLSOCW.Location = new System.Drawing.Point(13, 355);
            this.lbLSOCW.Name = "lbLSOCW";
            this.lbLSOCW.Size = new System.Drawing.Size(176, 25);
            this.lbLSOCW.TabIndex = 10;
            this.lbLSOCW.Text = "Low SOC";
            this.lbLSOCW.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // cbWarnningValue9
            // 
            this.cbWarnningValue9.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbWarnningValue9.Location = new System.Drawing.Point(250, 324);
            this.cbWarnningValue9.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningValue9.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningValue9.Name = "cbWarnningValue9";
            this.cbWarnningValue9.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningValue9.TabIndex = 8;
            this.cbWarnningValue9.Value = new decimal(new int[] {
            150,
            0,
            0,
            -2147483648});
            // 
            // cbWarnningValue8
            // 
            this.cbWarnningValue8.Location = new System.Drawing.Point(250, 291);
            this.cbWarnningValue8.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningValue8.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningValue8.Name = "cbWarnningValue8";
            this.cbWarnningValue8.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningValue8.TabIndex = 8;
            this.cbWarnningValue8.Value = new decimal(new int[] {
            90,
            0,
            0,
            0});
            // 
            // cbWarnningValue7
            // 
            this.cbWarnningValue7.Location = new System.Drawing.Point(250, 259);
            this.cbWarnningValue7.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningValue7.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningValue7.Name = "cbWarnningValue7";
            this.cbWarnningValue7.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningValue7.TabIndex = 8;
            this.cbWarnningValue7.Value = new decimal(new int[] {
            20,
            0,
            0,
            -2147483648});
            // 
            // cbWarnningValue6
            // 
            this.cbWarnningValue6.Location = new System.Drawing.Point(250, 225);
            this.cbWarnningValue6.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningValue6.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningValue6.Name = "cbWarnningValue6";
            this.cbWarnningValue6.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningValue6.TabIndex = 8;
            this.cbWarnningValue6.Value = new decimal(new int[] {
            45,
            0,
            0,
            0});
            // 
            // cbWarnningValue5
            // 
            this.cbWarnningValue5.Location = new System.Drawing.Point(250, 193);
            this.cbWarnningValue5.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningValue5.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningValue5.Name = "cbWarnningValue5";
            this.cbWarnningValue5.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningValue5.TabIndex = 8;
            this.cbWarnningValue5.Value = new decimal(new int[] {
            400,
            0,
            0,
            0});
            // 
            // cbWarnningValue2
            // 
            this.cbWarnningValue2.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbWarnningValue2.Location = new System.Drawing.Point(252, 94);
            this.cbWarnningValue2.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningValue2.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningValue2.Name = "cbWarnningValue2";
            this.cbWarnningValue2.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningValue2.TabIndex = 8;
            this.cbWarnningValue2.Value = new decimal(new int[] {
            3100,
            0,
            0,
            0});
            // 
            // cbWarnningRetainTime10
            // 
            this.cbWarnningRetainTime10.Location = new System.Drawing.Point(396, 356);
            this.cbWarnningRetainTime10.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningRetainTime10.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningRetainTime10.Name = "cbWarnningRetainTime10";
            this.cbWarnningRetainTime10.ReadOnly = true;
            this.cbWarnningRetainTime10.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningRetainTime10.TabIndex = 14;
            this.cbWarnningRetainTime10.Value = new decimal(new int[] {
            3000,
            0,
            0,
            0});
            // 
            // cbWarnningValue1
            // 
            this.cbWarnningValue1.Increment = new decimal(new int[] {
            100,
            0,
            0,
            0});
            this.cbWarnningValue1.Location = new System.Drawing.Point(252, 60);
            this.cbWarnningValue1.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningValue1.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningValue1.Name = "cbWarnningValue1";
            this.cbWarnningValue1.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningValue1.TabIndex = 8;
            this.cbWarnningValue1.Value = new decimal(new int[] {
            4150,
            0,
            0,
            0});
            // 
            // cbWarnningRetainTime11
            // 
            this.cbWarnningRetainTime11.Location = new System.Drawing.Point(398, 388);
            this.cbWarnningRetainTime11.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningRetainTime11.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningRetainTime11.Name = "cbWarnningRetainTime11";
            this.cbWarnningRetainTime11.ReadOnly = true;
            this.cbWarnningRetainTime11.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningRetainTime11.TabIndex = 13;
            this.cbWarnningRetainTime11.Value = new decimal(new int[] {
            3000,
            0,
            0,
            0});
            // 
            // lbCDW
            // 
            this.lbCDW.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCDW.Location = new System.Drawing.Point(12, 195);
            this.lbCDW.Name = "lbCDW";
            this.lbCDW.Size = new System.Drawing.Size(176, 25);
            this.lbCDW.TabIndex = 1;
            this.lbCDW.Text = "Cell Voltage Diff(mV)";
            this.lbCDW.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbDOAW
            // 
            this.lbDOAW.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbDOAW.Location = new System.Drawing.Point(13, 324);
            this.lbDOAW.Name = "lbDOAW";
            this.lbDOAW.Size = new System.Drawing.Size(225, 25);
            this.lbDOAW.TabIndex = 2;
            this.lbDOAW.Text = "DisChargingOverCurren(A)";
            this.lbDOAW.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lbLSOHW
            // 
            this.lbLSOHW.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbLSOHW.Location = new System.Drawing.Point(13, 387);
            this.lbLSOHW.Name = "lbLSOHW";
            this.lbLSOHW.Size = new System.Drawing.Size(176, 25);
            this.lbLSOHW.TabIndex = 3;
            this.lbLSOHW.Text = "Low SOH";
            this.lbLSOHW.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // label127
            // 
            this.label127.AutoSize = true;
            this.label127.Location = new System.Drawing.Point(391, 36);
            this.label127.Name = "label127";
            this.label127.Size = new System.Drawing.Size(125, 16);
            this.label127.TabIndex = 9;
            this.label127.Text = "Retain Time(ms)";
            // 
            // cbWarnningRetainTime9
            // 
            this.cbWarnningRetainTime9.Location = new System.Drawing.Point(398, 324);
            this.cbWarnningRetainTime9.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningRetainTime9.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningRetainTime9.Name = "cbWarnningRetainTime9";
            this.cbWarnningRetainTime9.ReadOnly = true;
            this.cbWarnningRetainTime9.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningRetainTime9.TabIndex = 8;
            this.cbWarnningRetainTime9.Value = new decimal(new int[] {
            10,
            0,
            0,
            0});
            // 
            // lbCLTW
            // 
            this.lbCLTW.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCLTW.Location = new System.Drawing.Point(13, 259);
            this.lbCLTW.Name = "lbCLTW";
            this.lbCLTW.Size = new System.Drawing.Size(201, 25);
            this.lbCLTW.TabIndex = 4;
            this.lbCLTW.Text = "Cell Under Temp(℃)";
            this.lbCLTW.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // cbWarnningRetainTime8
            // 
            this.cbWarnningRetainTime8.Location = new System.Drawing.Point(398, 291);
            this.cbWarnningRetainTime8.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningRetainTime8.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningRetainTime8.Name = "cbWarnningRetainTime8";
            this.cbWarnningRetainTime8.ReadOnly = true;
            this.cbWarnningRetainTime8.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningRetainTime8.TabIndex = 8;
            this.cbWarnningRetainTime8.Value = new decimal(new int[] {
            10,
            0,
            0,
            0});
            // 
            // lbCOTW
            // 
            this.lbCOTW.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCOTW.Location = new System.Drawing.Point(12, 225);
            this.lbCOTW.Name = "lbCOTW";
            this.lbCOTW.Size = new System.Drawing.Size(211, 25);
            this.lbCOTW.TabIndex = 5;
            this.lbCOTW.Text = "Cell Over Temp(℃)";
            this.lbCOTW.TextAlign = System.Drawing.ContentAlignment.BottomLeft;
            // 
            // lbCLVW
            // 
            this.lbCLVW.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCLVW.Location = new System.Drawing.Point(13, 96);
            this.lbCLVW.Name = "lbCLVW";
            this.lbCLVW.Size = new System.Drawing.Size(201, 25);
            this.lbCLVW.TabIndex = 6;
            this.lbCLVW.Text = "Cell Under Voltage(mV)";
            this.lbCLVW.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // cbWarnningRetainTime7
            // 
            this.cbWarnningRetainTime7.Location = new System.Drawing.Point(398, 259);
            this.cbWarnningRetainTime7.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningRetainTime7.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningRetainTime7.Name = "cbWarnningRetainTime7";
            this.cbWarnningRetainTime7.ReadOnly = true;
            this.cbWarnningRetainTime7.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningRetainTime7.TabIndex = 8;
            this.cbWarnningRetainTime7.Value = new decimal(new int[] {
            3000,
            0,
            0,
            0});
            // 
            // lbCOVW
            // 
            this.lbCOVW.Font = new System.Drawing.Font("함초롬바탕", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbCOVW.Location = new System.Drawing.Point(13, 62);
            this.lbCOVW.Name = "lbCOVW";
            this.lbCOVW.Size = new System.Drawing.Size(201, 25);
            this.lbCOVW.TabIndex = 7;
            this.lbCOVW.Text = "Cell Over Voltage(mV)";
            this.lbCOVW.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // cbWarnningRetainTime1
            // 
            this.cbWarnningRetainTime1.Location = new System.Drawing.Point(398, 62);
            this.cbWarnningRetainTime1.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningRetainTime1.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningRetainTime1.Name = "cbWarnningRetainTime1";
            this.cbWarnningRetainTime1.ReadOnly = true;
            this.cbWarnningRetainTime1.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningRetainTime1.TabIndex = 8;
            this.cbWarnningRetainTime1.Value = new decimal(new int[] {
            3000,
            0,
            0,
            0});
            // 
            // cbWarnningRetainTime6
            // 
            this.cbWarnningRetainTime6.Location = new System.Drawing.Point(398, 225);
            this.cbWarnningRetainTime6.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningRetainTime6.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningRetainTime6.Name = "cbWarnningRetainTime6";
            this.cbWarnningRetainTime6.ReadOnly = true;
            this.cbWarnningRetainTime6.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningRetainTime6.TabIndex = 8;
            this.cbWarnningRetainTime6.Value = new decimal(new int[] {
            3000,
            0,
            0,
            0});
            // 
            // cbWarnningRetainTime2
            // 
            this.cbWarnningRetainTime2.Location = new System.Drawing.Point(398, 94);
            this.cbWarnningRetainTime2.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningRetainTime2.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningRetainTime2.Name = "cbWarnningRetainTime2";
            this.cbWarnningRetainTime2.ReadOnly = true;
            this.cbWarnningRetainTime2.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningRetainTime2.TabIndex = 8;
            this.cbWarnningRetainTime2.Value = new decimal(new int[] {
            3000,
            0,
            0,
            0});
            // 
            // cbWarnningRetainTime5
            // 
            this.cbWarnningRetainTime5.Location = new System.Drawing.Point(398, 193);
            this.cbWarnningRetainTime5.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.cbWarnningRetainTime5.Minimum = new decimal(new int[] {
            1000000,
            0,
            0,
            -2147483648});
            this.cbWarnningRetainTime5.Name = "cbWarnningRetainTime5";
            this.cbWarnningRetainTime5.ReadOnly = true;
            this.cbWarnningRetainTime5.Size = new System.Drawing.Size(120, 26);
            this.cbWarnningRetainTime5.TabIndex = 8;
            this.cbWarnningRetainTime5.Value = new decimal(new int[] {
            3000,
            0,
            0,
            0});
            // 
            // tabPage5
            // 
            this.tabPage5.Controls.Add(this.gbLoggingSetting);
            this.tabPage5.Location = new System.Drawing.Point(4, 22);
            this.tabPage5.Name = "tabPage5";
            this.tabPage5.Size = new System.Drawing.Size(1782, 781);
            this.tabPage5.TabIndex = 5;
            this.tabPage5.Text = "Log";
            this.tabPage5.UseVisualStyleBackColor = true;
            // 
            // gbLoggingSetting
            // 
            this.gbLoggingSetting.BackColor = System.Drawing.Color.Azure;
            this.gbLoggingSetting.Controls.Add(this.label62);
            this.gbLoggingSetting.Controls.Add(this.tbLogPath);
            this.gbLoggingSetting.Controls.Add(this.tbLogFileName);
            this.gbLoggingSetting.Controls.Add(this.button4);
            this.gbLoggingSetting.Controls.Add(this.btLogPath);
            this.gbLoggingSetting.Controls.Add(this.label2);
            this.gbLoggingSetting.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.gbLoggingSetting.Location = new System.Drawing.Point(15, 23);
            this.gbLoggingSetting.Name = "gbLoggingSetting";
            this.gbLoggingSetting.Size = new System.Drawing.Size(523, 219);
            this.gbLoggingSetting.TabIndex = 21;
            this.gbLoggingSetting.TabStop = false;
            this.gbLoggingSetting.Text = "Command Logging Setting";
            // 
            // label62
            // 
            this.label62.BackColor = System.Drawing.Color.PaleTurquoise;
            this.label62.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.label62.Font = new System.Drawing.Font("굴림", 8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label62.Location = new System.Drawing.Point(21, 22);
            this.label62.Name = "label62";
            this.label62.Size = new System.Drawing.Size(480, 26);
            this.label62.TabIndex = 4;
            this.label62.Text = "Log File Path";
            this.label62.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // tbLogPath
            // 
            this.tbLogPath.BackColor = System.Drawing.Color.Azure;
            this.tbLogPath.Location = new System.Drawing.Point(21, 44);
            this.tbLogPath.Name = "tbLogPath";
            this.tbLogPath.ReadOnly = true;
            this.tbLogPath.Size = new System.Drawing.Size(480, 26);
            this.tbLogPath.TabIndex = 3;
            this.tbLogPath.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            // 
            // tbLogFileName
            // 
            this.tbLogFileName.BackColor = System.Drawing.Color.Azure;
            this.tbLogFileName.Location = new System.Drawing.Point(21, 159);
            this.tbLogFileName.Name = "tbLogFileName";
            this.tbLogFileName.Size = new System.Drawing.Size(480, 26);
            this.tbLogFileName.TabIndex = 3;
            this.tbLogFileName.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            // 
            // button4
            // 
            this.button4.Location = new System.Drawing.Point(21, 301);
            this.button4.Name = "button4";
            this.button4.Size = new System.Drawing.Size(199, 23);
            this.button4.TabIndex = 1;
            this.button4.Text = "Clear";
            this.button4.UseVisualStyleBackColor = true;
            // 
            // btLogPath
            // 
            this.btLogPath.BackColor = System.Drawing.Color.PaleTurquoise;
            this.btLogPath.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btLogPath.Location = new System.Drawing.Point(376, 77);
            this.btLogPath.Name = "btLogPath";
            this.btLogPath.Size = new System.Drawing.Size(125, 36);
            this.btLogPath.TabIndex = 1;
            this.btLogPath.Text = "경로 지정 버튼";
            this.btLogPath.UseCompatibleTextRendering = true;
            this.btLogPath.UseMnemonic = false;
            this.btLogPath.UseVisualStyleBackColor = false;
            this.btLogPath.Click += new System.EventHandler(this.btLogPath_Click);
            // 
            // label2
            // 
            this.label2.BackColor = System.Drawing.Color.PaleTurquoise;
            this.label2.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.label2.Font = new System.Drawing.Font("굴림", 8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label2.Location = new System.Drawing.Point(21, 136);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(480, 26);
            this.label2.TabIndex = 2;
            this.label2.Text = "파일 명(.csv)";
            this.label2.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // ICStatus
            // 
            this.ICStatus.BackColor = System.Drawing.Color.Red;
            this.ICStatus.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.ICStatus.Location = new System.Drawing.Point(407, 238);
            this.ICStatus.Name = "ICStatus";
            this.ICStatus.Size = new System.Drawing.Size(18, 18);
            this.ICStatus.TabIndex = 30;
            // 
            // lbIC
            // 
            this.lbIC.Font = new System.Drawing.Font("함초롬바탕", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lbIC.Location = new System.Drawing.Point(243, 235);
            this.lbIC.Name = "lbIC";
            this.lbIC.Size = new System.Drawing.Size(162, 25);
            this.lbIC.TabIndex = 29;
            this.lbIC.Text = "IC State";
            this.lbIC.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.AutoScroll = true;
            this.BackColor = System.Drawing.Color.Azure;
            this.ClientSize = new System.Drawing.Size(1828, 954);
            this.Controls.Add(this.tcBMS);
            this.Controls.Add(this.pbPoenLogo);
            this.Name = "MainForm";
            this.ShowIcon = false;
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.Resize += new System.EventHandler(this.Form1_Resize);
            ((System.ComponentModel.ISupportInitialize)(this.pbPoenLogo)).EndInit();
            this.tabPage4.ResumeLayout(false);
            this.groupBox4.ResumeLayout(false);
            this.groupBox4.PerformLayout();
            this.groupBox1.ResumeLayout(false);
            this.gbBMUVersion.ResumeLayout(false);
            this.gbBMUVersion.PerformLayout();
            this.gbConnection.ResumeLayout(false);
            this.gbSOH.ResumeLayout(false);
            this.gbSOH.PerformLayout();
            this.gbSOC.ResumeLayout(false);
            this.gbSOC.PerformLayout();
            this.tabPage2.ResumeLayout(false);
            this.pnSaveFileRelease.ResumeLayout(false);
            this.panel4.ResumeLayout(false);
            this.gbProtectRelease.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain13)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain14)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain12)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue14)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue13)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue12)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue4)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue3)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue11)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue10)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue9)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue8)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue7)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue6)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue5)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseValue1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain4)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain3)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain10)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain11)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain9)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain8)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain7)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain6)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain5)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectReleaseRetain1)).EndInit();
            this.gbProtectSet.ResumeLayout(false);
            this.gbProtectSet.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime13)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime14)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime12)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue14)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue13)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue12)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime4)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime3)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime10)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime11)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime9)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime8)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime7)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime6)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime5)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectRetainTime1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue4)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue3)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue11)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue10)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue9)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue8)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue7)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue6)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue5)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbProtectValue1)).EndInit();
            this.tabPage1.ResumeLayout(false);
            this.gbLoggingStatus.ResumeLayout(false);
            this.gbLoggingStatus.PerformLayout();
            this.gbVoltage.ResumeLayout(false);
            this.pnModule.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.chart1)).EndInit();
            this.panel2.ResumeLayout(false);
            this.gbCommand.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.pbRelay)).EndInit();
            this.gbTemperature.ResumeLayout(false);
            this.gbSystemStatus.ResumeLayout(false);
            this.gbSystemInfo.ResumeLayout(false);
            this.tcBMS.ResumeLayout(false);
            this.tabPage3.ResumeLayout(false);
            this.pnSaveFile.ResumeLayout(false);
            this.panel1.ResumeLayout(false);
            this.gbWarnningRelease.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseValue4)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseValue3)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseValue10)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseValue9)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseValue8)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseValue7)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseValue6)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseValue5)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseValue2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseValue1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseRetain4)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseRetain3)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseRetain10)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseRetain9)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseRetain8)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseRetain7)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseRetain6)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseRetain5)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseRetain2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningReleaseRetain1)).EndInit();
            this.gbWarnningSet.ResumeLayout(false);
            this.gbWarnningSet.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue4)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue3)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime4)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime3)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue11)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue10)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue9)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue8)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue7)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue6)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue5)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime10)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningValue1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime11)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime9)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime8)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime7)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime6)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cbWarnningRetainTime5)).EndInit();
            this.tabPage5.ResumeLayout(false);
            this.gbLoggingSetting.ResumeLayout(false);
            this.gbLoggingSetting.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.PictureBox pbPoenLogo;
        private System.Windows.Forms.Timer timer1;
        private System.ComponentModel.BackgroundWorker backgroundWorker1;
        private System.Windows.Forms.TabPage tabPage4;
        private System.Windows.Forms.GroupBox gbSOH;
        private System.Windows.Forms.Button btInitSOH;
        private System.Windows.Forms.Label lbSOH;
        private System.Windows.Forms.TextBox tbSOH;
        private System.Windows.Forms.TextBox tbSetSOH;
        private System.Windows.Forms.Button btSetSOH;
        private System.Windows.Forms.GroupBox gbSOC;
        private System.Windows.Forms.TextBox tbSOC;
        private System.Windows.Forms.Button btInitSOC;
        private System.Windows.Forms.TextBox tbSetSOC;
        private System.Windows.Forms.Button btSetSOC;
        private System.Windows.Forms.TabPage tabPage2;
        private System.Windows.Forms.GroupBox gbProtectRelease;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseRetain4;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseRetain3;
        private System.Windows.Forms.Label lbPOVPR;
        private System.Windows.Forms.Label lbPLVPR;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseRetain10;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseRetain11;
        private System.Windows.Forms.Label label188;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseRetain9;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseRetain8;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseRetain7;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseRetain6;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseRetain5;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseRetain2;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseRetain1;
        private System.Windows.Forms.Label lbCDPR;
        private System.Windows.Forms.Label lbCOVPR;
        private System.Windows.Forms.Label lbCLVPR;
        private System.Windows.Forms.Label lbCOTPR;
        private System.Windows.Forms.Label lbCLTPR;
        private System.Windows.Forms.Label lbCOAPR;
        private System.Windows.Forms.Label lbDOAPR;
        private System.Windows.Forms.GroupBox gbProtectSet;
        private System.Windows.Forms.CheckBox cbProtectEnable4;
        private System.Windows.Forms.CheckBox cbProtectEnable3;
        private System.Windows.Forms.NumericUpDown cbProtectValue4;
        private System.Windows.Forms.NumericUpDown cbProtectValue3;
        private System.Windows.Forms.Label lbPLVP;
        private System.Windows.Forms.Label lbPOVP;
        private System.Windows.Forms.CheckBox cbProtectEnable11;
        private System.Windows.Forms.CheckBox cbProtectEnable10;
        private System.Windows.Forms.CheckBox cbProtectEnable9;
        private System.Windows.Forms.CheckBox cbProtectEnable8;
        private System.Windows.Forms.CheckBox cbProtectEnable7;
        private System.Windows.Forms.CheckBox cbProtectEnable6;
        private System.Windows.Forms.CheckBox cbProtectEnable5;
        private System.Windows.Forms.CheckBox cbProtectEnable2;
        private System.Windows.Forms.CheckBox cbProtectEnable1;
        private System.Windows.Forms.Label label190;
        private System.Windows.Forms.Label lbCOAP;
        private System.Windows.Forms.NumericUpDown cbProtectValue11;
        private System.Windows.Forms.NumericUpDown cbProtectValue10;
        private System.Windows.Forms.NumericUpDown cbProtectValue9;
        private System.Windows.Forms.NumericUpDown cbProtectValue8;
        private System.Windows.Forms.NumericUpDown cbProtectValue7;
        private System.Windows.Forms.NumericUpDown cbProtectValue6;
        private System.Windows.Forms.NumericUpDown cbProtectValue5;
        private System.Windows.Forms.NumericUpDown cbProtectValue2;
        private System.Windows.Forms.NumericUpDown cbProtectValue1;
        private System.Windows.Forms.Label lbDOAP;
        private System.Windows.Forms.Label lbCLTP;
        private System.Windows.Forms.Label lbCOTP;
        private System.Windows.Forms.Label lbCLVP;
        private System.Windows.Forms.Label lbCOVP;
        private System.Windows.Forms.TabPage tabPage1;
        private System.Windows.Forms.GroupBox gbVoltage;
        private System.Windows.Forms.Panel pnModule;
        private System.Windows.Forms.DataVisualization.Charting.Chart chart1;
        private System.Windows.Forms.Label lb_IC9;
        private System.Windows.Forms.Label lb_IC8;
        private System.Windows.Forms.Label lb_IC7;
        private System.Windows.Forms.Label lb_IC6;
        private System.Windows.Forms.Label lb_IC5;
        private System.Windows.Forms.Label lb_IC4;
        private System.Windows.Forms.Label lb_IC3;
        private System.Windows.Forms.Label lb_IC2;
        private System.Windows.Forms.Label lb_IC1;
        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.Button btVoltageView;
        private System.Windows.Forms.Label lbCell6Value;
        private System.Windows.Forms.Label lbCell10Value;
        private System.Windows.Forms.Label lbCell5Value;
        private System.Windows.Forms.Label lbCell9Value;
        private System.Windows.Forms.Label lbCell4Value;
        private System.Windows.Forms.Label lbCell8Value;
        private System.Windows.Forms.Label lbCell3Value;
        private System.Windows.Forms.Label lbCell7Value;
        private System.Windows.Forms.Label lbCell2Value;
        private System.Windows.Forms.Label lbCell1Value;
        private System.Windows.Forms.Label lbCell1;
        private System.Windows.Forms.Label lbCell2;
        private System.Windows.Forms.Label lbCell7;
        private System.Windows.Forms.Label lbCell3;
        private System.Windows.Forms.Label lbCell8;
        private System.Windows.Forms.Label lbCell4;
        private System.Windows.Forms.Label lbCell9;
        private System.Windows.Forms.Label lbCell5;
        private System.Windows.Forms.Label lbCell10;
        private System.Windows.Forms.Label lbCell6;
        private System.Windows.Forms.GroupBox gbCommand;
        private System.Windows.Forms.PictureBox pbRelay;
        private System.Windows.Forms.Button btRelayOFF;
        private System.Windows.Forms.Button btRelayOn;
        private System.Windows.Forms.GroupBox gbTemperature;
        private System.Windows.Forms.Label lbTemp4;
        private System.Windows.Forms.Label lbTemp4Value;
        private System.Windows.Forms.Label lbTemp3;
        private System.Windows.Forms.Label lbTemp3Value;
        private System.Windows.Forms.Label lbTemp2;
        private System.Windows.Forms.Label lbTemp2Value;
        private System.Windows.Forms.Label lbTemp1;
        private System.Windows.Forms.Label lbTemp1Value;
        private System.Windows.Forms.GroupBox gbSystemStatus;
        private System.Windows.Forms.Label lbRelayStatus;
        private System.Windows.Forms.Label lbStandbyStatus;
        private System.Windows.Forms.Label lbRelay;
        private System.Windows.Forms.Label lbStandby;
        private System.Windows.Forms.GroupBox gbSystemInfo;
        private System.Windows.Forms.Label lbMaxCellVoltageValue;
        private System.Windows.Forms.Label lbMinCellVoltageValue;
        private System.Windows.Forms.Label lbCdcValue;
        private System.Windows.Forms.Label lbCccValue;
        private System.Windows.Forms.Label lbMinTemp;
        private System.Windows.Forms.Label lbFrontSohValue;
        private System.Windows.Forms.Label lbMaxTemp;
        private System.Windows.Forms.Label lbCurrentValue;
        private System.Windows.Forms.Label lbCdc;
        private System.Windows.Forms.Label lbFrontSocValue;
        private System.Windows.Forms.Label lbCcc;
        private System.Windows.Forms.Label lbMinTempValue;
        private System.Windows.Forms.Label lbCurrent;
        private System.Windows.Forms.Label lbPackVoltageValue;
        private System.Windows.Forms.Label lbMaxCellVoltage;
        private System.Windows.Forms.Label lbMaxTempValue;
        private System.Windows.Forms.Label lbMinCellVoltage;
        private System.Windows.Forms.Label lbFrontSoh;
        private System.Windows.Forms.Label lbFrontSoc;
        private System.Windows.Forms.Label lbPackVoltage;
        private System.Windows.Forms.TabControl tcBMS;
        private System.Windows.Forms.Label lb_IC10;
        private System.Windows.Forms.GroupBox gbBMUVersion;
        private System.Windows.Forms.TextBox tbBMUVersion;
        private System.Windows.Forms.GroupBox gbConnection;
        private System.Windows.Forms.Button btConnect;
        private System.Windows.Forms.ComboBox cbPort;
        private System.Windows.Forms.GroupBox gbLoggingStatus;
        private System.Windows.Forms.Button btLoggingStart;
        private System.Windows.Forms.Button button2;
        private System.Windows.Forms.TextBox tbLogStatus;
        private System.Windows.Forms.TabPage tabPage5;
        private System.Windows.Forms.Label label61;
        private System.Windows.Forms.Label label60;
        private System.Windows.Forms.Label lbSOC;
        private System.Windows.Forms.Label lbInterLockStatus;
        private System.Windows.Forms.Label lbCurSensorStatus;
        private System.Windows.Forms.Label lbTCellStatus;
        private System.Windows.Forms.Label lbVCellStatus;
        private System.Windows.Forms.Label lbLineStatus;
        private System.Windows.Forms.Label lbInterLock;
        private System.Windows.Forms.Label lbCurSensor;
        private System.Windows.Forms.Label lbTCell;
        private System.Windows.Forms.Label lbVCell;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseValue4;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseValue3;
        private System.Windows.Forms.Label label189;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseValue11;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseValue10;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseValue9;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseValue8;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseValue7;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseValue6;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseValue5;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseValue2;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseValue1;
        private System.Windows.Forms.NumericUpDown cbProtectRetainTime4;
        private System.Windows.Forms.NumericUpDown cbProtectRetainTime3;
        private System.Windows.Forms.NumericUpDown cbProtectRetainTime10;
        private System.Windows.Forms.NumericUpDown cbProtectRetainTime11;
        private System.Windows.Forms.Label label88;
        private System.Windows.Forms.NumericUpDown cbProtectRetainTime9;
        private System.Windows.Forms.NumericUpDown cbProtectRetainTime8;
        private System.Windows.Forms.NumericUpDown cbProtectRetainTime7;
        private System.Windows.Forms.NumericUpDown cbProtectRetainTime6;
        private System.Windows.Forms.NumericUpDown cbProtectRetainTime5;
        private System.Windows.Forms.NumericUpDown cbProtectRetainTime2;
        private System.Windows.Forms.NumericUpDown cbProtectRetainTime1;
        private System.Windows.Forms.Panel panel4;
        private System.Windows.Forms.Button btProtectSettingLoad;
        private System.Windows.Forms.Button btProtectSettingSave;
        private System.Windows.Forms.TabPage tabPage3;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Button btWarnningSettingLoad;
        private System.Windows.Forms.Button btWarnningSettingSave;
        private System.Windows.Forms.GroupBox gbWarnningRelease;
        private System.Windows.Forms.NumericUpDown cbWarnningReleaseValue4;
        private System.Windows.Forms.NumericUpDown cbWarnningReleaseValue3;
        private System.Windows.Forms.Label label187;
        private System.Windows.Forms.NumericUpDown cbWarnningReleaseValue10;
        private System.Windows.Forms.NumericUpDown cbWarnningReleaseValue9;
        private System.Windows.Forms.NumericUpDown cbWarnningReleaseValue8;
        private System.Windows.Forms.NumericUpDown cbWarnningReleaseValue7;
        private System.Windows.Forms.NumericUpDown cbWarnningReleaseValue6;
        private System.Windows.Forms.NumericUpDown cbWarnningReleaseValue5;
        private System.Windows.Forms.NumericUpDown cbWarnningReleaseValue2;
        private System.Windows.Forms.NumericUpDown cbWarnningReleaseValue1;
        private System.Windows.Forms.NumericUpDown cbWarnningReleaseRetain4;
        private System.Windows.Forms.NumericUpDown cbWarnningReleaseRetain3;
        private System.Windows.Forms.Label lbPOVWR;
        private System.Windows.Forms.Label lbPLVWR;
        private System.Windows.Forms.NumericUpDown cbWarnningReleaseRetain10;
        private System.Windows.Forms.Label label185;
        private System.Windows.Forms.NumericUpDown cbWarnningReleaseRetain9;
        private System.Windows.Forms.NumericUpDown cbWarnningReleaseRetain8;
        private System.Windows.Forms.NumericUpDown cbWarnningReleaseRetain7;
        private System.Windows.Forms.NumericUpDown cbWarnningReleaseRetain6;
        private System.Windows.Forms.NumericUpDown cbWarnningReleaseRetain5;
        private System.Windows.Forms.NumericUpDown cbWarnningReleaseRetain2;
        private System.Windows.Forms.NumericUpDown cbWarnningReleaseRetain1;
        private System.Windows.Forms.Label lbLSOCWR;
        private System.Windows.Forms.Label lbCDWR;
        private System.Windows.Forms.Label lbCOVWR;
        private System.Windows.Forms.Label lbCLVWR;
        private System.Windows.Forms.Label lbCOTWR;
        private System.Windows.Forms.Label lbCLTWR;
        private System.Windows.Forms.Label lbCOAWR;
        private System.Windows.Forms.Label lbDOAWR;
        private System.Windows.Forms.CheckBox cbProtectEnable14;
        private System.Windows.Forms.CheckBox cbProtectEnable13;
        private System.Windows.Forms.CheckBox cbProtectEnable12;
        private System.Windows.Forms.NumericUpDown cbProtectRetainTime13;
        private System.Windows.Forms.NumericUpDown cbProtectRetainTime14;
        private System.Windows.Forms.NumericUpDown cbProtectRetainTime12;
        private System.Windows.Forms.NumericUpDown cbProtectValue14;
        private System.Windows.Forms.NumericUpDown cbProtectValue13;
        private System.Windows.Forms.Label lbCommunicationErrorP;
        private System.Windows.Forms.NumericUpDown cbProtectValue12;
        private System.Windows.Forms.Label lbSLMP;
        private System.Windows.Forms.Label lbCurrentSensorErrorP;
        private System.Windows.Forms.Label lbinterLockErrorP;
        private System.Windows.Forms.Label lbSelfSystemDiagP;
        private System.Windows.Forms.Label lbinterLockErrorPR;
        private System.Windows.Forms.Label lbSelfSystemDiagPR;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseRetain13;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseRetain14;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseRetain12;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseValue14;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseValue13;
        private System.Windows.Forms.Label lbCommunicationErrorPR;
        private System.Windows.Forms.NumericUpDown cbProtectReleaseValue12;
        private System.Windows.Forms.Label lbSLMPR;
        private System.Windows.Forms.Label lbCurrentSensorErrorPR;
        private System.Windows.Forms.Label lbCDP;
        private System.Windows.Forms.GroupBox gbWarnningSet;
        private System.Windows.Forms.CheckBox cbWarnningEnable4;
        private System.Windows.Forms.CheckBox cbWarnningEnable3;
        private System.Windows.Forms.NumericUpDown cbWarnningValue4;
        private System.Windows.Forms.NumericUpDown cbWarnningValue3;
        private System.Windows.Forms.Label lbPLVW;
        private System.Windows.Forms.CheckBox cbWarnningEnable11;
        private System.Windows.Forms.CheckBox cbWarnningEnable10;
        private System.Windows.Forms.CheckBox cbWarnningEnable9;
        private System.Windows.Forms.CheckBox cbWarnningEnable8;
        private System.Windows.Forms.CheckBox cbWarnningEnable7;
        private System.Windows.Forms.CheckBox cbWarnningEnable6;
        private System.Windows.Forms.CheckBox cbWarnningEnable5;
        private System.Windows.Forms.CheckBox cbWarnningEnable2;
        private System.Windows.Forms.CheckBox cbWarnningEnable1;
        private System.Windows.Forms.Label label186;
        private System.Windows.Forms.NumericUpDown cbWarnningRetainTime4;
        private System.Windows.Forms.Label lbCOAW;
        private System.Windows.Forms.NumericUpDown cbWarnningRetainTime3;
        private System.Windows.Forms.NumericUpDown cbWarnningValue11;
        private System.Windows.Forms.NumericUpDown cbWarnningValue10;
        private System.Windows.Forms.Label lbLSOCW;
        private System.Windows.Forms.NumericUpDown cbWarnningValue9;
        private System.Windows.Forms.NumericUpDown cbWarnningValue8;
        private System.Windows.Forms.NumericUpDown cbWarnningValue7;
        private System.Windows.Forms.NumericUpDown cbWarnningValue6;
        private System.Windows.Forms.NumericUpDown cbWarnningValue5;
        private System.Windows.Forms.NumericUpDown cbWarnningValue2;
        private System.Windows.Forms.NumericUpDown cbWarnningRetainTime10;
        private System.Windows.Forms.NumericUpDown cbWarnningValue1;
        private System.Windows.Forms.NumericUpDown cbWarnningRetainTime11;
        private System.Windows.Forms.Label lbCDW;
        private System.Windows.Forms.Label lbDOAW;
        private System.Windows.Forms.Label lbLSOHW;
        private System.Windows.Forms.Label label127;
        private System.Windows.Forms.NumericUpDown cbWarnningRetainTime9;
        private System.Windows.Forms.Label lbCLTW;
        private System.Windows.Forms.NumericUpDown cbWarnningRetainTime8;
        private System.Windows.Forms.Label lbCOTW;
        private System.Windows.Forms.Label lbCLVW;
        private System.Windows.Forms.NumericUpDown cbWarnningRetainTime7;
        private System.Windows.Forms.Label lbCOVW;
        private System.Windows.Forms.NumericUpDown cbWarnningRetainTime1;
        private System.Windows.Forms.NumericUpDown cbWarnningRetainTime6;
        private System.Windows.Forms.NumericUpDown cbWarnningRetainTime2;
        private System.Windows.Forms.NumericUpDown cbWarnningRetainTime5;
        private System.Windows.Forms.Label lbSerialStatus;
        private System.Windows.Forms.Label lbSerial;
        private System.Windows.Forms.Label lbWarnningStatus;
        private System.Windows.Forms.Label lbWarnning;
        private System.Windows.Forms.Label lbProtectStatus;
        private System.Windows.Forms.Label lbProtect;
        private System.Windows.Forms.Label lbCCVStateStatus;
        private System.Windows.Forms.Label lbCCVState;
        private System.Windows.Forms.Label lbOCVStateStatus;
        private System.Windows.Forms.Label lbOCVState;
        private System.Windows.Forms.Label lbStatus;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Button btFactoryInit;
        private System.Windows.Forms.Label lbPOVW;
        private System.Windows.Forms.GroupBox groupBox4;
        private System.Windows.Forms.Label lbMonitoringCycleTime;
        private System.Windows.Forms.TextBox tbMonitoringCycleTime;
        private System.Windows.Forms.Button btMonitoringCycleTimeSet;
        private System.Windows.Forms.GroupBox gbLoggingSetting;
        private System.Windows.Forms.Label label62;
        private System.Windows.Forms.TextBox tbLogPath;
        private System.Windows.Forms.TextBox tbLogFileName;
        private System.Windows.Forms.Button button4;
        private System.Windows.Forms.Button btLogPath;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Panel pnSaveFileRelease;
        private System.Windows.Forms.Button btLoadFileProtect;
        private System.Windows.Forms.Button btSaveFileProtect;
        private System.Windows.Forms.Panel pnSaveFile;
        private System.Windows.Forms.Button btLoadFile;
        private System.Windows.Forms.Button btSaveFile;
        private System.Windows.Forms.Label ICStatus;
        private System.Windows.Forms.Label lbIC;
    }
}

