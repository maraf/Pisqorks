using Pisqorks.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pisqorks.WebUI.Models.Account
{
    public class RegisterResultModel
    {
        public bool Success { get; set; }
        public Guid AuthToken { get; set; }

        public RegisterResultModel(UserLog userLog)
        {
            if (userLog != null)
            {
                Success = userLog != null;
                AuthToken = userLog.SessionID;
            }
        }
    }
}