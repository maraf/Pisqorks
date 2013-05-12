using System;
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

        public string About()
        {
            return "About Pisqorks game!";
        }

    }
}
