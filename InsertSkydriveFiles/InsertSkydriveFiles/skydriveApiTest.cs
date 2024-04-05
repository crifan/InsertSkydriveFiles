using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

//namespace InsertSkydriveFiles
//{
//    class skydriveApiTest
//    {
//    }
//}


namespace HgCo.WindowsLive.SkyDrive
{
    public class skydriveApiTest
    {
        private const string TestWebFolderName = "Testing SkyDrive API";
        private const string TestWebFile = "D:\\tmp\\背景.docx";
        private const string TestWebFileName2 = "sample.png";
        private const string TestWebFileName3 = "sample.url";

        public skydriveApiTest()
        { }

        public void testSkydriveOperation(string username, string password)
        {
            SkyDriveServiceClient wcSkyDrive = new SkyDriveServiceClient();
            //SkyDriveWebClient wcSkyDrive = new SkyDriveWebClient();
            WebFolderInfo testWebFolder = null;
            try
            {
                // Log on to a user account
                //wcSkyDrive.LogOn(
                //    ConfigurationSettings.AppSettings["UserName"],
                //    ConfigurationSettings.AppSettings["Password"]);

                wcSkyDrive.LogOn(username, password);

                // Get SkyDrive storage info
                var webDriveInfo = wcSkyDrive.GetWebDriveInfo();

                //// Create a folder in SkyDrive's root
                //testWebFolder = wcSkyDrive.CreateRootWebFolder(TestWebFolderName, WebFolderCategoryType.None, WebFolderItemShareType.Private);

                //// List folders in SkyDrive's root and find the test folder
                //WebFolderInfo[] rootWebFolders = wcSkyDrive.ListRootWebFolders();

                //// Serialize root folders
                //var serializerBinary = new BinaryFormatter();
                //using (var fs = new FileStream("RootFolders.dat", FileMode.Create))
                //    serializerBinary.Serialize(fs, rootWebFolders);
                //// Deserialize root folders
                //using (var fs = new FileStream("RootFolders.dat", FileMode.Open))
                //{
                //    var webFolders = serializerBinary.Deserialize(fs) as WebFolderInfo[];
                //}

                //// Serialize root folders
                //var serializerXml = new XmlSerializer(typeof(WebFolderInfo[]));
                //using (var fs = new FileStream("RootFolders.xml", FileMode.Create))
                //    serializerXml.Serialize(fs, rootWebFolders);
                //// Deserialize root folders
                //using (var fs = new FileStream("RootFolders.xml", FileMode.Open))
                //{
                //    var webFolders = serializerXml.Deserialize(fs) as WebFolderInfo[];
                //}

                //foreach (WebFolderInfo rootWebFolder in rootWebFolders)
                //    if (rootWebFolder.Name == TestWebFolderName)
                //    {
                //        testWebFolder = rootWebFolder;
                //        break;
                //    }

                //// Change folder ContentType to Documents
                //testWebFolder.CategoryType = WebFolderCategoryType.Favorites;
                //testWebFolder.CategoryType = WebFolderCategoryType.Documents;

                ////// Download test webfolder icon
                //////WebFolderItemImageInfo
                //////WebFolderItemIconInfo folerIcon = new WebFolderItemIconInfo();
                //////wcSkyDrive
                ////testWebFolder.ItemType = WebFolderItemType.Folder;
                ////System.Drawing.Image imgTestContentType = wcSkyDrive.DownloadWebFolderItemImage(testWebFolder.WebIcon.ContentTypeWebImage);
                ////if (imgTestContentType != null)
                ////    imgTestContentType.Save("TestWebFolder.ContentType.png", System.Drawing.Imaging.ImageFormat.Png);
                ////System.Drawing.Image imgTestContent = wcSkyDrive.DownloadWebFolderItemImage(testWebFolder.WebIcon.ContentWebImage);
                ////if (imgTestContent != null)
                ////    imgTestContent.Save("TestWebFolder.Content.png", System.Drawing.Imaging.ImageFormat.Png);
                ////System.Drawing.Image imgTestShareType = wcSkyDrive.DownloadWebFolderItemImage(testWebFolder.WebIcon.ShareTypeWebImage);
                ////if (imgTestShareType != null)
                ////    imgTestShareType.Save("TestWebFolder.ShareType.png", System.Drawing.Imaging.ImageFormat.Png);
                ////System.Drawing.Image imgTestIcon = wcSkyDrive.DownloadWebFolderItemIcon(testWebFolder.WebIcon);
                ////imgTestIcon.Save("TestWebFolder.Icon.png", System.Drawing.Imaging.ImageFormat.Png);

                //// Create a sub folder
                //WebFolderInfo testSubWebFolder = wcSkyDrive.CreateSubWebFolder(TestWebFolderName, testWebFolder);
                //// Get new subfolder's data
                ////var testSubWebFolder = WebFolderInfo.CreateSubWebFolderInstance(TestWebFolderName, testWebFolder);
                ////testSubWebFolder = wcSkyDrive.GetWebFolder(testSubWebFolder);

                //// List test folder's sub folders
                //WebFolderInfo[] testWebFolders = wcSkyDrive.ListSubWebFolders(testWebFolder);
                //foreach (WebFolderInfo webFolder in testWebFolders)
                //{
                //    //wcSkyDrive.ChangeWebFolderDescription(
                //    //    webFolder,
                //    //    String.Format("Description for {0}.", webFolder.Name));
                //    //wcSkyDrive.GetWebFolder(webFolder);
                //    webFolder.Description = String.Format("Description for {0}.", webFolder.Name);
                //}

                //// Upload sample files
                //WebFileInfo uploadedFile = wcSkyDrive.UploadWebFile(TestWebFile, testWebFolder);
                ////wcSkyDrive.UploadWebFile(TestWebFileName2, testWebFolder);
                ////wcSkyDrive.UploadWebFile(TestWebFileName3, testWebFolder);

                ////// Get new uploaded webfiles' data
                ////var testWebFile1 = WebFileInfo.CreateWebFileInstance(TestWebFile, testWebFolder);
                ////testWebFile1 = wcSkyDrive.GetWebFile(testWebFile1);
                ////var testWebFile2 = WebFileInfo.CreateWebFileInstance(TestWebFileName2, testWebFolder);
                ////testWebFile2 = wcSkyDrive.GetWebFile(testWebFile2);
                ////var testWebFile3 = WebFileInfo.CreateWebFileInstance(TestWebFileName3, testWebFolder);
                ////testWebFile3 = wcSkyDrive.GetWebFile(testWebFile3);

                //// List test folder's files
                ////WebFileInfo[] testWebFiles = wcSkyDrive.ListSubWebFolderFiles(testWebFolder);
                //WebFileInfo[] testWebFiles = testWebFolder.GetFiles();

                //// Serializing files of Test folder
                //using (var fs = new FileStream("TestFolderFiles.dat", FileMode.Create))
                //    serializerBinary.Serialize(fs, testWebFiles);
                //// Deserializing files of Test folder
                //using (var fs = new FileStream("TestFolderFiles.dat", FileMode.Open))
                //{
                //    var webFiles = serializerBinary.Deserialize(fs) as WebFileInfo[];
                //}

                //// Serializing files of Test folder
                //serializerXml = new XmlSerializer(typeof(WebFileInfo[]));
                //using (var fs = new FileStream("TestFolderFiles.xml", FileMode.Create))
                //    serializerXml.Serialize(fs, testWebFiles);
                //// Deserializing files of Test folder
                //using (var fs = new FileStream("TestFolderFiles.xml", FileMode.Open))
                //{
                //    var webFiles = serializerXml.Deserialize(fs) as WebFileInfo[];
                //}

                //foreach (WebFileInfo webFile in testWebFiles)
                //{
                //    //wcSkyDrive.ChangeWebFileDescription(
                //    //    webFile,
                //    //    String.Format("Description for {0}.", webFile.Name));
                //    //wcSkyDrive.GetWebFile(webFile);
                //    webFile.Description = String.Format("Description for {0}.", webFile.Name);
                //    //wcSkyDrive.DownloadWebFile(webFile);
                //}

                //// List test folder's items
                ////WebFolderItemInfo[] testWebFolderItems = wcSkyDrive.ListSubWebFolderItems(testWebFolder, WebFolderViewType.Thumbnails);
                //WebFolderItemInfo[] testWebFolderItems = wcSkyDrive.ListSubWebFolderItems(testWebFolder);

                //// Serializing items of Test folder
                //using (var fs = new FileStream("TestFolderItems.dat", FileMode.Create))
                //    serializerBinary.Serialize(fs, testWebFiles);
                //// Deserializing items of Test folder
                //using (var fs = new FileStream("TestFolderItems.dat", FileMode.Open))
                //{
                //    var webFolderItems = serializerBinary.Deserialize(fs) as WebFolderItemInfo[];
                //}

                //// Serializing items of Test folder
                //serializerXml = new XmlSerializer(typeof(WebFolderItemInfo[]));
                //using (var fs = new FileStream("TestFolderItems.xml", FileMode.Create))
                //    serializerXml.Serialize(fs, testWebFiles);
                //// Deserializing items of Test folder
                //using (var fs = new FileStream("TestFolderItems.xml", FileMode.Open))
                //{
                //    var webFolderItems = serializerXml.Deserialize(fs) as WebFolderItemInfo[];
                //}

                ////// Download test folder as a .zip file
                ////using (Stream sr = wcSkyDrive.DownloadWebFolder(testWebFolder))
                ////using (FileStream fs = new FileStream(String.Format("{0}.zip", testWebFolder.Name), FileMode.OpenOrCreate))
                ////{
                ////    byte[] buffer = new byte[64 * 1024];
                ////    int count = 0;
                ////    while ((count = sr.Read(buffer, 0, buffer.Length)) > 0)
                ////        fs.Write(buffer, 0, count);
                ////}

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                Console.ReadLine();
            }
            finally
            {
                if (testWebFolder != null)
                {
                    // Delete test folder recursively
                    wcSkyDrive.DeleteWebFolder(testWebFolder);
                }
            }


        }
    }
}