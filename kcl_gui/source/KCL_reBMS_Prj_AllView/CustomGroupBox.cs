
namespace CustomControls1
{
    using System;
    using System.Drawing;
    using System.Windows.Forms;
 
    /// <summary>
    /// Custom group box which supports SkinSettings.
    /// Created as a normal class which inherits from GroupBox.
    /// <see cref="SetEventHandlers"/> is called to handle RadioButtons and CheckBoxes correctly.
    /// </summary>
    public class CustomGroupBox : GroupBox
    {
        /// <summary>
        /// Value indicating whether the GroupBox is enabled.
        /// </summary>
        private bool enabled = true;

        private bool setEventHandlers;

        public CustomGroupBox()
        {
            this.ForeColor = SkinSettings.FormForeColor;
        }
 
        /// <summary>
        /// Gets or sets a value indicating whether the GroupBox is enabled.
        /// Overrides the default property and draws controls in <see cref="ColorDisabled"/> color.
        /// </summary>
        public new bool Enabled
        {
            get
            {
                return this.enabled;
            }
 
            set
            {
                this.enabled = value;
                this.UpdateControls(value);
            }
        }
 
        /// <summary>
        /// Gets or sets the radiobutton count for programmatically added radiobuttons.
        /// </summary>
        public int RadioCount { get; set; }
 
        /// <summary>
        /// Provides a way to add radiobuttons programmatically.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="text">The text.</param>
        public void AddRadiobutton(string name, string text)
        {
            this.RadioCount++;
            var radio = new RadioButton();
            radio.Name = name;
            radio.Text = text;
            radio.Left = 10;
            radio.Top = this.RadioCount * 20;
            this.Controls.Add(radio);
        }
 
        /// <summary>
        /// Set controls to disabled or enabled color.
        /// </summary>
        /// <param name="enabledLocal">True or false.</param>
        private void UpdateControls(bool enabledLocal)
        {
            if (enabledLocal)
            {
                // Set to default Color.
                this.ForeColor = SkinSettings.FontColor;
            }
            else
            {
                this.ForeColor = SkinSettings.ColorDisabled(this.BackColor);
            }
 
            foreach (var control in this.Controls)
            {
                if (control is TextBox)
                {
                    var txt = control as TextBox;
                    txt.Enabled = enabledLocal;
                }
 
                if (control is Button)
                {
                    var btn = control as Button;
                    btn.Enabled = enabledLocal;
                }
            }
        }
 
        /// <summary>
        /// Custom CheckBox handler.
        /// Only when GroupBox is enabled: check CheckBox.
        /// </summary>
        /// <param name="sender">The CheckBox object.</param>
        /// <param name="e">The Event Args.</param>
        private void CheckBoxClick(object sender, EventArgs e)
        {
            var cb = sender as CheckBox;
 
            if (this.enabled && cb != null)
            {
                cb.Checked = !cb.Checked;
            }
        }
 
        /// <summary>
        /// Radio button click, when GroupBox enabled: check only one of the radiobuttons.
        /// </summary>
        /// <param name="sender">The sender.</param>
        /// <param name="e">The event args.</param>
        private void RadioButtonClick(object sender, EventArgs e)
        {
            var rb = sender as RadioButton;
 
            if (this.enabled && rb != null)
            {
                foreach (var control in rb.Parent.Controls)
                {
                    // Reset all RadioButtons.
                    if (control is RadioButton)
                    {
                        var rb2 = control as RadioButton;
                        rb2.Checked = false;
                    }
                }
 
                rb.Checked = true;
            }
        }

        /// <summary>
        /// On GroupBox activated set the event handlers.
        /// </summary>
        protected override void OnEnter(EventArgs e)
        {
            if (!setEventHandlers)
            {
                this.SetEventHandlers();
            }

            base.OnEnter(e);
        }

        /// <summary>
        /// Set event handlers for RadioButtons and CheckBoxes in GroupBox.
        /// Also sets AutoCheck property to false.
        /// It is important to set the RadioButton.AutoCheck property to false, as we 
        /// are handling the Click event in a custom way.
        /// </summary>
        private void SetEventHandlers()
        {
            this.setEventHandlers = true;

            foreach (var control in this.Controls)
            {
                if (control is CheckBox)
                {
                    var chk = control as CheckBox;
                    chk.AutoCheck = false;
                    chk.Click += new System.EventHandler(this.CheckBoxClick);
                }

                if (control is RadioButton)
                {
                    var rb = control as RadioButton;
                    rb.AutoCheck = false;
                    rb.Click += new System.EventHandler(this.RadioButtonClick);
                }
            }
        }
    }
}
 