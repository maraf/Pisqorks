using AttributeRouting.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Pisqorks.WebUI
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapHubs();

            routes.MapRoute(
                name: "Content",
                url: "Content/{action}",
                defaults: new { controller = "Content" }
            );
            routes.MapRoute(
                name: "Default",
                url: "",
                defaults: new { controller = "Content", action = "Home" }
            );
            //routes.MapAttributeRoutes();
        }
    }
}