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
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.rtbUsage = new System.Windows.Forms.RichTextBox();
            this.rtbAbout = new System.Windows.Forms.RichTextBox();
            this.grpAbout.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.SuspendLayout();
            // 
            // grpAbout
            // 
            this.grpAbout.Controls.Add(this.rtbAbout);
            resources.ApplyResources(this.grpAbout, "grpAbout");
            this.grpAbout.Name = "grpAbout";
            this.grpAbout.TabStop = false;
            // 
            // groupBox2
            // 
            resources.ApplyResources(this.groupBox2, "groupBox2");
            this.groupBox2.Controls.Add(this.rtbUsage);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.TabStop = false;
            // 
            // rtbUsage
            // 
            this.rtbUsage.BackColor = System.Drawing.SystemColors.Control;
            this.rtbUsage.BorderStyle = System.Windows.Forms.BorderStyle.None;
            resources.ApplyResources(this.rtbUsage, "rtbUsage");
            this.rtbUsage.EnableAutoDragDrop = true;
            this.rtbUsage.Name = "rtbUsage";
            this.rtbUsage.ReadOnly = true;
            this.rtbUsage.LinkClicked += new System.Windows.Forms.LinkClickedEventHandler(this.rtbUsage_LinkClicked);
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
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.grpAbout);
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "frmReadme";
            this.TopMost = true;
            this.grpAbout.ResumeLayout(false);
            this.groupBox2.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.GroupBox grpAbout;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.RichTextBox rtbUsage;
        private System.Windows.Forms.RichTextBox rtbAbout;
    }
}