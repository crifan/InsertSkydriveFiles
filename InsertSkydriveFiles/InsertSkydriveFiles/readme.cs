using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace InsertSkydriveFiles
{
    public partial class frmReadme : Form
    {
        public frmReadme()
        {
            InitializeComponent();
        }

        private void rtbAbout_LinkClicked(object sender, LinkClickedEventArgs e)
        {
            //refer: http://www.cnblogs.com/meteorcui/archive/2005/11/14/2021124.html
            // http://www.cnblogs.com/passingcloudss/archive/2011/09/29/2195953.html
            // Call Process.Start method to open a browser, with link text as URL
            System.Diagnostics.Process.Start(e.LinkText); // call default browser
            //System.Diagnostics.Process.Start("IExplore.exe", e.LinkText); // call IE browser
        }

        private void rtbUsage_LinkClicked(object sender, LinkClickedEventArgs e)
        {
            //refer: http://www.cnblogs.com/meteorcui/archive/2005/11/14/2021124.html
            // http://www.cnblogs.com/passingcloudss/archive/2011/09/29/2195953.html
            // Call Process.Start method to open a browser, with link text as URL
            System.Diagnostics.Process.Start(e.LinkText); // call default browser
            //System.Diagnostics.Process.Start("IExplore.exe", e.LinkText); // call IE browser
        }

    }
}
