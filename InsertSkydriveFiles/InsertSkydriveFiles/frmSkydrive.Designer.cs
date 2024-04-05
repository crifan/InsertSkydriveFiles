namespace InsertSkydriveFiles
{
    partial class frmInsertSkydriveFile
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
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(frmInsertSkydriveFile));
            this.btnLogin = new System.Windows.Forms.Button();
            this.txbInfo = new System.Windows.Forms.TextBox();
            this.trvSkydrive = new System.Windows.Forms.TreeView();
            this.iglIcons = new System.Windows.Forms.ImageList(this.components);
            this.txbSkydriveFolderUrl = new System.Windows.Forms.TextBox();
            this.grbView = new System.Windows.Forms.GroupBox();
            this.grbPreview = new System.Windows.Forms.GroupBox();
            this.pcbPic = new System.Windows.Forms.PictureBox();
            this.btnInsert = new System.Windows.Forms.Button();
            this.grbInfo = new System.Windows.Forms.GroupBox();
            this.btnReadme = new System.Windows.Forms.Button();
            this.txbPassword = new System.Windows.Forms.TextBox();
            this.txbLiveid = new System.Windows.Forms.TextBox();
            this.lblPassword = new System.Windows.Forms.Label();
            this.lblLiveid = new System.Windows.Forms.Label();
            this.lblFolderToCreate = new System.Windows.Forms.Label();
            this.txbFolderToCreate = new System.Windows.Forms.TextBox();
            this.btnCreateFolder = new System.Windows.Forms.Button();
            this.btnUploadReplacePictures = new System.Windows.Forms.Button();
            this.lsbFilesToUpload = new System.Windows.Forms.ListBox();
            this.lblFilesToUpload = new System.Windows.Forms.Label();
            this.btnUploadFiles = new System.Windows.Forms.Button();
            this.btnSelectUploadFile = new System.Windows.Forms.Button();
            this.ofdSelectFileToUpload = new System.Windows.Forms.OpenFileDialog();
            this.btnSettings = new System.Windows.Forms.Button();
            this.tctLoginMode = new System.Windows.Forms.TabControl();
            this.tpgLogin = new System.Windows.Forms.TabPage();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.ckbKeepLogin = new System.Windows.Forms.CheckBox();
            this.grbFindUploadReplace = new System.Windows.Forms.GroupBox();
            this.label1 = new System.Windows.Forms.Label();
            this.lsbLocalPictues = new System.Windows.Forms.ListBox();
            this.btnFindLocalPictures = new System.Windows.Forms.Button();
            this.grbUploadFile = new System.Windows.Forms.GroupBox();
            this.grbCreateFolder = new System.Windows.Forms.GroupBox();
            this.tpgUnlogin = new System.Windows.Forms.TabPage();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.txbSkyFolderUrl = new System.Windows.Forms.TextBox();
            this.btnInit = new System.Windows.Forms.Button();
            this.grbMode = new System.Windows.Forms.GroupBox();
            this.grbCommonFunc = new System.Windows.Forms.GroupBox();
            this.btnRefreshFolder = new System.Windows.Forms.Button();
            this.grbView.SuspendLayout();
            this.grbPreview.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pcbPic)).BeginInit();
            this.grbInfo.SuspendLayout();
            this.tctLoginMode.SuspendLayout();
            this.tpgLogin.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.grbFindUploadReplace.SuspendLayout();
            this.grbUploadFile.SuspendLayout();
            this.grbCreateFolder.SuspendLayout();
            this.tpgUnlogin.SuspendLayout();
            this.groupBox3.SuspendLayout();
            this.grbMode.SuspendLayout();
            this.grbCommonFunc.SuspendLayout();
            this.SuspendLayout();
            // 
            // btnLogin
            // 
            this.btnLogin.Font = new System.Drawing.Font("微软雅黑", 10F);
            this.btnLogin.Location = new System.Drawing.Point(300, 15);
            this.btnLogin.Name = "btnLogin";
            this.btnLogin.Size = new System.Drawing.Size(78, 51);
            this.btnLogin.TabIndex = 3;
            this.btnLogin.Text = "Login";
            this.btnLogin.UseVisualStyleBackColor = true;
            this.btnLogin.Click += new System.EventHandler(this.btnLogin_Click);
            // 
            // txbInfo
            // 
            this.txbInfo.BackColor = System.Drawing.Color.Honeydew;
            this.txbInfo.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.txbInfo.Location = new System.Drawing.Point(8, 15);
            this.txbInfo.Multiline = true;
            this.txbInfo.Name = "txbInfo";
            this.txbInfo.ReadOnly = true;
            this.txbInfo.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
            this.txbInfo.Size = new System.Drawing.Size(334, 111);
            this.txbInfo.TabIndex = 17;
            // 
            // trvSkydrive
            // 
            this.trvSkydrive.BackColor = System.Drawing.Color.Honeydew;
            this.trvSkydrive.Dock = System.Windows.Forms.DockStyle.Fill;
            this.trvSkydrive.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.trvSkydrive.Location = new System.Drawing.Point(3, 18);
            this.trvSkydrive.Name = "trvSkydrive";
            this.trvSkydrive.Size = new System.Drawing.Size(515, 531);
            this.trvSkydrive.TabIndex = 16;
            this.trvSkydrive.AfterCollapse += new System.Windows.Forms.TreeViewEventHandler(this.trvFolder_AfterCollapse);
            this.trvSkydrive.AfterExpand += new System.Windows.Forms.TreeViewEventHandler(this.trvFolder_AfterExpand);
            this.trvSkydrive.BeforeSelect += new System.Windows.Forms.TreeViewCancelEventHandler(this.trvSkydrive_BeforeSelect);
            this.trvSkydrive.AfterSelect += new System.Windows.Forms.TreeViewEventHandler(this.trvFolder_AfterSelect);
            this.trvSkydrive.NodeMouseClick += new System.Windows.Forms.TreeNodeMouseClickEventHandler(this.trvFolder_NodeMouseClick);
            this.trvSkydrive.NodeMouseDoubleClick += new System.Windows.Forms.TreeNodeMouseClickEventHandler(this.trvFolder_NodeMouseDoubleClick);
            this.trvSkydrive.DoubleClick += new System.EventHandler(this.trvFolder_DoubleClick);
            this.trvSkydrive.Enter += new System.EventHandler(this.trvFolder_Enter);
            this.trvSkydrive.Leave += new System.EventHandler(this.trvFolder_Leave);
            this.trvSkydrive.MouseClick += new System.Windows.Forms.MouseEventHandler(this.trvFolder_MouseClick);
            // 
            // iglIcons
            // 
            this.iglIcons.ImageStream = ((System.Windows.Forms.ImageListStreamer)(resources.GetObject("iglIcons.ImageStream")));
            this.iglIcons.TransparentColor = System.Drawing.Color.Transparent;
            this.iglIcons.Images.SetKeyName(0, "default.png");
            this.iglIcons.Images.SetKeyName(1, "folder_closed.png");
            this.iglIcons.Images.SetKeyName(2, "folder_open.png");
            this.iglIcons.Images.SetKeyName(3, "txt.png");
            this.iglIcons.Images.SetKeyName(4, "photo.png");
            this.iglIcons.Images.SetKeyName(5, "audio.png");
            this.iglIcons.Images.SetKeyName(6, "video.png");
            this.iglIcons.Images.SetKeyName(7, "html.jpg");
            this.iglIcons.Images.SetKeyName(8, "pdf.png");
            this.iglIcons.Images.SetKeyName(9, "chm.png");
            this.iglIcons.Images.SetKeyName(10, "7z.ico");
            this.iglIcons.Images.SetKeyName(11, "winrar.ico");
            this.iglIcons.Images.SetKeyName(12, "dll.jpg");
            this.iglIcons.Images.SetKeyName(13, "exe.png");
            this.iglIcons.Images.SetKeyName(14, "doc.png");
            this.iglIcons.Images.SetKeyName(15, "docx.png");
            this.iglIcons.Images.SetKeyName(16, "xls.png");
            this.iglIcons.Images.SetKeyName(17, "xlsx.png");
            this.iglIcons.Images.SetKeyName(18, "ppt.png");
            this.iglIcons.Images.SetKeyName(19, "pptx.png");
            this.iglIcons.Images.SetKeyName(20, "one.png");
            this.iglIcons.Images.SetKeyName(21, "accdb.png");
            this.iglIcons.Images.SetKeyName(22, "mdb.png");
            this.iglIcons.Images.SetKeyName(23, "msi.png");
            this.iglIcons.Images.SetKeyName(24, "ini.png");
            this.iglIcons.Images.SetKeyName(25, "xml.png");
            this.iglIcons.Images.SetKeyName(26, "xsl.png");
            this.iglIcons.Images.SetKeyName(27, "swf.png");
            this.iglIcons.Images.SetKeyName(28, "notebook.png");
            // 
            // txbSkydriveFolderUrl
            // 
            this.txbSkydriveFolderUrl.BackColor = System.Drawing.SystemColors.Info;
            this.txbSkydriveFolderUrl.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.txbSkydriveFolderUrl.ForeColor = System.Drawing.SystemColors.WindowText;
            this.txbSkydriveFolderUrl.Location = new System.Drawing.Point(83, 15);
            this.txbSkydriveFolderUrl.Multiline = true;
            this.txbSkydriveFolderUrl.Name = "txbSkydriveFolderUrl";
            this.txbSkydriveFolderUrl.Size = new System.Drawing.Size(325, 53);
            this.txbSkydriveFolderUrl.TabIndex = 12;
            this.txbSkydriveFolderUrl.Leave += new System.EventHandler(this.txbSkydriveFolderUrl_Leave);
            // 
            // grbView
            // 
            this.grbView.Controls.Add(this.trvSkydrive);
            this.grbView.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.grbView.Location = new System.Drawing.Point(6, 6);
            this.grbView.Name = "grbView";
            this.grbView.Size = new System.Drawing.Size(521, 551);
            this.grbView.TabIndex = 9;
            this.grbView.TabStop = false;
            this.grbView.Text = "Browser Files on Skydrive";
            // 
            // grbPreview
            // 
            this.grbPreview.Controls.Add(this.pcbPic);
            this.grbPreview.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.grbPreview.Location = new System.Drawing.Point(354, 557);
            this.grbPreview.Name = "grbPreview";
            this.grbPreview.Size = new System.Drawing.Size(173, 128);
            this.grbPreview.TabIndex = 18;
            this.grbPreview.TabStop = false;
            this.grbPreview.Text = "Preview";
            // 
            // pcbPic
            // 
            this.pcbPic.BackColor = System.Drawing.Color.Honeydew;
            this.pcbPic.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.pcbPic.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pcbPic.Location = new System.Drawing.Point(3, 18);
            this.pcbPic.Name = "pcbPic";
            this.pcbPic.Size = new System.Drawing.Size(167, 108);
            this.pcbPic.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.pcbPic.TabIndex = 7;
            this.pcbPic.TabStop = false;
            // 
            // btnInsert
            // 
            this.btnInsert.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnInsert.ForeColor = System.Drawing.Color.Black;
            this.btnInsert.Location = new System.Drawing.Point(6, 20);
            this.btnInsert.Name = "btnInsert";
            this.btnInsert.Size = new System.Drawing.Size(144, 28);
            this.btnInsert.TabIndex = 11;
            this.btnInsert.Text = "Insert Selected";
            this.btnInsert.UseVisualStyleBackColor = true;
            this.btnInsert.Click += new System.EventHandler(this.btnInsert_Click);
            // 
            // grbInfo
            // 
            this.grbInfo.Controls.Add(this.txbInfo);
            this.grbInfo.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.grbInfo.Location = new System.Drawing.Point(6, 556);
            this.grbInfo.Name = "grbInfo";
            this.grbInfo.Size = new System.Drawing.Size(342, 128);
            this.grbInfo.TabIndex = 11;
            this.grbInfo.TabStop = false;
            this.grbInfo.Text = "Information";
            // 
            // btnReadme
            // 
            this.btnReadme.FlatStyle = System.Windows.Forms.FlatStyle.System;
            this.btnReadme.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.btnReadme.ForeColor = System.Drawing.SystemColors.ControlText;
            this.btnReadme.Location = new System.Drawing.Point(972, 647);
            this.btnReadme.Name = "btnReadme";
            this.btnReadme.Size = new System.Drawing.Size(89, 34);
            this.btnReadme.TabIndex = 15;
            this.btnReadme.Text = "Readme";
            this.btnReadme.UseVisualStyleBackColor = false;
            this.btnReadme.Click += new System.EventHandler(this.btnReadme_Click);
            // 
            // txbPassword
            // 
            this.txbPassword.BackColor = System.Drawing.SystemColors.Info;
            this.txbPassword.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.txbPassword.ForeColor = System.Drawing.SystemColors.WindowText;
            this.txbPassword.Location = new System.Drawing.Point(77, 44);
            this.txbPassword.Name = "txbPassword";
            this.txbPassword.PasswordChar = '●';
            this.txbPassword.Size = new System.Drawing.Size(207, 23);
            this.txbPassword.TabIndex = 2;
            this.txbPassword.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            this.txbPassword.KeyDown += new System.Windows.Forms.KeyEventHandler(this.txbPassword_KeyDown);
            // 
            // txbLiveid
            // 
            this.txbLiveid.BackColor = System.Drawing.SystemColors.Info;
            this.txbLiveid.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.txbLiveid.ForeColor = System.Drawing.SystemColors.WindowText;
            this.txbLiveid.Location = new System.Drawing.Point(77, 15);
            this.txbLiveid.Name = "txbLiveid";
            this.txbLiveid.Size = new System.Drawing.Size(207, 23);
            this.txbLiveid.TabIndex = 1;
            this.txbLiveid.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            this.txbLiveid.Leave += new System.EventHandler(this.txbLiveid_Leave);
            // 
            // lblPassword
            // 
            this.lblPassword.AutoSize = true;
            this.lblPassword.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.lblPassword.ForeColor = System.Drawing.SystemColors.WindowText;
            this.lblPassword.Location = new System.Drawing.Point(4, 44);
            this.lblPassword.Name = "lblPassword";
            this.lblPassword.Size = new System.Drawing.Size(67, 17);
            this.lblPassword.TabIndex = 25;
            this.lblPassword.Text = "Password:";
            // 
            // lblLiveid
            // 
            this.lblLiveid.AutoSize = true;
            this.lblLiveid.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.lblLiveid.ForeColor = System.Drawing.SystemColors.WindowText;
            this.lblLiveid.Location = new System.Drawing.Point(9, 20);
            this.lblLiveid.Name = "lblLiveid";
            this.lblLiveid.Size = new System.Drawing.Size(50, 17);
            this.lblLiveid.TabIndex = 24;
            this.lblLiveid.Text = "Live ID:";
            // 
            // lblFolderToCreate
            // 
            this.lblFolderToCreate.AutoSize = true;
            this.lblFolderToCreate.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.lblFolderToCreate.ForeColor = System.Drawing.SystemColors.WindowText;
            this.lblFolderToCreate.Location = new System.Drawing.Point(9, 19);
            this.lblFolderToCreate.Name = "lblFolderToCreate";
            this.lblFolderToCreate.Size = new System.Drawing.Size(87, 17);
            this.lblFolderToCreate.TabIndex = 25;
            this.lblFolderToCreate.Text = "Folder Name:";
            // 
            // txbFolderToCreate
            // 
            this.txbFolderToCreate.BackColor = System.Drawing.SystemColors.Info;
            this.txbFolderToCreate.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.txbFolderToCreate.ForeColor = System.Drawing.SystemColors.WindowText;
            this.txbFolderToCreate.Location = new System.Drawing.Point(136, 17);
            this.txbFolderToCreate.Name = "txbFolderToCreate";
            this.txbFolderToCreate.Size = new System.Drawing.Size(242, 23);
            this.txbFolderToCreate.TabIndex = 4;
            // 
            // btnCreateFolder
            // 
            this.btnCreateFolder.Font = new System.Drawing.Font("微软雅黑", 9F);
            this.btnCreateFolder.ForeColor = System.Drawing.Color.Black;
            this.btnCreateFolder.Location = new System.Drawing.Point(408, 15);
            this.btnCreateFolder.Name = "btnCreateFolder";
            this.btnCreateFolder.Size = new System.Drawing.Size(78, 29);
            this.btnCreateFolder.TabIndex = 5;
            this.btnCreateFolder.Text = "Create";
            this.btnCreateFolder.UseVisualStyleBackColor = true;
            this.btnCreateFolder.Click += new System.EventHandler(this.btnCreate_Click);
            // 
            // btnUploadReplacePictures
            // 
            this.btnUploadReplacePictures.Font = new System.Drawing.Font("微软雅黑", 9F);
            this.btnUploadReplacePictures.ForeColor = System.Drawing.Color.Black;
            this.btnUploadReplacePictures.Location = new System.Drawing.Point(136, 150);
            this.btnUploadReplacePictures.Name = "btnUploadReplacePictures";
            this.btnUploadReplacePictures.Size = new System.Drawing.Size(242, 28);
            this.btnUploadReplacePictures.TabIndex = 10;
            this.btnUploadReplacePictures.Text = "Upload and Replace Local Pictures";
            this.btnUploadReplacePictures.UseVisualStyleBackColor = true;
            this.btnUploadReplacePictures.Click += new System.EventHandler(this.btnFindDropinFiles_Click);
            // 
            // lsbFilesToUpload
            // 
            this.lsbFilesToUpload.BackColor = System.Drawing.Color.Honeydew;
            this.lsbFilesToUpload.Font = new System.Drawing.Font("微软雅黑", 9F);
            this.lsbFilesToUpload.FormattingEnabled = true;
            this.lsbFilesToUpload.HorizontalScrollbar = true;
            this.lsbFilesToUpload.ItemHeight = 17;
            this.lsbFilesToUpload.Location = new System.Drawing.Point(6, 51);
            this.lsbFilesToUpload.Name = "lsbFilesToUpload";
            this.lsbFilesToUpload.Size = new System.Drawing.Size(483, 72);
            this.lsbFilesToUpload.TabIndex = 7;
            // 
            // lblFilesToUpload
            // 
            this.lblFilesToUpload.AutoSize = true;
            this.lblFilesToUpload.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.lblFilesToUpload.ForeColor = System.Drawing.SystemColors.WindowText;
            this.lblFilesToUpload.Location = new System.Drawing.Point(6, 33);
            this.lblFilesToUpload.Name = "lblFilesToUpload";
            this.lblFilesToUpload.Size = new System.Drawing.Size(99, 17);
            this.lblFilesToUpload.TabIndex = 25;
            this.lblFilesToUpload.Text = "Files to Upload:";
            // 
            // btnUploadFiles
            // 
            this.btnUploadFiles.Font = new System.Drawing.Font("微软雅黑", 9F);
            this.btnUploadFiles.ForeColor = System.Drawing.Color.Black;
            this.btnUploadFiles.Location = new System.Drawing.Point(136, 138);
            this.btnUploadFiles.Name = "btnUploadFiles";
            this.btnUploadFiles.Size = new System.Drawing.Size(242, 28);
            this.btnUploadFiles.TabIndex = 8;
            this.btnUploadFiles.Text = "Upload Selected Files";
            this.btnUploadFiles.UseVisualStyleBackColor = true;
            this.btnUploadFiles.Click += new System.EventHandler(this.btnUploadFile_Click);
            // 
            // btnSelectUploadFile
            // 
            this.btnSelectUploadFile.Font = new System.Drawing.Font("微软雅黑", 9F);
            this.btnSelectUploadFile.ForeColor = System.Drawing.Color.Black;
            this.btnSelectUploadFile.Location = new System.Drawing.Point(136, 17);
            this.btnSelectUploadFile.Name = "btnSelectUploadFile";
            this.btnSelectUploadFile.Size = new System.Drawing.Size(242, 28);
            this.btnSelectUploadFile.TabIndex = 6;
            this.btnSelectUploadFile.Text = "Select Files";
            this.btnSelectUploadFile.UseVisualStyleBackColor = true;
            this.btnSelectUploadFile.Click += new System.EventHandler(this.btnSelectUploadFile_Click);
            // 
            // ofdSelectFileToUpload
            // 
            this.ofdSelectFileToUpload.FileName = "Select file(s) to upload";
            // 
            // btnSettings
            // 
            this.btnSettings.FlatStyle = System.Windows.Forms.FlatStyle.System;
            this.btnSettings.Font = new System.Drawing.Font("微软雅黑", 9F);
            this.btnSettings.Location = new System.Drawing.Point(972, 576);
            this.btnSettings.Name = "btnSettings";
            this.btnSettings.Size = new System.Drawing.Size(89, 34);
            this.btnSettings.TabIndex = 14;
            this.btnSettings.Text = "Settings";
            this.btnSettings.UseVisualStyleBackColor = false;
            this.btnSettings.Click += new System.EventHandler(this.btnSettings_Click);
            // 
            // tctLoginMode
            // 
            this.tctLoginMode.Controls.Add(this.tpgLogin);
            this.tctLoginMode.Controls.Add(this.tpgUnlogin);
            this.tctLoginMode.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.tctLoginMode.Location = new System.Drawing.Point(11, 19);
            this.tctLoginMode.Name = "tctLoginMode";
            this.tctLoginMode.SelectedIndex = 0;
            this.tctLoginMode.ShowToolTips = true;
            this.tctLoginMode.Size = new System.Drawing.Size(509, 540);
            this.tctLoginMode.TabIndex = 33;
            this.tctLoginMode.SelectedIndexChanged += new System.EventHandler(this.tctLoginMode_SelectedIndexChanged);
            // 
            // tpgLogin
            // 
            this.tpgLogin.BackColor = System.Drawing.SystemColors.Control;
            this.tpgLogin.Controls.Add(this.groupBox2);
            this.tpgLogin.Controls.Add(this.grbFindUploadReplace);
            this.tpgLogin.Controls.Add(this.grbUploadFile);
            this.tpgLogin.Controls.Add(this.grbCreateFolder);
            this.tpgLogin.Location = new System.Drawing.Point(4, 26);
            this.tpgLogin.Name = "tpgLogin";
            this.tpgLogin.Padding = new System.Windows.Forms.Padding(3);
            this.tpgLogin.Size = new System.Drawing.Size(501, 510);
            this.tpgLogin.TabIndex = 0;
            this.tpgLogin.Text = "Login";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.ckbKeepLogin);
            this.groupBox2.Controls.Add(this.btnLogin);
            this.groupBox2.Controls.Add(this.txbLiveid);
            this.groupBox2.Controls.Add(this.txbPassword);
            this.groupBox2.Controls.Add(this.lblPassword);
            this.groupBox2.Controls.Add(this.lblLiveid);
            this.groupBox2.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Bold);
            this.groupBox2.Location = new System.Drawing.Point(3, 6);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(492, 74);
            this.groupBox2.TabIndex = 37;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Initialization";
            // 
            // ckbKeepLogin
            // 
            this.ckbKeepLogin.AutoSize = true;
            this.ckbKeepLogin.Font = new System.Drawing.Font("微软雅黑", 9F);
            this.ckbKeepLogin.Location = new System.Drawing.Point(393, 32);
            this.ckbKeepLogin.Name = "ckbKeepLogin";
            this.ckbKeepLogin.Size = new System.Drawing.Size(93, 21);
            this.ckbKeepLogin.TabIndex = 26;
            this.ckbKeepLogin.Text = "Keep Login";
            this.ckbKeepLogin.UseVisualStyleBackColor = true;
            this.ckbKeepLogin.CheckedChanged += new System.EventHandler(this.ckbKeepLogin_CheckedChanged);
            // 
            // grbFindUploadReplace
            // 
            this.grbFindUploadReplace.Controls.Add(this.label1);
            this.grbFindUploadReplace.Controls.Add(this.lsbLocalPictues);
            this.grbFindUploadReplace.Controls.Add(this.btnFindLocalPictures);
            this.grbFindUploadReplace.Controls.Add(this.btnUploadReplacePictures);
            this.grbFindUploadReplace.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.grbFindUploadReplace.Location = new System.Drawing.Point(3, 319);
            this.grbFindUploadReplace.Name = "grbFindUploadReplace";
            this.grbFindUploadReplace.Size = new System.Drawing.Size(495, 188);
            this.grbFindUploadReplace.TabIndex = 36;
            this.grbFindUploadReplace.TabStop = false;
            this.grbFindUploadReplace.Text = "Find+Upload+Replace Local Dragged-in Pictures";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.label1.ForeColor = System.Drawing.SystemColors.WindowText;
            this.label1.Location = new System.Drawing.Point(3, 42);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(130, 17);
            this.label1.TabIndex = 31;
            this.label1.Text = "Found Local Pictures:";
            // 
            // lsbLocalPictues
            // 
            this.lsbLocalPictues.BackColor = System.Drawing.Color.Honeydew;
            this.lsbLocalPictues.Font = new System.Drawing.Font("微软雅黑", 9F);
            this.lsbLocalPictues.FormattingEnabled = true;
            this.lsbLocalPictues.HorizontalScrollbar = true;
            this.lsbLocalPictues.ItemHeight = 17;
            this.lsbLocalPictues.Location = new System.Drawing.Point(6, 61);
            this.lsbLocalPictues.Name = "lsbLocalPictues";
            this.lsbLocalPictues.Size = new System.Drawing.Size(483, 72);
            this.lsbLocalPictues.TabIndex = 9;
            // 
            // btnFindLocalPictures
            // 
            this.btnFindLocalPictures.Font = new System.Drawing.Font("微软雅黑", 9F);
            this.btnFindLocalPictures.ForeColor = System.Drawing.Color.Black;
            this.btnFindLocalPictures.Location = new System.Drawing.Point(136, 23);
            this.btnFindLocalPictures.Name = "btnFindLocalPictures";
            this.btnFindLocalPictures.Size = new System.Drawing.Size(242, 28);
            this.btnFindLocalPictures.TabIndex = 8;
            this.btnFindLocalPictures.Text = "Find Local Dragged-In Pictures";
            this.btnFindLocalPictures.UseVisualStyleBackColor = true;
            this.btnFindLocalPictures.Click += new System.EventHandler(this.btnFindLocalPictures_Click);
            // 
            // grbUploadFile
            // 
            this.grbUploadFile.Controls.Add(this.btnSelectUploadFile);
            this.grbUploadFile.Controls.Add(this.lblFilesToUpload);
            this.grbUploadFile.Controls.Add(this.lsbFilesToUpload);
            this.grbUploadFile.Controls.Add(this.btnUploadFiles);
            this.grbUploadFile.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.grbUploadFile.Location = new System.Drawing.Point(3, 142);
            this.grbUploadFile.Name = "grbUploadFile";
            this.grbUploadFile.Size = new System.Drawing.Size(492, 172);
            this.grbUploadFile.TabIndex = 35;
            this.grbUploadFile.TabStop = false;
            this.grbUploadFile.Text = "Upload Files";
            // 
            // grbCreateFolder
            // 
            this.grbCreateFolder.Controls.Add(this.lblFolderToCreate);
            this.grbCreateFolder.Controls.Add(this.txbFolderToCreate);
            this.grbCreateFolder.Controls.Add(this.btnCreateFolder);
            this.grbCreateFolder.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.grbCreateFolder.Location = new System.Drawing.Point(3, 85);
            this.grbCreateFolder.Name = "grbCreateFolder";
            this.grbCreateFolder.Size = new System.Drawing.Size(495, 52);
            this.grbCreateFolder.TabIndex = 34;
            this.grbCreateFolder.TabStop = false;
            this.grbCreateFolder.Text = "Create Folder";
            // 
            // tpgUnlogin
            // 
            this.tpgUnlogin.BackColor = System.Drawing.SystemColors.Control;
            this.tpgUnlogin.Controls.Add(this.groupBox3);
            this.tpgUnlogin.Location = new System.Drawing.Point(4, 26);
            this.tpgUnlogin.Name = "tpgUnlogin";
            this.tpgUnlogin.Padding = new System.Windows.Forms.Padding(3);
            this.tpgUnlogin.Size = new System.Drawing.Size(501, 510);
            this.tpgUnlogin.TabIndex = 1;
            this.tpgUnlogin.Text = "Un-login";
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.txbSkyFolderUrl);
            this.groupBox3.Controls.Add(this.btnInit);
            this.groupBox3.Controls.Add(this.txbSkydriveFolderUrl);
            this.groupBox3.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Bold);
            this.groupBox3.Location = new System.Drawing.Point(3, 6);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(492, 74);
            this.groupBox3.TabIndex = 38;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "Initialization";
            // 
            // txbSkyFolderUrl
            // 
            this.txbSkyFolderUrl.BackColor = System.Drawing.SystemColors.ButtonFace;
            this.txbSkyFolderUrl.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txbSkyFolderUrl.Font = new System.Drawing.Font("微软雅黑", 9F);
            this.txbSkyFolderUrl.Location = new System.Drawing.Point(5, 20);
            this.txbSkyFolderUrl.Multiline = true;
            this.txbSkyFolderUrl.Name = "txbSkyFolderUrl";
            this.txbSkyFolderUrl.Size = new System.Drawing.Size(75, 42);
            this.txbSkyFolderUrl.TabIndex = 14;
            this.txbSkyFolderUrl.Text = "Skydrive\r\nFolder URL:";
            this.txbSkyFolderUrl.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            // 
            // btnInit
            // 
            this.btnInit.Font = new System.Drawing.Font("微软雅黑", 10F);
            this.btnInit.Location = new System.Drawing.Point(413, 15);
            this.btnInit.Name = "btnInit";
            this.btnInit.Size = new System.Drawing.Size(74, 51);
            this.btnInit.TabIndex = 13;
            this.btnInit.Text = "Initialize";
            this.btnInit.UseVisualStyleBackColor = true;
            this.btnInit.Click += new System.EventHandler(this.btnInit_Click);
            // 
            // grbMode
            // 
            this.grbMode.Controls.Add(this.tctLoginMode);
            this.grbMode.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.grbMode.Location = new System.Drawing.Point(533, 6);
            this.grbMode.Name = "grbMode";
            this.grbMode.Size = new System.Drawing.Size(528, 565);
            this.grbMode.TabIndex = 37;
            this.grbMode.TabStop = false;
            this.grbMode.Text = "Functions Depend on Mode";
            // 
            // grbCommonFunc
            // 
            this.grbCommonFunc.Controls.Add(this.btnRefreshFolder);
            this.grbCommonFunc.Controls.Add(this.btnInsert);
            this.grbCommonFunc.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Bold);
            this.grbCommonFunc.Location = new System.Drawing.Point(533, 570);
            this.grbCommonFunc.Name = "grbCommonFunc";
            this.grbCommonFunc.Size = new System.Drawing.Size(433, 114);
            this.grbCommonFunc.TabIndex = 38;
            this.grbCommonFunc.TabStop = false;
            this.grbCommonFunc.Text = "Common Functions";
            // 
            // btnRefreshFolder
            // 
            this.btnRefreshFolder.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnRefreshFolder.Location = new System.Drawing.Point(6, 74);
            this.btnRefreshFolder.Name = "btnRefreshFolder";
            this.btnRefreshFolder.Size = new System.Drawing.Size(144, 28);
            this.btnRefreshFolder.TabIndex = 16;
            this.btnRefreshFolder.Text = "Refresh Folder";
            this.btnRefreshFolder.UseVisualStyleBackColor = true;
            this.btnRefreshFolder.Click += new System.EventHandler(this.btnRefreshFolder_Click);
            // 
            // frmInsertSkydriveFile
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.AutoScroll = true;
            this.ClientSize = new System.Drawing.Size(1067, 690);
            this.Controls.Add(this.grbCommonFunc);
            this.Controls.Add(this.grbMode);
            this.Controls.Add(this.btnReadme);
            this.Controls.Add(this.btnSettings);
            this.Controls.Add(this.grbPreview);
            this.Controls.Add(this.grbInfo);
            this.Controls.Add(this.grbView);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MaximumSize = new System.Drawing.Size(1083, 728);
            this.MinimumSize = new System.Drawing.Size(568, 619);
            this.Name = "frmInsertSkydriveFile";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Insert Files from Skydrive";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.frmInsertSkydriveFile_FormClosing);
            this.Load += new System.EventHandler(this.frmInsertSkydriveFile_Load);
            this.grbView.ResumeLayout(false);
            this.grbPreview.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.pcbPic)).EndInit();
            this.grbInfo.ResumeLayout(false);
            this.grbInfo.PerformLayout();
            this.tctLoginMode.ResumeLayout(false);
            this.tpgLogin.ResumeLayout(false);
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.grbFindUploadReplace.ResumeLayout(false);
            this.grbFindUploadReplace.PerformLayout();
            this.grbUploadFile.ResumeLayout(false);
            this.grbUploadFile.PerformLayout();
            this.grbCreateFolder.ResumeLayout(false);
            this.grbCreateFolder.PerformLayout();
            this.tpgUnlogin.ResumeLayout(false);
            this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout();
            this.grbMode.ResumeLayout(false);
            this.grbCommonFunc.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button btnLogin;
        private System.Windows.Forms.TextBox txbInfo;
        private System.Windows.Forms.TreeView trvSkydrive;
        private System.Windows.Forms.ImageList iglIcons;
        private System.Windows.Forms.TextBox txbSkydriveFolderUrl;
        private System.Windows.Forms.GroupBox grbView;
        private System.Windows.Forms.Button btnInsert;
        private System.Windows.Forms.GroupBox grbPreview;
        private System.Windows.Forms.PictureBox pcbPic;
        private System.Windows.Forms.GroupBox grbInfo;
        private System.Windows.Forms.Button btnReadme;
        private System.Windows.Forms.TextBox txbPassword;
        private System.Windows.Forms.TextBox txbLiveid;
        private System.Windows.Forms.Label lblPassword;
        private System.Windows.Forms.Label lblLiveid;
        private System.Windows.Forms.Label lblFolderToCreate;
        private System.Windows.Forms.TextBox txbFolderToCreate;
        private System.Windows.Forms.Button btnCreateFolder;
        private System.Windows.Forms.Button btnUploadReplacePictures;
        private System.Windows.Forms.ListBox lsbFilesToUpload;
        private System.Windows.Forms.Label lblFilesToUpload;
        private System.Windows.Forms.Button btnUploadFiles;
        private System.Windows.Forms.Button btnSelectUploadFile;
        private System.Windows.Forms.OpenFileDialog ofdSelectFileToUpload;
        private System.Windows.Forms.Button btnSettings;
        private System.Windows.Forms.TabControl tctLoginMode;
        private System.Windows.Forms.TabPage tpgLogin;
        private System.Windows.Forms.TabPage tpgUnlogin;
        private System.Windows.Forms.GroupBox grbCreateFolder;
        private System.Windows.Forms.GroupBox grbUploadFile;
        private System.Windows.Forms.GroupBox grbFindUploadReplace;
        private System.Windows.Forms.GroupBox grbMode;
        private System.Windows.Forms.Button btnFindLocalPictures;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.ListBox lsbLocalPictues;
        private System.Windows.Forms.GroupBox grbCommonFunc;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.Button btnInit;
        private System.Windows.Forms.Button btnRefreshFolder;
        private System.Windows.Forms.TextBox txbSkyFolderUrl;
        private System.Windows.Forms.CheckBox ckbKeepLogin;
        //private System.Windows.Forms.ProgressBar pgbCurAction;
    }
}