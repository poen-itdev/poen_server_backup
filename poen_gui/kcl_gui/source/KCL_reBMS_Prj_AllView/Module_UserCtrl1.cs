using System;
using System.Drawing;
using System.Windows.Forms;

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
            _Balancing = new bool[10];
            lbModuleT1.Text = _Temper[0];
            lbModuleT2.Text = _Temper[1];
            lbModuleT3.Text = _Temper[2];
            lbModuleT4.Text = _Temper[3];

            if (iCellCnt == 9)
            {
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
            label1.Text = _Title;
            label4.Text = _Voltage[0];
            label6.Text = _Voltage[1];
            label8.Text = _Voltage[2];
            label10.Text = _Voltage[3];
            label12.Text = _Voltage[4];
            label14.Text = _Voltage[5];
            label21.Text = _Voltage[6];
            label22.Text = _Voltage[7];
            label23.Text = _Voltage[8];
            label24.Text = _Voltage[9];
            //label25.Text = _Voltage[10];
            //label26.Text = _Voltage[11];
            lbModuleT1.Text = _Temper[0];
            lbModuleT2.Text = _Temper[1];
            lbModuleT3.Text = _Temper[2];
            lbModuleT4.Text = _Temper[3];
            if (_Balancing[0] == true)
            {
                label4.BackColor = Color.Yellow;
            }
            else
            {
                label4.BackColor = Color.Transparent;
            }

            if (_Balancing[1] == true)
            {
                label6.BackColor = Color.Yellow;
            }
            else
            {
                label6.BackColor = Color.Transparent;
            }

            if (_Balancing[2] == true)
            {
                label8.BackColor = Color.Yellow;
            }
            else
            {
                label8.BackColor = Color.Transparent;
            }

            if (_Balancing[3] == true)
            {
                label10.BackColor = Color.Yellow;
            }
            else
            {
                label10.BackColor = Color.Transparent;
            }

            if (_Balancing[4] == true)
            {
                label12.BackColor = Color.Yellow;
            }
            else
            {
                label12.BackColor = Color.Transparent;
            }

            if (_Balancing[5] == true)
            {
                label14.BackColor = Color.Yellow;
            }
            else
            {
                label14.BackColor = Color.Transparent;
            }

            if (_Balancing[6] == true)
            {
                label21.BackColor = Color.Yellow;
            }
            else
            {
                label21.BackColor = Color.Transparent;
            }

            if (_Balancing[7] == true)
            {
                label22.BackColor = Color.Yellow;
            }
            else
            {
                label22.BackColor = Color.Transparent;
            }

            if (_Balancing[8] == true)
            {
                label23.BackColor = Color.Yellow;
            }
            else
            {
                label23.BackColor = Color.Transparent;
            }

            if (_Balancing[9] == true)
            {
                label24.BackColor = Color.Yellow;
            }
            else
            {
                label24.BackColor = Color.Transparent;
            }
        }
    }
}
