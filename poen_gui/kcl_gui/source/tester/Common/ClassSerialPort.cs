using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.IO.Ports;
using System.Collections;


namespace KCL_reBMS_Prj
{ 
    public class ClassSerialPort
    {

        // constant
        const int RX_BUFF_SIZE = 4096;
        const int RX_PACK_BUFF_SIZE = 4096;


        // variable
        public SerialPort serialPort;
        Queue queRx;
        byte[] byRxPackBuff;
        public string strErrMsg;
        Object objLockQueRx = new Object();


        /// <summary>
        /// </summary>
        public ClassSerialPort()
        {
            serialPort = new SerialPort();
            queRx = new Queue();
            byRxPackBuff = new byte[RX_PACK_BUFF_SIZE];
        }

        /// <summary>시리얼 포트를 연다.
        /// </summary>
        /// <param name="iPortNo">포트번호</param>
        /// <param name="iBaudRate">전송속도</param>
        /// <param name="iDataBits">Data bit</param>
        /// <param name="parity"></param>
        /// <param name="bRxEvent"></param>
        /// <returns></returns>
        public bool Open(int iPortNo, int iBaudRate, int iDataBits, Parity parity, bool bRxEvent)
        {
            string strPort;

            strPort = string.Format("com{0}", iPortNo);
            serialPort.PortName = strPort;
            serialPort.BaudRate = iBaudRate;
            serialPort.DataBits = iDataBits;
            serialPort.Parity = parity;
            serialPort.DtrEnable = false;
            serialPort.RtsEnable = false;

            try
            {
                serialPort.Open();
                serialPort.DiscardInBuffer();   // 입력버퍼 삭제
                serialPort.DiscardOutBuffer();  // 출력버퍼 삭제

                if( bRxEvent)
                    serialPort.DataReceived += new SerialDataReceivedEventHandler(serialPort_DataReceived);

                return true;
            }
            catch( Exception ex)
            {
                strErrMsg = ex.Message;
                return false;
            }
        }

        /// <summary>에러 메시지를 가져온다.
        /// </summary>
        /// <returns></returns>
        public string GetErrMsg()
        {
            return strErrMsg;
        }

        /// <summary>시리얼 포트로 데이타 수신
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        void serialPort_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            if (e.EventType == SerialData.Chars)
            {
                ReadToRxQueue();
            }
        }

        /// <summary>시리얼포트를 닫는다.
        /// </summary>
        public void Close()
        {
            serialPort.Close();
        }

        /// <summary>시리얼포트로 데이타를 전송한다.
        /// </summary>
        /// <param name="bBuff"></param>
        /// <param name="iDataLen"></param>
        /// <returns></returns>
        public bool Write(byte[] bBuff, int iDataLen)
        {
            try
            {
                serialPort.Write(bBuff, 0, iDataLen);
                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>시리얼포트로부터 데이타를 읽어온다. [Non Blocking]
        /// </summary>
        /// <param name="bBuff"></param>
        /// <param name="iBuffSize"></param>
        /// <returns></returns>
        public int Read(byte[] bBuff, int iBuffSize)
        {
            int iToRead, iRead;

            try
            {
                if (serialPort.BytesToRead <= 0)    // 시스템수신버퍼에 자료가 없으면
                    return 0;

                if (iBuffSize < serialPort.BytesToRead)
                    iToRead = iBuffSize;
                else
                    iToRead = serialPort.BytesToRead;

                iRead = serialPort.Read(bBuff, 0, iToRead);
                return iRead;
            }
            catch
            {
                return 0;
            }
        }
        
        /// <summary>시리얼포트에서 읽어서 RX큐에 저장한다. [Non Blocking]
        /// </summary>
        /// <returns></returns>
        public int ReadToRxQueue()
        {
            int iRead;
            byte[] byBuff = new byte[RX_PACK_BUFF_SIZE];

            iRead = Read(byBuff, byBuff.Length);

            lock (objLockQueRx)
            {
                for (int i = 0; i < iRead; i++)
                {
                    queRx.Enqueue(byBuff[i]);
                }
            }

            return iRead;
        }

        /// <summary>RX큐에서 한바이트를 빼낸다.
        /// </summary>
        /// <param name="byRx"></param>
        /// <returns></returns>
        public bool GetRxQueueByte(out byte byRx)
        {
            lock (objLockQueRx)
            {
                if (queRx.Count > 0)
                {
                    byRx = (byte)queRx.Dequeue();
                    return true;
                }
                else
                {
                    byRx = 0;
                    return false;
                }
            }
        }

        /// <summary>RX큐에 쌓인 자료수를 구한다.
        /// </summary>
        /// <returns></returns>
        public int GetRxQueueCount()
        {
            lock (objLockQueRx)
            {
                return queRx.Count;
            }
        }

        /// <summary>수신큐에 있는 자료를 삭제한다.
        /// </summary>
        public void FlushRxQue()
        {
            lock (objLockQueRx)
            {
                serialPort.DiscardInBuffer();
                queRx.Clear();
            }
        }

        /// <summary>DTR 상태를 설정
        /// </summary>
        /// <param name="bOn"></param>
        public void SetDtr(bool bOn)
        {
            if (serialPort.IsOpen == false)
                return;

            serialPort.DtrEnable = bOn;
        }

        /// <summary>RTS 상태를 설정
        /// </summary>
        /// <param name="bOn"></param>
        public void SetRts(bool bOn)
        {
            if (serialPort.IsOpen == false)
                return;

            serialPort.RtsEnable = bOn;
        }

        /// <summary>DSR 상태를 취득
        /// </summary>
        /// <returns></returns>
        public bool IsDsrOn()
        {
            if (serialPort.IsOpen == false)
                return false;

            return serialPort.DsrHolding;
        }

        /// <summary>CTS 상태를 취득
        /// </summary>
        /// <returns></returns>
        public bool IsCtsOn()
        {
            if (serialPort.IsOpen == false)
                return false;

            return serialPort.CtsHolding;
        }

        /// <summary>Break신호를 제어
        /// </summary>
        /// <param name="bVal"></param>
        public void SetBreakState(bool bVal)
        {
            serialPort.BreakState = bVal;
        }

        /// <summary>Break신호를 취득
        /// </summary>
        /// <returns></returns>
        public bool GetBreakState()
        {
            return serialPort.BreakState;
        }

       
    }
}
