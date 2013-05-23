using Pisqorks.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pisqorks.WebUI.Models.Account
{
    public class UserContextModel
    {
        public Guid AuthToken { get; set; }
        public string Username { get; set; }
        public DateTime LoggedIn { get; set; }
        public bool IsAnonymous { get; set; }

        public UserContextModel()
        { }

        public UserContextModel(UserLog userLog)
        {
            AuthToken = userLog.SessionID;
            Username = userLog.UserAccount.Username;
            LoggedIn = userLog.LoggedIn;
            IsAnonymous = userLog.UserAccount.IsAnonymous();
        }
    }
}