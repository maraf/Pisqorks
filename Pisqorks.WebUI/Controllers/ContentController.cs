﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Pisqorks.WebUI.Controllers
{
    public class ContentController : Controller
    {
        //
        // GET: /Content/

        public ActionResult Home()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

    }
}
