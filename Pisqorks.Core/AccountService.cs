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

        public AccountService(IAccountRepository accounts)
        {
            Accounts = accounts;
        }
    }
}
