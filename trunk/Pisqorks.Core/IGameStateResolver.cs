using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pisqorks.Core
{
    public interface IGameStateResolver
    {
        bool IsWinning(Game game);
    }
}
