using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Text;
using System.Drawing;
using System.Windows.Forms;
using WindowsLive.Writer.Api;
using System.IO;
using System.Net;
using System.Text.RegularExpressions;
using System.Collections.Specialized;
using System.Web;
using System.Collections;
using InsertSkydriveFiles.Properties;
using System.Threading;
using System.Diagnostics;
using System.Reflection;


namespace InsertSkydriveFiles
{
    public partial class frmInsertSkydriveFile : Form
    {
        public enum actionType_t
        {
            INVALID,
            INSERTFILES,        // insert file(s)
            UPLOADANDREPLACE,   // upload and replace
        };

        public enum loginMode_t
        {
            INVALID,
            LOGIN,
            UNLOGIN,
        };

        skydrive skydrive;
        public string curSelectCotent;
        public string strToInsert;
        public string replacedContent;

        public actionType_t actionType;
        public loginMode_t curLoginMode;

        public string gCid;

        Dictionary<string, int> picIdxDict;
        Dictionary<string, int> picIdxExtentionDict;

        //refer: http://hi.baidu.com/laiyanbin2008/blog/item/07e61ddb20ec4e0a495403ad.html
        private ArrayList multiSelFileNodes; // multi select nodes

        List<localPictureInfo_t> foundLocalPictures;

        List<TreeNode> curHighlightedNodes;

        Color picPreviewBackColor;

        const int folderClosedIconIdx = 1;
        const int folderOpenIconIdx = 2;

        private bool hasLogin; // for login mode
        private bool hasInit; // for un-login mode
        //private Color nodeHlBackColor;

        public frmInsertSkydriveFile()
        {
            //nodeHlBackColor = Color.FromArgb(51,153,255);

            skydrive = new skydrive();

            hasInit = false;
            hasLogin = false;

            multiSelFileNodes = new ArrayList();
            foundLocalPictures = new List<localPictureInfo_t>();
            curHighlightedNodes = new List<TreeNode>();

            InitializeComponent();

            initPicIdxDict();
            trvSkydrive.ImageList = iglIcons;
                                    
            curSelectCotent = "";
            strToInsert = "";
            replacedContent = "";
            actionType = actionType_t.INVALID;
        }

        enum picIndex_e
        {
            DEFAULT = 0,
            FOLDER_CLOSED,  //1
            FOLDER_OPEN,    //2
            TXT,    //3
            PHOTO,  //4
            AUDIO,  //5
            VIDEO,  //6
            HTML,   //7
            PDF,  //8
            CHM, //9
            SEVENZIP,   //10
            WINRAR, //11
            DLL,   //12
            EXE,  //13
            DOC,    //14
            DOCX,   //15
            XLS,    //16
            XLSX,   //17
            PPT,    //18
            PPTX,   //19
            ONE,    //20
            ACCDB,  //21
            MDB,    //22
            MSI,    //23
            INI,    //24
            XML,    //25
            XSL,    //26
            SWF,    //27
            NOTEBOOK,//28
        };


        private void initPicIdxDict()
        {
            picIdxDict = new Dictionary<string, int>();
            picIdxDict.Add("Default", (int)picIndex_e.DEFAULT);

            picIdxDict.Add("EmptyDocumentFolder", (int)picIndex_e.FOLDER_CLOSED);
            picIdxDict.Add("NonEmptyDocumentFolder", (int)picIndex_e.FOLDER_CLOSED);

            //refer: http://www.icosky.com/icon/folder-open-13-icon/
            //http://www.icosky.com/icon/folder-close-green-icon/
            //http://www.icosky.com/icon/folder-green-7-icon/
            picIdxDict.Add("NonEmptyAlbum", (int)picIndex_e.FOLDER_CLOSED);
            picIdxDict.Add("EmptyAlbum", (int)picIndex_e.FOLDER_CLOSED);

            picIdxDict.Add("NonEmptyFavoriteFolder", (int)picIndex_e.FOLDER_CLOSED);
            picIdxDict.Add("EmptyFavoriteFolder", (int)picIndex_e.FOLDER_CLOSED);

            picIdxDict.Add("Txt", (int)picIndex_e.TXT);
            picIdxDict.Add("Photo", (int)picIndex_e.PHOTO);
            picIdxDict.Add("Audio", (int)picIndex_e.AUDIO);
            picIdxDict.Add("Video", (int)picIndex_e.VIDEO);
            picIdxDict.Add("Doc", (int)picIndex_e.DOC);
            picIdxDict.Add("Docx", (int)picIndex_e.DOCX);
            picIdxDict.Add("Xls", (int)picIndex_e.XLS);
            picIdxDict.Add("Xlsx", (int)picIndex_e.XLSX);
            picIdxDict.Add("Ppt", (int)picIndex_e.PPT);
            picIdxDict.Add("Pptx", (int)picIndex_e.PPTX);
            picIdxDict.Add("One", (int)picIndex_e.ONE);
            picIdxDict.Add("Notebook", (int)picIndex_e.NOTEBOOK);
            picIdxDict.Add("Zip", (int)picIndex_e.WINRAR);
            picIdxDict.Add("Html", (int)picIndex_e.HTML);
            picIdxDict.Add("Exe", (int)picIndex_e.EXE);
            picIdxDict.Add("Mdb", (int)picIndex_e.MDB);
            picIdxDict.Add("Pdf", (int)picIndex_e.PDF);

            picIdxExtentionDict = new Dictionary<string, int>();
            picIdxExtentionDict.Add(".7z", (int)picIndex_e.SEVENZIP);
            picIdxExtentionDict.Add(".chm", (int)picIndex_e.CHM);
            picIdxExtentionDict.Add(".dll", (int)picIndex_e.DLL);
            picIdxExtentionDict.Add(".csv", (int)picIndex_e.XLS);
            picIdxExtentionDict.Add(".msi", (int)picIndex_e.MSI);
            picIdxExtentionDict.Add(".ini", (int)picIndex_e.INI);
            picIdxExtentionDict.Add(".xml", (int)picIndex_e.XML);
            picIdxExtentionDict.Add(".xsl", (int)picIndex_e.XSL);
            picIdxExtentionDict.Add(".swf", (int)picIndex_e.SWF);
        }

        private void addSkydriveTooltip()
        {
            ToolTip ttpSkydrive = new ToolTip();
            ttpSkydrive.InitialDelay = 200;
            ttpSkydrive.AutoPopDelay = 10 * 1000;
            ttpSkydrive.ReshowDelay = 100;
            ttpSkydrive.ShowAlways = true;
            ttpSkydrive.IsBalloon = true;

            //login
            string tipLogin = "If you already enable 'keep login' and have login before,"
                + Environment.NewLine + "then you can login without password";
            ttpSkydrive.SetToolTip(btnLogin, tipLogin);

            string tipKeeplogin = "If you want to clear previously login info, please de-select 'keep login'."
                + Environment.NewLine + "Currently keep login is valid within 24 hour,"
                + Environment.NewLine + "after that period, if you want to login again, then must provide your password.";
            ttpSkydrive.SetToolTip(ckbKeepLogin, tipKeeplogin);

            string tipFindLocalPic = "Find the pictures, which you have drag-drop/copy-paste into WLW."
                + Environment.NewLine + "Note: you should have already selected the pictures (such as Ctrl+A) in WLW before using this plugin.";
            ttpSkydrive.SetToolTip(btnFindLocalPictures, tipFindLocalPic);

            //string tipFoundPic = "List the found local pictures.";
            //ttpSkydrive.SetToolTip(lsbLocalPictues, tipFoundPic);

            string tipUploadReplace = "Upload the found local pictuers into your selected folder."
                + Environment.NewLine + "Then replace the local address of local pictures with its uploaded permanent link.";
            ttpSkydrive.SetToolTip(btnUploadReplacePictures, tipUploadReplace);

            //unlogin
            string tipSkyFolderUrl = "Examples:"
                + Environment.NewLine + "https://skydrive.live.com/?cid=9a8b8bf501a38a36"
                + Environment.NewLine + "https://skydrive.live.com/?cid=9a8b8bf501a38a36&id=9A8B8BF501A38A36%21607";
            ttpSkydrive.SetToolTip(txbSkyFolderUrl, tipSkyFolderUrl);

            //common
            string tipInsertSelected = "Insert single selected file / multiple selected files / (if enable corresponding option) all child files under selected folder";
            ttpSkydrive.SetToolTip(btnInsert, tipInsertSelected);

            string tipRefreshFolder = "Normally use this in following case:"
                + Environment.NewLine + "You have already do some operation(upload/change name/delete) in skydrive (via web browser)"
                + Environment.NewLine + "then want to see latest changes in this plugin, then you can do this 'refresh folder' to forcely refresh selected folder.";
            ttpSkydrive.SetToolTip(btnRefreshFolder, tipRefreshFolder);
        }

        private void updateVersionInfo()
        {
            Assembly asm = Assembly.GetExecutingAssembly();
            FileVersionInfo fvi = FileVersionInfo.GetVersionInfo(asm.Location);
            string versionStr = String.Format("{0}.{1}", fvi.ProductMajorPart, fvi.ProductMinorPart);
            this.Text += " v" + versionStr;
        }

        private void frmInsertSkydriveFile_Load(object sender, EventArgs e)
        {
            updateVersionInfo();
            this.MaximizeBox = false;
            
            picPreviewBackColor = pcbPic.BackColor;
            
            // init default settings
            //txbSkydriveFolderUrl.Text = "https://skydrive.live.com/?cid=9a8b8bf501a38a36";
            //txbSkydriveFolderUrl.Text = "https://skydrive.live.com/?cid=9a8b8bf501a38a36&id=9A8B8BF501A38A36%21504";
            txbSkydriveFolderUrl.Text = Settings.Default.skydriveFolderUrl;

            //default select login mode
            tctLoginMode.SelectTab(tpgLogin);
            updateLoginMode();

            txbLiveid.Text = Settings.Default.liveId;
            txbPassword.Text = "";
            ckbKeepLogin.Checked = Settings.Default.isKeepLogin;

            //if (ckbKeepLogin.Checked)
            //{
            //    skydrive.loginInfo_t loginInfo;
            //    if (restoreLoginInfo(txbLiveid.Text, out loginInfo))
            //    {
            //        gCid = loginInfo.cid;

            //        txbInfo.Text = txbLiveid.Text + " login successfully.";
            //        hasLogin = true;
            //        updateLoginMode();

            //        initRootNode("root", loginInfo.cid);
            //    }
            //}

            addSkydriveTooltip();
        }

        private void insertSingleFile(skydrive.skyItem_t info)
        {
            //refer: http://www.blogjava.net/wintys/archive/2009/10/04/dotNET_WindowLiveWriter_WintyCodeArea.html
            strToInsert+= genInsertStr(info);
        }

        private void insertSelectedFiles()
        {
            if (multiSelFileNodes.Count > 0)
            {
                foreach (TreeNode node in multiSelFileNodes)
                {
                    insertSingleFile(getNodeItemInfo(node));
                }

                actionType = actionType_t.INSERTFILES;
                this.DialogResult = DialogResult.OK;
            }
            else if(curSelIsFolder())
            {
                if (Settings.Default.insertFolder)
                {
                    TreeNode curFolderNode = trvSkydrive.SelectedNode;
                    skydrive.skyItem_t folderItem = getNodeItemInfo(curFolderNode);

                    if (!folderItem.folderInited)
                    {
                        refreshFolder(curFolderNode);
                    }

                    foreach (TreeNode childNode in curFolderNode.Nodes)
                    {
                        skydrive.skyItem_t childItem = getNodeItemInfo(childNode);
                        if (!childItem.isFolder)
                        {
                            insertSingleFile(childItem);
                        }
                    }

                    actionType = actionType_t.INSERTFILES;
                    this.DialogResult = DialogResult.OK;
                }
                else
                {
                    txbInfo.Text = "Current settings is disabled for insert child files under selected folder !";
                }
            }
            else
            {
                txbInfo.Text = "Please select file before insert !";
            }
        }

        private void updateSelectInfo()
        {
            skydrive.skyItem_t info = new skydrive.skyItem_t();
            TreeNode curNode;

            if (multiSelFileNodes.Count == 1)
            {
                //show single file info
                curNode = (TreeNode)multiSelFileNodes[0];
                info = (skydrive.skyItem_t)curNode.Tag;

                txbInfo.Text = "Type\t\t: " + info.iconType + Environment.NewLine;
                txbInfo.Text += "Full Name\t: " + info.fullName + Environment.NewLine;
                txbInfo.Text += "Permenent Link\t: " + info.permaLink + Environment.NewLine;
            }
            else if (multiSelFileNodes.Count >= 1)
            {
                //show multiple file info
                txbInfo.Text = "Total selected " + multiSelFileNodes.Count + " files:" + Environment.NewLine;
                for(int i = 0; i < multiSelFileNodes.Count; i++)
                {
                    TreeNode node = (TreeNode)multiSelFileNodes[i];
                    info = (skydrive.skyItem_t)node.Tag;
                    txbInfo.Text += (i+1).ToString() + " - " + info.fullName + Environment.NewLine;
                }
            }
            else
            {
                curNode = trvSkydrive.SelectedNode;
                if (curNode == null)
                {
                    txbInfo.Text = "Nothing selected." + Environment.NewLine;
                }
                else
                {
                    //show selected folder info
                    info = (skydrive.skyItem_t)curNode.Tag;
                    if (info.isFolder)
                    {
                        //highlightNode(curNode);

                        txbInfo.Text = "Type\t\t: " + info.iconType + Environment.NewLine;
                        txbInfo.Text += "Name\t\t: " + info.name + Environment.NewLine;
                        txbInfo.Text += "Folder URL\t: " + info.permaLink + Environment.NewLine;
                    }
                }
            }
        }

        private void updateShowInfo()
        {
            updateSelectInfo();
            updatePreview();
        }

        private void clearMultiSelFiles()
        {
            // clear node and highlight
            foreach (TreeNode node in multiSelFileNodes)
            {
                //for it contain remove, so can not use follow code -> lead code dead
                //multiSelRemoveNode(node);

                unHighlightNode(node);
            }

            multiSelFileNodes.Clear();
        }
        
        // highlight single selected node
        private Color highlightNode(TreeNode node)
        {
            Color oldColor = trvSkydrive.BackColor;
            if (node != null)
            {
                if (!curHighlightedNodes.Contains(node))
                {
                    oldColor = node.BackColor;
                    node.BackColor = SystemColors.MenuHighlight; // HTML #3399FF -> RGB(51,153,255)
                    //node.BackColor = nodeHlBackColor;

                    //node.ForeColor = Color.FromArgb(255, 255, 255);
                    node.ForeColor = Color.White;

                    curHighlightedNodes.Add(node);
                }
            }
                        
            return oldColor;
        }

        private Color unHighlightNode(TreeNode node)
        {
            Color oldColor = trvSkydrive.BackColor;
            if (node != null)
            {
                if (curHighlightedNodes.Contains(node))
                {
                    oldColor = node.BackColor;
                    node.BackColor = trvSkydrive.BackColor;
                    node.ForeColor = Color.Black;
                    
                    curHighlightedNodes.Remove(node);
                }
            }

            return oldColor;
        }

        private void setFolderOpenPic(TreeNode folderNode)
        {
            skydrive.skyItem_t itemInfo = getNodeItemInfo(folderNode);
            if (itemInfo.isFolder)
            {
                folderNode.ImageIndex = folderOpenIconIdx;
                folderNode.SelectedImageIndex = folderOpenIconIdx;
            }
        }

        private void toggleFolderPic(TreeNode folderNode)
        {
            skydrive.skyItem_t itemInfo = getNodeItemInfo(folderNode);
            if (itemInfo.isFolder)
            {
                if ((folderNode.ImageIndex == folderClosedIconIdx) && (folderNode.SelectedImageIndex == folderClosedIconIdx))
                {
                    folderNode.ImageIndex = folderOpenIconIdx;
                    folderNode.SelectedImageIndex = folderOpenIconIdx;
                }
                else if ((folderNode.ImageIndex == folderOpenIconIdx) && (folderNode.SelectedImageIndex == folderOpenIconIdx))
                {
                    folderNode.ImageIndex = folderClosedIconIdx;
                    folderNode.SelectedImageIndex = folderClosedIconIdx;
                }
            }
        }

        private void trvFolder_DoubleClick(object sender, EventArgs e)
        {
            if (trvSkydrive.SelectedNode != null)
            {
                skydrive.skyItem_t curInfo = getNodeItemInfo(trvSkydrive.SelectedNode);
                if (curInfo.isFolder)
                {
                    if (curInfo.folderInited)
                    {
                        //trvFolder.SelectedNode.Toggle();

                        if (trvSkydrive.SelectedNode.Nodes.Count == 0)
                        {
                            //for no childs, change its icon
                            toggleFolderPic(trvSkydrive.SelectedNode);
                        }
                    }
                    else
                    {
                        skydrive.folderItems_t folderItems = new skydrive.folderItems_t();
                        if (skydrive.getItemsUnderFolder(curInfo.id, gCid, out folderItems))
                        {
                            curInfo.folderInited = true;
                            trvSkydrive.SelectedNode.Tag = curInfo; // set back new value here

                            if (folderItems.childItems.Count > 0)
                            {
                                addItemsToNode(folderItems.childItems, trvSkydrive.SelectedNode);

                                if (!trvSkydrive.SelectedNode.IsExpanded)
                                {
                                    trvSkydrive.SelectedNode.Expand();
                                }
                            }
                            else
                            {
                                toggleFolderPic(trvSkydrive.SelectedNode);
                            }
                        }
                        else 
                        {
                            txbInfo.Text = "Can't get items under : " + curInfo.name + " !" ;
                        }
                    }
                }
                else
                {
                    if (makesureDoInsert())
                    {
                        // insert current node file
                        insertSingleFile(curInfo);

                        actionType = actionType_t.INSERTFILES;
                        this.DialogResult = DialogResult.OK;
                    }
                }
            }
        }

        private void trvFolder_MouseClick(object sender, MouseEventArgs e)
        {
            //refer: http://social.msdn.microsoft.com/Forums/en/winforms/thread/44d53918-494c-43e2-a2f7-b84ac6fc3cea
            TreeNode clickedNode = trvSkydrive.GetNodeAt(e.X, e.Y);

            //Point point = trvFolder.PointToClient(new Point(e.X, e.Y));

            if ((Control.ModifierKeys & Keys.Control) == Keys.Control)// CTRL is pressed
            {
                if ((clickedNode != null) && multiSelFileNodes.Contains(clickedNode))
                {
                    if (clickedNode == trvSkydrive.SelectedNode)
                    {
                        // not remove here, later will remove in AfterSelect event
                        //multiSelRemoveNode(clickedNode);

                        // here un-select, later can got AfterSelect envent
                        trvSkydrive.SelectedNode = null;
                    }
                }
            }

            if ((Control.ModifierKeys & Keys.Shift) == Keys.Shift)
            {
                ArrayList selectedNodes = new ArrayList();
                TreeNode parentNode = clickedNode.Parent;

                // add/remove depend on clicked node index

                // 1. extrct nodes already selected under current parent
                foreach (TreeNode node in multiSelFileNodes)
                {
                    if (node.Parent == parentNode)
                    {
                        selectedNodes.Add(node);
                    }
                }

                if(selectedNodes.Count > 0)
                {
                    // 2. calc original first and last index
                    int origFirstIdx = ((TreeNode)selectedNodes[0]).Index, origLastIdx = ((TreeNode)selectedNodes[0]).Index;
                    foreach (TreeNode node in selectedNodes)
                    {
                        if (node.Index < origFirstIdx)
                        {
                            origFirstIdx = node.Index;
                        }

                        if (node.Index > origLastIdx)
                        {
                            origLastIdx = node.Index;
                        }
                    }

                    // 3. calc new first and last, do add/remove
                    int newFirstIdx = origFirstIdx, newLastIdx = origLastIdx;
                    if (clickedNode.Index < origFirstIdx)
                    {
                        // add
                        newFirstIdx = clickedNode.Index;
                        newLastIdx = origFirstIdx - 1;
                        for (int i = newFirstIdx; i <= newLastIdx; i++)
                        {
                            multiSelAddNode(parentNode.Nodes[i]);
                        }
                    }
                    else if (clickedNode.Index > origLastIdx)
                    {
                        //add
                        newFirstIdx = origLastIdx + 1;
                        newLastIdx = clickedNode.Index;
                        for (int i = newFirstIdx; i <= newLastIdx; i++)
                        {
                            multiSelAddNode(parentNode.Nodes[i]);
                        }
                    }
                    else //origFirstIdx <= clickedNode.Index <= origLastIdx
                    {
                        //remove nodes after the selected
                        newFirstIdx = clickedNode.Index + 1;
                        newLastIdx = origLastIdx;
                        for (int i = newFirstIdx; i <= newLastIdx; i++)
                        {
                            multiSelRemoveNode(parentNode.Nodes[i]);
                        }
                    }
                }
                else
                {
                    multiSelAddNode(clickedNode);
                }
            }
        }

        private void multiSelAddNode(TreeNode nodeToAdd)
        {
            multiSelFileNodes.Add(nodeToAdd);
            highlightNode(nodeToAdd);
        }

        private void multiSelRemoveNode(TreeNode nodeToRemove)
        {
            unHighlightNode(nodeToRemove);
            multiSelFileNodes.Remove(nodeToRemove);
        }

        private void trvFolder_AfterSelect(object sender, TreeViewEventArgs e)
        {
            TreeNode curNode = trvSkydrive.SelectedNode;
            if (curNode != null)
            {
                skydrive.skyItem_t info = getNodeItemInfo(curNode);

                //refer: http://topic.csdn.net/t/20061211/08/5220903.html
                //curNode.Checked = true;

                //refer: http://www.haogongju.net/art/1271617
                if ((Control.ModifierKeys & Keys.Control) == Keys.Control)// CTRL is pressed
                {
                    if (info.isFolder)
                    {
                        clearMultiSelFiles();
                    }
                    else
                    {
                        if (multiSelFileNodes.Contains(curNode))
                        {
                            // no matter ctrl click self or other node, always remove it here, 
                            multiSelRemoveNode(curNode);

                            trvSkydrive.SelectedNode = null;
                        }
                        else 
                        {
                            multiSelAddNode(curNode);                            
                        }
                    }
                }
                else if ((Control.ModifierKeys & Keys.Shift) == Keys.Shift)// Shift is pressed
                {

                }
                else
                {
                    clearMultiSelFiles();

                    //add current node
                    if (info.isFolder)
                    {

                    }
                    else
                    {
                        if (multiSelFileNodes.Contains(curNode))
                        {
                            multiSelRemoveNode(curNode);
                        }
                        else
                        {
                            multiSelAddNode(curNode);
                        }
                    }
                }

                updateShowInfo();
            }//if (curNode != null)
        }//trvFolder_AfterSelect

        private string replacePattern(string inputStr, skydrive.skyItem_t fileInfo)
        {
            string replacedStr = inputStr;

            replacedStr = replacedStr.Replace("${name}",        fileInfo.name);
            replacedStr = replacedStr.Replace("${extension}",   fileInfo.extension);
            replacedStr = replacedStr.Replace("${fullName}",    fileInfo.fullName);
            replacedStr = replacedStr.Replace("${permaLink}",   fileInfo.permaLink);
            replacedStr = replacedStr.Replace("${iconType}",    fileInfo.iconType);
            replacedStr = replacedStr.Replace("${id}",          fileInfo.id);
            replacedStr = replacedStr.Replace("${parentFolderId}", fileInfo.parentFolderId);
            
            return replacedStr;
        }
        
        private string genInsertStr(skydrive.skyItem_t info)
        {
            string insertStr = "";
            
            switch (info.iconType)
            { 
                case "Photo" :
                    insertStr = replacePattern(Settings.Default.photoInsertPattern.ToString(), info);
                    break;
                case "Audio":
                    insertStr = replacePattern(Settings.Default.audioInsertPattern.ToString(), info);
                    break;
                case "Video":
                    insertStr = replacePattern(Settings.Default.videoInsertPattern.ToString(), info);
                    break;
                default:
                    insertStr = replacePattern(Settings.Default.otherInsertPattern.ToString(), info);
                    break;
            }

            return insertStr;
        }

        private bool makesureDoInsert()
        {
            bool doInsert = false;
            if (curSelectCotent == "")
            {
                doInsert = true;
            }
            else
            {
                DialogResult yesToInsert = MessageBox.Show("Seems you have already select some content in Windows Live Writer, so insert the string of selected files will overwrite your selected content." + Environment.NewLine + "Are you sure to conntinue to insert ?", "Insert Files", MessageBoxButtons.YesNo);
                if (yesToInsert == DialogResult.Yes)
                {
                    doInsert = true;
                }
                else
                {
                    doInsert = false;
                }
            }
            return doInsert;
        }

        private void btnInsert_Click(object sender, EventArgs e)
        {
            if (hasLogin || hasInit)
            {
                if (makesureDoInsert())
                {
                    insertSelectedFiles();
                }
            }
            else
            {
                txbInfo.Text = "Please initilize before insert selected files !";
            }
        }

        private void clearPreview()
        {
            pcbPic.Image = null;

            //restore back color
            //pcbPic.BackColor = SystemColors.ActiveCaption;
            pcbPic.BackColor = picPreviewBackColor;
        }

        private void showPreview(skydrive.skyItem_t info)
        {
            //backup back color
            picPreviewBackColor = pcbPic.BackColor;

            //pcbPic.Load(info.permLink);
            Image pic = null;

            string picUrl = "";
            if (info.picFullUrl != null && info.picFullUrl != "")
            {
                // if we have already extract the current pic full url, then use it
                //https://byfiles.storage.live.com/y1puN5FpxjWdibVujnadE8MKA9o_vnEZtU5cA3etvtvHdwjmSEuQFwL8vkH5opsLnZ-Xdcnkucy0J0/405%20if%20not%20enable%20xml-rpc.jpg
                picUrl = info.picFullUrl;
            }
            else
            {
                //otherwise use permanent link
                //http://storage.live.com/items/9A8B8BF501A38A36!548?filename=405%20if%20not%20enable%20xml-rpc.jpg
                picUrl = info.permaLink;
            }

            // seems that here the url still can NOT show for non-publich picture
            // seems that must goto storage.live.com to authenticate, then maybe can show the non-public picture
            if (skydrive.getSkydriveImageFromUrl(picUrl, out pic))
            {
                // refer: http://my.oschina.net/duluo180/blog/8131
                pcbPic.Image = pic;
                // refer: http://wenwen.soso.com/z/q163706867.htm
                pcbPic.Dock = DockStyle.Fill;
                pcbPic.SizeMode = PictureBoxSizeMode.Zoom;
            }
            else
            {
                clearPreview();
            }
        }

        private void updatePreview()
        {
            TreeNode curNode = trvSkydrive.SelectedNode;
            if (curNode == null)
            {
                clearPreview();
            }
            else
            {
                skydrive.skyItem_t info = getNodeItemInfo(curNode);

                if (info.iconType == "Photo")
                {
                    if (Settings.Default.previewPhoto)
                    {
                        showPreview(info);
                    }
                    else
                    {
                        clearPreview();
                    }
                }
                else
                {
                    clearPreview();
                }            
            }
        }
        
        private void btnReadme_Click(object sender, EventArgs e)
        {
            frmReadme readme = new frmReadme();
            //readme.Show();
            readme.ShowDialog();
        }

        private void addItemsToNode(List<skydrive.skyItem_t> itemsUnderFolder, TreeNode folerNode)
        {
            for (int i = 0; i < itemsUnderFolder.Count; i++)
            {
                skydrive.skyItem_t childItem = new skydrive.skyItem_t();
                childItem = itemsUnderFolder[i];

                int picIdx = getPicIdx(childItem.iconType, childItem.extension);
                TreeNode curNode = new TreeNode(childItem.fullName, picIdx, picIdx);
                curNode.Tag = childItem;

                folerNode.Nodes.Add(curNode);
            }
        }

        private int getPicIdx(string iconType, string extension)
        {
            int defPicIdx = (int)picIndex_e.DEFAULT;
            int picIdx = defPicIdx;

            if (iconType != null)
            {
                if (!picIdxDict.TryGetValue(iconType, out picIdx))
                {
                    picIdx = defPicIdx;
                }
            }

            if (picIdx == defPicIdx)
            {
                if (extension != null)
                {
                    if (!picIdxExtentionDict.TryGetValue(extension.ToLower(), out picIdx))
                    {
                        picIdx = defPicIdx;
                    }
                }
            }

            return picIdx;
        }

        private skydrive.skyItem_t getNodeItemInfo(TreeNode node)
        {
            skydrive.skyItem_t itemInfo = new skydrive.skyItem_t();
            if (node.Tag != null)
            {
                itemInfo = (skydrive.skyItem_t)node.Tag;
            }
            return itemInfo;
        }

        //check current selection is folder or not
        private bool curSelIsFolder()
        {
            bool selIsFolder = false;

            if ((trvSkydrive.SelectedNode != null) && (trvSkydrive.SelectedNode.Tag != null))
            {
                if (getNodeItemInfo(trvSkydrive.SelectedNode).isFolder)
                {
                    selIsFolder = true;
                }
            }

            return selIsFolder;
        }
        
        private void btnCreate_Click(object sender, EventArgs e)
        {
            // 1. check validation
            if (!curSelIsFolder())
            {
                txbInfo.Text = "Current selected is not a valid folder !";
                return;
            }

            if (!hasLogin)
            {
                txbInfo.Text = "Please login first !";
                return;
            }

            if (txbFolderToCreate.Text == "")
            {
                txbInfo.Text = "Name of folder to create is in valid !";
                return;
            }

            // 2. create folder under current selected folder
            string parentFolderId = ((skydrive.skyItem_t)trvSkydrive.SelectedNode.Tag).id;
            string respFolderJson = "";
            if (skydrive.createFoler(txbFolderToCreate.Text, parentFolderId, gCid, out respFolderJson))
            {
                txbInfo.Text = "Created folder " + txbFolderToCreate.Text + " successfully.";

                unHighlightNode(trvSkydrive.SelectedNode);
                refreshFolder(trvSkydrive.SelectedNode);
                highlightNode(trvSkydrive.SelectedNode);
            }
            else
            {
                txbInfo.Text = "Failed to create folder " + txbFolderToCreate.Text + " .";
            }
        }

        private struct localPictureInfo_t
        {
            //before upload
            public string wholeHref; //whole href part: href="file:///xxx.png"
            public string href;
            public string src;

            //public string title;
            //public string alt;

            public string fileName;         // file name with suffix
            public string fileNameNoSuf;    // file name without suffix
            public string suffix;           // file suffix
            //public string duplicateAppend;      // no duplicate -> none; multiple duplicated file, it is [1]/[2]/...
            public string hrefAddr;         // the href address
            public string thumbAddr;        // the thumb address
            public string fileToUpload;     // real address of local file for upload 
                                            // normally is the href pic
                                            // when pic size width>1024 or height>768 then is the thumb pic

            //public string parentFolderId;   // the resource id of the folder where the file will be uploaded to

            //after upload
            public string uploadedId;
            public string permaLink;        // after uplod, the real address of this file
            public string errMsg;           // 
        };


        private void btnFindLocalPictures_Click(object sender, EventArgs e)
        {
            string hrefAddr, localAddrPref, localName, realName, suffix, thumbAddr, pointSuf;
            string thisStr, wholeHref, href, title, duplicateAppend, src;
            string width, height;
            int widthInt, heightInt;

            if (curSelectCotent == "")
            {
                txbInfo.Text = "Not select any content in Windows Live Writer !";
                return;
            }

            //clear before added
            lsbLocalPictues.Items.Clear();

            //<A 
            //href="file:///C:/Users/Administrator/AppData/Local/Temp/WindowsLiveWriter-590991476/supfiles1BABFDD/wangluodan   333[2].jpg"><IMG 
            //style="BACKGROUND-IMAGE: none; BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; DISPLAY: inline; BORDER-TOP: 0px; BORDER-RIGHT: 0px; PADDING-TOP: 0px" 
            //title="wangluodan   333" border=0 alt="wangluodan   333" 
            //src="file:///C:/Users/Administrator/AppData/Local/Temp/WindowsLiveWriter-590991476/supfiles1BABFDD/wangluodan   333_thumb.jpg" 
            //width=192 height=244></A><A 
            //href="file:///C:/Users/Administrator/AppData/Local/Temp/WindowsLiveWriter-590991476/supfiles1BABFDD/wangluodan   333[5].jpg"><IMG 
            //style="BACKGROUND-IMAGE: none; BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; DISPLAY: inline; BORDER-TOP: 0px; BORDER-RIGHT: 0px; PADDING-TOP: 0px" 
            //title="wangluodan   333" border=0 alt="wangluodan   333" 
            //src="file:///C:/Users/Administrator/AppData/Local/Temp/WindowsLiveWriter-590991476/supfiles1BABFDD/wangluodan   333_thumb[1].jpg" 
            //width=192 height=244></A><A 
            //href="file:///C:/Users/Administrator/AppData/Local/Temp/WindowsLiveWriter-590991476/supfiles1BABFDD/王珞丹 22[2].jpg"><IMG 
            //style="BACKGROUND-IMAGE: none; BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; DISPLAY: inline; BORDER-TOP: 0px; BORDER-RIGHT: 0px; PADDING-TOP: 0px" 
            //title="王珞丹 22" border=0 alt="王珞丹 22" 
            //src="file:///C:/Users/Administrator/AppData/Local/Temp/WindowsLiveWriter-590991476/supfiles1BABFDD/王珞丹 22_thumb.jpg" 
            //width=230 height=244></A>

            //can find all, support all drag-in pictures, not support open from local saved
            //string imgP = @"href=""(file:///(?<localAddr>(?<localAddrPref>.+?WindowsLiveWriter.+?/supfile[^/]+?)/(?<realName>[^""]+?)\[\d+\](?<pointSuf>\.(?<suffix>\w{3,4}))))"".+?title=""?(\k<realName>)?""?.+?alt=""?(\k<realName>)?""?.+?src=""(file:///(?<thumbAddr>\k<localAddrPref>/\k<realName>_thumb(\[\d+\])?\k<pointSuf>))""";
            //string imgP = @"href=""(?<href>file:///(?<localAddr>(?<localAddrPref>.+?WindowsLiveWriter.+?/supfile[^/]+?)/(?<realName>[^""]+?)\[\d+\](?<pointSuf>\.(?<suffix>\w{3,4}))))"".+?title=""?(?<title>\k<realName>)?""?.+?alt=""?(?<alt>\k<realName>)?""?.+?src=""(?<src>file:///(?<thumbAddr>\k<localAddrPref>/\k<realName>_thumb(?<duplicateAppend>\[\d+\])?\k<pointSuf>))""";

            //try to support open from local saved
            //string imgP = @"href=""(?<href>file:///(?<localAddr>(?<localAddrPref>.+?WindowsLiveWriter.+?/supfile[^/]+?)/(?<localName>[^""]+?(?<pointSuf>\.(?<suffix>\w{3,4})))))"".+?title=""?(?<title>[^""]+?)?""?.+?alt=(?<alt>\k<title>).+?src=""(?<src>file:///(?<thumbAddr>\k<localAddrPref>/.+?_thumb.+?\k<pointSuf>))""";
            //string imgP = @"href=""(?<href>file:///(?<localAddr>(?<localAddrPref>.+?WindowsLiveWriter.+?/supfile[^/]+?)/(?<localName>[^""]+?(?<pointSuf>\.(?<suffix>\w{3,4})))))"".+?title=""?(?<title>[^""]+)?""?.+?src=""(?<src>file:///(?<thumbAddr>\k<localAddrPref>/.+?_thumb.+?\k<pointSuf>))""";

            //refer: http://msdn.microsoft.com/en-us/library/36xybswe(v=vs.71).aspx
            // try to match all drag-in and local saved
            //string imgP = @"href=""(?<href>file:///(?<localAddr>(?<localAddrPref>.+?WindowsLiveWriter.+?/supfile[^/]+?)/(?<realName>[^""]+?)(?<leftBracket>\[)?\d+(?<rightBracket>\])?(?<pointSuf>\.(?<suffix>\w{3,4}))))"".+?title=""?(?<title>(?(leftBracket)\k<realName>|.+?)?)?""?.+?src=""(?<src>file:///(?<thumbAddr>\k<localAddrPref>/\k<realName>_thumb(?<duplicateAppend>\[\d+\])?\k<pointSuf>))""";
            //string imgP = @"href=""(?<href>file:///(?<localAddr>(?<localAddrPref>.+?WindowsLiveWriter.+?/supfile[^/]+?)/(?<realName>[^""]+?)(?<leftBracket>\[)?\d+(?<rightBracket>\])?(?<pointSuf>\.(?<suffix>\w{3,4}))))"".+?title=""?(?<title>(?(leftBracket)\k<realName>|.+?))?""?.+?src=""(?<src>file:///(?<thumbAddr>\k<localAddrPref>/\k<realName>_thumb(?<duplicateAppend>\[\d+\])?\k<pointSuf>))""";

            //later will extract title and alt if necessay
            //string imgP = @"<A.+?href=""(?<href>file:///(?<localAddr>(?<localAddrPref>.+?WindowsLiveWriter.+?/supfile[^/]+?)/(?<localName>[^""]+?)(?<pointSuf>\.(?<suffix>\w{3,4}))))"".+?src=""(?<src>file:///(?<thumbAddr>\k<localAddrPref>/.+?_thumb(?<duplicateAppend>.*?)\k<pointSuf>))"".+?</A>";

            //add target="_blank" support
            //string imgP = @"<A.+?(?<wholeHref>href=""(?<href>file:///(?<localAddr>(?<localAddrPref>.+?WindowsLiveWriter.+?/supfile[^/]+?)/(?<localName>[^""]+?)(?<pointSuf>\.(?<suffix>\w{3,4}))))"").+?src=""(?<src>file:///(?<thumbAddr>\k<localAddrPref>/.+?_thumb(?<duplicateAppend>.*?)\k<pointSuf>))"".+?</A>";
            //string imgP = @"<A\s+?(?<wholeHref>href=""(?<href>file:///(?<localAddr>(?<localAddrPref>.+?WindowsLiveWriter.+?/supfile[^/]+?)/(?<localName>[^""]+?)(?<pointSuf>\.(?<suffix>\w{3,4}))))"").+?src=""(?<src>file:///(?<thumbAddr>\k<localAddrPref>/.+?_thumb(?<duplicateAppend>.*?)\k<pointSuf>))"".+?></A>";

            //note
            //(1) if the content is restore from local saved, then the picture real name maybe not same with the title and alt
            //example:
            //<P>【相关图片】</P>
            //<P><A 
            //href="file:///C:/Users/Administrator/AppData/Local/Temp/WindowsLiveWriter-1962024036/supfiles6E02926/The-bad-touch3.jpg"><IMG 
            //style="BACKGROUND-IMAGE: none; BORDER-RIGHT-WIDTH: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; DISPLAY: inline; BORDER-TOP-WIDTH: 0px; BORDER-BOTTOM-WIDTH: 0px; BORDER-LEFT-WIDTH: 0px; PADDING-TOP: 0px" 
            //title="The bad touch终极版" border=0 alt="The bad touch终极版" 
            //src="file:///C:/Users/Administrator/AppData/Local/Temp/WindowsLiveWriter-1962024036/supfiles6E02926/The-bad-touch_thumb1.jpg" 
            //width=263 height=198></A></P>
            //<P><BR></P>
            //

            //2012-09-13
            //pic max size in WLW is 1024x768, so if pic width > 1024 or height > 768, then if you set the picture is original size, then xxx_thumb[1].jpg is the real pic, and xxx[N].jpg is the one scaled to fit 1024x768
            //example:
            //<A \r\nhref="file:///C:/Users/CLi/AppData/Local/Temp/WindowsLiveWriter-1313852349/supfiles4029AF/add pinyin keyboard - 322 - 2[6].png"><IMG \r\nstyle="BACKGROUND-IMAGE: none; BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; DISPLAY: inline; BORDER-TOP: 0px; BORDER-RIGHT: 0px; PADDING-TOP: 0px" \r\ntitle="add pinyin keyboard - 322 - 2" border=0 \r\nalt="add pinyin keyboard - 322 - 2" \r\nsrc="file:///C:/Users/CLi/AppData/Local/Temp/WindowsLiveWriter-1313852349/supfiles4029AF/add pinyin keyboard - 322 - 2_thumb[2].png" \r\nwidth=1174 height=2104></A>
            //add pinyin keyboard - 322 - 2[6].png          is 428x768
            //add pinyin keyboard - 322 - 2_thumb[2].png    is 1170x2100
            // so use its src as the file to upload
            string imgP = @"<A\s+?(?<wholeHref>href=""(?<href>file:///(?<localAddr>(?<localAddrPref>.+?WindowsLiveWriter.+?/supfile[^/]+?)/(?<localName>[^""]+?)(?<pointSuf>\.(?<suffix>\w{3,4}))))"").+?src=""(?<src>file:///(?<thumbAddr>\k<localAddrPref>/.+?_thumb(?<duplicateAppend>.*?)\k<pointSuf>))"".+?width=(?<width>\d+)\s+?height=(?<height>\d+).*?></A>";

            //note:
            //(1)follow code will exception if in above, the groupName in  \k<groupName>, is not defined in previously named group !
            //Regex imgRx = new Regex(imgP, RegexOptions.Singleline);
            Regex imgRx = new Regex(imgP, RegexOptions.Singleline | RegexOptions.IgnoreCase);
            MatchCollection foundImg = imgRx.Matches(curSelectCotent);

            if (foundImg.Count > 0)
            {
                foreach (Match found in foundImg)
                {
                    localPictureInfo_t picInfo = new localPictureInfo_t();
                    
                    thisStr         = found.Groups[0].ToString();
                    wholeHref       = found.Groups["wholeHref"].Value;
                    href            = found.Groups["href"].Value;
                    hrefAddr       = found.Groups["localAddr"].Value;
                    localAddrPref   = found.Groups["localAddrPref"].Value;
                    localName       = found.Groups["localName"].Value;
                    pointSuf        = found.Groups["pointSuf"].Value;
                    suffix          = found.Groups["suffix"].Value;
                    src             = found.Groups["src"].Value;
                    duplicateAppend = found.Groups["duplicateAppend"].Value;
                    thumbAddr       = found.Groups["thumbAddr"].Value;

                    width = found.Groups["width"].Value;
                    height = found.Groups["height"].Value;

                    //calc real name
                    realName = localName;
                    string realnameP = @"(.+?)\[\d+\]"; // is newly drag-in pictures
                    string extractedRealName = "";
                    if (skydrive.commLib.extractSingleStr(realnameP, localName, out extractedRealName))
                    {
                        if (!System.IO.File.Exists(hrefAddr))
                        {
                            // if the file is not exist, that must be like "#"->"%23", so need decode it out to real char "#"
                            extractedRealName = HttpUtility.UrlDecode(extractedRealName);
                        }
                        realName = extractedRealName;
                    }
                    else // the local name not is something like xxxx[2]
                    {
                        //find title and alt, here must be contains title="xxx" and alt="xxx"
                        string titleAltP = @"title=""?(?<title>[^""]+)""? border=.+?alt=""?\k<title>""?";
                        Regex titleAltRx = new Regex(titleAltP);
                        Match foundTitleAlt = titleAltRx.Match(thisStr);
                        if(foundTitleAlt.Success)
                        {
                            title = foundTitleAlt.Groups["title"].Value;
                            if (title != "")
                            {
                                realName = title;
                            }
                        }
                    }

                    string decodedHrefAddr, decodedThumbAddr;
                    //from
                    //C:/Users/CLi/AppData/Local/Temp/WindowsLiveWriter1608916896/supfilesCF627D/但是对应的C%23中该文件项目属性是不拷贝[2].jpg
                    //to
                    //C:/Users/CLi/AppData/Local/Temp/WindowsLiveWriter1608916896/supfilesCF627D/但是对应的C#中该文件项目属性是不拷贝[2].jpg
                    decodedHrefAddr = hrefAddr;
                    if (!System.IO.File.Exists(hrefAddr))
                    {
                        //note: for normal file name contain "+", should not use this urldecode, otherwise it will decode "+" to " ", which is not the real file address !
                        decodedHrefAddr = HttpUtility.UrlDecode(hrefAddr);
                    }

                    decodedThumbAddr = thumbAddr;
                    if (!System.IO.File.Exists(thumbAddr))
                    {
                        decodedThumbAddr = HttpUtility.UrlDecode(thumbAddr);
                    }

                    //set values
                    picInfo.wholeHref       = wholeHref;
                    picInfo.href            = href;
                    picInfo.src             = src;
                    picInfo.hrefAddr        = decodedHrefAddr;
                    picInfo.thumbAddr       = decodedThumbAddr;
                    picInfo.suffix          = suffix;
                    //makesure not not same with before
                    picInfo.fileNameNoSuf   = realName + duplicateAppend;
                    picInfo.fileName        = picInfo.fileNameNoSuf + pointSuf;

                    //set the real file address for upload
                    widthInt = Int32.Parse(width);
                    heightInt = Int32.Parse(height);
                    //when exceed, after you set the pic to original size, then the thumb is the real size
                    //while the href pic is the shrinked size to fit 1024x768
                    //so set the file to upload the the original size == thumb pic
                    if ((widthInt > 1024) || (heightInt > 768))
                    {
                        picInfo.fileToUpload = picInfo.thumbAddr;
                    }
                    else
                    {
                        picInfo.fileToUpload = picInfo.hrefAddr;
                    }
                    
                    foundLocalPictures.Add(picInfo);

                    string listItemName = "[" + lsbLocalPictues.Items.Count.ToString() + "] ";
                    listItemName += picInfo.fileName;

                    lsbLocalPictues.Items.Add(listItemName);
                }
            }
        }

        private bool uploadFileToSkydrive(string fileAbsAddr, string parentId, string uploadFileName, out string resourceId, out string errMsg)
        {
            return skydrive.uploadFile(fileAbsAddr, Settings.Default.uploadAutoHandleFilename, parentId, Settings.Default.uploadOverwrite, uploadFileName, out resourceId, out errMsg);
        }

        private bool uploadFileToSkydrive(string fileAbsAddr, string parentId, out string resourceId, out string errMsg)
        {
            return skydrive.uploadFile(fileAbsAddr, Settings.Default.uploadAutoHandleFilename, parentId, Settings.Default.uploadOverwrite, out resourceId, out errMsg);
        }
        
        private void btnFindDropinFiles_Click(object sender, EventArgs e)
        {
            // 1. check validation
            if (!curSelIsFolder())
            {
                txbInfo.Text = "Current selected is not a valid folder !";
                return;
            }

            if (!hasLogin)
            {
                txbInfo.Text = "Please login first !";
                return;
            }

            if (foundLocalPictures.Count == 0)
            {
                txbInfo.Text = "No file in found local pictures list !";
                return;
            }

            // upload and replace
            replacedContent = curSelectCotent;

            string parentFolderId = getNodeItemInfo(trvSkydrive.SelectedNode).id;
            List<localPictureInfo_t> uploadedOkList = new List<localPictureInfo_t>();
            List<localPictureInfo_t> uploadedErrorList = new List<localPictureInfo_t>();

            foreach (localPictureInfo_t picFile in foundLocalPictures)
            {
                localPictureInfo_t picToUpload = picFile;

                //upload files, and got perma link
                if (uploadFileToSkydrive(picToUpload.fileToUpload, parentFolderId, picToUpload.fileName, out picToUpload.uploadedId, out picToUpload.errMsg))
                {
                    picToUpload.permaLink = skydrive.genSkyPermaLink(picToUpload.fileName, picToUpload.uploadedId);

                    //replace back to selected content
                    //also can use MatchEvaluator
                    //here just use simple replace
                    if (Settings.Default.openInNewWin)
                    {
                        string hrefTarget = "href=\"" + picToUpload.permaLink + "\" target=\"_blank\"";
                        replacedContent = replacedContent.Replace(picToUpload.wholeHref, hrefTarget);
                    }
                    else
                    {
                        replacedContent = replacedContent.Replace(picToUpload.href, picToUpload.permaLink);
                    }

                    replacedContent = replacedContent.Replace(picToUpload.src, picToUpload.permaLink);

                    uploadedOkList.Add(picToUpload);
                }
                else
                {
                    uploadedErrorList.Add(picToUpload);
                }
            }

            foundLocalPictures.Clear();

            string uploadResult = "";
            if (uploadedOkList.Count > 0)
            {
                uploadResult += "Successfully upload " + uploadedOkList.Count.ToString() + " pictures:" + Environment.NewLine;
                //foreach ( in uploadedOkList)
                for(int i = 0; i < uploadedOkList.Count; i++)
                {
                    localPictureInfo_t okUploaded = uploadedOkList[i];
                    uploadResult += "[" + i.ToString() + "] " + okUploaded.fileName + Environment.NewLine;
                }
            }

            if (uploadedErrorList.Count > 0)
            {
                uploadResult += "Failed to upload " + uploadedErrorList.Count.ToString() + " pictures:" + Environment.NewLine;
                for (int i = 0; i < uploadedErrorList.Count; i++)
                {
                    localPictureInfo_t errUploaded = uploadedErrorList[i];
                    uploadResult += "[" + i.ToString() + "] " + errUploaded.fileName + Environment.NewLine + "; Error=" + errUploaded.errMsg;
                }
            }

            MessageBox.Show(uploadResult);

            actionType = actionType_t.UPLOADANDREPLACE;
            this.DialogResult = DialogResult.OK;
        }

        private void btnSelectUploadFile_Click(object sender, EventArgs e)
        {
            ofdSelectFileToUpload.Title = "Choose file to upload";
            ofdSelectFileToUpload.Filter = "Any file (*.*)|*.*";
            //ofdSelectFileToUpload.FilterIndex = 1;
            ofdSelectFileToUpload.RestoreDirectory = true;
            ofdSelectFileToUpload.Multiselect = true;

            if (ofdSelectFileToUpload.ShowDialog() == System.Windows.Forms.DialogResult.OK)
            {
                string[] files = ofdSelectFileToUpload.FileNames;
                foreach (string file in files)
                {
                    lsbFilesToUpload.Items.Add(file);
                }
            }
        }

        //refresh folder
        private void refreshFolder(TreeNode folderNode)
        {
            skydrive.skyItem_t folderInfo = getNodeItemInfo(folderNode);
            folderInfo.folderInited = false;

            //remove all child nodes
            folderNode.Nodes.Clear();
                        
            //reopen this folder
            skydrive.folderItems_t folderItems = new skydrive.folderItems_t();
            if (skydrive.getItemsUnderFolder(folderInfo.id, gCid, out folderItems))
            {
                addItemsToNode(folderItems.childItems, folderNode);
                folderInfo.folderInited = true;
                folderNode.Tag = folderInfo; // set back new value here
            }

            if (folderNode.Nodes.Count > 0)
            {
                folderNode.Expand();
            }
            else
            {
                setFolderOpenPic(folderNode);
            }
        }

        private void selectNode(string childId, TreeNode parentNode)
        {
            foreach (TreeNode childNode in parentNode.Nodes)
            {
                if (getNodeItemInfo(childNode).id == childId)
                {
                    trvSkydrive.SelectedNode = childNode;
                    break;
                }
            }
        }

        private void btnUploadFile_Click(object sender, EventArgs e)
        {
            // 1. check validation
            if (!curSelIsFolder())
            {
                txbInfo.Text = "Current selected is not a valid folder !";
                return;
            }

            if (!hasLogin)
            {
                txbInfo.Text = "Please login first !";
                return;
            }

            if(lsbFilesToUpload.Items.Count <= 0)
            {
                txbInfo.Text = "Please select file or input file for upload !";
                return;
            }

            string uploadingFile = "";

            string parentId = getNodeItemInfo(trvSkydrive.SelectedNode).id;
            string uploadedResId = "", errMsg = "";
            List<string> successfulList = new List<string>();
            Dictionary<string, string> errorList = new Dictionary<string, string>();
                
            foreach (string absFileName in lsbFilesToUpload.Items)
            {
                uploadingFile = absFileName;

                if (uploadFileToSkydrive(absFileName, parentId, out uploadedResId, out errMsg))
                {
                    successfulList.Add(absFileName);
                }
                else
                {
                    errorList.Add(absFileName, errMsg);
                }
            }

            //just refresh folder to show new uploaded file
            unHighlightNode(trvSkydrive.SelectedNode);
            refreshFolder(trvSkydrive.SelectedNode);
            highlightNode(trvSkydrive.SelectedNode);

            lsbFilesToUpload.Items.Clear();

            txbInfo.Text = "For upload files:" + Environment.NewLine;
            if (successfulList.Count > 0)
            {
                txbInfo.Text += "[Successful List]" + Environment.NewLine;
                for (int i = 0; i < successfulList.Count; i++)
                {
                    string absFileName = successfulList[i];
                    txbInfo.Text += "[" + i.ToString() + "] " + absFileName + Environment.NewLine;
                }
            }
            else
            {
                //txbInfo.Text += "None." + Environment.NewLine;
            }

            if (errorList.Count > 0)
            {
                txbInfo.Text += "[Error List]" + Environment.NewLine;
                int i = 0;
                foreach(string errFilename in errorList.Keys)
                {
                    string gotErrMsg = "";
                    if(errorList.TryGetValue(errFilename, out gotErrMsg))
                    {
                        txbInfo.Text += "[" + i.ToString() + "] " + errFilename + ", Error Info:" + gotErrMsg + Environment.NewLine;
                    }
                }
            }
            else
            {
                //txbInfo.Text += "None." + Environment.NewLine;
            }
        }

        private void btnSettings_Click(object sender, EventArgs e)
        {
            frmSettings frmSettings = new frmSettings();
            //frmSettings.Show();
            frmSettings.ShowDialog();

            skydrive.genAddSufList();
        }
        
        private void tctLoginMode_SelectedIndexChanged(object sender, EventArgs e)
        {
            updateLoginMode();
        }

        private void txbLiveid_Leave(object sender, EventArgs e)
        {
            if (txbLiveid.Text != Settings.Default.liveId)
            {
                Settings.Default.liveId = txbLiveid.Text;
                Settings.Default.Save();
            }
        }

        private void txbSkydriveFolderUrl_Leave(object sender, EventArgs e)
        {
            if (txbSkydriveFolderUrl.Text != Settings.Default.skydriveFolderUrl)
            {
                Settings.Default.skydriveFolderUrl = txbSkydriveFolderUrl.Text;
                Settings.Default.Save();
            }
        }

        private void trvFolder_AfterExpand(object sender, TreeViewEventArgs e)
        {
            TreeNode clickedNode = e.Node;
            skydrive.skyItem_t itemInfo = getNodeItemInfo(clickedNode);
            if (itemInfo.isFolder)
            {
                clickedNode.ImageIndex = folderOpenIconIdx;
                clickedNode.SelectedImageIndex = folderOpenIconIdx;
            }
        }

        private void trvFolder_AfterCollapse(object sender, TreeViewEventArgs e)
        {
            TreeNode clickedNode = e.Node;
            skydrive.skyItem_t itemInfo = getNodeItemInfo(clickedNode);
            if (itemInfo.isFolder)
            {
                clickedNode.ImageIndex = folderClosedIconIdx;
                clickedNode.SelectedImageIndex = folderClosedIconIdx;
            }
        }

        private void trvFolder_NodeMouseClick(object sender, TreeNodeMouseClickEventArgs e)
        {
        }

        private void trvFolder_NodeMouseDoubleClick(object sender, TreeNodeMouseClickEventArgs e)
        {
        }

        private void trvFolder_Leave(object sender, EventArgs e)
        {
            if (trvSkydrive.SelectedNode != null)
            {
                highlightNode(trvSkydrive.SelectedNode);
            }
        }

        private void trvFolder_Enter(object sender, EventArgs e)
        {
            if (trvSkydrive.SelectedNode != null)
            {
                unHighlightNode(trvSkydrive.SelectedNode);
            }
        }
        
        private void clearGlobalValues()
        {
            gCid = "";
            foundLocalPictures.Clear();
        }

        private void doClean()
        {
            trvSkydrive.Nodes.Clear();
            trvSkydrive.SelectedNode = null;
            clearMultiSelFiles();
            updateShowInfo();
        }

        private void doWorkBeforeLogout()
        {
            saveLatestLoginInfo();
        }

        private void doLogout()
        {
            //if (hasLogin)
            {
                doWorkBeforeLogout();

                // clear skydrive cookies and other global values
                skydrive.logoutSkydrive(txbLiveid.Text);

                hasLogin = false;
                updateLoginMode();
                
                clearGlobalValues();
            }
        }

        private void logoutAndClean()
        {
            doLogout();

            doClean();
        }

        public void clearLoginInfo()
        {
            Settings.Default.loginInfoStr = "";
            Settings.Default.Save();
        }
        
        private bool updateLoginInfo(skydrive.loginInfo_t loginInfo)
        {
            bool updateOk = false;

            string serializedStr = "";

            loginInfo.lastUpldateTime = DateTime.Now;

            if (skydrive.commLib.serializeObjToStr(loginInfo, out serializedStr))
            {
                Settings.Default.loginInfoStr = serializedStr;
                Settings.Default.Save();

                updateOk = true;
            }

            return updateOk;
        }

        //restore login info
        //if OK, also pass all login info to skydrive
        public bool restoreLoginInfo(string username, out skydrive.loginInfo_t loginInfo)
        {
            bool restoreOk = false;

            loginInfo.valid = false;
            loginInfo.username = "";
            loginInfo.cid = "";
            loginInfo.appid = "";
            loginInfo.bitProtocol = "";
            loginInfo.canary = "";
            loginInfo.cookies = new CookieCollection();
            loginInfo.createdTime = new DateTime(1970, 1, 1);
            loginInfo.lastUpldateTime = loginInfo.createdTime;

            try
            {
                //restore login info
                object deserializedObj = null;
                if (skydrive.commLib.deserializeStrToObj(Settings.Default.loginInfoStr, out deserializedObj))
                {
                    loginInfo = (skydrive.loginInfo_t)deserializedObj;

                    // current only support single user, so should check username is same or not
                    if (username == loginInfo.username)
                    {
                        bool cookiesHasExpired = false;

                        ////check cookie validation
                        //// currently, even has got 'keep login' type cookie, but still will expire after 24 hour (1 day)
                        //// so here should check whether the cookie has expired
                        //TimeSpan tsElapsed = DateTime.Now - loginInfo.createdTime;
                        //TimeSpan tsOneDay = TimeSpan.FromDays(1);
                        //int exceedOneDay = TimeSpan.Compare(tsElapsed, tsOneDay);
                        //if (exceedOneDay > 0)
                        //{
                        //    cookiesHasExpired = true;
                        //}

                        if (!cookiesHasExpired)
                        {
                            // parse the login info only when it is valid
                            skydrive.restoreSkydriveLoginInfo(loginInfo);

                            restoreOk = true;
                        }
                    }
                }
            }
            catch
            {
                restoreOk = false;
            }
            
            return restoreOk;
        }

        // update/save the latest login info(expecially latest cookies)
        // -> to void cookie expires(cookies will expire after 24 Hour)
        // -> make keep-login is valid all time
        private void saveLatestLoginInfo()
        {
            CookieCollection latestCookies = new CookieCollection();

            //extract latest login info/cookies
            //only save the cookies while in login status
            if (skydrive.getCurLoginCookies(out latestCookies))
            {
                skydrive.loginInfo_t loginInfo;
                if (restoreLoginInfo(txbLiveid.Text, out loginInfo))
                {
                    loginInfo.cookies = latestCookies;
                    //save into settings
                    updateLoginInfo(loginInfo);
                }
            }
        }

        private bool initRootNode(string folderId, string cid)
        {
            bool initRootOk = false;

            skydrive.folderItems_t folderItems = new skydrive.folderItems_t();
            if (skydrive.getItemsUnderFolder(folderId, cid, out folderItems))
            {
                // set root item
                skydrive.skyItem_t rootItem = folderItems.selfItem;

                rootItem.folderInited = true; // has open and added nodes

                int picIdx = getPicIdx(rootItem.iconType, rootItem.extension);
                TreeNode rootNode = new TreeNode(rootItem.fullName, picIdx, picIdx);
                rootNode.Tag = rootItem;

                trvSkydrive.Nodes.Add(rootNode);
                trvSkydrive.SelectedNode = rootNode;

                addItemsToNode(folderItems.childItems, trvSkydrive.SelectedNode);

                if (!trvSkydrive.SelectedNode.IsExpanded)
                {
                    trvSkydrive.SelectedNode.Expand();
                }

                highlightNode(trvSkydrive.SelectedNode);

                initRootOk = true;
            }

            return initRootOk;
        }

        //login using restored info and init root node
        private bool loginAndInitUseRestoreInfo(string liveid)
        {
            skydrive.loginInfo_t loginInfo;

            bool loginInitOk = false;

            if (restoreLoginInfo(liveid, out loginInfo))
            {
                gCid = loginInfo.cid;

                if (initRootNode("root", gCid))
                {
                    txbInfo.Text = liveid + " login and init root node successfully.";
                    hasLogin = true;
                    
                    updateLoginMode();

                    loginInitOk = true;

                    //txbInfo.Text = "";
                    //txbInfo.Text += "Login info     created time: " + loginInfo.createdTime.ToString() + Environment.NewLine;
                    //txbInfo.Text += "Login info last update time: " + loginInfo.lastUpldateTime.ToString() + Environment.NewLine;
                    //txbInfo.Text += Environment.NewLine + Environment.NewLine;
                    //foreach (Cookie ck in loginInfo.cookies)
                    //{
                    //    txbInfo.Text += "name=" + ck.Name + ",\t";
                    //    txbInfo.Text += "Expires=" + ck.Expires.ToString() + ",\t";
                    //    txbInfo.Text += "Value=" + ck.Value + ",\t";
                    //    txbInfo.Text += "Domain=" + ck.Domain + ",\t";
                    //    txbInfo.Text += "Path=" + ck.Path + ",\t";
                    //    txbInfo.Text += "Secure=" + ck.Secure.ToString() + ",\t";
                    //    txbInfo.Text += "HttpOnly=" + ck.HttpOnly.ToString() + ",\t";
                    //    txbInfo.Text += Environment.NewLine;
                    //}
                }
                else
                {
                    txbInfo.Text = liveid + " restore login info OK but init root node failed.";
                    hasLogin = false;

                    // init node fail
                    // clear
                    logoutAndClean();
                    // so clear not-usable login info
                    // to void in logoutAndClean will save the latest cookie info again
                    clearLoginInfo();
                }
            }
            else
            {
                txbInfo.Text = liveid + " restore login info failed.";

                // init node fail
                // clear
                logoutAndClean();
                // so clear not-usable login info
                // to void in logoutAndClean will save the latest cookie info again
                clearLoginInfo();
            }

            return loginInitOk;
        }

        private bool loginAndInitUsePassword(string liveid, string password)
        {
            bool loginInitOk = false;

            if (password == "")
            {
                txbInfo.Text = liveid + " login failed: please input your password !";
            }
            else
            {
                skydrive.loginInfo_t loginInfo;
                if (skydrive.longinSkydrive(liveid, password, Settings.Default.isKeepLogin, out loginInfo))
                {
                    txbInfo.Text = liveid + " login successfully.";

                    gCid = loginInfo.cid;

                    if (initRootNode("root", gCid))
                    {
                        txbInfo.Text = liveid + " login and init root node successfully.";
                        hasLogin = true;

                        updateLoginMode();
                        
                        //store login info if keep-login
                        if (Settings.Default.isKeepLogin)
                        {
                            updateLoginInfo(loginInfo);
                        }

                        loginInitOk = true;
                    }
                    else
                    {
                        txbInfo.Text = liveid + " use password login OK but init root node failed.";
                        hasLogin = false;
                    }
                }
                else
                {
                    txbInfo.Text = liveid + " login failed: maybe incorrect password !";
                }
            }

            return loginInitOk;
        }

        private void btnLogin_Click(object sender, EventArgs e)
        {
            if (hasLogin)
            {
                //logout
                logoutAndClean();
            }
            else
            {
                //login
                doClean();

                if (Settings.Default.isKeepLogin)
                {
                    // first try the previously stored login info then init root node
                    if (loginAndInitUseRestoreInfo(txbLiveid.Text))
                    {

                    }
                    else
                    {
                        // if resotre login info fail, or restore login info OK but init root node fail,
                        // then use the input usename and password to retry to login and init
                        loginAndInitUsePassword(txbLiveid.Text, txbPassword.Text);
                    }
                }
                else
                {
                    //clear stored login info if not use keep login
                    clearLoginInfo();

                    loginAndInitUsePassword(txbLiveid.Text, txbPassword.Text);
                }
            }

            //no matter ok or not, both clear password
            txbPassword.Text = "";
        }

        private void btnInit_Click(object sender, EventArgs e)
        {
            logoutAndClean();
            clearGlobalValues();

            hasInit = false;

            string extractedFolderId = "", extractedCid = "";
            if (skydrive.extractIdFromUrl(txbSkydriveFolderUrl.Text, out extractedCid, out extractedFolderId))
            {
                gCid = extractedCid;
                if (extractedFolderId == "")
                {
                    extractedFolderId = "root";
                }

                if (initRootNode(extractedFolderId, gCid))
                {
                    hasInit = true;
                    updateLoginMode();
                }
            }

            if (hasInit)
            {
                //previous has output seleted folder info, here should not overwrite it
                //txbInfo.Text = "Init OK. Extract info from input skydrive folder url: cid=" + extractedCid + " folderId=" + extractedFolderId;
            }
            else
            {
                txbInfo.Text = "Init falied for input skydrive url=" + txbSkydriveFolderUrl.Text;
            }
        }
        
        private void updateLoginMode()
        {
            if (tctLoginMode.SelectedTab == tpgLogin)
            {
                curLoginMode = loginMode_t.LOGIN;

                if (hasLogin)
                {
                    //txbLiveid.Enabled = false;
                    txbLiveid.ReadOnly = true;
                    txbPassword.Visible = false;
                    lblPassword.Visible = false;

                    btnLogin.Text = "Logout";

                    grbCreateFolder.Enabled = true;
                    grbUploadFile.Enabled = true;
                    grbFindUploadReplace.Enabled = true;
                }
                else
                {
                    //txbLiveid.Enabled = true;
                    txbLiveid.ReadOnly = false;

                    txbPassword.Visible = true;
                    lblPassword.Visible = true;

                    btnLogin.Text = "Login";

                    grbCreateFolder.Enabled = false;
                    txbFolderToCreate.Name = "";

                    grbUploadFile.Enabled = false;
                    lsbFilesToUpload.Items.Clear();

                    grbFindUploadReplace.Enabled = false;
                    lsbLocalPictues.Items.Clear();
                }
            }
            else if (tctLoginMode.SelectedTab == tpgUnlogin)
            {
                curLoginMode = loginMode_t.UNLOGIN;
            }
            else
            {
                curLoginMode = loginMode_t.INVALID;
            }
            
            updateCommonFuncPart();
        }

        private void updateCommonFuncPart()
        {
            if (curLoginMode == loginMode_t.LOGIN)
            {
                if (hasLogin)
                {
                    this.AcceptButton = this.btnInsert;
                    grbCommonFunc.Enabled = true;
                }
                else
                {
                    this.AcceptButton = this.btnLogin;
                    grbCommonFunc.Enabled = false;
                }
            }
            else if (curLoginMode == loginMode_t.UNLOGIN)
            {
                if (hasInit)
                {
                    this.AcceptButton = this.btnInsert;
                    grbCommonFunc.Enabled = true;
                }
                else
                {
                    this.AcceptButton = this.btnInit;
                    grbCommonFunc.Enabled = false;
                }
            }
            else
            {
                this.AcceptButton = null;
                grbCommonFunc.Enabled = false;
            }
        }

        private void btnRefreshFolder_Click(object sender, EventArgs e)
        {
            // 1. check validation
            if (!curSelIsFolder())
            {
                txbInfo.Text = "Current selected is not a valid folder !";
                return;
            }

            refreshFolder(trvSkydrive.SelectedNode);

            updateShowInfo();
        }

        private void txbPassword_KeyDown(object sender, KeyEventArgs e)
        {
            //if (e.KeyCode == Keys.Enter)
            //{
            //    MessageBox.Show("Got enter key!");
            //}
        }

        private void trvSkydrive_BeforeSelect(object sender, TreeViewCancelEventArgs e)
        {
            //unHighlightNode(trvSkydrive.SelectedNode);
        }

        private void ckbKeepLogin_CheckedChanged(object sender, EventArgs e)
        {
            Settings.Default.isKeepLogin = ckbKeepLogin.Checked;

            if (Settings.Default.isKeepLogin == false)
            {
                //clear previously stored login info
                clearLoginInfo();
            }

            Settings.Default.Save();
        }

        private void frmInsertSkydriveFile_FormClosing(object sender, FormClosingEventArgs e)
        {
            doWorkBeforeLogout();
        }
    }
}
