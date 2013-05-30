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
        protected IUserContext UserContext { get; private set; }

        public AccountController(AccountService accountService, IUserContext userContext)
        {
            AccountService = accountService;
            UserContext = userContext;
        }

        [HttpPost]
        public object Login(LoginModel model)
        {
            

            return null;
        }

        [POST("api/account/anonymous")]
        public ActionResult Anonymous()
        {
            UserLog userLog = AccountService.CreateAnonymous();
            return Json(new UserContextModel(userLog), JsonRequestBehavior.AllowGet);
        }

        [GET("api/account/info")]
        public ActionResult Info()
        {
            if (UserContext.UserLog == null)
                return new HttpStatusCodeResult(404);

            return Json(new UserContextModel(UserContext.UserLog), JsonRequestBehavior.AllowGet);
        }
    }
}