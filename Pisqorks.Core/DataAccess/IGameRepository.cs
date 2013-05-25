using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pisqorks.Core.DataAccess
{
    public interface IGameRepository
    {
        Game Get(Guid id);
        IEnumerable<Game> GetPublic();
        IEnumerable<Game> GetActive();
        IEnumerable<Game> GetByUser(UserAccount account);

        Game Create(Game game);
        Game Update(Game game);
        GameMove AppendMove(Game game, GameMove move);
    }
}
