using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;     //추가
using System.IO;   //추가
using System.IO.Ports;   //추가
using log4net.Appender;
using log4net.Layout;
using log4net.Repository.Hierarchy;
using log4net;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Diagnostics.Eventing.Reader;
using System.Web.UI.WebControls;

namespace KCL_reBMS_Prj
{
    class logCommunication
    {
        private ILog logger;
        private String strPath;
        private String strFileName;
        private TextBox tbLogStatus;
        private bool bReady;

        public logCommunication()
        {
             this.bReady = false;
            loadConfig();
        }

        public void loadConfig()
        {
            try
            {
                using (StreamReader file = File.OpenText(Directory.GetCurrentDirectory() + @"\Config.json"))
                {
                    using (JsonTextReader reader = new JsonTextReader(file))
                    {
                        JObject json = (JObject)JToken.ReadFrom(reader);
                        this.setPath(json["path"].ToString());
                        this.setFileName(json["file_name"].ToString());
                    }
                }
            } catch
            {

            }

            //this.setConfig();
        }
        public void setConfig()
        {
            if (logger != null) logger = null;

            // 로그 매니져 세팅
            var repository = LogManager.GetRepository();
            repository.Configured = true;

            // 콘솔 로그 패턴 설정
            var consoleAppender = new ConsoleAppender();
            consoleAppender.Name = "Console";
            // 로그 패턴
            consoleAppender.Layout = new PatternLayout("%m%n");

            // 파일 로그 패턴 설정
            var rollingAppender = new RollingFileAppender();
            rollingAppender.Name = "RollingFile";
            // 시스템이 기동되면 파일을 추가해서 할 것인가? 새로 작성할 것인가?
            rollingAppender.AppendToFile = true;
            rollingAppender.DatePattern = "-yyyy-MM-dd";
            // 로그 파일 설정
            rollingAppender.File = this.strPath + "\\" + this.strFileName;
            // 파일 단위는 날짜 단위인 것인가, 파일 사이즈인가?
            rollingAppender.RollingStyle = RollingFileAppender.RollingMode.Date;
            // 로그 패턴
            rollingAppender.Layout = new PatternLayout("%m%n");

            var hierarchy = (Hierarchy)repository;
            hierarchy.Root.AddAppender(consoleAppender);
            hierarchy.Root.AddAppender(rollingAppender);
            rollingAppender.ActivateOptions();
            // 로그 출력 설정 All 이면 모든 설정이 되고 Info 이면 최하 레벨 Info 위가 설정됩니다.
            hierarchy.Root.Level = log4net.Core.Level.All;

            logger = LogManager.GetLogger(this.GetType());
        }
        public String getFileName()
        {
            return this.strFileName;
        }

        public void setFileName(String strFileName)
        {
            this.strFileName = strFileName;
        }

        public String getPath()
        {
            return this.strPath;
        }

        public void setPath(String strPath)
        {
            this.strPath = strPath;
        }

        public void logInfo(string msg)
        {
            this.logger.Info(msg);
        }

        public void logWarnning(string msg)
        {
            this.logger.Warn(msg);
        }

        public void logError(string msg)
        {
            this.logger.Error(msg);
        }

        public void logDebug(string msg)
        {
            this.logger.Debug(msg);
        }

        public void logFatal(string msg)
        {
            this.logger.Fatal(msg);
        }

        public bool getReady()
        {
            return this.bReady;
        }

        public void setReady()
        {
            this.bReady = true;
        }

        public void clearReady()
        {
            this.bReady = false;
        }
    }
}