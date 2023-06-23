using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace KCL_reBMS_Prj
{
    public partial class AllView_Form : Form
    {
        private const byte CMU_EA = 10;
        
        Module_UserCtrl1[] userCTrlm = new Module_UserCtrl1[CMU_EA];
        

        public AllView_Form()
        {
            InitializeComponent();

            Panel tmp_pn;
            for (int i = 0; i < CMU_EA; i++)
            {
                tmp_pn = (Panel)this.Controls.Find("panel" + (i+1).ToString(), true)[0];
                tmp_pn.BorderStyle = BorderStyle.FixedSingle;
                tmp_pn.Visible = true;
            }

            //userCTrlm[0] = new Module_UserCtrl1(10);
            //userCTrlm[1] = new Module_UserCtrl1(10);
            //userCTrlm[2] = new Module_UserCtrl1(9);
            //userCTrlm[3] = new Module_UserCtrl1(10);
            //userCTrlm[4] = new Module_UserCtrl1(10);
            //userCTrlm[5] = new Module_UserCtrl1(9);
            //userCTrlm[6] = new Module_UserCtrl1(10);
            //userCTrlm[7] = new Module_UserCtrl1(10);
            //userCTrlm[8] = new Module_UserCtrl1(10);
            //userCTrlm[9] = new Module_UserCtrl1(10);
        }

        public void set_Voltage(byte icnum, byte cellnum, string str)
        {
            Module_UserCtrl1 tmp_usr;
            tmp_usr = (Module_UserCtrl1)this.Controls.Find("userCTrlm" + (icnum + 1).ToString(), true)[0];
            tmp_usr.Voltage[cellnum] = str;
        }

        public void set_Temper(byte icnum, byte tmpnum, string str)
        {
            Module_UserCtrl1 tmp_usr;
            tmp_usr = (Module_UserCtrl1)this.Controls.Find("userCTrlm" + (icnum+1).ToString(), true)[0];
            tmp_usr.Temper[tmpnum] = str;
        }

        public void set_Balancing(byte icnum, byte cellnum, bool bSetted)
        {
            Module_UserCtrl1 tmp_usr;
            tmp_usr = (Module_UserCtrl1)this.Controls.Find("userCTrlm" + (icnum + 1).ToString(), true)[0];
            tmp_usr.Balancing[cellnum] = bSetted;
        }

        private void AllView_Form_Load(object sender, EventArgs e)
        {

        }

        private void panel4_Paint(object sender, PaintEventArgs e)
        {

        }

        private void module_UserCtrl12_Load(object sender, EventArgs e)
        {

        }

        private void module_UserCtrl11_Load(object sender, EventArgs e)
        {

        }
    }
}
