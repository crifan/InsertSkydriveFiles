namespace InsertSkydriveFiles
{
    partial class frmSettings
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
            this.tctSettings = new System.Windows.Forms.TabControl();
            this.tpgInsertPattern = new System.Windows.Forms.TabPage();
            this.grbInsertPattern = new System.Windows.Forms.GroupBox();
            this.txbPhotoPattern = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.txbAudioPattern = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.tpgPreview = new System.Windows.Forms.TabPage();
            this.ckbPreviewPhoto = new System.Windows.Forms.CheckBox();
            this.btnSetOk = new System.Windows.Forms.Button();
            this.btnSetCancel = new System.Windows.Forms.Button();
            this.tctSettings.SuspendLayout();
            this.tpgInsertPattern.SuspendLayout();
            this.grbInsertPattern.SuspendLayout();
            this.tpgPreview.SuspendLayout();
            this.SuspendLayout();
            // 
            // tctSettings
            // 
            this.tctSettings.Controls.Add(this.tpgInsertPattern);
            this.tctSettings.Controls.Add(this.tpgPreview);
            this.tctSettings.Location = new System.Drawing.Point(12, 11);
            this.tctSettings.Name = "tctSettings";
            this.tctSettings.SelectedIndex = 0;
            this.tctSettings.Size = new System.Drawing.Size(471, 143);
            this.tctSettings.TabIndex = 0;
            // 
            // tpgInsertPattern
            // 
            this.tpgInsertPattern.Controls.Add(this.grbInsertPattern);
            this.tpgInsertPattern.Location = new System.Drawing.Point(4, 22);
            this.tpgInsertPattern.Name = "tpgInsertPattern";
            this.tpgInsertPattern.Padding = new System.Windows.Forms.Padding(3);
            this.tpgInsertPattern.Size = new System.Drawing.Size(463, 117);
            this.tpgInsertPattern.TabIndex = 0;
            this.tpgInsertPattern.Text = "Insert";
            this.tpgInsertPattern.UseVisualStyleBackColor = true;
            // 
            // grbInsertPattern
            // 
            this.grbInsertPattern.Controls.Add(this.txbPhotoPattern);
            this.grbInsertPattern.Controls.Add(this.label4);
            this.grbInsertPattern.Controls.Add(this.txbAudioPattern);
            this.grbInsertPattern.Controls.Add(this.label3);
            this.grbInsertPattern.Location = new System.Drawing.Point(9, 16);
            this.grbInsertPattern.Name = "grbInsertPattern";
            this.grbInsertPattern.Size = new System.Drawing.Size(451, 85);
            this.grbInsertPattern.TabIndex = 19;
            this.grbInsertPattern.TabStop = false;
            this.grbInsertPattern.Text = "Insert Pattern";
            // 
            // txbPhotoPattern
            // 
            this.txbPhotoPattern.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.txbPhotoPattern.ForeColor = System.Drawing.SystemColors.WindowText;
            this.txbPhotoPattern.Location = new System.Drawing.Point(54, 17);
            this.txbPhotoPattern.Name = "txbPhotoPattern";
            this.txbPhotoPattern.Size = new System.Drawing.Size(391, 23);
            this.txbPhotoPattern.TabIndex = 9;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.label4.ForeColor = System.Drawing.SystemColors.WindowText;
            this.label4.Location = new System.Drawing.Point(6, 47);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(42, 17);
            this.label4.TabIndex = 16;
            this.label4.Text = "Audio";
            // 
            // txbAudioPattern
            // 
            this.txbAudioPattern.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.txbAudioPattern.ForeColor = System.Drawing.SystemColors.WindowText;
            this.txbAudioPattern.Location = new System.Drawing.Point(54, 47);
            this.txbAudioPattern.Name = "txbAudioPattern";
            this.txbAudioPattern.Size = new System.Drawing.Size(391, 23);
            this.txbAudioPattern.TabIndex = 10;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.label3.ForeColor = System.Drawing.SystemColors.WindowText;
            this.label3.Location = new System.Drawing.Point(6, 17);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(42, 17);
            this.label3.TabIndex = 15;
            this.label3.Text = "Photo";
            // 
            // tpgPreview
            // 
            this.tpgPreview.Controls.Add(this.ckbPreviewPhoto);
            this.tpgPreview.Location = new System.Drawing.Point(4, 22);
            this.tpgPreview.Name = "tpgPreview";
            this.tpgPreview.Padding = new System.Windows.Forms.Padding(3);
            this.tpgPreview.Size = new System.Drawing.Size(463, 117);
            this.tpgPreview.TabIndex = 1;
            this.tpgPreview.Text = "Preview";
            this.tpgPreview.UseVisualStyleBackColor = true;
            // 
            // ckbPreviewPhoto
            // 
            this.ckbPreviewPhoto.AutoSize = true;
            this.ckbPreviewPhoto.Font = new System.Drawing.Font("微软雅黑", 9F);
            this.ckbPreviewPhoto.Location = new System.Drawing.Point(6, 6);
            this.ckbPreviewPhoto.Name = "ckbPreviewPhoto";
            this.ckbPreviewPhoto.Size = new System.Drawing.Size(110, 21);
            this.ckbPreviewPhoto.TabIndex = 18;
            this.ckbPreviewPhoto.Text = "preview Photo";
            this.ckbPreviewPhoto.UseVisualStyleBackColor = true;
            // 
            // btnSetOk
            // 
            this.btnSetOk.Location = new System.Drawing.Point(89, 171);
            this.btnSetOk.Name = "btnSetOk";
            this.btnSetOk.Size = new System.Drawing.Size(98, 25);
            this.btnSetOk.TabIndex = 1;
            this.btnSetOk.Text = "OK";
            this.btnSetOk.UseVisualStyleBackColor = true;
            this.btnSetOk.Click += new System.EventHandler(this.btnSetOk_Click);
            // 
            // btnSetCancel
            // 
            this.btnSetCancel.Location = new System.Drawing.Point(337, 171);
            this.btnSetCancel.Name = "btnSetCancel";
            this.btnSetCancel.Size = new System.Drawing.Size(98, 25);
            this.btnSetCancel.TabIndex = 1;
            this.btnSetCancel.Text = "Cancel";
            this.btnSetCancel.UseVisualStyleBackColor = true;
            // 
            // frmSettings
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(497, 208);
            this.Controls.Add(this.btnSetCancel);
            this.Controls.Add(this.btnSetOk);
            this.Controls.Add(this.tctSettings);
            this.Name = "frmSettings";
            this.Text = "Settings";
            this.Load += new System.EventHandler(this.frmSettings_Load);
            this.tctSettings.ResumeLayout(false);
            this.tpgInsertPattern.ResumeLayout(false);
            this.grbInsertPattern.ResumeLayout(false);
            this.grbInsertPattern.PerformLayout();
            this.tpgPreview.ResumeLayout(false);
            this.tpgPreview.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TabControl tctSettings;
        private System.Windows.Forms.TabPage tpgInsertPattern;
        private System.Windows.Forms.TabPage tpgPreview;
        private System.Windows.Forms.Button btnSetOk;
        private System.Windows.Forms.Button btnSetCancel;
        private System.Windows.Forms.GroupBox grbInsertPattern;
        //private System.Windows.Forms.TextBox txbSufPhoto;
        //private System.Windows.Forms.TextBox txbPrePhoto;
        public System.Windows.Forms.TextBox txbPhotoPattern;
        private System.Windows.Forms.Label label4;
        //private System.Windows.Forms.TextBox txbPreAudio;
        //private System.Windows.Forms.TextBox txbSufAudio;
        public System.Windows.Forms.TextBox txbAudioPattern;
        private System.Windows.Forms.Label label3;
        //private System.Windows.Forms.CheckBox ckbPreviewPhoto;
        public System.Windows.Forms.CheckBox ckbPreviewPhoto;
    }
}