using System;
using System.Collections.Generic;
using System.Text;
using WindowsLive.Writer.Api;
using System.Windows.Forms;

namespace InsertSkydriveFiles
{
    [WriterPlugin("a46cc4ed-ead2-4077-8c1c-367d26ce67f1", "Insert Skydrive Files",
        Description = "An Windows Live Writer plugin, enable user to insert file/create folder/upload file/find&upload&replace local picture from skydrive. Created by Crifan.",
        HasEditableOptions = false,
        Name = "InsertSkydriveFiles",
        PublisherUrl = "http://www.crifan.com/crifan_released_all/website/dotnet/wlw_plugin_insertskydrivefiles/",
        ImagePath = "icon.ico")]
    [InsertableContentSource("InsertSkydriveFiles")]

    public class InsertSkydriveFiles : ContentSource
    {
        public InsertSkydriveFiles()
        { 
        }

        public override DialogResult CreateContent(IWin32Window dialogOwner, ref string newContent)
        {
            using (frmInsertSkydriveFile form = new frmInsertSkydriveFile())
            {
                //store current selected content in WLW
                form.curSelectCotent = newContent;
                
                DialogResult result = form.ShowDialog();
                if (result == DialogResult.OK)
                {
                    if (form.actionType == frmInsertSkydriveFile.actionType_t.INSERTFILES)
                    {
                        newContent = form.strToInsert;
                    }
                    else if (form.actionType == frmInsertSkydriveFile.actionType_t.UPLOADANDREPLACE)
                    {
                        newContent = form.replacedContent;
                    }
                }

                return result;
            }
        }
    }
}
