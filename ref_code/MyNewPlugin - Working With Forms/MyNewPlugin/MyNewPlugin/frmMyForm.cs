using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace MyNewPlugin
{
    public partial class frmMyForm : Form
    {
        string text;
        public frmMyForm()
        {
            InitializeComponent();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            DialogResult = DialogResult.OK;
            text = txbxText.Text;
            this.Close();
        }

        public string getText
        {
            get { return text; }
        }
    }
}