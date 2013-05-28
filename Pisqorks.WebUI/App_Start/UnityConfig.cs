using Microsoft.Practices.Unity;
using Neptuo.Unity;
using Pisqorks.Core;
using Pisqorks.Core.DataAccess;
using Pisqorks.Core.DataAccess.InMemory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Pisqorks.WebUI
{
    public static class UnityConfig
    {
        public static void Register()
        {
            IUnityContainer container = new UnityContainer();
            RegisterTypes(container);
            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
        }

        private static void RegisterTypes(IUnityContainer container)
        {
            container
                .RegisterType<IAccountRepository, AccountRepository>(new SingletonLifetimeManager())
                .RegisterType<IUserLogRepository, UserLogRepository>(new SingletonLifetimeManager())
                .RegisterType<IGameRepository, GameRepository>(new SingletonLifetimeManager())
                .RegisterType<HttpContext>(new GetterLifetimeManager(() => HttpContext.Current))
                .RegisterType<IUserContext, CurrentUserContext>(new PerHttpContextLifetimeManager())
                .RegisterType<IGameStateResolver, PlainGameStateResolver>();
        }
    }

    class PerHttpContextLifetimeManager : LifetimeManager
    {
        private Guid key = Guid.NewGuid();

        public override object GetValue()
        {
            return HttpContext.Current.Items[key];
        }

        public override void RemoveValue()
        {
            HttpContext.Current.Items.Remove(key);
        }

        public override void SetValue(object newValue)
        {
            HttpContext.Current.Items[key] = newValue;
        }
    }
}