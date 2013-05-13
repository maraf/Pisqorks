using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pisqorks.Core.DataAccess
{
    public interface IAccountRepository
    {
        public UserAccount GetLocal(string username, string password);
    }
}
