var Pisqorks = window.Pisqorks || {};
Pisqorks.Game = window.Pisqorks.Game || {};

Pisqorks.Game.PlayPage = function (requestPool) {
    Pisqorks.BaseObject.call(this);

    this.rendered = false;
    this._tabLastID = 1;
    this._requestPool = requestPool;
    this._gameHub = new Pisqorks.Game.GameHub();

    this.BoardViews = [];
    this.LobbyView = new Pisqorks.Game.GameLobbyView(requestPool);
    Pisqorks.Application.EventBus.AddEventListener("OpenGame", this._OnOpenGame.bind(this));

    //TODO: Load current games
};
Pisqorks.Game.PlayPage.prototype = Object.create(Pisqorks.BaseObject.prototype);
Pisqorks.Game.PlayPage.prototype.Render = function (root) {
    if (!this.rendered) {
        this._tabs = $("<div class='tabbable'><ul class='nav nav-tabs'></ul><div class='tab-content'></div></div>").appendTo(root);
        this.LobbyView.Render(this._CreateTab(this.LobbyView.Title, true, true));

        this._requestPool.Create("/api/game/user", "post")
            .AuthHeader(Pisqorks.Application.UserContext.AuthToken)
            .OnSuccess(this._OnLoadCurrentGames.bind(this))
            .Send();

        this.rendered = true;
    }
};
Pisqorks.Game.PlayPage.prototype._CreateTab = function (title, active, right) {
    var id = this._tabLastID++;
    var $li = $(
        "<li class='"
        + (this._Default(right, false) ? "right" : "")
        + (active ? ' active' : '')
        + "'><a href='#tab"
        + id + "' data-toggle='tab'>"
        + title + "</a></li>"
    ).appendTo(this._tabs.find("ul"));
    var $content = $(
        "<div class='tab-pane"
        + (active ? ' active' : '')
        + "' id='tab"
        + id
        + "'></div>"
    ).appendTo(this._tabs.find("div.tab-content"));

    return { Tab: $li, Content: $content };
};
Pisqorks.Game.PlayPage.prototype._OnOpenGame = function (gameID) {
    var view = new Pisqorks.Game.GameBoardView(gameID, this._gameHub, this._requestPool);
    var tab = this._CreateTab(view.Title, false, false);
    view.AddEventListener("TitleChanged", function () { tab.Tab.find("a").html(view.Title); });
    view.AddEventListener("Closed", function () { this._OnCloseGame(tab, view); }.bind(this));
    view.Render(tab.Content);
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
};
Pisqorks.Game.PlayPage.prototype._OnLoadCurrentGames = function (result) {
    var games = JSON.parse(result.Content);
    for (var i = 0; i < games.length; i++) {
        Pisqorks.Application.EventBus.RaiseEvent("OpenGame", games[i]);
    }
};