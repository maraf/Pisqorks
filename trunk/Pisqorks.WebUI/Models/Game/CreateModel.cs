using Pisqorks.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Pisqorks.WebUI.Models.Game
{
    public class CreateModel
    {
        public bool IsPublic { get; set; }
        public int? MaxIdle { get; set; }

        [Range(GameService.MinGameSize, 100)]
        public int BoardWidth { get; set; }

        [Range(GameService.MinGameSize, 100)]
        public int BoardHeight { get; set; }

        [Range(GameService.MinWinLine, 10)]
        public int WinningLine { get; set; }
        public GameShape Shape { get; set; }
    }
}