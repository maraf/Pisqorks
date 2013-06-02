var Pisqorks = window.Pisqorks || {};
Pisqorks.Game = window.Pisqorks.Game || {};

// Herní stránky obsahující lobby a rozehrané hry.
Pisqorks.Game.PlayPage = function (requestPool) {
    Pisqorks.Game.BaseTabPage.call(this);

    this.rendered = false;
    this._tabLastID = 1;
    this._requestPool = requestPool;
    this._gameHub = new Pisqorks.Game.GameHub(this._InitializeCurrentGames.bind(this));

    this.BoardViews = [];
    this.LobbyView = new Pisqorks.Game.GameLobbyView(requestPool);
    Pisqorks.Application.EventBus.AddEventListener("OpenGame", this._OnOpenGame.bind(this));

    //TODO: Load current games
};
Pisqorks.Game.PlayPage.prototype = Object.create(Pisqorks.Game.BaseTabPage.prototype);
Pisqorks.Game.PlayPage.prototype.Render = function (root) {
    root.html("");
    //if (!this.rendered) {
        this._tabs = this._CreateRoot(root);
        this._lobbyTab = this._CreateTab(this.LobbyView.Title, true, true);
        this.LobbyView.Render(this._lobbyTab);
        this.rendered = true;

        this._InitializeCurrentGames();
    //}
};
Pisqorks.Game.PlayPage.prototype._InitializeCurrentGames = function () {
    if (this.rendered) {
        this._requestPool.Create("/api/game/user", "post")
            .AuthHeader(Pisqorks.Application.UserContext.AuthToken)
            .OnSuccess(this._OnLoadCurrentGames.bind(this))
            .Send();
    }
};
Pisqorks.Game.PlayPage.prototype._OnOpenGame = function (gameID) {
    var view = new Pisqorks.Game.GameBoardView(gameID, this._gameHub, this._requestPool);
    var tab = this._CreateTab(view.Title, false, false);
    view.AddEventListener("Closed", function () { this._OnCloseGame(tab, view); }.bind(this));
    view.Render(tab);
    this.BoardViews.push(view);
};
Pisqorks.Game.PlayPage.prototype._OnCloseGame = function (tab, view) {
    tab.Tab.remove();
    tab.Content.remove();
    for (var i = 0; i < this.BoardViews.length; i++) {
        if (this.BoardViews[i] == view) {
            this.BoardViews[i] = null;
        }
    }
    this._lobbyTab.Tab.find("a").tab('show');
};
Pisqorks.Game.PlayPage.prototype._OnLoadCurrentGames = function (result) {
    var games = JSON.parse(result.Content);
    for (var i = 0; i < games.length; i++) {
        Pisqorks.Application.EventBus.RaiseEvent("OpenGame", games[i]);
    }
};