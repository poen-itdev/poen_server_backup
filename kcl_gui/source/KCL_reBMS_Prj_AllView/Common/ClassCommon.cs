using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Security.Cryptography;
using System.Runtime.InteropServices;
using System.Diagnostics;

namespace KCL_reBMS_Prj
{
    public class ClassCommon
    {
        #region 시리얼 통신
        //메시지 타입 Message Type
        public const int MSG_SRL_PORT_OPEN = 1;
        public const int MSG_SRL_PORT_CLOSE = 2;
        public const int MSG_SRL_ERR_TEXT = 4;
        #endregion

        #region 소켓 통신
        public const int MSG_SCK_CONNECT = 10;
        public const int MSG_SCK_DISCON = 20;
        public const int MSG_SCK_DGB_TEXT = 90;
        public const int MSG_SCK_ERR_TEXT = 91;
        public const int MSG_SCK_POLLING = 100;
        public const int MSG_SCK_GET_VERSION = 110;
        public const int MSG_SCK_GET_STATUS = 120;
        public const int MSC_SCK_ISSUE = 130;
        public const int MSG_SCK_DOWNLOAD = 140; 
        #endregion

        public const UInt16 POLYNOMIAL = 0x1021;
        public UInt16[] crc_table = new UInt16[256];
        const byte CRC8_POLYNOMIAL = 0x31;
        byte[] CRC8_TABLE = new byte[]
        {
            0x00,0x31,0x62,0x53,0xC4,0xF5,0xA6,0x97,0xB9,0x88,0xDB,0xEA,0x7D,0x4C,0x1F,0x2E,
            0x43,0x72,0x21,0x10,0x87,0xB6,0xE5,0xD4,0xFA,0xCB,0x98,0xA9,0x3E,0x0F,0x5C,0x6D,
            0x86,0xB7,0xE4,0xD5,0x42,0x73,0x20,0x11,0x3F,0x0E,0x5D,0x6C,0xFB,0xCA,0x99,0xA8,
            0xC5,0xF4,0xA7,0x96,0x01,0x30,0x63,0x52,0x7C,0x4D,0x1E,0x2F,0xB8,0x89,0xDA,0xEB,
            0x3D,0x0C,0x5F,0x6E,0xF9,0xC8,0x9B,0xAA,0x84,0xB5,0xE6,0xD7,0x40,0x71,0x22,0x13,
            0x7E,0x4F,0x1C,0x2D,0xBA,0x8B,0xD8,0xE9,0xC7,0xF6,0xA5,0x94,0x03,0x32,0x61,0x50,
            0xBB,0x8A,0xD9,0xE8,0x7F,0x4E,0x1D,0x2C,0x02,0x33,0x60,0x51,0xC6,0xF7,0xA4,0x95,
            0xF8,0xC9,0x9A,0xAB,0x3C,0x0D,0x5E,0x6F,0x41,0x70,0x23,0x12,0x85,0xB4,0xE7,0xD6,
            0x7A,0x4B,0x18,0x29,0xBE,0x8F,0xDC,0xED,0xC3,0xF2,0xA1,0x90,0x07,0x36,0x65,0x54,
            0x39,0x08,0x5B,0x6A,0xFD,0xCC,0x9F,0xAE,0x80,0xB1,0xE2,0xD3,0x44,0x75,0x26,0x17,
            0xFC,0xCD,0x9E,0xAF,0x38,0x09,0x5A,0x6B,0x45,0x74,0x27,0x16,0x81,0xB0,0xE3,0xD2,
            0xBF,0x8E,0xDD,0xEC,0x7B,0x4A,0x19,0x28,0x06,0x37,0x64,0x55,0xC2,0xF3,0xA0,0x91,
            0x47,0x76,0x25,0x14,0x83,0xB2,0xE1,0xD0,0xFE,0xCF,0x9C,0xAD,0x3A,0x0B,0x58,0x69,
            0x04,0x35,0x66,0x57,0xC0,0xF1,0xA2,0x93,0xBD,0x8C,0xDF,0xEE,0x79,0x48,0x1B,0x2A,
            0xC1,0xF0,0xA3,0x92,0x05,0x34,0x67,0x56,0x78,0x49,0x1A,0x2B,0xBC,0x8D,0xDE,0xEF,
            0x82,0xB3,0xE0,0xD1,0x46,0x77,0x24,0x15,0x3B,0x0A,0x59,0x68,0xFF,0xCE,0x9D,0xAC
        };

        UInt16[] ARINC_CRC_TABLE = new UInt16[]
        {
            0x0000,0xC0C1,0xC181,0x0140,0xC301,0x03C0,0x0280,0xC241,
            0xC601,0x06C0,0x0780,0xC741,0x0500,0xC5C1,0xC481,0x0440,
            0xCC01,0x0CC0,0x0D80,0xCD41,0x0F00,0xCFC1,0xCE81,0x0E40,
            0x0A00,0xCAC1,0xCB81,0x0B40,0xC901,0x09C0,0x0880,0xC841,
            0xD801,0x18C0,0x1980,0xD941,0x1B00,0xDBC1,0xDA81,0x1A40,
            0x1E00,0xDEC1,0xDF81,0x1F40,0xDD01,0x1DC0,0x1C80,0xDC41,
            0x1400,0xD4C1,0xD581,0x1540,0xD701,0x17C0,0x1680,0xD641,
            0xD201,0x12C0,0x1380,0xD341,0x1100,0xD1C1,0xD081,0x1040,
            0xF001,0x30C0,0x3180,0xF141,0x3300,0xF3C1,0xF281,0x3240,
            0x3600,0xF6C1,0xF781,0x3740,0xF501,0x35C0,0x3480,0xF441,
            0x3C00,0xFCC1,0xFD81,0x3D40,0xFF01,0x3FC0,0x3E80,0xFE41,
            0xFA01,0x3AC0,0x3B80,0xFB41,0x3900,0xF9C1,0xF881,0x3840,
            0x2800,0xE8C1,0xE981,0x2940,0xEB01,0x2BC0,0x2A80,0xEA41,
            0xEE01,0x2EC0,0x2F80,0xEF41,0x2D00,0xEDC1,0xEC81,0x2C40,
            0xE401,0x24C0,0x2580,0xE541,0x2700,0xE7C1,0xE681,0x2640,
            0x2200,0xE2C1,0xE381,0x2340,0xE101,0x21C0,0x2080,0xE041,
            0xA001,0x60C0,0x6180,0xA141,0x6300,0xA3C1,0xA281,0x6240,
            0x6600,0xA6C1,0xA781,0x6740,0xA501,0x65C0,0x6480,0xA441,
            0x6C00,0xACC1,0xAD81,0x6D40,0xAF01,0x6FC0,0x6E80,0xAE41,
            0xAA01,0x6AC0,0x6B80,0xAB41,0x6900,0xA9C1,0xA881,0x6840,
            0x7800,0xB8C1,0xB981,0x7940,0xBB01,0x7BC0,0x7A80,0xBA41,
            0xBE01,0x7EC0,0x7F80,0xBF41,0x7D00,0xBDC1,0xBC81,0x7C40,
            0xB401,0x74C0,0x7580,0xB541,0x7700,0xB7C1,0xB681,0x7640,
            0x7200,0xB2C1,0xB381,0x7340,0xB101,0x71C0,0x7080,0xB041,
            0x5000,0x90C1,0x9181,0x5140,0x9301,0x53C0,0x5280,0x9241,
            0x9601,0x56C0,0x5780,0x9741,0x5500,0x95C1,0x9481,0x5440,
            0x9C01,0x5CC0,0x5D80,0x9D41,0x5F00,0x9FC1,0x9E81,0x5E40,
            0x5A00,0x9AC1,0x9B81,0x5B40,0x9901,0x59C0,0x5880,0x9841,
            0x8801,0x48C0,0x4980,0x8941,0x4B00,0x8BC1,0x8A81,0x4A40,
            0x4E00,0x8EC1,0x8F81,0x4F40,0x8D01,0x4DC0,0x4C80,0x8C41,
            0x4400,0x84C1,0x8581,0x4540,0x8701,0x47C0,0x4680,0x8641,
            0x8201,0x42C0,0x4380,0x8341,0x4100,0x81C1,0x8081,0x4040,        
        };
        public byte ComputeCRC8(ref byte[] data, int length)
        {
            byte crc = 0x56;
            int i;
            for (i = 0; i < length; i++)
            {
                crc = CRC8_TABLE[crc ^ data[i]];
            }
            return crc;
        }

        public byte RcvComputeCRC8(ref byte[,] data, byte iCount, int length)
        {
            byte crc = 0x56;
            int i;
            for (i = 0; i < length; i++)
            {
                crc = CRC8_TABLE[crc ^ data[iCount, i]];
            }
            return crc;
        }

        /// <summary> CRC16의 값을 미리 계산하여 Table을 생성해 놓는다.
        /// </summary>
        public void Gen_Crc16_Table()
        {
            UInt16 i, j, k=0, crc_accum = 0;

            for(i = 0;i<256;i++)
            {
                k = i;
                k <<= 8;
                crc_accum = k;
                for(j=0;j<8;j++)
                {
                    if((crc_accum & 0x8000L ) == 0x8000L)
                    {
                        crc_accum <<= 1;
                        crc_accum ^= POLYNOMIAL;
                    }
                    else
                        crc_accum <<= 1;
                }
                crc_table[i] = crc_accum;
            }
            for(i=0;i<256;i++)
            {
                //Console.Write(string.Format(" 0x{0:X04} ", crc_table[i]));
                //if ((i/8)==0 && i > 7)
                //    Console.Write("\r\n");
            }
        }

        /// <summary> CRC16 계산
        /// </summary>
        /// <param name="bySrc"></param>
        /// <param name="iLen"></param>
        /// <returns></returns>
        public UInt16 GetCRC16fromByteArr(byte[] bySrc, int iLen)
        {
            UInt16 i, j, crc_accum = 0;
            for(i=0;i<iLen;i++)
            {
                j = crc_accum;
                j >>= 8;
                j ^= bySrc[i];
                j &= 0xFF;

                crc_accum <<= 8;
                crc_accum ^= crc_table[j];
            }
            return crc_accum;
        }
    
        public UInt16 CRC_Caulate(byte[] bySrc, int count)
        {/*
            UInt16 crc = 0, i;
            int j = 0;
	        do
	        {
                crc = crc ^ bySrc[j++] * 256;
		        for(i = 0; i < 8; ++i)
		        {
			        if(crc & 0x8000)		
                        crc = (crc << 1) ^ 0x1021;  // X12+X5+1
			        else								
                        crc = crc << 1;
		        }
		        count--;
	        }
	        while(count != 0);
	        return (crc & 0xFFFF);*/
            return 0;
        }


        public void ARINC_CRC16(ref UInt16 crc, ref byte[] TextPrint, UInt16 Length)
        {
            int i, index;

            //Console.WriteLine("CRC:\n");


            for (i = 0;i<Length;i++)
            {
                //Console.Write(string.Format("[{0:X2}]", TextPrint[i]));
                index = ((crc ^ TextPrint[i]) & 0x00FF);
                //Console.Write(string.Format("[{0:X2}]", index));
                crc >>= 8;
                crc &= 0x00FF;
                crc ^= ARINC_CRC_TABLE[index];
                //Console.Write(string.Format("[{0:X4}]\n", crc));
                //crc = ((crc >> 8) & 0x00FF) ^ ARINC_CRC_TABLE[index]; //C++ Source
            }
        }

        /// <summary>현재 디렉토리를 취득
        /// </summary>
        /// <returns></returns>
        public string GetCurrDir()
        {
            return System.IO.Directory.GetCurrentDirectory().ToString();
        }

        /// <summary>현재시간의 tick값을 취득
        /// 
        /// </summary>
        /// <returns></returns>
        public long GetTickCount()
        {
            return DateTime.Now.Ticks;
        }

        /// <summary>경과시간을 msec단위로 계산
        /// 
        /// </summary>
        /// <param name="lStartTicks"></param>
        /// <returns></returns>
        public long GetElepsedTime(long lStartTicks)
        {
           long lNow = GetTickCount();

            TimeSpan tsElepsed =  new TimeSpan( lNow - lStartTicks);
            return (long)tsElepsed.TotalMilliseconds;
        }

        /// <summary>경과시간을 msec단위로 계산
        /// 
        /// </summary>
        /// <param name="dtStart"></param>
        /// <returns></returns>
        public long GetElepsedTime(DateTime dtStart)
        {
            return GetElepsedTime(dtStart.Ticks);
        }

        /// <summary>csv파일로 저장하기 위해 데이터를 스트링으로변환
        /// </summary>
        /// <param name="byData"></param>
        /// <param name="iDataLen"></param>
        /// <returns></returns>

        /// <summary>byte배열을 hex ascii 문자열로 저장
        /// </summary>
        /// <param name="byData"></param>
        /// <param name="iDataLen"></param>
        /// <returns></returns>
        public string ByteArrToHexStr(byte[] byData, int iDataLen)
        {
            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < iDataLen; i++)
                sb.AppendFormat("{0:X2},", byData[i]);

            return sb.ToString();
        }

        /// <summary>byte배열을 hex ascii 문자열로 저장하고 지정된 문자를 붙인다.
        /// </summary>
        /// <param name="byData"></param>
        /// <param name="iDataLen"></param>
        /// <returns></returns>
        public string ByteArrToHexStr(byte[] byData, int iDataLen, string strSpacer)
        {
            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < iDataLen; i++)
                sb.AppendFormat("{0:X2}" + strSpacer, byData[i]);

            return sb.ToString();
        }

        /// <summary>byte 배열을 string 변수에 저장
        /// </summary>
        /// <param name="byArr"></param>
        /// <param name="iStartIdx"></param>
        /// <param name="iLen"></param>
        /// <returns></returns>
        public string ByteArrToStr(byte[] byArr, int iStartIdx, int iLen)
        {
            StringBuilder sb = new StringBuilder();
            int i;

            for (i = 0; i < iLen; i++)
                sb.Append((char)byArr[iStartIdx + i]);

            return sb.ToString();
        }
        
         /// <summary>byte배열을 long 값으로 변환 (Little Endian)
        /// 
        /// </summary>
        /// <param name="byData"></param>
        /// <param name="iStartIdx"></param>
        /// <param name="iLen"></param>
        /// <returns></returns>
        public long ByteArrToLongLE(byte[] byData, int iStartIdx, int iLen)
        {
            byte byB;
            long lVal = 0;
            long lExp = 1;

            for (int i = 0; i < iLen; i++)
            {
                byB = byData[i + iStartIdx];
                lVal += (byB * lExp);
                lExp *= 256;
            }
            return lVal;
        }

        /// <summary>byte배열을 long 값으로 변환 (Big Endian)
        /// 
        /// </summary>
        /// <param name="byData"></param>
        /// <param name="iStartIdx"></param>
        /// <param name="iLen"></param>
        /// <returns></returns>
        public long ByteArrToLongBE(byte[] byData, int iStartIdx, int iLen)
        {
            byte byB;
            long lVal = 0;
            long lExp = 1;

            for (int i = 0; i < iLen; i++)
            {
                byB = byData[iStartIdx + iLen - 1 - i];
                lVal += (byB * lExp);
                lExp *= 256;
            }
            return lVal;
        }

       



        /// <summary>Binary String 변수를 byte 배열에 저장
        /// </summary>
        /// <param name="strSrc"></param>
        /// <param name="byDest"></param>
        /// <param name="iArrSize"></param>
        /// <returns></returns>
        public int BinStrToByteArr(string strSrc, ref byte[] byDest, int iArrSize)
        {
            Array.Clear(byDest, 0, iArrSize);

            if (strSrc == null)
                return 0;

            for (int i = 0; i < strSrc.Length; i++)
            {
                if (i >= iArrSize)
                    break;

                byDest[i] = (byte)strSrc[i];
            }

            return strSrc.Length;
        }

        
        

        /// <summary>숫자로 구성된 문자열을 BCD Byte 배열로 변환 (좌측정렬)
        /// 
        /// </summary>
        /// <param name="strSrc"></param>
        /// <param name="iStartIdx"></param>
        /// <param name="iLen"></param>
        /// <param name="byDest"></param>
        /// <param name="iDestSize"></param>
        /// <returns></returns>
        public int StrToBcdByteArr(string strSrc, int iStartIdx, int iLen, ref byte[] byDest, int iDestSize)
        {
            if ((byDest == null) || (iDestSize == 0))
                return 0;

            Array.Clear(byDest, 0, iDestSize);

            if ((strSrc == null) || (iLen == 0))
                return 0;

            byte by, byBcd=0;
            int n = 0;

            for (int i = 0; i < iLen; i++)
            {
                if (iStartIdx + i < strSrc.Length)
                    by = (byte)strSrc[iStartIdx + i];
                else
                    by = 0x20;

                if (i % 2 == 0)
                {
                    byBcd = (byte)((by & 0x0f) << 4);
                }
                else
                {
                    byBcd |= (byte)(by & 0x0f);
                }

                if( (i % 2 == 1) || (i == iLen-1))
                {
                    if( n < iDestSize)
                        byDest[n++] = byBcd;
                }
            }
            return n;
        }


        /// <summary> Hexa Char 
        /// </summary>
        /// <param name="cHex"></param>
        /// <returns></returns>
        public int HexCharToBin(char cHex)
        {
            int iRes = 0;

            if ((cHex >= '0') && (cHex <= '9'))
                iRes = cHex - '0';
            else if ((cHex >= 'A') && (cHex <= 'Z'))
                iRes = cHex - 'A' + 10;
            else if ((cHex >= 'a') && (cHex <= 'z'))
                iRes = cHex - 'a' + 10;

            return iRes;
        }

        /// <summary> 1, 2자리 Hexa String 을 Byte로 변환
        /// </summary>
        /// <param name="strSrc"></param>
        /// <returns></returns>
        public byte HexStrToByte(string strSrc)
        {
            byte by;
            
            if (strSrc.CompareTo("") == 0)
                return 0;

            by = (byte)HexCharToBin(Convert.ToChar(strSrc[0]));

            if (strSrc.Length == 2)
            {
                by <<= 4;
                by |= (byte)HexCharToBin(Convert.ToChar(strSrc[1]));
            }

            return by;
        }

        /// <summary> Hexa String을 Byte 배열로 변환
        /// </summary>
        /// <param name="strSrc"></param>
        /// <param name="byDest"></param>
        /// <param name="iLen"></param>
        /// <returns></returns>
        public int HexStrToByteArr(string strSrc, ref byte[] byDest)
        {
            int i;
            if (strSrc.CompareTo("") == 0)
                return 0;

            for(i=0;i < strSrc.Length/2;i++)
            {
                byDest[i] = HexStrToByte(strSrc.Substring(i*2,2));
            }

            if (strSrc.Length%2 ==1)
                byDest[i] = HexStrToByte(strSrc.Substring(i*2,1));

            return 1;
        }

        /// <summary>정수를 Byte 배열에 저장 (Little Endian 방식)
        /// </summary>
        /// <param name="iSrc"></param>
        /// <param name="byDest"></param>
        /// <param name="iDestSize"></param>
        public void IntToByteArrLE(long iSrc, ref byte[] byDest, int iDestSize)
        {
            long iNum = iSrc;

            for (int i = 0; i < iDestSize; i++)
            {
                byDest[i] = (byte)(iNum % 256);
                iNum /= 256;
            }
        }

        /// <summary>정수를 Byte 배열에 저장 (Big Endian 방식)
        /// </summary>
        /// <param name="iSrc"></param>
        /// <param name="byDest"></param>
        /// <param name="iDestSize"></param>
        public void IntToByteArrBE(long iSrc, ref byte[] byDest, int iDestSize)
        {
            long iNum = iSrc;

            for (int i = 0; i < iDestSize; i++)
            {
                byDest[iDestSize-1-i] = (byte)(iNum % 256);
                iNum /= 256;
            }
        }





        /// <summary> 구분자가 있는 맥어드레스를 byte 배열에 저장
        /// </summary>
        /// <param name="strSrc"></param>
        /// <param name="byDest"></param>
        /// <returns></returns>
        public int MacStrToByteArr(string strSrc, ref byte[] byDest)
        {
            Array.Clear(byDest, 0, 2);

            if (strSrc.Length != 17)
                return 0;

            strSrc = strSrc.Replace(":","");

            HexStrToByteArr(strSrc, ref byDest);

            return 1;
        }

        /// <summary> IP Address Format의 문자열을 byte 배열에 저장
        /// </summary>
        /// <param name="strSrc"></param>
        /// <param name="byDest"></param>
        /// <returns></returns>
        public int IPStrToByteArr(string strSrc, ref byte[] byDest)
        {
            Array.Clear(byDest, 0, 2);

            if (strSrc.Length < 13)
                return 0;


            string IP1 = strSrc.Substring(0, 3).Replace(" ","");
            string IP2 = strSrc.Substring(4, 3).Replace(" ","");
            string IP3 = strSrc.Substring(8, 3).Replace(" ","");
            string IP4 = strSrc.Substring(12,strSrc.Length - 12).Replace(" ","");

            byDest[0] = Convert.ToByte(IP1);
            byDest[1] = Convert.ToByte(IP2);
            byDest[2] = Convert.ToByte(IP3);
            byDest[3] = Convert.ToByte(IP4);

            return 1;
        }

        /// <summary>문자열형식(YYYYMMDDHHMMSS)의 날짜값을 DataTime형으로 변환
        /// 
        /// </summary>
        /// <param name="strDate"></param>
        /// <returns></returns>
        public DateTime StrToDateTime(string strDate)
        {
            DateTime dtRes = new DateTime();

            if ((strDate == null) || (strDate.Length == 0))
                return dtRes;

            string strTmp = GetNumStr(strDate);

            int iYear=0, iMon=0, iDay=0, iHour=0, iMin=0, iSec=0;

            if (strTmp.Length >= 4)
                iYear = StrToInt(strTmp.Substring(0, 4));

            if (strTmp.Length >= 6)
                iMon = StrToInt(strTmp.Substring(4, 2));

            if (strTmp.Length >= 8)
                iDay = StrToInt(strTmp.Substring(6, 2));

            if (strTmp.Length >= 10)
                iHour = StrToInt(strTmp.Substring(8, 2));

            if (strTmp.Length >= 12)
                iMin = StrToInt(strTmp.Substring(10, 2));

            if (strTmp.Length >= 14)
                iSec = StrToInt(strTmp.Substring(12, 2));

            try
            {
                dtRes = new DateTime(iYear, iMon, iDay, iHour, iMin, iSec);
            }
            catch
            {
            }

            return dtRes;
        }
                
        /// <summary>원본 문자열에서 숫자만을 추출한 문자열을 생성
        /// 
        /// </summary>
        /// <param name="strSrc"></param>
        /// <returns></returns>
        public string GetNumStr(string strSrc)
        {
            if( strSrc == null)
                return "";

            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < strSrc.Length; i++)
            {
                if ((strSrc[i] >= '0') && (strSrc[i] <= '9'))
                    sb.Append(strSrc[i]);
            }

            return sb.ToString();
        }

        /// <summary>원본 문자열에서 특정 문자만 제외하고 숫자만을 추출한 문자열을 생성
        /// </summary>
        /// <param name="strSrc"></param>
        /// <returns></returns>
        public string GetNumStr(string strSrc, char cExcept)
        {
            if (strSrc == null)
                return "";

            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < strSrc.Length; i++)
            {
                if ((strSrc[i] >= '0') && (strSrc[i] <= '9') || strSrc[i] == cExcept)
                    sb.Append(strSrc[i]);
            }

            return sb.ToString();
        }

        /// <summary>원본 문자열에서 특정 문자만 제외하고 숫자만을 추출한 문자열을 생성하고 제외된 문자는 대체문자로 대체된다.
        /// </summary>
        /// <param name="strSrc"></param>
        /// <returns></returns>
        public string GetNumStr(string strSrc, char cExcept, char cReplace)
        {
            if (strSrc == null)
                return "";

            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < strSrc.Length; i++)
            {
                if ((strSrc[i] >= '0') && (strSrc[i] <= '9') || strSrc[i] == cExcept)
                    sb.Append(strSrc[i]);
                else
                    sb.Append(cReplace);
            }

            return sb.ToString();
        }

        /// <summary>문자열을 숫자로 변환
        /// </summary>
        /// <param name="strIn"></param>
        /// <returns></returns>
        public int StrToInt(string strIn)
        {
            try
            {

                if (strIn == null)
                    return 0;
                else
                {
                    strIn = strIn.Trim();
                    strIn = GetNumStr(strIn);

                    if (strIn.Length == 0)
                        return 0;
                    else
                        return Convert.ToInt32(strIn);
                }
            }
            catch
            {
                return 0;
            }
        }

        public int UniStrToByteArr(string strSrc, ref byte[] byDest)
        {
            Array.Clear(byDest, 0, byDest.Length);

            if (strSrc == null)
                return 0;

            Encoding ec = Encoding.GetEncoding("ks_c_5601-1987");

            byte[] temp = ec.GetBytes(strSrc);
            int iLength = 0;
            foreach (byte byTemp in temp)
            {
                iLength++;
            }
            Array.Copy(temp, 0, byDest, 0, iLength);



            string strDebug = "[";
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < temp.Length; i++)
                sb.AppendFormat("{0:X2} ", temp[i]);
            strDebug += sb.ToString();
            strDebug += "]";
            Console.WriteLine(strDebug);


            return iLength;
        }

        // Unicode String 변수를 byte 배열에 저장 (Unicode)
        public int UniStrToByteArr(string strSrc, ref byte[] byDest, int iArrSize)
        {
            Array.Clear(byDest, 0, iArrSize);

            if (strSrc == null)
                return 0;

            //Encoding ec = Encoding.Default;
            Encoding ec = Encoding.GetEncoding("ks_c_5601-1987");

            byte[] temp = ec.GetBytes(strSrc);

            for (int i = 0; i < temp.Length; i++)
            {
                if (i >= iArrSize)
                    break;

                byDest[i] = temp[i];
            }



            string strDebug = "[";
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < temp.Length; i++)
                sb.AppendFormat("{0:X2} ", temp[i]);
            strDebug += sb.ToString();
            strDebug += "]";
            Console.WriteLine(strDebug);



            return temp.Length;
        }

        public static long GetFileSize(string FilePath)
        {
            //if you don't have permission to the folder, Directory.Exists will return False
            if (!Directory.Exists(Path.GetDirectoryName(FilePath)))
            {
                //if you land here, it means you don't have permission to the folder
                Debug.Write("Permission denied");
                return -1;
            }
            else if (File.Exists(FilePath))
            {
                return new FileInfo(FilePath).Length;
            }
            return 0;
        }
    }

    public class IniFile
    {
        public string path;

        //Ini 쓰기 WinApi선언
        [DllImport("kernel32")]
        private static extern long WritePrivateProfileString(string section, string key,
 string val, string filePath);

        //Ini 읽기 WinApi선언
        [DllImport("kernel32")]
        private static extern int GetPrivateProfileString(string section, string key,
 string def, StringBuilder retVal, int size, string filePath);

        /// <summary>
        /// INIFile Constructor.
        /// </summary>
        /// <PARAM name="INIPath"></PARAM>
        public IniFile(string INIPath)
        {
            path = INIPath;
        }
        /// <summary>
        /// Write Data to the INI File
        /// </summary>
        /// <PARAM name="Section"></PARAM>
        /// Section name
        /// <PARAM name="Key"></PARAM>
        /// Key Name
        /// <PARAM name="Value"></PARAM>
        /// Value Name
        public void IniWriteValue(string Section, string Key, string Value)
        {
            WritePrivateProfileString(Section, Key, Value, this.path);
        }

        /// <summary>
        /// Read Data Value From the Ini File
        /// </summary>
        /// <PARAM name="Section"></PARAM>
        /// <PARAM name="Key"></PARAM>
        /// <PARAM name="Path"></PARAM>
        /// <returns></returns>
        public string IniReadValue(string Section, string Key)
        {
            StringBuilder temp = new StringBuilder(255);
            int i = GetPrivateProfileString(Section, Key, "", temp,
                                            255, this.path);
            return temp.ToString();
        }
    }
}
