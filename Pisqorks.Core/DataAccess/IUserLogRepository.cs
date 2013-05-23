using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pisqorks.Core.DataAccess
{
    public interface IUserLogRepository
    {
        UserLog Create(UserAccount account, bool isPersistent);
    }
}
