using System;
using System.Collections.Generic;
using System.Text;
using WindowsLive.Writer.Api;
using System.Windows.Forms;


namespace MyNewPlugin
{
    [WriterPlugin("8638eda4-6533-4d19-9da7-ff92ff5a7590","My First Plugin",
        Description="This is my first plugin",
        HasEditableOptions=false,
        Name="My First Plugin",
        PublisherUrl="http://scottisafool.spaces.live.com")]
    [InsertableContentSource("From MyNewPlugin")]
    
    public class NewPlugin : ContentSource
    {
        public NewPlugin()
        {
        }

        public override DialogResult CreateContent(IWin32Window dialogOwner, ref string newContent)
        {
            newContent = "This was put in by my first Live Writer Plugin :)";

            return DialogResult.OK;
        }
    }
}
