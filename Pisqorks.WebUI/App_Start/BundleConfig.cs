using System.Web;
using System.Web.Optimization;

namespace Pisqorks.WebUI
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new Bundle("~/javascript/libraries")
                .Include("~/Scripts/bootstrap.js")
                .Include("~/Scripts/jquery-{version}.js")
            );

            bundles.Add(new Bundle("~/javascript/pisqorks")
                .Include("~/Scripts/Pisqorks/BaseObject.js")
                .Include("~/Scripts/Pisqorks/BaseModule.js")

                .Include("~/Scripts/Pisqorks/EventHandler.js")
                .Include("~/Scripts/Pisqorks/EventBus.js")
                .Include("~/Scripts/Pisqorks/FeatureRequest.js")
                .Include("~/Scripts/Pisqorks/Router.js")
                .Include("~/Scripts/Pisqorks/UserContext.js")

                .Include("~/Scripts/Pisqorks/Http/*.js")
                .Include("~/Scripts/Pisqorks/UI/*.js")
                .Include("~/Scripts/Pisqorks/Account/*.js")
                .Include("~/Scripts/Pisqorks/Game/*.js")

                .Include("~/Scripts/Pisqorks/Application.js")

            );

            bundles.Add(new Bundle("~/stylesheet/libraries")
                .Include("~/Content/bootstrap.css")
                .Include("~/Content/Site.css")
            );
        }
    }
}