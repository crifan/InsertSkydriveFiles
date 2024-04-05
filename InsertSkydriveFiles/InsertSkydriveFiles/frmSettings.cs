using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using InsertSkydriveFiles.Properties;

namespace InsertSkydriveFiles
{
    public partial class frmSettings : Form
    {
        public frmSettings()
        {
            InitializeComponent();
        }

        private void loadDefaultSettings()
        {
            //insert
            txbPhotoPattern.Text = Settings.Default.photoInsertPattern.ToString();
            txbAudioPattern.Text = Settings.Default.audioInsertPattern.ToString();
            txbVideoPattern.Text = Settings.Default.videoInsertPattern.ToString();
            txbOtherPattern.Text = Settings.Default.otherInsertPattern.ToString();
            ckbInsertFolder.Checked = Settings.Default.insertFolder;
            
            //preview
            ckbPreviewPhoto.Checked = Settings.Default.previewPhoto;

            //upload
            ckbAutoHandleFilename.Checked = Settings.Default.uploadAutoHandleFilename;
            ckbOverwrite.Checked = Settings.Default.uploadOverwrite;

            //Find&Upload&Replace
            ckbOpenInNewWin.Checked = Settings.Default.openInNewWin;

            //filetype
            txbSufAudio.Text = Settings.Default.addSufAudio.ToString();
            txbSufPhoto.Text = Settings.Default.addSufPhoto.ToString();
            txbSufVideo.Text = Settings.Default.addSufVideo.ToString();
        }

        private void saveAllSettings()
        {
            //insert
            Settings.Default.photoInsertPattern = txbPhotoPattern.Text;
            Settings.Default.audioInsertPattern = txbAudioPattern.Text;
            Settings.Default.videoInsertPattern = txbVideoPattern.Text;
            Settings.Default.otherInsertPattern = txbOtherPattern.Text;
            Settings.Default.insertFolder = ckbInsertFolder.Checked;

            //preview
            Settings.Default.previewPhoto = ckbPreviewPhoto.Checked;

            //upload
            Settings.Default.uploadAutoHandleFilename = ckbAutoHandleFilename.Checked;
            Settings.Default.uploadOverwrite = ckbOverwrite.Checked;

            //Find&Upload&Replace
            Settings.Default.openInNewWin = ckbOpenInNewWin.Checked;

            //filetype
            Settings.Default.addSufAudio = txbSufAudio.Text;
            Settings.Default.addSufPhoto = txbSufPhoto.Text;
            Settings.Default.addSufVideo = txbSufVideo.Text;
                        
            Settings.Default.Save();
        }

        private void addSettingsToolTips()
        {
            //add tooltip
            ToolTip ttpSettings = new ToolTip();
            ttpSettings.InitialDelay = 200;
            ttpSettings.AutoPopDelay = 10 * 1000;
            ttpSettings.ReshowDelay = 100;
            ttpSettings.ShowAlways = true;
            ttpSettings.IsBalloon = true;

            string tipInsertPattern = "${permaLink} = file permanent link/address"
                    + Environment.NewLine + "${name} = file name"
                    + Environment.NewLine + "${extension} = file extension: .mp3/.jpg/..."
                    + Environment.NewLine + "${fullname} = full name of file == ${name} + ${extension}"
                    + Environment.NewLine + "${iconType} = file icon type: NonEmptyDocumentFolder/Audio/Photo/..."
                    + Environment.NewLine + "${id} = resource id for this file"
                    + Environment.NewLine + "${parentFolderId} = resource id of this file's parent";
            ttpSettings.SetToolTip(grbInsertPattern, tipInsertPattern);

            string tipInsertFolder = "Note, only insert child files, not include sub folders.";
            ttpSettings.SetToolTip(ckbInsertFolder, tipInsertFolder);

            string tipPreview = "Enable this to support preview photo while you selecte a photho file"
                + Environment.NewLine + "Note that the photo preview is very time consuming thing."
                + Environment.NewLine + "Currently not support preview photo that is not public shared.";
            ttpSettings.SetToolTip(ckbPreviewPhoto, tipPreview);

            string tipOverwrite = "Enable this to allow overwrite an existing file on skydrive while uploading a duplicated file.";
            ttpSettings.SetToolTip(ckbOverwrite, tipOverwrite);

            string tipAutoHandleFilename = "Enable this to automatically handle/filter the invalid char in filename while upload a file."
                + Environment.NewLine + "eg: automatically replace the first dot '.' char in filename to underline '_', for it is not support by skydrive.";
            ttpSettings.SetToolTip(ckbAutoHandleFilename, tipAutoHandleFilename);

            string tipOpenInNewWin = "add target=\"_blank_\" for replaced picture";
            ttpSettings.SetToolTip(ckbOpenInNewWin, tipOpenInNewWin);


            string tipFileType = "some file currently can not recognized by skydrive"
                    + Environment.NewLine + "such as mkv, rmvb is normal video, but its type is set to default by skydrive"
                    + Environment.NewLine + "so here provide your custom setting"
                    + Environment.NewLine + "you can add addtional suffix if your expected file type is not recoginzed by skydrive";
            ttpSettings.SetToolTip(grbAddFileSuf, tipFileType);
        }

        private void frmSettings_Load(object sender, EventArgs e)
        {
            loadDefaultSettings();

            addSettingsToolTips();
        }

        private void btnSetOk_Click(object sender, EventArgs e)
        {
            saveAllSettings();
            this.DialogResult = DialogResult.OK;
            this.Close();
        }

        private void btnSetCancel_Click(object sender, EventArgs e)
        {
            this.DialogResult = DialogResult.Cancel;
            this.Close();
        }

        private void tpgInsertPattern_MouseHover(object sender, EventArgs e)
        {

        }
    }
}
