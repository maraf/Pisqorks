﻿using Pisqorks.Core;
using Pisqorks.WebUI.Models.Game;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Pisqorks.WebUI.Controllers
{
    public class GameController : Controller
    {
        protected GameService GameService { get; private set; }

        public GameController(GameService gameService)
        {
            GameService = gameService;
        }

        public ActionResult Lobby()
        {
            IEnumerable<Game> games = GameService.GetLobby();

            return Json(games, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Create(CreateModel model)
        {
            if (ModelState.IsValid)
            {
                Game game = GameService.Create(model.Shape, model.IsPublic, model.BoardWidth, model.BoardHeight, model.WinningLine, model.MaxIdle);

            }
            return View();
        }
    }
}