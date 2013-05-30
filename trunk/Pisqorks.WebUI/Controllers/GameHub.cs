using Microsoft.AspNet.SignalR;
using Pisqorks.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Pisqorks.WebUI.Controllers
{
    public class GameHub : Hub
    {
        protected GameService GameService { get; private set; }
        protected IUserContext UserContext { get; private set; }

        public GameHub()
        {
            GameService = DependencyResolver.Current.GetService<GameService>();
            UserContext = DependencyResolver.Current.GetService<IUserContext>();
        }

        public void PlayerConnected(Guid gameID, string authToken)
        {
            EnsureUserContext(authToken);
            Game game = GameService.Get(gameID);

            if (game.Player1 == UserContext.UserAccount || game.Player2 == UserContext.UserAccount)
            {
                //Add to group
                Groups.Add(Context.ConnectionId, gameID.ToString());

                //Initialize
                Clients.Caller.initialize(gameID, game.BoardWidth, game.BoardHeight, game.WinningLine, GetPlayerShape(game));

                //Send played moves
                IEnumerable<GameMove> moves = game.Moves.OrderByDescending(m => m.Played);
                if (moves.Any())
                {
                    foreach (GameMove item in moves)
                        Clients.Caller.moved(gameID, GetShape(item.Game, item.Player), item.X, item.Y);
                }

                if (game.Player2 != null)
                {
                    //Start game
                    Clients.Caller.startGame(gameID, GetOponentUsername(game), CanPlay(game));
                    Clients.Group(gameID.ToString(), Context.ConnectionId).startGame(gameID, UserContext.UserAccount.Username, !CanPlay(game));
                }

                if (game.Winner != null)
                    Clients.Group(gameID.ToString()).winner(gameID, GetShape(game, game.Winner));
            }
            else
            {
                //TODO: Observer...
            }
        }

        protected void EnsureUserContext(string authToken)
        {
            ((CurrentUserContext)UserContext).SetAuthToken(authToken);
        }

        protected string GetOponentUsername(Game game)
        {
            if (game.Player1 == UserContext.UserAccount)
                return game.Player2.Username;
            
            return game.Player1.Username;
        }

        protected GameShape GetPlayerShape(Game game)
        {
            if (game.Player1 == UserContext.UserAccount)
                return game.Player1Shape;
            else
                return game.Player2Shape;
        }

        protected GameShape GetShape(Game game, UserAccount account)
        {
            if (game.Player1 == account)
                return game.Player1Shape;
            else
                return game.Player2Shape;
        }

        protected bool CanPlay(Game game)
        {
            if (game.Moves.Any())
                return game.Moves.OrderByDescending(m => m.Played).FirstOrDefault().Player != UserContext.UserAccount;
            
            return game.Player1 == UserContext.UserAccount;
        }

        public void Move(Guid gameID, string authToken, int x, int y)
        {
            EnsureUserContext(authToken);

            GameMove move = GameService.ApplyMove(gameID, x, y);
            if (move != null)
            {
                Clients.Group(gameID.ToString()).moved(gameID, GetPlayerShape(move.Game), x, y);

                if (move.Game.Winner != null)
                    Clients.Group(gameID.ToString()).winner(gameID, GetShape(move.Game, move.Game.Winner));
            }
            else
            {
                Clients.Caller.invalid(gameID);
            }
        }
    }
}