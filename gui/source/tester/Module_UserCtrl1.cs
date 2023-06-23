using System;
using System.Windows.Forms;
using System.Drawing;

namespace KCL_reBMS_Prj
{
    public partial class Module_UserCtrl1 : UserControl
    {
        private string[] _Voltage;
        private string[] _Temper;
        private bool[] _Balancing;
        private string _Title;

        public Module_UserCtrl1(int iCellCnt)
        {
            InitializeComponent();
            _Voltage = new string[10];
            _Temper = new string[4];
            lbModuleT1.Text = _Temper[0];
            lbModuleT2.Text = _Temper[1];
            lbModuleT3.Text = _Temper[2];
            lbModuleT4.Text = _Temper[3];

            if(iCellCnt == 9) {
                label18.Visible = false;
                label24.Visible = false;
            }
            label19.Visible = false;
            label20.Visible = false;
            label25.Visible = false;
            label26.Visible = false;

            timer1.Enabled = true;
        }
        public string Title
        {
            set
            {
                _Title = value;
            }
            get { return _Title; }
        }

        public string[] Temper
        {
            set
            {
                _Temper = value;
            }
            get { return _Temper; }
        }

        public string[] Voltage
        {
            set
            {
                _Voltage = value;
            }
            get { return _Voltage; }
             
        }

        public bool[] Balancing
        {
            set
            {
                _Balancing = value;
            }
            get { return _Balancing; }

        }

        private void timer1_Tick(object sender, EventArgs e)
        {
           
        }
    }
}
