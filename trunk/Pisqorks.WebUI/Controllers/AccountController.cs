using AttributeRouting;
using AttributeRouting.Web.Mvc;
using Pisqorks.Core;
using Pisqorks.WebUI.Models.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Pisqorks.WebUI.Controllers
{
    //[RoutePrefix("")]
    public class AccountController : Controller
    {
        protected AccountService AccountService { get; private set; }

        public AccountController(AccountService accountService)
        {
            AccountService = accountService;
        }

        [HttpPost]
        public object Login(LoginModel model)
        {
            

            return null;
        }

        public ActionResult Info()
        {
            return View();
        }

        [POST("api/account/anonymous")]
        [HttpPost]
        public ActionResult Anonymous()
        {
            UserLog userLog = AccountService.CreateAnonymous();
            return Json(userLog, JsonRequestBehavior.AllowGet);
        }
    }
}