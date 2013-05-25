using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pisqorks.Core
{
    public class GameMove
    {
        public int ID { get; set; }
        public Game Game { get; set; }
        public DateTime Played { get; set; }

        public UserAccount Player { get; set; }
        public int X { get; set; }
        public int Y { get; set; }

        public GameMove()
        { }

        public GameMove(Game game, UserAccount player, int x, int y)
        {
            Game = game;
            Played = DateTime.Now;
            Player = player;
            X = x;
            Y = y;
        }
    }
}
