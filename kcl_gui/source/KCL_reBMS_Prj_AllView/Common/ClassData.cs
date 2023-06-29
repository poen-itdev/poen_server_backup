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
        public byte PlusRelayStatus;
        public byte PreRelayStatus;
        public byte sensinglineErr;
        public byte OCVState;
        public byte CCVState;


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
        public short PsetCellOverVoltage;
        public short PsetCellUnderVoltage;
        public short PsetPackOverVoltage;
        public short PsetPackUnderVoltage;
        public short PsetCellVoltDiff;
        public short PsetCellOverTemp;
        public short PsetCellUnderTemp;
        public short PsetChargeOverCurrent;
        public short PsetDischargeOverCurrent;
        public short PsetSensingLineMeasure;
        public short PsetCommunicationError;
        public short PsetCurrentSensorError;
        public short PsetInterLockError;
        public short PsetSelfSystemDiag;
        public short PsetCellOverVoltageRetain;
        public short PsetCellUnderVoltageRetain;
        public short PsetPackOverVoltageRetain;
        public short PsetPackUnderVoltageRetain;
        public short PsetCellVoltDiffRetain;
        public short PsetCellOverTempRetain;
        public short PsetCellUnderTempRetain;
        public short PsetChargeOverCurrentRetain;
        public short PsetDischargeOverCurrentRetain;
        public short PsetSensingLineMeasureRetain;
        public short PsetCommunicationErrorRetain;
        public short PsetCurrentSensorErrorRetain;
        public short PsetInterLockErrorRetain;
        public short PsetSelfSystemDiagRetain;

        //Set Release
        public short PRsetCellOverVoltage;
        public short PRsetCellUnderVoltage;
        public short PRsetPackOverVoltage;
        public short PRsetPackUnderVoltage;
        public short PRsetCellVoltDiff;
        public short PRsetCellOverTemp;
        public short PRsetCellUnderTemp;
        public short PRsetChargeOverCurrent;
        public short PRsetDischargeOverCurrent;
        public short PRsetSensingLineMeasure;
        public short PRsetCommunicationError;
        public short PRsetCurrentSensorError;
        public short PRsetInterLockError;
        public short PRsetSelfSystemDiag;
        public short PRsetCellOverVoltageRetain;
        public short PRsetCellUnderVoltageRetain;
        public short PRsetPackOverVoltageRetain;
        public short PRsetPackUnderVoltageRetain;
        public short PRsetCellVoltDiffRetain;
        public short PRsetCellOverTempRetain;
        public short PRsetCellUnderTempRetain;
        public short PRsetChargeOverCurrentRetain;
        public short PRsetDischargeOverCurrentRetain;
        public short PRsetSensingLineMeasureRetain;
        public short PRsetCommunicationErrorRetain;
        public short PRsetCurrentSensorErrorRetain;
        public short PRsetInterLockErrorRetain;
        public short PRsetSelfSystemDiagRetain;

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
        public short WsetCellOverVoltage;
        public short WsetCellUnderVoltage;
        public short WsetPackOverVoltage;
        public short WsetPackUnderVoltage;
        public short WsetCellVoltDiff;
        public short WsetCellOverTemp;
        public short WsetCellUnderTemp;
        public short WsetChargeOverCurrent;
        public short WsetDischargeOverCurrent;
        public short WsetLowSOC;
        public short WsetLowSOH;

        public short WsetCellOverVoltageRetain;
        public short WsetCellUnderVoltageRetain;
        public short WsetPackOverVoltageRetain;
        public short WsetPackUnderVoltageRetain;
        public short WsetCellVoltDiffRetain;
        public short WsetCellOverTempRetain;
        public short WsetCellUnderTempRetain;
        public short WsetChargeOverCurrentRetain;
        public short WsetDischargeOverCurrentRetain;
        public short WsetLowSOCRetain;
        public short WsetLowSOHRetain;

        //Set Release
        public short WRsetCellOverVoltage;
        public short WRsetCellUnderVoltage;
        public short WRsetPackOverVoltage;
        public short WRsetPackUnderVoltage;
        public short WRsetCellVoltDiff;
        public short WRsetCellOverTemp;
        public short WRsetCellUnderTemp;
        public short WRsetChargeOverCurrent;
        public short WRsetDischargeOverCurrent;
        public short WRsetLowSOC;
        public short WRsetLowSOH;
                    
        public short WRsetCellOverVoltageRetain;
        public short WRsetCellUnderVoltageRetain;
        public short WRsetPackOverVoltageRetain;
        public short WRsetPackUnderVoltageRetain;
        public short WRsetCellVoltDiffRetain;
        public short WRsetCellOverTempRetain;
        public short WRsetCellUnderTempRetain;
        public short WRsetChargeOverCurrentRetain;
        public short WRsetDischargeOverCurrentRetain;
        public short WRsetLowSOCRetain;
        public short WRsetLowSOHRetain;

        //Relay
        public byte SetRelay;
        public byte RelayStatus;

        //Set SOC
        public short SetSoc;

        //Set SOH
        public short SetSoh; 

        //BMU Version
        public short Version;
    }
}
