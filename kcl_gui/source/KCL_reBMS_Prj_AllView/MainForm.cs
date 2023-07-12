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
using System.Diagnostics.Eventing.Reader;

namespace KCL_reBMS_Prj
{
    public partial class MainForm : Form
    {
        public const string RESOURCE_PATH = "\\Image\\";
        logCommunication logcomm = new logCommunication();

        ClassCommon clsCm = new ClassCommon();
        ClassCommunication clsComm = new ClassCommunication();

        //BMS to GUI ? Set(false) or Get(true)
        bool bIsLoad = false;
        int iErrCode = 0;
        byte iMax17841b_No_Rx;
        byte iSensingLineErr_Rx;

        AllView_Form detailForm = new AllView_Form();
        public MainForm()
        {
            InitializeComponent();
            tbLogFileName.Text = @DateTime.Now.ToString("yyyy-MM-dd_HH_mm_ss") + ".csv";
            //tbLogFileName.Text = logcomm.getFileName();
            tbLogPath.Text = logcomm.getPath();
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
                    //logInfo(GetTimeForLog() + "TX: " + clsCm.ByteArrToHexStr(clsCommMsg.byResponseData, clsCommMsg.iResponseLength, "_") + "\r\n", false);
                    break;
                case (int)ClassCommunication.Communication_Message.PacketReceive:
                    //logInfo(GetTimeForLog() + "RX: " + clsCm.ByteArrToHexStr(clsCommMsg.byResponseData, clsCommMsg.iResponseLength) + "\r\n", false);

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
                        if (bIsLoad == false)
                        {
                            WarnningSetting();
                            gbWarnningSet.BackColor = Color.Red;
                        }
                        else
                        {
                            WarnningLoad();
                        }
                    }
                    else if (clsCommMsg.byResponseData[5] == 0X11)
                    {
                        WarnningStatus(clsCommMsg.byResponseData);
                        
                        if (bIsLoad == false)
                        {
                            WarnningReleaseSetting();
                            gbWarnningRelease.BackColor = Color.Red;
                        }
                        else
                            WarnningReleaseLoad();
                    }
                    else if (clsCommMsg.byResponseData[5] == 0X12)
                    {
                        WarnningReleaseStatus(clsCommMsg.byResponseData);
                        gbWarnningRelease.BackColor = Color.GreenYellow;
                    }
                    else if (clsCommMsg.byResponseData[5] == 0X13)
                    {
                        ProtectEnableStatus(clsCommMsg.byResponseData);
                        if (bIsLoad == false)
                        {
                            ProtectSetting();
                            gbProtectSet.BackColor = Color.Red;
                        }
                        else
                        {
                            ProtectLoad();
                        }
                    }
                    else if (clsCommMsg.byResponseData[5] == 0X14)
                    {
                        ProtectStatus(clsCommMsg.byResponseData);
                        gbProtectSet.BackColor = Color.GreenYellow;
                        if (bIsLoad == false)
                        {
                            ProtectReleaseSetting();
                            gbProtectRelease.BackColor = Color.Red;
                        }
                        else
                        {
                            ProtectReleaseLoad();
                        }
                    }
                    else if (clsCommMsg.byResponseData[5] == 0X15)
                    {
                        ProtectReleaseStatus(clsCommMsg.byResponseData);
                        gbProtectRelease.BackColor = Color.GreenYellow;
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

        bool bIsTitle = true;
        void Monitoring(byte[] data) // log file 내용 수정시 수정할 부분
        {
            bool bDisplay = false;
            bool bWarnning = false;
            bool bProtect = false;
            
            String strDataLog = "";
            if (bIsTitle == true) strDataLog += "Time,";
            else strDataLog += DateTime.Now.ToString("hh:mm:ss.fff") + ',';

            StringBuilder sb = new StringBuilder();
            Double itemp, itemp2;

            if (logcomm.getReady() == false) clsComm.commData.uDataLogCount = 0;
            else clsComm.commData.uDataLogCount++;
            itemp = Convert.ToInt32(clsComm.commData.uDataLogCount);
            if (bIsTitle == false)
            {
                strDataLog += itemp + ",";
            }
            else
            {
                clsComm.commData.uDataLogCount = 0;
                strDataLog += "Count" + ",";
            }

            itemp = Convert.ToInt32(clsComm.commData.MaxTemp); //Max Temp
            itemp = (itemp / 10) - 40;
            if(bIsTitle == false) strDataLog += itemp + ",";
            else strDataLog += "Max Temp" + ",";
            sb.AppendFormat("{0:0} ℃ ", itemp);
            lbMaxTempValue.Text = sb.ToString();
            sb.Remove(0, sb.Length);

            itemp = Convert.ToInt32(clsComm.commData.MinTemp); //Min Temp
            itemp = (itemp / 10) - 40;
            if (bIsTitle == false) strDataLog += itemp + ",";
            else strDataLog += "Min Temp" + ",";
            sb.AppendFormat("{0:0} ℃ ", itemp);
            lbMinTempValue.Text = sb.ToString();
            sb.Remove(0, sb.Length);

            itemp = Convert.ToInt32(clsComm.commData.MaxCell); //MaxCell
            itemp /= 1000;
            if (bIsTitle == false) strDataLog += itemp + ",";
            else strDataLog += "Max Cell" + ",";
            sb.AppendFormat("{0:0.000} V ", itemp);
            lbMaxCellVoltageValue.Text = sb.ToString();
            sb.Remove(0, sb.Length);

            itemp = Convert.ToInt32(clsComm.commData.MinCell); //MinCell
            itemp /= 1000;
            if (bIsTitle == false) strDataLog += itemp + ",";
            else strDataLog += "Min Cell" + ",";
            sb.AppendFormat("{0:0.000} V ", itemp);
            lbMinCellVoltageValue.Text = sb.ToString();
            sb.Remove(0, sb.Length);

            itemp = Convert.ToInt32(clsComm.commData.PVoltage); //Pack voltage
            itemp /= 10;
            if (bIsTitle == false) strDataLog += itemp + ",";
            else strDataLog += "Pack Voltage" + ",";
            sb.AppendFormat("{0:0.0} V ", itemp);
            lbPackVoltageValue.Text = sb.ToString();
            sb.Remove(0, sb.Length);

            itemp = Convert.ToInt32(clsComm.commData.Soc); //Soc
            itemp /= 100;
            if (bIsTitle == false) strDataLog += itemp + ",";
            else strDataLog += "SOC" + ",";
            sb.AppendFormat("{0:0.00} % ", itemp);
            lbFrontSocValue.Text = sb.ToString();
            tbSOC.Text = sb.ToString();
            sb.Remove(0, sb.Length);

            itemp = Convert.ToInt32(clsComm.commData.Soh); //Soh
            itemp /= 100;
            if (bIsTitle == false) strDataLog += itemp + ",";
            else strDataLog += "SOH" + ",";
            sb.AppendFormat("{0:0.00} % ", itemp);
            lbFrontSohValue.Text = sb.ToString();
            tbSOH.Text = sb.ToString();
            sb.Remove(0, sb.Length);

            itemp = Convert.ToInt32(clsComm.commData.Current); //raw Current
            itemp /= 10;
            itemp -= 300;
            if (bIsTitle == false) strDataLog += itemp + ",";
            else strDataLog += "Current" + ",";
            sb.AppendFormat("{0:0.00} A ", itemp);
            lbCurrentValue.Text = sb.ToString();
            sb.Remove(0, sb.Length);

            //ccc
            itemp = clsComm.commData.Ccc;
            itemp /= 100;
            if (bIsTitle == false) strDataLog += itemp + ",";
            else strDataLog += "CCC" + ",";
            sb.AppendFormat("{0:0.00} Ah ", itemp);
            lbCccValue.Text = sb.ToString();   // 충전적산량
            sb.Remove(0, sb.Length);

            //cdc
            itemp = clsComm.commData.Cdc; 
            itemp /= 100;
            if (bIsTitle == false) strDataLog += itemp + ",";
            else strDataLog += "CDC" + ",";
            sb.AppendFormat("{0:0.00} Ah ", itemp);
            lbCdcValue.Text = sb.ToString();   // 방전적산량
            sb.Remove(0, sb.Length);           

            itemp = clsComm.commData.max17841b[Clicked_CMUbtn].Voltage[0];
            itemp /= 1000;
            sb.AppendFormat("{0:0.000} V ", itemp);
            lbCell1Value.Text = sb.ToString();
            sb.Remove(0, sb.Length);

            itemp = clsComm.commData.max17841b[Clicked_CMUbtn].Voltage[1];
            itemp /= 1000;
            sb.AppendFormat("{0:0.000} V ", itemp);
            lbCell2Value.Text = sb.ToString();
            sb.Remove(0, sb.Length);

            itemp = clsComm.commData.max17841b[Clicked_CMUbtn].Voltage[2];
            itemp /= 1000;
            sb.AppendFormat("{0:0.000} V ", itemp);
            lbCell3Value.Text = sb.ToString();
            sb.Remove(0, sb.Length);

            itemp = clsComm.commData.max17841b[Clicked_CMUbtn].Voltage[3];
            itemp /= 1000;
            sb.AppendFormat("{0:0.000} V ", itemp);
            lbCell4Value.Text = sb.ToString();
            sb.Remove(0, sb.Length);

            itemp = clsComm.commData.max17841b[Clicked_CMUbtn].Voltage[4];
            itemp /= 1000;
            sb.AppendFormat("{0:0.000} V ", itemp);
            lbCell5Value.Text = sb.ToString();
            sb.Remove(0, sb.Length);

            itemp = clsComm.commData.max17841b[Clicked_CMUbtn].Voltage[5];
            itemp /= 1000;
            sb.AppendFormat("{0:0.000} V ", itemp);
            lbCell6Value.Text = sb.ToString();
            sb.Remove(0, sb.Length);

            itemp = clsComm.commData.max17841b[Clicked_CMUbtn].Voltage[6];
            itemp /= 1000;
            sb.AppendFormat("{0:0.000} V ", itemp);
            lbCell7Value.Text = sb.ToString();
            sb.Remove(0, sb.Length);

            itemp = clsComm.commData.max17841b[Clicked_CMUbtn].Voltage[7];
            itemp /= 1000;
            sb.AppendFormat("{0:0.000} V ", itemp);
            lbCell8Value.Text = sb.ToString();
            sb.Remove(0, sb.Length);

            itemp = clsComm.commData.max17841b[Clicked_CMUbtn].Voltage[8];
            itemp /= 1000;
            sb.AppendFormat("{0:0.000} V ", itemp);
            lbCell9Value.Text = sb.ToString();
            sb.Remove(0, sb.Length);

            if ((Clicked_CMUbtn != 2) && (Clicked_CMUbtn != 5))
            {
                itemp = clsComm.commData.max17841b[Clicked_CMUbtn].Voltage[9];
                itemp /= 1000;
                sb.AppendFormat("{0:0.000} V ", itemp);
                lbCell10Value.Text = sb.ToString();
                sb.Remove(0, sb.Length);
                lbCell10Value.Visible = true;
                lbCell10.Visible = true;
            } 
            else
            {
                lbCell10Value.Visible = false;
                lbCell10.Visible = false;
            }

            //data log : voltage
            int index = 1;
            for (int i = 0; i < ClassData.CMUEA; i++)
            {
                for (int k = 0; k < 10; k++)
                {
                    if ((i == 2 && k == 9) || (i == 5 && k == 9)) continue;
                    
                    itemp = clsComm.commData.max17841b[i].Voltage[k];
                    itemp /= 1000;
                    if (bIsTitle == false) strDataLog += itemp + ",";
                    else strDataLog += "V" + index + ",";
                    index++;
                }
            }

            //data log : temp
            index = 1;
            for (int i = 0; i < ClassData.CMUEA; i++)
            {
                for (int k = 0; k < ClassData.TEMPEA; k++)
                {
                    if(k == 3)
                    {
                        if (bIsTitle == false) strDataLog += "-,";
                        else strDataLog += "T" + index + ",";
                        index++;

                        continue;
                    }

                    itemp = clsComm.commData.max17841b[i].Temperature[k];
                    itemp = (itemp / 10) - 40;
                    if (itemp > -50)
                    {
                        if (bIsTitle == false) strDataLog += itemp + ",";
                        else strDataLog += "T" + index + ",";
                    } else
                    {
                        if (bIsTitle == false) strDataLog += "-,";
                        else strDataLog += "T" + index + ",";
                    }
                    index++;
                }
            }

            //data log : balance
            index = 1;
            for (int i = 0; i < ClassData.CMUEA; i++)
            {
                int ibalancing = clsComm.commData.max17841b[i].CellBalancing[0] * 256;
                ibalancing += clsComm.commData.max17841b[i].CellBalancing[1];
                for (int k = 0; k < 10; k++)
                {
                    if ((i == 2 && k == 9) || (i == 5 && k == 9)) continue;

                    int value = 0;
                    itemp = ibalancing & (0x01 << k);
                    if (itemp != 0) value = 1;
                    if (bIsTitle == false) strDataLog += value + ",";
                    else strDataLog += "Balancing" + index + ",";
                    index++;
                }
            }

            logDataInfo(strDataLog);
            logInfo("[BMS -> GUI] monitoring data received");

            bIsTitle = false;

            Form fc = Application.OpenForms["AllView_Form"]; // 폼 열려있는지 확인
            for (int i = 0; i < ClassData.CMUEA; i++)
            {
                for (int k = 0; k < 10; k++)
                {
                    if ((i == 2 && k == 9) || (i == 5 && k == 9)) continue;

                    itemp = clsComm.commData.max17841b[i].Voltage[k];
                    itemp /= 1000;

                    sb.AppendFormat("{0:0.000} V ", itemp);
                    if (fc != null)
                    {
                        detailForm.set_Voltage((byte)i, (byte)k, sb.ToString());
                        logInfo("[monitoring] CMU :" + i + " Cell :" + k + " Voltage:" + sb.ToString(), bDisplay);
                    }
                    sb.Remove(0, sb.Length);
                }

                for(int k = 0; k < ClassData.TEMPEA; k++)
                {
                    if (k == 3)
                    {
                        sb.AppendFormat(" - ℃");
                    }
                    else
                    {
                        itemp = clsComm.commData.max17841b[i].Temperature[k];
                        itemp = (itemp / 10) - 40;
                        if (itemp > -50)
                        {
                            sb.AppendFormat("{0:0} ℃", itemp);
                        } else
                        {
                            sb.AppendFormat("- ℃");
                        }
                    }
                    if (fc != null)
                    {
                        detailForm.set_Temper((byte)i, (byte)k, sb.ToString());
                        logInfo("[monitoring] CMU :" + i + " Cell :" + k + " Temp:" + sb.ToString(), bDisplay);
                    }
                    sb.Remove(0, sb.Length);
                }

                int ibalancing = clsComm.commData.max17841b[i].CellBalancing[0] * 256;
                ibalancing += clsComm.commData.max17841b[i].CellBalancing[1];
                for (int k = 0; k < 10; k++)
                {
                    bool bSetted = false;

                    if ((i == 2 && k == 9) || (i == 5 && k == 9)) continue;

                    itemp = ibalancing & (0x01 << k);
                    if (itemp != 0) bSetted = true; 
                    if (fc != null)
                    {
                        detailForm.set_Balancing((byte)i, (byte)k, bSetted);
                        if(bSetted == true) logInfo("[monitoring] CMU :" + i + " Cell :" + k + " balancing:" + "true", bDisplay);
                        else logInfo("[monitoring] CMU :" + i + " Cell :" + k + " balancing:" + "false", bDisplay);
                    }
                    sb.Remove(0, sb.Length);
                }
            }

            itemp = Convert.ToInt32(clsComm.commData.max17841b[Clicked_CMUbtn].Temperature[0]);
            itemp = (itemp / 10) - 40; 
            if(itemp > -50) {
                sb.AppendFormat("{0:0} ℃ ", itemp);
                lbTemp1Value.Text = sb.ToString();
                sb.Remove(0, sb.Length);
            } else {
                sb.AppendFormat("- ℃ ");
                lbTemp1Value.Text = sb.ToString();
                sb.Remove(0, sb.Length);
            }

            //Temp 2
            itemp = Convert.ToInt32(clsComm.commData.max17841b[Clicked_CMUbtn].Temperature[1]);
            itemp = (itemp / 10) - 40;
            if (itemp > -50)
            {
                sb.AppendFormat("{0:0} ℃ ", itemp);
                lbTemp1Value.Text = sb.ToString();
                sb.Remove(0, sb.Length);
            }
            else
            {
                sb.AppendFormat("- ℃ ");
                lbTemp1Value.Text = sb.ToString();
                sb.Remove(0, sb.Length);
            }
            
            //Temp 3
            itemp = Convert.ToInt32(clsComm.commData.max17841b[Clicked_CMUbtn].Temperature[2]);
            itemp = (itemp / 10) - 40;
            if (itemp > -50)
            {
                sb.AppendFormat("{0:0} ℃ ", itemp);
                lbTemp1Value.Text = sb.ToString();
                sb.Remove(0, sb.Length);
            }
            else
            {
                sb.AppendFormat("- ℃ ");
                lbTemp1Value.Text = sb.ToString();
                sb.Remove(0, sb.Length);
            }
            
            //Temp 4
            //itemp = Convert.ToInt32(clsComm.commData.max17841b[Clicked_CMUbtn].Temperature[3]);
            //itemp = (itemp / 10) - 40;
            sb.AppendFormat("- ℃ ");
            lbTemp4Value.Text = sb.ToString();
            sb.Remove(0, sb.Length);

            itemp = Convert.ToInt32(clsComm.commData.WCellOverVoltageStatus);
            if (itemp != 0) {
                bWarnning = true;
                logWarnning("WCellOverVoltage");
                lbCOVW.BackColor = Color.Orange;
            } else
            {
                lbCOVW.BackColor = Color.Transparent;
            }

            itemp = Convert.ToInt32(clsComm.commData.WCellUnderVoltageStatus);
            if (itemp != 0)
            {
                bWarnning = true;
                logWarnning("WCellUnderVoltage");
                lbCLVW.BackColor= Color.Orange;
            } else
            {
                lbCLVW.BackColor = Color.Transparent;
            }
            
            itemp = Convert.ToInt32(clsComm.commData.WChargingOverTempStatus);
            if (itemp != 0)
            {
                bWarnning = true;
                logWarnning("WChargingOverTemp");
                lbCOTW.BackColor = Color.Orange;
            } else
            {
                lbCOTW.BackColor = Color.Transparent;
            }
            
            itemp = Convert.ToInt32(clsComm.commData.WChargingUnderTempStatus);
            if (itemp != 0)
            {
                bWarnning = true;
                logWarnning("WChargingUnderTemp");
                lbCLTW.BackColor = Color.Orange;   
            } else
            {
                lbCLTW.BackColor = Color.Transparent;
            }
            
            itemp = Convert.ToInt32(clsComm.commData.WChargingOverCurrentStatus);
            if (itemp != 0)
            {
                bWarnning = true;
                logWarnning("WChargingOverCurrent");
                lbCOAW.BackColor = Color.Orange;
            } else
            {
                lbCOAW.BackColor = Color.Transparent;
            }
            
            itemp = Convert.ToInt32(clsComm.commData.WDisChargingOverCurrentStatus);
            if (itemp != 0)
            {
                bWarnning = true;
                logWarnning("WDisChargingOverCurrent");
                lbDOAW.BackColor = Color.Orange;
            } else
            {
                lbDOAW.BackColor = Color.Transparent;
            }
            
            itemp = Convert.ToInt32(clsComm.commData.WCellDiffVoltageStatus);
            if (itemp != 0)
            {
                bWarnning = true;
                logWarnning("WCellDiffVoltage");
                lbCDW.BackColor = Color.Orange;
            } else
            {
                lbCDW.BackColor = Color.Transparent;
            }
            
            itemp = Convert.ToInt32(clsComm.commData.WSensingline_measureStatus);
            if (itemp != 0)
            {
                bWarnning = true;
                logWarnning("WSensingline_measure");
            }

            if(bWarnning == true) lbWarnningStatus.BackColor = Color.Red;
            else lbWarnningStatus.BackColor = Color.Transparent;

            
            itemp = Convert.ToInt32(clsComm.commData.PCellOverVoltageStatus);
            if (itemp != 0)
            {
                bProtect = true;
                logWarnning("PCellOverVoltage");
                lbCOVP.BackColor = Color.Orange;
            } else
            {
                lbCOVP.BackColor = Color.Transparent;
            }

            itemp = Convert.ToInt32(clsComm.commData.PCellUnderVoltageStatus);
            if (itemp != 0)
            {
                bProtect = true;
                logWarnning("PCellUnderVoltage");
                lbCLVP.BackColor = Color.Orange;
            } else
            {
                lbCLVP.BackColor = Color.Transparent;
            }

            itemp = Convert.ToInt32(clsComm.commData.PChargingOverTempStatus);
            if (itemp != 0)
            {
                bProtect = true;
                logWarnning("PChargingOverTemp");
                lbCOTP.BackColor = Color.Orange;
            } else
            {
                lbCOTP.BackColor = Color.Transparent;
            }

            itemp = Convert.ToInt32(clsComm.commData.PChargingUnderTempStatus);
            if (itemp != 0)
            {
                bProtect = true;
                logWarnning("PChargingUnderTemp");
                lbCLTP.BackColor = Color.Orange;
            } else
            {
                lbCLTP.BackColor = Color.Transparent;
            }

            itemp = Convert.ToInt32(clsComm.commData.PChargingOverCurrentStatus);
            if (itemp != 0)
            {
                bProtect = true;
                logWarnning("PChargingOverCurrent");
                lbCOAP.BackColor = Color.Orange;
            } else
            {
                lbCOAP.BackColor = Color.Transparent;
            }

            itemp = Convert.ToInt32(clsComm.commData.PDisChargingOverCurrentStatus);
            if (itemp != 0)
            {
                bProtect = true;
                logWarnning("PDisChargingOverCurrent");
                lbDOAP.BackColor = Color.Orange;
            } else
            {
                lbDOAP.BackColor = Color.Transparent;
            }

            itemp = Convert.ToInt32(clsComm.commData.PCellDiffVoltageStatus);
            if (itemp != 0)
            {
                bProtect = true;
                logWarnning("PCellDiffVoltage");
                lbCDP.BackColor = Color.Orange;
            } else
            {
                lbCDP.BackColor = Color.Transparent;
            }

            itemp = Convert.ToInt32(clsComm.commData.PSensinglinemeasureStatus);
            if (itemp != 0)
            {
                bProtect = true;
                logWarnning("PSensinglinemeasure");
                lbSLMP.BackColor = Color.Orange;
            } else
            {
                lbSLMP.BackColor = Color.Transparent;
            }

            itemp = Convert.ToInt32(clsComm.commData.RelayStatus);
            if (itemp == 1)
            {
                //sb.AppendFormat("ON");
                //logInfo("BMS -> GUI : Relay " + sb.ToString());
                //sb.Remove(0, sb.Length);

                pbRelay.Image = global::KCL_reBMS_Prj.Properties.Resources.Bclose;
                lbRelayStatus.BackColor = Color.Green;
            }

            if (itemp == 0)
            {
                //sb.AppendFormat("OFF");
                //logInfo("BMS -> GUI : Relay " + sb.ToString());
                //sb.Remove(0, sb.Length);

                pbRelay.Image = global::KCL_reBMS_Prj.Properties.Resources.Bopen;
                lbRelayStatus.BackColor = Color.Transparent;
            }


            //itemp = Convert.ToInt32(clsComm.commData.PreRelayStatus);
            //if (itemp != 0)
            //{
            //    bProtect = true;
            //    logWarnning("PreRelay");
            //}

            if (bProtect == true) lbProtectStatus.BackColor = Color.Red;
            else lbProtectStatus.BackColor = Color.Transparent;

            byte byteTemp = clsComm.commData.sensinglineErr;
            if (byteTemp != 0)
            {
                logWarnning("WSensinglineErr");
            }

            if ((byteTemp & 0x01) == 0x01)
            {
                lbInterLockStatus.BackColor = Color.Red;
                logWarnning("CuttedInterLock/Contactor");
            }
            else
            {
                lbInterLockStatus.BackColor = Color.Transparent;
            }

            if ((byteTemp & 0x02) == 0x02)
            {
                lbCurSensorStatus.BackColor = Color.Red;
                logWarnning("CuttedCurSensor");
            }
            else
            {
                lbCurSensorStatus.BackColor = Color.Transparent;
            }

            if ((byteTemp & 0x04) == 0x04)
            {
                lbSerialStatus.BackColor = Color.Red;
                logWarnning("CuttedUSBserial/CuttedUARTserial");
            }
            else
            {
                lbSerialStatus.BackColor = Color.Transparent;
            }

            if ((byteTemp & 0x08) == 0x08)
            {
                lbVCellStatus.BackColor = Color.Red;
                logWarnning("CuttedVCell");
            }
            else
            {
                lbVCellStatus.BackColor = Color.Transparent;
            }

            if ((byteTemp & 0x10) == 0x10)
            {
                lbTCellStatus.BackColor = Color.Red;
                logWarnning("CuttedTCell");
            }
            else
            {
                lbTCellStatus.BackColor = Color.Transparent;
            }

            itemp = Convert.ToInt32(clsComm.commData.OCVState);
            if (itemp != 0)
            {
                lbOCVStateStatus.BackColor = Color.Red;
                logWarnning("OCVState Warnning");
            }
            else
            {
                lbOCVStateStatus.BackColor = Color.Transparent;
            }

            itemp = Convert.ToInt32(clsComm.commData.CCVState);
            if (itemp != 0)
            {
                lbCCVStateStatus.BackColor = Color.Red;
                logWarnning("CCVState Warnning");
            }
            else
            {
                lbCCVStateStatus.BackColor = Color.Transparent;
            }
            
            if(clsComm.commData.BMSReboot == 0x04)
            {
                bIsLoad = true;
                clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_WARNNING_ENABLE_GET);
                clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_PROTECT_ENABLE_GET);
            }
        }

        void Version(byte[] data)
        {
            StringBuilder sb = new StringBuilder();
            Double itemp;

            if (data[7] < 3 || data[7] > 0x7F)
            {
                sb.AppendFormat("No Version");
                tbBMUVersion.Text = sb.ToString();
                logInfo("[monitoring] Version:" + sb.ToString());
                sb.Remove(0, sb.Length);

                return;
            }

            clsComm.commData.Version = (short)data[7]; 
 
            itemp = Convert.ToInt32((sbyte)clsComm.commData.Version);
            sb.AppendFormat("{0:0}", itemp);
            tbBMUVersion.Text = sb.ToString();
            logInfo("[monitoring] Version:" + sb.ToString());
            sb.Remove(0, sb.Length);
        }

        void FactoryResetStatus(byte[] data)
        {
            logInfo("BMS -> GUI :Factory Reseted");
        }

        void RelayStatus(byte[] data)
        {
            StringBuilder sb = new StringBuilder();
            Double itemp;

            if (data[7] == 0x01)
            {
                sb.AppendFormat("ON");
                logInfo("BMS -> GUI : Relay " + sb.ToString());
                sb.Remove(0, sb.Length);

                pbRelay.Image = global::KCL_reBMS_Prj.Properties.Resources.Bclose;
                lbRelayStatus.BackColor = Color.Green;
                return;
            }

            if (data[7] == 0x02)
            {
                sb.AppendFormat("OFF");
                logInfo("BMS -> GUI : Relay " + sb.ToString());
                sb.Remove(0, sb.Length);

                pbRelay.Image = global::KCL_reBMS_Prj.Properties.Resources.Bopen;
                lbRelayStatus.BackColor = Color.Transparent;
                return;
            }

            if (data[7] == 0x03)
            {
                sb.AppendFormat("Protect");
                logInfo("BMS -> GUI : Relay " + sb.ToString());
                sb.Remove(0, sb.Length);
                lbRelayStatus.BackColor = Color.Red;
                return;
            }

            if (data[7] == 0x04)
            {
                sb.AppendFormat("Comm Err");
                logInfo("BMS -> GUI : Relay " + sb.ToString());
                sb.Remove(0, sb.Length);
                lbRelayStatus.BackColor = Color.Yellow;

                return;
            }
        }

        void SOCResetStatus(byte[] data)
        {
            clsComm.commData.Soc = (short)((data[7] * 256) + data[8]);
            clsComm.commData.Soc /= 100;
            logInfo("BMS -> GUI : SOC = " + clsComm.commData.Soc);
        }

        void SOHResetStatus(byte[] data)
        {
            clsComm.commData.Soh = (short)((data[7] * 256) + data[8]);
            clsComm.commData.Soh /= 100;
            logInfo("BMS -> GUI : SOH = " + clsComm.commData.Soh);
        }

        void WarnningEnableStatus(byte[] data)
        {
            clsComm.commData.WCellOverVoltageEnable = data[7];
            clsComm.commData.WCellUnderVoltageEnable = data[8];      
            clsComm.commData.WPackOverVoltageEnable = data[9];
            clsComm.commData.WPackUnderVoltageEnable = data[10];
            clsComm.commData.WCellVoltageDiffEnable = data[11];
            clsComm.commData.WCellOverTempEnable = data[12];
            clsComm.commData.WCellUnderTempEnable = data[13];
            clsComm.commData.WChargingOverCurrentEnable = data[14];
            clsComm.commData.WDisChargingOverCurrentEnable = data[15];
            clsComm.commData.WLowSOCEnable = data[16];
            clsComm.commData.WLowSOHEnable = data[17];

            if(clsComm.commData.WCellOverVoltageEnable != 0)
            {
                cbWarnningEnable1.Checked = true;
            }
            else
            {
                cbWarnningEnable1.Checked = false;
            }

            if (clsComm.commData.WCellUnderVoltageEnable != 0)
            {
                cbWarnningEnable2.Checked = true;
            }
            else
            {
                cbWarnningEnable2.Checked = false;
            }

            if (clsComm.commData.WPackOverVoltageEnable != 0)
            {
                cbWarnningEnable3.Checked = true;
            }
            else
            {
                cbWarnningEnable3.Checked = false;
            }

            if (clsComm.commData.WPackUnderVoltageEnable != 0)
            {
                cbWarnningEnable4.Checked = true;
            }
            else
            {
                cbWarnningEnable4.Checked = false;
            }

            if (clsComm.commData.WCellVoltageDiffEnable != 0)
            {
                cbWarnningEnable5.Checked = true;
            }
            else
            {
                cbWarnningEnable5.Checked = false;
            }

            if (clsComm.commData.WCellOverTempEnable != 0)
            {
                cbWarnningEnable6.Checked = true;
            }
            else
            {
                cbWarnningEnable6.Checked = false;
            }

            if (clsComm.commData.WCellUnderTempEnable != 0)
            {
                cbWarnningEnable7.Checked = true;
            }
            else
            {
                cbWarnningEnable7.Checked = false;
            }

            if (clsComm.commData.WChargingOverCurrentEnable != 0)
            {
                cbWarnningEnable8.Checked = true;
            }
            else
            {
                cbWarnningEnable8.Checked = false;
            }

            if (clsComm.commData.WDisChargingOverCurrentEnable != 0)
            {
                cbWarnningEnable9.Checked = true;
            }
            else
            {
                cbWarnningEnable9.Checked = false;
            }

            if (clsComm.commData.WLowSOCEnable != 0)
            {
                cbWarnningEnable10.Checked = true;
            }
            else
            {
                cbWarnningEnable10.Checked = false;
            }

            if (clsComm.commData.WLowSOHEnable != 0)
            {
                cbWarnningEnable11.Checked = true;
            }
            else
            {
                cbWarnningEnable11.Checked = false;
            }

            logInfo("BMS -> GUI : Warnning Enable Value");
        }

        void WarnningStatus(byte[] data)
        {
            if (data[6] != 0x03) return;
            if (data[29] != 0x01) return;

            clsComm.commData.WsetCellOverVoltage = (ushort)((data[7] * 256) + data[8]);
            clsComm.commData.WsetCellUnderVoltage = (ushort)((data[9] * 256) + data[10]);
            clsComm.commData.WsetPackOverVoltage = (ushort)((data[11] * 256) + data[12]);
            clsComm.commData.WsetPackUnderVoltage = (ushort)((data[13] * 256) + data[14]);
            clsComm.commData.WsetCellVoltDiff = (ushort)((data[15] * 256) + data[16]);
            clsComm.commData.WsetCellOverTemp = (short)((data[17] * 256) + data[18]);
            clsComm.commData.WsetCellUnderTemp = (short)((data[19] * 256) + data[20]);
            clsComm.commData.WsetChargeOverCurrent = (short)((data[21] * 256) + data[22]);
            clsComm.commData.WsetDischargeOverCurrent = (short)((data[23] * 256) + data[24]);
            clsComm.commData.WsetLowSOC = (ushort)((data[25] * 256) + data[26]);
            clsComm.commData.WsetLowSOH = (ushort)((data[27] * 256) + data[28]);

            clsComm.commData.WsetCellOverVoltageRetain = (ushort)((data[30] * 256) + data[31]);
            clsComm.commData.WsetCellUnderVoltageRetain = (ushort)((data[32] * 256) + data[33]);
            clsComm.commData.WsetPackOverVoltageRetain = (ushort)((data[34] * 256) + data[35]);
            clsComm.commData.WsetPackUnderVoltageRetain = (ushort)((data[36] * 256) + data[37]);
            clsComm.commData.WsetCellVoltDiffRetain = (ushort)((data[38] * 256) + data[39]);
            clsComm.commData.WsetCellOverTempRetain = (ushort)((data[40] * 256) + data[41]);
            clsComm.commData.WsetCellUnderTempRetain = (ushort)((data[42] * 256) + data[43]);
            clsComm.commData.WsetChargeOverCurrentRetain = (ushort)((data[44] * 256) + data[45]);
            clsComm.commData.WsetDischargeOverCurrentRetain = (ushort)((data[46] * 256) + data[47]);
            clsComm.commData.WsetLowSOCRetain = (ushort)((data[48] * 256) + data[49]);
            clsComm.commData.WsetLowSOHRetain = (ushort)((data[50] * 256) + data[51]);

            cbWarnningValue1.Value = clsComm.commData.WsetCellOverVoltage;
            cbWarnningValue2.Value = clsComm.commData.WsetCellUnderVoltage;
            cbWarnningValue3.Value = clsComm.commData.WsetPackOverVoltage / 10;
            cbWarnningValue4.Value = clsComm.commData.WsetPackUnderVoltage / 10;
            cbWarnningValue5.Value = clsComm.commData.WsetCellVoltDiff;
            cbWarnningValue6.Value = (clsComm.commData.WsetCellOverTemp / 10) - 40;
            cbWarnningValue7.Value = (clsComm.commData.WsetCellUnderTemp / 10) - 40;
            cbWarnningValue8.Value = (clsComm.commData.WsetChargeOverCurrent / 10) - 300;
            cbWarnningValue9.Value = (clsComm.commData.WsetDischargeOverCurrent / 10) - 300;
            cbWarnningValue10.Value = clsComm.commData.WsetLowSOC / 100;
            cbWarnningValue11.Value = clsComm.commData.WsetLowSOH / 100;

            cbWarnningRetainTime1.Value = clsComm.commData.WsetCellOverVoltageRetain;
            cbWarnningRetainTime2.Value = clsComm.commData.WsetCellUnderVoltageRetain;
            cbWarnningRetainTime3.Value = clsComm.commData.WsetPackOverVoltageRetain;
            cbWarnningRetainTime4.Value = clsComm.commData.WsetPackUnderVoltageRetain;
            cbWarnningRetainTime5.Value = clsComm.commData.WsetCellVoltDiffRetain;
            cbWarnningRetainTime6.Value = clsComm.commData.WsetCellOverTempRetain;
            cbWarnningRetainTime7.Value = clsComm.commData.WsetCellUnderTempRetain;
            cbWarnningRetainTime8.Value = clsComm.commData.WsetChargeOverCurrentRetain;
            cbWarnningRetainTime9.Value = clsComm.commData.WsetDischargeOverCurrentRetain;
            cbWarnningRetainTime10.Value = clsComm.commData.WsetLowSOCRetain;
            cbWarnningRetainTime11.Value = clsComm.commData.WsetLowSOHRetain;

            logInfo("BMS -> GUI : Warnning Value");
            gbWarnningSet.BackColor = Color.GreenYellow;
        }

        void WarnningReleaseStatus(byte[] data)
        {
            if (data[6] != 0x03) return;
            if (data[27] != 0x01) return;

            clsComm.commData.WRsetCellOverVoltage = (ushort)((data[7] * 256) + data[8]);
            clsComm.commData.WRsetCellUnderVoltage = (ushort)((data[9] * 256) + data[10]);
            clsComm.commData.WRsetPackOverVoltage = (ushort)((data[11] * 256) + data[12]);
            clsComm.commData.WRsetPackUnderVoltage = (ushort)((data[13] * 256) + data[14]);
            clsComm.commData.WRsetCellVoltDiff = (ushort)((data[15] * 256) + data[16]);
            clsComm.commData.WRsetCellOverTemp = (short)((data[17] * 256) + data[18]);
            clsComm.commData.WRsetCellUnderTemp = (short)((data[19] * 256) + data[20]);
            clsComm.commData.WRsetChargeOverCurrent = (short)((data[21] * 256) + data[22]);
            clsComm.commData.WRsetDischargeOverCurrent = (short)((data[23] * 256) + data[24]);
            clsComm.commData.WRsetLowSOC = (ushort)((data[25] * 256) + data[26]);
            //clsComm.commData.WRsetLowSOH = (ushort)((data[27] * 256) + data[28]);

            clsComm.commData.WRsetCellOverVoltageRetain = (ushort)((data[28] * 256) + data[29]);
            clsComm.commData.WRsetCellUnderVoltageRetain = (ushort)((data[30] * 256) + data[31]);
            clsComm.commData.WRsetPackOverVoltageRetain = (ushort)((data[32] * 256) + data[33]);
            clsComm.commData.WRsetPackUnderVoltageRetain = (ushort)((data[34] * 256) + data[35]);
            clsComm.commData.WRsetCellVoltDiffRetain = (ushort)((data[36] * 256) + data[37]);
            clsComm.commData.WRsetCellOverTempRetain = (ushort)((data[38] * 256) + data[39]);
            clsComm.commData.WRsetCellUnderTempRetain = (ushort)((data[40] * 256) + data[41]);
            clsComm.commData.WRsetChargeOverCurrentRetain = (ushort)((data[42] * 256) + data[43]);
            clsComm.commData.WRsetDischargeOverCurrentRetain = (ushort)((data[44] * 256) + data[45]);
            clsComm.commData.WRsetLowSOCRetain = (ushort)((data[46] * 256) + data[47]);
            //clsComm.commData.WRsetLowSOHRetain = (ushort)((data[48] * 256) + data[49]);

            cbWarnningReleaseValue1.Value = clsComm.commData.WRsetCellOverVoltage;
            cbWarnningReleaseValue2.Value = clsComm.commData.WRsetCellUnderVoltage;
            cbWarnningReleaseValue3.Value = clsComm.commData.WRsetPackOverVoltage / 10;
            cbWarnningReleaseValue4.Value = clsComm.commData.WRsetPackUnderVoltage / 10;
            cbWarnningReleaseValue5.Value = clsComm.commData.WRsetCellVoltDiff;
            cbWarnningReleaseValue6.Value = (clsComm.commData.WRsetCellOverTemp / 10) - 40;
            cbWarnningReleaseValue7.Value = (clsComm.commData.WRsetCellUnderTemp / 10) - 40;
            cbWarnningReleaseValue8.Value = (clsComm.commData.WRsetChargeOverCurrent / 10) - 300;
            cbWarnningReleaseValue9.Value = (clsComm.commData.WRsetDischargeOverCurrent / 10) - 300;
            cbWarnningReleaseValue10.Value = clsComm.commData.WRsetLowSOC / 100;
            //cbWarnningReleaseValue11.Value = clsComm.commData.WRsetLowSOH / 100;

            cbWarnningReleaseRetain1.Value = clsComm.commData.WRsetCellOverVoltageRetain;
            cbWarnningReleaseRetain2.Value = clsComm.commData.WRsetCellUnderVoltageRetain;
            cbWarnningReleaseRetain3.Value = clsComm.commData.WRsetPackOverVoltageRetain;
            cbWarnningReleaseRetain4.Value = clsComm.commData.WRsetPackUnderVoltageRetain;
            cbWarnningReleaseRetain5.Value = clsComm.commData.WRsetCellVoltDiffRetain;
            cbWarnningReleaseRetain6.Value = clsComm.commData.WRsetCellOverTempRetain;
            cbWarnningReleaseRetain7.Value = clsComm.commData.WRsetCellUnderTempRetain;
            cbWarnningReleaseRetain8.Value = clsComm.commData.WRsetChargeOverCurrentRetain;
            cbWarnningReleaseRetain9.Value = clsComm.commData.WRsetDischargeOverCurrentRetain;
            cbWarnningReleaseRetain10.Value = clsComm.commData.WRsetLowSOCRetain;
            //cbWarnningReleaseRetain11.Value = clsComm.commData.WRsetLowSOHRetain;

            logInfo("BMS -> GUI : Warnning Release Value");
            gbWarnningRelease.BackColor = Color.GreenYellow;
        }

        void ProtectEnableStatus(byte[] data)
        {
            clsComm.commData.PCellOverVoltageEnable = data[7];         //7         
            clsComm.commData.PCellUnderVoltageEnable = data[8];        //8
            clsComm.commData.PPackOverVoltageEnable = data[9];         //9
            clsComm.commData.PPackUnderVoltageEnable = data[10];       //9
            clsComm.commData.PCellVoltageDiffEnable = data[11];        //10
            clsComm.commData.PCellOverTempEnable = data[12];           //11
            clsComm.commData.PCellUnderTempEnable = data[13];          //12
            clsComm.commData.PChargingOverCurrentEnable = data[14];    //13
            clsComm.commData.PDisChargingOverCurrentEnable = data[15]; //14
            clsComm.commData.PSensingLineMeasureEnable = data[16];     //15
            clsComm.commData.PCommunicationErrorEnable = data[17];     //16
            clsComm.commData.PCurrentSensorErrorEnable = data[18];     //17
            clsComm.commData.PInterLockErrorEnable = data[19];         //18
            clsComm.commData.PSelfSystemDiagEnable = data[20];         //19

            if (clsComm.commData.PCellOverVoltageEnable != 0)
            {
                cbProtectEnable1.Checked = true;
            }
            else
            {
                cbProtectEnable1.Checked = false;
            }

            if (clsComm.commData.PCellUnderVoltageEnable != 0)
            {
                cbProtectEnable2.Checked = true;
            }
            else
            {
                cbProtectEnable2.Checked = false;
            }

            if (clsComm.commData.PPackOverVoltageEnable != 0)
            {
                cbProtectEnable3.Checked = true;
            }
            else
            {
                cbProtectEnable3.Checked = false;
            }

            if (clsComm.commData.PPackUnderVoltageEnable != 0)
            {
                cbProtectEnable4.Checked = true;
            }
            else
            {
                cbProtectEnable4.Checked = false;
            }

            if (clsComm.commData.PCellVoltageDiffEnable != 0)
            {
                cbProtectEnable5.Checked = true;
            }
            else
            {
                cbProtectEnable5.Checked = false;
            }

            if (clsComm.commData.PCellOverTempEnable != 0)
            {
                cbProtectEnable6.Checked = true;
            }
            else
            {
                cbProtectEnable6.Checked = false;
            }

            if (clsComm.commData.PCellUnderTempEnable != 0)
            {
                cbProtectEnable7.Checked = true;
            }
            else
            {
                cbProtectEnable7.Checked = false;
            }

            if (clsComm.commData.PChargingOverCurrentEnable != 0)
            {
                cbProtectEnable8.Checked = true;
            }
            else
            {
                cbProtectEnable8.Checked = false;
            }

            if (clsComm.commData.PDisChargingOverCurrentEnable != 0)
            {
                cbProtectEnable9.Checked = true;
            }
            else
            {
                cbProtectEnable9.Checked = false;
            }

            if (clsComm.commData.PSensingLineMeasureEnable != 0)
            {
                cbProtectEnable10.Checked = true;
            }
            else
            {
                cbProtectEnable10.Checked = false;
            }

            if (clsComm.commData.PCommunicationErrorEnable != 0)
            {
                cbProtectEnable11.Checked = true;
            }
            else
            {
                cbProtectEnable11.Checked = false;
            }

            if (clsComm.commData.PCurrentSensorErrorEnable != 0)
            {
                cbProtectEnable12.Checked = true;
            }
            else
            {
                cbProtectEnable12.Checked = false;
            }

            if (clsComm.commData.PInterLockErrorEnable != 0)
            {
                cbProtectEnable13.Checked = true;
            }
            else
            {
                cbProtectEnable13.Checked = false;
            }

            if (clsComm.commData.PSelfSystemDiagEnable != 0)
            {
                cbProtectEnable14.Checked = true;
            }
            else
            {
                cbProtectEnable14.Checked = false;
            }

            logInfo("BMS -> GUI : Protect Enable Value");
        }

        void ProtectStatus(byte[] data)
        {
            if (data[6] != 0x03) return;
            if (data[30] != 0x01) return;

            clsComm.commData.PsetCellOverVoltage = (ushort)((data[7] * 256) + data[8]);
            clsComm.commData.PsetCellUnderVoltage = (ushort)((data[9] * 256) + data[10]);
            clsComm.commData.PsetPackOverVoltage = (ushort)((data[11] * 256) + data[12]);
            clsComm.commData.PsetPackUnderVoltage = (ushort)((data[13] * 256) + data[14]);
            clsComm.commData.PsetCellVoltDiff = (ushort)((data[15] * 256) + data[16]);
            clsComm.commData.PsetCellOverTemp = (short)((data[17] * 256) + data[18]);
            clsComm.commData.PsetCellUnderTemp = (short)((data[19] * 256) + data[20]);
            clsComm.commData.PsetChargeOverCurrent = (short)((data[21] * 256) + data[22]);
            clsComm.commData.PsetDischargeOverCurrent = (short)((data[23] * 256) + data[24]);
            clsComm.commData.PsetSensingLineMeasure = data[25];
            clsComm.commData.PsetCommunicationError = data[26];
            clsComm.commData.PsetCurrentSensorError = data[27];
            clsComm.commData.PsetInterLockError = data[28];
            clsComm.commData.PsetSelfSystemDiag = data[29];

            clsComm.commData.PsetCellOverVoltageRetain = (ushort)((data[31] * 256) + data[32]);
            clsComm.commData.PsetCellUnderVoltageRetain = (ushort)((data[33] * 256) + data[34]);
            clsComm.commData.PsetPackOverVoltageRetain = (ushort)((data[35] * 256) + data[36]);
            clsComm.commData.PsetPackUnderVoltageRetain = (ushort)((data[37] * 256) + data[38]);
            clsComm.commData.PsetCellVoltDiffRetain = (ushort)((data[39] * 256) + data[40]);
            clsComm.commData.PsetCellOverTempRetain = (ushort)((data[41] * 256) + data[42]);
            clsComm.commData.PsetCellUnderTempRetain = (ushort)((data[43] * 256) + data[44]);
            clsComm.commData.PsetChargeOverCurrentRetain = (ushort)((data[45] * 256) + data[46]);
            clsComm.commData.PsetDischargeOverCurrentRetain = (ushort)((data[47] * 256) + data[48]);
            clsComm.commData.PsetSensingLineMeasureRetain = (ushort)((data[49] * 256) + data[50]);
            clsComm.commData.PsetCommunicationErrorRetain = (ushort)((data[51] * 256) + data[52]);
            clsComm.commData.PsetCurrentSensorErrorRetain = (ushort)((data[53] * 256) + data[54]);
            clsComm.commData.PsetInterLockErrorRetain = (ushort)((data[55] * 256) + data[56]);
            clsComm.commData.PsetSelfSystemDiagRetain = (ushort)((data[57] * 256) + data[58]);

            cbProtectValue1.Value = clsComm.commData.PsetCellOverVoltage;
            cbProtectValue2.Value = clsComm.commData.PsetCellUnderVoltage;
            cbProtectValue3.Value = clsComm.commData.PsetPackOverVoltage / 10;
            cbProtectValue4.Value = clsComm.commData.PsetPackUnderVoltage / 10;
            cbProtectValue5.Value = clsComm.commData.PsetCellVoltDiff;
            cbProtectValue6.Value = (clsComm.commData.PsetCellOverTemp / 10) - 40; 
            cbProtectValue7.Value = (clsComm.commData.PsetCellUnderTemp / 10) - 40;
            cbProtectValue8.Value = (clsComm.commData.PsetChargeOverCurrent / 10) - 300;
            cbProtectValue9.Value = (clsComm.commData.PsetDischargeOverCurrent / 10) - 300;
            cbProtectValue10.Value = clsComm.commData.PsetSensingLineMeasure;
            cbProtectValue11.Value = clsComm.commData.PsetCommunicationError;
            cbProtectValue12.Value = clsComm.commData.PsetCurrentSensorError;
            cbProtectValue13.Value = clsComm.commData.PsetInterLockError;
            cbProtectValue14.Value = clsComm.commData.PsetSelfSystemDiag;

            cbProtectRetainTime1.Value = clsComm.commData.PsetCellOverVoltageRetain;
            cbProtectRetainTime2.Value = clsComm.commData.PsetCellUnderVoltageRetain;
            cbProtectRetainTime3.Value = clsComm.commData.PsetPackOverVoltageRetain;
            cbProtectRetainTime4.Value = clsComm.commData.PsetPackUnderVoltageRetain;
            cbProtectRetainTime5.Value = clsComm.commData.PsetCellVoltDiffRetain;
            cbProtectRetainTime6.Value = clsComm.commData.PsetCellOverTempRetain;
            cbProtectRetainTime7.Value = clsComm.commData.PsetCellUnderTempRetain;
            cbProtectRetainTime8.Value = clsComm.commData.PsetChargeOverCurrentRetain;
            cbProtectRetainTime9.Value = clsComm.commData.PsetDischargeOverCurrentRetain;
            cbProtectRetainTime10.Value = clsComm.commData.PsetSensingLineMeasureRetain;
            cbProtectRetainTime11.Value = clsComm.commData.PsetCommunicationErrorRetain;
            cbProtectRetainTime12.Value = clsComm.commData.PsetCurrentSensorErrorRetain;
            cbProtectRetainTime13.Value = clsComm.commData.PsetInterLockErrorRetain;
            cbProtectRetainTime14.Value = clsComm.commData.PsetSelfSystemDiagRetain;

            logInfo("BMS -> GUI : Protect Value");
        }

        void ProtectReleaseStatus(byte[] data)
        {
            if (data[6] != 0x03) return;
            if (data[30] != 0x01) return;

            clsComm.commData.PRsetCellOverVoltage = (ushort)((data[7] * 256) + data[8]);
            clsComm.commData.PRsetCellUnderVoltage = (ushort)((data[9] * 256) + data[10]);
            clsComm.commData.PRsetPackOverVoltage = (ushort)((data[11] * 256) + data[12]);
            clsComm.commData.PRsetPackUnderVoltage = (ushort)((data[13] * 256) + data[14]);
            clsComm.commData.PRsetCellVoltDiff = (ushort)((data[15] * 256) + data[16]);
            clsComm.commData.PRsetCellOverTemp = (short)((data[17] * 256) + data[18]);
            clsComm.commData.PRsetCellUnderTemp = (short)((data[19] * 256) + data[20]);
            clsComm.commData.PRsetChargeOverCurrent = (short)((data[21] * 256) + data[22]);
            clsComm.commData.PRsetDischargeOverCurrent = (short)((data[23] * 256) + data[24]);
            clsComm.commData.PRsetSensingLineMeasure = data[25];
            clsComm.commData.PRsetCommunicationError = data[26];
            clsComm.commData.PRsetCurrentSensorError = data[27];
            clsComm.commData.PRsetInterLockError = data[28];
            clsComm.commData.PRsetSelfSystemDiag = data[29];
                              
            clsComm.commData.PRsetCellOverVoltageRetain = (ushort)((data[31] * 256) + data[32]);
            clsComm.commData.PRsetCellUnderVoltageRetain = (ushort)((data[33] * 256) + data[34]);
            clsComm.commData.PRsetPackOverVoltageRetain = (ushort)((data[35] * 256) + data[36]);
            clsComm.commData.PRsetPackUnderVoltageRetain = (ushort)((data[37] * 256) + data[38]);
            clsComm.commData.PRsetCellVoltDiffRetain = (ushort)((data[39] * 256) + data[40]);
            clsComm.commData.PRsetCellOverTempRetain = (ushort)((data[41] * 256) + data[42]);
            clsComm.commData.PRsetCellUnderTempRetain = (ushort)((data[43] * 256) + data[44]);
            clsComm.commData.PRsetChargeOverCurrentRetain = (ushort)((data[45] * 256) + data[46]);
            clsComm.commData.PRsetDischargeOverCurrentRetain = (ushort)((data[47] * 256) + data[48]);
            clsComm.commData.PRsetSensingLineMeasureRetain  = (ushort)((data[49] * 256) + data[50]);
            clsComm.commData.PRsetCommunicationErrorRetain = (ushort)((data[51] * 256) + data[52]);
            clsComm.commData.PRsetCurrentSensorErrorRetain = (ushort)((data[53] * 256) + data[54]);
            clsComm.commData.PRsetInterLockErrorRetain     = (ushort)((data[55] * 256) + data[56]);
            clsComm.commData.PRsetSelfSystemDiagRetain     = (ushort)((data[57] * 256) + data[58]);


            cbProtectReleaseValue1.Value = clsComm.commData.PRsetCellOverVoltage;
            cbProtectReleaseValue2.Value = clsComm.commData.PRsetCellUnderVoltage;
            cbProtectReleaseValue3.Value = clsComm.commData.PRsetPackOverVoltage / 10;
            cbProtectReleaseValue4.Value = clsComm.commData.PRsetPackUnderVoltage / 10;
            cbProtectReleaseValue5.Value = clsComm.commData.PRsetCellVoltDiff;
            cbProtectReleaseValue6.Value = (clsComm.commData.PRsetCellOverTemp / 10) - 40;
            cbProtectReleaseValue7.Value = (clsComm.commData.PRsetCellUnderTemp / 10) - 40;
            cbProtectReleaseValue8.Value = (clsComm.commData.PRsetChargeOverCurrent / 10) - 300;
            cbProtectReleaseValue9.Value = (clsComm.commData.PRsetDischargeOverCurrent / 10) - 300;
            cbProtectReleaseValue10.Value = clsComm.commData.PRsetSensingLineMeasure;
            cbProtectReleaseValue11.Value = clsComm.commData.PRsetCommunicationError;
            cbProtectReleaseValue12.Value = clsComm.commData.PRsetCurrentSensorError;
            cbProtectReleaseValue13.Value = clsComm.commData.PRsetInterLockError;
            cbProtectReleaseValue14.Value = clsComm.commData.PRsetSelfSystemDiag;
            
            cbProtectReleaseRetain1.Value = clsComm.commData.PRsetCellOverVoltageRetain;
            cbProtectReleaseRetain2.Value = clsComm.commData.PRsetCellUnderVoltageRetain;
            cbProtectReleaseRetain3.Value = clsComm.commData.PRsetPackOverVoltageRetain;
            cbProtectReleaseRetain4.Value = clsComm.commData.PRsetPackUnderVoltageRetain;
            cbProtectReleaseRetain5.Value = clsComm.commData.PRsetCellVoltDiffRetain;
            cbProtectReleaseRetain6.Value = clsComm.commData.PRsetCellOverTempRetain;
            cbProtectReleaseRetain7.Value = clsComm.commData.PRsetCellUnderTempRetain;
            cbProtectReleaseRetain8.Value = clsComm.commData.PRsetChargeOverCurrentRetain;
            cbProtectReleaseRetain9.Value = clsComm.commData.PRsetDischargeOverCurrentRetain;
            cbProtectReleaseRetain10.Value = clsComm.commData.PRsetSensingLineMeasureRetain;
            cbProtectReleaseRetain11.Value = clsComm.commData.PRsetCommunicationErrorRetain;
            cbProtectReleaseRetain12.Value = clsComm.commData.PRsetCurrentSensorErrorRetain;
            cbProtectReleaseRetain13.Value = clsComm.commData.PRsetInterLockErrorRetain;
            cbProtectReleaseRetain14.Value = clsComm.commData.PRsetSelfSystemDiagRetain;

            logInfo("BMS -> GUI : Protect Release Value");
        }

        public static Image resizeImage(Image imgToResize, Size size)
        {
            return (Image)(new Bitmap(imgToResize, size));
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
                clsComm.commData.uLogCount = 0;
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

        private void startLogging()
        {
            logcomm.setPath(tbLogPath.Text);
            logcomm.setFileName(tbLogFileName.Text);

            string path = Directory.GetCurrentDirectory() + @"\Config.json";
            JObject configData = new JObject(
                new JProperty("path", logcomm.getPath()),
                new JProperty("file_name", logcomm.getFileName())
            );

            File.WriteAllText(path, configData.ToString());

            logcomm.setConfig();
            logcomm.loadConfig();
            logcomm.setReady();

            btLoggingStart.BackColor = Color.White;
            btLoggingStart.Text = "로깅 정지";
            //btLoggingStart.Enabled = false;

            long lSize = ClassCommon.GetFileSize(logcomm.getPath() + "\\" + logcomm.getFileName());
            if(lSize == 0) bIsTitle = true;
        }

        private void stopLogging()
        {
            btLoggingStart.BackColor = Color.MediumAquamarine;
            btLoggingStart.Text = "로깅 시작";
            //btLoggingStart.Enabled = true;
            logcomm.clearReady();
            bIsTitle = true;
        }

        private void btLoggingStart_Click(object sender, EventArgs e)
        {
            //if(logcomm.getReady() == false) startLogging();
            //else stopLogging();

            if (logcomm.getReady() == false)
            {
                startLogging();
            } else {
                stopLogging();
            }
        }

        private void btLogPath_Click(object sender, EventArgs e)
        {
            FolderBrowserDialog dialog = new FolderBrowserDialog();

            dialog.ShowDialog();
            string selected = dialog.SelectedPath;

            if (dialog.SelectedPath.IndexOfAny(System.IO.Path.GetInvalidPathChars()) == -1)
            {
                logcomm.setPath(dialog.SelectedPath);
            }
            else
            {
                MessageBox.Show("파일경로가 올바르지 않습니다.");
            }
            //csvSaveFname;
            tbLogPath.Text = selected;
        }

        void WarnningEnable()
        {
            clsComm.commData.WCellOverVoltageEnable = (byte)(cbWarnningEnable1.Checked ? 1 : 0);
            clsComm.commData.WCellUnderVoltageEnable = (byte)(cbWarnningEnable2.Checked ? 1 : 0);
            clsComm.commData.WPackOverVoltageEnable = (byte)(cbWarnningEnable3.Checked ? 1 : 0);
            clsComm.commData.WPackUnderVoltageEnable = (byte)(cbWarnningEnable4.Checked ? 1 : 0);
            clsComm.commData.WCellVoltageDiffEnable = (byte)(cbWarnningEnable5.Checked ? 1 : 0);
            clsComm.commData.WCellOverTempEnable = (byte)(cbWarnningEnable6.Checked ? 1 : 0);
            clsComm.commData.WCellUnderTempEnable = (byte)(cbWarnningEnable7.Checked ? 1 : 0);
            clsComm.commData.WChargingOverCurrentEnable = (byte)(cbWarnningEnable8.Checked ? 1 : 0);
            clsComm.commData.WDisChargingOverCurrentEnable = (byte)(cbWarnningEnable9.Checked ? 1 : 0);
            clsComm.commData.WLowSOCEnable = (byte)(cbWarnningEnable10.Checked ? 1 : 0);
            clsComm.commData.WLowSOHEnable = (byte)(cbWarnningEnable11.Checked ? 1 : 0);

            if (logcomm.getReady()) logInfo("GUI -> BMS : Set Warnning Enable");

            clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_WARNNING_ENABLE);
        }

        void WarnningSetting()
        {
            clsComm.commData.WsetCellOverVoltage = (ushort)((int)cbWarnningValue1.Value);
            clsComm.commData.WsetCellUnderVoltage = (ushort)cbWarnningValue2.Value;
            clsComm.commData.WsetPackOverVoltage = (ushort)((double)cbWarnningValue3.Value * 10);
            clsComm.commData.WsetPackUnderVoltage = (ushort)((double)cbWarnningValue4.Value * 10);
            clsComm.commData.WsetCellVoltDiff = (ushort)((int)cbWarnningValue5.Value);
            clsComm.commData.WsetCellOverTemp = (short)(((double)cbWarnningValue6.Value + 40) * 10);
            clsComm.commData.WsetCellUnderTemp = (short)(((double)cbWarnningValue7.Value + 40) * 10);
            clsComm.commData.WsetChargeOverCurrent = (short)(((int)cbWarnningValue8.Value + 300) * 10);
            clsComm.commData.WsetDischargeOverCurrent = (short)(((int)cbWarnningValue9.Value + 300) * 10);
            clsComm.commData.WsetLowSOC = (ushort)((double)cbWarnningValue10.Value * 100);
            clsComm.commData.WsetLowSOH = (ushort)((double)cbWarnningValue11.Value * 100);

            clsComm.commData.WsetCellOverVoltageRetain = (ushort)cbWarnningRetainTime1.Value;
            clsComm.commData.WsetCellUnderVoltageRetain = (ushort)cbWarnningRetainTime2.Value;
            clsComm.commData.WsetPackOverVoltageRetain = (ushort)cbWarnningRetainTime3.Value;
            clsComm.commData.WsetPackUnderVoltageRetain = (ushort)cbWarnningRetainTime4.Value;
            clsComm.commData.WsetCellVoltDiffRetain = (ushort)cbWarnningRetainTime5.Value;
            clsComm.commData.WsetCellOverTempRetain = (ushort)cbWarnningRetainTime6.Value;
            clsComm.commData.WsetCellUnderTempRetain = (ushort)cbWarnningRetainTime7.Value;
            clsComm.commData.WsetChargeOverCurrentRetain = (ushort)cbWarnningRetainTime8.Value;
            clsComm.commData.WsetDischargeOverCurrentRetain = (ushort)cbWarnningRetainTime9.Value;
            clsComm.commData.WsetLowSOCRetain = (ushort)cbWarnningRetainTime10.Value;
            clsComm.commData.WsetLowSOHRetain = (ushort)cbWarnningRetainTime11.Value;

            if (logcomm.getReady()) logInfo("GUI -> BMS : Set Warnning Value and Retain Time");

            clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_WARNNING_SET);
        }

        void WarnningReleaseSetting()
        {
            clsComm.commData.WRsetCellOverVoltage = (ushort)((int)cbWarnningReleaseValue1.Value);
            clsComm.commData.WRsetCellUnderVoltage = (ushort)((int)cbWarnningReleaseValue2.Value);
            clsComm.commData.WRsetPackOverVoltage = (ushort)((double)cbWarnningReleaseValue3.Value * 10);
            clsComm.commData.WRsetPackUnderVoltage = (ushort)((double)cbWarnningReleaseValue4.Value * 10);
            clsComm.commData.WRsetCellVoltDiff = (ushort)((int)cbWarnningReleaseValue5.Value);
            clsComm.commData.WRsetCellOverTemp = (short)((double)(cbWarnningReleaseValue6.Value + 40) * 10);
            clsComm.commData.WRsetCellUnderTemp = (short)((double)(cbWarnningReleaseValue7.Value + 40) * 10);
            clsComm.commData.WRsetChargeOverCurrent = (short)((int)(cbWarnningReleaseValue8.Value + 300) * 10);
            clsComm.commData.WRsetDischargeOverCurrent = (short)((int)(cbWarnningReleaseValue9.Value + 300) * 10);
            clsComm.commData.WRsetLowSOC = (ushort)((double)cbWarnningReleaseValue10.Value * 100);
            //clsComm.commData.WRsetLowSOH = (ushort)((double)cbWarnningReleaseValue11.Value * 100);

            clsComm.commData.WRsetCellOverVoltageRetain = (ushort)cbWarnningReleaseRetain1.Value;
            clsComm.commData.WRsetCellUnderVoltageRetain = (ushort)cbWarnningReleaseRetain2.Value;
            clsComm.commData.WRsetPackOverVoltageRetain = (ushort)cbWarnningReleaseRetain3.Value;
            clsComm.commData.WRsetPackUnderVoltageRetain = (ushort)cbWarnningReleaseRetain4.Value;
            clsComm.commData.WRsetCellVoltDiffRetain = (ushort)cbWarnningReleaseRetain5.Value;
            clsComm.commData.WRsetCellOverTempRetain = (ushort)cbWarnningReleaseRetain6.Value;
            clsComm.commData.WRsetCellUnderTempRetain = (ushort)cbWarnningReleaseRetain7.Value;
            clsComm.commData.WRsetChargeOverCurrentRetain = (ushort)cbWarnningReleaseRetain8.Value;
            clsComm.commData.WRsetDischargeOverCurrentRetain = (ushort)cbWarnningReleaseRetain9.Value;
            clsComm.commData.WRsetLowSOCRetain = (ushort)cbWarnningReleaseRetain10.Value;

            if (logcomm.getReady()) logInfo("GUI -> BMS : Set Warnning Release Value and Retain Time");

            clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_WARNNING_RELEASE_SET);
        }

        void ProtectEnable()
        {
            clsComm.commData.PCellOverVoltageEnable = (byte)(cbProtectEnable1.Checked ? 1 : 0);
            clsComm.commData.PCellUnderVoltageEnable = (byte)(cbProtectEnable2.Checked ? 1 : 0);
            clsComm.commData.PPackOverVoltageEnable = (byte)(cbProtectEnable3.Checked ? 1 : 0);
            clsComm.commData.PPackUnderVoltageEnable = (byte)(cbProtectEnable4.Checked ? 1 : 0);
            clsComm.commData.PCellVoltageDiffEnable = (byte)(cbProtectEnable5.Checked ? 1 : 0);
            clsComm.commData.PCellOverTempEnable = (byte)(cbProtectEnable6.Checked ? 1 : 0);
            clsComm.commData.PCellUnderTempEnable = (byte)(cbProtectEnable7.Checked ? 1 : 0);
            clsComm.commData.PChargingOverCurrentEnable = (byte)(cbProtectEnable8.Checked ? 1 : 0);
            clsComm.commData.PDisChargingOverCurrentEnable = (byte)(cbProtectEnable9.Checked ? 1 : 0);
            clsComm.commData.PSensingLineMeasureEnable = (byte)(cbProtectEnable10.Checked ? 1 : 0);
            clsComm.commData.PCommunicationErrorEnable = (byte)(cbProtectEnable11.Checked ? 1 : 0);
            clsComm.commData.PCurrentSensorErrorEnable = (byte)(cbProtectEnable12.Checked ? 1 : 0);
            clsComm.commData.PInterLockErrorEnable = (byte)(cbProtectEnable13.Checked ? 1 : 0);
            clsComm.commData.PSelfSystemDiagEnable = (byte)(cbProtectEnable14.Checked ? 1 : 0);
            

            if (logcomm.getReady()) logInfo("GUI -> BMS : Set Protect Enable Values");
            clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_PROTECT_ENABLE);
        }

        void ProtectSetting()
        {
            clsComm.commData.PsetCellOverVoltage =  (ushort)((int)cbProtectValue1.Value);
            clsComm.commData.PsetCellUnderVoltage = (ushort)((int)cbProtectValue2.Value);
            clsComm.commData.PsetPackOverVoltage = (ushort)((double)cbProtectValue3.Value * 10);
            clsComm.commData.PsetPackUnderVoltage = (ushort)((double)cbProtectValue4.Value * 10);
            clsComm.commData.PsetCellVoltDiff = (ushort)((int)cbProtectValue5.Value);
            clsComm.commData.PsetCellOverTemp = (short)(((double)cbProtectValue6.Value + 40) * 10);
            clsComm.commData.PsetCellUnderTemp = (short)(((double)cbProtectValue7.Value + 40) * 10);
            clsComm.commData.PsetChargeOverCurrent = (short)(((int)cbProtectValue8.Value + 300) * 10);
            clsComm.commData.PsetDischargeOverCurrent = (short)(((int)cbProtectValue9.Value + 300) * 10);
            clsComm.commData.PsetSensingLineMeasure = (short)((cbProtectValue10.Value > 0) ? 1 : 0);
            clsComm.commData.PsetCommunicationError = (short)((cbProtectValue11.Value > 0) ? 1 : 0);
            clsComm.commData.PsetCurrentSensorError = (short)((cbProtectValue12.Value > 0) ? 1 : 0);
            clsComm.commData.PsetInterLockError = (short)((cbProtectValue13.Value > 0) ? 1 : 0);
            clsComm.commData.PsetSelfSystemDiag = (short)((cbProtectValue14.Value > 0) ? 1 : 0);

            clsComm.commData.PsetCellOverVoltageRetain = (ushort)cbProtectRetainTime1.Value;
            clsComm.commData.PsetCellUnderVoltageRetain = (ushort)cbProtectRetainTime2.Value;
            clsComm.commData.PsetPackOverVoltageRetain = (ushort)cbProtectRetainTime3.Value;
            clsComm.commData.PsetPackUnderVoltageRetain = (ushort)cbProtectRetainTime4.Value;
            clsComm.commData.PsetCellVoltDiffRetain = (ushort)cbProtectRetainTime5.Value;
            clsComm.commData.PsetCellOverTempRetain = (ushort)cbProtectRetainTime6.Value;
            clsComm.commData.PsetCellUnderTempRetain = (ushort)cbProtectRetainTime7.Value;
            clsComm.commData.PsetChargeOverCurrentRetain = (ushort)cbProtectRetainTime8.Value;
            clsComm.commData.PsetDischargeOverCurrentRetain = (ushort)cbProtectRetainTime9.Value;
            clsComm.commData.PsetSensingLineMeasureRetain = (ushort)cbProtectRetainTime10.Value;
            clsComm.commData.PsetCommunicationErrorRetain = (ushort)cbProtectRetainTime11.Value;
            clsComm.commData.PsetCurrentSensorErrorRetain = (ushort)cbProtectRetainTime12.Value;
            clsComm.commData.PsetInterLockErrorRetain = (ushort)cbProtectRetainTime13.Value;
            clsComm.commData.PsetSelfSystemDiagRetain = (ushort)cbProtectRetainTime14.Value;

            if (logcomm.getReady()) logInfo("GUI -> BMS : Set Protect Value and Retain Time");
            clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_PROTECT_SET);
        }

        void ProtectReleaseSetting()
        {
            clsComm.commData.PRsetCellOverVoltage = (ushort)((int)cbProtectReleaseValue1.Value);
            clsComm.commData.PRsetCellUnderVoltage = (ushort)((int)cbProtectReleaseValue2.Value); 
            clsComm.commData.PRsetPackOverVoltage = (ushort)((double)cbProtectReleaseValue3.Value * 10);
            clsComm.commData.PRsetPackUnderVoltage = (ushort)((double)cbProtectReleaseValue4.Value * 10);
            clsComm.commData.PRsetCellVoltDiff = (ushort)((int)cbProtectReleaseValue5.Value);
            clsComm.commData.PRsetCellOverTemp = (short)(((double)cbProtectReleaseValue6.Value + 40) * 10);
            clsComm.commData.PRsetCellUnderTemp = (short)(((double)cbProtectReleaseValue7.Value + 40) * 10);
            clsComm.commData.PRsetChargeOverCurrent = (short)(((int)cbProtectReleaseValue8.Value + 300) * 10);
            clsComm.commData.PRsetDischargeOverCurrent = (short)(((int)cbProtectReleaseValue9.Value + 300) * 10);
            clsComm.commData.PRsetSensingLineMeasure = (short)((cbProtectReleaseValue10.Value > 0) ? 1 : 0);
            clsComm.commData.PRsetCommunicationError = (short)((cbProtectReleaseValue11.Value > 0) ? 1 : 0);
            clsComm.commData.PRsetCurrentSensorError = (short)((cbProtectReleaseValue12.Value > 0) ? 1 : 0); 
            clsComm.commData.PRsetInterLockError = (short)((cbProtectReleaseValue13.Value > 0) ? 1 : 0); 
            clsComm.commData.PRsetSelfSystemDiag = (short)((cbProtectReleaseValue14.Value > 0) ? 1 : 0); 
                              
            clsComm.commData.PRsetCellOverVoltageRetain = (ushort)cbProtectReleaseRetain1.Value;
            clsComm.commData.PRsetCellUnderVoltageRetain = (ushort)cbProtectReleaseRetain2.Value;
            clsComm.commData.PRsetPackOverVoltageRetain = (ushort)cbProtectReleaseRetain3.Value;
            clsComm.commData.PRsetPackUnderVoltageRetain = (ushort)cbProtectReleaseRetain4.Value;
            clsComm.commData.PRsetCellVoltDiffRetain = (ushort)cbProtectReleaseRetain5.Value;
            clsComm.commData.PRsetCellOverTempRetain = (ushort)cbProtectReleaseRetain6.Value;
            clsComm.commData.PRsetCellUnderTempRetain = (ushort)cbProtectReleaseRetain7.Value;
            clsComm.commData.PRsetChargeOverCurrentRetain = (ushort)cbProtectReleaseRetain8.Value;
            clsComm.commData.PRsetDischargeOverCurrentRetain = (ushort)cbProtectReleaseRetain9.Value;
            clsComm.commData.PRsetSensingLineMeasureRetain = (ushort)cbProtectReleaseRetain10.Value;
            clsComm.commData.PRsetCommunicationErrorRetain = (ushort)cbProtectReleaseRetain11.Value;
            clsComm.commData.PRsetCurrentSensorErrorRetain = (ushort)cbProtectReleaseRetain12.Value;
            clsComm.commData.PRsetInterLockErrorRetain = (ushort)cbProtectReleaseRetain13.Value;
            clsComm.commData.PRsetSelfSystemDiagRetain = (ushort)cbProtectReleaseRetain14.Value;

            if (logcomm.getReady()) logInfo("GUI -> BMS : Set Protect Release Value and Retain Time");

            clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_PROTECT_RELEASE_SET);
        }

        void RelayOn()
        {
            if (logcomm.getReady()) logInfo("GUI -> BMS : Set Relay On");
            clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_RLYON);
        }

        void RelayOff()
        {
            if (logcomm.getReady()) logInfo("GUI -> BMS : Set Relay Off");
            clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_RLYOFF);
        }


        void WarnningEnableLoad()
        {
            if (logcomm.getReady()) logInfo("GUI -> BMS : Loading Warnning Enable Value");
            clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_WARNNING_ENABLE_GET);
        }

        void WarnningLoad()
        {
            if (logcomm.getReady()) logInfo("GUI -> BMS : Loading Warnning Value");
            clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_WARNNING_GET);
        }

        void WarnningReleaseLoad()
        {
            if (logcomm.getReady()) logInfo("GUI -> BMS : Loading Warnning Release Value");
            clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_WARNNING_RELEASE_GET);
        }

        void ProtectEnableLoad()
        {
            if (logcomm.getReady()) logInfo("GUI -> BMS : Loading Protect Enable Value");
            clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_PROTECT_ENABLE_GET);
        }

        void ProtectLoad()
        {
            if (logcomm.getReady()) logInfo("GUI -> BMS : Loading Protect Value");
            clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_PROTECT_GET);
        }

        void ProtectReleaseLoad()
        {
            if (logcomm.getReady()) logInfo("GUI -> BMS : Loading Protect Release Value");
            clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_PROTECT_RELEASE_GET);
        }

        void SocSetting()
        {
            if (logcomm.getReady()) logInfo("GUI -> BMS : Set SOC Value : " + tbSetSOC.Text);
            clsComm.commData.SetSoc = (short)(Convert.ToInt16(tbSetSOC.Text) * 100);
            clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_SOC_SET);
        }

        void SohSetting()
        {
            if (logcomm.getReady()) logInfo("GUI->BMS : Set SOH Value : " + tbSetSOH.Text);
            clsComm.commData.SetSoh = (short)(Convert.ToInt16(tbSetSOH.Text) * 100);
            clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_SOH_SET);
        }

        void SocReset()
        {
            if (logcomm.getReady()) logInfo("GUI -> BMS : Reset SOC");
            clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_SOC_RESET);
        }

        void SohReset()
        {
            if (logcomm.getReady()) logInfo("GUI -> BMS : Reset SOH");
            clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_SOH_RESET);
        }

        void FactoryInit()
        {
            if (logcomm.getReady()) logInfo("GUI -> BMS : Reset To Factory");
            clsComm.queueSend.Enqueue(ClassCommunication.CMD_FACTORY_RESET);
        }

        bool isPreCommConnected = true;
        bool bStartCount = true;
        int connecting_time;

        private void timer1_Tick(object sender, EventArgs e)
        {
            connecting_time++;
            if (connecting_time >= 100 && bStartCount == true)
            {
                lbStandbyStatus.BackColor = System.Drawing.Color.Red;
                lbSerialStatus.BackColor = System.Drawing.Color.Red;
            }

            if (isPreCommConnected != clsComm.isCommConnected)
            {
                isPreCommConnected = clsComm.isCommConnected;
                if (clsComm.isCommConnected)
                {
                    logInfo("Serial Connected");
                    btConnect.Text = "연결 끊기";
                    btConnect.BackColor = System.Drawing.Color.LightSkyBlue;
                    lbStandbyStatus.BackColor = System.Drawing.Color.Green;
                    connecting_time = 0;
                    clsComm.dtPollTimer = DateTime.Now;
                    
                    bIsLoad = true;
                    clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_WARNNING_ENABLE_GET);
                    clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_PROTECT_ENABLE_GET);

                    clsComm.queueSend.Enqueue(ClassCommunication.CMD_SEND_VERSION_GET);

                    bStartCount = false;
                }
                else
                {
                    logInfo("Serial Disconnected");
                    btConnect.Text = "연결 하기";
                    btConnect.BackColor = System.Drawing.Color.Transparent;
                    lbStandbyStatus.BackColor = System.Drawing.Color.Red;
                }
            }

            if (clsComm.isCommOngoing == false)
            {
                lbSerialStatus.BackColor = System.Drawing.Color.Red;        // RS232(USB)
                //label151.BackColor = System.Drawing.Color.Red;        // 
            }
            else
            {
                lbSerialStatus.BackColor = System.Drawing.Color.Transparent;       // RS232(USB)
                //label151.BackColor = System.Drawing.Color.Green;       //
            }
        }

        static int Clicked_CMUbtn = 0;
        private void lbIC_Click(object sender, EventArgs e)
        {
            lbCell10.Visible = true;
            lbCell10Value.Visible = true;
            string name = ((Label)sender).Name.ToString();
            if (name.Equals("lb_IC1"))
            {
                Clicked_CMUbtn = 0;
                lb_IC1.BackColor = System.Drawing.Color.DodgerBlue; 
                lb_IC2.BackColor = System.Drawing.Color.LightBlue;
                lb_IC3.BackColor = System.Drawing.Color.LightBlue;
                lb_IC4.BackColor = System.Drawing.Color.LightBlue;
                lb_IC5.BackColor = System.Drawing.Color.LightBlue;
                lb_IC6.BackColor = System.Drawing.Color.LightBlue;
                lb_IC7.BackColor = System.Drawing.Color.LightBlue;
                lb_IC8.BackColor = System.Drawing.Color.LightBlue;
                lb_IC9.BackColor = System.Drawing.Color.LightBlue;
                lb_IC10.BackColor = System.Drawing.Color.LightBlue;
            }
            else if (name.Equals("lb_IC2"))
            {
                Clicked_CMUbtn = 1;
                lb_IC1.BackColor = System.Drawing.Color.LightBlue;
                lb_IC2.BackColor = System.Drawing.Color.DodgerBlue; 
                lb_IC3.BackColor = System.Drawing.Color.LightBlue;
                lb_IC4.BackColor = System.Drawing.Color.LightBlue;
                lb_IC5.BackColor = System.Drawing.Color.LightBlue;
                lb_IC6.BackColor = System.Drawing.Color.LightBlue;
                lb_IC7.BackColor = System.Drawing.Color.LightBlue;
                lb_IC8.BackColor = System.Drawing.Color.LightBlue;
                lb_IC9.BackColor = System.Drawing.Color.LightBlue;
                lb_IC10.BackColor = System.Drawing.Color.LightBlue;
            }
            else if (name.Equals("lb_IC3"))
            {
                Clicked_CMUbtn = 2;
                lb_IC1.BackColor = System.Drawing.Color.LightBlue;
                lb_IC2.BackColor = System.Drawing.Color.LightBlue;
                lb_IC3.BackColor = System.Drawing.Color.DodgerBlue; 
                lb_IC4.BackColor = System.Drawing.Color.LightBlue;
                lb_IC5.BackColor = System.Drawing.Color.LightBlue;
                lb_IC6.BackColor = System.Drawing.Color.LightBlue;
                lb_IC7.BackColor = System.Drawing.Color.LightBlue;
                lb_IC8.BackColor = System.Drawing.Color.LightBlue;
                lb_IC9.BackColor = System.Drawing.Color.LightBlue;
                lb_IC10.BackColor = System.Drawing.Color.LightBlue;
                lbCell10.Visible = false;
                lbCell10Value.Visible = false;
            }
            else if (name.Equals("lb_IC4"))
            {
                Clicked_CMUbtn = 3;
                lb_IC1.BackColor = System.Drawing.Color.LightBlue;
                lb_IC2.BackColor = System.Drawing.Color.LightBlue;
                lb_IC3.BackColor = System.Drawing.Color.LightBlue;
                lb_IC4.BackColor = System.Drawing.Color.DodgerBlue;
                lb_IC5.BackColor = System.Drawing.Color.LightBlue;
                lb_IC6.BackColor = System.Drawing.Color.LightBlue;
                lb_IC7.BackColor = System.Drawing.Color.LightBlue;
                lb_IC8.BackColor = System.Drawing.Color.LightBlue;
                lb_IC9.BackColor = System.Drawing.Color.LightBlue;
                lb_IC10.BackColor = System.Drawing.Color.LightBlue;
            }
            else if (name.Equals("lb_IC5"))
            {
                Clicked_CMUbtn = 4;
                lb_IC1.BackColor = System.Drawing.Color.LightBlue;
                lb_IC2.BackColor = System.Drawing.Color.LightBlue;
                lb_IC3.BackColor = System.Drawing.Color.LightBlue;
                lb_IC4.BackColor = System.Drawing.Color.LightBlue;
                lb_IC5.BackColor = System.Drawing.Color.DodgerBlue;
                lb_IC6.BackColor = System.Drawing.Color.LightBlue;
                lb_IC7.BackColor = System.Drawing.Color.LightBlue;
                lb_IC8.BackColor = System.Drawing.Color.LightBlue;
                lb_IC9.BackColor = System.Drawing.Color.LightBlue;
                lb_IC10.BackColor = System.Drawing.Color.LightBlue;
            }
            else if (name.Equals("lb_IC6"))
            {
                Clicked_CMUbtn = 5;
                lb_IC1.BackColor = System.Drawing.Color.LightBlue;
                lb_IC2.BackColor = System.Drawing.Color.LightBlue;
                lb_IC3.BackColor = System.Drawing.Color.LightBlue;
                lb_IC4.BackColor = System.Drawing.Color.LightBlue;
                lb_IC5.BackColor = System.Drawing.Color.LightBlue;
                lb_IC6.BackColor = System.Drawing.Color.DodgerBlue;
                lb_IC7.BackColor = System.Drawing.Color.LightBlue;
                lb_IC8.BackColor = System.Drawing.Color.LightBlue;
                lb_IC9.BackColor = System.Drawing.Color.LightBlue;
                lb_IC10.BackColor = System.Drawing.Color.LightBlue;
                lbCell10.Visible = false;
                lbCell10Value.Visible = false;
            }
            else if (name.Equals("lb_IC7"))
            {
                Clicked_CMUbtn = 6;
                lb_IC1.BackColor = System.Drawing.Color.LightBlue;
                lb_IC2.BackColor = System.Drawing.Color.LightBlue;
                lb_IC3.BackColor = System.Drawing.Color.LightBlue;
                lb_IC4.BackColor = System.Drawing.Color.LightBlue;
                lb_IC5.BackColor = System.Drawing.Color.LightBlue;
                lb_IC6.BackColor = System.Drawing.Color.LightBlue;
                lb_IC7.BackColor = System.Drawing.Color.DodgerBlue;
                lb_IC8.BackColor = System.Drawing.Color.LightBlue;
                lb_IC9.BackColor = System.Drawing.Color.LightBlue;
                lb_IC10.BackColor = System.Drawing.Color.LightBlue;
            }
            else if (name.Equals("lb_IC8"))
            {
                Clicked_CMUbtn = 7;
                lb_IC1.BackColor = System.Drawing.Color.LightBlue;
                lb_IC2.BackColor = System.Drawing.Color.LightBlue;
                lb_IC3.BackColor = System.Drawing.Color.LightBlue;
                lb_IC4.BackColor = System.Drawing.Color.LightBlue;
                lb_IC5.BackColor = System.Drawing.Color.LightBlue;
                lb_IC6.BackColor = System.Drawing.Color.LightBlue;
                lb_IC7.BackColor = System.Drawing.Color.LightBlue;
                lb_IC8.BackColor = System.Drawing.Color.DodgerBlue;
                lb_IC9.BackColor = System.Drawing.Color.LightBlue;
                lb_IC10.BackColor = System.Drawing.Color.LightBlue;
            }
            else if (name.Equals("lb_IC9"))
            {
                Clicked_CMUbtn = 8;
                lb_IC1.BackColor = System.Drawing.Color.LightBlue;
                lb_IC2.BackColor = System.Drawing.Color.LightBlue;
                lb_IC3.BackColor = System.Drawing.Color.LightBlue;
                lb_IC4.BackColor = System.Drawing.Color.LightBlue;
                lb_IC5.BackColor = System.Drawing.Color.LightBlue;
                lb_IC6.BackColor = System.Drawing.Color.LightBlue;
                lb_IC7.BackColor = System.Drawing.Color.LightBlue;
                lb_IC8.BackColor = System.Drawing.Color.LightBlue;
                lb_IC9.BackColor = System.Drawing.Color.DodgerBlue;
                lb_IC10.BackColor = System.Drawing.Color.LightBlue;
            }
            else if (name.Equals("lb_IC10"))
            {
                Clicked_CMUbtn = 9;
                lb_IC1.BackColor = System.Drawing.Color.LightBlue;
                lb_IC2.BackColor = System.Drawing.Color.LightBlue;
                lb_IC3.BackColor = System.Drawing.Color.LightBlue;
                lb_IC4.BackColor = System.Drawing.Color.LightBlue;
                lb_IC5.BackColor = System.Drawing.Color.LightBlue;
                lb_IC6.BackColor = System.Drawing.Color.LightBlue;
                lb_IC7.BackColor = System.Drawing.Color.LightBlue;
                lb_IC8.BackColor = System.Drawing.Color.LightBlue;
                lb_IC9.BackColor = System.Drawing.Color.LightBlue;
                lb_IC10.BackColor = System.Drawing.Color.DodgerBlue;
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

        private void btProtectSettingSave_Click(object sender, EventArgs e)
        {
            bIsLoad = false;
            gbProtectSet.BackColor = Color.Red;
            gbProtectRelease.BackColor = Color.Red;
            ProtectEnable();
        }

        private void btProtectSettingLoad_Click(object sender, EventArgs e)
        {
            bIsLoad = true;
            gbProtectSet.BackColor = Color.Red;
            gbProtectRelease.BackColor = Color.Red;
            ProtectEnableLoad();
        }

        private void btWarnningSettingSave_Click(object sender, EventArgs e)
        {
            bIsLoad = false;
            gbWarnningSet.BackColor = Color.Red;
            gbWarnningRelease.BackColor = Color.Red;
            WarnningEnable();
        }

        private void btWarnningSettingLoad_Click(object sender, EventArgs e)
        {
            bIsLoad = true;
            gbWarnningSet.BackColor = Color.Red;
            gbWarnningRelease.BackColor = Color.Red;
            WarnningEnableLoad();
        }

        private void btSetSOC_Click(object sender, EventArgs e)
        {
            SocSetting();
            logInfo("GUI -> BMS : Set SOC");
        }

        private void btSetSOH_Click(object sender, EventArgs e)
        {
            SohSetting();
            logInfo("GUI -> BMS : Set SOH");
        }

        private void btInitSOC_Click(object sender, EventArgs e)
        {
            SocReset();
            logInfo("GUI -> BMS : Reset SOC");
        }

        private void btInitSOH_Click(object sender, EventArgs e)
        {
            SohReset();
            logInfo("GUI -> BMS : Reset SOH");
        }

        private void btFactoryInit_Click(object sender, EventArgs e)
        {
            FactoryInit();
            logInfo("GUI -> BMS : Reset To Factory Value");
        }

        public void logDataInfo(string msg)
        {
            if (logcomm.getReady() == false) return;

            this.logcomm.logInfo(msg);
        }

        public void logInfo(string msg, bool bDisplay = true)
        {
            //if (logcomm.getReady() == false) return;
            //if (bDisplay == true) tbLogStatus.AppendText("[info]" + msg + "\r\n");

            string temp_msg;

            clsComm.commData.uLogCount++;

            temp_msg = DateTime.Now.ToString("hh:mm:ss.fff") + ", ";
            temp_msg += string.Format("Total = {0,-5} , ", clsComm.commData.uLogCount);
            temp_msg += string.Format("Log = {0,-5} : ", clsComm.commData.uDataLogCount);

            if (bDisplay == true) tbLogStatus.AppendText(temp_msg + "[info]" + msg + "\r\n");
        }

        public void logWarnning(string msg, bool bDisplay = true)
        {
            //if (logcomm.getReady() == false) return;

            if (bDisplay == true) tbLogStatus.AppendText("[Warnning]" + msg + "\r\n");
            
        }

        public void logError(string msg, bool bDisplay = true)
        {
            //if (logcomm.getReady() == false) return;

            if (bDisplay == true) tbLogStatus.AppendText("[Error]" + msg + "\r\n");
            
        }

        public void logDebug(string msg, bool bDisplay = true)
        {
            //if (logcomm.getReady() == false) return;

            if (bDisplay == true) tbLogStatus.AppendText("[Debug]" + msg + "\r\n");
        }

        public void logFatal(string msg, bool bDisplay = true)
        {
            //if (logcomm.getReady() == false) return;

            if (bDisplay == true) tbLogStatus.AppendText("[Fatal]" + msg + "\r\n");
        }

        private void btMonitoringCycleTimeSet_Click(object sender, EventArgs e)
        {
            clsComm.commData.iMonitoringCycleTime = Convert.ToInt32(tbMonitoringCycleTime.Text);
        }

        private void btLogClear_Click(object sender, EventArgs e)
        {
            tbLogStatus.Clear();
        }

        private void btSaveFile_Click(object sender, EventArgs e)
        {
            IniFile iniFile = new IniFile(Directory.GetCurrentDirectory() + @"\setting.ini");

            clsComm.commData.WCellOverVoltageEnable          = (byte)(cbWarnningEnable1.Checked ? 1 : 0);
            clsComm.commData.WCellUnderVoltageEnable         = (byte)(cbWarnningEnable2.Checked ? 1 : 0);
            clsComm.commData.WPackOverVoltageEnable          = (byte)(cbWarnningEnable3.Checked ? 1 : 0);
            clsComm.commData.WPackUnderVoltageEnable         = (byte)(cbWarnningEnable4.Checked ? 1 : 0);
            clsComm.commData.WCellVoltageDiffEnable          = (byte)(cbWarnningEnable5.Checked ? 1 : 0);
            clsComm.commData.WCellOverTempEnable             = (byte)(cbWarnningEnable6.Checked ? 1 : 0);
            clsComm.commData.WCellUnderTempEnable            = (byte)(cbWarnningEnable7.Checked ? 1 : 0);
            clsComm.commData.WChargingOverCurrentEnable      = (byte)(cbWarnningEnable8.Checked ? 1 : 0);
            clsComm.commData.WDisChargingOverCurrentEnable   = (byte)(cbWarnningEnable9.Checked ? 1 : 0);
            clsComm.commData.WLowSOCEnable                   = (byte)(cbWarnningEnable10.Checked ? 1 : 0);
            clsComm.commData.WLowSOHEnable                   = (byte)(cbWarnningEnable11.Checked ? 1 : 0);
                                                             
            clsComm.commData.WsetCellOverVoltage             = (ushort)cbWarnningValue1.Value;
            clsComm.commData.WsetCellUnderVoltage            = (ushort)cbWarnningValue2.Value;
            clsComm.commData.WsetPackOverVoltage             = (ushort)cbWarnningValue3.Value;
            clsComm.commData.WsetPackUnderVoltage            = (ushort)cbWarnningValue4.Value;
            clsComm.commData.WsetCellVoltDiff                = (ushort)cbWarnningValue5.Value;
            clsComm.commData.WsetCellOverTemp                = (short)cbWarnningValue6.Value;
            clsComm.commData.WsetCellUnderTemp               = (short)cbWarnningValue7.Value;
            clsComm.commData.WsetChargeOverCurrent           = (short)cbWarnningValue8.Value;
            clsComm.commData.WsetDischargeOverCurrent        = (short)cbWarnningValue9.Value;
            clsComm.commData.WsetLowSOC                      = (ushort)cbWarnningValue10.Value;
            clsComm.commData.WsetLowSOH                      = (ushort)cbWarnningValue11.Value;
            clsComm.commData.WsetCellOverVoltageRetain       = (ushort)cbWarnningRetainTime1.Value;
            clsComm.commData.WsetCellUnderVoltageRetain      = (ushort)cbWarnningRetainTime2.Value;
            clsComm.commData.WsetPackOverVoltageRetain       = (ushort)cbWarnningRetainTime3.Value;
            clsComm.commData.WsetPackUnderVoltageRetain      = (ushort)cbWarnningRetainTime4.Value;
            clsComm.commData.WsetCellVoltDiffRetain          = (ushort)cbWarnningRetainTime5.Value;
            clsComm.commData.WsetCellOverTempRetain          = (ushort)cbWarnningRetainTime6.Value;
            clsComm.commData.WsetCellUnderTempRetain         = (ushort)cbWarnningRetainTime7.Value;
            clsComm.commData.WsetChargeOverCurrentRetain     = (ushort)cbWarnningRetainTime8.Value;
            clsComm.commData.WsetDischargeOverCurrentRetain  = (ushort)cbWarnningRetainTime9.Value;
            clsComm.commData.WsetLowSOCRetain                = (ushort)cbWarnningRetainTime10.Value;
            clsComm.commData.WsetLowSOHRetain                = (ushort)cbWarnningRetainTime11.Value;
            clsComm.commData.WRsetCellOverVoltage            = (ushort)cbWarnningReleaseValue1.Value;
            clsComm.commData.WRsetCellUnderVoltage           = (ushort)cbWarnningReleaseValue2.Value;
            clsComm.commData.WRsetPackOverVoltage            = (ushort)cbWarnningReleaseValue3.Value;
            clsComm.commData.WRsetPackUnderVoltage           = (ushort)cbWarnningReleaseValue4.Value;
            clsComm.commData.WRsetCellVoltDiff               = (ushort)cbWarnningReleaseValue5.Value;
            clsComm.commData.WRsetCellOverTemp               = (short)cbWarnningReleaseValue6.Value;
            clsComm.commData.WRsetCellUnderTemp              = (short)cbWarnningReleaseValue7.Value;
            clsComm.commData.WRsetChargeOverCurrent          = (short)cbWarnningReleaseValue8.Value;
            clsComm.commData.WRsetDischargeOverCurrent       = (short)cbWarnningReleaseValue9.Value;
            clsComm.commData.WRsetLowSOC                     = (ushort)cbWarnningReleaseValue10.Value;
            //clsComm.commData.WRsetLowSOH                     = (ushort)cbWarnningReleaseValue11.Value;
            clsComm.commData.WRsetCellOverVoltageRetain      = (ushort)cbWarnningReleaseRetain1.Value;
            clsComm.commData.WRsetCellUnderVoltageRetain     = (ushort)cbWarnningReleaseRetain2.Value;
            clsComm.commData.WRsetPackOverVoltageRetain      = (ushort)cbWarnningReleaseRetain3.Value;
            clsComm.commData.WRsetPackUnderVoltageRetain     = (ushort)cbWarnningReleaseRetain4.Value;
            clsComm.commData.WRsetCellVoltDiffRetain         = (ushort)cbWarnningReleaseRetain5.Value;
            clsComm.commData.WRsetCellOverTempRetain         = (ushort)cbWarnningReleaseRetain6.Value;
            clsComm.commData.WRsetCellUnderTempRetain        = (ushort)cbWarnningReleaseRetain7.Value;
            clsComm.commData.WRsetChargeOverCurrentRetain    = (ushort)cbWarnningReleaseRetain8.Value;
            clsComm.commData.WRsetDischargeOverCurrentRetain = (ushort)cbWarnningReleaseRetain9.Value;
            clsComm.commData.WRsetLowSOCRetain               = (ushort)cbWarnningReleaseRetain10.Value;
            //clsComm.commData.WRsetLowSOHRetain               = (ushort)cbWarnningReleaseRetain11.Value;

            iniFile.IniWriteValue("Warnning", "WCellOverVoltageEnable         ", clsComm.commData.WCellOverVoltageEnable.ToString());
            iniFile.IniWriteValue("Warnning", "WCellUnderVoltageEnable        ", clsComm.commData.WCellUnderVoltageEnable.ToString());
            iniFile.IniWriteValue("Warnning", "WPackOverVoltageEnable         ", clsComm.commData.WPackOverVoltageEnable.ToString());
            iniFile.IniWriteValue("Warnning", "WPackUnderVoltageEnable        ", clsComm.commData.WPackUnderVoltageEnable.ToString());
            iniFile.IniWriteValue("Warnning", "WCellVoltageDiffEnable         ", clsComm.commData.WCellVoltageDiffEnable.ToString());
            iniFile.IniWriteValue("Warnning", "WCellOverTempEnable            ", clsComm.commData.WCellOverTempEnable.ToString());
            iniFile.IniWriteValue("Warnning", "WCellUnderTempEnable           ", clsComm.commData.WCellUnderTempEnable.ToString());
            iniFile.IniWriteValue("Warnning", "WChargingOverCurrentEnable     ", clsComm.commData.WChargingOverCurrentEnable.ToString());
            iniFile.IniWriteValue("Warnning", "WDisChargingOverCurrentEnable  ", clsComm.commData.WDisChargingOverCurrentEnable.ToString());
            iniFile.IniWriteValue("Warnning", "WLowSOCEnable                  ", clsComm.commData.WLowSOCEnable.ToString());
            iniFile.IniWriteValue("Warnning", "WLowSOHEnable                  ", clsComm.commData.WLowSOHEnable.ToString());
            iniFile.IniWriteValue("Warnning", "WsetCellOverVoltage            ", clsComm.commData.WsetCellOverVoltage.ToString());
            iniFile.IniWriteValue("Warnning", "WsetCellUnderVoltage           ", clsComm.commData.WsetCellUnderVoltage.ToString());
            iniFile.IniWriteValue("Warnning", "WsetPackOverVoltage            ", clsComm.commData.WsetPackOverVoltage.ToString());
            iniFile.IniWriteValue("Warnning", "WsetPackUnderVoltage           ", clsComm.commData.WsetPackUnderVoltage.ToString());
            iniFile.IniWriteValue("Warnning", "WsetCellVoltDiff               ", clsComm.commData.WsetCellVoltDiff.ToString());
            iniFile.IniWriteValue("Warnning", "WsetCellOverTemp               ", clsComm.commData.WsetCellOverTemp.ToString());
            iniFile.IniWriteValue("Warnning", "WsetCellUnderTemp              ", clsComm.commData.WsetCellUnderTemp.ToString());
            iniFile.IniWriteValue("Warnning", "WsetChargeOverCurrent          ", clsComm.commData.WsetChargeOverCurrent.ToString());
            iniFile.IniWriteValue("Warnning", "WsetDischargeOverCurrent       ", clsComm.commData.WsetDischargeOverCurrent.ToString());
            iniFile.IniWriteValue("Warnning", "WsetLowSOC                     ", clsComm.commData.WsetLowSOC.ToString());
            iniFile.IniWriteValue("Warnning", "WsetLowSOH                     ", clsComm.commData.WsetLowSOH.ToString());
            iniFile.IniWriteValue("Warnning", "WsetCellOverVoltageRetain      ", clsComm.commData.WsetCellOverVoltageRetain.ToString());
            iniFile.IniWriteValue("Warnning", "WsetCellUnderVoltageRetain     ", clsComm.commData.WsetCellUnderVoltageRetain.ToString());
            iniFile.IniWriteValue("Warnning", "WsetPackOverVoltageRetain      ", clsComm.commData.WsetPackOverVoltageRetain.ToString());
            iniFile.IniWriteValue("Warnning", "WsetPackUnderVoltageRetain     ", clsComm.commData.WsetPackUnderVoltageRetain.ToString());
            iniFile.IniWriteValue("Warnning", "WsetCellVoltDiffRetain         ", clsComm.commData.WsetCellVoltDiffRetain.ToString());
            iniFile.IniWriteValue("Warnning", "WsetCellOverTempRetain         ", clsComm.commData.WsetCellOverTempRetain.ToString());
            iniFile.IniWriteValue("Warnning", "WsetCellUnderTempRetain        ", clsComm.commData.WsetCellUnderTempRetain.ToString());
            iniFile.IniWriteValue("Warnning", "WsetChargeOverCurrentRetain    ", clsComm.commData.WsetChargeOverCurrentRetain.ToString());
            iniFile.IniWriteValue("Warnning", "WsetDischargeOverCurrentRetain ", clsComm.commData.WsetDischargeOverCurrentRetain.ToString());
            iniFile.IniWriteValue("Warnning", "WsetLowSOCRetain               ", clsComm.commData.WsetLowSOCRetain.ToString());
            iniFile.IniWriteValue("Warnning", "WsetLowSOHRetain               ", clsComm.commData.WsetLowSOHRetain.ToString());
            iniFile.IniWriteValue("Warnning", "WRsetCellOverVoltage           ", clsComm.commData.WRsetCellOverVoltage.ToString());
            iniFile.IniWriteValue("Warnning", "WRsetCellUnderVoltage          ", clsComm.commData.WRsetCellUnderVoltage.ToString());
            iniFile.IniWriteValue("Warnning", "WRsetPackOverVoltage           ", clsComm.commData.WRsetPackOverVoltage.ToString());
            iniFile.IniWriteValue("Warnning", "WRsetPackUnderVoltage          ", clsComm.commData.WRsetPackUnderVoltage.ToString());
            iniFile.IniWriteValue("Warnning", "WRsetCellVoltDiff              ", clsComm.commData.WRsetCellVoltDiff.ToString());
            iniFile.IniWriteValue("Warnning", "WRsetCellOverTemp              ", clsComm.commData.WRsetCellOverTemp.ToString());
            iniFile.IniWriteValue("Warnning", "WRsetCellUnderTemp             ", clsComm.commData.WRsetCellUnderTemp.ToString());
            iniFile.IniWriteValue("Warnning", "WRsetChargeOverCurrent         ", clsComm.commData.WRsetChargeOverCurrent.ToString());
            iniFile.IniWriteValue("Warnning", "WRsetDischargeOverCurrent      ", clsComm.commData.WRsetDischargeOverCurrent.ToString());
            iniFile.IniWriteValue("Warnning", "WRsetLowSOC                    ", clsComm.commData.WRsetLowSOC.ToString());
            //iniFile.IniWriteValue("Warnning", "WRsetLowSOH                    ", clsComm.commData.WRsetLowSOH.ToString());
            iniFile.IniWriteValue("Warnning", "WRsetCellOverVoltageRetain     ", clsComm.commData.WRsetCellOverVoltageRetain.ToString());
            iniFile.IniWriteValue("Warnning", "WRsetCellUnderVoltageRetain    ", clsComm.commData.WRsetCellUnderVoltageRetain.ToString());
            iniFile.IniWriteValue("Warnning", "WRsetPackOverVoltageRetain     ", clsComm.commData.WRsetPackOverVoltageRetain.ToString());
            iniFile.IniWriteValue("Warnning", "WRsetPackUnderVoltageRetain    ", clsComm.commData.WRsetPackUnderVoltageRetain.ToString());
            iniFile.IniWriteValue("Warnning", "WRsetCellVoltDiffRetain        ", clsComm.commData.WRsetCellVoltDiffRetain.ToString());
            iniFile.IniWriteValue("Warnning", "WRsetCellOverTempRetain        ", clsComm.commData.WRsetCellOverTempRetain.ToString());
            iniFile.IniWriteValue("Warnning", "WRsetCellUnderTempRetain       ", clsComm.commData.WRsetCellUnderTempRetain.ToString());
            iniFile.IniWriteValue("Warnning", "WRsetChargeOverCurrentRetain   ", clsComm.commData.WRsetChargeOverCurrentRetain.ToString());
            iniFile.IniWriteValue("Warnning", "WRsetDischargeOverCurrentRetain", clsComm.commData.WRsetDischargeOverCurrentRetain.ToString());
            iniFile.IniWriteValue("Warnning", "WRsetLowSOCRetain              ", clsComm.commData.WRsetLowSOCRetain.ToString());
            //iniFile.IniWriteValue("Warnning", "WRsetLowSOHRetain              ", clsComm.commData.WRsetLowSOHRetain.ToString());
            logInfo("[PC]Save warnning config data");
        }

        private void btLoadFile_Click(object sender, EventArgs e)
        {
            IniFile iniFile = new IniFile(Directory.GetCurrentDirectory() + @"\setting.ini");

            String strWCellOverVoltageEnable          = iniFile.IniReadValue("Warnning", "WCellOverVoltageEnable");
            String strWCellUnderVoltageEnable         = iniFile.IniReadValue("Warnning", "WCellUnderVoltageEnable");
            String strWPackOverVoltageEnable          = iniFile.IniReadValue("Warnning", "WPackOverVoltageEnable");
            String strWPackUnderVoltageEnable         = iniFile.IniReadValue("Warnning", "WPackUnderVoltageEnable");
            String strWCellVoltageDiffEnable          = iniFile.IniReadValue("Warnning", "WCellVoltageDiffEnable");
            String strWCellOverTempEnable             = iniFile.IniReadValue("Warnning", "WCellOverTempEnable");
            String strWCellUnderTempEnable            = iniFile.IniReadValue("Warnning", "WCellUnderTempEnable");
            String strWChargingOverCurrentEnable      = iniFile.IniReadValue("Warnning", "WChargingOverCurrentEnable");
            String strWDisChargingOverCurrentEnable   = iniFile.IniReadValue("Warnning", "WDisChargingOverCurrentEnable");
            String strWLowSOCEnable                   = iniFile.IniReadValue("Warnning", "WLowSOCEnable");
            String strWLowSOHEnable                   = iniFile.IniReadValue("Warnning", "WLowSOHEnable");
            String strWsetCellOverVoltage             = iniFile.IniReadValue("Warnning", "WsetCellOverVoltage");
            String strWsetCellUnderVoltage            = iniFile.IniReadValue("Warnning", "WsetCellUnderVoltage");
            String strWsetPackOverVoltage             = iniFile.IniReadValue("Warnning", "WsetPackOverVoltage");
            String strWsetPackUnderVoltage            = iniFile.IniReadValue("Warnning", "WsetPackUnderVoltage");
            String strWsetCellVoltDiff                = iniFile.IniReadValue("Warnning", "WsetCellVoltDiff");
            String strWsetCellOverTemp                = iniFile.IniReadValue("Warnning", "WsetCellOverTemp");
            String strWsetCellUnderTemp               = iniFile.IniReadValue("Warnning", "WsetCellUnderTemp");
            String strWsetChargeOverCurrent           = iniFile.IniReadValue("Warnning", "WsetChargeOverCurrent");
            String strWsetDischargeOverCurrent        = iniFile.IniReadValue("Warnning", "WsetDischargeOverCurrent");
            String strWsetLowSOC                      = iniFile.IniReadValue("Warnning", "WsetLowSOC");
            String strWsetLowSOH                      = iniFile.IniReadValue("Warnning", "WsetLowSOH");
            String strWsetCellOverVoltageRetain       = iniFile.IniReadValue("Warnning", "WsetCellOverVoltageRetain");
            String strWsetCellUnderVoltageRetain      = iniFile.IniReadValue("Warnning", "WsetCellUnderVoltageRetain");
            String strWsetPackOverVoltageRetain       = iniFile.IniReadValue("Warnning", "WsetPackOverVoltageRetain");
            String strWsetPackUnderVoltageRetain      = iniFile.IniReadValue("Warnning", "WsetPackUnderVoltageRetain");
            String strWsetCellVoltDiffRetain          = iniFile.IniReadValue("Warnning", "WsetCellVoltDiffRetain");
            String strWsetCellOverTempRetain          = iniFile.IniReadValue("Warnning", "WsetCellOverTempRetain");
            String strWsetCellUnderTempRetain         = iniFile.IniReadValue("Warnning", "WsetCellUnderTempRetain");
            String strWsetChargeOverCurrentRetain     = iniFile.IniReadValue("Warnning", "WsetChargeOverCurrentRetain");
            String strWsetDischargeOverCurrentRetain  = iniFile.IniReadValue("Warnning", "WsetDischargeOverCurrentRetain");
            String strWsetLowSOCRetain                = iniFile.IniReadValue("Warnning", "WsetLowSOCRetain");
            String strWsetLowSOHRetain                = iniFile.IniReadValue("Warnning", "WsetLowSOHRetain");
            String strWRsetCellOverVoltage            = iniFile.IniReadValue("Warnning", "WRsetCellOverVoltage");
            String strWRsetCellUnderVoltage           = iniFile.IniReadValue("Warnning", "WRsetCellUnderVoltage");
            String strWRsetPackOverVoltage            = iniFile.IniReadValue("Warnning", "WRsetPackOverVoltage");
            String strWRsetPackUnderVoltage           = iniFile.IniReadValue("Warnning", "WRsetPackUnderVoltage");
            String strWRsetCellVoltDiff               = iniFile.IniReadValue("Warnning", "WRsetCellVoltDiff");
            String strWRsetCellOverTemp               = iniFile.IniReadValue("Warnning", "WRsetCellOverTemp");
            String strWRsetCellUnderTemp              = iniFile.IniReadValue("Warnning", "WRsetCellUnderTemp");
            String strWRsetChargeOverCurrent          = iniFile.IniReadValue("Warnning", "WRsetChargeOverCurrent");
            String strWRsetDischargeOverCurrent       = iniFile.IniReadValue("Warnning", "WRsetDischargeOverCurrent");
            String strWRsetLowSOC                     = iniFile.IniReadValue("Warnning", "WRsetLowSOC");
            String strWRsetLowSOH                     = iniFile.IniReadValue("Warnning", "WRsetLowSOH");
            String strWRsetCellOverVoltageRetain      = iniFile.IniReadValue("Warnning", "WRsetCellOverVoltageRetain");
            String strWRsetCellUnderVoltageRetain     = iniFile.IniReadValue("Warnning", "WRsetCellUnderVoltageRetain");
            String strWRsetPackOverVoltageRetain      = iniFile.IniReadValue("Warnning", "WRsetPackOverVoltageRetain");
            String strWRsetPackUnderVoltageRetain     = iniFile.IniReadValue("Warnning", "WRsetPackUnderVoltageRetain");
            String strWRsetCellVoltDiffRetain         = iniFile.IniReadValue("Warnning", "WRsetCellVoltDiffRetain");
            String strWRsetCellOverTempRetain         = iniFile.IniReadValue("Warnning", "WRsetCellOverTempRetain");
            String strWRsetCellUnderTempRetain        = iniFile.IniReadValue("Warnning", "WRsetCellUnderTempRetain");
            String strWRsetChargeOverCurrentRetain    = iniFile.IniReadValue("Warnning", "WRsetChargeOverCurrentRetain");
            String strWRsetDischargeOverCurrentRetain = iniFile.IniReadValue("Warnning", "WRsetDischargeOverCurrentRetain");
            String strWRsetLowSOCRetain               = iniFile.IniReadValue("Warnning", "WRsetLowSOCRetain");
            String strWRsetLowSOHRetain               = iniFile.IniReadValue("Warnning", "WRsetLowSOHRetain");

            cbWarnningEnable1.Checked  = (byte.Parse(strWCellOverVoltageEnable) == 1) ? true: false;
            cbWarnningEnable2.Checked  = (byte.Parse(strWCellUnderVoltageEnable) == 1) ? true : false;
            cbWarnningEnable3.Checked  = (byte.Parse(strWPackOverVoltageEnable) == 1) ? true : false;
            cbWarnningEnable4.Checked  = (byte.Parse(strWPackUnderVoltageEnable) == 1) ? true : false;
            cbWarnningEnable5.Checked  = (byte.Parse(strWCellVoltageDiffEnable) == 1) ? true : false;
            cbWarnningEnable6.Checked  = (byte.Parse(strWCellOverTempEnable) == 1) ? true : false;
            cbWarnningEnable7.Checked  = (byte.Parse(strWCellUnderTempEnable) == 1) ? true : false;
            cbWarnningEnable8.Checked  = (byte.Parse(strWChargingOverCurrentEnable) == 1) ? true : false;
            cbWarnningEnable9.Checked  = (byte.Parse(strWDisChargingOverCurrentEnable) == 1) ? true : false;
            cbWarnningEnable10.Checked = (byte.Parse(strWLowSOCEnable) == 1) ? true : false;
            cbWarnningEnable11.Checked = (byte.Parse(strWLowSOHEnable) == 1) ? true : false;

            cbWarnningValue1.Value = Int16.Parse(strWsetCellOverVoltage);
            cbWarnningValue2.Value = Int16.Parse(strWsetCellUnderVoltage);
            cbWarnningValue3.Value = Int16.Parse(strWsetPackOverVoltage);
            cbWarnningValue4.Value = Int16.Parse(strWsetPackUnderVoltage);
            cbWarnningValue5.Value = Int16.Parse(strWsetCellVoltDiff);
            cbWarnningValue6.Value = Int16.Parse(strWsetCellOverTemp);
            cbWarnningValue7.Value = Int16.Parse(strWsetCellUnderTemp);
            cbWarnningValue8.Value = Int16.Parse(strWsetChargeOverCurrent);
            cbWarnningValue9.Value = Int16.Parse(strWsetDischargeOverCurrent);
            cbWarnningValue10.Value = Int16.Parse(strWsetLowSOC);
            cbWarnningValue11.Value = Int16.Parse(strWsetLowSOH);
            cbWarnningRetainTime1.Value = Int16.Parse(strWsetCellOverVoltageRetain);
            cbWarnningRetainTime2.Value = Int16.Parse(strWsetCellUnderVoltageRetain);     
            cbWarnningRetainTime3.Value = Int16.Parse(strWsetPackOverVoltageRetain);
            cbWarnningRetainTime4.Value = Int16.Parse(strWsetPackUnderVoltageRetain);
            cbWarnningRetainTime5.Value = Int16.Parse(strWsetCellVoltDiffRetain);
            cbWarnningRetainTime6.Value = Int16.Parse(strWsetCellOverTempRetain);
            cbWarnningRetainTime7.Value = Int16.Parse(strWsetCellUnderTempRetain);
            cbWarnningRetainTime8.Value = Int16.Parse(strWsetChargeOverCurrentRetain);
            cbWarnningRetainTime9.Value = Int16.Parse(strWsetDischargeOverCurrentRetain);
            cbWarnningRetainTime10.Value = Int16.Parse(strWsetLowSOCRetain);
            cbWarnningRetainTime11.Value = Int16.Parse(strWsetLowSOHRetain);
            cbWarnningReleaseValue1.Value = Int16.Parse(strWRsetCellOverVoltage);
            cbWarnningReleaseValue2.Value = Int16.Parse(strWRsetCellUnderVoltage);
            cbWarnningReleaseValue3.Value = Int16.Parse(strWRsetPackOverVoltage);
            cbWarnningReleaseValue4.Value = Int16.Parse(strWRsetPackUnderVoltage);
            cbWarnningReleaseValue5.Value = Int16.Parse(strWRsetCellVoltDiff);
            cbWarnningReleaseValue6.Value = Int16.Parse(strWRsetCellOverTemp);
            cbWarnningReleaseValue7.Value = Int16.Parse(strWRsetCellUnderTemp);
            cbWarnningReleaseValue8.Value = Int16.Parse(strWRsetChargeOverCurrent);
            cbWarnningReleaseValue9.Value = Int16.Parse(strWRsetDischargeOverCurrent);
            cbWarnningReleaseValue10.Value = Int16.Parse(strWRsetLowSOC);
 
            cbWarnningReleaseRetain1.Value = Int16.Parse(strWRsetCellOverVoltageRetain);
            cbWarnningReleaseRetain2.Value = Int16.Parse(strWRsetCellUnderVoltageRetain);
            cbWarnningReleaseRetain3.Value = Int16.Parse(strWRsetPackOverVoltageRetain);
            cbWarnningReleaseRetain4.Value = Int16.Parse(strWRsetPackUnderVoltageRetain);
            cbWarnningReleaseRetain5.Value = Int16.Parse(strWRsetCellVoltDiffRetain);
            cbWarnningReleaseRetain6.Value = Int16.Parse(strWRsetCellOverTempRetain);
            cbWarnningReleaseRetain7.Value = Int16.Parse(strWRsetCellUnderTempRetain);
            cbWarnningReleaseRetain8.Value = Int16.Parse(strWRsetChargeOverCurrentRetain);
            cbWarnningReleaseRetain9.Value = Int16.Parse(strWRsetDischargeOverCurrentRetain);
            cbWarnningReleaseRetain10.Value = Int16.Parse(strWRsetLowSOCRetain);

            logInfo("[PC]Load warnning config data");
        }

        private void btSaveFileProtect_Click(object sender, EventArgs e)
        {
            IniFile iniFile = new IniFile(Directory.GetCurrentDirectory() + @"\setting.ini");

            clsComm.commData.PCellOverVoltageEnable = (byte)(cbProtectEnable1.Checked ? 1 : 0);
            clsComm.commData.PCellUnderVoltageEnable = (byte)(cbProtectEnable2.Checked ? 1 : 0);
            clsComm.commData.PPackOverVoltageEnable = (byte)(cbProtectEnable3.Checked ? 1 : 0);
            clsComm.commData.PPackUnderVoltageEnable = (byte)(cbProtectEnable4.Checked ? 1 : 0);
            clsComm.commData.PCellVoltageDiffEnable = (byte)(cbProtectEnable5.Checked ? 1 : 0);
            clsComm.commData.PCellOverTempEnable = (byte)(cbProtectEnable6.Checked ? 1 : 0);
            clsComm.commData.PCellUnderTempEnable = (byte)(cbProtectEnable7.Checked ? 1 : 0);
            clsComm.commData.PChargingOverCurrentEnable = (byte)(cbProtectEnable8.Checked ? 1 : 0);
            clsComm.commData.PDisChargingOverCurrentEnable = (byte)(cbProtectEnable9.Checked ? 1 : 0);
            clsComm.commData.PSensingLineMeasureEnable = (byte)(cbProtectEnable10.Checked ? 1 : 0);
            clsComm.commData.PCommunicationErrorEnable = (byte)(cbProtectEnable11.Checked ? 1 : 0);
            clsComm.commData.PCurrentSensorErrorEnable = (byte)(cbProtectEnable12.Checked ? 1 : 0);
            clsComm.commData.PInterLockErrorEnable = (byte)(cbProtectEnable13.Checked ? 1 : 0);
            clsComm.commData.PSelfSystemDiagEnable = (byte)(cbProtectEnable13.Checked ? 1 : 0);
            clsComm.commData.PsetCellOverVoltage = (ushort)cbProtectValue1.Value;
            clsComm.commData.PsetCellUnderVoltage = (ushort)cbProtectValue2.Value;
            clsComm.commData.PsetPackOverVoltage = (ushort)cbProtectValue3.Value;
            clsComm.commData.PsetPackUnderVoltage = (ushort)cbProtectValue4.Value;
            clsComm.commData.PsetCellVoltDiff = (ushort)cbProtectValue5.Value;
            clsComm.commData.PsetCellOverTemp = (short)cbProtectValue6.Value;
            clsComm.commData.PsetCellUnderTemp = (short)cbProtectValue7.Value;
            clsComm.commData.PsetChargeOverCurrent = (short)cbProtectValue8.Value;
            clsComm.commData.PsetDischargeOverCurrent = (short)cbProtectValue9.Value;
            clsComm.commData.PsetSensingLineMeasure = (short)cbProtectValue10.Value;
            clsComm.commData.PsetCommunicationError = (short)cbProtectValue11.Value;
            clsComm.commData.PsetCurrentSensorError = (short)cbProtectValue12.Value;
            clsComm.commData.PsetInterLockError = (short)cbProtectValue13.Value;
            clsComm.commData.PsetSelfSystemDiag = (short)cbProtectValue14.Value;
            clsComm.commData.PsetCellOverVoltageRetain = (ushort)cbProtectRetainTime1.Value;
            clsComm.commData.PsetCellUnderVoltageRetain = (ushort)cbProtectRetainTime2.Value;
            clsComm.commData.PsetPackOverVoltageRetain = (ushort)cbProtectRetainTime3.Value;
            clsComm.commData.PsetPackUnderVoltageRetain = (ushort)cbProtectRetainTime4.Value;
            clsComm.commData.PsetCellVoltDiffRetain = (ushort)cbProtectRetainTime5.Value;
            clsComm.commData.PsetCellOverTempRetain = (ushort)cbProtectRetainTime6.Value;
            clsComm.commData.PsetCellUnderTempRetain = (ushort)cbProtectRetainTime7.Value;
            clsComm.commData.PsetChargeOverCurrentRetain = (ushort)cbProtectRetainTime8.Value;
            clsComm.commData.PsetDischargeOverCurrentRetain = (ushort)cbProtectRetainTime9.Value;
            clsComm.commData.PsetSensingLineMeasureRetain = (ushort)cbProtectRetainTime10.Value;
            clsComm.commData.PsetCommunicationErrorRetain = (ushort)cbProtectRetainTime11.Value;
            clsComm.commData.PsetCurrentSensorErrorRetain = (ushort)cbProtectRetainTime12.Value;
            clsComm.commData.PsetInterLockErrorRetain = (ushort)cbProtectRetainTime13.Value;
            clsComm.commData.PsetSelfSystemDiagRetain = (ushort)cbProtectRetainTime14.Value;
            clsComm.commData.PRsetCellOverVoltage = (ushort)cbProtectReleaseValue1.Value;
            clsComm.commData.PRsetCellUnderVoltage = (ushort)cbProtectReleaseValue2.Value;
            clsComm.commData.PRsetPackOverVoltage = (ushort)cbProtectReleaseValue3.Value;
            clsComm.commData.PRsetPackUnderVoltage = (ushort)cbProtectReleaseValue4.Value;
            clsComm.commData.PRsetCellVoltDiff = (ushort)cbProtectReleaseValue5.Value;
            clsComm.commData.PRsetCellOverTemp = (short)cbProtectReleaseValue6.Value;
            clsComm.commData.PRsetCellUnderTemp = (short)cbProtectReleaseValue7.Value;
            clsComm.commData.PRsetChargeOverCurrent = (short)cbProtectReleaseValue8.Value;
            clsComm.commData.PRsetDischargeOverCurrent = (short)cbProtectReleaseValue9.Value;
            clsComm.commData.PRsetSensingLineMeasure = (short)cbProtectReleaseValue10.Value;
            clsComm.commData.PRsetCommunicationError = (short)cbProtectReleaseValue11.Value;
            clsComm.commData.PRsetCurrentSensorError = (short)cbProtectReleaseValue12.Value;
            clsComm.commData.PRsetInterLockError = (short)cbProtectReleaseValue13.Value;
            clsComm.commData.PRsetSelfSystemDiag = (short)cbProtectReleaseValue14.Value;
            clsComm.commData.PRsetCellOverVoltageRetain = (ushort)cbProtectReleaseRetain1.Value;
            clsComm.commData.PRsetCellUnderVoltageRetain = (ushort)cbProtectReleaseRetain2.Value;
            clsComm.commData.PRsetPackOverVoltageRetain = (ushort)cbProtectReleaseRetain3.Value;
            clsComm.commData.PRsetPackUnderVoltageRetain = (ushort)cbProtectReleaseRetain4.Value;
            clsComm.commData.PRsetCellVoltDiffRetain = (ushort)cbProtectReleaseRetain5.Value;
            clsComm.commData.PRsetCellOverTempRetain = (ushort)cbProtectReleaseRetain6.Value;
            clsComm.commData.PRsetCellUnderTempRetain = (ushort)cbProtectReleaseRetain7.Value;
            clsComm.commData.PRsetChargeOverCurrentRetain = (ushort)cbProtectReleaseRetain8.Value;
            clsComm.commData.PRsetDischargeOverCurrentRetain = (ushort)cbProtectReleaseRetain9.Value;
            clsComm.commData.PRsetSensingLineMeasureRetain = (ushort)cbProtectReleaseRetain10.Value;
            clsComm.commData.PRsetCommunicationErrorRetain = (ushort)cbProtectReleaseRetain11.Value;
            clsComm.commData.PRsetCurrentSensorErrorRetain = (ushort)cbProtectReleaseRetain12.Value;
            clsComm.commData.PRsetInterLockErrorRetain = (ushort)cbProtectReleaseRetain13.Value;
            clsComm.commData.PRsetSelfSystemDiagRetain = (ushort)cbProtectReleaseRetain14.Value;

            iniFile.IniWriteValue("Protect", "PCellOverVoltageEnable         ", clsComm.commData.PCellOverVoltageEnable.ToString());
            iniFile.IniWriteValue("Protect", "PCellUnderVoltageEnable        ", clsComm.commData.PCellUnderVoltageEnable.ToString());
            iniFile.IniWriteValue("Protect", "PPackOverVoltageEnable         ", clsComm.commData.PPackOverVoltageEnable.ToString());
            iniFile.IniWriteValue("Protect", "PPackUnderVoltageEnable        ", clsComm.commData.PPackUnderVoltageEnable.ToString());
            iniFile.IniWriteValue("Protect", "PCellVoltageDiffEnable         ", clsComm.commData.PCellVoltageDiffEnable.ToString());
            iniFile.IniWriteValue("Protect", "PCellOverTempEnable            ", clsComm.commData.PCellOverTempEnable.ToString());
            iniFile.IniWriteValue("Protect", "PCellUnderTempEnable           ", clsComm.commData.PCellUnderTempEnable.ToString());
            iniFile.IniWriteValue("Protect", "PChargingOverCurrentEnable     ", clsComm.commData.PChargingOverCurrentEnable.ToString());
            iniFile.IniWriteValue("Protect", "PDisChargingOverCurrentEnable  ", clsComm.commData.PDisChargingOverCurrentEnable.ToString());
            iniFile.IniWriteValue("Protect", "PSensingLineMeasureEnable      ", clsComm.commData.PSensingLineMeasureEnable.ToString());
            iniFile.IniWriteValue("Protect", "PCommunicationErrorEnable      ", clsComm.commData.PCommunicationErrorEnable.ToString());
            iniFile.IniWriteValue("Protect", "PCurrentSensorErrorEnable      ", clsComm.commData.PCurrentSensorErrorEnable.ToString());
            iniFile.IniWriteValue("Protect", "PInterLockErrorEnable          ", clsComm.commData.PInterLockErrorEnable.ToString());
            iniFile.IniWriteValue("Protect", "PSelfSystemDiagEnable          ", clsComm.commData.PSelfSystemDiagEnable.ToString());
            iniFile.IniWriteValue("Protect", "PsetCellOverVoltage            ", clsComm.commData.PsetCellOverVoltage.ToString());
            iniFile.IniWriteValue("Protect", "PsetCellUnderVoltage           ", clsComm.commData.PsetCellUnderVoltage.ToString());
            iniFile.IniWriteValue("Protect", "PsetPackOverVoltage            ", clsComm.commData.PsetPackOverVoltage.ToString());
            iniFile.IniWriteValue("Protect", "PsetPackUnderVoltage           ", clsComm.commData.PsetPackUnderVoltage.ToString());
            iniFile.IniWriteValue("Protect", "PsetCellVoltDiff               ", clsComm.commData.PsetCellVoltDiff.ToString());
            iniFile.IniWriteValue("Protect", "PsetCellOverTemp               ", clsComm.commData.PsetCellOverTemp.ToString());
            iniFile.IniWriteValue("Protect", "PsetCellUnderTemp              ", clsComm.commData.PsetCellUnderTemp.ToString());
            iniFile.IniWriteValue("Protect", "PsetChargeOverCurrent          ", clsComm.commData.PsetChargeOverCurrent.ToString());
            iniFile.IniWriteValue("Protect", "PsetDischargeOverCurrent       ", clsComm.commData.PsetDischargeOverCurrent.ToString());

            iniFile.IniWriteValue("Protect", "PsetSensingLineMeasure         ", clsComm.commData.PsetSensingLineMeasure.ToString());
            iniFile.IniWriteValue("Protect", "PsetCommunicationError         ", clsComm.commData.PsetCommunicationError.ToString());
            iniFile.IniWriteValue("Protect", "PsetCurrentSensorError         ", clsComm.commData.PsetCurrentSensorError.ToString());
            iniFile.IniWriteValue("Protect", "PsetInterLockError             ", clsComm.commData.PsetInterLockError.ToString());
            iniFile.IniWriteValue("Protect", "PsetSelfSystemDiag             ", clsComm.commData.PsetSelfSystemDiag.ToString());

            iniFile.IniWriteValue("Protect", "PsetCellOverVoltageRetain      ", clsComm.commData.PsetCellOverVoltageRetain.ToString());
            iniFile.IniWriteValue("Protect", "PsetCellUnderVoltageRetain     ", clsComm.commData.PsetCellUnderVoltageRetain.ToString());
            iniFile.IniWriteValue("Protect", "PsetPackOverVoltageRetain      ", clsComm.commData.PsetPackOverVoltageRetain.ToString());
            iniFile.IniWriteValue("Protect", "PsetPackUnderVoltageRetain     ", clsComm.commData.PsetPackUnderVoltageRetain.ToString());
            iniFile.IniWriteValue("Protect", "PsetCellVoltDiffRetain         ", clsComm.commData.PsetCellVoltDiffRetain.ToString());
            iniFile.IniWriteValue("Protect", "PsetCellOverTempRetain         ", clsComm.commData.PsetCellOverTempRetain.ToString());
            iniFile.IniWriteValue("Protect", "PsetCellUnderTempRetain        ", clsComm.commData.PsetCellUnderTempRetain.ToString());
            iniFile.IniWriteValue("Protect", "PsetChargeOverCurrentRetain    ", clsComm.commData.PsetChargeOverCurrentRetain.ToString());
            iniFile.IniWriteValue("Protect", "PsetDischargeOverCurrentRetain ", clsComm.commData.PsetDischargeOverCurrentRetain.ToString());
            iniFile.IniWriteValue("Protect", "PsetSensingLineMeasureRetain   ", clsComm.commData.PsetSensingLineMeasureRetain.ToString());
            iniFile.IniWriteValue("Protect", "PsetCommunicationErrorRetain   ", clsComm.commData.PsetCommunicationErrorRetain.ToString());
            iniFile.IniWriteValue("Protect", "PsetCurrentSensorErrorRetain   ", clsComm.commData.PsetCurrentSensorErrorRetain.ToString());
            iniFile.IniWriteValue("Protect", "PsetInterLockErrorRetain       ", clsComm.commData.PsetInterLockErrorRetain.ToString());
            iniFile.IniWriteValue("Protect", "PsetSelfSystemDiagRetain       ", clsComm.commData.PsetSelfSystemDiagRetain.ToString());

            iniFile.IniWriteValue("Protect", "PRsetCellOverVoltage           ", clsComm.commData.PRsetCellOverVoltage.ToString());
            iniFile.IniWriteValue("Protect", "PRsetCellUnderVoltage          ", clsComm.commData.PRsetCellUnderVoltage.ToString());
            iniFile.IniWriteValue("Protect", "PRsetPackOverVoltage           ", clsComm.commData.PRsetPackOverVoltage.ToString());
            iniFile.IniWriteValue("Protect", "PRsetPackUnderVoltage          ", clsComm.commData.PRsetPackUnderVoltage.ToString());
            iniFile.IniWriteValue("Protect", "PRsetCellVoltDiff              ", clsComm.commData.PRsetCellVoltDiff.ToString());
            iniFile.IniWriteValue("Protect", "PRsetCellOverTemp              ", clsComm.commData.PRsetCellOverTemp.ToString());
            iniFile.IniWriteValue("Protect", "PRsetCellUnderTemp             ", clsComm.commData.PRsetCellUnderTemp.ToString());
            iniFile.IniWriteValue("Protect", "PRsetChargeOverCurrent         ", clsComm.commData.PRsetChargeOverCurrent.ToString());
            iniFile.IniWriteValue("Protect", "PRsetDischargeOverCurrent      ", clsComm.commData.PRsetDischargeOverCurrent.ToString());
            iniFile.IniWriteValue("Protect", "PRsetSensingLineMeasure        ", clsComm.commData.PRsetSensingLineMeasure.ToString());
            iniFile.IniWriteValue("Protect", "PRsetCommunicationError        ", clsComm.commData.PRsetCommunicationError.ToString());
            iniFile.IniWriteValue("Protect", "PRsetCurrentSensorError        ", clsComm.commData.PRsetCurrentSensorError.ToString());
            iniFile.IniWriteValue("Protect", "PRsetInterLockError            ", clsComm.commData.PRsetInterLockError.ToString());
            iniFile.IniWriteValue("Protect", "PRsetSelfSystemDiag            ", clsComm.commData.PRsetSelfSystemDiag.ToString());

            iniFile.IniWriteValue("Protect", "PRsetCellOverVoltageRetain     ", clsComm.commData.PRsetCellOverVoltageRetain.ToString());
            iniFile.IniWriteValue("Protect", "PRsetCellUnderVoltageRetain    ", clsComm.commData.PRsetCellUnderVoltageRetain.ToString());
            iniFile.IniWriteValue("Protect", "PRsetPackOverVoltageRetain     ", clsComm.commData.PRsetPackOverVoltageRetain.ToString());
            iniFile.IniWriteValue("Protect", "PRsetPackUnderVoltageRetain    ", clsComm.commData.PRsetPackUnderVoltageRetain.ToString());
            iniFile.IniWriteValue("Protect", "PRsetCellVoltDiffRetain        ", clsComm.commData.PRsetCellVoltDiffRetain.ToString());
            iniFile.IniWriteValue("Protect", "PRsetCellOverTempRetain        ", clsComm.commData.PRsetCellOverTempRetain.ToString());
            iniFile.IniWriteValue("Protect", "PRsetCellUnderTempRetain       ", clsComm.commData.PRsetCellUnderTempRetain.ToString());
            iniFile.IniWriteValue("Protect", "PRsetChargeOverCurrentRetain   ", clsComm.commData.PRsetChargeOverCurrentRetain.ToString());
            iniFile.IniWriteValue("Protect", "PRsetDischargeOverCurrentRetain", clsComm.commData.PRsetDischargeOverCurrentRetain.ToString());
            iniFile.IniWriteValue("Protect", "PRsetSensingLineMeasureRetain  ", clsComm.commData.PRsetSensingLineMeasureRetain.ToString());
            iniFile.IniWriteValue("Protect", "PRsetCommunicationErrorRetain  ", clsComm.commData.PRsetCommunicationErrorRetain.ToString());
            iniFile.IniWriteValue("Protect", "PRsetCurrentSensorErrorRetain  ", clsComm.commData.PRsetCurrentSensorErrorRetain.ToString());
            iniFile.IniWriteValue("Protect", "PRsetInterLockErrorRetain      ", clsComm.commData.PRsetInterLockErrorRetain.ToString());
            iniFile.IniWriteValue("Protect", "PRsetSelfSystemDiagRetain      ", clsComm.commData.PRsetSelfSystemDiagRetain.ToString());

            logInfo("[PC]Save protect config data");
        }

        private void btLoadFileProtect_Click(object sender, EventArgs e)
        {
            IniFile iniFile = new IniFile(Directory.GetCurrentDirectory() + @"\setting.ini");

            String strPCellOverVoltageEnable = iniFile.IniReadValue("Protect", "PCellOverVoltageEnable");
            String strPCellUnderVoltageEnable = iniFile.IniReadValue("Protect", "PCellUnderVoltageEnable");
            String strPPackOverVoltageEnable = iniFile.IniReadValue("Protect", "PPackOverVoltageEnable");
            String strPPackUnderVoltageEnable = iniFile.IniReadValue("Protect", "PPackUnderVoltageEnable");
            String strPCellVoltageDiffEnable = iniFile.IniReadValue("Protect", "PCellVoltageDiffEnable");
            String strPCellOverTempEnable = iniFile.IniReadValue("Protect", "PCellOverTempEnable");
            String strPCellUnderTempEnable = iniFile.IniReadValue("Protect", "PCellUnderTempEnable");
            String strPChargingOverCurrentEnable = iniFile.IniReadValue("Protect", "PChargingOverCurrentEnable");
            String strPDisChargingOverCurrentEnable = iniFile.IniReadValue("Protect", "PDisChargingOverCurrentEnable");
            String strPSensingLineMeasureEnable = iniFile.IniReadValue("Protect", "PSensingLineMeasureEnable");
            String strPCommunicationErrorEnable = iniFile.IniReadValue("Protect", "PCommunicationErrorEnable");
            String strPCurrentSensorErrorEnable = iniFile.IniReadValue("Protect", "PCurrentSensorErrorEnable");
            String strPInterLockErrorEnable = iniFile.IniReadValue("Protect",     "PInterLockErrorEnable");
            String strPSelfSystemDiagEnable = iniFile.IniReadValue("Protect",     "PSelfSystemDiagEnable");
            String strPsetCellOverVoltage = iniFile.IniReadValue("Protect", "PsetCellOverVoltage");
            String strPsetCellUnderVoltage = iniFile.IniReadValue("Protect", "PsetCellUnderVoltage");
            String strPsetPackOverVoltage = iniFile.IniReadValue("Protect", "PsetPackOverVoltage");
            String strPsetPackUnderVoltage = iniFile.IniReadValue("Protect", "PsetPackUnderVoltage");
            String strPsetCellVoltDiff = iniFile.IniReadValue("Protect", "PsetCellVoltDiff");
            String strPsetCellOverTemp = iniFile.IniReadValue("Protect", "PsetCellOverTemp");
            String strPsetCellUnderTemp = iniFile.IniReadValue("Protect", "PsetCellUnderTemp");
            String strPsetChargeOverCurrent = iniFile.IniReadValue("Protect", "PsetChargeOverCurrent");
            String strPsetDischargeOverCurrent = iniFile.IniReadValue("Protect", "PsetDischargeOverCurrent");
            String strPsetSensingLineMeasure = iniFile.IniReadValue("Protect", "PsetSensingLineMeasure");
            String strPsetCommunicationError = iniFile.IniReadValue("Protect", "PsetCommunicationError");
            String strPsetCurrentSensorError = iniFile.IniReadValue("Protect", "PsetCurrentSensorError");
            String strPsetInterLockError = iniFile.IniReadValue("Protect", "PsetInterLockError");
            String strPsetSelfSystemDiag = iniFile.IniReadValue("Protect", "PsetSelfSystemDiag");
            String strPsetCellOverVoltageRetain = iniFile.IniReadValue("Protect", "PsetCellOverVoltageRetain");
            String strPsetCellUnderVoltageRetain = iniFile.IniReadValue("Protect", "PsetCellUnderVoltageRetain");
            String strPsetPackOverVoltageRetain = iniFile.IniReadValue("Protect", "PsetPackOverVoltageRetain");
            String strPsetPackUnderVoltageRetain = iniFile.IniReadValue("Protect", "PsetPackUnderVoltageRetain");
            String strPsetCellVoltDiffRetain = iniFile.IniReadValue("Protect", "PsetCellVoltDiffRetain");
            String strPsetCellOverTempRetain = iniFile.IniReadValue("Protect", "PsetCellOverTempRetain");
            String strPsetCellUnderTempRetain = iniFile.IniReadValue("Protect", "PsetCellUnderTempRetain");
            String strPsetChargeOverCurrentRetain = iniFile.IniReadValue("Protect", "PsetChargeOverCurrentRetain");
            String strPsetDischargeOverCurrentRetain = iniFile.IniReadValue("Protect", "PsetDischargeOverCurrentRetain");
            String strPsetSensingLineMeasureRetain = iniFile.IniReadValue("Protect", "PsetSensingLineMeasureRetain");
            String strPsetCommunicationErrorRetain = iniFile.IniReadValue("Protect", "PsetCommunicationErrorRetain");
            String strPsetCurrentSensorErrorRetain = iniFile.IniReadValue("Protect", "PsetCurrentSensorErrorRetain");
            String strPsetInterLockErrorRetain = iniFile.IniReadValue("Protect", "PsetInterLockErrorRetain");
            String strPsetSelfSystemDiagRetain = iniFile.IniReadValue("Protect", "PsetSelfSystemDiagRetain");
            String strPRsetCellOverVoltage = iniFile.IniReadValue("Protect", "PRsetCellOverVoltage");
            String strPRsetCellUnderVoltage = iniFile.IniReadValue("Protect", "PRsetCellUnderVoltage");
            String strPRsetPackOverVoltage = iniFile.IniReadValue("Protect", "PRsetPackOverVoltage");
            String strPRsetPackUnderVoltage = iniFile.IniReadValue("Protect", "PRsetPackUnderVoltage");
            String strPRsetCellVoltDiff = iniFile.IniReadValue("Protect", "PRsetCellVoltDiff");
            String strPRsetCellOverTemp = iniFile.IniReadValue("Protect", "PRsetCellOverTemp");
            String strPRsetCellUnderTemp = iniFile.IniReadValue("Protect", "PRsetCellUnderTemp");
            String strPRsetChargeOverCurrent = iniFile.IniReadValue("Protect", "PRsetChargeOverCurrent");
            String strPRsetDischargeOverCurrent = iniFile.IniReadValue("Protect", "PRsetDischargeOverCurrent");
            String strPRsetSensingLineMeasure = iniFile.IniReadValue("Protect", "PRsetSensingLineMeasure");
            String strPRsetCommunicationError = iniFile.IniReadValue("Protect", "PRsetCommunicationError");
            String strPRsetCurrentSensorError = iniFile.IniReadValue("Protect", "PRsetCurrentSensorError");
            String strPRsetInterLockError = iniFile.IniReadValue("Protect", "PRsetInterLockError");
            String strPRsetSelfSystemDiag = iniFile.IniReadValue("Protect", "PRsetSelfSystemDiag");
            String strPRsetCellOverVoltageRetain = iniFile.IniReadValue("Protect", "PRsetCellOverVoltageRetain");
            String strPRsetCellUnderVoltageRetain = iniFile.IniReadValue("Protect", "PRsetCellUnderVoltageRetain");
            String strPRsetPackOverVoltageRetain = iniFile.IniReadValue("Protect", "PRsetPackOverVoltageRetain");
            String strPRsetPackUnderVoltageRetain = iniFile.IniReadValue("Protect", "PRsetPackUnderVoltageRetain");
            String strPRsetCellVoltDiffRetain = iniFile.IniReadValue("Protect", "PRsetCellVoltDiffRetain");
            String strPRsetCellOverTempRetain = iniFile.IniReadValue("Protect", "PRsetCellOverTempRetain");
            String strPRsetCellUnderTempRetain = iniFile.IniReadValue("Protect", "PRsetCellUnderTempRetain");
            String strPRsetChargeOverCurrentRetain = iniFile.IniReadValue("Protect", "PRsetChargeOverCurrentRetain");
            String strPRsetDischargeOverCurrentRetain = iniFile.IniReadValue("Protect", "PRsetDischargeOverCurrentRetain");
            String strPRsetSensingLineMeasureRetain = iniFile.IniReadValue("Protect", "PRsetSensingLineMeasureRetain");
            String strPRsetCommunicationErrorRetain = iniFile.IniReadValue("Protect", "PRsetCommunicationErrorRetain");
            String strPRsetCurrentSensorErrorRetain = iniFile.IniReadValue("Protect", "PRsetCurrentSensorErrorRetain");
            String strPRsetInterLockErrorRetain = iniFile.IniReadValue("Protect", "PRsetInterLockErrorRetain");
            String strPRsetSelfSystemDiagRetain = iniFile.IniReadValue("Protect", "PRsetSelfSystemDiagRetain");

            cbProtectEnable1.Checked = (byte.Parse(strPCellOverVoltageEnable) == 1) ? true : false;
            cbProtectEnable2.Checked = (byte.Parse(strPCellUnderVoltageEnable) == 1) ? true : false;
            cbProtectEnable3.Checked = (byte.Parse(strPPackOverVoltageEnable) == 1) ? true : false;
            cbProtectEnable4.Checked = (byte.Parse(strPPackUnderVoltageEnable) == 1) ? true : false;
            cbProtectEnable5.Checked = (byte.Parse(strPCellVoltageDiffEnable) == 1) ? true : false;
            cbProtectEnable6.Checked = (byte.Parse(strPCellOverTempEnable) == 1) ? true : false;
            cbProtectEnable7.Checked = (byte.Parse(strPCellUnderTempEnable) == 1) ? true : false;
            cbProtectEnable8.Checked = (byte.Parse(strPChargingOverCurrentEnable) == 1) ? true : false;
            cbProtectEnable9.Checked = (byte.Parse(strPDisChargingOverCurrentEnable) == 1) ? true : false;
            cbProtectEnable10.Checked = (byte.Parse(strPSensingLineMeasureEnable) == 1) ? true : false;
            cbProtectEnable11.Checked = (byte.Parse(strPCommunicationErrorEnable) == 1) ? true : false;
            cbProtectEnable12.Checked = (byte.Parse(strPCurrentSensorErrorEnable) == 1) ? true : false;
            cbProtectEnable13.Checked = (byte.Parse(strPInterLockErrorEnable) == 1) ? true : false;
            cbProtectEnable14.Checked = (byte.Parse(strPSelfSystemDiagEnable) == 1) ? true : false;
            cbProtectValue1.Value = Int16.Parse(strPsetCellOverVoltage);
            cbProtectValue2.Value = Int16.Parse(strPsetCellUnderVoltage);
            cbProtectValue3.Value = Int16.Parse(strPsetPackOverVoltage);
            cbProtectValue4.Value = Int16.Parse(strPsetPackUnderVoltage);
            cbProtectValue5.Value = Int16.Parse(strPsetCellVoltDiff);
            cbProtectValue6.Value = Int16.Parse(strPsetCellOverTemp);
            cbProtectValue7.Value = Int16.Parse(strPsetCellUnderTemp);
            cbProtectValue8.Value = Int16.Parse(strPsetChargeOverCurrent);
            cbProtectValue9.Value = Int16.Parse(strPsetDischargeOverCurrent);
            cbProtectValue10.Value = Int16.Parse(strPsetSensingLineMeasure);
            cbProtectValue11.Value = Int16.Parse(strPsetCommunicationError);
            cbProtectValue12.Value = Int16.Parse(strPsetCurrentSensorError);
            cbProtectValue13.Value = Int16.Parse(strPsetInterLockError);
            cbProtectValue14.Value = Int16.Parse(strPsetSelfSystemDiag);
            cbProtectRetainTime1.Value = Int16.Parse(strPsetCellOverVoltageRetain);
            cbProtectRetainTime2.Value = Int16.Parse(strPsetCellUnderVoltageRetain);
            cbProtectRetainTime3.Value = Int16.Parse(strPsetPackOverVoltageRetain);
            cbProtectRetainTime4.Value = Int16.Parse(strPsetPackUnderVoltageRetain);
            cbProtectRetainTime5.Value = Int16.Parse(strPsetCellVoltDiffRetain);
            cbProtectRetainTime6.Value = Int16.Parse(strPsetCellOverTempRetain);
            cbProtectRetainTime7.Value = Int16.Parse(strPsetCellUnderTempRetain);
            cbProtectRetainTime8.Value = Int16.Parse(strPsetChargeOverCurrentRetain);
            cbProtectRetainTime9.Value = Int16.Parse(strPsetDischargeOverCurrentRetain);
            cbProtectRetainTime10.Value = Int16.Parse(strPsetSensingLineMeasureRetain);
            cbProtectRetainTime11.Value = Int16.Parse(strPsetCommunicationErrorRetain);
            cbProtectRetainTime12.Value = Int16.Parse(strPsetCurrentSensorErrorRetain);
            cbProtectRetainTime13.Value = Int16.Parse(strPsetInterLockErrorRetain);
            cbProtectRetainTime14.Value = Int16.Parse(strPsetSelfSystemDiagRetain);
            cbProtectReleaseValue1.Value = Int16.Parse(strPRsetCellOverVoltage);
            cbProtectReleaseValue2.Value = Int16.Parse(strPRsetCellUnderVoltage);
            cbProtectReleaseValue3.Value = Int16.Parse(strPRsetPackOverVoltage);
            cbProtectReleaseValue4.Value = Int16.Parse(strPRsetPackUnderVoltage);
            cbProtectReleaseValue5.Value = Int16.Parse(strPRsetCellVoltDiff);
            cbProtectReleaseValue6.Value = Int16.Parse(strPRsetCellOverTemp);
            cbProtectReleaseValue7.Value = Int16.Parse(strPRsetCellUnderTemp);
            cbProtectReleaseValue8.Value = Int16.Parse(strPRsetChargeOverCurrent);
            cbProtectReleaseValue9.Value = Int16.Parse(strPRsetDischargeOverCurrent);
            cbProtectReleaseValue10.Value = Int16.Parse(strPRsetSensingLineMeasure);
            cbProtectReleaseValue11.Value = Int16.Parse(strPRsetCommunicationError);
            cbProtectReleaseValue12.Value = Int16.Parse(strPRsetCurrentSensorError);
            cbProtectReleaseValue13.Value = Int16.Parse(strPRsetInterLockError);
            cbProtectReleaseValue14.Value = Int16.Parse(strPRsetSelfSystemDiag);
            cbProtectReleaseRetain1.Value = Int16.Parse(strPRsetCellOverVoltageRetain);
            cbProtectReleaseRetain2.Value = Int16.Parse(strPRsetCellUnderVoltageRetain);
            cbProtectReleaseRetain3.Value = Int16.Parse(strPRsetPackOverVoltageRetain);
            cbProtectReleaseRetain4.Value = Int16.Parse(strPRsetPackUnderVoltageRetain);
            cbProtectReleaseRetain5.Value = Int16.Parse(strPRsetCellVoltDiffRetain);
            cbProtectReleaseRetain6.Value = Int16.Parse(strPRsetCellOverTempRetain);
            cbProtectReleaseRetain7.Value = Int16.Parse(strPRsetCellUnderTempRetain);
            cbProtectReleaseRetain8.Value = Int16.Parse(strPRsetChargeOverCurrentRetain);
            cbProtectReleaseRetain9.Value = Int16.Parse(strPRsetDischargeOverCurrentRetain);
            cbProtectReleaseRetain10.Value = Int16.Parse(strPRsetSensingLineMeasureRetain);
            cbProtectReleaseRetain11.Value = Int16.Parse(strPRsetCommunicationErrorRetain);
            cbProtectReleaseRetain12.Value = Int16.Parse(strPRsetCurrentSensorErrorRetain);
            cbProtectReleaseRetain13.Value = Int16.Parse(strPRsetInterLockErrorRetain);
            cbProtectReleaseRetain14.Value = Int16.Parse(strPRsetSelfSystemDiagRetain);

            logInfo("[PC]Load protect config data");
        }
    }
}
