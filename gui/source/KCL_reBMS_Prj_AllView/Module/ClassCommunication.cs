using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;     //추가
using System.IO;   //추가
using System.IO.Ports;   //추가
using static System.Windows.Forms.VisualStyles.VisualStyleElement;
using System.Reflection;


namespace KCL_reBMS_Prj
{
    class ClassCommunication : ClassSerialPort
    {
        ClassCommon clsCm = new ClassCommon();

        public ClassData commData = new ClassData();


        #region 이벤트 메시지 전달
        // 1. 메시지 전달용 클래스를 생성합니다.
        public class ClassCommunicationMsg
        {
            public int iMessage;
            public string strMessage;
            public byte[] byResponseData = new byte[4096];
            public int iResponseLength;
        }

        // 2. 이벤트와 메시지의 세부 데이터 전달용 EventArgs 클래스를 생성합니다.
        public class ClassCommunicationEventArgs : EventArgs
        {
            public ClassCommunicationMsg clsCommMsg;

            public ClassCommunicationEventArgs(ClassCommunicationMsg clsCommMsg)
            {
                this.clsCommMsg = clsCommMsg;
            }
        }

        // 3. 이벤트 생성
        public delegate void CommunicationMessageHandler(object obj, ClassCommunicationEventArgs args); // EventArg 전달용 Delegate 생성
        public event CommunicationMessageHandler OnCommMessage;

        #endregion

        // Serial Port 관련        
        int iPortNo;
        int iBaudRate;
        int iDataBits;
        Parity parity;

        // 통신 쓰레드
        Thread thrComm;
        bool isStopThread = false; // 쓰레드 종료용
        public bool isCommConnected = false;     // Comm Port Open 여부를 나타내는 Flag
        public bool isCommOngoing = false;
        int isCommOngoingCnt = 0;

        // Process Step 관련
        int iRESERVE_OP = CMD_IDLE;
        static public int iCURRENT_OP = CMD_IDLE;
        DateTime dtTimer = DateTime.Now;
        const int TIMEOUT = 50;
        DateTime dtPollTimer = DateTime.Now;
        int POLL_TIME = 1000;  // 전체 Loop Time - 초기 500 //whl


        public enum Communication_Message
        {
            None,
            ThreadRun,
            ThreadException,
            PortOpen,
            PortClose,
            PortCantOpen,
            PortException,
            PacketSend,
            PacketReceive,
            NoPacketReceive,
            PacketTimeout,
            StringMessage,
            ErrorPacketReceived,
        }

        public const int CMD_IDLE = 100;
        public const int CMD_WAIT_RESPONSE = 101;

        public const int CMD_SEND_GET_MONITORING = 102;

        public const int CMD_SEND_VERSION_GET = 103;

        public const int CMD_SEND_SOC_SET = 104;
        public const int CMD_SEND_SOC_RESET = 105;

        public const int CMD_SEND_SOH_SET = 106;
        public const int CMD_SEND_SOH_RESET = 107;

        public const int CMD_SEND_RLYON = 108;
        public const int CMD_SEND_RLYOFF = 109;

        public const int CMD_SEND_PROTECT_ENABLE = 110;
        public const int CMD_SEND_PROTECT_ENABLE_GET = 111;
        public const int CMD_SEND_PROTECT_SET = 112;
        public const int CMD_SEND_PROTECT_GET = 113;
        public const int CMD_SEND_PROTECT_RELEASE_SET = 114;
        public const int CMD_SEND_PROTECT_RELEASE_GET = 115;

        public const int CMD_SEND_WARNNING_ENABLE = 116;
        public const int CMD_SEND_WARNNING_ENABLE_GET = 117;
        public const int CMD_SEND_WARNNING_SET = 118;
        public const int CMD_SEND_WARNNING_GET = 119;
        public const int CMD_SEND_WARNNING_RELEASE_SET = 120;
        public const int CMD_SEND_WARNNING_RELEASE_GET = 121;

        public const int CMD_FACTORY_RESET = 122;

        enum Response
        {
            None,
            Packet,
            PacketError,
        }

        // Data link layer control characters
        const byte STX = 0x02;
        const byte HEAD_A = 0x58;
        const byte HEAD_B = 0x82;
        const byte ETX = 0x03;

        public struct Packet_
        {
            public int Step;
            public int Idex;
            public int Length;
            public byte Command_0;
            public byte Command_1;
            public byte ErrorCode_0;
            public byte ErrorCode_1;
            public byte[] Data;
            public byte BCC;
        }

        Packet_ RcvPkt;
        Packet_ SndPkt;


        void RcvPktVariableInit() // Packet구조체의 초기화 입니다.
        {
            RcvPkt.Step = 0;
            RcvPkt.Idex = 0;
            RcvPkt.Length = 0;
            RcvPkt.Command_0 = 0x00;
            RcvPkt.Command_1 = 0x00;
            RcvPkt.ErrorCode_0 = 0x00;
            RcvPkt.ErrorCode_1 = 0x00;
            RcvPkt.Data = new byte[4096]; // 수신버퍼 사이즈는 적당히 작게 설정했습니다. 많은 데이터를 다룰때는 키워주세요.
            Array.Clear(RcvPkt.Data, 0, RcvPkt.Data.Length); // memclr()와 같은 역활입니다.
            RcvPkt.BCC = 0x00;
        }

        void SndPktVarialbeInit()
        {
            SndPkt.Step = 0;
            SndPkt.Idex = 0;
            SndPkt.Length = 0;
            RcvPkt.Command_0 = 0x00;
            RcvPkt.Command_1 = 0x00;
            SndPkt.Data = new byte[4096]; // 수신버퍼 사이즈는 적당히 작게 설정했습니다. 많은 데이터를 다룰때는 키워주세요.
            Array.Clear(SndPkt.Data, 0, SndPkt.Data.Length); // memclr()와 같은 역활입니다.
            SndPkt.BCC = 0x00;
        }

        public ClassCommunication() // 클래스 이름과 동일하며 리턴값 없는 메서드는 이 클래스에서의 Main()이라고 보시면 됩니다.
        {
            // 기본값 설정
            iPortNo = 1;
            iBaudRate = 115200;
            iDataBits = 8;
            parity = Parity.None;
            isCommConnected = false;
            RcvPktVariableInit();
            RcvVariableInit();
            SndPktVarialbeInit();
        }

        // 시리얼 설정
        public void SetSerial(int iPortNo, int iBaudRate)
        {
            this.iPortNo = iPortNo;
            this.iBaudRate = iBaudRate;
        }

        // 쓰레드 시작
        public void StartThread()
        {
            ClassCommunicationMsg clsCommMsg = new ClassCommunicationMsg();
            try
            {
                isStopThread = false;
                thrComm = new Thread(new ThreadStart(CommThread));
                thrComm.IsBackground = true;
                thrComm.Start();
                clsCommMsg.iMessage = (int)Communication_Message.ThreadRun; // 쓰레드 시작 이벤트
                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
            }
            catch
            {
                clsCommMsg.iMessage = (int)Communication_Message.ThreadException; // 쓰레드 예외처리 이벤트 전송
                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
            }
            finally
            {
            }
        }

        void CommThread()
        {
            bool bRet;
            byte[] bySndBuff = new byte[1024];
            byte[] tempData = new byte[1024];
            int iSendSize = 0;
            ClassCommunicationMsg clsCommMsg = new ClassCommunicationMsg();
            try
            {
                bRet = Open(iPortNo, iBaudRate, iDataBits, parity, true);
                if (bRet == true)
                {
                    isCommConnected = true;
                    clsCommMsg.iMessage = (int)Communication_Message.PortOpen; // Port Open 이벤트 전송
                    OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));

                    while (!isStopThread)
                    {
                        POLL_TIME = commData.iMonitoringCycleTime;
                        if ((clsCm.GetElepsedTime(dtPollTimer) > POLL_TIME))
                        {
                            iCURRENT_OP = CMD_SEND_GET_MONITORING;
                            if (iAliveCnt > 10) isCommOngoing = false;
                            else isCommOngoing = true;
                            iAliveCnt++;
                        }

                        // 명령 전송
                        switch (iCURRENT_OP)
                        {
                            case CMD_IDLE:
                                break;

                            case CMD_SEND_GET_MONITORING:
                                SndPkt.Length = MakeSendPacket_MornitoringGet(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_VERSION_GET:
                                SndPkt.Length = MakeSendPacket_getVersion(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_FACTORY_RESET:
                                SndPkt.Length = MakeSendPacket_Factory_Reset(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_RLYON:
                                SndPkt.Length = MakeSendPacket_RelayON(ref bySndBuff, 0);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_RLYOFF:
                                SndPkt.Length = MakeSendPacket_RelayOFF(ref bySndBuff, 0);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_SOC_SET:
                                SndPkt.Length = MakeSendPacket_SOC_Set(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_SOC_RESET:
                                SndPkt.Length = MakeSendPacket_SOC_Reset(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_SOH_SET:
                                SndPkt.Length = MakeSendPacket_SOH_Set(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_SOH_RESET:
                                SndPkt.Length = MakeSendPacket_SOH_Reset(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_WARNNING_ENABLE:
                                SndPkt.Length = MakeSendPacket_WarnningEnable(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_WARNNING_ENABLE_GET:
                                SndPkt.Length = MakeSendPacket_WarnningEnableGet(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_WARNNING_SET:
                                SndPkt.Length = MakeSendPacket_WarnningSet(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_WARNNING_GET:
                                SndPkt.Length = MakeSendPacket_WarnningGet(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_WARNNING_RELEASE_SET:
                                SndPkt.Length = MakeSendPacket_WarnningReleaseSet(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_WARNNING_RELEASE_GET:
                                SndPkt.Length = MakeSendPacket_WarnningReleaseGet(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_PROTECT_ENABLE:
                                SndPkt.Length = MakeSendPacket_ProtectEnable(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_PROTECT_ENABLE_GET:
                                SndPkt.Length = MakeSendPacket_ProtectEnableGet(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_PROTECT_SET:
                                SndPkt.Length = MakeSendPacket_ProtectSet(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_PROTECT_GET:
                                SndPkt.Length = MakeSendPacket_ProtectGet(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_PROTECT_RELEASE_SET:
                                SndPkt.Length = MakeSendPacket_ProtectReleaseSet(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_PROTECT_RELEASE_GET:
                                SndPkt.Length = MakeSendPacket_ProtectReleaseGet(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;
                        }

                        // 응답 수신
                        switch (MakeRcvPkt())
                        {
                            case (int)Response.None:
                                break;

                            case (int)Response.Packet:
                                clsCommMsg.iMessage = (int)Communication_Message.PacketReceive;
                                iAliveCnt = 0;
                                Array.Copy(pk.byRcvDt, 0, clsCommMsg.byResponseData, 0, pk.iRcvIdex);
                                clsCommMsg.iResponseLength = pk.iRcvIdex;
                                
                                //monitoring data
                                if ((clsCommMsg.byResponseData[5] == 0x30) && (iCURRENT_OP == CMD_WAIT_RESPONSE || iCURRENT_OP == CMD_IDLE))
                                {
                                    iCURRENT_OP = CMD_IDLE;
                                    int index = 7;
                                    commData.MaxTemp = clsCommMsg.byResponseData[index];
                                    index++;
                                    commData.MinTemp = clsCommMsg.byResponseData[index];
                                    index++;
                                    commData.MaxCell = (short)((clsCommMsg.byResponseData[index] * 256) + clsCommMsg.byResponseData[index + 1]);
                                    index += 2;
                                    commData.MinCell = (short)((clsCommMsg.byResponseData[index] * 256) + clsCommMsg.byResponseData[index + 1]);
                                    index += 2;
                                    commData.PVoltage = (short)((clsCommMsg.byResponseData[index] * 256) + clsCommMsg.byResponseData[index + 1]);
                                    index += 2;
                                    commData.Soc = (short)((clsCommMsg.byResponseData[index] * 256) + clsCommMsg.byResponseData[index + 1]);
                                    index += 2;
                                    commData.Soh = (short)((clsCommMsg.byResponseData[index] * 256) + clsCommMsg.byResponseData[index + 1]);
                                    index += 2;
                                    commData.Current = (short)((clsCommMsg.byResponseData[index] * 256) + clsCommMsg.byResponseData[index + 1]);
                                    index += 2;
                                    commData.Ccc = (clsCommMsg.byResponseData[index] * 16777216) + (clsCommMsg.byResponseData[index + 1] * 65536) + (clsCommMsg.byResponseData[index + 2] * 256) + clsCommMsg.byResponseData[index + 3];
                                    index += 4;
                                    commData.Cdc = (clsCommMsg.byResponseData[index] * 16777216) + (clsCommMsg.byResponseData[index + 1] * 65536) + (clsCommMsg.byResponseData[index + 2] * 256) + clsCommMsg.byResponseData[index + 3];
                                    index += 4;

                                    
                                    for(int i = 0; i < ClassData.CMUEA; i++)
                                    {
                                        for(int j = 0; j < 10; j++)
                                        {
                                            if ((i == 2 && j == 9) || (i == 5 && j == 9)) continue;
                                            commData.max17841b[i].Voltage[j] = (short)((clsCommMsg.byResponseData[index] * 256) + clsCommMsg.byResponseData[index + 1]);
                                            index += 2;
                                        }
                                    }

                                    for (int i = 0; i < ClassData.CMUEA; i++)
                                    {
                                        for (int j = 0; j < 4; j++)
                                        {
                                            commData.max17841b[i].Temperature[j] = (short)((clsCommMsg.byResponseData[index] * 256) + clsCommMsg.byResponseData[index + 1]);
                                            index += 2;
                                        }
                                    }

                                    commData.WCellOverVoltageStatus = clsCommMsg.byResponseData[index];
                                    index++;      
                                    commData.WCellUnderVoltageStatus = clsCommMsg.byResponseData[index];
                                    index++;
                                    commData.WChargingOverTempStatus = clsCommMsg.byResponseData[index];
                                    index++;
                                    commData.WChargingUnderTempStatus = clsCommMsg.byResponseData[index];
                                    index++;
                                    commData.WChargingOverCurrentStatus = clsCommMsg.byResponseData[index];
                                    index++;
                                    commData.WDisChargingOverCurrentStatus = clsCommMsg.byResponseData[index];
                                    index++;
                                    commData.WCellDiffVoltageStatus = clsCommMsg.byResponseData[index];
                                    index++;
                                    commData.WSensingline_measureStatus = clsCommMsg.byResponseData[index];
                                    index++;
                                    commData.RelayStatus = clsCommMsg.byResponseData[index];
                                    index++;
                                    commData.PCellOverVoltageStatus = clsCommMsg.byResponseData[index];
                                    index++;
                                    commData.PCellUnderVoltageStatus = clsCommMsg.byResponseData[index];
                                    index++;
                                    commData.PChargingOverTempStatus = clsCommMsg.byResponseData[index];
                                    index++;
                                    commData.PChargingUnderTempStatus = clsCommMsg.byResponseData[index];
                                    index++;
                                    commData.PChargingOverCurrentStatus = clsCommMsg.byResponseData[index];
                                    index++;
                                    commData.PDisChargingOverCurrentStatus = clsCommMsg.byResponseData[index];
                                    index++;
                                    commData.PCellDiffVoltageStatus = clsCommMsg.byResponseData[index];
                                    index++;
                                    commData.PSensinglinemeasureStatus = clsCommMsg.byResponseData[index];
                                    index++;
                                    commData.sensinglineErr = clsCommMsg.byResponseData[index];
                                    index++;
                                    commData.OCVState = clsCommMsg.byResponseData[index];
                                    index++;
                                    commData.CCVState = clsCommMsg.byResponseData[index];
                                    index++;

                                    for (int i = 0; i < ClassData.CMUEA; i++)
                                    {
                                        for (int j = 0; j < 2; j++)
                                        {
                                            commData.max17841b[i].CellBalancing[j] = clsCommMsg.byResponseData[index];
                                            index++;
                                        }
                                    }
                                }
                                comm_flag = true;
                                Array.Copy(RcvPkt.Data, 0, clsCommMsg.byResponseData, 0, RcvPkt.Idex);
                                clsCommMsg.iResponseLength = RcvPkt.Idex;
                                if (OnCommMessage != null)
                                    OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                RcvVariableInit();
                                break;

                            case (int)Response.PacketError:
                                Console.WriteLine("PacketError");
                                //dtPollTimer = DateTime.Now;
                                //iCURRENT_OP = CMD_IDLE;
                                RcvVariableInit();
                                break;
                        }
                    }
                }
                else
                {
                    isCommConnected = false;
                    clsCommMsg.iMessage = (int)Communication_Message.PortCantOpen; // Port 열지 못하는 이벤트 전송
                    OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                }
            }
            catch
            {
                iCURRENT_OP = CMD_IDLE;
                clsCommMsg.iMessage = (int)Communication_Message.PortException; // Port 예외처리 이벤트 전송
                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
            }
            finally
            {
                Close();
                iCURRENT_OP = CMD_IDLE;
                isCommConnected = false;
                clsCommMsg.iMessage = (int)Communication_Message.PortClose; // Port Close 이벤트 전송
                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
            }
        }

        public void StopThread()
        {
            isStopThread = true;
        }
        public static int iAliveCnt;
        public static Boolean comm_flag;
        // 응답 수신용
        public struct Packet
        {
            public int iRcvStep;
            public int iRcvIdex;
            public int iLineCnt;
            public byte[] byRcvDt;
            public byte[] byDt;
            public byte byBCC;
        }

        public static byte Alive_cnt = 0;

        Packet pk;

        void RcvVariableInit() // Packet구조체의 초기화 입니다.
        {
            pk.iRcvStep = 0;
            pk.iRcvIdex = 0;
            pk.byRcvDt = new byte[2048]; // 수신버퍼 사이즈는 적당히 작게 설정했습니다. 많은 데이터를 다룰때는 키워주세요.
            pk.byDt = new byte[2048];
            Array.Clear(pk.byRcvDt, 0, pk.byRcvDt.Length); // memclr()와 같은 역활입니다.
            Array.Clear(pk.byDt, 0, pk.byDt.Length); // memclr()와 같은 역활입니다.
            pk.byBCC = 0x00;
        }

        int MakeRcvPkt()
        {
            byte byRx;
            bool bRet;
            int iResult = (int)Response.None;
            ClassCommunicationMsg clsCommMsg = new ClassCommunicationMsg();
            while (true)
            {
                bRet = GetRxQueueByte(out byRx); // 수신버퍼에서는 한바이트씩만 가져옵니다.
                if (bRet == false)
                    break;
                Console.Write(string.Format("<{0:X02}>", byRx));

                switch (pk.iRcvStep)
                {
                    case 0:
                        RcvVariableInit();
                        pk.byRcvDt[pk.iRcvIdex++] = byRx;

                        if (byRx == HEAD_A) // Checking STX
                            pk.iRcvStep = 11;
                        else
                            iResult = (int)Response.PacketError; // Packet이 아니거나 깨짐
                        break;
                    case 11:
                        pk.byRcvDt[pk.iRcvIdex++] = byRx;
                        pk.byBCC ^= byRx;
                        if (byRx == HEAD_B)
                            pk.iRcvStep = 15;
                        else
                            iResult = (int)Response.PacketError;
                        break;
                    case 15:
                        pk.byRcvDt[pk.iRcvIdex++] = byRx;
                        pk.byBCC ^= byRx;
                        pk.iRcvStep = 16;
                        pk.iLineCnt = Convert.ToInt32(byRx) * 256;
                        break;
                    case 16:
                        pk.byRcvDt[pk.iRcvIdex++] = byRx;
                        pk.byBCC ^= byRx;
                        pk.iLineCnt += Convert.ToInt32(byRx);
                        pk.iRcvStep = 21;
                        break;
                    case 21:
                        pk.byRcvDt[pk.iRcvIdex++] = byRx;

                        pk.byBCC ^= byRx;
                        if (pk.iRcvIdex == (pk.iLineCnt + 4))
                        {
                            pk.iRcvStep = 51;
                        }
                        else if (pk.iRcvIdex > (pk.iLineCnt + 4))
                        {
                            pk.iRcvStep = 51;
                        }
                        {
                            if (pk.iRcvIdex > 1000)
                                iResult = (int)Response.PacketError; // 나올수 있는 가장긴 Response보다 길어서 Packet이 깨졌다고 판단
                        }
                        break;
                    case 51:
                        pk.byRcvDt[pk.iRcvIdex++] = byRx;
                        pk.iRcvStep = 0;
                        pk.byBCC = clsCm.ComputeCRC8(ref pk.byRcvDt, pk.iRcvIdex - 1);
                        if (pk.byBCC == byRx) // Checking BCC
                            iResult = (int)Response.Packet; // Packet 수신됨
                        else
                            iResult = (int)Response.PacketError; // BCC가 맞지 않음
                        break;
                }
            }
            return iResult;
        }

        int MakeSendPacket_getVersion(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;          // 0
            byData[iIndex++] = HEAD_B;          // 1    
            byData[iIndex++] = 0;               // 2    
            byData[iIndex++] = 0;               // 3
            byData[iIndex++] = 0;               // 4
            byData[iIndex++] = 0x00;            // 5
            byData[iIndex++] = 0x02;            // 6

            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;     // 16
            return iIndex;
        }


        // Covp_enable, Cuvp_enable, Civp_enable, Cocp_enable, Docp_enable, Cotp_enable, Cutp_enable
        int MakeSendPacket_WarnningEnable(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;          // 0
            byData[iIndex++] = HEAD_B;          // 1    
            byData[iIndex++] = 0;               // 2    
            byData[iIndex++] = 0;               // 3
            byData[iIndex++] = 0;               // 4
            byData[iIndex++] = 0x10;            // 5
            byData[iIndex++] = 0x01;            // 6
            byData[iIndex++] = (byte)commData.WCellOverVoltageEnable; //7                   
            byData[iIndex++] = (byte)commData.WCellUnderVoltageEnable; //8
            byData[iIndex++] = (byte)commData.WPackOverVoltageEnable; //9
            byData[iIndex++] = (byte)commData.WPackUnderVoltageEnable; //9
            byData[iIndex++] = (byte)commData.WCellVoltageDiffEnable; //10
            byData[iIndex++] = (byte)commData.WCellOverTempEnable; //11
            byData[iIndex++] = (byte)commData.WCellUnderTempEnable; //12
            byData[iIndex++] = (byte)commData.WChargingOverCurrentEnable; //13
            byData[iIndex++] = (byte)commData.WDisChargingOverCurrentEnable; //14
            byData[iIndex++] = (byte)commData.WLowSOCEnable; //20
            byData[iIndex++] = (byte)commData.WLowSOHEnable; //21
            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;     // 16
            return iIndex;
        }

        int MakeSendPacket_WarnningEnableGet(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;          // 0
            byData[iIndex++] = HEAD_B;          // 1    
            byData[iIndex++] = 0;               // 2    
            byData[iIndex++] = 0;               // 3
            byData[iIndex++] = 0;               // 4
            byData[iIndex++] = 0x10;            // 5
            byData[iIndex++] = 0x02;            // 6
            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;     // 16
            return iIndex;
        }

        int MakeSendPacket_WarnningSet(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;          // 0
            byData[iIndex++] = HEAD_B;          // 1    
            byData[iIndex++] = 0;               // 2    
            byData[iIndex++] = 0;               // 3
            byData[iIndex++] = 0;               // 4
            byData[iIndex++] = 0x11;            // 5
            byData[iIndex++] = 0x01;            // 6
            byData[iIndex++] = (byte)((commData.WsetCellOverVoltage >> 8) & 0xff);  //7
            byData[iIndex++] = (byte)(commData.WsetCellOverVoltage & 0xff);                             //8
            byData[iIndex++] = (byte)((commData.WsetCellUnderVoltage >> 8) & 0xff);                     //9
            byData[iIndex++] = (byte)(commData.WsetCellUnderVoltage & 0xff);                            //10
            byData[iIndex++] = (byte)((commData.WsetPackOverVoltage >> 8) & 0xff);                      //11
            byData[iIndex++] = (byte)(commData.WsetPackOverVoltage & 0xff);                             //12
            byData[iIndex++] = (byte)((commData.WsetPackUnderVoltage >> 8) & 0xff);                     //13
            byData[iIndex++] = (byte)(commData.WsetPackUnderVoltage & 0xff);                            //14
            byData[iIndex++] = (byte)((commData.WsetCellVoltDiff >> 8) & 0xff);                         //15
            byData[iIndex++] = (byte)(commData.WsetCellVoltDiff & 0xff);                                //16
            byData[iIndex++] = (byte)((commData.WsetCellOverTemp >> 8) & 0xff);                         //17
            byData[iIndex++] = (byte)(commData.WsetCellOverTemp & 0xff);                                //18
            byData[iIndex++] = (byte)((commData.WsetCellUnderTemp >> 8) & 0xff);                        //19
            byData[iIndex++] = (byte)(commData.WsetCellUnderTemp & 0xff);                               //20
            byData[iIndex++] = (byte)((commData.WsetChargeOverCurrent >> 8) & 0xff);                    //21
            byData[iIndex++] = (byte)(commData.WsetChargeOverCurrent & 0xff);                           //22
            byData[iIndex++] = (byte)((commData.WsetDischargeOverCurrent >> 8) & 0xff);                 //23
            byData[iIndex++] = (byte)(commData.WsetDischargeOverCurrent & 0xff);                        //24
            byData[iIndex++] = (byte)((commData.WsetLowSOC >> 8) & 0xff);                               //25
            byData[iIndex++] = (byte)(commData.WsetLowSOC & 0xff);                                      //26
            byData[iIndex++] = (byte)((commData.WsetLowSOH >> 8) & 0xff);                               //27
            byData[iIndex++] = (byte)(commData.WsetLowSOH & 0xff);                                      //28
            byData[iIndex++] = 0x00;                                                                    //29
            byData[iIndex++] = (byte)((commData.WsetCellOverVoltageRetain >> 8) & 0xff);                //30
            byData[iIndex++] = (byte)(commData.WsetCellOverVoltageRetain & 0xff);                       //31
            byData[iIndex++] = (byte)((commData.WsetCellUnderVoltageRetain >> 8) & 0xff);               //32
            byData[iIndex++] = (byte)(commData.WsetCellUnderVoltageRetain & 0xff);                      //33
            byData[iIndex++] = (byte)((commData.WsetPackOverVoltageRetain >> 8) & 0xff);                //34
            byData[iIndex++] = (byte)(commData.WsetPackOverVoltageRetain & 0xff);                       //35
            byData[iIndex++] = (byte)((commData.WsetPackUnderVoltageRetain >> 8) & 0xff);               //36
            byData[iIndex++] = (byte)(commData.WsetPackUnderVoltageRetain & 0xff);                      //37
            byData[iIndex++] = (byte)((commData.WsetCellVoltDiffRetain >> 8) & 0xff);                   //38
            byData[iIndex++] = (byte)(commData.WsetCellVoltDiffRetain & 0xff);                          //39
            byData[iIndex++] = (byte)((commData.WsetCellOverTempRetain >> 8) & 0xff);                   //40
            byData[iIndex++] = (byte)(commData.WsetCellOverTempRetain & 0xff);                          //41
            byData[iIndex++] = (byte)((commData.WsetCellUnderTempRetain >> 8) & 0xff);                  //42
            byData[iIndex++] = (byte)(commData.WsetCellUnderTempRetain & 0xff);                         //43
            byData[iIndex++] = (byte)((commData.WsetChargeOverCurrentRetain >> 8) & 0xff);              //44
            byData[iIndex++] = (byte)(commData.WsetChargeOverCurrentRetain & 0xff);                     //45
            byData[iIndex++] = (byte)((commData.WsetDischargeOverCurrentRetain >> 8) & 0xff);           //46
            byData[iIndex++] = (byte)(commData.WsetDischargeOverCurrentRetain & 0xff);                  //47
            byData[iIndex++] = (byte)((commData.WsetLowSOCRetain >> 8) & 0xff);                         //48
            byData[iIndex++] = (byte)(commData.WsetLowSOCRetain & 0xff);                                //49
            byData[iIndex++] = (byte)((commData.WsetLowSOHRetain >> 8) & 0xff);                         //50
            byData[iIndex++] = (byte)(commData.WsetLowSOHRetain & 0xff);                                //51
            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;     // 16
            return iIndex;
        }
        int MakeSendPacket_WarnningGet(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;          // 0
            byData[iIndex++] = HEAD_B;          // 1    
            byData[iIndex++] = 0;               // 2    
            byData[iIndex++] = 0;               // 3
            byData[iIndex++] = 0;               // 4
            byData[iIndex++] = 0x11;            // 5
            byData[iIndex++] = 0x02;            // 6

            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;     // 16
            return iIndex;
        }

        int MakeSendPacket_WarnningReleaseSet(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;          // 0
            byData[iIndex++] = HEAD_B;          // 1    
            byData[iIndex++] = 0;               // 2    
            byData[iIndex++] = 0;               // 3
            byData[iIndex++] = 0;               // 4
            byData[iIndex++] = 0x12;            // 5
            byData[iIndex++] = 0x01;            // 6
            byData[iIndex++] = (byte)((commData.WRsetCellOverVoltage >> 8) & 0xff);                      //7
            byData[iIndex++] = (byte)(commData.WRsetCellOverVoltage & 0xff);                             //8
            byData[iIndex++] = (byte)((commData.WRsetCellUnderVoltage >> 8) & 0xff);                     //9
            byData[iIndex++] = (byte)(commData.WRsetCellUnderVoltage & 0xff);                            //10
            byData[iIndex++] = (byte)((commData.WRsetPackOverVoltage >> 8) & 0xff);                      //11
            byData[iIndex++] = (byte)(commData.WRsetPackOverVoltage & 0xff);                             //12
            byData[iIndex++] = (byte)((commData.WRsetPackUnderVoltage >> 8) & 0xff);                     //13
            byData[iIndex++] = (byte)(commData.WRsetPackUnderVoltage & 0xff);                            //14
            byData[iIndex++] = (byte)((commData.WRsetCellVoltDiff >> 8) & 0xff);                         //15
            byData[iIndex++] = (byte)(commData.WRsetCellVoltDiff & 0xff);                                //16
            byData[iIndex++] = (byte)((commData.WRsetCellOverTemp >> 8) & 0xff);                         //17
            byData[iIndex++] = (byte)(commData.WRsetCellOverTemp & 0xff);                                //18
            byData[iIndex++] = (byte)((commData.WRsetCellUnderTemp >> 8) & 0xff);                        //19
            byData[iIndex++] = (byte)(commData.WRsetCellUnderTemp & 0xff);                               //20
            byData[iIndex++] = (byte)((commData.WRsetChargeOverCurrent >> 8) & 0xff);                    //21
            byData[iIndex++] = (byte)(commData.WRsetChargeOverCurrent & 0xff);                           //22
            byData[iIndex++] = (byte)((commData.WRsetDischargeOverCurrent >> 8) & 0xff);                 //23
            byData[iIndex++] = (byte)(commData.WRsetDischargeOverCurrent & 0xff);                        //24
            byData[iIndex++] = (byte)((commData.WRsetLowSOC >> 8) & 0xff);                               //25
            byData[iIndex++] = (byte)(commData.WRsetLowSOC & 0xff);                                      //26
            byData[iIndex++] = (byte)((commData.WRsetLowSOH >> 8) & 0xff);                               //27
            byData[iIndex++] = (byte)(commData.WRsetLowSOH & 0xff);                                      //28
            byData[iIndex++] = 0x00;                                                                     //29
            byData[iIndex++] = (byte)((commData.WRsetCellOverVoltageRetain >> 8) & 0xff);                //30
            byData[iIndex++] = (byte)(commData.WRsetCellOverVoltageRetain & 0xff);                       //31
            byData[iIndex++] = (byte)((commData.WRsetCellUnderVoltageRetain >> 8) & 0xff);               //32
            byData[iIndex++] = (byte)(commData.WRsetCellUnderVoltageRetain & 0xff);                      //33
            byData[iIndex++] = (byte)((commData.WRsetPackOverVoltageRetain >> 8) & 0xff);                //34
            byData[iIndex++] = (byte)(commData.WRsetPackOverVoltageRetain & 0xff);                       //35
            byData[iIndex++] = (byte)((commData.WRsetPackUnderVoltageRetain >> 8) & 0xff);               //36
            byData[iIndex++] = (byte)(commData.WRsetPackUnderVoltageRetain & 0xff);                      //37
            byData[iIndex++] = (byte)((commData.WRsetCellVoltDiffRetain >> 8) & 0xff);                   //38
            byData[iIndex++] = (byte)(commData.WRsetCellVoltDiffRetain & 0xff);                          //39
            byData[iIndex++] = (byte)((commData.WRsetCellOverTempRetain >> 8) & 0xff);                   //40
            byData[iIndex++] = (byte)(commData.WRsetCellOverTempRetain & 0xff);                          //41
            byData[iIndex++] = (byte)((commData.WRsetCellUnderTempRetain >> 8) & 0xff);                  //42
            byData[iIndex++] = (byte)(commData.WRsetCellUnderTempRetain & 0xff);                         //43
            byData[iIndex++] = (byte)((commData.WRsetChargeOverCurrentRetain >> 8) & 0xff);              //44
            byData[iIndex++] = (byte)(commData.WRsetChargeOverCurrentRetain & 0xff);                     //45
            byData[iIndex++] = (byte)((commData.WRsetDischargeOverCurrentRetain >> 8) & 0xff);           //46
            byData[iIndex++] = (byte)(commData.WRsetDischargeOverCurrentRetain & 0xff);                  //47
            byData[iIndex++] = (byte)((commData.WRsetLowSOCRetain >> 8) & 0xff);                         //48
            byData[iIndex++] = (byte)(commData.WRsetLowSOCRetain & 0xff);                                //49
            byData[iIndex++] = (byte)((commData.WRsetLowSOHRetain >> 8) & 0xff);                         //50
            byData[iIndex++] = (byte)(commData.WRsetLowSOHRetain & 0xff);                                //51
            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;     // 16
            return iIndex;
        }
        int MakeSendPacket_WarnningReleaseGet(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;          // 0
            byData[iIndex++] = HEAD_B;          // 1    
            byData[iIndex++] = 0;               // 2    
            byData[iIndex++] = 0;               // 3
            byData[iIndex++] = 0;               // 4
            byData[iIndex++] = 0x12;            // 5
            byData[iIndex++] = 0x02;            // 6

            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;     // 16
            return iIndex;
        }

        int MakeSendPacket_ProtectEnable(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;          // 0
            byData[iIndex++] = HEAD_B;          // 1    
            byData[iIndex++] = 0;               // 2    
            byData[iIndex++] = 0;               // 3
            byData[iIndex++] = 0;               // 4
            byData[iIndex++] = 0x13;            // 5
            byData[iIndex++] = 0x01;            // 6
            byData[iIndex++] = (byte)commData.PCellOverVoltageEnable; //7                    
            byData[iIndex++] = (byte)commData.PCellUnderVoltageEnable; //8
            byData[iIndex++] = (byte)commData.PPackOverVoltageEnable; //9
            byData[iIndex++] = (byte)commData.PPackUnderVoltageEnable; //9
            byData[iIndex++] = (byte)commData.PCellVoltageDiffEnable; //10
            byData[iIndex++] = (byte)commData.PCellOverTempEnable; //11
            byData[iIndex++] = (byte)commData.PCellUnderTempEnable; //12
            byData[iIndex++] = (byte)commData.PChargingOverCurrentEnable; //13
            byData[iIndex++] = (byte)commData.PDisChargingOverCurrentEnable; //14
            byData[iIndex++] = (byte)commData.PSensingLineMeasureEnable; //15
            byData[iIndex++] = (byte)commData.PCommunicationErrorEnable; //16
            byData[iIndex++] = (byte)commData.PCurrentSensorErrorEnable; //17
            byData[iIndex++] = (byte)commData.PInterLockErrorEnable; //18
            byData[iIndex++] = (byte)commData.PSelfSystemDiagEnable; //19
            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;     // 16
            return iIndex;
        }

        int MakeSendPacket_ProtectEnableGet(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;          // 0
            byData[iIndex++] = HEAD_B;          // 1    
            byData[iIndex++] = 0;               // 2    
            byData[iIndex++] = 0;               // 3
            byData[iIndex++] = 0;               // 4
            byData[iIndex++] = 0x13;            // 5
            byData[iIndex++] = 0x02;            // 6

            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;     // 16
            return iIndex;
        }

        int MakeSendPacket_ProtectSet(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;          // 0
            byData[iIndex++] = HEAD_B;          // 1    
            byData[iIndex++] = 0;               // 2    
            byData[iIndex++] = 0;               // 3
            byData[iIndex++] = 0;               // 4
            byData[iIndex++] = 0x14;            // 5
            byData[iIndex++] = 0x01;            // 6
            byData[iIndex++] = (byte)((commData.PsetCellOverVoltage >> 8) & 0xff);                      //7
            byData[iIndex++] = (byte)(commData.PsetCellOverVoltage & 0xff);                             //8
            byData[iIndex++] = (byte)((commData.PsetCellUnderVoltage >> 8) & 0xff);                     //9
            byData[iIndex++] = (byte)(commData.PsetCellUnderVoltage & 0xff);                            //10
            byData[iIndex++] = (byte)((commData.PsetPackOverVoltage >> 8) & 0xff);                      //11
            byData[iIndex++] = (byte)(commData.PsetPackOverVoltage & 0xff);                             //12
            byData[iIndex++] = (byte)((commData.PsetPackUnderVoltage >> 8) & 0xff);                     //13
            byData[iIndex++] = (byte)(commData.PsetPackUnderVoltage & 0xff);                            //14
            byData[iIndex++] = (byte)((commData.PsetCellVoltDiff >> 8) & 0xff);                         //15
            byData[iIndex++] = (byte)(commData.PsetCellVoltDiff & 0xff);                                //16
            byData[iIndex++] = (byte)((commData.PsetCellOverTemp >> 8) & 0xff);                         //17
            byData[iIndex++] = (byte)(commData.PsetCellOverTemp & 0xff);                                //18
            byData[iIndex++] = (byte)((commData.PsetCellUnderTemp >> 8) & 0xff);                        //19
            byData[iIndex++] = (byte)(commData.PsetCellUnderTemp & 0xff);                               //20
            byData[iIndex++] = (byte)((commData.PsetChargeOverCurrent >> 8) & 0xff);                    //21
            byData[iIndex++] = (byte)(commData.PsetChargeOverCurrent & 0xff);                           //22
            byData[iIndex++] = (byte)((commData.PsetDischargeOverCurrent >> 8) & 0xff);                 //23
            byData[iIndex++] = (byte)(commData.PsetDischargeOverCurrent & 0xff);                        //24
            byData[iIndex++] = (byte)commData.PsetSensingLineMeasure;                                   //25
            byData[iIndex++] = (byte)commData.PsetCommunicationError;                                   //26
            byData[iIndex++] = (byte)commData.PsetCurrentSensorError;                                   //27
            byData[iIndex++] = (byte)commData.PsetInterLockError;                                       //28
            byData[iIndex++] = (byte)commData.PsetSelfSystemDiag;                                       //29
            byData[iIndex++] = 0x00;                                                                    //34
            byData[iIndex++] = (byte)((commData.PsetCellOverVoltageRetain >> 8) & 0xff);                //35
            byData[iIndex++] = (byte)(commData.PsetCellOverVoltageRetain & 0xff);                       //36
            byData[iIndex++] = (byte)((commData.PsetCellUnderVoltageRetain >> 8) & 0xff);               //37
            byData[iIndex++] = (byte)(commData.PsetCellUnderVoltageRetain & 0xff);                      //38
            byData[iIndex++] = (byte)((commData.PsetPackOverVoltageRetain >> 8) & 0xff);                //39
            byData[iIndex++] = (byte)(commData.PsetPackOverVoltageRetain & 0xff);                       //40
            byData[iIndex++] = (byte)((commData.PsetPackUnderVoltageRetain >> 8) & 0xff);               //41
            byData[iIndex++] = (byte)(commData.PsetPackUnderVoltageRetain & 0xff);                      //42
            byData[iIndex++] = (byte)((commData.PsetCellVoltDiffRetain >> 8) & 0xff);                   //43
            byData[iIndex++] = (byte)(commData.PsetCellVoltDiffRetain & 0xff);                          //44
            byData[iIndex++] = (byte)((commData.PsetCellOverTempRetain >> 8) & 0xff);                   //45
            byData[iIndex++] = (byte)(commData.PsetCellOverTempRetain & 0xff);                          //46
            byData[iIndex++] = (byte)((commData.PsetCellUnderTempRetain >> 8) & 0xff);                  //47
            byData[iIndex++] = (byte)(commData.PsetCellUnderTempRetain & 0xff);                         //48
            byData[iIndex++] = (byte)((commData.PsetChargeOverCurrentRetain >> 8) & 0xff);              //49
            byData[iIndex++] = (byte)(commData.PsetChargeOverCurrentRetain & 0xff);                     //50
            byData[iIndex++] = (byte)((commData.PsetDischargeOverCurrentRetain >> 8) & 0xff);           //51
            byData[iIndex++] = (byte)(commData.PsetDischargeOverCurrentRetain & 0xff);                  //52
            byData[iIndex++] = (byte)((commData.PsetSensingLineMeasureRetain >> 8) & 0xff);            //57
            byData[iIndex++] = (byte)(commData.PsetSensingLineMeasureRetain & 0xff);                   //58
            byData[iIndex++] = (byte)((commData.PsetCommunicationErrorRetain >> 8) & 0xff);            //59
            byData[iIndex++] = (byte)(commData.PsetCommunicationErrorRetain & 0xff);                   //60
            byData[iIndex++] = (byte)((commData.PsetCurrentSensorErrorRetain >> 8) & 0xff);            //61
            byData[iIndex++] = (byte)(commData.PsetCurrentSensorErrorRetain & 0xff);                   //62
            byData[iIndex++] = (byte)((commData.PsetInterLockErrorRetain >> 8) & 0xff);                //63
            byData[iIndex++] = (byte)(commData.PsetInterLockErrorRetain & 0xff);                       //64
            byData[iIndex++] = (byte)((commData.PsetSelfSystemDiagRetain >> 8) & 0xff);                //65
            byData[iIndex++] = (byte)(commData.PsetSelfSystemDiagRetain & 0xff);                       //66
            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);   
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;     // 16
            return iIndex;
        }
        int MakeSendPacket_ProtectGet(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;          // 0
            byData[iIndex++] = HEAD_B;          // 1    
            byData[iIndex++] = 0;               // 2    
            byData[iIndex++] = 0;               // 3
            byData[iIndex++] = 0;               // 4
            byData[iIndex++] = 0x14;            // 5
            byData[iIndex++] = 0x02;            // 6

            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;     // 16
            return iIndex;
        }

        int MakeSendPacket_ProtectReleaseSet(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;          // 0
            byData[iIndex++] = HEAD_B;          // 1    
            byData[iIndex++] = 0;               // 2    
            byData[iIndex++] = 0;               // 3
            byData[iIndex++] = 0;               // 4
            byData[iIndex++] = 0x15;            // 5
            byData[iIndex++] = 0x01;            // 6
            byData[iIndex++] = (byte)((commData.PRsetCellOverVoltage >> 8) & 0xff);  //7
            byData[iIndex++] = (byte)(commData.PRsetCellOverVoltage & 0xff);                            //8
            byData[iIndex++] = (byte)((commData.PRsetCellUnderVoltage >> 8) & 0xff);                    //9
            byData[iIndex++] = (byte)(commData.PRsetCellUnderVoltage & 0xff);                           //10
            byData[iIndex++] = (byte)((commData.PRsetPackOverVoltage >> 8) & 0xff);                     //11
            byData[iIndex++] = (byte)(commData.PRsetPackOverVoltage & 0xff);                            //12
            byData[iIndex++] = (byte)((commData.PRsetPackUnderVoltage >> 8) & 0xff);                    //13
            byData[iIndex++] = (byte)(commData.PRsetPackUnderVoltage & 0xff);                           //14
            byData[iIndex++] = (byte)((commData.PRsetCellVoltDiff >> 8) & 0xff);                        //15
            byData[iIndex++] = (byte)(commData.PRsetCellVoltDiff & 0xff);                               //16
            byData[iIndex++] = (byte)((commData.PRsetCellOverTemp >> 8) & 0xff);                        //17
            byData[iIndex++] = (byte)(commData.PRsetCellOverTemp & 0xff);                               //18
            byData[iIndex++] = (byte)((commData.PRsetCellUnderTemp >> 8) & 0xff);                       //19
            byData[iIndex++] = (byte)(commData.PRsetCellUnderTemp & 0xff);                              //20
            byData[iIndex++] = (byte)((commData.PRsetChargeOverCurrent >> 8) & 0xff);                   //21
            byData[iIndex++] = (byte)(commData.PRsetChargeOverCurrent & 0xff);                          //22
            byData[iIndex++] = (byte)((commData.PRsetDischargeOverCurrent >> 8) & 0xff);                //23
            byData[iIndex++] = (byte)(commData.PRsetDischargeOverCurrent & 0xff);                       //24
            byData[iIndex++] = (byte)commData.PRsetSensingLineMeasure;                                  //25
            byData[iIndex++] = (byte)commData.PRsetCommunicationError;                                  //26
            byData[iIndex++] = (byte)commData.PRsetCurrentSensorError;                                  //27
            byData[iIndex++] = (byte)commData.PRsetInterLockError;                                      //28
            byData[iIndex++] = (byte)commData.PRsetSelfSystemDiag;                                      //29
            byData[iIndex++] = 0x00;                                                                    //34
            byData[iIndex++] = (byte)((commData.PRsetCellOverVoltageRetain >> 8) & 0xff);               //35
            byData[iIndex++] = (byte)(commData.PRsetCellOverVoltageRetain & 0xff);                      //36
            byData[iIndex++] = (byte)((commData.PRsetCellUnderVoltageRetain >> 8) & 0xff);              //37
            byData[iIndex++] = (byte)(commData.PRsetCellUnderVoltageRetain & 0xff);                     //38
            byData[iIndex++] = (byte)((commData.PRsetPackOverVoltageRetain >> 8) & 0xff);               //39
            byData[iIndex++] = (byte)(commData.PRsetPackOverVoltageRetain & 0xff);                      //40
            byData[iIndex++] = (byte)((commData.PRsetPackUnderVoltageRetain >> 8) & 0xff);              //41
            byData[iIndex++] = (byte)(commData.PRsetPackUnderVoltageRetain & 0xff);                     //42
            byData[iIndex++] = (byte)((commData.PRsetCellVoltDiffRetain >> 8) & 0xff);                  //43
            byData[iIndex++] = (byte)(commData.PRsetCellVoltDiffRetain & 0xff);                         //44
            byData[iIndex++] = (byte)((commData.PRsetCellOverTempRetain >> 8) & 0xff);                  //45
            byData[iIndex++] = (byte)(commData.PRsetCellOverTempRetain & 0xff);                         //46
            byData[iIndex++] = (byte)((commData.PRsetCellUnderTempRetain >> 8) & 0xff);                 //47
            byData[iIndex++] = (byte)(commData.PRsetCellUnderTempRetain & 0xff);                        //48
            byData[iIndex++] = (byte)((commData.PRsetChargeOverCurrentRetain >> 8) & 0xff);             //49
            byData[iIndex++] = (byte)(commData.PRsetChargeOverCurrentRetain & 0xff);                    //50
            byData[iIndex++] = (byte)((commData.PRsetDischargeOverCurrentRetain >> 8) & 0xff);          //51
            byData[iIndex++] = (byte)(commData.PRsetDischargeOverCurrentRetain & 0xff);                 //52
            byData[iIndex++] = (byte)((commData.PsetSensingLineMeasureRetain >> 8) & 0xff);            //57
            byData[iIndex++] = (byte)(commData.PsetSensingLineMeasureRetain & 0xff);                   //58
            byData[iIndex++] = (byte)((commData.PsetCommunicationErrorRetain >> 8) & 0xff);            //59
            byData[iIndex++] = (byte)(commData.PsetCommunicationErrorRetain & 0xff);                   //60
            byData[iIndex++] = (byte)((commData.PsetCurrentSensorErrorRetain >> 8) & 0xff);            //61
            byData[iIndex++] = (byte)(commData.PsetCurrentSensorErrorRetain & 0xff);                   //62
            byData[iIndex++] = (byte)((commData.PsetInterLockErrorRetain >> 8) & 0xff);                //63
            byData[iIndex++] = (byte)(commData.PsetInterLockErrorRetain & 0xff);                       //64
            byData[iIndex++] = (byte)((commData.PsetSelfSystemDiagRetain >> 8) & 0xff);                //65
            byData[iIndex++] = (byte)(commData.PsetSelfSystemDiagRetain & 0xff);                       //66
            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);                                           
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;     // 16
            return iIndex;
        }
        int MakeSendPacket_ProtectReleaseGet(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;          // 0
            byData[iIndex++] = HEAD_B;          // 1    
            byData[iIndex++] = 0;               // 2    
            byData[iIndex++] = 0;               // 3
            byData[iIndex++] = 0;               // 4
            byData[iIndex++] = 0x15;            // 5
            byData[iIndex++] = 0x02;            // 6

            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;     // 16
            return iIndex;
        }

        int MakeSendPacket_MornitoringGet(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;      // 0
            byData[iIndex++] = HEAD_B;      // 1
            byData[iIndex++] = 0;           // 2
            byData[iIndex++] = 0;           // 3
            byData[iIndex++] = 0;           // 4
            byData[iIndex++] = 0x30;        // 5
            byData[iIndex++] = 0x02;        // 6
            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;     // 6
            return iIndex;
        }


        int MakeSendPacket_Factory_Reset(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;      // 0
            byData[iIndex++] = HEAD_B;      // 1
            byData[iIndex++] = 0;           // 2
            byData[iIndex++] = 0;           // 3
            byData[iIndex++] = 0;           // 4
            byData[iIndex++] = 0x01;        // 5
            byData[iIndex++] = 0x01;        // 6
            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;     // 6
            return iIndex;
        }

        int MakeSendPacket_SOC_Set(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;      // 0
            byData[iIndex++] = HEAD_B;      // 1
            byData[iIndex++] = 0;           // 2
            byData[iIndex++] = 0;           // 3
            byData[iIndex++] = 0;           // 4
            byData[iIndex++] = 0x20;        // 5
            byData[iIndex++] = 0x01;        // 6
            byData[iIndex++] = (byte)((commData.SetSoc >> 8) & 0xff);        // 7
            byData[iIndex++] = (byte)(commData.SetSoc & 0xff);               // 8
            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;     // 6
            return iIndex;
        }

        int MakeSendPacket_SOC_Reset(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;      // 0
            byData[iIndex++] = HEAD_B;      // 1
            byData[iIndex++] = 0;           // 2
            byData[iIndex++] = 0;           // 3
            byData[iIndex++] = 0;           // 4
            byData[iIndex++] = 0x20;        // 5
            byData[iIndex++] = 0x02;        // 6
            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;     // 6
            return iIndex;
        }

        int MakeSendPacket_SOH_Set(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;      // 0
            byData[iIndex++] = HEAD_B;      // 1
            byData[iIndex++] = 0;           // 2
            byData[iIndex++] = 0;           // 3
            byData[iIndex++] = 0;           // 4
            byData[iIndex++] = 0x21;        // 5
            byData[iIndex++] = 0x01;        // 6
            byData[iIndex++] = (byte)((commData.SetSoh >> 8) & 0xff);        // 7
            byData[iIndex++] = (byte)(commData.SetSoh & 0xff);               // 8
            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;         // 7
            return iIndex;
        }

        int MakeSendPacket_SOH_Reset(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;      // 0
            byData[iIndex++] = HEAD_B;      // 1
            byData[iIndex++] = 0;           // 2
            byData[iIndex++] = 0;           // 3
            byData[iIndex++] = 0;           // 4
            byData[iIndex++] = 0x21;        // 5
            byData[iIndex++] = 0x02;        // 6
            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;     // 6
            return iIndex;
        }

        int MakeSendPacket_RelayON(ref byte[] byData, int iCommand)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;  // 0
            byData[iIndex++] = HEAD_B;  // 1
            byData[iIndex++] = 0;       // 2
            byData[iIndex++] = 0;       // 3
            byData[iIndex++] = 0;       // 4
            byData[iIndex++] = 0x02;    // 5
            byData[iIndex++] = 0x02;    // 6
            byData[iIndex++] = 0x01;    // 7
            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc; // 7
            return iIndex;
        }

        int MakeSendPacket_RelayOFF(ref byte[] byData, int iCommand)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;      // 0
            byData[iIndex++] = HEAD_B;      // 1
            byData[iIndex++] = 0;           // 2
            byData[iIndex++] = 0;           // 3
            byData[iIndex++] = 0;           // 4
            byData[iIndex++] = 0x02;        // 5
            byData[iIndex++] = 0x02;        // 6
            byData[iIndex++] = 0x02;        // 7
            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc; // 7
            return iIndex;
        }
    }
}


