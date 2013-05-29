using Pisqorks.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pisqorks.WebUI
{
    public class CurrentUserContext : IUserContext
    {
        private HttpContext httpContext;
        private UserLog userLog;
        private AccountService accountService;

        public UserLog UserLog
        {
            get
            {
                LoadUserLog();
                return userLog;
            }
        }

        public UserAccount UserAccount
        {
            get
            {
                LoadUserLog();
                if (userLog != null) 
                    return userLog.UserAccount;

                return null;
            }
        }

        public bool IsAuthenticated
        {
            get
            {
                LoadUserLog();
                return userLog != null;
            }
        }

        protected string AuthToken { get; set; }

        public CurrentUserContext(HttpContext httpContext, AccountService accountService)
        {
            this.httpContext = httpContext;
            this.accountService = accountService;
        }

        public void SetAuthToken(string token)
        {
            AuthToken = token;
        }

        private void LoadUserLog()
        {
            if (userLog != null)
                return;

            Guid sessionID = Guid.Parse(AuthToken ?? httpContext.Request.Headers["X-AuthToken"]);
            userLog = accountService.GetByAuthToken(sessionID);
        }
    }
}