namespace InsertSkydriveFiles
{
    partial class frmReadme
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(frmReadme));
            this.grpAbout = new System.Windows.Forms.GroupBox();
            this.rtbAbout = new System.Windows.Forms.RichTextBox();
            this.grpAbout.SuspendLayout();
            this.SuspendLayout();
            // 
            // grpAbout
            // 
            this.grpAbout.Controls.Add(this.rtbAbout);
            resources.ApplyResources(this.grpAbout, "grpAbout");
            this.grpAbout.Name = "grpAbout";
            this.grpAbout.TabStop = false;
            // 
            // rtbAbout
            // 
            this.rtbAbout.BackColor = System.Drawing.SystemColors.Control;
            this.rtbAbout.BorderStyle = System.Windows.Forms.BorderStyle.None;
            resources.ApplyResources(this.rtbAbout, "rtbAbout");
            this.rtbAbout.Name = "rtbAbout";
            this.rtbAbout.ReadOnly = true;
            this.rtbAbout.LinkClicked += new System.Windows.Forms.LinkClickedEventHandler(this.rtbAbout_LinkClicked);
            // 
            // frmReadme
            // 
            resources.ApplyResources(this, "$this");
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.grpAbout);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.Fixed3D;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "frmReadme";
            this.grpAbout.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox grpAbout;
        private System.Windows.Forms.RichTextBox rtbAbout;
    }
}