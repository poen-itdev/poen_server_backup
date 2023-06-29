
namespace KCL_reBMS_Prj
{
    partial class MainForm
    {
        /// <summary>
        /// 필수 디자이너 변수입니다.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 사용 중인 모든 리소스를 정리합니다.
        /// </summary>
        /// <param name="disposing">관리되는 리소스를 삭제해야 하면 true이고, 그렇지 않으면 false입니다.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form 디자이너에서 생성한 코드

        /// <summary>
        /// 디자이너 지원에 필요한 메서드입니다. 
        /// 이 메서드의 내용을 코드 편집기로 수정하지 마세요.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.timer1 = new System.Windows.Forms.Timer(this.components);
            this.pbPoenLogo = new System.Windows.Forms.PictureBox();
            this.backgroundWorker1 = new System.ComponentModel.BackgroundWorker();
            this.tabPage4 = new System.Windows.Forms.TabPage();
            this.gbConnection = new System.Windows.Forms.GroupBox();
            this.btConnect = new System.Windows.Forms.Button();
            this.cbPort = new System.Windows.Forms.ComboBox();
            this.tcBMS = new System.Windows.Forms.TabControl();
            ((System.ComponentModel.ISupportInitialize)(this.pbPoenLogo)).BeginInit();
            this.tabPage4.SuspendLayout();
            this.gbConnection.SuspendLayout();
            this.tcBMS.SuspendLayout();
            this.SuspendLayout();
            // 
            // timer1
            // 
            this.timer1.Enabled = true;
            this.timer1.Tick += new System.EventHandler(this.timer1_Tick);
            // 
            // pbPoenLogo
            // 
            this.pbPoenLogo.BackColor = System.Drawing.Color.Linen;
            this.pbPoenLogo.Dock = System.Windows.Forms.DockStyle.Top;
            this.pbPoenLogo.Location = new System.Drawing.Point(0, 0);
            this.pbPoenLogo.Name = "pbPoenLogo";
            this.pbPoenLogo.Size = new System.Drawing.Size(339, 140);
            this.pbPoenLogo.TabIndex = 0;
            this.pbPoenLogo.TabStop = false;
            // 
            // tabPage4
            // 
            this.tabPage4.Controls.Add(this.gbConnection);
            this.tabPage4.Location = new System.Drawing.Point(4, 22);
            this.tabPage4.Name = "tabPage4";
            this.tabPage4.Size = new System.Drawing.Size(273, 180);
            this.tabPage4.TabIndex = 2;
            this.tabPage4.Text = "Setting";
            this.tabPage4.UseVisualStyleBackColor = true;
            // 
            // gbConnection
            // 
            this.gbConnection.BackColor = System.Drawing.Color.Azure;
            this.gbConnection.Controls.Add(this.btConnect);
            this.gbConnection.Controls.Add(this.cbPort);
            this.gbConnection.Font = new System.Drawing.Font("굴림", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.gbConnection.Location = new System.Drawing.Point(14, 16);
            this.gbConnection.Name = "gbConnection";
            this.gbConnection.Size = new System.Drawing.Size(240, 140);
            this.gbConnection.TabIndex = 20;
            this.gbConnection.TabStop = false;
            this.gbConnection.Text = "Connection";
            // 
            // btConnect
            // 
            this.btConnect.Location = new System.Drawing.Point(21, 77);
            this.btConnect.Name = "btConnect";
            this.btConnect.Size = new System.Drawing.Size(199, 36);
            this.btConnect.TabIndex = 1;
            this.btConnect.Text = "연결 하기";
            this.btConnect.UseVisualStyleBackColor = true;
            this.btConnect.Click += new System.EventHandler(this.btConnect_Click);
            // 
            // cbPort
            // 
            this.cbPort.Font = new System.Drawing.Font("굴림", 15F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.cbPort.FormattingEnabled = true;
            this.cbPort.Items.AddRange(new object[] {
            "COM1",
            "COM2",
            "COM3",
            "COM4",
            "COM5",
            "COM6",
            "COM7",
            "COM8",
            "COM9",
            "COM10",
            "COM11",
            "COM12",
            "COM13",
            "COM14",
            "COM15",
            "COM16",
            "COM17",
            "COM18",
            "COM19",
            "COM20",
            "COM21",
            "COM22",
            "COM23",
            "COM24",
            "COM25",
            "COM26",
            "COM27",
            "COM28",
            "COM29",
            "COM30"});
            this.cbPort.Location = new System.Drawing.Point(21, 41);
            this.cbPort.Name = "cbPort";
            this.cbPort.Size = new System.Drawing.Size(199, 28);
            this.cbPort.TabIndex = 0;
            this.cbPort.Text = "COM1";
            // 
            // tcBMS
            // 
            this.tcBMS.Controls.Add(this.tabPage4);
            this.tcBMS.Location = new System.Drawing.Point(30, 146);
            this.tcBMS.Name = "tcBMS";
            this.tcBMS.SelectedIndex = 0;
            this.tcBMS.Size = new System.Drawing.Size(281, 206);
            this.tcBMS.TabIndex = 3;
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.AutoScroll = true;
            this.BackColor = System.Drawing.Color.Azure;
            this.ClientSize = new System.Drawing.Size(339, 369);
            this.Controls.Add(this.tcBMS);
            this.Controls.Add(this.pbPoenLogo);
            this.Name = "MainForm";
            this.ShowIcon = false;
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.Paint += new System.Windows.Forms.PaintEventHandler(this.Form1_Paint);
            this.Resize += new System.EventHandler(this.Form1_Resize);
            ((System.ComponentModel.ISupportInitialize)(this.pbPoenLogo)).EndInit();
            this.tabPage4.ResumeLayout(false);
            this.gbConnection.ResumeLayout(false);
            this.tcBMS.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.PictureBox pbPoenLogo;
        private System.Windows.Forms.Timer timer1;
        private System.ComponentModel.BackgroundWorker backgroundWorker1;
        private System.Windows.Forms.TabPage tabPage4;
        private System.Windows.Forms.GroupBox gbConnection;
        private System.Windows.Forms.Button btConnect;
        private System.Windows.Forms.ComboBox cbPort;
        private System.Windows.Forms.TabControl tcBMS;
    }
}

