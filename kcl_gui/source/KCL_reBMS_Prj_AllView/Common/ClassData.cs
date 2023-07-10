using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace KCL_reBMS_Prj
{
    internal class ClassData
    {
        public const byte CMUEA = 10;
        public const byte TEMPEA = 4;
        public int iMonitoringCycleTime = 1000;

        public uint uLogCount = 0;
        public uint uDataLogCount = 0;

        //monitoring    
        public struct Max17841b
        {
            public short[] Voltage;
            public short[] Temperature;
            public byte[] CellBalancing;
        }

        public ClassData()
        {
            this.max17841b = new Max17841b[10];
            for(int i = 0; i < 10; i++)
            {
                this.max17841b[i].Voltage = new short[CMUEA];
                this.max17841b[i].Temperature = new short[TEMPEA];
                this.max17841b[i].CellBalancing = new byte[2];
            }
        }

        public Max17841b[] max17841b;

        public short MaxTemp;
        public short MinTemp; 
        public short MaxCell;
        public short MinCell;
        public short PVoltage;
        public short Soc;
        public short Soh;
        public short Current;
        public int Ccc;
        public int Cdc;

        public byte WCellOverVoltageStatus;
        public byte WCellUnderVoltageStatus;
        public byte WChargingOverTempStatus;
        public byte WChargingUnderTempStatus;
        public byte WChargingOverCurrentStatus;
        public byte WDisChargingOverCurrentStatus;
        public byte WCellDiffVoltageStatus;
        public byte WSensingline_measureStatus;
        public byte PCellOverVoltageStatus;
        public byte PCellUnderVoltageStatus;
        public byte PChargingOverTempStatus;
        public byte PChargingUnderTempStatus;
        public byte PChargingOverCurrentStatus;
        public byte PDisChargingOverCurrentStatus;
        public byte PCellDiffVoltageStatus;
        public byte PSensinglinemeasureStatus;
        //public byte PlusRelayStatus;
        //public byte PreRelayStatus;
        public byte sensinglineErr;
        public byte OCVState;
        public byte CCVState;
        public byte CellBalanceStatus;


        //Protect
        //Enable
        public byte PCellOverVoltageEnable;
        public byte PCellUnderVoltageEnable;
        public byte PPackOverVoltageEnable;
        public byte PPackUnderVoltageEnable;
        public byte PCellVoltageDiffEnable;
        public byte PCellOverTempEnable;
        public byte PCellUnderTempEnable;
        public byte PChargingOverCurrentEnable;
        public byte PDisChargingOverCurrentEnable;
        public byte PSensingLineMeasureEnable;
        public byte PCommunicationErrorEnable;
        public byte PCurrentSensorErrorEnable;
        public byte PInterLockErrorEnable;
        public byte PSelfSystemDiagEnable;

        //Set Protect
        public ushort PsetCellOverVoltage;
        public ushort PsetCellUnderVoltage;
        public ushort PsetPackOverVoltage;
        public ushort PsetPackUnderVoltage;
        public ushort PsetCellVoltDiff;
        public short PsetCellOverTemp;
        public short PsetCellUnderTemp;
        public short PsetChargeOverCurrent;
        public short PsetDischargeOverCurrent;
        public short PsetSensingLineMeasure;
        public short PsetCommunicationError;
        public short PsetCurrentSensorError;
        public short PsetInterLockError;
        public short PsetSelfSystemDiag;
        public ushort PsetCellOverVoltageRetain;
        public ushort PsetCellUnderVoltageRetain;
        public ushort PsetPackOverVoltageRetain;
        public ushort PsetPackUnderVoltageRetain;
        public ushort PsetCellVoltDiffRetain;
        public ushort PsetCellOverTempRetain;
        public ushort PsetCellUnderTempRetain;
        public ushort PsetChargeOverCurrentRetain;
        public ushort PsetDischargeOverCurrentRetain;
        public ushort PsetSensingLineMeasureRetain;
        public ushort PsetCommunicationErrorRetain;
        public ushort PsetCurrentSensorErrorRetain;
        public ushort PsetInterLockErrorRetain;
        public ushort PsetSelfSystemDiagRetain;

        //Set Release
        public ushort PRsetCellOverVoltage;
        public ushort PRsetCellUnderVoltage;
        public ushort PRsetPackOverVoltage;
        public ushort PRsetPackUnderVoltage;
        public ushort PRsetCellVoltDiff;
        public short PRsetCellOverTemp;
        public short PRsetCellUnderTemp;
        public short PRsetChargeOverCurrent;
        public short PRsetDischargeOverCurrent;
        public short PRsetSensingLineMeasure;
        public short PRsetCommunicationError;
        public short PRsetCurrentSensorError;
        public short PRsetInterLockError;
        public short PRsetSelfSystemDiag;
        public ushort PRsetCellOverVoltageRetain;
        public ushort PRsetCellUnderVoltageRetain;
        public ushort PRsetPackOverVoltageRetain;
        public ushort PRsetPackUnderVoltageRetain;
        public ushort PRsetCellVoltDiffRetain;
        public ushort PRsetCellOverTempRetain;
        public ushort PRsetCellUnderTempRetain;
        public ushort PRsetChargeOverCurrentRetain;
        public ushort PRsetDischargeOverCurrentRetain;
        public ushort PRsetSensingLineMeasureRetain;
        public ushort PRsetCommunicationErrorRetain;
        public ushort PRsetCurrentSensorErrorRetain;
        public ushort PRsetInterLockErrorRetain;
        public ushort PRsetSelfSystemDiagRetain;

        //Warnning
        //Enable
        public byte WCellOverVoltageEnable;
        public byte WCellUnderVoltageEnable;
        public byte WPackOverVoltageEnable;
        public byte WPackUnderVoltageEnable;
        public byte WCellVoltageDiffEnable;
        public byte WCellOverTempEnable;
        public byte WCellUnderTempEnable;
        public byte WChargingOverCurrentEnable;
        public byte WDisChargingOverCurrentEnable;
        public byte WLowSOCEnable;
        public byte WLowSOHEnable;

        //Set Warnning
        public ushort WsetCellOverVoltage;
        public ushort WsetCellUnderVoltage;
        public ushort WsetPackOverVoltage;
        public ushort WsetPackUnderVoltage;
        public ushort WsetCellVoltDiff;
        public short WsetCellOverTemp;
        public short WsetCellUnderTemp;
        public short WsetChargeOverCurrent;
        public short WsetDischargeOverCurrent;
        public ushort WsetLowSOC;
        public ushort WsetLowSOH;

        public ushort WsetCellOverVoltageRetain;
        public ushort WsetCellUnderVoltageRetain;
        public ushort WsetPackOverVoltageRetain;
        public ushort WsetPackUnderVoltageRetain;
        public ushort WsetCellVoltDiffRetain;
        public ushort WsetCellOverTempRetain;
        public ushort WsetCellUnderTempRetain;
        public ushort WsetChargeOverCurrentRetain;
        public ushort WsetDischargeOverCurrentRetain;
        public ushort WsetLowSOCRetain;
        public ushort WsetLowSOHRetain;

        //Set Release
        public ushort WRsetCellOverVoltage;
        public ushort WRsetCellUnderVoltage;
        public ushort WRsetPackOverVoltage;
        public ushort WRsetPackUnderVoltage;
        public ushort WRsetCellVoltDiff;
        public short WRsetCellOverTemp;
        public short WRsetCellUnderTemp;
        public short WRsetChargeOverCurrent;
        public short WRsetDischargeOverCurrent;
        public ushort WRsetLowSOC;
        //public ushort WRsetLowSOH;
                    
        public ushort WRsetCellOverVoltageRetain;
        public ushort WRsetCellUnderVoltageRetain;
        public ushort WRsetPackOverVoltageRetain;
        public ushort WRsetPackUnderVoltageRetain;
        public ushort WRsetCellVoltDiffRetain;
        public ushort WRsetCellOverTempRetain;
        public ushort WRsetCellUnderTempRetain;
        public ushort WRsetChargeOverCurrentRetain;
        public ushort WRsetDischargeOverCurrentRetain;
        public ushort WRsetLowSOCRetain;
        //public ushort WRsetLowSOHRetain;

        //Relay
        public byte SetRelay;
        public byte RelayStatus;

        //Set SOC
        public short SetSoc;

        //Set SOH
        public short SetSoh; 

        //BMS Version
        public short Version;

        //BMS Reboot 
        public byte BMSReboot;
    }
}
