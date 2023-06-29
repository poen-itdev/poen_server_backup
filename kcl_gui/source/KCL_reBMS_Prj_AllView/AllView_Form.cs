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
        public AllView_Form()
        {
            InitializeComponent();

            Panel tmp_pn;
            for (int i = 0; i < ClassData.CMUEA; i++)
            {
                tmp_pn = (Panel)this.Controls.Find("panel" + (i+1).ToString(), true)[0];
                tmp_pn.BorderStyle = BorderStyle.FixedSingle;
                tmp_pn.Visible = true;
            }

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
    }
}
