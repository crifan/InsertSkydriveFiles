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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(frmSettings));
            this.tctSettings = new System.Windows.Forms.TabControl();
            this.tpgInsertPattern = new System.Windows.Forms.TabPage();
            this.ckbInsertFolder = new System.Windows.Forms.CheckBox();
            this.grbInsertPattern = new System.Windows.Forms.GroupBox();
            this.txbPhotoPattern = new System.Windows.Forms.TextBox();
            this.lblOther = new System.Windows.Forms.Label();
            this.lblVideo = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.txbOtherPattern = new System.Windows.Forms.TextBox();
            this.txbVideoPattern = new System.Windows.Forms.TextBox();
            this.txbAudioPattern = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.tpgPreview = new System.Windows.Forms.TabPage();
            this.ckbPreviewPhoto = new System.Windows.Forms.CheckBox();
            this.tpgUpload = new System.Windows.Forms.TabPage();
            this.ckbAutoHandleFilename = new System.Windows.Forms.CheckBox();
            this.ckbOverwrite = new System.Windows.Forms.CheckBox();
            this.tpgFindUpRep = new System.Windows.Forms.TabPage();
            this.ckbOpenInNewWin = new System.Windows.Forms.CheckBox();
            this.tpgFileType = new System.Windows.Forms.TabPage();
            this.grbAddFileSuf = new System.Windows.Forms.GroupBox();
            this.txbSufPhoto = new System.Windows.Forms.TextBox();
            this.lblSufVideo = new System.Windows.Forms.Label();
            this.lblSufAudio = new System.Windows.Forms.Label();
            this.txbSufVideo = new System.Windows.Forms.TextBox();
            this.txbSufAudio = new System.Windows.Forms.TextBox();
            this.lblSufPhoto = new System.Windows.Forms.Label();
            this.btnSetOk = new System.Windows.Forms.Button();
            this.btnSetCancel = new System.Windows.Forms.Button();
            this.tctSettings.SuspendLayout();
            this.tpgInsertPattern.SuspendLayout();
            this.grbInsertPattern.SuspendLayout();
            this.tpgPreview.SuspendLayout();
            this.tpgUpload.SuspendLayout();
            this.tpgFindUpRep.SuspendLayout();
            this.tpgFileType.SuspendLayout();
            this.grbAddFileSuf.SuspendLayout();
            this.SuspendLayout();
            // 
            // tctSettings
            // 
            this.tctSettings.Controls.Add(this.tpgInsertPattern);
            this.tctSettings.Controls.Add(this.tpgPreview);
            this.tctSettings.Controls.Add(this.tpgUpload);
            this.tctSettings.Controls.Add(this.tpgFindUpRep);
            this.tctSettings.Controls.Add(this.tpgFileType);
            this.tctSettings.Location = new System.Drawing.Point(12, 11);
            this.tctSettings.Name = "tctSettings";
            this.tctSettings.SelectedIndex = 0;
            this.tctSettings.ShowToolTips = true;
            this.tctSettings.Size = new System.Drawing.Size(471, 383);
            this.tctSettings.TabIndex = 0;
            // 
            // tpgInsertPattern
            // 
            this.tpgInsertPattern.Controls.Add(this.ckbInsertFolder);
            this.tpgInsertPattern.Controls.Add(this.grbInsertPattern);
            this.tpgInsertPattern.Location = new System.Drawing.Point(4, 22);
            this.tpgInsertPattern.Name = "tpgInsertPattern";
            this.tpgInsertPattern.Padding = new System.Windows.Forms.Padding(3);
            this.tpgInsertPattern.Size = new System.Drawing.Size(463, 357);
            this.tpgInsertPattern.TabIndex = 0;
            this.tpgInsertPattern.Text = "Insert";
            this.tpgInsertPattern.UseVisualStyleBackColor = true;
            this.tpgInsertPattern.MouseHover += new System.EventHandler(this.tpgInsertPattern_MouseHover);
            // 
            // ckbInsertFolder
            // 
            this.ckbInsertFolder.AutoSize = true;
            this.ckbInsertFolder.Font = new System.Drawing.Font("微软雅黑", 9F);
            this.ckbInsertFolder.Location = new System.Drawing.Point(9, 324);
            this.ckbInsertFolder.Name = "ckbInsertFolder";
            this.ckbInsertFolder.Size = new System.Drawing.Size(151, 21);
            this.ckbInsertFolder.TabIndex = 20;
            this.ckbInsertFolder.Text = "Insert selected folder";
            this.ckbInsertFolder.UseVisualStyleBackColor = true;
            // 
            // grbInsertPattern
            // 
            this.grbInsertPattern.Controls.Add(this.txbPhotoPattern);
            this.grbInsertPattern.Controls.Add(this.lblOther);
            this.grbInsertPattern.Controls.Add(this.lblVideo);
            this.grbInsertPattern.Controls.Add(this.label4);
            this.grbInsertPattern.Controls.Add(this.txbOtherPattern);
            this.grbInsertPattern.Controls.Add(this.txbVideoPattern);
            this.grbInsertPattern.Controls.Add(this.txbAudioPattern);
            this.grbInsertPattern.Controls.Add(this.label3);
            this.grbInsertPattern.Location = new System.Drawing.Point(9, 16);
            this.grbInsertPattern.Name = "grbInsertPattern";
            this.grbInsertPattern.Size = new System.Drawing.Size(451, 277);
            this.grbInsertPattern.TabIndex = 19;
            this.grbInsertPattern.TabStop = false;
            this.grbInsertPattern.Text = "File Insert Pattern";
            // 
            // txbPhotoPattern
            // 
            this.txbPhotoPattern.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.txbPhotoPattern.ForeColor = System.Drawing.SystemColors.WindowText;
            this.txbPhotoPattern.Location = new System.Drawing.Point(54, 17);
            this.txbPhotoPattern.Multiline = true;
            this.txbPhotoPattern.Name = "txbPhotoPattern";
            this.txbPhotoPattern.Size = new System.Drawing.Size(391, 58);
            this.txbPhotoPattern.TabIndex = 9;
            // 
            // lblOther
            // 
            this.lblOther.AutoSize = true;
            this.lblOther.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.lblOther.ForeColor = System.Drawing.SystemColors.WindowText;
            this.lblOther.Location = new System.Drawing.Point(6, 226);
            this.lblOther.Name = "lblOther";
            this.lblOther.Size = new System.Drawing.Size(47, 17);
            this.lblOther.TabIndex = 16;
            this.lblOther.Text = "Others";
            // 
            // lblVideo
            // 
            this.lblVideo.AutoSize = true;
            this.lblVideo.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.lblVideo.ForeColor = System.Drawing.SystemColors.WindowText;
            this.lblVideo.Location = new System.Drawing.Point(6, 162);
            this.lblVideo.Name = "lblVideo";
            this.lblVideo.Size = new System.Drawing.Size(42, 17);
            this.lblVideo.TabIndex = 16;
            this.lblVideo.Text = "Video";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.label4.ForeColor = System.Drawing.SystemColors.WindowText;
            this.label4.Location = new System.Drawing.Point(6, 99);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(42, 17);
            this.label4.TabIndex = 16;
            this.label4.Text = "Audio";
            // 
            // txbOtherPattern
            // 
            this.txbOtherPattern.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.txbOtherPattern.ForeColor = System.Drawing.SystemColors.WindowText;
            this.txbOtherPattern.Location = new System.Drawing.Point(54, 208);
            this.txbOtherPattern.Multiline = true;
            this.txbOtherPattern.Name = "txbOtherPattern";
            this.txbOtherPattern.Size = new System.Drawing.Size(391, 58);
            this.txbOtherPattern.TabIndex = 10;
            // 
            // txbVideoPattern
            // 
            this.txbVideoPattern.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.txbVideoPattern.ForeColor = System.Drawing.SystemColors.WindowText;
            this.txbVideoPattern.Location = new System.Drawing.Point(54, 144);
            this.txbVideoPattern.Multiline = true;
            this.txbVideoPattern.Name = "txbVideoPattern";
            this.txbVideoPattern.Size = new System.Drawing.Size(391, 58);
            this.txbVideoPattern.TabIndex = 10;
            // 
            // txbAudioPattern
            // 
            this.txbAudioPattern.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.txbAudioPattern.ForeColor = System.Drawing.SystemColors.WindowText;
            this.txbAudioPattern.Location = new System.Drawing.Point(54, 80);
            this.txbAudioPattern.Multiline = true;
            this.txbAudioPattern.Name = "txbAudioPattern";
            this.txbAudioPattern.Size = new System.Drawing.Size(391, 58);
            this.txbAudioPattern.TabIndex = 10;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.label3.ForeColor = System.Drawing.SystemColors.WindowText;
            this.label3.Location = new System.Drawing.Point(6, 33);
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
            this.tpgPreview.Size = new System.Drawing.Size(463, 357);
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
            this.ckbPreviewPhoto.Size = new System.Drawing.Size(110, 19);
            this.ckbPreviewPhoto.TabIndex = 18;
            this.ckbPreviewPhoto.Text = "preview Photo";
            this.ckbPreviewPhoto.UseVisualStyleBackColor = true;
            // 
            // tpgUpload
            // 
            this.tpgUpload.Controls.Add(this.ckbAutoHandleFilename);
            this.tpgUpload.Controls.Add(this.ckbOverwrite);
            this.tpgUpload.Location = new System.Drawing.Point(4, 22);
            this.tpgUpload.Name = "tpgUpload";
            this.tpgUpload.Padding = new System.Windows.Forms.Padding(3);
            this.tpgUpload.Size = new System.Drawing.Size(463, 357);
            this.tpgUpload.TabIndex = 2;
            this.tpgUpload.Text = "Upload";
            this.tpgUpload.UseVisualStyleBackColor = true;
            // 
            // ckbAutoHandleFilename
            // 
            this.ckbAutoHandleFilename.AutoSize = true;
            this.ckbAutoHandleFilename.Font = new System.Drawing.Font("微软雅黑", 9F);
            this.ckbAutoHandleFilename.Location = new System.Drawing.Point(6, 30);
            this.ckbAutoHandleFilename.Name = "ckbAutoHandleFilename";
            this.ckbAutoHandleFilename.Size = new System.Drawing.Size(279, 19);
            this.ckbAutoHandleFilename.TabIndex = 20;
            this.ckbAutoHandleFilename.Text = "Auto handle invalid char in upload filename";
            this.ckbAutoHandleFilename.UseVisualStyleBackColor = true;
            // 
            // ckbOverwrite
            // 
            this.ckbOverwrite.AutoSize = true;
            this.ckbOverwrite.Font = new System.Drawing.Font("微软雅黑", 9F);
            this.ckbOverwrite.Location = new System.Drawing.Point(6, 6);
            this.ckbOverwrite.Name = "ckbOverwrite";
            this.ckbOverwrite.Size = new System.Drawing.Size(192, 19);
            this.ckbOverwrite.TabIndex = 19;
            this.ckbOverwrite.Text = "Overwrite if file already exist";
            this.ckbOverwrite.UseVisualStyleBackColor = true;
            // 
            // tpgFindUpRep
            // 
            this.tpgFindUpRep.Controls.Add(this.ckbOpenInNewWin);
            this.tpgFindUpRep.Location = new System.Drawing.Point(4, 22);
            this.tpgFindUpRep.Name = "tpgFindUpRep";
            this.tpgFindUpRep.Padding = new System.Windows.Forms.Padding(3);
            this.tpgFindUpRep.Size = new System.Drawing.Size(463, 357);
            this.tpgFindUpRep.TabIndex = 3;
            this.tpgFindUpRep.Text = "Find&Upload&Replace";
            this.tpgFindUpRep.UseVisualStyleBackColor = true;
            // 
            // ckbOpenInNewWin
            // 
            this.ckbOpenInNewWin.AutoSize = true;
            this.ckbOpenInNewWin.Font = new System.Drawing.Font("微软雅黑", 9F);
            this.ckbOpenInNewWin.Location = new System.Drawing.Point(6, 6);
            this.ckbOpenInNewWin.Name = "ckbOpenInNewWin";
            this.ckbOpenInNewWin.Size = new System.Drawing.Size(278, 19);
            this.ckbOpenInNewWin.TabIndex = 20;
            this.ckbOpenInNewWin.Text = "set replaced picture \"Open in new window\"";
            this.ckbOpenInNewWin.UseVisualStyleBackColor = true;
            // 
            // tpgFileType
            // 
            this.tpgFileType.Controls.Add(this.grbAddFileSuf);
            this.tpgFileType.Location = new System.Drawing.Point(4, 22);
            this.tpgFileType.Name = "tpgFileType";
            this.tpgFileType.Padding = new System.Windows.Forms.Padding(3);
            this.tpgFileType.Size = new System.Drawing.Size(463, 357);
            this.tpgFileType.TabIndex = 4;
            this.tpgFileType.Text = "FileType";
            this.tpgFileType.UseVisualStyleBackColor = true;
            // 
            // grbAddFileSuf
            // 
            this.grbAddFileSuf.Controls.Add(this.txbSufPhoto);
            this.grbAddFileSuf.Controls.Add(this.lblSufVideo);
            this.grbAddFileSuf.Controls.Add(this.lblSufAudio);
            this.grbAddFileSuf.Controls.Add(this.txbSufVideo);
            this.grbAddFileSuf.Controls.Add(this.txbSufAudio);
            this.grbAddFileSuf.Controls.Add(this.lblSufPhoto);
            this.grbAddFileSuf.Location = new System.Drawing.Point(6, 6);
            this.grbAddFileSuf.Name = "grbAddFileSuf";
            this.grbAddFileSuf.Size = new System.Drawing.Size(451, 210);
            this.grbAddFileSuf.TabIndex = 20;
            this.grbAddFileSuf.TabStop = false;
            this.grbAddFileSuf.Text = "Additional File Suffix";
            // 
            // txbSufPhoto
            // 
            this.txbSufPhoto.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.txbSufPhoto.ForeColor = System.Drawing.SystemColors.WindowText;
            this.txbSufPhoto.Location = new System.Drawing.Point(54, 17);
            this.txbSufPhoto.Multiline = true;
            this.txbSufPhoto.Name = "txbSufPhoto";
            this.txbSufPhoto.Size = new System.Drawing.Size(391, 58);
            this.txbSufPhoto.TabIndex = 9;
            // 
            // lblSufVideo
            // 
            this.lblSufVideo.AutoSize = true;
            this.lblSufVideo.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.lblSufVideo.ForeColor = System.Drawing.SystemColors.WindowText;
            this.lblSufVideo.Location = new System.Drawing.Point(6, 162);
            this.lblSufVideo.Name = "lblSufVideo";
            this.lblSufVideo.Size = new System.Drawing.Size(42, 17);
            this.lblSufVideo.TabIndex = 16;
            this.lblSufVideo.Text = "Video";
            // 
            // lblSufAudio
            // 
            this.lblSufAudio.AutoSize = true;
            this.lblSufAudio.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.lblSufAudio.ForeColor = System.Drawing.SystemColors.WindowText;
            this.lblSufAudio.Location = new System.Drawing.Point(6, 99);
            this.lblSufAudio.Name = "lblSufAudio";
            this.lblSufAudio.Size = new System.Drawing.Size(42, 17);
            this.lblSufAudio.TabIndex = 16;
            this.lblSufAudio.Text = "Audio";
            // 
            // txbSufVideo
            // 
            this.txbSufVideo.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.txbSufVideo.ForeColor = System.Drawing.SystemColors.WindowText;
            this.txbSufVideo.Location = new System.Drawing.Point(54, 144);
            this.txbSufVideo.Multiline = true;
            this.txbSufVideo.Name = "txbSufVideo";
            this.txbSufVideo.Size = new System.Drawing.Size(391, 58);
            this.txbSufVideo.TabIndex = 10;
            // 
            // txbSufAudio
            // 
            this.txbSufAudio.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.txbSufAudio.ForeColor = System.Drawing.SystemColors.WindowText;
            this.txbSufAudio.Location = new System.Drawing.Point(54, 80);
            this.txbSufAudio.Multiline = true;
            this.txbSufAudio.Name = "txbSufAudio";
            this.txbSufAudio.Size = new System.Drawing.Size(391, 58);
            this.txbSufAudio.TabIndex = 10;
            // 
            // lblSufPhoto
            // 
            this.lblSufPhoto.AutoSize = true;
            this.lblSufPhoto.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.lblSufPhoto.ForeColor = System.Drawing.SystemColors.WindowText;
            this.lblSufPhoto.Location = new System.Drawing.Point(6, 33);
            this.lblSufPhoto.Name = "lblSufPhoto";
            this.lblSufPhoto.Size = new System.Drawing.Size(42, 17);
            this.lblSufPhoto.TabIndex = 15;
            this.lblSufPhoto.Text = "Photo";
            // 
            // btnSetOk
            // 
            this.btnSetOk.Location = new System.Drawing.Point(89, 400);
            this.btnSetOk.Name = "btnSetOk";
            this.btnSetOk.Size = new System.Drawing.Size(98, 25);
            this.btnSetOk.TabIndex = 1;
            this.btnSetOk.Text = "OK";
            this.btnSetOk.UseVisualStyleBackColor = true;
            this.btnSetOk.Click += new System.EventHandler(this.btnSetOk_Click);
            // 
            // btnSetCancel
            // 
            this.btnSetCancel.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.btnSetCancel.Location = new System.Drawing.Point(326, 400);
            this.btnSetCancel.Name = "btnSetCancel";
            this.btnSetCancel.Size = new System.Drawing.Size(98, 25);
            this.btnSetCancel.TabIndex = 1;
            this.btnSetCancel.Text = "Cancel";
            this.btnSetCancel.UseVisualStyleBackColor = true;
            this.btnSetCancel.Click += new System.EventHandler(this.btnSetCancel_Click);
            // 
            // frmSettings
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.CancelButton = this.btnSetCancel;
            this.ClientSize = new System.Drawing.Size(506, 436);
            this.Controls.Add(this.btnSetCancel);
            this.Controls.Add(this.btnSetOk);
            this.Controls.Add(this.tctSettings);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.Fixed3D;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MaximizeBox = false;
            this.Name = "frmSettings";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Settings";
            this.Load += new System.EventHandler(this.frmSettings_Load);
            this.tctSettings.ResumeLayout(false);
            this.tpgInsertPattern.ResumeLayout(false);
            this.tpgInsertPattern.PerformLayout();
            this.grbInsertPattern.ResumeLayout(false);
            this.grbInsertPattern.PerformLayout();
            this.tpgPreview.ResumeLayout(false);
            this.tpgPreview.PerformLayout();
            this.tpgUpload.ResumeLayout(false);
            this.tpgUpload.PerformLayout();
            this.tpgFindUpRep.ResumeLayout(false);
            this.tpgFindUpRep.PerformLayout();
            this.tpgFileType.ResumeLayout(false);
            this.grbAddFileSuf.ResumeLayout(false);
            this.grbAddFileSuf.PerformLayout();
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
        private System.Windows.Forms.CheckBox ckbInsertFolder;
        private System.Windows.Forms.TabPage tpgUpload;
        public System.Windows.Forms.CheckBox ckbAutoHandleFilename;
        public System.Windows.Forms.CheckBox ckbOverwrite;
        private System.Windows.Forms.Label lblVideo;
        public System.Windows.Forms.TextBox txbVideoPattern;
        private System.Windows.Forms.Label lblOther;
        public System.Windows.Forms.TextBox txbOtherPattern;
        private System.Windows.Forms.TabPage tpgFindUpRep;
        public System.Windows.Forms.CheckBox ckbOpenInNewWin;
        private System.Windows.Forms.TabPage tpgFileType;
        private System.Windows.Forms.GroupBox grbAddFileSuf;
        public System.Windows.Forms.TextBox txbSufPhoto;
        private System.Windows.Forms.Label lblSufVideo;
        private System.Windows.Forms.Label lblSufAudio;
        public System.Windows.Forms.TextBox txbSufVideo;
        public System.Windows.Forms.TextBox txbSufAudio;
        private System.Windows.Forms.Label lblSufPhoto;
    }
}