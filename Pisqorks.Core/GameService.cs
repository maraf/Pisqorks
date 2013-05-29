using Pisqorks.Core.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pisqorks.Core
{
    public class GameService
    {
        public const int MinGameSize = 10;
        public const int MinWinLine = 4;

        protected IUserContext UserContext { get; private set; }
        protected IGameRepository Games { get; private set; }
        protected IGameStateResolver StateResolver { get; private set; }

        public GameService(IUserContext userContext, IGameRepository games, IGameStateResolver stateResolver)
        {
            UserContext = userContext;
            Games = games;
            StateResolver = stateResolver;
        }

        public Game Get(Guid gameID)
        {
            return Games.Get(gameID);
        }

        public IEnumerable<Game> GetLobby()
        {
            return Games.GetPublic().Where(g => g.Player1 != UserContext.UserAccount);
        }

        public Game Create(GameShape player1Shape, bool isPublic, int boardWidth, int boardHeight, int winningLine, int? maxIdle = null)
        {
            if (boardWidth < MinGameSize || boardHeight < MinGameSize || winningLine < MinWinLine)
                return null;

            Game game = new Game(boardWidth, boardHeight, winningLine, isPublic, player1Shape, maxIdle);
            game.Player1 = UserContext.UserAccount;
            Games.Create(game);
            return game;
        }

        public Game AssignPlayer2(Guid gameID)
        {
            Game game = Games.Get(gameID);
            if (game == null || IsActive(game) || game.Player1 == UserContext.UserAccount)
                return null;

            game.Player2 = UserContext.UserAccount;
            game.Started = DateTime.Now;
            Games.Update(game);
            return game;
        }

        public GameMove ApplyMove(Guid gameID, int x, int y)
        {
            Game game = Games.Get(gameID);
            if (!CanPlayCurrent(game))
                return null;

            if (game.BoardWidth <= x || game.BoardHeight <= y || !IsEmpty(game, x, y))
                return null;

            GameMove move = new GameMove(game, UserContext.UserAccount, x, y);
            Games.AppendMove(game, move);

            if (StateResolver.IsWinning(game))
            {
                game.Winner = UserContext.UserAccount;
                game.Closed = DateTime.Now;
                Games.Update(game);
            }

            return move;
        }

        private bool IsActive(Game game)
        {
            return game != null && game.Player2 != null && game.Winner == null;
        }

        private bool CanPlayCurrent(Game game)
        {
            if (!IsActive(game))
                return false;

            GameMove lastMove = game.Moves.OrderByDescending(m => m.Played).FirstOrDefault();
            if (lastMove == null)
                return game.Player1 == UserContext.UserAccount;

            return lastMove.Player != UserContext.UserAccount;
        }

        private bool IsEmpty(Game game, int x, int y)
        {
            return !game.Moves.Any(m => m.X == x && m.Y == y);
        }
    }
}
