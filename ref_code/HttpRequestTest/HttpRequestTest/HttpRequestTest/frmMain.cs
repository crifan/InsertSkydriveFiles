using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Net;
using System.Windows.Forms;
using System.IO;
using WindowsLive.Writer.Api;

namespace HttpRequestTest
{
    public partial class frmMain : Form
    {
        private string url = "http://www.microsoft.com/";
        public frmMain()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            string s = "";
            try
            {
                // Create the HttpWebRequest
                HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
                WebResponse resp = req.GetResponse();
                Stream st = resp.GetResponseStream();
                StreamReader sr = new StreamReader(st);
                s = sr.ReadToEnd();
            }
            catch (Exception ex)
            {
                s = "Failed to get information: \n" + ex.Message;
            }
            textBox1.Text = s;
        }

        private void button2_Click(object sender, EventArgs e)
        {
            PluginHttpRequest prequest = new PluginHttpRequest(url);
            Stream presp = prequest.GetResponse();
            StreamReader sr = new StreamReader(presp);
            string p = sr.ReadToEnd();
            textBox2.Text = p;
        }
    }
}
