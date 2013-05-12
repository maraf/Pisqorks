using Microsoft.Practices.Unity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Pisqorks.WebUI
{
    public class UnityDependencyResolver : IDependencyResolver
    {
        private IUnityContainer container;

        public UnityDependencyResolver(IUnityContainer container)
        {
            this.container = container;
        }

        public object GetService(Type serviceType)
        {
            if (typeof(IController).IsAssignableFrom(serviceType))
                return container.Resolve(serviceType);

            if (IsRegistered(serviceType))
                return container.Resolve(serviceType);

            return null;
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return container.ResolveAll(serviceType);
        }



        private bool IsRegistered(Type typeToCheck)
        {
            bool isRegistered = true;
            if (typeToCheck.IsInterface || typeToCheck.IsAbstract)
            {
                isRegistered = container.IsRegistered(typeToCheck);
                if (!isRegistered && typeToCheck.IsGenericType)
                {
                    Type openGenericType = typeToCheck.GetGenericTypeDefinition();
                    isRegistered = container.IsRegistered(openGenericType);
                }
            }
            return isRegistered;
        }
    }
}