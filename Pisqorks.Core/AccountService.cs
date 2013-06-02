using Pisqorks.Core.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pisqorks.Core
{
    public class AccountService
    {
        protected IAccountRepository Accounts { get; private set; }
        protected IUserLogRepository UserLogs { get; private set; }

        public AccountService(IAccountRepository accounts, IUserLogRepository userLogs)
        {
            Accounts = accounts;
            UserLogs = userLogs;
        }

        public UserAccount Create(string displayName, string username, string password)
        {
            return Accounts.Create(new UserAccount
            {
                Username = displayName,
                LocalAccount = new LocalAccount
                {
                    Username = username,
                    Password = password
                }
            });
        }

        public UserLog Login(string username, string password)
        {
            UserAccount account = Accounts.GetLocal(username, password);
            if (account == null)
                return null;

            UserLog userLog = UserLogs.Create(account, true);
            return userLog;
        }

        public UserLog CreateAnonymous()
        {
            UserAccount account = new UserAccount { Username = "Anonymous" };
            Accounts.Create(account);

            UserLog userLog = UserLogs.Create(account, true);
            return userLog;
        }

        public UserLog GetByAuthToken(Guid authToken)
        {
            return UserLogs.GetByID(authToken);
        }
    }
}
