using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pisqorks.Core
{
    public class UserAccount
    {
        public int ID { get; set; }
        public string Username { get; set; }
        public DateTime Created { get; set; }

        public virtual LocalAccount LocalAccount { get; set; }
    }

    public static class UserAccountExtensions
    {
        public static bool IsAnonymous(this UserAccount account)
        {
            return account.LocalAccount == null;
        }
    }
}
