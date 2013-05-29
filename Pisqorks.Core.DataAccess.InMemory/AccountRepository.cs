using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pisqorks.Core.DataAccess.InMemory
{
    public class AccountRepository : IAccountRepository
    {
        private List<UserAccount> accounts = new List<UserAccount>();
        private int lastID = 0;

        public UserAccount GetLocal(string username, string password)
        {
            return null;
        }

        public UserAccount Create(UserAccount account)
        {
            account.ID = ++lastID;
            account.Created = DateTime.Now;
            accounts.Add(account);
            return account;
        }
    }
}
