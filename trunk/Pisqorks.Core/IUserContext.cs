using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pisqorks.Core
{
    public interface IUserContext
    {
        UserLog UserLog { get; }
        UserAccount UserAccount { get; }
        bool IsAuthenticated { get; }
    }
}
