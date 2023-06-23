using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Runtime.InteropServices;
using System.IO;

namespace UserLED1
{
    public partial class UserLED1: PictureBox
    {
        public const string RESOURCE_PATH = "\\resource\\";
        public UserLED1()
        {
            InitializeComponent();
            //currentImage = normalImage;
            currentImage = hoverImage;
        }

        private Image normalImage;
        private Image hoverImage;
        private Image currentImage;

        public Image NormalImage
        {
            get { return normalImage; }
            set { normalImage = value; }
        }

        public Image HoverImage
        {
            get { return hoverImage; }
            set { hoverImage = value; }
        }

        public void Set_Image(UInt16 value)
        {
            if(value == 1)
            {                
                this.Image = hoverImage; // OFF
                currentImage = hoverImage;
            }
            else
            {
                this.Image = normalImage; //ON
                currentImage = normalImage;
            }
        }

        public UInt16 get_Image()
        {
            UInt16 tmp = 0;
            if (this.Image == normalImage)
                tmp = 0;
            else
                tmp = 1;
            return tmp;
        }

        public void Toggle_Image()
        {
            if(this.Image == hoverImage)
            {
                this.Image = normalImage;
            }
            else
            {
                this.Image = hoverImage;
            }
        }

        private void UserControl1_Load(object sender, EventArgs e)
        {

        }

        private void UserLED1_MouseHover(object sender, EventArgs e)
        {
          //  this.Image = hoverImage;
        }

        private void UserLED1_MouseLeave(object sender, EventArgs e)
        {
           // this.Image = normalImage;
        }
    }
}
