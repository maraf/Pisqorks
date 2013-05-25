using Microsoft.Practices.Unity;
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
                .RegisterType<IAccountRepository, AccountRepository>()
                .RegisterType<IUserLogRepository, UserLogRepository>()
                .RegisterType<IGameRepository, GameRepository>()
                .RegisterType<IUserContext, CurrentUserContext>()
                .RegisterType<IGameStateResolver, PlainGameStateResolver>();
        }
    }
}