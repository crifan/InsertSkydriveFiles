using System;
using System.Collections.Generic;
using System.Text;
using System.Web; // for server
using System.Net; // for client
using System.Net.Cache;
using System.IO;
using System.Collections;
using System.Text.RegularExpressions;
using System.Windows.Forms;
using System.Drawing;
using InsertSkydriveFiles.Properties;

namespace InsertSkydriveFiles
{
    public class skydrive
    {
        //settings
        //IE8
        const string gUserAgent = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.3; .NET4.0C; .NET4.0E";
        //IE9
        //const string gUserAgent = "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)"; // x64
        //const string gUserAgent = "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)"; // x86
        //Chrome
        //const string gUserAgent = "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.4 (KHTML, like Gecko) Chrome/5.0.375.99 Safari/533.4";
        //Mozilla Firefox
        //const string gUserAgent = "Mozilla/5.0 (Windows; U; Windows NT 6.1; rv:1.9.2.6) Gecko/20100625 Firefox/3.6.6";
        //const string gAcceptLanguage = "zh-CN"; //use language or market: zh-CN/en-US
        const string gAcceptLanguage = "en-US"; //use language or market: zh-CN/en-US

        //costant values
        const string constSkydriveUrl = "https://skydrive.live.com/";
        const string constDomainLiveCom = ".live.com";
        //const string constDomainLoginLiveCom = "login.live.com";        
        const string constDomainUsersStorageLive = ".users.storage.live.com"; // or "cid-9a8b8bf501a38a36.users.storage.live.com"
       
        
        //debug 
        //private string gDbgRetHtml = ""; // for debug, the returned html
        //private double gDbgElapsedTime = 0.0;

        //global value
        //private string gCurDomain;
        public CookieCollection skydriveCookies;
        public CookieCollection cookiesForUploadFile;
        //public CookieCollection cookiesForGetFile;
        private string gCid, gCanary, gAppid, gBitProtocol;
        private string gUploadXapUrl;

        private bool hasLogin;
        
        public crifanLib commLib;

        List<string> addSufAudioList;
        List<string> addSufPhotoList;
        List<string> addSufVideoList;

        public struct skyItem_t
        {
            public string id;             // "id":"9A8B8BF501A38A36!504"
            public string parentFolderId; // parent folder Id
            public bool isFolder;
            public string iconType;       // "iconType":"NonEmptyDocumentFolder"
            public string name;           // "name":"想你就写信 - 浪花兄弟"

            public string permaLink;      // permanent link for file, folder url for folder. 
            //http://storage.live.com/items/9A8B8BF501A38A36!548?filename=405%20if%20not%20enable%20xml-rpc.jpg

            //for file
            public string extension;      // "extension":".mp3"

            //for folder
            public string fullName;       // for folder=name, for file=name+extension
            public bool folderInited;   // has added nodes or not

            //only for photo
            public string picFullUrl;     // full url for photo: https://byfiles.storage.live.com/y1puN5FpxjWdibVujnadE8MKA9o_vnEZtU5cA3etvtvHdwjmSEuQFwL8vkH5opsLnZ-Xdcnkucy0J0/405%20if%20not%20enable%20xml-rpc.jpg
        };

        public struct folderItems_t
        {
            public skyItem_t selfItem;
            public List<skyItem_t> childItems;
        };

        private List<string> generateSufList(string strOrigSuffix)
        {
            char[] seperator = { ';' };
            string[] sufListArr = strOrigSuffix.Split(seperator, StringSplitOptions.RemoveEmptyEntries);

            List<string> sufList = new List<string>(sufListArr);

            return sufList;
        }

        public void genAddSufList()
        {
            addSufAudioList = generateSufList(Settings.Default.addSufAudio);
            addSufPhotoList = generateSufList(Settings.Default.addSufPhoto);
            addSufVideoList = generateSufList(Settings.Default.addSufVideo);
        }

        public skydrive()
        {
            commLib = new crifanLib();

            addSufAudioList = new List<string>();
            addSufPhotoList = new List<string>();
            addSufVideoList = new List<string>();
            
            clearGolobalValues();

            genAddSufList();
        }

        /*-------------------------------------------------------------------*/

        /*********************************************************************/
        /* Skydrive related functions */
        /*********************************************************************/

        //generate skydrive file permanent link
        public string genSkyPermaLink(string fileName, string resId)
        {
            string permLink = "";
            // http://storage.live.com/items/9A8B8BF501A38A36!359?filename=%E7%AC%AC%E5%85%AD%E5%90%8D%EF%BC%9A%E5%8D%87%E9%99%8D%E5%B7%A5.jpg
            string quotedFileName = HttpUtility.UrlPathEncode(fileName);
            permLink = "http://storage.live.com/items/" + resId + "?filename=" + quotedFileName;
            return permLink;
        }

        private void clearGolobalValues()
        {
            //gCurDomain = "";
            skydriveCookies = null;
            commLib.clearCurCookies();

            cookiesForUploadFile = null;
            //cookiesForGetFile = null;
            gCid = "";
            gCanary = "";
            gAppid = "";
            gBitProtocol = "";
            gUploadXapUrl = "";
            hasLogin = false;
        }

        private string extractLoginSrfUrl(string html)
        {
            string loginSrfUrl = "";
            //<meta http-equiv="refresh" content="2;url=https://login.live.com/login.srf?wa=wsignin1.0&amp;rpsnv=11&amp;ct=1327988927&amp;rver=6.1.6206.0&amp;wp=MBI_SSL_SHARED&amp;wreply=https:%2F%2Fskydrive.live.com%2F&amp;lc=1033&amp;id=250206&amp;mkt=en-US&amp;cbcxt=sky" />

            //refer: http://dev.w3.org/html5/markup/meta.http-equiv.refresh.html#meta.http-equiv.attrs.http-equiv.refresh
            //       http://www.w3school.com.cn/tiy/t.asp?f=html_redirect
            //                                                                   1=realUrl
            string refreshP = @"<meta\shttp-equiv=""refresh""\scontent=""\d+;url=(http.+?)""\s/>";
            if (commLib.extractSingleStr(refreshP, html, out loginSrfUrl))
            {
                loginSrfUrl = HttpUtility.HtmlDecode(loginSrfUrl);
            }

            return loginSrfUrl;
        }

        private string extractResPreloadUrl(string html)
        {
            string resPreloadUrl = "";
            
            //var srf_uPreload = 'https://skydrive.live.com/handlers/resourcespreload.mvc?view=Folders.All&id;=250206&mkt;=EN-US';
            //string resPreloadP = @"var\ssrf_uPreload\s=\s'(.+?)';";

            //AL:'https://skydrive.live.com/handlers/resourcespreload.mvc?view=Folders.All&id=250206&mkt=EN-US',
            string resPreloadP = @"'(https://skydrive\.live\.com/handlers/resourcespreload\.mvc.+?)'";
            commLib.extractSingleStr(resPreloadP, html, out resPreloadUrl);
            return resPreloadUrl;
        }

        private string extractBucket4jsUrl(string html)
        {
            string bucket4Js = "";
            //"https\u003a\u002f\u002fsecure.wlxrs.com\u002f2Jro0r84zTRoocI0W5VmeA\u002fBucket4.js"
            //"https\u003a\u002f\u002fsecure.wlxrs.com\u002flh1g93O4s-8ekJ7hFfdeRw\u002fBucket4.js"
            //"https\\u003a\\u002f\\u002fsecure.wlxrs.com\\u002fv7nGQtAfZUde-TrTKnl\\u0021cQ\\u002fBucket4.js"
            //string bucket4P = @"""(https\\u003a\\u002f\\u002fsecure\.wlxrs\.com\\u002f\S{22}\\u002fBucket4\.js)""";
            //string bucket4P = @"""(https\\u003a\\u002f\\u002fsecure\.wlxrs\.com\\u002f[^,^""]+?\\u002fBucket4\.js)""";
            string bucket4P = @"""(https[^,^""]+?Bucket4\.js)""";
            if (commLib.extractSingleStr(bucket4P, html, out bucket4Js))
            {
                bucket4Js = Regex.Unescape(bucket4Js);
            }
            return bucket4Js;
        }
        
        private string extractSrfUpostUrl(string html)
        {
            string upostUrl = "";
            //srf_uPost='https://login.live.com/ppsecure/post.srf?wa=wsignin1.0&rpsnv=11&ct=1328070682&rver=6.1.6206.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fskydrive.live.com%2F&lc=2052&id=250206&mkt=zh-CN&cbcxt=sky&bk=1328070683';
            //string upostP = @"srf_uPost='(http.+?)';";

            //,urlPost:'https://login.live.com/ppsecure/post.srf?wa=wsignin1.0&rpsnv=11&ct=1343278726&rver=6.1.6206.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fskydrive.live.com%2F&lc=1033&id=250206&mkt=en-US&cbcxt=sky&bk=1343278739',
            string upostP = @"'(https://login\.live\.com/ppsecure/post\.srf\?wa=.+?)'";
            commLib.extractSingleStr(upostP, html, out upostUrl);
            return upostUrl;
        }

        private string extractPpsx(string html)
        {
            string ppsx = "";
            //var srf_sRBlob='Passpor';
            //string ppsxP = @"var\ssrf_sRBlob='(.+?)';";

            //,h:'Passpor',i:
            string ppsxP = @",h:'(.+?)',i:";
            commLib.extractSingleStr(ppsxP, html, out ppsx);
            return ppsx;
        }

        private string extractPpft(string html)
        {
            string ppft = "";
            //browser return: var srf_sFT='<input type="hidden" name="PPFT" id="i0327" value="ChhEDnixrcRgJQaCChErOs!j0qUCakWZbMYP6u8Ed98olpjEBXu*4ZaRd4XLNLofiY2tp7Z3tk*61SKPEiQu0Ubi!ePjD5MbDoteo5pBd5mDfpSfSlinqhz0IZLxZjW*vtMyT7VJbalhWRe7RX3ZGz5Jp*0qW!m7GbFybZWZsCJzueNSNkRz1qq82XsJvX8hfuP6jkr*2ZJE3hB8MQogL1FnGpnrAvQDas18jz3rJSuRoLj3qZ7PDlP8GO4ygt0CqQ$$">';
            //code    return: var srf_sFT='<input type="hidden" name="PPFT" id="i0327" value="Chtvxb4e!dDNQKS5VAy*M5o2EpVyPaF3SXr6iWodPRlAxSeSgRz2TROg3vSoK9BD8yiRyagfvo7g2k19oJTEHZMP1hSTcbos8RSBiLNV56sW9q0hF0lmBUiXWQalaRtOjrayCp2AtatDaN4uNCu2v9vWCmVbCDwJ3Foejk6WXT52tcEfW2yCoqXWscLUzGA9TXzLz*!G*Q7sIWiQHimJwM0RcBxZ6D8KyqwGf3PGj5zaotzFabUju7BhZEf0qjBksg$$"/>';

            //sFTTag:'<input type="hidden" name="PPFT" id="i0327" value="CnIrbf8d35vMHZXAWksZWm31RWlTIrnNqDWeeKsL04a2R6ZLbhrBgru0zC6ShttMyL4ktE2CX4I1CJBk4e3Lmcg5Ya3amT7Vetl6YpaUck9EYl5y!WxXDbQUZOMstA6K1f6EUEUDJOc1DzAg6DvEcxC*pkcd4CAGcBgaKPscb8BA"/>',
            string ppftP = @"name=""PPFT""\sid=""i0327""\svalue=""(.+?)""";
            commLib.extractSingleStr(ppftP, html, out ppft);
            return ppft;
        }


        private Dictionary<string, string> genPostsrfPostDict(string html, string login, string passwd, bool isKeepLogin)
        {
            Dictionary<string, string> postDict = new Dictionary<string, string>();
            postDict.Add("login", login);
            postDict.Add("passwd", passwd);
            postDict.Add("type", "11");

            if (isKeepLogin)
            {
                postDict.Add("KMSI", "1");
                postDict.Add("LoginOptions", "1");
                postDict.Add("SysDIDToken", "ThisIsASysDIDDummyToken");
            }
            else
            {
                postDict.Add("LoginOptions", "3");
            }

            postDict.Add("NewUser", "1");
            postDict.Add("MEST", "");
            postDict.Add("PPSX", extractPpsx(html));
            postDict.Add("PPFT", extractPpft(html));
            postDict.Add("idsbho", "1");
            postDict.Add("PwdPad", "");
            postDict.Add("sso", "");
            postDict.Add("i1", "");
            postDict.Add("i2", "1");
            postDict.Add("i4", "");
            postDict.Add("i12", "1");
            postDict.Add("i13", "");
            postDict.Add("i17", "");

            return postDict;
        }

        private string genPostsrfPostData(string html, string login, string passwd, bool isKeepLogin)
        {
            string postData = "";

            Dictionary<string, string> postDataDict = genPostsrfPostDict(html, login, passwd, isKeepLogin);
                        
            postData += commLib.quoteParas(postDataDict);

            return postData;
        }

        private string genUploadUrl(string cid, string parentId, string fileName)
        {
            string uploadUrl = "";
            //subFolder: https://cid-9a8b8bf501a38a36.users.storage.live.com/items/9A8B8BF501A38A36!662/include%20space%20%20%20%20%20should%20%20%20encode.txt
            //root:      https://cid-9a8b8bf501a38a36.users.storage.live.com/users/0x9A8B8BF501A38A36/LiveFolders/%E5%9C%A8Word2010%E6%96%87%E6%A1%A3%E4%B8%AD%E8%AE%BE%E7%BD%AE%E7%BA%B8%E5%BC%A0%E5%A4%A7%E5%B0%8F.docx

            uploadUrl = "https://cid-" + cid + ".users.storage.live.com/";
            if (parentId == "root")
            {
                uploadUrl += "users/0x" + cid.ToUpper() + "/LiveFolders/";
            }
            else
            {
                uploadUrl += "items/" + parentId.ToUpper() + "/";
            }

            uploadUrl += HttpUtility.UrlPathEncode(fileName); // UrlPathEncode can encode " " to "%20"

            return uploadUrl;
        }

        private string extractFileName(string fileAbsAddr)
        {
            string fileName = "";
            string[] splited;
            if (fileAbsAddr.Contains("/"))
            {
                splited = fileAbsAddr.Split('/');
                fileName = splited[splited.Length - 1];
            }
            else if (fileAbsAddr.Contains("\\"))
            {
                splited = fileAbsAddr.Split('\\');
                fileName = splited[splited.Length - 1];
            }
            return fileName;
        }
                        
        private void extractValues(string html)
        {
            //hcid
            //"initOnPageLoad":1},"hcid":"9a8b8bf501a38a36","domain":"live.com",
            //"domain":"skydrive.live.com","hcid":"9A8B8BF501A38A36","imgBaseUrl"
            //string cidP = @"""hcid"":""(\w+)""";
            string cidP = @",""hcid"":""(\w+)"",";
            commLib.extractSingleStr(cidP, html, out gCid);

            //canary
            // NOTE: here other place also contain canary, so here must find the one after userDisplayName
            //"userDisplayName":"wang tian","canary":"G\u002fku6HVeMtUDXGd3\u002f\u002fGB7xhdq8FhuvQcP59CEuGCJDk\u003d2","sharingBaseUrl"
            //"userDisplayName":"wang tian","canary":"hbsx1CqNhzszkDbxbWPJ\\u002b3r2gytCg2hp4MjPyy3U3hU\\u003d4","dlCanary":"hbsx1CqNhzszkDbxbWPJ\\u002b3r2gytCg2hp4MjPyy3U3hU\\u003d4","sharingBaseUrl":
            //string canaryP = @"""userDisplayName"":"".+?"",""canary"":""(.+?)"",""sharingBaseUrl""";
            string canaryP = @"""userDisplayName"":"".+?"",""canary"":""(.+?)"",";
            if (commLib.extractSingleStr(canaryP, html, out gCanary))
            {
                //canary = HttpUtility.HtmlDecode(canary);
                gCanary = Regex.Unescape(gCanary);
            }

            //appid
            //"appId":"1141147648","groupMailUrl"
            //,"appId":"1141147648","suspendedUrl":
            //string appidP = @"""appId"":""(\d+)"",""groupMailUrl""";
            string appidP = @",""appId"":""(\d+)"",";
            commLib.extractSingleStr(appidP, html, out gAppid);

            //slUploaderXapUrl
            //"slUploaderXapUrl":"https\u003a\u002f\u002fsecure.wlxrs.com\u002fq8tUSY\u0021\u0021Tu42cmZJKDMZNdgCYe8Hqec7XvqXiQP4DuV5JkBsOQqhxwlr3IbyMdjk\u002fMicrosoft.Live.SkyDrive.SkyDriveUploaderV2.xap",
            string uploadP = @"""slUploaderXapUrl"":""(.+?)"",";
            if (commLib.extractSingleStr(uploadP, html, out gUploadXapUrl))
            {
                gUploadXapUrl = Regex.Unescape(gUploadXapUrl);
            }
        }
        
        private void prepareForUploadFile()
        {
            //extract cookies for upload file
            cookiesForUploadFile = new CookieCollection();

            foreach (Cookie ck in skydriveCookies)
            {
                if ((ck.Domain == constDomainLiveCom) && (!commLib.isCookieExpired(ck)))
                {
                    Cookie ckToAdd = new Cookie(ck.Name, ck.Value, ck.Path, ck.Domain);
                    ckToAdd.HttpOnly = ck.HttpOnly;
                    ckToAdd.Expires = ck.Expires;
                    ckToAdd.Secure = ck.Secure;
                    ckToAdd.Version = ck.Version;
                    cookiesForUploadFile.Add(ckToAdd);
                }
            }

            //!!! if not seperatly set new domain value, then will overwirtten the original domain of cookie in skydriveCookies
            foreach (Cookie ckNew in cookiesForUploadFile)
            {
                ckNew.Domain = constDomainUsersStorageLive;
            }
        }
        
        private enum packetType_e
        {                    
            CreateSession,
            Fragment,
            ClossSession,
        };

        private struct sessionInfo_t
        {
            public packetType_e type;   // current time session type
            public byte[] postData;    // store data of current time to upload
            public bool isOverwrite;    // overwrite file if already exist or not
            //public bool useGzip;
            public CookieCollection cookies; // current cookies which contain authentification info

            // for fragment
            public string sessionId;    // got in response of after Create-Session
            public Int64 receivedBytes; // bytes we have already received
            public Int64 bytesToUpload; // bytes of data for current time need to upload
            public Int64 totalBytes;    // file size
        }
        
        private void setUploadHeader(ref HttpWebRequest req, ref sessionInfo_t info)
        {
            req.Method = "POST";
            req.Headers["X-Http-Method-Override"] = "BITS_POST";
            //req.Referer = gUploadXapUrl;
            req.Headers["Accept-Language"] = gAcceptLanguage;

            string typeStr = "";
            switch (info.type)
            {
                case packetType_e.CreateSession:
                    typeStr = "Create-Session";
                    break;
                case packetType_e.Fragment:
                    typeStr = "Fragment";
                    break;
                case packetType_e.ClossSession:
                    typeStr = "Close-Session";
                    break;
                default :
                    break;
            }
            req.Headers["BITS-Packet-Type"] = typeStr;

            if (info.type != packetType_e.CreateSession)
            {
                // close session or fragment, contains session id
                req.Headers["BITS-Session-Id"] = info.sessionId;
            }

            req.Headers["BITS-Supported-Protocols"] = gBitProtocol;

            req.Headers["Application"] = "LiveFolders";
            req.Accept = "application/wls-response-headers+json";
            req.Headers["Overwrite"] = info.isOverwrite.ToString().ToLower();
            req.Headers["X-PhotoSizeConstraint"] = "2048x2048";
            req.Headers["X-RequestStats"] = "upType=sl,dragDrop=false";
            req.UserAgent = gUserAgent;
            req.KeepAlive = true;
            req.Headers["Cache-Control"] = "no-cache";

            if (info.type == packetType_e.Fragment)
            {
                string contentRange = "";
                contentRange = "bytes ";
                contentRange += info.receivedBytes.ToString();
                contentRange += "-";
                contentRange += (info.receivedBytes + info.bytesToUpload - 1).ToString();
                contentRange += "/";
                contentRange += info.totalBytes;
                req.Headers["X-Content-Range"] = contentRange;
            }

            // if is create or close, auto set post bytes
            if ((info.type == packetType_e.CreateSession) || (info.type == packetType_e.ClossSession))
            {
                info.postData = Encoding.UTF8.GetBytes(typeStr);
            }
            req.ContentLength = info.postData.Length;

            //make sure domain is "cid-9a8b8bf501a38a36.users.storage.live.com" or ".users.storage.live.com"
            req.CookieContainer = new CookieContainer();
            if (info.cookies != null)
            {
                req.CookieContainer.PerDomainCapacity = 60; // following will exceed max default 20 cookie per domain
                req.CookieContainer.Add(info.cookies);
            }
            
            req.Proxy = null;
        }

        //default is not overwrite and not designate upload file name, just use the original file name
        public bool uploadFile(string fileAbsAddr, string parentId, out string resourceId, out string errMsg)
        {
            return uploadFile(fileAbsAddr, true, parentId, false, "", out resourceId, out errMsg);
        }

        //default not designate upload file name, just use the original file name
        public bool uploadFile(string fileAbsAddr, string parentId, bool isOverwrite, out string resourceId, out string errMsg)
        {
            return uploadFile(fileAbsAddr, true, parentId, isOverwrite, "", out resourceId, out errMsg);
        }

        //default is not overwrite
        public bool uploadFile(string fileAbsAddr, string parentId, string uploadFileName, out string resourceId, out string errMsg)
        {
            return uploadFile(fileAbsAddr, true, parentId, false, uploadFileName, out resourceId, out errMsg);
        }

        public bool uploadFile(string fileAbsAddr, bool autoHandleFilename, string parentId, bool isOverwrite, out string resourceId, out string errMsg)
        {
            return uploadFile(fileAbsAddr, autoHandleFilename, parentId, isOverwrite, "", out resourceId, out errMsg);
        }

        public bool uploadFile(string fileAbsAddr, bool autoHandleFilename, string parentId, bool isOverwrite, string uploadFileName, out string resourceId, out string errMsg)
        {
            bool uploadOK = true;
            HttpWebRequest req;
            string sessionId = "";
            sessionInfo_t info;
            Stream postDataStream;
            string respJson;
            string fileName = "";

            resourceId = "";
            errMsg = "Unknown error!";

            //fileAbsAddr = "E:\\tmp\\你来给我翻译翻译什么叫他妈的2010.docx"; // begin of filename contains control char: 0x7F=127
            //fileAbsAddr = "E:\\tmp\\你来给我翻译翻译什么叫他妈的2010.docx"; // begin of filename not contains invalid control char

            //check file name validation
            foreach (Char c in fileAbsAddr)
            {
                if (Char.IsControl(c))
                {
                    uploadOK = false;
                    errMsg = String.Format("Full file name={1} contains contro char={2:d}, which is not supported by Skydrive !", fileAbsAddr, (int)c);

                    return uploadOK;
                }
            }

            if (cookiesForUploadFile == null)
            {
                uploadOK = false;
                errMsg = "No authentification cookies, propably you has not logged in skydrive !";
                return uploadOK;
            }
            
            //parentId = gCid + "!737";//code_create_dir_0217
            if (uploadFileName != "")
            {
                fileName = uploadFileName;
            }
            else
            {
                fileName = extractFileName(fileAbsAddr);
            }

            //check filename validataion
            if (autoHandleFilename)
            {
                //invalid skydrive filename:

                //1. first char is '.'
                if (fileName[0].Equals('.'))
                {
                    // replace first '.' of filename with '_'
                    fileName = '_' + fileName.Substring(1);
                }

                //2. filename contains chinese char "？"
                fileName = fileName.Replace("？", "_");
            }

            //subFolder: https://cid-9a8b8bf501a38a36.users.storage.live.com/items/9A8B8BF501A38A36!660/InsertSkydriveFile_v2.0_2012-02-06-home.7z
            //root:      https://cid-9a8b8bf501a38a36.users.storage.live.com/users/0x9A8B8BF501A38A36/LiveFolders/InsertSkydriveFile_v2012-01-30-home.7z
            string uploadUrl = genUploadUrl(gCid, parentId, fileName);
            
            //1: create session
            req = (HttpWebRequest)WebRequest.Create(uploadUrl);
            info = new sessionInfo_t();
            info.type = packetType_e.CreateSession;
            info.cookies = cookiesForUploadFile;
            info.isOverwrite = isOverwrite;
            setUploadHeader(ref req, ref info);

            try
            {
                postDataStream = req.GetRequestStream();
                postDataStream.Write(info.postData, 0, info.postData.Length);
                postDataStream.Close();

                HttpWebResponse resp = (HttpWebResponse)req.GetResponse();
                StreamReader sr = new StreamReader(resp.GetResponseStream());
                respJson = sr.ReadToEnd();

                //parse return json
                // note: here resp.StatusCode is OK(200), not Created(201) !!!
                //"StatusCode": "201","StatusDescription":"Created",

                //if (statusCode == "201") // Created                    
                if (resp.StatusDescription == HttpStatusCode.Created.ToString())
                {
                    // extract Create-Session returned session id
                    //"BITS-Session-Id": "1mx8oYLvl2dNMc3AWcfRuOmGmDAYZCKOucOwqp_3WYyXQ",
                    sessionId = resp.Headers["BITS-Session-Id"];
                }
                else
                {
                    uploadOK = false;

                    errMsg = "Create-Session response statusCode is not Created(201).";
                    errMsg += " StatusDescription=" + resp.StatusDescription;
                    errMsg += ", X-ClientErrorCode=" + resp.Headers["X-ClientErrorCode"];

                    string realStatusCode = "";
                    string realStatusCodeP = @"""StatusCode"":""(.+?)""";
                    if (commLib.extractSingleStr(realStatusCodeP, respJson, out realStatusCode))
                    {
                        errMsg += ", StatusCode=" + realStatusCode;
                    }
                }
            }
            catch (Exception ex)
            {
                uploadOK = false;
                errMsg = ex.Message;
            }

            if (!uploadOK)
            {
                return uploadOK;
            }

            bool complete = false;
            const int initCurMaxsize = 10 * 1024; // first is 10K
            int curMaxsize = 0; // max size for current session
            int lenToRead = 0;
            long fileSize = 0;
            long hasUploaded = 0;
            long remainBytes;
            FileStream fs = null;

            try
            {
                //open file
                //refer: http://www.cnblogs.com/lucky_dai/archive/2011/05/06/2038736.html
                fs = new FileStream(fileAbsAddr, FileMode.Open, FileAccess.Read);
                fileSize = fs.Length;

                bool isFirstUpload = true;
                bool isError = false;
                int readoutLen = 0;

                // 2. upload file content, 10K/20K/40K/80K/... util the end
                while ((!complete) && (!isError))
                {
                    //2.1 prepare setting and data
                    if (isFirstUpload)
                    {
                        isFirstUpload = false;

                        //init for first upload
                        hasUploaded = 0;
                        curMaxsize = initCurMaxsize;

                        if (fileSize < initCurMaxsize)
                        {
                            lenToRead = (int)fileSize;
                            complete = true;
                        }
                        else
                        {
                            lenToRead = curMaxsize;
                            complete = false;
                        }
                    }

                    byte[] fileData = new byte[lenToRead];
                    fs.Position = hasUploaded;
                    readoutLen = fs.Read(fileData, 0, lenToRead);
                    if (readoutLen < lenToRead)
                    {
                        uploadOK = false;
                        isError = true;
                        errMsg = String.Format("Error while read data from file{0}: offset={1:d}, lenToRead={2:d}, readoutLen={3:d}",
                                                fileAbsAddr, fs.Position, lenToRead, readoutLen);
                        break;
                    }

                    req = (HttpWebRequest)WebRequest.Create(uploadUrl);
                    info = new sessionInfo_t();
                    info.type = packetType_e.Fragment;
                    info.cookies = cookiesForUploadFile;
                    info.isOverwrite = isOverwrite;
                    info.totalBytes = fileSize;
                    info.receivedBytes = hasUploaded;
                    info.bytesToUpload = lenToRead;
                    info.sessionId = sessionId;
                    info.postData = fileData;
                    setUploadHeader(ref req, ref info);

                    // 2.2 upload data
                    postDataStream = req.GetRequestStream();
                    postDataStream.Write(info.postData, 0, info.postData.Length);
                    postDataStream.Close();

                    HttpWebResponse resp = (HttpWebResponse)req.GetResponse();
                    StreamReader sr = new StreamReader(resp.GetResponseStream());
                    respJson = sr.ReadToEnd();

                    // 2.3 parse return json if necessary
                    if (resp.StatusCode != HttpStatusCode.OK) // created
                    {
                        uploadOK = false;
                        isError = true;
                        errMsg = "Error while uploading data, reponse StatusCode=" + resp.StatusCode + ", StatusDescription=" + resp.StatusDescription;
                        break;
                    }

                    // 2.4 post actions
                    //check whether has complete
                    hasUploaded += lenToRead;
                    if (hasUploaded >= fileSize)
                    {
                        complete = true;
                        break;
                    }
                    else
                    {
                        // update value for next upload
                        curMaxsize = 2 * curMaxsize; // 10K -> 20K -> 40K -> 80K ...
                        remainBytes = fileSize - hasUploaded;
                        if (remainBytes < curMaxsize)
                        {
                            lenToRead = (int)remainBytes;
                        }
                        else
                        {
                            lenToRead = curMaxsize;
                        }                            
                    }
                }//while

                //3. close session
                if (!isError && complete)
                {
                    //prepare
                    req = (HttpWebRequest)WebRequest.Create(uploadUrl);
                    info = new sessionInfo_t();
                    info.type = packetType_e.ClossSession;
                    info.cookies = cookiesForUploadFile;
                    info.isOverwrite = isOverwrite;
                    info.sessionId = sessionId;
                    setUploadHeader(ref req, ref info);

                    //upload
                    postDataStream = req.GetRequestStream();
                    postDataStream.Write(info.postData, 0, info.postData.Length);
                    postDataStream.Close();

                    HttpWebResponse resp = (HttpWebResponse)req.GetResponse();
                    StreamReader sr = new StreamReader(resp.GetResponseStream());
                    respJson = sr.ReadToEnd();

                    if (resp.StatusCode == HttpStatusCode.OK)
                    {
                        //parse return json
                        //"X-Resource-Id": "9A8B8BF501A38A36!753",
                        resourceId = resp.Headers["X-Resource-Id"];
                    }
                    else
                    {
                        uploadOK = false;
                        errMsg = "Error in Close-Session, the reponse StatusDescription = " + resp.StatusDescription;
                        isError = true;
                    }
                }//if (!isError && complete)
            }
            catch (Exception ex)
            {
                errMsg = "Failed to upload file " + fileName + ". Error message = " + ex.Message;
                uploadOK = false;
            }

            if (fs != null)
            {
                fs.Close();
                fs = null;
            }

            uploadOK = true;
            errMsg = "Upload Successfully";
            return uploadOK;
        }
                
        private string genCreateFolderPostData(string folderName, string parentId, string cid)
        {
            string postStr = "";
            postStr = "{\"parentId\":\"" + parentId;
            postStr += "\",\"cid\":\"" + cid;
            postStr += "\",\"group\":0,\"name\":\"" + folderName + "\"}";
            return postStr;
        }
        
        public bool createFoler(string folderName, string parentId, string cid, out string respJson)
        {
            bool createdOk = false;
            respJson = "";

            try
            {
                string createFolerUrl = "https://skydrive.live.com/API/2/AddFolder?lct=1";

                //HttpWebRequest req = (HttpWebRequest)WebRequest.Create(createFolerUrl);

                //setCommonHttpReqPara(ref req);
                //req.Method = "POST";
                //req.Accept = "application/json";
                //req.ContentType = "application/x-www-form-urlencoded";
                //req.Referer = constSkydriveUrl;
                //req.Headers["Canary"] = gCanary;
                //req.Headers["Appid"] = gAppid;
                //req.Headers["X-Requested-With"] = "XMLHttpRequest";
                //req.Headers["Cache-Control"] = "no-cache";

                //string postData = genCreateFolderPostData(folderName, parentId, cid);
                //byte[] postBytes = Encoding.UTF8.GetBytes(postData);
                //req.ContentLength = postBytes.Length;

                //Stream postDataStream = req.GetRequestStream();
                //postDataStream.Write(postBytes, 0, postBytes.Length);
                //postDataStream.Close();

                //HttpWebResponse resp = (HttpWebResponse)req.GetResponse();
                //commLib.updateLocalCookies(resp.Cookies, ref skydriveCookies);

                //respJson = getCommonRespHtml(ref resp);


                Dictionary<string, string> headerDict = new Dictionary<string, string>();
                headerDict.Add("Accept", "application/json");
                headerDict.Add("Referer", "constSkydriveUrl");
                headerDict.Add("Canary", gCanary);
                headerDict.Add("Appid", gAppid);
                headerDict.Add("X-Requested-With", "XMLHttpRequest");
                headerDict.Add("Cache-Control", "no-cache");

                string postDataStr = genCreateFolderPostData(folderName, parentId, cid);

                respJson = commLib.getUrlRespHtml(createFolerUrl, headerDict, "", null, 0, postDataStr);

                createdOk = true;
            }
            catch
            {
                createdOk = false;
            }

            return createdOk;
        }

        private void extractBitProtocol(string html)
        {
            // extract BITS-Supported-Protocols value
            //d.push("BITS-Supported-Protocols");c.push("{7df0354d-249b-430f-820d-3d2a9bef4931}");
            string bitProtocolP = @"\.push\(""BITS-Supported-Protocols""\);.+?\.push\(""(\{[\w\-]+?\})""\);";
            commLib.extractSingleStr(bitProtocolP, html, out gBitProtocol);
        }

        //for "GET" Http request, set common parameter
        private void setCommonHttpReqPara(ref HttpWebRequest req, bool useGzip)
        {
            req.Method = "GET";
            req.AllowAutoRedirect = false;
            req.Accept = "text/html, application/xhtml+xml, application/javascript, */*";
            //req.Headers.Add("Accept-Language", gAcceptLanguage);
            req.Headers["Accept-Language"] = gAcceptLanguage;
            req.KeepAlive = true;
            //req.Headers.Add("DNT", "1");
            req.UserAgent = gUserAgent;

            if (useGzip)
            {
                req.Headers["Accept-Encoding"] = "gzip, deflate";
                req.AutomaticDecompression = DecompressionMethods.GZip;
            }

            req.Proxy = null;

            if (skydriveCookies != null)
            {
                req.CookieContainer = new CookieContainer();

                req.CookieContainer.PerDomainCapacity = 40; // following will exceed max default 20 cookie per domain
                req.CookieContainer.Add(skydriveCookies);
            }
        }

        //for "GET" Http request, set common parameter
        // default use gzip
        private void setCommonHttpReqPara(ref HttpWebRequest req)
        {
            setCommonHttpReqPara(ref req, true);
        }

        private string getCommonRespHtml(ref HttpWebResponse resp)
        {
            string respHtml = "";

            StreamReader sr = new StreamReader(resp.GetResponseStream());
            //StreamReader sr = new StreamReader(resp.GetResponseStream(), Encoding.UTF8);
            respHtml = sr.ReadToEnd();
            return respHtml;
        }
        
        //private string genGetItemsUrl(string folderId, string folderModifiedDate, out string skyApiOriginId)
        private string genGetItemsUrl(string folderId)
        {
            string getItemsUrl = "";
            //https://skydrive.live.com/API/2/GetItems?id=9a8b8bf501a38a36%21536&cid=9a8b8bf501a38a36&group=0&qt=&ft=&sb=1&sr=0&d=1&lid=9A8B8BF501A38A36!536&caller=9A8B8BF501A38A36&path=0&si=0&ps=100&pi=5&m=en-US&rset=web&lct=1&v=634653426359300000
            //https://skydrive.live.com/API/2/GetItems?id=9a8b8bf501a38a36%21504&cid=9a8b8bf501a38a36&group=0&qt=&ft=&sb=1&sr=0&d=1&lid=9A8B8BF501A38A36!504&caller=9A8B8BF501A38A36&path=0&si=0&ps=100&pi=5&m=en-US&rset=web&lct=1&v=0.7366654540555236
            //https://skydrive.live.com/API/2/GetItems?id=9a8b8bf501a38a36%21523&cid=9a8b8bf501a38a36&group=0&qt=&ft=&sb=1&sr=0&d=1&lid=9A8B8BF501A38A36!504&caller=9A8B8BF501A38A36&path=0&si=0&ps=100&pi=5&m=en-US&rset=web&lct=1&v=0.23655004749307035
            //https://skydrive.live.com/API/2/GetItems?id=root&cid=9a8b8bf501a38a36&group=0&qt=&ft=&sb=1&sr=0&d=1&lid=&caller=9A8B8BF501A38A36&path=0&si=0&ps=100&pi=5&m=en-US&rset=web&lct=1&v=0.3135935835993523


            //https://skydrive.live.com/API/2/GetItems?id=9a8b8bf501a38a36%21536&cid=9a8b8bf501a38a36&group=0&qt=&ft=&sb=1&sd=1&gb=0%2C1%2C2&d=1&iabch=1&lid=9A8B8BF501A38A36!536&caller=9A8B8BF501A38A36&path=0&si=0&ps=100&pi=5&m=en-US&rset=web&lct=1&v=0.6587657698473182

            getItemsUrl = "https://skydrive.live.com/API/2/GetItems?";

            //refer: http://stackoverflow.com/questions/5220441/httputility-urlencode-will-not-encode-as-21
            //note here UrlEncode can not convert ! to %21, for ! is valid char in url
            //getItemsUrl += "id=" + HttpUtility.UrlEncode(folderId).ToLower();
            getItemsUrl += "id=" + commLib.encodeExclamationMark(folderId).ToLower();
            getItemsUrl += "&cid=" + gCid.ToLower();
            getItemsUrl += "&group=" + "0";
            getItemsUrl += "&qt=";
            getItemsUrl += "&ft=";
            getItemsUrl += "&sb=" + "1";
            getItemsUrl += "&sr=" + "0";
            getItemsUrl += "&d=" + "1";
            if (folderId == "root")
            {
                getItemsUrl += "&lid=";
            }
            else
            {
                getItemsUrl += "&lid=" + folderId.ToUpper();
            }
            getItemsUrl += "&caller=" + gCid.ToUpper();
            getItemsUrl += "&path=" + "0";
            getItemsUrl += "&si=" + "0";
            //getItemsUrl += "&ps=" + "100";
            getItemsUrl += "&ps=" + "200";
            getItemsUrl += "&pi=" + "5";
            getItemsUrl += "&m=" + gAcceptLanguage;
            getItemsUrl += "&rset=" + "web";
            getItemsUrl += "&lct=" + "1";
            
            return getItemsUrl;
        }

        // read responsed html for skydrive url response
        // for skydrive seems can not read normally, so need special process here
        //private string getSkydriveRespHtml(ref HttpWebResponse resp, int slashZeroLineNum)
        private string getSkydriveRespHtml(ref HttpWebResponse resp)
        {
            string respHtml = "";
            StreamReader sr = new StreamReader(resp.GetResponseStream());
            //respHtml = sr.ReadToEnd();
            int lines = 0;
            string curLineStr = "";
            while (!sr.EndOfStream)
            {
                //if (lines == slashZeroLineNum)
                //{
                //    // seems that the skydrive url returned html in this C# code is abnormal
                //    // for here, this 239/245/? line contains all "\0", total size = 2048046 bytes !!!
                //    // so just for speed normal operation, omit this invalid line here
                //    //gDbgRetHtml = sr.ReadLine();
                //    sr.ReadLine();
                //}
                //else
                //{
                //    respHtml += sr.ReadLine();
                //}

                //now the line number which return 2048046 bytes has changed, so use follow method to detect it
                curLineStr = sr.ReadLine();
                int invalidLineLen = 1 * 1024 * 1024; // if 1MB, is must invalid
                if (curLineStr.Length > invalidLineLen)
                {
                    //MessageBox.Show("invalid line =" + lines);
                }
                else
                {
                    respHtml += curLineStr;
                }

                lines++;
            }

            return respHtml;
        }

        private string getSkydriveRespHtmlUnlogin(ref HttpWebResponse resp)
        {
            //return getSkydriveRespHtml(ref resp, 239);
            return getSkydriveRespHtml(ref resp);
        }

        private string getSkydriveRespHtmlLogin(ref HttpWebResponse resp)
        {
            //return getSkydriveRespHtml(ref resp, 245);
            return getSkydriveRespHtml(ref resp);
        }


        public const string skydriveRootId = "root";

        //generate skydrive folder url
        //https://skydrive.live.com/?cid=9a8b8bf501a38a36&id=9A8B8BF501A38A36%21504
        //Note: for "root" is https://skydrive.live.com/?cid=9a8b8bf501a38a36
        public string genSkyFolderUrl(string cid, string folderId)
        {
            string folderUrl = "";
            folderUrl = "https://skydrive.live.com/?";
            folderUrl += "cid=" + cid;

            if (folderId == skydriveRootId)
            {

            }
            else
            {
                folderId = commLib.encodeExclamationMark(folderId);
                folderUrl += "&id=" + folderId;
            }

            return folderUrl;
        }

        //get items under foler
        //foler = "root" / folderResId
        //return json string
        public bool getItemsJson(string folderId, string cid, out string itemsJsonStr)
        {
            bool gotJson = false;
            //HttpWebRequest req;
            HttpWebResponse resp;
            itemsJsonStr = "";

            try
            {
                if (hasLogin) // login
                {
                    string getItemsUrl = genGetItemsUrl(folderId);


                    //req = (HttpWebRequest)WebRequest.Create(getItemsUrl);
                    //setCommonHttpReqPara(ref req);
                    //req.Accept = "application/json";
                    //req.Headers["Canary"] = gCanary;
                    //req.Headers["Appid"] = gAppid;
                    ////req.Headers["X-Skyapioriginid"] = skyApiOriginId;
                    //req.Headers["X-Requested-With"] = "XMLHttpRequest";

                    //resp = (HttpWebResponse)req.GetResponse();

                    ////update latest cookies
                    //gCurDomain = commLib.extractDomain(getItemsUrl);
                    //CookieCollection parsedCookies = commLib.parseSetCookie(resp.Headers["Set-Cookie"], gCurDomain);
                    //commLib.updateLocalCookies(parsedCookies, ref skydriveCookies);

                    //itemsJsonStr = getCommonRespHtml(ref resp);


                    Dictionary<string, string> headerDict = new Dictionary<string, string>();
                    headerDict.Add("AllowAutoRedirect", "false");
                    headerDict.Add("Accept", "application/json");
                    headerDict.Add("Canary", gCanary);
                    headerDict.Add("Accept-Language", "en-US");
                    headerDict.Add("Appid", gAppid);
                    headerDict.Add("X-Requested-With", "XMLHttpRequest");
                    itemsJsonStr = commLib.getUrlRespHtml(getItemsUrl, headerDict);


                    gotJson = true;
                }
                else // not login
                {
                    string folderUrl = genSkyFolderUrl(cid, folderId);
                    
                    //req = (HttpWebRequest)WebRequest.Create(folderUrl);
                    //setCommonHttpReqPara(ref req);
                    //resp = (HttpWebResponse)req.GetResponse();

                    resp = commLib.getUrlResponse(folderUrl);

                    string respHtml = getSkydriveRespHtmlUnlogin(ref resp);
                    //string primeP = @"var\s+primedResponse=(\{""items""\:.+?\});\s+\$Do\.register\(""primedResponse""\);";
                    //$Do.register(\"primedResponse\", null, true);
                    string primeP = @"primedResponse=(\{""items""\:.+?\});\s*?\$Do\.register\(""primedResponse""";
                    if (commLib.extractSingleStr(primeP, respHtml, out itemsJsonStr))
                    {
                        gotJson = true;
                    }
                }
            }
            catch
            {
                gotJson = false;
            }

            return gotJson;
        }

        public bool getSkydriveImageFromUrl(string url, out Image theImage)
        {
            bool fetchImgOK = false;
            theImage = null;

            //HttpWebRequest req;
            HttpWebResponse resp;

            try
            {
                // here need do emulate all process:
                // from https://login.live.com/login.srf? to auth.bay.livefilestore.com/storageservice/passport/login.aspx?
                // so here tmp not support view image for none-shared pictures


            //    //http://storage.live.com/storageservice/passport/auth.aspx?sru=http:%2f%2fstorage.live.com%2fitems%2f9A8B8BF501A38A36!955
            //    //1. do authenticatation
                
            //    //string storageserviceUrl = "http://storage.live.com/storageservice/passport/auth.aspx";
            //    //storageserviceUrl += "?sru=" + HttpUtility.UrlEncode(url);

            //    string storageserviceUrl = "http://storage.live.com/storageservice/passport/auth.aspx?sru=http:%2f%2fstorage.live.com%2fitems%2f9A8B8BF501A38A36!955";

            //    req = (HttpWebRequest)WebRequest.Create(storageserviceUrl);
            //    setCommonHttpReqPara(ref req);

            //    if (cookiesForGetFile != null)
            //    {
            //        req.CookieContainer = new CookieContainer();

            //        req.CookieContainer.PerDomainCapacity = 40; // following will exceed max default 20 cookie per domain
            //        req.CookieContainer.Add(cookiesForGetFile);
            //    }

            //    resp = (HttpWebResponse)req.GetResponse();
            //    if (resp.StatusCode == HttpStatusCode.Found)
            //    {
                    //2. get pic
                    //req = (HttpWebRequest)WebRequest.Create(url);
                    //setCommonHttpReqPara(ref req);
                    //req.AllowAutoRedirect = true;
                    ////refer: http://blog.csdn.net/successhen/article/details/4208238
                    //resp = (HttpWebResponse)req.GetResponse();

                    resp = commLib.getUrlResponse(url);
                
                    Stream imgStream = resp.GetResponseStream();
                    theImage = Image.FromStream(imgStream);

                    fetchImgOK = true;
                //}
            }
            catch
            {
                fetchImgOK = false;
            }
            
            return fetchImgOK;
        }


        [Serializable]
        public struct loginInfo_t
        {
            public bool valid;
            public string username;
            public string cid;
            public string appid;
            public string bitProtocol;
            public string canary;
            public CookieCollection cookies;
            public DateTime createdTime;    // record the login info(cookie) create time
            public DateTime lastUpldateTime;// last update the login info(cookie)'s time
        };

        public bool longinSkydrive(string username, string password, out loginInfo_t loginInfo)
        {
            return longinSkydrive(username, password, false, out loginInfo);
        }

        public bool longinSkydrive(string username, string password, bool isKeepLogin, out loginInfo_t loginInfo)
        {
            //refer: http://www.cnblogs.com/hackpig/archive/2010/02/15/1668383.html
            //wbrSkydrive.Navigate(new Uri("https://skydrive.live.com/"));
            
            //string setCookieStr = "";

            loginInfo.valid = false;
            loginInfo.username = "";
            loginInfo.cid = "";
            loginInfo.appid = "";
            loginInfo.bitProtocol = "";
            loginInfo.canary = "";
            loginInfo.cookies = new CookieCollection();
            loginInfo.createdTime = new DateTime(1970, 1, 1);
            loginInfo.lastUpldateTime = loginInfo.createdTime;

            //HttpWebRequest req;
            HttpWebResponse resp;
            //StreamReader sr;
            //CookieCollection parsedCookies;
                        
            //refer: http://en.wikipedia.org/wiki/List_of_HTTP_header_fields

            //add this to fix problem: sometime GetResponse will dead
            System.GC.Collect();

            //--------------------------- 1 skydrive request --------------------------------
            //req = (HttpWebRequest)WebRequest.Create(constSkydriveUrl);
            //setCommonHttpReqPara(ref req);
            //resp = (HttpWebResponse)req.GetResponse();
            //commLib.updateLocalCookies(resp.Cookies, ref skydriveCookies);
            //string skydriveRetHtml = getCommonRespHtml(ref resp);

            string skydriveRetHtml = commLib.getUrlRespHtml(constSkydriveUrl);
            //skydriveCookies = commLib.getCurCookies();


            //--------------------------- 2 login.srf request --------------------------------
            //https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=11&ct=1327974680&rver=6.1.6206.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fskydrive.live.com%2F&lc=2052&id=250206&mkt=zh-CN&cbcxt=sky
            string loginSrfUrl = extractLoginSrfUrl(skydriveRetHtml);

            //req = (HttpWebRequest)WebRequest.Create(loginSrfUrl);

            //gCurDomain = commLib.extractDomain(loginSrfUrl);

            //setCommonHttpReqPara(ref req);
            //req.Referer = constSkydriveUrl;

            //resp = (HttpWebResponse)req.GetResponse();
            //// here resp.Cookies may be uncorrect, so parse the returned Set-Cookie to get real cookies
            //parsedCookies = commLib.parseSetCookie(resp.Headers["Set-Cookie"], gCurDomain);
            //commLib.updateLocalCookies(parsedCookies, ref skydriveCookies);

            //string loginSrfHtml = getCommonRespHtml(ref resp);



            string loginSrfHtml = commLib.getUrlRespHtml(loginSrfUrl);
            //skydriveCookies = commLib.getCurCookies();

            //-----------------------------------------------------------------
            //3. resourcespreload -> get 2Jro0r84zTRoocI0W5VmeA for Bucket4.js
            //https://skydrive.live.com/handlers/resourcespreload.mvc?view=Folders.All&id=250206&mkt=ZH-CN
            string resPreloadUrl = extractResPreloadUrl(loginSrfHtml);

            //req = (HttpWebRequest)WebRequest.Create(resPreloadUrl);
            
            //setCommonHttpReqPara(ref req);
            //req.Referer = loginSrfUrl;

            //resp = (HttpWebResponse)req.GetResponse();
            //commLib.updateLocalCookies(resp.Cookies, ref skydriveCookies);

            //string resPreloadRetHtml = getCommonRespHtml(ref resp);

            
            
            string resPreloadRetHtml = commLib.getUrlRespHtml(resPreloadUrl);
            //skydriveCookies = commLib.getCurCookies();

            //-------------------------------------------------------------------------------
            //4.Bucket4.js -> BitProtocol
            //https://secure.wlxrs.com/2Jro0r84zTRoocI0W5VmeA/Bucket4.js
            string bucket4Js = extractBucket4jsUrl(resPreloadRetHtml);

            //req = (HttpWebRequest)WebRequest.Create(bucket4Js);

            //setCommonHttpReqPara(ref req);
            //req.Referer = resPreloadUrl;

            //resp = (HttpWebResponse)req.GetResponse();
            //string bucket4jsRetHtml = getCommonRespHtml(ref resp);
            

            string bucket4jsRetHtml = commLib.getUrlRespHtml(bucket4Js);
            //skydriveCookies = commLib.getCurCookies();

            extractBitProtocol(bucket4jsRetHtml);

            //--------------------------- 5 post.srf request --------------------------------
            //https://login.live.com/ppsecure/post.srf?wa=wsignin1.0&rpsnv=11&ct=1328070682&rver=6.1.6206.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fskydrive.live.com%2F&lc=2052&id=250206&mkt=zh-CN&cbcxt=sky&bk=1328070683
            string srfUpostUrl = extractSrfUpostUrl(loginSrfHtml);

            ////refer: http://www.west-wind.com/presentations/dotnetWebRequest/dotnetWebRequest.htm
            //req = (HttpWebRequest)WebRequest.Create(srfUpostUrl);
            //gCurDomain = commLib.extractDomain(srfUpostUrl);

            //req.Method = "POST";

            ////this request will redirect to https://skydrive.live.com/
            ////here should disable auto redirect to get cookies, which contains authentification info
            ////then later mannually access that redirected url
            //req.AllowAutoRedirect = false;

            //req.Accept = "text/html, application/xhtml+xml, */*";
            //req.UserAgent = gUserAgent;
            //req.KeepAlive = true;
            //req.Referer = loginSrfUrl;
            //req.ContentType = "application/x-www-form-urlencoded";
            //req.Headers["Accept-Language"] = gAcceptLanguage;
            //req.Headers["Origin"] = "https://login.live.com";
            //req.Headers["Cache-Control"] = "no-cache";

            //string postData = genPostsrfPostData(loginSrfHtml, username, password, isKeepLogin);
            ////byte[] postBytes = Encoding.GetEncoding("utf-8").GetBytes(postData);
            //byte[] postBytes = Encoding.UTF8.GetBytes(postData);
            //req.ContentLength = postBytes.Length;

            //req.CookieContainer = new CookieContainer();
            //if (skydriveCookies != null)
            //{
            //    req.CookieContainer.Add(skydriveCookies);
            //}

            //req.Proxy = null;
            //Stream postDataStream = req.GetRequestStream();
            //postDataStream.Write(postBytes, 0, postBytes.Length);
            //postDataStream.Close();

            //resp = (HttpWebResponse)req.GetResponse();
            ////resp.Cookies only contains 15 cookies, atcually set-cookies contains 21 cookies, so not use following part
            ////commLib.updateLocalCookies(resp.Cookies, ref skydriveCookies);
            //setCookieStr = resp.Headers["Set-Cookie"];
            //parsedCookies = commLib.parseSetCookie(setCookieStr, gCurDomain);
            //commLib.updateLocalCookies(parsedCookies, ref skydriveCookies);




            Dictionary<string, string> headerDict = new Dictionary<string, string>();
            //headerDict.Add("Referer", loginSrfUrl);
            headerDict.Add("AllowAutoRedirect", "false");
            //headerDict.Add("Origin", "https://login.live.com");
            //headerDict.Add("Cache-Control", "no-cache");

            Dictionary<string, string> postDict = genPostsrfPostDict(loginSrfHtml, username, password, isKeepLogin);

            //HttpWebResponse respNoUse = commLib.getUrlResponse(srfUpostUrl, headerDict, postDict, 0);
            commLib.getUrlResponse(srfUpostUrl, headerDict, postDict); // interal process will store valid cookies
            //skydriveCookies = commLib.getCurCookies();

            //this response has no response data, so no need to read response html

            //--------------------------- 6 request --------------------------------
            //https://skydrive.live.com/

            //req = (HttpWebRequest)WebRequest.Create(constSkydriveUrl);

            //setCommonHttpReqPara(ref req);
            //req.Referer = loginSrfUrl;
            //req.Headers.Add("Cache-Control", "no-cache");

            ////may timeout, has fixed in:
            ////http://www.crifan.com/fixed_problem_sometime_httpwebrequest_getresponse_timeout/
            //resp = (HttpWebResponse)req.GetResponse();
            //commLib.updateLocalCookies(resp.Cookies, ref skydriveCookies);
            
            ////string primeRespHtml = getCommonRespHtml(ref resp);
            ////primeRespHtml = primeRespHtml.Replace("\0", "");
            
            //string primeRespHtml = getSkydriveRespHtmlLogin(ref resp);

            
            
            resp = commLib.getUrlResponse(constSkydriveUrl, null, null);
            string primeRespHtml = getSkydriveRespHtmlLogin(ref resp);
            skydriveCookies = commLib.getCurCookies();

            //check whether contain primedResponse
            if (Regex.Match(primeRespHtml, @"primedResponse").Success)
            {
                hasLogin = true;

                extractValues(primeRespHtml);
                //loginInfo.cid = gCid;
                prepareForUploadFile();

                //strore login info
                loginInfo.valid = true;
                loginInfo.username = username;
                loginInfo.cid = gCid;
                loginInfo.appid = gAppid;
                loginInfo.bitProtocol = gBitProtocol;
                loginInfo.canary = gCanary;
                loginInfo.cookies = skydriveCookies;
                loginInfo.createdTime = DateTime.Now;
                loginInfo.lastUpldateTime = loginInfo.createdTime;
            }
            else
            {
                hasLogin = false;
                clearGolobalValues();
            }

            return hasLogin;
        }

        public void restoreSkydriveLoginInfo(loginInfo_t loginInfo)
        {
            gCid = loginInfo.cid;
            gAppid = loginInfo.appid;
            gBitProtocol = loginInfo.bitProtocol;
            gCanary = loginInfo.canary;
            skydriveCookies = new CookieCollection();
            skydriveCookies = loginInfo.cookies;
            commLib.setCurCookies(skydriveCookies);

            prepareForUploadFile();

            //// access skydrive.com to update some cookie(E, xidseq)
            //// to avoid cookie expired
            //HttpWebRequest req;
            //HttpWebResponse resp;
            ////StreamReader sr;
            //CookieCollection parsedCookies;
            //req = (HttpWebRequest)WebRequest.Create(constSkydriveUrl);
            //setCommonHttpReqPara(ref req);
            ////req.Referer = loginSrfUrl;
            //req.Headers.Add("Cache-Control", "no-cache");

            //resp = (HttpWebResponse)req.GetResponse();
            //commLib.updateLocalCookies(resp.Cookies, ref skydriveCookies);
            //string primeRespHtml = getSkydriveRespHtmlLogin(ref resp);

            ////check whether contain primedResponse
            //if (Regex.Match(primeRespHtml, @"primedResponse").Success)
            //{
            //    hasLogin = true;
            //}


            hasLogin = true;
        }

        /*********************************************************************/
        /* Skydrive */
        /*********************************************************************/

        //parse skydrive webpage returned json string into items: current folder item and child items under current folder
        public bool parseSkydriveJsonToItems(string jsonStr, string curFolderId, string cid, out folderItems_t parsedItems)
        {
            bool parseOk = false;
            parsedItems = new folderItems_t();
            parsedItems.selfItem = new skyItem_t();
            parsedItems.childItems = new List<skyItem_t>();

            string itemTypeFolder = "32"; // itemType is 32 means is folder, otherwise is file
            string iconTypeDefault = "Default"; // non-suffix,un-recognized file -> file type is Default
            string iconTypeAudio = "Audio";
            string iconTypePhoto = "Photo";
            string iconTypeVideo = "Video";

            try
            {
                //string childP = @"(""extension"":""[\.\w]+?"",)?""group"":\d+,""iconType"":""\w+"",""id"":""[\w!]+"",(""isPdf"":\w+,)?(""isSpaces"":\w+,)?(""isSpecialFolder"":\d+,)?""lastModifierCid"":""\w+"",""lastModifierName"":"".*?"",""modifiedDate"":\d+,""name"":"".*?"",.+?""parentId"":""" + curFolderId + @"""";

                //add support photo url
                //string childP = @"(""extension"":""[\.\w]+?"",)?""group"":\d+,""iconType"":""\w+"",""id"":""[\w!]+"",(""isPdf"":\w+,)?(""isSpaces"":\w+,)?(""isSpecialFolder"":\d+,)?""lastModifierCid"":""\w+"",""lastModifierName"":"".*?"",""modifiedDate"":\d+,""name"":"".*?"",.+?""parentId"":""" + curFolderId + @""""
                //    + @"(,""photo"":.+?""thumbnailSet"":\{""baseUrl"":""(https:.+?)"",.+?""name"":""scaledLargest"",""url"":""(.+?)\?psid=1"")?";

                //skydrive return json format changed, add a new field "itemType" between "id" and "lastModifierCid"
                //string childP = @"(""extension"":""[\.\w]+?"",)?""group"":\d+,""iconType"":""\w+"",""id"":""[\w!]+"",(""isPdf"":\w+,)?(""isSpaces"":\w+,)?(""isSpecialFolder"":\d+,)?""itemType"":\d+,""lastModifierCid"":""\w+"",""lastModifierName"":"".*?"",""modifiedDate"":\d+,""name"":"".*?"",.+?""parentId"":""" + curFolderId + @""""
                //    + @"(,""photo"":.+?""thumbnailSet"":\{""baseUrl"":""(https:.+?)"",.+?""name"":""scaledLargest"",""url"":""(.+?)\?psid=1"")?";

                //2012-08-15: new skydrive return json all changed 
                //string childP = @"""group"":\d+,""iconType"":""\w+"",""id"":""[\w!]+"",""itemType"":\d+,""lastModifierCid"":""\w+"",""lastModifierName"":"".*?"",""modifiedDate"":\d+,""name"":"".*?"",""ownerCid"":""\w+"",""ownerDCid"":"".*?"",""ownerName"":"".*?"",""parentId"":""" + curFolderId + @"""";
                //string childP = @"""group"":\d+,""iconType"":""(?<iconType>\w+)"",""id"":""(?<id>[\w!]+)"",""itemType"":(?<itemType>\d+),""lastModifierCid"":""\w+"",""lastModifierName"":"".*?"",""modifiedDate"":\d+,""name"":""(?<name>.*?)"",""ownerCid"":""\w+"",""ownerDCid"":"".*?"",""ownerName"":"".*?"",""parentId"":""" + curFolderId + @"""";

                //mimeType and photo part
                //string childP = @"(?<extensionPart>""extension"":""(?<extension>[\.\w]+?)"",)?""group"":\d+,""iconType"":""(?<iconType>\w+)"",""id"":""(?<id>[\w!]+)"",""itemType"":(?<itemType>\d+),""lastModifierCid"":""\w+"",""lastModifierName"":"".*?"",(""mimeType"":"".+?"",)?""modifiedDate"":\d+,""name"":""(?<name>.*?)"",""ownerCid"":""\w+"",""ownerDCid"":"".*?"",""ownerName"":"".*?"",""parentId"":""" + curFolderId + @""""
                //    + @"(?<photoPart>,""photo"":.+?""thumbnailSet"":\{""baseUrl"":""(?<picBaseUrl>https:.+?)"",.+?""name"":""scaledLargest"",""url"":""(?<picUrlNoPre>.+?)\?psid=1"")?";

                //https://skydrive.live.com/?cid=F1FC1F42B8E21BF1
                //"id":"F1FC1F42B8E21BF1!104","isSpecialFolder":1,"itemType":32,
                string childP = @"(?<extensionPart>""extension"":""(?<extension>[\.\w]+?)"",)?""group"":\d+,""iconType"":""(?<iconType>\w+)"",""id"":""(?<id>[\w!]+)"",(""isPdf"":\w+,)?(""isSpaces"":\w+,)?(""isSpecialFolder"":\d+,)?""itemType"":(?<itemType>\d+),""lastModifierCid"":""\w+"",""lastModifierName"":"".*?"",(""mimeType"":"".+?"",)?""modifiedDate"":\d+,""name"":""(?<name>.*?)"",""ownerCid"":""\w+"",""ownerDCid"":"".*?"",""ownerName"":"".*?"",""parentId"":""" + curFolderId + @""""
                                    + @"(?<photoPart>,""photo"":.+?""thumbnailSet"":\{""baseUrl"":""(?<picBaseUrl>https:.+?)"",.+?""name"":""scaledLargest"",""url"":""(?<picUrlNoPre>.+?)\?psid=1"")?";

                Regex reChild = new Regex(childP);
                MatchCollection matchedChilds = reChild.Matches(jsonStr);
                //txbDebug.Text = matchedChilds.Count.ToString() + Environment.NewLine;
                foreach (Match child in matchedChilds)
                {
                    string iconType = child.Groups["iconType"].Value; // "iconType":"NonEmptyDocumentFolder" / "iconType":"Default",
                    string itemType = child.Groups["itemType"].Value; // "itemType":32
                    string id       = child.Groups["id"].Value; // "id":"9A8B8BF501A38A36!504"
                    string name     = child.Groups["name"].Value; // "name":"music"

                    bool foundExt           = child.Groups["extensionPart"].Success;
                    string extensionPart    = child.Groups["extensionPart"].Value; // "extension":".mp3"
                    string extension        = child.Groups["extension"].Value; // .mp3

                    if (foundExt)
                    {
                        if (iconTypeDefault == iconType)
                        {
                            string extNoPoint = extension.Replace(".", "");
                            
                            if (addSufAudioList.Contains(extNoPoint))
                            {
                                iconType = iconTypeAudio;
                            }
                            else if (addSufPhotoList.Contains(extNoPoint))
                            {
                                iconType = iconTypePhoto;
                            }
                            else if (addSufVideoList.Contains(extNoPoint))
                            {
                                iconType = iconTypeVideo;
                            } 
                        }
                    }

                    //string curItem = child.Groups[0].ToString();
                    //"isSpaces": true,
                    //"isSpecialFolder":1,
                    //"isPdf": true,
                    //string filedsP = @"(?<extensionPart>""extension"":""(?<extension>[\.\w]+?)"",)?""group"":\d+,""iconType"":""(?<iconType>\w+)"",""id"":""(?<id>[\w!]+)"",(?<isPdfPart>""isPdf"":(?<isPdf>\w+),)?(?<isSpacesPart>""isSpaces"":(?<isSpaces>\w+),)?(?<isSpecialFolderPart>""isSpecialFolder"":(?<isSpecialFolder>\d+),)?""lastModifierCid"":""(?<lastModifierCid>\w+)"",""lastModifierName"":""(?<lastModifierName>.*?)"",""modifiedDate"":(?<modifiedDate>\d+),""name"":""(?<name>.*?)"",.+?""parentId"":""" + curFolderId + @"""";

                    //add photo url support
                    //string filedsP = @"(?<extensionPart>""extension"":""(?<extension>[\.\w]+?)"",)?""group"":\d+,""iconType"":""(?<iconType>\w+)"",""id"":""(?<id>[\w!]+)"",(?<isPdfPart>""isPdf"":(?<isPdf>\w+),)?(?<isSpacesPart>""isSpaces"":(?<isSpaces>\w+),)?(?<isSpecialFolderPart>""isSpecialFolder"":(?<isSpecialFolder>\d+),)?""lastModifierCid"":""(?<lastModifierCid>\w+)"",""lastModifierName"":""(?<lastModifierName>.*?)"",""modifiedDate"":(?<modifiedDate>\d+),""name"":""(?<name>.*?)"",.+?""parentId"":""" + curFolderId + @""""
                    //                    + @"(?<photoPart>,""photo"":.+?""thumbnailSet"":\{""baseUrl"":""(?<picBaseUrl>https:.+?)"",.+?""name"":""scaledLargest"",""url"":""(?<picUrlNoPre>.+?)\?psid=1"")?";

                    //string filedsP = @"(?<extensionPart>""extension"":""(?<extension>[\.\w]+?)"",)?""group"":\d+,""iconType"":""(?<iconType>\w+)"",""id"":""(?<id>[\w!]+)"",(?<isPdfPart>""isPdf"":(?<isPdf>\w+),)?(?<isSpacesPart>""isSpaces"":(?<isSpaces>\w+),)?(?<isSpecialFolderPart>""isSpecialFolder"":(?<isSpecialFolder>\d+),)?""itemType"":\d+,""lastModifierCid"":""(?<lastModifierCid>\w+)"",""lastModifierName"":""(?<lastModifierName>.*?)"",""modifiedDate"":(?<modifiedDate>\d+),""name"":""(?<name>.*?)"",.+?""parentId"":""" + curFolderId + @""""
                    //                    + @"(?<photoPart>,""photo"":.+?""thumbnailSet"":\{""baseUrl"":""(?<picBaseUrl>https:.+?)"",.+?""name"":""scaledLargest"",""url"":""(?<picUrlNoPre>.+?)\?psid=1"")?";

                    //Regex filedsRx = new Regex(filedsP);
                    //Match fields = filedsRx.Match(curItem);

                    //string allField = fields.Groups[0].ToString();

                    //bool foundExt = fields.Groups["extensionPart"].Success;
                    //string extensionPart = fields.Groups["extensionPart"].Value; // "extension":".mp3"
                    //string extension = fields.Groups["extension"].Value; // ".mp3"
                    //string iconType = fields.Groups["iconType"].Value; // "iconType":"NonEmptyDocumentFolder"
                    //string id = fields.Groups["id"].Value; // "id":"9A8B8BF501A38A36!504"
                    //string isPdf = fields.Groups["isPdf"].Value;
                    //string isSpaces = fields.Groups["isSpaces"].Value;
                    //string isSpecialFolder = fields.Groups["isSpecialFolder"].Value;
                    //string lastModifierCid = fields.Groups["lastModifierCid"].Value;
                    //string lastModifierName = fields.Groups["lastModifierName"].Value;
                    //string modifiedDate = fields.Groups["modifiedDate"].Value;
                    //string name = fields.Groups["name"].Value; // "name":"music"

                    string picBaseUrl = "";
                    string picUrlNoPre = "";
                    bool foundPhotoPart = child.Groups["photoPart"].Success;
                    if (foundPhotoPart)
                    {
                        picBaseUrl = child.Groups["picBaseUrl"].Value;
                        picUrlNoPre = child.Groups["picUrlNoPre"].Value;
                    }

                    //for unlogin mode, some old content on skydrive is strange for id is same with parent id, so omit it here
                    if (id.ToLower() == curFolderId.ToLower())
                    {
                        continue;
                    }

                    skyItem_t info = new skyItem_t();
                    info.id = id;
                    info.name = name;
                    info.iconType = iconType;
                    info.parentFolderId = curFolderId;
                    info.extension = extension; // maybe ""

                    // some file no extension(iconType is Default), but still is a file
                    //if (foundExt || ((!foundExt) && iconType == "Default"))
                    if (itemType != itemTypeFolder)
                    {
                        // is file

                        //only files(pic,audio,doc,video,...) has the extension
                        info.isFolder = false;

                        info.fullName = info.name + info.extension;
                        info.permaLink = genSkyPermaLink(info.fullName, info.id);

                        if (foundPhotoPart)
                        {
                            //convert:
                            //https:\\/\\/byfiles.storage.live.com\\/y1p--_FjnDIcjCGc-JZzqSD-yvSYLRw0-xpE6o6YmS98621HTjVWJJfayZfK4OWTWhcPDUaahl0Vdz3Vbwn5PEFqw\\/_...Net - testName.jpg
                            //to:
                            //https://byfiles.storage.live.com/y1p--_FjnDIcjCGc-JZzqSD-yvSYLRw0-xpE6o6YmS98621HTjVWJJfayZfK4OWTWhcPDUaahl0Vdz3Vbwn5PEFqw/_...Net - testName.jpg

                            string originFullUrl = picBaseUrl + picUrlNoPre;
                            //string decodedFullUrl = HttpUtility.UrlDecode(originFullUrl);
                            string decodedFullUrl = originFullUrl.Replace("\\/", "/");

                            //info.picFullUrl = decodedBaseUrl + decodedUrlNoPre;
                            info.picFullUrl = decodedFullUrl;
                        }
                    }
                    else
                    {
                        // is folder

                        info.isFolder = true;
                        info.fullName = info.name;
                        info.permaLink = genSkyFolderUrl(cid, info.id);
                    }

                    parsedItems.childItems.Add(info); /* add files and non-self and non-parent folders */
                }//foreach

                //parse folder self
                if (curFolderId == skydriveRootId)
                {
                    string ownerCid = "", ownerName = "";
                    //string rootP = @"""group"":\d+,""id"":""root"",.*?""ownerCid"":""(?<ownerCid>\w+)"".+?""ownerName"":""(?<ownerName>.+?)""";
                    string rootP = @"""id"":""root"",""itemType"":32,.*?""ownerCid"":""(?<ownerCid>\w+)"".+?""ownerName"":""(?<ownerName>.+?)""";
                    Regex rootRx = new Regex(rootP);
                    Match foundRoot = rootRx.Match(jsonStr);
                    if (foundRoot.Success)
                    //if(extractSingleStr(rootP, jsonStr, out ownerCid))
                    {
                        ownerCid = foundRoot.Groups["ownerCid"].Value;
                        ownerName = foundRoot.Groups["ownerName"].Value;

                        if (cid.ToLower() == ownerCid.ToLower())
                        {
                            parseOk = true;

                            //generate "root" info
                            parsedItems.selfItem.id = skydriveRootId;
                            parsedItems.selfItem.name = ownerName;
                            parsedItems.selfItem.fullName = ownerName;
                            parsedItems.selfItem.isFolder = true;
                            parsedItems.selfItem.permaLink = genSkyFolderUrl(cid, skydriveRootId);
                            parsedItems.selfItem.iconType = "NonEmptyDocumentFolder";
                        }
                    }
                }
                else
                {
                    //"group":0,"iconType":"NonEmptyDocumentFolder","id":"9A8B8BF501A38A36!504","lastModifierCid":"9A8B8BF501A38A36","lastModifierName":"tian wang","modifiedDate":634649018652230000,"name":"music","ownerCid":"9A8B8BF501A38A36","ownerDCid":"-7310595685695124938","ownerName":"tian wang","parentId":"root","sharingLevel":"Everyone (public)","sharingLevelValue":0,"size":"54267608",
                    //"group":0,"iconType":"NonEmptyDocumentFolder","id":"9A8B8BF501A38A36!504","itemType":32,"lastModifierCid":"9A8B8BF501A38A36","lastModifierName":"tian wang","modifiedDate":634649018652230000,"name":"music","ownerCid":"9A8B8BF501A38A36","ownerDCid":"-7310595685695124938","ownerName":"tian wang","parentId":"root","sharingLevel":"Everyone (public)","sharingLevelValue":0,"size":"54267608",
                    //string selfP = @"""group"":\d+,""iconType"":""(?<iconType>\w+)"",""id"":""" + curFolderId + @""",.+?""name"":""(?<name>.*?)"",.+?""parentId"":""(?<parentId>.+?)""";
                    string selfP = @"""group"":\d+,(""hasOfficePlan"":\w+?,)?""iconType"":""(?<iconType>\w+)"",""id"":""" + curFolderId + @""",.+?""name"":""(?<name>.*?)"",.+?""parentId"":""(?<parentId>.+?)""";
                    Regex selfRx = new Regex(selfP);
                    Match foundSelf = selfRx.Match(jsonStr);
                    if (foundSelf.Success)
                    {
                        parseOk = true;

                        //add folder info
                        parsedItems.selfItem.id = curFolderId;
                        parsedItems.selfItem.parentFolderId = foundSelf.Groups["parentId"].Value;
                        parsedItems.selfItem.name = foundSelf.Groups["name"].Value;
                        parsedItems.selfItem.fullName = foundSelf.Groups["name"].Value;
                        parsedItems.selfItem.isFolder = true;
                        parsedItems.selfItem.permaLink = genSkyFolderUrl(cid, curFolderId);
                        parsedItems.selfItem.iconType = foundSelf.Groups["iconType"].Value;
                    }
                }
            }
            catch
            {
                parseOk = false;
            }

            return parseOk;
        }


        // extract cid(user id) [and folder Id) from input skydrive (folder) url
        public bool extractIdFromUrl(string skyFolderUrl, out string cid, out string folderId)
        {
            bool urlValid = false;
            cid = "";
            folderId = "";

            //https://skydrive.live.com/?cid=9a8b8bf501a38a36&id=9A8B8BF501A38A36%21504
            //https://skydrive.live.com/?cid=9a8b8bf501a38a36
            //                                                                        1=idPart
            string skyurlP = @"https://skydrive\.live\.com/\?cid=(?<cid>\w{16})(&id=(?<id>\k<cid>%21\d+))?";
            Regex skyurlRx = new Regex(skyurlP, RegexOptions.IgnoreCase);
            Match foundSkyurl = skyurlRx.Match(skyFolderUrl);
            if (foundSkyurl.Success)
            {
                urlValid = true;
                cid = foundSkyurl.Groups["cid"].Value;
                if (foundSkyurl.Groups[1].Value != "")
                {
                    folderId = foundSkyurl.Groups["id"].Value;
                    folderId = commLib.decodeExclamationMark(folderId);
                }
            }

            return urlValid;
        }

        public bool getItemsUnderFolder(string folderId, string cid, out skydrive.folderItems_t parsedItems)
        {
            bool gotItems = false;
            string mainRespJson = "";

            parsedItems = new skydrive.folderItems_t();

            if (getItemsJson(folderId, cid, out mainRespJson))
            {
                //parse json
                if(parseSkydriveJsonToItems(mainRespJson, folderId, cid, out parsedItems))
                {
                    gotItems = true;
                }
            }

            return gotItems;
        }


        public void logoutSkydrive(string username)
        {
            //remove login info
            clearGolobalValues();
        }

        public bool getCurLoginCookies(out CookieCollection curLoginCookies)
        {
            bool gotOk = false;
            curLoginCookies = null;

            if (hasLogin && (skydriveCookies != null))
            {
                if (skydriveCookies.Count > 0)
                {
                    curLoginCookies = skydriveCookies;
                    gotOk = true;
                }
            }

            return gotOk;
        }

    }
}
