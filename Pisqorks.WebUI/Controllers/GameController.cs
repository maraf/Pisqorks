﻿using AttributeRouting.Web.Mvc;
using Pisqorks.Core;
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

        [GET("api/game/lobby")]
        public ActionResult Lobby()
        {
            IEnumerable<Game> games = GameService.GetLobby();

            return Json(games, JsonRequestBehavior.AllowGet);
        }

        [POST("api/game/create")]
        public ActionResult Create(CreateModel model)
        {
            if (ModelState.IsValid)
            {
                Game game = GameService.Create(model.Shape, model.IsPublic, model.BoardWidth, model.BoardHeight, model.WinningLine, model.MaxIdle);
                return Json(game.ID);
            }
            return View();
        }

        [POST("api/game/join")]
        public ActionResult Join(JoinModel model)
        {
            if (ModelState.IsValid)
            {
                Game game = GameService.AssignPlayer2(model.GameID);
                return Json(new
                {
                    Joined = game != null,
                    GameID = model.GameID
                });
            }
            return View();
        }

        [POST("api/game/user")]
        public ActionResult UserGames()
        {
            return Json(GameService.GetUserActive().Select(g => g.ID));
        }

        [GET("api/game/today-stats")]
        public ActionResult TodayStats()
        {
            return Json(GameService.GetTodayStats(), JsonRequestBehavior.AllowGet);
        }
    }
}