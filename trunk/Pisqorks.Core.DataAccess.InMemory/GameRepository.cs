using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pisqorks.Core.DataAccess.InMemory
{
    public class GameRepository : IGameRepository
    {
        private Dictionary<Guid, Game> games = new Dictionary<Guid, Game>();

        public Game Get(Guid id)
        {
            if (games.ContainsKey(id))
                return games[id];

            return null;
        }

        public IEnumerable<Game> GetPublic()
        {
            return games.Values.Where(g => g.IsPublic == true && g.Player2 == null && g.Winner == null);
        }

        public IEnumerable<Game> GetActive()
        {
            return games.Values.Where(g => g.Winner == null);
        }

        public IEnumerable<Game> GetByUser(UserAccount account)
        {
            return games.Values.Where(g => g.Player1 == account || g.Player2 == account);
        }

        public Game Create(Game game)
        {
            game.ID = Guid.NewGuid();
            games[game.ID] = game;
            return game;
        }

        public Game Update(Game game)
        {
            return game;
        }

        public GameMove AppendMove(Game game, GameMove move)
        {
            game.Moves.Add(move);
            move.Game = game;
            return move;
        }
    }
}
