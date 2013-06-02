using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pisqorks.Core
{
    public class PlainGameStateResolver : IGameStateResolver
    {
        public bool IsWinning(Game game)
        {
            if (game == null || game.Player2 == null)
                return false;

            if (game.Winner != null)
                return true;

            int[,] moves = CreateGameMove(game);
            for (int i = 0; i < game.BoardWidth; i++)
            {
                for (int j = 0; j < game.BoardHeight; j++)
                {
                    if (moves[i, j] != 0)
                    {
                        if (CheckRow(moves, i, j, game.BoardWidth, game.WinningLine, moves[i, j]))
                            return true;

                        if (CheckCol(moves, i, j, game.BoardHeight, game.WinningLine, moves[i, j]))
                            return true;

                        if (CheckColRow(moves, i, j, game.BoardWidth, game.BoardHeight, game.WinningLine, moves[i, j]))
                            return true;

                        if (CheckColRowReverse(moves, i, j, game.BoardWidth, game.WinningLine, moves[i, j]))
                            return true;
                    }
                }
            }
            return false;
        }

        protected int[,] CreateGameMove(Game game)
        {
            int[,] moves = new int[game.BoardWidth, game.BoardHeight];
            foreach (GameMove move in game.Moves)
                moves[move.X, move.Y] = move.Player.ID;

            return moves;
        }

        protected bool CheckRow(int[,] moves, int x, int y, int maxX, int length, int value)
        {
            int i = 0;
            while ((x + i) < maxX && i < length)
            {
                if (moves[x + i, y] != value)
                    break;

                i++;
            }
            return i == length;
        }

        protected bool CheckCol(int[,] moves, int x, int y, int maxY, int length, int value)
        {
            int i = 0;
            while ((y + i) < maxY && i < length)
            {
                if (moves[x, y + i] != value)
                    break;

                i++;
            }
            return i == length;
        }

        protected bool CheckColRow(int[,] moves, int x, int y, int maxX, int maxY, int length, int value)
        {
            int i = 0;
            while ((x + i) < maxX && (y + i) < maxY && i < length)
            {
                if (moves[x + i, y + i] != value)
                    break;

                i++;
            }
            return i == length;
        }

        protected bool CheckColRowReverse(int[,] moves, int x, int y, int maxY, int length, int value)
        {
            int i = 0;
            while ((x - i) >= 0 && (y + i) < maxY && i < length)
            {
                if (moves[x - i, y + i] != value)
                    break;

                i++;
            }
            return i == length;
        }
    }
}
