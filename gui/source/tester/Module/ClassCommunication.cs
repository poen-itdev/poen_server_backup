using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;     //추가
using System.IO;   //추가
using System.IO.Ports;   //추가
using static System.Windows.Forms.VisualStyles.VisualStyleElement;


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
        int POLL_TIME = 1000;  // 전체 Loop Time - 초기 500


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

        public const int CMD_SEND_FACTORY_RESET = 122;

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
                        if ((clsCm.GetElepsedTime(dtPollTimer) > POLL_TIME))
                        {
                            //whl iCURRENT_OP = CMD_SEND_GET_MONITORING;
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
                                SndPkt.Length = MakeSendPacket_Mornitoring_Status(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_VERSION_GET:
                                SndPkt.Length = MakeSendPacket_Version_Status(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_FACTORY_RESET:
                                SndPkt.Length = MakeSendPacket_Factory_Status(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_RLYON:
                                SndPkt.Length =  MakeSendPacket_RelayON_Status(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_RLYOFF:
                                SndPkt.Length = MakeSendPacket_RelayOFF_Status(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_SOC_SET:
                                SndPkt.Length = MakeSendPacket_SOC_Status(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_SOC_RESET:
                                SndPkt.Length = MakeSendPacket_SOC_Status(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_SOH_SET:
                                SndPkt.Length = MakeSendPacket_SOH_Status(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_SOH_RESET:
                                SndPkt.Length = MakeSendPacket_SOH_Status(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_WARNNING_ENABLE:
                                SndPkt.Length = MakeSendPacket_WarnningEnable_Status(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_WARNNING_ENABLE_GET:
                                SndPkt.Length = MakeSendPacket_WarnningEnable_Status(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_WARNNING_SET:
                                SndPkt.Length = MakeSendPacket_Warnning_Status(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_WARNNING_GET:
                                SndPkt.Length = MakeSendPacket_Warnning_Status(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_WARNNING_RELEASE_SET:
                                SndPkt.Length = MakeSendPacket_WarnningRelease_Status(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_WARNNING_RELEASE_GET:
                                SndPkt.Length = MakeSendPacket_WarnningRelease_Status(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_PROTECT_ENABLE:
                                SndPkt.Length = MakeSendPacket_ProtectEnable_Status(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_PROTECT_ENABLE_GET:
                                SndPkt.Length = MakeSendPacket_ProtectEnable_Status(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_PROTECT_SET:
                                SndPkt.Length = MakeSendPacket_Protect_Status(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_PROTECT_GET:
                                SndPkt.Length = MakeSendPacket_Protect_Status(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_PROTECT_RELEASE_SET:
                                SndPkt.Length = MakeSendPacket_ProtectRelease_Status(ref bySndBuff);
                                Write(bySndBuff, SndPkt.Length);
                                clsCommMsg.iMessage = (int)Communication_Message.PacketSend;
                                Array.Copy(bySndBuff, 0, clsCommMsg.byResponseData, 0, iSendSize);
                                clsCommMsg.iResponseLength = iSendSize;
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                dtPollTimer = DateTime.Now;
                                iCURRENT_OP = CMD_IDLE;
                                break;

                            case CMD_SEND_PROTECT_RELEASE_GET:
                                SndPkt.Length = MakeSendPacket_ProtectRelease_Status(ref bySndBuff);
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
                                pk = RcvQueue.Dequeue();   
                                Array.Copy(pk.byRcvDt, 0, clsCommMsg.byResponseData, 0, pk.iRcvIdex);
                                clsCommMsg.iResponseLength = pk.iRcvIdex;

                                if (iCURRENT_OP == CMD_WAIT_RESPONSE || iCURRENT_OP == CMD_IDLE)
                                {
                                    iCURRENT_OP = CMD_IDLE;
                                    
                                }
                                comm_flag = true;
                                Array.Copy(RcvPkt.Data, 0, clsCommMsg.byResponseData, 0, RcvPkt.Idex);
                                clsCommMsg.iResponseLength = RcvPkt.Idex;
                                if (OnCommMessage != null)
                                    OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
                                RcvVariableInit();
                                OnCommMessage(this, new ClassCommunicationEventArgs(clsCommMsg));
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
        Queue<Packet> RcvQueue = new Queue<Packet>();

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
                        {
                            RcvQueue.Enqueue(pk);
                            iResult = (int)Response.Packet; // Packet 수신됨
                        }
                        else
                        {
                            iResult = (int)Response.PacketError; // BCC가 맞지 않음
                        }
                        break;
                }
            }
            return iResult;
        }

        int MakeSendPacket_Version_Status(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;          // 0
            byData[iIndex++] = HEAD_B;          // 1    
            byData[iIndex++] = 0;               // 2    
            byData[iIndex++] = 0;               // 3
            byData[iIndex++] = 0;               // 4
            byData[iIndex++] = 0x00;            // 5
            byData[iIndex++] = 0x03;            // 6
            byData[iIndex++] = 0x7f;            // 6
            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;     // 16
            return iIndex;
        }


        // Covp_enable, Cuvp_enable, Civp_enable, Cocp_enable, Docp_enable, Cotp_enable, Cutp_enable
        int MakeSendPacket_WarnningEnable_Status(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;          // 0
            byData[iIndex++] = HEAD_B;          // 1    
            byData[iIndex++] = 0;               // 2    
            byData[iIndex++] = 0;               // 3
            byData[iIndex++] = 0;               // 4
            byData[iIndex++] = 0x10;            // 5
            byData[iIndex++] = 0x03;            // 6
            byData[iIndex++] = 0x01; //(byte)commData.WCellOverVoltageEnable; //7                   
            byData[iIndex++] = 0x01; //(byte)commData.WCellUnderVoltageEnable; //8
            byData[iIndex++] = 0x01; //(byte)commData.WPackOverVoltageEnable; //9
            byData[iIndex++] = 0x01; //(byte)commData.WPackUnderVoltageEnable; //9
            byData[iIndex++] = 0x01; //(byte)commData.WCellVoltageDiffEnable; //10
            byData[iIndex++] = 0x01; //(byte)commData.WCellOverTempEnable; //11
            byData[iIndex++] = 0x01; //(byte)commData.WCellUnderTempEnable; //12
            byData[iIndex++] = 0x01; //(byte)commData.WChargingOverCurrentEnable; //13
            byData[iIndex++] = 0x01; //(byte)commData.WDisChargingOverCurrentEnable; //14
            byData[iIndex++] = 0x01; //(byte)commData.WLowSOCEnable; //20
            byData[iIndex++] = 0x01; //(byte)commData.WLowSOHEnable; //21
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

        int MakeSendPacket_Warnning_Status(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;          // 0
            byData[iIndex++] = HEAD_B;          // 1    
            byData[iIndex++] = 0;               // 2    
            byData[iIndex++] = 0;               // 3
            byData[iIndex++] = 0;               // 4
            byData[iIndex++] = 0x11;            // 5
            byData[iIndex++] = 0x03;            // 6
            byData[iIndex++] = 0x01;//byte)((commData.WsetCellOverVoltage >> 8) & 0xff);  //7
            byData[iIndex++] = 0x01;//byte)(commData.WsetCellOverVoltage & 0xff);                             //8
            byData[iIndex++] = 0x01;//byte)((commData.WsetCellUnderVoltage >> 8) & 0xff);                     //9
            byData[iIndex++] = 0x01;//byte)(commData.WsetCellUnderVoltage & 0xff);                            //10
            byData[iIndex++] = 0x01;//byte)((commData.WsetPackOverVoltage >> 8) & 0xff);                      //11
            byData[iIndex++] = 0x01;//byte)(commData.WsetPackOverVoltage & 0xff);                             //12
            byData[iIndex++] = 0x01;//byte)((commData.WsetPackUnderVoltage >> 8) & 0xff);                     //13
            byData[iIndex++] = 0x01;//byte)(commData.WsetPackUnderVoltage & 0xff);                            //14
            byData[iIndex++] = 0x01;//byte)((commData.WsetCellVoltDiff >> 8) & 0xff);                         //15
            byData[iIndex++] = 0x01;//byte)(commData.WsetCellVoltDiff & 0xff);                                //16
            byData[iIndex++] = 0x01;//byte)((commData.WsetCellOverTemp >> 8) & 0xff);                         //17
            byData[iIndex++] = 0x01;//byte)(commData.WsetCellOverTemp & 0xff);                                //18
            byData[iIndex++] = 0x01;//byte)((commData.WsetCellUnderTemp >> 8) & 0xff);                        //19
            byData[iIndex++] = 0x01;//byte)(commData.WsetCellUnderTemp & 0xff);                               //20
            byData[iIndex++] = 0x01;//byte)((commData.WsetChargeOverCurrent >> 8) & 0xff);                    //21
            byData[iIndex++] = 0x01;//byte)(commData.WsetChargeOverCurrent & 0xff);                           //22
            byData[iIndex++] = 0x01;//byte)((commData.WsetDischargeOverCurrent >> 8) & 0xff);                 //23
            byData[iIndex++] = 0x01;//byte)(commData.WsetDischargeOverCurrent & 0xff);                        //24
            byData[iIndex++] = 0x01;//byte)((commData.WsetLowSOC >> 8) & 0xff);                               //25
            byData[iIndex++] = 0x01;//byte)(commData.WsetLowSOC & 0xff);                                      //26
            byData[iIndex++] = 0x01;//byte)((commData.WsetLowSOH >> 8) & 0xff);                               //27
            byData[iIndex++] = 0x01;//byte)(commData.WsetLowSOH & 0xff);                                      //28
            byData[iIndex++] = 0x01;//x01;                                                                    //29
            byData[iIndex++] = 0x01;//byte)((commData.WsetCellOverVoltageRetain >> 8) & 0xff);                //30
            byData[iIndex++] = 0x01;//byte)(commData.WsetCellOverVoltageRetain & 0xff);                       //31
            byData[iIndex++] = 0x01;//byte)((commData.WsetCellUnderVoltageRetain >> 8) & 0xff);               //32
            byData[iIndex++] = 0x01;//byte)(commData.WsetCellUnderVoltageRetain & 0xff);                      //33
            byData[iIndex++] = 0x01;//byte)((commData.WsetPackOverVoltageRetain >> 8) & 0xff);                //34
            byData[iIndex++] = 0x01;//byte)(commData.WsetPackOverVoltageRetain & 0xff);                       //35
            byData[iIndex++] = 0x01;//byte)((commData.WsetPackUnderVoltageRetain >> 8) & 0xff);               //36
            byData[iIndex++] = 0x01;//byte)(commData.WsetPackUnderVoltageRetain & 0xff);                      //37
            byData[iIndex++] = 0x01;//byte)((commData.WsetCellVoltDiffRetain >> 8) & 0xff);                   //38
            byData[iIndex++] = 0x01;//byte)(commData.WsetCellVoltDiffRetain & 0xff);                          //39
            byData[iIndex++] = 0x01;//byte)((commData.WsetCellOverTempRetain >> 8) & 0xff);                   //40
            byData[iIndex++] = 0x01;//byte)(commData.WsetCellOverTempRetain & 0xff);                          //41
            byData[iIndex++] = 0x01;//byte)((commData.WsetCellUnderTempRetain >> 8) & 0xff);                  //42
            byData[iIndex++] = 0x01;//byte)(commData.WsetCellUnderTempRetain & 0xff);                         //43
            byData[iIndex++] = 0x01;//byte)((commData.WsetChargeOverCurrentRetain >> 8) & 0xff);              //44
            byData[iIndex++] = 0x01;//byte)(commData.WsetChargeOverCurrentRetain & 0xff);                     //45
            byData[iIndex++] = 0x01;//byte)((commData.WsetDischargeOverCurrentRetain >> 8) & 0xff);           //46
            byData[iIndex++] = 0x01;//byte)(commData.WsetDischargeOverCurrentRetain & 0xff);                  //47
            byData[iIndex++] = 0x01;//byte)((commData.WsetLowSOCRetain >> 8) & 0xff);                         //48
            byData[iIndex++] = 0x01;//byte)(commData.WsetLowSOCRetain & 0xff);                                //49
            byData[iIndex++] = 0x01;//byte)((commData.WsetLowSOHRetain >> 8) & 0xff);                         //50
            byData[iIndex++] = 0x01;//(byte)(commData.WsetLowSOHRetain & 0xff);                                //51
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

        int MakeSendPacket_WarnningRelease_Status(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;          // 0
            byData[iIndex++] = HEAD_B;          // 1    
            byData[iIndex++] = 0;               // 2    
            byData[iIndex++] = 0;               // 3
            byData[iIndex++] = 0;               // 4
            byData[iIndex++] = 0x12;            // 5
            byData[iIndex++] = 0x03;            // 6
            byData[iIndex++] = 0x01;//byte)((commData.WRsetCellOverVoltage >> 8) & 0xff);                      //7
            byData[iIndex++] = 0x01;//byte)(commData.WRsetCellOverVoltage & 0xff);                             //8
            byData[iIndex++] = 0x01;//byte)((commData.WRsetCellUnderVoltage >> 8) & 0xff);                     //9
            byData[iIndex++] = 0x01;//byte)(commData.WRsetCellUnderVoltage & 0xff);                            //10
            byData[iIndex++] = 0x01;//byte)((commData.WRsetPackOverVoltage >> 8) & 0xff);                      //11
            byData[iIndex++] = 0x01;//byte)(commData.WRsetPackOverVoltage & 0xff);                             //12
            byData[iIndex++] = 0x01;//byte)((commData.WRsetPackUnderVoltage >> 8) & 0xff);                     //13
            byData[iIndex++] = 0x01;//byte)(commData.WRsetPackUnderVoltage & 0xff);                            //14
            byData[iIndex++] = 0x01;//byte)((commData.WRsetCellVoltDiff >> 8) & 0xff);                         //15
            byData[iIndex++] = 0x01;//byte)(commData.WRsetCellVoltDiff & 0xff);                                //16
            byData[iIndex++] = 0x01;//byte)((commData.WRsetCellOverTemp >> 8) & 0xff);                         //17
            byData[iIndex++] = 0x01;//byte)(commData.WRsetCellOverTemp & 0xff);                                //18
            byData[iIndex++] = 0x01;//byte)((commData.WRsetCellUnderTemp >> 8) & 0xff);                        //19
            byData[iIndex++] = 0x01;//byte)(commData.WRsetCellUnderTemp & 0xff);                               //20
            byData[iIndex++] = 0x01;//byte)((commData.WRsetChargeOverCurrent >> 8) & 0xff);                    //21
            byData[iIndex++] = 0x01;//byte)(commData.WRsetChargeOverCurrent & 0xff);                           //22
            byData[iIndex++] = 0x01;//byte)((commData.WRsetDischargeOverCurrent >> 8) & 0xff);                 //23
            byData[iIndex++] = 0x01;//byte)(commData.WRsetDischargeOverCurrent & 0xff);                        //24
            byData[iIndex++] = 0x01;//byte)((commData.WRsetLowSOC >> 8) & 0xff);                               //25
            byData[iIndex++] = 0x01;//byte)(commData.WRsetLowSOC & 0xff);                                      //26
            byData[iIndex++] = 0x01;//byte)((commData.WRsetLowSOH >> 8) & 0xff);                               //27
            byData[iIndex++] = 0x01;//byte)(commData.WRsetLowSOH & 0xff);                                      //28
            byData[iIndex++] = 0x00;//x00;                                                                     //29
            byData[iIndex++] = 0x01;//byte)((commData.WRsetCellOverVoltageRetain >> 8) & 0xff);                //30
            byData[iIndex++] = 0x01;//byte)(commData.WRsetCellOverVoltageRetain & 0xff);                       //31
            byData[iIndex++] = 0x01;//byte)((commData.WRsetCellUnderVoltageRetain >> 8) & 0xff);               //32
            byData[iIndex++] = 0x01;//byte)(commData.WRsetCellUnderVoltageRetain & 0xff);                      //33
            byData[iIndex++] = 0x01;//byte)((commData.WRsetPackOverVoltageRetain >> 8) & 0xff);                //34
            byData[iIndex++] = 0x01;//byte)(commData.WRsetPackOverVoltageRetain & 0xff);                       //35
            byData[iIndex++] = 0x01;//byte)((commData.WRsetPackUnderVoltageRetain >> 8) & 0xff);               //36
            byData[iIndex++] = 0x01;//byte)(commData.WRsetPackUnderVoltageRetain & 0xff);                      //37
            byData[iIndex++] = 0x01;//byte)((commData.WRsetCellVoltDiffRetain >> 8) & 0xff);                   //38
            byData[iIndex++] = 0x01;//byte)(commData.WRsetCellVoltDiffRetain & 0xff);                          //39
            byData[iIndex++] = 0x01;//byte)((commData.WRsetCellOverTempRetain >> 8) & 0xff);                   //40
            byData[iIndex++] = 0x01;//byte)(commData.WRsetCellOverTempRetain & 0xff);                          //41
            byData[iIndex++] = 0x01;//byte)((commData.WRsetCellUnderTempRetain >> 8) & 0xff);                  //42
            byData[iIndex++] = 0x01;//byte)(commData.WRsetCellUnderTempRetain & 0xff);                         //43
            byData[iIndex++] = 0x01;//byte)((commData.WRsetChargeOverCurrentRetain >> 8) & 0xff);              //44
            byData[iIndex++] = 0x01;//byte)(commData.WRsetChargeOverCurrentRetain & 0xff);                     //45
            byData[iIndex++] = 0x01;//byte)((commData.WRsetDischargeOverCurrentRetain >> 8) & 0xff);           //46
            byData[iIndex++] = 0x01;//byte)(commData.WRsetDischargeOverCurrentRetain & 0xff);                  //47
            byData[iIndex++] = 0x01;//byte)((commData.WRsetLowSOCRetain >> 8) & 0xff);                         //48
            byData[iIndex++] = 0x01;//byte)(commData.WRsetLowSOCRetain & 0xff);                                //49
            byData[iIndex++] = 0x01;//byte)((commData.WRsetLowSOHRetain >> 8) & 0xff);                         //50
            byData[iIndex++] = 0x01;//(byte)(commData.WRsetLowSOHRetain & 0xff);                                //51
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

        int MakeSendPacket_ProtectEnable_Status(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;          // 0
            byData[iIndex++] = HEAD_B;          // 1    
            byData[iIndex++] = 0;               // 2    
            byData[iIndex++] = 0;               // 3
            byData[iIndex++] = 0;               // 4
            byData[iIndex++] = 0x13;            // 5
            byData[iIndex++] = 0x03;            // 6
            byData[iIndex++] = 0x01; //(byte)commData.PCellOverVoltageEnable; //7                    
            byData[iIndex++] = 0x01; //(byte)commData.PCellUnderVoltageEnable; //8
            byData[iIndex++] = 0x01; //(byte)commData.PPackOverVoltageEnable; //9
            byData[iIndex++] = 0x01; //(byte)commData.PPackUnderVoltageEnable; //9
            byData[iIndex++] = 0x01; //(byte)commData.PCellVoltageDiffEnable; //10
            byData[iIndex++] = 0x01; //(byte)commData.PCellOverTempEnable; //11
            byData[iIndex++] = 0x01; //(byte)commData.PCellUnderTempEnable; //12
            byData[iIndex++] = 0x01; //(byte)commData.PChargingOverCurrentEnable; //13
            byData[iIndex++] = 0x01; //(byte)commData.PDisChargingOverCurrentEnable; //14
            byData[iIndex++] = 0x01; //(byte)commData.PSensingLineMeasureEnable; //15
            byData[iIndex++] = 0x01; //(byte)commData.PCommunicationErrorEnable; //16
            byData[iIndex++] = 0x01; //(byte)commData.PCurrentSensorErrorEnable; //17
            byData[iIndex++] = 0x01; //(byte)commData.PInterLockErrorEnable; //18
            byData[iIndex++] = 0x01; //(byte)commData.PSelfSystemDiagEnable; //19
            byData[iIndex++] = 0x01; //(byte)commData.PLowSOCEnable; //20
            byData[iIndex++] = 0x01; //(byte)commData.PLowSOHEnable; //21
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

        int MakeSendPacket_Protect_Status(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;          // 0
            byData[iIndex++] = HEAD_B;          // 1    
            byData[iIndex++] = 0;               // 2    
            byData[iIndex++] = 0;               // 3
            byData[iIndex++] = 0;               // 4
            byData[iIndex++] = 0x14;            // 5
            byData[iIndex++] = 0x03;            // 6
            byData[iIndex++] = 0x01; //byte)((commData.PsetCellOverVoltage >> 8) & 0xff);                      //7
            byData[iIndex++] = 0x01; //byte)(commData.PsetCellOverVoltage & 0xff);                             //8
            byData[iIndex++] = 0x01; //byte)((commData.PsetCellUnderVoltage >> 8) & 0xff);                     //9
            byData[iIndex++] = 0x01; //byte)(commData.PsetCellUnderVoltage & 0xff);                            //10
            byData[iIndex++] = 0x01; //byte)((commData.PsetPackOverVoltage >> 8) & 0xff);                      //11
            byData[iIndex++] = 0x01; //byte)(commData.PsetPackOverVoltage & 0xff);                             //12
            byData[iIndex++] = 0x01; //byte)((commData.PsetPackUnderVoltage >> 8) & 0xff);                     //13
            byData[iIndex++] = 0x01; //byte)(commData.PsetPackUnderVoltage & 0xff);                            //14
            byData[iIndex++] = 0x01; //byte)((commData.PsetCellVoltDiff >> 8) & 0xff);                         //15
            byData[iIndex++] = 0x01; //byte)(commData.PsetCellVoltDiff & 0xff);                                //16
            byData[iIndex++] = 0x01; //byte)((commData.PsetCellOverTemp >> 8) & 0xff);                         //17
            byData[iIndex++] = 0x01; //byte)(commData.PsetCellOverTemp & 0xff);                                //18
            byData[iIndex++] = 0x01; //byte)((commData.PsetCellUnderTemp >> 8) & 0xff);                        //19
            byData[iIndex++] = 0x01; //byte)(commData.PsetCellUnderTemp & 0xff);                               //20
            byData[iIndex++] = 0x01; //byte)((commData.PsetChargeOverCurrent >> 8) & 0xff);                    //21
            byData[iIndex++] = 0x01; //byte)(commData.PsetChargeOverCurrent & 0xff);                           //22
            byData[iIndex++] = 0x01; //byte)((commData.PsetDischargeOverCurrent >> 8) & 0xff);                 //23
            byData[iIndex++] = 0x01; //byte)(commData.PsetDischargeOverCurrent & 0xff);                        //24
            byData[iIndex++] = 0x01; //byte)commData.PsetSensingLineMeasure;                                   //25
            byData[iIndex++] = 0x01; //byte)commData.PsetCommunicationError;                                   //26
            byData[iIndex++] = 0x01; //byte)commData.PsetCurrentSensorError;                                   //27
            byData[iIndex++] = 0x01; //byte)commData.PsetInterLockError;                                       //28
            byData[iIndex++] = 0x01; //byte)commData.PsetSelfSystemDiag;                                       //29
            byData[iIndex++] = 0x03; //x00;                                                                    //30
            byData[iIndex++] = 0x01; //byte)((commData.PsetCellOverVoltageRetain >> 8) & 0xff);                //31
            byData[iIndex++] = 0x01; //byte)(commData.PsetCellOverVoltageRetain & 0xff);                       //32
            byData[iIndex++] = 0x01; //byte)((commData.PsetCellUnderVoltageRetain >> 8) & 0xff);               //33
            byData[iIndex++] = 0x01; //byte)(commData.PsetCellUnderVoltageRetain & 0xff);                      //34
            byData[iIndex++] = 0x01; //byte)((commData.PsetPackOverVoltageRetain >> 8) & 0xff);                //35
            byData[iIndex++] = 0x01; //byte)(commData.PsetPackOverVoltageRetain & 0xff);                       //36
            byData[iIndex++] = 0x01; //byte)((commData.PsetPackUnderVoltageRetain >> 8) & 0xff);               //37
            byData[iIndex++] = 0x01; //byte)(commData.PsetPackUnderVoltageRetain & 0xff);                      //38
            byData[iIndex++] = 0x01; //byte)((commData.PsetCellVoltDiffRetain >> 8) & 0xff);                   //39
            byData[iIndex++] = 0x01; //byte)(commData.PsetCellVoltDiffRetain & 0xff);                          //40
            byData[iIndex++] = 0x01; //byte)((commData.PsetCellOverTempRetain >> 8) & 0xff);                   //41
            byData[iIndex++] = 0x01; //byte)(commData.PsetCellOverTempRetain & 0xff);                          //42
            byData[iIndex++] = 0x01; //byte)((commData.PsetCellUnderTempRetain >> 8) & 0xff);                  //43
            byData[iIndex++] = 0x01; //byte)(commData.PsetCellUnderTempRetain & 0xff);                         //44
            byData[iIndex++] = 0x01; //byte)((commData.PsetChargeOverCurrentRetain >> 8) & 0xff);              //45
            byData[iIndex++] = 0x01; //byte)(commData.PsetChargeOverCurrentRetain & 0xff);                     //46
            byData[iIndex++] = 0x01; //byte)((commData.PsetDischargeOverCurrentRetain >> 8) & 0xff);           //47
            byData[iIndex++] = 0x01; //byte)(commData.PsetDischargeOverCurrentRetain & 0xff);                  //48
            byData[iIndex++] = 0x01; //byte)((commData.PsetLowSOCRetain >> 8) & 0xff);                         //49
            byData[iIndex++] = 0x01; //byte)(commData.PsetLowSOCRetain & 0xff);                                //50
            byData[iIndex++] = 0x01; //byte)((commData.PsetLowSOHRetain >> 8) & 0xff);                         //51
            byData[iIndex++] = 0x01; //byte)(commData.PsetLowSOHRetain & 0xff);                                //52
            byData[iIndex++] = 0x01; //byte)((commData.PsetSensingLineMeasureRetain >> 8) & 0xff);             //53
            byData[iIndex++] = 0x01; //byte)(commData.PsetSensingLineMeasureRetain & 0xff);                    //54
            byData[iIndex++] = 0x01; //byte)((commData.PsetCommunicationErrorRetain >> 8) & 0xff);             //55
            byData[iIndex++] = 0x01; //byte)(commData.PsetCommunicationErrorRetain & 0xff);                    //56
            byData[iIndex++] = 0x01; //byte)((commData.PsetCurrentSensorErrorRetain >> 8) & 0xff);             //57
            byData[iIndex++] = 0x01; //byte)(commData.PsetCurrentSensorErrorRetain & 0xff);                    //58
            byData[iIndex++] = 0x01; //byte)((commData.PsetInterLockErrorRetain >> 8) & 0xff);                 //59
            byData[iIndex++] = 0x01; //byte)(commData.PsetInterLockErrorRetain & 0xff);                        //60
            byData[iIndex++] = 0x01; //byte)((commData.PsetSelfSystemDiagRetain >> 8) & 0xff);                 //61
            byData[iIndex++] = 0x01; //(byte)(commData.PsetSelfSystemDiagRetain & 0xff);                       //62
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

        int MakeSendPacket_ProtectRelease_Status(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;          // 0
            byData[iIndex++] = HEAD_B;          // 1    
            byData[iIndex++] = 0;               // 2    
            byData[iIndex++] = 0;               // 3
            byData[iIndex++] = 0;               // 4
            byData[iIndex++] = 0x15;            // 5
            byData[iIndex++] = 0x03;            // 6
            byData[iIndex++] = 0x01; //(byte)((commData.PRsetCellOverVoltage >> 8) & 0xff);  //7
            byData[iIndex++] = 0x01; //(byte)(commData.PRsetCellOverVoltage & 0xff);                            //8
            byData[iIndex++] = 0x01; //(byte)((commData.PRsetCellUnderVoltage >> 8) & 0xff);                    //9
            byData[iIndex++] = 0x01; //(byte)(commData.PRsetCellUnderVoltage & 0xff);                           //10
            byData[iIndex++] = 0x01; //(byte)((commData.PRsetPackOverVoltage >> 8) & 0xff);                     //11
            byData[iIndex++] = 0x01; //(byte)(commData.PRsetPackOverVoltage & 0xff);                            //12
            byData[iIndex++] = 0x01; //(byte)((commData.PRsetPackUnderVoltage >> 8) & 0xff);                    //13
            byData[iIndex++] = 0x01; //(byte)(commData.PRsetPackUnderVoltage & 0xff);                           //14
            byData[iIndex++] = 0x01; //(byte)((commData.PRsetCellVoltDiff >> 8) & 0xff);                        //15
            byData[iIndex++] = 0x01; //(byte)(commData.PRsetCellVoltDiff & 0xff);                               //16
            byData[iIndex++] = 0x01; //(byte)((commData.PRsetCellOverTemp >> 8) & 0xff);                        //17
            byData[iIndex++] = 0x01; //(byte)(commData.PRsetCellOverTemp & 0xff);                               //18
            byData[iIndex++] = 0x01; //(byte)((commData.PRsetCellUnderTemp >> 8) & 0xff);                       //19
            byData[iIndex++] = 0x01; //(byte)(commData.PRsetCellUnderTemp & 0xff);                              //20
            byData[iIndex++] = 0x01; //(byte)((commData.PRsetChargeOverCurrent >> 8) & 0xff);                   //21
            byData[iIndex++] = 0x01; //(byte)(commData.PRsetChargeOverCurrent & 0xff);                          //22
            byData[iIndex++] = 0x01; //(byte)((commData.PRsetDischargeOverCurrent >> 8) & 0xff);                //23
            byData[iIndex++] = 0x01; //(byte)(commData.PRsetDischargeOverCurrent & 0xff);                       //24
            byData[iIndex++] = 0x01; //(byte)commData.PRsetSensingLineMeasure;                                  //25
            byData[iIndex++] = 0x01; //(byte)commData.PRsetCommunicationError;                                  //26
            byData[iIndex++] = 0x01; //(byte)commData.PRsetCurrentSensorError;                                  //27
            byData[iIndex++] = 0x01; //(byte)commData.PRsetInterLockError;                                      //28
            byData[iIndex++] = 0x01; //(byte)commData.PRsetSelfSystemDiag;                                      //29
            byData[iIndex++] = 0x03; //0x00;                                                                    //30
            byData[iIndex++] = 0x01; //(byte)((commData.PRsetCellOverVoltageRetain >> 8) & 0xff);               //31
            byData[iIndex++] = 0x01; //(byte)(commData.PRsetCellOverVoltageRetain & 0xff);                      //32
            byData[iIndex++] = 0x01; //(byte)((commData.PRsetCellUnderVoltageRetain >> 8) & 0xff);              //33
            byData[iIndex++] = 0x01; //(byte)(commData.PRsetCellUnderVoltageRetain & 0xff);                     //34
            byData[iIndex++] = 0x01; //(byte)((commData.PRsetPackOverVoltageRetain >> 8) & 0xff);               //35
            byData[iIndex++] = 0x01; //(byte)(commData.PRsetPackOverVoltageRetain & 0xff);                      //36
            byData[iIndex++] = 0x01; //(byte)((commData.PRsetPackUnderVoltageRetain >> 8) & 0xff);              //37
            byData[iIndex++] = 0x01; //(byte)(commData.PRsetPackUnderVoltageRetain & 0xff);                     //38
            byData[iIndex++] = 0x01; //(byte)((commData.PRsetCellVoltDiffRetain >> 8) & 0xff);                  //39
            byData[iIndex++] = 0x01; //(byte)(commData.PRsetCellVoltDiffRetain & 0xff);                         //40
            byData[iIndex++] = 0x01; //(byte)((commData.PRsetCellOverTempRetain >> 8) & 0xff);                  //41
            byData[iIndex++] = 0x01; //(byte)(commData.PRsetCellOverTempRetain & 0xff);                         //42
            byData[iIndex++] = 0x01; //(byte)((commData.PRsetCellUnderTempRetain >> 8) & 0xff);                 //43
            byData[iIndex++] = 0x01; //(byte)(commData.PRsetCellUnderTempRetain & 0xff);                        //44
            byData[iIndex++] = 0x01; //(byte)((commData.PRsetChargeOverCurrentRetain >> 8) & 0xff);             //45
            byData[iIndex++] = 0x01; //(byte)(commData.PRsetChargeOverCurrentRetain & 0xff);                    //46
            byData[iIndex++] = 0x01; //(byte)((commData.PRsetDischargeOverCurrentRetain >> 8) & 0xff);          //47
            byData[iIndex++] = 0x01; //(byte)(commData.PRsetDischargeOverCurrentRetain & 0xff);                 //48
            byData[iIndex++] = 0x01; //(byte)((commData.PRsetLowSOCRetain >> 8) & 0xff);                        //49
            byData[iIndex++] = 0x01; //(byte)(commData.PRsetLowSOCRetain & 0xff);                               //50
            byData[iIndex++] = 0x01; //(byte)((commData.PRsetLowSOHRetain >> 8) & 0xff);                        //51
            byData[iIndex++] = 0x01; //(byte)(commData.PRsetLowSOHRetain & 0xff);                               //52
            byData[iIndex++] = 0x01; //(byte)((commData.PsetSensingLineMeasureRetain >> 8) & 0xff);             //53
            byData[iIndex++] = 0x01; //(byte)(commData.PsetSensingLineMeasureRetain & 0xff);                    //54
            byData[iIndex++] = 0x01; //(byte)((commData.PsetCommunicationErrorRetain >> 8) & 0xff);             //55
            byData[iIndex++] = 0x01; //(byte)(commData.PsetCommunicationErrorRetain & 0xff);                    //56
            byData[iIndex++] = 0x01; //(byte)((commData.PsetCurrentSensorErrorRetain >> 8) & 0xff);             //57
            byData[iIndex++] = 0x01; //(byte)(commData.PsetCurrentSensorErrorRetain & 0xff);                    //58
            byData[iIndex++] = 0x01; //(byte)((commData.PsetInterLockErrorRetain >> 8) & 0xff);                 //59
            byData[iIndex++] = 0x01; //(byte)(commData.PsetInterLockErrorRetain & 0xff);                        //60
            byData[iIndex++] = 0x01; //(byte)((commData.PsetSelfSystemDiagRetain >> 8) & 0xff);                 //61
            byData[iIndex++] = 0x01; //(byte)(commData.PsetSelfSystemDiagRetain & 0xff);                        //62
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

        int MakeSendPacket_Mornitoring_Status(ref byte[] byData)
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
            byData[iIndex++] = 0x02;        // 7 MaxTEMP
            byData[iIndex++] = 0x02;        // 6 MinTEMP
            byData[iIndex++] = 0x02;        // 6 MAX_CELL1
            byData[iIndex++] = 0x02;        // 6 MAX_CELL 2
            byData[iIndex++] = 0x02;        // 6 MIN CELL 1
            byData[iIndex++] = 0x02;        // 6 MIN_CELL 2
            byData[iIndex++] = 0x02;        // 6 Pack Vol 1
            byData[iIndex++] = 0x02;        // 6 Pack Vol 2
            byData[iIndex++] = 0x02;        // 6 soc
            byData[iIndex++] = 0x02;        // 6 soc
            byData[iIndex++] = 0x02;        // 6 soh
            byData[iIndex++] = 0x02;        // 6 soh
            byData[iIndex++] = 0x02;        // 6 Real Current1
            byData[iIndex++] = 0x02;        // 6 Real Current2
            byData[iIndex++] = 0x02;        // 6 ccc 1
            byData[iIndex++] = 0x02;        // 6 ccc 2
            byData[iIndex++] = 0x02;        // 6 ccc 3
            byData[iIndex++] = 0x02;        // 6 ccc 4
            byData[iIndex++] = 0x02;        // 6 cdc 1
            byData[iIndex++] = 0x02;        // 6 cdc 2
            byData[iIndex++] = 0x02;        // 6 cdc 3
            byData[iIndex++] = 0x02;        // 6 cdc 4
            byData[iIndex++] = 0x02;        // 6 cmu 1 v 1-1
            byData[iIndex++] = 0x02;        // 6 cmu 1 v 1-2
            byData[iIndex++] = 0x02;        // 6 cmu 1 v 2-1
            byData[iIndex++] = 0x02;        // 6 cmu 1 v 2-2
            byData[iIndex++] = 0x02;        // 6 cmu 1 v 3-1
            byData[iIndex++] = 0x02;        // 6 cmu 1 v 3-2
            byData[iIndex++] = 0x02;        // 6 cmu 1 v 4-1
            byData[iIndex++] = 0x02;        // 6 cmu 1 v 4-2
            byData[iIndex++] = 0x02;        // 6 cmu 1 v 5-1
            byData[iIndex++] = 0x02;        // 6 cmu 1 v 5-2
            byData[iIndex++] = 0x02;        // 6 cmu 1 v 6-1
            byData[iIndex++] = 0x02;        // 6 cmu 1 v 6-2
            byData[iIndex++] = 0x02;        // 6 cmu 1 v 7-1
            byData[iIndex++] = 0x02;        // 6 cmu 1 v 7-2
            byData[iIndex++] = 0x02;        // 6 cmu 1 v 8-1
            byData[iIndex++] = 0x02;        // 6 cmu 1 v 8-2
            byData[iIndex++] = 0x02;        // 6 cmu 1 v 9-1
            byData[iIndex++] = 0x02;        // 6 cmu 1 v 9-2
            byData[iIndex++] = 0x02;        // 6 cmu 1 v 10-1
            byData[iIndex++] = 0x02;        // 6 cmu 1 v 10-2
            byData[iIndex++] = 0x02;        // 6 cmu 2 v 1-1 
            byData[iIndex++] = 0x02;        // 6 cmu 2 v 1-2 
            byData[iIndex++] = 0x02;        // 6 cmu 2 v 2-1 
            byData[iIndex++] = 0x02;        // 6 cmu 2 v 2-2 
            byData[iIndex++] = 0x02;        // 6 cmu 2 v 3-1 
            byData[iIndex++] = 0x02;        // 6 cmu 2 v 3-2 
            byData[iIndex++] = 0x02;        // 6 cmu 2 v 4-1 
            byData[iIndex++] = 0x02;        // 6 cmu 2 v 4-2 
            byData[iIndex++] = 0x02;        // 6 cmu 2 v 5-1 
            byData[iIndex++] = 0x02;        // 6 cmu 2 v 5-2 
            byData[iIndex++] = 0x02;        // 6 cmu 2 v 6-1 
            byData[iIndex++] = 0x02;        // 6 cmu 2 v 6-2 
            byData[iIndex++] = 0x02;        // 6 cmu 2 v 7-1
            byData[iIndex++] = 0x02;        // 6 cmu 2 v 7-2
            byData[iIndex++] = 0x02;        // 6 cmu 2 v 8-1
            byData[iIndex++] = 0x02;        // 6 cmu 2 v 8-2
            byData[iIndex++] = 0x02;        // 6 cmu 2 v 9-1
            byData[iIndex++] = 0x02;        // 6 cmu 2 v 9-2
            byData[iIndex++] = 0x02;        // 6 cmu 2 v 10-1
            byData[iIndex++] = 0x02;        // 6 cmu 2 v 10-2
            byData[iIndex++] = 0x02;        // 6 cmu 3 v 1-1 
            byData[iIndex++] = 0x02;        // 6 cmu 3 v 1-2 
            byData[iIndex++] = 0x02;        // 6 cmu 3 v 2-1 
            byData[iIndex++] = 0x02;        // 6 cmu 3 v 2-2 
            byData[iIndex++] = 0x02;        // 6 cmu 3 v 3-1 
            byData[iIndex++] = 0x02;        // 6 cmu 3 v 3-2 
            byData[iIndex++] = 0x02;        // 6 cmu 3 v 4-1 
            byData[iIndex++] = 0x02;        // 6 cmu 3 v 4-2 
            byData[iIndex++] = 0x02;        // 6 cmu 3 v 5-1 
            byData[iIndex++] = 0x02;        // 6 cmu 3 v 5-2 
            byData[iIndex++] = 0x02;        // 6 cmu 3 v 6-1 
            byData[iIndex++] = 0x02;        // 6 cmu 3 v 6-2 
            byData[iIndex++] = 0x02;        // 6 cmu 3 v 7-1
            byData[iIndex++] = 0x02;        // 6 cmu 3 v 7-2
            byData[iIndex++] = 0x02;        // 6 cmu 3 v 8-1
            byData[iIndex++] = 0x02;        // 6 cmu 3 v 8-2
            byData[iIndex++] = 0x02;        // 6 cmu 3 v 9-1
            byData[iIndex++] = 0x02;        // 6 cmu 3 v 9-2
            byData[iIndex++] = 0x02;        // 6 cmu 4 v 1-1
            byData[iIndex++] = 0x02;        // 6 cmu 4 v 1-2
            byData[iIndex++] = 0x02;        // 6 cmu 4 v 2-1
            byData[iIndex++] = 0x02;        // 6 cmu 4 v 2-2
            byData[iIndex++] = 0x02;        // 6 cmu 4 v 3-1
            byData[iIndex++] = 0x02;        // 6 cmu 4 v 3-2
            byData[iIndex++] = 0x02;        // 6 cmu 4 v 4-1
            byData[iIndex++] = 0x02;        // 6 cmu 4 v 4-2
            byData[iIndex++] = 0x02;        // 6 cmu 4 v 5-1
            byData[iIndex++] = 0x02;        // 6 cmu 4 v 5-2
            byData[iIndex++] = 0x02;        // 6 cmu 4 v 6-1
            byData[iIndex++] = 0x02;        // 6 cmu 4 v 6-2
            byData[iIndex++] = 0x02;        // 6 cmu 4 v 7-1
            byData[iIndex++] = 0x02;        // 6 cmu 4 v 7-2
            byData[iIndex++] = 0x02;        // 6 cmu 4 v 8-1
            byData[iIndex++] = 0x02;        // 6 cmu 4 v 8-2
            byData[iIndex++] = 0x02;        // 6 cmu 4 v 9-1
            byData[iIndex++] = 0x02;        // 6 cmu 4 v 9-2
            byData[iIndex++] = 0x02;        // 6 cmu 4 v 10-1
            byData[iIndex++] = 0x02;        // 6 cmu 4 v 10-2
            byData[iIndex++] = 0x02;        // 6 cmu 5 v 1-1
            byData[iIndex++] = 0x02;        // 6 cmu 5 v 1-2
            byData[iIndex++] = 0x02;        // 6 cmu 5 v 2-1
            byData[iIndex++] = 0x02;        // 6 cmu 5 v 2-2
            byData[iIndex++] = 0x02;        // 6 cmu 5 v 3-1
            byData[iIndex++] = 0x02;        // 6 cmu 5 v 3-2
            byData[iIndex++] = 0x02;        // 6 cmu 5 v 4-1
            byData[iIndex++] = 0x02;        // 6 cmu 5 v 4-2
            byData[iIndex++] = 0x02;        // 6 cmu 5 v 5-1
            byData[iIndex++] = 0x02;        // 6 cmu 5 v 5-2
            byData[iIndex++] = 0x02;        // 6 cmu 5 v 6-1
            byData[iIndex++] = 0x02;        // 6 cmu 5 v 6-2
            byData[iIndex++] = 0x02;        // 6 cmu 5 v 7-1
            byData[iIndex++] = 0x02;        // 6 cmu 5 v 7-2
            byData[iIndex++] = 0x02;        // 6 cmu 5 v 8-1
            byData[iIndex++] = 0x02;        // 6 cmu 5 v 8-2
            byData[iIndex++] = 0x02;        // 6 cmu 5 v 9-1
            byData[iIndex++] = 0x02;        // 6 cmu 5 v 9-2
            byData[iIndex++] = 0x02;        // 6 cmu 5 v 10-1
            byData[iIndex++] = 0x02;        // 6 cmu 5 v 10-2
            byData[iIndex++] = 0x02;        // 6 cmu 6 v 1-1
            byData[iIndex++] = 0x02;        // 6 cmu 6 v 1-2
            byData[iIndex++] = 0x02;        // 6 cmu 6 v 2-1
            byData[iIndex++] = 0x02;        // 6 cmu 6 v 2-2
            byData[iIndex++] = 0x02;        // 6 cmu 6 v 3-1
            byData[iIndex++] = 0x02;        // 6 cmu 6 v 3-2
            byData[iIndex++] = 0x02;        // 6 cmu 6 v 4-1
            byData[iIndex++] = 0x02;        // 6 cmu 6 v 4-2
            byData[iIndex++] = 0x02;        // 6 cmu 6 v 5-1
            byData[iIndex++] = 0x02;        // 6 cmu 6 v 5-2
            byData[iIndex++] = 0x02;        // 6 cmu 6 v 6-1
            byData[iIndex++] = 0x02;        // 6 cmu 6 v 6-2
            byData[iIndex++] = 0x02;        // 6 cmu 6 v 7-1
            byData[iIndex++] = 0x02;        // 6 cmu 6 v 7-2
            byData[iIndex++] = 0x02;        // 6 cmu 6 v 8-1
            byData[iIndex++] = 0x02;        // 6 cmu 6 v 8-2
            byData[iIndex++] = 0x02;        // 6 cmu 6 v 9-1
            byData[iIndex++] = 0x02;        // 6 cmu 6 v 9-2
            byData[iIndex++] = 0x02;        // 6 cmu 7 v 1-1
            byData[iIndex++] = 0x02;        // 6 cmu 7 v 1-2
            byData[iIndex++] = 0x02;        // 6 cmu 7 v 2-1
            byData[iIndex++] = 0x02;        // 6 cmu 7 v 2-2
            byData[iIndex++] = 0x02;        // 6 cmu 7 v 3-1
            byData[iIndex++] = 0x02;        // 6 cmu 7 v 3-2
            byData[iIndex++] = 0x02;        // 6 cmu 7 v 4-1
            byData[iIndex++] = 0x02;        // 6 cmu 7 v 4-2
            byData[iIndex++] = 0x02;        // 6 cmu 7 v 5-1
            byData[iIndex++] = 0x02;        // 6 cmu 7 v 5-2
            byData[iIndex++] = 0x02;        // 6 cmu 7 v 6-1
            byData[iIndex++] = 0x02;        // 6 cmu 7 v 6-2
            byData[iIndex++] = 0x02;        // 6 cmu 7 v 7-1
            byData[iIndex++] = 0x02;        // 6 cmu 7 v 7-2
            byData[iIndex++] = 0x02;        // 6 cmu 7 v 8-1
            byData[iIndex++] = 0x02;        // 6 cmu 7 v 8-2
            byData[iIndex++] = 0x02;        // 6 cmu 7 v 9-1
            byData[iIndex++] = 0x02;        // 6 cmu 7 v 9-2
            byData[iIndex++] = 0x02;        // 6 cmu 7 v 10-1
            byData[iIndex++] = 0x02;        // 6 cmu 7 v 10-2
            byData[iIndex++] = 0x02;        // 6 cmu 8 v 1-1
            byData[iIndex++] = 0x02;        // 6 cmu 8 v 1-2
            byData[iIndex++] = 0x02;        // 6 cmu 8 v 2-1
            byData[iIndex++] = 0x02;        // 6 cmu 8 v 2-2
            byData[iIndex++] = 0x02;        // 6 cmu 8 v 3-1
            byData[iIndex++] = 0x02;        // 6 cmu 8 v 3-2
            byData[iIndex++] = 0x02;        // 6 cmu 8 v 4-1
            byData[iIndex++] = 0x02;        // 6 cmu 8 v 4-2
            byData[iIndex++] = 0x02;        // 6 cmu 8 v 5-1
            byData[iIndex++] = 0x02;        // 6 cmu 8 v 5-2
            byData[iIndex++] = 0x02;        // 6 cmu 8 v 6-1
            byData[iIndex++] = 0x02;        // 6 cmu 8 v 6-2
            byData[iIndex++] = 0x02;        // 6 cmu 8 v 7-1
            byData[iIndex++] = 0x02;        // 6 cmu 8 v 7-2
            byData[iIndex++] = 0x02;        // 6 cmu 8 v 8-1
            byData[iIndex++] = 0x02;        // 6 cmu 8 v 8-2
            byData[iIndex++] = 0x02;        // 6 cmu 8 v 9-1
            byData[iIndex++] = 0x02;        // 6 cmu 8 v 9-2
            byData[iIndex++] = 0x02;        // 6 cmu 8 v 10-1
            byData[iIndex++] = 0x02;        // 6 cmu 8 v 10-2
            byData[iIndex++] = 0x02;        // 6 cmu 9 v 1-1
            byData[iIndex++] = 0x02;        // 6 cmu 9 v 1-2
            byData[iIndex++] = 0x02;        // 6 cmu 9 v 2-1
            byData[iIndex++] = 0x02;        // 6 cmu 9 v 2-2
            byData[iIndex++] = 0x02;        // 6 cmu 9 v 3-1
            byData[iIndex++] = 0x02;        // 6 cmu 9 v 3-2
            byData[iIndex++] = 0x02;        // 6 cmu 9 v 4-1
            byData[iIndex++] = 0x02;        // 6 cmu 9 v 4-2
            byData[iIndex++] = 0x02;        // 6 cmu 9 v 5-1
            byData[iIndex++] = 0x02;        // 6 cmu 9 v 5-2
            byData[iIndex++] = 0x02;        // 6 cmu 9 v 6-1
            byData[iIndex++] = 0x02;        // 6 cmu 9 v 6-2
            byData[iIndex++] = 0x02;        // 6 cmu 9 v 7-1
            byData[iIndex++] = 0x02;        // 6 cmu 9 v 7-2
            byData[iIndex++] = 0x02;        // 6 cmu 9 v 8-1
            byData[iIndex++] = 0x02;        // 6 cmu 9 v 8-2
            byData[iIndex++] = 0x02;        // 6 cmu 9 v 9-1
            byData[iIndex++] = 0x02;        // 6 cmu 9 v 9-2
            byData[iIndex++] = 0x02;        // 6 cmu 9 v 10-1
            byData[iIndex++] = 0x02;        // 6 cmu 9 v 10-2
            byData[iIndex++] = 0x02;        // 6 cmu 10 v 1-1
            byData[iIndex++] = 0x02;        // 6 cmu 10 v 1-2
            byData[iIndex++] = 0x02;        // 6 cmu 10 v 2-1
            byData[iIndex++] = 0x02;        // 6 cmu 10 v 2-2
            byData[iIndex++] = 0x02;        // 6 cmu 10 v 3-1
            byData[iIndex++] = 0x02;        // 6 cmu 10 v 3-2
            byData[iIndex++] = 0x02;        // 6 cmu 10 v 4-1
            byData[iIndex++] = 0x02;        // 6 cmu 10 v 4-2
            byData[iIndex++] = 0x02;        // 6 cmu 10 v 5-1
            byData[iIndex++] = 0x02;        // 6 cmu 10 v 5-2
            byData[iIndex++] = 0x02;        // 6 cmu 10 v 6-1
            byData[iIndex++] = 0x02;        // 6 cmu 10 v 6-2
            byData[iIndex++] = 0x02;        // 6 cmu 10 v 7-1
            byData[iIndex++] = 0x02;        // 6 cmu 10 v 7-2
            byData[iIndex++] = 0x02;        // 6 cmu 10 v 8-1
            byData[iIndex++] = 0x02;        // 6 cmu 10 v 8-2
            byData[iIndex++] = 0x02;        // 6 cmu 10 v 9-1
            byData[iIndex++] = 0x02;        // 6 cmu 10 v 9-2
            byData[iIndex++] = 0x02;        // 6 cmu 10 v 10-1
            byData[iIndex++] = 0x02;        // 6 cmu 10 v 10-2
            byData[iIndex++] = 0x02;        // 6 cmu 1 t 1
            byData[iIndex++] = 0x02;        // 6 cmu 1 t 1
            byData[iIndex++] = 0x02;        // 6 cmu 1 t 2
            byData[iIndex++] = 0x02;        // 6 cmu 1 t 2
            byData[iIndex++] = 0x02;        // 6 cmu 1 t 3
            byData[iIndex++] = 0x02;        // 6 cmu 1 t 3
            byData[iIndex++] = 0x02;        // 6 cmu 1 t 4
            byData[iIndex++] = 0x02;        // 6 cmu 1 t 4
            byData[iIndex++] = 0x02;        // 6 cmu 2 t 1
            byData[iIndex++] = 0x02;        // 6 cmu 2 t 1
            byData[iIndex++] = 0x02;        // 6 cmu 2 t 2
            byData[iIndex++] = 0x02;        // 6 cmu 2 t 2
            byData[iIndex++] = 0x02;        // 6 cmu 2 t 3
            byData[iIndex++] = 0x02;        // 6 cmu 2 t 3
            byData[iIndex++] = 0x02;        // 6 cmu 2 t 4
            byData[iIndex++] = 0x02;        // 6 cmu 2 t 4
            byData[iIndex++] = 0x02;        // 6 cmu 3 t 1
            byData[iIndex++] = 0x02;        // 6 cmu 3 t 1
            byData[iIndex++] = 0x02;        // 6 cmu 3 t 2
            byData[iIndex++] = 0x02;        // 6 cmu 3 t 2
            byData[iIndex++] = 0x02;        // 6 cmu 3 t 3
            byData[iIndex++] = 0x02;        // 6 cmu 3 t 3
            byData[iIndex++] = 0x02;        // 6 cmu 3 t 4
            byData[iIndex++] = 0x02;        // 6 cmu 3 t 4
            byData[iIndex++] = 0x02;        // 6 cmu 4 t 1
            byData[iIndex++] = 0x02;        // 6 cmu 4 t 1
            byData[iIndex++] = 0x02;        // 6 cmu 4 t 2
            byData[iIndex++] = 0x02;        // 6 cmu 4 t 2
            byData[iIndex++] = 0x02;        // 6 cmu 4 t 3
            byData[iIndex++] = 0x02;        // 6 cmu 4 t 3
            byData[iIndex++] = 0x02;        // 6 cmu 4 t 4
            byData[iIndex++] = 0x02;        // 6 cmu 4 t 4
            byData[iIndex++] = 0x02;        // 6 cmu 5 t 1
            byData[iIndex++] = 0x02;        // 6 cmu 5 t 1
            byData[iIndex++] = 0x02;        // 6 cmu 5 t 2
            byData[iIndex++] = 0x02;        // 6 cmu 5 t 2
            byData[iIndex++] = 0x02;        // 6 cmu 5 t 3
            byData[iIndex++] = 0x02;        // 6 cmu 5 t 3
            byData[iIndex++] = 0x02;        // 6 cmu 5 t 4
            byData[iIndex++] = 0x02;        // 6 cmu 5 t 4
            byData[iIndex++] = 0x02;        // 6 cmu 6 t 1
            byData[iIndex++] = 0x02;        // 6 cmu 6 t 1
            byData[iIndex++] = 0x02;        // 6 cmu 6 t 2
            byData[iIndex++] = 0x02;        // 6 cmu 6 t 2
            byData[iIndex++] = 0x02;        // 6 cmu 6 t 3
            byData[iIndex++] = 0x02;        // 6 cmu 6 t 3
            byData[iIndex++] = 0x02;        // 6 cmu 6 t 4
            byData[iIndex++] = 0x02;        // 6 cmu 6 t 4
            byData[iIndex++] = 0x02;        // 6 cmu 7 t 1
            byData[iIndex++] = 0x02;        // 6 cmu 7 t 1
            byData[iIndex++] = 0x02;        // 6 cmu 7 t 2
            byData[iIndex++] = 0x02;        // 6 cmu 7 t 2
            byData[iIndex++] = 0x02;        // 6 cmu 7 t 3
            byData[iIndex++] = 0x02;        // 6 cmu 7 t 3
            byData[iIndex++] = 0x02;        // 6 cmu 7 t 4
            byData[iIndex++] = 0x02;        // 6 cmu 7 t 4
            byData[iIndex++] = 0x02;        // 6 cmu 8 t 1
            byData[iIndex++] = 0x02;        // 6 cmu 8 t 1
            byData[iIndex++] = 0x02;        // 6 cmu 8 t 2
            byData[iIndex++] = 0x02;        // 6 cmu 8 t 2
            byData[iIndex++] = 0x02;        // 6 cmu 8 t 3
            byData[iIndex++] = 0x02;        // 6 cmu 8 t 3
            byData[iIndex++] = 0x02;        // 6 cmu 8 t 4
            byData[iIndex++] = 0x02;        // 6 cmu 8 t 4
            byData[iIndex++] = 0x02;        // 6 cmu 9 t 1
            byData[iIndex++] = 0x02;        // 6 cmu 9 t 1
            byData[iIndex++] = 0x02;        // 6 cmu 9 t 2
            byData[iIndex++] = 0x02;        // 6 cmu 9 t 2
            byData[iIndex++] = 0x02;        // 6 cmu 9 t 3
            byData[iIndex++] = 0x02;        // 6 cmu 9 t 3
            byData[iIndex++] = 0x02;        // 6 cmu 9 t 4
            byData[iIndex++] = 0x02;        // 6 cmu 9 t 4
            byData[iIndex++] = 0x02;        // 6 cmu 10 t 1
            byData[iIndex++] = 0x02;        // 6 cmu 10 t 1
            byData[iIndex++] = 0x02;        // 6 cmu 10 t 2
            byData[iIndex++] = 0x02;        // 6 cmu 10 t 2
            byData[iIndex++] = 0x02;        // 6 cmu 10 t 3
            byData[iIndex++] = 0x02;        // 6 cmu 10 t 3
            byData[iIndex++] = 0x02;        // 6 cmu 10 t 4
            byData[iIndex++] = 0x02;        // 6 cmu 10 t 4
            byData[iIndex++] = 0x00;        //WCell_OverVoltage.status
            byData[iIndex++] = 0x00;        //WCell_UnderVoltage.status
            byData[iIndex++] = 0x00;        //WCharging_OverTemp.status
            byData[iIndex++] = 0x00;        //WCharging_UnderTemp.status
            byData[iIndex++] = 0x00;        //WCharging_OverCurrent.status
            byData[iIndex++] = 0x00;        //WDisCharging_OverCurrent.status
            byData[iIndex++] = 0x00;        //WCell_DiffVoltage.status
            byData[iIndex++] = 0x00;        //WSensing_line_measure.status
            byData[iIndex++] = 0x00;        //Relay_status
            byData[iIndex++] = 0x00;        //PCell_OverVoltage.status
            byData[iIndex++] = 0x00;        //PCell_UnderVoltage.status
            byData[iIndex++] = 0x00;        //PCharging_OverTemp.status
            byData[iIndex++] = 0x00;        //PCharging_UnderTemp.status
            byData[iIndex++] = 0x00;        //PCharging_OverCurrent.status
            byData[iIndex++] = 0x00;        //PDisCharging_OverCurrent.status
            byData[iIndex++] = 0x00;        //PCell_DiffVoltage.status
            byData[iIndex++] = 0x00;        //PSensing_line_measure.status
            byData[iIndex++] = 0x00;        //sensing_line_Err
            byData[iIndex++] = 0x00;        //OCV_State
            byData[iIndex++] = 0x00;        //CCV_State
            byData[iIndex++] = 0x02;        //max17841b[0].CellBalancing.상위 Byte
            byData[iIndex++] = 0x02;        //max17841b[0].CellBalancing.하위 Byte
            byData[iIndex++] = 0x02;        //max17841b[1].CellBalancing.상위 Byte
            byData[iIndex++] = 0x02;        //max17841b[1].CellBalancing.하위 Byte
            byData[iIndex++] = 0x02;        //max17841b[2].CellBalancing.상위 Byte
            byData[iIndex++] = 0x02;        //max17841b[2].CellBalancing.하위 Byte
            byData[iIndex++] = 0x02;        //max17841b[3].CellBalancing.상위 Byte
            byData[iIndex++] = 0x02;        //max17841b[3].CellBalancing.하위 Byte
            byData[iIndex++] = 0x02;        //max17841b[4].CellBalancing.상위 Byte
            byData[iIndex++] = 0x02;        //max17841b[4].CellBalancing.하위 Byte
            byData[iIndex++] = 0x02;        //max17841b[5].CellBalancing.상위 Byte
            byData[iIndex++] = 0x02;        //max17841b[5].CellBalancing.하위 Byte
            byData[iIndex++] = 0x02;        //max17841b[6].CellBalancing.상위 Byte
            byData[iIndex++] = 0x02;        //max17841b[6].CellBalancing.하위 Byte
            byData[iIndex++] = 0x02;        //max17841b[7].CellBalancing.상위 Byte
            byData[iIndex++] = 0x02;        //max17841b[7].CellBalancing.하위 Byte
            byData[iIndex++] = 0x02;        //max17841b[8].CellBalancing.상위 Byte
            byData[iIndex++] = 0x02;        //max17841b[8].CellBalancing.하위 Byte
            byData[iIndex++] = 0x02;        //max17841b[9].CellBalancing.상위 Byte
            byData[iIndex++] = 0x02;        //max17841b[9].CellBalancing.하위 Byte
            byData[iIndex++] = 0x02;        //max17841b[10].CellBalancing.상위 Byte
            byData[iIndex++] = 0x02;        //max17841b[10].CellBalancing.하위 Byte
            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;     // 6
            return iIndex;
        }


        int MakeSendPacket_Factory_Status(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;      // 0
            byData[iIndex++] = HEAD_B;      // 1
            byData[iIndex++] = 0;           // 2
            byData[iIndex++] = 0;           // 3
            byData[iIndex++] = 0;           // 4
            byData[iIndex++] = 0x01;        // 5
            byData[iIndex++] = 0x03;        // 6
            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc;     // 6
            return iIndex;
        }

        int MakeSendPacket_SOC_Status(ref byte[] byData)
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
            byData[iIndex++] = 0x8f;        // 7
            byData[iIndex++] = 0xff;               // 8
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

        int MakeSendPacket_SOH_Status(ref byte[] byData)
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
            byData[iIndex++] = 0x0f;        // 7
            byData[iIndex++] = 0xff;         // 8
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

        int MakeSendPacket_RelayON_Status(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;  // 0
            byData[iIndex++] = HEAD_B;  // 1
            byData[iIndex++] = 0;       // 2
            byData[iIndex++] = 0;       // 3
            byData[iIndex++] = 0;       // 4
            byData[iIndex++] = 0x02;    // 5
            byData[iIndex++] = 0x03;    // 6
            byData[iIndex++] = 0x01;    // 7
            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc; // 7
            return iIndex;
        }

        int MakeSendPacket_RelayOFF_Status(ref byte[] byData)
        {
            int iIndex = 0;
            Array.Clear(byData, 0, byData.Length); // 전송데이터버퍼 초기화
            byData[iIndex++] = HEAD_A;      // 0
            byData[iIndex++] = HEAD_B;      // 1
            byData[iIndex++] = 0;           // 2
            byData[iIndex++] = 0;           // 3
            byData[iIndex++] = 0;           // 4
            byData[iIndex++] = 0x02;        // 5
            byData[iIndex++] = 0x03;        // 6
            byData[iIndex++] = 0x02;        // 6
            byData[2] = (byte)(((iIndex - 4) >> 8) & 0x00FF);
            byData[3] = (byte)((iIndex - 4) & 0x00FF);
            byte crc = clsCm.ComputeCRC8(ref byData, iIndex);
            byData[iIndex++] = crc; // 7
            return iIndex;
        }
    }
}


