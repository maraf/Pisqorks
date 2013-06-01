using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pisqorks.Core
{
    public class TodayStatsModel
    {
        public int Wins { get; set; }
        public int Loses { get; set; }
        public int Unfinished { get; set; }

        public TodayStatsModel()
        { }

        public TodayStatsModel(int wins, int loses, int unfinished)
        {
            Wins = wins;
            Loses = loses;
            Unfinished = unfinished;
        }
    }
}
