using Pisqorks.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pisqorks.WebUI
{
    public class CurrentUserContext : IUserContext
    {
        public UserLog UserLog { get; set; }
        public UserAccount UserAccount { get; set; }
        public bool IsAuthenticated { get; set; }
    }
}