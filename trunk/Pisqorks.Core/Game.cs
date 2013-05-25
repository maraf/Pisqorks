using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pisqorks.Core
{
    public class Game
    {
        public Guid ID { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Started { get; set; }
        public DateTime? Closed { get; set; }

        public bool IsPublic { get; set; }

        public int? MaxIdle { get; set; }
        public int BoardWidth { get; set; }
        public int BoardHeight { get; set; }
        public int WinningLine { get; set; }

        public UserAccount Player1 { get; set; }
        public UserAccount Player2 { get; set; }

        public GameShape Player1Shape { get; set; }
        public GameShape Player2Shape { get; set; }

        public UserAccount Winner { get; set; }

        public List<GameMove> Moves { get; set; }

        public Game()
        {
            Moves = new List<GameMove>();
        }

        public Game(int boardWidth, int boardHeight, int winningLine, bool isPublic = true, GameShape player1Shape = GameShape.Cross, int? maxIdle = null)
            : this()
        {
            BoardWidth = boardWidth;
            BoardHeight = boardHeight;
            WinningLine = winningLine;
            IsPublic = isPublic;
            Player1Shape = player1Shape;
            MaxIdle = maxIdle;
        }
    }
}
