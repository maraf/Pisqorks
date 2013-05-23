using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pisqorks.Core.DataAccess.InMemory
{
    public class UserLogRepository : IUserLogRepository
    {
        private List<UserLog> userLogs = new List<UserLog>();

        public UserLog Create(UserAccount account, bool isPersistent)
        {
            UserLog userLog = new UserLog { UserAccount = account, IsPersistent = isPersistent, LoggedIn = DateTime.Now, SessionID = Guid.NewGuid() };
            userLogs.Add(userLog);
            return userLog;
        }
    }
}
