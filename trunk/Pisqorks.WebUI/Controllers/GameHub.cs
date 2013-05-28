using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pisqorks.WebUI.Controllers
{
    public class GameHub : Hub
    {
        public void PlayerConnected(string gameID, string authToken)
        {

        }
    }
}