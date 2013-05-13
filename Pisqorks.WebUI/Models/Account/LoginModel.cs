using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pisqorks.WebUI.Models.Account
{
    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public bool Persistent { get; set; }
    }
}