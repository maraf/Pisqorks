using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pisqorks.Core
{
    public class UserLog
    {
        public Guid SessionID { get; set; }
        public virtual UserAccount UserAccount { get; set; }
        public DateTime LoggedIn { get; set; }
        public DateTime? LastActivity { get; set; }
        public DateTime? LoggedOut { get; set; }
        public bool IsPersistent { get; set; }
    }
}
