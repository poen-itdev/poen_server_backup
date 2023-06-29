using System;
using System.Drawing;

namespace CustomControls1
{
    /// <summary>
    /// A simple SkinSettings class.
    /// This could be extended to support more control colors.
    /// </summary>
    public static class SkinSettings
    {
        public static Color FormBackColor { get; set; }
        public static Color FormForeColor { get; set; }
        public static Color FontColor { get; set; }

        /// <summary>
        /// Initialize, blue theme is default.
        /// </summary>
        static SkinSettings()
        {
            SetBlueTheme();
        }

        public static void SetBlueTheme()
        {
            FormBackColor = Color.FromArgb(50, 100, 150);
            FormForeColor = Color.DarkBlue;
            FontColor = Color.LightGray;
        }

        public static void SetGrayTheme()
        {
            FormBackColor = Color.FromArgb(200, 200, 200);
            FormForeColor = Color.Black;
            FontColor = Color.Black;
        }

        /// <summary>
        /// Calculate the disabled color.
        /// </summary>
        /// <param name="color">The color.</param>
        /// <returns>The disabled (lighter) color.</returns>
        public static Color ColorDisabled(Color color)
        {
            int red = Math.Min(255, color.R + 40);
            int green = Math.Min(255, color.G + 40);
            int blue = Math.Min(255, color.B + 40);

            return Color.FromArgb(red, green, blue);
        }
    }
}
