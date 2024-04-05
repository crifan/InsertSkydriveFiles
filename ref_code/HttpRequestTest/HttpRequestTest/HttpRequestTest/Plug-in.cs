using System;
using System.Collections.Generic;
using System.Text;
using WindowsLive.Writer.Api;
using System.Windows.Forms;

namespace HttpRequestTest
{
    [WriterPlugin("317b1a11-1632-45dd-a2f0-095f35bec6a9", "HttpRequestTest",
        Description = "Quick test plugin for using the PluginHttpRequest class",
        HasEditableOptions = false,
        Name = "PluginName",
        PublisherUrl = "http://scottisafooldev.spaces.live.com/")]
    [InsertableContentSource("HttpRequestTest")]

    public class PluginHttpRequestTest : ContentSource
    {
        // If you change the name after class, please change it here too
        public PluginHttpRequestTest()
        { }

        public override DialogResult CreateContent(IWin32Window dialogOwner, ref string newContent)
        {
            frmMain form = new frmMain();
            form.ShowDialog();
            return DialogResult.OK;
        }
    }
}
