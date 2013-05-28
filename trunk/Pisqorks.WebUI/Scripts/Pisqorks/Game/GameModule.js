var Pisqorks = window.Pisqorks || {};
Pisqorks.Game = window.Pisqorks.Game || {};

Pisqorks.Game.GameModule = function (requestPool) {
    Pisqorks.BaseModule.call(this);

    this._playPageRoot = $("<div id='play-page'></div>");
    this.PlayPage = new Pisqorks.Game.PlayPage(requestPool);
};
Pisqorks.Game.GameModule.prototype = Object.create(Pisqorks.BaseModule.prototype);

Pisqorks.Game.GameModule.prototype.InitializeFeatures = function (features) {

};
Pisqorks.Game.GameModule.prototype.InitializeNavigation = function (navbar) {
    navbar.AddButton("Play!", "/play", "play");
    navbar.AddButton("Statistics", "/statistics", "signal");
};
Pisqorks.Game.GameModule.prototype.InitializeRoutes = function (router) {
    router.RegisterRoute("/play", "Play!", {
        OnLoad: this._OnPlayLoad.bind(this),
        OnUnload: function () {
            if (!router.IsCurrent("/play/create")) {
                this._OnPlayUnload()
            }
        }.bind(this)
    });
    router.RegisterRoute("/play/create", "Create new game", {
        OnLoad: this.PlayPage.LobbyView.ShowCreate.bind(this),
        OnUnload: this.PlayPage.LobbyView.HideCreate.bind(this)
    });
};
Pisqorks.Game.GameModule.prototype._OnPlayLoad = function () {
    if (!this._playPageRoot.parent().hasClass("content-body")) {
        this.PlayPage.Render(this._playPageRoot);
        $(".content-body").html("");
        this._playPageRoot.appendTo($(".content-body"));
    }
};
Pisqorks.Game.GameModule.prototype._OnPlayUnload = function () {
    this._playPageRoot.remove();
};