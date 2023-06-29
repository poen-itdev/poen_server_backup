using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.IO;
using System.Diagnostics;
using System.Reflection;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net.NetworkInformation;

namespace KCL_reBMS_Prj
{
    public partial class MainForm : Form
    {
        public const string RESOURCE_PATH = "\\Image\\";
   

        ClassCommon clsCm = new ClassCommon();
        ClassCommunication clsComm = new ClassCommunication();

        int iErrCode = 0;
        byte iMax17841b_No_Rx;
        byte iSensingLineErr_Rx;
        AllView_Form detailForm = new AllView_Form();
        public MainForm()
        {
            InitializeComponent();
        }
        string GetTimeForLog()
        {
            return string.Format("{0,-16}", DateTime.Now.TimeOfDay).Substring(0, 12);
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            string path = Directory.GetCurrentDirectory() + RESOURCE_PATH + "main_2.png";
            Image img = Image.FromFile(path);
            Bitmap imgbitmap = new Bitmap(img);
            Image resizedImage = resizeImage(imgbitmap, pbPoenLogo.Size);
            pbPoenLogo.Image = resizedImage;
            clsComm.OnCommMessage += new ClassCommunication.CommunicationMessageHandler(clsComm_OnCommMessage);

            string strLogFile;
            string line;
            string data1 = "1";
            // this.Size = new Size(1254, 908);
            try
            {
                strLogFile = string.Format("config.txt");
                StreamReader file = new StreamReader(strLogFile);
                while ((line = file.ReadLine()) != null)
                {
                    if (line.Contains("PORT = ")) data1 = line.Substring(7, (line.Length - 7));
                }
                file.Close();
                cbPort.SelectedIndex = Convert.ToInt32(data1) - 1;
            }
            catch
            {
                // Can't Find Config File
            }
        }

        delegate void OnCommMessageDelegate(ClassCommunication.ClassCommunicationMsg clsCommMessage);
        void clsComm_OnCommMessage(object obj, ClassCommunication.ClassCommunicationEventArgs args)
        {
            try
            {
                OnCommMessageDelegate deleOnCommMsg = new OnCommMessageDelegate(OnCommMessage);
                this.Invoke(deleOnCommMsg, new object[] { args.clsCommMsg });
            }
            catch
            {
            }
        }

        void OnCommMessage(ClassCommunication.ClassCommunicationMsg clsCommMsg)
        {
            ClassCommunication.Communication_Message messageType = (ClassCommunication.Communication_Message)clsCommMsg.iMessage;
            StringBuilder sb = new StringBuilder();
            Double itemp, itemp2;

            switch (clsCommMsg.iMessage)
            {
                case (int)ClassCommunication.Communication_Message.ThreadRun:
                    break;
                case (int)ClassCommunication.Communication_Message.ThreadException:
                    break;
                case (int)ClassCommunication.Communication_Message.PortOpen:
                    break;
                case (int)ClassCommunication.Communication_Message.PortClose:
                    break;
                case (int)ClassCommunication.Communication_Message.PortCantOpen:
                    logError("포트가 없거나 이미 사용중입니다." + "\r\n");
                    MessageBox.Show("포트가 없거나 이미 사용중입니다.", "알람", MessageBoxButtons.OK, MessageBoxIcon.Question);
                    break;
                case (int)ClassCommunication.Communication_Message.PortException:
                    break;
                case (int)ClassCommunication.Communication_Message.PacketSend:
                    logInfo(GetTimeForLog() + "TX: " + clsCm.ByteArrToHexStr(clsCommMsg.byResponseData, clsCommMsg.iResponseLength, "_") + "\r\n", false);
                    break;
                case (int)ClassCommunication.Communication_Message.PacketReceive:
                    logInfo(GetTimeForLog() + "RX: " + clsCm.ByteArrToHexStr(clsCommMsg.byResponseData, clsCommMsg.iResponseLength) + "\r\n", false);

                    if (clsCommMsg.byResponseData[5] == 0x30) //Mornitoring status
                    {
                        Monitoring(clsCommMsg.byResponseData);
                    }
                    else if (clsCommMsg.byResponseData[5] == 0X00)
                    {
                        Version(clsCommMsg.byResponseData);
                    }
                    else if (clsCommMsg.byResponseData[5] == 0X01)
                    {
                        FactoryResetStatus(clsCommMsg.byResponseData);
                    }
                    else if (clsCommMsg.byResponseData[5] == 0X02)
                    {
                        RelayStatus(clsCommMsg.byResponseData);
                    }
                    else if (clsCommMsg.byResponseData[5] == 0X20)
                    {
                        SOCResetStatus(clsCommMsg.byResponseData);
                    }
                    else if (clsCommMsg.byResponseData[5] == 0X21)
                    {
                        SOHResetStatus(clsCommMsg.byResponseData);
                    }
                    else if (clsCommMsg.byResponseData[5] == 0X10)
                    {
                        WarnningEnableStatus(clsCommMsg.byResponseData);
                    }
                    else if (clsCommMsg.byResponseData[5] == 0X11)
                    {
                        WarnningStatus(clsCommMsg.byResponseData);
                    }
                    else if (clsCommMsg.byResponseData[5] == 0X12)
                    {
                        WarnningReleaseStatus(clsCommMsg.byResponseData);
                    }
                    else if (clsCommMsg.byResponseData[5] == 0X13)
                    {
                        ProtectionEnableStatus(clsCommMsg.byResponseData);
                    }
                    else if (clsCommMsg.byResponseData[5] == 0X14)
                    {
                        ProtectionStatus(clsCommMsg.byResponseData);
                    }
                    else if (clsCommMsg.byResponseData[5] == 0X15)
                    {
                        ProtectionReleaseStatus(clsCommMsg.byResponseData);
                    }

                    break;
                case (int)ClassCommunication.Communication_Message.NoPacketReceive:
                    break;
                case (int)ClassCommunication.Communication_Message.PacketTimeout:
                     logError(GetTimeForLog() + "응답대기시간초과\r\n");
                    break;
                case (int)ClassCommunication.Communication_Message.StringMessage:
                    logInfo(clsCommMsg.strMessage + "\r\n", false);
                    break;
            }
        }

        void Monitoring(byte[] data)
        {
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_GET_MONITORING;
        }

        void Version(byte[] data)
        {
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_VERSION_GET;
        }

        void FactoryResetStatus(byte[] data)
        {
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_FACTORY_RESET;
        }
        void RelayStatus(byte[] data)
        {
            if (data[7] == 0x01)
            {
                ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_RLYON;
            }
            else if (data[7] == 0x02)
            {
                ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_RLYOFF;
            }
            
        }

        void SOCResetStatus(byte[] data)
        {
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_SOC_SET;
        }

        void SOHResetStatus(byte[] data)
        {
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_SOH_SET;
        }

        void WarnningEnableStatus(byte[] data)
        {
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_WARNNING_ENABLE;
        }

        void WarnningStatus(byte[] data)
        {
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_WARNNING_GET;
        }

        void WarnningReleaseStatus(byte[] data)
        {
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_WARNNING_RELEASE_GET;
        }

        void ProtectionEnableStatus(byte[] data)
        {
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_PROTECT_ENABLE_GET;
        }

        void ProtectionStatus(byte[] data)
        {
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_PROTECT_GET;
        }

        void ProtectionReleaseStatus(byte[] data)
        {
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_PROTECT_RELEASE_GET;
        }

        public static Image resizeImage(Image imgToResize, Size size)
        {
            return (Image)(new Bitmap(imgToResize, size));
        }

        private void Form1_Paint(object sender, PaintEventArgs e)
        {
        }

        private void textProgressBar1_Click(object sender, EventArgs e)
        {
        }

        private void userLED11_Click(object sender, EventArgs e)//고전압
        {
            //  userLED11.Toggle_Image();
            //if(TogIcon_1.get_Image() == 0)
            //{
            //    TogIcon_1.Set_Image(1);
            //    ClassCommunication.Covp_enable = 0;
            //    lbCellOverVoltageProtection.BackColor = System.Drawing.Color.DarkGray;
            //}
            //else
            //{
            //    TogIcon_1.Set_Image(0);
            //    ClassCommunication.Covp_enable = 1;
            //}
        }

        private void userLED2_Click(object sender, EventArgs e) //저전압
        {
            //if (TogIcon_2.get_Image() == 0)
            //{
            //    TogIcon_2.Set_Image(1);
            //    ClassCommunication.Cuvp_enable = 0;
            //    lbCellLowVoltageProtection.BackColor = System.Drawing.Color.DarkGray;
            //}
            //else
            //{
            //    TogIcon_2.Set_Image(0);
            //    ClassCommunication.Cuvp_enable = 1;
            //}
        }

        private void userLED3_Click(object sender, EventArgs e) // 고온
        {
            //if (TogIcon_3.get_Image() == 0)
            //{
            //    TogIcon_3.Set_Image(1);
            //    ClassCommunication.Cotp_enable = 0;
            //    lbCellHighTemperatureProtection.BackColor = System.Drawing.Color.DarkGray;
            //}
            //else
            //{
            //    TogIcon_3.Set_Image(0);
            //    ClassCommunication.Cotp_enable = 1;
            //}
        }

        private void userLED4_Click(object sender, EventArgs e) // 저온
        {
            //if (TogIcon_4.get_Image() == 0)
            //{
            //    TogIcon_4.Set_Image(1);
            //    ClassCommunication.Cutp_enable = 0;
            //    lbCellLowTemperatureProtection.BackColor = System.Drawing.Color.DarkGray;
            //}
            //else
            //{
            //    TogIcon_4.Set_Image(0);
            //    ClassCommunication.Cutp_enable = 1;
            //}
        }

        private void userLED5_Click(object sender, EventArgs e) // 충전 과전류
        {
            //if (TogIcon_5.get_Image() == 0)
            //{
            //    TogIcon_5.Set_Image(1);
            //    ClassCommunication.Cocp_enable = 0;
            //    lbCellChargeOverCurrentProtection.BackColor = System.Drawing.Color.DarkGray;
            //}
            //else
            //{
            //    TogIcon_5.Set_Image(0);
            //    ClassCommunication.Cocp_enable = 1;
            //}
        }

        private void userLED6_Click(object sender, EventArgs e) // 방전 과전류
        {
            //if (TogIcon_6.get_Image() == 0)
            //{
            //    TogIcon_6.Set_Image(1);
            //    ClassCommunication.Docp_enable = 0;
            //    lbCellOverCurrentProtection.BackColor = System.Drawing.Color.DarkGray;
            //}
            //else
            //{
            //    TogIcon_6.Set_Image(0);
            //    ClassCommunication.Docp_enable = 1;
            //}
        }

        private void userLED7_Click(object sender, EventArgs e) // 셀편차
        {
            //if (TogIcon_7.get_Image() == 0)
            //{
            //    TogIcon_7.Set_Image(1);
            //    ClassCommunication.Civp_enable = 0;
            //    lbCellDeviationProtection.BackColor = System.Drawing.Color.DarkGray;
            //}
            //else
            //{
            //    TogIcon_7.Set_Image(0);
            //    ClassCommunication.Civp_enable = 1;
            //}
        }

        private void userLED8_Click(object sender, EventArgs e)
        {
            //if (TogIcon_8.get_Image() == 0)
            //{
            //    TogIcon_8.Set_Image(1);
            //    ClassCommunication.Sensingline_enable = 0;
            //    label141.BackColor = System.Drawing.Color.DarkGray;
            //}
            //else
            //{
            //    TogIcon_8.Set_Image(0);
            //    ClassCommunication.Sensingline_enable = 1;
            //}
        }

        private void tb_25A_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!(Char.IsDigit(e.KeyChar)) && e.KeyChar != '.' && e.KeyChar != 8 && e.KeyChar != '-')
            {
                e.Handled = true;
            }
        }

        private void btRelayOn_Click(object sender, EventArgs e)
        {
            RelayOn();
        }

        private void btConnect_Click(object sender, EventArgs e)
        {
            if (clsComm.isCommConnected)
            {
                clsComm.StopThread();
                logInfo("Try Serial Disconnect");
            }
            else
            {
                string strConfigFile;
                try
                {
                    strConfigFile = string.Format("config.txt");
                    StreamWriter file = new StreamWriter(strConfigFile);
                    file.WriteLine("PORT = " + (cbPort.SelectedIndex + 1));
                    file.Close();
                }
                catch
                {
                    // Can't Find Config File
                }
                clsComm.SetSerial(cbPort.SelectedIndex + 1, 115200);
                clsComm.StartThread();
                //ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_VERSION_GET;
                logInfo("Try Serial Connect");
            }
        }

        private void Form1_Resize(object sender, EventArgs e)
        {
            string path = Directory.GetCurrentDirectory() + RESOURCE_PATH + "main_2.png";
            Image img = Image.FromFile(path);
            Image resizedImage;
            Bitmap imgbitmap = new Bitmap(img);
            if (pbPoenLogo.Size.Width != 0 && pbPoenLogo.Size.Height != 0)
            {
                resizedImage = resizeImage(imgbitmap, pbPoenLogo.Size);
                pbPoenLogo.Image = resizedImage;
            }
        }
        private void btLoggingStart_Click(object sender, EventArgs e)
        {


            string path = Directory.GetCurrentDirectory() + @"\Config.json";
            JObject configData = new JObject(

            ); 

            File.WriteAllText(path, configData.ToString());
    

        }

        private void btLogPath_Click(object sender, EventArgs e)
        {
            FolderBrowserDialog dialog = new FolderBrowserDialog();

            dialog.ShowDialog();
            string selected = dialog.SelectedPath;

            if (dialog.SelectedPath.IndexOfAny(System.IO.Path.GetInvalidPathChars()) == -1)
            {
               
            }
            else
            {
                MessageBox.Show("파일경로가 올바르지 않습니다.");
            }

        }

        void ProtectEnable()
        {
           

            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_PROTECT_ENABLE;
        }

        void ProtectionSetting()
        {
           
            logInfo("Set Protect Value and RetaiN");
            logInfo("PCell_OverVoltage:" + clsComm.commData.PsetCellOverVoltage);
            logInfo("PCell_UnderVoltage:" + clsComm.commData.PsetCellUnderVoltage);
            logInfo("PPack_OverVoltage:" + clsComm.commData.PsetPackOverVoltage);
            logInfo("PPack_UnderVoltage:" + clsComm.commData.PsetPackUnderVoltage);
            logInfo("PCell_VoltageDiff:" + clsComm.commData.PsetCellVoltDiff);
            logInfo("PCell_OverTemp:" + clsComm.commData.PsetCellOverTemp);
            logInfo("PCell_UnderTemp:" + clsComm.commData.PsetCellUnderTemp);
            logInfo("PCharging_OverCurrent:" + clsComm.commData.PsetChargeOverCurrent);
            logInfo("PDisCharging_OverCurrent:" + clsComm.commData.PsetDischargeOverCurrent);
            logInfo("PSensing_LineMeasure:" + clsComm.commData.PsetSensingLineMeasure);
            logInfo("PCommunication_Error:" + clsComm.commData.PsetCommunicationError);
            logInfo("PCurrent_SensorError:" + clsComm.commData.PsetCurrentSensorError);
            logInfo("PInterLock_Error:" + clsComm.commData.PsetInterLockError);
            logInfo("PSelfSystem_Diag:" + clsComm.commData.PsetSelfSystemDiag);
            logInfo("PLow_SOC:" + clsComm.commData.PsetLowSOC);
            logInfo("PLow_SOH:" + clsComm.commData.PsetLowSOH);

            logInfo("PCellOverVoltageRetain:" + clsComm.commData.PsetCellOverVoltage);
            logInfo("PCellUnderVoltageRetain:" + clsComm.commData.PsetCellUnderVoltage);
            logInfo("PPackOverVoltageRetain:" + clsComm.commData.PsetPackOverVoltage);
            logInfo("PPackUnderVoltageRetain:" + clsComm.commData.PsetPackUnderVoltage);
            logInfo("PCellVoltageDiffRetain:" + clsComm.commData.PsetCellVoltDiff);
            logInfo("PCellOverTempRetain:" + clsComm.commData.PsetCellOverTemp);
            logInfo("PCellUnderTempRetain:" + clsComm.commData.PsetCellUnderTemp);
            logInfo("PCharging_OverCurrentRetain:" + clsComm.commData.PsetChargeOverCurrent);
            logInfo("PDisCharging_OverCurrentRetain:" + clsComm.commData.PsetDischargeOverCurrent);
            logInfo("PSensingLineMeasureRetain:" + clsComm.commData.PsetSensingLineMeasure);
            logInfo("PCommunicationErrorRetain:" + clsComm.commData.PsetCommunicationError);
            logInfo("PCurrentSensorErrorRetain:" + clsComm.commData.PsetCurrentSensorErrorRetain);
            logInfo("PInterLockErrorRetain:" + clsComm.commData.PsetInterLockErrorRetain);
            logInfo("PSelfSystemDiagRetain:" + clsComm.commData.PsetSelfSystemDiagRetain);
            logInfo("PLow_SOCRetain:" + clsComm.commData.PsetLowSOCRetain);
            logInfo("PLow_SOHRetain:" + clsComm.commData.PsetLowSOHRetain);

            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_PROTECT_SET;
        }

        void ProtectionReleaseSetting()
        {
           

            logInfo("Set Protect Release Value and Retain");
            logInfo("PRCell_OverVoltage:" + clsComm.commData.PsetCellOverVoltage);
            logInfo("PRCell_UnderVoltage:" + clsComm.commData.PsetCellUnderVoltage);
            logInfo("PRPack_OverVoltage:" + clsComm.commData.PsetPackOverVoltage);
            logInfo("PRPack_UnderVoltage:" + clsComm.commData.PsetPackUnderVoltage);
            logInfo("PRCell_VoltageDiff:" + clsComm.commData.PsetCellVoltDiff);
            logInfo("PRCell_OverTemp:" + clsComm.commData.PsetCellOverTemp);
            logInfo("PRCell_UnderTemp:" + clsComm.commData.PsetCellUnderTemp);
            logInfo("PRCharging_OverCurrent:" + clsComm.commData.PsetChargeOverCurrent);
            logInfo("PRDisCharging_OverCurrent:" + clsComm.commData.PsetDischargeOverCurrent);
            logInfo("PRSensing_LineMeasure:" + clsComm.commData.PsetSensingLineMeasure);
            logInfo("PRCommunication_Error:" + clsComm.commData.PsetCommunicationError);
            logInfo("PR+Current_SensorError:" + clsComm.commData.PsetCurrentSensorError);
            logInfo("PRInterLock_Error:" + clsComm.commData.PsetInterLockError);
            logInfo("PRSelfSystem_Diag:" + clsComm.commData.PsetSelfSystemDiag);
            logInfo("PRLow_SOC:" + clsComm.commData.PsetLowSOC);
            logInfo("PRLow_SOH:" + clsComm.commData.PsetLowSOH);
                      
            logInfo("PRCellOverVoltageRetain:" + clsComm.commData.PsetCellOverVoltage);
            logInfo("PRCellUnderVoltageRetain:" + clsComm.commData.PsetCellUnderVoltage);
            logInfo("PRPackOverVoltageRetain:" + clsComm.commData.PsetPackOverVoltage);
            logInfo("PRPackUnderVoltageRetain:" + clsComm.commData.PsetPackUnderVoltage);
            logInfo("PRCellVoltageDiffRetain:" + clsComm.commData.PsetCellVoltDiff);
            logInfo("PRCellOverTempRetain:" + clsComm.commData.PsetCellOverTemp);
            logInfo("PRCellUnderTempRetain:" + clsComm.commData.PsetCellUnderTemp);
            logInfo("PRCharging_OverCurrentRetain:" + clsComm.commData.PsetChargeOverCurrent);
            logInfo("PRDisCharging_OverCurrentRetain:" + clsComm.commData.PsetDischargeOverCurrent);
            logInfo("PRSensingLineMeasureRetain:" + clsComm.commData.PsetSensingLineMeasure);
            logInfo("PRCommunicationErrorRetain:" + clsComm.commData.PsetCommunicationError);
            logInfo("PR+CurrentSensorErrorRetain:" + clsComm.commData.PsetCurrentSensorErrorRetain);
            logInfo("PRInterLockErrorRetain:" + clsComm.commData.PsetInterLockErrorRetain);
            logInfo("PRSelfSystemDiagRetain:" + clsComm.commData.PsetSelfSystemDiagRetain);
            logInfo("PRLow_SOCRetain:" + clsComm.commData.PsetLowSOCRetain);
            logInfo("PRLow_SOHRetain:" + clsComm.commData.PsetLowSOHRetain);
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_PROTECT_RELEASE_SET;
        }

        void RelayOn()
        {
     
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_RLYON;
        }

        void RelayOff()
        {
            
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_RLYOFF;
        }

        void WarnningEnable()
        {
           
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_WARNNING_ENABLE;
        }

        void WarnningSetting()
        {

            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_WARNNING_SET;
        }

        void WarnningReleaseSetting()
        {
            

            logInfo("Set Warnning Release");              
            logInfo("WRsetCellOverVoltage:"             + clsComm.commData.WRsetCellOverVoltage);
            logInfo("WRsetCellUnderVoltage:"            + clsComm.commData.WRsetCellUnderVoltage);
            logInfo("WRsetPackOverVoltage:"             + clsComm.commData.WRsetPackOverVoltage);
            logInfo("WRsetPackUnderVoltage:"            + clsComm.commData.WRsetPackUnderVoltage);
            logInfo("WRsetCellVoltDiff:"                + clsComm.commData.WRsetCellVoltDiff);
            logInfo("WRsetCellOverTemp:"                + clsComm.commData.WRsetCellOverTemp);
            logInfo("WRsetCellUnderTemp:"               + clsComm.commData.WRsetCellUnderTemp);
            logInfo("WRsetChargeOverCurrent:"           + clsComm.commData.WRsetChargeOverCurrent);
            logInfo("WRsetDischargeOverCurrent:"        + clsComm.commData.WRsetDischargeOverCurrent);
            logInfo("WRsetLowSOC:"                      + clsComm.commData.WRsetLowSOC);
            logInfo("WRsetLowSOH:"                      + clsComm.commData.WRsetLowSOH);
            logInfo("WRsetCellOverVoltageRetain:"       + clsComm.commData.WRsetCellOverVoltageRetain);
            logInfo("WRsetCellUnderVoltage Retain:"     + clsComm.commData.WRsetCellUnderVoltageRetain    );
            logInfo("WRsetPackOverVoltage Retain:"      + clsComm.commData.WRsetPackOverVoltageRetain     );
            logInfo("WRsetPackUnderVoltage Retain:"     + clsComm.commData.WRsetPackUnderVoltageRetain    );
            logInfo("WRsetCellVoltDiff Retain:"         + clsComm.commData.WRsetCellVoltDiffRetain        );
            logInfo("WRsetCellOverTemp Retain:"         + clsComm.commData.WRsetCellOverTempRetain        );
            logInfo("WRsetCellUnderTemp Retain:"        + clsComm.commData.WRsetCellUnderTempRetain       );
            logInfo("WRsetChargeOverCurrent Retain:"    + clsComm.commData.WRsetChargeOverCurrentRetain   );
            logInfo("WRsetDischargeOverCurrent Retain:" + clsComm.commData.WRsetDischargeOverCurrentRetain);
            logInfo("WRsetLowSOC Retain:"               + clsComm.commData.WRsetLowSOCRetain              );
            logInfo("WRsetLowSOH Retain:"               + clsComm.commData.WRsetLowSOHRetain              );
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_WARNNING_RELEASE_SET;
        }

        void WarnningLoad()
        {
           
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_WARNNING_ENABLE_GET;
        }

        void ProtectionLoad()
        {
         
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_PROTECT_ENABLE_GET;
        }

        void SocSetting()
        {
          
            
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_SOC_SET;
        }

        void SohSetting()
        {
            
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_SOH_SET;
        }

        void SocReset()
        {
           
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_SOC_RESET;
        }

        void SohReset()
        {
          
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_SOH_RESET;
        }

        void FactoryInit()
        {
            
            ClassCommunication.iCURRENT_OP = ClassCommunication.CMD_SEND_FACTORY_RESET;
        }

        bool isPreCommConnected = true;
        int connecting_time;
        private void timer1_Tick(object sender, EventArgs e)
        {
            connecting_time++;
            if (connecting_time >= 100)
            {
                
            }
            if (isPreCommConnected != clsComm.isCommConnected)
            {
                isPreCommConnected = clsComm.isCommConnected;
                if (clsComm.isCommConnected)
                {
                    
                    btConnect.Text = "연결 끊기";
                    btConnect.BackColor = System.Drawing.Color.LightSkyBlue;
                   
                }
                else
                {
                    
                    btConnect.Text = "연결 하기";
                    btConnect.BackColor = System.Drawing.Color.Transparent;
                }
            }

            if (clsComm.isCommOngoing == false)
            {
              
            }
            else
            {
                
            }
        }

        static int Clicked_CMUbtn = 0;
        private void lbIC_Click(object sender, EventArgs e)
        {
            string name = ((Label)sender).Name.ToString();
            if (name.Equals("lb_IC1"))
            {
                Clicked_CMUbtn = 0;
                
            }
            else if (name.Equals("lb_IC2"))
            {
                Clicked_CMUbtn = 1;
                
            }
            else if (name.Equals("lb_IC3"))
            {
                Clicked_CMUbtn = 2;
                
            }
            else if (name.Equals("lb_IC4"))
            {
                Clicked_CMUbtn = 3;
                
            }
            else if (name.Equals("lb_IC5"))
            {
                Clicked_CMUbtn = 4;
                
            }
            else if (name.Equals("lb_IC6"))
            {
                Clicked_CMUbtn = 5;
               
            }
            else if (name.Equals("lb_IC7"))
            {
                Clicked_CMUbtn = 6;
                
            }
            else if (name.Equals("lb_IC8"))
            {
                Clicked_CMUbtn = 7;
               
            }
            else if (name.Equals("lb_IC9"))
            {
                Clicked_CMUbtn = 8;
                
            }
        }

        private void btRelayOFF_Click(object sender, EventArgs e)
        {
            RelayOff();
        }

        private void btVoltageView_Click(object sender, EventArgs e)
        {
            detailForm = new AllView_Form();
            detailForm.ShowDialog();
        }

        private void btProtectionSettingSave_Click(object sender, EventArgs e)
        {
            ProtectEnable();
        }

        private void btProtectionSettingLoad_Click(object sender, EventArgs e)
        {
            ProtectionLoad();
        }

        private void btWarnningSettingLoad_Click(object sender, EventArgs e)
        {
            WarnningLoad();
        }

        private void btWarnningSettingSave_Click(object sender, EventArgs e)
        {
            WarnningEnable();
        }

        private void btSetSOC_Click(object sender, EventArgs e)
        {
            SocSetting();   
        }

        private void btSetSOH_Click(object sender, EventArgs e)
        {
            SohSetting(); 
        }

        private void btInitSOC_Click(object sender, EventArgs e)
        {
            SocReset();
        }

        private void btInitSOH_Click(object sender, EventArgs e)
        {
            SohReset();
        }

        private void btFactoryInit_Click(object sender, EventArgs e)
        {
            FactoryInit();
        }

        public void logInfo(string msg, bool bDisplay = true)
        {

        }

        public void logWarnning(string msg, bool bDisplay = true)
        {

        }

        public void logError(string msg, bool bDisplay = true)
        {

           
            
        }

        public void logDebug(string msg, bool bDisplay = true)
        {

           
        }

        public void logFatal(string msg, bool bDisplay = true)
        {

           
        }
    }
}
